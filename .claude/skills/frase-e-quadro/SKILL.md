---
name: frase-e-quadro
description: Reescreve um texto didático do Big O Player (resumo, encarte ou roteiro de vídeo) como uma sequência de pares (uma frase curta e o quadro que ela comenta), conduzida pelas perguntas do aluno, e passa o resultado pelo teste do português falado para tirar o calque do inglês e a cara de texto gerado. Use ao reescrever um resumo ou encarte longo e denso, ao escrever o roteiro de um vídeo de Conceitos importantes ou Fundamentos, ou quando o texto estiver "AI slop", traduzido ou cheio de detalhe técnico que devia estar na ficha técnica.
---

# Frase e quadro

Método de Bret Victor (`docs/agente/bret-victor-metodo.md`, achados A9 a A12): palavra e figura acopladas, com o autor conduzindo. A frase diz a regra do passo, e o quadro mostra o estado depois dele. A figura permite uma prosa mais curta. A página ensina sem nenhum clique, e a interação serve a quem quer ir além.

## Quando usar

- O resumo virou parágrafo de seis ou mais frases.
- Detalhe técnico (constante, versão, autoria) disputa espaço com a ideia.
- O texto soa traduzido ou gerado (ver o teste do passo 6).

## Passo a passo

1. Liste as perguntas do aluno diante da faixa: o que resolve, como decide, quando dá errado, quanto custa.
2. Para cada pergunta, escreva uma frase que responda, e só uma.
3. Ao lado de cada frase, diga o quadro: o estado do palco ou do desenho que a frase comenta. Frase sem quadro é suspeita.
4. O que não responde a nenhuma pergunta do aluno desce para a ficha técnica.
5. Ligue as vistas: o passo da frase acende a mesma linha no pseudocódigo e no fluxograma.
6. **Teste do português falado.** Leia cada frase em voz alta e pergunte se alguém fala assim no Brasil.
   - Calque: "achar de relance", "acerta para qualquer entrada", "sem dúvida" por *definite*.
   - Tríade em negrito: três parágrafos que abrem com rótulo em negrito são uma lista disfarçada.
   - Instrução de interface ("passe o mouse…"): se o quadro precisa disso, conserte o quadro.
   - Enfeite ("cabe num cartão") e contradição ("desce para lá em cima").
   - Se a frase só faz sentido traduzida de volta para o inglês, reescreva partindo da imagem e não da palavra.
7. **Teste da voz** (`docs/agente/voz.md`): aula boa e não personagem, nada de propaganda, no máximo uma gíria por parágrafo. Tirando a gíria, a frase continua certa?

## Exemplo: Dicionário

**Antes** (`instrumentos/dicionario/ficha.json`, `resumo`, 8 frases): vai de "calcula onde ela mora" até "os bits de cima de chave × 2654435769, em 32 bits" e "o polinômio de base 31 sobre as letras".

**Perguntas do aluno:** como acha sem procurar? E se duas chaves caem no mesmo lugar? E quando enche?

**Depois**, em pares:

| frase | quadro |
|---|---|
| O dicionário não procura a chave: faz uma conta com ela e vai direto à casa. | a chave, uma seta, a casa acesa |
| Às vezes duas chaves dão a mesma casa. | duas setas chegando na mesma casa |
| No encadeamento, a casa guarda uma corrente, e a chave nova entra nela. | a corrente crescendo para baixo |
| Na sondagem, a chave tenta a casa seguinte até achar uma vazia. | a chave pulando de casa em casa |
| Antes de ficar cheia demais, a tabela dobra e cada chave muda de casa. | a tabela grande, as chaves redistribuídas |

A constante de Knuth, o polinômio de base 31 e o limite de 3/4 descem para a ficha técnica. A casa exata de cada chave sai da simulação, não do texto.

## Lembrete

A gente se inspira no método de Victor e nunca escreve em nome dele nem põe na boca dele frase que ele não disse.
