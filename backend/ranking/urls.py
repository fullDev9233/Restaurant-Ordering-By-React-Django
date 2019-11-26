from django.urls import path
# from .views import RankingListView, RankingDetailView
from ranking import views

urlpatterns = [
    path('', views.ranking_list),
    path('<str:pk>', views.ranking_detail),
    path('rec/<str:pk>', views.recommend_list),
]