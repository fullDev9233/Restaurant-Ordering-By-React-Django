from rest_framework import serializers
from .models import Chicken, Item, Rating, Shop

class ChickenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chicken
        fields = ('id', 'brand','name','content')

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ('id', 'name','photo')

class ItemSerializer(serializers.ModelSerializer):
    shop = ShopSerializer(read_only=True)

    class Meta:
        model = Item
        fields = ('id','shop', 'name', 'amount', 'photo')

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('name', 'Menu', 'Total')

