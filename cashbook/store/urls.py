from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('seller/', views.seller, name='seller'),
    path('customer-insights/',views.customer_insights, name = 'customer-insights'),
    path('new-order/',views.new_order, name = 'new-order'),
]

