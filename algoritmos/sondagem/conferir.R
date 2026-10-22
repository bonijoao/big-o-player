# Confere a colisão por sondagem linear contra as fórmulas de Knuth:
# ½(1 + 1/(1 − α)) sondagens por chave, pondo até α, e ½(1 + 1/(1 − α)²) para
# pôr uma chave nova com α ocupado. O R refaz a tabela com casas sorteadas
# (motor/colisao.R).
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/sondagem/conferir.R
source("motor/colisao.R")
conferir_colisao("algoritmos/sondagem", "tabela com sondagem linear", sondagens_sondagem,
                 function(a) (1 + 1 / (1 - a)) / 2, function(a) (1 + 1 / (1 - a)^2) / 2)
