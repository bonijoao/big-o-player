# Confere o Dijkstra do Python contra o igraph (distances() com os pesos: a
# distância mínima da origem a cada vértice) e contra uma reimplementação
# curta em R, com o heap de motor/heap.R, que refaz os acessos contados (casas
# do heap e um por vizinho olhado), os pares descartados, a ordem em que os
# vértices saem do heap valendo e o heap mais alto.
# O igraph numera os vértices a partir de 1; os vizinhos vão em ordem crescente,
# como na lista de adjacência do Python.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/dijkstra/conferir.R
suppressPackageStartupMessages(library(igraph))
source("motor/heap.R")
pasta <- "algoritmos/dijkstra"

grafo_de <- function(caso) {
  a <- matrix(unlist(caso$arestas), ncol = 2, byrow = TRUE) + 1
  g <- make_graph(as.vector(t(a)), n = caso$k^2, directed = FALSE)
  E(g)$weight <- unlist(caso$pesos)
  g
}

dijkstra_r <- function(g) {
  V <- vcount(g); dist <- rep(Inf, V); dist[1] <- 0
  h <- heap_novo(); inserir(h, c(0, 1))
  olhados <- 0; descartados <- 0; maior <- 1; ordem <- integer(0)
  while (h$n > 0) {
    par <- tirar(h); d <- par[1]; u <- par[2]
    if (d == dist[u]) {
      ordem <- c(ordem, u)
      for (v in sort(as.integer(neighbors(g, u)))) {
        olhados <- olhados + 1
        w <- E(g)$weight[get_edge_ids(g, c(u, v))]
        if (d + w < dist[v]) {
          dist[v] <- d + w
          inserir(h, c(dist[v], v)); maior <- max(maior, h$n)
        }
      }
    } else {
      descartados <- descartados + 1
    }
  }
  list(acessos = h$acessos + olhados, descartados = descartados, ordem = ordem, heap = maior)
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
casos <- c(list(c(py$exemplo, list(caso = "encarte"))), py$conferir)
tab <- do.call(rbind, lapply(casos, function(caso) {
  g <- grafo_de(caso)
  ref <- as.numeric(distances(g, v = 1, weights = E(g)$weight))
  r <- dijkstra_r(g)
  data.frame(caso = caso$caso, V = vcount(g), E = ecount(g),
             dist_ok = isTRUE(all.equal(ref, as.numeric(unlist(caso$dist)))),
             ordem_ok = identical(as.integer(r$ordem) - 1L, as.integer(unlist(caso$ordem))),
             acessos_r = r$acessos, acessos_py = caso$ops,
             descartados_r = r$descartados, descartados_py = caso$descartados,
             heap_r = r$heap, heap_py = caso$estrutura)
}))
print(tab, row.names = FALSE)
tudo_ok <- all(tab$dist_ok) && all(tab$ordem_ok) && all(tab$acessos_r == tab$acessos_py) &&
  all(tab$descartados_r == tab$descartados_py) && all(tab$heap_r == tab$heap_py)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = sprintf("igraph::distances() (igraph %s) e dijkstra_r() (reimplementação em R)", packageVersion("igraph")),
    versao_r = versao,
    vetores = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "Rodado no R %s com o igraph %s em %d grafos com pesos (o do encarte e %d grades %d × %d: sorteadas, cheias e em caminho): %s",
      versao, packageVersion("igraph"), nrow(tab), nrow(tab) - 1, py$conferir[[1]]$k, py$conferir[[1]]$k,
      if (tudo_ok) "a distância de cada vértice bate com o distances() do igraph, e a reimplementação em R, com um heap que conta casas, conta os mesmos acessos, descarta os mesmos pares, tira os vértices na mesma ordem e chega ao mesmo heap mais alto."
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: o distances() do igraph e dijkstra_r() concordam com o Python\n")
