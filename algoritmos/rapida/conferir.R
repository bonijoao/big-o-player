# Confere o rapida do Python contra uma reimplementação independente em R.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/rapida/conferir.R
source("motor/ordenacao.R")
conferir_ordenacao("algoritmos/rapida", rapida_r, "rapida_r()")
