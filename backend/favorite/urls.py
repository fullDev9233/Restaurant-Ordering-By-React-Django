from django.urls import path
# from .views import RankingListView, RankingDetailView
from favorite import views

urlpatterns = [
    path('', views.favorite_list),
    path('<str:pk>', views.favorite_detail),
]