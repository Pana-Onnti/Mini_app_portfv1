from django.shortcuts import render
from .models import Cartera
from .models import Activo
import datetime
import matplotlib.pyplot as plt
import base64
import io
from django.shortcuts import render, redirect
from django.urls import reverse



def addActivo(request):
    name = request.POST['nombre']
    description=request.POST['descripcion']
    price=request.POST['precio']
    clave = request.POST['clave']
    Activo.objects.create(
        name=name , description=description, price=price,cartera = Cartera.objects.get(name=clave)
    )
    return redirect(reverse(Home))


def guardar_datos(request):
    nombre = request.POST.get('nombre')
    
    # Aquí puedes guardar los datos en la base de datos
    return render(request,{'nombre':nombre})

class GraficadorInterface:
    def crear_grafico(self, labels, data):
        pass

class MatplotlibGraficador(GraficadorInterface):
    def crear_grafico(self, labels, data):
        fig, ax = plt.subplots()
        ax.pie(data, labels=labels, autopct='%1.1f%%')
        #ax.set_title('')
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)
        image = buffer.getvalue()
        buffer.close()
        return base64.b64encode(image).decode('utf-8')

class GraficadorFactory:
    @staticmethod
    def obtener_graficador():
        return MatplotlibGraficador()

def crear_grafico(labels, data):
    graficador = GraficadorFactory.obtener_graficador()
    return graficador.crear_grafico(labels, data)

def obtener_hora_actual():
    return datetime.datetime.now()

#def renderizar_plantilla(request,hora_actual, graphic):
#    return render(request, 'Diario.html', {'hora': hora_actual, 'graphic': graphic})

def Home(request):
    activos = Activo.objects.all()
    labels = [activo.name for activo in activos]
    data = [activo.price for activo in activos]
    graphic = crear_grafico(labels, data)
    hora_actual = obtener_hora_actual()

    #
    price = sum(activo.price for activo in activos) 
    #
    return render(request, 'home.html', { 'price':price,'activos':activos, 'hora': hora_actual, 'graphic': graphic})