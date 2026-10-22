# Confere o Fibonacci com memória do Python contra a fórmula de Binet e contra a
# mesma versão reimplementada em R (motor/fibonacci.R), que conta as somas e
# o pico de memória. Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/fibmemoria/conferir.R
source("motor/fibonacci.R")
conferir_fib("memoria", "algoritmos/fibmemoria")
