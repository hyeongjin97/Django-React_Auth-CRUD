from django.shortcuts import render
from .models import Product
from .serializers import ProductSerializer
from rest_framework import viewsets

# Create your views here.

class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
