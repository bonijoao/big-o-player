# Confere as três contas do Python (Welford, soma dos quadrados e duas
# passadas). A média e a variância de referência são o mean() e o var() do R.
# O Welford e as duas passadas têm de chegar perto delas; a soma dos quadrados
# é refeita num laço em R, na mesma ordem e em double, e tem de dar
# exatamente o número do Python, erro incluído. (O sum() do R acumula em
# precisão estendida e não reproduziria o erro.)
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/welford/conferir.R
pasta <- "algoritmos/welford"

soma_dos_quadrados_r <- function(x) {
  n <- length(x); s1 <- 0; s2 <- 0
  for (v in x) { s1 <- s1 + v; s2 <- s2 + v * v }
  c(s1 / n, (s2 - s1 * s1 / n) / (n - 1))
}

relativo <- function(a, b) abs(a - b) / abs(b)

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
tab <- do.call(rbind, lapply(py$conferir, function(caso) {
  x <- as.numeric(unlist(caso$x))
  w <- as.numeric(unlist(caso$welford)); d <- as.numeric(unlist(caso$duas)); s <- as.numeric(unlist(caso$soma))
  data.frame(caso = caso$caso, n = length(x), var_r = var(x),
             erro_welford = relativo(w[2], var(x)), erro_duas = relativo(d[2], var(x)),
             media_ok = relativo(w[1], mean(x)) < 1e-12 && relativo(d[1], mean(x)) < 1e-12,
             soma_py = s[2], soma_igual = identical(soma_dos_quadrados_r(x), s))
}))
print(tab, row.names = FALSE)
tudo_ok <- all(tab$erro_welford < 1e-6) && all(tab$erro_duas < 1e-12) && all(tab$media_ok) && all(tab$soma_igual)
versao <- paste(R.version$major, R.version$minor, sep = ".")
mais <- tab[tab$caso == "LakeHuron + 1000000000", ]
jsonlite::write_json(
  list(
    referencia = "var() e mean(); a soma dos quadrados refeita num laço em R",
    versao_r = versao,
    vetores = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "No R %s, o var(LakeHuron) dá %s. Em %d vetores (o LakeHuron com cada deslocamento do palco e normais sorteadas), %s",
      versao, format(var(as.numeric(LakeHuron)), digits = 10, decimal.mark = ","), nrow(tab),
      if (tudo_ok) sprintf(
        "o Welford fica a menos de 1 parte em um milhão do var() (no pior caso, %s) e as duas passadas, a menos de 1 em um trilhão. A soma dos quadrados refeita num laço em R dá exatamente os números do Python, inclusive a variância de %s com +10⁹.",
        format(max(tab$erro_welford), digits = 2, decimal.mark = ","), format(mais$soma_py, digits = 6, decimal.mark = ","))
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: var(), mean() e a soma dos quadrados em R concordam com o Python\n")
