from django.urls import path
from . import views

urlpatterns = [
    path('base_account/', views.base_account, name='base_account'),
    path('login/', views.user_login, name='login'),
    path('register/', views.register, name='register'),
]

