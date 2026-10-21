# Confere o bolha do Python contra uma reimplementação independente em R.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/bolha/conferir.R
source("motor/ordenacao.R")
conferir_ordenacao("algoritmos/bolha", bolha_r, "bolha_r()")
