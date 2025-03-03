from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm
from django.contrib import messages
# Create your views here.
def base_account(request):
    return render(request, 'account/base_account.html')

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, "Successfully logged in!")
            return redirect('home')
        else:
            messages.error(request, "Invalid username or password.")
            return redirect('login')
    else:
        form = AuthenticationForm()
    return render(request, 'account/login.html', {'form': form})

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
        else:
            messages.error(request, "Invalid form.")
            return redirect('login')
    else:
        form = CustomUserCreationForm()
    return render(request, 'account/register.html', {'form': form})
