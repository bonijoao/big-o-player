# Exporta as petalas do iris (o mesmo conjunto que o R traz embutido).
# Rodar desta pasta: Rscript iris.R
petalas <- data.frame(
  comprimento = iris$Petal.Length,
  largura = iris$Petal.Width,
  especie = iris$Species
)
write.csv(petalas, "iris.csv", row.names = FALSE)
cat("iris.csv:", nrow(petalas), "flores\n")
