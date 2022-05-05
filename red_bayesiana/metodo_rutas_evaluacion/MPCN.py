import pyAgrum as gum
import numpy as numpy

#En bash <python MPCN.py 'id_nodo' 'ponderación' 'saltos'>
class MPCN:
    def __init__(self, NODOS, caminos_ordenados, tema_objetivo, ponderacion_objetiva):
        self.NODOS = NODOS
        self.caminos_ordenados = caminos_ordenados
        self.tema_objetivo = str(tema_objetivo)
        self.ponderacion_objetiva = ponderacion_objetiva

    def ponderarNodos(self,SRB):
        orden_evaluados=-1
        for nodo in self.NODOS:
            if self.NODOS[nodo].orden_evaluacion != -1:
                orden_evaluados=orden_evaluados+1

        self.NODOS[self.tema_objetivo].ponderacion = self.ponderacion_objetiva
        self.NODOS[self.tema_objetivo].orden_evaluacion = orden_evaluados + 1
        self.NODOS[self.tema_objetivo].clasificacion = 3
        
        for camino in self.caminos_ordenados['abajo']:
            ponderacion = self.ponderacion_objetiva
            saltos = 1
            for nodo in camino:
                nodo_str = str(nodo)
                ponderacion = ponderacion * 0.5
                if saltos > 3:
                    if self.NODOS[nodo_str].clasificacion != 4:
                        self.NODOS[nodo_str].clasificacion = 5
                        self.NODOS[nodo_str].ponderacion = 2
                        self.NODOS[nodo_str].sumatoria_ponderaciones = 0
                else:
                    if self.NODOS[nodo_str].clasificacion == 5:
                        self.NODOS[nodo_str].sumatoria_ponderaciones = ponderacion
                        self.NODOS[nodo_str].contador = 1
                    else:
                        self.NODOS[nodo_str].sumatoria_ponderaciones = self.NODOS[nodo_str].sumatoria_ponderaciones + ponderacion
                        
                    self.NODOS[nodo_str].ponderacion = self.NODOS[nodo_str].sumatoria_ponderaciones / self.NODOS[nodo_str].contador
                    self.NODOS[nodo_str].clasificacion = 4
                    self.NODOS[nodo_str].contador = self.NODOS[nodo_str].contador + 1
                saltos = saltos + 1

        for camino in self.caminos_ordenados['arriba']:
            ponderacion = self.ponderacion_objetiva
            for nodo in camino:
                nodo_str = str(nodo)
                ponderacion = ponderacion * 1.25
                if ponderacion > 100:
                    ponderacion = 100
                self.NODOS[nodo_str].clasificacion = 4
                self.NODOS[nodo_str].sumatoria_ponderaciones = self.NODOS[nodo_str].sumatoria_ponderaciones + ponderacion
                self.NODOS[nodo_str].ponderacion = self.NODOS[nodo_str].sumatoria_ponderaciones / self.NODOS[nodo_str].contador
                self.NODOS[nodo_str].contador = self.NODOS[nodo_str].contador + 1

        for nodo in SRB.nodes():
            nodoSRB = SRB.variable(nodo).name()  
            self.NODOS[nodoSRB].matriz_ponderacion = [0,0,0] #Resetear la matriz de ponderación
            if self.NODOS[nodoSRB].ponderacion >= 0.0 and self.NODOS[nodoSRB].ponderacion <= 66.0:
                self.NODOS[nodoSRB].matriz_ponderacion[0] = 100
                self.NODOS[nodoSRB].grado_de_conocimiento = 0
            elif self.NODOS[nodoSRB].ponderacion > 66.0 and self.NODOS[nodoSRB].ponderacion <= 83.0:
                self.NODOS[nodoSRB].matriz_ponderacion[1] = 100
                self.NODOS[nodoSRB].grado_de_conocimiento = 1
            else:
                self.NODOS[nodoSRB].matriz_ponderacion[2] = 100
                self.NODOS[nodoSRB].grado_de_conocimiento = 2

    def hacerInferencias(self, RB):
        ie = gum.LazyPropagation(RB)
        ie.setEvidence({str(self.tema_objetivo): self.NODOS[str(self.tema_objetivo)].grado_de_conocimiento})
        ie.makeInference()
        for nodo in RB.nodes():
            nombre_nodo = RB.variable(nodo).name()
            self.NODOS[nombre_nodo].matriz_inferencia[0] = ie.posterior(nombre_nodo)[0] * 100
            self.NODOS[nombre_nodo].matriz_inferencia[1] = ie.posterior(nombre_nodo)[1] * 100
            self.NODOS[nombre_nodo].matriz_inferencia[2] = ie.posterior(nombre_nodo)[2] * 100

    def promediarInferencias(self, RB):
        for nodo in RB.nodes():
            nombre_nodo = RB.variable(nodo).name()
            self.NODOS[nombre_nodo].matriz_inferencia_final[0] = (self.NODOS[nombre_nodo].matriz_inferencia[0] +
                                                                  self.NODOS[nombre_nodo].matriz_ponderacion[0]) / 2
            self.NODOS[nombre_nodo].matriz_inferencia_final[1] = (self.NODOS[nombre_nodo].matriz_inferencia[1] +
                                                                  self.NODOS[nombre_nodo].matriz_ponderacion[1]) / 2
            self.NODOS[nombre_nodo].matriz_inferencia_final[2] = (self.NODOS[nombre_nodo].matriz_inferencia[2] +
                                                              self.NODOS[nombre_nodo].matriz_ponderacion[2]) / 2

    def obtenerNodos(self):
        return self.NODOS


    def obtenerItems(self):
        items = []
        for nodo in self.NODOS:
            self.NODOS[nodo].discriminacion = 1  #

            if self.NODOS[nodo].matriz_inferencia[0] == 0 and self.NODOS[nodo].matriz_inferencia[1] == 0 and self.NODOS[nodo].matriz_inferencia[2] == 0:
                self.NODOS[nodo].adivinacion = self.NODOS[nodo].matriz_inferencia_final[0] / 100
            else:
                self.NODOS[nodo].adivinacion = self.NODOS[nodo].matriz_inferencia[0] / 100

            self.NODOS[nodo].asintota = 1  #

            if not (self.NODOS[nodo].id == "1" or self.NODOS[nodo].id == "2" or self.NODOS[nodo].id == "14" or self.NODOS[
                nodo].id == "20" or self.NODOS[nodo].id == "13" or self.NODOS[nodo].id == "17" or self.NODOS[nodo].id == "40" or self.NODOS[
                        nodo].id == "51" or self.NODOS[nodo].id == "52"):
                item = [self.NODOS[nodo].discriminacion, self.NODOS[nodo].dificultad, self.NODOS[nodo].adivinacion,
                        self.NODOS[nodo].asintota, 0.0]
                items.append(item)

        items = numpy.array(items)
        return items