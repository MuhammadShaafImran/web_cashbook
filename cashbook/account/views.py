from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm
from django.contrib import messages
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Customer, Seller
from .serializers import CustomerSerializer, SellerSerializer
from django.shortcuts import redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def add_seller(request):
    if request.method == 'POST':
        name = request.POST.get('sellerName')
        email = request.POST.get('sellerEmail')
        phone = request.POST.get('sellerPhone')
        active = request.POST.get('sellerActive') == 'on'
        address = request.POST.get('sellerAddress')
        company_name = request.POST.get('sellerCompany')
        category = request.POST.get('sellerCategory')
        seller = Seller.objects.create(user=request.user,name=name, email=email, phone=phone, active=active, address=address, company_name=company_name, category=category)
        
        return JsonResponse({
            'success': True,
            'seller': {
                'id': seller.seller_id,
                'name': seller.name,
                'email': seller.email,
                'phone': seller.phone,
                'active': seller.active,
                'address': seller.address,
                'company_name': seller.company_name,
                'category': seller.category
            }
        })
    else:
        print('error in add_seller')
    return JsonResponse({'success': False, 'error': 'Invalid request'}, status=400)

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



@api_view(['GET'])
def customer_autocomplete(request):
    query = request.GET.get('q', '')
    customers = Customer.objects.filter(name__icontains=query)
    serializer = CustomerSerializer(customers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def seller_autocomplete(request):
    query = request.GET.get('q', '')
    sellers = Seller.objects.filter(name__icontains=query)
    serializer = SellerSerializer(sellers, many=True)
    return Response(serializer.data)