# É complexo, baby?

Galeria de algoritmos com as contas à mostra, em forma de player de música: cada tema é um álbum, cada algoritmo uma faixa. Os 8 álbuns seguem os temas das ementas GES134 e GES135 da UFLA (`docs/plans/2026-10-21-catalogo.md`); as faixas ainda não produzidas aparecem como "em produção", com o `em_producao` do `albuns.json`. A faixa é uma simulação ao vivo, em JavaScript, no visual da skill `explainer-videos`: dá para embaralhar, mudar o tamanho e o tipo da entrada, a velocidade, andar passo a passo e ver o fluxograma acendendo enquanto o algoritmo roda. Cada faixa traz três medidas:

- **tempo**: operações contadas rodando a implementação (não estimadas);
- **memória**: pico de valores guardados além da entrada;
- **caminhos**: complexidade ciclomática da função, por duas contas que precisam bater (decisões + 1 e arestas − nós + 2 no grafo de fluxo).

## Ver

Abra `index.html` no navegador (funciona sem servidor) ou sirva a pasta com o servidor do projeto, que atende pedidos por trecho do vídeo (o `python3 -m http.server` não atende, e o seletor de tempo não funciona nele):

```bash
python3 servir.py
```

## Regenerar tudo

```bash
python3 gerar.py --tudo
```

Para cada algoritmo: mede (`medir.py` → `dados.json`), confere contra uma referência no R (`conferir.R` → `conferencia.json`), gera o pôster (`video.py poster` → `.png`, a capa provisória) e junta tudo em `dados.js`, que a página lê. Os instrumentos (estruturas de dados) também são medidos (`instrumentos/<nome>/medir.py` → `dados.json`). Sem `--tudo`, só junta; e recusa uma faixa que credita um instrumento que não existe. Sempre, no fim, roda `testes/conferir_js.mjs`: o JavaScript do site tem de contar igual ao Python nos vetores guardados (o da entrada do encarte e os 7 de conferência) e, nos instrumentos, em cada chamada medida e em sequências sorteadas de operações.

Para exportar um clipe em vídeo de uma faixa: `python3 video.py` dentro da pasta do algoritmo (gera `.mp4`, que não vai para o repositório). Nas buscas, nos parênteses e na fila de atendimento, o `video.py` só faz o pôster, um quadro parado (`motor/video_casos.py`); a animação dessas faixas mora só na simulação ao vivo.

Requisitos: Python 3 com Pillow, Node, ffmpeg (só para exportar clipes), R com jsonlite, IBM Plex Mono instalada e a skill `explainer-videos` em `~/.claude/skills/` (o motor `engine.py` é importado de lá, sem cópia).

## Estrutura

```
motor/conta.py         contador de operações, memória (aloca, ocupa) e fotos de estado
motor/ciclomatica.py   M por decisões e por grafo de fluxo (recusa se não baterem)
motor/cena.py          peças de vídeo: texto, render MP4 por pipe, folha de contato, pôster
motor/ordenacao.py     molde das ordenações: ajudantes que contam (maior, troca, escreve) e a medição padrão
motor/ordenacao.R      as ordenações reescritas em R, para conferir contagens e ordem
motor/video_ordenacao.py  vídeo padrão de barrinhas (altura = valor; cor = papel da barra)
motor/busca.py         molde das buscas: os ajudantes que contam (igual, menor), as entradas e a medição padrão
motor/busca.R          as buscas reescritas em R, para conferir posição e comparações
motor/video_casos.py   pôsteres das buscas, dos parênteses e da fila de atendimento
algoritmos/<nome>/     implementação instrumentada, medir.py, conferir.R, ficha.json, video.py
motor/instrumento.py   molde dos instrumentos: o custo medido de cada operação e as sequências que o JS refaz
instrumentos/<nome>/   estrutura instrumentada (cada leitura e escrita de casa conta 1), medir.py, ficha.json
simulacao/instrumentos.js  as mesmas estruturas em JS, com os eventos que a demo anima
instrumentos.js        a página do instrumento: placa, demo ao vivo, tabela de operações, gráficos, "toca em"
simulacao/algoritmos.js  os algoritmos em JS, contando como o Python, com a linha do pseudocódigo de cada evento
simulacao/palco.js     a simulação: estado de cada instante, linha do tempo e desenho em canvas
testes/conferir_js.mjs JS × Python nos mesmos vetores, textos e sorteios de clientes
gerar.py               junta tudo em dados.js e roda o teste
index.html, estilo.css, galeria.js
docs/plans/            desenhos aprovados
```

## Instrumentos e o "feat."

Cada estrutura de dados é um instrumento, com página própria (`#instrumentos/<nome>`). Uma faixa credita os instrumentos que toca na ficha: `"instrumentos": [{"id": "pilha", "papel": "a pilha de recursão"}]`; o crédito aparece como "feat." na lista, no encarte, na barra e no palco.

Para acrescentar um instrumento: a estrutura em `instrumentos/<nome>/<nome>.py` (leituras e escritas por `conta.op()`), o `medir.py` com `ESTRUTURAS`, `ENCHER`, `OPERACOES` e `sortear` (veja `motor/instrumento.py`), a `ficha.json` (texto das operações e quais vão para o gráfico), a mesma estrutura em `simulacao/instrumentos.js`, e o nome em `INSTRUMENTOS` no `gerar.py` e no `testes/conferir_js.mjs`. A demo de um tipo novo de estrutura é desenhada em `instrumentos.js`.

## Faixas que usam um instrumento por dentro

Os parênteses balanceados e a fila de atendimento rodam sobre as classes dos instrumentos, a `Pilha` e a `FilaCircular`, em Python (`instrumentos/*/`) e em JS (`simulacao/instrumentos.js`). O tempo conta as operações na estrutura (empilhar e desempilhar; enfileirar e desenfileirar); a memória é quantos valores ela guarda no pico (`conta.ocupa()`), sem a folga do vetor que dobra. O teste confere também as casas lidas e escritas por dentro da estrutura.

Essas faixas, e as buscas, descrevem os próprios casos de entrada no `dados.json` (`tempo.series`, `tempo.banda`, `tempo.refs`, `tempo.eixo`); o encarte desenha os gráficos a partir disso, e as legendas vêm de `graficos` na ficha, com os números preenchidos dos dados (`{n0}`, `{min}`, …). O menu de entrada de cada tipo de faixa fica em `ENTRADAS`, no `galeria.js`.

## Acrescentar uma ordenação

O molde faz quase tudo: escreva `algoritmos/<nome>/<nome>.py` com `ordenar(v, conta)`, `MEDIDA` (a função medida) e `MOVIMENTO` ("trocas" ou "escritas"), usando `maior()`, `troca()` e `escreve()` de `motor/ordenacao.py`; acrescente a versão em R em `motor/ordenacao.R` e a versão em JS em `simulacao/algoritmos.js` (`ORDENACOES`); copie `medir.py`, `conferir.R` e `video.py` de outra ordenação trocando o nome; escreva a `ficha.json` (com `video.ideia`, as duas legendas do vídeo).

## Acrescentar um algoritmo

1. `algoritmos/<nome>/<nome>.py`: a implementação, recebendo um `Contador`. Toda operação contada passa por `conta.op()`, toda lista auxiliar por `conta.aloca()`; `conta.foto()` guarda o estado para o vídeo. Na função medida, laços explícitos em vez de compreensões de lista (a ciclomática recusa compreensões, que escondem laços).
2. `medir.py`: roda o exemplo do vídeo e as séries do painel e grava `dados.json`. Nenhum número digitado à mão, nem na página nem no vídeo.
3. `conferir.R`: compara com a implementação de referência do R e grava `conferencia.json`.
4. `ficha.json`: o texto (nome, família, resumo, notação e o porquê de cada complexidade). Números no texto só se vierem dos dados.
5. `video.py`: lê `dados.json`; `python3 video.py folha 3,10,20 f.png` mostra quadros sem renderizar.
6. Acrescentar o nome em `ALGORITMOS` no `gerar.py`.
