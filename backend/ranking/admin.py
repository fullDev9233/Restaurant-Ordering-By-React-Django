from django.contrib import admin

# Register your models here.

from .models import Ranking

# admin.site.register(Ranking)
# class RankingAdmin(admin.ModelAdmin):
#     list_display = ('username', 'chickenID', 'rate')


@admin.register(Ranking)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['username', 'chickenID', 'rate']
    list_display_links = ['username']
    search_fields = ['username']   