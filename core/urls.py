from django.urls import path
from . import views

app_name='core'

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('add-product/', views.add_product, name='add_product'),
    path('inventory/', views.inventory, name='inventory'),
    path('catefories/', views.category_list, name='categories')
]
