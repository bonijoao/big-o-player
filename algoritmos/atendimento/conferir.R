# Confere a fila de atendimento do Python por um caminho que não usa fila:
# a recursão de Lindley. Com um caixa e ordem de chegada, a espera do
# próximo cliente é a espera do anterior mais o atendimento do anterior menos
# o intervalo entre as duas chegadas, nunca abaixo de zero.
# A maior fila sai de contar, a cada chegada, quantos dos que já chegaram
# ainda não começaram a ser atendidos. Quem espera passou pela fila (entrou
# e saiu): as operações na fila são duas por cliente que esperou.
# O R recebe os sorteios gravados no dados.json (não refaz o gerador do Python).
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/atendimento/conferir.R
pasta <- "algoritmos/atendimento"

lindley <- function(chegada, duracao) {
  n <- length(chegada); w <- numeric(n)
  if (n > 1) for (k in 2:n) w[k] <- max(0, w[k - 1] + duracao[k - 1] - (chegada[k] - chegada[k - 1]))
  w
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
tab <- do.call(rbind, lapply(py$conferir, function(caso) {
  chegada <- unlist(caso$chegada); duracao <- unlist(caso$duracao)
  w <- lindley(chegada, duracao)
  inicio <- chegada + w
  maior <- max(sapply(seq_along(chegada), function(k) sum(inicio[1:k] > chegada[k])))
  data.frame(n = length(chegada), movimento = caso$movimento,
             esperas_ok = identical(as.numeric(unlist(caso$esperas)), w),
             soma_r = sum(w), soma_py = caso$soma, maior_r = maior, maior_py = caso$maior,
             ops_r = 2 * sum(w > 0), ops_py = caso$ops)
}))
print(tab, row.names = FALSE)
tudo_ok <- all(tab$esperas_ok) && all(tab$soma_r == tab$soma_py) && all(tab$maior_r == tab$maior_py) &&
  all(tab$ops_r == tab$ops_py)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = "recursão de Lindley em R, sem fila",
    versao_r = versao,
    vetores = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "Refeito em R %s pela recursão de Lindley, que calcula a espera de cada cliente sem montar fila nenhuma, em %d sorteios de %d clientes (calmo, no limite e lotado): %s",
      versao, nrow(tab), tab$n[1],
      if (tudo_ok) "a espera de cada cliente, a maior fila e as operações na fila batem uma a uma com o Python."
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: a recursão de Lindley em R concorda com o Python\n")
