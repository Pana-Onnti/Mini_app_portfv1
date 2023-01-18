import yfinance as yf 
import pandas as pd 
import numpy as np
def Stock (nombre):
  dato_anual = []
  try:
    data = pd.DataFrame(yf.Ticker(nombre).history(period='1mo'))
    valor = data['Close'].iloc[-1]
    fecha_mes, fecha_anio = data.iloc[-1].name.month , data.iloc[-1].name.year  
    for x in range(12):
      dato= data['Close'].iloc[-x]
      dato_anual.append(round(dato,3))
  except :
    print("Ocurrió un error: El ticker es invalido")
  finally:
    return valor , fecha_mes , fecha_anio , dato_anual

def Cotizacion(Carter):
  nombres = []
  precios = []
  error = []
  for nombre in Carter :
    try:
      data = pd.DataFrame(yf.Ticker(nombre).history(period='1mo'))
      valor = round(data['Close'].iloc[-1],3)
      fecha_mes, fecha_anio = data.iloc[-1].name.month , data.iloc[-1].name.year
      nombres.append(nombre), precios.append(valor)
    except:
      error.append(nombre) 
  total = np.array(precios, dtype = int).sum()
  matrix = np.column_stack((nombres, precios,np.array(precios, dtype = int)))
  return total ,matrix , error 