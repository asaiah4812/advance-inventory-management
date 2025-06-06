from django.shortcuts import render

# Create your views here.


def dashboard(request):
    return render(request, 'core/dashboard.html')

def add_product(request):
    return render(request, 'core/add-product.html')

def inventory(request):
    return render(request, 'core/inventory.html')
def category_list(request):
    return render(request, 'core/category_list.html')