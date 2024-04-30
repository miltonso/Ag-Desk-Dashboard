from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import InventoryItem
from .serializers import InventoryItemSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404

class InventoryItemList(APIView):

    def get(self, request, format=None):
        items = InventoryItem.objects.all()
        serializer = InventoryItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print("Received POST data:", request.data)  # Ensure this logs correct data
        serializer = InventoryItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class InventoryItemDetail(APIView):
    def get(self, request, pk, format=None):
        inventory_item = get_object_or_404(InventoryItem, pk=pk)
        serializer = InventoryItemSerializer(inventory_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        inventory_item = get_object_or_404(InventoryItem, pk=pk)
        serializer = InventoryItemSerializer(inventory_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        inventory_item = get_object_or_404(InventoryItem, pk=pk)
        inventory_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
