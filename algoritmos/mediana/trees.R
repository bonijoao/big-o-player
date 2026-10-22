# Exporta o volume das cerejeiras do trees (o mesmo conjunto que o R traz
# embutido), na ordem do R: as árvores vêm ordenadas pelo diâmetro.
# Rodar desta pasta: Rscript trees.R
write.csv(data.frame(volume = trees$Volume), "trees.csv", row.names = FALSE)
cat("trees.csv:", nrow(trees), "árvores\n")
