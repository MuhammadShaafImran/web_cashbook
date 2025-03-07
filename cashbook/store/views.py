from django.shortcuts import render
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
        print('in post')
        name = request.POST.get('sellerName')
        email = request.POST.get('sellerEmail')
        phone = request.POST.get('sellerPhone')
        active = request.POST.get('sellerActive') == 'on'
        address = request.POST.get('sellerAddress')
        company_name = request.POST.get('sellerCompany')
        category = request.POST.get('sellerCategory')
        seller = Seller.objects.create(user_id=request.user,name=name, email=email, phone=phone, active=active, address=address, company_name=company_name, category=category)
        
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
def home(request):
    if request.user.is_authenticated:
        context = {
            'username': request.user.username,
        }
        return render(request, 'store/admin.html', context)
    else:  
        return redirect('login')
    
def seller(request):
    if request.method == "POST":
        # print(request.POST)
        form = Seller(request.POST)
        if form.is_valid():
            form.instance.user_id = request.user
            form.save()
            return redirect('seller')
        else:
            print(form.errors)
    sellers = Seller.objects.filter(user_id=request.user)
    context = {
        'sellers': sellers,
    }
    return render(request, 'store/seller-page.html',context)

def customer_insights(request):
    return render(request,'store/customer-insights.html')

def new_order(request):
    return render(request,'store/new_order.html')

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