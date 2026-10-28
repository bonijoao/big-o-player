# O método de Bret Victor para explicar ideias técnicas

Pesquisa para o agente redator-professor da galeria. Cada achado separa **o que ele disse** (paráfrase, com no máximo uma citação curta e a fonte) da **leitura para a galeria** (interpretação nossa, não dele). Links completos na seção 6.

---

## 1. Quem é

Bret Victor é designer de interfaces e pesquisador. Trabalhou na Apple de agosto de 2007 a novembro de 2010, prototipando conceitos de interface para hardware experimental ([Apple](https://worrydream.com/Apple/)). A bio promocional do site diz que ele desenhou os primeiros conceitos de interface do iPad e que hoje lidera a equipe que fundou a Dynamicland e criou o Realtalk ([worrydream.com](https://worrydream.com/)). Entre 2011 e 2013 publicou os ensaios e palestras usados aqui. Esse material foi agrupado nos projetos Kill Math e Explorable Explanations ([Kill Math](https://worrydream.com/KillMath/), [Explorable Explanations](https://worrydream.com/ExplorableExplanations/)).

---

## 2. Achados

### A1. Mostrar os dados, não só a regra

- **Ele disse.** O aluno precisa ver o que o programa faz. Ler código obriga a "brincar de computador" e imaginar os valores das variáveis. A regra número um de um ambiente de aprendizagem é mostrar os dados, acima de programação ao vivo, aulas narradas ou medalhas. "People understand what they can see." (*Learnable Programming*, introdução e "See the state", [link](https://worrydream.com/LearnableProgramming/)). Na palestra, ele escreve a busca binária com um vetor de exemplo ao lado e mostra `low`, `high` e `mid` a cada iteração. Dá para ver o laço infinito quando a chave não existe: `low` passa de `high` (*Inventing on Principle*, demo da busca binária, [transcrição](https://jamesclear.com/great-speeches/inventing-on-principle-by-bret-victor)).
- **Leitura para a galeria.** Antes de explicar a regra no texto, o encarte e o palco mostram os valores concretos das variáveis a cada passo. O aluno não deve ter de simular nada de cabeça.

### A2. Mostrar comparações

- **Ele disse.** Mostrar o dado não basta. Um ponto isolado diz pouco, e entendemos um dado comparando-o com outros. Em vez de pontos na linha do tempo, ele desenha o valor calculado em cada passo (*Learnable Programming*, "Show comparisons", [link](https://worrydream.com/LearnableProgramming/)). No simulador de circuitos, arrastar um resistor deixa a sombra da forma de onda anterior para comparar. Ele resume isso como as duas regras de ouro do design de informação: mostrar os dados e mostrar comparações (*Inventing on Principle*, demo do circuito, [transcrição](https://jamesclear.com/great-speeches/inventing-on-principle-by-bret-victor)). No horário de trem, a mesma tabela redesenhada como gráfico de distância por tempo responde de relance onde os trens se cruzam (*Magic Ink*, "Information software design is graphic design", [link](https://worrydream.com/MagicInk/)).
- **Leitura para a galeria.** Os gráficos de tempo e de memória valem pela comparação: outra entrada, outro algoritmo do álbum, o pior caso contra o caso médio. O texto aponta para a comparação em vez de repetir números.

### A3. Nenhum estado escondido

- **Ele disse.** Uma linha que muda estado invisível, como a cor de preenchimento corrente no Processing, não produz efeito visível. Ele chama isso de inaceitável num ambiente interativo. Há duas saídas: eliminar o estado ou mostrá-lo como objeto na tela. "All state must be eliminated or shown." (*Learnable Programming*, "Eliminate hidden state", [link](https://worrydream.com/LearnableProgramming/)).
- **Leitura para a galeria.** Toda variável do pseudocódigo que muda durante a execução (índices, pilha, fronteira, contador) aparece no palco. Uma linha do pseudocódigo que não deixa marca no palco é um aviso de estado escondido.

### A4. O leitor controla o tempo

- **Ele disse.** O tempo real limita. Seria como um editor de filme que não pudesse pausar nem voltar. Quem estuda um sistema precisa ir e voltar no próprio ritmo, parar nos eventos interessantes e saltar entre eles para comparar. "We must not be slaves to real time." (*Up and Down the Ladder of Abstraction*, "Controlling Time", [link](https://worrydream.com/LadderOfAbstraction/)). Em *Learnable Programming*, um controle deslizante percorre a execução do laço para a frente e para trás (*Learnable Programming*, "Make flow tangible", [link](https://worrydream.com/LearnableProgramming/)).
- **Leitura para a galeria.** O palco precisa de avançar, voltar e parar passo a passo, além do play. Rodar sozinho em velocidade fixa é o "tempo real" que ele critica.

### A5. Tornar visível o fluxo inteiro, não só o instante

- **Ele disse.** Ver um passo de cada vez é olhar por um buraco de agulha, na imagem dele. Ele propõe uma vista de cima: cada linha executada deixa um ponto numa linha do tempo, e o aluno vê a "forma" do algoritmo de uma vez. Nas animações, todos os quadros aparecem sobrepostos em tom claro para dar contexto ao quadro ativo (*Learnable Programming*, "Make flow visible" e "Make time visible", [link](https://worrydream.com/LearnableProgramming/)).
- **Leitura para a galeria.** Além do quadro atual, o palco pode guardar o rastro do que já aconteceu: comparações feitas, regiões descartadas, caminho percorrido. O fluxograma ganha força se marcar por onde a execução já passou.

### A6. Subir e descer a escada de abstração

- **Ele disse.** Ele usa um único exemplo do começo ao fim: um carro que segue uma estrada com uma regra simples. Primeiro controla uma variável (tempo, taxa de giro, curva da estrada). Depois sobe um degrau e desenha o sistema para todos os valores dela, como a trajetória inteira ou o tempo de conclusão por parâmetro. Por fim desce de novo apontando um ponto da abstração para ver o caso concreto. A subida revela o padrão e a descida explica a causa. "I believe that this dance is where the deepest insights are born" (*Up and Down the Ladder of Abstraction*, segunda seção "Stepping Back Down", [link](https://worrydream.com/LadderOfAbstraction/)).
- **Leitura para a galeria.** O palco é o degrau concreto (uma entrada, um instante). Os gráficos de tempo e memória são degraus acima (todas as entradas de um tamanho, todos os tamanhos). Falta, quase sempre, o caminho de volta: o texto ou a página devem ligar um ponto do gráfico a uma execução concreta no palco.

### A7. Começar concreto, generalizar depois

- **Ele disse.** O aluno começa com um caso específico, totalmente entendido, e generaliza nível por nível, sem perder o entendimento em nenhum deles: primeiro constante, depois variável; primeiro um, depois muitos. "Start concrete, start grounded." (*Learnable Programming*, "Summary — Create by abstracting", [link](https://worrydream.com/LearnableProgramming/)). Na busca binária, o ambiente pede um exemplo de entrada antes de qualquer linha de código (*Inventing on Principle*, [transcrição](https://jamesclear.com/great-speeches/inventing-on-principle-by-bret-victor)). No ensaio da escada, ele parte da regra mais simples possível e assume que o primeiro chute de parâmetro é arbitrário (*Ladder*, "Standing on Concrete" e "Controlling the Algorithm", [link](https://worrydream.com/LadderOfAbstraction/)).
- **Leitura para a galeria.** O texto de cada faixa abre com uma entrada pequena e concreta (o vetor, o grafo) e só depois enuncia a regra geral e a complexidade.

### A8. Explicar no lugar onde a coisa está

- **Ele disse.** O ambiente tem a responsabilidade de tornar o significado transparente. Isso se faz rotulando os elementos onde eles aparecem, e não com um recurso de "ajuda". Boas explicações vêm embutidas no contexto do que explicam: "they show as well as tell" (*Learnable Programming*, "Make meaning transparent" e "Explain in context", [link](https://worrydream.com/LearnableProgramming/)). O resumo da seção pede para anotar os dados, não só o código.
- **Leitura para a galeria.** Rótulos curtos ficam colados ao elemento do palco (`lo`, `hi`, pivô) e não numa legenda separada. Isso combina com o mantra do projeto: o rótulo só existe se a posição ainda não disse aquilo.

### A9. Palavra e figura acopladas, em sequência

- **Ele disse.** Ele redesenhou o artigo de Watts e Strogatz como uma sequência de ilustrações com legendas, no formato de quadrinho, para mostrar e dizer ao mesmo tempo. Na descrição do algoritmo, cada figura se prende a uma frase ou a um fragmento. Mais adiante, cada figura se prende a um parágrafo e serve de exemplo. Usar espaço com fartura pode encurtar a escrita: "illustrations allow for terser prose" (*Scientific Communication As Sequential Art*, notas finais, [link](https://worrydream.com/ScientificCommunicationAsSequentialArt/)). Na palestra *Media for Thinking the Unthinkable*, as palavras descrevem a estrutura do algoritmo e as figuras mostram o comportamento (Demo 1, [link](https://worrydream.com/MediaForThinkingTheUnthinkable/)).
- **Leitura para a galeria.** O encarte pode trocar o parágrafo corrido por pares "frase + quadro do palco". A frase diz a regra do passo e o quadro mostra o estado depois dele.

### A10. A interação é opcional e o autor conduz

- **Ele disse.** No exemplo do filtro digital, o texto funciona como explicação estática e pode ser lido como texto comum. O leitor só interage se quiser ir mais fundo, e nenhum controle disputa a atenção do leitor. Um widget solto num sandbox não é explicação. O essencial é que "the author holds up their end of the conversation": o autor guia, dá estrutura e provoca as perguntas (*Explorable Explanations*, seção 2, "Explanation", [link](https://worrydream.com/ExplorableExplanations/)). No artigo em quadrinho, a interatividade (sliders ao passar o mouse) é opcional e suplementar (*Scientific Communication As Sequential Art*, notas, [link](https://worrydream.com/ScientificCommunicationAsSequentialArt/)). Em *Magic Ink*, a interação é o último recurso no software de informação. Toda interação ali é navegação, e navegação custa ao usuário (*Magic Ink*, "Interactivity considered harmful", [link](https://worrydream.com/MagicInk/)).
- **Leitura para a galeria.** A página deve ensinar sem um clique. Controles do palco aprofundam e não substituem a explicação. O texto deixa perguntas que o palco responde ("o que acontece se a chave não estiver no vetor?").

### A11. Começar pelas perguntas do leitor (design gráfico antes de funcionalidade)

- **Ele disse.** Software de informação é design gráfico, e a primeira preocupação é o que se apresenta e como. O designer pergunta qual informação é relevante, que perguntas o leitor fará, que situações vai querer comparar e que decisão quer tomar. "People learn by looking." (*Magic Ink*, sumário e "Information software design is graphic design", [link](https://worrydream.com/MagicInk/)). No redesenho da livraria, ele lista as duas perguntas do comprador (se o livro é adequado e se é bom) e põe as respostas lado a lado na página, para que a comparação se faça com o olho e não com a memória (*Magic Ink*, "Demonstration: Showing the data").
- **Leitura para a galeria.** Antes de reescrever uma faixa, o agente lista as perguntas que um aluno de graduação faz diante daquele algoritmo e verifica se cada uma tem resposta visível na página.

### A12. Várias representações que se movem juntas

- **Ele disse.** O filtro digital aparece em seis representações ao mesmo tempo. Ver como elas respondem juntas, como se dançassem, gera intuição sobre o sistema (*Explorable Explanations*, "Intuition", [link](https://worrydream.com/ExplorableExplanations/)). Na palestra *Media for Thinking the Unthinkable*, apontar um objeto em qualquer estágio do pipeline destaca de onde ele veio, para onde foi e que linhas de código o produziram, e as representações trabalham juntas (Demo 3 e Demo 5, [link](https://worrydream.com/MediaForThinkingTheUnthinkable/)).
- **Leitura para a galeria.** Palco, pseudocódigo e fluxograma devem estar ligados: o passo atual destaca a linha do pseudocódigo e o nó do fluxograma ao mesmo tempo. Sem essa ligação, são três explicações paralelas.

### A13. Critério de decisão: um princípio que responde "sim ou não"

- **Ele disse.** Seu princípio é que quem cria precisa de conexão imediata com o que cria. Ele diz que todos os demos da palestra vieram de procurar onde esse princípio era violado e consertar. Um princípio útil não é vago como "simplicidade". Ele é específico o bastante para dividir o mundo entre certo e errado com uma pergunta de sim ou não: ao mudar a linha, você viu o efeito na hora? "Creators need an immediate connection to what they're creating." (*Inventing on Principle*, abertura e parte final, [transcrição](https://jamesclear.com/great-speeches/inventing-on-principle-by-bret-victor); vídeo em [worrydream.com/InventingOnPrinciple](https://worrydream.com/InventingOnPrinciple/)).
- **Leitura para a galeria.** O agente revisa cada faixa com perguntas de sim ou não derivadas dos achados acima, como fazia o checklist do próprio Victor (ver A14).

### A14. Ritual: transformar princípios em perguntas e ensinar o que se pratica

- **Ele disse.** *Learnable Programming* termina com uma seção que converte cada princípio numa pergunta de verificação (por exemplo, se o tempo está visível e manipulável e se o estado escondido foi eliminado). Ele afirma que as perguntas importam mais do que as respostas que propôs. Insiste também que os exemplos mostrados são só exemplos e que o que conta é o propósito por trás deles (*Learnable Programming*, "Okay then!" e "The features are not the point", [link](https://worrydream.com/LearnableProgramming/)). Em outro texto, diz que escreve a partir de tentar entender um modo de pensar que é pessoal para ele, e depois compartilhar esse entendimento. "Real teaching is about conveying a way of thinking." (*Some Thoughts on Teaching*, [link](https://worrydream.com/SomeThoughtsOnTeaching/)). Ao publicar palestras, ele "explode" o vídeo numa página que se pode folhear, com cada ideia num bloco curto e um título por demo, porque uma palestra não deixa o leitor passar os olhos nem consultar uma ideia depois (*Media for Thinking the Unthinkable*, "About this page", [link](https://worrydream.com/MediaForThinkingTheUnthinkable/)).
- **Leitura para a galeria.** O texto de cada faixa transmite o modo de pensar do algoritmo (por que descartar metade, por que a pilha) e não só os passos. O checklist de revisão do agente sai dos achados, em forma de pergunta.

---

## 3. Os 3 métodos mais úteis para a galeria

*Toda esta seção é interpretação nossa, montada a partir dos achados citados.*

### Método 1. Mostre o estado, não descreva a regra (A1, A2, A3, A8)

1. Liste toda variável do pseudocódigo que muda durante a execução.
2. Para cada uma, confirme que ela aparece no palco, rotulada junto ao elemento que representa. Se não aparece, ou some do pseudocódigo ou entra no palco.
3. No encarte, troque "o algoritmo compara o elemento do meio com a chave" por uma frase que aponte para o que se vê: o valor de `mid` naquele passo, com a região descartada já apagada.
4. Em cada passo importante, mostre o antes e o depois, ou o caso médio contra o pior caso, para que haja comparação e não um número solto.
5. Pergunta de controle: o aluno precisa fazer alguma conta de cabeça para acompanhar? Se sim, mostre o resultado dessa conta.

### Método 2. Comece no chão, suba para o padrão, desça de novo (A6, A7, A4, A5)

1. Abra a faixa com uma entrada pequena e concreta, a mesma que o palco usa.
2. Execute passo a passo com controle de tempo (avançar, voltar, parar) e marque os momentos que o texto comenta.
3. Suba um degrau: mostre o rastro da execução inteira (o que foi descartado, comparado ou visitado) para revelar a forma do algoritmo.
4. Suba mais um: os gráficos de tempo e memória mostram o comportamento para todas as entradas e tamanhos. O texto nomeia o padrão (por exemplo, "dobrar o vetor acrescenta só um passo").
5. Desça: ligue um ponto do gráfico, como o pior caso de um tamanho, a uma execução concreta no palco, para explicar a causa do padrão.

### Método 3. Palavra e figura acopladas, com o autor conduzindo (A9, A10, A11, A12)

1. Antes de escrever, liste as perguntas do aluno diante da faixa (o que resolve, como decide, quando falha, quanto custa).
2. Escreva o encarte como sequência de pares: uma frase curta com a regra do passo e o quadro do palco que mostra o estado depois dele.
3. Garanta que a página ensine sem clique. A interação do palco é para quem quer ir além, e o texto deixa a pergunta que essa interação responde.
4. Ligue as representações: o passo atual destaca a linha do pseudocódigo, o nó do fluxograma e o elemento do palco.
5. Corte do texto tudo o que a figura já mostra. Pelas notas do artigo em quadrinho, a figura permite prosa mais curta.

---

## 4. Tom e estilo de escrita

*O que ele faz, com fonte. A tradução para o projeto vem marcada.*

- **Frases curtas e declarativas, com princípios no imperativo.** Os princípios são frases de três ou quatro palavras que viram títulos ("Show the data", "Make flow tangible", "Start constant, then vary"), e as seções fecham com "Summary — …" em tópicos (*Learnable Programming*, [link](https://worrydream.com/LearnableProgramming/)). No sumário de *Magic Ink*, cada título vem seguido de uma única frase que diz o que a seção afirma, por exemplo, o título sobre interatividade nociva vem com uma frase dizendo que o usuário pode indicar o que é relevante, mas só como último recurso (*Magic Ink*, "Contents", [link](https://worrydream.com/MagicInk/)). *Para o projeto:* esse formato "título + uma frase" é o mesmo do campo `objetivo` das fichas.
- **Pessoa gramatical.** Ele usa "I" para opinião e posição pessoal, "we" para o raciocínio feito junto com o leitor e "you" para instruções e experimentos de pensamento, como em "Imagine if you bought a new microwave". O aprendiz é "she" (*Ladder*, [link](https://worrydream.com/LadderOfAbstraction/); *Learnable Programming*, "Read the vocabulary").
- **Um exemplo do começo ao fim.** O ensaio da escada inteiro gira em torno do carro na estrada, e *Learnable Programming* volta várias vezes à casa com telhado (*Ladder*; *Learnable Programming*, "Create by abstracting").
- **Analogia do cotidiano antes do conceito.** O micro-ondas sem rótulos vem antes da transparência de significado. O programa de culinária que pula do ingrediente ao suflê vem antes do fluxo. Procurar vaga pelo chão ou de helicóptero vem antes de abstrair sobre o tempo (*Learnable Programming*, "Read the vocabulary" e "Follow the flow"; *Ladder*, "Abstracting Over Time").
- **Honestidade com o leitor e com os limites.** Ele admite quando uma figura é difícil: "Perhaps you didn't understand that. That's okay!" (*Ladder*, "Abstracting the Data"). Avisa que os números do exemplo da proposição foram inventados e mostra que a fórmula do autor do filtro é só uma aproximação (*Explorable Explanations*, seções 1 e 2).
- **Humor seco e notas laterais.** Por exemplo, a piada sobre quem dirige como o algoritmo (*Ladder*, "Standing on Concrete"). Os desvios ficam em notas com asterisco, fora do fio principal (*Learnable Programming*, notas em "See the state" e "Create by reacting").
- **Figura como argumento, não ilustração.** Em *Magic Ink*, quase toda tese vem com um redesenho antes/depois (horário de trem, livraria, cinema). Em *Ladder*, o texto pede ao leitor que mexa na figura para ver o que ele acabou de afirmar (*Magic Ink*, "Demonstration"; *Ladder*).
- **Frase curta como elemento gráfico.** Para informação abstrata e não comparativa, ele diz que o melhor elemento gráfico é uma frase concisa (*Magic Ink*, "Case study: Train schedules", [link](https://worrydream.com/MagicInk/)).
- *Para o projeto (interpretação):* o tom polêmico dos ensaios (ataques a Processing, à Khan Academy, à escola) é parte da retórica de manifesto e não serve ao encarte de um aluno. O que se aproveita é a frase curta, o exemplo único, a analogia antes do conceito e a franqueza sobre o que é difícil ou aproximado.

---

## 5. Limites

*Mistura o que ele mesmo disse (com fonte) e a nossa leitura (marcada).*

**O que ele próprio avisa:**

- O projeto Kill Math, diz ele, não é sobre educação, e muita gente o leu errado como reforma do ensino de matemática (*Kill Math*, "Education and Command Lines", [link](https://worrydream.com/KillMath/)). No pós-escrito de 2024 de *Explorable Explanations*, ele diz que quase todos os artigos chamados de "explorable" são pedagógicos e que não era isso que ele buscava. A ideia original era um argumento escrito apoiado em modelos editáveis, para o leitor avaliar e refutar ([link](https://worrydream.com/ExplorableExplanations/)). *Leitura:* usar o método numa galeria didática é adaptação nossa, não aplicação direta da proposta dele.
- Ele desconfia de controles ajustáveis sem rótulo. Números ajustáveis só fazem sentido quando quem ajusta já sabe o que eles significam (*Learnable Programming*, nota em "Summary — Create by reacting"). *Leitura:* não pôr no palco um slider sem dizer o que ele controla.
- A interação é o último recurso e custa navegação (*Magic Ink*, "Interactivity considered harmful"). *Leitura:* acrescentar controles ao palco precisa responder a uma pergunta real do aluno.

**O que não cabe numa página estática de texto (leitura nossa):**

- Controlar o tempo (A4), descer da abstração apontando um ponto do gráfico (A6), documentos reativos com números editáveis no texto e consulta de contexto sem sair da página (*Explorable Explanations*, seções 1 e 3) exigem interação. No texto puro, o substituto é a sequência de quadros fixos com legenda do artigo em quadrinho (A9). O próprio Victor diz que, nesse formato, a interação foi só suplemento.

**O que exigiria mudar o palco ou o layout (leitura nossa):**

- **Palco:** controle de passo (avançar, voltar, parar) em vez de só play. Variáveis de estado visíveis e rotuladas no próprio desenho. Rastro dos passos anteriores (A5). Possibilidade de trocar a entrada, inclusive para o caso em que o algoritmo falha (como a chave ausente na busca binária de *Inventing on Principle*).
- **Layout:** pseudocódigo, fluxograma e palco ligados, com destaque simultâneo do passo atual (A12). Gráficos de tempo e memória clicáveis para descer a uma execução concreta (A6). O encarte como pares frase-quadro em vez de bloco de texto (A9).
- **Conflito com as regras do projeto:** no ensaio da escada, o gráfico de terceiro nível usa cor para o tempo de conclusão (*Ladder*, "Three Steps Up"). O projeto proíbe cor como magnitude, então essa técnica específica não se aplica e a abstração tem de usar posição ou tamanho.

---

## 6. Fontes

Ensaios e palestras (worrydream.com, acessados em 22/10/2026):

- Bret Victor, *Magic Ink: Information Software and the Graphical Interface*, 2006. https://worrydream.com/MagicInk/
- Bret Victor, *Explorable Explanations*, 10/03/2011, com pós-escrito de fevereiro de 2024. https://worrydream.com/ExplorableExplanations/
- Bret Victor, *Kill Math*, 11/04/2011, com pós-escrito de fevereiro de 2024. https://worrydream.com/KillMath/
- Bret Victor, *Scientific Communication As Sequential Art*, 24/05/2011. https://worrydream.com/ScientificCommunicationAsSequentialArt/
- Bret Victor, *Up and Down the Ladder of Abstraction*, outubro de 2011. https://worrydream.com/LadderOfAbstraction/
- Bret Victor, *A Brief Rant on the Future of Interaction Design*, 08/11/2011. https://worrydream.com/ABriefRantOnTheFutureOfInteractionDesign/
- Bret Victor, *Some Thoughts on Teaching*, 23/11/2011. https://worrydream.com/SomeThoughtsOnTeaching/
- Bret Victor, *Inventing on Principle*, palestra na CUSEC 2012. Página com vídeo: https://worrydream.com/InventingOnPrinciple/ (vídeo: https://vimeo.com/906418692). Transcrição de terceiros usada para as paráfrases: https://jamesclear.com/great-speeches/inventing-on-principle-by-bret-victor
- Bret Victor, *Learnable Programming*, setembro de 2012. https://worrydream.com/LearnableProgramming/
- Bret Victor, *Media for Thinking the Unthinkable*, palestra no MIT Media Lab, 04/04/2013, com página resumida por demo. https://worrydream.com/MediaForThinkingTheUnthinkable/
- Bret Victor, página *Apple* (2007–2010). https://worrydream.com/Apple/
- Bret Victor, página inicial e bio promocional. https://worrydream.com/
- Dynamicland, *FAQ* (texto do laboratório). https://dynamicland.org/2024/FAQ/

Sobre entrevistas: não achei entrevista em formato de perguntas e respostas com o próprio Victor sobre o método de trabalho. As buscas só trouxeram reportagens que o citam (por exemplo, *The Coming Software Apocalypse*, de James Somers, na The Atlantic, 2017) e comentários de terceiros, e nada disso foi usado como fonte de achado. *A Brief Rant* foi lido, mas não gerou achado próprio porque trata de interfaces de mão e corpo e não de explicação.
