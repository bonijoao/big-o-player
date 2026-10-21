# É complexo, baby?

Galeria de algoritmos com as contas à mostra. Cada algoritmo tem um vídeo curto, gerado por código no visual da skill `explainer-videos`, e um painel com três medidas:

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

Para cada algoritmo: mede (`medir.py` → `dados.json`), confere contra uma referência no R (`conferir.R` → `conferencia.json`), renderiza o vídeo (`video.py` → `.mp4` + pôster `.png`) e junta tudo em `dados.js`, que a página lê. Sem `--tudo`, só junta.

Requisitos: Python 3 com Pillow, ffmpeg, R com jsonlite, IBM Plex Mono instalada e a skill `explainer-videos` em `~/.claude/skills/` (o motor `engine.py` é importado de lá, sem cópia).

## Estrutura

```
motor/conta.py         contador de operações, memória e fotos de estado
motor/ciclomatica.py   M por decisões e por grafo de fluxo (recusa se não baterem)
motor/cena.py          peças de vídeo: texto, render MP4 por pipe, folha de contato, pôster
motor/ordenacao.py     molde das ordenações: ajudantes que contam (maior, troca, escreve) e a medição padrão
motor/ordenacao.R      as ordenações reescritas em R, para conferir contagens e ordem
motor/video_ordenacao.py  vídeo padrão de barrinhas (altura = valor; cor = papel da barra)
algoritmos/<nome>/     implementação instrumentada, medir.py, conferir.R, ficha.json, video.py
gerar.py               junta tudo em dados.js
index.html, estilo.css, galeria.js
docs/plans/            desenhos aprovados
```

## Acrescentar uma ordenação

O molde faz quase tudo: escreva `algoritmos/<nome>/<nome>.py` com `ordenar(v, conta)`, `MEDIDA` (a função medida) e `MOVIMENTO` ("trocas" ou "escritas"), usando `maior()`, `troca()` e `escreve()` de `motor/ordenacao.py`; acrescente a versão em R em `motor/ordenacao.R`; copie `medir.py`, `conferir.R` e `video.py` de outra ordenação trocando o nome; escreva a `ficha.json` (com `video.ideia`, as duas legendas do vídeo).

## Acrescentar um algoritmo

1. `algoritmos/<nome>/<nome>.py`: a implementação, recebendo um `Contador`. Toda operação contada passa por `conta.op()`, toda lista auxiliar por `conta.aloca()`; `conta.foto()` guarda o estado para o vídeo. Na função medida, laços explícitos em vez de compreensões de lista (a ciclomática recusa compreensões, que escondem laços).
2. `medir.py`: roda o exemplo do vídeo e as séries do painel e grava `dados.json`. Nenhum número digitado à mão, nem na página nem no vídeo.
3. `conferir.R`: compara com a implementação de referência do R e grava `conferencia.json`.
4. `ficha.json`: o texto (nome, família, resumo, notação e o porquê de cada complexidade). Números no texto só se vierem dos dados.
5. `video.py`: lê `dados.json`; `python3 video.py folha 3,10,20 f.png` mostra quadros sem renderizar.
6. Acrescentar o nome em `ALGORITMOS` no `gerar.py`.
