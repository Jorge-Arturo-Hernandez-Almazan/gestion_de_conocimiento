import pickle
import mysql.connector

nombre_rbma_pickle = "rbma/rbma_1730335.pkl" #pickle
infile = open(nombre_rbma_pickle,'rb')
RBMA = pickle.load(infile)
infile.close()
for i in RBMA[1]:
  tema = [ RBMA[1][i].id, RBMA[1][i].clasificacion, RBMA[1][i].ponderacion, RBMA[1][i].sumatoria_ponderaciones, RBMA[1][i].contador, RBMA[1][i].grado_de_conocimiento, RBMA[1][i].matriz_ponderacion, RBMA[1][i].matriz_inferencia, RBMA[1][i].matriz_inferencia_final, float(RBMA[1][i].dificultad), float(RBMA[1][i].discriminacion), float(RBMA[1][i].adivinacion), RBMA[1][i].asintota, RBMA[1][i].orden_evaluacion ]
  print(tema)