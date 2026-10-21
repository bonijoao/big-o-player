# Confere a busca sequencial do Python contra uma reimplementação independente em R.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/sequencial/conferir.R
source("motor/busca.R")
conferir_busca("algoritmos/sequencial", sequencial_r, "sequencial_r()")
