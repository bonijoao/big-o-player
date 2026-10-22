# Motor independente para conferir as árvores de busca medidas em Python.
# Índices 1..n representam os valores em ordem crescente; 0 representa NULL.
arvore_vazia_r <- function(valores = numeric(), avl = FALSE) {
  n <- length(valores)
  as.environment(list(valores = sort(as.numeric(valores)), esq = integer(n), dir = integer(n),
       altura_no = if (avl) integer(n) else NULL, raiz = 0L, n = n,
       avl = avl, comparacoes = 0L, rotacoes = 0L, leituras = 0L,
       escritas = 0L, pico_pilha = 0L, alocacao = 0L, pico_memoria = 0L, n_inseridos = 0L))
}

altura_subarvore_r <- function(a, p) {
  if (p == 0L) return(0L)
  if (a$avl) return(a$altura_no[p])
  1L + max(altura_subarvore_r(a, a$esq[p]), altura_subarvore_r(a, a$dir[p]))
}

h_contada_r <- function(a, p) {
  if (p == 0L) return(0L)
  a$leituras <- a$leituras + 1L
  a$altura_no[p]
}

ler_esq_r <- function(a, p) { a$leituras <- a$leituras + 1L; a$esq[p] }
ler_dir_r <- function(a, p) { a$leituras <- a$leituras + 1L; a$dir[p] }

montar_comum_r <- function(valores) {
  a <- arvore_vazia_r(valores)
  for (v in valores) {
    novo <- match(v, a$valores)
    if (a$raiz == 0L) { a$raiz <- novo; next }
    p <- a$raiz
    repeat {
      a$leituras <- a$leituras + 1L
      a$comparacoes <- a$comparacoes + 1L
      if (novo == p) break
      a$comparacoes <- a$comparacoes + 1L
      lado <- if (novo < p) "esq" else "dir"
      f <- if (lado == "esq") ler_esq_r(a, p) else ler_dir_r(a, p)
      if (f == 0L) {
        if (lado == "esq") { a$esq[p] <- novo } else { a$dir[p] <- novo }
        a$escritas <- a$escritas + 1L
        break
      }
      p <- f
    }
  }
  # A montagem da ABB é fora da conta em abb.py e arvores.montar.
  a$leituras <- 0L; a$escritas <- 0L; a$comparacoes <- 0L
  a
}

atualiza_altura_r <- function(a, p) {
  a$escritas <- a$escritas + 1L
  e <- ler_esq_r(a, p); d <- ler_dir_r(a, p)
  a$altura_no[p] <- 1L + max(h_contada_r(a, e), h_contada_r(a, d))
  a
}

gira_dir_r <- function(a, p) {
  e <- ler_esq_r(a, p)
  meio <- ler_dir_r(a, e)
  a$escritas <- a$escritas + 1L; a$esq[p] <- meio
  a$escritas <- a$escritas + 1L; a$dir[e] <- p
  a <- atualiza_altura_r(a, p); a <- atualiza_altura_r(a, e)
  a$rotacoes <- a$rotacoes + 1L
  list(a = a, raiz = e)
}

gira_esq_r <- function(a, p) {
  d <- ler_dir_r(a, p)
  meio <- ler_esq_r(a, d)
  a$escritas <- a$escritas + 1L; a$dir[p] <- meio
  a$escritas <- a$escritas + 1L; a$esq[d] <- p
  a <- atualiza_altura_r(a, p); a <- atualiza_altura_r(a, d)
  a$rotacoes <- a$rotacoes + 1L
  list(a = a, raiz = d)
}

equilibra_r <- function(a, p) {
  e <- ler_esq_r(a, p); d <- ler_dir_r(a, p)
  he <- h_contada_r(a, e); hd <- h_contada_r(a, d)
  if (he > hd + 1L) {
    ee <- ler_esq_r(a, e); ed <- ler_dir_r(a, e)
    if (h_contada_r(a, ee) < h_contada_r(a, ed)) {
      g <- gira_esq_r(a, e); a <- g$a
      a$escritas <- a$escritas + 1L; a$esq[p] <- g$raiz
    }
    g <- gira_dir_r(a, p); return(list(a = g$a, raiz = g$raiz))
  }
  if (hd > he + 1L) {
    dd <- ler_dir_r(a, d); de <- ler_esq_r(a, d)
    if (h_contada_r(a, dd) < h_contada_r(a, de)) {
      g <- gira_dir_r(a, d); a <- g$a
      a$escritas <- a$escritas + 1L; a$dir[p] <- g$raiz
    }
    g <- gira_esq_r(a, p); return(list(a = g$a, raiz = g$raiz))
  }
  a$escritas <- a$escritas + 1L; a$altura_no[p] <- 1L + max(he, hd)
  list(a = a, raiz = p)
}

insere_avl_no_r <- function(a, p, novo, nivel) {
  a$pico_pilha <- max(a$pico_pilha, nivel)
  a$pico_memoria <- max(a$pico_memoria, a$alocacao + nivel)
  if (p == 0L) {
    a$altura_no[novo] <- 1L
    a$escritas <- a$escritas + 4L
    return(list(a = a, raiz = novo))
  }
  v <- a$valores[p]
  a$leituras <- a$leituras + 1L; a$comparacoes <- a$comparacoes + 1L
  if (novo == p) return(list(a = a, raiz = p))
  a$comparacoes <- a$comparacoes + 1L
  if (novo < p) {
    f <- ler_esq_r(a, p); z <- insere_avl_no_r(a, f, novo, nivel + 1L); a <- z$a
    if (z$raiz != f) { a$escritas <- a$escritas + 1L; a$esq[p] <- z$raiz }
  } else {
    f <- ler_dir_r(a, p); z <- insere_avl_no_r(a, f, novo, nivel + 1L); a <- z$a
    if (z$raiz != f) { a$escritas <- a$escritas + 1L; a$dir[p] <- z$raiz }
  }
  equilibra_r(a, p)
}

montar_avl_r <- function(valores) {
  a <- arvore_vazia_r(valores, avl = TRUE)
  for (v in valores) {
    a$alocacao <- 4L * (a$n_inseridos + 1L)
    z <- insere_avl_no_r(a, a$raiz, match(v, a$valores), 1L)
    a <- z$a; a$raiz <- z$raiz
    a$n_inseridos <- a$n_inseridos + 1L
  }
  a
}

altura_arvore_r <- function(a) altura_subarvore_r(a, a$raiz)

grafo_arvore_r <- function(a) {
  n <- length(a$valores)
  if (n == 0L) return(igraph::make_empty_graph(n = 0, directed = TRUE))
  arestas <- integer()
  for (p in seq_len(n)) {
    if (a$esq[p] != 0L) arestas <- c(arestas, p, a$esq[p])
    if (a$dir[p] != 0L) arestas <- c(arestas, p, a$dir[p])
  }
  igraph::make_graph(arestas, n = n, directed = TRUE)
}

ordens_igraph_r <- function(a) {
  if (a$raiz == 0L) return(list(pre = numeric(), em = numeric(), pos = numeric(), largura = numeric()))
  g <- grafo_arvore_r(a); raiz <- a$raiz
  # igraph visita adjacências na ordem crescente do id do vértice. Como os ids
  # são a ordem crescente dos valores, o filho esquerdo é visitado primeiro.
  dfs <- igraph::dfs(g, root = raiz, mode = "out", unreachable = FALSE, order.out = TRUE)
  bfs <- igraph::bfs(g, root = raiz, mode = "out", unreachable = FALSE)
  list(pre = a$valores[as.integer(dfs$order)],
       em = sort(a$valores),
       pos = a$valores[as.integer(dfs$order.out)],
       largura = a$valores[as.integer(bfs$order)])
}

pilha_percurso_r <- function(a) {
  pico <- 0L
  visita <- function(p, nivel) {
    pico <<- max(pico, nivel)
    if (p == 0L) return(invisible(NULL))
    visita(a$esq[p], nivel + 1L); visita(a$dir[p], nivel + 1L)
  }
  visita(a$raiz, 1L)
  pico
}

fila_percurso_r <- function(a) {
  if (a$raiz == 0L) return(0L)
  fila <- a$raiz; inicio <- 1L; pico <- 1L
  while (inicio <= length(fila)) {
    p <- fila[inicio]; inicio <- inicio + 1L
    filhos <- c(a$esq[p], a$dir[p]); filhos <- filhos[filhos != 0L]
    fila <- c(fila, filhos)
    pico <- max(pico, length(fila) - inicio + 1L)
  }
  pico
}

busca_r <- function(a, alvo) {
  p <- a$raiz; comp <- 0L; achou <- FALSE; antes <- a$leituras
  while (p != 0L) {
    a$leituras <- a$leituras + 1L; v <- a$valores[p]
    comp <- comp + 1L
    if (alvo == v) { achou <- TRUE; break }
    comp <- comp + 1L
    if (alvo < v) p <- ler_esq_r(a, p) else p <- ler_dir_r(a, p)
  }
  list(a = a, comparacoes = comp, achou = achou, casas = a$leituras - antes)
}
