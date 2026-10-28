---
name: mostrar-o-estado
description: Revisa uma faixa ou uma estrutura do Big O Player procurando estado escondido, ou seja, variável do pseudocódigo que muda e não aparece no palco, ou texto que descreve o que o palco deveria mostrar. Troca a descrição da regra por uma frase que aponta para o que se vê. Use ao escrever ou revisar o resumo, o palco, as legendas ou o painel de variáveis de uma faixa, ou quando o texto "explica o mecanismo" em vez de mostrar.
---

# Mostrar o estado

Método de Bret Victor (`docs/agente/bret-victor-metodo.md`, achados A1, A2, A3 e A8): o aluno entende o que vê. Ler uma regra obriga a "brincar de computador" de cabeça. Toda variável que muda é eliminada ou mostrada, com o rótulo colado ao elemento.

## Quando usar

- O resumo descreve o mecanismo passo a passo ("compara, descarta, repete").
- Uma variável do pseudocódigo (`a`, `b`, `m`, `dist`, a pilha) muda e não tem lugar no palco, ou só aparece no painel lateral, longe do desenho.
- O texto pede ao leitor que imagine um valor ("o par antigo continua lá dentro").

## Passo a passo

1. Liste as variáveis do `pseudocodigo` da ficha que mudam durante a execução.
2. Para cada uma, ache onde ela está no palco (`simulacao/palco.js`). Está colada ao elemento que representa, com o mesmo nome do pseudocódigo? Se não está, proponha pô-la lá ou tirá-la do pseudocódigo.
3. Procure comparação: o antes e o depois de um passo, ou o que mudou. Um número solto não ensina.
4. Reescreva o texto apontando para o que se vê. Corte toda frase que o palco já diz.
5. Pergunta de controle: o aluno precisa fazer alguma conta de cabeça para acompanhar? Se precisa, o resultado dessa conta entra no palco.

## Exemplo: Busca binária

**Antes** (`algoritmos/binaria/ficha.json`, `resumo`):

> Num vetor ordenado, compara o alvo com o número do meio do trecho que ainda pode contê-lo. Se o alvo é maior, descarta a metade da esquerda; se é menor, a da direita. Cada comparação joga fora metade do que sobrou.

No palco, o trecho já aparece como um colchete ("ainda pode estar aqui"), mas as pontas não têm nome. O pseudocódigo chama as pontas de `a` e `b` e o meio de `m`. Quem lê `a ← m + 1` no encarte não acha `a` no desenho. É estado escondido.

**Depois.**

- Palco: as pontas do colchete levam os rótulos `a` e `b`, e a seta do meio leva `m`, os mesmos nomes do pseudocódigo. A parte descartada fica apagada.
- `resumo`:

> O colchete marca onde o alvo ainda pode estar. Cada olhada no meio, `m`, apaga a metade em que ele não pode estar, e o colchete encolhe pela metade.

O texto ficou mais curto porque o palco carrega o resto.

## Não confundir

- Mostrar não é enfeitar. Rótulo só existe se a posição ainda não diz aquilo (mantra do projeto).
- A cor nunca representa magnitude. Valor se mostra com posição ou tamanho.
- Os números que aparecem no texto vêm do `dados.json` ou da simulação, nunca digitados.
