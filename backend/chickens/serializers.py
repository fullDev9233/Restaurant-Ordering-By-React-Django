from rest_framework import serializers
from .models import Chicken, Item, Rating

class ChickenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chicken
        fields = ('objects', 'brand','name','desc', 'image')

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('shop', 'name', 'amount', 'photo')

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('name', 'Menu', 'Total')