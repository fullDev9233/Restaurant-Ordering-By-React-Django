from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
from django.urls import reverse
from jsonfield import JSONField

class Shop(models.Model):
    # 1:N 관계 설정
    name = models.CharField(max_length=100, db_index=True)
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

class Item(models.Model):
    shop = models.ForeignKey(Shop,on_delete=models.CASCADE,)
    name = models.CharField(max_length=100, db_index=True)
    desc = models.TextField(blank=True)
    amount = models.PositiveIntegerField()
    photo = models.ImageField(blank=True)
    is_public = models.BooleanField(default=False, db_index=True)
    meta = JSONField()

    def __str__(self):
        return self.name

class Chicken(models.Model):
    objects = models.Manager()
    brand = models.CharField(max_length=120)
    name = models.CharField(max_length=120)
    content = models.TextField()

    def __str__(self):
        return self.name
