# Buscas reescritas em R, com contador, para conferir o Python.
# Mesmo algoritmo, implementação independente: a posição achada tem de bater
# com match() e as comparações com as do Python. Índices em base 1; posição
# 0 = não achou (o Python devolve −1, em base 0).

sequencial_r <- function(v, alvo) {
  comp <- 0
  for (i in seq_along(v)) {
    comp <- comp + 1
    if (v[i] == alvo) return(list(posicao = i, comparacoes = comp))
  }
  list(posicao = 0, comparacoes = comp)
}

binaria_r <- function(v, alvo) {
  comp <- 0; a <- 1; b <- length(v)
  while (a <= b) {
    m <- (a + b - 2) %/% 2 + 1        # o mesmo meio do Python: (a + b) // 2 em base 0
    comp <- comp + 1
    if (v[m] == alvo) return(list(posicao = m, comparacoes = comp))
    comp <- comp + 1
    if (v[m] < alvo) a <- m + 1 else b <- m - 1
  }
  list(posicao = 0, comparacoes = comp)
}

conferir_busca <- function(pasta, funcao, nome_r) {
  py <- jsonlite::read_json(file.path(pasta, "dados.json"))
  linhas <- lapply(py$conferir, function(caso) {
    v <- unlist(caso$vetor)
    r <- funcao(v, caso$alvo)
    esperado <- match(caso$alvo, v, nomatch = 0)
    data.frame(n = length(v), caso = caso$caso, alvo = caso$alvo,
               pos_ok = r$posicao == esperado && r$posicao - 1 == ifelse(caso$posicao < 0, -1, caso$posicao),
               comp_r = r$comparacoes, comp_py = caso$comparacoes)
  })
  tab <- do.call(rbind, linhas)
  print(tab, row.names = FALSE)
  tudo_ok <- all(tab$pos_ok) && all(tab$comp_r == tab$comp_py)
  versao <- paste(R.version$major, R.version$minor, sep = ".")
  jsonlite::write_json(
    list(
      referencia = paste0(nome_r, " (reimplementação em R) e match()"),
      versao_r = versao,
      vetores = nrow(tab),
      tudo_ok = tudo_ok,
      resumo = sprintf(
        "Reescrito em R %s e rodado em %d buscas em vetores de %d números (alvo no começo, no fim, ausente e sorteado): %s",
        versao, nrow(tab), tab$n[1],
        if (tudo_ok) "a posição achada bate com match() e as comparações batem uma a uma com o Python."
        else "há divergência; veja conferir.R."
      )
    ),
    file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
  )
  stopifnot(tudo_ok)
  cat("ok:", nome_r, "em R concorda com o Python\n")
}
