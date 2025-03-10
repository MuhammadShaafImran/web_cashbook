from django.db import models
from account.models import Seller
from django.core.validators import MinValueValidator
from account.models import CustomUser as User

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
    user = models.ForeignKey(User, on_delete=models.CASCADE,blank=False)

    def __str__(self):
        return f"{self.name} ({self.category}) - ${self.price}"
