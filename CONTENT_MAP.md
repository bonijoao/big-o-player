# Mapa de conteúdo

Proposta de reorganização do big-o-player (https://uaipedro.github.io/big-o-player/), feita em 28/10/2026 a partir do handoff do Pedro. Nada no site mudou: o mapa espera aprovação antes da sessão de implementação.

O inventário é o que está no ar no commit `4d27f95` (igual à `main`): 8 álbuns, 34 faixas, 11 instrumentos e a prateleira "Comece por aqui".

## As quatro seções

1. **Conceitos importantes**: 6 vídeos novos. É a porta de entrada e termina onde começa o primeiro algoritmo.
2. **Playlists por problema**: 9 playlists com 28 das 34 faixas. As variações ficam como subcategorias.
   - Encontrar um item
   - Encontrar uma palavra num texto
   - Ordenar uma lista
   - Achar o maior ou o do meio
   - Contar o que aparece
   - Calcular Fibonacci
   - Decidir quem é atendido primeiro
   - Visitar todos os pontos
   - Achar o caminho mais curto
3. **Fundamentos**: o glossário rápido (35 termos) e 4 vídeos curtos, só onde uma linha não basta.
4. **Algoritmos e estruturas**: as páginas interativas de hoje, isto é, as 11 estruturas (os antigos "instrumentos") e a página de cada uma das 34 faixas. As 6 faixas que ficaram sem playlist moram só aqui até a decisão 1.

Status usados na tabela:
- **no ar**: fica onde está.
- **muda de lugar**: já existe e só troca de casa; entre parênteses, a casa de hoje.
- **novo**: ainda não existe no site.

O id entre crases é o nome da pasta em `algoritmos/` ou `instrumentos/`.

## Tabela

| seção | playlist (problema) | subcategoria | vídeo/faixa | status | resumo |
|---|---|---|---|---|---|
| Conceitos importantes | — | — | 1. O que é um algoritmo | novo | Abre apresentando o site e mostra que um algoritmo é uma receita de passos, da entrada à saída. |
| Conceitos importantes | — | — | 2. Complexidade sem jargão | novo | Comparar algoritmos é analisar como a tarefa é feita, e não só dizer se é rápido ou lento. |
| Conceitos importantes | — | — | 3. Quando dá para comparar | novo | A mesma tarefa, a mesma entrada e a mesma régua (passos, não segundos). |
| Conceitos importantes | — | — | 4. Melhor, pior e caso médio | novo | O mesmo algoritmo custa 1 ou n conforme a entrada, e o que se promete é o pior caso. |
| Conceitos importantes | — | — | 5. Como escolher, e quando importa | novo | Com n pequeno qualquer um serve; com n grande, ou repetido muitas vezes, a escolha decide. |
| Conceitos importantes | — | — | 6. Fechamento: as playlists | novo | Cada playlist é uma coleção de jeitos diferentes de resolver o mesmo problema. |
| Playlists | Encontrar um item | numa lista | Busca sequencial (`sequencial`) | muda de lugar (Busca) | Olha casa por casa: serve para qualquer vetor, custa até n. |
| Playlists | Encontrar um item | numa lista | Busca binária (`binaria`) | muda de lugar (Busca) | Corta pela metade num vetor já ordenado: log n comparações. |
| Playlists | Encontrar um item | numa árvore de busca | Busca em árvore (`abb`) | muda de lugar (Árvores e heaps) | Desce um nível por comparação; a altura depende da ordem em que os valores chegaram. |
| Playlists | Encontrar um item | numa árvore de busca | Árvore equilibrada AVL (`avl`) | muda de lugar (Árvores e heaps) | Gira a árvore enquanto os valores chegam, para ela ficar com uns log n níveis. |
| Playlists | Encontrar um item | pela chave (tabela hash) | Colisão por encadeamento (`encadeamento`) | muda de lugar (Dispersão) | Duas chaves na mesma casa ficam penduradas nela, numa corrente. |
| Playlists | Encontrar um item | pela chave (tabela hash) | Colisão por sondagem linear (`sondagem`) | muda de lugar (Dispersão) | Casa ocupada, tenta a seguinte; custa cada vez mais à medida que a tabela enche. |
| Playlists | Encontrar uma palavra num texto | força bruta | Busca de padrão ingênua (`padrao`) | muda de lugar (Primeiros passos) | Encosta a palavra em cada posição e compara letra a letra; pior caso n·m. Faixa única: decisão 1. |
| Playlists | Ordenar uma lista | um por um, O(n²) | Bubble sort (`bolha`) | muda de lugar (Ordenação) | Troca vizinhos fora de lugar até nada mais mudar. |
| Playlists | Ordenar uma lista | um por um, O(n²) | Insertion sort (`insercao`) | muda de lugar (Ordenação) | Encaixa cada número no trecho já ordenado. |
| Playlists | Ordenar uma lista | um por um, O(n²) | Selection sort (`selecao`) | muda de lugar (Ordenação) | Escolhe o menor que falta a cada passada; n²/2 em qualquer ordem. |
| Playlists | Ordenar uma lista | dividir e juntar, O(n log n) | Merge sort (`intercalacao`) | muda de lugar (Ordenação) | Divide ao meio, ordena as metades e intercala. |
| Playlists | Ordenar uma lista | dividir e juntar, O(n log n) | Quick sort (`rapida`) | muda de lugar (Ordenação) | Separa menores e maiores em volta de um pivô; n² no pior caso. |
| Playlists | Ordenar uma lista | com um heap | Heapsort (`heapsort`) | muda de lugar (Ordenação) | Monta um heap no próprio vetor e tira sempre o maior. |
| Playlists | Achar o maior ou o do meio | o maior | Máximo de um vetor (`maximo`) | muda de lugar (Primeiros passos) | Sempre n − 1 comparações, e nenhum algoritmo faz menos. |
| Playlists | Achar o maior ou o do meio | o maior | Máximo em janela deslizante (`janela`) | muda de lugar (Estruturas lineares) | O maior de cada trecho de k casas: com um deque, n passos; ingênuo, n·k. |
| Playlists | Achar o maior ou o do meio | o do meio | Mediana por quickselect (`mediana`) | muda de lugar (Estatística) | Acha o valor do meio sem ordenar o vetor inteiro, em n passos na média. |
| Playlists | Contar o que aparece | por palavra | Contar palavras (`palavras`) | muda de lugar (Dispersão) | Um dicionário com uma contagem por palavra, numa leitura só do texto. |
| Playlists | Contar o que aparece | por faixa de valores | Histograma (`histograma`) | muda de lugar (Estatística) | Conta quantos valores caem em cada classe, para ver a forma dos dados. |
| Playlists | Contar o que aparece | já apareceu? | Achar repetidos (`repetidos`) | muda de lugar (Dispersão) | Vetor × dicionário: n² comparações contra n consultas. |
| Playlists | Calcular Fibonacci | descendo (recursão) | Fibonacci recursivo (`fibrecursivo`) | muda de lugar (Primeiros passos) | Direto da definição: φⁿ somas, e fib(2) recalculado centenas de vezes. |
| Playlists | Calcular Fibonacci | descendo (recursão) | Fibonacci com memória (`fibmemoria`) | muda de lugar (Primeiros passos) | A mesma recursão, guardando cada resposta: troca memória por tempo. |
| Playlists | Calcular Fibonacci | subindo (laço) | Fibonacci iterativo (`fibiterativo`) | muda de lugar (Primeiros passos) | Sobe do começo com duas variáveis: n somas e memória constante. |
| Playlists | Decidir quem é atendido primeiro | por ordem de chegada | Fila de atendimento (`atendimento`) | muda de lugar (Estruturas lineares) | Um caixa e uma fila: prevê quanto cada cliente espera. |
| Playlists | Decidir quem é atendido primeiro | por urgência | Fila de prioridade (`prioridade`) | muda de lugar (Árvores e heaps) | O mais grave passa na frente, com um heap. |
| Playlists | Visitar todos os pontos | numa árvore | Percursos de árvore (`percursos`) | muda de lugar (Árvores e heaps) | Pré, em e pós-ordem com uma descida recursiva; em largura com uma fila. |
| Playlists | Visitar todos os pontos | num grafo | Busca em profundidade (`profundidade`) | muda de lugar (Grafos) | Vai o mais fundo possível e volta, com uma pilha. |
| Playlists | Achar o caminho mais curto | sem custo nas ligações | Busca em largura (`largura`) | muda de lugar (Grafos) | Anda em ondas a partir da origem: o caminho com menos passos. |
| Playlists | Achar o caminho mais curto | com custo nas ligações | Dijkstra (`dijkstra`) | muda de lugar (Grafos) | Expande sempre o ponto mais perto, com um heap. |
| Fundamentos | — | glossário | Glossário rápido (35 termos, abaixo) | novo | Uma linha por termo, sempre à mão: quem sabe a base consegue ver qualquer faixa. |
| Fundamentos | — | vídeo curto | Recursão e a pilha de chamadas | novo | Uma função que chama a si mesma, e quem fica esperando. Palco do Fatorial. |
| Fundamentos | — | vídeo curto | Laço dentro de laço | novo | Três laços, n · n · n: dobrar n multiplica o custo por 8. Palco da Multiplicação de matrizes. |
| Fundamentos | — | vídeo curto | Ler o gráfico log-log | novo | Com os dois eixos em log, a inclinação da reta é o expoente. Gráficos do Máximo e da Multiplicação. |
| Fundamentos | — | vídeo curto | O vetor que dobra (amortizado) | novo | Uma cópia cara de vez em quando, dividida por todas as inserções, dá O(1) por operação. Demo do Vetor. |
| Algoritmos e estruturas | — | estruturas | Vetor (`vetor`) | muda de lugar (Instrumentos) | Valores em sequência; chega a qualquer um pelo número da casa. |
| Algoritmos e estruturas | — | estruturas | Matriz (`matriz`) | muda de lugar (Instrumentos) | Uma tabela por linha e coluna, guardada linha a linha num bloco só. |
| Algoritmos e estruturas | — | estruturas | Texto (`texto`) | muda de lugar (Instrumentos) | Um vetor de letras: concatenar no laço × juntar no fim. |
| Algoritmos e estruturas | — | estruturas | Pilha (`pilha`) | muda de lugar (Instrumentos) | O último que entra é o primeiro que sai. |
| Algoritmos e estruturas | — | estruturas | Fila (`fila`) | muda de lugar (Instrumentos) | Atende na ordem de chegada: ingênua × circular. |
| Algoritmos e estruturas | — | estruturas | Deque (`deque`) | muda de lugar (Instrumentos) | Põe e tira pelas duas pontas. |
| Algoritmos e estruturas | — | estruturas | Lista encadeada (`lista`) | muda de lugar (Instrumentos) | Insere e remove no meio sem empurrar os outros: estática × dinâmica. |
| Algoritmos e estruturas | — | estruturas | Grafo (`grafo`) | muda de lugar (Instrumentos) | Ligações entre pontos, em três vistas: matriz, lista e incidência. |
| Algoritmos e estruturas | — | estruturas | Árvore de busca (`arvore`) | muda de lugar (Instrumentos) | Guarda em ordem e acha descendo poucos níveis: comum × AVL. |
| Algoritmos e estruturas | — | estruturas | Heap (`heap`) | muda de lugar (Instrumentos) | Tira sempre o menor sem ordenar tudo: árvore e vetor ao mesmo tempo. |
| Algoritmos e estruturas | — | estruturas | Dicionário (`dicionario`) | muda de lugar (Instrumentos) | Acha o valor pela chave quase sem procurar: encadeamento × sondagem. |
| Algoritmos e estruturas | — | algoritmos | as 28 faixas das playlists | no ar | A página de cada faixa (encarte, palco, gráficos) é a mesma; a playlist só aponta para ela. |
| Algoritmos e estruturas | — | algoritmos | Fatorial recursivo (`fatorial`) | muda de lugar (Primeiros passos) | n! com uma função que chama a si mesma; a pilha desce n níveis. Sem playlist: decisão 1. |
| Algoritmos e estruturas | — | algoritmos | Multiplicação de matrizes (`multiplicacao`) | muda de lugar (Primeiros passos) | Três laços pela definição: n³. Sem playlist: decisão 1. |
| Algoritmos e estruturas | — | algoritmos | Parênteses balanceados (`parenteses`) | muda de lugar (Estruturas lineares) | Confere com uma pilha se cada símbolo que abre fecha no lugar certo. Sem playlist: decisão 1. |
| Algoritmos e estruturas | — | algoritmos | Inverter lista encadeada (`inverter`) | muda de lugar (Estruturas lineares) | Vira a ordem com três ponteiros, sem copiar valores. Sem playlist: decisão 1. |
| Algoritmos e estruturas | — | algoritmos | Média e variância em uma passada (`welford`) | muda de lugar (Estatística) | Welford: lê os dados uma vez, sem guardá-los. Sem playlist: decisão 1. |
| Algoritmos e estruturas | — | algoritmos | K-means (`kmeans`) | muda de lugar (Estatística) | Separa pontos em k grupos sem conhecê-los antes. Sem playlist: decisão 1. |

Conferência: 28 faixas nas playlists + 6 sem playlist = 34; 11 estruturas.

## De onde vem cada faixa

| hoje | faixas | destino |
|---|---|---|
| Comece por aqui (prateleira da home) | sequencial, binária, bubble, merge, K-means | Sai. A porta de entrada passa a ser Conceitos importantes. |
| Primeiros passos | máximo, multiplicação, fatorial, Fibonacci ×3, padrão | Vira **Conceitos importantes**, que só tem vídeos novos. Os três Fibonacci formam a playlist Calcular Fibonacci; o máximo vai para Achar o maior; o padrão, para Encontrar uma palavra; o fatorial e a multiplicação ficam sem playlist e servem de palco a dois vídeos de Fundamentos. |
| Busca | sequencial, binária | Encontrar um item / numa lista. |
| Ordenação | as 6 | Ordenar uma lista, com 3 subcategorias. |
| Estruturas lineares | parênteses, atendimento, inverter, janela | Atendimento → Decidir quem é atendido primeiro; janela → Achar o maior; parênteses e inverter ficam sem playlist. |
| Árvores e heaps | percursos, busca em árvore, AVL, prioridade | Busca em árvore e AVL → Encontrar um item; percursos → Visitar todos os pontos; prioridade → Decidir quem é atendido primeiro. |
| Grafos | largura, profundidade, Dijkstra | Largura e Dijkstra → Achar o caminho mais curto; profundidade → Visitar todos os pontos. |
| Dispersão | contar palavras, repetidos, encadeamento, sondagem | Encadeamento e sondagem → Encontrar um item / pela chave; contar palavras e repetidos → Contar o que aparece. |
| Estatística | Welford, mediana, histograma, K-means | Mediana → Achar o maior ou o do meio; histograma → Contar o que aparece; Welford e K-means ficam sem playlist (decisão 4). |
| Instrumentos | as 11 estruturas | Algoritmos e estruturas. |

## Conceitos importantes: os 6 vídeos

Todos são novos. A ideia é que cada um dure de 60 a 90 s, com o palco gravado sem moldura (ver a pendência S1 abaixo) e o Pedro narrando por cima.

| # | vídeo | o que fica na cabeça | animação simples para narrar | palco que dá para reaproveitar |
|---|---|---|---|---|
| 1 | O que é um algoritmo | Um algoritmo é uma lista finita de passos sem ambiguidade, que leva da entrada à saída. O site mostra esses passos rodando e compara jeitos diferentes de fazer a mesma coisa. | Abertura: 10 a 15 s de tela do site (home → uma faixa tocando). Em seguida, os passos do Máximo aparecem escritos à máquina, um por linha, e o palco os executa num vetor de 8 números, com a linha da vez acesa. Fecha com a cartela "entrada → passos → saída". | **Máximo de um vetor**, com o pseudocódigo que já acende a linha da vez. A cartela é nova e simples. |
| 2 | Complexidade sem jargão | Comparar é olhar **como** a tarefa é feita: quantos passos ela dá e como esse número cresce, e não o cronômetro. | Dois jeitos de achar um nome numa lista ordenada, lado a lado: casa por casa e cortando pela metade, cada um com o seu contador. Depois, a lista dobra de tamanho: um contador dobra e o outro ganha só +1. Só no fim aparece o rótulo O(n) × O(log n), como o resumo do que se viu. | **Busca sequencial** e **Busca binária**. Falta compor os dois palcos lado a lado com a mesma entrada, o que é novo. |
| 3 | Quando dá para comparar | Só é justo comparar resolvendo o mesmo problema, com a mesma entrada e a mesma régua. Passos, não segundos, porque o segundo depende da máquina. | Uma corrida entre o Bubble e o Insertion no mesmo vetor, e o placar de passos. Depois, a trapaça: o Bubble recebe o vetor já ordenado e o Merge um embaralhado, e o placar ganha um "injusto". Fecha com o mesmo algoritmo em duas máquinas: os segundos mudam e os passos não. | **Bubble sort**, **Insertion sort** e **Merge sort**, que já aceitam escolher o tipo de entrada. O placar e o lado a lado são novos. |
| 4 | Melhor, pior e caso médio | O custo depende da entrada: o alvo no começo custa 1, ausente custa n e sorteado custa uns n/2. O que se promete é o pior caso. | A Busca sequencial roda três vezes, com o alvo no começo, sorteado e ausente, e os três contadores ficam em fila. Depois, o gráfico "onde está o alvo" com as três linhas. Gancho final: o Quick sort num vetor já ordenado vira n². | **Busca sequencial** e o gráfico dela, que já separa os lugares do alvo. Para o gancho, **Quick sort** com a entrada crescente. |
| 5 | Como escolher, e quando importa | Com n pequeno qualquer um serve. A escolha importa quando n cresce ou quando a tarefa se repete muitas vezes, e às vezes se troca memória por tempo. | Uma régua de crescimento com 1, log n, n, n log n, n² e 2ⁿ para n = 10, 1.000 e 1.000.000, convertida em tempo de verdade (a 1 bilhão de passos por segundo). Depois, dois casos de escolha: ordenar uma vez para buscar muitas vezes com a binária, e os três Fibonacci no gráfico comum. | O **gráfico comum dos três Fibonacci** já existe. A régua é nova, mas sai dos dados dos gráficos que o site já tem. |
| 6 | Fechamento: as playlists | Cada playlist é um problema, e as faixas dentro dela são jeitos diferentes de resolvê-lo. Vale ouvir em ordem e comparar. | Três ordenações correm no mesmo vetor (Bubble, Merge e Quick) e terminam em tempos diferentes. Depois, a tela das playlists se monta, problema por problema, com as faixas caindo nas subcategorias. | O palco das **ordenações**, com o mesmo lado a lado do vídeo 3. A tela das playlists é gravação da home nova. |

## Fundamentos

Fundamentos é o que a pessoa precisa saber para ler qualquer faixa: o vocabulário e a régua com que o site mede. Fica antes de Algoritmos e estruturas.

A fronteira:
- Vai para **Fundamentos** o que se explica numa linha e não precisa ser tocado: o que é n, um passo, uma variável, uma pilha. A estrutura aparece aqui só como definição curta, com um link para a página dela.
- Vai para **Algoritmos e estruturas** o que tem operações com custo para explorar: cada estrutura com a demo e a tabela de operações, e cada algoritmo com o palco, o encarte e os gráficos.
- O vídeo curto entra em Fundamentos só quando uma linha não basta: recursão, laço aninhado, log-log e amortizado (veja a tabela).

O branch do redator (`claude/compassionate-dhawan-92e734`, que não está no ar) já tem quatro fichas de fundamentos: algoritmo, variável, laço e decisão, e custo. Elas servem de ponto de partida (decisão 9).

### Glossário rápido

| termo | uma linha | aprofunda em |
|---|---|---|
| algoritmo | Uma lista finita de passos sem ambiguidade, que leva da entrada à saída. | Conceitos, vídeo 1 |
| entrada e saída | O que o algoritmo recebe e o que ele devolve. | Conceitos, vídeo 1 |
| pseudocódigo | O algoritmo escrito em português estruturado, sem depender de linguagem. | encarte de qualquer faixa |
| variável | Um nome que guarda um valor, que pode mudar enquanto o algoritmo roda. | Fibonacci iterativo |
| laço | Repetir um bloco de passos, um certo número de vezes ou enquanto uma condição valer. | Máximo de um vetor |
| decisão (se) | Seguir por um de dois caminhos, conforme uma condição. | Máximo de um vetor |
| função | Um bloco de passos com nome, que recebe valores e devolve um resultado. | Fatorial recursivo |
| recursão | Uma função que resolve o problema chamando a si mesma num problema menor. | vídeo "Recursão e a pilha de chamadas" |
| pilha de chamadas | Onde esperam as chamadas que ainda dependem da chamada de cima voltar. | Fatorial recursivo |
| casa | O lugar de um valor na memória. Aqui, ler ou escrever uma casa custa 1. | Vetor |
| ponteiro | Uma casa que guarda onde está outra casa. | Lista encadeada |
| vetor | Casas em sequência, cada uma achada pelo seu número. | Vetor |
| matriz | Uma tabela de casas por linha e coluna, guardada linha a linha. | Matriz |
| texto | Um vetor de letras. | Texto |
| lista encadeada | Valores ligados por ponteiros: inserir no meio não empurra os outros. | Lista encadeada |
| pilha | O último que entra é o primeiro que sai. | Pilha |
| fila | O primeiro que entra é o primeiro que sai. | Fila |
| deque | Uma fila com as duas pontas abertas. | Deque |
| árvore de busca | Cada nó tem os menores à esquerda e os maiores à direita. | Árvore de busca |
| heap | Uma árvore em que o pai nunca é maior que os filhos, então o menor fica no topo. | Heap |
| grafo | Pontos ligados por arestas, como ruas entre esquinas. | Grafo |
| dicionário (tabela hash) | Acha o valor pela chave calculando a casa, em vez de procurar. | Dicionário |
| colisão | Duas chaves que caem na mesma casa do dicionário. | Encontrar um item / pela chave |
| n | O tamanho da entrada: quantos números, letras ou pontos. | Conceitos, vídeo 2 |
| passo | Uma operação básica contada, como comparar, somar ou ler uma casa. | Conceitos, vídeo 2 |
| tempo | Quantos passos o algoritmo dá, contados rodando o código, e não em segundos. | Conceitos, vídeo 3 |
| memória extra | O que o algoritmo guarda além da entrada (a regra para a resposta ainda está em aberto: pendência E1). | Fatorial recursivo |
| O(·) | Como o custo cresce quando n cresce, sem as constantes. O rótulo é o pior caso, salvo quando diz "médio" ou "amortizado". | Conceitos, vídeo 2 |
| Ω e Θ | Ω é o piso e Θ é piso e teto ao mesmo tempo: o Máximo é Θ(n). | Máximo de um vetor |
| log n | Quantas vezes dá para cortar n pela metade até sobrar 1. | Busca binária |
| melhor, pior e caso médio | O custo na entrada mais fácil, na mais difícil e na média das entradas. | Conceitos, vídeo 4 |
| amortizado | Uma operação cara de vez em quando, dividida por todas, dá um custo baixo por operação. | vídeo "O vetor que dobra" |
| escala log-log | Com os dois eixos em log, a inclinação da reta é o expoente. | vídeo "Ler o gráfico log-log" |
| caminhos (complexidade ciclomática) | Quantos caminhos independentes o código tem. É métrica de engenharia, não de tempo. | ficha técnica de cada faixa |
| conferido no R | Cada contagem é refeita em R e tem que bater com a do Python. | ficha técnica de cada faixa |

## Pendências que não são de mapa

Valem como estão nos relatórios de QA de 28/10, que ficam fora do repositório, no PC do Pedro: `~/Documentos/qa-big-o-player/conteudo.md` e `~/Documentos/qa-big-o-player/sistema.md`. A ordem que eles propõem para Primeiros passos, e a trilha de 13 vídeos do QA de conteúdo, foram **substituídas** por este mapa.

Erros técnicos (QA de conteúdo):
- **E1.** A regra de memória extra é inconsistente: a resposta conta na Multiplicação e não conta no Padrão nem na Janela.
- **E2.** O Quick sort aparece como O(n log n), sem "médio".
- **E3.** A sondagem linear e o encadeamento rotulam medidas diferentes.
- **E4.** O texto diz que o Boyer–Moore "garante O(n + m)", mas quem garante é o KMP.
- **E5.** Os rótulos de memória do Fibonacci iterativo se contradizem, e o palco desenha a sequência inteira.
- **E6.** A profundidade média da árvore embaralhada é ≈ 1,4 log₂ n, e não "pouco mais de log₂ n".
- **E7.** O Fibonacci com memória usa o Dicionário, o que pede "médio" no rótulo e aparece antes de a tabela hash ser explicada. Com este mapa, Encontrar um item / pela chave vem antes de Calcular Fibonacci, mas a troca do memo por um Vetor continua sendo a solução mais limpa.
- **E8.** O O(·) é usado sem definição e sem Θ/Ω. O glossário cobre a definição; a regra "pior caso, salvo 'médio' ou 'amortizado'" ainda precisa ser escrita uma vez no site.
- **E9.** A autoria da sequência de Fibonacci (Leonardo de Pisa, 1202) ignora a origem indiana.

Sistema (QA de sistema), com o que pesa para gravar os vídeos em primeiro lugar:
- **S1. Gravação.** Fazer um modo de gravação sem moldura, dar a cada faixa um ritmo com duração-alvo e centralizar os quadros pequenos (achado 7 e seção Primeiros passos). Sem isso, os vídeos dos Conceitos não saem limpos.
- **S2. Legibilidade do palco.** Fonte mínima em pixels de tela, o cinza `#969696` trocado por `#686c73` e a pílula do objetivo fora de cima do quadro (achados 3, 4 e 6).
- **S3. P0 do espaço.** O espaço recomeça o álbum em vez de pausar, e o palco precisa virar um diálogo de verdade (achados 1 e 5).
- **S4. Identidade.** Um nome só, favicon, `og:image`, autoria e redirecionamento de `/eh-complexo-baby/` (achados 2 e 8; o nome está na decisão 3).
- **S5. O resto.** Capas desenhadas, três faixas de navegação no celular, rotas inexistentes e os P2 (achados 9 a 18).

Também do QA de conteúdo, sem mudar o mapa: enxugar o molde da faixa (seção 2.0), tirar a ciclomática do destaque, trocar "faixas" por "classes" na frase da Estatística e juntar as duas colisões numa faixa só, como o Dicionário já faz.

## Decisões do Pedro

1. **Faixas que ficam sozinhas num problema.** A proposta é não criar playlist de uma faixa só, porque o vídeo 6 promete "jeitos diferentes de resolver o mesmo problema".

   | faixa | proposta | alternativa |
   |---|---|---|
   | Máximo de um vetor | Entra em **Achar o maior ou o do meio**, com a Janela e a Mediana. | Fica só como palco dos Conceitos 1 e da página em Algoritmos e estruturas. |
   | Multiplicação de matrizes | Sem playlist: página em Algoritmos e estruturas, ao lado da Matriz, e palco do vídeo "Laço dentro de laço". | Playlist "Multiplicar matrizes" quando houver um segundo jeito (Strassen, ou a ordem dos laços pensando no cache). |
   | Fatorial recursivo | Sem playlist: página em Algoritmos e estruturas e palco do vídeo "Recursão e a pilha de chamadas". | Abrir a playlist de Fibonacci, que viraria "Calcular por recorrência (fatorial e Fibonacci)". |
   | Busca de padrão ingênua | Mantém a playlist **Encontrar uma palavra num texto**, que é exemplo do próprio Pedro, com o KMP como segunda faixa (novo). | Virar a subcategoria "num texto" de Encontrar um item. |
   | Parênteses balanceados | Sem playlist: página ao lado da Pilha, como o exemplo dela. | Playlist "Conferir se um texto está bem formado". |
   | Inverter lista encadeada | Sem playlist: página ao lado da Lista encadeada. | Juntar a uma futura playlist "Mexer numa lista" (inverter, remover repetidos, intercalar). |
   | Welford | Sem playlist até ganhar par. | Playlist "Calcular média e variância": duas passadas (novo) × uma passada (Welford). É um par natural. |
   | K-means | Sem playlist até ganhar par. | Playlist "Separar em grupos", com k-medoides ou agrupamento hierárquico (novo). |

2. **Nomes de playlist em dúvida.**
   - "Encontrar um item": o handoff dizia "numa lista", mas a playlist também cobre árvore e tabela hash.
   - "Achar o maior ou o do meio": outra opção é "Achar o k-ésimo", mais técnico.
   - "Contar o que aparece": outra opção é "Contar ocorrências".
   - "Decidir quem é atendido primeiro": outra opção é "Organizar uma fila".
   - "Visitar todos os pontos": outra opção é "Percorrer tudo".
   - "Achar o caminho mais curto": a Busca em largura também cabe em "Visitar todos os pontos". Vale decidir se uma faixa pode morar em duas playlists.
3. **Nome do site.** "É complexo, baby?" está no título e na marca; "big-o-player" está na URL e no repositório remoto. O branch do redator troca para "Qual é a boa?". Os vídeos vão carregar o nome, então a escolha vem antes de gravar.
4. **Álbum Estatística.** A proposta é dissolver o álbum: a Mediana vai para Achar o maior ou o do meio, o Histograma para Contar o que aparece, e Welford e K-means ficam sem playlist (item 1). A alternativa é mantê-lo como a única playlist por área, que abre uma exceção à regra "por problema".
5. **Apresentação do site.** Ela pode ser a abertura do vídeo 1 (a proposta, com 10 a 15 s) ou um vídeo 0 separado.
6. **Ordem das seções.** A proposta é Conceitos importantes → Playlists → Fundamentos → Algoritmos e estruturas. A outra leitura possível do handoff põe Fundamentos logo depois dos Conceitos, antes das playlists.
7. **"Instrumento" e "feat."** Com a seção virando "Algoritmos e estruturas", resta saber se o crédito "feat. Vetor" e a palavra "instrumento" saem do site também ou se ficam como a metáfora do player.
8. **Ordem das playlists.** A proposta é a da tabela: começa por Encontrar um item, que retoma o vídeo 2, e termina nos grafos.
9. **Trilha "Do zero" do redator** (branch `claude/compassionate-dhawan-92e734`, que não está no ar). Ela tem 17 paradas e as quatro fichas de fundamentos. Há duas saídas: aproveitar as fichas como base de Fundamentos e arquivar a trilha, que este mapa substitui, ou manter a trilha como roteiro opcional.
