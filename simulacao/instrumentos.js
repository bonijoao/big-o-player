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
      // cheio: dobra e copia na ordem da fila, a partir da casa 0 (o Deque usa também)
      realocar() {
        const ini = e.inicio, cap = c.capacidade;
        c.realoca(2 * cap, e.n, (k) => (ini + k) % cap);
        e.inicio = 0;
      },
      lerCasa: (i) => c.le(i),
      escreverCasa: (i, x) => c.escreve(i, x),
      soltarCasa(i) {
        c.v[i] = null;                         // a casa volta a ficar livre (não conta)
        reg.eventos.push({ t: "libera", i });
      },
      enfileirar(x) {
        if (e.n === c.capacidade) e.realocar();
        c.escreve((e.inicio + e.n) % c.capacidade, x);
        e.n++;
      },
      desenfileirar() {
        const x = c.le(e.inicio);
        e.soltarCasa(e.inicio);
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

  // ---------- heap de mínimo sobre o vetor (instrumentos/heap/heap.py) ----------
  // Os valores são números ou pares comparados em ordem, como as tuplas do Python:
  // (gravidade, chegada) na fila de prioridade, (distância, vértice) no Dijkstra.

  function antes(a, b) {
    if (!Array.isArray(a)) return a < b;
    for (let k = 0; k < a.length; k++) if (a[k] !== b[k]) return a[k] < b[k];
    return false;
  }

  function Heap(reg = registro()) {
    const v = Vetor(reg);
    const subir = (i, x) => {
      while (i > 0) {
        const p = (i - 1) >> 1, y = v.ler(p);
        if (!antes(x, y)) break;
        v.escrever(i, y); v.escrever(p, x);
        i = p;
      }
    };
    const descer = (i, x) => {
      const n = v.n;
      while (2 * i + 1 < n) {
        let m = 2 * i + 1, xm = v.ler(m);
        if (m + 1 < n) { const xd = v.ler(m + 1); if (antes(xd, xm)) { m++; xm = xd; } }
        if (!antes(xm, x)) break;
        v.escrever(i, xm); v.escrever(m, x);
        i = m;
      }
    };
    const h = {
      reg,
      inserir(x) { v.anexar(x); subir(v.n - 1, x); },
      tirar() {
        const menor = v.ler(0), ult = v.remover(v.n - 1);
        if (v.n > 0) { v.escrever(0, ult); descer(0, ult); }
        return menor;
      },
      menor: () => v.ler(0),
      montar(valores) {
        for (const x of valores) v.anexar(x);
        for (let i = (v.n >> 1) - 1; i >= 0; i--) descer(i, v.ler(i));
      },
      inserir_todos(valores) { for (const x of valores) h.inserir(x); },
      valores: () => v.valores(),
      casas: () => v.casas(),
      get n() { return v.n; },
      get capacidade() { return v.capacidade; },
    };
    return h;
  }

  // ---------- deque circular (instrumentos/deque/deque.py) ----------

  function Deque(reg = registro()) {
    const d = FilaCircular(reg);
    // as casas da fila circular são internas: a demo lê o que precisa por casas() e reg.eventos
    const ultima = () => (d.inicio + d.n - 1) % d.capacidade;
    return Object.assign(d, {
      por_tras: d.enfileirar,
      tirar_frente: d.desenfileirar,
      frente: d.primeiro,
      por_frente(x) {
        if (d.n === d.capacidade) d.realocar();
        d.inicio = (d.inicio - 1 + d.capacidade) % d.capacidade;
        d.escreverCasa(d.inicio, x);
        d.n++;
      },
      tirar_tras() {
        const i = ultima(), x = d.lerCasa(i);
        d.soltarCasa(i);
        d.n--;
        return x;
      },
      fundo: () => d.lerCasa(ultima()),
    });
  }

  // ---------- listas encadeadas (instrumentos/lista/lista.py) ----------
  // As operações são as mesmas nas duas; cada uma diz o que é uma casa (le,
  // escreve) e o que é nulo. Os eventos dizem a casa (i na estática, o nó `no`
  // na dinâmica) e o campo (valor ou próx); "marca" avisa quando o início, o
  // fim ou a cabeça dos livres mudam, sem custo.

  function operacoesLista(e) {
    const id = (p) => (p !== null && typeof p === "object" ? p.id : p);   // na dinâmica, o nó vira o id dele
    const marca = () => e.reg.eventos.push({ t: "marca", inicio: id(e.inicio), fim: id(e.fim), livre: e.livre });
    const anda = (i) => { let p = e.inicio; for (let k = 0; k < i; k++) p = e.leProx(p); return p; };
    return Object.assign(e, {
      ler: (i) => e.leValor(anda(i)),
      inserir_inicio(x) {
        const c = e.nova(x);
        e.escreveProx(c, e.inicio);
        if (e.n === 0) e.fim = c;
        e.inicio = c; e.n++; marca();
      },
      inserir_fim(x) {
        const c = e.nova(x);
        e.escreveProx(c, e.NULO);
        if (e.n === 0) e.inicio = c; else e.escreveProx(e.fim, c);
        e.fim = c; e.n++; marca();
      },
      inserir(i, x) {
        if (i === 0) return e.inserir_inicio(x);
        if (i === e.n) return e.inserir_fim(x);
        const p = anda(i - 1), c = e.nova(x);
        e.escreveProx(c, e.leProx(p));
        e.escreveProx(p, c);
        e.n++; marca();
      },
      remover_inicio() {
        const c = e.inicio, x = e.leValor(c);
        e.inicio = e.leProx(c);
        e.devolve(c);
        e.n--;
        if (e.n === 0) e.fim = e.NULO;
        marca();
        return x;
      },
      remover(i) {
        if (i === 0) return e.remover_inicio();
        const p = anda(i - 1), c = e.leProx(p), x = e.leValor(c);
        e.escreveProx(p, e.leProx(c));
        if (c === e.fim) e.fim = p;
        e.devolve(c);
        e.n--; marca();
        return x;
      },
      buscar(x) {
        let p = e.inicio, k = 0;
        while (p !== e.NULO) {
          if (e.leValor(p) === x) return k;
          p = e.leProx(p); k++;
        }
        return -1;
      },
    });
  }

  function ListaEstatica(reg = registro()) {
    let valor = [null], prox = [-1];
    const ev = (o) => reg.eventos.push(o);
    const e = {
      reg, n: 0, inicio: -1, fim: -1, livre: 0, NULO: -1,
      leValor(i) { reg.leituras++; ev({ t: "le", i, campo: "valor" }); return valor[i]; },
      leProx(i) { reg.leituras++; ev({ t: "le", i, campo: "prox" }); return prox[i]; },
      escreveValor(i, x) { reg.escritas++; ev({ t: "escreve", i, campo: "valor", x }); valor[i] = x; },
      escreveProx(i, j) { reg.escritas++; ev({ t: "escreve", i, campo: "prox", x: j }); prox[i] = j; },
      // cheio: casas novas; copia cada casa no mesmo índice e encadeia as novas nos livres
      realoca(cap) {
        const velho = valor.length;
        ev({ t: "realoca", de: velho, para: cap });
        const nv = new Array(cap).fill(null), np = new Array(cap).fill(-1);
        for (let k = 0; k < velho; k++) {
          reg.leituras += 2; reg.escritas += 2;
          nv[k] = valor[k]; np[k] = prox[k];
          ev({ t: "copia", i: k });
        }
        valor = nv; prox = np;
        for (let k = velho; k < cap; k++) e.escreveProx(k, k + 1 < cap ? k + 1 : -1);
        e.livre = velho;
      },
      nova(x) {
        if (e.livre === -1) e.realoca(2 * valor.length);
        const c = e.livre;
        e.livre = e.leProx(c);
        e.escreveValor(c, x);
        return c;
      },
      devolve(c) {
        e.escreveProx(c, e.livre);
        valor[c] = null;                       // a casa volta a ficar livre (não conta)
        ev({ t: "libera", i: c });
        e.livre = c;
      },
      valores() { const v = []; for (let p = e.inicio; p !== -1; p = prox[p]) v.push(valor[p]); return v; },
      casas: () => ({ valor: valor.slice(), prox: prox.slice() }),
      get capacidade() { return 2 * valor.length; },
    };
    return operacoesLista(e);
  }

  function ListaDinamica(reg = registro()) {
    let criados = 0;
    const ev = (o) => reg.eventos.push(o);
    const e = {
      reg, n: 0, inicio: null, fim: null, livre: null, NULO: null,
      leValor(p) { reg.leituras++; ev({ t: "le", no: p.id, campo: "valor" }); return p.valor; },
      leProx(p) { reg.leituras++; ev({ t: "le", no: p.id, campo: "prox" }); return p.prox; },
      escreveValor(p, x) { reg.escritas++; ev({ t: "escreve", no: p.id, campo: "valor", x }); p.valor = x; },
      escreveProx(p, q) { reg.escritas++; ev({ t: "escreve", no: p.id, campo: "prox", x: q && q.id }); p.prox = q; },
      // aloca um nó sozinho (pedir memória não conta); o id é só o nome dele na demo
      nova(x) {
        const c = { id: criados++, valor: null, prox: null };
        ev({ t: "aloca", no: c.id });
        e.escreveValor(c, x);
        return c;
      },
      devolve(c) { ev({ t: "solta", no: c.id }); },
      valores() { const v = []; for (let p = e.inicio; p !== null; p = p.prox) v.push(p.valor); return v; },
      // os nós na ordem da lista: {id, valor, prox (o id do seguinte ou null)}
      nos() { const v = []; for (let p = e.inicio; p !== null; p = p.prox) v.push({ id: p.id, valor: p.valor, prox: p.prox && p.prox.id }); return v; },
      get capacidade() { return 2 * e.n; },
    };
    return operacoesLista(e);
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

  // ---------- dicionários (instrumentos/dicionario/dicionario.py) ----------
  // A casa de uma chave: os bits de cima de numero(chave) × 2654435769 (mod 2³²),
  // a dispersão multiplicativa de Knuth; numa palavra, numero() é o polinômio de
  // base 31 sobre os códigos das letras. Calcular a casa não conta, mas vira o
  // evento "dispersa" para a demo. Fora as leituras e escritas, o registro conta
  // `sondagens` (casas olhadas numa busca) e `comparacoes` (chaves comparadas).
  // A dobra (realoca … trocou) não é animada casa a casa: o "trocou" leva a foto
  // da tabela nova.

  function numero(chave) {
    if (typeof chave === "string") {
      let h = 0;
      for (const l of chave) h = (Math.imul(h, 31) + l.codePointAt(0)) >>> 0;
      return h;
    }
    return chave >>> 0;
  }
  const casaDe = (chave, bits) => (Math.imul(numero(chave), 0x9e3779b9) >>> 0) >>> (32 - bits);

  /** A i-ésima chave da medição: i embaralhado (o fmix32 do MurmurHash3, que não repete). */
  function chaveMedida(i) {
    let h = i >>> 0;
    h = (h ^ (h >>> 16)) >>> 0;
    h = Math.imul(h, 0x85ebca6b) >>> 0;
    h = (h ^ (h >>> 13)) >>> 0;
    h = Math.imul(h, 0xc2b2ae35) >>> 0;
    return (h ^ (h >>> 16)) >>> 0;
  }

  function registroDic() { return { leituras: 0, escritas: 0, sondagens: 0, comparacoes: 0, eventos: [] }; }

  // o que as duas versões têm em comum: crescer quando α passaria de 3/4, ler, ter, encher
  function operacoesDic(d) {
    return Object.assign(d, {
      cheia: () => !d.fixa && 4 * (d.usadas + 1) > 3 * d.m,
      tem: (chave) => d.acha(chave) !== null,
      ler(chave) { const p = d.acha(chave); return p === null ? null : d.leValor(p); },
      encher(i) { d.por(chaveMedida(i), i); },
      dispersa(chave) { const i = casaDe(chave, d.bits); d.reg.eventos.push({ t: "dispersa", chave, i, m: d.m }); return i; },
    });
  }

  function DicEncadeamento(reg = registroDic(), bits = 3, fixa = false) {
    let criados = 0, cabeca = new Array(2 ** bits).fill(null);
    const ev = (o) => reg.eventos.push(o);
    const d = {
      reg, bits, fixa, n: 0,
      get m() { return 2 ** d.bits; },
      get usadas() { return d.n; },
      leCabeca(i) { reg.leituras++; ev({ t: "le", onde: "cabeca", i }); return cabeca[i]; },
      escreveCabeca(i, p) { reg.escritas++; ev({ t: "escreve", onde: "cabeca", i, x: p && p.id }); cabeca[i] = p; },
      leChave(p) { reg.leituras++; ev({ t: "le", no: p.id, campo: "chave" }); return p.chave; },
      leValor(p) { reg.leituras++; ev({ t: "le", no: p.id, campo: "valor" }); return p.valor; },
      leProx(p) { reg.leituras++; ev({ t: "le", no: p.id, campo: "prox" }); return p.prox; },
      escreve(p, campo, x) { reg.escritas++; ev({ t: "escreve", no: p.id, campo, x: campo === "prox" ? x && x.id : x }); p[campo] = x; },
      acha(chave) {
        reg.sondagens++;
        let p = d.leCabeca(d.dispersa(chave));
        while (p !== null) {
          reg.sondagens++; reg.comparacoes++;
          if (d.leChave(p) === chave) return p;
          p = d.leProx(p);
        }
        return null;
      },
      por(chave, valor = chave) {
        const p = d.acha(chave);
        if (p !== null) { d.escreve(p, "valor", valor); return; }
        if (d.cheia()) d.crescer();
        const i = d.dispersa(chave);
        const c = { id: criados++, chave: null, valor: null, prox: null };   // pedir o nó à memória não conta
        ev({ t: "aloca", no: c.id });
        d.escreve(c, "chave", chave);
        d.escreve(c, "valor", valor);
        d.escreve(c, "prox", d.leCabeca(i));
        d.escreveCabeca(i, c);
        d.n++;
      },
      remover(chave) {
        const i = d.dispersa(chave);
        reg.sondagens++;
        let ant = null, p = d.leCabeca(i);
        while (p !== null) {
          reg.sondagens++; reg.comparacoes++;
          if (d.leChave(p) === chave) {
            const seg = d.leProx(p);
            if (ant === null) d.escreveCabeca(i, seg); else d.escreve(ant, "prox", seg);
            ev({ t: "solta", no: p.id });
            d.n--;
            return true;
          }
          ant = p; p = d.leProx(p);
        }
        return false;
      },
      crescer() {
        const velha = cabeca;
        ev({ t: "realoca", de: velha.length, para: 2 * velha.length });
        d.bits++;
        cabeca = new Array(d.m).fill(null);
        for (let i = 0; i < velha.length; i++) {
          reg.leituras++;
          let p = velha[i];
          while (p !== null) {
            const seg = d.leProx(p);
            const j = casaDe(d.leChave(p), d.bits);
            d.escreve(p, "prox", d.leCabeca(j));
            d.escreveCabeca(j, p);
            p = seg;
          }
        }
        ev({ t: "trocou", foto: d.foto() });
      },
      valores() { const v = []; for (let p of cabeca) for (; p !== null; p = p.prox) v.push([p.chave, p.valor]); return v; },
      // a tabela como a demo desenha: os inícios (ids) e cada nó {chave, valor, prox (id)}
      foto() {
        const nos = new Map();
        for (let p of cabeca) for (; p !== null; p = p.prox) nos.set(p.id, { chave: p.chave, valor: p.valor, prox: p.prox && p.prox.id });
        return { m: d.m, cabecas: cabeca.map((p) => p && p.id), nos };
      },
      get capacidade() { return d.m + 3 * d.n; },
    };
    return operacoesDic(d);
  }

  const LAPIDE = Object.freeze({ lapide: true });   // a casa de uma chave removida, na sondagem

  function DicSondagem(reg = registroDic(), bits = 3, fixa = false) {
    let chaves = new Array(2 ** bits).fill(null), valores = new Array(2 ** bits).fill(null);
    const ev = (o) => reg.eventos.push(o);
    const d = {
      reg, bits, fixa, n: 0, lapides: 0,
      get m() { return 2 ** d.bits; },
      get usadas() { return d.n + d.lapides; },
      leChave(i) { reg.leituras++; ev({ t: "le", i, campo: "chave" }); return chaves[i]; },
      leValor(i) { reg.leituras++; ev({ t: "le", i, campo: "valor" }); return valores[i]; },
      escreveChave(i, x) { reg.escritas++; ev({ t: "escreve", i, campo: "chave", x }); chaves[i] = x; },
      escreveValor(i, x) { reg.escritas++; ev({ t: "escreve", i, campo: "valor", x }); valores[i] = x; },
      // [a casa da chave ou -1, a casa onde ela entraria: a primeira lápide do caminho ou a vazia que encerrou]
      procura(chave) {
        let i = d.dispersa(chave), livre = -1;
        for (let k = 0; k < d.m; k++) {
          reg.sondagens++;
          const x = d.leChave(i);
          if (x === null) return [-1, livre < 0 ? i : livre];
          if (x === LAPIDE) { if (livre < 0) livre = i; }
          else { reg.comparacoes++; if (x === chave) return [i, livre]; }
          i = (i + 1) % d.m;
        }
        return [-1, livre];
      },
      acha(chave) { const i = d.procura(chave)[0]; return i < 0 ? null : i; },
      vaga(chave) { let i = casaDe(chave, d.bits); while (d.leChave(i) !== null) i = (i + 1) % d.m; return i; },
      por(chave, valor = chave) {
        let [i, livre] = d.procura(chave);
        if (i >= 0) { d.escreveValor(i, valor); return; }
        const reusa = livre >= 0 && chaves[livre] === LAPIDE;
        if (!reusa && d.cheia()) { d.crescer(); livre = d.vaga(chave); }
        if (livre < 0) throw new Error("a tabela fixa está cheia");
        d.escreveChave(livre, chave);
        d.escreveValor(livre, valor);
        if (reusa) d.lapides--;
        d.n++;
      },
      remover(chave) {
        const i = d.procura(chave)[0];
        if (i < 0) return false;
        d.escreveChave(i, LAPIDE);
        valores[i] = null;                       // o valor vai embora junto (não conta)
        d.n--; d.lapides++;
        return true;
      },
      crescer() {
        const ks = chaves, vs = valores;
        ev({ t: "realoca", de: ks.length, para: 2 * ks.length });
        d.bits++;
        chaves = new Array(d.m).fill(null); valores = new Array(d.m).fill(null);
        d.lapides = 0;
        for (let i = 0; i < ks.length; i++) {
          reg.leituras++;
          if (ks[i] === null || ks[i] === LAPIDE) continue;
          reg.leituras++;
          const j = d.vaga(ks[i]);
          d.escreveChave(j, ks[i]);
          d.escreveValor(j, vs[i]);
        }
        ev({ t: "trocou", foto: d.foto() });
      },
      valores() { const v = []; chaves.forEach((k, i) => { if (k !== null && k !== LAPIDE) v.push([k, valores[i]]); }); return v; },
      foto: () => ({ m: d.m, chaves: chaves.slice(), valores: valores.slice() }),
      get capacidade() { return 2 * d.m; },
    };
    return operacoesDic(d);
  }

  const ESTRUTURAS = { vetor: Vetor, pilha: Pilha, ingenua: FilaIngenua, circular: FilaCircular, deque: Deque, heap: Heap,
    estatica: ListaEstatica, dinamica: ListaDinamica, matriz: GrafoMatriz, lista: GrafoLista, incidencia: GrafoIncidencia,
    encadeamento: DicEncadeamento, sondagem: DicSondagem };

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

  const api = { Vetor, Pilha, FilaIngenua, FilaCircular, Deque, ListaEstatica, ListaDinamica, Heap, antes, GrafoMatriz, GrafoLista, GrafoIncidencia, anel,
    DicEncadeamento, DicSondagem, LAPIDE, casaDe, chaveMedida, registroDic, ESTRUTURAS, operar, montar };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else raiz.Instrumentos = api;
})(typeof window !== "undefined" ? window : globalThis);
