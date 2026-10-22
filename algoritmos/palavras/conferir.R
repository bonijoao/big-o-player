# Confere a contagem de palavras do Python contra o table() do R: o R lê os
# dois textos, separa as palavras do seu jeito (minúsculas, letras seguidas,
# com [[:alpha:]]) e conta com table(). Confere a Canção do Exílio, os começos
# dela usados no palco e o Dom Casmurro inteiro, palavra por palavra.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/palavras/conferir.R
pasta <- "algoritmos/palavras"

ler <- function(nome) {
  x <- paste(readLines(file.path(pasta, nome), encoding = "UTF-8", warn = FALSE), collapse = "\n")
  sub("(?s)^.*?\n\n", "", x, perl = TRUE)          # sem o cabeçalho (até a primeira linha em branco)
}
palavras <- function(texto) regmatches(tolower(texto), gregexpr("[[:alpha:]]+", tolower(texto)))[[1]]

# a contagem do Python ([palavra, contagem]) como vetor nomeado, na ordem das palavras
como_tabela <- function(pares) {
  x <- vapply(pares, function(p) as.integer(p[[2]]), integer(1))
  names(x) <- vapply(pares, function(p) p[[1]], character(1))
  x[order(names(x))]
}
mesma <- function(t_r, pares) {
  py <- como_tabela(pares)
  r <- as.integer(t_r); names(r) <- names(t_r); r <- r[order(names(r))]
  identical(names(r), names(py)) && identical(unname(r), unname(py))
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
cancao <- palavras(ler("cancao-do-exilio.txt"))
casmurro <- palavras(ler("dom-casmurro.txt"))

linhas <- lapply(py$conferir, function(caso) {
  texto <- if (startsWith(caso$texto, "casmurro")) casmurro else cancao
  n <- length(caso$palavras)
  p <- texto[seq_len(n)]
  data.frame(texto = caso$texto, n = n, mesmas_palavras = identical(p, unlist(caso$palavras)),
             distintas_r = length(unique(p)), distintas_py = caso$d, contagens = mesma(table(p), caso$contagens))
})
linhas[[length(linhas) + 1]] <- data.frame(
  texto = "casmurro (inteiro)", n = length(casmurro), mesmas_palavras = length(casmurro) == py$casmurro$n,
  distintas_r = length(unique(casmurro)), distintas_py = py$casmurro$d, contagens = mesma(table(casmurro), py$casmurro$contagens))
tab <- do.call(rbind, linhas)
print(tab, row.names = FALSE)
tudo_ok <- all(tab$mesmas_palavras) && all(tab$distintas_r == tab$distintas_py) && all(tab$contagens) &&
  length(cancao) == py$exemplo$n
mais <- head(sort(table(casmurro), decreasing = TRUE), 3)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = "table() do R sobre as palavras separadas por regmatches(tolower(x), gregexpr(\"[[:alpha:]]+\", ...))",
    versao_r = versao,
    textos = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "Rodado em R %s em %d textos (a Canção do Exílio, os começos dela usados no palco, trechos do Dom Casmurro e o livro inteiro, com %s palavras e %s distintas): %s",
      versao, nrow(tab), format(length(casmurro), big.mark = ".", decimal.mark = ","),
      format(length(unique(casmurro)), big.mark = ".", decimal.mark = ","),
      if (tudo_ok) sprintf("o R separa as mesmas palavras, e a contagem de cada uma bate com o table() do R. No livro, as mais frequentes são \"%s\" (%s vezes), \"%s\" e \"%s\".",
                           names(mais)[1], format(as.integer(mais[1]), big.mark = ".", decimal.mark = ","), names(mais)[2], names(mais)[3])
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: table() no R concorda com o Python\n")
