# Galeria "É complexo, baby?" e piloto K-means

**Objetivo:** catálogo visual de algoritmos em que cada card mostra, com números contados de verdade, quanto o algoritmo custa em tempo, memória e caminhos no código, e um vídeo curto que deixa visível *por que* custa isso. Piloto: K-means.

## Decisões

- **Nome:** "É complexo, baby?" por enquanto. Trocar depois é mudar só o título da página e o README.
- **Formato:** página única estática (HTML/CSS/JS, sem build). Uma grade de cards; ao clicar, o card abre um painel grande com link próprio (`#k-means`). Filtros por família: ordenação, estatística, grafos.
- **Visual da página:** a mesma identidade dos vídeos, no estilo Taelin: fundo branco, IBM Plex Mono, tinta quase preta, verde só para o resultado-chave e âmbar/vermelho só para alertas. A página e o vídeo têm de parecer feitos juntos.
- **Cada complexidade no painel:**
  - *Tempo:* Big-O, a contagem medida no exemplo do vídeo e um mini-gráfico de operações por n (medido em vários tamanhos, com a curva teórica por cima).
  - *Memória:* Big-O e o pico de memória extra medido (valores além da entrada).
  - *Ciclomática:* M calculado do código-fonte real da implementação, mais o mini grafo de fluxo de controle. O texto diz "caminhos independentes", porque M conta a base de caminhos, não todos os caminhos possíveis.
- **Contagens reais:** cada algoritmo tem uma implementação em Python com contadores embutidos. O mesmo arquivo alimenta o vídeo, os números do card e o cálculo da ciclomática. Nenhum número é digitado à mão; um script de medição gera um `dados.json` por algoritmo.
- **Piloto K-means:** algoritmo de Lloyd, k = 3, dados do iris (pétala: comprimento × largura, n = 150, exportados do R), inicialização sorteada com semente fixa. Unidade de tempo: cálculos de distância, n·k por iteração e n·k·i no total; o número de iterações i é medido, não suposto. O gráfico de crescimento usa dados simulados com semente (o iris só tem 150 pontos); o card avisa isso.
- **Vídeo (~30–40 s, mudo, pt-BR, 960×540, MP4 15 fps):** motor `engine.py` + peças no espírito de `pecas.py`, sem a estrutura completa de hook/IDEA da skill. Arco: pergunta curta → algoritmo rodando (pontos ganham a cor do centroide mais próximo, centroides andam) com contador de distâncias → o "por quê": cada ponto traça uma linha até cada centroide, n × k por volta, vezes i voltas → fecho com as três complexidades. Um quadro do vídeo vira o pôster do card; na grade, o vídeo toca ao passar o mouse.
- **Onde fica:** `~/Documentos/dev/e-complexo-baby` (repositório git novo).

## Fora de escopo

Ordenações, outros algoritmos de estatística e grafos (vêm depois do piloto aprovado); GIF; narração; publicar online; modo escuro; comparação lado a lado entre algoritmos.

## Pronto quando

- `index.html` abre direto no navegador e mostra a grade com o card do K-means; o painel aberto tem o vídeo, as três complexidades e o código da implementação.
- Rodar a medição regenera `dados.json`, e os números da página e do vídeo batem com ele (auditoria listando cada número na tela e sua origem).
- O k-means instrumentado chega à mesma partição que o `kmeans(..., algorithm = "Lloyd")` do R com os mesmos centros iniciais.
- O M da ciclomática bate com uma contagem à mão das decisões no código (listada na entrega).
- Vídeo entre 30 e 40 s; folha de contato conferida (sem sobreposição, nada cortado); render de um vídeo por vez e em menos de 1 minuto no PC do Pedro.
- Layout funciona em celular (largura 375 px) sem rolagem horizontal.

## Onde mexer

- `algoritmos/kmeans/`: implementação instrumentada, medição (`dados.json`), roteiro do vídeo, MP4 e pôster.
- `motor/`: peças de desenho reaproveitáveis entre vídeos, importando `~/.claude/skills/explainer-videos/engine.py` sem alterar o motor.
- `site/` (ou a raiz): página, estilos e um registro dos algoritmos lido pela página.
- Riscos: o i do K-means varia com a semente, então o gráfico de crescimento precisa mostrar i junto para não parecer O(n·k) puro. A ciclomática medida em Python conta `and`/`or` e compreensões, então é preciso fixar uma regra e escrevê-la no painel.
