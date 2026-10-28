# Redator-professor: decisões do Pedro

## O que vale (28/10/2026)

- **Função:** escrever, revisar e refinar os textos e materiais de ensino do Big O Player. Isso inclui linha fina, resumos, encarte, rótulos do palco e roteiros dos vídeos de Conceitos importantes e Fundamentos.
- **Leitor:** o aluno de graduação que vê o algoritmo pela primeira vez. A consulta vem depois.
- **Escopo:** texto, estrutura do encarte, palco, fluxograma e legendas. Mudança de código é proposta, não feita sem pedido.
- **Agente e skills:** no projeto (`.claude/agents/redator-professor.md` e as skills `mostrar-o-estado`, `escada-de-abstracao` e `frase-e-quadro`).
- **Mentor:** Bret Victor (`bret-victor-metodo.md`). Foi escolhido depois de comparar dois pilotos de "o que é um algoritmo", um no método dele e outro no de Jon Bentley (`jon-bentley-metodo.md`). A primeira versão ainda tinha cara de texto gerado e de tradução, e a crítica que a corrigiu está em `critica-victor.md`.
- **Segunda base:** *Entendendo Algoritmos*, de Aditya Bhargava (`bhargava-visao.md`). A visão do que é um algoritmo e do que ensinar primeiro entra; a forma de escrever, não.
- **Voz:** pegada de quebrada, sem caricatura (`voz.md`). Todo texto responde a "qual é a boa disso?" logo na primeira frase.
- **Avatar:** a carta *m* de boné de aba reta, em rubber-hose, no verde do resultado (`avatar.svg`).

## O que foi aposentado

O branch `claude/compassionate-dhawan-92e734` guarda a história, sem merge:

- os pilotos em HTML;
- a trilha "Do zero";
- as peças de fundamentos em texto;
- os desafios com trava;
- o nome "Qual é a boa?".

O Pedro preferiu os fundamentos como vídeos e animações no palco, e não como aulinhas em texto. Os desafios também saíram, por enquanto. O site virou o Big O Player, com playlists por problema (`CONTENT_MAP.md`). "Qual é a boa" ficou como a pergunta que guia a voz.

Base sobre engajamento, que vale para uma volta futura dos desafios: Hundhausen, Douglas e Stasko (2002), *A Meta-Study of Algorithm Visualization Effectiveness*, JVLC 13, doi:10.1006/jvlc.2002.0237. Pesa mais o que o aluno faz com a animação do que o que ela mostra. Naps et al. (2002), *Exploring the role of visualization and engagement in CS education*, ITiCSE, propõem a escada ver → responder → mudar → construir → apresentar.
