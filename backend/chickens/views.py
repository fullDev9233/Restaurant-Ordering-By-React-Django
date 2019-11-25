from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Chicken, Item, Rating, Shop
from .serializers import ChickenSerializer, ItemSerializer, RatingSerializer, ShopSerializer

class ChickenListView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['GET'])
def chicken_list_byShop(request, pk):
    queryset = Item.objects.filter(shop=pk)
    serializer = ItemSerializer(queryset, many=True)
    return Response(serializer.data)

class ChickenDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ShopListView(generics.ListCreateAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    pagination_class = None
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)