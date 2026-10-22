// Gráficos e blocos do encarte: crescimento, histograma, memória, código com
// grafo de fluxo. Todos os números vêm de window.GALERIA (dados.js).
(function () {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";
  const mil = (x) => (x < 10000 ? String(x) : x.toLocaleString("pt-BR"));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function el(tag, attrs = {}, filhos = []) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "html") e.innerHTML = v;
      else if (k === "text") e.textContent = v;
      else e.setAttribute(k, v);
    }
    for (const f of [].concat(filhos)) if (f) e.append(f);
    return e;
  }

  function svg(tag, attrs = {}, texto) {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    if (texto !== undefined) e.textContent = texto;
    return e;
  }

  // ---------- gráficos do painel ----------

  // Distâncias por n, em escala log: a linha de baixo é uma volta (n·k), o
  // ponto de cima é o total medido; a distância vertical entre os dois é i.
  function graficoCrescimento(caixa, a) {
    const dados = a.medido.tempo.crescimento;
    const k = a.exemplo.k;
    caixa.replaceChildren();   // o SVG antigo seguraria a largura da coluna
    const W = Math.max(300, caixa.clientWidth), H = 300;
    const m = { l: 62, r: W < 480 ? 16 : 128, t: 18, b: 44 };
    const s = svg("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: "img",
      "aria-label": "Distâncias calculadas por tamanho n: total medido e custo de uma volta" });
    const lo = Math.floor(Math.log10(Math.min(...dados.map((d) => d.n * k))) * 4) / 4;
    const hi = Math.ceil(Math.log10(Math.max(...dados.map((d) => d.ops))) * 4) / 4;
    const X = (i) => m.l + (i + 0.5) * (W - m.l - m.r) / dados.length;
    const Y = (v) => m.t + (1 - (Math.log10(v) - lo) / (hi - lo)) * (H - m.t - m.b);
    const grade = [[1e2, "100"], [1e3, "1 mil"], [1e4, "10 mil"], [1e5, "100 mil"], [1e6, "1 milhão"], [1e7, "10 milhões"]]
      .filter(([v]) => Math.log10(v) >= lo && Math.log10(v) <= hi);
    for (const [v, r] of grade) {
      s.append(svg("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: "#dee0e4" }));
      s.append(svg("text", { x: m.l - 10, y: Y(v) + 4, "text-anchor": "end", "font-size": 12, fill: "#686c73" }, r));
    }
    dados.forEach((d, i) => {
      const x = X(i), y1 = Y(d.n * k), y2 = Y(d.ops);
      s.append(svg("line", { x1: x, x2: x, y1, y2, stroke: "#b4b7bd", "stroke-dasharray": "3 3" }));
      s.append(svg("text", { x: x + 7, y: (y1 + y2) / 2 + 4, "font-size": 12, fill: "#10803a", "font-weight": 600 }, `×${d.i}`));
      s.append(svg("text", { x, y: H - m.b + 20, "text-anchor": "middle", "font-size": 12, fill: "#686c73" }, mil(d.n)));
    });
    s.append(svg("polyline", { points: dados.map((d, i) => `${X(i)},${Y(d.n * k)}`).join(" "), fill: "none", stroke: "#b4b7bd", "stroke-width": 2 }));
    s.append(svg("polyline", { points: dados.map((d, i) => `${X(i)},${Y(d.ops)}`).join(" "), fill: "none", stroke: "#1e1e1e", "stroke-width": 2 }));
    dados.forEach((d, i) => {
      s.append(svg("circle", { cx: X(i), cy: Y(d.n * k), r: 3.5, fill: "#fff", stroke: "#b4b7bd", "stroke-width": 2 }));
      s.append(svg("circle", { cx: X(i), cy: Y(d.ops), r: 4, fill: "#1e1e1e" }));
    });
    s.append(svg("text", { x: (m.l + W - m.r) / 2, y: H - 4, "text-anchor": "middle", "font-size": 12, fill: "#686c73" }, "n (pontos; dobra a cada passo)"));
    if (m.r > 100) {
      const u = dados[dados.length - 1], x = X(dados.length - 1) + 12;
      s.append(svg("text", { x, y: Y(u.ops) + 4, "font-size": 12, fill: "#1e1e1e" }, "total medido"));
      s.append(svg("text", { x, y: Y(u.n * k) + 4, "font-size": 12, fill: "#686c73" }, "uma volta: n·k"));
    }
    caixa.replaceChildren(s);
  }

  // Como a mesma medida varia de uma entrada para outra; a barra preta é a do vídeo.
  function graficoHistograma(caixa, v, destaque, rotuloX) {
    const lo = Math.min(...v), hi = Math.max(...v);
    const larg = Math.max(1, Math.ceil((hi - lo + 1) / 24));      // até 24 barras
    const nb = Math.floor((hi - lo) / larg) + 1, cont = new Array(nb).fill(0);
    v.forEach((x) => cont[Math.floor((x - lo) / larg)]++);
    const max = Math.max(...cont), alvo = Math.floor((destaque - lo) / larg);
    caixa.replaceChildren();
    const W = Math.max(280, caixa.clientWidth), H = 220, m = { l: 8, r: 8, t: 26, b: 40 };
    const bw = (W - m.l - m.r) / nb;
    const s = svg("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: "img",
      "aria-label": `${rotuloX}: de ${lo} a ${hi} em ${v.length} entradas` });
    const passo = Math.ceil(nb / Math.max(4, Math.floor((W - 16) / 34)));   // rótulos que cabem
    for (let b = 0; b < nb; b++) {
      const c = cont[b], h = (H - m.t - m.b) * c / max, bx = m.l + b * bw, eh = b === alvo;
      if (c) s.append(svg("rect", { x: bx + 1.5, y: H - m.b - h, width: Math.max(1, bw - 3), height: h, rx: 1, fill: eh ? "#1e1e1e" : "#cfd2d7" }));
      // a barra do vídeo mostra o valor exato; as vizinhas ficam sem rótulo para não encavalar
      if (eh) s.append(svg("text", { x: bx + bw / 2, y: H - m.b + 17, "text-anchor": "middle", "font-size": 11, fill: "#1e1e1e", "font-weight": 600 }, destaque));
      else if (b % passo === 0 && Math.abs(b - alvo) > 1) s.append(svg("text", { x: bx + bw / 2, y: H - m.b + 17, "text-anchor": "middle", "font-size": 11, fill: "#686c73" }, lo + b * larg));
    }
    const hAlvo = (H - m.t - m.b) * cont[alvo] / max;
    s.append(svg("text", { x: Math.min(W - 24, Math.max(24, m.l + alvo * bw + bw / 2)), y: H - m.b - hAlvo - 8, "text-anchor": "middle", "font-size": 12, fill: "#1e1e1e", "font-weight": 600 }, "encarte"));
    s.append(svg("text", { x: W / 2, y: H - 4, "text-anchor": "middle", "font-size": 12, fill: "#686c73" }, rotuloX));
    caixa.replaceChildren(s);
  }

  const ROTULOS_LOG = [[1, "1"], [10, "10"], [1e2, "100"], [1e3, "1 mil"], [1e4, "10 mil"], [1e5, "100 mil"], [1e6, "1 milhão"], [1e7, "10 milhões"]];

  // Uma medida por n em escala log, uma linha por caso de entrada, com curvas
  // de referência tracejadas e, opcionalmente, a faixa entre o menor e o maior
  // de um caso sorteado.
  function desenharCasos(caixa, cfg) {
    const { dados, series, refs, val, banda, aria, eixo } = cfg;
    caixa.replaceChildren();
    const W = Math.max(300, caixa.clientWidth), H = 300;
    const estreito = W < 480;   // no celular, a legenda vai para cima do gráfico
    const m = { l: 74, r: estreito ? 16 : 150, t: 18, b: 44 };
    const todos = dados.flatMap((d) => series.map((sr) => val(d, sr.caso)))
      .concat(refs.flatMap((r) => dados.map((d) => r.f(d.n))))
      .concat(banda ? dados.flatMap((d) => [banda.min(d), banda.max(d)]) : []).filter((x) => x > 0);
    const lo = Math.floor(Math.log10(Math.min(...todos)) * 2) / 2, hi = Math.ceil(Math.log10(Math.max(...todos)) * 2) / 2;
    const X = (i) => m.l + (i + 0.5) * (W - m.l - m.r) / dados.length;
    const Y = (v) => m.t + (1 - (Math.log10(Math.max(v, 10 ** lo)) - lo) / (hi - lo)) * (H - m.t - m.b);
    const s = svg("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": aria });
    // poucas décadas (a busca binária mal sai do chão): grade também em 2 e 5
    const grade = hi - lo <= 1.5 ? ROTULOS_LOG.concat([2, 5, 20, 50, 200, 500].map((v) => [v, String(v)])) : ROTULOS_LOG;
    for (const [v, r] of grade.filter(([v]) => Math.log10(v) >= lo && Math.log10(v) <= hi)) {
      s.append(svg("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: "#eceef1" }));
      s.append(svg("text", { x: m.l - 10, y: Y(v) + 4, "text-anchor": "end", "font-size": 12, fill: "#686c73" }, r));
    }
    dados.forEach((d, i) => s.append(svg("text", { x: X(i), y: H - m.b + 20, "text-anchor": "middle", "font-size": 12, fill: "#686c73" }, mil(d.n))));
    for (const r of refs) {
      s.append(svg("polyline", { points: dados.map((d, i) => `${X(i)},${Y(r.f(d.n))}`).join(" "), fill: "none", stroke: "#b4b7bd", "stroke-width": 1.2, "stroke-dasharray": "4 4" }));
    }
    if (banda) {   // faixa entre o menor e o maior das entradas sorteadas
      const cima = dados.map((d, i) => `${X(i)},${Y(banda.max(d))}`), baixo = dados.map((d, i) => `${X(i)},${Y(banda.min(d))}`).reverse();
      s.append(svg("polygon", { points: cima.concat(baixo).join(" "), fill: "#1e1e1e", "fill-opacity": 0.08 }));
    }
    // entradas diferentes podem dar exatamente o mesmo número (no quick, ordenado
    // e invertido; na memória do merge, as três): as séries iguais se agrupam,
    // a de baixo mais grossa para continuar visível, e o rótulo vira um só
    const grupos = [];
    for (const sr of series) {
      const vals = dados.map((d) => val(d, sr.caso));
      const g = grupos.find((x) => x.vals.every((v, i) => v === vals[i]));
      if (g) g.membros.push(sr); else grupos.push({ vals, membros: [sr] });
    }
    const rotulos = [];
    for (const g of grupos) {
      const pts = g.vals.map((v, i) => [X(i), Y(v)]);
      if (g.vals.every((v) => v <= 0)) {
        rotulos.push({ y: Y(10 ** lo), texto: `${g.membros.map((sr) => sr.curto).join(" = ")}: nada`, cor: g.membros[0].cor });
        continue;
      }
      g.membros.forEach((sr, k) => {
        // as séries "de fundo" (os outros dois Fibonacci) ficam finas, por trás da desta faixa
        const larg = sr.fundo ? 1.5 : 2 + 4 * (g.membros.length - 1 - k);
        s.append(svg("polyline", { points: pts.map((p) => p.join(",")).join(" "), fill: "none", stroke: sr.cor, "stroke-width": larg }));
        pts.forEach(([x, y]) => s.append(svg("circle", { cx: x, cy: y, r: sr.fundo ? 2.5 : 3.2 + larg / 3, fill: sr.cor })));
      });
      const texto = g.membros.length === 1 ? g.membros[0].nome
        : g.membros.length === series.length && series.length > 2 ? cfg.todas : g.membros.map((sr) => sr.curto).join(" = ");
      rotulos.push({ y: pts.at(-1)[1], texto, cor: g.membros[0].cor });
    }
    for (const r of refs) rotulos.push({ y: Y(r.f(dados.at(-1).n)), texto: r.nome, cor: "#8a8e95" });
    if (!estreito) {   // rótulos diretos no fim das linhas, afastados para não encavalar
      rotulos.sort((p, q) => p.y - q.y);
      for (let i = 1; i < rotulos.length; i++) rotulos[i].y = Math.max(rotulos[i].y, rotulos[i - 1].y + 14);
      for (const r of rotulos) s.append(svg("text", { x: X(dados.length - 1) + 12, y: r.y + 4, "font-size": 12, fill: r.cor }, r.texto));
    } else {           // legenda em cima: um traço com a cor (tracejado nas referências) e o nome
      const leg = svg("g"), lh = 17;
      let lx = 0, ly = 0;
      for (const r of rotulos) {
        const larg = 26 + r.texto.length * 7.3;
        if (lx + larg > W - 8) { lx = 0; ly += lh; }
        const ref = r.cor === "#8a8e95";
        leg.append(svg("line", { x1: lx + 4, x2: lx + 20, y1: ly + 8, y2: ly + 8, stroke: ref ? "#b4b7bd" : r.cor, "stroke-width": ref ? 1.5 : 3, "stroke-dasharray": ref ? "4 3" : "none" }));
        leg.append(svg("text", { x: lx + 25, y: ly + 12, "font-size": 12, fill: ref ? "#686c73" : r.cor }, r.texto));
        lx += larg;
      }
      const alt = ly + lh + 10;
      s.setAttribute("height", H + alt);
      s.setAttribute("viewBox", `0 ${-alt} ${W} ${H + alt}`);
      leg.setAttribute("transform", `translate(4, ${-alt + 2})`);
      s.append(leg);
    }
    s.append(svg("text", { x: (m.l + W - m.r) / 2, y: H - 4, "text-anchor": "middle", "font-size": 12, fill: "#686c73" }, eixo));
    caixa.replaceChildren(s);
  }

  // Ordenações: comparações (ou memória) por n, para três entradas (aleatória,
  // já ordenada, invertida) e, no tempo, as curvas de referência n²/2 e n log₂ n.
  function graficoOrdenacao(caixa, a, medida) {
    const tempo = medida === "comparacoes";
    desenharCasos(caixa, {
      dados: a.medido.tempo.crescimento,
      val: (d, caso) => caso === "aleatorio" ? (tempo ? d.aleatorio.media : d.aleatorio.pico) : d[caso][medida],
      series: [
        { caso: "ordenado", nome: "já ordenado", curto: "ordenado", cor: "#2869c3" },
        { caso: "invertido", nome: "invertido", curto: "invertido", cor: "#e05a3f" },
        { caso: "aleatorio", nome: tempo ? "aleatório (média)" : "aleatório (maior pico)", curto: "aleatório", cor: "#1e1e1e" },
      ],
      refs: tempo ? [REFS["n²/2"], REFS["n log₂ n"]] : [],
      banda: tempo ? { min: (d) => d.aleatorio.min, max: (d) => d.aleatorio.max } : null,
      todas: "as três entradas",
      aria: `${tempo ? "Comparações" : "Memória extra no pico"} por tamanho n, para entrada aleatória, já ordenada e invertida`,
      eixo: "n (números; dobra a cada passo)",
    });
  }

  const REFS = {
    "n²/2": { nome: "n²/2", f: (n) => n * n / 2 },
    "n log₂ n": { nome: "n log₂ n", f: (n) => n * Math.log2(n) },
    n: { nome: "n", f: (n) => n },
    V: { nome: "V", f: (n) => n },
    "V log₂ V": { nome: "V log₂ V", f: (n) => n * Math.log2(n) },
    "2n": { nome: "2n", f: (n) => 2 * n },
    "log₂ n": { nome: "log₂ n", f: (n) => Math.log2(n) },
    "log₂ n + 1": { nome: "log₂ n + 1", f: (n) => Math.log2(n) + 1 },
    m: { nome: "m", f: (n) => n },
    "n²": { nome: "n²", f: (n) => n * n },
    "n³": { nome: "n³", f: (n) => n ** 3 },
  };
  const CORES_CASOS = ["#2869c3", "#e05a3f", "#8c50b9", "#008c96", "#c8641e"];

  // As faixas que descrevem os próprios casos no dados.json (tempo.series):
  // a medida "ops" (a unidade da faixa, média nos sorteados) ou "pico".
  // `chave`: a série medida (crescimento, × n; na janela também por_k, × k com n fixo)
  // medida: "ops" (o tempo), "pico" (a memória) ou "altura" (as árvores)
  function graficoCasos(caixa, a, medida, chave = "crescimento") {
    const t = a.medido.tempo, tempo = medida === "ops", alt = medida === "altura", porK = chave === "por_k";
    let k = 0;
    const series = t.series.map((sr) => ({ ...sr, curto: sr.nome.replace(/ \(.*\)$/, ""),
      cor: sr.fundo ? "#a3a7ae" : sr.caso === t.banda || t.series.some((x) => x.fundo) ? "#1e1e1e" : CORES_CASOS[k++ % CORES_CASOS.length] }))
      .filter((sr) => (tempo || alt ? sr.tempo !== false : sr.memoria !== false))   // o ingênuo não guarda nada: fica fora da memória; a fila dos percursos, fora do tempo
      .sort((a, b) => !!b.fundo - !!a.fundo);   // as séries de fundo (os outros dois Fibonacci) por trás
    if (medida === "pico") series.forEach((sr) => { sr.nome = sr.nome.replace("(média)", "(maior)"); });   // na memória, o maior pico dos sorteios
    desenharCasos(caixa, {
      dados: t[chave],
      val: (d, caso) => (tempo ? d[caso].media ?? d[caso].ops : alt ? d[caso].altura : d[caso].pico),
      series,
      refs: (tempo ? t.refs || [] : alt ? t.refs_altura || [] : t.refs_memoria || []).map((r) => REFS[r]),
      banda: tempo && t.banda ? { min: (d) => d[t.banda].min, max: (d) => d[t.banda].max } : null,
      todas: "todos os casos",
      aria: `${tempo ? t.unidade : alt ? "altura da árvore (níveis)" : "memória extra no pico"} por ${porK ? t.eixo_k : "tamanho n"}, um traço por caso de entrada`,
      eixo: porK ? t.eixo_k : t.eixo,
    });
  }

  // Colisões: sondagens × ocupação α, medidas (a média por chave, pondo até α,
  // e o custo de pôr com α ocupado) e previstas pelas fórmulas de Knuth,
  // tracejadas. Na sondagem linear, o eixo das sondagens é logarítmico (perto
  // de α = 1 elas explodem); no encadeamento, linear.
  const FORMULAS = {
    encadeamento: { media: (a) => 1 + a / 2, ultima: (a) => 1 + a, nomes: ["1 + α/2", "1 + α"] },
    sondagem: { media: (a) => (1 + 1 / (1 - a)) / 2, ultima: (a) => (1 + 1 / (1 - a) ** 2) / 2, nomes: ["½(1 + 1/(1 − α))", "½(1 + 1/(1 − α)²)"] },
  };

  function graficoAlfa(caixa, a) {
    const t = a.medido.tempo, al = t.alfa, F = FORMULAS[t.tipo], log = t.tipo === "sondagem";
    const pts = al.pontos, amax = pts.at(-1).alfa;
    caixa.replaceChildren();
    const W = Math.max(300, caixa.clientWidth), H = 300, estreito = W < 480;
    const m = { l: 56, r: estreito ? 16 : 170, t: 18, b: 44 };
    const ymax = Math.max(...pts.flatMap((p) => [p.media, p.ultima, p.formula_ultima]));
    const lo = log ? 0 : 0, hi = log ? Math.ceil(Math.log10(ymax) * 2) / 2 : Math.ceil(ymax);
    const X = (x) => m.l + x / amax * (W - m.l - m.r);
    const Y = (v) => m.t + (1 - (log ? Math.log10(Math.max(v, 1)) - lo : v - lo) / (hi - lo)) * (H - m.t - m.b);
    const s = svg("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: "img",
      "aria-label": `Sondagens por chave conforme a ocupação α, de ${pts[0].alfa} a ${amax}, medidas e previstas` });
    const marcas = log ? ROTULOS_LOG.concat([2, 5, 20, 50, 200].map((v) => [v, String(v)])).filter(([v]) => Math.log10(v) <= hi)
      : Array.from({ length: hi + 1 }, (_, v) => [v, String(v)]);
    for (const [v, r] of marcas) {
      s.append(svg("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: "#eceef1" }));
      s.append(svg("text", { x: m.l - 10, y: Y(v) + 4, "text-anchor": "end", "font-size": 12, fill: "#686c73" }, r));
    }
    const passo = amax > 1 ? 0.5 : estreito ? 0.25 : 0.1;
    for (let x = 0; x <= amax + 1e-9; x += passo) {
      s.append(svg("text", { x: X(x), y: H - m.b + 20, "text-anchor": "middle", "font-size": 12, fill: "#686c73" }, String(Math.round(x * 100) / 100).replace(".", ",")));
    }
    // as fórmulas, numa curva contínua até o último α medido
    const rotulos = [];
    ["media", "ultima"].forEach((c, k) => {
      const curva = Array.from({ length: 121 }, (_, j) => amax * j / 120).map((x) => `${X(x)},${Y(F[c](x))}`);
      s.append(svg("polyline", { points: curva.join(" "), fill: "none", stroke: "#b4b7bd", "stroke-width": 1.2, "stroke-dasharray": "4 4" }));
      rotulos.push({ y: Y(F[c](amax)), texto: F.nomes[k], cor: "#8a8e95" });
    });
    const series = [{ c: "media", nome: "média por chave", cor: "#1e1e1e", cheio: true }, { c: "ultima", nome: "pôr com α ocupado", cor: "#2869c3", cheio: false }];
    for (const se of series) {
      s.append(svg("polyline", { points: pts.map((p) => `${X(p.alfa)},${Y(p[se.c])}`).join(" "), fill: "none", stroke: se.cor, "stroke-width": 2 }));
      pts.forEach((p) => s.append(svg("circle", { cx: X(p.alfa), cy: Y(p[se.c]), r: 3.6, fill: se.cheio ? se.cor : "#fff", stroke: se.cor, "stroke-width": 1.8 })));
      rotulos.push({ y: Y(pts.at(-1)[se.c]), texto: se.nome, cor: se.cor });
    }
    if (!estreito) {
      rotulos.sort((p, q) => p.y - q.y);
      for (let i = 1; i < rotulos.length; i++) rotulos[i].y = Math.max(rotulos[i].y, rotulos[i - 1].y + 14);
      for (const r of rotulos) s.append(svg("text", { x: X(amax) + 12, y: r.y + 4, "font-size": 12, fill: r.cor }, r.texto));
    } else {
      const leg = svg("g"), lh = 17;
      let lx = 0, ly = 0;
      for (const r of rotulos) {
        const larg = 26 + r.texto.length * 7.3;
        if (lx + larg > W - 8) { lx = 0; ly += lh; }
        const ref = r.cor === "#8a8e95";
        leg.append(svg("line", { x1: lx + 4, x2: lx + 20, y1: ly + 8, y2: ly + 8, stroke: ref ? "#b4b7bd" : r.cor, "stroke-width": ref ? 1.5 : 3, "stroke-dasharray": ref ? "4 3" : "none" }));
        leg.append(svg("text", { x: lx + 25, y: ly + 12, "font-size": 12, fill: ref ? "#686c73" : r.cor }, r.texto));
        lx += larg;
      }
      const alt = ly + lh + 10;
      s.setAttribute("height", H + alt);
      s.setAttribute("viewBox", `0 ${-alt} ${W} ${H + alt}`);
      leg.setAttribute("transform", `translate(4, ${-alt + 2})`);
      s.append(leg);
    }
    s.append(svg("text", { x: (m.l + W - m.r) / 2, y: H - 4, "text-anchor": "middle", "font-size": 12, fill: "#686c73" }, "α = n/m (ocupação da tabela)"));
    caixa.replaceChildren(s);
  }

  // Welford: o erro relativo da variância de cada conta quando se soma uma
  // constante aos dados (de 1 a 10¹⁰), as duas escalas em log. Erro zero vai
  // para o chão do gráfico; a linha tracejada em 1 é o erro do tamanho da
  // própria variância.
  function graficoErro(caixa, a) {
    const e = a.medido.tempo.erro, ds = e.deslocamentos;
    // as mesmas cores do gráfico de leituras (graficoCasos), série por série
    const series = a.medido.tempo.series.map((sr, i) => ({ ...sr, cor: CORES_CASOS[i % CORES_CASOS.length] }));
    caixa.replaceChildren();
    const W = Math.max(300, caixa.clientWidth), H = 300, estreito = W < 480;
    const m = { l: 74, r: estreito ? 16 : 150, t: 18, b: 44 };
    const CHAO = -17;   // 10⁻¹⁷: abaixo do arredondamento de um double; o erro zero cai aqui
    const lg = (v) => (v > 0 ? Math.max(CHAO, Math.log10(v)) : CHAO);
    const hi = Math.ceil(Math.max(0, ...series.flatMap((sr) => e[sr.caso].map(lg))));
    const X = (i) => m.l + i / (ds.length - 1) * (W - m.l - m.r);
    const Y = (l) => m.t + (1 - (l - CHAO) / (hi - CHAO)) * (H - m.t - m.b);
    const s = svg("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: "img",
      "aria-label": "Erro relativo da variância de cada conta conforme a constante somada aos dados" });
    const pot = (k) => (k === 0 ? "1" : `10${String(k).split("").map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d] || "⁻").join("")}`);
    for (let k = CHAO; k <= hi; k += 4) {
      s.append(svg("line", { x1: m.l, x2: W - m.r, y1: Y(k), y2: Y(k), stroke: "#eceef1" }));
      s.append(svg("text", { x: m.l - 10, y: Y(k) + 4, "text-anchor": "end", "font-size": 12, fill: "#686c73" }, k === CHAO ? "0" : pot(k)));
    }
    s.append(svg("line", { x1: m.l, x2: W - m.r, y1: Y(0), y2: Y(0), stroke: "#b4b7bd", "stroke-dasharray": "4 4" }));
    ds.forEach((d, i) => { if (i % (estreito ? 2 : 1) === 0) s.append(svg("text", { x: X(i), y: H - m.b + 20, "text-anchor": "middle", "font-size": 12, fill: "#686c73" }, pot(Math.round(Math.log10(d))))); });
    const rotulos = [];
    for (const sr of series) {
      const pts = e[sr.caso].map((v, i) => [X(i), Y(lg(v))]);
      s.append(svg("polyline", { points: pts.map((p) => p.join(",")).join(" "), fill: "none", stroke: sr.cor, "stroke-width": 2 }));
      pts.forEach(([x, y]) => s.append(svg("circle", { cx: x, cy: y, r: 3.6, fill: sr.cor })));
      rotulos.push({ y: pts.at(-1)[1], texto: sr.nome, cor: sr.cor });
    }
    rotulos.push({ y: Y(0), texto: "erro = 100%", cor: "#8a8e95" });
    if (!estreito) {
      rotulos.sort((p, q) => p.y - q.y);
      for (let i = 1; i < rotulos.length; i++) rotulos[i].y = Math.max(rotulos[i].y, rotulos[i - 1].y + 14);
      for (const r of rotulos) s.append(svg("text", { x: X(ds.length - 1) + 12, y: r.y + 4, "font-size": 12, fill: r.cor }, r.texto));
    } else {
      const leg = svg("g"), lh = 17;
      let lx = 0, ly = 0;
      for (const r of rotulos) {
        const larg = 26 + r.texto.length * 7.3;
        if (lx + larg > W - 8) { lx = 0; ly += lh; }
        const ref = r.cor === "#8a8e95";
        leg.append(svg("line", { x1: lx + 4, x2: lx + 20, y1: ly + 8, y2: ly + 8, stroke: ref ? "#b4b7bd" : r.cor, "stroke-width": ref ? 1.5 : 3, "stroke-dasharray": ref ? "4 3" : "none" }));
        leg.append(svg("text", { x: lx + 25, y: ly + 12, "font-size": 12, fill: ref ? "#686c73" : r.cor }, r.texto));
        lx += larg;
      }
      const alt = ly + lh + 10;
      s.setAttribute("height", H + alt);
      s.setAttribute("viewBox", `0 ${-alt} ${W} ${H + alt}`);
      leg.setAttribute("transform", `translate(4, ${-alt + 2})`);
      s.append(leg);
    }
    s.append(svg("text", { x: (m.l + W - m.r) / 2, y: H - 4, "text-anchor": "middle", "font-size": 12, fill: "#686c73" }, "constante somada aos dados (pés)"));
    caixa.replaceChildren(s);
  }

  function blocoMemoria(a) {
    const det = a.medido.memoria.detalhe;
    const nomes = a.memoria.nomes || {}, cheios = a.memoria.cresce_com_n || [];
    const frag = document.createDocumentFragment();
    const itens = Object.entries(det).filter(([, tam]) => tam > 0).sort((p, q) => q[1] - p[1]);
    if (!itens.length) {
      frag.append(el("p", { class: "memoria-total", html: `<b>Nenhum valor extra.</b> ${esc(a.memoria.vazio ? a.memoria.vazio[0].toUpperCase() + a.memoria.vazio.slice(1) : "Ordena dentro do próprio vetor")}; ${esc(a.memoria.soltos || "só guarda índices soltos")}.` }));
      return frag;
    }
    for (const [chave, tam] of itens) {
      const cel = el("div", { class: "celulas" + (cheios.includes(chave) ? "" : " k"), "aria-hidden": "true" });
      for (let i = 0; i < tam; i++) cel.append(el("i"));
      frag.append(el("div", { class: "memoria-linha" }, [
        el("div", { class: "nome", html: `<b>${tam}</b>${esc(nomes[chave] || chave)}` }),
        cel,
      ]));
    }
    const n = itens.filter(([c]) => cheios.includes(c)).reduce((t, [, x]) => t + x, 0);
    const resto = a.medido.memoria.pico - n;
    const partes = [n && `${n} crescem com ${a.memoria.variavel || "n"} (preenchidos)`, resto && `${resto} ${esc(a.memoria.vazados || "crescem mais devagar")} (vazados)`].filter(Boolean);
    frag.append(el("p", { class: "memoria-total", html: `<b>${mil(a.medido.memoria.pico)} valores</b> no pico: ${partes.join(", ")}.` }));
    return frag;
  }

  // ---------- código com o grafo de fluxo ao lado ----------

  const PALAVRAS = /\b(def|for|in|if|else|elif|while|break|continue|return|not|and|or|True|False|None)\b/g;

  function realce(linha) {
    const i = linha.indexOf("#");
    const cod = i >= 0 ? linha.slice(0, i) : linha, com = i >= 0 ? linha.slice(i) : "";
    return esc(cod).replace(PALAVRAS, '<span class="kw">$1</span>') + (com ? `<span class="com">${esc(com)}</span>` : "");
  }

  const DECISAO = new Set(["if", "for", "while", "e", "ou"]);

  function blocoCodigo(a) {
    const c = a.medido.ciclomatica;
    const linhas = c.codigo.replace(/\n$/, "").split("\n");
    const porLinha = {};                       // quantas decisões cada linha tem (um while com and vale 2)
    c.decisoes.forEach((d) => (porLinha[d.linha] = (porLinha[d.linha] || 0) + 1));
    const LH = 22, GW = window.innerWidth < 600 ? 124 : 162, x0 = GW - 28;  // recalculado ao redimensionar
    const s = svg("svg", { width: GW, height: (linhas.length + 1) * LH, "aria-hidden": "true" });
    const nos = c.grafo.nos;
    // nós da mesma linha (o "e"/"ou" de uma condição) ficam lado a lado, para a direita
    const pos = {}, naLinha = {};
    for (const n of nos) {
      const k = naLinha[n.linha] = (naLinha[n.linha] ?? -1) + 1;
      pos[n.id] = [x0 + k * 13, (n.linha - 0.5) * LH];
    }
    const porId = Object.fromEntries(nos.map((n) => [n.id, n]));
    const linhasNos = [...new Set(nos.map((n) => n.linha))].sort((p, q) => p - q);
    const proxima = (l) => linhasNos.find((x) => x > l);
    for (const e of c.grafo.arestas) {
      const [xa, ya] = pos[e.de], [xb, yb] = pos[e.para];
      const l1 = porId[e.de].linha, l2 = porId[e.para].linha, volta = e.tipo === "volta";
      if (l1 === l2 || (!volta && l2 === proxima(l1) && xa === xb)) {
        s.append(svg("line", { x1: xa, x2: xb, y1: ya, y2: yb, stroke: "#b4b7bd", "stroke-width": 1.5 }));
        continue;
      }
      const w = Math.min(x0 - 12, 14 + Math.abs(l2 - l1) * 5.2);
      s.append(svg("path", {
        d: `M${xa},${ya} C${x0 - w},${ya} ${x0 - w},${yb} ${xb},${yb}`,
        fill: "none", stroke: volta ? "#1e1e1e" : "#8a8e95", "stroke-width": 1.4,
        "stroke-dasharray": volta ? "4 3" : "none",
      }));
    }
    for (const n of nos) {
      const d = DECISAO.has(n.rotulo), [x, y] = pos[n.id];
      s.append(svg("circle", { cx: x, cy: y, r: d ? 5 : 3, fill: d ? "#169646" : "#fff",
        stroke: d ? "#169646" : "#8a8e95", "stroke-width": 1.5 }));
    }
    const ol = el("ol");
    linhas.forEach((l, i) => {
      const n = porLinha[i + 1];
      ol.append(el("li", n ? { class: "decisao", "data-n": n, html: realce(l) || " " } : { html: realce(l) || " " }));
    });
    ol.append(el("li", { class: "fim", text: "fim" }));
    return el("div", { class: "codigo", role: "figure", "aria-label": "Código da função com o grafo de fluxo de controle ao lado" }, [s, ol]);
  }


  window.Graficos = { graficoCrescimento, graficoHistograma, graficoOrdenacao, graficoCasos, graficoErro, graficoAlfa, blocoMemoria, blocoCodigo, el, svg, mil, esc };
})();
