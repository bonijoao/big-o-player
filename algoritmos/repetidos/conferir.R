# Confere achar repetidos do Python contra o duplicated() do R (TRUE em cada
# posição cujo valor já apareceu antes) e conta, num laço em R, as comparações
# da versão com o vetor (cada valor contra os anteriores, até achar um igual).
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/repetidos/conferir.R
pasta <- "algoritmos/repetidos"

comparacoes_vetor <- function(v) {
  comp <- 0
  for (i in seq_along(v)) {
    for (j in seq_len(i - 1)) {
      comp <- comp + 1
      if (v[j] == v[i]) break
    }
  }
  comp
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
casos <- c(list(c(py$exemplo, caso = "encarte")), py$conferir)
tab <- do.call(rbind, lapply(casos, function(caso) {
  v <- as.numeric(unlist(caso$vetor))
  rep_py <- as.logical(unlist(caso$repetido))
  data.frame(caso = caso$caso, n = length(v), repetidos = sum(duplicated(v)),
             resposta = identical(duplicated(v), if (length(v)) rep_py else logical(0)),
             vetor_r = comparacoes_vetor(v), vetor_py = caso$ops_vetor,
             chaves = length(unique(v)), pico_py = if (is.null(caso$pico)) py$memoria$pico else caso$pico)
}))
print(tab, row.names = FALSE)
tudo_ok <- all(tab$resposta) && all(tab$vetor_r == tab$vetor_py) && all(tab$chaves == tab$pico_py)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = "duplicated() do R e comparacoes_vetor() (laço em R)",
    versao_r = versao,
    vetores = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "Rodado em R %s em %d vetores (sorteados, todos distintos e com poucos valores, de %d a %d valores): %s",
      versao, nrow(tab), min(tab$n), max(tab$n),
      if (tudo_ok) "as posições repetidas batem com o duplicated() do R, as comparações da versão com o vetor batem com um laço em R, e o dicionário guarda no pico exatamente os valores distintos (length(unique(v)))."
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: duplicated() no R concorda com o Python\n")
