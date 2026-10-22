# Exporta o nível do lago Huron, 1875–1972, em pés (o LakeHuron do R).
# Rodar desta pasta: Rscript lakehuron.R
write.csv(data.frame(ano = as.integer(time(LakeHuron)), nivel = as.numeric(LakeHuron)), "lakehuron.csv", row.names = FALSE)
cat("lakehuron.csv:", length(LakeHuron), "anos\n")
