import json
import requests 
import random
import time
from django.core.files.base import ContentFile
from urllib.parse import urljoin
from fake_useragent import UserAgent 
import pandas as pd
import numpy as np

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
import django
django.setup()

from chickens.models import Shop, Item 

class Yogiyo:
    HOST = 'https://www.yogiyo.co.kr'
    
    def __init__(self, headers):
        self.headers = headers
    
    #요기요 내부 zip 코드로 해당 위치의 음식점 리스트 불러오기
    def get_restaurant_list_by_geo(self, zip_code,cate):
        url = self.HOST + '/api/v1/restaurants-geo/'
        params = dict(
            items=97,
            order='rank',
            page=0,
            search='치킨',
            zip_code=zip_code,
            cate=cate,
        ) #cate = category 치킨, 피자 등 음식 카테고리 지정
        res = requests.get(url, params=params, headers=self.headers)
        return res.json()
    
    def get_menu_list(self, restaurant_id): # restaurant_id를 지정해주면 그 레스토랑의 메뉴를 가지고 오겠다
        base_url = self.HOST + '/api/v1/restaurants/{restaurant_id}/menu/?add_photo_menu=original'
        url = base_url.format(restaurant_id=restaurant_id)
        res = requests.get(url, headers=self.headers)
        return res.json()

headers = {
    'X-ApiKey': 'iphoneap',
    'X-ApiSecret': 'fe5183cc3dea12bd0ce299cf110a75a2',
    'X-MOD-SBB-CTYPE': 'xhr'
} #url에 붙여서 전송할 header

yogiyo = Yogiyo(headers) #yogiyo 객체 함수로 url get
zip_code = '156070' # 서울특별시 동작구 흑석동 221 중앙대학교 의 요기요 내부 zipcode

restaurants = yogiyo.get_restaurant_list_by_geo('156070','치킨')['restaurants'] # 156070위치의 치킨 카테고리에 있는 음식점 크롤링
#df = pd.DataFrame.from_records(restaurants) # 음식점 목록의 pandas dataframe 화
#df.to_excel('Chicken_menu.xlsx') # 음식점 목록 xlsx파일로 저장 절대 Chicken_menu파일 수정 금지

cxf = pd.read_excel('Chicken_menu.xlsx')
res_id = cxf[['id']] # 음식점 목록 df에서 음식점의 id 열 추출


arr_rid = res_id.values # 음식점 id열 dataframe 을 list 형식으로 전환 
arr_rid = list(map(int, arr_rid)) #list 내부의 원소들을 Int 형식으로 변환
arr_rid.append(229431)

else_list = ['사이드','사이드 메뉴','소스','잇템','음료','추가','top_items',
            '사이드／음료','추가 메뉴','음료 메뉴','소스 추가 메뉴','음료메뉴',
            '피자','추가메뉴','BEVERAGE MENU','음료추가','음료 추가','소스추가',
            '소스 추가','밥 메뉴','밥','밥메뉴','튀김','튀김 메뉴','사이드메뉴',
            'photo_menu_items', '떡볶이','플러스메뉴','플러스 메뉴','음료 및 기타',
            '기타 메뉴','기타','기타메뉴','굽네 피자 시리즈','치킨과 함께하면 더욱 맛있는 잇템',
            '최강 사이드 메뉴','SIDE MENU','SIDE','음료수','음료수 추가','음료수 메뉴','음료 메뉴 추가',
            '마법의 샐러드 메뉴','떡볶이 세트']  #사이드 및 기타 치킨과 무관한 메뉴 제거

#print(arr_rid)
#print(type(arr_rid))

for rest in restaurants:
    if rest['id'] in arr_rid :
        try :
            data = Shop.objects.get(name=rest['name'])
        except Shop.DoesNotExist:
            latlng = '{lat},{lng}'.format(**rest)
            logo_url = urljoin(Yogiyo.HOST, rest['logo_url'])
            shop = Shop(name=rest['name'], latlng=latlng, meta=rest)
        
            logo_name = os.path.basename(logo_url)
            logo_data = requests.get(logo_url).content
            shop.photo.save(logo_name, ContentFile(logo_data), save=False)
            print('{name}: {lat},{lng}, {categories}, {logo_url}'.format(**rest))
            shop.save()
        else :
            continue
    else :
        print('\n')


for shop in Shop.objects.all():
    restaurant_id = shop.meta['id'] # 요기요 내에서의restaurant_id
    menu_list = yogiyo.get_menu_list(restaurant_id)
    print(shop.name)
    for sub_menu_list in menu_list:
        items = sub_menu_list['items']
        for item_meta in items:
            try:
                Item.objects.get(shop=shop, name=item_meta['name'])
            except Item.DoesNotExist:
                if item_meta['section'] not in else_list:
                    item = Item(shop=shop, name=item_meta['name'], amount=item_meta['price'], meta=item_meta)
                
                    item_image_url = item_meta.get('image', '') # image가 없는 메뉴도 있습니다.
                    if item_image_url:
                        item_image_url = urljoin(Yogiyo.HOST, item_meta['image'].split('?')[0])
                        item_image_name = os.path.basename(item_image_url)
                        item_image_data = requests.get(item_image_url).content
                        item.photo.save(item_image_name, ContentFile(item_image_data), save=False)
                    
                    # print('saving item : {}'.format(item.name))
                    item.save()
                else :
                    pass
            else :
                continue
