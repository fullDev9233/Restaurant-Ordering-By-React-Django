import scipy as sp
import pandas as pd
import numpy
import warnings
from matplotlib import pyplot as plt
import surprise

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
import django
django.setup()

from chickens.models import Rating, Shop, Item
from .models import Ranking, Recommend


class Recommender:
    def __init__(self):
        #data to Dictionary 함수
        #UserId를 담을 리스트 (중복X)
        self.name_list = []
        #치킨 목록을 담을 set (중복O)
        self.chk_set = set()
        self.rest_list = []
        self.rating_dic = {
            'username' : [],
            'chickenID' : [],
            'rating' : []
        }
        return

    def make_record(self) :
        self.data=pd.DataFrame(columns=['username', 'chickenID', 'rating'])
        if Ranking.objects.count() > 0:
            return
        else:
            data = pd.read_csv('./Yreview.csv')

            #data 구조 to pandas DataFrame
            df = data[['Restaurant','UserID','Menu','Total']]

            #문자열 '/' 기준 앞의 요소들만 남기고 삭제. ※데이터 형태 :  메인메뉴 / 사이드 
            for index, value in enumerate(df['Menu']):
                df['Menu'][index] = df['Menu'][index].split('/')[0]

            for index, value in enumerate(df['UserID']):
                df['UserID'][index] = df['UserID'][index].replace("님", "")

            print(df.tail()) #변경된 DataFrame 형태출력

            #data to Dictionary 함수
            def recur_dictify(frame):
                if len(frame.columns) == 1:
                    if frame.values.size == 1 : return frame.values[0][0]
                    return frame.values.squeeze()
                grouped = frame.groupby(frame.columns[0])
                d = {k: recur_dictify(g.ix[:,1:]) for k,g in grouped}
                return d

            #df_to_dict 변수에 dataframe을 사전 형식으로 저장
            df_to_dict = recur_dictify(df)

            #UserId를 담을 리스트 (중복X)
            name_list = []
            #치킨 목록을 담을 set (중복O)
            chk_set = set()
            rest_list = []

            for rest_key in df_to_dict:
                rest_list.append(rest_key)

                for user_key in df_to_dict[rest_key]:
                    name_list.append(user_key)
                
                    for chk_key in df_to_dict[rest_key][user_key]:
                        chk_set.add(chk_key)

            # 치킨 메뉴목록 확인
            #print(chk_set)
            # 리스트 화
            chk_list = list(chk_set)

            #사용자 수 만큼 반복
            for rest_key in df_to_dict:
                for name_key in df_to_dict[rest_key] :
                    #사용자가 구매한 치킨의 수 만큼 반복
                    for chk_key in df_to_dict[rest_key][name_key]: 
                        a3 = df_to_dict[rest_key][name_key][chk_key]
                        try:
                            a4 = Shop.objects.get(name__contains=rest_key).id
                            a5 = Item.objects.get(name=chk_key, shop=a4).id
                            
                            #Dictionary & Django DB에 저장
                            #만약 사용자 ID 중복으로 인해 한 메뉴에 여러 평점이 들어갔으면, 첫번째 평점만 저장
                            if type(a3) is not numpy.ndarray:
                                ranking = Ranking(username=name_key, rate=a3, chickenID=a5)
                            else:
                                ranking = Ranking(username=name_key, rate=a3[0], chickenID=a5)
                            ranking.save()
                        except Shop.DoesNotExist:
                            continue
                        except Shop.MultipleObjectsReturned:
                            length = len(list(Shop.objects.filter(name__contains=rest_key)))
                            for i in range(length) :
                                if i == 0 :
                                    continue
                                else :
                                    temp = Shop.objects.filter(name__contains=rest_key)[i]
                                    temp.delete()
                            a4 = Shop.objects.get(name__contains=rest_key).id
                            a5 = Item.objects.get(name=chk_key, shop=a4).id
                            if type(a3) is not numpy.ndarray:
                                ranking = Ranking(username=name_key, rate=a3, chickenID=a5)
                            else:
                                ranking = Ranking(username=name_key, rate=a3[0], chickenID=a5)
                            ranking.save()
                        except Item.DoesNotExist:
                            continue


    def read_DB(self, flag):
        self.data=pd.DataFrame(columns=['username', 'chickenID', 'rating'])
        if flag == 0 :
            for values in Ranking.objects.all():
                a = pd.DataFrame(data=[[values.username, values.chickenID, values.rate]],columns=['username', 'chickenID', 'rating'])
                self.data = self.data.append(a)
                self.data = self.data.reset_index(drop=True)
                self.data = self.data.drop_duplicates(keep='first')
        else:
            value = Ranking.objects.last()
            a = pd.DataFrame(data=[[value.username, value.chickenID, value.rate]],columns=['username', 'chickenID', 'rating'])
            self.data = self.data.append(a)
            self.data = self.data.reset_index(drop=True)
            self.data = self.data.drop_duplicates(keep='first')

        print(self.data.tail())

        self.df = self.data[['username', 'chickenID', 'rating']]

        def recur_dictify(frame):
            if len(frame.columns) == 1:
                if frame.values.size == 1 : return frame.values[0][0]
                return frame.values.squeeze()
            grouped = frame.groupby(frame.columns[0])
            d = {k: recur_dictify(g.ix[:,1:]) for k,g in grouped}
            return d

        #df_to_dict 변수에 dataframe을 사전 형식으로 저장
        self.df_to_dict = recur_dictify(self.df)

        for user_key in self.df_to_dict:
            self.name_list.append(user_key)

            for chk_key in self.df_to_dict[user_key]:
                self.chk_set.add(chk_key)

        # 치킨 메뉴목록 확인
        #print(chk_set)
        # 리스트 화
        self.chk_list = list(self.chk_set)

        #사용자 수 만큼 반복
        for name_key in self.df_to_dict:
            #사용자가 구매한 치킨의 수 만큼 반복
            for chk_key in self.df_to_dict[name_key]:
                
                #사용자 인덱스 번호 추출
                a1 = self.name_list.index(name_key)
                #치킨 메뉴 인덱스 번호 추출
                a2 = self.chk_list.index(chk_key)
                #사용자-치킨메뉴 의 평점 추출 
                a3 = self.df_to_dict[name_key][chk_key]
                #Dictionary & Django DB에 저장
                self.rating_dic['username'].append(a1)
                self.rating_dic['chickenID'].append(a2)
                #만약 사용자 ID 중복으로 인해 한 메뉴에 여러 평점이 들어갔으면, 첫번째 평점만 저장
                if type(a3) is not numpy.ndarray:
                    self.rating_dic['rating'].append(a3)
                else:
                    self.rating_dic['rating'].append(a3[0])

        #사전을 기반으로 DataSet 생성
        self.df = pd.DataFrame(self.rating_dic)
        #print(df)


        #reader 객체로 Data읽기. rating scale은 평점의 범위 `1~5`
        reader = surprise.Reader(rating_scale=(1,5))

        #Surprise 에서 사용할 데이터 셋 userid=id, menu=치킨메뉴, Total=평점
        col_list = ['username','chickenID','rating']
        self.data = surprise.Dataset.load_from_df(self.df[col_list], reader)

        #Trainset에 입력한 Data로 학습
        trainset = self.data.build_full_trainset()
        option = {'name':'pearson'}
        self.algo = surprise.KNNBasic(sim_options=option) #KNN 유사도 알고리즘 사용

        self.algo.fit(trainset)


    def recsys(self, searchname) :
        # 치킨 추천 닉네임은 csv파일에 있는 id 아무거나 쓰면됨 양식 'hw**님' ※'님' 까지 붙여야함
        who = searchname

        index = self.name_list.index(who)
        # print('user_index:',index)
        # print('\n')

        result = self.algo.get_neighbors(index, k=5) #Knn 모델의 K값 '5'로 지정 유사사용자 5명으로부터 화장품 추천
        # print('치킨 취향이 비슷한 사용자 : ',result)
        # print('\n')

        # print('추천 치킨:','\n')

        for r1 in result :
            max_rating=self.data.df[self.data.df["username"]==r1]["rating"].max()
            chk_id=self.data.df[(self.data.df["rating"]==max_rating)&(self.data.df["username"]==r1)]["chickenID"].values
            
            for chk_item in chk_id:
                val = Item.objects.get(id=self.chk_list[chk_item])
                try:
                    Recommend.objects.get(username=searchname, chickenID=val.id)
                except:
                    recm_chicken = Recommend(username=searchname, chickenID=val.id)
                    recm_chicken.save()
                else:
                    continue;