// Os instrumentos (estruturas de dados) rodando no navegador, contando como
// em Python (instrumentos/*/): cada leitura e cada escrita de uma casa conta 1.
// Cada operação também devolve os eventos (lê, escreve, realoca, copia) para a
// demo animar. testes/conferir_js.mjs exige custos iguais aos do dados.json.
(function (raiz) {
  "use strict";

  // casas contíguas que contam o que se lê e o que se escreve
  function casas(capacidade, reg) {
    return {
      v: new Array(capacidade).fill(null),
      le(i) { reg.leituras++; reg.eventos.push({ t: "le", i }); return this.v[i]; },
      escreve(i, x) { reg.escritas++; reg.eventos.push({ t: "escreve", i, x }); this.v[i] = x; },
      // casas novas; copia n valores, o k-ésimo vindo de de(k): uma leitura e uma escrita cada
      realoca(capacidade, n, de) {
        const novas = new Array(capacidade).fill(null);
        reg.eventos.push({ t: "realoca", de: this.v.length, para: capacidade });
        for (let k = 0; k < n; k++) {
          const i = de(k);
          reg.leituras++; reg.escritas++;
          novas[k] = this.v[i];
          reg.eventos.push({ t: "copia", i, k, x: novas[k] });
        }
        this.v = novas;
        reg.eventos.push({ t: "trocou" });
      },
      get capacidade() { return this.v.length; },
    };
  }

  function registro() { return { leituras: 0, escritas: 0, eventos: [] }; }

  // ---------- vetor dinâmico (instrumentos/vetor/vetor.py) ----------

  function Vetor(reg = registro()) {
    const c = casas(1, reg);
    const e = {
      reg, n: 0,
      ler: (i) => c.le(i),
      escrever: (i, x) => { c.escreve(i, x); },
      anexar(x) {
        if (e.n === c.capacidade) c.realoca(2 * c.capacidade, e.n, (k) => k);
        c.escreve(e.n, x);
        e.n++;
      },
      inserir(i, x) {
        if (e.n === c.capacidade) c.realoca(2 * c.capacidade, e.n, (k) => k);
        for (let j = e.n; j > i; j--) c.escreve(j, c.le(j - 1));
        c.escreve(i, x);
        e.n++;
      },
      remover(i) {
        const x = c.le(i);
        for (let j = i; j < e.n - 1; j++) c.escreve(j, c.le(j + 1));
        e.n--;
        c.v[e.n] = null;                       // a casa volta a ficar livre (não conta)
        reg.eventos.push({ t: "libera", i: e.n });
        return x;
      },
      buscar(x) {
        for (let i = 0; i < e.n; i++) if (c.le(i) === x) return i;
        return -1;
      },
      valores: () => c.v.slice(0, e.n),
      casas: () => c.v.slice(),
      get capacidade() { return c.capacidade; },
    };
    return e;
  }

  // ---------- pilha sobre o vetor (instrumentos/pilha/pilha.py) ----------

  function Pilha(reg = registro()) {
    const v = Vetor(reg);
    return {
      reg,
      empilhar: (x) => { v.anexar(x); },
      desempilhar: () => v.remover(v.n - 1),
      topo: () => v.ler(v.n - 1),
      valores: () => v.valores(),
      casas: () => v.casas(),
      get n() { return v.n; },
      get capacidade() { return v.capacidade; },
    };
  }

  // ---------- filas (instrumentos/fila/fila.py) ----------

  function FilaIngenua(reg = registro()) {
    const v = Vetor(reg);
    return {
      reg,
      enfileirar: (x) => { v.anexar(x); },
      desenfileirar: () => v.remover(0),
      primeiro: () => v.ler(0),
      valores: () => v.valores(),
      casas: () => v.casas(),
      inicio: 0,
      get n() { return v.n; },
      get capacidade() { return v.capacidade; },
    };
  }

  function FilaCircular(reg = registro()) {
    const c = casas(1, reg);
    const e = {
      reg, n: 0, inicio: 0,
      enfileirar(x) {
        if (e.n === c.capacidade) {
          const ini = e.inicio, cap = c.capacidade;
          c.realoca(2 * cap, e.n, (k) => (ini + k) % cap);
          e.inicio = 0;
        }
        c.escreve((e.inicio + e.n) % c.capacidade, x);
        e.n++;
      },
      desenfileirar() {
        const x = c.le(e.inicio);
        c.v[e.inicio] = null;                  // a casa volta a ficar livre (não conta)
        reg.eventos.push({ t: "libera", i: e.inicio });
        e.inicio = (e.inicio + 1) % c.capacidade;
        e.n--;
        return x;
      },
      primeiro: () => c.le(e.inicio),
      valores: () => Array.from({ length: e.n }, (_, k) => c.v[(e.inicio + k) % c.capacidade]),
      casas: () => c.v.slice(),
      get capacidade() { return c.capacidade; },
    };
    return e;
  }

  // ---------- grafo em três vistas (instrumentos/grafo/grafo.py) ----------
  // Os eventos dizem a casa de cada vista: na matriz, (u, v); na lista, a
  // casa i do vetor do vértice `lista`; na incidência, a linha w da coluna j.

  const ordenadas = (as) => as.sort((p, q) => p[0] - q[0] || p[1] - q[1]);

  function GrafoMatriz(reg = registro(), V = 0) {
    const casas = new Array(V * V).fill(0);
    const le = (u, v) => { reg.leituras++; reg.eventos.push({ t: "le", u, v }); return casas[u * V + v]; };
    const escreve = (u, v, x) => { reg.escritas++; reg.eventos.push({ t: "escreve", u, v, x }); casas[u * V + v] = x; };
    const g = {
      reg, V, E: 0, casas,
      por(u, v) { escreve(u, v, 1); escreve(v, u, 1); g.E++; },
      tirar(u, v) {
        if (!casas[u * V + v]) throw new Error(`a aresta ${u}–${v} não existe`);   // conferir sem contar
        escreve(u, v, 0); escreve(v, u, 0); g.E--;
      },
      existe: (u, v) => le(u, v) === 1,
      vizinhos(u) { const viz = []; for (let v = 0; v < V; v++) if (le(u, v) === 1) viz.push(v); return viz; },
      grau(u) { let s = 0; for (let v = 0; v < V; v++) s += le(u, v); return s; },
      arestas() { const as = []; for (let u = 0; u < V; u++) for (let v = u + 1; v < V; v++) if (casas[u * V + v]) as.push([u, v]); return as; },
      valores: () => g.arestas(),
      get capacidade() { return casas.length; },
    };
    return g;
  }

  function GrafoLista(reg = registro(), V = 0) {
    // cada vértice tem o seu vetor; os custos somam no registro do grafo, e os eventos dizem de que lista são
    const sub = (u) => ({
      get leituras() { return reg.leituras; }, set leituras(x) { reg.leituras = x; },
      get escritas() { return reg.escritas; }, set escritas(x) { reg.escritas = x; },
      eventos: { push: (ev) => reg.eventos.push({ ...ev, lista: u }) },
    });
    const listas = Array.from({ length: V }, (_, u) => Vetor(sub(u)));
    const g = {
      reg, V, E: 0, listas,
      por(u, v) { listas[u].anexar(v); listas[v].anexar(u); g.E++; },
      tirar(u, v) {
        const i = listas[u].buscar(v);
        if (i < 0) throw new Error(`a aresta ${u}–${v} não existe`);
        listas[u].remover(i); listas[v].remover(listas[v].buscar(u)); g.E--;
      },
      existe: (u, v) => listas[u].buscar(v) >= 0,
      vizinhos: (u) => Array.from({ length: listas[u].n }, (_, i) => listas[u].ler(i)),
      vizinho: (u, i) => listas[u].ler(i),
      grau: (u) => listas[u].n,
      arestas: () => ordenadas(listas.flatMap((l, u) => l.valores().filter((v) => u < v).map((v) => [u, v]))),
      valores: () => g.arestas(),
      get capacidade() { return V + listas.reduce((s, l) => s + l.capacidade, 0); },
    };
    return g;
  }

  function GrafoIncidencia(reg = registro(), V = 0) {
    const colunas = [];
    const le = (w, j) => { reg.leituras++; reg.eventos.push({ t: "le", w, j }); return colunas[j][w]; };
    const escreve = (w, j, x) => { reg.escritas++; reg.eventos.push({ t: "escreve", w, j, x }); colunas[j][w] = x; };
    const outraPonta = (u, j) => { for (let w = 0; w < V; w++) if (w !== u && le(w, j) === 1) return w; return -1; };
    const coluna = (u, v) => { for (let j = 0; j < colunas.length; j++) if (le(u, j) === 1 && le(v, j) === 1) return j; return -1; };
    const g = {
      reg, V, colunas,
      get E() { return colunas.length; },
      por(u, v) {
        colunas.push(new Array(V).fill(null));
        reg.eventos.push({ t: "coluna", j: colunas.length - 1 });
        const j = colunas.length - 1;
        for (let w = 0; w < V; w++) escreve(w, j, w === u || w === v ? 1 : 0);
      },
      tirar(u, v) {
        const j = coluna(u, v), ult = colunas.length - 1;
        if (j < 0) throw new Error(`a aresta ${u}–${v} não existe`);
        if (j !== ult) for (let w = 0; w < V; w++) escreve(w, j, le(w, ult));
        colunas.pop();
        reg.eventos.push({ t: "tira", j: ult });
      },
      existe: (u, v) => coluna(u, v) >= 0,
      vizinhos(u) { const viz = []; for (let j = 0; j < colunas.length; j++) if (le(u, j) === 1) viz.push(outraPonta(u, j)); return viz; },
      grau(u) { let s = 0; for (let j = 0; j < colunas.length; j++) s += le(u, j); return s; },
      arestas: () => ordenadas(colunas.map((c) => c.flatMap((x, w) => (x ? [w] : [])))),
      valores: () => g.arestas(),
      get capacidade() { return V * colunas.length; },
    };
    return g;
  }

  /** O grafo de medição (grafo.anel): cada vértice ligado aos três seguintes, dando a volta. */
  function anel(V) {
    const vistas = new Set(), arestas = [];
    for (let i = 0; i < V; i++) for (const d of [1, 2, 3]) {
      const u = i, v = (i + d) % V, a = Math.min(u, v), b = Math.max(u, v);
      if (u !== v && !vistas.has(`${a},${b}`)) { vistas.add(`${a},${b}`); arestas.push([a, b]); }
    }
    return arestas;
  }

  const ESTRUTURAS = { vetor: Vetor, pilha: Pilha, ingenua: FilaIngenua, circular: FilaCircular,
    matriz: GrafoMatriz, lista: GrafoLista, incidencia: GrafoIncidencia };

  /** Roda uma operação e devolve o que ela devolveu, o que custou e os eventos. */
  function operar(e, chamada, args = []) {
    const r = e.reg;
    r.leituras = 0; r.escritas = 0; r.eventos = [];
    const volta = e[chamada](...args);
    return { volta: volta === undefined ? null : volta, leituras: r.leituras, escritas: r.escritas, eventos: r.eventos };
  }

  /** Estrutura `variante` com os valores 0, 1, …, n − 1 postos por `encher`;
   *  no grafo (encher = "anel"), n vértices e as arestas do anel. */
  function montar(variante, encher, n) {
    if (encher === "anel") {
      const g = ESTRUTURAS[variante](registro(), n);
      for (const [u, v] of anel(n)) g.por(u, v);
      return g;
    }
    const e = ESTRUTURAS[variante]();
    for (let i = 0; i < n; i++) e[encher](i);
    return e;
  }

  const api = { Vetor, Pilha, FilaIngenua, FilaCircular, GrafoMatriz, GrafoLista, GrafoIncidencia, anel, ESTRUTURAS, operar, montar };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else raiz.Instrumentos = api;
})(typeof window !== "undefined" ? window : globalThis);
