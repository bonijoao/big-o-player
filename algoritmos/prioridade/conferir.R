# Confere o pronto-socorro do Python por dois caminhos independentes.
# 1. Sem heap: a cada vez que o médico fica livre, ordena quem já chegou e
#    espera (order() por gravidade e depois por chegada) e chama o primeiro.
#    Daí saem a ordem de atendimento, a espera de cada paciente e a maior fila.
# 2. Com um heap escrito em R, sobre um vetor que dobra quando enche, contando
#    cada casa lida e escrita como o instrumento Heap: os acessos ao heap.
# O R recebe os sorteios gravados no dados.json (não refaz o gerador do Python).
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/prioridade/conferir.R
pasta <- "algoritmos/prioridade"

# 1. sem heap: a escolha do mais urgente por order()
sem_heap <- function(chegada, duracao, gravidade) {
  n <- length(chegada); espera <- rep(NA_real_, n); ordem <- integer(0)
  livre <- 0; i <- 1; maior <- 0; esperando <- integer(0)
  for (volta in seq_len(n)) {
    while (i <= n && chegada[i] < livre) {
      esperando <- c(esperando, i); i <- i + 1
      maior <- max(maior, length(esperando))
    }
    if (length(esperando) > 0) {
      j <- esperando[order(gravidade[esperando], esperando)][1]
      esperando <- setdiff(esperando, j)
    } else {
      j <- i; i <- i + 1
    }
    inicio <- max(livre, chegada[j])
    espera[j] <- inicio - chegada[j]
    ordem <- c(ordem, j)
    livre <- inicio + duracao[j]
  }
  list(espera = espera, ordem = ordem, maior = maior)
}

# 2. o heap de mínimo em R, contando casas como instrumentos/heap/heap.py
source("motor/heap.R")
com_heap <- function(chegada, duracao, gravidade) {
  n <- length(chegada); h <- heap_novo(); livre <- 0; i <- 1
  for (volta in seq_len(n)) {
    while (i <= n && chegada[i] < livre) { inserir(h, c(gravidade[i], i)); i <- i + 1 }
    if (h$n > 0) j <- tirar(h)[2] else { j <- i; i <- i + 1 }
    livre <- max(livre, chegada[j]) + duracao[j]
  }
  h$acessos
}

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
casos <- c(list(c(py$exemplo, list(movimento = "encarte"))), py$conferir)
tab <- do.call(rbind, lapply(casos, function(caso) {
  chegada <- unlist(caso$chegada); duracao <- unlist(caso$duracao); gravidade <- unlist(caso$gravidade)
  s <- sem_heap(chegada, duracao, gravidade)
  data.frame(n = length(chegada), movimento = caso$movimento,
             ordem_ok = identical(as.integer(s$ordem) - 1L, as.integer(unlist(caso$ordem))),
             esperas_ok = identical(s$espera, as.numeric(unlist(caso$esperas))),
             maior_r = s$maior, maior_py = caso$maior,
             acessos_r = com_heap(chegada, duracao, gravidade), acessos_py = caso$ops)
}))
print(tab, row.names = FALSE)
tudo_ok <- all(tab$ordem_ok) && all(tab$esperas_ok) && all(tab$maior_r == tab$maior_py) && all(tab$acessos_r == tab$acessos_py)
versao <- paste(R.version$major, R.version$minor, sep = ".")
jsonlite::write_json(
  list(
    referencia = "order() em R, sem heap, e um heap reescrito em R que conta casas",
    versao_r = versao,
    vetores = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "Refeito em R %s em %d sorteios (o do encarte e %d de %d pacientes: calmo, no limite e lotado). Escolhendo o mais urgente com order(), sem heap nenhum, %s",
      versao, nrow(tab), nrow(tab) - 1, tab$n[2],
      if (tudo_ok) "a ordem de atendimento, a espera de cada paciente e a maior fila batem com o Python; um heap reescrito em R conta os mesmos acessos ao heap."
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: order() e o heap em R concordam com o Python\n")
