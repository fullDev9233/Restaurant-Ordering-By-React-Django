from django.shortcuts import render
from rest_framework import generics

from .models import Chicken
from .serializers import ChickenSerializer

class ChickenListView(generics.ListCreateAPIView):
    queryset = Chicken.objects.all()
    serializer_class = ChickenSerializer

class ChickenDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chicken.objects.all()
    serializer_class = ChickenSerializer