from django.shortcuts import render

# Create your views here.
def product(request):
    return render(request, 'order/product.html')

def purchase(request):
    return render(request, 'order/purchase.html')