# As duas faixas de colisão conferidas contra as fórmulas de Knuth, sem a
# função de dispersão do Python: o R sorteia a casa de cada chave (dispersão
# uniforme), refaz a tabela do seu jeito e conta as sondagens de cada inserção.
# Confere as médias do R e as do Python (dados.json) contra as fórmulas.
# Usado por algoritmos/encadeamento/conferir.R e algoritmos/sondagem/conferir.R.

# sondagens de cada inserção, pondo n chaves em m casas
sondagens_encadeamento <- function(casas, m) {
  tam <- integer(m); s <- integer(length(casas))
  for (j in seq_along(casas)) {
    h <- casas[j]
    s[j] <- 1L + tam[h]                   # o início da corrente e cada nó dela
    tam[h] <- tam[h] + 1L
  }
  s
}

sondagens_sondagem <- function(casas, m) {
  ocupada <- logical(m); s <- integer(length(casas))
  for (j in seq_along(casas)) {
    i <- casas[j]; k <- 1L
    while (ocupada[i]) { i <- i %% m + 1L; k <- k + 1L }   # a casa seguinte, dando a volta
    ocupada[i] <- TRUE
    s[j] <- k                              # conta também a casa vazia onde entrou
  }
  s
}

conferir_colisao <- function(pasta, versao, sondagens, f_media, f_ultima,
                             bits = 16, sementes = 20, tol_media = 0.05, tol_ultima = 0.10) {
  py <- jsonlite::read_json(file.path(pasta, "dados.json"))
  alfa <- py$tempo$alfa
  m <- 2^bits; janela <- m %/% 200
  pontos <- vapply(alfa$pontos, function(p) p$alfa, numeric(1))
  n_max <- round(max(pontos) * m) + janela + 1
  por_semente <- lapply(seq_len(sementes), function(s) {
    set.seed(s)
    sondagens(sample.int(m, n_max, replace = TRUE), m)
  })
  tab <- do.call(rbind, lapply(seq_along(pontos), function(k) {
    a <- pontos[k]; n <- round(a * m); p <- alfa$pontos[[k]]
    media_r <- mean(vapply(por_semente, function(sd) mean(sd[seq_len(n)]), numeric(1)))
    ultima_r <- mean(vapply(por_semente, function(sd) mean(sd[(n - janela + 1):(n + janela)]), numeric(1)))
    data.frame(alfa = a, formula_media = f_media(a), media_r = media_r, media_py = p$media,
               formula_ultima = f_ultima(a), ultima_r = ultima_r, ultima_py = p$ultima)
  }))
  dif <- function(x, f) abs(x / f - 1)
  tab$ok <- dif(tab$media_r, tab$formula_media) <= tol_media & dif(tab$media_py, tab$formula_media) <= tol_media &
    dif(tab$ultima_r, tab$formula_ultima) <= tol_ultima & dif(tab$ultima_py, tab$formula_ultima) <= tol_ultima
  # as fórmulas de Python e de R são as mesmas
  tab$ok <- tab$ok & abs(tab$formula_media - vapply(alfa$pontos, function(p) p$formula_media, numeric(1))) < 1e-9 &
    abs(tab$formula_ultima - vapply(alfa$pontos, function(p) p$formula_ultima, numeric(1))) < 1e-9
  print(format(tab, digits = 4), row.names = FALSE)
  tudo_ok <- all(tab$ok)
  pior <- function(x, f) 100 * max(dif(x, f))
  versao_r <- paste(R.version$major, R.version$minor, sep = ".")
  jsonlite::write_json(
    list(
      referencia = sprintf("fórmulas de Knuth e uma %s refeita em R, com casas sorteadas por sample.int()", versao),
      versao_r = versao_r,
      alfas = nrow(tab),
      tudo_ok = tudo_ok,
      pior = list(media_r = pior(tab$media_r, tab$formula_media), media_py = pior(tab$media_py, tab$formula_media),
                  ultima_r = pior(tab$ultima_r, tab$formula_ultima), ultima_py = pior(tab$ultima_py, tab$formula_ultima)),
      resumo = sprintf(
        "Rodado em R %s: a %s refeita em R, com %d tabelas de %s casas e a casa de cada chave sorteada por sample.int(), e as %d tabelas do Python (com a dispersão de Knuth) dão, para α de %s a %s, a média de sondagens por chave a no máximo %s%% da fórmula (R) e %s%% (Python), e o custo de pôr com a ocupação α a %s%% e %s%%; %s",
        versao_r, versao, sementes, format(m, big.mark = ".", decimal.mark = ","), alfa$sementes, format(min(pontos), decimal.mark = ","),
        format(max(pontos), decimal.mark = ","),
        format(round(pior(tab$media_r, tab$formula_media), 1), decimal.mark = ","), format(round(pior(tab$media_py, tab$formula_media), 1), decimal.mark = ","),
        format(round(pior(tab$ultima_r, tab$formula_ultima), 1), decimal.mark = ","), format(round(pior(tab$ultima_py, tab$formula_ultima), 1), decimal.mark = ","),
        if (tudo_ok) sprintf("a tolerância é %d%% na média e %d%% no custo de pôr, que oscila mais.", round(100 * tol_media), round(100 * tol_ultima))
        else "há divergência além da tolerância; veja conferir.R."
      )
    ),
    file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
  )
  stopifnot(tudo_ok)
  cat(sprintf("ok: %s no R e no Python concorda com as fórmulas\n", versao))
}
