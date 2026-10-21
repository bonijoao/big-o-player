// A página de um instrumento (estrutura de dados): placa, demo ao vivo,
// operações com o custo medido e as faixas que o creditam. A tabela e os
// gráficos leem dados.js (medido em Python); a demo roda as mesmas estruturas
// em JavaScript (simulacao/instrumentos.js), que o teste confere com o Python.
(function () {
  "use strict";

  const { el, svg, mil, esc } = window.Graficos;
  const I = window.Instrumentos;
  const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const COR = {
    tinta: "#1e1e1e", cinza: "#686c73", palido: "#cdd0d6", linha: "#dee0e4", fundo: "#f4f5f7",
    le: "#2869c3", escreve: "#eb5f46",
  };
  const SERIES = ["#1e1e1e", "#2869c3", "#8c50b9", "#008c96", "#c8641e"];   // categorias, nunca grandeza
  const MAX = 16;                        // a demo vai até 16 valores
  const decimal = (x) => x.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
  const plural = (n, um, varios) => `${mil(n)} ${n === 1 ? um : varios}`;
  const total = (t) => (t.leituras + t.escritas) / (t.vezes || 1);
  const sorteia = () => Math.floor(Math.random() * 90) + 10;

  function textoCusto(r) {
    const partes = [];
    if (r.leituras) partes.push(plural(r.leituras, "leitura", "leituras"));
    if (r.escritas) partes.push(plural(r.escritas, "escrita", "escritas"));
    return partes.length ? partes.join(" + ") : "nenhum acesso";
  }

  // ---------- glifos (capa do instrumento: a forma, não um valor) ----------

  function glifo(id, extra = "") {
    const s = svg("svg", { viewBox: "0 0 48 48", class: `glifo ${extra}`, "aria-hidden": "true" });
    const casa = (x, y, w, h, cheia) => s.append(svg("rect", { x, y, width: w, height: h, rx: 1.5,
      fill: cheia ? COR.tinta : "#fff", stroke: cheia ? COR.tinta : COR.cinza, "stroke-width": 1.5, "stroke-dasharray": cheia ? "" : "2 2" }));
    if (id === "pilha") { [0, 1, 2].forEach((k) => casa(12, 34 - k * 10, 24, 8, true)); casa(12, 4, 24, 8, false); }
    else if (id === "fila") {
      [0, 1, 2].forEach((k) => casa(8 + k * 10, 20, 8, 8, true)); casa(38, 20, 8, 8, false);
      s.append(svg("path", { d: "M4 36 H44 M40 32 L44 36 L40 40", fill: "none", stroke: COR.cinza, "stroke-width": 1.5 }));
    } else { [0, 1, 2].forEach((k) => casa(4 + k * 10, 20, 8, 8, true)); casa(34, 20, 8, 8, false); }
    return el("span", { class: `capa capa-instrumento ${extra}` }, s);
  }

  // ---------- desenho das casas ----------

  // estado visível de uma estrutura: as casas, a cor do papel de cada uma
  // (lida, escrita) e as casas novas durante uma realocação
  function quadro(e) {
    return { casas: e.casas(), cores: {}, novas: null, coresNovas: {}, n: e.n, inicio: e.inicio || 0 };
  }

  function aplicar(q, ev) {
    q.cores = {}; q.coresNovas = {};
    if (ev.t === "le") q.cores[ev.i] = "le";
    else if (ev.t === "escreve") { q.casas[ev.i] = ev.x; q.cores[ev.i] = "escreve"; }
    else if (ev.t === "realoca") q.novas = new Array(ev.para).fill(null);
    else if (ev.t === "copia") { q.cores[ev.i] = "le"; q.novas[ev.k] = ev.x; q.coresNovas[ev.k] = "escreve"; }
    else if (ev.t === "trocou") { q.casas = q.novas; q.novas = null; q.inicio = 0; }
    else if (ev.t === "libera") q.casas[ev.i] = null;
  }

  function casa(g, x, y, w, h, valor, papel, rotulo) {
    const livre = valor === null;
    const fill = papel === "le" ? COR.le : papel === "escreve" ? COR.escreve : livre ? COR.fundo : "#fff";
    g.append(svg("rect", { x, y, width: w, height: h, rx: 3, fill,
      stroke: papel ? fill : livre ? COR.palido : COR.tinta, "stroke-width": 1.5, "stroke-dasharray": livre && !papel ? "3 3" : "" }));
    if (!livre) g.append(svg("text", { x: x + w / 2, y: y + h / 2 + 5, "text-anchor": "middle", "font-size": 14,
      "font-weight": 600, fill: papel ? "#fff" : COR.tinta }, rotulo(valor)));
  }

  // uma fileira de casas (vetor e filas), quebrando em linhas de `col` casas
  function fileira(g, casas, cores, y0, col, rotulo, marcas = {}) {
    const S = 38, P = 42, X0 = 24;
    casas.forEach((v, i) => {
      const x = X0 + (i % col) * P, y = y0 + Math.floor(i / col) * 68 + 32;
      casa(g, x, y, S, S, v, cores[i], rotulo);
      g.append(svg("text", { x: x + S / 2, y: y + S + 14, "text-anchor": "middle", "font-size": 10, fill: COR.cinza }, String(i)));
      const m = marcas[i];
      if (m) g.append(svg("text", { x: x + S / 2, y: y - 5, "text-anchor": "middle", "font-size": 10, "font-weight": 600, fill: COR.tinta }, m));
    });
    return 32 + Math.ceil(casas.length / col) * 68 - 8;     // altura usada
  }

  // ---------- animação: cada evento vira um quadro ----------

  function animador() {
    let timer = null, fim = null;
    return {
      // anda por várias listas de eventos ao mesmo tempo (as duas filas), uma por quadro
      // `teto`: o máximo de milissegundos por quadro (o repasse da pilha anda mais rápido)
      tocar(listas, cada, acabou, teto = 260) {
        this.terminar();
        const max = Math.max(0, ...listas.map((l) => l.length));
        const passo = calmo ? 0 : Math.min(teto, Math.max(35, 3200 / Math.max(1, max)));
        let k = 0;
        fim = () => { while (k < max) { listas.forEach((l, j) => l[k] && cada(j, l[k])); k++; } timer = null; fim = null; acabou(); };
        if (!passo) return fim();
        const anda = () => {
          if (k >= max) { const f = fim; fim = null; timer = null; return f && f(); }
          listas.forEach((l, j) => l[k] && cada(j, l[k]));
          k++;
          acabou.quadro();
          timer = setTimeout(anda, passo);
        };
        anda();
      },
      terminar() { clearTimeout(timer); timer = null; if (fim) fim(); },
      ocupado: () => timer !== null,
      parar() { clearTimeout(timer); timer = null; fim = null; },
    };
  }

  // ---------- a demo ----------

  function demo(inst, ctx) {
    const tipo = inst.id;
    const variantes = tipo === "fila" ? ["ingenua", "circular"] : [tipo];
    const nomeVar = inst.variantes || {};
    let es = [], qs = [], log = [];
    const anim = animador();
    const figura = el("div", { class: "demo-figura" });
    const custou = el("p", { class: "demo-custou", "aria-live": "polite" });
    const lista = el("ol", { class: "demo-log" });
    const aviso = el("p", { class: "demo-aviso" });
    const campo = (rotulo, id, valor, max) => {
      const i = el("input", { type: "number", id, min: 0, max, value: String(valor), inputmode: "numeric" });
      return [el("label", { for: id, text: rotulo }), i];
    };
    const [rotX, entX] = campo("valor", `x-${tipo}`, sorteia(), 99);
    const [rotI, entI] = campo("posição", `i-${tipo}`, 0, MAX);
    let rotulo = (v) => String(v);
    let repasse = null;                  // o repasse em curso; cada um tem o seu objeto
    const pararRepasse = el("button", { type: "button", class: "botao-passo", text: "parar", hidden: "" });

    function recomecar(n = 5) {
      anim.parar();
      if (repasse) { clearTimeout(repasse.timer); repasse = null; }
      pararRepasse.hidden = true;
      es = variantes.map((v) => I.ESTRUTURAS[v]());
      const chamada = { vetor: "anexar", pilha: "empilhar", fila: "enfileirar" }[tipo];
      for (let k = 0; k < n; k++) { const x = sorteia(); es.forEach((e) => e[chamada](x)); }
      qs = es.map(quadro);
      rotulo = (v) => String(v);
      log = [];
      custou.textContent = `${n} valores postos para começar; clique numa operação.`;
      aviso.textContent = "";
      desenhar(); listar(); habilitar();
    }

    function nomeOp(chamada, args) {
      const x = args.length ? args[args.length - 1] : null;
      return {
        ler: `ler v[${args[0]}]`, escrever: `escrever ${x} em v[${args[0]}]`, anexar: `anexar ${x}`,
        inserir: `inserir ${x} na posição ${args[0]}`, remover: `remover v[${args[0]}]`, buscar: `buscar ${x}`,
        empilhar: `empilhar ${rotulo(x)}`, desempilhar: "desempilhar", topo: "ver o topo",
        enfileirar: `enfileirar ${x}`, desenfileirar: "desenfileirar", primeiro: "ver o primeiro",
      }[chamada];
    }

    function fazer(chamada, args, depois) {
      anim.terminar();
      qs = es.map(quadro);
      const rs = es.map((e) => I.operar(e, chamada, args));
      habilitar();                       // a estrutura já está no estado novo; a animação só o mostra
      const nome = nomeOp(chamada, args);
      const fim = () => {
        qs.forEach((q, j) => { q.casas = es[j].casas(); q.n = es[j].n; q.inicio = es[j].inicio || 0; q.novas = null; });
        desenhar(); habilitar();
        const volta = rs[0].volta;
        const devolveu = chamada === "buscar" ? (volta < 0 ? " → não está" : ` → posição ${volta}`)
          : volta !== null ? ` → ${rotulo(volta)}` : "";
        const custo = rs.map((r, j) => `${variantes.length > 1 ? `${nomeVar[variantes[j]]}: ` : ""}${textoCusto(r)}`).join(" · ");
        const soma = rs.map((r) => r.leituras + r.escritas);
        custou.replaceChildren(el("b", { text: `${nome}${devolveu}` }), el("span", { text: ` custou ${custo}` }),
          variantes.length === 1 ? el("span", { class: "total", text: ` = ${plural(soma[0], "acesso", "acessos")}` }) : "");
        const realocou = rs.find((r) => r.eventos.some((e) => e.t === "realoca"));
        aviso.textContent = realocou ? `As casas acabaram: reservou ${realocou.eventos.find((e) => e.t === "realoca").para} e copiou os valores, um por um.` : "";
        log.unshift({ nome: nome + devolveu, custos: rs.map((r) => r.leituras + r.escritas) });
        log = log.slice(0, 6);
        listar();
        if (depois) depois();
      };
      fim.quadro = desenhar;
      anim.tocar(rs.map((r) => r.eventos), (j, ev) => aplicar(qs[j], ev), fim, repasse ? 70 : 260);
    }

    function listar() {
      lista.replaceChildren(...log.map((l) => el("li", {}, [el("span", { text: l.nome }),
        el("b", { text: l.custos.map((c) => plural(c, "acesso", "acessos")).join(" · ") })])));
    }

    // ---------- desenho ----------

    function desenhar() {
      const estreito = figura.clientWidth > 0 && figura.clientWidth < 560;
      const col = estreito ? 8 : MAX;
      let s;
      if (tipo === "pilha") s = desenharPilha();
      else {
        const W = 24 + col * 42;
        const g = svg("g");
        let y = 0;
        qs.forEach((q, j) => {
          const cap = q.casas.length;
          const titulo = variantes.length > 1 ? `fila ${nomeVar[variantes[j]]}: ` : "";
          g.append(svg("text", { x: 24, y: y + 14, "font-size": 12, fill: COR.cinza },
            `${titulo}n = ${q.n} ${q.n === 1 ? "valor" : "valores"}, ${cap} ${cap === 1 ? "casa reservada" : "casas reservadas"}`));
          const marcas = {};
          if (tipo === "fila") {
            if (q.n) marcas[q.inicio] = "início";
            if (q.n < cap) marcas[(q.inicio + q.n) % cap] = marcas[(q.inicio + q.n) % cap] ? "início/fim" : "fim";
          }
          y += fileira(g, q.casas, q.cores, y + 6, col, rotulo, marcas) + 6;
          if (q.novas) {
            g.append(svg("text", { x: 24, y: y + 14, "font-size": 12, fill: COR.escreve, "font-weight": 600 },
              `casas novas: ${q.novas.length}, copiando`));
            y += fileira(g, q.novas, q.coresNovas, y + 6, col, rotulo) + 6;
          }
          y += 14;
        });
        s = svg("svg", { viewBox: `0 0 ${W} ${y}`, width: W, height: y, role: "img", "aria-label": descrever() });
        s.append(g);
      }
      figura.replaceChildren(s);
    }

    function desenharPilha() {
      const q = qs[0], H = 26, larg = repasse ? 190 : 120, X = 60;
      const base = 40 + Math.max(8, q.casas.length, q.novas ? q.novas.length : 0) * (H + 2);
      const W = X + larg + 40 + (q.novas ? larg + 40 : 0) + 20;
      const s = svg("svg", { viewBox: `0 0 ${Math.max(W, 420)} ${base + 30}`, width: Math.max(W, 420), height: base + 30, role: "img", "aria-label": descrever() });
      s.append(svg("text", { x: X, y: 16, "font-size": 12, fill: COR.cinza },
        `n = ${q.n} ${q.n === 1 ? "valor" : "valores"}, ${q.casas.length} ${q.casas.length === 1 ? "casa reservada" : "casas reservadas"}`));
      const coluna = (casas, cores, x) => casas.forEach((v, i) => {
        const y = base - (i + 1) * (H + 2);
        casa(s, x, y, larg, H, v, cores[i], rotulo);
        s.append(svg("text", { x: x - 8, y: y + H / 2 + 4, "text-anchor": "end", "font-size": 10, fill: COR.cinza }, String(i)));
      });
      coluna(q.casas, q.cores, X);
      if (q.n) {
        const y = base - q.n * (H + 2);
        s.append(svg("text", { x: X + larg + 10, y: y + H / 2 + 4, "font-size": 11, "font-weight": 600, fill: COR.tinta }, "← topo"));
      }
      if (q.novas) {
        const x = X + larg + 80;
        s.append(svg("text", { x, y: 16, "font-size": 12, "font-weight": 600, fill: COR.escreve }, `casas novas: ${q.novas.length}`));
        coluna(q.novas, q.coresNovas, x);
      }
      s.append(svg("line", { x1: X - 4, x2: X + larg + 4, y1: base + 2, y2: base + 2, stroke: COR.tinta, "stroke-width": 2 }));
      return s;
    }

    function descrever() {
      return qs.map((q, j) => `${variantes.length > 1 ? `fila ${nomeVar[variantes[j]]}: ` : ""}${es[j].valores().map(rotulo).join(", ") || "vazia"}`).join("; ");
    }

    // ---------- controles ----------

    const botoes = {};
    const botao = (rot, acao, cond) => {
      const b = el("button", { type: "button", class: "botao-passo", text: rot });
      b.addEventListener("click", () => { if (!repasse && cond()) acao(); });   // clique duplo não opera fora do limite
      botoes[rot] = { b, cond };
      return b;
    };
    const lerX = () => {
      const x = Number(entX.value);
      if (entX.value === "" || !Number.isInteger(x) || x < 0 || x > 99) { aviso.textContent = "O valor vai de 0 a 99."; return null; }
      return x;
    };
    const lerI = () => Math.round(Number(entI.value) || 0);
    const trocaX = () => { entX.value = String(sorteia()); };
    function comPosicao(chamada, maxI, comX) {
      const i = lerI(), n = es[0].n, lim = maxI(n);
      if (i < 0 || i > lim) { aviso.textContent = `Posição fora do vetor: aqui vai de 0 a ${lim}.`; return; }
      const x = comX ? lerX() : 0;
      if (x === null) return;
      fazer(chamada, comX ? [i, x] : [i]);
      if (comX) trocaX();
    }

    const n0 = () => es[0].n;
    function comValor(chamada) { const x = lerX(); if (x !== null) { fazer(chamada, [x]); trocaX(); } }
    let ops;
    if (tipo === "vetor") {
      ops = [
        botao("ler v[i]", () => comPosicao("ler", (n) => n - 1), () => n0() > 0),
        botao("escrever x em v[i]", () => comPosicao("escrever", (n) => n - 1, true), () => n0() > 0),
        botao("anexar x", () => comValor("anexar"), () => n0() < MAX),
        botao("inserir x em i", () => comPosicao("inserir", (n) => n, true), () => n0() < MAX),
        botao("remover v[i]", () => comPosicao("remover", (n) => n - 1), () => n0() > 0),
        botao("buscar x", () => { const x = lerX(); if (x !== null) fazer("buscar", [x]); }, () => true),
      ];
    } else if (tipo === "pilha") {
      ops = [
        botao("empilhar x", () => comValor("empilhar"), () => n0() < MAX),
        botao("desempilhar", () => fazer("desempilhar", []), () => n0() > 0),
        botao("ver o topo", () => fazer("topo", []), () => n0() > 0),
      ];
    } else {
      ops = [
        botao("enfileirar x", () => comValor("enfileirar"), () => n0() < MAX),
        botao("desenfileirar", () => fazer("desenfileirar", []), () => n0() > 0),
        botao("ver o primeiro", () => fazer("primeiro", []), () => n0() > 0),
      ];
    }
    const recomeca = el("button", { type: "button", class: "botao-passo", text: "recomeçar" });
    recomeca.addEventListener("click", () => recomecar());

    function habilitar() {
      for (const { b, cond } of Object.values(botoes)) b.disabled = !!repasse || !cond();
      const n = es[0] ? es[0].n : 0;
      if (tipo === "vetor") entI.max = String(Math.max(0, n));
    }

    // ---------- pilha: repassar a pilha de chamadas de uma faixa ----------

    const extras = [];
    if (tipo === "pilha") {
      const recursivas = ctx.faixas.filter((f) => (f.instrumentos || []).some((c) => c.id === "pilha") && I && window.Algoritmos.ORDENACOES[f.alg]);
      if (recursivas.length) {
        pararRepasse.addEventListener("click", () => {
          if (!repasse) return;
          clearTimeout(repasse.timer);
          repasse = null;                  // antes de terminar: o fim da animação não agenda o próximo passo
          anim.terminar();
          pararRepasse.hidden = true;
          habilitar();
        });
        extras.push(el("div", { class: "demo-repasse" }, [
          el("span", { text: "repassar a pilha de chamadas:" }),
          ...recursivas.map((f) => {
            const b = el("button", { type: "button", class: "botao-passo", text: f.nome });
            b.addEventListener("click", () => repassar(f));
            return b;
          }),
          pararRepasse,
        ]));
      }
    }

    function repassar(f) {
      recomecar(0);
      const r = window.Algoritmos.ordenar(f.alg, f.exemplo.vetor);
      const nome = f.pseudocodigo ? f.pseudocodigo.linhas[0].match(/procedimento\s+(\S+?)\(/)[1] : f.alg;
      rotulo = (v) => (Array.isArray(v) ? `${nome}(v, ${v[0] + 1}, ${v[1]})` : String(v));
      const chamadas = r.eventos.filter((e) => e.t === "entra" || e.t === "sai");
      let k = 0, pico = 0;
      const meu = repasse = { timer: null };
      pararRepasse.hidden = false;
      habilitar();
      const esperado = f.medido.memoria.detalhe.pilha;
      const anda = () => {
        if (repasse !== meu) return;
        if (k >= chamadas.length) {
          repasse = null; pararRepasse.hidden = true; habilitar();
          custou.replaceChildren(el("b", { text: `${f.nome}: ${chamadas.length / 2} chamadas, pico de ${plural(pico, "nível", "níveis")}` }),
            el("span", { text: pico === esperado ? `, o mesmo pico de pilha medido na faixa (n = ${f.exemplo.n}).` : "." }));
          return;
        }
        const e = chamadas[k++];
        fazer(e.t === "entra" ? "empilhar" : "desempilhar", e.t === "entra" ? [[e.a, e.b]] : [], () => {
          pico = Math.max(pico, es[0].n);
          if (repasse === meu) meu.timer = setTimeout(anda, calmo ? 0 : 90);
        });
      };
      anda();
    }

    // ---------- montagem ----------

    const controles = el("div", { class: "demo-controles" }, [
      el("span", { class: "demo-campos" }, [rotX, entX, ...(tipo === "vetor" ? [rotI, entI] : [])]),
      el("span", { class: "demo-botoes" }, [...ops, recomeca]),
    ]);
    const legenda = el("p", { class: "demo-legenda", html:
      `<i style="background:${COR.le}"></i>casa lida <i style="background:${COR.escreve}"></i>casa escrita <i class="livre"></i>casa reservada, livre` });
    const raiz = el("div", { class: "demo" }, [controles, ...extras, figura, legenda, custou, aviso, el("p", { class: "demo-log-titulo", text: "últimas operações" }), lista]);
    recomecar();
    return { el: raiz, redesenhar: desenhar, parar() { anim.parar(); if (repasse) { clearTimeout(repasse.timer); repasse = null; } } };
  }

  // ---------- gráficos: custo × n e casas × n ----------

  function graficoCusto(caixa, inst) {
    const ops = inst.medido.operacoes;
    const series = inst.grafico.map((g, k) => ({ ...g, cor: SERIES[k % SERIES.length], media: ops[g.id].seguidas === "media",
      pts: ops[g.id].serie.map((t) => [t.n, total(t)]) }));
    caixa.replaceChildren();
    const W = Math.max(300, caixa.clientWidth), H = 300, direto = W >= 600;
    const m = { l: 48, r: direto ? 170 : 16, t: 14, b: 40 };
    const xmax = Math.max(...series.flatMap((s) => s.pts.map((p) => p[0])));
    const ymax = Math.max(...series.flatMap((s) => s.pts.map((p) => p[1])));
    const passoY = ymax > 100 ? 25 : ymax > 40 ? 10 : 5, topo = Math.ceil(ymax / passoY) * passoY;
    const X = (n) => m.l + n / xmax * (W - m.l - m.r), Y = (v) => m.t + (1 - v / topo) * (H - m.t - m.b);
    const s = svg("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": `Custo de cada operação (leituras + escritas) para n de 0 a ${xmax}` });
    for (let v = 0; v <= topo; v += passoY) {
      s.append(svg("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: COR.linha }));
      s.append(svg("text", { x: m.l - 8, y: Y(v) + 4, "text-anchor": "end", "font-size": 12, fill: COR.cinza }, String(v)));
    }
    for (let n = 0; n <= xmax; n += 16) s.append(svg("text", { x: X(n), y: H - m.b + 18, "text-anchor": "middle", "font-size": 12, fill: COR.cinza }, String(n)));
    s.append(svg("text", { x: (m.l + W - m.r) / 2, y: H - 4, "text-anchor": "middle", "font-size": 12, fill: COR.cinza }, "n (valores já guardados)"));
    for (const se of series) {
      s.append(svg("polyline", { points: se.pts.map(([n, v]) => `${X(n)},${Y(v)}`).join(" "), fill: "none", stroke: se.cor,
        "stroke-width": 2, "stroke-dasharray": se.media ? "5 4" : "", "stroke-linejoin": "round" }));
    }
    if (direto) {   // rótulo no fim de cada linha, afastando os que se encostam
      const fins = series.map((se) => ({ se, y: Y(se.pts.at(-1)[1]) })).sort((a, b) => a.y - b.y);
      for (let k = 1; k < fins.length; k++) fins[k].y = Math.max(fins[k].y, fins[k - 1].y + 15);
      const sobra = fins.length ? fins.at(-1).y - (H - m.b) : 0;     // passou do eixo: sobe de baixo para cima
      if (sobra > 0) {
        fins.at(-1).y -= sobra;
        for (let k = fins.length - 2; k >= 0; k--) fins[k].y = Math.min(fins[k].y, fins[k + 1].y - 15);
      }
      for (const f of fins) {
        const [n, v] = f.se.pts.at(-1);
        s.append(svg("text", { x: X(n) + 8, y: f.y + 4, "font-size": 12, fill: f.se.cor, "font-weight": 600 }, `${f.se.rotulo}: ${decimal(v)}`));
      }
    }
    caixa.append(s);
    if (!direto) caixa.append(el("p", { class: "legenda-linhas" }, series.map((se) =>
      el("span", {}, [el("i", { style: `border-top: 2px ${se.media ? "dashed" : "solid"} ${se.cor}` }), `${se.rotulo}: ${decimal(se.pts.at(-1)[1])}`]))));
  }

  function graficoCasas(caixa, inst) {
    const cap = Object.values(inst.medido.capacidade)[0];
    caixa.replaceChildren();
    const W = Math.max(300, caixa.clientWidth), H = 220, m = { l: 48, r: W >= 600 ? 170 : 16, t: 14, b: 40 };
    const xmax = cap.at(-1).n, ymax = Math.max(...cap.map((c) => c.casas)), topo = Math.ceil(ymax / 16) * 16;
    const X = (n) => m.l + n / xmax * (W - m.l - m.r), Y = (v) => m.t + (1 - v / topo) * (H - m.t - m.b);
    const s = svg("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": "Casas reservadas para cada n" });
    for (let v = 0; v <= topo; v += 16) {
      s.append(svg("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: COR.linha }));
      s.append(svg("text", { x: m.l - 8, y: Y(v) + 4, "text-anchor": "end", "font-size": 12, fill: COR.cinza }, String(v)));
    }
    for (let n = 0; n <= xmax; n += 16) s.append(svg("text", { x: X(n), y: H - m.b + 18, "text-anchor": "middle", "font-size": 12, fill: COR.cinza }, String(n)));
    s.append(svg("text", { x: (m.l + W - m.r) / 2, y: H - 4, "text-anchor": "middle", "font-size": 12, fill: COR.cinza }, "n (valores guardados)"));
    const degraus = cap.flatMap((c, k) => (k ? [[c.n, cap[k - 1].casas], [c.n, c.casas]] : [[c.n, c.casas]]));
    s.append(svg("polyline", { points: degraus.map(([n, v]) => `${X(n)},${Y(v)}`).join(" "), fill: "none", stroke: COR.tinta, "stroke-width": 2 }));
    s.append(svg("line", { x1: X(0), y1: Y(0), x2: X(xmax), y2: Y(xmax), stroke: COR.cinza, "stroke-width": 1.5, "stroke-dasharray": "4 4" }));
    if (m.r > 100) {
      s.append(svg("text", { x: X(xmax) + 8, y: Y(cap.at(-1).casas) + 4, "font-size": 12, fill: COR.tinta, "font-weight": 600 }, "casas reservadas"));
      s.append(svg("text", { x: X(xmax) + 8, y: Y(xmax) + 18, "font-size": 12, fill: COR.cinza }, "n (uma por valor)"));
    }
    caixa.append(s);
  }

  // ---------- a página ----------

  function tabela(inst) {
    const ops = inst.medido.operacoes, ns = inst.medido.tamanhos, vars = inst.variantes;
    const corpo = inst.operacoes.map((o) => {
      const d = ops[o.id];
      const celulas = d.tabela.map((t) => {
        if (d.seguidas === "media") return el("td", { class: "num", text: decimal(total(t)) });
        if (d.seguidas === "pior") return el("td", { class: "num", html: `${mil(total(t))}<small>na ${mil(t.k)}ª</small>` });
        return el("td", { class: "num", text: mil(total(t)) });
      });
      return el("tr", {}, [
        el("td", {}, [el("b", { text: o.nome }), vars ? el("span", { class: "variante-tag", text: vars[d.estrutura] }) : null,
          el("small", { text: o.porque })]),
        el("td", { class: "o", text: o.notacao }),
        ...celulas,
      ]);
    });
    return el("div", { class: "rola" }, el("table", { class: "operacoes" }, [
      el("thead", {}, el("tr", {}, [el("th", { text: "operação" }), el("th", { text: "ordem" }),
        ...ns.map((n) => el("th", { class: "num", text: `n = ${mil(n)}` }))])),
      el("tbody", {}, corpo),
    ]));
  }

  /** Monta a página; devolve { el, redesenhar, parar }. ctx: { faixas, rotaFaixa, tocar, feat } */
  function pagina(inst, ctx) {
    const usam = ctx.faixas.filter((f) => (f.instrumentos || []).some((c) => c.id === inst.id));
    const papel = (f) => f.instrumentos.find((c) => c.id === inst.id).papel;
    const d = demo(inst, ctx);
    const fig1 = el("div"), fig2 = el("div");
    const ns = inst.medido.tamanhos;
    const tocaEm = usam.length
      ? usam.map((f) => `<a href="${ctx.rotaFaixa(f)}">${esc(f.nome)}</a>`).join(", ")
      : "nenhuma faixa ainda";
    const conteudo = el("div", { class: "pagina-instrumento" }, [
      el("a", { class: "voltar", href: "#instrumentos", text: "instrumentos" }),
      el("div", { class: "encarte-topo" }, [glifo(inst.id, "grande"), el("div", {}, [
        el("div", { class: "placa" }, [
          el("h1", { text: inst.nome }),
          el("p", { class: "variante", text: inst.variante }),
          el("dl", { html: `
            <dt>autoria</dt><dd>${esc(inst.placa ? inst.placa.autor : "—")}</dd>
            <dt>quando</dt><dd>${esc(inst.placa ? inst.placa.ano : "—")}</dd>
            <dt>técnica</dt><dd>Python, contando cada leitura e cada escrita de uma casa; a demo roda o mesmo em JavaScript</dd>
            <dt>memória</dt><dd><span class="o">${esc(inst.memoria.notacao)}</span></dd>
            <dt>toca em</dt><dd>${tocaEm}</dd>` }),
        ]),
        el("p", { class: "frase", text: inst.frase }),
        el("p", { class: "resumo", text: inst.resumo }),
      ])]),

      el("section", { class: "secao" }, [
        el("h2", { text: "Ao vivo" }),
        el("p", { text: tipoTexto(inst.id) }),
        d.el,
      ]),

      el("section", { class: "secao" }, [
        el("h2", { text: "Operações: quanto custa cada uma" }),
        el("p", { text: `Custo = leituras + escritas de casas, contadas rodando a estrutura em Python com n valores já guardados (n = ${ns.map(mil).join(", ")}). Índices, o tamanho e a capacidade, guardados à parte, não contam.` }),
        tabela(inst),
        el("figure", { class: "figura" }, [fig1, el("figcaption", { text:
          `O custo de cada operação com n valores já guardados, para n de 0 a ${nMax(inst)}, medido uma vez por n. Os picos são as vezes em que as casas acabam (n = ${cheios(inst).join(", ")}). Tracejada: a média de n operações seguidas a partir da estrutura vazia, o custo amortizado.` })]),
      ]),

      el("section", { class: "secao" }, [
        el("h2", { text: "Memória" }),
        el("p", { class: "ordem-grande", text: inst.memoria.notacao }),
        el("p", { text: inst.memoria.porque }),
        el("figure", { class: "figura" }, [fig2, el("figcaption", { text:
          `Casas reservadas depois de pôr n valores, a partir da estrutura vazia.${mesmaCapacidade(inst) ? " As duas filas reservam igual." : ""} Tracejada: uma casa por valor.` })]),
      ]),

      el("section", { class: "secao" }, [
        el("h2", { text: "Toca em" }),
        usam.length
          ? el("ul", { class: "toca-em" }, usam.map((f) => {
            const b = el("button", { type: "button", class: "icone", "aria-label": `Tocar ${f.nome}`, text: "▶" });
            b.addEventListener("click", () => ctx.tocar(f));
            return el("li", {}, [b, el("a", { href: ctx.rotaFaixa(f), text: f.nome }), ctx.feat(f), el("small", { text: papel(f) })]);
          }))
          : el("p", { text: "Nenhuma faixa credita este instrumento ainda." }),
      ]),
    ]);
    const redesenhar = () => { graficoCusto(fig1, inst); graficoCasas(fig2, inst); d.redesenhar(); };
    return { el: conteudo, redesenhar, parar: d.parar };
  }

  // os n em que a estrutura montada está cheia: o próximo valor faz realocar
  const cheios = (inst) => Object.values(inst.medido.capacidade)[0].filter((c) => c.n > 0 && c.casas === c.n).map((c) => c.n);
  const mesmaCapacidade = (inst) => { const v = Object.values(inst.medido.capacidade); return v.length > 1 && v.every((c) => JSON.stringify(c) === JSON.stringify(v[0])); };
  const nMax = (inst) => Math.max(...Object.values(inst.medido.operacoes).flatMap((o) => o.serie.map((t) => t.n)));

  function tipoTexto(id) {
    return {
      vetor: "Escolha um valor e uma posição e toque o vetor. Cada clique roda a operação no vetor de verdade e mostra casa por casa o que ela leu e escreveu. Repare no anexar quando as casas acabam.",
      pilha: "Empilhe e desempilhe: só o topo se mexe. O repasse toca a pilha de chamadas de uma faixa recursiva: cada chamada empilha um nível, cada retorno desempilha.",
      fila: "Cada clique roda a mesma operação nas duas filas, lado a lado. Compare o desenfileirar: a ingênua puxa todos para a frente, a circular só anda o início.",
    }[id];
  }

  /** A lista dos instrumentos (#instrumentos). */
  function indice(insts, ctx) {
    return el("div", {}, [
      el("header", { class: "cabeca" }, [el("div", {}, [
        el("span", { class: "rotulo", text: "instrumentos" }),
        el("h1", { text: "Instrumentos" }),
        el("p", { text: "As estruturas de dados que as faixas tocam. Cada uma com a demo ao vivo e o custo medido de cada operação." }),
      ])]),
      el("div", { class: "estante" }, insts.map((i) => cartao(i, ctx))),
    ]);
  }

  function cartao(i, ctx) {
    const n = ctx.faixas.filter((f) => (f.instrumentos || []).some((c) => c.id === i.id)).length;
    return el("a", { class: "disco", href: `#instrumentos/${i.id}` }, [
      glifo(i.id), el("b", { text: i.nome }), el("small", { text: `${i.frase} Toca em ${n} ${n === 1 ? "faixa" : "faixas"}.` }),
    ]);
  }

  window.PaginaInstrumento = { pagina, indice, cartao, glifo };
})();
