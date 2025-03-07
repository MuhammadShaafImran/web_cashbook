from django.db import models

# Create your models here.
class Shipment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    receiver_name = models.CharField(max_length=50)
    date = models.DateTimeField()
    address = models.CharField(max_length=50)
    payment_method = models.CharField(max_length=50)

    def __str__(self):
        return f"Shipment for Order {self.order.id}"