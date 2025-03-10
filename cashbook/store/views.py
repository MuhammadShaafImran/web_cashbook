from django.shortcuts import render
from django.shortcuts import redirect
from account.models import Seller
# Create your views here.
def home(request):
    if request.user.is_authenticated and request.method == "POST":
        print(request.POST)
        print(request.POST.get('seller'))
        print(request.POST.get('customer'))
        print(request.POST.get('product'))

    if request.user.is_authenticated:
        context = {
            'username': request.user.username,
        }
        return render(request, 'store/admin.html', context)
    else:  
        return redirect('login')
    
def seller(request):
    if request.user.is_authenticated:
        sellers = Seller.objects.filter(user=request.user)
        context = {
            'sellers': sellers,
        }
        return render(request, 'store/seller-page.html', context)
    else:
        return redirect('login')

def customer_insights(request):
    return render(request,'store/customer-insights.html')

def new_order(request):
    return render(request,'store/new_order.html')