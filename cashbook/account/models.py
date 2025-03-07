# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User

class CustomUser(AbstractUser):
    address = models.CharField(max_length=255, blank=True)
    contact = models.CharField(max_length=15, blank=True)
    email = models.EmailField(unique=True)
    def __str__(self):
        return self.username

class Seller(models.Model):
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    address = models.CharField(max_length=50)
    company_name = models.CharField(max_length=50, blank=True, null=True)
    category = models.CharField(max_length=50, choices=[('WholeSale', 'WholeSale')])
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=50)
    total_purchase = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username