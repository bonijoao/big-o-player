# Confere o selecao do Python contra uma reimplementação independente em R.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/selecao/conferir.R
source("motor/ordenacao.R")
conferir_ordenacao("algoritmos/selecao", selecao_r, "selecao_r()")
