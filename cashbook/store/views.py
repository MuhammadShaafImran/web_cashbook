from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'store/admin.html')

def seller(request):
    return render(request, 'store/seller-page.html')

def customer_insights(request):
    return render(request,'store/customer-insights.html')