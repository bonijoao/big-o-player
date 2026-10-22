# Confere a inversão da lista encadeada do Python contra uma reimplementação
# independente em R (a lista estática: um vetor de valores e um de próximos,
# 0 no último) e contra rev(), que inverte sem ponteiro nenhum.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/inverter/conferir.R
pasta <- "algoritmos/inverter"

inverter_r <- function(valores) {
  n <- length(valores)
  prox <- if (n > 0) c(seq_len(n)[-1], 0) else integer(0)   # a lista montada na ordem: o nó i aponta para o i + 1
  inicio <- if (n > 0) 1 else 0
  anterior <- 0; atual <- inicio; ponteiros <- 0; casas <- 0
  while (atual != 0) {
    proximo <- prox[atual]; casas <- casas + 1          # lê o próx do atual
    prox[atual] <- anterior; casas <- casas + 1         # e escreve o anterior nele
    ponteiros <- ponteiros + 1
    anterior <- atual; atual <- proximo
  }
  # percorre a lista invertida a partir do novo início
  ordem <- numeric(0); p <- anterior
  while (p != 0) { ordem <- c(ordem, valores[p]); p <- prox[p] }
  list(invertida = ordem, ponteiros = ponteiros, casas = casas)
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"), simplifyVector = TRUE)
casos <- py$conferir
tab <- do.call(rbind, lapply(seq_len(nrow(casos)), function(j) {
  v <- unlist(casos$valores[[j]])
  r <- inverter_r(v)
  data.frame(n = length(v),
             igual_rev = identical(as.numeric(r$invertida), as.numeric(rev(v))),
             igual_py = identical(as.numeric(r$invertida), as.numeric(unlist(casos$invertida[[j]]))),
             ponteiros_r = r$ponteiros, ponteiros_py = casos$ops[j],
             casas_r = r$casas, casas_py = casos$casas[j])
}))
print(tab, row.names = FALSE)
tudo_ok <- all(tab$igual_rev) && all(tab$igual_py) &&
  all(tab$ponteiros_r == tab$ponteiros_py) && all(tab$casas_r == tab$casas_py)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = "inverter_r() (reimplementação em R sobre os vetores valor e próx) e rev()",
    versao_r = versao,
    vetores = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "Reescrito em R %s sobre dois vetores (valor e próx) e rodado em %d listas de %d a %d nós, inclusive a vazia: %s",
      versao, nrow(tab), min(tab$n), max(tab$n),
      if (tudo_ok) "a lista invertida bate com a do Python e com rev(), e os ponteiros trocados e as casas lidas e escritas batem uma a uma."
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: inverter_r() em R concorda com o Python\n")
