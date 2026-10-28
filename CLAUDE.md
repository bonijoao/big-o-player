# É complexo, baby? — instruções para agentes

## Interface

Mantra: **evite rótulos e descrições secundárias desnecessárias. Deixe o layout fazer a explicação.**

- Toda faixa e todo instrumento têm `objetivo` na ficha: uma frase curta que diz o que resolve ou para que serve ("Achar um valor num vetor já ordenado com poucas comparações."). É a linha fina abaixo do título e aparece por cima do palco nos primeiros segundos da faixa. O `gerar.py` recusa ficha sem `objetivo`.
- Detalhe técnico (versão, autoria, técnica, medidas) fica na ficha técnica, no fim da página, ou recolhido.
- Visual: papel branco, IBM Plex Mono, verde só no resultado. A cor nunca representa magnitude.

## Voz

- Os textos de ensino (linha fina, resumos, rótulos do palco, roteiros dos vídeos) seguem a voz de `docs/agente/voz.md`: direta, de quebrada, sem caricatura. Todo texto responde a "qual é a boa disso?" logo na primeira frase.
- O agente `redator-professor` e as skills `mostrar-o-estado`, `escada-de-abstracao` e `frase-e-quadro` (em `.claude/`) escrevem e revisam nesse método. As decisões estão em `docs/agente/decisoes.md`.

## Números

Nada é digitado à mão. As medidas vêm do Python instrumentado (`medir.py`), são conferidas no R (`conferir.R`), e o JavaScript do site tem que contar igual ao Python (`testes/conferir_js.mjs`, roda no fim do `python3 gerar.py`).

## Git

- O repositório é público. Commits e PRs **não** levam Co-Authored-By nem rodapé do Claude.
- Push e merge na `main` só com o OK do Pedro. O GitHub Pages publica a `main`.
- Tarefas pesadas (`gerar.py --tudo`, R, navegador headless) uma de cada vez: `flock /tmp/eh-complexo-baby-pesado.lock <comando>`. O PC tem pouca RAM.
