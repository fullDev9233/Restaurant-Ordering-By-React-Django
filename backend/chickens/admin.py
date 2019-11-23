from django.contrib import admin
from urllib.parse import quote
from django.utils.safestring import mark_safe
from .models import Shop, Item, Chicken,Rating
# Register your models here.

@admin.register(Chicken)
class ChickenAdmin(admin.ModelAdmin):
    list_display = ('brand', 'name', 'content','image')

@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ['name', 'address_link']
    list_display_links = ['name']

    def address_link(self, shop):
        if shop.address:
            url = 'https://map.naver.com/?query=' + quote(shop.address)
            return mark_safe('<a href="{}" target="_blank">{}</a>'.format(url, shop.address))
        return None
    address_link.short_description = '주소(네이버지도)'

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['shop', 'name']
    list_display_links = ['name']
    list_filter = ['shop']
    search_fields = ['name']

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ['name', 'Menu','Total']
    list_display_links = ['name']
    list_filter = ['name']
    search_fields = ['name']
