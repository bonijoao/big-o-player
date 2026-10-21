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

  const api = { ordenar, kmeans, entrada, centrosIniciais, ORDENACOES };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else raiz.Algoritmos = api;
})(typeof window !== "undefined" ? window : globalThis);
