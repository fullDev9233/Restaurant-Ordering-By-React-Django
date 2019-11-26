# from django.shortcuts import render
# from rest_framework import generics
# from .models import Ranking
# from .serializers import RankingSerializer

# class RankingListView(generics.ListCreateAPIView):
#     queryset = Ranking.objects.all()
#     serializer_class = RankingSerializer

# class RankingDetailView(generics.RetrieveUpdateDestroyAPIView):
#     # print(self.username)
#     queryset = Ranking.objects.all()
#     serializer_class = RankingSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ranking.models import Ranking, Recommend
from ranking.serializers import RankingSerializer, RecommendSerializer
from ranking.recsys import Recommender

recm = Recommender()
# Make these 2 lines as comment when migrate. This codes need when runserver
recm.make_record()
recm.read_DB(0)


@api_view(['GET', 'POST'])
def ranking_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        ranking = Ranking.objects.all()
        serializer = RankingSerializer(ranking, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = RankingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            recm.read_DB(1)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def ranking_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        ranking = Ranking.objects.filter(username=pk)
    except Ranking.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = RankingSerializer(ranking, many=True)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = RankingSerializer(ranking, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        ranking.delete()
        return Response(status=204)

@api_view(['GET'])
def recommend_list(request, pk):
    recm.recsys(pk)
    recommend = Recommend.objects.filter(username=pk)
    serializer = RecommendSerializer(recommend, many=True)
    return Response(serializer.data)
