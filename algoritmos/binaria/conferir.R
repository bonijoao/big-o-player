# Confere a busca binaria do Python contra uma reimplementação independente em R.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/binaria/conferir.R
source("motor/busca.R")
conferir_busca("algoritmos/binaria", binaria_r, "binaria_r()")
