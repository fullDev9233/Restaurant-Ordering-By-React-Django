from django.urls import path
from .views import *

urlpatterns = [
    path('chickens/', ChickenListView.as_view()),
    path('chickens/last', ChickenListExView.as_view()),
    path('chickens/first', ChickenListSmallView.as_view()),
    path('chickens/<pk>', ChickenDetailView.as_view()),
    path('rating/', RatingListView.as_view()),
    path('rating/<pk>', RatingDetailView.as_view()),
    path('shops/', ShopListView.as_view())
]