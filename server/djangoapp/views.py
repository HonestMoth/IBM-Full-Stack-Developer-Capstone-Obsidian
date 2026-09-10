from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import logout
from django.contrib import messages
from datetime import datetime

from django.http import JsonResponse
from django.contrib.auth import login, authenticate
import logging
import json
from django.views.decorators.csrf import csrf_exempt
from .populate import initiate
from .models import CarMake, CarModel
from .restapis import get_request, analyze_review_sentiments, post_review

logger = logging.getLogger(__name__)

@csrf_exempt
def login_user(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST required'}, status=405)
    try:
        data = json.loads(request.body)
        username, password = data['userName'], data['password']
    except (ValueError, KeyError):
        return JsonResponse({'error': 'userName and password are required'}, status=400)
    user = authenticate(username=username, password=password)
    data = {"userName": username, "error": "Invalid credentials"}
    if user is not None:
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
    return JsonResponse(data, status=200 if user is not None else 401)

def logout_request(request):
    logout(request)
    return JsonResponse({"userName":""})

@csrf_exempt
def registration(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST required'}, status=405)
    try:
        data = json.loads(request.body)
        username, password = data['userName'], data['password']
        first_name, last_name, email = data['firstName'], data['lastName'], data['email']
    except (ValueError, KeyError):
        return JsonResponse({'error': 'All registration fields are required'}, status=400)
    username_exist = False
    try:
        User.objects.get(username=username)
        username_exist = True
    except User.DoesNotExist:
        logger.debug("%s is new user", username)
    if not username_exist:
        user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name, password=password, email=email)
        login(request, user)
        return JsonResponse({"userName":username,"status":"Authenticated"})
    return JsonResponse({"userName":username,"error":"Already Registered"})

def get_cars(request):
    make_count = CarMake.objects.count()
    model_count = CarModel.objects.count()
    if make_count == 0 or model_count == 0:
        initiate()
    car_models = CarModel.objects.select_related('car_make').order_by('car_make__name', 'name')
    cars = [{"CarModel": car_model.name, "CarMake": car_model.car_make.name} for car_model in car_models]
    return JsonResponse({"CarModels": cars})

def get_dealerships(request, state="All"):
    endpoint = "/fetchDealers" if state == "All" else "/fetchDealers/" + state
    dealerships = get_request(endpoint)
    return JsonResponse({"status": 200, "dealers": dealerships or []})

def get_dealer_details(request, dealer_id):
    if dealer_id:
        dealership = get_request("/fetchDealer/" + str(dealer_id))
        return JsonResponse({"status": 200, "dealer": dealership or []})
    return JsonResponse({"status":400,"message":"Bad Request"})

def get_dealer_reviews(request, dealer_id):
    if dealer_id:
        reviews = get_request("/fetchReviews/dealer/" + str(dealer_id)) or []
        for review_detail in reviews:
            response = analyze_review_sentiments(review_detail.get('review', '')) or {}
            review_detail['sentiment'] = response.get('sentiment', 'neutral')
        return JsonResponse({"status":200,"reviews":reviews})
    return JsonResponse({"status":400,"message":"Bad Request"})

def analyze_review(request, input_txt):
    """Capstone-compatible GET endpoint: /analyze/Fantastic%20services."""
    result = analyze_review_sentiments(input_txt) or {"sentiment": "neutral"}
    return JsonResponse(result)

def add_review(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST required'}, status=405)
    if not request.user.is_authenticated:
        return JsonResponse({"status":403,"message":"Unauthorized"})
    try:
        data = json.loads(request.body)
        response = post_review(data)
        return JsonResponse({"status":200, "review": response})
    except (ValueError, TypeError, KeyError):
        return JsonResponse({"status":400,"message":"Invalid review data"})
    except Exception:
        return JsonResponse({"status":401,"message":"Error in posting review"})
