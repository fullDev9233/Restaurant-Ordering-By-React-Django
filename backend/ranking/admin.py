from django.contrib import admin

# Register your models here.

from .models import Ranking

admin.site.register(Ranking)
class RankingAdmin(admin.ModelAdmin):
    list_display = ('username', 'chickenID', 'rate')