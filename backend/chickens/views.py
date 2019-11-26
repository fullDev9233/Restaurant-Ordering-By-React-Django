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

    def get_queryset(self):
        queryset = Item.objects.all()
        shopid = self.request.query_params.get('shop', None)
        if shopid is not None:
            queryset = queryset.filter(shop=shopid)
        return queryset

# class ChickenListByShop(generics.ListAPIView):
#     serializer_class = ItemSerializer
#     def get_queryset(self):
#         queryset = Item.objects.all()
#         shopid = self.request.query_params.get(id, None)
#         if shopid is not None:
#             queryset = queryset.filter(shop=shopid)
#         return queryset



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