# Confere percursos medidos em Python. Rodar da raiz do repositório.
source("motor/arvore.R")
pasta <- "algoritmos/percursos"
py <- jsonlite::read_json(file.path(pasta, "dados.json"), simplifyVector = FALSE)
casos <- py$conferir
eq_num <- function(a, b) identical(as.numeric(a), as.numeric(unlist(b)))

linhas <- lapply(casos, function(caso) {
  v <- as.numeric(unlist(caso$valores)); a <- montar_comum_r(v)
  ord <- ordens_igraph_r(a)
  desc <- pilha_percurso_r(a); fila <- fila_percurso_r(a)
  data.frame(caso = caso$caso, n = length(v), pre = eq_num(ord$pre, caso$pre),
    em = eq_num(ord$em, caso$em), pos = eq_num(ord$pos, caso$pos),
    largura = eq_num(ord$largura, caso$largura), visitas = desc$visitas, visitas_py = caso$visitas,
    pilha = desc$pico, pilha_py = caso$pilha, fila = fila, fila_py = caso$fila,
    casas = desc$casas, casas_py = caso$casas, altura = altura_arvore_r(a), altura_py = caso$altura)
})
tab <- do.call(rbind, linhas)
if (is.null(tab)) tab <- data.frame()
print(tab, row.names = FALSE)
tudo_ok <- nrow(tab) > 0L && all(tab$pre & tab$em & tab$pos & tab$largura) &&
  all(tab$visitas == tab$visitas_py) && all(tab$pilha == tab$pilha_py) &&
  all(tab$fila == tab$fila_py) && all(tab$casas == tab$casas_py) &&
  all(tab$altura == tab$altura_py)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(list(
  referencia = "igraph::dfs()/bfs() para os percursos e arvore.R para pilha, fila, altura e casas lidas",
  versao_r = versao, casos = nrow(tab), tudo_ok = tudo_ok,
  resumo = sprintf("Rodado em R %s em %d árvores (vazias e com até %d nós): %s",
    versao, nrow(tab), max(tab$n), if (tudo_ok)
      "as ordens pré, em, pós e largura batem com o Python; visitas, alturas, casas lidas e picos de pilha e fila também. O igraph visita os filhos em ordem crescente de vértice, portanto à esquerda antes da direita."
    else "há divergência; veja a tabela impressa e conferir.R.")
), file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE)
stopifnot(tudo_ok)
cat("ok: percursos em R concordam com o Python\n")
