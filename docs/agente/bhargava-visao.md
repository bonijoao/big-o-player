# A visão e o método de *Entendendo Algoritmos* (Bhargava)

Segunda base do redator-professor, depois de Bret Victor. Daqui entra a visão do que é um algoritmo e do que ensinar primeiro. O jeito de escrever do livro fica de fora (ver `voz.md`).

Sobre as páginas: o PDF é a edição digital da Novatec e não tem número de página impresso. Toda página citada aqui é a do PDF (1 a 348), a mesma que um leitor de PDF mostra. Os achados são paráfrases. O que é interpretação nossa vem marcado como **leitura para a galeria** ou fica na seção 5.

---

## 1. O que é um algoritmo e o que vem primeiro

### A definição

- O livro define algoritmo como um conjunto de instruções que cumprem uma tarefa: "Um algoritmo é um conjunto de instruções que realizam uma tarefa." (p. 20). Na mesma página, o autor admite que qualquer trecho de código caberia na definição e diz que escolheu os que são rápidos, os que resolvem problemas interessantes ou os que fazem as duas coisas.
- A primeira definição concreta é a da busca binária, dada por entrada e saída: recebe uma lista ordenada e devolve a posição do item ou nada, se ele não estiver lá (p. 23). O motivo de a lista precisar estar ordenada fica para depois, e o texto avisa isso.
- O nome vem depois do gesto. O leitor joga o jogo de adivinhar um número de 1 a 100 e só então o texto diz que aquilo é a busca binária e que ele acabou de aprender um algoritmo (p. 24-26). O mesmo acontece na busca em largura (p. 161) e nos k-vizinhos (p. 286).
- O livro alarga a definição aos poucos. A técnica de dividir para conquistar é apresentada como um modo de pensar o problema, e não como um algoritmo pronto para aplicar (p. 97). Um algoritmo que só resolve um tipo de problema vale pouco, por isso o capítulo 4 ensina técnicas (p. 90). Na programação dinâmica, o autor diz que às vezes o algoritmo não é uma receita exata, mas uma estrutura sobre a qual se monta a ideia (p. 275). Os algoritmos de aproximação são julgados por dois critérios: rapidez e distância da solução ótima (p. 230).
- Quem lê precisa de álgebra básica. O teste do livro é saber calcular uma função simples num ponto (p. 21).

### A ordem dos capítulos e o porquê

O roteiro está em "Sobre este livro" (p. 15-16):

1. **Busca binária e notação Big O** (cap. 1). É o primeiro algoritmo prático, e o Big O passa a medir todos os outros no resto do livro (p. 15).
2. **Arrays e listas encadeadas, com a ordenação por seleção** (cap. 2). São as estruturas usadas no livro inteiro e a base das tabelas hash (p. 15). A ordenação por seleção serve de trampolim para o quicksort, que fica mais fácil para quem já conhece algum algoritmo de ordenação (p. 46).
3. **Recursão** (cap. 3). Aparece em muitos algoritmos, a começar pelo quicksort (p. 15).
4. Depois vêm algoritmos de aplicação mais ampla, agrupados assim (p. 16): técnicas de resolver problemas (dividir para conquistar no cap. 4, algoritmos gulosos no cap. 8, programação dinâmica no cap. 9), tabelas hash (cap. 5), grafos (busca em largura no cap. 6, Dijkstra no cap. 7), k-vizinhos mais próximos (cap. 10) e dez temas para seguir estudando (cap. 11).

As justificativas que o autor dá:

- Big O e recursão são os temas mais difíceis para quem começa, por isso ele desacelera e dá mais tempo a eles (p. 16).
- A ordem foi pensada e os capítulos se apoiam uns nos outros. Quem quiser pode pular, mas a recomendação é ler na sequência (p. 17).
- A programação dinâmica fica tarde de propósito, por ser um tema complicado (p. 274).
- O foco é desempenho porque o leitor quase nunca vai escrever esses algoritmos do zero, já que a linguagem traz implementações prontas. O que ele precisa é saber comparar e escolher: merge sort ou quicksort, array ou lista (p. 20).
- A seleção é curada. O livro não quer cobrir tudo (para isso existem a Wikipédia e a Khan Academy) e fica com algoritmos úteis na prática, que servem de base para temas mais avançados (p. 15).
- O autor ataca um problema novo com duas perguntas: dá para usar tabela hash? Dá para modelar como grafo? (p. 16).

---

## 2. Recursos didáticos que se repetem

### Analogias do cotidiano

Todo conceito novo chega por uma cena comum antes do código ou da notação. Agenda telefônica e dicionário para a busca (p. 22), gavetas de chapelaria para a memória (p. 46-48), lugares no cinema para o array (p. 50 e 52), caça ao tesouro para a lista encadeada (p. 52), bloco de notas adesivas para a pilha (p. 73-75), fila de ônibus para a fila (p. 164-165), uma amiga que sabe todos os preços de cor para a tabela hash (p. 120-121). O autor explica a escolha: a gente aprende melhor quando liga o novo a algo que já conhece (p. 15). A analogia volta mais tarde para amarrar conceitos. A lista de afazeres do capítulo 2 reaparece como pilha no capítulo 3 (p. 74), e o caixeiro-viajante do capítulo 1 volta no capítulo 8 (p. 236).

### Ilustrações

- **Um desenho por mudança de estado.** O livro desenha o mesmo quadro várias vezes e muda uma coisa por vez. O jogo de adivinhar o número tem cerca de oito quadros, um por palpite, com os números eliminados riscados (p. 24-26). A pilha de chamada de um programa de três funções ganha seis desenhos, um a cada caixa que entra ou sai (p. 76-81). A busca em largura repete o mesmo grafo e acende os vértices alcançados com uma, duas e três etapas (p. 154-155). No Dijkstra, cada passo traz o grafo e a tabela de custos lado a lado (p. 185-188). A mochila da programação dinâmica passa de vinte figuras em nove páginas, praticamente uma tabela por célula preenchida (p. 251-259).
- **Destaque no que mudou.** Riscos de brilho em volta do elemento novo, traço grosso no caminho escolhido, valor antigo riscado com o novo ao lado (p. 154-155, 186-188, 256).
- **Rótulo dentro do desenho.** As anotações em letra de forma ficam no próprio quadro, com uma seta para a parte que importa: qual chamada está ativa (p. 78), quais números já foram descartados (p. 25), onde está a resposta na tabela (p. 259).
- **Texto e desenho dividem a frase.** O texto narra a ação ou faz a pergunta, e a figura guarda o estado. Muitas frases acabam em dois-pontos e o desenho completa a frase (p. 98, 104, 123).
- **Tabela de rastreio.** Na pilha de chamada do fatorial, uma página inteira tem duas colunas, a linha de código à esquerda e o estado da pilha à direita, com notas na margem sobre qual chamada está no topo e por que cada uma tem o seu próprio valor de x (p. 83-84).
- **Fluxogramas à mão.** Caixas curtas em linguagem comum para a busca da chave com laço e com recursão (p. 69-70), para a contagem regressiva com e sem caso-base (p. 72) e para a soma recursiva (p. 98).
- **Desenhos de ambientação.** Várias seções abrem com um personagem ou objeto que não carrega dado nenhum (p. 22, 23, 31, 33, 73, 119, 153, 158).

### Exercícios e perguntas

- São numerados por capítulo (1.1, 1.2...) e aparecem logo depois do conceito que treinam, no meio do capítulo (p. 30, 40, 55, 58-60). As respostas estão no fim do livro (a partir da p. 325). O prefácio diz que levam de um a dois minutos, às vezes de cinco a dez, e servem para o leitor checar se o raciocínio está no caminho antes de seguir (p. 17).
- Além dos exercícios, o texto para e pede ao leitor que pense ou calcule antes de continuar (p. 34, 38, 68, 196, 264) e faz perguntas rápidas com a resposta logo abaixo (p. 163, 168).
- A resposta pode ensinar algo novo. A do 1.6 mostra por que dividir n por 26 não muda o Big O e manda o leitor para a discussão de constantes do capítulo 4 (p. 326).

### "Recapitulando"

Uma lista curta de tópicos fecha cada capítulo e repete as ideias centrais em uma frase cada (p. 43-44, 65, 87-88, 117, 149-150, 180-181, 218, 246, 282, 302-303). O capítulo 5 também tem uma recapitulação no meio, antes de passar para colisões (p. 139-140).

### Notação Big O

- **Entra contando palpites.** Com 100 itens, a busca simples pode precisar de 100 tentativas e a binária de no máximo 7. Com 4 bilhões, 4 bilhões contra 32. Uma tabela desenhada resume isso e dá nome ao tempo linear e ao logarítmico (p. 31-32).
- **Corrige uma extrapolação errada.** Um personagem mede as duas buscas com 100 elementos, conclui que a binária é cerca de 15 vezes mais rápida e erra feio ao extrapolar para 1 bilhão, porque as duas crescem a taxas diferentes. Uma tabela com 100, 10.000 e 1 bilhão de elementos mostra o tamanho do erro (p. 33-35).
- **Separa operações de segundos.** Big O não dá tempo em segundos. Compara o número de operações e diz quão rápido esse número cresce (p. 35). Um desenho mostra a anatomia da notação (p. 36).
- **Usa um experimento de papel e lápis.** Para fazer uma grade de 16 quadrados, desenhar um por vez leva 16 operações, e dobrar a folha leva 4 dobras. Daí saem O(n) e O(log n) (p. 36-38).
- **Fixa o pior caso** como garantia (p. 38-39) e avisa que o caso médio vem no capítulo 4.
- **Traz cinco tempos comuns** com um exemplo cada, do log n ao n!, numa tabela de tempos para 16, 256 e 1.024 elementos, supondo dez operações por segundo e com miniaturas das curvas (p. 39-40). Logo depois admite que a tabela é uma simplificação (p. 40).
- **Explica o logaritmo à parte**, num quadro cinza, como o inverso da exponencial, com uma tabelinha de potências de 10 e de 2 (p. 27-28).
- **Volta no capítulo 4** com a constante escondida (c vezes n). Mostra que ela some quando as ordens são diferentes, mas pesa entre quicksort e merge sort (p. 111-112). Desenha os níveis da pilha do quicksort e tira dali O(n) por nível vezes O(log n) níveis no melhor caso, e O(n) níveis no pior (p. 113-116).
- **Chega ao tempo constante** no capítulo 5 com gráficos de linha: a reta subindo, a curva achatada e a linha plana (p. 143-145).
- **Faz a conta com coisas.** O(n²) da ordenação por seleção sai de uma operação O(n) repetida n vezes, com um quadro sobre a constante 1/2 (p. 63-64). O(V+A) da busca em largura sai de contar arestas e pessoas (p. 177). 2^n sai de contar subconjuntos (p. 229, 249). n! sai de contar rotas para 2, 3 e 4 cidades até aparecer o padrão (p. 237-241).

### Recursão e pilha de chamada

- **Começa pelo problema.** Uma mala trancada no porão da avó, com a chave dentro de caixas que têm outras caixas dentro (p. 67-68). Aparecem duas soluções, uma com um monte de caixas a examinar e outra que manda olhar dentro da caixa e repetir se achar outra caixa, cada uma com o seu fluxograma (p. 69-70).
- **Diz para que serve.** A recursão não deixa o programa mais rápido e às vezes o laço é melhor. Ela deixa a solução mais clara (p. 70).
- **Explica o caso-base pelo erro.** Uma contagem regressiva sem condição de parada roda para sempre. Depois disso vêm os dois casos, cada um com seu nome (p. 71-72).
- **Apresenta a pilha antes da pilha de chamada.** Um bloco de notas adesivas em que só se mexe no topo, com as duas operações desenhadas (p. 73-75).
- **Desenha a pilha de chamada** com um programa de três funções, uma caixa de memória por chamada, que é empilhada e depois sai (p. 76-81). A ideia principal da seção é que a função que chamou outra fica pausada, pela metade, com as variáveis guardadas (p. 79).
- **Rastreia o fatorial de 3** na tabela de duas colunas (código e pilha) descrita acima (p. 83-84).
- **Fecha o círculo.** O monte de caixas da primeira solução é justamente o que a pilha guarda na versão recursiva (p. 84-86). O custo é memória. As saídas são reescrever com laço ou usar recursão de cauda, que fica fora do livro (p. 86-87).
- **Pede o lápis.** Pelo menos uma vez, o leitor deve seguir uma função recursiva à mão, com papel e caneta (p. 67).
- **Continua no capítulo 4.** A soma recursiva é desenhada descendo até o caso-base e subindo com os resultados, com a nota de que a recursão lembra os estados anteriores (p. 98-99). As provas por indução aparecem como subir uma escada degrau por degrau (p. 108).

### Estruturas de dados

- **Memória** é um armário de gavetas, cada uma com endereço (p. 46-48).
- **Array e lista encadeada** aparecem pela mesma lista de afazeres. O array guarda tudo junto e pode precisar mudar de lugar inteiro quando cresce. A lista espalha os itens e cada um guarda o endereço do próximo (p. 49-52). O contraste final é uma tabela de 2 por 2 com leitura e inserção (p. 55), seguida de inserção no meio, remoção e da diferença entre acesso aleatório e sequencial (p. 55-58). O exercício 2.5 propõe um array de listas encadeadas, uma por letra, e com isso antecipa a tabela hash (p. 59-60).
- **Pilha** (p. 74-75) e **fila** (p. 164-165) entram quando um algoritmo precisa delas: a pilha para a recursão, a fila para a busca em largura achar o caminho mais curto.
- **Tabela hash.** O texto parte da necessidade (alguém que diz o preço sem procurar), passa pela função hash desenhada como um funil que transforma palavra em número e preenche um array de cinco posições item por item (p. 120-125). Depois mostra os usos: agenda e DNS, eleitor que já votou, cache (p. 129-139). Por fim vêm as colisões, com o exemplo de um mercado que só vende produtos com A (p. 140-143), o desempenho comparado com array e lista numa tabela (p. 145) e o fator de carga com a regra de redimensionar acima de 0,7 (p. 145-147). Ao entrar nos detalhes de implementação, o autor confessa que tinha simplificado antes (p. 140) e marca a seção como leitura opcional (p. 145).
- **Grafo** é implementado com tabela hash (p. 166-168) e, no Dijkstra, com tabela hash dentro de tabela hash (p. 206-207). **Conjunto** aparece com frutas e legumes (p. 232-234). A árvore binária de busca fica para o capítulo 11 (p. 305-308).

---

## 3. O que o prefácio e "Sobre este livro" dizem sobre ensinar

- O autor começou programando por hobby e achava os livros de algoritmos densos demais, até ter um bom professor (p. 12). Aprendeu a explicar escrevendo posts ilustrados num blog e diz: "Eu aprendo melhor com imagens" (p. 12).
- Um colega leu um desses posts e disse que continuava sem entender. Foi quando o autor percebeu que pulava as partes difíceis (p. 13). A editora, diz ele, o ensinou a ensinar (p. 13). Nos agradecimentos ele conta que testava várias formas de explicar o mesmo assunto com amigos (p. 14).
- **Método declarado** (p. 15): leitura fácil, sem grandes saltos de raciocínio; cada conceito é explicado na hora ou com o aviso de quando será; os conceitos centrais são reforçados com exercícios e mais de uma explicação; o livro ensina com exemplos em vez de símbolos, para o leitor visualizar; ligar o novo ao conhecido ajuda a aprender; o livro é cheio de imagens.
- **Uso recomendado** (p. 17): ler na ordem, rodar o código de todos os exemplos e fazer os exercícios. Aprender é mais fácil quando é divertido (p. 17-18).
- **Para quem é** (p. 17): quem quer o básico de programação e algoritmos. A lista inclui programadores por hobby, estudantes de cursos de programação, formados em computação que querem revisar e profissionais de exatas interessados em programar. Os exemplos são em Python 2.7, e quem não conhece nenhuma linguagem deve começar por Python (p. 17, 21).

---

## 4. Estrutura de um capítulo típico

O autor descreve o molde no começo do capítulo 1: descrever o algoritmo, dar um exemplo, falar do tempo de execução em Big O e, por fim, mostrar que outros problemas o mesmo algoritmo resolve (p. 20). Na prática, o capítulo segue esta sequência:

1. **Abertura** com o número do capítulo e uma lista "Neste capítulo" do que o leitor vai aprender (p. 19, 45, 66, 89, 118, 151, 182, 219, 247, 283, 304). Às vezes há um quadro "O que você precisa saber" com os pré-requisitos (p. 21, 46).
2. **Cena do cotidiano** que cria o problema, muitas vezes com um desenho de ambientação (p. 22, 46, 67, 91, 119, 153, 220, 284).
3. **Solução ingênua primeiro**, quando existe uma. Chutar um número por vez (p. 24-25), uma pesquisa simples num caderno de preços (p. 119), testar todos os subconjuntos (p. 228-229, 249).
4. **Passo a passo desenhado**, um quadro por estado, com perguntas ao leitor no caminho.
5. **Nome do conceito** depois que o leitor já fez a coisa (p. 26, 161, 286).
6. **Código em Python** com notas numeradas linha a linha (p. 29-30, 64, 109, 176-177, 210-211), às vezes depois de um pseudocódigo (p. 67, 70).
7. **Tempo de execução** em Big O.
8. **Exercícios** curtos, intercalados ao longo do capítulo.
9. **Usos e variações**: outros problemas resolvidos pelo mesmo algoritmo (p. 129-139, 152, 281-282) ou perguntas frequentes (p. 260-270).
10. **Quadros laterais** para digressões que não podem atrapalhar o fio: logaritmos (p. 27), algoritmo de Euclides (p. 94), programação funcional (p. 100), provas por indução (p. 108), similaridade de cosseno (p. 296-297). Notas tracejadas para avisos (p. 28, 39, 145).
11. **"Recapitulando"** em tópicos.

Um hábito atravessa todos os capítulos: o autor diz quando simplificou ou quando deixou algo de fora. A tabela de tempos é uma simplificação (p. 40). A prova de Euclides fica de fora e o leitor tem de confiar nele (p. 94). Recursão de cauda, Bellman-Ford, similaridade de cosseno e Simplex estão fora do escopo (p. 87, 205, 297, 323).

---

## 5. O que serve para a galeria e o que não serve

**Toda esta seção é interpretação nossa.** Ela pensa num site com palco animado, encarte com pseudocódigo, fluxograma e gráficos medidos.

### Serve

- **Os storyboards já estão desenhados.** As sequências de quadros do livro, com um estado por quadro e só o que mudou em destaque, são roteiros prontos para o palco: o jogo do número (p. 24-26), a busca em largura acendendo por camadas (p. 154-155), a tabela do Dijkstra (p. 186-188), a pilha de chamada (p. 76-81), a tabela da mochila (p. 251-259). O palco faz o que o papel não consegue: anda e volta no tempo sem repetir o desenho inteiro.
- **Código ao lado do estado.** A tabela de duas colunas do fatorial (p. 83) é o modelo do encarte sincronizado com o palco: a linha do pseudocódigo acende enquanto a pilha muda. É o "mostrar o estado" do Victor em versão impressa.
- **A tabela como palco.** No Dijkstra e na programação dinâmica, a figura principal é uma tabela que vai sendo preenchida, com o valor velho riscado. Para essas faixas, a tabela pode ser o próprio palco, ou uma segunda vista ao lado do grafo.
- **Fluxograma de poucas caixas, em linguagem comum.** Os fluxogramas do livro têm de três a seis caixas escritas em português do dia a dia (p. 69-70, 72, 98). É a medida certa para o fluxograma da galeria. O par laço contra recursão para o mesmo problema (p. 69-70) também funciona como comparação no palco.
- **Fazer primeiro, nomear depois.** O aluno joga, vê o resultado, e só então aparece o nome. Isso combina com a trilha que destrava por palpite (`decisoes.md`) e com as pausas do livro para o leitor pensar (p. 34, 38, 68).
- **A extrapolação errada como gancho para o gráfico medido.** A história do personagem que mede com 100 elementos e erra com 1 bilhão (p. 33-35) é o melhor convite para os gráficos da galeria. O aluno chuta a partir de um ponto pequeno e a curva medida mostra o tamanho do erro. O livro usa estimativas a dez operações por segundo (p. 40, 110). A galeria tem números medidos e conferidos, o que é uma vantagem e não precisa de desculpa.
- **A conta pequena antes da notação.** 100 contra 7, 4 bilhões contra 32 (p. 31-32), a grade de 16 quadrados com 4 dobras (p. 36-38). Cabe no encarte, antes do O(n), com números tirados das medidas do projeto.
- **Entrada e saída na definição.** A busca binária é definida pelo que recebe e devolve, com a pré-condição da lista ordenada (p. 23, 28). Isso reforça o bloco de entrada e saída do encarte.
- **A ordem.** Busca binária com Big O, depois array e lista, recursão antes do quicksort, e dividir para conquistar, programação dinâmica e guloso como famílias (p. 15-16). Serve de guia para a ordem da trilha. As duas perguntas de ataque, se dá para usar hash e se dá para modelar como grafo (p. 16), podem organizar álbuns.
- **Avisar a simplificação.** O livro diz quando simplificou (p. 40, 140). Na galeria, esse aviso vai para a ficha técnica ou para uma nota recolhida, sem disputar espaço com o palco.
- **Pergunta curta com resposta tampada.** Os exercícios de um minuto com resposta em outro lugar (p. 17, 325) são o encarte tampado da trilha. Respostas que ensinam algo novo, como a do 1.6 (p. 326), valem mais que as de conferir número.
- **A estrutura chega quando o algoritmo precisa dela.** Pilha com recursão, fila com busca em largura, hash para guardar grafo. Na galeria, a peça de estrutura de dados pode vir encostada na faixa que a usa.

### Não serve

- **Desenho de ambientação sem dado** (p. 22, 23, 31, 33, 73, 119, 153, 158). Vai contra o mantra da interface e contra o papel branco.
- **O traço do livro**, com letra à mão, riscos de brilho e personagens bichos. A galeria tem a sua identidade (IBM Plex Mono, verde só no resultado). Do livro, fica a lógica de destacar só o que mudou.
- **Código em Python 2.7** (p. 17, 29-30). O encarte usa pseudocódigo.
- **O ladrão da mochila** (p. 224, 248). O `voz.md` proíbe crime como exemplo. O mesmo problema funciona com mala de viagem, bagagem de mão ou mochila de trilha.
- **Exemplos de fora.** Estados americanos, San Francisco, Facebook, Netflix (p. 22, 153, 227, 286). Para o aluno daqui, valem trocas como as do `voz.md`. A própria agenda telefônica o autor já chama de antiquada (p. 22).
- **Números sem conferência.** A edição tem erros que a galeria não pode herdar: na p. 34, a busca simples com 100 elementos aparece como 10 ms no texto e 100 ms na figura; na p. 28, a potência que dá 1.024 sai com o expoente 4; na p. 42, sete cidades dão 5.050 rotas, e na p. 241 o número certo, 5.040; a p. 43 manda para o capítulo 10 a aproximação que está no 8; a p. 16 põe os k-vizinhos no capítulo 7, e eles estão no 10. Reforça a regra do projeto de que nenhum número é digitado à mão.
- **Dijkstra só em grafos acíclicos** (p. 192). Nossa observação: a restrição real do algoritmo é não ter peso negativo, como o próprio livro mostra nas p. 201-205. Ciclo com peso positivo não atrapalha. A galeria não deve repetir a frase.
- **Big O só como pior caso** (p. 38-39). É uma simplificação razoável para a primeira aula. Como a galeria mede, pode mostrar melhor caso, caso médio e pior caso separados, como o livro faz só com o quicksort (p. 113-116).
- **Recapitulação em lista e perguntas frequentes longas** (p. 260-270). No livro funcionam. Na galeria, o resumo já é o `objetivo` na linha fina, e repetir em tópicos vira texto que o layout deveria dispensar.
- **O jeito de escrever** (exclamações, interjeições, "você" a cada frase). A voz é a do `voz.md`.

---

## 6. Exemplos e analogias marcantes, por capítulo

Todos em paráfrase.

- **Cap. 1, Introdução a algoritmos.** Procurar um nome na agenda abrindo no meio, e não da primeira página (p. 22). Adivinhar um número de 1 a 100 com o outro dizendo se é maior ou menor: chutando um por um pode levar até 99 tentativas, cortando ao meio leva no máximo 7 (p. 24-26). Um dicionário de 240 mil palavras cai em 18 etapas (p. 26-27). O programador do pouso de um foguete na Lua que extrapola mal o tempo das buscas (p. 33-35). A grade de 16 quadrados feita dobrando papel (p. 36-38). O caixeiro-viajante, cujo número de rotas explode com o fatorial (p. 41-43).
- **Cap. 2, Ordenação por seleção.** Guardar as coisas em gavetas de chapelaria como modelo de memória (p. 46-48). Amigos no cinema que precisam trocar de fileira quando chega mais um (array) e a opção de se separar e assistir mesmo assim (lista encadeada) (p. 50-52). A caça ao tesouro em que cada pista dá o endereço da próxima (p. 52). Os sites de top 10 que obrigam a clicar em próximo nove vezes (p. 53). Ordenar artistas pelo número de vezes que foram tocados, tirando sempre o mais tocado (p. 60-63).
- **Cap. 3, Recursão.** A chave dentro de caixas dentro de caixas, no porão da avó (p. 67-70). A contagem regressiva que não para (p. 71-72). O bloco de notas adesivas do churrasco, onde só se mexe no topo (p. 73-75). A função de cumprimentar que chama outras duas e fica pausada esperando (p. 75-81).
- **Cap. 4, Quicksort.** Dividir uma fazenda de 1.680 por 640 m no maior quadrado possível, recortando sempre o maior quadrado e repetindo no resto até chegar a 80 por 80 m (p. 91-97). Somar uma lista como o primeiro mais a soma do resto (p. 97-99). Subir uma escada degrau por degrau para explicar a indução (p. 108). Duas funções que imprimem a mesma lista, uma esperando um segundo por item, para mostrar a constante (p. 111). Quicksort com lista já ordenada e pivô no primeiro elemento contra pivô no meio (p. 113-114).
- **Cap. 5, Tabelas hash.** A amiga que sabe o preço de tudo de cabeça e poupa o caixa de procurar no caderno (p. 120-121). A função hash que vira palavra em número e diz em que casa guardar o preço (p. 122-125). Conferir na votação se a pessoa já votou (p. 133-135). Decorar a distância até a Lua de tanto a sobrinha perguntar, como modelo de cache (p. 137-138). O mercado que só vende coisas com A e entope uma casa só da tabela (p. 142).
- **Cap. 6, Busca em largura.** Ir de ônibus de um ponto da cidade a outro com o mínimo de baldeações, testando com uma, duas e três etapas (p. 153-156). Quem deve dinheiro a quem numa mesa de pôquer, como primeiro grafo (p. 157). Procurar um vendedor de manga entre amigos, depois amigos de amigos, numa lista que cresce (p. 158-164). A rotina da manhã como ordenação topológica e a árvore genealógica como árvore (p. 177-180).
- **Cap. 7, Dijkstra.** Trajetos com minutos em cada trecho: o caminho com menos trechos não é o mais rápido (p. 183-188). Trocar um livro de partituras por um piano numa cadeia de trocas, gastando o mínimo (p. 193-200). A troca que devolve dinheiro, isto é, a aresta negativa que engana o algoritmo (p. 201-205).
- **Cap. 8, Algoritmos gulosos.** Encaixar o máximo de aulas numa sala pegando sempre a que termina mais cedo (p. 220-223). A mochila em que pegar o item mais caro primeiro não dá o melhor resultado (p. 224-226). Escolher rádios para cobrir todos os estados com o mínimo de estações (p. 227-235). Montar um time que cubra todas as habilidades, como problema de cobertura disfarçado (p. 243-244).
- **Cap. 9, Programação dinâmica.** A mochila resolvida numa tabela com uma linha por item e uma coluna por capacidade, célula por célula (p. 251-259). Um roteiro de dois dias em Londres como a mesma mochila com tempo no lugar de peso (p. 267). Paris, onde a viagem de ida se paga uma vez só e quebra a independência dos subproblemas (p. 268-269). Adivinhar que palavra a pessoa quis digitar comparando a maior substring e a maior subsequência comum (p. 271-281). A piada do algoritmo de Feynman (anotar o problema, pensar bastante e anotar a resposta) para dizer que não há fórmula pronta (p. 275).
- **Cap. 10, K-vizinhos mais próximos.** Laranja ou toranja pela cor e pelo tamanho, olhando os três vizinhos mais próximos (p. 284-286). Recomendar filmes pelos usuários de gosto parecido, cada um virando uma lista de notas (p. 286-292). A padaria que prevê quantos pães fazer pela média dos dias mais parecidos com hoje (p. 294-296). Pedir notas de fotos de gatos para recomendar filmes, como exemplo de característica ruim (p. 297).
- **Cap. 11, Próximos passos.** O smoothie desfeito em ingredientes para explicar a transformada de Fourier, analogia que o autor credita ao site Better Explained (p. 310). Dobrar todos os itens de uma lista e somar todos para apresentar map e reduce (p. 313-314). O filtro de Bloom que pode dar falso positivo, mas nunca falso negativo (p. 316). Camisetas e bolsas com tecido e botões limitados, para a programação linear (p. 323).

---

## Fonte

BHARGAVA, Aditya Y. *Entendendo algoritmos: um guia ilustrado para programadores e outros curiosos*. Tradução de BrodTec. Revisão técnica de Nilo Menezes. São Paulo: Novatec, 2017. 1ª edição, abril de 2017. ISBN 978-85-7522-662-9.

Edição original em inglês: Manning Publications, 2015 (*Grokking Algorithms*, conforme a página da edição original indicada na p. 18). Créditos nas p. 3-5 do PDF. Código dos exemplos: github.com/egonschiele/grokking_algorithms (p. 17).
