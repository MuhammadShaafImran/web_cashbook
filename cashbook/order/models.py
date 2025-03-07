from django.db import models

class Product(models.Model):
    PRODUCT_CATEGORIES = [
        ('User_Defined', 'User Defined'),
    ]
    SIZE_TYPES = [
        ('lb', 'Pound'),
        ('onz', 'Ounce'),
    ]
    
    product_id = models.AutoField(primary_key=True)
    category = models.CharField(max_length=50, choices=PRODUCT_CATEGORIES)
    seller_id = models.IntegerField()
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    size_type = models.CharField(max_length=3, choices=SIZE_TYPES)
    size = models.IntegerField()
    quantity = models.IntegerField()

    def __str__(self):
        return self.name

class OrderItem(models.Model):
    order_item_id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total = models.IntegerField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.product and self.quantity:
            self.total = self.product.price * self.quantity
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"Order Item {self.order_item_id}"

class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    order_item = models.ForeignKey(OrderItem, on_delete=models.CASCADE)
    customer_id = models.IntegerField()
    total = models.IntegerField(null=True, blank=True)
    
    def save(self, *args, **kwargs):
        if self.order_item:
            self.total = self.order_item.total
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"Order {self.order_id}"
