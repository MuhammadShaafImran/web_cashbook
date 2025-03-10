from django.urls import path
from . import views
from .views import customer_autocomplete, seller_autocomplete,add_seller

urlpatterns = [
    path('base_account/', views.base_account, name='base_account'),
    path('login/', views.user_login, name='login'),
    path('register/', views.register, name='register'),
    path('autocomplete/', customer_autocomplete, name='customer-autocomplete'),
    path('autocomplete/', seller_autocomplete, name='seller-autocomplete'),
    path('sellers/add/', add_seller, name='add_seller'),
]

