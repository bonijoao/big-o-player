# Confere a mediana por quickselect do Python duas vezes: o resultado contra
# o median() do R, e as contagens contra uma reimplementação independente em R
# (a mesma partição de Lomuto, índices em base 1).
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/mediana/conferir.R
pasta <- "algoritmos/mediana"

quickselect_r <- function(v) {
  n <- length(v); k <- (n + 1) %/% 2
  comp <- 0; trocas <- 0
  troque <- function(i, j) { x <- v[i]; v[i] <<- v[j]; v[j] <<- x; trocas <<- trocas + 1 }
  a <- 1; b <- n
  while (a < b) {
    pivo <- v[b]; i <- a
    for (j in a:(b - 1)) {
      comp <- comp + 1
      if (v[j] < pivo) { troque(i, j); i <- i + 1 }
    }
    troque(i, b)
    if (i == k) break
    if (i < k) a <- i + 1 else b <- i - 1
  }
  resposta <- v[k]
  if (n %% 2 == 0) {
    m <- k + 1
    if (k + 2 <= n) for (j in (k + 2):n) { comp <- comp + 1; if (v[j] < v[m]) m <- j }
    resposta <- (v[k] + v[m]) / 2
  }
  list(mediana = resposta, comparacoes = comp, trocas = trocas)
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
tab <- do.call(rbind, lapply(py$conferir, function(caso) {
  v <- as.numeric(unlist(caso$vetor))
  r <- quickselect_r(v)
  data.frame(caso = caso$caso, n = length(v), median_r = median(v), quickselect_r = r$mediana, python = caso$mediana,
             comp_r = r$comparacoes, comp_py = caso$comparacoes, trocas_r = r$trocas, trocas_py = caso$trocas)
}))
print(tab, row.names = FALSE)
tudo_ok <- all(tab$median_r == tab$python) && all(tab$quickselect_r == tab$python) &&
  all(tab$comp_r == tab$comp_py) && all(tab$trocas_r == tab$trocas_py)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = "median() e quickselect_r() (reimplementação em R)",
    versao_r = versao,
    vetores = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "No R %s, o median(trees$Volume) dá %s, a mesma mediana do Python. Em %d vetores (o trees, embaralhamentos dele, inteiros com empates, n par e ímpar, já ordenados e invertidos), %s",
      versao, format(median(trees$Volume), decimal.mark = ","), nrow(tab),
      if (tudo_ok) "a mediana bate com o median() e as comparações e as trocas batem uma a uma com uma reimplementação em R."
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: median() e a reimplementação em R concordam com o Python\n")
