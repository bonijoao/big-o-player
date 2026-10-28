# Os três Fibonacci reimplementados em R, contando as somas e o pico de
# memória (níveis da pilha + respostas guardadas no memo), para conferir os três
# dados.json. O valor é conferido contra a fórmula de Binet,
# round(φⁿ/√5), exata em double para os n daqui.
# Uso (de algoritmos/fib*/conferir.R): source("motor/fibonacci.R"); conferir_fib("recursivo", pasta)

conferir_fib <- function(versao, pasta) {
  somas <- 0; nivel <- 0; pico <- 0; memo <- numeric(0)   # o memo: a casa k + 1 guarda fib(k), NA até ser calculada
  guarda <- function() pico <<- max(pico, nivel + sum(!is.na(memo)))
  rec <- function(n) {
    nivel <<- nivel + 1; guarda()
    r <- if (n <= 1) n else { x <- rec(n - 1) + rec(n - 2); somas <<- somas + 1; x }
    nivel <<- nivel - 1
    r
  }
  mem <- function(n) {
    nivel <<- nivel + 1; guarda()
    r <- if (n <= 1) n else if (!is.na(memo[n + 1])) memo[n + 1] else {
      x <- mem(n - 1) + mem(n - 2); somas <<- somas + 1
      memo[n + 1] <<- x; guarda(); x
    }
    nivel <<- nivel - 1
    r
  }
  ite <- function(n) {
    a <- 0; b <- 1
    for (i in seq_len(n)) { x <- a + b; somas <<- somas + 1; a <- b; b <- x }
    a
  }
  f <- list(recursivo = rec, memoria = mem, iterativo = ite)[[versao]]
  binet <- function(n) round(((1 + sqrt(5)) / 2)^n / sqrt(5))

  py <- jsonlite::read_json(file.path(pasta, "dados.json"))
  tab <- do.call(rbind, lapply(py$conferir, function(caso) {
    somas <<- 0; nivel <<- 0; pico <<- 0; memo <<- rep(NA_real_, caso$n + 1)
    r <- f(caso$n)
    data.frame(n = caso$n, binet = binet(caso$n) == caso$fib, r = r == caso$fib,
               somas_r = somas, somas_py = caso$ops, pico_r = pico, pico_py = caso$pico)
  }))
  print(tab, row.names = FALSE)
  esperado <- switch(versao, recursivo = sapply(tab$n, function(n) binet(n + 1) - 1),
                     memoria = pmax(tab$n - 1, 0), iterativo = tab$n)
  tudo_ok <- all(tab$binet) && all(tab$r) && all(tab$somas_r == tab$somas_py) && all(tab$pico_r == tab$pico_py) &&
    all(tab$somas_py == esperado)
  formula <- switch(versao, recursivo = "fib(n + 1) − 1", memoria = "n − 1", iterativo = "n")
  versao_r <- paste(R.version$major, R.version$minor, sep = ".")
  jsonlite::write_json(
    list(
      referencia = "a fórmula de Binet, round(φⁿ/√5), e a mesma versão reimplementada em R",
      versao_r = versao_r,
      casos = nrow(tab),
      tudo_ok = tudo_ok,
      resumo = sprintf(
        "Rodado em R %s para n de %d a %d: %s",
        versao_r, min(tab$n), max(tab$n),
        if (tudo_ok) sprintf("fib(n) bate com a fórmula de Binet, e as somas (%s) e o pico de memória batem com a reimplementação em R, um n por vez.", formula)
        else "há divergência; veja conferir.R."
      )
    ),
    file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
  )
  stopifnot(tudo_ok)
  cat(sprintf("ok: o Fibonacci %s em R concorda com o Python\n", c(recursivo = "recursivo", memoria = "com memória", iterativo = "iterativo")[[versao]]))
}
