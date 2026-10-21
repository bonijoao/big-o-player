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

  function selecao(v, c) {
    const n = v.length;
    for (let i = 0; i < n - 1; i++) {
      let m = i;
      c.eventos.push({ t: "menor", m, linha: 3 });
      for (let j = i + 1; j < n; j++) {
        if (maior(v, m, j, c, 5)) { m = j; c.eventos.push({ t: "menor", m, linha: 6 }); }
      }
      troca(v, i, m, c, 7);
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

  // ---------- buscas (motor/busca.py) ----------
  // o vetor guarda pares; cada comparação de uma casa com o alvo conta 1

  function buscar(nome, vetor, alvo) {
    const c = contador(), v = vetor;
    const igual = (i, linha) => { c.op("comparacoes"); c.eventos.push({ t: "compara", i, op: "=", linha }); return v[i] === alvo; };
    const menor = (i, linha) => { c.op("comparacoes"); c.eventos.push({ t: "compara", i, op: "<", linha }); return v[i] < alvo; };
    let achou = -1;
    if (nome === "sequencial") {
      for (let i = 0; i < v.length; i++) {
        if (igual(i, 4)) { achou = i; c.eventos.push({ t: "achou", i, linha: 5 }, { t: "pare", linha: 6 }); break; }
      }
      c.eventos.push({ t: "devolva", linha: 7 });
    } else {
      let a = 0, b = v.length - 1;
      c.eventos.push({ t: "corta", a, b, linha: 2 });
      for (;;) {
        c.eventos.push({ t: "testa", linha: 3 });
        if (!(a <= b)) break;
        const m = Math.floor((a + b) / 2);
        c.eventos.push({ t: "meio", m, linha: 4 });
        if (igual(m, 5)) { achou = m; c.eventos.push({ t: "achou", i: m, linha: 6 }, { t: "pare", linha: 7 }); break; }
        else if (menor(m, 8)) { a = m + 1; c.eventos.push({ t: "corta", a, b, linha: 9 }); }
        else { b = m - 1; c.eventos.push({ t: "corta", a, b, linha: 11 }); }
      }
      c.eventos.push({ t: "devolva", linha: 12 });
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
    const c = contador(), pilha = instrumentos().Pilha(), ev = c.eventos;
    const casas = () => pilha.reg.leituras + pilha.reg.escritas;
    let certo = true;
    for (let k = 0; k < texto.length; k++) {
      const s = texto[k];
      ev.push({ t: "le", k, s, linha: 3 });
      if (ABRE.includes(s)) {
        c.op("empilhar"); pilha.empilhar(s); c.aloca("simbolos", pilha.n);
        ev.push({ t: "empilha", k, s, linha: 5 });
        continue;
      }
      ev.push({ t: "testa", linha: 6 });
      if (pilha.n === 0) { certo = false; ev.push({ t: "erro", k, motivo: "vazia", linha: 7 }, { t: "pare", linha: 8 }); break; }
      c.op("desempilhar"); const topo = pilha.desempilhar(); c.aloca("simbolos", pilha.n);
      ev.push({ t: "desempilha", k, s: topo, linha: 10 });
      c.op("comparacoes");
      ev.push({ t: "compara", k, topo, s, linha: 11 });
      if (topo !== PAR[s]) { certo = false; ev.push({ t: "erro", k, motivo: "par", linha: 12 }, { t: "pare", linha: 13 }); break; }
    }
    ev.push({ t: "testa", linha: 14 });
    if (pilha.n > 0) { certo = false; ev.push({ t: "erro", k: texto.length, motivo: "sobra", linha: 15 }); }
    ev.push({ t: "devolva", certo, linha: 16 });
    return { texto, certo, eventos: ev, ops: (c.ops.empilhar || 0) + (c.ops.desempilhar || 0),
      comparacoes: c.ops.comparacoes || 0, pico: c.pico, casas: casas(), sobra: pilha.n };
  }

  /** Fila de atendimento (algoritmos/atendimento/atendimento.py), com a Fila circular do instrumento. */
  function atendimento(chegada, duracao) {
    const c = contador(), fila = instrumentos().FilaCircular(), ev = c.eventos, n = chegada.length;
    const esperas = new Array(n).fill(null);
    let livre = 0, soma = 0, maior = 0, i = 0;
    for (let volta = 0; volta < n; volta++) {
      for (;;) {
        ev.push({ t: "testa", linha: 5 });
        if (!(i < n && chegada[i] < livre)) break;
        c.op("enfileirar"); fila.enfileirar(i); c.aloca("fila", fila.n);
        ev.push({ t: "enfileira", i, tempo: chegada[i], casas: fila.casas(), inicio: fila.inicio, linha: 6 });
        i++;
        maior = Math.max(maior, fila.n);
        ev.push({ t: "maior", maior, linha: 7 });
      }
      ev.push({ t: "testa", linha: 8 });
      let k;
      if (fila.n > 0) {
        c.op("desenfileirar"); k = fila.desenfileirar(); c.aloca("fila", fila.n);
        ev.push({ t: "chama", k, tempo: livre, casas: fila.casas(), inicio: fila.inicio, linha: 9 });
      } else {
        k = i; i++;
        ev.push({ t: "direto", k, tempo: chegada[k], linha: 11 });
      }
      const inicio = Math.max(livre, chegada[k]);
      esperas[k] = inicio - chegada[k];
      soma += esperas[k];
      livre = inicio + duracao[k];
      ev.push({ t: "atende", k, inicio, fim: livre, espera: esperas[k], linha: 12 });
    }
    ev.push({ t: "devolva", linha: 15 });
    return { chegada, duracao, eventos: ev, soma, maior, esperas, pico: c.pico,
      ops: (c.ops.enfileirar || 0) + (c.ops.desenfileirar || 0), casas: fila.reg.leituras + fila.reg.escritas };
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

  const api = { ordenar, kmeans, buscar, parenteses, atendimento, entrada, entradaBusca, textoParenteses, clientes, centrosIniciais, ORDENACOES };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else raiz.Algoritmos = api;
})(typeof window !== "undefined" ? window : globalThis);
