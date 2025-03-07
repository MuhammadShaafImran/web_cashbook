from django.db import models
from account.models import CustomUser as User
from order.models import Order

class Seller(models.Model):
    CATEGORY_CHOICES = [
        ('WholeSale', 'WholeSale'),
        ('Reseller', 'Reseller')
    ]
    seller_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    name = models.CharField(max_length=50)
    phone = models.IntegerField()
    email = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    company_name = models.CharField(max_length=50, blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    active = models.BooleanField()

class Customer(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    customer_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    phone = models.IntegerField()
    total_purchase = models.IntegerField()


class Record(models.Model):
    record_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    shipping_id = models.IntegerField()
    credit = models.IntegerField()
    debit = models.IntegerField()
    current = models.IntegerField()
    date = models.DateField()

    def __str__(self):
        return self.record_id