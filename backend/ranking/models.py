from django.db import models

class Ranking(models.Model):
    objects = models.Manager()
    username = models.CharField(max_length=120)
    chickenID = models.IntegerField(default=0)
    rate = models.IntegerField(default=0)

    def __str__(self):
        return self.username

class Recommend(models.Model):
    class Meta:
        unique_together =[['username', 'chickenID']]

    objects = models.Manager()
    username = models.CharField(max_length=120)
    chickenID = models.IntegerField(default=0)