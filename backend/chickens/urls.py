from django.urls import path
from .views import ChickenListView, ChickenDetailView

urlpatterns = [
    path('', ChickenListView.as_view()),
    path('<pk>', ChickenDetailView.as_view()),
]