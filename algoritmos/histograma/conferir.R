# Confere o histograma do Python contra o hist() do R: os mesmos limites de
# classe (pretty() sobre o número de Sturges) e as mesmas contagens, classe
# por classe. As leituras (2n) e o pico (uma casa por classe) saem das
# próprias contas do R.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/histograma/conferir.R
pasta <- "algoritmos/histograma"

py <- jsonlite::read_json(file.path(pasta, "dados.json"))
tab <- do.call(rbind, lapply(py$conferir, function(caso) {
  x <- as.numeric(unlist(caso$x))
  h <- hist(x, plot = FALSE)
  c_py <- length(caso$contagens)
  limites_py <- caso$a + (0:c_py) * caso$h
  data.frame(caso = caso$caso, n = length(x), classes_r = length(h$counts), classes_py = c_py,
             limites_ok = length(h$breaks) == c_py + 1 && isTRUE(all.equal(h$breaks, limites_py, tolerance = 1e-12)),
             contagens_ok = identical(as.integer(h$counts), as.integer(unlist(caso$contagens))),
             leituras_ok = caso$ops == 2 * length(x), pico_ok = caso$pico == length(h$counts),
             no_limite = sum(x %in% h$breaks))
}))
print(tab, row.names = FALSE)
tudo_ok <- all(tab$classes_r == tab$classes_py) && all(tab$limites_ok) && all(tab$contagens_ok) &&
  all(tab$leituras_ok) && all(tab$pico_ok)
versao <- paste(R.version$major, R.version$minor, sep = ".")
f <- hist(faithful$eruptions, plot = FALSE)
jsonlite::write_json(
  list(
    referencia = "hist(plot = FALSE): $breaks e $counts",
    versao_r = versao,
    vetores = nrow(tab),
    tudo_ok = tudo_ok,
    resumo = sprintf(
      "No R %s, o hist(faithful$eruptions) dá %d classes de %s a %s, com as contagens %s. Em %d vetores (o faithful e amostras normais, uniformes e bimodais, %d valores em cima de um limite de classe), %s",
      versao, length(f$counts), format(min(f$breaks), decimal.mark = ","), format(max(f$breaks), decimal.mark = ","), paste(f$counts, collapse = ", "),
      nrow(tab), sum(tab$no_limite),
      if (tudo_ok) "os limites e as contagens batem classe por classe com o Python."
      else "há divergência; veja conferir.R."
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
stopifnot(tudo_ok)
cat("ok: hist() do R concorda com o Python\n")
