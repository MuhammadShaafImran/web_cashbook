from django.db import models
from ..account.models import Customer

# Create your models here.
class Record(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)
    credit = models.IntegerField()
    debit = models.IntegerField()
    current = models.IntegerField()

    def __str__(self):
        return f"Record {self.id} for {self.customer.user.username}"

class Product(models.Model):
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    size_type = models.CharField(max_length=10, choices=[('lb', 'Pound'), ('onz', 'Ounce')])
    size = models.IntegerField()
    quantity = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)

    def __str__(self):
        return self.name