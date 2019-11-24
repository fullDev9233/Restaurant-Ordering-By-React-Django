from rest_framework import serializers
from .models import Ranking, Recommend

class RankingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ranking
        fields = ('id', 'username','chickenID','rate')

class RecommendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommend
        fields = ('id', 'username','chickenID')