from django.contrib import admin

# Register your models here.

from .models import Favorite

# admin.site.register(Ranking)
# class RankingAdmin(admin.ModelAdmin):
#     list_display = ('username', 'chickenID', 'rate')


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ['username', 'chickenID', 'rate']
    list_display_links = ['username']
    search_fields = ['username']   