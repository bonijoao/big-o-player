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

  const ESTRUTURAS = { vetor: Vetor, pilha: Pilha, ingenua: FilaIngenua, circular: FilaCircular };

  /** Roda uma operação e devolve o que ela devolveu, o que custou e os eventos. */
  function operar(e, chamada, args = []) {
    const r = e.reg;
    r.leituras = 0; r.escritas = 0; r.eventos = [];
    const volta = e[chamada](...args);
    return { volta: volta === undefined ? null : volta, leituras: r.leituras, escritas: r.escritas, eventos: r.eventos };
  }

  /** Estrutura `variante` com os valores 0, 1, …, n − 1 postos por `encher`. */
  function montar(variante, encher, n) {
    const e = ESTRUTURAS[variante]();
    for (let i = 0; i < n; i++) e[encher](i);
    return e;
  }

  const api = { Vetor, Pilha, FilaIngenua, FilaCircular, ESTRUTURAS, operar, montar };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else raiz.Instrumentos = api;
})(typeof window !== "undefined" ? window : globalThis);
