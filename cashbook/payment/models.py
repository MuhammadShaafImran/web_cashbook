from django.db import models
from django.utils import timezone
from order.models import Order
from store.models import Customer

class Shipment(models.Model):
    
    shipment_id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE) 
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    receiver_name = models.CharField(max_length=50)
    address = models.CharField(max_length=200)
    date = models.DateTimeField(default=timezone.now)  # Sets current date/time by default
    payment_method = models.CharField(max_length=50)
    shipment_status = models.CharField(max_length=50, choices=[
        ('pending', 'Pending'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled')
    ], default='pending')

    def __str__(self):
        return f"Shipment {self.shipment_id} for Order {self.order.id}"
