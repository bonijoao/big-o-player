# Confere a busca em profundidade do Python contra o igraph (dfs(): a ordem de
# visita) e contra uma reimplementação recursiva em R, que refaz as operações
# contadas e a pilha mais alta (a pilha de chamadas da recursão tem a mesma
# altura que a pilha do Python).
# O igraph numera os vértices a partir de 1; os vizinhos vão em ordem crescente,
# como na lista de adjacência do Python.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/profundidade/conferir.R
suppressPackageStartupMessages(library(igraph))
pasta <- "algoritmos/profundidade"

grafo_de <- function(caso) {
  V <- caso$k^2
  a <- matrix(unlist(caso$arestas), ncol = 2, byrow = TRUE) + 1
  make_graph(as.vector(t(a)), n = V, directed = FALSE)
}

# a recursão: cada chamada é um vértice na pilha. Contagem igual à do Python:
# empilhar e desempilhar uma vez por vértice, um topo por vizinho olhado e mais
# um quando acabam os vizinhos, e um por vizinho olhado
profundidade_r <- function(g) {
  ordem <- integer(0); ops <- 0; altura <- 0; maior <- 0
  visita <- function(u) {
    ordem[length(ordem) + 1] <<- u
    ops <<- ops + 1; altura <<- altura + 1; maior <<- max(maior, altura)
    for (v in sort(as.integer(neighbors(g, u)))) {
      ops <<- ops + 2                      # o topo e o vizinho olhado
      if (!(v %in% ordem)) visita(v)
    }
    ops <<- ops + 2                        # o topo sem vizinho e o desempilhar
    altura <<- altura - 1
  }
  visita(1L)
  list(ordem = ordem, ops = ops, pilha = maior)
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
casos <- c(list(c(py$exemplo, list(caso = "encarte"))), py$conferir)
tab <- do.call(rbind, lapply(casos, function(caso) {
  g <- grafo_de(caso)
  d <- dfs(g, root = 1, order = TRUE, unreachable = FALSE)
  r <- profundidade_r(g)
  visitas_py <- as.integer(unlist(caso$visitas)) + 1L
  data.frame(caso = caso$caso, V = vcount(g), E = ecount(g),
             ordem_igraph = identical(as.integer(d$order), visitas_py),
             ordem_r = identical(r$ordem, visitas_py),
             ops_r = r$ops, ops_py = caso$ops, pilha_r = r$pilha, pilha_py = caso$estrutura)
}))
print(tab, row.names = FALSE)
tudo_ok <- all(tab$ordem_igraph) && all(tab$ordem_r) && all(tab$ops_r == tab$ops_py) && all(tab$pilha_r == tab$pilha_py)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = sprintf("igraph::dfs() (igraph %s) e profundidade_r() (reimplementação recursiva em R)", packageVersion("igraph")),
    versao_r = versao,
    vetores = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "Rodado no R %s com o igraph %s em %d grafos (o do encarte e %d grades %d × %d: sorteadas, cheias e em caminho): %s",
      versao, packageVersion("igraph"), nrow(tab), nrow(tab) - 1, py$conferir[[1]]$k, py$conferir[[1]]$k,
      if (tudo_ok) "a ordem de visita bate com o dfs() do igraph, e a versão recursiva em R visita na mesma ordem, conta as mesmas operações e chega à mesma pilha mais alta."
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: o dfs() do igraph e profundidade_r() concordam com o Python\n")
