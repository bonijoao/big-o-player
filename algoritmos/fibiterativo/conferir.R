# Confere o Fibonacci iterativo do Python contra a fórmula de Binet e contra a
# mesma versão reimplementada em R (motor/fibonacci.R), que conta as somas e
# o pico de memória. Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/fibiterativo/conferir.R
source("motor/fibonacci.R")
conferir_fib("iterativo", "algoritmos/fibiterativo")
