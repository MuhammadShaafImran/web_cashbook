from django.urls import path
from . import views
from .views import customer_autocomplete, seller_autocomplete,add_seller

urlpatterns = [
    path('', views.home, name='home'),
    path('seller/', views.seller, name='seller'),
    path('customer-insights/',views.customer_insights, name = 'customer-insights'),
    path('new-order/',views.new_order, name = 'new-order'),
    path('autocomplete/', customer_autocomplete, name='customer-autocomplete'),
    path('autocomplete/', seller_autocomplete, name='seller-autocomplete'),
    path('sellers/add/', add_seller, name='add_seller'),
]