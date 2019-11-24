from django.shortcuts import render
from rest_framework import generics

from .models import Chicken, Item, Rating
from .serializers import ChickenSerializer, ItemSerializer, RatingSerializer

class ChickenListView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ChickenListExView(generics.ListCreateAPIView):
    queryset = Item.objects.exclude(photo='')
    serializer_class = ItemSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ChickenDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RatingListView(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RatingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)