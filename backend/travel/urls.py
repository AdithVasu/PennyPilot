from django.urls import path
from .views import RegisterView, GenerateItineraryView, TravelPlanListView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('generate/', GenerateItineraryView.as_view(), name='generate'),
    path('my-plans/', TravelPlanListView.as_view(), name='my-plans'),
]