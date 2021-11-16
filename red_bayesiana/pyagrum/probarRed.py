import pyAgrum as gum
import numpy as np
A=[['Matematicas'],
 ['Cálculo  Integral', 'Matematicas', 'Cálculo  Diferencial'],
 ['Antiderivadas', 'Cálculo  Integral'],
 ['Definición de la integral', 'Antiderivadas'],
 ['Reglas de integración inmediatas', 'Definición de la integral'],
 ['Métodos de integración', 'Reglas de integración inmediatas'],
 ['Integral definida', 'Métodos de integración'],
 ['Áreas bajo la curva', 'Integral definida'],
 ['Sólido de revolución', 'Áreas bajo la curva'],
 ['Volúmen de un sólido en revolución', 'Sólido de revolución'],
 ['Cálculo  Diferencial', 'Matematicas', 'Funciones  matemáticas'],
 ['Límites y continuidad', 'Cálculo  Diferencial'],
 ['Derivada', 'Límites y continuidad'],
 ['Razón de cambio', 'Derivada'],
 ['Reglas de derivación', 'Razón de cambio'],
 ['Razones de cambio relacionadas', 'Reglas de derivación'],
 ['Optimizacion', 'Razones de cambio relacionadas'],
 ['Funciones  matemáticas', 'Matematicas', 'Trigonometría'],
 ['Intervalos', 'Funciones  matemáticas'],
 ['Desigualdades - inecuaciones', 'Intervalos'],
 ['Conceptos de  funciones  matemáticas', 'Desigualdades - inecuaciones'],
 ['Formas de expresar funciones matemáticas',
  'Conceptos de  funciones  matemáticas'],
 ['Dominio y rango de una función',
  'Formas de expresar funciones matemáticas'],
 ['Funciones Trigonométricas', 'Dominio y rango de una función'],
 ['Modelado de funciones',
  'Funciones Trigonométricas',
  'Función  Valor absoluto',
  'Funciones  Logarítmicas',
  'Función  Exponencial',
  'Función Polinomial',
  'Función Cuadrática',
  'Función  Lineal'],
 ['Prueba xd', 'Modelado de funciones'],
 ['Función  Valor absoluto', 'Dominio y rango de una función'],
 ['Funciones  Logarítmicas', 'Dominio y rango de una función'],
 ['Función  Exponencial', 'Dominio y rango de una función'],
 ['Función Polinomial', 'Dominio y rango de una función'],
 ['Función Cuadrática', 'Dominio y rango de una función'],
 ['Función  Lineal', 'Dominio y rango de una función'],
 ['Geometría', 'Matematicas', 'Álgebra'],
 ['Álgebra  lineal', 'Geometría', 'Matematicas'],
 ['Sistema de n ecuaciones lineales con n incógnitas', 'Álgebra  lineal'],
 ['Matrices', 'Sistema de n ecuaciones lineales con n incógnitas'],
 ['Operaciones  con  matrices', 'Matrices'],
 ['Determinantes', 'Operaciones  con  matrices', 'Transpuesta'],
 ['Matriz  Inversa', 'Determinantes'],
 ['Solución de  sistemas de  ecuaciones  por matrices',
  'Matriz  Inversa',
  'Método de Gauss Jordan',
  'Regla  de  Cramer'],
 ['Solución de problemas reales con álgebra lineal',
  'Solución de  sistemas de  ecuaciones  por matrices'],
 ['Método de Gauss Jordan', 'Determinantes'],
 ['Regla  de  Cramer', 'Determinantes'],
 ['Transpuesta', 'Operaciones  con  matrices'],
 ['Trigonometría', 'Álgebra  lineal', 'Matematicas'],
 ['Tríangulos  oblicuángulos', 'Trigonometría'],
 ['Razones  trigonométricas',
  'Tríangulos  oblicuángulos',
  'Círculo  unitarioo'],
 ['Ángulos y sus  razones  trigonométricas', 'Razones  trigonométricas'],
 ['Identidades  trigonométricas', 'Ángulos y sus  razones  trigonométricas'],
 ['Ley de los Cosenos',
  'Identidades  trigonométricas',
  'Tríangulos  oblicuángulos'],
 ['Ley de los Senos', 'Ley de los Cosenos'],
 ['Solución de trángulos rectángulos',
  'Ley de los Senos',
  'Ecuaciones trigonometricas'],
 ['Solución de problemas reales con trigonometría',
  'Solución de trángulos rectángulos'],
 ['Ecuaciones trigonometricas', 'Identidades  trigonométricas'],
 ['Triángulos rectángulos', 'Trigonometría'],
 ['Círculo  unitarioo', 'Triángulos rectángulos'],
 ['Principios de la Geometría', 'Geometría'],
 ['Plano cartesiano2', 'Principios de la Geometría'],
 ['Recta', 'Plano cartesiano2'],
 ['Circunferencia', 'Recta'],
 ['Elipse', 'Circunferencia'],
 ['Hipérbola', 'Elipse'],
 ['Ángulos', 'Principios de la Geometría'],
 ['Polígonos', 'Ángulos'],
 ['Triángulos', 'Polígonos'],
 ['Cuadrilateros', 'Triángulos'],
 ['Postulados y teoremas', 'Cuadrilateros'],
 ['Perímetros áreas y volúmenes', 'Postulados y teoremas'],
 ['Relación métrica de la circunferencia', 'Perímetros áreas y volúmenes'],
 ['Congruencia de trángulos', 'Perímetros áreas y volúmenes'],
 ['Semezanjas de triangulos', 'Congruencia de trángulos'],
 ['Teorema de Euclides', 'Semezanjas de triangulos'],
 ['Teorema de Pitágoras', 'Semezanjas de triangulos'],
 ['Teorema de Thales de Mileto', 'Semezanjas de triangulos'],
 ['Álgebra', 'Matematicas', 'Aritmetica'],
 ['Expresiones algebraicas', 'Álgebra'],
 ['Operaciones básicas del álgebra', 'Expresiones algebraicas'],
 ['Lenguaje común y lenguaje algebraico', 'Operaciones básicas del álgebra'],
 ['Suma  y resta de  terminos algebraicos',
  'Lenguaje común y lenguaje algebraico'],
 ['Multiplicación de  términos algebraicos',
  'Suma  y resta de  terminos algebraicos'],
 ['División de polinomio entre polinomio',
  'Multiplicación de  términos algebraicos',
  'Multiplicación de polinomios',
  'División de polinomio entre monomio'],
 ['Multiplicación de polinomios', 'Multiplicación de  términos algebraicos'],
 ['Factorización ',
  'Multiplicación de polinomios',
  'División de  términos  algebraicos',
  'Fórmula general  para ecuaciones  de segundo grado'],
 ['Ecuaciones de  primer grado', 'Factorización ', ' Ecuaciones algebraicas'],
 ['Sistemas  de  ecuaciones ',
  'Ecuaciones de  primer grado',
  'Métodos analíticos para la resolución de sistemas de ecuaciones'],
 ['Solución de problemas reales con sistemas de ecuaciones',
  'Sistemas  de  ecuaciones '],
 ['Ecuaciones de segundo grado', 'Factorización ', 'Productos notables'],
 ['Solución de problemas reales con ecuaciones de segundo grado',
  'Ecuaciones de segundo grado'],
 ['Productos notables', 'Factorización ', 'Multiplicación de polinomios'],
 ['División de  términos  algebraicos',
  'Multiplicación de  términos algebraicos'],
 ['División de polinomio entre monomio', 'División de  términos  algebraicos'],
 [' Ecuaciones algebraicas', 'Expresiones algebraicas'],
 ['Métodos analíticos para la resolución de sistemas de ecuaciones',
  ' Ecuaciones algebraicas'],
 ['Aritmetica', 'Matematicas'],
 ['Fórmula general  para ecuaciones  de segundo grado', 'Aritmetica'],
 ['Operaciones Aritméticas ', 'Aritmetica'],
 ['Resta aritmética de números enteros', 'Operaciones Aritméticas '],
 ['Operaciones  aritméticas  compuestas',
  'Resta aritmética de números enteros',
  'División de  números  racionales',
  'Multiplicación de  números  racionales',
  'Resta de  números  racionales',
  'Suma de números racionales ',
  'División  aritmética de números enteros',
  'Jerarquías de las operaciones aritméticas',
  'Suma aritmética de números enteros',
  'Exponentes de números racionales a numeros enteros',
  'Multiplicación aritmética de números enteros'],
 ['División  aritmética de números enteros',
  'Resta aritmética de números enteros',
  'Multiplicación aritmética de números enteros'],
 ['Suma de números racionales ',
  'División  aritmética de números enteros',
  'Multiplicación aritmética de números enteros',
  'Ley de signos',
  'Máximo común divisor ',
  'Mínimo común múltiplo '],
 ['Multiplicación de  números  racionales',
  'Suma de números racionales ',
  'Multiplicación aritmética de números enteros'],
 ['División de  números  racionales',
  'Multiplicación de  números  racionales',
  'Resta de  números  racionales',
  'Suma de números racionales '],
 ['Razón y proporciones',
  'División de  números  racionales',
  'Multiplicación de  números  racionales'],
 ['Regla  detres',
  'Razón y proporciones',
  'División de  números  racionales',
  'Multiplicación de  números  racionales'],
 ['Porcentajes', 'Regla  detres', 'Razón y proporciones'],
 ['Ley de exponentes',
  'División de  números  racionales',
  'Multiplicación de  números  racionales',
  'Resta de  números  racionales',
  'Suma de números racionales '],
 ['Notación científica ',
  'Ley de exponentes',
  'Exponentes de números enteros elevados a números enteros'],
 ['Radicales',
  'División de  números  racionales',
  'Multiplicación de  números  racionales',
  'Resta de  números  racionales'],
 ['Resta de  números  racionales', 'Suma de números racionales '],
 ['Jerarquías de las operaciones aritméticas', 'Operaciones Aritméticas '],
 ['Suma aritmética de números enteros', 'Operaciones Aritméticas '],
 ['Tablas de  multiplicar', 'Suma aritmética de números enteros'],
 ['Multiplicación aritmética de números enteros', 'Tablas de  multiplicar'],
 ['Exponentes de números racionales a numeros enteros',
  'Multiplicación aritmética de números enteros'],
 ['Exponentes de números enteros elevados a números enteros',
  'Multiplicación aritmética de números enteros'],
 ['Conjuntos', 'Aritmetica'],
 ['Conjuntos Numericos ', 'Conjuntos'],
 ['Clasificación de los números', 'Conjuntos Numericos '],
 ['Números racionales ', 'Clasificación de los números'],
 ['Ley de signos', 'Números racionales '],
 ['Común denominador ', 'Números racionales '],
 ['Máximo común divisor ', 'Común denominador '],
 ['Mínimo común múltiplo ', 'Común denominador ']]


bn=gum.loadBN("redbayesiana_servidor_localhost.bifxml")
ie=gum.LazyPropagation(bn)
print(ie.posterior("Conjuntos Numericos"))
ie.setEvidence({'Clasificación de los números': 0})
ie.makeInference()
A=ie.posterior("Conjuntos Numericos")
print(A)

e1=np.where(A[::]==max(A[::]))[0][0]
print(e1)
ie.makeInference()
A=ie.posterior("Conjuntos")
print(A)
ie.setEvidence({'Conjuntos Numericos': np.int32(e1).item()})
ie.makeInference()
A=ie.posterior("Conjuntos")
print(A)
e1=np.where(A[::]==max(A[::]))[0][0]
print(e1)

ie.makeInference()
A=ie.posterior("Aritmetica")
print(A)
ie.setEvidence({'Conjuntos': np.int32(e1).item()})
ie.makeInference()
A=ie.posterior("Aritmetica")
print(A)
e1=np.where(A[::]==max(A[::]))[0][0]
print(e1)
exit()
for i in range(len(A)):
 print(ie.posterior(A[i][0].strip()))  
exit()


print(ie.posterior("Ley de exponentes"))
ie.setEvidence({'Suma de números racionales':0, 'Multiplicación de números racionales': 1})
ie.makeInference()
print(ie.posterior("Ley de exponentes"))
ie.setEvidence({'Suma de números racionales':0, 'Multiplicación de números racionales': 1})
ie.makeInference()
print(ie.evidenceImpact("Ley de exponentes",["Conjuntos","Tablas de multiplicar"]))

