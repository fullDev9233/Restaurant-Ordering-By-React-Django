from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
from django.urls import reverse
from jsonfield import JSONField


# Create your models here.

class Shop(models.Model):
    # 1:N 관계 설정
    name = models.CharField(max_length=100, db_index=True, unique=True)
    desc = models.TextField(blank=True)
    latlng = models.CharField(max_length=100, blank=True)
    photo = models.ImageField(blank=True)
    is_public = models.BooleanField(default=False, db_index=True)
    meta = JSONField()  # PostgreSQL의 JSONField와 다름

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('shop:shop_detail', args=[self.pk])

    @property
    def address(self):
        return self.meta.get('address')
    
    def shopname(self):
        return self.name

class Item(models.Model):
    class Meta:
        unique_together =[['shop', 'name']]

    shop = models.ForeignKey(Shop,on_delete=models.CASCADE,)
    name = models.CharField(max_length=100, db_index=True)
    desc = models.TextField(blank=True)
    amount = models.PositiveIntegerField()
    photo = models.ImageField(blank=True, default='default_image.PNG')
    is_public = models.BooleanField(default=False, db_index=True)
    meta = JSONField()

    def __str__(self):
        return '{} {} {} {}'.format(Shop.shopname(self.shop), self.name, self.amount, self.photo)

class Rating(models.Model):
    name = models.TextField(blank=True)
    Menu = models.TextField(blank=True)
    Total = models.TextField(blank=True)
    def __str__(self):
        return '{} {} {}'.format(self.name, self.Menu, self.Total)

class Chicken(models.Model):
    objects = models.Manager()
    brand = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    content = models.TextField()
    #image = models.FileField(upload_to='images',blank=True)
    image = models.ImageField(default='default_image.PNG')

    def __str__(self):
        return '{} {}'.format(self.name, self.image)
