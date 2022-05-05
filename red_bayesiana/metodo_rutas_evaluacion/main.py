import requests
from catsim.cat import generate_item_bank
from catsim.simulation import *
from catsim.initialization import *
from catsim.selection import *
from catsim.estimation import *
from catsim.stopping import *
import catsim.plot as catplot
from catsim.irt import icc
import matplotlib.pyplot as plt
from NODO import NODO
from RED_BAYESIANA import RED_BAYESIANA
from MPCN import MPCN
import pickle
import os.path
from os import path
import pyAgrum as gum
import random
from PRIMER_TEMA import PRIMER_TEMA
import sys

URL = "http://localhost/arbol/caminoslibreria"
respuestaDelServidor = requests.get(url = URL).json()
caminos = respuestaDelServidor['caminos']
CONTRUCTOR_BN = RED_BAYESIANA()

if len(sys.argv) == 2:
    id_alumno = sys.argv[1] # Matricula del alumno
    primer_tema = PRIMER_TEMA(URL)
    tema_elegido = primer_tema.calcularPrimerTema()
    print(tema_elegido)

elif len(sys.argv) == 6:
    ###### Información a ser pasada al módulo #####
    #id_alumno = 20
    #saltos = 1
    #tema_objetivo = 80
    #ponderacion_objetiva = 70
    ##############################################

    id_alumno = sys.argv[1]                 #Matricula del alumno
    saltos = sys.argv[2]                    #Número de saltos que compone los subgrafos
    tema_objetivo = sys.argv[3]      #Tema objetivo, nodo central del subgrafo
    ponderacion_objetiva = int(sys.argv[4]) #Ponderación objetiva que obtuvo en el último tema evaluado
    version_rbm = sys.argv[5]               #Versión de la red bayesiana maestra a utilizar

    nombre_rbma = "rbma_xml/rbma_alumno_"+str(id_alumno)+".bifxml" #RBMA
    nombre_rbma_pickle = "rbma_pickle/rbma_alumno_"+str(id_alumno)+".pkl" #pickle
    nombre_rmb = "rbm/rbm_"+version_rbm+".bifxml" #RBM
    
    CONTRUCTOR_BN = RED_BAYESIANA()

    CONTRUCTOR_BN.configurarRBM(nombre_rmb) # Asignamos el nombre de la Red Bayesiana Maestra a utilizar
    RBMA = {}
    RBMA_XML = ""
    if not path.exists(nombre_rbma_pickle):
        RBMA_XML = CONTRUCTOR_BN.obtenerRedCompleta() # se realiza una copia de la RBM
        for nodo in RBMA_XML.nodes():
            nodo_rbm = NODO(RBMA_XML.variable(nodo).name(), 1)
            for tema in respuestaDelServidor['temas']:
                if RBMA_XML.variable(nodo).name() == str(tema['id']):
                    nodo_rbm.dificultad = tema['dificultad']
            RBMA[RBMA_XML.variable(nodo).name()] = nodo_rbm
        with open(nombre_rbma_pickle, 'wb') as outp: # Almacenar la RBMA de manera persistente
            pickle.dump( RBMA, outp, pickle.HIGHEST_PROTOCOL)
        gum.saveBN(RBMA_XML, nombre_rbma)
    else:
        with open(nombre_rbma_pickle, 'rb') as inp:
            RBMA = pickle.load(inp)
        RBMA_XML = gum.loadBN(nombre_rbma)
    
    CONTRUCTOR_BN.configurarParametros([tema_objetivo,ponderacion_objetiva,saltos])
    SRB = CONTRUCTOR_BN.obtenerSubRed() # 508
    CAMINOS_SRB = CONTRUCTOR_BN.obtenerCaminosSubRed(tema_objetivo, saltos, caminos)
       
    INSTANCIA_MPCN = MPCN(RBMA, CAMINOS_SRB, tema_objetivo, ponderacion_objetiva)
    INSTANCIA_MPCN.ponderarNodos(SRB) #
    INSTANCIA_MPCN.hacerInferencias(RBMA_XML)
    INSTANCIA_MPCN.promediarInferencias(SRB)
    RBMA = INSTANCIA_MPCN.obtenerNodos()  #Se obtiene la RBMA actualizada con las inferenicas promediadas de la SRB
    
    for nodo in RBMA:
      
      if RBMA[nodo].matriz_inferencia_final != [0,0,0]
        print( RBMA[nodo].matriz_inferencia_final )
      
    
    exit()
    items = INSTANCIA_MPCN.obtenerItems() #Calcula las caracteristicas de Seudoadivinacion, Discriminzacion y Dificultad

    temas_evaluados = []
    temas_evaluados_ids = []
    respuestas = []
    for nodo in RBMA:
        if RBMA[nodo].clasificacion == 3:
            temas_evaluados.append(0)
            temas_evaluados_ids.append(0)
            respuestas.append(0)
    i=0
    for nodo in RBMA:
        if RBMA[nodo].clasificacion == 3:
            temas_evaluados_ids[RBMA[nodo].orden_evaluacion] =  RBMA[nodo].id
            temas_evaluados[RBMA[nodo].orden_evaluacion] = i
            if RBMA[nodo].ponderacion > 70:
                respuestas[RBMA[nodo].orden_evaluacion] = True
            else:
                respuestas[RBMA[nodo].orden_evaluacion] = False
        i=i+1

    # Elementos de CAT
    initializer = RandomInitializer()
    selector = MaxInfoSelector()
    estimator = NumericalSearchEstimator()
    stopper = MinErrorStopper(0.3) # Error estandar 0.3. Entre menos valor, más precision en la estimación

    est_theta = 0.0

    #primera_evluacion = True

    print(temas_evaluados)
    
    if temas_evaluados == 0:
        print("Primer tema a evaluar")

    #if primera_evluacion:
    #    nueva_theta = estimator.estimate(items=items, administered_items=temas_evaluados, response_vector=respuestas, est_theta=est_theta)
    #    primera_evluacion = False
    #else:
    #    nueva_theta = estimator.estimate(items=items, administered_items=temas_evaluados, response_vector=respuestas, est_theta=nueva_theta)
    #
    #_stop = stopper.stop(administered_items=items[temas_evaluados], theta=nueva_theta)
    #
    #sig_tema = selector.select(items=items, administered_items=temas_evaluados, est_theta=nueva_theta)

    #print("Debe detenerse la evaluacion? ", _stop)

    #with open(nombre_rbma_pickle, 'wb') as outp:
    #    pickle.dump( RBMA, outp, pickle.HIGHEST_PROTOCOL)

    #gum.saveBN(RBMA_XML, nombre_rbma) '''


else:
    print("-1")






