import pyAgrum as gum
bn=gum.loadBN("redes bayesianas/alarm.dsl")
ie=gum.LazyPropagation(bn)
ie.makeInference()
print(ie.posterior(bn.idFromName("CATECHOL")))