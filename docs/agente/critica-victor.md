# Crítica e polimento da versão Victor

Os pilotos em HTML ficaram no branch aposentado `claude/compassionate-dhawan-92e734` (`docs/agente/piloto/`). O Pedro achou a primeira versão "ainda um pouco slop" e disse que a tradução para o português "pode não ter ficado a melhor". Este arquivo guarda o diagnóstico, para servir de exemplo às skills.

## Calque do inglês

| antes | problema | depois |
|---|---|---|
| Você achou de relance. / O computador não tem relance. | "de relance" com "achar" soa traduzido | Bateu o olho, achou. / O computador não bate o olho. |
| …e que acerta para qualquer entrada. | *works for any input* palavra por palavra | …e que dão a resposta certa, seja qual for a entrada. |
| Cada passo é uma ação sem dúvida. | tentativa de traduzir *definiteness* | Ela só compara dois números ou anota um. |
| Suba um degrau: em vez de uma fila… | jargão do ensaio do Victor; o aluno não conhece a escada | Agora, 40 filas em vez de uma… |

## Cara de texto gerado

- Três parágrafos seguidos abrindo com rótulo em negrito (**Cada passo…**, **Termina.**, **Serve para…**): é a tríade de lista disfarçada de prosa. Virou prosa corrida, com cada propriedade presa ao que o leitor acabou de ver.
- "Esta cabe num cartão" era enfeite e saiu.
- "Aquela fila desce para a tira lá em cima" se contradiz (desce ou sobe?). Virou "Clique num ponto para ver aquela fila na tira."

## Contra o próprio método

- **Instrução de interface no texto** ("Passe o mouse num passo e a linha da regra acende"). A ligação tem de se ver sem mouse (A10). Agora a regra e a tira têm o mesmo número de linha, e o texto da esquerda fica parado enquanto a tira passa.
- **Estado escondido** (A3). A barra embaixo da carta marcava *m* sem dizer, e *m* aparecia na regra sem ter sido apresentado. Agora o primeiro quadro tem o papel com *m* anotado, e cada carta que é *m* na tira leva o rótulo.
- **A comparação estava só no texto** (A2). "Todas fizeram 5 comparações" era dito, mas o gráfico só mostrava as trocas. Agora são dois blocos na mesma escala: nas comparações, todos os pontos caem num valor só; nas trocas, eles se espalham.

## Regra que fica para o agente

Antes de entregar, ler cada frase em voz alta e perguntar: alguém fala assim no Brasil? Se a frase só faz sentido traduzida de volta para o inglês, reescrever partindo da imagem e não da palavra.
