from django.db import models
from ..order.models import Order
from ..account.models import Customer

class Shipment(models.Model):
    CARD = 'Card'
    CASH = 'Cash'
    ONLINE = 'Online'  # Fixed incorrect category name

    CATEGORY_CHOICES = [
        (CARD, 'Card'),
        (CASH, 'Cash'),
        (ONLINE, 'Online'),
    ]
    shipment_id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    receiver_name = models.CharField(max_length=50, blank=False)
    date = models.DateTimeField(blank=False)
    address = models.CharField(max_length=50,blank=False)
    payment_method = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default=CARD)

    def __str__(self):
        return f"Shipment: {self.shipment_id} for Order: {self.order.order_id}"