import os
import json
from openai import OpenAI
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import TripPlan
from .serializers import UserSerializer, TripPlanSerializer

# Initialize OpenAI client directly with environment variable
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class GenerateItineraryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # 1. Extract data from React payload
        origin = request.data.get('origin')
        destination = request.data.get('destination')
        arrival_date = request.data.get('arrivalDate')
        departure_date = request.data.get('departureDate')
        vibe = request.data.get('vibe', 'historical sightseeing')
        days = request.data.get('days', 1)

        # Basic validation
        if not destination or not arrival_date or not departure_date:
            return Response(
                {"error": "Destination and specific dates are required."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # 2. Construct the Hardened AI Prompt
        prompt = f"""
        Act as PennyPilot, a premium European Budget Concierge. 
        Create a strategic travel itinerary from {origin} to {destination}.
        
        LOGISTICS:
        - Arrival: {arrival_date}
        - Departure: {departure_date}
        - Duration: {days} days
        - Theme/Vibe: {vibe}
        
        STRICT REQUIREMENT: The itinerary must focus exclusively on activities matching the '{vibe}' vibe.
        
        Return ONLY a JSON object with this exact structure:
        {{
            "total_budget": number,
            "currency": "EUR",
            "daily_plan": [
                {{
                    "day": number,
                    "date": "string (e.g., Monday, Feb 16)",
                    "activities": "string",
                    "estimated_cost": number
                }}
            ]
        }}
        """

        try:
            # 3. Call OpenAI with JSON mode
            response = client.chat.completions.create(
                model="gpt-4o-mini", 
                messages=[
                    {"role": "system", "content": "You are PennyPilot, a concierge that strictly outputs travel strategies in valid JSON format."},
                    {"role": "user", "content": prompt}
                ],
                response_format={ "type": "json_object" }
            )
            
            itinerary_json = json.loads(response.choices[0].message.content)
            
            # 4. Atomic Save to Neon PostgreSQL
            trip = TripPlan.objects.create(
                user=request.user,
                origin=origin,
                destination=destination,
                arrival_date=arrival_date,
                departure_date=departure_date,
                duration_days=int(days),
                vibe=vibe,
                itinerary_data=itinerary_json,
                total_budget=itinerary_json.get('total_budget', 0)
            )
            
            return Response(TripPlanSerializer(trip).data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            print(f"--- PENNYPILOT ENGINE ERROR: {str(e)} ---")
            return Response(
                {"error": "Failed to generate your adventure strategy. Check your API key and connection."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

class TravelPlanListView(generics.ListAPIView):
    """
    Returns the history of saved plans for the logged-in user.
    """
    serializer_class = TripPlanSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TripPlan.objects.filter(user=self.request.user).order_by('-created_at')