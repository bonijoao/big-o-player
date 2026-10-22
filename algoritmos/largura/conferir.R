# Confere a busca em largura do Python contra o igraph (bfs(): a ordem de
# visita e a distância de cada vértice à origem) e contra uma reimplementação
# curta em R, que refaz as operações contadas e a fila mais longa.
# O igraph numera os vértices a partir de 1; os vizinhos vão em ordem crescente,
# como na lista de adjacência do Python.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/largura/conferir.R
suppressPackageStartupMessages(library(igraph))
pasta <- "algoritmos/largura"

grafo_de <- function(caso) {
  V <- caso$k^2
  a <- matrix(unlist(caso$arestas), ncol = 2, byrow = TRUE) + 1
  make_graph(as.vector(t(a)), n = V, directed = FALSE)
}

largura_r <- function(g) {
  V <- vcount(g)
  dist <- rep(NA_integer_, V); dist[1] <- 0L
  fila <- 1L; ops <- 1; maior <- 1
  while (length(fila) > 0) {
    u <- fila[1]; fila <- fila[-1]; ops <- ops + 1
    for (v in sort(as.integer(neighbors(g, u)))) {
      ops <- ops + 1
      if (is.na(dist[v])) {
        dist[v] <- dist[u] + 1L
        fila <- c(fila, v); ops <- ops + 1; maior <- max(maior, length(fila))
      }
    }
  }
  list(ops = ops, fila = maior)
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
casos <- c(list(c(py$exemplo, list(caso = "encarte"))), py$conferir)
tab <- do.call(rbind, lapply(casos, function(caso) {
  g <- grafo_de(caso)
  b <- bfs(g, root = 1, order = TRUE, dist = TRUE, unreachable = FALSE)
  r <- largura_r(g)
  dist_py <- vapply(caso$dist, function(x) if (is.null(x)) NA_real_ else x, 0)
  data.frame(caso = caso$caso, V = vcount(g), E = ecount(g),
             ordem_ok = identical(as.integer(b$order) - 1L, as.integer(unlist(caso$visitas))),
             dist_ok = isTRUE(all.equal(as.numeric(b$dist), dist_py)),
             ops_r = r$ops, ops_py = caso$ops, fila_r = r$fila, fila_py = caso$estrutura)
}))
print(tab, row.names = FALSE)
tudo_ok <- all(tab$ordem_ok) && all(tab$dist_ok) && all(tab$ops_r == tab$ops_py) && all(tab$fila_r == tab$fila_py)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = sprintf("igraph::bfs() (igraph %s) e largura_r() (reimplementação em R)", packageVersion("igraph")),
    versao_r = versao,
    vetores = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "Rodado no R %s com o igraph %s em %d grafos (o do encarte e %d grades %d × %d: sorteadas, cheias e em caminho): %s",
      versao, packageVersion("igraph"), nrow(tab), nrow(tab) - 1, py$conferir[[1]]$k, py$conferir[[1]]$k,
      if (tudo_ok) "a ordem de visita e a distância de cada vértice batem com o bfs() do igraph, e a reimplementação em R conta as mesmas operações e a mesma fila mais longa."
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: o bfs() do igraph e largura_r() concordam com o Python\n")
