import pickle
from NODO import NODO

nombre_rbma_pickle = "red_bayesiana/metodo_rutas_evaluacion/rbma/rbma_1530004.pkl" #pickle
#nombre_rbma_pickle = "rbma/rbma_1530004.pkl" #pickle
infile = open(nombre_rbma_pickle,'rb')
RBMA = pickle.load(infile)
infile.close()

for i in RBMA[1]:
  if RBMA[1][i].grado_de_conocimiento!=-1:
    print(str(RBMA[1][i].id)+"/"+str(RBMA[1][i].grado_de_conocimiento),",")
  else:
      if  RBMA[1][i].matriz_inferencia_final[0]==0 and RBMA[1][i].matriz_inferencia_final[1]==0 and RBMA[1][i].matriz_inferencia_final[2]==0:
        print(str(RBMA[1][i].id)+"/"+str(RBMA[1][i].matriz_inferencia.index(max(RBMA[1][i].matriz_inferencia))),",")
      else:
          print(str(RBMA[1][i].id)+"/"+str(RBMA[1][i].matriz_inferencia_final.index(max(RBMA[1][i].matriz_inferencia_final))),",")  