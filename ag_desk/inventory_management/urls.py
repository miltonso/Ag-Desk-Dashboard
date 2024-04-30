from django.urls import path
from .views import InventoryItemList, InventoryItemDetail

urlpatterns = [
    path('', InventoryItemList.as_view(), name='inventory-list'),
    path('<int:pk>/', InventoryItemDetail.as_view(), name='inventory-detail'),
]