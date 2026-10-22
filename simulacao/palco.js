// A simulação ao vivo de uma faixa: roda o algoritmo (simulacao/algoritmos.js),
// guarda o estado depois de cada evento e desenha qualquer instante num
// canvas, no visual dos vídeos (motor/video_ordenacao.py, algoritmos/kmeans/video.py).
// O tempo é medido em "unidades". No ritmo constante (o padrão), cada passo
// vale 1: comparação, troca, escrita, teste, chamada; no K-means, uma flor.
// No "accelerando", uma troca vale 2, o começo vai em câmera lenta e o resto
// corre. A velocidade só escala as unidades por segundo, então o seletor de
// tempo anda por elas.
(function () {
  "use strict";

  const W = 960, H = 540;
  const COR = {
    tinta: "#1e1e1e", cinza: "#969696", palido: "#cdd0d6", claro: "#f4f5f7", borda: "#dee0e4",
    verde: "#169646", album: "#2869c3", mexeu: "#eb5f46", pivo: "#de9614", menor: "#00919b",
    maior: "#8c50b9", apagado: "#d6d8dd", aux: "#969aa0",
  };
  const GRUPOS = ["#2869c3", "#8c50b9", "#008c96", "#c8641e", "#5a7d1e"];
  const MONO = '"IBM Plex Mono", ui-monospace, monospace';
  const PASSOS_POR_SEGUNDO = 6;                          // ritmo constante, a 1×
  const RITMO = { ordenacao: 15, kmeans: 30, busca: 4, parenteses: 4, atendimento: 6, inverter: 4, janela: 6, grafo: 6, mediana: 15, welford: 8, histograma: 20 };          // accelerando: unidades por segundo a 1×

  // ---------- utilidades de desenho ----------

  function texto(ctx, s, x, y, tam = 13, cor = COR.tinta, peso = 400, alinha = "left") {
    ctx.font = `${peso} ${tam}px ${MONO}`;
    ctx.fillStyle = cor;
    ctx.textAlign = alinha;
    ctx.textBaseline = "top";
    ctx.fillText(s, x, y);
  }

  function linha(ctx, x0, y0, x1, y1, cor, larg = 1) {
    ctx.strokeStyle = cor;
    ctx.lineWidth = larg;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
  }

  function seta(ctx, cx, y) {
    ctx.fillStyle = COR.tinta;
    ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(cx - 5, y + 8); ctx.lineTo(cx + 5, y + 8); ctx.fill();
  }

  // legenda do topo, centrada; segmentos [texto, "b" negrito | "g" verde negrito | ""]
  function legenda(ctx, segs, y = 26, tam = 18) {
    ctx.font = `400 ${tam}px ${MONO}`;
    const larg = segs.reduce((t, [s, e]) => { ctx.font = `${e ? 600 : 400} ${tam}px ${MONO}`; return t + ctx.measureText(s).width; }, 0);
    let x = W / 2 - larg / 2;
    for (const [s, e] of segs) {
      ctx.font = `${e ? 600 : 400} ${tam}px ${MONO}`;
      ctx.fillStyle = e === "g" ? COR.verde : COR.tinta;
      ctx.textAlign = "left"; ctx.textBaseline = "top";
      ctx.fillText(s, x, y);
      x += ctx.measureText(s).width;
    }
  }

  // ---------- linha do tempo comum ----------

  function linhaDoTempo(pesos) {
    const inicio = new Float64Array(pesos.length + 1);
    for (let k = 0; k < pesos.length; k++) inicio[k + 1] = inicio[k] + pesos[k];
    return {
      inicio,
      total: inicio[pesos.length],
      // índice do último evento já acontecido na posição `u` (-1 = nenhum)
      eventoEm(u) {
        let lo = 0, hi = pesos.length;
        while (lo < hi) { const m = (lo + hi) >> 1; if (inicio[m] < u || (inicio[m] === u && pesos[m] === 0)) lo = m + 1; else hi = m; }
        return lo - 1;
      },
    };
  }

  // o painel de variáveis no instante `u`: a linha do pseudocódigo, as
  // variáveis do evento da vez e as que mudaram desde o passo anterior
  function painel(est, tl, pesos) {
    return function varsEm(u) {
      const k = tl.eventoEm(u);
      if (k < 0) return null;
      let linha = null;
      for (let j = k; j >= 0; j--) if (est[j].linha) { linha = est[j].linha; break; }
      // compara com o passo anterior da mesma chamada; numa chamada que acabou de abrir, nada mudou
      let antes = null;
      if (est[k].t !== "entra") for (let j = k - 1; j >= 0; j--) if (pesos[j] > 0 && est[j].chamada === est[k].chamada) { antes = est[j]; break; }
      const vars = est[k].vars || {};
      const mudou = Object.keys(vars).filter((n) => antes && antes.vars && vars[n] !== null && antes.vars[n] !== vars[n]);
      return { linha, vars, mudou, nivel: est[k].nivel, k };
    };
  }

  // ---------- ordenações ----------

  function simOrdenacao(faixa, vetor, accelerando) {
    const alg = faixa.alg;
    const r = Algoritmos.ordenar(alg, vetor);
    const N = vetor.length, ev = r.eventos;
    const temAux = alg === "intercalacao", temPilha = alg === "intercalacao" || alg === "rapida", quick = alg === "rapida";
    // heapsort: o heap mora em v[0, fim); com até 31 números, a árvore dele aparece acima das barras
    const heap = alg === "heapsort", temArvore = heap && N <= 31;
    const ideia = faixa.video.ideia;

    // reprodução: um estado depois de cada evento
    const v = vetor.slice(), aux = new Array(N).fill(null), pilha = [], chamadas = [], abertas = [];
    let part = null, comps = 0, movs = 0, pico = temAux ? N : 0, fimPart1 = -1, menor = null, fimHeap = N;
    const est = [];
    ev.forEach((e, k) => {
      let foco = null, mexeu = [];
      if (e.t === "compara") {
        comps++;
        foco = [e.i, e.j, e.onde];
        if (part && e.i === part.p) part = { ...part, j: e.j, jMenor: v[e.j] < v[part.p] };
      } else if (e.t === "troca") {
        movs++;
        const x = v[e.i]; v[e.i] = v[e.j]; v[e.j] = x;
        if (e.i !== e.j) mexeu = [["v", e.i], ["v", e.j]];
        if (part) {
          if (e.j === part.p) { part = null; if (fimPart1 < 0) fimPart1 = k; }
          else part = { ...part, i: part.i + 1, jMenor: false };
        }
      } else if (e.t === "escreve") {
        movs++;
        (e.onde === "aux" ? aux : v)[e.k] = e.x;
        mexeu = [[e.onde, e.k]];
      } else if (e.t === "entra") {
        pilha.push([e.a, e.b]);
        abertas.push(chamadas.length);
        chamadas.push({ a: e.a, b: e.b, nivel: pilha.length - 1, ini: k, fim: Infinity });
      } else if (e.t === "sai") {
        pilha.pop();
        chamadas[abertas.pop()].fim = k;
      } else if (e.t === "menor") {
        menor = e.m;
      } else if (e.t === "pivo") {
        const [a, b] = pilha[pilha.length - 1];
        part = { a, b, p: e.p, i: a, j: null, jMenor: false };
      }
      pico = Math.max(pico, (temAux ? N : 0) + pilha.length);
      if (e.t === "troca" && alg === "selecao") menor = null;   // o menor foi para a frente
      if (heap && e.t === "troca" && e.linha === 7) fimHeap--;  // a raiz foi para o fim: o heap encolhe
      est.push({ v: v.slice(), aux: temAux ? aux.slice() : null, nPilha: pilha.length, part, foco, mexeu, comps, movs, pico, menor, t: e.t, linha: e.linha, parte: e.parte, vars: e.vars, nivel: e.nivel, chamada: e.chamada, fim: fimHeap });
    });
    if (comps !== r.comparacoes || movs !== r.movimentos || pico !== r.pico) throw new Error("reprodução não bate com a execução");

    // azul = assentou de vez: no lugar final e nenhuma escrita a toca depois
    const ultimo = new Array(N).fill(-1);
    est.forEach((s, k) => s.mexeu.forEach(([onde, i]) => { if (onde === "v") ultimo[i] = k; }));

    // pesos: comparação 1, troca 2, escrita 1; câmera lenta no começo (no quick, a primeira partição) e pausa depois dela
    const visivel = (t) => t === "compara" || t === "troca" || t === "escreve";
    // accelerando: controle (testes, pivô, chamadas, parada) com um tempinho; câmera lenta no começo
    const CONTROLE = { testa: 0.6, pivo: 1.5, pare: 2, entra: 1, menor: 0.6 };
    let nvis = 0;
    const lentos = quick && fimPart1 >= 0 ? est.slice(0, fimPart1 + 1).filter((s) => visivel(s.t)).length : 8;
    const LENTO = quick ? 4.5 : 6.5, PAUSA = quick ? 39 : 0;
    const pesos = !accelerando ? est.map(() => 1) : est.map((s, k) => {
      let p = 0;
      if (visivel(s.t)) { p = (s.t === "troca" ? 2 : 1) * (nvis < lentos ? LENTO : 1); nvis++; }
      else if (CONTROLE[s.t]) p = CONTROLE[s.t] * (nvis < lentos ? 2 : 1);
      if (k === fimPart1) p += PAUSA;
      return p;
    });
    const tl = linhaDoTempo(pesos);
    const uLentoFim = (() => { let n = 0; for (let k = 0; k < est.length; k++) { if (visivel(est[k].t) && ++n === lentos) return tl.inicio[k + 1]; } return 0; })();
    const uPausa = fimPart1 >= 0 ? tl.inicio[fimPart1 + 1] - PAUSA : Infinity;
    const vis = (() => { let n = 0; return est.map((s) => (n += visivel(s.t) ? 1 : 0)); })();
    const kLento = (() => { let n = 0; for (let k = 0; k < est.length; k++) if (visivel(est[k].t) && ++n === lentos) return k; return -1; })();
    // qual legenda do topo: 0 = a primeira ideia, 1 = a do quick depois da 1ª partição, 2 = a última
    function fase(u, k) {
      if (heap) return k >= 0 && est[k].fim < N ? 2 : 0;    // montando o heap, depois tirando a raiz
      if (accelerando) return quick && u >= uPausa && u < uPausa + PAUSA ? 1 : u < (quick ? uPausa : uLentoFim) ? 0 : 2;
      if (quick && fimPart1 >= 0 && k >= fimPart1 && k < fimPart1 + 14) return 1;
      return k < (quick ? fimPart1 : kLento) ? 0 : 2;
    }
    const nivelMax = Math.max(0, ...chamadas.map((c) => c.nivel));

    // geometria (a mesma dos vídeos)
    const BX0 = 70, BX1 = 600, PTOPO = 96, BTOPO = temArvore ? 300 : 96;
    const BBASE = temAux || temPilha ? 316 : temArvore ? 440 : 410;
    const LEG_Y = temAux ? 520 : temArvore ? 484 : 470, PILHA_Y = temAux ? 340 : 350;
    const AUX_TOPO = 420, AUX_BASE = 492;
    const ROW = Math.min(8, ((temAux ? AUX_TOPO - 28 : LEG_Y - 14) - PILHA_Y - 20) / Math.max(1, nivelMax));
    const bw = (BX1 - BX0) / N, bx = (i) => BX0 + i * bw;

    // a árvore do heap: o nó i é a barra i; só a parte que ainda é heap
    function arvoreHeap(ctx, s, k, coral, fim) {
      const L = Math.floor(Math.log2(N)) + 1, TY0 = 84, DY = (BTOPO - 60 - TY0) / Math.max(1, L - 1);
      const R = Math.min(13, (BX1 - BX0) / 2 ** (L - 1) * 0.42);
      const pos = (i) => { const d = Math.floor(Math.log2(i + 1)), j = i + 1 - 2 ** d; return [BX0 + (j + 0.5) * (BX1 - BX0) / 2 ** d, TY0 + d * DY]; };
      const nos = fim ? 0 : s.fim;
      for (let i = 1; i < nos; i++) { const [x0, y0] = pos((i - 1) >> 1), [x1, y1] = pos(i); linha(ctx, x0, y0, x1, y1, COR.palido, 1.5); }
      const foco = !fim && k >= 0 && est[k].t === "compara" ? s.foco : null;
      for (let i = 0; i < nos; i++) {
        const [x, y] = pos(i), mexeu = coral.has(i), olhando = foco && (foco[0] === i || foco[1] === i);
        ctx.beginPath(); ctx.arc(x, y, R, 0, 7);
        ctx.fillStyle = mexeu ? COR.mexeu : "#fff"; ctx.fill();
        ctx.strokeStyle = COR.tinta; ctx.lineWidth = olhando ? 3 : 1.5; ctx.stroke();
        texto(ctx, String(s.v[i]), x, y - 7, 11, mexeu ? "#fff" : COR.tinta, 600, "center");
      }
      if (nos) texto(ctx, "o heap em árvore: o nó i é a barra i", BX0, TY0 - 34, 11, COR.cinza);
    }

    function corBarra(i, x, k, s, coral) {
      const assentou = x === i && k >= ultimo[i];
      if (quick) {
        const p = s.part;
        if (p && p.a <= i && i < p.b) {
          if (i === p.p) return COR.pivo;
          if (i < p.i || (i === p.j && p.jMenor)) return COR.menor;
          if (p.j !== null && i <= p.j) return COR.maior;
          return COR.tinta;
        }
        if (assentou) return COR.album;
        return p ? COR.apagado : COR.tinta;
      }
      if (assentou) return COR.album;
      return coral.has(i) ? COR.mexeu : COR.tinta;
    }

    function barras(ctx, vals, topo, base, cor) {
      vals.forEach((x, i) => {
        if (x === null) return;
        const h = (x + 1) / N * (base - topo);
        ctx.fillStyle = cor(i, x);
        ctx.fillRect(bx(i) + bw * 0.12, base - h, bw * 0.76, h);
      });
    }

    function desenhar(ctx, u) {
      const k = tl.eventoEm(u);
      const fim = u >= tl.total;
      const s = k >= 0 ? est[k] : { v: vetor, aux: temAux ? new Array(N).fill(null) : null, nPilha: 0, part: null, foco: null, comps: 0, movs: 0, pico: temAux ? N : 0, fim: N };
      const agoraVis = k >= 0 ? vis[k] : 0;
      const coral = new Set(), coralAux = new Set();
      if (!quick) for (let j = Math.max(0, k - 12); j <= k; j++) if (agoraVis - vis[j] < 3) est[j].mexeu.forEach(([o, i]) => (o === "v" ? coral : coralAux).add(i));

      if (temArvore) arvoreHeap(ctx, s, k, coral, fim);
      if (heap && !fim && s.fim < N) {   // a fronteira: o heap à esquerda, os já no lugar à direita
        const xf = bx(s.fim);
        ctx.setLineDash([4, 4]); linha(ctx, xf, BTOPO - 14, xf, BBASE + 1, COR.cinza); ctx.setLineDash([]);
        texto(ctx, "heap ←", xf - 6, BTOPO - 26, 11, COR.cinza, 400, "right");
        texto(ctx, "→ no lugar", xf + 6, BTOPO - 26, 11, COR.cinza);
      }
      linha(ctx, BX0, BBASE + 1, BX1, BBASE + 1, COR.palido);
      barras(ctx, s.v, BTOPO, BBASE, (i, x) => corBarra(i, x, k, s, coral));
      const foco = !fim && k >= 0 && est[k].t === "compara" ? s.foco : null;
      if (foco && foco[2] === "v") { seta(ctx, bx(foco[0]) + bw / 2, BBASE + 5); seta(ctx, bx(foco[1]) + bw / 2, BBASE + 5); }
      if (quick && s.part) texto(ctx, "pivô", bx(s.part.p) + bw / 2, BBASE + 14, 11, COR.tinta, 600, "center");
      if (!fim && s.menor != null) texto(ctx, "menor", bx(s.menor) + bw / 2, BBASE + 16, 11, COR.tinta, 600, "center");

      if (temPilha) {
        texto(ctx, `pilha: ${s.nPilha} ${s.nPilha === 1 ? "nível" : "níveis"}   (árvore de chamadas: escuro = aberta, claro = resolvida)`, BX0, PILHA_Y, 11, COR.cinza);
        for (const c of chamadas) {
          if (c.ini > k) break;
          const y = PILHA_Y + 20 + c.nivel * ROW, ativa = c.fim > k, cor = ativa ? COR.tinta : COR.palido;
          if (c.b - c.a <= 1) {
            if (c.b > c.a) { ctx.fillStyle = cor; ctx.beginPath(); ctx.arc(bx(c.a) + bw / 2, y, 2, 0, 7); ctx.fill(); }
          } else linha(ctx, bx(c.a) + 2, y, bx(c.b) - 2, y, cor, 3);
        }
      }
      if (temAux) {
        texto(ctx, `lista auxiliar: ${N} posições de memória extra`, BX0, AUX_TOPO - 22, 11, COR.cinza);
        linha(ctx, BX0, AUX_BASE + 1, BX1, AUX_BASE + 1, COR.palido);
        barras(ctx, s.aux, AUX_TOPO, AUX_BASE, (i) => (coralAux.has(i) ? COR.mexeu : COR.aux));
        if (foco && foco[2] === "aux") { seta(ctx, bx(foco[0]) + bw / 2, AUX_BASE + 4); seta(ctx, bx(foco[1]) + bw / 2, AUX_BASE + 4); }
      }

      // painel
      const x = 650;
      texto(ctx, "comparações", x, PTOPO - 6, 13, COR.cinza);
      texto(ctx, String(s.comps), x, PTOPO + 10, 40, fim ? COR.verde : COR.tinta, 700);
      texto(ctx, r.movimento, x, PTOPO + 84, 13, COR.cinza);
      texto(ctx, String(s.movs), x, PTOPO + 100, 26, COR.tinta, 700);
      const extra = (temAux ? N : 0) + s.nPilha;
      texto(ctx, "memória extra agora", x, PTOPO + 154, 13, COR.cinza);
      texto(ctx, `${extra} ${extra === 1 ? "valor" : "valores"}`, x, PTOPO + 170, 20, COR.tinta, 700);
      if (temAux || temPilha) texto(ctx, `pico até aqui: ${s.pico}`, x, PTOPO + 198, 13, fim ? COR.verde : COR.cinza, fim ? 600 : 400);
      texto(ctx, `n = ${N} números`, x, temArvore ? PTOPO + 228 : Math.max(BBASE - 14, PTOPO + 228), 13, COR.cinza);
      if (heap && !fim) texto(ctx, s.fim < N ? `no heap: ${s.fim}; no lugar: ${N - s.fim}` : "montando o heap", x, PTOPO + 252, 13, COR.cinza);

      // legenda das cores
      const itens = quick
        ? [[COR.pivo, "pivô"], [COR.menor, "menor que o pivô"], [COR.maior, "maior"], [COR.tinta, "falta comparar"], [COR.album, "no lugar final"]]
        : [[COR.album, "no lugar final"], [COR.mexeu, "acabou de se mexer"], [COR.tinta, "o resto"]];
      let lx = BX0;
      for (const [cor, rot] of itens) {
        ctx.fillStyle = cor; ctx.fillRect(lx, LEG_Y + 2, 10, 10);
        texto(ctx, rot, lx + 16, LEG_Y, 11, COR.cinza);
        ctx.font = `400 11px ${MONO}`;
        lx += 16 + ctx.measureText(rot).width + 26;
      }

      // legenda do topo
      if (fim) legenda(ctx, [["ordenado: ", ""], [`${r.comparacoes} comparações`, "g"], [`, ${r.movimentos} ${r.movimento}`, ""]]);
      else legenda(ctx, [[ideia[[0, 1, ideia.length - 1][fase(u, k)]], ""]]);
    }

    return {
      total: tl.total, ritmo: accelerando ? RITMO.ordenacao : PASSOS_POR_SEGUNDO, desenhar,
      varsEm: painel(est, tl, pesos),
      eventoEm: (u) => tl.eventoEm(u), uDoEvento: (k) => (k < 0 ? 0 : tl.inicio[k + 1]),
      passos: est.map((s, k) => (pesos[k] > 0 ? tl.inicio[k + 1] : null)).filter((x) => x !== null),
      resumo: { comparacoes: r.comparacoes, movimentos: r.movimentos, movimento: r.movimento, pico: r.pico, n: N },
      contagemEm(u) { const k = tl.eventoEm(u); return k >= 0 ? est[k].comps : 0; },
    };
  }

  // ---------- K-means ----------

  function simKmeans(faixa, pontos, iniciais, accelerando) {
    const r = Algoritmos.kmeans(pontos, iniciais.map((i) => pontos[i]));
    const N = pontos.length, K = iniciais.length, ev = r.eventos;
    const PX0 = 78, PX1 = 540, PY0 = 100, PY1 = 412;
    const xs = pontos.map((p) => p[0]), ys = pontos.map((p) => p[1]);
    const [XMIN, XMAX] = [Math.min(...xs) - 0.4, Math.max(...xs) + 0.4], [YMIN, YMAX] = [Math.min(...ys) - 0.25, Math.max(...ys) + 0.4];
    const P = (x, y) => [PX0 + (x - XMIN) / (XMAX - XMIN) * (PX1 - PX0), PY1 - (y - YMIN) / (YMAX - YMIN) * (PY1 - PY0)];

    // estados: rótulos visíveis, centros (com o deslize), distâncias, voltas
    const rot = new Array(N).fill(-1);
    let centros = null, centrosAntes = null, dists = 0, volta = 0;
    const tabela = [];   // por volta: distâncias acumuladas e quantos mudaram
    let mudaram = 0;
    const est = [];
    for (const e of ev) {
      let foco = null;
      if (e.t === "dist") { dists++; foco = [e.i, e.j]; }
      else if (e.t === "testa" || e.t === "atribui") foco = [e.i, e.j];   // as linhas da flor continuam à vista
      else if (e.t === "rotulo") { rot[e.i] = e.g; if (e.mudou) mudaram++; foco = [e.i, K - 1]; }   // parado na flor: as k medidas dela
      else if (e.t === "volta") { tabela.push({ volta: volta + 1, dists, mudaram }); volta++; mudaram = 0; }
      else if (e.t === "centros") { centrosAntes = centros; centros = e.centros; }
      est.push({ t: e.t, rot: rot.slice(), centros, centrosAntes, dists, nVoltas: tabela.length, foco, linha: e.linha, vars: e.vars, nivel: 0, chamada: 0 });
    }
    if (dists !== r.distancias || tabela.length !== r.voltas) throw new Error("reprodução do k-means não bate");

    // pesos: as 4 primeiras flores devagar; cada centro desliza em 12 unidades; pausa no fim de cada volta
    let flor = 0;
    // ritmo constante: um passo por flor (as contas dela dividem o passo, e ele acaba na escolha do grupo),
    // um por deslize dos centros e um por fim de volta
    const constante = () => {
      const p = new Array(est.length).fill(0);
      let ini = 0;
      est.forEach((s, k) => {
        if (s.t === "rotulo") { for (let j = ini; j <= k; j++) p[j] = 1 / (k - ini + 1); ini = k + 1; }
        else if (s.t === "centros" || s.t === "volta") { p[k] = 1; ini = k + 1; }
      });
      return p;
    };
    const pesos = !accelerando ? constante() : est.map((s, k) => {
      if (s.t === "dist") return flor < 4 ? 6 : 0.2;
      if (s.t === "testa") return flor < 4 ? 3 : 0.1;
      if (s.t === "rotulo") { flor++; return flor <= 4 ? 4 : 0.4; }
      if (s.t === "centros") return k === 0 ? 30 : 24;
      if (s.t === "volta") return 10;
      return 0;
    });
    const tl = linhaDoTempo(pesos);

    function desenhar(ctx, u) {
      const k = tl.eventoEm(u);
      const fim = u >= tl.total;
      const s = k >= 0 ? est[k] : est[0];
      // deslize dos centros: durante o evento "centros", vai da posição antiga à nova
      let cs = s.centros;
      if (k >= 0 && s.t === "centros" && s.centrosAntes) {
        const f = Math.min(1, Math.max(0, (u - tl.inicio[k]) / pesos[k]));
        const e = f * f * (3 - 2 * f), a = s.centrosAntes;
        cs = a.map((q, j) => [q[0] + (s.centros[j][0] - q[0]) * e, q[1] + (s.centros[j][1] - q[1]) * e]);
      }
      // eixos
      linha(ctx, PX0, PY1, PX1, PY1, COR.palido); linha(ctx, PX0, PY0, PX0, PY1, COR.palido);
      for (let x = Math.ceil(XMIN); x <= XMAX; x++) { const [X] = P(x, 0); texto(ctx, String(x), X, PY1 + 6, 11, COR.cinza, 400, "center"); }
      for (let y = Math.ceil(YMIN); y <= YMAX; y++) { const [, Y] = P(0, y); texto(ctx, String(y), PX0 - 8, Y - 7, 11, COR.cinza, 400, "right"); }
      texto(ctx, "comprimento da pétala (cm)", PX1, PY1 + 22, 11, COR.cinza, 400, "right");
      texto(ctx, "largura (cm)", PX0 + 6, PY0 - 6, 11, COR.cinza);
      // linhas de medida da flor da vez
      if (!fim && s.foco) {
        const [px, py] = P(...pontos[s.foco[0]]);
        for (let j = 0; j <= s.foco[1]; j++) { const [cx, cy] = P(...cs[j]); linha(ctx, px, py, cx, cy, "#9a9ea6", 1); }
      }
      // flores
      pontos.forEach((p, i) => {
        const [X, Y] = P(p[0], p[1]);
        ctx.fillStyle = s.rot[i] >= 0 ? GRUPOS[s.rot[i] % GRUPOS.length] : "#afb2b8";
        ctx.beginPath(); ctx.arc(X, Y, 3.4, 0, 7); ctx.fill();
      });
      // centros
      cs.forEach((q, j) => {
        const [X, Y] = P(q[0], q[1]);
        ctx.fillStyle = "#fff"; ctx.strokeStyle = GRUPOS[j % GRUPOS.length]; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(X, Y, 9, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = GRUPOS[j % GRUPOS.length]; ctx.beginPath(); ctx.arc(X, Y, 2.2, 0, 7); ctx.fill();
      });
      // tira de memória: um rótulo por flor
      const SY = 460, w = (PX1 - PX0) / N;
      s.rot.forEach((g, i) => { ctx.fillStyle = g >= 0 ? GRUPOS[g % GRUPOS.length] : COR.claro; ctx.fillRect(PX0 + i * w, SY, w - 0.6, 12); });
      ctx.strokeStyle = COR.borda; ctx.lineWidth = 1; ctx.strokeRect(PX0 - 0.5, SY - 0.5, PX1 - PX0 + 1, 13);
      texto(ctx, `memória: ${N} rótulos (um por flor) + ${r.pico - N} dos centros e somas`, PX0, SY + 20, 12, COR.cinza);
      // painel
      const x = 600;
      texto(ctx, "distâncias calculadas", x, PY0 - 6, 13, COR.cinza);
      texto(ctx, String(s.dists), x, PY0 + 12, 40, fim ? COR.verde : COR.tinta, 700);
      texto(ctx, "volta       total  mudaram", x, PY0 + 92, 13, COR.cinza);
      linha(ctx, x, PY0 + 112, x + 300, PY0 + 112, COR.borda);
      tabela.slice(0, s.nVoltas).slice(-9).forEach((t, i) => {
        const y = PY0 + 120 + i * 22, ult = t.mudaram === 0;
        texto(ctx, String(t.volta).padStart(5), x, y, 14);
        texto(ctx, String(t.dists).padStart(10), x + 56, y, 14);
        texto(ctx, String(t.mudaram).padStart(7), x + 166, y, 14, ult ? COR.verde : COR.tinta, ult ? 700 : 400);
      });
      texto(ctx, `n = ${N} flores   k = ${K} centros`, x, PY1 + 20, 13, COR.cinza);
      // legenda do topo
      if (fim) legenda(ctx, [[`na volta ${r.voltas} `, ""], ["ninguém mudou", "b"], [" de grupo: para", ""]]);
      else if (k < 1) legenda(ctx, [[`${K} centros`, "b"], [" sorteados para começar", ""]]);
      else if (s.nVoltas === 0) legenda(ctx, [["cada flor mede a distância até ", ""], ["cada centro", "b"]]);
      else if (s.nVoltas === 1 && s.t !== "centros" && s.t !== "dist") legenda(ctx, [[`${N} × ${K} = `, ""], [`${N * K} distâncias`, "g"], [" por volta", ""]]);
      else if (s.t === "volta" || s.t === "centros") legenda(ctx, [["cada centro vai para a ", ""], ["média", "b"], [" do seu grupo", ""]]);
      else legenda(ctx, [["e repete: ", ""], [`+${N * K}`, "b"], [" a cada volta", ""]]);
    }

    return {
      total: tl.total, ritmo: accelerando ? RITMO.kmeans : PASSOS_POR_SEGUNDO, desenhar,
      varsEm: painel(est, tl, pesos),
      eventoEm: (u) => tl.eventoEm(u), uDoEvento: (k) => (k < 0 ? 0 : tl.inicio[k + 1]),
      passos: est.map((s, k) => (s.t === "rotulo" || s.t === "centros" || s.t === "volta" ? tl.inicio[k + 1] : null)).filter((x) => x !== null),
      resumo: { distancias: r.distancias, voltas: r.voltas, pico: r.pico, n: N, k: K },
      contagemEm(u) { const k = tl.eventoEm(u); return k >= 0 ? est[k].dists : 0; },
    };
  }

  // ---------- comuns às faixas novas ----------

  // número com vírgula decimal e uma casa, como no resto da página
  const decimal = (x) => (Math.round(x * 10) / 10).toFixed(1).replace(".", ",");

  function legendaCores(ctx, itens, y) {
    let lx = 70;
    for (const [cor, rot, borda, larg = 1] of itens) {   // borda: a cor do contorno da amostra, quando ele faz parte do papel
      ctx.fillStyle = cor; ctx.fillRect(lx, y + 2, 10, 10);
      if (borda || cor === COR.claro || cor === "#fff") { ctx.strokeStyle = borda || COR.borda; ctx.lineWidth = larg; ctx.strokeRect(lx + 0.5, y + 2.5, 9, 9); }
      texto(ctx, rot, lx + 16, y, 11, COR.cinza);
      ctx.font = `400 11px ${MONO}`;
      lx += 16 + ctx.measureText(rot).width + 26;
    }
  }

  // pesos com câmera lenta nos primeiros `lentos` eventos que contam
  function pesosLentos(est, peso, conta, lentos, fator) {
    let n = 0;
    return est.map((s) => {
      const p = peso[s.t] || 0;
      const lento = n < lentos;
      if (conta(s.t)) n++;
      return p * (lento ? fator : 1);
    });
  }

  // o que toda simulação expõe ao player: painel de variáveis, troca de ritmo sem perder o lugar e os passos
  function comum(tl, est, pesos, ritmoAccelerando, accelerando) {
    return {
      ritmo: accelerando ? ritmoAccelerando : PASSOS_POR_SEGUNDO,
      varsEm: painel(est, tl, pesos),
      eventoEm: (u) => tl.eventoEm(u), uDoEvento: (k) => (k < 0 ? 0 : tl.inicio[k + 1]),
      passos: est.map((s, k) => (pesos[k] > 0 ? tl.inicio[k + 1] : null)).filter((x) => x !== null),
    };
  }

  // ---------- buscas ----------

  function simBusca(faixa, vetor, alvo, accelerando) {
    const alg = faixa.alg, bin = alg === "binaria";
    const r = Algoritmos.buscar(alg, vetor, alvo);
    const N = vetor.length, ideia = faixa.video.ideia;
    const olhadas = new Set();
    let a = 0, b = N - 1, meio = null, achou = -1, comps = 0;
    const est = r.eventos.map((e) => {
      let foco = null;
      if (e.t === "compara") { comps++; foco = e.i; if (!bin) olhadas.add(e.i); }
      else if (e.t === "corta") { a = e.a; b = e.b; meio = null; }
      else if (e.t === "meio") meio = e.m;
      else if (e.t === "achou") achou = e.i;
      return { t: e.t, linha: e.linha, vars: e.vars, nivel: 0, chamada: 0, foco, olhadas: olhadas.size, a, b, meio, achou, comps, op: e.op };
    });
    if (comps !== r.comparacoes) throw new Error("reprodução da busca não bate");
    const conta = (t) => t === "compara";
    const pesos = !accelerando ? est.map(() => 1) : pesosLentos(est, bin ? { compara: 3, meio: 1.5, corta: 2.5, testa: 0.6, achou: 3, pare: 1, devolva: 3 }
      : { compara: 1.5, achou: 3, pare: 1, devolva: 3 }, conta, bin ? 0 : 4, 2.5);
    const tl = linhaDoTempo(pesos);
    const BX0 = 70, BX1 = 600, BTOPO = 96, BBASE = bin ? 380 : 410;
    const bw = (BX1 - BX0) / N, bx = (i) => BX0 + i * bw;
    const altura = (x) => (x / 2 + 1) / N * (BBASE - BTOPO);

    function desenhar(ctx, u) {
      const k = tl.eventoEm(u), fim = u >= tl.total;
      const s = k >= 0 ? est[k] : { foco: null, olhadas: 0, a: 0, b: N - 1, meio: null, achou: -1, comps: 0 };
      const agora = !fim && k >= 0 && est[k].t === "compara" ? s.foco : null;
      linha(ctx, BX0, BBASE + 1, BX1, BBASE + 1, COR.palido);
      vetor.forEach((x, i) => {
        let cor = COR.tinta;
        if (i === s.achou) cor = COR.verde;
        else if (i === agora || (bin && i === s.meio)) cor = COR.mexeu;
        else if (bin ? i < s.a || i > s.b : i < s.olhadas) cor = COR.apagado;   // a sequencial olha na ordem
        const h = altura(x);
        ctx.fillStyle = cor;
        ctx.fillRect(bx(i) + bw * 0.12, BBASE - h, bw * 0.76, h);
      });
      // o alvo: uma linha na altura dele (um ímpar cai entre dois números)
      const ya = Math.max(BTOPO - 6, BBASE - altura(alvo));
      ctx.setLineDash([5, 4]); linha(ctx, BX0, ya, BX1, ya, COR.cinza, 1.2); ctx.setLineDash([]);
      texto(ctx, "alvo", BX0 - 6, ya - 7, 11, COR.cinza, 400, "right");
      const foco = agora !== null ? agora : bin && !fim ? s.meio : null;
      if (foco !== null) seta(ctx, bx(foco) + bw / 2, BBASE + 5);
      if (bin && s.a <= s.b && !(fim && s.achou >= 0)) {
        const y = BBASE + 24;
        linha(ctx, bx(s.a) + 2, y, bx(s.b + 1) - 2, y, COR.tinta, 2);
        linha(ctx, bx(s.a) + 2, y - 4, bx(s.a) + 2, y + 4, COR.tinta, 2);
        linha(ctx, bx(s.b + 1) - 2, y - 4, bx(s.b + 1) - 2, y + 4, COR.tinta, 2);
        const resta = s.b - s.a + 1;
        const meioX = Math.min(BX1 - 120, Math.max(BX0 + 120, (bx(s.a) + bx(s.b + 1)) / 2));
        texto(ctx, `ainda pode estar aqui: ${resta} ${resta === 1 ? "casa" : "casas"}`, meioX, y + 10, 11, COR.cinza, 400, "center");
      } else if (bin && s.a > s.b) texto(ctx, "não sobrou casa nenhuma", BX0, BBASE + 36, 11, COR.cinza);

      const x = 650;
      texto(ctx, "comparações", x, BTOPO - 6, 13, COR.cinza);
      texto(ctx, String(s.comps), x, BTOPO + 10, 40, fim ? COR.verde : COR.tinta, 700);
      texto(ctx, "alvo", x, BTOPO + 84, 13, COR.cinza);
      texto(ctx, String(alvo), x, BTOPO + 100, 26, COR.tinta, 700);
      if (bin) {
        const resta = Math.max(0, s.b - s.a + 1);
        texto(ctx, "trecho que sobra", x, BTOPO + 154, 13, COR.cinza);
        texto(ctx, `${resta} ${resta === 1 ? "casa" : "casas"}`, x, BTOPO + 170, 20, COR.tinta, 700);
      } else {
        texto(ctx, "casas olhadas", x, BTOPO + 154, 13, COR.cinza);
        texto(ctx, `${s.olhadas} de ${N}`, x, BTOPO + 170, 20, COR.tinta, 700);
      }
      texto(ctx, "memória extra: 0 valores", x, BTOPO + 210, 13, COR.cinza);
      texto(ctx, `n = ${N} números`, x, BBASE - 14, 13, COR.cinza);

      legendaCores(ctx, bin
        ? [[COR.mexeu, "o meio"], [COR.tinta, "ainda pode ter o alvo"], [COR.apagado, "descartada"], [COR.verde, "achou"]]
        : [[COR.mexeu, "comparando agora"], [COR.apagado, "já olhada"], [COR.tinta, "falta olhar"], [COR.verde, "achou"]], 470);

      if (fim && r.posicao >= 0) legenda(ctx, [["achou o ", ""], [String(alvo), "b"], [` na casa ${r.posicao + 1}: `, ""], [`${r.comparacoes} ${r.comparacoes === 1 ? "comparação" : "comparações"}`, "g"]]);
      else if (fim) legenda(ctx, [["o ", ""], [String(alvo), "b"], [" não está no vetor: ", ""], [`${r.comparacoes} comparações`, "g"]]);
      // a segunda frase da sequencial é sobre o alvo ausente: só aparece quando ele não está lá
      else if (s.comps < (bin ? 2 : 4) || (!bin && r.posicao >= 0)) legenda(ctx, [[ideia[0], ""]]);
      else legenda(ctx, [[ideia[ideia.length - 1], ""]]);
    }

    const contagemEm = (u) => { const k = tl.eventoEm(u); return k >= 0 ? est[k].comps : 0; };
    return {
      total: tl.total, desenhar, ...comum(tl, est, pesos, RITMO.busca, accelerando),
      resumo: { comparacoes: r.comparacoes, posicao: r.posicao, alvo, n: N, pico: 0 }, contagemEm,
      medidor: () => `${r.comparacoes} comparações, n = ${N}<br>sem memória extra`,
      aoVivo: (u, cfg) => `Tocando agora: n = ${N}, ${cfg.rotulo}; ${contagemEm(u)} de ${r.comparacoes} comparações, ${r.posicao >= 0 ? `o ${alvo} está na casa ${r.posicao + 1}` : `o ${alvo} não está no vetor`}, sem memória extra.`,
    };
  }

  // ---------- parênteses balanceados ----------

  function simParenteses(faixa, texto_, accelerando) {
    const r = Algoritmos.parenteses(texto_);
    const N = texto_.length, ideia = faixa.video.ideia;
    const pilha = [], pares = [];       // pilha: posições no texto; pares: [abre, fecha] já resolvidos
    let lendo = -1, ops = 0, comps = 0, pico = 0, erro = null;
    const est = r.eventos.map((e) => {
      if (e.t === "le") lendo = e.k;
      else if (e.t === "empilha") { pilha.push(e.k); ops++; }
      else if (e.t === "desempilha") { pares.push([pilha.pop(), e.k]); ops++; }
      else if (e.t === "compara") comps++;
      else if (e.t === "erro" && !erro) erro = { k: e.k, motivo: e.motivo };   // vale o primeiro: depois de um par errado, a pilha também sobra
      pico = Math.max(pico, pilha.length);
      return { t: e.t, linha: e.linha, vars: e.vars, nivel: 0, chamada: 0, lendo, pilha: pilha.slice(), nPares: pares.length, ops, comps, pico, erro, ok: e.t === "compara" ? e.topo === { ")": "(", "]": "[", "}": "{" }[e.s] : null };
    });
    if (ops !== r.ops || pico !== r.pico) throw new Error("reprodução dos parênteses não bate");
    const pesos = !accelerando ? est.map(() => 1) : pesosLentos(est, { le: 0.5, empilha: 1.5, desempilha: 1.5, compara: 1, testa: 0.4, erro: 4, pare: 1, devolva: 3 },
      (t) => t === "le", 4, 2.5);
    const tl = linhaDoTempo(pesos);
    const TX0 = 70, TX1 = 500, TY = 120, cw = Math.min(30, (TX1 - TX0) / N), tx = (k) => TX0 + k * cw;
    const PX = 530, PW = 60, PBASE = 460, ch = Math.min(30, 330 / Math.max(1, r.pico)), PTOPO = PBASE - Math.max(3, r.pico) * ch;
    const MOTIVO = { vazia: "fecha sem ninguém aberto", par: "par errado", sobra: "sobrou aberto na pilha" };

    function desenhar(ctx, u) {
      const k = tl.eventoEm(u), fim = u >= tl.total;
      const s = k >= 0 ? est[k] : { lendo: -1, pilha: [], nPares: 0, ops: 0, comps: 0, pico: 0, erro: null };
      const naPilha = new Set(s.pilha), resolvidos = new Set(pares.slice(0, s.nPares).flat());
      // o texto: um símbolo por casa
      const tam = Math.max(10, Math.min(24, cw * 0.95));
      for (let i = 0; i < N; i++) {
        let cor = COR.palido, peso = 600;
        if (s.erro && i === s.erro.k) cor = COR.mexeu;
        else if (i === s.lendo && !fim) cor = COR.mexeu;
        else if (naPilha.has(i)) cor = COR.tinta;
        else if (resolvidos.has(i)) cor = COR.cinza;
        else if (i <= s.lendo) cor = COR.cinza;
        else peso = 400;
        texto(ctx, texto_[i], tx(i) + cw / 2, TY, tam, cor, peso, "center");
      }
      if (s.lendo >= 0 && !fim) seta(ctx, tx(s.lendo) + cw / 2, TY + tam + 6);
      // os pares que já fecharam: um arco de quem abriu até quem fechou
      for (const [a, b] of pares.slice(0, s.nPares)) {
        const xa = tx(a) + cw / 2, xb = tx(b) + cw / 2, prof = Math.min(90, 8 + (xb - xa) * 0.35);
        ctx.strokeStyle = COR.palido; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(xa, TY + tam + 18); ctx.quadraticCurveTo((xa + xb) / 2, TY + tam + 18 + prof, xb, TY + tam + 18); ctx.stroke();
      }
      if (s.nPares) texto(ctx, "arcos: os pares que já fecharam", TX0, TY + tam + 116, 11, COR.cinza);
      // a pilha, em pé: o fundo embaixo, o topo em cima
      texto(ctx, "pilha", PX + PW / 2, PTOPO - 36, 13, COR.cinza, 400, "center");
      linha(ctx, PX, PBASE, PX + PW, PBASE, COR.tinta, 2);
      linha(ctx, PX, PTOPO - 14, PX, PBASE, COR.palido); linha(ctx, PX + PW, PTOPO - 14, PX + PW, PBASE, COR.palido);
      s.pilha.forEach((pos, j) => {
        const y = PBASE - (j + 1) * ch, topo = j === s.pilha.length - 1;
        ctx.fillStyle = topo && k >= 0 && est[k].t === "empilha" ? COR.mexeu : COR.claro;
        ctx.fillRect(PX + 4, y + 1, PW - 8, ch - 2);
        if (ch >= 12) texto(ctx, texto_[pos], PX + PW / 2, y + ch / 2 - Math.min(9, ch * 0.4), Math.min(16, ch * 0.75), COR.tinta, 600, "center");
        if (topo) texto(ctx, "topo", PX + PW + 6, y + ch / 2 - 7, 11, COR.cinza);
      });

      const x = 650;
      texto(ctx, "operações na pilha", x, 90, 13, COR.cinza);
      texto(ctx, String(s.ops), x, 106, 40, fim ? COR.verde : COR.tinta, 700);
      texto(ctx, "pares conferidos", x, 174, 13, COR.cinza);
      texto(ctx, String(s.comps), x, 190, 26, COR.tinta, 700);
      texto(ctx, "memória extra agora", x, 244, 13, COR.cinza);
      texto(ctx, `${s.pilha.length} ${s.pilha.length === 1 ? "símbolo" : "símbolos"}`, x, 260, 20, COR.tinta, 700);
      texto(ctx, `pico até aqui: ${s.pico}`, x, 288, 13, fim ? COR.verde : COR.cinza, fim ? 600 : 400);
      texto(ctx, `n = ${N} símbolos`, x, 330, 13, COR.cinza);
      legendaCores(ctx, [[COR.mexeu, "lendo agora"], [COR.tinta, "abriu e espera o par"], [COR.cinza, "já resolvido"], [COR.palido, "falta ler"]], 500);

      if (fim && r.certo) legenda(ctx, [["balanceado: ", ""], [`${r.ops} operações na pilha`, "g"]]);
      else if (fim) legenda(ctx, [["não balanceado (", ""], [MOTIVO[s.erro.motivo], "b"], ["): ", ""], [`${r.ops} operações`, "g"]]);
      else if (s.ops < 6) legenda(ctx, [[ideia[0], ""]]);
      else legenda(ctx, [[ideia[ideia.length - 1], ""]]);
    }

    const contagemEm = (u) => { const k = tl.eventoEm(u); return k >= 0 ? est[k].ops : 0; };
    return {
      total: tl.total, desenhar, ...comum(tl, est, pesos, RITMO.parenteses, accelerando),
      resumo: { ops: r.ops, certo: r.certo, pico: r.pico, n: N }, contagemEm,
      medidor: () => `${r.ops} operações na pilha, n = ${N}<br>pilha de até ${r.pico}`,
      aoVivo: (u, cfg) => `Tocando agora: n = ${N}, ${cfg.rotulo}; ${contagemEm(u)} de ${r.ops} operações na pilha, ${r.certo ? "balanceado" : "não balanceado"}, pilha de até ${r.pico} ${r.pico === 1 ? "símbolo" : "símbolos"}.`,
    };
  }

  // ---------- fila de atendimento ----------

  function simAtendimento(faixa, chegada, duracao, accelerando) {
    const r = Algoritmos.atendimento(chegada, duracao);
    const N = chegada.length, ideia = faixa.video.ideia;
    // o minuto de cada evento: quando chega, quando o caixa chama, quando começa
    let t = 0, casas = [null], inicio = 0, atendendo = null, ops = 0, soma = 0, atendidos = 0, maior = 0, naFila = 0;
    const serie = [[0, 0]];             // [minuto, tamanho da fila]
    const est = r.eventos.map((e) => {
      if (e.t === "enfileira") { t = e.tempo; casas = e.casas; inicio = e.inicio; ops++; naFila++; }
      else if (e.t === "chama") { t = e.tempo; casas = e.casas; inicio = e.inicio; ops++; naFila--; }
      else if (e.t === "direto") t = e.tempo;
      else if (e.t === "atende") { atendendo = e; soma += e.espera; atendidos++; }
      else if (e.t === "maior") maior = e.maior;
      if (e.t === "enfileira" || e.t === "chama") {   // no mesmo minuto, vale o tamanho depois do último evento
        if (serie.at(-1)[0] === t) serie.at(-1)[1] = naFila; else serie.push([t, naFila]);
      }
      return { t: e.t, linha: e.linha, vars: e.vars, nivel: 0, chamada: 0, tempo: t, casas, inicio, naFila, atendendo, ops, soma, atendidos, maior, e };
    });
    if (ops !== r.ops || soma !== r.soma) throw new Error("reprodução do atendimento não bate");
    const fimDia = Math.max(...r.eventos.filter((e) => e.t === "atende").map((e) => e.fim));
    // ritmo constante: cada evento é um passo, e o relógio anda dentro dele até o minuto do próximo.
    // accelerando: um tempinho em cada evento, mais os minutos até o próximo (o dia corre como um relógio)
    const MIN = 0.5, HOLD = accelerando ? { enfileira: 1.2, chama: 1.2, direto: 1.2, atende: 0.6, testa: 0.15, maior: 0.3, devolva: 2 } : {};
    const pesos = !accelerando ? est.map(() => 1)
      : est.map((s, k) => (HOLD[s.t] || 0) + MIN * ((k + 1 < est.length ? est[k + 1].tempo : fimDia) - s.tempo));
    const tl = linhaDoTempo(pesos);
    const relogio = (u, k) => {
      if (k < 0) return 0;
      const s = est[k], h = HOLD[s.t] || 0, prox = k + 1 < est.length ? est[k + 1].tempo : fimDia;
      return s.tempo + Math.max(0, Math.min(1, (u - tl.inicio[k] - h) / Math.max(1e-9, pesos[k] - h))) * (prox - s.tempo);
    };
    const GX0 = 70, GX1 = 600, GY0 = 250, GY1 = 420, ymax = Math.max(1, r.maior);
    const gx = (m) => GX0 + m / fimDia * (GX1 - GX0), gy = (q) => GY1 - q / ymax * (GY1 - GY0 - 10);

    function desenhar(ctx, u) {
      const k = tl.eventoEm(u), fim = u >= tl.total, agora = fim ? fimDia : relogio(u, k);
      const s = k >= 0 ? est[k] : { casas: [null], inicio: 0, naFila: 0, atendendo: null, ops: 0, soma: 0, atendidos: 0, maior: 0 };
      // o caixa
      const at = s.atendendo && agora < s.atendendo.fim ? s.atendendo : null;
      ctx.strokeStyle = COR.tinta; ctx.lineWidth = 2; ctx.strokeRect(GX0, 92, 110, 74);
      texto(ctx, "caixa", GX0 + 55, 74, 11, COR.cinza, 400, "center");
      if (at) {
        texto(ctx, `cliente ${at.k + 1}`, GX0 + 55, 108, 14, COR.tinta, 600, "center");
        const f = Math.min(1, (agora - at.inicio) / (at.fim - at.inicio));
        ctx.fillStyle = COR.claro; ctx.fillRect(GX0 + 12, 138, 86, 8);
        ctx.fillStyle = COR.tinta; ctx.fillRect(GX0 + 12, 138, 86 * f, 8);
      } else texto(ctx, "livre", GX0 + 55, 116, 14, COR.cinza, 400, "center");
      // a fila circular, casa por casa, com o início e o fim marcados
      const C = s.casas.length, FX0 = 220, cwid = Math.min(40, (GX1 - FX0) / C);
      texto(ctx, `fila circular: ${C} ${C === 1 ? "casa" : "casas"} (dobra quando enche)`, FX0, 74, 11, COR.cinza);
      s.casas.forEach((c, i) => {
        const xx = FX0 + i * cwid, mexeu = k >= 0 && (s.t === "enfileira" || s.t === "chama") && est[k].e.i === c && c !== null;
        ctx.fillStyle = c === null ? "#fff" : mexeu ? COR.mexeu : COR.claro;
        ctx.fillRect(xx + 1, 92, cwid - 2, 40);
        ctx.strokeStyle = COR.borda; ctx.lineWidth = 1; ctx.strokeRect(xx + 1, 92, cwid - 2, 40);
        if (c !== null) texto(ctx, String(c + 1), xx + cwid / 2, 104, Math.min(14, cwid * 0.45), mexeu ? "#fff" : COR.tinta, 600, "center");
      });
      if (s.naFila > 0) {
        texto(ctx, "▲ início", FX0 + s.inicio * cwid + 2, 138, 11, COR.tinta);
        const ult = (s.inicio + s.naFila - 1) % C;
        if (ult !== s.inicio) texto(ctx, "▲ fim", FX0 + ult * cwid + 2, 154, 11, COR.tinta);
      }
      // o tamanho da fila ao longo do dia, até o minuto de agora
      texto(ctx, "clientes na fila ao longo do tempo", GX0, GY0 - 22, 11, COR.cinza);
      linha(ctx, GX0, GY1, GX1, GY1, COR.palido);
      for (let q = 0; q <= ymax; q += Math.max(1, Math.ceil(ymax / 4))) texto(ctx, String(q), GX0 - 8, gy(q) - 7, 11, COR.cinza, 400, "right");
      for (const c of chegada) if (c <= agora) linha(ctx, gx(c), GY1 + 3, gx(c), GY1 + 9, COR.cinza);
      texto(ctx, "chegadas", GX0, GY1 + 14, 11, COR.cinza);
      ctx.strokeStyle = COR.tinta; ctx.lineWidth = 2; ctx.beginPath();
      let q = 0;
      ctx.moveTo(gx(0), gy(0));
      for (const [m, tam] of serie) { if (m > agora) break; ctx.lineTo(gx(m), gy(q)); ctx.lineTo(gx(m), gy(tam)); q = tam; }
      ctx.lineTo(gx(agora), gy(q)); ctx.stroke();

      const x = 650;
      texto(ctx, "operações na fila", x, 90, 13, COR.cinza);
      texto(ctx, String(s.ops), x, 106, 40, fim ? COR.verde : COR.tinta, 700);
      texto(ctx, "espera média até aqui", x, 174, 13, COR.cinza);
      texto(ctx, s.atendidos ? `${decimal(s.soma / s.atendidos)} min` : "—", x, 190, 26, COR.tinta, 700);
      texto(ctx, "memória extra agora", x, 244, 13, COR.cinza);
      texto(ctx, `${s.naFila} ${s.naFila === 1 ? "cliente" : "clientes"}`, x, 260, 20, COR.tinta, 700);
      texto(ctx, `maior fila até aqui: ${s.maior}`, x, 288, 13, fim ? COR.verde : COR.cinza, fim ? 600 : 400);
      texto(ctx, `n = ${N} clientes`, x, 330, 13, COR.cinza);
      texto(ctx, `minuto ${Math.floor(agora)}`, x, 350, 13, COR.cinza);
      legendaCores(ctx, [[COR.mexeu, "acabou de entrar ou sair"], [COR.claro, "esperando"]], 480);

      if (fim) legenda(ctx, [["espera média ", ""], [`${decimal(r.soma / N)} min`, "g"], [`, maior fila: ${r.maior}`, ""]]);
      else if (s.ops < 4) legenda(ctx, [[ideia[0], ""]]);
      else legenda(ctx, [[ideia[ideia.length - 1], ""]]);
    }

    const contagemEm = (u) => { const k = tl.eventoEm(u); return k >= 0 ? est[k].ops : 0; };
    return {
      total: tl.total, desenhar, ...comum(tl, est, pesos, RITMO.atendimento, accelerando),
      resumo: { ops: r.ops, soma: r.soma, maior: r.maior, pico: r.pico, n: N }, contagemEm,
      medidor: () => `${r.ops} operações na fila, n = ${N}<br>fila de até ${r.maior}`,
      aoVivo: (u, cfg) => `Tocando agora: ${N} clientes, ${cfg.rotulo}; ${contagemEm(u)} de ${r.ops} operações na fila, espera média de ${decimal(r.soma / N)} min, maior fila de ${r.maior}.`,
    };
  }

  // ---------- fila de prioridade: o pronto-socorro ----------

  function simPrioridade(faixa, chegada, duracao, gravidade, accelerando) {
    const r = Algoritmos.prioridade(chegada, duracao, gravidade);
    const N = chegada.length, ideia = faixa.video.ideia;
    // o heap depois de cada inserir e tirar (pares [gravidade, paciente]) e as casas que a operação escreveu
    let t = 0, casas = [], escritas = [], atendendo = null, ops = 0, soma = 0, atendidos = 0, maior = 0;
    const serie = [[0, 0]];             // [minuto, pacientes no heap]
    const est = r.eventos.map((e) => {
      escritas = [];
      if (e.t === "insere" || e.t === "chama") { t = e.tempo; casas = e.casas; escritas = e.escritas; ops = e.acessos; }
      else if (e.t === "direto") t = e.tempo;
      else if (e.t === "atende") { atendendo = e; soma += e.espera; atendidos++; }
      else if (e.t === "maior") maior = e.maior;
      if (e.t === "insere" || e.t === "chama") {
        if (serie.at(-1)[0] === t) serie.at(-1)[1] = casas.length; else serie.push([t, casas.length]);
      }
      return { t: e.t, linha: e.linha, vars: e.vars, nivel: 0, chamada: 0, tempo: t, casas, escritas, atendendo, ops, soma, atendidos, maior, e };
    });
    if (ops !== r.ops || soma !== r.soma) throw new Error("reprodução do pronto-socorro não bate");
    const fimDia = Math.max(...r.eventos.filter((e) => e.t === "atende").map((e) => e.fim));
    const MIN = 0.5, HOLD = accelerando ? { insere: 1.2, chama: 1.2, direto: 1.2, atende: 0.6, testa: 0.15, maior: 0.3, devolva: 2 } : {};
    const pesos = !accelerando ? est.map(() => 1)
      : est.map((s, k) => (HOLD[s.t] || 0) + MIN * ((k + 1 < est.length ? est[k + 1].tempo : fimDia) - s.tempo));
    const tl = linhaDoTempo(pesos);
    const relogio = (u, k) => {
      if (k < 0) return 0;
      const s = est[k], h = HOLD[s.t] || 0, prox = k + 1 < est.length ? est[k + 1].tempo : fimDia;
      return s.tempo + Math.max(0, Math.min(1, (u - tl.inicio[k] - h) / Math.max(1e-9, pesos[k] - h))) * (prox - s.tempo);
    };
    const kChama = (() => { const j = est.findIndex((s) => s.t === "chama"); return j < 0 ? Infinity : j; })();   // a legenda troca no primeiro chamado
    // a espera média de cada gravidade, no fim do dia
    const G = faixa.exemplo.gravidades[1], medias = Array.from({ length: G }, (_, j) => {
      const w = r.esperas.filter((_, k) => gravidade[k] === j + 1);
      return w.length ? w.reduce((a, b) => a + b, 0) / w.length : null;
    });

    // geometria: o médico e o heap em cima (a árvore e o vetor embaixo dela), a fila ao longo do dia embaixo
    const GX0 = 70, GX1 = 600, HX0 = 210, NIV = Math.floor(Math.log2(Math.max(1, r.maior))) + 1;
    const TY0 = 96, TY1 = 212, DY = (TY1 - TY0) / Math.max(1, NIV - 1);
    const R = Math.min(15, (GX1 - HX0) / 2 ** (NIV - 1) * 0.42);
    const pos = (i) => { const d = Math.floor(Math.log2(i + 1)), j = i + 1 - 2 ** d; return [HX0 + (j + 0.5) * (GX1 - HX0) / 2 ** d, TY0 + d * DY]; };
    const GY0 = 330, GY1 = 430, ymax = Math.max(1, r.maior);
    const gx = (m) => GX0 + m / fimDia * (GX1 - GX0), gy = (q) => GY1 - q / ymax * (GY1 - GY0 - 10);

    function desenhar(ctx, u) {
      const k = tl.eventoEm(u), fim = u >= tl.total, agora = fim ? fimDia : relogio(u, k);
      const s = k >= 0 ? est[k] : { casas: [], escritas: [], atendendo: null, ops: 0, soma: 0, atendidos: 0, maior: 0 };
      const mexeu = new Set(s.escritas);
      // o médico
      const at = s.atendendo && agora < s.atendendo.fim ? s.atendendo : null;
      ctx.strokeStyle = COR.tinta; ctx.lineWidth = 2; ctx.strokeRect(GX0, 92, 110, 74);
      texto(ctx, "médico", GX0 + 55, 74, 11, COR.cinza, 400, "center");
      if (at) {
        texto(ctx, `paciente ${at.k + 1}`, GX0 + 55, 100, 14, COR.tinta, 600, "center");
        texto(ctx, `gravidade ${at.g}`, GX0 + 55, 118, 11, COR.cinza, 400, "center");
        const f = Math.min(1, (agora - at.inicio) / (at.fim - at.inicio));
        ctx.fillStyle = COR.claro; ctx.fillRect(GX0 + 12, 142, 86, 8);
        ctx.fillStyle = COR.tinta; ctx.fillRect(GX0 + 12, 142, 86 * f, 8);
      } else texto(ctx, "livre", GX0 + 55, 116, 14, COR.cinza, 400, "center");

      // o heap: a árvore (no nó, a gravidade; embaixo, o paciente) e o vetor por baixo
      texto(ctx, `fila de prioridade: o heap, ${s.casas.length} ${s.casas.length === 1 ? "paciente" : "pacientes"}`, HX0, 62, 11, COR.cinza);
      for (let i = 1; i < s.casas.length; i++) { const [x0, y0] = pos((i - 1) >> 1), [x1, y1] = pos(i); linha(ctx, x0, y0, x1, y1, COR.palido, 1.5); }
      s.casas.forEach(([g, p], i) => {
        const [x, y] = pos(i), m = mexeu.has(i);
        ctx.beginPath(); ctx.arc(x, y, R, 0, 7);
        ctx.fillStyle = m ? COR.mexeu : "#fff"; ctx.fill();
        ctx.strokeStyle = COR.tinta; ctx.lineWidth = 1.5; ctx.stroke();
        texto(ctx, String(g), x, y - Math.min(8, R * 0.55), Math.min(15, R * 1.05), m ? "#fff" : COR.tinta, 700, "center");
        if (R >= 9) texto(ctx, `p${p + 1}`, x, y + R + 2, 9, COR.cinza, 400, "center");
      });
      const VY = 262, cw = Math.min(30, (GX1 - HX0) / Math.max(8, s.casas.length));
      texto(ctx, "o vetor por baixo: a casa i é o nó i", HX0, VY - 18, 11, COR.cinza);
      s.casas.forEach(([g], i) => {
        const xx = HX0 + i * cw, m = mexeu.has(i);
        ctx.fillStyle = m ? COR.mexeu : COR.claro; ctx.fillRect(xx + 1, VY, cw - 2, 26);
        ctx.strokeStyle = COR.borda; ctx.lineWidth = 1; ctx.strokeRect(xx + 1, VY, cw - 2, 26);
        if (cw >= 12) texto(ctx, String(g), xx + cw / 2, VY + 6, Math.min(13, cw * 0.5), m ? "#fff" : COR.tinta, 600, "center");
      });

      // quantos esperam, ao longo do dia, até o minuto de agora
      texto(ctx, "pacientes esperando ao longo do tempo", GX0, GY0 - 22, 11, COR.cinza);
      linha(ctx, GX0, GY1, GX1, GY1, COR.palido);
      for (let q = 0; q <= ymax; q += Math.max(1, Math.ceil(ymax / 4))) texto(ctx, String(q), GX0 - 8, gy(q) - 7, 11, COR.cinza, 400, "right");
      for (const c of chegada) if (c <= agora) linha(ctx, gx(c), GY1 + 3, gx(c), GY1 + 9, COR.cinza);
      texto(ctx, "chegadas", GX0, GY1 + 14, 11, COR.cinza);
      ctx.strokeStyle = COR.tinta; ctx.lineWidth = 2; ctx.beginPath();
      let q = 0;
      ctx.moveTo(gx(0), gy(0));
      for (const [m, tam] of serie) { if (m > agora) break; ctx.lineTo(gx(m), gy(q)); ctx.lineTo(gx(m), gy(tam)); q = tam; }
      ctx.lineTo(gx(agora), gy(q)); ctx.stroke();

      const x = 650;
      texto(ctx, "acessos ao heap", x, 90, 13, COR.cinza);
      texto(ctx, String(s.ops), x, 106, 40, fim ? COR.verde : COR.tinta, 700);
      texto(ctx, "espera média até aqui", x, 174, 13, COR.cinza);
      texto(ctx, s.atendidos ? `${decimal(s.soma / s.atendidos)} min` : "—", x, 190, 26, COR.tinta, 700);
      texto(ctx, "memória extra agora", x, 244, 13, COR.cinza);
      texto(ctx, `${s.casas.length} ${s.casas.length === 1 ? "paciente" : "pacientes"} no heap`, x, 260, 20, COR.tinta, 700);
      texto(ctx, `maior fila até aqui: ${s.maior}`, x, 288, 13, fim ? COR.verde : COR.cinza, fim ? 600 : 400);
      texto(ctx, `n = ${N} pacientes`, x, 330, 13, COR.cinza);
      texto(ctx, `minuto ${Math.floor(agora)}`, x, 350, 13, COR.cinza);
      if (fim) medias.forEach((m, j) => texto(ctx, `gravidade ${j + 1}: ${m === null ? "ninguém" : `${decimal(m)} min`}`, x, 382 + j * 18, 12, j === 0 ? COR.verde : COR.cinza, j === 0 ? 600 : 400));
      legendaCores(ctx, [[COR.mexeu, "casa escrita agora (o caminho que subiu ou desceu)"], ["#fff", "no nó: a gravidade, 1 = a mais urgente", COR.tinta]], 486);

      if (fim) legenda(ctx, [["gravidade 1 ", ""], [medias[0] === null ? "ninguém chegou" : `espera ${decimal(medias[0])} min`, "g"],
        [`; gravidade ${G}, ${medias[G - 1] === null ? "ninguém chegou" : `${decimal(medias[G - 1])} min`}`, ""]]);
      else if (k < kChama) legenda(ctx, [[ideia[0], ""]]);
      else legenda(ctx, [[ideia[ideia.length - 1], ""]]);
    }

    const contagemEm = (u) => { const k = tl.eventoEm(u); return k >= 0 ? est[k].ops : 0; };
    return {
      total: tl.total, desenhar, ...comum(tl, est, pesos, RITMO.atendimento, accelerando),
      resumo: { ops: r.ops, soma: r.soma, maior: r.maior, pico: r.pico, n: N }, contagemEm,
      medidor: () => `${r.ops} acessos ao heap, n = ${N}<br>heap de até ${r.maior}`,
      aoVivo: (u, cfg) => `Tocando agora: ${N} pacientes, ${cfg.rotulo}; ${contagemEm(u)} de ${r.ops} acessos ao heap, espera média de ${decimal(r.soma / N)} min, maior fila de ${r.maior}.`,
    };
  }

  // ---------- inverter lista encadeada ----------

  function simInverter(faixa, valores, accelerando) {
    const r = Algoritmos.inverter(valores);
    const N = valores.length, ideia = faixa.video.ideia;
    // o próx de cada nó (pela posição na lista de entrada); virar é apontar para o vizinho da esquerda
    const prox = valores.map((_, i) => (i + 1 < N ? i + 1 : null));
    let ops = 0, casas = 0, lido = null, virou = null, inicio = N ? 0 : null;
    const id = (p) => (p === null ? null : p - 1);
    const est = r.eventos.map((e) => {
      lido = null; virou = null;
      if (e.t === "proximo") { lido = e.i; casas++; }
      else if (e.t === "vira") { prox[e.i] = e.de; virou = e.i; ops++; casas++; }
      else if (e.fim) inicio = id(e.vars.anterior);
      return { t: e.t, linha: e.linha, vars: e.vars, nivel: 0, chamada: 0, prox: prox.slice(), ops, casas, lido, virou, inicio,
        anterior: id(e.vars.anterior), atual: id(e.vars.atual), proximo: id(e.vars["próximo"]), fim: !!e.fim };
    });
    if (ops !== r.ops || casas !== r.casas) throw new Error("reprodução da inversão não bate");
    const pesos = !accelerando ? est.map(() => 1) : pesosLentos(est, { atribui: 0.5, testa: 0.4, proximo: 1, vira: 1.6 }, (t) => t === "vira", 2, 2.5);
    const tl = linhaDoTempo(pesos);
    const X0 = 60, X1 = 620, passo = Math.min(84, (X1 - X0) / Math.max(1, N)), NW = Math.min(64, passo - 16), VW = NW / 2, NY = 190, NH = 40;
    const nx = (i) => X0 + i * passo + (passo - NW) / 2;

    function desenhar(ctx, u) {
      const k = tl.eventoEm(u), fim = u >= tl.total;
      const s = k >= 0 ? est[k] : { prox: valores.map((_, i) => (i + 1 < N ? i + 1 : null)), ops: 0, casas: 0, lido: null, virou: null, inicio: N ? 0 : null, anterior: null, atual: null, proximo: null, fim: false };
      for (let i = 0; i < N; i++) {
        const x = nx(i);
        texto(ctx, `nó ${i + 1}`, x + NW / 2, NY - 22, 11, COR.cinza, 400, "center");
        ctx.fillStyle = "#fff"; ctx.fillRect(x, NY, VW, NH);
        ctx.fillStyle = s.virou === i ? COR.mexeu : s.lido === i ? COR.claro : "#fff"; ctx.fillRect(x + VW, NY, VW, NH);
        ctx.strokeStyle = COR.tinta; ctx.lineWidth = 1.5; ctx.strokeRect(x, NY, VW, NH); ctx.strokeRect(x + VW, NY, VW, NH);
        if (s.lido === i) { ctx.strokeStyle = COR.album; ctx.lineWidth = 2.5; ctx.strokeRect(x + VW + 1, NY + 1, VW - 2, NH - 2); }
        texto(ctx, String(valores[i]), x + VW / 2, NY + NH / 2 - 9, Math.min(17, VW * 0.55), fim ? COR.verde : COR.tinta, 600, "center");
        if (s.prox[i] === null) texto(ctx, "∅", x + VW * 1.5, NY + NH / 2 - 9, 16, s.virou === i ? "#fff" : COR.cinza, 600, "center");
        // a seta do próx: para a direita por cima do vão; para trás, por baixo, em cotovelo
        const cor = s.virou === i ? COR.mexeu : COR.tinta;
        if (s.prox[i] === i + 1) {
          linha(ctx, x + NW - VW / 2, NY + NH / 2, nx(i + 1) - 2, NY + NH / 2, cor, 2);
          pontaSeta(ctx, nx(i + 1) - 2, NY + NH / 2, 0, cor);
        } else if (s.prox[i] === i - 1) {
          const fundo = NY + NH + 16 + (i % 2) * 12, xa = x + VW * 1.5, xb = nx(i - 1) + VW / 2;
          ctx.strokeStyle = cor; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(xa, NY + NH / 2); ctx.lineTo(xa, fundo); ctx.lineTo(xb, fundo); ctx.lineTo(xb, NY + NH + 3); ctx.stroke();
          pontaSeta(ctx, xb, NY + NH + 3, -Math.PI / 2, cor);
        }
      }
      // o início da lista, por cima; os três ponteiros, por baixo (nulo: fora da lista, à esquerda ou à direita)
      if (s.inicio !== null) {
        const x = nx(s.inicio) + VW / 2, cor = fim ? COR.verde : COR.tinta;
        texto(ctx, "início", x, NY - 78, 12, cor, 600, "center");
        linha(ctx, x, NY - 62, x, NY - 26, cor, 2); pontaSeta(ctx, x, NY - 26, Math.PI / 2, cor);
      }
      if (!fim && k >= 0) {
        const marcas = [["anterior", s.anterior, COR.tinta], ["atual", s.atual, COR.mexeu], ["próximo", s.proximo, COR.cinza]];
        const y = NY + NH + 54;
        marcas.filter(([, p]) => p !== null).forEach(([nome, p, cor], j, vivas) => {
          const x = nx(p) + NW / 2, dy = vivas.slice(0, j).filter((m) => m[1] === p).length * 34;   // dois ponteiros no mesmo nó: um embaixo do outro
          ctx.fillStyle = cor; ctx.beginPath(); ctx.moveTo(x, y + dy); ctx.lineTo(x - 6, y + dy + 10); ctx.lineTo(x + 6, y + dy + 10); ctx.fill();
          texto(ctx, nome, x, y + dy + 13, 12, cor, 600, "center");
        });
        const nulos = marcas.filter(([, p]) => p === null).map(([nome]) => nome);   // fora da lista: só dizer
        if (nulos.length) texto(ctx, `${nulos.join(" e ")} ${nulos.length === 1 ? "aponta" : "apontam"} para nulo`, X0, y + 86, 12, COR.cinza);
      }
      if (fim) {
        texto(ctx, "a lista agora, do início ao fim:", X0, 360, 13, COR.cinza);
        texto(ctx, r.invertida.join(" → "), X0, 382, Math.min(18, 900 / Math.max(1, N * 5)), COR.verde, 600);
      }

      const x = 680;
      texto(ctx, "ponteiros trocados", x, 90, 13, COR.cinza);
      texto(ctx, `${s.ops}`, x, 106, 40, fim ? COR.verde : COR.tinta, 700);
      texto(ctx, "casas lidas e escritas", x, 174, 13, COR.cinza);
      texto(ctx, String(s.casas), x, 190, 26, COR.tinta, 700);
      texto(ctx, "memória extra", x, 244, 13, COR.cinza);
      texto(ctx, "3 ponteiros", x, 260, 20, COR.tinta, 700);
      texto(ctx, "nenhum valor copiado", x, 288, 13, fim ? COR.verde : COR.cinza, fim ? 600 : 400);
      texto(ctx, `n = ${N} nós`, x, 330, 13, COR.cinza);
      legendaCores(ctx, [[COR.claro, "próx lido agora", COR.album, 2], [COR.mexeu, "próx virado agora"]], 480);

      if (fim) legenda(ctx, [["invertida: ", ""], [`${r.ops} ponteiros trocados`, "g"], [", nenhum valor saiu do lugar", ""]]);
      else if (s.ops < 2) legenda(ctx, [[ideia[0], ""]]);
      else legenda(ctx, [[ideia[ideia.length - 1], ""]]);
    }

    const contagemEm = (u) => { const k = tl.eventoEm(u); return k >= 0 ? est[k].ops : 0; };
    return {
      total: tl.total, desenhar, ...comum(tl, est, pesos, RITMO.inverter, accelerando),
      resumo: { ops: r.ops, pico: 0, n: N }, contagemEm,
      medidor: () => `${r.ops} ponteiros trocados, n = ${N}<br>3 ponteiros, nenhum valor`,
      aoVivo: (u, cfg) => `Tocando agora: ${N} nós, ${cfg.rotulo}; ${contagemEm(u)} de ${r.ops} ponteiros trocados, sem memória extra além de três ponteiros.`,
    };
  }

  function pontaSeta(ctx, x, y, ang, cor) {
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 9 * Math.cos(ang - 0.45), y - 9 * Math.sin(ang - 0.45));
    ctx.lineTo(x - 9 * Math.cos(ang + 0.45), y - 9 * Math.sin(ang + 0.45));
    ctx.fill();
  }

  // ---------- máximo em janela deslizante ----------

  function simJanela(faixa, v, K, accelerando) {
    const r = Algoritmos.janela(v, K);
    const N = v.length, ideia = faixa.video.ideia;
    const dq = [], achados = [];
    let i = -1, foco = null, comps = 0, pico = 0;
    const est = r.eventos.map((e) => {
      foco = null;
      if (e.t === "le") i = e.i;
      else if (e.t === "compara") { comps++; foco = e.j; }
      else if (e.t === "tira") { if (e.ponta === "frente") dq.shift(); else dq.pop(); foco = e.j; }
      else if (e.t === "poe") dq.push(e.i);
      else if (e.t === "maximo") achados.push(e.m);
      pico = Math.max(pico, dq.length);
      const ing = achados.length ? r.ingenuoAte[achados.length - 1] : 0;   // o ingênuo, até a última janela já fechada
      return { t: e.t, linha: e.linha, vars: e.vars, nivel: 0, chamada: 0, i, foco, dq: dq.slice(), nAchados: achados.length, comps, pico, ing, ponta: e.ponta };
    });
    if (comps !== r.ops || pico !== r.pico) throw new Error("reprodução da janela não bate");
    const pesos = !accelerando ? est.map(() => 1)
      : pesosLentos(est, { le: 0.4, testa: 0.3, compara: 1, tira: 1.2, poe: 1, maximo: 1.2, atribui: 0.4, devolva: 2 }, (t) => t === "maximo", 3, 2.5);
    const tl = linhaDoTempo(pesos);
    const X0 = 70, X1 = 610, cw = Math.min(40, (X1 - X0) / N), VY = 120, SW = Math.min(58, (X1 - X0) / Math.max(K, 1)), DY = 236, MY = 350;
    const tam = Math.min(15, cw * 0.5);

    function desenhar(ctx, u) {
      const k = tl.eventoEm(u), fim = u >= tl.total;
      const s = k >= 0 ? est[k] : { i: -1, foco: null, dq: [], nAchados: 0, comps: 0, pico: 0, ing: 0 };
      // o vetor, com a janela que termina no da vez
      texto(ctx, "vetor", X0, VY - 46, 11, COR.cinza);
      const a = Math.max(0, s.i - K + 1);
      for (let p = 0; p < N; p++) {
        const x = X0 + p * cw, dentro = s.i >= 0 && p >= a && p <= s.i && !fim;
        ctx.fillStyle = p === s.i && !fim ? COR.mexeu : dentro ? COR.claro : "#fff";
        ctx.fillRect(x + 1, VY, cw - 2, 34);
        ctx.strokeStyle = s.foco === p && !fim ? COR.album : dentro ? COR.tinta : COR.borda;
        ctx.lineWidth = s.foco === p && !fim ? 2.5 : 1;
        ctx.strokeRect(x + 1, VY, cw - 2, 34);
        texto(ctx, String(v[p]), x + cw / 2, VY + 17 - tam * 0.6, tam, p === s.i && !fim ? "#fff" : COR.tinta, 600, "center");
        if (cw >= 22 || p % 2 === 0) texto(ctx, String(p + 1), x + cw / 2, VY + 38, 9, COR.cinza, 400, "center");
      }
      if (s.i >= 0 && !fim) {
        const xa = X0 + a * cw, xb = X0 + (s.i + 1) * cw;
        linha(ctx, xa + 1, VY - 10, xb - 1, VY - 10, COR.tinta, 3);
        texto(ctx, s.i >= K - 1 ? `janela de ${K}` : `janela enchendo (${s.i + 1} de ${K})`, (xa + xb) / 2, VY - 30, 11, COR.tinta, 400, "center");
      }
      // o deque: posições da frente para o fundo, cada uma com o seu valor
      texto(ctx, "deque de posições (frente → fundo)", X0, DY - 24, 11, COR.cinza);
      for (let j = 0; j < Math.max(K, s.dq.length); j++) {
        const x = X0 + j * SW, p = s.dq[j];
        ctx.strokeStyle = COR.borda; ctx.lineWidth = 1; ctx.setLineDash(p === undefined ? [3, 3] : []);
        ctx.strokeRect(x + 2, DY, SW - 6, 46); ctx.setLineDash([]);
        if (p === undefined) continue;
        const novo = k >= 0 && est[k].t === "poe" && j === s.dq.length - 1, comparado = s.foco === p && est[k].t === "compara";
        ctx.fillStyle = novo ? COR.mexeu : COR.claro; ctx.fillRect(x + 3, DY + 1, SW - 8, 44);
        if (comparado) { ctx.strokeStyle = COR.album; ctx.lineWidth = 2.5; ctx.strokeRect(x + 3, DY + 1, SW - 8, 44); }
        texto(ctx, String(v[p]), x + SW / 2 - 1, DY + 6, Math.min(17, SW * 0.32), novo ? "#fff" : COR.tinta, 600, "center");
        texto(ctx, `pos ${p + 1}`, x + SW / 2 - 1, DY + 28, 10, novo ? "#fff" : COR.cinza, 400, "center");
      }
      if (s.dq.length) {
        texto(ctx, "frente", X0 + SW / 2 - 1, DY + 52, 11, COR.tinta, 600, "center");
        if (s.dq.length > 1) texto(ctx, "fundo", X0 + (s.dq.length - 0.5) * SW - 1, DY + 52, 11, COR.tinta, 600, "center");
      }
      // os máximos já achados, embaixo da casa em que cada janela termina: são o resultado
      texto(ctx, "máximo de cada janela", X0, MY - 22, 11, COR.cinza);
      for (let j = 0; j < s.nAchados; j++) {
        const x = X0 + (j + K - 1) * cw;
        texto(ctx, String(r.maximos[j]), x + cw / 2, MY, tam, COR.verde, 600, "center");
      }

      const x = 680;
      texto(ctx, "comparações", x, 90, 13, COR.cinza);
      texto(ctx, String(s.comps), x, 106, 40, fim ? COR.verde : COR.tinta, 700);
      texto(ctx, "o ingênuo, até aqui", x, 174, 13, COR.cinza);
      texto(ctx, String(fim ? r.ingenuo : s.ing), x, 190, 26, COR.tinta, 700);
      texto(ctx, `de ${r.ingenuo} no total`, x, 222, 12, COR.cinza);
      texto(ctx, "memória extra agora", x, 256, 13, COR.cinza);
      texto(ctx, `${s.dq.length} ${s.dq.length === 1 ? "posição" : "posições"}`, x, 272, 20, COR.tinta, 700);
      texto(ctx, `deque mais cheio: ${s.pico}`, x, 300, 13, fim ? COR.verde : COR.cinza, fim ? 600 : 400);
      texto(ctx, `n = ${N}, k = ${K}`, x, 342, 13, COR.cinza);
      legendaCores(ctx, [[COR.mexeu, "o da vez"], [COR.claro, "na janela, ou no deque"], ["#fff", "comparado", COR.album, 2.5]], 480);

      if (fim) legenda(ctx, [[`n = ${N}, k = ${K}: `, ""], [`${r.ops} comparações`, "g"], [` (o ingênuo: ${r.ingenuo})`, ""]]);
      else if (s.nAchados < 2) legenda(ctx, [[ideia[0], ""]]);
      else legenda(ctx, [[ideia[ideia.length - 1], ""]]);
    }

    const contagemEm = (u) => { const k = tl.eventoEm(u); return k >= 0 ? est[k].comps : 0; };
    return {
      total: tl.total, desenhar, ...comum(tl, est, pesos, RITMO.janela, accelerando),
      resumo: { ops: r.ops, pico: r.pico, n: N }, contagemEm,
      medidor: () => `${r.ops} comparações (ingênuo: ${r.ingenuo}), n = ${N}, k = ${K}<br>deque de até ${r.pico}`,
      aoVivo: (u, cfg) => `Tocando agora: n = ${N}, k = ${K}, ${cfg.rotulo}; ${contagemEm(u)} de ${r.ops} comparações (o ingênuo faria ${r.ingenuo}), deque de até ${r.pico} ${r.pico === 1 ? "posição" : "posições"}.`,
    };
  }

  // ---------- busca em largura e em profundidade ----------

  function simGrafo(faixa, k, arestas, accelerando) {
    const largura = faixa.alg === "largura", V = k * k;
    const r = Algoritmos[faixa.alg](V, arestas);
    const ideia = faixa.video.ideia, nomeEst = largura ? "fila" : "pilha";
    const chave = (u, v) => (u < v ? `${u},${v}` : `${v},${u}`);
    // papel de cada vértice: 0 = não visto, 1 = na fila ou na pilha, 2 = o da vez, 3 = já saiu
    const papel = new Array(V).fill(0), num = new Array(V).fill(null), arvore = new Set(), olhadas = new Set();
    const est_ = [];   // a fila ou a pilha: os vértices, do início (ou fundo) para o fim (ou topo)
    let vez = null, ops = 0, viz = 0, pico = 0, visitados = 0, olhando = null;   // olhando: a aresta da vez, até o próximo vértice
    const est = r.eventos.map((e) => {
      if (e.t === "visita" || e.t === "topo" || e.t === "desempilha" || e.t === "testa" || e.t === "devolva") olhando = null;
      if (e.t === "enfileira" || e.t === "empilha") {
        est_.push(e.v); papel[e.v] = 1; ops++;
        if (vez !== null) arvore.add(chave(vez, e.v));     // quem descobriu e quem foi descoberto
        if (largura) { if (num[e.v] === null) num[e.v] = 0; }   // a origem; os outros já ganharam a distância
        else { num[e.v] = ++visitados; if (vez !== null) papel[vez] = 1; vez = e.v; papel[e.v] = 2; }
      } else if (e.t === "visita") {
        est_.shift(); ops++;
        if (vez !== null) papel[vez] = 3;
        vez = e.u; papel[e.u] = 2;
      } else if (e.t === "topo") {
        ops++;
        if (vez !== null && vez !== e.u && papel[vez] === 2) papel[vez] = 1;
        vez = e.u; papel[e.u] = 2;
      } else if (e.t === "desempilha") {
        est_.pop(); ops++; papel[e.u] = 3; vez = null;
      } else if (e.t === "olha") {
        viz++; ops++; olhando = [e.u, e.v]; olhadas.add(chave(e.u, e.v));
      } else if (e.t === "atribui" && largura && e.v !== undefined) {
        num[e.v] = e.d;
      } else if (e.t === "devolva") {
        if (vez !== null) papel[vez] = 3;
        vez = null;
      }
      pico = Math.max(pico, est_.length);
      return { t: e.t, linha: e.linha, vars: e.vars, nivel: 0, chamada: 0, papel: papel.slice(), num: num.slice(), arvore: new Set(arvore),
        nOlhadas: olhadas.size, olhando, est: est_.slice(), ops, viz, pico };
    });
    if (ops !== r.ops || pico !== r.estrutura) throw new Error("reprodução da busca no grafo não bate");
    const pesos = !accelerando ? est.map(() => 1) : pesosLentos(est, { atribui: 0.4, enfileira: 1, empilha: 1, visita: 1.5, topo: 0.5, testa: 0.3,
      olha: 1, avanca: 0.2, compara: 0.4, desempilha: 1, devolva: 3 }, (t) => t === "olha", 6, 2.5);
    const tl = linhaDoTempo(pesos);

    // geometria: a grade à esquerda, a fila ou a pilha em pé no meio, o painel à direita
    const GX0 = 90, GY0 = 100, LADO = Math.min(360, 110 * (k - 1)), passo = LADO / Math.max(1, k - 1);
    const raio = Math.min(17, passo * 0.3);
    const pos = (u) => [GX0 + (u % k) * passo, GY0 + Math.floor(u / k) * passo];
    const SX = 540, SW = 64, SBASE = 470, sh = Math.min(28, 340 / Math.max(4, r.estrutura)), STOPO = SBASE - Math.max(4, r.estrutura) * sh;
    const maisLonge = largura ? Math.max(...r.dist) : null;

    function desenhar(ctx, u) {
      const k_ = tl.eventoEm(u), fim = u >= tl.total;
      const s = k_ >= 0 ? est[k_] : { papel: new Array(V).fill(0), num: new Array(V).fill(null), arvore: new Set(), olhando: null, est: [], ops: 0, viz: 0, pico: 0, nOlhadas: 0 };
      // arestas: as da árvore da busca em tinta; a que está sendo olhada em coral
      for (const [a, b] of arestas) {
        const [x0, y0] = pos(a), [x1, y1] = pos(b);
        const naArvore = s.arvore.has(chave(a, b));
        linha(ctx, x0, y0, x1, y1, naArvore ? COR.tinta : COR.palido, naArvore ? 3 : 1.5);
      }
      if (s.olhando && !fim) { const [x0, y0] = pos(s.olhando[0]), [x1, y1] = pos(s.olhando[1]); linha(ctx, x0, y0, x1, y1, COR.mexeu, 4); }
      for (let v = 0; v < V; v++) {
        const [x, y] = pos(v), p = fim ? 3 : s.papel[v];
        ctx.beginPath(); ctx.arc(x, y, raio, 0, 7);
        ctx.fillStyle = p === 2 ? COR.mexeu : p === 3 ? COR.claro : "#fff"; ctx.fill();
        ctx.strokeStyle = p === 0 ? COR.palido : p === 3 ? COR.cinza : COR.tinta; ctx.lineWidth = p === 1 ? 2.5 : 1.5; ctx.stroke();
        if (s.num[v] !== null) texto(ctx, String(s.num[v]), x, y - Math.min(8, raio * 0.5), Math.min(15, raio * 0.95), fim ? COR.verde : p === 2 ? "#fff" : COR.tinta, 700, "center");
        if (raio >= 9) texto(ctx, String(v + 1), x + raio * 0.75, y - raio - 11, 10, COR.cinza);
      }
      // a fila (o início em cima: sai por cima, entra por baixo) ou a pilha (o fundo embaixo, o topo em cima)
      texto(ctx, nomeEst, SX + SW / 2, STOPO - 36, 13, COR.cinza, 400, "center");
      linha(ctx, SX, STOPO - 14, SX, SBASE, COR.palido); linha(ctx, SX + SW, STOPO - 14, SX + SW, SBASE, COR.palido);
      if (!largura) linha(ctx, SX, SBASE, SX + SW, SBASE, COR.tinta, 2);
      const ult = k_ >= 0 ? est[k_].t : null;
      s.est.forEach((v, j) => {
        const y = largura ? STOPO + j * sh : SBASE - (j + 1) * sh;
        const novo = j === s.est.length - 1 && (ult === "enfileira" || ult === "empilha");
        ctx.fillStyle = novo ? COR.mexeu : COR.claro;
        ctx.fillRect(SX + 4, y + 1, SW - 8, sh - 2);
        if (sh >= 12) texto(ctx, String(v + 1), SX + SW / 2, y + sh / 2 - Math.min(8, sh * 0.38), Math.min(15, sh * 0.7), novo ? "#fff" : COR.tinta, 600, "center");
      });
      if (s.est.length) {
        if (largura) {
          texto(ctx, "← sai", SX + SW + 6, STOPO + sh / 2 - 7, 11, COR.cinza);
          texto(ctx, "← entra", SX + SW + 6, STOPO + (s.est.length - 1) * sh + sh / 2 - 7 + (s.est.length === 1 ? 14 : 0), 11, COR.cinza);
        } else texto(ctx, "topo", SX + SW + 6, SBASE - s.est.length * sh + sh / 2 - 7, 11, COR.cinza);
      }

      const x = 680;
      texto(ctx, "operações", x, 90, 13, COR.cinza);
      texto(ctx, String(s.ops), x, 106, 40, fim ? COR.verde : COR.tinta, 700);
      texto(ctx, "vizinhos olhados", x, 174, 13, COR.cinza);
      texto(ctx, `${s.viz} de ${2 * arestas.length}`, x, 190, 26, COR.tinta, 700);
      const fixo = largura ? V : 2 * V;
      texto(ctx, "memória extra agora", x, 244, 13, COR.cinza);
      texto(ctx, `${fixo} + ${s.est.length} ${nomeEst === "fila" ? "na fila" : "na pilha"}`, x, 260, 20, COR.tinta, 700);
      texto(ctx, `${nomeEst} mais ${largura ? "longa" : "alta"}: ${s.pico}`, x, 288, 13, fim ? COR.verde : COR.cinza, fim ? 600 : 400);
      texto(ctx, `V = ${V} vértices, E = ${arestas.length} arestas`, x, 330, 13, COR.cinza);
      texto(ctx, largura ? "no vértice: a distância à origem" : "no vértice: a ordem de visita", x, 350, 13, COR.cinza);
      legendaCores(ctx, [["#fff", "não visto", COR.palido], ["#fff", `na ${nomeEst}`, COR.tinta, 2], [COR.mexeu, "o da vez"], [COR.claro, "já saiu", COR.cinza], [COR.tinta, "aresta da árvore"]], 500);

      if (fim && largura) legenda(ctx, [["visitou os ", ""], [`${V} vértices`, "b"], [": ", ""], [`${r.ops} operações`, "g"], [`, o mais longe a ${maisLonge} arestas`, ""]]);
      else if (fim) legenda(ctx, [["visitou os ", ""], [`${V} vértices`, "b"], [": ", ""], [`${r.ops} operações`, "g"], [`, pilha de até ${r.estrutura}`, ""]]);
      else if (s.viz < 6) legenda(ctx, [[ideia[0], ""]]);
      else legenda(ctx, [[ideia[ideia.length - 1], ""]]);
    }

    const contagemEm = (u) => { const k_ = tl.eventoEm(u); return k_ >= 0 ? est[k_].ops : 0; };
    return {
      total: tl.total, desenhar, ...comum(tl, est, pesos, RITMO.grafo, accelerando),
      resumo: { ops: r.ops, pico: r.pico, n: V }, contagemEm,
      medidor: () => `${r.ops} operações, V = ${V}, E = ${arestas.length}<br>${nomeEst} de até ${r.estrutura}`,
      aoVivo: (u, cfg) => `Tocando agora: ${V} vértices e ${arestas.length} arestas, ${cfg.rotulo}; ${contagemEm(u)} de ${r.ops} operações, ${nomeEst} de até ${r.estrutura} ${r.estrutura === 1 ? "vértice" : "vértices"}.`,
    };
  }

  // ---------- Dijkstra ----------

  function simDijkstra(faixa, k, arestas, pesos, accelerando) {
    const V = k * k, r = Algoritmos.dijkstra(V, arestas, pesos), ideia = faixa.video.ideia;
    const chave = (u, v) => (u < v ? `${u},${v}` : `${v},${u}`);
    const peso = new Map(arestas.map(([u, v], j) => [chave(u, v), pesos[j]]));
    // papel de cada vértice: 0 = não alcançado, 1 = alcançado (tem par no heap), 2 = o da vez, 3 = já saiu valendo
    const papel = new Array(V).fill(0), num = new Array(V).fill(null), pai = new Array(V).fill(null);
    let vez = null, ops = 0, viz = 0, desc = 0, pico = 0, casas = [], escritas = [], olhando = null, saiu = null;
    const est = r.eventos.map((e, j) => {
      escritas = [];
      if (e.t === "tira" || e.t === "testa" || e.t === "devolva") olhando = null;
      if (e.t === "insere") {
        casas = e.casas; escritas = e.escritas; ops = e.acessos;
        num[e.v] = e.d; if (papel[e.v] !== 3 && e.v !== vez) papel[e.v] = 1;
      } else if (e.t === "tira") {
        casas = e.casas; escritas = e.escritas; ops = e.acessos; saiu = { u: e.u, d: e.d, vencido: !!r.eventos[j + 2] && r.eventos[j + 2].t === "descarta" };   // depois do tira: o teste d = dist[u] e o descarte
        if (!saiu.vencido) { if (vez !== null) papel[vez] = 3; vez = e.u; papel[e.u] = 2; }
      } else if (e.t === "olha") {
        viz++; ops = e.acessos; olhando = [e.u, e.v]; saiu = null;
      } else if (e.t === "atribui" && e.v !== undefined) {
        pai[e.v] = e.pai;
      } else if (e.t === "descarta") {
        desc++;
      } else if (e.t === "devolva") {
        if (vez !== null) papel[vez] = 3;
        vez = null; saiu = null;
      }
      pico = Math.max(pico, casas.length);
      return { t: e.t, linha: e.linha, vars: e.vars, nivel: 0, chamada: 0, papel: papel.slice(), num: num.slice(), pai: pai.slice(),
        casas, escritas, olhando, saiu, ops, viz, desc, pico };
    });
    if (ops !== r.ops || pico !== r.estrutura || desc !== r.descartados) throw new Error("reprodução do Dijkstra não bate");
    const pesosEv = !accelerando ? est.map(() => 1) : pesosLentos(est, { atribui: 0.6, insere: 1, tira: 1.5, compara: 0.4, testa: 0.3,
      olha: 1, descarta: 3, devolva: 3 }, (t) => t === "olha", 6, 2.5);
    const tl = linhaDoTempo(pesosEv);

    // geometria: a grade à esquerda, o heap em pé no meio, o painel à direita
    const GX0 = 90, GY0 = 100, LADO = Math.min(340, 110 * (k - 1)), passo = LADO / Math.max(1, k - 1);
    const raio = Math.min(17, passo * 0.3);
    const pos = (u) => [GX0 + (u % k) * passo, GY0 + Math.floor(u / k) * passo];
    const SX = 500, SW = 92, STOPO = 104, sh = Math.min(26, 330 / Math.max(4, r.estrutura));
    const maisLonge = Math.max(...r.dist);

    function desenhar(ctx, u) {
      const kk = tl.eventoEm(u), fim = u >= tl.total;
      const s = kk >= 0 ? est[kk] : { papel: new Array(V).fill(0), num: new Array(V).fill(null), pai: new Array(V).fill(null), casas: [], escritas: [],
        olhando: null, saiu: null, ops: 0, viz: 0, desc: 0, pico: 0 };
      // arestas: as da árvore de caminhos mínimos em tinta, a olhada em coral; o peso no meio
      for (const [a, b] of arestas) {
        const [x0, y0] = pos(a), [x1, y1] = pos(b);
        const naArvore = s.pai[b] === a || s.pai[a] === b;
        linha(ctx, x0, y0, x1, y1, naArvore ? COR.tinta : COR.palido, naArvore ? 3 : 1.5);
      }
      if (s.olhando && !fim) { const [x0, y0] = pos(s.olhando[0]), [x1, y1] = pos(s.olhando[1]); linha(ctx, x0, y0, x1, y1, COR.mexeu, 4); }
      if (passo >= 44) for (const [a, b] of arestas) {
        const [x0, y0] = pos(a), [x1, y1] = pos(b), mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
        ctx.fillStyle = "#fff"; ctx.fillRect(mx - 7, my - 8, 14, 16);
        const aceso = s.olhando && !fim && chave(...s.olhando) === chave(a, b);
        texto(ctx, String(peso.get(chave(a, b))), mx, my - 7, 11, aceso ? COR.mexeu : COR.cinza, aceso ? 700 : 400, "center");
      }
      for (let v = 0; v < V; v++) {
        const [x, y] = pos(v), p = fim ? 3 : s.papel[v];
        ctx.beginPath(); ctx.arc(x, y, raio, 0, 7);
        ctx.fillStyle = p === 2 ? COR.mexeu : p === 3 ? COR.claro : "#fff"; ctx.fill();
        ctx.strokeStyle = p === 0 ? COR.palido : p === 3 ? COR.cinza : COR.tinta; ctx.lineWidth = p === 1 ? 2.5 : 1.5; ctx.stroke();
        const d = s.num[v] === null ? "∞" : String(s.num[v]);
        texto(ctx, d, x, y - Math.min(8, raio * 0.5), Math.min(14, raio * 0.85), fim ? COR.verde : p === 2 ? "#fff" : p === 0 ? COR.cinza : COR.tinta, 700, "center");
        if (raio >= 9) texto(ctx, String(v + 1), x + raio * 0.75, y - raio - 11, 10, COR.cinza);
      }

      // o heap: o vetor em pé, a casa 0 (o menor) em cima; as casas que a operação escreveu em coral
      texto(ctx, "heap (distância, vértice)", SX + SW / 2, STOPO - 54, 12, COR.cinza, 400, "center");
      linha(ctx, SX, STOPO - 4, SX, STOPO + Math.max(4, r.estrutura) * sh, COR.palido);
      linha(ctx, SX + SW, STOPO - 4, SX + SW, STOPO + Math.max(4, r.estrutura) * sh, COR.palido);
      const mex = new Set(s.escritas);
      s.casas.forEach(([d, v], i) => {
        const y = STOPO + i * sh, m = mex.has(i);
        ctx.fillStyle = m ? COR.mexeu : COR.claro;
        ctx.fillRect(SX + 4, y + 1, SW - 8, sh - 2);
        if (sh >= 12) texto(ctx, `(${d}, ${v + 1})`, SX + SW / 2, y + sh / 2 - Math.min(8, sh * 0.36), Math.min(13, sh * 0.6), m ? "#fff" : COR.tinta, 600, "center");
      });
      if (s.casas.length) texto(ctx, "← o menor", SX + SW + 6, STOPO + sh / 2 - 7, 11, COR.cinza);
      if (s.saiu && !fim) {   // o par que acabou de sair: riscado se está vencido
        const t = `saiu (${s.saiu.d}, ${s.saiu.u + 1})`, y = STOPO - 28;
        texto(ctx, t, SX + SW / 2, y, 12, s.saiu.vencido ? COR.cinza : COR.tinta, 600, "center");
        if (s.saiu.vencido) {
          ctx.font = `600 12px ${MONO}`; const w = ctx.measureText(t).width;
          linha(ctx, SX + SW / 2 - w / 2, y + 8, SX + SW / 2 + w / 2, y + 8, COR.cinza, 1.5);
          texto(ctx, "vencido", SX + SW + 6, y, 11, COR.cinza);
        }
      }

      const x = 680;
      texto(ctx, "acessos ao heap e à lista", x, 90, 13, COR.cinza);
      texto(ctx, String(s.ops), x, 106, 40, fim ? COR.verde : COR.tinta, 700);
      texto(ctx, "vizinhos olhados", x, 168, 13, COR.cinza);
      texto(ctx, `${s.viz} de ${2 * arestas.length}`, x, 184, 22, COR.tinta, 700);
      texto(ctx, "pares descartados", x, 220, 13, COR.cinza);
      texto(ctx, String(s.desc), x, 236, 22, COR.tinta, 700);
      texto(ctx, "memória extra agora", x, 272, 13, COR.cinza);
      texto(ctx, `${V} + ${s.casas.length} no heap`, x, 288, 20, COR.tinta, 700);
      texto(ctx, `heap mais alto: ${s.pico}`, x, 314, 13, fim ? COR.verde : COR.cinza, fim ? 600 : 400);
      texto(ctx, `V = ${V}, E = ${arestas.length}`, x, 350, 13, COR.cinza);
      texto(ctx, "na aresta: o peso", x, 370, 13, COR.cinza);
      texto(ctx, "no vértice: a distância à origem", x, 390, 13, COR.cinza);
      legendaCores(ctx, [["#fff", "não alcançado", COR.palido], ["#fff", "alcançado, no heap", COR.tinta, 2], [COR.mexeu, "o da vez"], [COR.claro, "já saiu valendo", COR.cinza], [COR.tinta, "caminho mais curto"]], 500);

      if (fim) legenda(ctx, [["distâncias de ", ""], [`${V} vértices`, "b"], [": ", ""], [`${r.ops} acessos`, "g"], [`, o mais longe a ${maisLonge}`, ""]]);
      else if (kk >= 0 && s.saiu && s.saiu.vencido) legenda(ctx, [[ideia[ideia.length - 1], ""]]);
      else legenda(ctx, [[ideia[0], ""]]);
    }

    const contagemEm = (u) => { const kk = tl.eventoEm(u); return kk >= 0 ? est[kk].ops : 0; };
    return {
      total: tl.total, desenhar, ...comum(tl, est, pesosEv, RITMO.grafo, accelerando),
      resumo: { ops: r.ops, pico: r.pico, n: V }, contagemEm,
      medidor: () => `${r.ops} acessos, V = ${V}, E = ${arestas.length}<br>heap de até ${r.estrutura}, ${r.descartados} descartados`,
      aoVivo: (u, cfg) => `Tocando agora: ${V} vértices e ${arestas.length} arestas com pesos, ${cfg.rotulo}; ${contagemEm(u)} de ${r.ops} acessos, heap de até ${r.estrutura} pares.`,
    };
  }

  // ---------- estatística ----------

  // número com vírgula decimal e separador de milhar
  const num = (x, casas) => x.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
  // seis algarismos significativos, para variâncias que podem vir de 10⁻³ a 10³
  const sig = (x) => (x === 0 ? "0" : num(x, Math.max(0, Math.min(10, 5 - Math.floor(Math.log10(Math.abs(x)))))));

  function simMediana(faixa, vetor, accelerando) {
    const r = Algoritmos.mediana(vetor);
    const N = vetor.length, k = r.k, ideia = faixa.video.ideia;
    const v = vetor.slice();
    let a = 0, b = N - 1, part = null, comps = 0, trocas = 0, m = null, fimPart1 = -1;
    const est = r.eventos.map((e, idx) => {
      let foco = null;
      if (e.t === "compara") {
        comps++;
        foco = [e.i, e.j];
        if (part) part = { ...part, j: e.j, jMenor: v[e.j] < v[e.i] };
      } else if (e.t === "troca") {
        trocas++;
        const x = v[e.i]; v[e.i] = v[e.j]; v[e.j] = x;
        if (part) {
          if (e.j === part.p) { part = null; if (fimPart1 < 0) fimPart1 = idx; }
          else part = { ...part, i: part.i + 1, jMenor: false };
        }
      } else if (e.t === "corta") { a = e.a; b = e.b; }
      else if (e.t === "pivo") part = { p: e.p, i: e.a, j: null, jMenor: false };
      else if (e.t === "menor") m = e.m;
      return { t: e.t, linha: e.linha, vars: e.vars, nivel: 0, chamada: 0, v: v.slice(), a, b, part, foco, comps, trocas, m };
    });
    if (comps !== r.comparacoes || trocas !== r.trocas) throw new Error("reprodução da mediana não bate");
    const conta = (t) => t === "compara" || t === "troca";
    const pesos = !accelerando ? est.map(() => 1)
      : pesosLentos(est, { compara: 1, troca: 2, pivo: 1.5, corta: 1.5, testa: 0.6, pare: 2, atribui: 1, menor: 1, devolva: 3 }, conta, 10, 4);
    const tl = linhaDoTempo(pesos);
    const BX0 = 70, BX1 = 600, BTOPO = 96, BBASE = 400;
    const bw = (BX1 - BX0) / N, bx = (i) => BX0 + i * bw;
    const lo = Math.min(...vetor), hi = Math.max(...vetor), folga = (hi - lo) / N || 1;
    const altura = (x) => (x - lo + folga) / (hi - lo + folga) * (BBASE - BTOPO);
    const media = vetor.reduce((s, x) => s + x, 0) / N;
    const par = N % 2 === 0, mFinal = par ? est.at(-1).m : null;   // n par: a outra casa do meio

    function desenhar(ctx, u) {
      const kk = tl.eventoEm(u), fim = u >= tl.total;
      const s = kk >= 0 ? est[kk] : { v: vetor, a: 0, b: N - 1, part: null, foco: null, comps: 0, trocas: 0, m: null };
      const agora = !fim && kk >= 0 && est[kk].t === "compara" ? s.foco : null;
      const segunda = s.m !== null;      // n par: procurando o menor do lado direito
      linha(ctx, BX0, BBASE + 1, BX1, BBASE + 1, COR.palido);
      s.v.forEach((x, i) => {
        let cor = COR.tinta;
        if (fim) cor = i === k || (par && i === mFinal) ? COR.verde : COR.apagado;
        else if (segunda) cor = i === s.m ? COR.mexeu : i === k ? COR.album : i > k ? COR.tinta : COR.apagado;
        else if (i < s.a || i > s.b) cor = COR.apagado;
        else if (s.part) {
          const p = s.part;
          if (i === p.p) cor = COR.pivo;
          else if (i < p.i || (i === p.j && p.jMenor)) cor = COR.menor;
          else if (p.j !== null && i <= p.j) cor = COR.maior;
        }
        const h = altura(x);
        ctx.fillStyle = cor;
        ctx.fillRect(bx(i) + bw * 0.12, BBASE - h, bw * 0.76, h);
      });
      if (agora) { seta(ctx, bx(agora[0]) + bw / 2, BBASE + 5); seta(ctx, bx(agora[1]) + bw / 2, BBASE + 5); }
      if (!fim && s.part) texto(ctx, "pivô", bx(s.part.p) + bw / 2, BBASE + 14, 11, COR.tinta, 600, "center");
      // a casa do meio, sempre marcada embaixo
      texto(ctx, "▲ meio", bx(k) + bw / 2, BBASE + 30, 11, fim ? COR.verde : COR.tinta, 600, "center");
      if (!fim && !segunda && s.a <= s.b) {
        const y = BBASE + 52;
        linha(ctx, bx(s.a) + 2, y, bx(s.b + 1) - 2, y, COR.tinta, 2);
        const resta = s.b - s.a + 1;
        const meioX = Math.min(BX1 - 110, Math.max(BX0 + 110, (bx(s.a) + bx(s.b + 1)) / 2));
        texto(ctx, `o meio está aqui: ${resta} ${resta === 1 ? "casa" : "casas"}`, meioX, y + 8, 11, COR.cinza, 400, "center");
      }
      if (fim) {   // a média, tracejada: o que a mediana não é
        const ym = BBASE - altura(media);
        ctx.setLineDash([5, 4]); linha(ctx, BX0, ym, BX1, ym, COR.cinza, 1.2); ctx.setLineDash([]);
        texto(ctx, "média", BX0 - 6, ym - 7, 11, COR.cinza, 400, "right");
      }

      const x = 650;
      texto(ctx, "comparações", x, BTOPO - 6, 13, COR.cinza);
      texto(ctx, String(s.comps), x, BTOPO + 10, 40, fim ? COR.verde : COR.tinta, 700);
      texto(ctx, "trocas", x, BTOPO + 84, 13, COR.cinza);
      texto(ctx, String(s.trocas), x, BTOPO + 100, 26, COR.tinta, 700);
      texto(ctx, fim ? "mediana" : "casa do meio", x, BTOPO + 154, 13, COR.cinza);
      texto(ctx, fim ? num(r.mediana, 1) : `${k + 1}ª de ${N}`, x, BTOPO + 170, 20, fim ? COR.verde : COR.tinta, 700);
      texto(ctx, "memória extra: 0 valores", x, BTOPO + 210, 13, COR.cinza);
      texto(ctx, `n = ${N} números`, x, BBASE - 14, 13, COR.cinza);

      legendaCores(ctx, segunda && !fim
        ? [[COR.album, "a casa do meio"], [COR.mexeu, "o menor à direita até aqui"], [COR.apagado, "fora da conta"]]
        : [[COR.pivo, "pivô"], [COR.menor, "menor que o pivô"], [COR.maior, "maior"], [COR.apagado, "descartado"], [COR.verde, "a mediana"]], 480);

      if (fim) legenda(ctx, [["mediana ", ""], [num(r.mediana, 1), "g"], [`: ${r.comparacoes} comparações, sem ordenar tudo`, ""]]);
      else if (segunda) legenda(ctx, [["n par: o outro do meio é o menor à direita", ""]]);
      else legenda(ctx, [[ideia[kk < fimPart1 || fimPart1 < 0 ? 0 : kk < fimPart1 + 12 ? 1 : ideia.length - 1], ""]]);
    }

    const contagemEm = (u) => { const kk = tl.eventoEm(u); return kk >= 0 ? est[kk].comps : 0; };
    return {
      total: tl.total, desenhar, ...comum(tl, est, pesos, RITMO.mediana, accelerando),
      resumo: { comparacoes: r.comparacoes, mediana: r.mediana, n: N, pico: 0 }, contagemEm,
      medidor: () => `${r.comparacoes} comparações, n = ${N}<br>sem memória extra`,
      aoVivo: (u, cfg) => `Tocando agora: n = ${N}, ${cfg.rotulo}; ${contagemEm(u)} de ${r.comparacoes} comparações, mediana ${num(r.mediana, 1)}, sem memória extra.`,
    };
  }

  function simWelford(faixa, x, anos, menu, accelerando) {
    const r = Algoritmos.welford(x), sq = Algoritmos.somaDosQuadrados(x), dp = Algoritmos.duasPassadas(x);
    const N = x.length, ideia = faixa.video.ideia, desloc = menu.deslocamento;
    // a soma dos quadrados corre junto, valor a valor, na mesma ordem do Python
    // nw: quantos valores o Welford já somou (o valor lido só entra na conta na linha seguinte)
    let lidos = 0, s1 = 0, s2 = 0, media = 0, m2 = 0, nw = 0;
    const est = r.eventos.map((e) => {
      if (e.t === "le") lidos++;
      if (e.t === "atribui" && e.linha === 6) { s1 += x[e.i]; s2 += x[e.i] * x[e.i]; }   // a soma dos quadrados anda junto com o n do Welford
      if (e.t === "atribui") { media = e.vars["média"]; m2 = e.vars.M2; nw = e.vars.n; }
      return { t: e.t, linha: e.linha, vars: e.vars, nivel: 0, chamada: 0, i: e.i, lidos, s1, s2, media, m2, nw };
    });
    if (lidos !== r.leituras) throw new Error("reprodução do Welford não bate");
    const pesos = !accelerando ? est.map(() => 1)
      : pesosLentos(est, { le: 1, atribui: 0.5, devolva: 3 }, (t) => t === "le", 6, 3);
    const tl = linhaDoTempo(pesos);
    // a curva corrente (média e ±1 dp depois de cada valor), para o desenho
    const curva = [];
    { let n = 0, me = 0, q = 0; for (const v of x) { n++; const d = v - me; me += d / n; q += d * (v - me); curva.push([me, n > 1 ? Math.sqrt(q / (n - 1)) : 0]); } }
    const GX0 = 70, GX1 = 600, GY0 = 80, GY1 = 290;
    const lo = Math.min(...x), hi = Math.max(...x), pad = (hi - lo) * 0.12;
    const gx = (i) => GX0 + i / (N - 1) * (GX1 - GX0), gy = (y) => GY1 - (y - lo + pad) / (hi - lo + 2 * pad) * (GY1 - GY0);
    const certo = (v) => Math.abs(v - menu.exata) / menu.exata < 1e-6;
    const nivel = (y) => num(y, Math.abs(y) >= 1e6 ? 1 : 2);

    function desenhar(ctx, u) {
      const k = tl.eventoEm(u), fim = u >= tl.total;
      const s = k >= 0 ? est[k] : { lidos: 0, s1: 0, s2: 0, media: 0, m2: 0, nw: 0, i: -1 };
      const n = s.lidos;
      // a série até aqui: faixa de ±1 dp, a média corrente e os pontos
      texto(ctx, `nível do lago Huron${desloc ? ` + ${num(desloc, 0)}` : ""}, de ${nivel(lo)} a ${nivel(hi)} pés`, GX0, GY0 - 22, 11, COR.cinza);
      linha(ctx, GX0, GY1 + 6, GX1, GY1 + 6, COR.palido);
      texto(ctx, String(anos[0]), GX0, GY1 + 12, 11, COR.cinza);
      texto(ctx, String(anos[N - 1]), GX1, GY1 + 12, 11, COR.cinza, 400, "right");
      if (n >= 2) {
        ctx.fillStyle = COR.claro; ctx.beginPath();
        for (let i = 1; i < n; i++) ctx.lineTo(gx(i), gy(curva[i][0] + curva[i][1]));
        for (let i = n - 1; i >= 1; i--) ctx.lineTo(gx(i), gy(curva[i][0] - curva[i][1]));
        ctx.fill();
      }
      if (n >= 1) {
        ctx.strokeStyle = COR.tinta; ctx.lineWidth = 2; ctx.beginPath();
        for (let i = 0; i < n; i++) ctx.lineTo(gx(i), gy(curva[i][0]));
        ctx.stroke();
      }
      for (let i = 0; i < n; i++) {
        ctx.fillStyle = i === n - 1 && !fim ? COR.mexeu : COR.cinza;
        ctx.beginPath(); ctx.arc(gx(i), gy(x[i]), i === n - 1 && !fim ? 4.5 : 2.5, 0, 7); ctx.fill();
      }

      // as três contas, lado a lado
      const TY = 342, cols = [GX0, 250, 400, 520];
      texto(ctx, "conta", cols[0], TY, 11, COR.cinza);
      texto(ctx, "variância", cols[1], TY, 11, COR.cinza);
      texto(ctx, "lê", cols[2], TY, 11, COR.cinza);
      texto(ctx, "guarda", cols[3], TY, 11, COR.cinza);
      linha(ctx, GX0, TY + 18, GX1, TY + 18, COR.palido);
      const varSoma = s.nw >= 2 ? (s.s2 - s.s1 * s.s1 / s.nw) / (s.nw - 1) : null, varW = s.nw >= 2 ? s.m2 / (s.nw - 1) : null;
      const linhas = [
        ["Welford", fim ? r.variancia : varW, `${n}`, "3 números"],
        ["soma dos quadrados", fim ? sq.variancia : varSoma, `${n}`, "3 números"],
        ["duas passadas", fim ? dp.variancia : null, fim ? `${2 * N}` : `${n} (e de novo)`, `${n} valores`],
      ];
      linhas.forEach(([nome, val, le, guarda], i) => {
        const y = TY + 28 + i * 26;
        texto(ctx, nome, cols[0], y, 13, COR.tinta, i === 0 ? 600 : 400);
        const ok = fim && certo(val);
        texto(ctx, val === null ? (i === 2 ? "falta a 2ª leitura" : "—") : sig(val) + (fim && !ok ? "  ✗" : ""), cols[1], y, 13, ok ? COR.verde : COR.tinta, ok || (fim && !ok) ? 600 : 400);
        texto(ctx, le, cols[2], y, 13, COR.cinza);
        texto(ctx, guarda, cols[3], y, 13, COR.cinza);
      });
      texto(ctx, `variância certa (em frações): ${sig(menu.exata)}`, GX0, TY + 110, 11, COR.cinza);

      const px = 650;
      texto(ctx, "leituras", px, 90, 13, COR.cinza);
      texto(ctx, String(n), px, 106, 40, COR.tinta, 700);
      texto(ctx, "média até aqui", px, 174, 13, COR.cinza);
      texto(ctx, s.nw ? num(s.media, Math.abs(s.media) >= 1e6 ? 2 : 3) : "—", px, 190, 20, COR.tinta, 700);
      texto(ctx, "variância (Welford)", px, 234, 13, COR.cinza);
      texto(ctx, varW === null ? "—" : sig(fim ? r.variancia : varW), px, 250, 20, fim && certo(r.variancia) ? COR.verde : COR.tinta, 700);
      texto(ctx, "memória extra: 0 valores", px, 296, 13, COR.cinza);
      texto(ctx, `n = ${N} anos`, px, 318, 13, COR.cinza);
      legendaCores(ctx, [[COR.mexeu, "o ano lido agora"], [COR.claro, "média ± 1 desvio-padrão"]], 488);

      if (fim) legenda(ctx, [["Welford: variância ", ""], [sig(r.variancia), "g"], [certo(sq.variancia) ? "; a soma dos quadrados também bate" : `; a soma dos quadrados dá ${sig(sq.variancia)}`, ""]], 26, 17);
      else legenda(ctx, [[ideia[n < 12 ? 0 : ideia.length - 1], ""]]);
    }

    const contagemEm = (u) => { const k = tl.eventoEm(u); return k >= 0 ? est[k].lidos : 0; };
    return {
      total: tl.total, desenhar, ...comum(tl, est, pesos, RITMO.welford, accelerando),
      resumo: { leituras: r.leituras, n: N, pico: 0 }, contagemEm,
      medidor: () => `${r.leituras} leituras, n = ${N}<br>sem memória extra`,
      aoVivo: (u, cfg) => `Tocando agora: ${cfg.rotulo}; ${contagemEm(u)} de ${r.leituras} leituras, variância ${sig(r.variancia)} pelo Welford e ${sig(sq.variancia)} pela soma dos quadrados (a certa é ${sig(menu.exata)}), sem memória extra.`,
    };
  }

  function simHistograma(faixa, x, accelerando) {
    const r = Algoritmos.histograma(x);
    const N = x.length, C = r.c, ideia = faixa.video.ideia;
    const cont = new Array(C).fill(0);
    let lidos = 0, menor = x[0], maior = x[0], classes = false, ultimo = null;
    const est = r.eventos.map((e) => {
      if (e.t === "le" || (e.t === "atribui" && e.linha === 2)) { lidos++; ultimo = e.i; }
      else if (e.t === "menor") menor = x[e.i];
      else if (e.t === "maior") maior = x[e.i];
      else if (e.t === "classes") classes = true;
      else if (e.t === "classe") { lidos++; ultimo = e.i; }
      else if (e.t === "conta") cont[e.j]++;
      return { t: e.t, linha: e.linha, vars: e.vars, nivel: 0, chamada: 0, lidos, menor, maior, classes, ultimo, cont: cont.slice(), j: e.j };
    });
    if (lidos !== r.ops || cont.some((q, j) => q !== r.contagens[j])) throw new Error("reprodução do histograma não bate");
    // ritmo constante: a primeira passada corre (só procura o menor e o maior); cada valor da segunda vale 1
    const pesos = !accelerando
      ? est.map((s) => ({ le: 0.25, menor: 0.25, maior: 0.25, classe: 0.5, conta: 0.5 }[s.t] ?? 1))
      : pesosLentos(est, { le: 0.12, menor: 0.3, maior: 0.3, classes: 4, atribui: 0.6, classe: 0.4, conta: 0.6, devolva: 3 }, (t) => t === "conta", 6, 5);
    const tl = linhaDoTempo(pesos);
    const BX0 = 70, BX1 = 600, BTOPO = 124, BBASE = 380, EIXO = 420;
    const a = r.a, b = r.a + C * r.h;
    const ex = (v) => BX0 + (v - a) / (b - a) * (BX1 - BX0);
    const topo = Math.max(...r.contagens), cw = (BX1 - BX0) / C;
    const casas = r.h >= 1 ? 0 : r.h >= 0.1 ? 1 : 2;
    const valor = (v) => v.toLocaleString("pt-BR", { maximumFractionDigits: 3 });   // como veio nos dados

    function desenhar(ctx, u) {
      const k = tl.eventoEm(u), fim = u >= tl.total;
      const s = k >= 0 ? est[k] : { lidos: 0, menor: x[0], maior: x[0], classes: false, ultimo: null, cont: new Array(C).fill(0), t: null };
      const segunda = s.classes;
      // o eixo dos valores: cada valor lido aparece como um risco; o da vez, maior e em coral
      linha(ctx, BX0, EIXO, BX1, EIXO, COR.palido);
      if (!segunda) {
        for (let i = 0; i <= (s.ultimo ?? -1); i++) linha(ctx, ex(x[i]), EIXO - 5, ex(x[i]), EIXO + 5, COR.cinza);
        if (s.ultimo !== null && !fim) linha(ctx, ex(x[s.ultimo]), EIXO - 14, ex(x[s.ultimo]), EIXO + 14, COR.mexeu, 3);
        texto(ctx, `menor ${valor(s.menor)}`, ex(s.menor), EIXO + 18, 11, COR.tinta, 600, "center");
        texto(ctx, `maior ${valor(s.maior)}`, ex(s.maior), EIXO + 34, 11, COR.tinta, 600, "center");
        texto(ctx, "1ª passada: acha o menor e o maior", BX0, 66, 11, COR.cinza);
      } else {
        // as classes e as barras: a altura é a contagem; a cor nunca é
        for (let j = 0; j < C; j++) {
          const h = s.cont[j] / topo * (BBASE - BTOPO), vez = !fim && s.t === "conta" && s.j === j;
          ctx.fillStyle = fim ? COR.verde : vez ? COR.mexeu : COR.tinta;
          ctx.fillRect(BX0 + j * cw + 2, BBASE - h, cw - 4, h);
          if (s.cont[j]) texto(ctx, String(s.cont[j]), BX0 + (j + 0.5) * cw, BBASE - h - 16, 11, COR.tinta, 400, "center");
        }
        linha(ctx, BX0, BBASE + 1, BX1, BBASE + 1, COR.palido);
        const passo = C > 12 ? 2 : 1;
        for (let j = 0; j <= C; j += passo) texto(ctx, num(a + j * r.h, casas), BX0 + j * cw, BBASE + 6, 10, COR.cinza, 400, "center");
        if (s.ultimo !== null && !fim) {
          const vx = ex(x[s.ultimo]);
          linha(ctx, vx, EIXO - 14, vx, EIXO + 14, COR.mexeu, 3);
          linha(ctx, vx, EIXO - 14, vx, BBASE + 22, COR.mexeu, 1);
          texto(ctx, valor(x[s.ultimo]), vx, EIXO + 18, 11, COR.tinta, 600, "center");
        }
        texto(ctx, `2ª passada: cada valor cai na sua classe (${C} classes de ${num(r.h, casas)})`, BX0, 66, 11, COR.cinza);
      }

      const px = 650;
      texto(ctx, "leituras", px, 90, 13, COR.cinza);
      texto(ctx, String(s.lidos), px, 106, 40, COR.tinta, 700);
      texto(ctx, "classes", px, 174, 13, COR.cinza);
      texto(ctx, segunda ? String(C) : "—", px, 190, 26, fim ? COR.verde : COR.tinta, 700);
      texto(ctx, "memória extra agora", px, 244, 13, COR.cinza);
      texto(ctx, segunda ? `${C} contagens` : "0 valores", px, 260, 20, COR.tinta, 700);
      texto(ctx, `n = ${N} valores`, px, 300, 13, COR.cinza);
      texto(ctx, `Sturges: ⌈log₂ n + 1⌉ = ${Algoritmos.sturges(N)}`, px, 320, 13, COR.cinza);
      legendaCores(ctx, [[COR.mexeu, "o valor lido agora"], [COR.verde, "o histograma pronto"]], 488);

      if (fim) legenda(ctx, [[`${N} valores em `, ""], [`${C} classes`, "g"], [`: ${r.ops} leituras`, ""]]);
      else legenda(ctx, [[ideia[segunda ? ideia.length - 1 : 0], ""]]);
    }

    const contagemEm = (u) => { const k = tl.eventoEm(u); return k >= 0 ? est[k].lidos : 0; };
    return {
      total: tl.total, desenhar, ...comum(tl, est, pesos, RITMO.histograma, accelerando),
      resumo: { leituras: r.ops, classes: C, n: N, pico: r.pico }, contagemEm,
      medidor: () => `${r.ops} leituras, n = ${N}<br>${C} contagens`,
      aoVivo: (u, cfg) => `Tocando agora: ${N} valores, ${cfg.rotulo}; ${contagemEm(u)} de ${r.ops} leituras, ${C} classes de ${num(r.h, casas)}.`,
    };
  }

  // ---------- fachada ----------

  /** Cria a simulação de uma faixa para uma configuração de entrada; `accelerando` liga o ritmo que acelera. */
  function criar(faixa, cfg, accelerando = false) {
    const tipo = faixa.medido.tempo.tipo, ex = faixa.exemplo, padrao = cfg.tipo === "padrao";
    if (tipo === "busca") {
      const e = padrao ? { vetor: ex.vetor, alvo: ex.alvo } : Algoritmos.entradaBusca(cfg.n, faixa.alg === "binaria", cfg.tipo, cfg.semente);
      return simBusca(faixa, e.vetor, e.alvo, accelerando);
    }
    if (tipo === "parenteses") return simParenteses(faixa, padrao ? ex.texto : Algoritmos.textoParenteses(cfg.n, cfg.tipo, cfg.semente), accelerando);
    if (tipo === "atendimento") {
      const e = padrao ? ex : Algoritmos.clientes(cfg.n, ex.movimentos[cfg.tipo], cfg.semente);
      return simAtendimento(faixa, e.chegada, e.duracao, accelerando);
    }
    if (tipo === "prioridade") {
      const e = padrao ? ex : Algoritmos.pacientes(cfg.n, ex.movimentos[cfg.tipo], ex.gravidades, cfg.semente);
      return simPrioridade(faixa, e.chegada, e.duracao, e.gravidade, accelerando);
    }
    if (tipo === "inverter") return simInverter(faixa, padrao ? ex.valores : Algoritmos.valoresSorteados(cfg.n, "sorteada", cfg.semente), accelerando);
    if (tipo === "janela") return simJanela(faixa, padrao ? ex.vetor : Algoritmos.valoresSorteados(cfg.n, cfg.tipo, cfg.semente), cfg.k || ex.k, accelerando);
    if (tipo === "grafo") {
      const k = padrao ? ex.k : Math.round(Math.sqrt(cfg.n));
      return simGrafo(faixa, k, padrao ? ex.arestas : Algoritmos.grafoGrade(k, cfg.tipo, cfg.semente), accelerando);
    }
    if (tipo === "dijkstra") {
      const k = padrao ? ex.k : Math.round(Math.sqrt(cfg.n));
      const arestas = padrao ? ex.arestas : Algoritmos.grafoGrade(k, cfg.tipo, cfg.semente);
      return simDijkstra(faixa, k, arestas, padrao ? ex.pesos : Algoritmos.pesosGrade(arestas.length, ex.faixa_pesos, cfg.semente + 1), accelerando);
    }
    if (tipo === "mediana") return simMediana(faixa, padrao ? ex.vetor : Algoritmos.entrada(cfg.n, cfg.tipo, cfg.semente), accelerando);
    if (tipo === "welford") {
      const d = { padrao: 0, d6: 1e6, d8: 1e8, d9: 1e9 }[cfg.tipo];
      return simWelford(faixa, ex.x.map((v) => v + d), ex.anos, ex.menu.find((m) => m.deslocamento === d), accelerando);
    }
    if (tipo === "histograma") return simHistograma(faixa, padrao ? ex.x : Algoritmos.amostra(cfg.n, cfg.tipo, cfg.semente), accelerando);
    if (faixa.alg === "kmeans") {
      const pontos = faixa.exemplo.pontos;
      const iniciais = cfg.semente === null ? faixa.exemplo.iniciais : Algoritmos.centrosIniciais(pontos, cfg.k, cfg.semente);
      return simKmeans(faixa, pontos, iniciais, accelerando);
    }
    const vetor = cfg.tipo === "padrao" ? faixa.exemplo.vetor : Algoritmos.entrada(cfg.n, cfg.tipo, cfg.semente);
    return simOrdenacao(faixa, vetor, accelerando);
  }

  /** Desenha a simulação na posição `u` num canvas de qualquer tamanho. */
  function pintar(canvas, sim, u) {
    const dpr = window.devicePixelRatio || 1;
    const larg = canvas.clientWidth || W;
    const alt = larg * H / W;
    if (canvas.width !== Math.round(larg * dpr) || canvas.height !== Math.round(alt * dpr)) {
      canvas.width = Math.round(larg * dpr);
      canvas.height = Math.round(alt * dpr);
    }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, W, H);
    sim.desenhar(ctx, u);
  }

  window.Palco = { criar, pintar, W, H };
})();
