# Fundamentos: briefings dos 11 vídeos

Para a sessão dos vídeos: Remotion, narração com a mesma voz dos Conceitos importantes (fish-audio, voz KAI), em lotes (no fim deste arquivo). A lista, a ordem, os códigos e as capas são os do `fundamentos.json` de hoje, FU-01 a FU-11, sem mudança. A base é o `resumo` de cada vídeo, mais as fichas de fundamentos do branch antigo (`74cc438`: variável, laço e decisão, custo) e as fichas e os `dados.json` das estruturas e das faixas.

Cada briefing traz a mensagem central, de 3 a 5 batidas (a tela e a fala), a animação sugerida, de onde vêm os números, o que evitar e para onde o vídeo aponta. O roteiro com os tempos sai depois da narração, como nos Conceitos: o `tempos.ts` e o `npm run roteiro`.

## O que vale para os 11

- **Molde dos Conceitos.** Abertura com o cabeçalho `FUNDAMENTOS · FU-NN`, a arte da capa se montando (`AberturaCapa`), o título e, quando couber, uma pergunta. Depois as cenas, e no fim a assinatura. A abertura e a assinatura somam uns 5 s.
- **Cor.** É o tema dos Conceitos com outra paleta: o petróleo da capa (`#04445c`, o mesmo token do site) no lugar do quase preto, o creme das capas e o amarelo das capas FU no lugar do vermelho. O amarelo marca o que é a vez (a casa lida, a linha que roda, o nó visitado) e nunca representa grandeza. Nenhum vídeo precisa do verde.
- **Fala.** Uma ideia por fala, numa frase que cabe numa respiração. Os números ficam aqui em algarismos, e o `scripts/extenso.mjs` os escreve por extenso na narração. O ritmo dos Conceitos foi de umas 2,8 palavras por segundo. A voz é a do `docs/agente/voz.md`: no máximo uma gíria por vídeo, e muito vídeo passa sem nenhuma.
- **Nomes.** O rótulo na tela é o mesmo do pseudocódigo e da página do site: `m`, `i`, `v[i]`, `próx`, `início`, `topo`. Ele fica colado ao elemento que nomeia.
- **A régua.** Nas estruturas, o site conta cada leitura e cada escrita de uma casa. Não contam o tamanho, a capacidade e os índices guardados à parte, nem a conta que acha a casa no dicionário. Nas faixas, conta a operação da faixa: comparações no Máximo, multiplicações no Fatorial. O vídeo diz qual régua usa, e o contador na tela leva o nome dela.
- **Números.** Todos saem do `dados.json` (indicado como `estrutura › operação › n`) ou de rodar as classes Python do site com a entrada pequena do vídeo. As contas estão reproduzidas em `~/.config/Claude/side-session-notes/local_7616c452-cca6-4e0c-b1b4-77267062bb4f/fundamentos-contas.py`, que só lê o repositório. Proposta: a sessão dos vídeos gera um `contas.json` por vídeo, como fez nos Conceitos, e o script falha se algum número divergir.
- **Fim.** Cada vídeo termina dizendo onde aquilo toca no site (a faixa ou a página da estrutura) e passa para o próximo. O "a seguir" do site já leva ao próximo vídeo, então essa fala pode ser curta.
- **Evitar em todos.** Virar glossário (Fundamentos não é glossário, decisão 8 do `CONTENT_MAP.md`). Dar o nome antes do gesto: primeiro se vê, depois se nomeia. Sigla em inglês na fala (LIFO, FIFO, *array*, *stack overflow*). Desenho de ambientação que não carrega dado. Instrução de interface ("clique", "passe o mouse").

**Componentes que já existem** (handover do CI-02 e dos outros cinco): `Entra`, `Titulo`, `Rotulo`, `Cabecalho`, `Contador` (com `alinhar`), `Vetor` (canais entrada, destaque, cheio e apagado), `Seta` (o arco da capa), `SetaReta`, `SaiCena`, `Assinatura`, `Fundo`/`Grao`, `AberturaCapa`, `Tabela` (`NumeroContando`, `Celula`, `LinhaTabela`, `CabecalhoTabela`, `Marca`), `Video`/`Freeze` e a dobra do tempo do `narracao.ts`. A linha da vez acesa no pseudocódigo já existe na cena `fluxo` do CI-01.

---

## FU-01 · Variável · 50 s

**Mensagem central.** Uma variável é um nome com um valor: anotar apaga o valor velho, e ler não apaga.

| # | tela | fala |
|---|---|---|
| 1 | Os 24 números do Máximo passam numa fileira. Embaixo, uma caixa com o rótulo `m` e o 51 dentro. | Pra achar o maior de 24 números, o computador não decora a lista. Ele anota um número só, num papel chamado m. |
| 2 ✂ | `m ← 60`: o 51 leva um traço e some, e o 60 entra. Depois `m ← 93`. | A seta quer dizer anota. m recebe 60, e o 51 some. Não fica guardado em canto nenhum. |
| 3 | A pergunta `v[i] > m ?` com uma seta que só olha o papel. O 93 continua lá. | Ler não apaga. Quando a regra pergunta se o número da vez passa o m, ela só olha o papel. |
| 4 ✂ | Dois papéis: `a` = 3 e `b` = 7. `a ← b` apaga o 3 (traço) e a cena volta. Com `t`: `t ← a`, `a ← b`, `b ← t`. Três papéis, três linhas. | Por isso, trocar dois valores pede um terceiro papel. Sem o t, a primeira linha apaga um dos dois pra sempre. |
| 5 | A fileira cresce para 1.000 números, e `m` continua uma caixa só. | Com 24 ou com mil números, o m é uma casa só. No próximo vídeo, ele trabalha dentro de um laço. |

**Animação.** O `Vetor` no canal entrada para os 24 números. O papel é um `Vetor` de uma casa com um `Rotulo` em cima. Para anotar, o valor velho vai para o canal apagado, com a `Marca` (o traço) por cima. Ler é uma `SetaReta` que chega e sai sem mexer na caixa. A troca de `a` e `b` usa três papéis lado a lado, e a linha da vez acende como no CI-01.

**Números.** O vetor é o exemplo da faixa Máximo (`algoritmos/maximo/dados.json › exemplo`: 24 valores, semente 7, começando por 51, 29, 60, 93). Com ele, `m` passa por 51, 60 e 93, e o `exemplo.trocas` dá 2. A memória extra do Máximo é O(1): a ficha diz que ele guarda só o maior até aqui e o índice. O 3 e o 7 da troca são valores de exemplo, não medidas.

**Evitar.** Endereço de memória e RAM (isso é assunto do vetor). Lista de tipos (`int`, `float`, `bool`). O `=` das linguagens: o vídeo usa a seta ←, como o pseudocódigo do site, e a ficha técnica traduz.

**Opcional.** O Pedro tinha pedido uma ponte entre tipo de dado e estrutura. Se quiser um fio dela, cabe uma fala curta na batida 1: "O papel guarda um valor de um tipo: aqui, um número."

**Aponta para.** Máximo de um vetor (`#achar-o-maior/maximo-de-um-vetor`), onde `m` aparece no painel de variáveis do palco. A seguir: FU-02.

---

## FU-02 · Laço e decisão · 55 s

**Mensagem central.** O laço repete o mesmo passo para cada número, e a decisão escolhe o que fazer em cada volta. O número de voltas é fixo, e a entrada só muda o que a decisão responde.

| # | tela | fala |
|---|---|---|
| 1 | O pseudocódigo do Máximo, igual ao do site (4 linhas). A linha `para` e a linha `se` ganham um contorno. | A regra do maior tem duas peças: um laço e uma decisão. |
| 2 ✂ | `i` anda casa por casa, e a linha `para` acende a cada volta. Um contador de voltas sobe. | O laço repete o mesmo passo pra cada número depois do primeiro. Com 24 números, são 23 voltas. |
| 3 | Em cada volta, `v[i] > m ?` acende. Com o 29, não. Com o 60, sim: a linha de baixo roda e `m` muda. Dois contadores param: comparações 23, m mudou 2. | Em cada volta, a decisão pergunta se o número passa o m. A linha de baixo só roda quando passa. Aqui, 2 vezes. |
| 4 ✂ | Os mesmos 24 números em ordem crescente: 23 e 23. Em ordem decrescente: 23 e 0. | Com os números em ordem crescente, o m muda em toda volta. Em ordem decrescente, nunca muda. E as voltas são sempre 23. |
| 5 | A fileira vira 1.024 números, e o contador vai a 1.023. | O laço diz quanto trabalho tem, e a decisão diz o que muda. Com 1.024 números, são 1.023 comparações, em qualquer ordem. |

**Animação.** A cena `fluxo` do CI-01 (o pseudocódigo com a linha da vez acesa), o `Vetor` com a casa da vez em amarelo e dois `Contador` alinhados. Na batida 4, as três ordens podem ficar em três fileiras empilhadas, como as três buscas do CI-04.

**Números.** Do `algoritmos/maximo/dados.json`: o `exemplo` tem 24 valores, `ops` 23 e `trocas` 2. Para n = 1.024, `tempo.crescimento` dá 1.023 comparações. Nas ordens crescente e decrescente, a ficha diz que o maior troca n − 1 vezes e 0 vezes, e o `tempo.crescimento` confirma isso de 16 a 1.024. Para os 24 números do vídeo, isso dá 23 e 0; vale conferir no palco da faixa com a entrada crescente e com a decrescente.

**Evitar.** `for` e `if` de alguma linguagem. Tipos de laço (`while`, `do`). Dizer O(n) aqui, que é assunto do FU-10. Chamar a mudança de `m` de "troca" na fala: no site, "trocas" é o nome técnico, e no vídeo é "o m mudou".

**Aponta para.** Máximo de um vetor (`#achar-o-maior/maximo-de-um-vetor`). A seguir: FU-03.

---

## FU-03 · Função e recursão · 65 s

**Mensagem central.** Uma função recebe uma entrada e devolve uma resposta. A função recursiva resolve chamando a si mesma num problema menor, e cada chamada fica empilhada, esperando a de cima voltar.

| # | tela | fala |
|---|---|---|
| 1 | Uma caixa `fatorial`: entra 4, sai 24. Ao lado, 4 · 3 · 2 · 1. | Uma função é um pedaço de regra com nome. Recebe uma entrada e devolve a resposta: o fatorial de 4 devolve 24. |
| 2 ✂ | O pseudocódigo do Fatorial, igual ao do site. `fatorial(4)` vira `4 · fatorial(3)`, e os cartões se empilham: (4), (3), (2), (1), cada um com o seu `n` e um "?" esperando. | O fatorial de 4 é 4 vezes o fatorial de 3. A função chama a si mesma num problema menor, e cada chamada fica parada no meio, esperando a de cima voltar. |
| 3 | A linha `se n ≤ 1` leva um traço. Os cartões empilham sem parar e saem pelo alto da tela. | Sem uma parada, ela chama, chama e nunca termina. |
| 4 ✂ | A linha volta e acende: `fatorial(1)` devolve 1. Os cartões saem de cima pra baixo, devolvendo 1, 2, 6 e 24. O contador de multiplicações vai a 3. | O fatorial de 1 é 1, sem chamar ninguém: é o caso-base. Daí as respostas voltam, 2, 6, 24, com 3 multiplicações. |
| 5 | n = 10: dez cartões, 9 multiplicações, 3.628.800. | Com 10, são 10 chamadas empilhadas ao mesmo tempo. Essa pilha volta daqui a dois vídeos. |

**Animação.** É preciso um componente novo, a pilha de chamadas. Cada cartão é uma casa de um `Vetor` vertical com um `Rotulo`, `fatorial(k)` e o `n` dele. A linha da vez vem do CI-01, e o `Contador` conta as multiplicações. Na batida 3, os cartões podem sair de quadro acelerando, sem efeito de explosão.

**Números.** Do `algoritmos/fatorial/dados.json`: em `tempo.crescimento`, n = 4 dá 3 multiplicações e pico 4; o `exemplo` (n = 10) dá 9 multiplicações, pico 10 e 3.628.800. A memória da ficha é O(n): no fundo, são n níveis empilhados.

**Evitar.** Fibonacci aqui, que tem playlist própria. Recursão de cauda. Dizer que a recursão é mais rápida: ela deixa a regra mais clara, não mais rápida. A ficha diz que o laço guardaria só o produto, e isso cabe numa fala se sobrar tempo.

**Aponta para.** Fatorial recursivo (`#problemas-gerais/fatorial-recursivo`) e a playlist Calcular Fibonacci (`#calcular-fibonacci`). A seguir: FU-04.

---

## FU-04 · Vetor · 70 s

**Mensagem central.** São casas numeradas lado a lado, e qualquer uma se lê pelo número com 1 leitura. O preço aparece quando o começo muda e quando as casas acabam.

| # | tela | fala |
|---|---|---|
| 1 | Os 10 primeiros números do Máximo nas casas 0 a 9, com 6 casas tracejadas e vazias depois (capacidade 16). | Um vetor guarda os valores em casas numeradas, uma do lado da outra, a partir do zero. |
| 2 ✂ | `v[7]` acende e mostra 22, com a conta "início + 7" ao lado. Leituras: 1. Corte para um vetor de 1.000: `v[700]`, leituras: 1. | Pra ler a casa 7, o computador não passa pelas outras. Faz uma conta, onde o vetor começa mais 7, e vai direto. Uma leitura, com 10 casas ou com mil. |
| 3 ✂ | Inserir na casa 0: cada valor anda uma casa para a direita, de trás pra frente. Leituras 10, escritas 11, total 21. Ao lado: com 1.000, 2.001. | O preço aparece no começo. Pra abrir a casa 0, todo mundo anda uma casa: 21 acessos com 10 valores, 2.001 com mil. |
| 4 | 8 casas cheias de 8. Anexar o 9º: surge um bloco de 16, os 8 são copiados e o novo é escrito. Leituras 8, escritas 9, total 17. | E quando as casas acabam? O vetor reserva o dobro, copia tudo e só então escreve: 17 acessos pra pôr o nono. |
| 5 ✂ | 1.000 anexações seguidas, com o contador em 3.046 e, embaixo, "÷ 1.000 ≈ 3". | Parece caro, mas é raro: como o vetor dobra, a próxima cópia demora o dobro pra chegar. Mil anexações custam 3.046 acessos, uns 3 cada. |

**Animação.** O `Vetor` ganha um canal novo, o da casa reservada e vazia, com o contorno tracejado da página do site. O deslocamento é cada casa andando uma posição, com `NumeroContando` nos contadores. A conta "início + 7" é um `Rotulo` com uma `SetaReta`. A dobra mostra o bloco novo embaixo e as cópias descendo uma a uma, aceleradas.

**Números.** Do `instrumentos/vetor/dados.json`: `ler` dá 1 + 0 com 10, 100 e 1.000; `inserir-inicio` dá 10 + 11 com 10 e 1.000 + 1.001 com 1.000; `anexar-pior` dá k = 9, 8 + 9 com 10; `anexar-media` dá 1.023 + 2.023 = 3.046 com 1.000. A capacidade 16 com 10 valores e o `v[7]` = 22 saem da classe `Vetor` do site, enchendo com os valores do Máximo.

**Evitar.** *Array*, *ArrayList*, *list* na fala. A nota pode dizer que a *list* do Python é esse vetor que dobra. Endereço em hexadecimal. A palavra "amortizado" antes da batida 5: se entrar, é no fim ("a página chama isso de amortizado").

**Aponta para.** A página Vetor (`#estruturas/vetor`) e as faixas que o tocam: a Busca binária e as ordenações. A seguir: FU-05.

---

## FU-05 · Pilha e fila · 75 s

**Mensagem central.** Na pilha, o último que entra sai primeiro; na fila, sai primeiro quem entrou primeiro. As duas só mexem nas pontas e, bem montadas, cada operação custa 1.

| # | tela | fala |
|---|---|---|
| 1 | `{ [ ( ) ] }` lido símbolo por símbolo. Quem abre empilha. Quem fecha desempilha o de cima e confere o par, e o par certo acende. No fim, a pilha está vazia. | Na pilha, só se mexe no topo. Pra conferir se os símbolos fecham, cada um que abre vai pra pilha. Cada um que fecha tira o de cima e confere o par. |
| 2 ✂ | A pilha com 10 e com 1.000 valores: empilhar, 1 escrita; desempilhar, 1 leitura. Ao lado, os cartões do fatorial do FU-03. | O topo é o fim de um vetor. Empilhar custa 1 escrita, e desempilhar, 1 leitura, com 10 ou mil na pilha. A pilha de chamadas do fatorial é isso. |
| 3 | A fila: entra pelo fim, sai pelo começo. Na versão ingênua, o primeiro mora na casa 0, e cada saída faz todos andarem: 19 com 10, 1.999 com 1.000. | Na fila do postinho, quem chega primeiro é atendido primeiro. Se o primeiro mora na casa 0, cada atendimento faz todo mundo andar: 1.999 acessos com mil na fila. |
| 4 ✂ | A fila circular: ninguém anda, só o marcador `início` avança uma casa. No fim do vetor, ele volta para a casa 0. Leituras: 1. | Na fila circular, ninguém anda. Quem anda é o marcador do início, que dá a volta no fim do vetor. Atender custa 1. |
| 5 | Setas nas duas pontas: pôr na frente custa 1, tirar de trás custa 1. | Abrindo as duas pontas, vira um deque, que serve de pilha e de fila. É ele que acha o maior de cada trecho, na primeira playlist. |

**Animação.** A pilha é o `Vetor` em pé, com o rótulo `topo` colado na casa de cima. A fila é o `Vetor` deitado, com um marcador `início` (`SetaReta` + `Rotulo`). Na circular, uma `Seta` em arco vai da última casa para a primeira, e a fileira continua reta para manter a forma do vetor. Os cartões do fatorial vêm prontos do FU-03.

**Números.** Dos `dados.json` de `pilha`, `fila` e `deque`: `empilhar` dá 0 + 1 e `desempilhar` dá 1 + 0, com 10, 100 e 1.000. `desenfileirar-ingenua` dá 10 + 9 com 10 e 1.000 + 999 com 1.000. `desenfileirar-circular` dá 1 + 0. No deque, `por-frente` dá 0 + 1 e `tirar-tras` dá 1 + 0. O `{[()]}` é um exemplo curto. A faixa usa 24 símbolos.

**Evitar.** LIFO e FIFO. Mais de uma analogia por estrutura: os parênteses para a pilha e o postinho para a fila bastam, então nada de pratos e de desfazer junto. Explicar de novo a dobra do FU-04. O vídeo é o mais cheio dos 11: se passar de 75 s, a batida 5 encolhe para uma fala só.

**Aponta para.** As páginas Pilha, Fila e Deque (`#estruturas/pilha`, `#estruturas/fila`, `#estruturas/deque`) e as faixas Parênteses balanceados, Fila de atendimento e Máximo em janela deslizante. A seguir: FU-06.

---

## FU-06 · Lista encadeada · 60 s

**Mensagem central.** Cada valor guarda onde está o seguinte. Inserir no começo não empurra ninguém, mas, para chegar a uma posição, é preciso seguir as setas desde o início.

| # | tela | fala |
|---|---|---|
| 1 | 10 nós espalhados pela tela. Cada nó tem duas casas, o valor e o `próx`, com uma seta para o seguinte. O rótulo `início` aponta o primeiro. | Numa caça ao tesouro, cada pista diz onde está a próxima. A lista encadeada é assim: cada valor guarda, do lado, onde mora o seguinte. |
| 2 ✂ | Um nó novo: escreve o valor e aponta o `próx` para o antigo início. Escritas: 2. Ao lado, o vetor do FU-04: 21. Depois, com 1.000: 2 contra 2.001. | Pôr um valor no começo é escrever o valor e uma seta: 2 escritas. No vetor eram 21, e com mil, 2 contra 2.001. |
| 3 | Ler a posição 9: as 10 setas acendem uma a uma, e o contador vai a 10. No vetor, 1. Depois, com 1.000: 1.000 contra 1. | O preço é chegar. Não há conta que dê a casa 9: tem que seguir as setas desde o início. São 10 leituras, e com mil, mil. |
| 4 ✂ | Inserir na posição 5: anda 5 (5 leituras), troca duas setas e escreve o valor (3 escritas). Total 8, contra 11 no vetor. | Inserir no meio é trocar duas setas, e isso é barato. O caro é andar até lá: 8 acessos, contra 11 no vetor. |
| 5 | A tabela 2 × 2: começo e chegar, vetor e lista, com os quatro números com 1.000. Um nó ganha uma segunda seta. | Cada um ganha numa pergunta. Com uma seta por nó, os nós ficam em fila. Com duas, vira uma árvore. |

**Animação.** Componentes novos e base do lote: o `No` (duas casas, valor e `próx`) e o `Ponteiro` (uma seta de casa a casa, que acende quando é seguida). A tabela 2 × 2 da batida 5 é uma `Tabela` do CI. Os nós ficam espalhados de propósito, para a fila de casas do vetor não parecer a mesma coisa.

**Números.** Do `instrumentos/lista/dados.json`, versão dinâmica: `inserir-inicio` dá 0 + 2; `ler-ultima` dá 10 com 10 e 1.000 com 1.000; `inserir-meio` dá 5 + 3 com 10. O vetor do FU-04 dá 21 e 2.001 (`inserir-inicio`) e 1 (`ler`). O 11 do vetor na posição 5 (5 leituras + 6 escritas) não está no `dados.json` e sai da classe `Vetor` do site.

**Evitar.** A versão estática (vetor + índice do próximo), que fica na página. "Lista" sozinho na fala: em Python, *list* é o vetor do FU-04, então o vídeo diz sempre "lista encadeada". Endereço em hexadecimal.

**Aponta para.** A página Lista encadeada (`#estruturas/lista`) e a faixa Inverter lista encadeada (`#problemas-gerais/inverter-lista`). A seguir: FU-07.

---

## FU-07 · Árvore e heap · 75 s

**Mensagem central.** As duas guardam em níveis. Na árvore de busca, cada comparação descarta um lado inteiro; no heap, o menor fica sempre no topo. Nas duas, o trabalho é do tamanho da altura, e a altura são poucos níveis.

| # | tela | fala |
|---|---|---|
| 1 | 50, 30, 70, 20, 40, 60 e 80 entram um por um: os menores descem à esquerda, os maiores à direita. A árvore fica com 3 níveis. | Agora cada nó tem duas setas. Numa árvore de busca, à esquerda de cada nó só moram os menores, e à direita, só os maiores. |
| 2 ✂ | Buscar 60: no 50, vai à direita; no 70, à esquerda; achou. O lado descartado esmaece a cada passo. São 3 nós e 5 leituras. | Pra achar o 60: é maior que 50, vai pra direita; menor que 70, esquerda; achou. São 3 nós olhados, e cada descida joga fora um lado inteiro. |
| 3 ✂ | Os mesmos valores em ordem, 10 a 70, formam uma fila indiana de 7 níveis, e buscar o 70 custa 13 leituras. Corte para a AVL: 3 níveis, 5 leituras. Embaixo, com 1.000 em ordem: 1.999 contra 19. | Mas a forma depende da ordem de chegada. Em ordem, a árvore vira uma fila indiana. A AVL gira os nós pra ficar baixa: com mil valores em ordem, achar o maior custa 1.999 leituras na comum e 19 na AVL. |
| 4 | Outra regra: 5, 3, 8, 1, 9, 2 e 7 entram, e todo pai fica menor que os filhos, com o 1 no topo. Embaixo, a mesma árvore como vetor, [1, 3, 2, 5, 9, 8, 7], com setas da casa `i` para `2i + 1` e `2i + 2`. | O heap usa outra regra: todo pai é menor que os filhos, então o menor fica no topo. E a árvore mora num vetor: os filhos da casa i estão nas casas 2i + 1 e 2i + 2. |
| 5 ✂ | Ver o menor: 1 leitura. Tirar o menor: o 7, o último, vai ao topo e desce trocando com o filho menor. São 8 acessos, e o vetor fica [2, 3, 7, 5, 9, 8]. Embaixo, com 10, 100 e 1.000: 15, 27 e 39. | Ver o menor custa 1 leitura. Pra tirar, o último sobe pro topo e desce trocando com o filho menor: 8 acessos aqui, 39 com mil valores. |

**Animação.** A `Arvore` é nova: o `No` do FU-06 com duas setas, posto em níveis. A AVL aparece em corte, com a fila indiana se recompondo em 3 níveis, sem animar rotação por rotação. No heap, a `Arvore` fica em cima e o `Vetor` embaixo, e a mesma posição acende nas duas vistas ao mesmo tempo.

**Números.** A árvore de 7 valores e o heap de 7 saem das classes `ArvoreComum`, `ArvoreAVL` e `Heap` do site. Com 50, 30, 70… a altura é 3, e buscar 60 custa 5 leituras (o valor de cada nó e a seta por onde desceu). Em ordem, a comum tem altura 7 e buscar 70 custa 13; a AVL tem altura 3 e custa 5. O heap fica [1, 3, 2, 5, 9, 8, 7], ver o menor custa 1, e tirar custa 5 + 3. Do `dados.json`: `arvore › buscar-maior-comum › 1000` dá 1.999 e `buscar-maior-avl › 1000` dá 19. `heap › tirar` dá 8 + 7, 14 + 13 e 20 + 19.

**Evitar.** Animar cada rotação da AVL, que é cara e não cabe. A remoção na árvore de busca, com os três casos (fica na página). Heap de máximo. Montar o heap de uma vez em O(n) (também fica na página). "Árvore binária completa" na fala. É o segundo vídeo mais cheio dos 11: se passar, a batida 3 perde o corte da AVL e fica só com o 1.999 contra 19.

**Aponta para.** As páginas Árvore de busca e Heap (`#estruturas/arvore`, `#estruturas/heap`) e as faixas Busca em árvore, AVL, Fila de prioridade e Heapsort. A seguir: FU-08.

---

## FU-08 · Grafo · 65 s

**Mensagem central.** São pontos ligados por arestas, como esquinas ligadas por ruas. O jeito de guardar decide qual pergunta sai barata.

| # | tela | fala |
|---|---|---|
| 1 | 5 esquinas, 0 a 4, e 6 ruas: 0–1, 0–2, 1–2, 1–3, 2–4 e 3–4. Os rótulos "vértice" e "aresta" só aparecem no fim da fala. | Cinco esquinas e as ruas entre elas. Cada esquina é um vértice, e cada rua, uma aresta. A árvore era um grafo sem volta. Aqui dá pra rodar o quarteirão. |
| 2 ✂ | A tabela 5 × 5, com 1 onde há rua. "0 e 4 se ligam?": uma casa, 1 leitura. "Vizinhos do 2?": a linha inteira, 5 leituras. | Um jeito de guardar é uma tabela, com 1 onde tem rua. 0 e 4 se ligam? Uma leitura. Os vizinhos do 2? A linha inteira: 5. |
| 3 ✂ | Cada esquina com a fileira dos seus vizinhos, como 2 → [0, 1, 4]. Vizinhos do 2: 3 leituras. "0 e 4?": procura na fileira do 0, 2 leituras. | Outro jeito: cada esquina guarda só os vizinhos. Os do 2 custam 3 leituras, uma por vizinho. Pra saber se 0 e 4 se ligam, procura na fileira do 0: 2. |
| 4 | Com 1.000 esquinas e 6 ruas em cada uma: na tabela, vizinhos custam 1.000 leituras e ocupam 1.000.000 de casas; na lista, 6 leituras e 9.000 casas. | Com mil esquinas e 6 ruas em cada uma, a tabela lê mil casas pra achar 6 vizinhos e guarda um milhão. A lista lê 6 e guarda 9 mil. |
| 5 | As capas da Busca em largura, da profundidade e do Dijkstra. | Quase todo algoritmo de grafo pergunta quem são os vizinhos. Por isso as faixas de grafo usam a lista. |

**Animação.** O `Grafo` é novo: vértices em posição fixa e arestas que acendem. Ele reaproveita o desenho do `No` e do `Ponteiro`, sem seta na ponta. A matriz é uma `Tabela` do CI. As fileiras de vizinhos são `Vetor` pequenos, um por vértice. Na batida 3, a aresta e a casa da tabela que ela representa acendem juntas.

**Números.** O grafo de 5 sai das classes `GrafoMatriz` e `GrafoLista` do site. A matriz tem 25 casas; 0–4 custa 1 leitura e os vizinhos do 2 custam 5. A lista tem 19 casas; 0–4 custa 2 leituras e os vizinhos do 2 custam 3. Do `instrumentos/grafo/dados.json`: `vizinhos-matriz › 1000` dá 1.000 e `vizinhos-lista › 1000` dá 6, no grafo de medição, em que cada vértice se liga aos 3 seguintes, dando a volta, com grau 6. As 1.000.000 e as 9.000 casas saem da `capacidade` das classes nesse mesmo grafo.

**Evitar.** Grafo dirigido e pesos, que ficam para o Dijkstra. A matriz de incidência, que é a terceira vista da página (basta citar que ela existe). "Nó" no lugar de vértice. Mapa de um bairro de verdade.

**Aponta para.** A página Grafo (`#estruturas/grafo`) e as faixas Busca em largura, Busca em profundidade e Dijkstra. A seguir: FU-09.

---

## FU-09 · Dicionário · 75 s

**Mensagem central.** Em vez de procurar a chave, uma conta com ela diz em que casa ela mora. Quando duas chaves caem na mesma casa, a tabela tem um plano.

| # | tela | fala |
|---|---|---|
| 1 | O primeiro verso da Canção do Exílio. Ao lado, "chave → valor": palavra → quantas vezes. | Pra contar as palavras de um poema, cada palavra precisa de um contador. A palavra é a chave, e a contagem é o valor. |
| 2 ✂ | Uma tabela de 8 casas. "minha" passa por uma caixa de conta e cai na casa 1. Depois terra → 5, tem → 3, palmeiras → 6 e onde → 0. | O dicionário não procura a palavra. Faz uma conta com as letras, e a conta diz a casa: minha, casa 1; terra, casa 5. |
| 3 ✂ | "canta" também dá 5, ocupada pela terra. Primeiro, a casa 5 ganha uma corrente (a lista encadeada do FU-06), e canta entra na frente. Depois, na outra versão: tenta a 6 (palmeiras) e a 7, vazia. | Canta também dá 5: é uma colisão. Um jeito é a casa guardar uma corrente, e a palavra nova entra nela. Outro é tentar a casa seguinte até achar uma vazia. |
| 4 | "o" seria a 7ª chave em 8 casas e passaria de 3/4 cheia. A tabela vira 16, e cada palavra muda de casa: 44 acessos, contra 6 de uma palavra sem colisão. | Antes de lotar, a tabela dobra, e cada palavra muda de casa. Custa caro, 44 acessos, e é raro, como no vetor que dobra. |
| 5 ✂ | Uma `Tabela` com 10, 100 e 1.000 chaves. Ler uma chave custa 3, 3 e 3 (corrente) e 2, 2 e 2 (casa seguinte). No vetor, procurando casa por casa: 10, 100 e 1.000. | Com 10, 100 ou mil chaves, achar uma custa 2 ou 3 leituras. No vetor, procurando casa por casa, até mil. |

**Animação.** O `Vetor` de 8 casas, com o `No` e o `Ponteiro` do FU-06 pendurados para baixo, formando a corrente. A conta é uma caixa com "#" entre a palavra e a casa (a mesma imagem da capa FU-09), ligada por `SetaReta`. Na dobra, as palavras saem das 8 casas e pousam nas 16. O custo vai numa `Tabela` do CI.

**Números.** As casas saem da `casa_de` do `instrumentos/dicionario/dicionario.py`, com 8 casas: minha 1, terra 5, tem 3, palmeiras 6, onde 0, canta 5. Com encadeamento, cada pôr custa 2 + 4 = 6 sem colisão, e o "o", que faz a tabela dobrar, custa 28 + 16 = 44. Com sondagem, canta custa 3 + 2. Do `dados.json`: `ler-encadeamento` dá 3 e `ler-sondagem` dá 2, com 10, 100 e 1.000; `vetor › buscar` dá 10, 100 e 1.000. Calcular a casa não conta, como no site. A faixa Contar palavras usa a sondagem, como o *dict* do Python.

**Evitar.** A constante de Knuth e o polinômio de base 31 (ficam na ficha técnica). A lápide. α como símbolo na fala ("3/4 cheia" basta). Prometer que é sempre 1: o vídeo mostra 2 ou 3, e a dobra.

**Aponta para.** A página Dicionário (`#estruturas/dicionario`) e as faixas Contar palavras, Achar repetidos, Colisão por encadeamento e Colisão por sondagem linear. A seguir: FU-10.

---

## FU-10 · n, passo e memória · 70 s

**Mensagem central.** O site mede três coisas: o tamanho da entrada (n), quantas vezes a operação básica acontece (os passos) e quanto se guarda além da entrada e da resposta (a memória).

| # | tela | fala |
|---|---|---|
| 1 | O vetor de 24 do Máximo, com o rótulo `n = 24`. Ele dobra até 1.024. | n é o tamanho da entrada: 24 números aqui. Nos gráficos do site, n vai dobrando. |
| 2 ✂ | O contador do Máximo: 23 comparações. Ao lado, o contador de uma página de estrutura: leituras + escritas. | Passo é a operação que se conta. No Máximo, são comparações: 23 pra 24 números. Nas estruturas, cada leitura ou escrita de casa conta 1. |
| 3 ✂ | O Máximo guarda só `m` e `i`, com 24 ou com 1.024 números. O Fatorial de 10 guarda 10 cartões empilhados, do FU-03. | Memória é o que se guarda além da entrada e da resposta. O Máximo guarda só m e i, com 24 ou mil números. O fatorial de 10 deixa 10 chamadas empilhadas, e isso cresce com n. |
| 4 | A etiqueta O(n) de uma faixa, com a regra embaixo: pior caso, a não ser que diga médio ou amortizado. | O O de cada faixa fala do pior caso, que é a promessa. Quando a conta é média, a etiqueta avisa. |
| 5 ✂ | A Busca sequencial com 1.024 números: de 1 a 1.024 comparações, com um teto e um piso. O Máximo: sempre 1.023, com o teto e o piso juntos. Aparecem O, Ω e Θ. | O O é o teto, e o ômega é o piso. A busca sequencial vai de 1 a 1.024: teto n, piso 1. O Máximo faz sempre 1.023. Quando teto e piso crescem juntos, é teta. |

**Animação.** Este vídeo só reaproveita: o `Vetor` e o `Contador` do FU-02, os cartões do FU-03 e a `Tabela`. O teto e o piso da batida 5 são duas linhas horizontais (`SetaReta` sem ponta) sobre a faixa de valores da busca.

**Números.** Do `algoritmos/maximo/dados.json`: o `exemplo` tem 24 valores e 23 comparações; `tempo.crescimento › 1024` dá 1.023; a memória tem pico 0 (só escalares). Do `fatorial/dados.json`: `exemplo.pico` dá 10. Do `sequencial/dados.json`, em `tempo.crescimento › 1024`: o alvo no começo custa 1, e o ausente, 1.024.

**Decisão do Pedro.** A batida 5, com Ω e Θ, cumpre a pendência E8 do mapa, que mandou o Ω e o Θ para este vídeo. É a parte mais densa. Se o Pedro preferir, ela sai, o vídeo fica com uns 55 s, e o Ω e o Θ ficam na nota da abertura de Algoritmos e estruturas. A leitura usada (o piso é o melhor caso e o teto é o pior) é a de aula, e a nota técnica deve dizer isso.

**Evitar.** Segundos, que o CI-03 já tratou. A definição formal (c · g(n), limites). Confundir a memória com o tamanho da entrada.

**Aponta para.** Qualquer faixa: a etiqueta O(·) e o "memória extra" do encarte. A seguir: FU-11.

---

## FU-11 · Ler o gráfico log-log · 65 s

**Mensagem central.** Com os dois eixos em escala log, cada curva vira uma reta, e a inclinação dela é o expoente. Quando n dobra e o custo dobra, a inclinação é 1; quando o custo quadruplica, é 2.

| # | tela | fala |
|---|---|---|
| 1 | Três faixas num gráfico de eixos comuns, com n de 16 a 1.024. O Bubble sort, com o vetor invertido, chega a 523.776. A Busca sequencial (1.024) e a binária (21) colam no chão. | No gráfico comum, o Bubble sort chega a 523 mil comparações e esmaga o resto. As duas buscas somem no chão. |
| 2 ✂ | O mesmo gráfico com os eixos trocados. No x, 16, 32, 64…, e cada marca dobra. No y, 10, 100, 1.000…, e cada marca vale 10 vezes a de baixo. As três linhas se separam e ficam retas. | No site, os dois eixos andam multiplicando. Em n, cada passo dobra. Na altura, cada marca vale 10 vezes a de baixo. E as curvas viram retas. |
| 3 | A sequencial: 16, 32, 64. Um degrau de 1 para 1 encosta na reta. | Na busca sequencial, n dobra e o custo dobra: 16, 32, 64. A reta sobe 1 pra cada 1 que anda. É inclinação 1, n elevado a 1. |
| 4 ✂ | O Bubble: 120, 496, 2.016. Um degrau de 1 para 2, com a referência n²/2 do site tracejada, colada na reta. | No Bubble, n dobra e o custo quase quadruplica: 120, 496, 2.016. A reta sobe 2 pra cada 1. É inclinação 2, n ao quadrado. |
| 5 ✂ | A binária: 9, 11, 13… até 21, somando 2 a cada dobra. A linha quase deita. | Na binária, cada dobra soma só 2: de 9 a 21. A linha quase deita, e isso é o log. Bateu o olho na inclinação, sabe o expoente. |

**Animação.** O `GraficoLogLog` é novo e deve copiar os eixos do `graficos.js` do site: n dobrando no x e log₁₀ no y, com as mesmas marcas. A cena principal é a passagem do eixo comum para o log, com o mesmo gráfico e os pontos deslizando para a escala nova. O degrau de inclinação são duas `SetaReta` (andou 1, subiu 1 ou 2).

**Números.** De `algoritmos/<faixa>/dados.json › tempo.crescimento`, com n = 16, 32, …, 1.024. O Bubble no vetor invertido dá 120, 496, 2.016, …, 523.776. A sequencial com o alvo ausente dá 16, 32, …, 1.024. A binária com o alvo no fim dá 9, 11, …, 21. As três contam comparações, a mesma régua do site. A binária conta o `=` e o `<` separados, por isso dá 21, e não os 5 passos do CI-02. O vídeo diz "comparações" e não "passos", para não brigar com o CI-02.

**Evitar.** A definição matemática do logaritmo. O n log n (o site já desenha a referência, e o vídeo não precisa nomeá-la). Misturar unidades no mesmo gráfico.

**Aponta para.** O gráfico de tempo de qualquer faixa. Último vídeo: a fala final pode ser "Base pronta. Agora, os problemas.", e o "a seguir" vai para a primeira playlist, Achar o maior.

---

## Lotes de produção

Os lotes seguem a ordem da playlist, para os vídeos irem ao ar em sequência, e agrupam o que divide componentes novos.

| lote | vídeos | o que reaproveita | o que é novo | piloto |
|---|---|---|---|---|
| 1 · casas, laço e chamadas | FU-01, FU-02, FU-03, FU-04 | `Vetor`, `Contador`, `Tabela`, `SetaReta`, a linha da vez do CI-01. O vetor do Máximo é a mesma entrada em 01, 02 e 04, com um script de contas só. | o canal "reservada" (tracejado) do `Vetor`; a pilha de chamadas (cartões num `Vetor` vertical) | FU-02, o mais perto do CI-01 |
| 2 · pontas, setas e níveis | FU-05, FU-06, FU-07 | o lote 1 inteiro: o `Vetor` em pé vira a pilha, os cartões do FU-03 voltam no FU-05 | o marcador (`início`, `topo`), `No`, `Ponteiro`, `Arvore` em níveis, a vista dupla árvore ↔ vetor do heap. É o lote mais pesado. | FU-06, porque o `No` e o `Ponteiro` servem de base para 07, 08 e 09 |
| 3 · redes, chaves e medidas | FU-08, FU-09, FU-10, FU-11 | o `No` e o `Ponteiro` (grafo e corrente do dicionário), a `Tabela` (matriz de adjacência e custos), o FU-02 e o FU-03 inteiros no FU-10 | `Grafo` com vértices fixos; `GraficoLogLog` com a passagem do eixo comum para o log | FU-11, o único gráfico novo |

Os três vídeos mais cheios são o FU-05, o FU-07 e o FU-09, todos com 75 s. Cada briefing diz qual batida encolhe se a narração passar disso.
