// Os algoritmos rodando no navegador, instrumentados como em Python
// (motor/conta.py, motor/ordenacao.py): mesma variante, mesmas contagens.
// Cada evento traz `linha`, a linha do pseudocódigo da ficha em que o
// algoritmo está, para o fluxograma acender. testes/conferir_js.mjs exige
// contagens iguais às do Python nos vetores do dados.json.
(function (raiz) {
  "use strict";

  // ---------- contador ----------

  function contador() {
    return {
      ops: {}, vivos: {}, pico: 0, detalhe: {}, eventos: [],
      op(nome) { this.ops[nome] = (this.ops[nome] || 0) + 1; },
      aloca(nome, tamanho) { this.vivos[nome] = tamanho; this._pico(); },
      entra(a, b, linha) {
        this.vivos.pilha = (this.vivos.pilha || 0) + 1;
        this._pico();
        this.eventos.push({ t: "entra", a, b, linha });
      },
      sai() { this.vivos.pilha -= 1; this.eventos.push({ t: "sai" }); },
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
    c.eventos.push(parte === undefined ? { t: "compara", i, j, onde, linha } : { t: "compara", i, j, onde, linha, parte });
    return v[i] > v[j];
  }

  function troca(v, i, j, c, linha) {
    c.op("trocas");
    const x = v[i]; v[i] = v[j]; v[j] = x;
    c.eventos.push({ t: "troca", i, j, linha });
  }

  function escreve(v, k, x, c, onde, linha) {
    c.op("escritas");
    v[k] = x;
    c.eventos.push({ t: "escreve", k, x, onde, linha });
  }

  // ---------- ordenações (mesmas variantes do Python) ----------

  // eventos de controle: não contam, só mostram por onde o algoritmo passa
  const testa = (c, linha, parte) => c.eventos.push(parte === undefined ? { t: "testa", linha } : { t: "testa", linha, parte });

  function bolha(v, c) {
    for (let fim = v.length - 1; fim >= 1; fim--) {
      let trocou = false;
      for (let i = 0; i < fim; i++) {
        if (maior(v, i, i + 1, c, 5)) { troca(v, i, i + 1, c, 6); trocou = true; }
      }
      testa(c, 8);
      if (!trocou) { c.eventos.push({ t: "pare", linha: 9 }); break; }
    }
  }

  function insercao(v, c) {
    for (let i = 1; i < v.length; i++) {
      let j = i;
      // enquanto j > 1 e v[j−1] > v[j]: dois losangos, o segundo só se o primeiro deixar
      for (;;) {
        testa(c, 4, 0);
        if (!(j > 0) || !maior(v, j - 1, j, c, 4, "v", 1)) break;
        troca(v, j - 1, j, c, 5);
        j--;
      }
    }
  }

  function intercalacao(v, a, b, aux, c, linha) {
    c.entra(a, b, linha);
    testa(c, 2);
    if (b - a > 1) {
      const m = Math.floor((a + b) / 2);
      intercalacao(v, a, m, aux, c, 4);
      intercalacao(v, m, b, aux, c, 5);
      for (let k = a; k < b; k++) escreve(aux, k, v[k], c, "aux", 7);
      let i = a, j = m, k = a;
      while (i < m && j < b) {
        if (maior(aux, i, j, c, 10, "aux")) { escreve(v, k, aux[j], c, "v", 11); j++; }
        else { escreve(v, k, aux[i], c, "v", 13); i++; }
        k++;
      }
      while (i < m) { escreve(v, k, aux[i], c, "v", 16); i++; k++; }
      while (j < b) { escreve(v, k, aux[j], c, "v", 18); j++; k++; }
    }
    c.sai();
  }

  function rapida(v, a, b, c, linha) {
    c.entra(a, b, linha);
    testa(c, 2);
    if (b - a > 1) {
      const p = b - 1;
      c.eventos.push({ t: "pivo", p, linha: 3 });
      let i = a;
      for (let j = a; j < b - 1; j++) {
        if (maior(v, p, j, c, 6)) { troca(v, i, j, c, 7); i++; }
      }
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
    const k = iniciais.length;
    const dist = (p, q, i, j, linha) => {
      c.op("distancias");
      c.eventos.push({ t: "dist", i, j, linha });
      return (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2;
    };
    const centros = iniciais.map((q) => q.slice());
    c.aloca("centros", 2 * k);
    const rotulos = new Array(pontos.length).fill(-1);
    c.aloca("rotulos", pontos.length);
    c.eventos.push({ t: "centros", centros: centros.map((q) => q.slice()), linha: 2 });
    let voltas = 0;
    for (let volta = 0; volta < maxVoltas; volta++) {
      voltas++;
      let mudou = false;
      for (let i = 0; i < pontos.length; i++) {
        const p = pontos[i];
        let melhor = 0;
        let menor = dist(p, centros[0], i, 0, 7);
        for (let j = 1; j < k; j++) {
          const d = dist(p, centros[j], i, j, 9);
          c.eventos.push({ t: "testa", linha: 10, i, j });
          if (d < menor) { melhor = j; menor = d; }
        }
        const trocou = rotulos[i] !== melhor;
        if (trocou) { rotulos[i] = melhor; mudou = true; }
        c.eventos.push({ t: "rotulo", i, g: melhor, mudou: trocou, linha: trocou ? 13 : 12 });
      }
      c.eventos.push({ t: "volta", volta, mudou, linha: 14 });
      if (!mudou) break;
      const sx = new Array(k).fill(0), sy = new Array(k).fill(0), cont = new Array(k).fill(0);
      c.aloca("soma_x", k); c.aloca("soma_y", k); c.aloca("contagens", k);
      for (let i = 0; i < pontos.length; i++) {
        const j = rotulos[i];
        sx[j] += pontos[i][0]; sy[j] += pontos[i][1]; cont[j] += 1;
      }
      for (let j = 0; j < k; j++) if (cont[j] > 0) centros[j] = [sx[j] / cont[j], sy[j] / cont[j]];
      c.eventos.push({ t: "centros", centros: centros.map((q) => q.slice()), linha: 21 });
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
