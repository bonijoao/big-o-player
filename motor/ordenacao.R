# Ordenações reescritas em R, com contadores, para conferir o Python.
# Mesmo algoritmo (mesma variante), implementação independente: a ordem
# final tem de bater com sort() e as contagens têm de bater com as do Python.
# Índices em base 1.

bolha_r <- function(v) {
  n <- length(v); comp <- 0; mov <- 0
  if (n < 2) return(list(v = v, comparacoes = 0, movimentos = 0))
  for (fim in (n - 1):1) {
    trocou <- FALSE
    for (i in 1:fim) {
      comp <- comp + 1
      if (v[i] > v[i + 1]) {
        v[c(i, i + 1)] <- v[c(i + 1, i)]; mov <- mov + 1; trocou <- TRUE
      }
    }
    if (!trocou) break
  }
  list(v = v, comparacoes = comp, movimentos = mov)
}

insercao_r <- function(v) {
  n <- length(v); comp <- 0; mov <- 0
  if (n < 2) return(list(v = v, comparacoes = 0, movimentos = 0))
  for (i in 2:n) {
    j <- i
    while (j > 1) {
      comp <- comp + 1
      if (v[j - 1] <= v[j]) break
      v[c(j - 1, j)] <- v[c(j, j - 1)]; mov <- mov + 1; j <- j - 1
    }
  }
  list(v = v, comparacoes = comp, movimentos = mov)
}

selecao_r <- function(v) {
  n <- length(v); comp <- 0; mov <- 0
  if (n < 2) return(list(v = v, comparacoes = 0, movimentos = 0))
  for (i in 1:(n - 1)) {
    m <- i
    for (j in (i + 1):n) {
      comp <- comp + 1
      if (v[j] < v[m]) m <- j
    }
    v[c(i, m)] <- v[c(m, i)]; mov <- mov + 1   # troca sempre, mesmo com m == i
  }
  list(v = v, comparacoes = comp, movimentos = mov)
}

intercalacao_r <- function(v) {
  e <- new.env()
  e$v <- v; e$aux <- v; e$comp <- 0; e$mov <- 0   # aux com o mesmo tipo do vetor
  ordena <- function(a, b) {          # trecho a..b, inclusivo
    if (b - a < 1) return(invisible())
    m <- (a + b + 1) %/% 2            # mesmo corte do Python: (a + b) // 2 em base 0
    ordena(a, m - 1); ordena(m, b)
    e$aux[a:b] <- e$v[a:b]; e$mov <- e$mov + (b - a + 1)
    i <- a; j <- m; k <- a
    while (i <= m - 1 && j <= b) {
      e$comp <- e$comp + 1
      if (e$aux[i] > e$aux[j]) { e$v[k] <- e$aux[j]; j <- j + 1 } else { e$v[k] <- e$aux[i]; i <- i + 1 }
      e$mov <- e$mov + 1; k <- k + 1
    }
    while (i <= m - 1) { e$v[k] <- e$aux[i]; i <- i + 1; k <- k + 1; e$mov <- e$mov + 1 }
    while (j <= b) { e$v[k] <- e$aux[j]; j <- j + 1; k <- k + 1; e$mov <- e$mov + 1 }
  }
  ordena(1, length(v))
  list(v = e$v, comparacoes = e$comp, movimentos = e$mov)
}

rapida_r <- function(v) {
  e <- new.env()
  e$v <- v; e$comp <- 0; e$mov <- 0
  ordena <- function(a, b) {          # trecho a..b, inclusivo
    if (b - a < 1) return(invisible())
    piv <- e$v[b]; i <- a
    for (j in a:(b - 1)) {
      e$comp <- e$comp + 1
      if (e$v[j] < piv) { e$v[c(i, j)] <- e$v[c(j, i)]; e$mov <- e$mov + 1; i <- i + 1 }
    }
    e$v[c(i, b)] <- e$v[c(b, i)]; e$mov <- e$mov + 1
    ordena(a, i - 1); ordena(i + 1, b)
  }
  ordena(1, length(v))
  list(v = e$v, comparacoes = e$comp, movimentos = e$mov)
}

heapsort_r <- function(v) {
  # heap de máximo em v[1..fim]: os filhos de p são 2p e 2p + 1
  n <- length(v); comp <- 0; mov <- 0
  fim <- n; i <- n %/% 2 + 1
  while (fim > 1) {
    if (i > 1) {
      i <- i - 1
    } else {
      v[c(1, fim)] <- v[c(fim, 1)]; mov <- mov + 1; fim <- fim - 1
    }
    p <- i
    while (2 * p <= fim) {
      f <- 2 * p
      if (f < fim) {
        comp <- comp + 1
        if (v[f + 1] > v[f]) f <- f + 1
      }
      comp <- comp + 1
      if (v[f] > v[p]) {
        v[c(p, f)] <- v[c(f, p)]; mov <- mov + 1; p <- f
      } else {
        break
      }
    }
  }
  list(v = v, comparacoes = comp, movimentos = mov)
}

# Roda a versão R em cada vetor guardado pelo medir.py e compara.
conferir_ordenacao <- function(pasta, funcao, nome_r) {
  py <- jsonlite::read_json(file.path(pasta, "dados.json"))
  casos <- py$conferir
  linhas <- lapply(casos, function(caso) {
    v <- unlist(caso$vetor)
    r <- funcao(v)
    data.frame(
      n = length(v),
      ordem_ok = identical(r$v, sort(v)),
      comp_r = r$comparacoes, comp_py = caso$comparacoes,
      mov_r = r$movimentos, mov_py = caso$movimentos
    )
  })
  tab <- do.call(rbind, linhas)
  print(tab, row.names = FALSE)
  tudo_ok <- all(tab$ordem_ok) && all(tab$comp_r == tab$comp_py) && all(tab$mov_r == tab$mov_py)
  versao <- paste(R.version$major, R.version$minor, sep = ".")
  jsonlite::write_json(
    list(
      referencia = paste0(nome_r, " (reimplementação em R) e sort()"),
      versao_r = versao,
      vetores = nrow(tab),
      tudo_ok = tudo_ok,
      resumo = sprintf(
        "Reescrito em R %s e rodado em %d vetores de %d números (5 embaralhados, 1 ordenado, 1 invertido): %s",
        versao, nrow(tab), tab$n[1],
        if (tudo_ok) "a ordem final bate com sort() e as comparações e os movimentos batem um a um com o Python."
        else "há divergência; veja conferir.R."
      )
    ),
    file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
  )
  stopifnot(tudo_ok)
  cat("ok:", nome_r, "em R concorda com o Python\n")
}
