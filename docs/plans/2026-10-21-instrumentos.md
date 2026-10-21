# Instrumentos (fase 2): Vetor, Pilha e Fila

**Objetivo:** cada estrutura de dados ganha página própria, com demo ao vivo e o custo medido de cada operação, e as faixas creditam os instrumentos que usam ("Merge sort feat. Vetor, Pilha").

## Decisões

- **Página = encarte de instrumento:** o mesmo esqueleto do encarte da faixa. Placa de museu (nome, a frase que define, técnica; autoria e ano só com fonte conferida, senão "—"), demo ao vivo dentro da página, tabela de operações (operação, Big-O, custo medido, gráfico custo × n) e "toca em", com as faixas que creditam o instrumento.
- **A demo mora na página, não no palco:** o palco continua sendo das faixas, então o mini player segue tocando enquanto a pessoa experimenta o instrumento. A demo é interativa: botões das operações, e cada clique diz quanto aquela operação custou.
- **Navegação:** a lateral ganha a seção "Instrumentos" abaixo de "Álbuns"; as rotas são `#instrumentos` e `#instrumentos/<id>`; o início mostra os instrumentos depois da estante de álbuns.
- **Unidade de custo:** cada leitura ou escrita de uma casa da estrutura conta 1 (na realocação, cada casa copiada conta uma leitura e uma escrita; a busca conta as leituras, cada uma comparada com o valor). Divergência da primeira versão do desenho, resolvida pelo código: assim o deslocamento e a cópia custam igual por casa.
- **Tabela:** custo com n = 10, 100 e 1000 valores já guardados (fora das potências de 2, para o vetor ter folga); o anexar ganha duas linhas a mais, a mais cara de n seguidas e a média delas (o custo amortizado). Gráfico: custo × n para n de 0 a 60. Os índices e o tamanho guardado não contam, como nas faixas.
- **Vetor:** dinâmico, com capacidade que dobra quando enche. Ler v[i] e escrever v[i]; inserir no fim (custo amortizado medido: quase sempre 1, às vezes copia tudo); inserir e remover na posição i (deslocam os vizinhos); busca sequencial.
- **Pilha:** empilhar, desempilhar e topo, mais um botão que repassa a pilha de chamadas do merge e do quick (os eventos entra/sai que a simulação já tem e o teste já confere).
- **Fila:** duas versões lado a lado. Na ingênua, desenfileirar desloca todos os que ficaram (O(n)); na circular, início e fim dão a volta no vetor e desenfileirar custa 1 (O(1)).
- **feat.:** em cinza depois do nome da faixa, na lista do álbum, no encarte, na barra do player e no título do palco, com cada instrumento linkando para a página dele (na barra, só texto: a barra inteira já é o link da faixa). A placa do encarte ganha a linha "instrumentos" com o papel de cada um ("Pilha: a pilha de recursão"). Créditos: as quatro ordenações usam o Vetor; merge e quick também usam a Pilha; K-means usa o Vetor (rótulos e centros).
- **Números:** Python instrumentado mede (`dados.json` de cada instrumento), o JS refaz as mesmas sequências de operações e o `testes/conferir_js.mjs` exige contagens iguais. Nenhum número digitado à mão, nem na ficha nem na página.
- **Visual:** papel branco, IBM Plex Mono, verde só no resultado; a cor da casa mostra o papel dela (a que acabou de ser lida ou escrita, a que está sendo deslocada, a vazia), nunca o valor.

## Fora de escopo

Outros instrumentos (lista encadeada, deque, dicionário…), faixas novas (parênteses balanceados, busca em largura), conferência dos instrumentos no R (as contagens são determinísticas e o JS × Python confere), álbuns por tema da ementa (fase 3), capas definitivas.

## Pronto quando

- `#instrumentos/vetor`, `#instrumentos/pilha` e `#instrumentos/fila` abrem, cada um com a demo funcionando (todos os botões), a tabela de operações com custo medido e o gráfico custo × n.
- A demo do Vetor mostra a realocação (capacidade dobra, cópia contada); a da Pilha repassa a pilha de chamadas do merge e do quick; a da Fila mostra as duas versões com custos diferentes no mesmo clique.
- As cinco faixas mostram o feat. na lista, no encarte, na barra do player e no palco, com links; a placa tem a linha "instrumentos"; cada instrumento lista as faixas em "toca em".
- `gerar.py` recusa ficha que credita instrumento inexistente; `python3 gerar.py` passa, com o teste JS × Python cobrindo os três instrumentos.
- Trocar para a página de um instrumento não para a faixa tocando; 375 px sem rolagem lateral; abre por `file://`.
- Revisão independente feita e achados resolvidos.

## Onde mexer

Novos: `instrumentos/<id>/` (implementação instrumentada em Python, `medir.py` → `dados.json`, `ficha.json` com o texto), `simulacao/instrumentos.js` (as mesmas estruturas em JS, contando igual, e o desenho da demo). Mudam: `gerar.py` (junta instrumentos em `dados.js`, valida créditos), as `ficha.json` das faixas (`instrumentos` com id e papel), `galeria.js` (rotas, lateral, página do instrumento, feat.), `estilo.css`, `index.html`, `testes/conferir_js.mjs`, `README.md`.
Riscos: autoria e ano das estruturas são difíceis de atribuir (só pôr com fonte); a página não pode desmontar o palco nem o relógio da faixa ao trocar de rota.
Pendências menores, se couberem: os dois losangos da linha 4 do insertion acendendo juntos; o passo do K-means ser uma flor e as linhas de distância só acenderem tocando.
