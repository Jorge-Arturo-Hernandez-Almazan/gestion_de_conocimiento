import aiohttp
import asyncio
import json
import sys

nombre = sys.argv[0]
idRB = sys.argv[1]
matricula = sys.argv[2]

def escribirDatos():
  #f = open("archivoConfiguracion.txt", "w")
  #f.write("Este será un archivo de configuración del alumno " + nombre + idRB + matricula )
  #f.close()
  #print("Datos guardados correctamente")
  
  
  # Opening JSON file
  caminos = open('caminos.json')
  data = json.load(caminos)
  print(data['caminos'])
  caminos.close()

  #print("Este será un archivo de configuración del alumno " + nombre + idRB + matricula)

escribirDatos()