# Confere inserção AVL e árvore comum medidas em Python. Rodar da raiz.
source("motor/arvore.R")
pasta <- "algoritmos/avl"
py <- jsonlite::read_json(file.path(pasta, "dados.json"), simplifyVector = FALSE)
casos <- py$conferir

comum_metricas_r <- function(v) {
  b <- arvore_vazia_r(v); comparacoes <- 0L
  for (x in v) {
    novo <- match(x, b$valores)
    if (b$raiz == 0L) { b$raiz <- novo; next }
    p <- b$raiz
    repeat {
      comparacoes <- comparacoes + 1L
      if (novo == p) break
      comparacoes <- comparacoes + 1L
      if (novo < p) {
        if (b$esq[p] == 0L) { b$esq[p] <- novo; break }
        p <- b$esq[p]
      } else {
        if (b$dir[p] == 0L) { b$dir[p] <- novo; break }
        p <- b$dir[p]
      }
    }
  }
  list(comparacoes = comparacoes, altura = altura_arvore_r(b))
}

linhas <- lapply(casos, function(caso) {
  v <- as.numeric(unlist(caso$valores)); a <- montar_avl_r(v); comum <- comum_metricas_r(v)
  h <- altura_arvore_r(a); n <- length(v)
  baixo <- if (n == 0L) 0 else log2(n + 1)
  alto <- if (n == 0L) 0 else 1.44 * log2(n + 2)
  por_insercao <- integer(n)
  aa <- arvore_vazia_r(v, avl = TRUE)
  for (i in seq_along(v)) {
    aa$alocacao <- 4L * i
    antes <- aa$comparacoes
    z <- insere_avl_no_r(aa, aa$raiz, match(v[i], aa$valores), 1L)
    aa <- z$a; aa$raiz <- z$raiz
    por_insercao[i] <- aa$comparacoes - antes
  }
  data.frame(caso = caso$caso, n = n,
    comparacoes_insercao = identical(as.numeric(por_insercao), as.numeric(unlist(caso$comparacoes))),
    ops = a$comparacoes, ops_py = caso$ops, rotacoes = a$rotacoes, rotacoes_py = caso$rotacoes,
    altura = h, altura_py = caso$altura, limite_inferior = h >= baixo - 1e-10,
    limite_superior = h <= alto + 1e-10,
    comum = comum$comparacoes, comum_py = caso$comum,
    altura_comum = comum$altura, altura_comum_py = caso$altura_comum,
    casas = a$leituras + a$escritas, casas_py = caso$casas,
    pico = a$pico_memoria, pico_py = caso$pico)
})
tab <- do.call(rbind, linhas)
print(tab, row.names = FALSE)
tudo_ok <- all(tab$ops == tab$ops_py) && all(tab$rotacoes == tab$rotacoes_py) &&
  all(tab$altura == tab$altura_py) && all(tab$comparacoes_insercao) &&
  all(tab$comum == tab$comum_py) && all(tab$altura_comum == tab$altura_comum_py) &&
  all(tab$casas == tab$casas_py) && all(tab$pico == tab$pico_py) &&
  all(tab$limite_inferior & tab$limite_superior)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(list(
  referencia = "inserção AVL e árvore comum reimplementadas em motor/arvore.R sobre vetores valor/esq/dir/altura",
  versao_r = versao, casos = nrow(tab), tudo_ok = tudo_ok,
  resumo = sprintf("Rodado em R %s em %d inserções (vazias e com até %d valores): %s",
    versao, nrow(tab), max(tab$n), if (tudo_ok)
      "comparações, rotações, alturas, casas lidas e escritas, pico da pilha e resultados da árvore comum batem com o Python caso a caso; todas as alturas AVL ficam entre log2(n + 1) e 1,44·log2(n + 2)."
    else "há divergência; veja a tabela impressa e conferir.R.")
), file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE)
stopifnot(tudo_ok)
cat("ok: AVL em R concorda com o Python\n")
