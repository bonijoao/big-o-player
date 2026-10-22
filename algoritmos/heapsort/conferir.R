# Confere o heapsort do Python contra uma reimplementação independente em R.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/heapsort/conferir.R
source("motor/ordenacao.R")
conferir_ordenacao("algoritmos/heapsort", heapsort_r, "heapsort_r()")
