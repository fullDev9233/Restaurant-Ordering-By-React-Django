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
from ranking.models import Ranking

warnings.filterwarnings('ignore')

data = pd.read_csv('./Chicken_review.csv',encoding='CP949')

'''
#data 출력 - UserID
print(data['UserID'])
#data 출력 - 리뷰
print(data['Review'])
#data 출력 - 메뉴
print(data['Menu'])
#data 출력 - 평점
print(data['Total'])
'''

#data 구조 출력 Colum - Restaurant - UserID - Menu - Review - Total
print(data.tail())

#data 구조 to pandas DataFrame
df = data[['Restaurant','UserID','Menu','Total']]

#data 형태출력
#print(df.tail())

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

#사전화 된 각각의 Colum들을 indexing 하여 저장할 Dictionary
rating_dic = {
    'Restaurant' : [],
    'UserID' : [],
    'Menu' : [],
    'Total' : []
}

#사용자 수 만큼 반복
for rest_key in df_to_dict:
    for name_key in df_to_dict[rest_key] :
        #사용자가 구매한 치킨의 수 만큼 반복
        for chk_key in df_to_dict[rest_key][name_key]:
            
            a0 = rest_list.index(rest_key)
            #사용자 인덱스 번호 추출
            a1 = name_list.index(name_key)
            #치킨 메뉴 인덱스 번호 추출
            a2 = chk_list.index(chk_key)
            #사용자-치킨메뉴 의 평점 추출 
            a3 = df_to_dict[rest_key][name_key][chk_key]
            try:
                print(rest_key, name_key, chk_key)
                a4 = Shop.objects.get(name__contains=rest_key).id
                a5 = Item.objects.get(name=chk_key, shop=a4).id
                
                #Dictionary & Django DB에 저장
                rating_dic['Restaurant'].append(a0)
                rating_dic['UserID'].append(a1)
                rating_dic['Menu'].append(a2)
                #만약 사용자 ID 중복으로 인해 한 메뉴에 여러 평점이 들어갔으면, 첫번째 평점만 저장
                if type(a3) is not numpy.ndarray:
                    rating_dic['Total'].append(a3)
                    ranking = Ranking(username=name_key, rate=a3, chickenID=a5)
                else:
                    rating_dic['Total'].append(a3[0])
                    ranking = Ranking(username=name_key, rate=a3[0], chickenID=a5)
                ranking.save()
            except Shop.DoesNotExist:
                continue
            except Item.DoesNotExist:
                continue
            
print('각 Dic의 data 수 : ',len(rating_dic['UserID']),len(rating_dic['Menu']),len(rating_dic['Total']))


#사전을 기반으로 DataSet 생성
df = pd.DataFrame(rating_dic)
#print(df)


#reader 객체로 Data읽기. rating scale은 평점의 범위 `1~5`
reader = surprise.Reader(rating_scale=(1,5))

#Surprise 에서 사용할 데이터 셋 userid=id, menu=치킨메뉴, Total=평점
col_list = ['UserID','Menu','Total']
data = surprise.Dataset.load_from_df(df[col_list], reader)

bsl_options1 = {
    'method': 'als',
    'n_epochs': 5,
    'reg_u': 12,
    'reg_i': 5
}

#Trainset에 입력한 Data로 학습
trainset = data.build_full_trainset()
option = {'name':'pearson'}
algo = surprise.KNNBaseline(sim_options=option,bsl_options = bsl_options1) #KNN BaseLine 유사도 알고리즘 사용

algo.fit(trainset)

# 치킨 추천 닉네임은 csv파일에 있는 id 아무거나 쓰면됨 양식 'hw**님' ※'님' 까지 붙여야함
who = input('input nickname : ')
print('\n')

index = name_list.index(who)
print('user_index:',index)
print('\n')

result = algo.get_neighbors(index, k=7) #Knn 모델의 K값 '7'로 지정 유사사용자 7명으로부터 치킨 추천
print('치킨 취향이 비슷한 사용자 : ',result)
print('\n')

print('추천 치킨:','\n')

for r1 in result :
    max_rating=data.df[data.df["UserID"]==r1]["Total"].max()
    chk_id=data.df[(data.df["Total"]==max_rating)&(data.df["UserID"]==r1)]["Menu"].values
    print(chk_id)
    
    for chk_item in chk_id:
        print(chk_list[chk_item])
