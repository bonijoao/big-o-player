# Confere os parênteses balanceados do Python contra uma reimplementação
# independente em R (a pilha é um vetor de caracteres) e contra uma regra que
# não usa pilha: apagar "()", "[]" e "{}" até não sobrar par; o texto é
# balanceado se e só se não sobrar nada.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/parenteses/conferir.R
pasta <- "algoritmos/parenteses"

parenteses_r <- function(texto) {
  par <- c(")" = "(", "]" = "[", "}" = "{")
  pilha <- character(0); ops <- 0; comp <- 0; pico <- 0; certo <- TRUE
  for (s in strsplit(texto, "")[[1]]) {
    if (s %in% par) {
      pilha <- c(pilha, s); ops <- ops + 1; pico <- max(pico, length(pilha))
    } else if (length(pilha) == 0) {
      certo <- FALSE; break
    } else {
      topo <- pilha[length(pilha)]; pilha <- pilha[-length(pilha)]; ops <- ops + 1
      comp <- comp + 1
      if (topo != par[[s]]) { certo <- FALSE; break }
    }
  }
  if (length(pilha) > 0) certo <- FALSE
  list(certo = certo, ops = ops, comparacoes = comp, pico = pico)
}

apagando_pares <- function(texto) {
  repeat {
    menor <- gsub("\\(\\)|\\[\\]|\\{\\}", "", texto)
    if (menor == texto) return(nchar(texto) == 0)
    texto <- menor
  }
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
tab <- do.call(rbind, lapply(py$conferir, function(caso) {
  r <- parenteses_r(caso$texto)
  data.frame(n = nchar(caso$texto), caso = caso$caso,
             certo_r = r$certo, certo_py = caso$certo, certo_pares = apagando_pares(caso$texto),
             ops_r = r$ops, ops_py = caso$ops, comp_r = r$comparacoes, comp_py = caso$comparacoes,
             pico_r = r$pico, pico_py = caso$pico)
}))
print(tab, row.names = FALSE)
tudo_ok <- all(tab$certo_r == tab$certo_py) && all(tab$certo_pares == tab$certo_py) &&
  all(tab$ops_r == tab$ops_py) && all(tab$comp_r == tab$comp_py) && all(tab$pico_r == tab$pico_py)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = "parenteses_r() (reimplementação em R) e a regra de apagar pares com gsub()",
    versao_r = versao,
    vetores = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "Reescrito em R %s e rodado em %d textos de %d símbolos (balanceados, com um par errado, sobrando aberto, só abrindo e fechando sem abrir): %s",
      versao, nrow(tab), tab$n[1],
      if (tudo_ok) "o veredito bate com o Python e com a regra de apagar pares até não sobrar nenhum, e as operações na pilha, as comparações e a pilha mais alta batem uma a uma."
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: parenteses_r() em R concorda com o Python\n")
