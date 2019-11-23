from django.db import models

class Chicken(models.Model):
    objects = models.Manager()
    brand = models.CharField(max_length=120)
    name = models.CharField(max_length=120)
    desc = models.TextField()

    def __str__(self):
        return self.name