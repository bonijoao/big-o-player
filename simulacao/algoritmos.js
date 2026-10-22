// Os algoritmos rodando no navegador, instrumentados como em Python
// (motor/conta.py, motor/ordenacao.py): mesma variante, mesmas contagens.
// Cada evento traz `linha`, a linha do pseudocódigo da ficha em que o
// algoritmo está, para o painel de variáveis mostrar. testes/conferir_js.mjs exige
// contagens iguais às do Python nos vetores do dados.json. Cada evento leva
// também `vars`, as variáveis escalares da vez com o nome e a convenção do
// pseudocódigo (índices a partir de 1), para o painel de variáveis do palco.
(function (raiz) {
  "use strict";

  // ---------- contador ----------

  function contador() {
    return {
      ops: {}, vivos: {}, pico: 0, detalhe: {}, eventos: [],
      vars: {}, quadros: [], chamada: 0, seq: 0,   // a chamada aberta (variáveis e id); as de fora, na pilha
      op(nome) { this.ops[nome] = (this.ops[nome] || 0) + 1; },
      push(e) { this.eventos.push({ ...e, vars: { ...this.vars }, nivel: this.quadros.length, chamada: this.chamada }); },
      aloca(nome, tamanho) { this.vivos[nome] = tamanho; this._pico(); },
      // uma chamada recursiva: as variáveis dela começam com o trecho (a, b) do pseudocódigo
      entra(a, b, linha, vars) {
        this.vivos.pilha = (this.vivos.pilha || 0) + 1;
        this._pico();
        this.quadros.push({ vars: this.vars, chamada: this.chamada, linha });
        this.vars = vars;
        this.chamada = ++this.seq;
        this.push({ t: "entra", a, b, linha });
      },
      // o retorno já mostra quem chamou, na linha de onde a chamada partiu
      sai() {
        this.vivos.pilha -= 1;
        const q = this.quadros.pop();
        this.vars = q.vars;
        this.chamada = q.chamada;
        this.push({ t: "sai", linha: q.linha });
      },
      _pico() {
        const total = Object.values(this.vivos).reduce((s, x) => s + x, 0);
        if (total > this.pico) { this.pico = total; this.detalhe = { ...this.vivos }; }
      },
    };
  }

  // ---------- ajudantes das ordenações ----------

  // `parte`: qual condição da linha, quando um "e" a divide em dois losangos
  function maior(v, i, j, c, linha, onde = "v", parte) {
    c.op("comparacoes");
    c.push(parte === undefined ? { t: "compara", i, j, onde, linha } : { t: "compara", i, j, onde, linha, parte });
    return v[i] > v[j];
  }

  function troca(v, i, j, c, linha) {
    c.op("trocas");
    const x = v[i]; v[i] = v[j]; v[j] = x;
    c.push({ t: "troca", i, j, linha });
  }

  function escreve(v, k, x, c, onde, linha) {
    c.op("escritas");
    v[k] = x;
    c.push({ t: "escreve", k, x, onde, linha });
  }

  // ---------- ordenações (mesmas variantes do Python) ----------

  // eventos de controle: não contam, só mostram por onde o algoritmo passa
  const testa = (c, linha, parte) => c.push(parte === undefined ? { t: "testa", linha } : { t: "testa", linha, parte });

  function bolha(v, c) {
    const V = c.vars = { fim: null, i: null, trocou: null, "v[i]": null, "v[i + 1]": null };
    for (let fim = v.length - 1; fim >= 1; fim--) {
      let trocou = false;
      Object.assign(V, { fim, i: null, trocou, "v[i]": null, "v[i + 1]": null });
      for (let i = 0; i < fim; i++) {
        Object.assign(V, { i: i + 1, "v[i]": v[i], "v[i + 1]": v[i + 1] });
        if (maior(v, i, i + 1, c, 5)) {
          // o evento da troca já mostra os valores trocados, como as barras
          Object.assign(V, { trocou: (trocou = true), "v[i]": v[i + 1], "v[i + 1]": v[i] });
          troca(v, i, i + 1, c, 6);
        }
      }
      testa(c, 8);
      if (!trocou) { c.push({ t: "pare", linha: 9 }); break; }
    }
  }

  function insercao(v, c) {
    const V = c.vars = { i: null, j: null, "v[j − 1]": null, "v[j]": null };
    for (let i = 1; i < v.length; i++) {
      let j = i;
      Object.assign(V, { i: i + 1, j: j + 1, "v[j − 1]": v[j - 1], "v[j]": v[j] });
      // enquanto j > 1 e v[j−1] > v[j]: dois losangos, o segundo só se o primeiro deixar
      for (;;) {
        testa(c, 4, 0);
        if (!(j > 0) || !maior(v, j - 1, j, c, 4, "v", 1)) break;
        Object.assign(V, { "v[j − 1]": v[j], "v[j]": v[j - 1] });   // a troca já mostra os valores trocados
        troca(v, j - 1, j, c, 5);
        j--;
        Object.assign(V, { j: j + 1, "v[j − 1]": j > 0 ? v[j - 1] : null, "v[j]": v[j] });
      }
    }
  }

  function selecao(v, c) {
    const n = v.length;
    const V = c.vars = { i: null, m: null, j: null, "v[m]": null, "v[j]": null };
    for (let i = 0; i < n - 1; i++) {
      let m = i;
      Object.assign(V, { i: i + 1, m: m + 1, j: null, "v[m]": v[m], "v[j]": null });
      c.push({ t: "menor", m, linha: 3 });
      for (let j = i + 1; j < n; j++) {
        Object.assign(V, { j: j + 1, "v[j]": v[j] });
        if (maior(v, m, j, c, 5)) { m = j; Object.assign(V, { m: m + 1, "v[m]": v[m] }); c.push({ t: "menor", m, linha: 6 }); }
      }
      // o evento da troca já mostra o vetor trocado
      Object.assign(V, { j: null, "v[j]": null, "v[m]": v[i] });
      troca(v, i, m, c, 7);
    }
  }

  // trecho [a, b) do JS = de a + 1 até b no pseudocódigo; m é o mesmo nos dois
  function intercalacao(v, a, b, aux, c, linha) {
    const V = { a: a + 1, b, m: null, i: null, j: null, k: null };
    c.entra(a, b, linha, V);
    testa(c, 2);
    if (b - a > 1) {
      const m = Math.floor((a + b) / 2);
      V.m = m;
      c.push({ t: "atribui", linha: 3 });
      intercalacao(v, a, m, aux, c, 4);
      intercalacao(v, m, b, aux, c, 5);
      for (let k = a; k < b; k++) { V.k = k + 1; escreve(aux, k, v[k], c, "aux", 7); }
      let i = a, j = m, k = a;
      const anda = () => Object.assign(V, { i: i + 1, j: j + 1, k: k + 1 });
      anda();
      while (i < m && j < b) {
        if (maior(aux, i, j, c, 10, "aux")) { escreve(v, k, aux[j], c, "v", 11); j++; }
        else { escreve(v, k, aux[i], c, "v", 13); i++; }
        k++;
        anda();
      }
      while (i < m) { escreve(v, k, aux[i], c, "v", 16); i++; k++; anda(); }
      while (j < b) { escreve(v, k, aux[j], c, "v", 18); j++; k++; anda(); }
    }
    c.sai();
  }

  function rapida(v, a, b, c, linha) {
    const V = { a: a + 1, b, "pivô": null, i: null, j: null };
    c.entra(a, b, linha, V);
    testa(c, 2);
    if (b - a > 1) {
      const p = b - 1;
      V["pivô"] = v[p];
      c.push({ t: "pivo", p, linha: 3 });
      let i = a;
      V.i = i + 1;
      for (let j = a; j < b - 1; j++) {
        V.j = j + 1;
        if (maior(v, p, j, c, 6)) { troca(v, i, j, c, 7); i++; V.i = i + 1; }
      }
      V.j = null;
      troca(v, i, p, c, 9);
      rapida(v, a, i, c, 10);
      rapida(v, i + 1, b, c, 11);
    }
    c.sai();
  }

  const ORDENACOES = {
    bolha: { movimento: "trocas", ordenar: (v, c) => bolha(v, c) },
    insercao: { movimento: "trocas", ordenar: (v, c) => insercao(v, c) },
    selecao: { movimento: "trocas", ordenar: (v, c) => selecao(v, c) },
    intercalacao: {
      movimento: "escritas",
      ordenar(v, c) {
        const aux = new Array(v.length).fill(0);
        c.aloca("auxiliar", v.length);
        intercalacao(v, 0, v.length, aux, c, 1);
      },
    },
    rapida: { movimento: "trocas", ordenar: (v, c) => rapida(v, 0, v.length, c, 1) },
  };

  /** Roda uma ordenação numa cópia de `vetor` e devolve contagens e eventos. */
  function ordenar(nome, vetor) {
    const alg = ORDENACOES[nome];
    const c = contador();
    const v = vetor.slice();
    alg.ordenar(v, c);
    for (let i = 1; i < v.length; i++) if (v[i - 1] > v[i]) throw new Error(`${nome} não ordenou`);
    return {
      vetor: vetor.slice(), final: v, eventos: c.eventos, movimento: alg.movimento,
      comparacoes: c.ops.comparacoes || 0, movimentos: c.ops[alg.movimento] || 0,
      pico: c.pico, detalhe: c.detalhe,
    };
  }

  // ---------- K-means (Lloyd, como algoritmos/kmeans/kmeans.py) ----------

  function kmeans(pontos, iniciais, maxVoltas = 100) {
    const c = contador();
    const V = c.vars = { volta: null, i: null, j: null, d: null, menor: null, melhor: null, mudou: null };
    const k = iniciais.length;
    // a conta já aparece no painel no passo dela: `guarda` põe o valor em d ou em menor antes do evento
    const dist = (p, q, i, j, linha, guarda) => {
      c.op("distancias");
      const x = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2;
      guarda(x);
      c.push({ t: "dist", i, j, linha, x });
      return x;
    };
    const centros = iniciais.map((q) => q.slice());
    c.aloca("centros", 2 * k);
    const rotulos = new Array(pontos.length).fill(-1);
    c.aloca("rotulos", pontos.length);
    c.push({ t: "centros", centros: centros.map((q) => q.slice()), linha: 2 });
    let voltas = 0;
    for (let volta = 0; volta < maxVoltas; volta++) {
      voltas++;
      let mudou = false;
      Object.assign(V, { volta: volta + 1, i: null, j: null, d: null, menor: null, melhor: null, mudou });
      for (let i = 0; i < pontos.length; i++) {
        const p = pontos[i];
        let melhor = 0;
        Object.assign(V, { i: i + 1, j: 1, d: null, melhor: 1, menor: null });
        let menor = dist(p, centros[0], i, 0, 7, (x) => { V.menor = x; });
        for (let j = 1; j < k; j++) {
          V.j = j + 1;
          const d = dist(p, centros[j], i, j, 9, (x) => { V.d = x; });
          c.push({ t: "testa", linha: 10, i, j });
          if (d < menor) {
            melhor = j; menor = d;
            Object.assign(V, { melhor: j + 1, menor });
            c.push({ t: "atribui", linha: 11, i, j });
          }
        }
        const trocou = rotulos[i] !== melhor;
        if (trocou) { rotulos[i] = melhor; mudou = true; V.mudou = true; }
        c.push({ t: "rotulo", i, g: melhor, mudou: trocou, linha: trocou ? 13 : 12 });
      }
      c.push({ t: "volta", volta, mudou, linha: 14 });
      if (!mudou) break;
      const sx = new Array(k).fill(0), sy = new Array(k).fill(0), cont = new Array(k).fill(0);
      c.aloca("soma_x", k); c.aloca("soma_y", k); c.aloca("contagens", k);
      for (let i = 0; i < pontos.length; i++) {
        const j = rotulos[i];
        sx[j] += pontos[i][0]; sy[j] += pontos[i][1]; cont[j] += 1;
      }
      for (let j = 0; j < k; j++) if (cont[j] > 0) centros[j] = [sx[j] / cont[j], sy[j] / cont[j]];
      c.push({ t: "centros", centros: centros.map((q) => q.slice()), linha: 21 });
    }
    return {
      eventos: c.eventos, rotulos, centros, voltas, distancias: c.ops.distancias || 0,
      pico: c.pico, detalhe: c.detalhe,
    };
  }

  // ---------- buscas (motor/busca.py) ----------
  // o vetor guarda pares; cada comparação de uma casa com o alvo conta 1

  function buscar(nome, vetor, alvo) {
    const c = contador(), v = vetor;
    const igual = (i, linha) => { c.op("comparacoes"); c.push({ t: "compara", i, op: "=", linha }); return v[i] === alvo; };
    const menor = (i, linha) => { c.op("comparacoes"); c.push({ t: "compara", i, op: "<", linha }); return v[i] < alvo; };
    let achou = -1;
    if (nome === "sequencial") {
      const V = c.vars = { alvo, i: null, "v[i]": null, achou: 0 };
      for (let i = 0; i < v.length; i++) {
        Object.assign(V, { i: i + 1, "v[i]": v[i] });
        if (igual(i, 4)) { achou = i; V.achou = i + 1; c.push({ t: "achou", i, linha: 5 }); c.push({ t: "pare", linha: 6 }); break; }
      }
      c.push({ t: "devolva", linha: 7 });
    } else {
      let a = 0, b = v.length - 1;
      const V = c.vars = { alvo, a: a + 1, b: b + 1, m: null, "v[m]": null, achou: 0 };
      c.push({ t: "corta", a, b, linha: 2 });
      for (;;) {
        c.push({ t: "testa", linha: 3 });
        if (!(a <= b)) break;
        const m = Math.floor((a + b) / 2);
        Object.assign(V, { m: m + 1, "v[m]": v[m] });
        c.push({ t: "meio", m, linha: 4 });
        if (igual(m, 5)) { achou = m; V.achou = m + 1; c.push({ t: "achou", i: m, linha: 6 }); c.push({ t: "pare", linha: 7 }); break; }
        else if (menor(m, 8)) { a = m + 1; V.a = a + 1; c.push({ t: "corta", a, b, linha: 9 }); }
        else { b = m - 1; V.b = b + 1; c.push({ t: "corta", a, b, linha: 11 }); }
      }
      c.push({ t: "devolva", linha: 12 });
    }
    const certo = v.indexOf(alvo);
    if (achou !== certo) throw new Error(`${nome} achou ${achou}, devia ${certo}`);
    return { vetor: v, alvo, posicao: achou, eventos: c.eventos, comparacoes: c.ops.comparacoes || 0, pico: c.pico };
  }

  // ---------- estruturas lineares: as classes do instrumento (simulacao/instrumentos.js) ----------

  const instrumentos = () => (typeof module !== "undefined" && module.exports ? require("./instrumentos.js") : raiz.Instrumentos);
  const ABRE = "([{", PAR = { ")": "(", "]": "[", "}": "{" };

  /** Parênteses balanceados (algoritmos/parenteses/parenteses.py), com a Pilha do instrumento. */
  function parenteses(texto) {
    const c = contador(), pilha = instrumentos().Pilha();
    // s e topo são símbolos (texto de um caractere); da pilha, só o tamanho (os símbolos aparecem na animação)
    const V = c.vars = { s: null, topo: null, certo: true, "tamanho da pilha": 0 };
    let certo = true;
    for (let k = 0; k < texto.length; k++) {
      const s = texto[k];
      Object.assign(V, { s, topo: null });
      c.push({ t: "le", k, s, linha: 3 });
      if (ABRE.includes(s)) {
        c.op("empilhar"); pilha.empilhar(s); c.aloca("simbolos", pilha.n); V["tamanho da pilha"] = pilha.n;
        c.push({ t: "empilha", k, s, linha: 5 });
        continue;
      }
      c.push({ t: "testa", linha: 6 });
      if (pilha.n === 0) { certo = false; V.certo = false; c.push({ t: "erro", k, motivo: "vazia", linha: 7 }); c.push({ t: "pare", linha: 8 }); break; }
      c.op("desempilhar"); const topo = pilha.desempilhar(); c.aloca("simbolos", pilha.n);
      Object.assign(V, { topo, "tamanho da pilha": pilha.n });
      c.push({ t: "desempilha", k, s: topo, linha: 10 });
      c.op("comparacoes");
      c.push({ t: "compara", k, topo, s, linha: 11 });
      if (topo !== PAR[s]) { certo = false; V.certo = false; c.push({ t: "erro", k, motivo: "par", linha: 12 }); c.push({ t: "pare", linha: 13 }); break; }
    }
    c.push({ t: "testa", linha: 14 });
    if (pilha.n > 0) { certo = false; V.certo = false; c.push({ t: "erro", k: texto.length, motivo: "sobra", linha: 15 }); }
    c.push({ t: "devolva", certo, linha: 16 });
    return { texto, certo, eventos: c.eventos, ops: (c.ops.empilhar || 0) + (c.ops.desempilhar || 0),
      comparacoes: c.ops.comparacoes || 0, pico: c.pico, casas: pilha.reg.leituras + pilha.reg.escritas, sobra: pilha.n };
  }

  /** Fila de atendimento (algoritmos/atendimento/atendimento.py), com a Fila circular do instrumento. */
  function atendimento(chegada, duracao) {
    const c = contador(), fila = instrumentos().FilaCircular(), n = chegada.length;
    const esperas = new Array(n).fill(null);
    let livre = 0, soma = 0, maior = 0, i = 0;
    // índices de cliente a partir de 1, como no pseudocódigo; da fila, só o tamanho (quem espera aparece na animação)
    const V = c.vars = { atendimento: null, i: 1, k: null, livre: 0, "início": null, soma: 0, maior: 0, "tamanho da fila": 0 };
    for (let volta = 0; volta < n; volta++) {
      Object.assign(V, { atendimento: volta + 1, k: null, "início": null });
      for (;;) {
        c.push({ t: "testa", linha: 5 });
        if (!(i < n && chegada[i] < livre)) break;
        c.op("enfileirar"); fila.enfileirar(i); c.aloca("fila", fila.n);
        V["tamanho da fila"] = fila.n;
        c.push({ t: "enfileira", i, tempo: chegada[i], casas: fila.casas(), inicio: fila.inicio, linha: 6 });
        i++;
        V.i = i + 1;
        maior = Math.max(maior, fila.n);
        V.maior = maior;
        c.push({ t: "maior", maior, linha: 7 });
      }
      c.push({ t: "testa", linha: 8 });
      let k;
      if (fila.n > 0) {
        c.op("desenfileirar"); k = fila.desenfileirar(); c.aloca("fila", fila.n);
        Object.assign(V, { k: k + 1, "tamanho da fila": fila.n });
        c.push({ t: "chama", k, tempo: livre, casas: fila.casas(), inicio: fila.inicio, linha: 9 });
      } else {
        k = i; i++;
        Object.assign(V, { k: k + 1, i: i + 1 });
        c.push({ t: "direto", k, tempo: chegada[k], linha: 11 });
      }
      const inicio = Math.max(livre, chegada[k]);
      esperas[k] = inicio - chegada[k];
      soma += esperas[k];
      livre = inicio + duracao[k];
      Object.assign(V, { "início": inicio, soma, livre });
      c.push({ t: "atende", k, inicio, fim: livre, espera: esperas[k], linha: 12 });
    }
    c.push({ t: "devolva", linha: 15 });
    return { chegada, duracao, eventos: c.eventos, soma, maior, esperas, pico: c.pico,
      ops: (c.ops.enfileirar || 0) + (c.ops.desenfileirar || 0), casas: fila.reg.leituras + fila.reg.escritas };
  }

  /** Inverter lista encadeada (algoritmos/inverter/inverter.py), sobre a Lista dinâmica do instrumento.
   *  Os nós nascem na ordem da lista, então o id de cada um é a posição dele na lista de entrada. */
  function inverter(valores) {
    const c = contador(), lista = instrumentos().ListaDinamica();
    for (const x of valores) lista.inserir_fim(x);
    const reg = lista.reg;
    reg.leituras = 0; reg.escritas = 0; reg.eventos = [];   // a entrada é montada fora da conta
    const pos = (p) => (p === null ? null : p.id + 1);       // posições a partir de 1, como no pseudocódigo
    const V = c.vars = { anterior: null, atual: null, "próximo": null, "ponteiros trocados": 0 };
    let anterior = null;
    c.push({ t: "atribui", linha: 2 });
    let atual = lista.inicio;
    V.atual = pos(atual);
    c.push({ t: "atribui", linha: 3 });
    for (;;) {
      c.push({ t: "testa", linha: 4 });
      if (atual === null) break;
      const proximo = lista.leProx(atual);
      V["próximo"] = pos(proximo);
      c.push({ t: "proximo", i: atual.id, linha: 5 });
      lista.escreveProx(atual, anterior);
      c.op("ponteiros");
      V["ponteiros trocados"]++;
      c.push({ t: "vira", i: atual.id, de: anterior === null ? null : anterior.id, linha: 6 });
      anterior = atual;
      V.anterior = pos(anterior);
      c.push({ t: "atribui", linha: 7 });
      atual = proximo;
      V.atual = pos(atual);
      c.push({ t: "atribui", linha: 8 });
    }
    lista.fim = lista.inicio;
    c.push({ t: "atribui", linha: 9 });
    lista.inicio = anterior;
    c.push({ t: "atribui", fim: true, linha: 10 });
    return { valores, invertida: lista.valores(), eventos: c.eventos, ops: c.ops.ponteiros || 0, pico: c.pico,
      casas: reg.leituras + reg.escritas };
  }

  /** Máximo em janela deslizante (algoritmos/janela/janela.py), sobre o Deque do instrumento, que guarda posições. */
  function janela(v, k) {
    const c = contador(), d = instrumentos().Deque(), n = v.length, maximos = [];
    // do deque, o painel mostra as pontas e o tamanho, lidos sem contar (as posições aparecem na animação)
    const V = c.vars = { i: null, "v[i]": null, frente: null, fundo: null, "tamanho do deque": 0, "máximo": null };
    const pontas = () => {
      const p = d.valores();
      Object.assign(V, { frente: p.length ? p[0] + 1 : null, fundo: p.length ? p[p.length - 1] + 1 : null, "tamanho do deque": p.length });
      c.aloca("posicoes", p.length);
    };
    c.push({ t: "atribui", linha: 2 });
    for (let i = 0; i < n; i++) {
      Object.assign(V, { i: i + 1, "v[i]": v[i] });
      c.push({ t: "le", i, linha: 3 });
      c.push({ t: "testa", linha: 4 });
      if (i >= k && d.frente() === i - k) {
        const j = d.tirar_frente(); c.op("deque"); pontas();
        c.push({ t: "tira", j, ponta: "frente", linha: 5 });
      }
      for (;;) {
        if (d.n === 0) { c.push({ t: "testa", linha: 6 }); break; }
        const j = d.fundo();
        c.op("comparacoes");
        c.push({ t: "compara", i, j, linha: 6 });
        if (!(v[j] <= v[i])) break;
        d.tirar_tras(); c.op("deque"); pontas();
        c.push({ t: "tira", j, ponta: "fundo", linha: 7 });
      }
      d.por_tras(i); c.op("deque"); pontas();
      c.push({ t: "poe", i, linha: 8 });
      c.push({ t: "testa", linha: 9 });
      if (i >= k - 1) {
        const m = v[d.frente()];
        maximos.push(m);
        V["máximo"] = m;
        c.push({ t: "maximo", i, m, linha: 10 });
      }
    }
    c.push({ t: "devolva", linha: 11 });
    const ing = janelaIngenua(v, k);
    if (JSON.stringify(ing.maximos) !== JSON.stringify(maximos)) throw new Error("o deque e o ingênuo discordam");
    return { vetor: v, k, maximos, eventos: c.eventos, ops: c.ops.comparacoes || 0, deque: c.ops.deque || 0,
      ingenuo: ing.comparacoes, ingenuoAte: ing.ate, pico: c.pico, casas: d.reg.leituras + d.reg.escritas };
  }

  /** O ingênuo da janela: k − 1 comparações por janela. `ate[a]`: as comparações até a janela a (inclusive). */
  function janelaIngenua(v, k) {
    const maximos = [], ate = [];
    let comparacoes = 0;
    for (let a = 0; a + k <= v.length; a++) {
      let m = v[a];
      for (let j = a + 1; j < a + k; j++) { comparacoes++; if (v[j] > m) m = v[j]; }
      maximos.push(m);
      ate.push(comparacoes);
    }
    return { maximos, comparacoes, ate };
  }

  // ---------- grafos (algoritmos/largura, algoritmos/profundidade) ----------

  // a lista de adjacência do instrumento Grafo, montada sem entrar na conta
  function listaDe(V, arestas) {
    const g = instrumentos().GrafoLista(undefined, V);
    for (const [u, v] of arestas) g.por(u, v);
    g.reg.leituras = 0; g.reg.escritas = 0; g.reg.eventos = [];
    return g;
  }
  const rotulo = (v) => (v === null ? null : v + 1);   // vértices a partir de 1, como no pseudocódigo

  /** Busca em largura a partir do vértice 0, com a Fila circular do instrumento. */
  function largura(V, arestas) {
    const c = contador(), g = listaDe(V, arestas), fila = instrumentos().FilaCircular();
    const dist = new Array(V).fill(null);       // null = ∞, ainda não visto
    c.aloca("dist", V);
    const d = (x) => (x === null ? "∞" : x);
    const vars = c.vars = { u: null, v: null, "dist[u]": null, "dist[v]": null, "tamanho da fila": 0 };
    const enfileira = (v, linha) => {
      c.op("enfileirar"); fila.enfileirar(v); c.aloca("fila", fila.n); vars["tamanho da fila"] = fila.n;
      c.push({ t: "enfileira", v, linha });
    };
    c.push({ t: "atribui", linha: 2 });
    dist[0] = 0;
    enfileira(0, 3);
    const visitas = [];
    for (;;) {
      c.push({ t: "testa", linha: 4 });
      if (fila.n === 0) break;
      c.op("desenfileirar"); const u = fila.desenfileirar(); c.aloca("fila", fila.n);
      visitas.push(u);
      Object.assign(vars, { u: rotulo(u), v: null, "dist[u]": dist[u], "dist[v]": null, "tamanho da fila": fila.n });
      c.push({ t: "visita", u, linha: 5 });
      for (let i = 0; i < g.grau(u); i++) {
        c.op("vizinhos"); const v = g.vizinho(u, i);
        Object.assign(vars, { v: rotulo(v), "dist[v]": d(dist[v]) });
        c.push({ t: "olha", u, v, linha: 6 });
        c.push({ t: "compara", v, linha: 7 });
        if (dist[v] === null) {
          dist[v] = dist[u] + 1;
          vars["dist[v]"] = dist[v];
          c.push({ t: "atribui", v, d: dist[v], linha: 8 });
          enfileira(v, 9);
        }
      }
    }
    c.push({ t: "devolva", linha: 10 });
    return { V, arestas, dist, visitas, eventos: c.eventos, pico: c.pico, estrutura: c.pico - V,
      ops: (c.ops.enfileirar || 0) + (c.ops.desenfileirar || 0) + (c.ops.vizinhos || 0),
      casas: g.reg.leituras + g.reg.escritas + fila.reg.leituras + fila.reg.escritas };
  }

  /** Busca em profundidade a partir do vértice 0: topo + próximo vizinho, com a Pilha do instrumento. */
  function profundidade(V, arestas) {
    const c = contador(), g = listaDe(V, arestas), pilha = instrumentos().Pilha();
    const ordem = new Array(V).fill(0), proximo = new Array(V).fill(0);
    c.aloca("ordem", V); c.aloca("proximo", V);
    // próximo[u] a partir de 1, como no pseudocódigo
    const vars = c.vars = { u: null, v: null, "próximo[u]": null, "grau(u)": null, "ordem[v]": null, k: null, "tamanho da pilha": 0 };
    const empilha = (v, linha) => {
      c.op("empilhar"); pilha.empilhar(v); c.aloca("pilha", pilha.n); vars["tamanho da pilha"] = pilha.n;
      c.push({ t: "empilha", v, linha });
    };
    c.push({ t: "atribui", linha: 2 });
    let k = 1;
    ordem[0] = k;
    vars.k = k;
    empilha(0, 3);
    const visitas = [0];
    for (;;) {
      c.push({ t: "testa", linha: 4 });
      if (pilha.n === 0) break;
      c.op("topo"); const u = pilha.topo();
      Object.assign(vars, { u: rotulo(u), v: null, "próximo[u]": proximo[u] + 1, "grau(u)": g.grau(u), "ordem[v]": null });
      c.push({ t: "topo", u, linha: 5 });
      c.push({ t: "testa", linha: 6 });
      if (proximo[u] < g.grau(u)) {
        c.op("vizinhos"); const v = g.vizinho(u, proximo[u]);
        Object.assign(vars, { v: rotulo(v), "ordem[v]": ordem[v] });
        c.push({ t: "olha", u, v, linha: 7 });
        proximo[u]++;
        vars["próximo[u]"] = proximo[u] + 1;
        c.push({ t: "avanca", u, linha: 8 });
        c.push({ t: "compara", v, linha: 9 });
        if (ordem[v] === 0) {
          k++; ordem[v] = k;
          Object.assign(vars, { k, "ordem[v]": k });
          c.push({ t: "atribui", v, k, linha: 10 });
          empilha(v, 11);
          visitas.push(v);
        }
      } else {
        c.op("desempilhar"); pilha.desempilhar(); c.aloca("pilha", pilha.n); vars["tamanho da pilha"] = pilha.n;
        c.push({ t: "desempilha", u, linha: 13 });
      }
    }
    c.push({ t: "devolva", linha: 14 });
    return { V, arestas, ordem, visitas, eventos: c.eventos, pico: c.pico, estrutura: c.pico - 2 * V,
      ops: (c.ops.empilhar || 0) + (c.ops.desempilhar || 0) + (c.ops.topo || 0) + (c.ops.vizinhos || 0),
      casas: g.reg.leituras + g.reg.escritas + pilha.reg.leituras + pilha.reg.escritas };
  }

  // ---------- entradas ----------

  // gerador com semente (mulberry32): o mesmo número de sorteio dá o mesmo vetor
  function sorteador(semente) {
    let a = semente >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function entrada(n, tipo, semente) {
    const v = Array.from({ length: n }, (_, i) => i);
    if (tipo === "ordenado") return v;
    if (tipo === "invertido") return v.reverse();
    const r = sorteador(semente);
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const x = v[i]; v[i] = v[j]; v[j] = x; }
    return v;
  }

  /** k pontos sorteados como centros iniciais, em posições distintas. */
  function centrosIniciais(pontos, k, semente) {
    const r = sorteador(semente);
    for (;;) {
      const idx = [];
      while (idx.length < k) { const i = Math.floor(r() * pontos.length); if (!idx.includes(i)) idx.push(i); }
      if (new Set(idx.map((i) => pontos[i].join(","))).size === k) return idx;
    }
  }

  /** Busca: os pares 0, 2, …, 2(n − 1) (embaralhados se a busca não precisa
   *  de ordem) e o alvo do caso: o primeiro, o último, um ímpar ausente ou um sorteado. */
  function entradaBusca(n, ordenado, caso, semente) {
    const v = Array.from({ length: n }, (_, k) => 2 * k);
    const r = sorteador(semente);
    if (!ordenado) for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const x = v[i]; v[i] = v[j]; v[j] = x; }
    const alvo = caso === "comeco" ? v[0] : caso === "fim" ? v[n - 1]
      : caso === "ausente" ? 2 * Math.floor(r() * (n + 1)) - 1 : v[Math.floor(r() * n)];
    return { vetor: v, alvo };
  }

  /** Texto de n símbolos (n par), como algoritmos/parenteses/parenteses.py:gerar. */
  function textoParenteses(n, caso, semente) {
    if (n % 2) throw new Error("o texto precisa de um número par de símbolos");
    const r = sorteador(semente), FECHA = { "(": ")", "[": "]", "{": "}" }, escolhe = (s) => s[Math.floor(r() * s.length)];
    if (caso === "so_abre") return Array.from({ length: n }, () => escolhe(ABRE)).join("");
    const t = [], pilha = [];
    for (let k = 0; k < n; k++) {
      if (pilha.length && (pilha.length === n - k || r() < 0.5)) t.push(FECHA[pilha.pop()]);
      else { const a = escolhe(ABRE); pilha.push(a); t.push(a); }
    }
    if (caso === "par_errado") {
      const fechas = t.map((s, k) => (s in PAR ? k : -1)).filter((k) => k >= 0), j = escolhe(fechas);
      t[j] = escolhe(Object.keys(PAR).filter((f) => f !== t[j]));
    } else if (caso === "sobra_aberto") t[n - 1] = escolhe(ABRE);
    return t.join("");
  }

  /** n clientes: o minuto em que cada um chega e quanto demora, com os intervalos do movimento. */
  function clientes(n, movimento, semente) {
    const r = sorteador(semente), entre = ([a, b]) => a + Math.floor(r() * (b - a + 1));
    const chegada = [], duracao = [];
    let t = 0;
    for (let k = 0; k < n; k++) { t += entre(movimento.chegada); chegada.push(t); }
    for (let k = 0; k < n; k++) duracao.push(entre(movimento.atendimento));
    return { chegada, duracao };
  }

  /** n valores de 10 a 99, como algoritmos/janela/janela.py:gerar (com outro sorteador): sorteados
   *  (podem repetir), crescentes ou decrescentes (sem repetir). A lista da inversão usa os sorteados. */
  function valoresSorteados(n, caso, semente) {
    const r = sorteador(semente);
    if (caso === "sorteada") return Array.from({ length: n }, () => 10 + Math.floor(r() * 90));
    const faixa = Array.from({ length: 90 }, (_, i) => 10 + i);
    for (let i = faixa.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const x = faixa[i]; faixa[i] = faixa[j]; faixa[j] = x; }
    const v = faixa.slice(0, n).sort((a, b) => a - b);
    return caso === "crescente" ? v : v.reverse();
  }

  /** As arestas de um grafo em grade k × k, como motor/grade.py:gerar (com outro sorteador):
   *  a grade cheia, um sorteado conexo (árvore que cobre a grade + cada aresta que sobra com chance 1/3)
   *  ou o caminho em serpentina que começa no vértice 0. */
  function grafoGrade(k, caso, semente) {
    const todas = [];
    for (let u = 0; u < k * k; u++) {
      if ((u % k) + 1 < k) todas.push([u, u + 1]);
      if (Math.floor(u / k) + 1 < k) todas.push([u, u + k]);
    }
    const ordena = (as) => as.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
    if (caso === "grade") return ordena(todas);
    if (caso === "caminho") {
      const ordem = [];
      for (let l = 0; l < k; l++) for (let c = 0; c < k; c++) ordem.push(l * k + (l % 2 ? k - 1 - c : c));
      return ordena(ordem.slice(1).map((v, i) => [Math.min(ordem[i], v), Math.max(ordem[i], v)]));
    }
    const r = sorteador(semente), pai = Array.from({ length: k * k }, (_, i) => i);
    const raiz = (x) => { while (pai[x] !== x) { pai[x] = pai[pai[x]]; x = pai[x]; } return x; };
    for (let i = todas.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const x = todas[i]; todas[i] = todas[j]; todas[j] = x; }
    const escolhidas = [];
    for (const [u, v] of todas) {
      const a = raiz(u), b = raiz(v);
      if (a !== b) { pai[a] = b; escolhidas.push([u, v]); } else if (r() < 1 / 3) escolhidas.push([u, v]);
    }
    return ordena(escolhidas);
  }

  const api = { ordenar, kmeans, buscar, parenteses, atendimento, inverter, janela, janelaIngenua, largura, profundidade, entrada, valoresSorteados, entradaBusca, textoParenteses, clientes, grafoGrade, centrosIniciais, ORDENACOES };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else raiz.Algoritmos = api;
})(typeof window !== "undefined" ? window : globalThis);
