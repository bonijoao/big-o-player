# Home em prateleiras e página de instrumento com o visual na frente

**Objetivo:** a home passa a funcionar como a do Spotify, com prateleiras que já mostram as faixas. A página de instrumento abre com a demo ao vivo ocupando o espaço e as operações num painel de ferramentas ao lado.

## Decisões (Pedro, 22/10: "pode aplicar sua ideia")

**Home**
- **Prateleiras na ordem do curso.** É a ordem do `albuns.json`: Primeiros passos, Busca, Ordenação, Estruturas lineares, Árvores e heaps, Grafos, Dispersão, Estatística.
- **Cada prateleira** tem o título do álbum (que é um link), a frase do álbum e "Mostrar tudo" à direita. Embaixo vem uma fileira horizontal de cartões de faixa: capa, nome, Big-O de tempo e o feat. As faixas tocáveis vêm primeiro; as em produção vêm no fim, esmaecidas, com o Big-O teórico e o selo "em produção". A fileira rola na horizontal, com setas na tela larga.
- **No topo, "Comece por aqui":** uma fileira curada (busca sequencial, busca binária, bubble sort, merge sort e K-means), definida numa constante em `galeria.js`.
- **Botões de filtro:** "Tudo · Faixas · Instrumentos". "Faixas" esconde a prateleira de instrumentos; "Instrumentos" mostra só ela. Os instrumentos são a última prateleira de "Tudo".
- **Botão de tocar sobre a capa:** aparece ao passar o mouse (e sempre no toque) e toca a faixa sem sair da home. Clicar no resto do cartão abre o encarte.
- **Barra lateral vira "Biblioteca"**, com botões Álbuns / Instrumentos que alternam a lista. A escolha vale só nesta visita.
- **Cores:** as da galeria (papel branco, IBM Plex Mono, verde só no resultado). Do Spotify vêm os componentes, não a paleta.

**Página de instrumento**
- **Cabeçalho curto:** glifo pequeno, nome, a frase de efeito e as faixas em que ele toca, como links. A placa, o resumo e o texto "Ao vivo" saem do topo.
- **Palco:** a demo ocupa a largura e a altura útil da tela, e o desenho cresce para preencher o espaço. Ao lado, um **painel de ferramentas** com, em blocos: entrada (valor e posição), operações (um botão por linha), recomeçar, repasse da pilha de chamadas (só na Pilha), "custou" da última operação, aviso, legenda e histórico. No estreito, o painel desce para baixo da demo.
- **Detalhes recolhidos embaixo**, em `<details>` fechados: "Quanto custa cada operação" (tabela e gráfico), "Memória" (gráfico das casas) e "Sobre" (placa, resumo, técnica). Os gráficos são desenhados ao abrir.
- **"Toca em"** vira uma prateleira de cartões de faixa, igual à da home, acima dos detalhes.

## Fora de escopo

Painel "tocando agora" à direita, busca, personalização ou histórico de quem visita, mudanças no palco e no player, capas definitivas, mudanças no `gerar.py` e nos dados.

## Pronto quando

- A home abre com "Comece por aqui" e as 8 prateleiras na ordem do curso. Cada uma mostra primeiro as tocáveis e depois as em produção, esmaecidas. "Mostrar tudo" abre o álbum.
- O play sobre a capa toca a faixa (o palco abre) sem mudar de rota. Clicar no cartão abre o encarte.
- Os filtros "Faixas" e "Instrumentos" escondem e mostram as prateleiras certas. A Biblioteca alterna entre álbuns e instrumentos.
- Na Pilha, no Vetor e na Fila, o topo da página em 1440×900 mostra o cabeçalho e a demo inteira com o painel de ferramentas, sem rolar. Todas as operações e o repasse continuam funcionando.
- Tabela, gráficos e placa ficam nos detalhes recolhidos e aparecem certos ao abrir.
- 375 px sem rolagem lateral: as prateleiras rolam dentro de si, e o painel de ferramentas fica embaixo da demo.
- `python3 gerar.py` passa, sem nenhum erro no console.

## Onde mexer

`galeria.js` (`inicio`, `desenharLateral`, cartão de faixa novo), `instrumentos.js` (`pagina`, montagem do `demo` em palco + painel, `desenhar` ocupando a largura), `index.html` (os botões da Biblioteca) e `estilo.css`.

Risco: o lote 2 (Grafo, buscas em largura e profundidade) mexe em `simulacao/` e `motor/`, e vai criar a página do Grafo usando `pagina()`. Avisar o lote 2 do novo formato antes do merge.
