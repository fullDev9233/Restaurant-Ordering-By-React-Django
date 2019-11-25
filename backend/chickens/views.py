from django.shortcuts import render
from rest_framework import generics

from .models import Chicken, Item, Rating, Shop
from .serializers import ChickenSerializer, ItemSerializer, RatingSerializer, ShopSerializer

class ChickenListView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

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