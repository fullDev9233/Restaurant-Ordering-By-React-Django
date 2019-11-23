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
from favorite.models import Favorite
from favorite.serializers import FavoriteSerializer


@api_view(['GET', 'POST'])
def favorite_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        favorite = Favorite.objects.all()
        serializer = FavoriteSerializer(favorite, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def favorite_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    print(pk)
    try:
        favorite = Favorite.objects.filter(username=pk)
    except Favorite.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = FavoriteSerializer(favorite, many=True)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # data = JSONParser().parse(request)
        serializer = FavoriteSerializer(favorite, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        favorite.delete()
        return Response(status=204)