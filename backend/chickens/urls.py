from django.urls import path
from .views import *

urlpatterns = [
    path('chickens/', ChickenListView.as_view()),
    path('chickens/<pk>', ChickenDetailView.as_view()),
    path('shops/', ShopListView.as_view()),
]