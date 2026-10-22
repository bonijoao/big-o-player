# Exporta a duração das erupções do Old Faithful, em minutos (o faithful do R).
# Rodar desta pasta: Rscript faithful.R
write.csv(data.frame(duracao = faithful$eruptions), "faithful.csv", row.names = FALSE)
cat("faithful.csv:", nrow(faithful), "erupções\n")
