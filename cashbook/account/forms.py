# forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    address = forms.CharField(max_length=255, required=True)
    contact = forms.CharField(max_length=15, required=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'address', 'contact', 'email', 'password1', 'password2')
    def save(self, commit=True):
        user = super().save(commit=False)
        if commit:
            user.save()
        return user