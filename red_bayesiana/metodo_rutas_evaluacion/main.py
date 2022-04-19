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

URL = "http://159.223.190.216/arbol/caminoslibreria"
respuestaDelServidor = requests.get(url = URL).json()
caminos = respuestaDelServidor['caminos']

saltos = 1
tema_objetivo = 73
ponderacion_objetiva = 90

CONTRUCTOR_BN = RED_BAYESIANA(['MPCN',tema_objetivo,ponderacion_objetiva,saltos])
SRB = CONTRUCTOR_BN.obtenerSubRed()
RBM = CONTRUCTOR_BN.obtenerRedCompleta()

CAMINOS_SRB = CONTRUCTOR_BN.obtenerCaminosSubRed(tema_objetivo, saltos, caminos)
RBMA = {}

#Inicialización de la RBMA
for nodo in RBM.nodes():
    nodo_rbm = NODO(RBM.variable(nodo).name(), 1)
    if RBM.variable(nodo).name() == str(tema_objetivo):
        nodo_rbm.poderacion = ponderacion_objetiva
        nodo_rbm.clasificacion = 3
    for tema in respuestaDelServidor['temas']:
        if RBM.variable(nodo).name() == str(tema['id']):
            nodo_rbm.dificultad = tema['dificultad']
    RBMA[RBM.variable(nodo).name()] = nodo_rbm

INSTANCIA_MPCN = MPCN(RBMA, CAMINOS_SRB, tema_objetivo, ponderacion_objetiva)
INSTANCIA_MPCN.ponderarNodos()
INSTANCIA_MPCN.hacerInferencias(RBM)
INSTANCIA_MPCN.promediarInferencias(SRB)
NODOS = INSTANCIA_MPCN.obtenerNodos()

items = []
#RBMA
for nodo in NODOS:
    NODOS[nodo].discriminacion = 1 #
    NODOS[nodo].adivinacion = NODOS[nodo].matriz_inferencia[2] / 100
    NODOS[nodo].asintota = 1 #
    if not (NODOS[nodo].id == "1" or NODOS[nodo].id == "2" or NODOS[nodo].id == "14" or NODOS[nodo].id == "20" or NODOS[nodo].id == "13" or NODOS[nodo].id == "17" or NODOS[nodo].id == "40" or NODOS[nodo].id == "51" or NODOS[nodo].id == "52"):
        item = [ NODOS[nodo].discriminacion, NODOS[nodo].dificultad, NODOS[nodo].adivinacion, NODOS[nodo].asintota, 0.0  ]
        items.append(item)

items = numpy.array(items)

# ==================== OBTENER LOS TEMAS EVALUADOS CON LA SRB ==========
temas_evaluados = []
respuestas = []
for nodo in SRB.nodes():
    nombre_nodo = SRB.variable(nodo).name()
    i=0
    for nodo in NODOS:
        if NODOS[nodo].id == nombre_nodo:
            temas_evaluados.append(i)
        i=i+1
    if (NODOS[nombre_nodo].matriz_inferencia_final[0] >= NODOS[nombre_nodo].matriz_inferencia_final[1]) and (NODOS[nombre_nodo].matriz_inferencia_final[0] >= NODOS[nombre_nodo].matriz_inferencia_final[2]):
        respuestas.append(False)
    else:
        respuestas.append(True)
# ==============================

# Los temas que han sido evaluados
initializer = RandomInitializer()
selector = MaxInfoSelector()
estimator = NumericalSearchEstimator()
stopper = MaxItemStopper(10)

#temas_evaluados = [31, 109, 42]
#respuestas = [False, False, True]
#est_theta = initializer.initialize()
est_theta = 0.0
new_theta = estimator.estimate(items=items, administered_items=temas_evaluados, response_vector=respuestas, est_theta=est_theta)
_stop = stopper.stop(administered_items=items[temas_evaluados], theta=est_theta)
sig_tema = selector.select(items=items, administered_items=temas_evaluados, est_theta=est_theta)

print("NODOS EVALUADOS ==================================")
for evaluado in temas_evaluados:
    print("ID NODO: " + str( NODOS[ list(NODOS)[evaluado] ].id ) )
    print("DIFICULTAD: " + str( NODOS[ list(NODOS)[evaluado] ].dificultad ) )
    print("RESPUESTA: " + str(respuestas[ temas_evaluados.index(evaluado) ]))
    print("_____________________")
print("NODO SIGUIENTE ==================================")
print("ID NODO: " + str(  NODOS[ list(NODOS)[sig_tema] ].id )  )
print("DIFICULTAD: " + str(  NODOS[ list(NODOS)[sig_tema] ].dificultad )  )

temas_evaluados = []
respuestas = []
for nodo in SRB.nodes():
    nombre_nodo = SRB.variable(nodo).name()
    i=0
    for nodo in RBMA:
        if RBMA[nodo].id == nombre_nodo:
            temas_evaluados.append(i)
        i=i+1
    if (RBMA[nombre_nodo].matriz_inferencia_final[0] >= RBMA[nombre_nodo].matriz_inferencia_final[1]) and (RBMA[nombre_nodo].matriz_inferencia_final[0] >= RBMA[nombre_nodo].matriz_inferencia_final[2]):
        respuestas.append(False)
    else:
        respuestas.append(True)