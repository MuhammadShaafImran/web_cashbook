from django.db import models
from ..account.models import Seller,Customer
from ..payment.models import Shipment
from ..order.models import Order
from django.core.validators import MinValueValidator

class Product(models.Model):

    ELECTRONICS = 'Electronics'
    FOOD = 'Food'
    FURNITURE = 'Furniture'

    CATEGORY_CHOICES = [
        (ELECTRONICS, 'Electronics'),
        (FOOD, 'Food'),
        (FURNITURE, 'Furniture'),
    ]

    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=False)
    price = models.IntegerField(validators=[MinValueValidator(0)],blank=False)
    size_type = models.CharField(max_length=10, choices=[('lb', 'Pound'), ('onz', 'Ounce')])
    size = models.IntegerField(validators=[MinValueValidator(0)])
    quantity = models.IntegerField(validators=[MinValueValidator(0)], blank=False)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default=FOOD)
    seller_id = models.ForeignKey(Seller, on_delete=models.CASCADE,blank=False)

    def __str__(self):
        return f"{self.name} ({self.category}) - ${self.price}"

class Record(models.Model):
    record_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)
    credit = models.IntegerField(validators=[MinValueValidator(0)])
    debit = models.IntegerField(validators=[MinValueValidator(0)])
    current = models.IntegerField(validators=[MinValueValidator(0)])

    def __str__(self):
        return f"Record {self.record_id} for {self.customer.name}"