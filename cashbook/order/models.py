from tkinter.constants import CASCADE

from django.db import models
from ..account.models import Customer
from ..store.models import Product
from django.core.validators import MinValueValidator

class OrderItem(models.Model):
    order_item_ID = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(1)], blank=False)
    total = models.IntegerField(validators=[MinValueValidator(0)], default=0)

    def save(self, *args, **kwargs):
        self.total = self.product.price * self.quantity
        super().save(*args, **kwargs)

    def __str__(self):
        return f"OrderItem {self.order_item_ID}: {self.product.name} x {self.quantity}"

class Order(models.Model):
    """
    Todo: Add def __save__ for total
    """
    order_id = models.AutoField(primary_key=True)
    order_item_ID = models.ForeignKey(OrderItem, on_delete=CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, to_field='customer_id')
    total = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order_id} by {self.customer.name}"
