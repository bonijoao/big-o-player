# Confere a multiplicação de matrizes do Python contra o %*% do R base e
# contra uma reimplementação em R, com os três laços, que conta as
# multiplicações. Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/multiplicacao/conferir.R
pasta <- "algoritmos/multiplicacao"

mat <- function(x) do.call(rbind, lapply(x, function(l) as.numeric(unlist(l))))

multiplica_r <- function(A, B) {
  n <- nrow(A); C <- matrix(0, n, n); mult <- 0
  for (i in 1:n) for (j in 1:n) {
    s <- 0
    for (k in 1:n) { s <- s + A[i, k] * B[k, j]; mult <- mult + 1 }
    C[i, j] <- s
  }
  list(C = C, multiplicacoes = mult)
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
casos <- c(list(py$exemplo), py$conferir)
tab <- do.call(rbind, lapply(casos, function(caso) {
  A <- mat(caso$A); B <- mat(caso$B); C <- mat(caso$C)
  r <- multiplica_r(A, B)
  data.frame(n = nrow(A), base = identical(A %*% B, C), r = identical(r$C, C),
             mult_r = r$multiplicacoes, mult_py = caso$ops, pico_py = caso$pico)
}))
print(tab, row.names = FALSE)
tudo_ok <- all(tab$base) && all(tab$r) && all(tab$mult_r == tab$mult_py) && all(tab$mult_py == tab$n^3) && all(tab$pico_py == 0)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = "%*% do R base e multiplica_r() (reimplementação em R)",
    versao_r = versao,
    matrizes = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "Rodado em R %s em %d pares de matrizes sorteadas, de %d × %d a %d × %d: %s",
      versao, nrow(tab), min(tab$n), min(tab$n), max(tab$n), max(tab$n),
      if (tudo_ok) "o produto bate com A %*% B casa por casa, as multiplicações (n³) batem com a reimplementação em R, e não há memória extra: C é a resposta."
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: multiplica_r() em R concorda com o Python\n")
