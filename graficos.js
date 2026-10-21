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

  const ROTULOS_LOG = [[10, "10"], [1e2, "100"], [1e3, "1 mil"], [1e4, "10 mil"], [1e5, "100 mil"], [1e6, "1 milhão"], [1e7, "10 milhões"]];

  // Ordenações: uma medida por n em escala log, para três entradas (aleatória,
  // já ordenada, invertida) e, no tempo, as curvas de referência n²/2 e n log₂ n.
  function graficoOrdenacao(caixa, a, medida) {
    const dados = a.medido.tempo.crescimento;
    const tempo = medida === "comparacoes";
    const val = (d, caso) => caso === "aleatorio" ? (tempo ? d.aleatorio.media : d.aleatorio.pico) : d[caso][medida];
    const series = [
      { caso: "ordenado", nome: "já ordenado", cor: "#2869c3" },
      { caso: "invertido", nome: "invertido", cor: "#e05a3f" },
      { caso: "aleatorio", nome: tempo ? "aleatório (média)" : "aleatório (maior pico)", cor: "#1e1e1e" },
    ];
    const refs = tempo ? [
      { nome: "n²/2", f: (n) => n * n / 2 },
      { nome: "n log₂ n", f: (n) => n * Math.log2(n) },
    ] : [];
    caixa.replaceChildren();
    const W = Math.max(300, caixa.clientWidth), H = 300;
    const estreito = W < 480;   // no celular, a legenda vai para cima do gráfico
    const m = { l: 74, r: estreito ? 16 : 150, t: 18, b: 44 };
    const todos = dados.flatMap((d) => series.map((sr) => val(d, sr.caso)))
      .concat(refs.flatMap((r) => dados.map((d) => r.f(d.n)))).filter((x) => x > 0);
    const lo = Math.floor(Math.log10(Math.min(...todos)) * 2) / 2, hi = Math.ceil(Math.log10(Math.max(...todos)) * 2) / 2;
    const X = (i) => m.l + (i + 0.5) * (W - m.l - m.r) / dados.length;
    const Y = (v) => m.t + (1 - (Math.log10(Math.max(v, 10 ** lo)) - lo) / (hi - lo)) * (H - m.t - m.b);
    const s = svg("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: "img",
      "aria-label": `${tempo ? "Comparações" : "Memória extra no pico"} por tamanho n, para entrada aleatória, já ordenada e invertida` });
    for (const [v, r] of ROTULOS_LOG.filter(([v]) => Math.log10(v) >= lo && Math.log10(v) <= hi)) {
      s.append(svg("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: "#eceef1" }));
      s.append(svg("text", { x: m.l - 10, y: Y(v) + 4, "text-anchor": "end", "font-size": 12, fill: "#686c73" }, r));
    }
    dados.forEach((d, i) => s.append(svg("text", { x: X(i), y: H - m.b + 20, "text-anchor": "middle", "font-size": 12, fill: "#686c73" }, mil(d.n))));
    for (const r of refs) {
      s.append(svg("polyline", { points: dados.map((d, i) => `${X(i)},${Y(r.f(d.n))}`).join(" "), fill: "none", stroke: "#b4b7bd", "stroke-width": 1.2, "stroke-dasharray": "4 4" }));
    }
    if (tempo) {   // faixa entre o menor e o maior dos vetores aleatórios
      const cima = dados.map((d, i) => `${X(i)},${Y(d.aleatorio.max)}`), baixo = dados.map((d, i) => `${X(i)},${Y(d.aleatorio.min)}`).reverse();
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
    const CURTO = { aleatorio: "aleatório", ordenado: "ordenado", invertido: "invertido" };
    const rotulos = [];
    for (const g of grupos) {
      const pts = g.vals.map((v, i) => [X(i), Y(v)]);
      g.membros.forEach((sr, k) => {
        const larg = 2 + 4 * (g.membros.length - 1 - k);
        s.append(svg("polyline", { points: pts.map((p) => p.join(",")).join(" "), fill: "none", stroke: sr.cor, "stroke-width": larg }));
        pts.forEach(([x, y]) => s.append(svg("circle", { cx: x, cy: y, r: 3.2 + larg / 3, fill: sr.cor })));
      });
      const texto = g.membros.length === 1 ? g.membros[0].nome
        : g.membros.length === 3 ? "as três entradas" : g.membros.map((sr) => CURTO[sr.caso]).join(" = ");
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
    s.append(svg("text", { x: (m.l + W - m.r) / 2, y: H - 4, "text-anchor": "middle", "font-size": 12, fill: "#686c73" }, "n (números; dobra a cada passo)"));
    caixa.replaceChildren(s);
  }

  function blocoMemoria(a) {
    const det = a.medido.memoria.detalhe;
    const nomes = a.memoria.nomes || {}, cheios = a.memoria.cresce_com_n || [];
    const frag = document.createDocumentFragment();
    const itens = Object.entries(det).filter(([, tam]) => tam > 0).sort((p, q) => q[1] - p[1]);
    if (!itens.length) {
      frag.append(el("p", { class: "memoria-total", html: "<b>Nenhum valor extra.</b> Ordena dentro do próprio vetor; só guarda índices soltos." }));
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
    const partes = [n && `${n} crescem com n (preenchidos)`, resto && `${resto} ${esc(a.memoria.vazados || "crescem mais devagar")} (vazados)`].filter(Boolean);
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


  window.Graficos = { graficoCrescimento, graficoHistograma, graficoOrdenacao, blocoMemoria, blocoCodigo, el, svg, mil, esc };
})();
