from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator, MinValueValidator

class CustomUser(AbstractUser):
    address = models.CharField(max_length=255, blank=True)
    contact = models.CharField(max_length=15, blank=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username


class Seller(models.Model):

    # Seller categories
    WHOLESALE = 'WholeSale'
    RETAIL = 'Retail'
    DISTRIBUTOR = 'Distributor'

    CATEGORY_CHOICES = [
        (WHOLESALE, 'WholeSale'),
        (RETAIL, 'Retail'),
        (DISTRIBUTOR, 'Distributor'),
    ]

    seller_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=False)
    phone = models.CharField(max_length=15, blank=False)
    email = models.EmailField(blank=False)
    address = models.CharField(max_length=50, blank=False)
    company_name = models.CharField(max_length=50, blank=True, null=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default=RETAIL)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.category})"


class Customer(models.Model):
    """
    Todo:
        add a autosave feature for total_purchase
    """
    phone_regex = RegexValidator(
        regex=r'^\d{10,15}$',
        message="Phone number must be 10-15 digits."
    )

    customer_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=False)
    phone = models.CharField(max_length=15, unique=True, validators=[phone_regex], blank=False)
    address = models.CharField(max_length=50, blank=False)
    email = models.EmailField(unique=True, blank=False)
    total_purchase = models.IntegerField(default=0, validators=[MinValueValidator(0)])

    def __str__(self):
        return f"Customer {self.customer_id}: {self.name}"