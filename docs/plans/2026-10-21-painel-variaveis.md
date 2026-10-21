# Palco: painel de variáveis e ritmo constante

**Objetivo:** ao lado da animação, no lugar do fluxograma, aparece um painel com a linha do pseudocódigo que está rodando e as variáveis atualizando a cada passo. A reprodução anda num ritmo constante. O modo que acelera vira opcional, com o nome "accelerando".

## Decisões

- **Fluxograma e pseudocódigo viram material de apoio da faixa:** ficam no encarte, estáticos. Nada acende durante a reprodução: nem o fluxograma do palco, que sai, nem o do encarte, nem as linhas do pseudocódigo.
- **Painel de variáveis:** no topo, o número e o texto da linha do pseudocódigo que está rodando. Embaixo, as variáveis escalares com o nome que têm no pseudocódigo e os índices a partir de 1, como lá. Exemplos:
  - bubble: fim, i, trocou, v[i], v[i + 1];
  - insertion: i, j;
  - merge: a, b, m, i, j, k;
  - quick: a, b, pivô, i, j;
  - K-means: volta, a flor da vez, o centro j, o melhor, a menor distância, mudou.

  A variável que acabou de mudar fica em coral, a cor do papel "acabou de se mexer". No merge e no quick, o painel mostra as variáveis da chamada aberta e em que nível ela está. Listas e vetores ficam fora do painel, porque já aparecem na animação. Os contadores continuam no canvas.
- **Onde fica o painel:** na tela larga, à direita da animação, no lugar do fluxograma. Na tela estreita, abaixo da animação, compacto, com as variáveis em linha. O mini player mostra só a animação.
- **Ritmo constante:** cada passo dura o mesmo tempo: 1/(6 × velocidade) segundo, ou seja, 6 passos por segundo a 1×. Comparação, troca, escrita, teste e chamada contam um passo cada.
  - No K-means, um passo é uma flor: as k distâncias dela e a escolha do grupo, com as linhas à vista. O deslize dos centros e o fim de cada volta também são passos.
  - Durações a 1× calculadas com os eventos atuais: bubble 0:55, insertion 1:02, merge 1:17, quick 0:44 e K-means 2:57 (merge com o passo da linha 3, `m ←`, acrescentado na revisão).
- **accelerando:** um botão ao lado da velocidade, desligado por padrão. Ligado, a faixa começa devagar e acelera, como o palco faz hoje (a câmera lenta no começo, a pausa depois da primeira partição do quick e as primeiras flores do K-means devagar). A escolha vale para todas as faixas e fica guardada só nesta visita.
- **Contagens intactas:** o painel e o ritmo mudam só a reprodução. O teste JS × Python continua igual e ganha uma conferência: as variáveis do painel batem com os índices de cada evento (por exemplo, numa comparação do bubble, o i do painel é o i da comparação).

## Fora de escopo

O artigo técnico por faixa, em estilo de blog, explicando o passo a passo: fica registrado como próximo passo, sem implementar agora. Também ficam fora: mudar as faixas, os álbuns e os instrumentos.

## Pronto quando

- No palco grande, com a tela larga, o painel mostra a linha do pseudocódigo e as variáveis, que mudam a cada passo. Com a tela estreita, ele fica abaixo da animação. No mini player, aparece só a animação.
- O fluxograma não aparece mais no palco. O do encarte e o pseudocódigo do encarte não acendem.
- A 1×, sem accelerando, todos os passos de uma faixa duram o mesmo tempo, conferido pela linha do tempo. O "passo x de y" e a duração da lista de faixas acompanham o ritmo novo.
- Com o accelerando ligado, a faixa volta ao ritmo que acelera.
- As cinco faixas têm variáveis certas: o teste confere o painel contra os eventos, e `python3 gerar.py` passa.
- 375 px sem rolagem lateral. A revisão independente foi feita.

## Onde mexer

- `simulacao/algoritmos.js`: os eventos passam a levar as variáveis escalares da vez.
- `simulacao/palco.js`: os pesos ficam constantes, com o accelerando como opção, o passo do K-means vira uma flor e `varsEm(u)` entra no lugar de `linhaEm`.
- `galeria.js`: o painel no lugar de `#palco-fluxo`, o fim do `acender` e o botão accelerando.
- Também mudam `index.html`, `estilo.css` e `testes/conferir_js.mjs`.
- Conflito possível: o lote 1 da fase 3 (sessão local_8238bd33) também vai mexer em `simulacao/` e no palco. Avisar a sessão antes de começar.
