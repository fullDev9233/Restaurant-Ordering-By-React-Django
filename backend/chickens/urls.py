from django.urls import path
from .views import *

urlpatterns = [
    path('chickens/', ChickenListView.as_view()),
    path('chickens/<pk>', ChickenDetailView.as_view()),
    path('rating/', RatingListView.as_view()),
    path('rating/<pk>', RatingDetailView.as_view())
]