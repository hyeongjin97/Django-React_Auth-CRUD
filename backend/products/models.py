from os import name
from django.conf import settings
from django.db import models

class Product(models.Model):
    writer = models.CharField(max_length=50, null=False,blank=False)
    name = models.CharField(max_length=150, null= False, blank=False)
    price = models.DecimalField(max_digits=7,decimal_places=2, null= False, blank=False)
    description = models.TextField()
    category = models.CharField(max_length=50, null=True, blank=True)
    image = models.ImageField(upload_to='uploads/images', null = True, blank =True)
    

    def __str__(self):
        return self.name