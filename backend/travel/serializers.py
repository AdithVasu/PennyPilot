from rest_framework import serializers
from django.contrib.auth.models import User
from .models import TripPlan

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class TripPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripPlan
        fields = [
            'id', 
            'user', 
            'origin', 
            'destination', 
            'arrival_date',     # Added
            'departure_date',   # Added
            'duration_days', 
            'vibe', 
            'itinerary_data', 
            'total_budget', 
            'created_at'
        ]
        read_only_fields = ['user']
        
        # Updated defensive settings
        extra_kwargs = {
            'origin': {'required': False},
            'arrival_date': {'required': False},
            'departure_date': {'required': False},
            'duration_days': {'required': False},
            'total_budget': {'required': False},
        }