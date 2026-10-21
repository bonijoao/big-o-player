# Estética do site: player com encarte

**Objetivo:** trocar a grade de cards por um player de música. Cada tema é um álbum, cada algoritmo é uma faixa com capa, e o vídeo é a faixa que toca.

## Decisões

- **Metáfora:** álbuns = famílias (Ordenação, Estatística, Grafos); faixas = algoritmos; o vídeo de cada algoritmo é a faixa, com duração real.
- **Capas:** em aberto, decididas algoritmo por algoritmo. Regras já fechadas: a capa sai da execução real (não é ilustração) e a cor nunca representa o tamanho de um valor. Pode ter cor, mas para papel ou categoria (grupo, estado). Testados e descartados: faixas com cor por valor, fios, relevo empilhado (pulsar). A capa do álbum é o mosaico 2×2 das faixas.
- **Demo padrão das ordenações (vídeo):** barrinhas enfileiradas, com altura igual ao valor. A cor mostra o papel de cada barra: azul do álbum para a que já está no lugar final, coral para a que acabou de se mexer e tinta escura para o resto. Todas as ordenações usam o mesmo vetor de partida, para comparar lado a lado. Referência: `barras()` em `docs/esteticas/capas.py`.
- **Layout:** barra lateral de álbuns, cabeçalho do álbum (capa grande, título, uma frase), lista de faixas com as colunas tempo, memória, caminhos e duração, e barra de player fixa embaixo (capa, play/anterior/próxima, linha do tempo, medidas da faixa tocando).
- **Tocar = vídeo grande, depois mini player:** dar play abre o vídeo grande, como num media player. Minimizar, ou clicar fora, vira um mini player flutuante que dá para arrastar dentro da página (como no YouTube). O vídeo continua tocando enquanto a pessoa lê o encarte da faixa ou navega por outros álbuns e faixas. A barra de player de baixo segue controlando o mesmo vídeo. Só dentro da página, sem picture-in-picture do sistema.
- **Ouvir o álbum:** tocar o álbum reproduz as faixas em sequência; Ordenação em ordem mostra O(n²) virando O(n log n).
- **Encarte:** abrir uma faixa mostra o vídeo grande e o encarte em forma de placa de museu (nome, autor e ano, técnica: "Python sobre 150 flores (iris, R)", medidas), seguido do painel atual (gráficos, memória, código com o grafo de fluxo, conferência no R).
- **Pseudocódigo e fluxograma (pedido em 2026-10-21):** cada faixa traz o pseudocódigo em português, independente de linguagem e no jeito em que o algoritmo seria proposto, e o fluxograma correspondente. O fluxograma é gerado do pseudocódigo (losango por decisão, retângulo por passo, seta de volta nos laços), sem desenho à mão. As decisões do pseudocódigo precisam dar o mesmo M do código Python; se divergirem, a geração recusa.
- **Identidade:** a mesma dos vídeos (papel branco, IBM Plex Mono, tinta quase preta, verde só no resultado); a cor vem das capas.
- **Faixas sem vídeo** aparecem na lista com capa e Big-O teórico, marcadas "em produção", sem números medidos.

## Fora de escopo

Áudio de verdade, contas de usuário, playlists, modo escuro.

## Pronto quando

- A página abre por `file://` mostrando o álbum Estatística com o K-means tocável, e Ordenação/Grafos com faixas "em produção".
- Play abre o vídeo grande; minimizar ou clicar fora o leva a um mini player arrastável que não para de tocar ao trocar de álbum ou faixa (as rotas não recarregam o vídeo).
- Play na barra toca o vídeo da faixa; "próxima" passa para a faixa seguinte com vídeo; a linha do tempo acompanha o vídeo.
- Abrir a faixa mostra o encarte + o painel atual, sem perder nenhuma medida que existe hoje.
- Faixas sem capa definida usam um quadro do próprio vídeo como capa provisória.
- Autor e ano no encarte conferidos em fonte confiável antes de publicar.
- 375 px sem rolagem lateral (a barra lateral vira seletor de álbum no celular; o player encolhe para capa + play + tempo).

## Onde mexer

`index.html`, `estilo.css`, `galeria.js` (rotas por álbum e faixa: `#estatistica`, `#estatistica/k-means`); `motor/` ganha a geração de capas; `ficha.json` ganha autor, ano e técnica. Protótipos de referência: `docs/esteticas/player.html` e `galeria.html`, capas em `docs/esteticas/capas.py`.
