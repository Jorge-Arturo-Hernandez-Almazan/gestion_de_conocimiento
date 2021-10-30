import pyAgrum as gum

bn=gum.loadBN("redbayesiana_servidor_localhost.bifxml")
ie=gum.LazyPropagation(bn)
print(ie.posterior("Ley de exponentes"))