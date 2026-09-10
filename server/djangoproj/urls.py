"""djangoproj URL Configuration

The `urlpatterns` list routes URLs to views.
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from djangoapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('djangoapp/', include('djangoapp.urls')),

    # Static pages
    path('', TemplateView.as_view(template_name="Home.html")),
    path('about/', TemplateView.as_view(template_name="About.html")),
    path('contact/', TemplateView.as_view(template_name="Contact.html")),

    # React application entry points
    path('login/', TemplateView.as_view(template_name="index.html")),
    path('register/', TemplateView.as_view(template_name="index.html")),
    path('dealer/', TemplateView.as_view(template_name="index.html")),
    path('dealers/', TemplateView.as_view(template_name="index.html")),
    path('dealer/<int:dealer_id>', TemplateView.as_view(template_name="index.html")),
    path('postreview/<int:dealer_id>', TemplateView.as_view(template_name="index.html")),

    # Capstone-required public API aliases.
    # These proxy to the existing Django views, which in turn call the
    # Express/MongoDB service through /fetchDealers, /fetchDealer and
    # /fetchReviews/dealer endpoints.
    path('fetchDealers', views.get_dealerships, name='fetch_dealers'),
    path('fetchDealers/<str:state>', views.get_dealerships, name='fetch_dealers_by_state'),
    path('fetchDealer/<int:dealer_id>', views.get_dealer_details, name='fetch_dealer'),
    path('fetchReviews/dealer/<int:dealer_id>', views.get_dealer_reviews, name='fetch_dealer_reviews'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
