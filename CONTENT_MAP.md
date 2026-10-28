# Mapa de conteúdo

A organização do Big O Player (https://uaipedro.github.io/big-o-player/): as seções, as playlists por problema e de onde vem cada faixa. O mapa foi proposto em 28/10/2026 a partir do handoff do Pedro, que aprovou as decisões no mesmo dia.

O inventário de partida é o que estava no ar no commit `4d27f95`: 8 álbuns, 34 faixas, 11 instrumentos e a prateleira "Comece por aqui".

## Estado em 28/10/2026

A reorganização e a Fase 1 dos QAs estão implementadas no branch `claude/mapa-de-conteudo`, **sem push e sem merge**: o Pedro vê a prévia local primeiro (`python3 -m http.server 8765` na raiz).

- As playlists, a galeria Problemas gerais e Algoritmos e estruturas estão no código: `playlists.json` e `galeria.js`. A home é só prateleiras, como a do Spotify.
- **Conceitos importantes** (`conceitos.json`) e **Fundamentos** (`fundamentos.json`) são playlists de vídeo, prontas no código e **desligadas**: cada uma só aparece quando algum vídeo ganha `"video"` (o caminho do arquivo). Sem vídeo, a vitrine não mostra cartão vazio nem "em breve".
- O "Comece por aqui" saiu. Instrumento virou estrutura (`#estruturas/<nome>`), e os links antigos (`#busca/…`, `#instrumentos/…`, `#k-means`) redirecionam.
- Os 11 vídeos de Fundamentos têm a lista aprovada e ainda não têm roteiro.

## As quatro seções, nesta ordem

1. **Conceitos importantes**: 7 vídeos novos, com o vídeo 0 apresentando o site. É a porta de entrada e termina onde começa o primeiro algoritmo. Os roteiros estão prontos: o Pedro grava o áudio primeiro, e a animação vem por cima.
2. **Fundamentos**: a playlist inicial de vídeos curtos sobre a base (variável, laço, vetor, pilha, n, passo…), que deixa a pessoa pronta para ver qualquer faixa.
3. **Playlists por problema**: 7 playlists com 24 faixas, e as variações ficam como subcategorias.
   - Encontrar um item
   - Ordenar uma lista
   - Contar ocorrências
   - Calcular Fibonacci
   - Organizar uma fila
   - Percorrer tudo
   - Achar o caminho mais curto

   Os problemas com uma faixa só vão para a galeria **Problemas gerais**, que tem 10 faixas, uma por problema e no fim das playlists. Quando um desses problemas ganha a segunda faixa, ele sai da galeria e vira playlist.
4. **Algoritmos e estruturas**: as páginas interativas de hoje, isto é, as 11 estruturas (os antigos "instrumentos") e a página de cada uma das 34 faixas.

Status usados na tabela:
- **no ar**: fica onde está.
- **mudou de lugar**: já existia e trocou de casa no branch; entre parênteses, a casa de antes. Vai ao ar com o merge.
- **feito**: novo e implementado no branch.
- **novo**: ainda não existe. "Novo · roteiro pronto" indica que o roteiro já foi escrito na sessão coordenadora.

O id entre crases é o nome da pasta em `algoritmos/` ou `instrumentos/`.

## Tabela

| seção | playlist (problema) | subcategoria | vídeo/faixa | status | resumo |
|---|---|---|---|---|---|
| Conceitos importantes | — | — | 0. Big O Player | novo · roteiro pronto | Algoritmos tocam como música; aqui se comparam jeitos diferentes de resolver o mesmo problema. |
| Conceitos importantes | — | — | 1. O que é um algoritmo | novo · roteiro pronto | Uma sequência finita de passos precisos, da entrada à resposta. |
| Conceitos importantes | — | — | 2. Complexidade sem jargão | novo · roteiro pronto | Comparar é analisar como a tarefa é feita (passos em função de n), não só se é rápida. |
| Conceitos importantes | — | — | 3. Quando dá para comparar | novo · roteiro pronto | O mesmo problema, a mesma entrada, a mesma régua e o mesmo critério. |
| Conceitos importantes | — | — | 4. Melhor, pior e caso médio | novo · roteiro pronto | O custo muda com a entrada, e o pior caso é a promessa. |
| Conceitos importantes | — | — | 5. Como escolher | novo · roteiro pronto | A escolha importa com n grande ou muitas repetições; senão, o simples ganha. |
| Conceitos importantes | — | — | 6. Fechamento | novo · roteiro pronto | Cada playlist é um problema, e cada faixa é um jeito de resolvê-lo. |
| Playlists | Encontrar um item | numa lista | Busca sequencial (`sequencial`) | mudou de lugar (Busca) | Olha casa por casa: serve para qualquer vetor, custa até n. |
| Playlists | Encontrar um item | numa lista | Busca binária (`binaria`) | mudou de lugar (Busca) | Corta pela metade num vetor já ordenado: log n comparações. |
| Playlists | Encontrar um item | numa árvore de busca | Busca em árvore (`abb`) | mudou de lugar (Árvores e heaps) | Desce um nível por comparação; a altura depende da ordem em que os valores chegaram. |
| Playlists | Encontrar um item | numa árvore de busca | Árvore equilibrada AVL (`avl`) | mudou de lugar (Árvores e heaps) | Gira a árvore enquanto os valores chegam, para ela ficar com uns log n níveis. |
| Playlists | Encontrar um item | pela chave (tabela hash) | Colisão por encadeamento (`encadeamento`) | mudou de lugar (Dispersão) | Duas chaves na mesma casa ficam penduradas nela, numa corrente. |
| Playlists | Encontrar um item | pela chave (tabela hash) | Colisão por sondagem linear (`sondagem`) | mudou de lugar (Dispersão) | Casa ocupada, tenta a seguinte; custa cada vez mais à medida que a tabela enche. |
| Playlists | Ordenar uma lista | um por um, O(n²) | Bubble sort (`bolha`) | mudou de lugar (Ordenação) | Troca vizinhos fora de lugar até nada mais mudar. |
| Playlists | Ordenar uma lista | um por um, O(n²) | Insertion sort (`insercao`) | mudou de lugar (Ordenação) | Encaixa cada número no trecho já ordenado. |
| Playlists | Ordenar uma lista | um por um, O(n²) | Selection sort (`selecao`) | mudou de lugar (Ordenação) | Escolhe o menor que falta a cada passada; n²/2 em qualquer ordem. |
| Playlists | Ordenar uma lista | dividir e juntar, O(n log n) | Merge sort (`intercalacao`) | mudou de lugar (Ordenação) | Divide ao meio, ordena as metades e intercala. |
| Playlists | Ordenar uma lista | dividir e juntar, O(n log n) | Quick sort (`rapida`) | mudou de lugar (Ordenação) | Separa menores e maiores em volta de um pivô; n² no pior caso. |
| Playlists | Ordenar uma lista | com um heap | Heapsort (`heapsort`) | mudou de lugar (Ordenação) | Monta um heap no próprio vetor e tira sempre o maior. |
| Playlists | Contar ocorrências | por palavra | Contar palavras (`palavras`) | mudou de lugar (Dispersão) | Um dicionário com uma contagem por palavra, numa leitura só do texto. |
| Playlists | Contar ocorrências | por faixa de valores | Histograma (`histograma`) | mudou de lugar (Estatística) | Conta quantos valores caem em cada classe, para ver a forma dos dados. |
| Playlists | Contar ocorrências | já apareceu? | Achar repetidos (`repetidos`) | mudou de lugar (Dispersão) | Vetor × dicionário: n² comparações contra n consultas. |
| Playlists | Calcular Fibonacci | descendo (recursão) | Fibonacci recursivo (`fibrecursivo`) | mudou de lugar (Primeiros passos) | Direto da definição: φⁿ somas, e fib(2) recalculado centenas de vezes. |
| Playlists | Calcular Fibonacci | descendo (recursão) | Fibonacci com memória (`fibmemoria`) | mudou de lugar (Primeiros passos) | A mesma recursão, guardando cada resposta: troca memória por tempo. |
| Playlists | Calcular Fibonacci | subindo (laço) | Fibonacci iterativo (`fibiterativo`) | mudou de lugar (Primeiros passos) | Sobe do começo com duas variáveis: n somas e memória constante. |
| Playlists | Organizar uma fila | por ordem de chegada | Fila de atendimento (`atendimento`) | mudou de lugar (Estruturas lineares) | Um caixa e uma fila: prevê quanto cada cliente espera. |
| Playlists | Organizar uma fila | por urgência | Fila de prioridade (`prioridade`) | mudou de lugar (Árvores e heaps) | O mais grave passa na frente, com um heap. |
| Playlists | Percorrer tudo | numa árvore | Percursos de árvore (`percursos`) | mudou de lugar (Árvores e heaps) | Pré, em e pós-ordem com uma descida recursiva; em largura com uma fila. |
| Playlists | Percorrer tudo | num grafo | Busca em profundidade (`profundidade`) | mudou de lugar (Grafos) | Vai o mais fundo possível e volta, com uma pilha. |
| Playlists | Percorrer tudo | num grafo | Busca em largura (`largura`) | mudou de lugar (Grafos) | A mesma faixa de Achar o caminho mais curto: visita em ondas, com uma fila. |
| Playlists | Achar o caminho mais curto | sem custo nas ligações | Busca em largura (`largura`) | mudou de lugar (Grafos) | Anda em ondas a partir da origem: o caminho com menos passos. |
| Playlists | Achar o caminho mais curto | com custo nas ligações | Dijkstra (`dijkstra`) | mudou de lugar (Grafos) | Expande sempre o ponto mais perto, com um heap. |
| Playlists | Problemas gerais | achar o maior | Máximo de um vetor (`maximo`) | mudou de lugar (Primeiros passos) | Sempre n − 1 comparações, e nenhum algoritmo faz menos. |
| Playlists | Problemas gerais | achar o maior de cada trecho | Máximo em janela deslizante (`janela`) | mudou de lugar (Estruturas lineares) | O maior de cada trecho de k casas: com um deque, n passos; ingênuo, n·k. |
| Playlists | Problemas gerais | achar o valor do meio | Mediana por quickselect (`mediana`) | mudou de lugar (Estatística) | Acha o valor do meio sem ordenar o vetor inteiro, em n passos na média. |
| Playlists | Problemas gerais | encontrar uma palavra num texto | Busca de padrão ingênua (`padrao`) | mudou de lugar (Primeiros passos) | Encosta a palavra em cada posição e compara letra a letra; pior caso n·m. |
| Playlists | Problemas gerais | calcular o fatorial | Fatorial recursivo (`fatorial`) | mudou de lugar (Primeiros passos) | n! com uma função que chama a si mesma; a pilha desce n níveis. |
| Playlists | Problemas gerais | multiplicar matrizes | Multiplicação de matrizes (`multiplicacao`) | mudou de lugar (Primeiros passos) | Três laços pela definição: n³. |
| Playlists | Problemas gerais | conferir se os símbolos fecham | Parênteses balanceados (`parenteses`) | mudou de lugar (Estruturas lineares) | Confere com uma pilha se cada símbolo que abre fecha no lugar certo. |
| Playlists | Problemas gerais | inverter uma lista | Inverter lista encadeada (`inverter`) | mudou de lugar (Estruturas lineares) | Vira a ordem com três ponteiros, sem copiar valores. |
| Playlists | Problemas gerais | calcular média e variância | Média e variância em uma passada (`welford`) | mudou de lugar (Estatística) | Welford: lê os dados uma vez, sem guardá-los. |
| Playlists | Problemas gerais | separar em grupos | K-means (`kmeans`) | mudou de lugar (Estatística) | Separa pontos em k grupos sem conhecê-los antes. |
| Fundamentos | — | — | 1. Variável | novo | Um nome com um valor: anotar apaga o valor velho, ler não apaga. |
| Fundamentos | — | — | 2. Laço e decisão | novo | O laço repete o mesmo passo; a decisão escolhe, em cada volta, o que fazer. |
| Fundamentos | — | — | 3. Função e recursão | novo | Uma função que chama a si mesma num problema menor, e a pilha de chamadas que espera a volta. |
| Fundamentos | — | — | 4. Vetor | novo | Casas em sequência, cada uma achada pelo número dela, e o vetor que dobra quando enche. |
| Fundamentos | — | — | 5. Pilha e fila | novo | O último que entra sai primeiro; o primeiro que entra sai primeiro. |
| Fundamentos | — | — | 6. Lista encadeada | novo | Valores ligados por ponteiros: inserir no meio sem empurrar os outros. |
| Fundamentos | — | — | 7. Árvore e heap | novo | Guardar em níveis para achar, ou tirar o menor, descendo poucos níveis. |
| Fundamentos | — | — | 8. Grafo | novo | Pontos ligados por arestas, como esquinas ligadas por ruas. |
| Fundamentos | — | — | 9. Dicionário | novo | Achar pela chave calculando a casa, em vez de procurar; e quando duas chaves colidem. |
| Fundamentos | — | — | 10. n, passo e memória | novo | O que se conta neste site: o tamanho da entrada, as operações básicas e o que se guarda além da entrada e da resposta. |
| Fundamentos | — | — | 11. Ler o gráfico log-log | novo | Com os dois eixos em log, a inclinação da reta é o expoente. |
| Algoritmos e estruturas | — | estruturas | Vetor (`vetor`) | mudou de lugar (Instrumentos) | Valores em sequência; chega a qualquer um pelo número da casa. |
| Algoritmos e estruturas | — | estruturas | Matriz (`matriz`) | mudou de lugar (Instrumentos) | Uma tabela por linha e coluna, guardada linha a linha num bloco só. |
| Algoritmos e estruturas | — | estruturas | Texto (`texto`) | mudou de lugar (Instrumentos) | Um vetor de letras: concatenar no laço × juntar no fim. |
| Algoritmos e estruturas | — | estruturas | Pilha (`pilha`) | mudou de lugar (Instrumentos) | O último que entra é o primeiro que sai. |
| Algoritmos e estruturas | — | estruturas | Fila (`fila`) | mudou de lugar (Instrumentos) | Atende na ordem de chegada: ingênua × circular. |
| Algoritmos e estruturas | — | estruturas | Deque (`deque`) | mudou de lugar (Instrumentos) | Põe e tira pelas duas pontas. |
| Algoritmos e estruturas | — | estruturas | Lista encadeada (`lista`) | mudou de lugar (Instrumentos) | Insere e remove no meio sem empurrar os outros: estática × dinâmica. |
| Algoritmos e estruturas | — | estruturas | Grafo (`grafo`) | mudou de lugar (Instrumentos) | Ligações entre pontos, em três vistas: matriz, lista e incidência. |
| Algoritmos e estruturas | — | estruturas | Árvore de busca (`arvore`) | mudou de lugar (Instrumentos) | Guarda em ordem e acha descendo poucos níveis: comum × AVL. |
| Algoritmos e estruturas | — | estruturas | Heap (`heap`) | mudou de lugar (Instrumentos) | Tira sempre o menor sem ordenar tudo: árvore e vetor ao mesmo tempo. |
| Algoritmos e estruturas | — | estruturas | Dicionário (`dicionario`) | mudou de lugar (Instrumentos) | Acha o valor pela chave quase sem procurar: encadeamento × sondagem. |
| Algoritmos e estruturas | — | algoritmos | as 34 faixas | no ar | A página de cada faixa (encarte, palco, gráficos) é a mesma; a playlist só aponta para ela. |

Conferência: 24 faixas nas 7 playlists (a Busca em largura aparece em duas) + 10 em Problemas gerais = 34; 11 estruturas.

Problemas gerais que já têm um segundo jeito à vista, todos novos:
- encontrar uma palavra: o KMP, citado na própria faixa;
- calcular média e variância: a versão em duas passadas;
- multiplicar matrizes: Strassen, ou a ordem dos laços pensando no cache;
- separar em grupos: k-medoides ou agrupamento hierárquico;
- calcular o fatorial: o laço, que a própria faixa cita ("guardaria só o produto: O(1)").

## De onde vem cada faixa

| hoje | faixas | destino |
|---|---|---|
| Comece por aqui (prateleira da home) | sequencial, binária, bubble, merge, K-means | Sai. A porta de entrada passa a ser Conceitos importantes. |
| Primeiros passos | máximo, multiplicação, fatorial, Fibonacci ×3, padrão | Vira **Conceitos importantes**, que só tem vídeos novos. Os três Fibonacci formam a playlist Calcular Fibonacci. Máximo, padrão, fatorial e multiplicação vão para Problemas gerais, e o fatorial e a multiplicação também servem de palco a dois vídeos de Fundamentos. |
| Busca | sequencial, binária | Encontrar um item / numa lista. |
| Ordenação | as 6 | Ordenar uma lista, com 3 subcategorias. |
| Estruturas lineares | parênteses, atendimento, inverter, janela | Atendimento → Organizar uma fila; janela, parênteses e inverter → Problemas gerais. |
| Árvores e heaps | percursos, busca em árvore, AVL, prioridade | Busca em árvore e AVL → Encontrar um item; percursos → Percorrer tudo; prioridade → Organizar uma fila. |
| Grafos | largura, profundidade, Dijkstra | Largura e Dijkstra → Achar o caminho mais curto; profundidade → Percorrer tudo. |
| Dispersão | contar palavras, repetidos, encadeamento, sondagem | Encadeamento e sondagem → Encontrar um item / pela chave; contar palavras e repetidos → Contar ocorrências. |
| Estatística | Welford, mediana, histograma, K-means | Histograma → Contar ocorrências; Welford, mediana e K-means → Problemas gerais (decisão 3). |
| Instrumentos | as 11 estruturas | Algoritmos e estruturas. |

## Conceitos importantes: os 7 vídeos

Os roteiros dos 7 vídeos estão na sessão coordenadora, e os resumos de 1 linha estão na tabela acima. O Pedro grava o áudio primeiro, e a animação vem por cima, com o palco gravado sem moldura (pendência S1). As animações abaixo são sugestões para a etapa de animar. Quando divergirem do roteiro, vale o roteiro.

| # | vídeo | animação simples sobre o áudio | palco que dá para reaproveitar |
|---|---|---|---|
| 0 | Big O Player | Tela do site: a home, uma faixa tocando no player do rodapé e, em seguida, duas faixas da mesma playlist, uma depois da outra. | Gravação de tela do site novo. Nenhum palco novo. |
| 1 | O que é um algoritmo | Os passos do Máximo aparecem escritos à máquina, um por linha, e o palco os executa num vetor de 8 números, com a linha da vez acesa. Fecha com a cartela "entrada → passos → resposta". | **Máximo de um vetor**, com o pseudocódigo que já acende a linha da vez. A cartela é nova e simples. |
| 2 | Complexidade sem jargão | Dois jeitos de achar um nome numa lista ordenada, lado a lado: casa por casa e cortando pela metade, cada um com o seu contador. Depois, a lista dobra de tamanho: um contador dobra e o outro ganha só +1. Só no fim aparece o rótulo O(n) × O(log n), como o resumo do que se viu. | **Busca sequencial** e **Busca binária**. Falta compor os dois palcos lado a lado com a mesma entrada, o que é novo. |
| 3 | Quando dá para comparar | Uma corrida entre o Bubble e o Insertion no mesmo vetor, com um placar de passos. Depois, a trapaça: o Bubble recebe o vetor já ordenado e o Merge um embaralhado, e o placar ganha um "injusto". Fecha com o mesmo algoritmo em duas máquinas: os segundos mudam e os passos não. | **Bubble sort**, **Insertion sort** e **Merge sort**, que já aceitam escolher o tipo de entrada. O placar e o lado a lado são novos. |
| 4 | Melhor, pior e caso médio | A Busca sequencial roda três vezes, com o alvo no começo, sorteado e ausente, e os três contadores ficam em fila. Depois, o gráfico "onde está o alvo" com as três linhas. Gancho final: o Quick sort num vetor já ordenado vira n². | **Busca sequencial** e o gráfico dela, que já separa os lugares do alvo. Para o gancho, **Quick sort** com a entrada crescente. |
| 5 | Como escolher | Uma régua de crescimento com 1, log n, n, n log n, n² e 2ⁿ para n = 10, 1.000 e 1.000.000, convertida em tempo de verdade (a 1 bilhão de passos por segundo). Depois, dois casos de escolha: ordenar uma vez para buscar muitas vezes com a binária, e os três Fibonacci no gráfico comum. | O **gráfico comum dos três Fibonacci** já existe. A régua é nova, mas sai dos dados dos gráficos que o site já tem. |
| 6 | Fechamento | Três ordenações correm no mesmo vetor (Bubble, Merge e Quick) e terminam em tempos diferentes. Depois, a tela das playlists se monta, problema por problema, com as faixas caindo nas subcategorias. | O palco das **ordenações**, com o mesmo lado a lado do vídeo 3. A tela das playlists é gravação da home nova. |

## Fundamentos

Fundamentos é a playlist inicial: vídeos curtos sobre a base, para a pessoa entender os demais. Sabendo a base, ela consegue ver qualquer vídeo ou simulação. Vem depois de Conceitos importantes e antes das playlists por problema.

A fronteira com Algoritmos e estruturas: o vídeo de Fundamentos apresenta a ideia (o que é uma pilha, por que o vetor dobra); a página da estrutura é onde se mexe nela e se vê o custo de cada operação.

Os 11 vídeos estão em `fundamentos.json`, com a lista aprovada pelo Pedro e ainda sem roteiro. Algoritmo, variável, laço e decisão, e custo podem partir das fichas da trilha "Do zero" (branch `claude/compassionate-dhawan-92e734`, commit `74cc438`). O glossário rápido que esta seção chegou a ter saiu do site: Fundamentos não é glossário.

## Pendências que não são de mapa

Vêm dos relatórios de QA de 28/10, que ficam fora do repositório, no PC do Pedro: `~/Documentos/qa-big-o-player/conteudo.md` e `~/Documentos/qa-big-o-player/sistema.md`. A ordem que eles propõem para Primeiros passos, e a trilha de 13 vídeos do QA de conteúdo, foram **substituídas** por este mapa.

### Fase 1: feita no branch

Erros técnicos (QA de conteúdo). Regra do site: o rótulo é o pior caso, salvo quando diz "médio" ou "amortizado".
- **E1. Feito.** A resposta não conta como memória extra. A Multiplicação passou a O(1) extra, remedida e conferida no R.
- **E2. Feito.** O Quick sort aparece como O(n log n) médio.
- **E3. Feito.** As duas colisões rotulam o custo de uma inserção com ocupação α: O(1 + α) e O(1/(1 − α)²).
- **E4. Feito.** O texto diz que só o KMP garante O(n + m).
- **E5. Feito.** O Fibonacci iterativo diz "duas variáveis" no encarte e "O(1), duas variáveis" no palco, e as casas que passaram apagam.
- **E6. Feito.** A profundidade média da árvore embaralhada aparece como uns 1,4 log₂ n.
- **E7. Feito.** O memo do Fibonacci é um Vetor (a casa k guarda fib(k)), em Python, JS e R. O feat. ficou "Vetor, Pilha", e o palco desenha o vetor.
- **E8. Feito.** A regra está escrita uma vez, na abertura de Algoritmos e estruturas. Ω e Θ ficam para o vídeo de Fundamentos sobre n, passo e memória.
- **E9. Feito.** A autoria do Fibonacci iterativo virou "—", e a linha some da ficha.

Sistema (QA de sistema):
- **S3. Feito.** O espaço pausa em vez de recomeçar a playlist. O palco grande é um diálogo (`role="dialog"`, `aria-modal`, o foco entra e volta, a página atrás fica `inert`) e anuncia a linha da vez por `aria-live` com a faixa parada (achados 1 e 5).
- **S2. Feito em parte.** O cinza do canvas passou a `#686c73`, e o objetivo virou a linha fina da barra do palco, fora da animação (achados 4, 6 e 13). Falta a fonte mínima no celular (Fase 2).
- **S4. Feito, menos a URL antiga.** Big O Player no título, na marca e no README; ícone, `og:image` 1200 × 630, `og:*` e `twitter:card`; linha fina e autoria na home. O redirecionamento de `/eh-complexo-baby/` está pronto em `docs/redirecionamento/` e falta o Pedro criar o repositório (passo a passo no `LEIA.md` de lá).
- **Achado 17. Feito.** O `_config.yml` tira do Pages o `CLAUDE.md`, o README, `docs/`, `testes/`, `motor/` e os `.py`, `.R` e `.json`.
- **Achados 10 e 12.** A lateral nova tem uma faixa de navegação só no celular, e não fica mais presa em "Instrumentos".

Do QA de conteúdo, seção 2.0 (molde da faixa), feito: pseudocódigo sem parágrafo-padrão, a ciclomática fora do destaque (M na ficha e o código medido recolhido, com as linhas `conta.*` esmaecidas), a seção de memória só quando há memória extra, e a ficha técnica sem repetir o topo nem mostrar linhas vazias.

### Fase 2 e depois

- **S1. Gravação.** Um modo de gravação sem moldura, um ritmo por faixa com duração-alvo e os quadros pequenos centralizados (achado 7). Sem isso, os vídeos dos Conceitos não saem limpos.
- **S2, o resto.** A fonte mínima real do palco no celular (achado 3).
- **S5.** As capas desenhadas (achado 9), as rotas inexistentes (achado 11) e os P2 que sobram (achados 14, 15, 16 e 18).
- Do QA de conteúdo: as legendas dos gráficos com o método completo (seção 2.0) e a fusão das duas colisões numa faixa só, como o Dicionário já faz.

## Decisões do Pedro

Todas tomadas em 28/10/2026 ("aceito as sugestões, mete marcha"):

1. **Playlists:** os nomes ficam "Encontrar um item" (sem "numa lista"), "Contar ocorrências", "Organizar uma fila" e "Percorrer tudo". A Busca em largura mora em duas playlists, Percorrer tudo e Achar o caminho mais curto.
2. **Nome do site:** Big O Player, no `<title>`, na marca, no README e no vídeo 0.
3. **Estatística:** o álbum se dissolve. O Histograma vai para Contar ocorrências; Welford, Mediana e K-means vão para Problemas gerais.
4. **Ordem das seções:** Conceitos importantes → Fundamentos → Playlists (com Problemas gerais no fim) → Algoritmos e estruturas.
5. **Termos:** "feat." fica, como metáfora do player. "Instrumento" vira "estrutura" no texto e na navegação.
6. **Ordem das playlists:** a deste mapa.
7. **Trilha "Do zero":** a trilha fica arquivada. As 4 fichas de fundamentos dela viram ponto de partida dos vídeos de Fundamentos.
8. **Fundamentos não é glossário** (28/10, depois da prévia): vira a playlist inicial de vídeos, desligada até o primeiro vídeo. A home é só prateleiras.

Antes disso, também ficou decidido que os problemas com uma faixa só vão para a galeria Problemas gerais e que o vídeo 0 apresenta o site, separado do vídeo 1.
