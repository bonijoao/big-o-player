# Confere o insercao do Python contra uma reimplementação independente em R.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/insercao/conferir.R
source("motor/ordenacao.R")
conferir_ordenacao("algoritmos/insercao", insercao_r, "insercao_r()")
