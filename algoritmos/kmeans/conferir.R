# Confere o K-means instrumentado (Python) contra o kmeans() do R.
# Mesmos centros iniciais, algoritmo de Lloyd: a partição, os centros e o
# número de voltas precisam bater.
# Rodar da raiz do projeto, depois do medir.py:
#   Rscript algoritmos/kmeans/conferir.R

pasta <- "algoritmos/kmeans"
petalas <- read.csv(file.path(pasta, "iris.csv"))
x <- as.matrix(petalas[, c("comprimento", "largura")])
inicio <- read.csv(file.path(pasta, "inicio.csv"))$indice
py <- jsonlite::read_json(file.path(pasta, "dados.json"), simplifyVector = TRUE)

ajuste <- kmeans(x, centers = x[inicio, ], algorithm = "Lloyd", iter.max = 100)

rotulos_py <- py$exemplo$final$rotulos + 1
centros_py <- py$exemplo$final$centros  # jsonlite já devolve a matriz k × 2

mesma_particao <- identical(as.integer(ajuste$cluster), as.integer(rotulos_py))
dif_centros <- max(abs(unname(ajuste$centers) - centros_py))
mesmas_voltas <- ajuste$iter == py$exemplo$i

cat("partição igual:", mesma_particao, "\n")
cat("maior diferença nos centros:", format(dif_centros, digits = 3), "\n")
cat("voltas: R", ajuste$iter, "| Python", py$exemplo$i, "\n")
cat("tamanhos dos grupos:", ajuste$size, "\n")
stopifnot(mesma_particao, dif_centros < 1e-12, mesmas_voltas)
cat("ok: Python e R concordam\n")

jsonlite::write_json(
  list(
    referencia = "kmeans(algorithm = \"Lloyd\")",
    versao_r = paste(R.version$major, R.version$minor, sep = "."),
    particao_igual = mesma_particao,
    maior_diferenca_centros = dif_centros,
    voltas_r = ajuste$iter,
    voltas_python = py$exemplo$i,
    tudo_ok = mesma_particao && dif_centros < 1e-12 && mesmas_voltas,
    resumo = sprintf(
      "Com os mesmos centros iniciais, o kmeans(algorithm = \"Lloyd\") do R %s chega %s, com diferença máxima de %s nos centros, em %d voltas (aqui: %d).",
      paste(R.version$major, R.version$minor, sep = "."),
      if (mesma_particao) "à mesma partição" else "a outra partição",
      format(dif_centros, digits = 3), ajuste$iter, py$exemplo$i
    )
  ),
  file.path(pasta, "conferencia.json"), auto_unbox = TRUE, pretty = TRUE
)
