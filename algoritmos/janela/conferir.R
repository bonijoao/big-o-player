# Confere o máximo em janela deslizante do Python contra o R base
# (apply(embed(x, k), 1, max): cada linha do embed é uma janela) e contra uma
# reimplementação independente em R do deque (um vetor de posições) e do
# ingênuo, que contam as comparações e o deque mais cheio.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/janela/conferir.R
pasta <- "algoritmos/janela"

janela_r <- function(v, k) {
  d <- integer(0); comp <- 0; pico <- 0; saida <- numeric(0)
  for (i in seq_along(v)) {
    if (i > k && d[1] == i - k) d <- d[-1]
    while (length(d) > 0) {
      comp <- comp + 1
      if (v[d[length(d)]] > v[i]) break
      d <- d[-length(d)]
    }
    d <- c(d, i); pico <- max(pico, length(d))
    if (i >= k) saida <- c(saida, v[d[1]])
  }
  list(maximos = saida, comparacoes = comp, pico = pico)
}

ingenuo_r <- function(v, k) {
  comp <- 0
  for (a in seq_len(length(v) - k + 1)) {
    m <- v[a]
    for (j in seq_len(k - 1)) { comp <- comp + 1; m <- max(m, v[a + j]) }
  }
  comp
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
tab <- do.call(rbind, lapply(py$conferir, function(caso) {
  v <- unlist(caso$vetor); k <- caso$k
  r <- janela_r(v, k)
  base <- apply(embed(v, k), 1, max)
  data.frame(n = length(v), k = k, caso = caso$caso,
             max_base = identical(as.numeric(base), as.numeric(unlist(caso$maximos))),
             max_r = identical(as.numeric(r$maximos), as.numeric(unlist(caso$maximos))),
             comp_r = r$comparacoes, comp_py = caso$ops,
             ingenuo_r = ingenuo_r(v, k), ingenuo_py = caso$ingenuo,
             pico_r = r$pico, pico_py = caso$pico)
}))
print(tab, row.names = FALSE)
tudo_ok <- all(tab$max_base) && all(tab$max_r) && all(tab$comp_r == tab$comp_py) &&
  all(tab$ingenuo_r == tab$ingenuo_py) && all(tab$pico_r == tab$pico_py) && all(tab$pico_py <= tab$k)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = "apply(embed(x, k), 1, max) do R base e janela_r()/ingenuo_r() (reimplementação em R)",
    versao_r = versao,
    vetores = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "Rodado em R %s em %d vetores (sorteados, crescentes e decrescentes, de %d a %d valores, com k de %d a %d): %s",
      versao, nrow(tab), min(tab$n), max(tab$n), min(tab$k), max(tab$k),
      if (tudo_ok) "os máximos batem com apply(embed(x, k), 1, max), e as comparações do deque e do ingênuo e o deque mais cheio (nunca acima de k) batem com a reimplementação em R, uma a uma."
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: janela_r() em R concorda com o Python\n")
