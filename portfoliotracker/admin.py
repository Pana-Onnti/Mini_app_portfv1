from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Board
from .models import Cartera
from .models import Activo
admin.site.register(Board)
admin.site.register(Activo)
admin.site.register(Cartera)