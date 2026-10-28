# O método de Jon Bentley para ensinar e escrever sobre algoritmos

Pesquisa para o agente redator-professor da galeria. Cada achado separa **o que ele disse** (paráfrase, com no máximo uma citação curta no original e a fonte) da **leitura para a galeria**, que é interpretação nossa e não dele. Os links completos estão na seção 6.

Sobre as fontes: o site da 2ª edição de *Programming Pearls* (Bell Labs, hoje fora do ar) foi lido pelo Internet Archive. Ele traz o prefácio, os dois epílogos, as colunas 1, 7 e 15 inteiras, resumos ("sketches") das colunas 2, 4, 5, 8 e 14, soluções, apêndices e as transparências de aula. Do livro impresso, de *More Programming Pearls* e de *Writing Efficient Programs*, só usamos o que aparece nessas páginas ou em fontes citadas. Quando a fonte é secundária, o achado diz isso.

---

## 1. Quem é

Jon Louis Bentley nasceu em 1953. Formou-se em Stanford (1974), fez o doutorado na Universidade da Carolina do Norte (1976) e foi professor em Carnegie Mellon por seis anos. Ficou no centro de pesquisa em computação do Bell Labs de 1982 a 2001 e depois foi para a Avaya Labs. Criou a k-d tree e fez com Doug McIlroy o quicksort da biblioteca C ([Wikipedia](https://en.wikipedia.org/wiki/Jon_Bentley_(computer_scientist))). Começou a coluna "Programming Pearls" na *Communications of the ACM* em 1983. As colunas viraram *Programming Pearls* (1986; 2ª ed. 1999/2000) e *More Programming Pearls* (1988). Antes disso ele já tinha escrito *Writing Efficient Programs* (1982) ([prefácio](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/preface.html), [why2e](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/why2e.html)).

---

## 2. Achados

### A1. Abrir com um problema real, contado como história, e com o próprio erro

- **Ele disse.** A coluna 1 começa com a pergunta de um colega: como ordenar um arquivo em disco? Antes de responder, Bentley convida o leitor a pensar no que diria. Em seguida confessa que errou ao responder logo com um merge sort em disco: "My mistake was to answer his question." A conversa, com as perguntas dele em itálico, revela o problema verdadeiro: no máximo dez milhões de números de telefone distintos, de sete dígitos, com cerca de um megabyte livre (*Programming Pearls*, 2ª ed., col. 1, seção 1.1, [cto.html](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/cto.html)). No prefácio ele diz que essas "pérolas" nasceram de problemas reais que irritaram programadores reais ([prefácio](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/preface.html)). Já num relatório de 1983, ele defendia o estudo de caso com o exemplo das revistas médicas: os casos clínicos ensinam fatos que não cabem numa descrição sistemática (*A Case Study in Writing Efficient Programs*, CMU, 1983, seção 1.1, [DTIC](https://archive.org/details/DTIC_ADA127572)).
- **Leitura para a galeria.** A faixa abre com uma cena de uso em uma ou duas frases: quem precisa de quê e com quais limites. A definição do algoritmo vem depois. O erro óbvio, a solução que todo mundo tentaria primeiro, também pode entrar no texto como parte da história.

### A2. Reescrever o problema como entrada, saída e restrições

- **Ele disse.** Depois da conversa, a seção 1.2 arruma o que se sabe numa forma menos enviesada e mais útil: **Entrada** (arquivo com no máximo *n* inteiros positivos menores que *n*, *n* = 10⁷, sem repetição), **Saída** (a lista em ordem crescente) e **Restrições** (cerca de um megabyte de memória; alguns minutos no máximo, e dez segundos já bastam). Ele fecha a coluna dizendo: "Defining the problem was about ninety percent of this battle" (col. 1, seções 1.2 e 1.5, [sec012](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec012.html), [sec015](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec015.html)). As transparências da busca binária seguem o mesmo molde: "The Problem" com Input e Output, depois "The Algorithm" numa frase e um exemplo (transparências da col. 4, lâmina 2, [s04.pdf](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/s04.pdf)).
- **Leitura para a galeria.** O encarte pode ter um bloco fixo, curto, de entrada, saída e restrição antes do pseudocódigo. Por exemplo: "vetor já ordenado; posição do valor ou −1". O `objetivo` da ficha diz para que serve, e esse bloco diz exatamente o que entra e o que sai.

### A3. Parar o leitor e fazê-lo pensar antes da resposta

- **Ele disse.** O texto interrompe a si mesmo com perguntas ao leitor: o que você teria respondido (abertura da coluna 1), pense um minuto nesta especificação (seção 1.2), pense numa representação adequada (seção 1.3) ([sec013](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec013.html), [cto.html](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/cto.html)). No prefácio ele pede leitura lenta, uma coluna por sessão, e tentativa real de resolver cada problema antes de seguir: "One hint about reading the essays: don't go too fast." ([prefácio](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/preface.html)). Em aula, algumas transparências trazem a pergunta em cima e a resposta embaixo. Ele cobre a resposta com uma folha em branco e só a revela depois da discussão do grupo ([teaching.html](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/teaching.html)). Na palestra sobre truques do ofício, as regras eram pensar em tempo real e discutir. Anotar e responder de cor eram "ilegais" (transparências de "Tricks of the Trade", GDC 2000, lâmina 3, linkadas em [tricks.html](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/tricks.html)).
- **Leitura para a galeria.** A folha em branco sobre a resposta é um recurso de palco. A faixa pode mostrar a entrada e a pergunta ("onde está o 50?") e segurar a ideia por um instante antes de animar. No texto, cabe uma pergunta antes da ideia central, não várias.

### A4. Várias soluções para o mesmo problema, da ingênua à engenhosa

- **Ele disse.** A coluna 8 estuda quatro algoritmos para um único problema pequeno, a maior soma de um subvetor contíguo. O primeiro levaria quinze dias com *n* = 100.000, e o último resolve em cinco milissegundos ([sketch08](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sketch08.html)). Nas transparências, cada versão ocupa uma lâmina com três rótulos fixos: **Idea.** (uma frase), **Code.** e **Run Time.** A última lâmina lista as técnicas de projeto que cada versão usou, como guardar estado para não recalcular, dividir e conquistar e varrer uma vez ([s08.pdf](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/s08.pdf), lâminas 3 a 11). Na coluna 1 ele compara merge sort em disco, 40 passadas e mapa de bits, cada um com seu custo ([sec013](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec013.html)). Entre as dez dicas de projeto do epílogo está "Explore the design space of solutions." ([epilog1](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/epilog1.html)).
- **Leitura para a galeria.** Um álbum é naturalmente a coluna 8: várias faixas que resolvem o mesmo problema. O texto de cada faixa pode dizer em uma frase o que ela aproveita, ou desperdiça, em relação à vizinha. O trio Ideia / Pseudocódigo / Tempo é um bom esqueleto de encarte.

### A5. A conta de envelope antes de construir

- **Ele disse.** A coluna 7 abre com uma história. Bob Martin pergunta quanta água o Mississippi despeja por dia. Bentley estima largura, profundidade e velocidade e chega a cerca de meia milha cúbica. Martin então mostra que, pelas contas de uma proposta real, o sistema só funcionaria se cada minuto tivesse 120 segundos ([bote.html](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/bote.html)). As habilidades básicas que ele lista são estas: "Two answers are better than one." (refazer a conta por outro caminho), checagem de dimensões numa tabela, verificações rápidas, bom senso e regras de bolso, como a de Tom Duff: π segundos são um nanosséculo (seção 7.1, [sec071](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec071.html)). Ele recomenda margens de segurança contra a própria ignorância (seção 7.3) e lembra o conselho de Einstein, tão simples quanto possível e não mais (seção 7.5). A conta vem depois do projeto e antes de implementar, e também antes de qualquer otimização (transparências da col. 7, lâmina 5, [s07.pdf](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/s07.pdf)). Nos anagramas, a conta descarta as duas soluções lentas antes de qualquer código: testar todas as permutações levaria décadas, e comparar todos os pares, cerca de 15 horas (transparências da col. 2, lâmina 3, [s02.pdf](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/s02.pdf)).
- **Leitura para a galeria.** Antes de mostrar o gráfico medido, o texto pode fazer a conta de cabeça ("1.000 elementos, cerca de 10 comparações") e deixar o gráfico confirmá-la. É a regra das duas respostas: uma estimada e outra medida. Os números da conta saem das medidas do projeto (ver a seção 5).

### A6. Medir de verdade e traduzir o tempo para a escala humana

- **Ele disse.** A 2ª edição reporta tempos medidos no computador dele e pede que o leitor meça no dele: "I bet that you'll find similar ratios of run times." ([prefácio](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/preface.html)). A tabela-resumo da coluna 8 dá o tempo de cada algoritmo para *n* de 10³ a 10⁷ em unidades humanas (segundos, minutos, dias, anos, milênios), o maior problema resolvível em um segundo, um minuto, uma hora e um dia, e uma linha de razão: quando *n* é multiplicado por 10, o tempo é multiplicado por 1000, 100, pouco mais de 10 e 10 (transparências da col. 8, lâmina 9, [s08.pdf](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/s08.pdf)). A lâmina seguinte põe o algoritmo cúbico numa máquina de 1999 contra o linear num TRS-80 de 1980 e mostra o cruzamento das curvas em escala log ([s08.pdf](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/s08.pdf), lâmina 10). A solução 1.3 compara quatro programas em tempo total, tempo de CPU e megabytes ([sol01](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sol01.html)).
- **Leitura para a galeria.** Os gráficos de tempo e memória ganham uma frase de leitura em escala humana e uma razão ("dobrar *n* quadruplica o trabalho"). A tabela "se *n* ×10, tempo ×?" é um formato pronto para a ficha técnica ou para o pé do gráfico.

### A7. Escrever código correto a partir do invariante

- **Ele disse.** A coluna 4 lembra que a habilidade de codificar é só uma pequena parte de escrever programas corretos. O grosso está em definir o problema, projetar o algoritmo e escolher a estrutura de dados ([sketch04](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sketch04.html)). Na aula de busca binária, a ideia vem numa frase, "Keep track of a range known to contain t", com um exemplo de 16 números e as sondagens numeradas de 1 a 4. Ele pergunta quando saiu a primeira busca binária correta, já que a primeira foi publicada em 1946. Depois deriva o código em etapas: um esboço em prosa com o invariante `mustbe(range)`, a troca do intervalo por `l` e `u`, o código, e o código anotado com as asserções linha a linha (transparências da col. 4, lâminas 2 a 6, [s04.pdf](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/s04.pdf)). *Fonte secundária:* na 1ª edição (pp. 35–36), ele relata que, com horas de prazo, só cerca de dez por cento dos programadores profissionais dos seus cursos escreveram a busca binária sem erro ([resumo em readthedocs](https://the-art-of-programming-by-july.readthedocs.io/en/latest/ebook/en/25.0/), [notas de aula WPI](https://web.cs.wpi.edu/~heineman/html/teaching_/cs2223/d21/days/day01.html); não conferimos no livro).
- **Leitura para a galeria.** O invariante, numa frase ("o valor, se existir, está entre `lo` e `hi`"), é o que o palco deve tornar visível: a faixa que encolhe. No fluxograma e no pseudocódigo, o invariante pode aparecer como a única anotação do laço.

### A8. Andaime, contadores e otimização só onde o tempo está

- **Ele disse.** Para tirar a busca binária do pseudocódigo e levá-la a C, a coluna 5 constrói "scaffolding": um arcabouço de teste, asserções, testes automáticos e medição de tempo. "Wise programmers instead build scaffolding" ([sketch05](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sketch05.html)). No epílogo da 2ª edição, ele diz que esse andaime e a abordagem experimental servem para comparar algoritmos e escolher o melhor para cada caso ([epilog2](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/epilog2.html)). Em *Writing Efficient Programs* (1982), o método tem cinco passos: projeto e implementação limpos primeiro; medir para achar onde o tempo é gasto; depois revisar estruturas de dados e algoritmos; só então reescrever o código crítico; e por último descer a níveis mais baixos. No caso de estudo de 1983, 3 linhas (0,5% do programa) respondiam por 75% do tempo (*A Case Study in Writing Efficient Programs*, seção 5, [DTIC](https://archive.org/details/DTIC_ADA127572)). *Fontes secundárias:* no capítulo 3 de *Beautiful Code* e na palestra "Three Beautiful Quicksorts", ele põe um único contador de comparações no quicksort e enxuga o código até que poucas linhas calculem o custo médio. Os experimentos dão cerca de 1,386 *n* log *n* comparações ([O'Reilly](https://www.oreilly.com/library/view/beautiful-code/9780596510046/ch03.html), [notas da palestra](https://catonmat.net/three-beautiful-quicksorts)).
- **Leitura para a galeria.** O projeto já segue esse ritual (`medir.py` instrumentado, conferência em R e em JS). O redator deve falar de contagens ("comparações", "trocas") em vez de "rapidez" vaga, e apontar no texto o trecho do pseudocódigo onde o custo se concentra.

### A9. Um exemplo pequeno e desenhado antes do caso real

- **Ele disse.** Antes do vetor de dez milhões de bits, ele mostra um conjunto de brinquedo, {1, 2, 3, 5, 8, 13}, num vetor de 20 bits (seção 1.4, [sec014](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec014.html)). A soma máxima de subvetor começa com um vetor de dez números e a resposta marcada, 187 em x[2..6] (transparências da col. 8, lâmina 2). O heap aparece com doze inteiros, desenhado como árvore e como vetor lado a lado (transparências da col. 14, lâminas 2 e 3, [s14.pdf](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/s14.pdf)). Os anagramas passam por um pipeline de três programas com as mesmas palavras visíveis em cada etapa (transparências da col. 2, lâmina 5). Ele resume o algoritmo dos anagramas com um gesto: ordenar com um aceno horizontal da mão, depois com um aceno vertical (lâmina 4, [s02.pdf](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/s02.pdf)). Sobre a 1ª edição, ele conta que o livro trouxe cinquenta por cento mais problemas, soluções e figuras que as colunas ([epilog1](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/epilog1.html)).
- **Leitura para a galeria.** O palco usa uma entrada pequena e fixa, a mesma do texto e do fluxograma, com a resposta conhecida de antemão. Quando houver duas representações do mesmo dado (árvore e vetor), elas aparecem juntas. O "aceno de mão" sugere que cada faixa caiba num gesto: um movimento do palco que resume o algoritmo.

### A10. A animação de ordenação: uma codificação visual só, simples e honesta

- **Ele disse.** A página de animações da 2ª edição desenha cada elemento como um ponto, com o índice no eixo x e o valor no eixo y: "a random array is a uniform smear of points", e um vetor ordenado é uma trilha do canto inferior esquerdo ao superior direito. Ele recomenda começar com *n* pequeno e ir aumentando. Avisa que a animação tem poucos enfeites, e que o heapsort dela pega um atalho, deixando o primeiro elemento de fora ([sortanim.html](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sortanim.html)).
- **Leitura para a galeria.** Um palco de ordenação pode ter uma única codificação explicada uma vez (posição = índice, altura = valor), sem legenda extra. O estado final é uma forma reconhecível de relance. Quando o palco simplifica algo em relação ao pseudocódigo, a ficha técnica avisa.

### A11. Critério de decisão: simplicidade e elegância

- **Ele disse.** Ao fechar a coluna 1, ele cita Saint-Exupéry (perfeição é quando não há mais nada a tirar), diz que mais programadores deviam julgar seu trabalho por esse critério e acrescenta: "Simple programs are usually more reliable, secure, robust and efficient" (seção 1.5, [sec015](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec015.html)). As dez dicas do epílogo terminam pedindo simplicidade e elegância ([epilog1](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/epilog1.html)). Ele diz que a elegância é a moral da coluna 1 e que cortou o excesso do código que entrou no texto, deixando o andaime propositalmente bruto ([fyi.html](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/fyi.html)).
- **Leitura para a galeria.** Diante de duas versões de um parágrafo, de um passo de palco ou de um rótulo, fica a que tem menos partes e ainda diz tudo. É o mesmo mantra do projeto ("deixe o layout fazer a explicação"), com uma autoridade a mais.

### A12. Pseudocódigo curto, nomes curtos, notação própria

- **Ele disse.** O livro usa estilo de código enxuto: nomes curtos, poucas linhas em branco, quase nenhuma checagem de erro. Ele admite que isso é impróprio para projetos grandes, mas útil "to convey the key ideas of algorithms". A maioria das funções vai em pseudocódigo, que ocupa menos espaço. A notação `for i = [0, n)` usa colchete para intervalo fechado e parêntese para aberto ([prefácio](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/preface.html)). Na solução 5.1 ele compara com a matemática: quem não conhece o assunto prefere ouvir o teorema por extenso, mas quem trabalha nele escreve a² + b² = c². Ele mostra ainda que o insertion sort de *Code Complete* ocupa 41 linhas e o dele, 5 ([sol05](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sol05.html)).
- **Leitura para a galeria.** O pseudocódigo do encarte deve caber de uma vez na tela, sem tratamento de erro. A própria analogia de Bentley ressalva os nomes: para quem vê o algoritmo pela primeira vez, nomes que se leem (`inicio`, `fim`, `meio`) valem mais que `l`, `u`, `m` (ver a seção 5).

### A13. Estrutura fixa da coluna: história, princípios, problemas, leitura

- **Ele disse.** Toda coluna termina do mesmo jeito: *Principles*, *Problems* e *Further Reading*, com soluções e dicas no fim do livro (sumários das colunas no site, por exemplo [cto.html](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/cto.html), [sketch02](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sketch02.html), [bote.html](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/bote.html)). Os princípios abrem com um rótulo em negrito seguido de um parágrafo (*The Right Problem.*, *A Simple Design.*) ([sec015](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec015.html)). Ele avisa que a maior parte do aprendizado "will come out the end of your pencil" e pede discutir com colegas antes de olhar as dicas. A leitura adicional não é bibliografia acadêmica, e sim livros da estante pessoal dele ([prefácio](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/preface.html)). Os problemas misturam computação e vida comum: pombos-correio levando filme entre duas fábricas, a caneta espacial, o tempo para encher um disquete digitando (seção 1.6 e transparências da col. 7, [sec016](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec016.html), [s07.pdf](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/s07.pdf)).
- **Leitura para a galeria.** O esqueleto de faixa já se parece com o dele (palco, encarte, gráficos, ficha). O equivalente a "Principles" seria uma linha final com a técnica que a faixa ensina e que reaparece em outras faixas. Problemas e leitura adicional ficam recolhidos ou na ficha técnica.

### A14. Rituais de produção: protótipo, revisores, turma de teste, reescrita

- **Ele disse.** Para decidir fazer a 2ª edição, ele reescreveu primeiro uma única coluna, a 8: "Following my preferred style of software development, I decided to prototype a single column." Os testes acharam um bug, e a tabela de tempos mostrou que os coeficientes quase não mudaram em quinze anos, de microssegundos para nanossegundos ([why2e](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/why2e.html)). Cada coluna foi lida com cuidado por colegas como Aho, Kernighan e McIlroy, e cadetes de West Point testaram o penúltimo rascunho ([prefácio](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/preface.html)). Os revisores derrubaram o prefácio original da 2ª edição, que um deles resumiu como pouco espaço para clichês demais, e o trocaram por uma descrição direta das mudanças ([why2e](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/why2e.html)). Para virar livro, as colunas receberam dezenas de correções e centenas de pequenas melhorias ([epilog1](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/epilog1.html)). Para a 2ª edição, ele escreveu cerca de 2.500 linhas de C e C++ públicas, e chamou isso de a parte mais divertida do trabalho ([epilog2](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/epilog2.html)). Usou as mesmas transparências com alunos de ensino médio, graduação, pós e profissionais, mudando só o ritmo ([teaching.html](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/teaching.html)).
- **Leitura para a galeria.** Antes de reescrever um álbum inteiro, o agente reescreve uma faixa, mede o resultado com leitores e só depois espalha o padrão. Todo número citado no texto sai de código que roda, e a revisão por outra pessoa faz parte do método, não é um extra.

---

## 3. Os 3 métodos mais úteis para a galeria

### Método 1. Problema primeiro, pergunta antes da resposta (A1, A2, A3)

Serve para a linha fina, o início do texto e os primeiros segundos do palco.

1. Escrever a cena em uma ou duas frases: quem precisa de quê, com que limite ("uma lista telefônica ordenada; achar um nome sem ler todas as páginas").
2. Reescrever como entrada, saída e restrição, em três linhas curtas no topo do encarte.
3. Fazer uma única pergunta ao leitor ("onde está o 50?") e, no palco, segurar a entrada parada por um instante antes do primeiro passo, como a folha de papel sobre a resposta.
4. Se existir uma solução óbvia e ruim, nomeá-la em uma frase e dizer por que não serve. É o "meu erro foi responder à pergunta".
5. Só então apresentar a ideia do algoritmo numa frase ("Ideia: ...").

### Método 2. A escada de soluções com conta e medida (A4, A5, A6)

Serve para o texto dos álbuns, os gráficos de tempo e memória e a ficha técnica.

1. Para cada faixa, uma frase de ideia, o pseudocódigo e uma linha de custo. É o molde Idea / Code / Run Time.
2. Dizer em uma frase o que esta faixa aproveita em relação à anterior do álbum (guardar estado, dividir ao meio, varrer uma vez).
3. Fazer a conta de envelope no texto ("1.000 elementos: cerca de 10 comparações contra cerca de 500"), com os números tirados das medidas do projeto.
4. Deixar o gráfico medido confirmar ou desmentir a conta. São as duas respostas melhores que uma.
5. Traduzir para a escala humana com uma razão ("com *n* dez vezes maior, o trabalho fica cem vezes maior"). A tabela completa vai para a ficha técnica.

### Método 3. Exemplo pequeno, invariante visível (A7, A9, A10)

Serve para o palco, o fluxograma e o pseudocódigo.

1. Escolher uma entrada pequena e fixa (10 a 16 elementos), com a resposta conhecida, e usar a mesma no texto, no palco e no fluxograma.
2. Escrever o invariante numa frase e fazer dele a única anotação do laço no pseudocódigo.
3. No palco, tornar o invariante a coisa que se vê: a faixa que encolhe, as sondagens numeradas (1, 2, 3, 4), a região já resolvida.
4. Uma codificação visual só, explicada pelo próprio desenho (posição = índice, altura = valor), sem legenda redundante. Se houver duas vistas do mesmo dado, mostrá-las lado a lado.
5. Procurar o "gesto" da faixa, um movimento que resume o algoritmo (o aceno horizontal e depois vertical dos anagramas), e torná-lo o momento central do palco.

---

## 4. Tom e estilo de escrita

- **Primeira pessoa e confissão.** Ele escreve como "eu" e conta os próprios erros, como a resposta precipitada que abre a coluna 1 ([cto.html](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/cto.html)). Também conta medições feitas na própria máquina, conferidas com um relógio digital de pulseira quebrada (seção 7.2, [sec072](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec072.html)). Alterna com "nós" ao conduzir o leitor e "você" ao desafiá-lo. *Medição nossa* em cerca de 4.400 palavras de prosa do site (prefácio, abertura e seção 1.3 da col. 1, abertura da col. 7, sumários das colunas 2, 4, 5, 8, 14 e 15): 51 ocorrências de "I/my/me", 25 de "we/our/us", 27 de "you/your" e 15 perguntas.
- **Frases médias, parágrafos curtos.** *Medição nossa* nas mesmas páginas: 241 frases, com média de 19 palavras e mediana de 17; uma em cada dez passa de 33.
- **Problema, exemplo, conta.** A ordem típica é história, problema preciso, pergunta ao leitor, ideia, exemplo pequeno, números medidos e princípios (col. 1 completa; col. 7, [bote.html](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/bote.html)). Os números vêm com unidade e com comparação: quinze dias contra cinco milissegundos, por exemplo ([sketch08](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sketch08.html)).
- **Títulos.** São metáforas ou expressões do ofício, não nomes técnicos: "Cracking the Oyster", "Aha! Algorithms", "The Back of the Envelope", "A Small Matter of Programming", "Strings of Pearls" ([índice do site](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/)). Os subtítulos internos são descritivos ("Precise Problem Statement", "Implementation Sketch"). Nas lâminas, rótulos curtos em negrito abrem cada bloco ("Idea.", "Code.", "Run Time.") ([s08.pdf](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/s08.pdf)).
- **Humor e autoironia.** O epílogo da 1ª edição é uma entrevista consigo mesmo. Quando o entrevistador reclama de histórias demais e teoremas de menos, ele responde que "people who interview themselves shouldn't criticize writing styles" ([epilog1](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/epilog1.html)). O epílogo da 2ª edição repete a brincadeira ([epilog2](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/epilog2.html)).
- **Citações de engenheiros e casos históricos.** Ele traz Saint-Exupéry, Chuck Yeager e Einstein para os princípios ([sec015](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec015.html), [sec075](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec075.html)). Diz que espalhou de propósito "pepitas" históricas, como a tabela de imposto do Kentucky de Fred Brooks, para ilustrar verdades duradouras ([fyi.html](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/fyi.html)).
- **Exercícios.** Toda coluna fecha com problemas numerados, alguns atribuídos a quem os propôs ("[R. Weil]"), misturando programação e estimativas do dia a dia ([sec016](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec016.html)).

**Leitura para a galeria.** Do tom dele, o que serve aqui: frases de 15 a 20 palavras, um "você" que é desafiado com uma pergunta, um número sempre com unidade e comparação, e títulos com imagem quando o nome técnico já está na ficha. O "eu" confessional e as piadas longas não cabem na linha fina nem no encarte (ver a seção 5).

---

## 5. Limites

- **Outro leitor.** O livro supõe experiência de programação numa linguagem de alto nível ([prefácio](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/preface.html)). O aluno da galeria vê o algoritmo pela primeira vez. A ideia "aha!" pressupõe que o leitor já saiba o básico.
- **Outro tempo de leitura.** Ele pede uma coluna por sessão e horas batendo a cabeça nos problemas (mesmo prefácio). Uma faixa da galeria é lida em minutos, e a pausa para pensar tem de caber em segundos de palco, não em horas de lápis.
- **Nomes e código enxutos.** Ele mesmo diz que o estilo enxuto serve a quem já trabalha no problema, e que o não iniciado prefere o enunciado por extenso ([sol05](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sol05.html)). Para o aluno, o pseudocódigo deve ser curto, mas com nomes legíveis.
- **Números.** Ele reporta tempos medidos no próprio computador, conferidos com cronômetro ([prefácio](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/preface.html), [sec072](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec072.html)). Na galeria nada é digitado à mão: contagens vêm do `medir.py` e são conferidas no R e no JS. A conta de envelope entra no texto, mas os números dela também saem das medidas, não da cabeça do redator.
- **Foco em desempenho fino.** Boa parte dele trata de ajuste de código, cache e memória de máquina real (apêndices 3 e 4, [apprules](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/apprules.html), [appmodels](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/appmodels.html)). Para iniciantes, isso fica na ficha técnica, quando muito.
- **Histórias datadas e locais.** Ele admite que o livro é um pouco paroquial, ligado ao Bell Labs ([epilog1](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/epilog1.html)), e que os exemplos da 1ª edição envelheceram ([epilog2](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/epilog2.html), [why2e](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/why2e.html)). As estimativas usam milhas e pés. As cenas da galeria precisam ser atuais e próximas do aluno brasileiro.
- **Voz e humor.** O "eu" confessional e a autoentrevista funcionam em coluna assinada. Numa galeria com linha fina curta e detalhe técnico recolhido, a voz pessoal cabe no máximo numa frase do texto da faixa, nunca no palco nem nos rótulos.
- **Texto antes de imagem.** O método dele é textual, com figuras de apoio. A animação de ordenação do site é um extra, com poucos enfeites ([sortanim.html](https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sortanim.html)). Na galeria a ordem se inverte: o palco é o centro e o texto o apoia. Dele vale a disciplina (problema, exemplo pequeno, invariante, medida), não a proporção entre texto e figura.

---

## 6. Fontes

**Site da 2ª edição de *Programming Pearls*** (Bell Labs, fora do ar; lido pelo Internet Archive):

- Índice: https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/
- Prefácio: https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/preface.html
- Coluna 1, "Cracking the Oyster": https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/cto.html
  - seções 1.2 a 1.6: `sec012.html` a `sec016.html` no mesmo diretório (por exemplo, https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sec015.html)
  - soluções: https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sol01.html
- Coluna 2, "Aha! Algorithms" (sumário): https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sketch02.html
- Coluna 4, "Writing Correct Programs" (sumário): https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sketch04.html
- Coluna 5, "A Small Matter of Programming" (sumário): https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sketch05.html
  - solução 5.1: https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sol05.html
- Coluna 7, "The Back of the Envelope": https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/bote.html
  - seções 7.1 a 7.5: `sec071.html` a `sec075.html` no mesmo diretório
- Coluna 8, "Algorithm Design Techniques" (sumário): https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sketch08.html
- Coluna 14, "Heaps" (sumário): https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sketch14.html
- Coluna 15, "Strings of Pearls": https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/strings.html
- Epílogo da 1ª edição (autoentrevista e dez dicas de projeto): https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/epilog1.html
- Epílogo da 2ª edição: https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/epilog2.html
- "Why a Second Edition?" (o prefácio cortado e o protótipo da coluna 8): https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/why2e.html
- Apêndice 3, modelos de custo: https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/appmodels.html
- Apêndice 4, regras de ajuste de código (de *Writing Efficient Programs*): https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/apprules.html
- Material de ensino: https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/teaching.html
  - transparências: `s02.pdf` (anagramas), `s04.pdf` (verificação e busca binária), `s07.pdf` (envelope), `s08.pdf` (quatro algoritmos), `s14.pdf` (heaps), no mesmo diretório
- Truques do ofício: https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/tricks.html
- Ensino no primeiro ano (palestra "Truth, Beauty, and Engineering"): https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/fyi.html
- Animações de ordenação: https://web.archive.org/web/2008/http://www.cs.bell-labs.com/cm/cs/pearls/sortanim.html

**Outras fontes primárias**

- Bentley, J. L. *A Case Study in Writing Efficient Programs*. Relatório técnico, Carnegie Mellon, 25 jan. 1983. Cita os cinco passos de *Writing Efficient Programs* (1982), seção 3.3: https://archive.org/details/DTIC_ADA127572

**Fontes secundárias (usadas só onde o texto avisa)**

- Wikipedia, "Jon Bentley (computer scientist)": https://en.wikipedia.org/wiki/Jon_Bentley_(computer_scientist)
- Capítulo 3 de *Beautiful Code* (O'Reilly, 2007), "The Most Beautiful Code I Never Wrote"; só a abertura é pública: https://www.oreilly.com/library/view/beautiful-code/9780596510046/ch03.html
- Notas da palestra "Three Beautiful Quicksorts" (Google Tech Talk, 2007), por Peteris Krumins: https://catonmat.net/three-beautiful-quicksorts
- Anúncio da mesma palestra em Princeton (17 out. 2007): https://cs.princeton.edu/index.php/events/event/three-beautiful-quicksorts
- O dado dos dez por cento na busca binária (1ª ed., pp. 35–36), reproduzido em: https://the-art-of-programming-by-july.readthedocs.io/en/latest/ebook/en/25.0/ e https://web.cs.wpi.edu/~heineman/html/teaching_/cs2223/d21/days/day01.html
- J. Bloch, "Extra, Extra – Read All About It: Nearly All Binary Searches and Mergesorts are Broken" (Google Research, 2006), sobre o bug de estouro na busca da col. 5: https://research.google/blog/extra-extra-read-all-about-it-nearly-all-binary-searches-and-mergesorts-are-broken/
- Lista das colunas na CACM, com DOIs: https://shreevatsa.net/post/programming-pearls/

**Conferido e descartado**

- *Coders at Work* (Peter Seibel, 2009) não tem entrevista com Bentley. Os 15 entrevistados são Allen, Armstrong, Bloch, Cosell, Crockford, Deutsch, Eich, Fitzpatrick, Ingalls, Peyton Jones, Knuth, Norvig, Steele, Thompson e Zawinski ([Wikipedia](https://en.wikipedia.org/wiki/Coders_at_Work)).

**Indicadas, não lidas** (sem acesso ao texto; nenhum achado foi tirado delas)

- *More Programming Pearls: Confessions of a Coder* (1988). Segundo catálogos, a coluna 10 é "Document Design" (tabelas, princípios de design, figuras, texto) e a parte III se chama "I/O Fit for Humans". É a leitura mais promissora para o layout da galeria.
- Colunas da CACM "Graphic Output" (jun. 1984, https://doi.org/10.1145/358080.364565) e "Document Design" (set. 1986, https://doi.org/10.1145/6592.315696).
- *Writing Efficient Programs* (Prentice-Hall, 1982); só conhecido aqui pelo apêndice 4 e pelo relatório de 1983.
