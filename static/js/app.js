import { Chart } from "@/components/ui/chart";
import Alpine from "alpinejs";
// Main application data and functions
function appData() {
  return {
    darkMode: localStorage.getItem("darkMode") === "true" || false,
    sidebarOpen: true,

    init() {
      // Check if user is logged in
      if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
      }

      this.updateDarkMode();
      this.initCharts();

      // Close sidebar on mobile by default
      if (window.innerWidth < 768) {
        this.sidebarOpen = false;
      }

      // Handle window resize
      window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
          this.sidebarOpen = true;
        } else {
          this.sidebarOpen = false;
        }
      });
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem("darkMode", this.darkMode);
      this.updateDarkMode();
    },

    updateDarkMode() {
      if (this.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },

    initCharts() {
      // Initialize charts after a short delay to ensure DOM is ready
      setTimeout(() => {
        this.initSalesChart();
        this.initSalesTrendChart();
      }, 100);
    },

    initSalesChart() {
      const ctx = document.getElementById("salesChart");
      if (!ctx) return;

      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Sales ($)",
              data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
              borderColor: "#6366f1",
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: this.darkMode ? "#374151" : "#f3f4f6",
              },
              ticks: {
                color: this.darkMode ? "#9ca3af" : "#6b7280",
              },
            },
            x: {
              grid: {
                color: this.darkMode ? "#374151" : "#f3f4f6",
              },
              ticks: {
                color: this.darkMode ? "#9ca3af" : "#6b7280",
              },
            },
          },
        },
      });
    },

    initSalesTrendChart() {
      const ctx = document.getElementById("salesTrendChart");
      if (!ctx) return;

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Monthly Sales",
              data: [12000, 19000, 15000, 25000, 22000, 30000],
              backgroundColor: "#6366f1",
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: this.darkMode ? "#374151" : "#f3f4f6",
              },
              ticks: {
                color: this.darkMode ? "#9ca3af" : "#6b7280",
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: this.darkMode ? "#9ca3af" : "#6b7280",
              },
            },
          },
        },
      });
    },

    logout() {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("rememberMe");
      window.location.href = "login.html";
    },
  };
}

// Inventory page data
function inventoryData() {
  return {
    searchTerm: "",
    categoryFilter: "",
    stockFilter: "",
    sortField: "",
    sortDirection: "asc",

    products: [
      {
        id: 1,
        name: "iPhone 13 Pro Max Case",
        sku: "IPH13PM-001",
        category: "Cases",
        price: 29.99,
        stock: 45,
        icon: "fas fa-mobile-alt",
      },
      {
        id: 2,
        name: "Samsung Galaxy S22 Screen Protector",
        sku: "SGS22-SP-001",
        category: "Screen Protectors",
        price: 12.99,
        stock: 8,
        icon: "fas fa-shield-alt",
      },
      {
        id: 3,
        name: "AirPods Pro Case",
        sku: "APP-CASE-001",
        category: "Cases",
        price: 19.99,
        stock: 5,
        icon: "fas fa-headphones",
      },
      {
        id: 4,
        name: "20W USB-C Power Adapter",
        sku: "USBC-20W-001",
        category: "Chargers",
        price: 24.99,
        stock: 12,
        icon: "fas fa-plug",
      },
      {
        id: 5,
        name: "Lightning to USB-C Cable",
        sku: "LTG-USBC-001",
        category: "Cables",
        price: 15.99,
        stock: 32,
        icon: "fas fa-cable-car",
      },
      {
        id: 6,
        name: "Wireless Charging Pad",
        sku: "WCP-001",
        category: "Chargers",
        price: 34.99,
        stock: 0,
        icon: "fas fa-wifi",
      },
      {
        id: 7,
        name: "iPhone 12 Screen Protector",
        sku: "IPH12-SP-001",
        category: "Screen Protectors",
        price: 11.99,
        stock: 18,
        icon: "fas fa-shield-alt",
      },
      {
        id: 8,
        name: "Car Phone Mount",
        sku: "CPM-001",
        category: "Stands",
        price: 22.99,
        stock: 25,
        icon: "fas fa-car",
      },
    ],

    get filteredProducts() {
      let filtered = this.products;

      // Search filter
      if (this.searchTerm) {
        filtered = filtered.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }

      // Category filter
      if (this.categoryFilter) {
        filtered = filtered.filter(
          (product) => product.category === this.categoryFilter
        );
      }

      // Stock filter
      if (this.stockFilter) {
        filtered = filtered.filter((product) => {
          switch (this.stockFilter) {
            case "low":
              return product.stock > 0 && product.stock <= 10;
            case "in":
              return product.stock > 10;
            case "out":
              return product.stock === 0;
            default:
              return true;
          }
        });
      }

      // Sort
      if (this.sortField) {
        filtered.sort((a, b) => {
          let aVal = a[this.sortField];
          let bVal = b[this.sortField];

          if (typeof aVal === "string") {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
          }

          if (this.sortDirection === "asc") {
            return aVal > bVal ? 1 : -1;
          } else {
            return aVal < bVal ? 1 : -1;
          }
        });
      }

      return filtered;
    },

    sortBy(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortField = field;
        this.sortDirection = "asc";
      }
    },
  };
}

// Add product page data
function addProductData() {
  return {
    product: {
      name: "",
      sku: "",
      category: "",
      brand: "",
      compatibleDevices: [],
      price: "",
      cost: "",
      stock: "",
      lowStockThreshold: 10,
      location: "",
      description: "",
      supplier: "",
      supplierContact: "",
    },

    availableDevices: [
      "iPhone 13 Pro Max",
      "iPhone 13 Pro",
      "iPhone 13",
      "iPhone 13 Mini",
      "iPhone 12 Pro Max",
      "iPhone 12 Pro",
      "iPhone 12",
      "iPhone 12 Mini",
      "Samsung Galaxy S22 Ultra",
      "Samsung Galaxy S22+",
      "Samsung Galaxy S22",
      "Samsung Galaxy S21",
      "Google Pixel 6 Pro",
      "Google Pixel 6",
      "OnePlus 9 Pro",
      "OnePlus 9",
    ],

    saveProduct() {
      // Validate required fields
      if (
        !this.product.name ||
        !this.product.sku ||
        !this.product.category ||
        !this.product.price ||
        !this.product.stock
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      // Here you would typically send the data to your backend
      console.log("Saving product:", this.product);

      // Show success message
      alert("Product added successfully!");

      // Reset form
      this.resetForm();
    },

    resetForm() {
      this.product = {
        name: "",
        sku: "",
        category: "",
        brand: "",
        compatibleDevices: [],
        price: "",
        cost: "",
        stock: "",
        lowStockThreshold: 10,
        location: "",
        description: "",
        supplier: "",
        supplierContact: "",
      };
    },
  };
}

// Sales page data
function salesData() {
  return {
    topProducts: [
      {
        id: 1,
        name: "iPhone 13 Pro Case",
        sold: 45,
        revenue: 1349.55,
        growth: 12.5,
        icon: "fas fa-mobile-alt",
      },
      {
        id: 2,
        name: "AirPods Pro Case",
        sold: 32,
        revenue: 639.68,
        growth: 8.3,
        icon: "fas fa-headphones",
      },
      {
        id: 3,
        name: "USB-C Cable",
        sold: 28,
        revenue: 447.72,
        growth: 15.2,
        icon: "fas fa-cable-car",
      },
      {
        id: 4,
        name: "Screen Protector",
        sold: 24,
        revenue: 311.76,
        growth: 6.8,
        icon: "fas fa-shield-alt",
      },
      {
        id: 5,
        name: "Wireless Charger",
        sold: 18,
        revenue: 629.82,
        growth: 22.1,
        icon: "fas fa-wifi",
      },
    ],

    recentOrders: [
      {
        id: "ORD-001",
        customer: "John Smith",
        products: 3,
        total: 67.97,
        status: "Completed",
        date: "2024-01-15",
      },
      {
        id: "ORD-002",
        customer: "Sarah Johnson",
        products: 1,
        total: 29.99,
        status: "Processing",
        date: "2024-01-15",
      },
      {
        id: "ORD-003",
        customer: "Mike Davis",
        products: 2,
        total: 44.98,
        status: "Shipped",
        date: "2024-01-14",
      },
      {
        id: "ORD-004",
        customer: "Emily Brown",
        products: 4,
        total: 89.96,
        status: "Completed",
        date: "2024-01-14",
      },
      {
        id: "ORD-005",
        customer: "David Wilson",
        products: 1,
        total: 19.99,
        status: "Cancelled",
        date: "2024-01-13",
      },
    ],
  };
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Auto-initialize Alpine.js components
  if (typeof Alpine !== "undefined") {
    Alpine.start();
  }
});
