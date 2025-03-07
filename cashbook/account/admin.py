from django.contrib import admin
from .models import CustomUser, Customer, Seller

admin.site.register(CustomUser)
admin.site.register(Seller)
admin.site.register(Customer)
