from django.db import models
from django.contrib.auth.models import User

class TripPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    origin = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    arrival_date = models.DateField(null=True, blank=True)
    departure_date = models.DateField(null=True, blank=True)
    duration_days = models.IntegerField()
    vibe = models.CharField(max_length=100) # historical, nature, relaxation, immersion
    itinerary_data = models.JSONField()
    total_budget = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.destination} ({self.user.username})"