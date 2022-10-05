import numpy as np
import cargarTemas
temas= cargarTemas.temas()
indices=temas[0]
padres=temas[1]
padres_ids=temas[2]


 
conteo=np.zeros((len(padres),3))
porcentajes=np.zeros((len(padres),3))
#for i in range (len(padres)):
#  print(conteo[i])
cantAlumnos=0
with open("dataset2.csv") as fname:
    lineas = fname.readlines()
    for linea in lineas:
      #print(linea)
      if linea!="":
        cantAlumnos+=1
        gdcs= linea.split(sep=',')
        #print(gdcs)
        for j in range(len(gdcs)-1):
          #print(gdcs[j])
          conteo[j][int(gdcs[j])-1]+=1

for i in range (len(padres)):
  for j in range(3):
        porcentajes[i][j]=conteo[i][j]/cantAlumnos
      
for i in range(len(conteo)):
  print(padres[i][0])
  print("GDC 1: ", porcentajes[i][0]*100,"% ","GDC 2: ", porcentajes[i][1]*100,"% ","GDC 3: ", porcentajes[i][2]*100,"% ","\n\n")


