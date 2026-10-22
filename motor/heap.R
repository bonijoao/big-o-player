# O heap de mínimo do instrumento (instrumentos/heap/heap.py) reescrito em R,
# para conferir contagens: um vetor que dobra quando enche, e cada casa lida
# ou escrita conta 1 (a cópia ao dobrar conta uma leitura e uma escrita por
# valor). Os valores são pares comparados em ordem: (gravidade, chegada) no
# pronto-socorro, (distância, vértice) no Dijkstra. Índices a partir de 1:
# os filhos da casa i são 2i e 2i + 1.
heap_novo <- function() {
  e <- new.env()
  e$casas <- vector("list", 1); e$n <- 0; e$acessos <- 0
  e
}
le <- function(h, i) { h$acessos <- h$acessos + 1; h$casas[[i]] }
escreve <- function(h, i, x) { h$acessos <- h$acessos + 1; h$casas[[i]] <- x }
menor <- function(a, b) a[1] < b[1] || (a[1] == b[1] && a[2] < b[2])
anexa <- function(h, x) {
  if (h$n == length(h$casas)) {     # cheio: dobra e copia (uma leitura e uma escrita por valor)
    novas <- vector("list", 2 * length(h$casas))
    for (k in seq_len(h$n)) novas[k] <- list(h$casas[[k]])
    h$acessos <- h$acessos + 2 * h$n
    h$casas <- novas
  }
  h$n <- h$n + 1
  escreve(h, h$n, x)
}
inserir <- function(h, x) {
  anexa(h, x)
  i <- h$n
  while (i > 1) {
    p <- i %/% 2; y <- le(h, p)
    if (!menor(x, y)) break
    escreve(h, i, y); escreve(h, p, x); i <- p
  }
}
tirar <- function(h) {
  topo <- le(h, 1)
  ult <- le(h, h$n); h$casas[h$n] <- list(NULL); h$n <- h$n - 1
  if (h$n > 0) {
    escreve(h, 1, ult); x <- ult; i <- 1
    while (2 * i <= h$n) {
      m <- 2 * i; xm <- le(h, m)
      if (m + 1 <= h$n) { xd <- le(h, m + 1); if (menor(xd, xm)) { m <- m + 1; xm <- xd } }
      if (!menor(xm, x)) break
      escreve(h, i, xm); escreve(h, m, x); i <- m
    }
  }
  topo
}
