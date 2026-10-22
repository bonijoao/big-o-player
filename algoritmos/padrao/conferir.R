# Confere a busca de padrão ingênua do Python contra o gregexpr() do R base
# (com um lookahead, para achar também as ocorrências sobrepostas) e contra
# uma reimplementação em R que conta as comparações de letras.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/padrao/conferir.R
pasta <- "algoritmos/padrao"

busca_r <- function(t, p) {
  tt <- strsplit(t, "")[[1]]; pp <- strsplit(p, "")[[1]]
  n <- length(tt); m <- length(pp); comp <- 0; achou <- integer(0)
  if (n >= m) for (i in 1:(n - m + 1)) {
    j <- 1
    while (j <= m) { comp <- comp + 1; if (tt[i + j - 1] != pp[j]) break; j <- j + 1 }
    if (j > m) achou <- c(achou, i)
  }
  list(achou = achou, comparacoes = comp)
}

posicoes <- function(t, p) {   # base 1, como no pseudocódigo
  g <- gregexpr(paste0("(?=", p, ")"), t, perl = TRUE)[[1]]
  if (g[1] == -1) integer(0) else as.integer(g)
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
tab <- do.call(rbind, lapply(py$conferir, function(caso) {
  r <- busca_r(caso$texto, caso$padrao)
  achou_py <- as.integer(unlist(caso$achou)) + 1L
  data.frame(caso = caso$caso, n = nchar(caso$texto), m = nchar(caso$padrao),
             base = identical(posicoes(caso$texto, caso$padrao), achou_py), r = identical(r$achou, achou_py),
             comp_r = r$comparacoes, comp_py = caso$ops)
}))
print(tab, row.names = FALSE)
pior <- tab$caso == "pior" & tab$m <= tab$n
tudo_ok <- all(tab$base) && all(tab$r) && all(tab$comp_r == tab$comp_py) &&
  all(tab$comp_py[pior] == (tab$n[pior] - tab$m[pior] + 1) * tab$m[pior])
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = "gregexpr() do R base (com lookahead) e busca_r() (reimplementação em R)",
    versao_r = versao,
    buscas = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "Rodado em R %s em %d buscas (a estrofe do encarte com %d padrões, DNA sorteado e o pior caso, com n de %d a %d e m de %d a %d): %s",
      versao, nrow(tab), sum(tab$caso == "encarte"), min(tab$n), max(tab$n), min(tab$m), max(tab$m),
      if (tudo_ok) "as posições batem com gregexpr(), as comparações batem com a reimplementação em R, uma a uma, e no pior caso dão exatamente (n − m + 1)·m."
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: busca_r() em R concorda com o Python\n")
