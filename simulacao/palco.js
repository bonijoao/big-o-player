// A simulação ao vivo de uma faixa: roda o algoritmo (simulacao/algoritmos.js),
// guarda o estado depois de cada evento e desenha qualquer instante num
// canvas, no visual dos vídeos (motor/video_ordenacao.py, algoritmos/kmeans/video.py).
// O tempo é medido em "unidades": uma comparação = 1, uma troca = 2 (duas
// escritas), uma escrita = 1; o começo vai em câmera lenta. A velocidade só
// escala as unidades por segundo, então o seletor de tempo anda por elas.
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
  const RITMO = { ordenacao: 15, kmeans: 30 };          // unidades por segundo a 1×

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

  // ---------- ordenações ----------

  function simOrdenacao(faixa, vetor) {
    const alg = faixa.alg;
    const r = Algoritmos.ordenar(alg, vetor);
    const N = vetor.length, ev = r.eventos;
    const temAux = alg === "intercalacao", temPilha = alg === "intercalacao" || alg === "rapida", quick = alg === "rapida";
    const ideia = faixa.video.ideia;

    // reprodução: um estado depois de cada evento
    const v = vetor.slice(), aux = new Array(N).fill(null), pilha = [], chamadas = [], abertas = [];
    let part = null, comps = 0, movs = 0, pico = temAux ? N : 0, fimPart1 = -1;
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
      } else if (e.t === "pivo") {
        const [a, b] = pilha[pilha.length - 1];
        part = { a, b, p: e.p, i: a, j: null, jMenor: false };
      }
      pico = Math.max(pico, (temAux ? N : 0) + pilha.length);
      est.push({ v: v.slice(), aux: temAux ? aux.slice() : null, nPilha: pilha.length, part, foco, mexeu, comps, movs, pico, t: e.t, linha: e.linha });
    });
    if (comps !== r.comparacoes || movs !== r.movimentos || pico !== r.pico) throw new Error("reprodução não bate com a execução");

    // azul = assentou de vez: no lugar final e nenhuma escrita a toca depois
    const ultimo = new Array(N).fill(-1);
    est.forEach((s, k) => s.mexeu.forEach(([onde, i]) => { if (onde === "v") ultimo[i] = k; }));

    // pesos: comparação 1, troca 2, escrita 1; câmera lenta no começo (no quick, a primeira partição) e pausa depois dela
    const visivel = (t) => t === "compara" || t === "troca" || t === "escreve";
    // controle (testes, pivô, chamadas, parada): um tempinho para o fluxograma acender ali
    const CONTROLE = { testa: 0.6, pivo: 1.5, pare: 2, entra: 1 };
    let nvis = 0;
    const lentos = quick && fimPart1 >= 0 ? est.slice(0, fimPart1 + 1).filter((s) => visivel(s.t)).length : 8;
    const LENTO = quick ? 4.5 : 6.5, PAUSA = quick ? 39 : 0;
    const pesos = est.map((s, k) => {
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
    const nivelMax = Math.max(0, ...chamadas.map((c) => c.nivel));

    // geometria (a mesma dos vídeos)
    const BX0 = 70, BX1 = 600, BTOPO = 96;
    const BBASE = temAux || temPilha ? 316 : 410;
    const LEG_Y = temAux ? 520 : 470, PILHA_Y = temAux ? 340 : 350;
    const AUX_TOPO = 420, AUX_BASE = 492;
    const ROW = Math.min(8, ((temAux ? AUX_TOPO - 28 : LEG_Y - 14) - PILHA_Y - 20) / Math.max(1, nivelMax));
    const bw = (BX1 - BX0) / N, bx = (i) => BX0 + i * bw;

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
      const s = k >= 0 ? est[k] : { v: vetor, aux: temAux ? new Array(N).fill(null) : null, nPilha: 0, part: null, foco: null, comps: 0, movs: 0, pico: temAux ? N : 0 };
      const agoraVis = k >= 0 ? vis[k] : 0;
      const coral = new Set(), coralAux = new Set();
      if (!quick) for (let j = Math.max(0, k - 12); j <= k; j++) if (agoraVis - vis[j] < 3) est[j].mexeu.forEach(([o, i]) => (o === "v" ? coral : coralAux).add(i));

      linha(ctx, BX0, BBASE + 1, BX1, BBASE + 1, COR.palido);
      barras(ctx, s.v, BTOPO, BBASE, (i, x) => corBarra(i, x, k, s, coral));
      const foco = !fim && k >= 0 && est[k].t === "compara" ? s.foco : null;
      if (foco && foco[2] === "v") { seta(ctx, bx(foco[0]) + bw / 2, BBASE + 5); seta(ctx, bx(foco[1]) + bw / 2, BBASE + 5); }
      if (quick && s.part) texto(ctx, "pivô", bx(s.part.p) + bw / 2, BBASE + 14, 11, COR.tinta, 600, "center");

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
      texto(ctx, "comparações", x, BTOPO - 6, 13, COR.cinza);
      texto(ctx, String(s.comps), x, BTOPO + 10, 40, fim ? COR.verde : COR.tinta, 700);
      texto(ctx, r.movimento, x, BTOPO + 84, 13, COR.cinza);
      texto(ctx, String(s.movs), x, BTOPO + 100, 26, COR.tinta, 700);
      const extra = (temAux ? N : 0) + s.nPilha;
      texto(ctx, "memória extra agora", x, BTOPO + 154, 13, COR.cinza);
      texto(ctx, `${extra} ${extra === 1 ? "valor" : "valores"}`, x, BTOPO + 170, 20, COR.tinta, 700);
      if (temAux || temPilha) texto(ctx, `pico até aqui: ${s.pico}`, x, BTOPO + 198, 13, fim ? COR.verde : COR.cinza, fim ? 600 : 400);
      texto(ctx, `n = ${N} números`, x, Math.max(BBASE - 14, BTOPO + 228), 13, COR.cinza);

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
      else if (quick && u >= uPausa && u < uPausa + PAUSA) legenda(ctx, [[ideia[1], ""]]);
      else if (u < (quick ? uPausa : uLentoFim)) legenda(ctx, [[ideia[0], ""]]);
      else legenda(ctx, [[ideia[ideia.length - 1], ""]]);
    }

    return {
      total: tl.total, ritmo: RITMO.ordenacao, desenhar,
      linhaEm(u) { for (let k = tl.eventoEm(u); k >= 0; k--) if (est[k].linha) return est[k].linha; return null; },
      passos: est.map((s, k) => (pesos[k] > 0 ? tl.inicio[k + 1] : null)).filter((x) => x !== null),
      resumo: { comparacoes: r.comparacoes, movimentos: r.movimentos, movimento: r.movimento, pico: r.pico, n: N },
      contagemEm(u) { const k = tl.eventoEm(u); return k >= 0 ? est[k].comps : 0; },
    };
  }

  // ---------- K-means ----------

  function simKmeans(faixa, pontos, iniciais) {
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
      else if (e.t === "rotulo") { rot[e.i] = e.g; if (e.mudou) mudaram++; }
      else if (e.t === "volta") { tabela.push({ volta: volta + 1, dists, mudaram }); volta++; mudaram = 0; }
      else if (e.t === "centros") { centrosAntes = centros; centros = e.centros; }
      est.push({ t: e.t, rot: rot.slice(), centros, centrosAntes, dists, nVoltas: tabela.length, foco, linha: e.linha });
    }
    if (dists !== r.distancias || tabela.length !== r.voltas) throw new Error("reprodução do k-means não bate");

    // pesos: as 4 primeiras flores devagar; cada centro desliza em 12 unidades; pausa no fim de cada volta
    let flor = 0;
    const pesos = est.map((s, k) => {
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
      total: tl.total, ritmo: RITMO.kmeans, desenhar,
      linhaEm(u) { for (let k = tl.eventoEm(u); k >= 0; k--) if (est[k].linha) return est[k].linha; return null; },
      passos: est.map((s, k) => (s.t === "rotulo" || s.t === "centros" || s.t === "volta" ? tl.inicio[k + 1] : null)).filter((x) => x !== null),
      resumo: { distancias: r.distancias, voltas: r.voltas, pico: r.pico, n: N, k: K },
      contagemEm(u) { const k = tl.eventoEm(u); return k >= 0 ? est[k].dists : 0; },
    };
  }

  // ---------- fachada ----------

  /** Cria a simulação de uma faixa para uma configuração de entrada. */
  function criar(faixa, cfg) {
    if (faixa.alg === "kmeans") {
      const pontos = faixa.exemplo.pontos;
      const iniciais = cfg.semente === null ? faixa.exemplo.iniciais : Algoritmos.centrosIniciais(pontos, cfg.k, cfg.semente);
      return simKmeans(faixa, pontos, iniciais);
    }
    const vetor = cfg.tipo === "padrao" ? faixa.exemplo.vetor : Algoritmos.entrada(cfg.n, cfg.tipo, cfg.semente);
    return simOrdenacao(faixa, vetor);
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
