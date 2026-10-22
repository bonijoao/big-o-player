# Confere a busca em árvore medida em Python. Rodar da raiz do repositório.
source("motor/arvore.R")
pasta <- "algoritmos/abb"
py <- jsonlite::read_json(file.path(pasta, "dados.json"), simplifyVector = FALSE)
casos <- py$conferir
linhas <- lapply(casos, function(caso) {
  v <- as.numeric(unlist(caso$valores)); alvos <- as.numeric(unlist(caso$alvos))
  a <- montar_comum_r(v)
  rs <- lapply(alvos, function(x) busca_r(a, x))
  comps <- vapply(rs, `[[`, integer(1), "comparacoes")
  achou <- vapply(rs, `[[`, logical(1), "achou")
  cp <- as.numeric(unlist(caso$comparacoes)); ap <- as.logical(unlist(caso$achou))
  data.frame(caso = caso$caso, n = length(v), comparacoes = identical(as.numeric(comps), cp),
    achou = identical(achou, ap), ops = sum(comps), ops_py = caso$ops,
    altura = altura_arvore_r(a), altura_py = caso$altura,
    pico = 3L * length(v), pico_py = caso$pico,
    casas = sum(vapply(rs, `[[`, integer(1), "casas")), casas_py = caso$casas)
})
tab <- do.call(rbind, linhas)
print(tab, row.names = FALSE)
tudo_ok <- all(tab$comparacoes & tab$achou) && all(tab$ops == tab$ops_py) &&
  all(tab$altura == tab$altura_py) && all(tab$pico == tab$pico_py) &&
  all(tab$casas == tab$casas_py)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(list(
  referencia = "busca_r() sobre vetores valor/esq/dir em motor/arvore.R",
  versao_r = versao, casos = nrow(tab), tudo_ok = tudo_ok,
  resumo = sprintf("Rodado em R %s em %d árvores (vazias e com até %d nós): %s",
    versao, nrow(tab), max(tab$n), if (tudo_ok)
      "comparações e resultados encontrados batem caso a caso com o Python; altura, pico da árvore e casas lidas também."
    else "há divergência; veja a tabela impressa e conferir.R.")
), file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE)
stopifnot(tudo_ok)
cat("ok: busca em árvore em R concorda com o Python\n")
