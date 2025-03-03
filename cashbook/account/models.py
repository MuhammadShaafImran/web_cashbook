# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    address = models.CharField(max_length=255, blank=True)
    contact = models.CharField(max_length=15, blank=True)
    email = models.EmailField(unique=True)
    def __str__(self):
        return self.username