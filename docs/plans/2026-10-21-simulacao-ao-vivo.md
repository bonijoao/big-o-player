# Simulação ao vivo no lugar dos vídeos

**Objetivo:** cada faixa deixa de ser um MP4 gravado e passa a rodar no navegador, em JavaScript, com o fluxograma acendendo passo a passo e controles para mudar a entrada e a velocidade. A aparência continua a dos vídeos.

## Decisões

- **JS roda, Python confere:** os algoritmos rodam no site em JavaScript, instrumentados como no Python (comparações, trocas/escritas, distâncias, memória de pico, pilha). Um teste automático roda o JS nos mesmos vetores do `dados.json` (o do vídeo e os 7 de conferência) e exige contagens iguais às do Python; o R segue conferindo o Python. O `gerar.py --tudo` roda o teste.
- **Sem MP4 no site:** o palco (grande e mini) desenha a simulação num canvas, no visual dos vídeos (barras com cor por papel; partição do quick em âmbar, verde-água e violeta; lista auxiliar e árvore de chamadas; pontos e centros do K-means). Os scripts de vídeo ficam no repositório só para exportar um clipe.
- **Execução inteira primeiro, reprodução depois:** ao dar play, o JS roda o algoritmo de uma vez e grava os eventos; a reprodução anda por eles. Por isso o seletor de tempo continua igual ao de um vídeo, e dá para voltar e avançar.
- **Fluxograma acendendo:** cada evento traz a linha do pseudocódigo em que o algoritmo está; a caixa ou o losango dessa linha acende no fluxograma (e a linha no pseudocódigo do encarte). No computador, o palco grande mostra animação à esquerda e fluxograma à direita; no celular e no mini player, só a animação.
- **Controles por faixa:** embaralhar (novo sorteio) e tamanho n (8 a 64; no K-means, novo sorteio dos centros e k); tipo de entrada (aleatória, já ordenada, invertida); velocidade (0,25× a 8×); passo a passo (avançar e voltar um evento).
- **A barra do player** mostra "passo x de y" e o tempo na velocidade atual; a fila do álbum, o mini player arrastável e as rotas continuam como estão.
- **O encarte** mantém as séries medidas pelo Python (crescimento, distribuição, memória por n) e ganha as contagens da execução atual.

## Fases seguintes (já decididas)

- **Fase 2, instrumentos (feat.):** cada estrutura de dados tem página própria (operações, custo de cada uma, demonstração ao vivo) e as faixas dão o crédito ("Busca em largura feat. Fila"). Começa por Vetor, Pilha e Fila.
- **Fase 3, álbuns por tema das ementas** (Fundamentos, Busca, Ordenação, Estruturas lineares, Árvores, Heaps, Grafos, Dispersão, Estatística), com cada faixa marcando o item da ementa. Mapa em `2026-10-21-cobertura-ementas.md`.
- **Depois:** categoria de conceitos.

## Fora de escopo (fase 1)

Instrumentos, faixas novas, reorganização dos álbuns, conceitos, capas definitivas (seguem os quadros provisórios).

## Pronto quando

- As 5 faixas tocam ao vivo no palco grande e no mini; trocar de página não para a simulação.
- Teste automático: contagens do JS = contagens do Python no vetor do vídeo e nos 7 vetores de conferência das 5 faixas.
- Embaralhar, n, tipo de entrada, velocidade e passo a passo funcionam; o seletor de tempo avança e volta.
- No palco grande (≥ 1100 px), o fluxograma acende o passo atual; no encarte, a linha do pseudocódigo acompanha.
- Página sem MP4; abre por `file://`; 375 px sem rolagem lateral; bubble com n = 64 anima liso no PC do Pedro.

## Onde mexer

Novos: `simulacao/` (algoritmos em JS com eventos e linha do pseudocódigo, reprodutor, desenho em canvas por família) e `testes/conferir_js.mjs`. Mudam: `galeria.js` (palco, controles, barra), `fluxograma.js` (acender por linha), `gerar.py` (roda o teste; deixa de exigir MP4). Risco: manter o mapeamento evento → linha do pseudocódigo coerente; o teste confere que cada comparação cai numa linha de decisão.
