---
name: escada-de-abstracao
description: Ordena a explicação de uma faixa do Big O Player do concreto ao geral e de volta. Começa por uma entrada pequena e uma execução, sobe para o padrão de muitas entradas (os gráficos de tempo e memória) e desce de novo, ligando um ponto do gráfico a uma execução concreta. Use ao escrever a linha fina (objetivo), o resumo, os textos e legendas dos gráficos, ou ao decidir a ordem das seções de uma faixa ou das cenas de um vídeo de Fundamentos.
---

# Escada de abstração

Método de Bret Victor (`docs/agente/bret-victor-metodo.md`, achados A4 a A7): comece com um caso pequeno e totalmente entendido, generalize um nível de cada vez e volte ao chão para explicar a causa do padrão. Subir mostra o padrão, e descer explica por que ele existe.

## Quando usar

- O resumo abre com a regra geral ("compara vizinhos e troca…") antes de qualquer exemplo.
- O texto dos gráficos descreve o eixo em vez de dizer o padrão.
- O gráfico é um beco sem saída: nada leva de um ponto dele a uma execução que o explique.

## Passo a passo

1. **Chão.** Abra com a entrada do encarte (`dados.json → exemplo`), pequena, a mesma do palco. Mostre uma execução.
2. **Tempo à mão.** O palco precisa de avançar, voltar e parar. O texto pode apontar o momento que importa ("na terceira olhada…").
3. **Primeiro degrau.** O rastro da execução inteira: o que foi comparado, descartado ou visitado. É a forma do algoritmo.
4. **Segundo degrau.** Muitas entradas e muitos tamanhos (os gráficos). O texto nomeia o padrão numa frase, com os números vindos das medidas.
5. **Descida.** Ligue um ponto do gráfico (o pior caso, um valor estranho) à execução concreta que o produziu.
6. A linha fina (`objetivo`) fica no topo da escada: para que serve, numa frase. Se couber, com o padrão que o aluno vai ver.

## Exemplo: Bubble sort

**Antes** (`algoritmos/bolha/ficha.json`):

> `objetivo`: Pôr o vetor em ordem trocando vizinhos fora de lugar.
>
> `resumo`: Compara vizinhos e troca os que estão fora de ordem. Cada passada leva o maior número que sobrou para o fim; se uma passada não troca nada, o vetor está pronto.

A linha fina repete o método em vez de dizer para que ele serve. O resumo começa pela regra geral e não tem chão.

**Depois.**

> `objetivo`: O jeito mais simples de ordenar, e o que mostra por que vale a pena aprender os outros.
>
> `resumo`: Olhe a primeira passada: o maior número anda para a direita, um vizinho de cada vez, até o fim. A segunda passada faz o mesmo com o segundo maior. Quando uma passada inteira não troca nada, acabou. No gráfico, dobrar o vetor quase quadruplica as comparações. Clique no pior ponto para ver o vetor que o produziu.

O último passo, de ponto do gráfico para execução, pede uma mudança no `galeria.js` e no `graficos.js`. O redator propõe e não implementa sozinho.

## Não confundir

- A escada é uma ordem de leitura, não um enfeite. Se um degrau não ajuda a entender, ele sai.
- "Dobrar quase quadruplica" é um padrão lido de um gráfico medido. O número exato sai do `dados.json` por marcador (`{n0}`, `{n1}`), como já fazem os textos de `graficos`.
