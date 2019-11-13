from rest_framework import serializers
from .models import Chicken

class ChickenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chicken
        fields = ('id', 'brand','name','content')