from django.shortcuts import render
from django.http import HttpResponse 
from .models import Board
from .models import Cartera
from .models import Activo
from django.db import models
from .retornos import Stock
from .retornos import Cotizacion
import datetime



# Create your views here.
#globales# 
clave = 3
if clave > len(Cartera.objects.all()): clave = 1
#cartera = Cartera.objects.get(id=clave)
activos = Activo.objects.filter(cartera=Cartera.objects.get(id=clave))
# prueba
asd = ['KO','TSLA']
cotizacion = Cotizacion(asd)
cotizacion = cotizacion[0]
price = sum(activo.price for activo in activos) 




def home(request):
    boards = Board.objects.all()
    carteras = Cartera.objects.all()
    activos = Activo.objects.all()
    global price 
    valor = Stock('KO')
    dato_anual =  valor[3]

    
    return render(request, 'home.html', {'boards': boards ,'carteras':carteras,'activos':activos, 'price':price, 'dato_anual' : dato_anual})


def addActivo(request):
    name = request.POST['nombre']
    description=request.POST['descripcion']
    price=request.POST['precio']
    clave = request.POST['clave']
    Activo.objects.create(
        name=name , description=description, price=price,cartera = Cartera.objects.get(name=clave)
    )

def Grafico (request):
    clave = 3
    if clave > len(Cartera.objects.all()): clave = 1
    cartera = Cartera.objects.get(id=clave)
    #resultados =  Activo.objects.filter(cartera=cartera).values()
    resultados= Activo.objects.filter(cartera=cartera)
    nombre = resultados[0].name , len(resultados)
    nombre = []
    for x in range(len(resultados)):
        nombre.append(resultados[x].name)
    activos = Activo.objects.filter(cartera=cartera)
    price = sum(activo.price for activo in activos)
    valor = Stock('AMZN')
    valor1 = round(valor[0],3)
    dato_anual =  [111.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2, 22.0, 17.8]
    asd = nombre
    ####
    error = 0
    #correcion de precio total si la accion no existe# 
    for x in range(len(Cotizacion(asd)[2])):
        nota = (Cotizacion(asd)[2])
        a = nota[x]
        b = Activo.objects.filter(name=a)
        c = b[0].price 
        error += c 
    cotizacion = 'el valor actual es de ',  (Cotizacion(asd)[0]-price) + error
            

    
    return render(request, 'Grafico.html',{'cartera':cartera ,'error':error,'nombre':nombre,'cotizacion':cotizacion, 'resultados':resultados ,'price':price , 'valor':valor1 , 'dato_anual':dato_anual } )


def guardar_datos(request):
    nombre = request.POST.get('nombre')
    
    # Aquí puedes guardar los datos en la base de datos
    return render(request,{'nombre':nombre})


def Diario_Trade (request):
    hora = datetime.datetime.now()
    return render(request,'Diario.html',{'hora':hora})