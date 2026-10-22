# Confere a colisão por encadeamento contra as fórmulas de Knuth: 1 + α/2
# sondagens por chave, pondo até α, e 1 + α para pôr uma chave nova com α
# ocupado. O R refaz a tabela com casas sorteadas (motor/colisao.R).
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/encadeamento/conferir.R
source("motor/colisao.R")
conferir_colisao("algoritmos/encadeamento", "tabela com encadeamento", sondagens_encadeamento,
                 function(a) 1 + a / 2, function(a) 1 + a)
