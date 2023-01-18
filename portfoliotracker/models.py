from django.db import models




# Create your models here.

class Board(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description= models.CharField(max_length=100)
    def __str__(self):
        return self.name
        
class Cartera(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description= models.CharField(max_length=100)
    board= models.ForeignKey(Board, related_name='carteras' ,on_delete=models.CASCADE)
    def __str__(self):
        return self.name.capitalize()


class Activo(models.Model):
    name = models.CharField( max_length=50)
    description = models.CharField( max_length=50)
    price = models.IntegerField()
    cartera=models.ForeignKey(Cartera, related_name='activos', on_delete=models.CASCADE)
    def __str__(self):
        return self.name

