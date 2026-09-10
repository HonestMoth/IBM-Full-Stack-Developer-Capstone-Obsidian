import requests
from urllib.parse import quote
import os
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv('BACKEND_URL', os.getenv('backend_url', 'http://localhost:3030')).rstrip('/')
sentiment_analyzer_url = os.getenv('SENTIMENT_ANALYZER_URL', os.getenv('sentiment_analyzer_url', 'http://localhost:5050')).rstrip('/')

def get_request(endpoint, **kwargs):
    params = ""
    if(kwargs):
        for key,value in kwargs.items():
            params=params+key+"="+value+"&"

    request_url = backend_url + endpoint

    print("GET from {} ".format(request_url))
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url, params=kwargs, timeout=10)
        response.raise_for_status()
        return response.json()
    except:
        # If any error occurs
        print("Network exception occurred")

def analyze_review_sentiments(text):
    request_url = sentiment_analyzer_url + "/analyze/" + quote(text, safe='')
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")

def post_review(data_dict):
    request_url = backend_url + "/insert_review"
    try:
        response = requests.post(request_url, json=data_dict, timeout=10)
        response.raise_for_status()
        print(response.json())
        return response.json()
    except:
        print("Network exception occurred")
