# Confere o máximo de um vetor do Python contra o max() do R base e contra
# uma reimplementação em R que conta as comparações e as trocas do maior.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/maximo/conferir.R
pasta <- "algoritmos/maximo"

maximo_r <- function(v) {
  m <- v[1]; comp <- 0; trocas <- 0
  for (i in seq_along(v)[-1]) {
    comp <- comp + 1
    if (v[i] > m) { m <- v[i]; trocas <- trocas + 1 }
  }
  list(maximo = m, comparacoes = comp, trocas = trocas)
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
casos <- c(list(c(py$exemplo, caso = "encarte")), py$conferir)
tab <- do.call(rbind, lapply(casos, function(caso) {
  v <- as.numeric(unlist(caso$vetor))
  r <- maximo_r(v)
  data.frame(n = length(v), caso = caso$caso,
             max_base = max(v) == caso$maximo, max_r = r$maximo == caso$maximo,
             comp_r = r$comparacoes, comp_py = caso$ops, trocas_r = r$trocas, trocas_py = caso$trocas)
}))
print(tab, row.names = FALSE)
# a média das trocas nos sorteios do encarte, contra a soma harmônica 1/2 + … + 1/n
d <- py$tempo$distribuicao
media <- mean(unlist(d$valores))
harm <- sum(1 / (2:d$n))
tudo_ok <- all(tab$max_base) && all(tab$max_r) && all(tab$comp_r == tab$comp_py) && all(tab$trocas_r == tab$trocas_py) &&
  all(tab$comp_py == pmax(tab$n - 1, 0))
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = "max() do R base e maximo_r() (reimplementação em R)",
    versao_r = versao,
    vetores = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "Rodado em R %s em %d vetores (sorteados, crescentes e decrescentes, de %d a %d valores): %s Nos %d vetores sorteados de %d valores, o maior trocou em média %s vezes; com valores todos diferentes, a conta daria 1/2 + … + 1/%d = %s.",
      versao, nrow(tab), min(tab$n), max(tab$n),
      if (tudo_ok) "o máximo bate com max(), e as comparações (sempre n − 1) e as trocas do maior batem com a reimplementação em R, uma a uma."
      else "há divergência; veja conferir.R.",
      length(d$valores), d$n, format(round(media, 2), decimal.mark = ","), d$n, format(round(harm, 2), decimal.mark = ",")
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: maximo_r() em R concorda com o Python\n")
