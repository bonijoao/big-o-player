# Confere o fatorial recursivo do Python contra o factorial() do R base (exato
# em double até 22!; aqui, até 20!) e contra uma reimplementação recursiva em
# R que conta as multiplicações e a pilha mais funda.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/fatorial/conferir.R
pasta <- "algoritmos/fatorial"

mult <- 0; nivel <- 0; pico <- 0
fatorial_r <- function(n) {
  nivel <<- nivel + 1; pico <<- max(pico, nivel)
  r <- if (n <= 1) 1 else { x <- n * fatorial_r(n - 1); mult <<- mult + 1; x }
  nivel <<- nivel - 1
  r
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
tab <- do.call(rbind, lapply(py$conferir, function(caso) {
  mult <<- 0; nivel <<- 0; pico <<- 0
  r <- fatorial_r(caso$n)
  data.frame(n = caso$n, base = sprintf("%.0f", factorial(caso$n)) == caso$fatorial, r = sprintf("%.0f", r) == caso$fatorial,
             mult_r = mult, mult_py = caso$ops, pico_r = pico, pico_py = caso$pico)
}))
print(tab, row.names = FALSE)
tudo_ok <- all(tab$base) && all(tab$r) && all(tab$mult_r == tab$mult_py) && all(tab$pico_r == tab$pico_py)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = "factorial() do R base e fatorial_r() (reimplementação recursiva em R)",
    versao_r = versao,
    casos = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "Rodado em R %s para n de %d a %d: %s",
      versao, min(tab$n), max(tab$n),
      if (tudo_ok) "o resultado bate com factorial() algarismo por algarismo, e as multiplicações e a pilha mais funda batem com a reimplementação recursiva em R."
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: fatorial_r() em R concorda com o Python\n")
