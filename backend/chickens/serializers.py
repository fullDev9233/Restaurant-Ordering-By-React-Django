from rest_framework import serializers
from .models import Chicken, Item, Rating, Shop

class ChickenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chicken
        fields = ('objects', 'brand','name','desc', 'image')

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ('name','photo')

class ItemSerializer(serializers.ModelSerializer):
    shop = ShopSerializer(read_only=True)

    class Meta:
        model = Item
        fields = ('shop', 'name', 'amount', 'photo')

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('name', 'Menu', 'Total')