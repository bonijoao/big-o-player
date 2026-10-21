# Confere o intercalacao do Python contra uma reimplementação independente em R.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/intercalacao/conferir.R
source("motor/ordenacao.R")
conferir_ordenacao("algoritmos/intercalacao", intercalacao_r, "intercalacao_r()")
