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
    } else if (id === "grafo") {
      const P = [[10, 12], [38, 10], [24, 26], [8, 38], [40, 38]];
      [[0, 1], [0, 2], [1, 2], [2, 3], [2, 4], [3, 4]].forEach(([a, b]) => s.append(svg("line", { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], stroke: COR.tinta, "stroke-width": 1.5 })));
      P.forEach(([x, y]) => s.append(svg("circle", { cx: x, cy: y, r: 4, fill: COR.tinta })));
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
        // a largura acompanha as casas reservadas: o desenho enche o palco e "afasta" quando realoca
        const largura = Math.max(4, ...qs.map((q) => Math.max(q.casas.length, q.novas ? q.novas.length : 0)));
        const W = 24 + Math.min(col, largura) * 42 + 40;
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
          el("span", { text: "repassar a de uma faixa recursiva:" }),
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

    // o visual ocupa o palco; as ferramentas ficam num painel ao lado (embaixo, no estreito)
    const legenda = el("p", { class: "demo-legenda", html:
      `<i style="background:${COR.le}"></i>casa lida <i style="background:${COR.escreve}"></i>casa escrita <i class="livre"></i>casa reservada, livre` });
    const bloco = (titulo, filhos, extra = "") => el("section", { class: `painel-bloco ${extra}` }, [el("h3", { text: titulo }), ...filhos]);
    const painel = el("aside", { class: "demo-painel", "aria-label": "Ferramentas" }, [
      bloco("entrada", [el("div", { class: "demo-campos" }, [rotX, entX, ...(tipo === "vetor" ? [rotI, entI] : [])])]),
      bloco("operações", [el("div", { class: "demo-botoes" }, ops), recomeca]),
      ...extras.map((x) => bloco("pilha de chamadas", [x])),
      bloco("custou", [custou, aviso]),
      bloco("últimas operações", [lista], "historico"),
    ]);
    const raiz = el("div", { class: "demo" }, [el("div", { class: "demo-tela" }, [figura, legenda, el("p", { class: "demo-dica", text: tipoTexto(tipo) })]), painel]);
    recomecar();
    return { el: raiz, redesenhar: desenhar, parar() { anim.parar(); if (repasse) { clearTimeout(repasse.timer); repasse = null; } } };
  }

  // ---------- a demo do grafo: as três vistas juntas ----------

  const VISTAS = ["matriz", "lista", "incidencia"];
  const VD = 6;                          // vértices na demo
  const letra = (j) => String.fromCharCode(97 + j);   // a coluna j da incidência, e a aresta dela no desenho

  function demoGrafo(inst) {
    const nomeVar = inst.variantes;
    let gs = [], qs = [], log = [], sel = null;   // sel: o que a última operação perguntou ({u, v})
    const anim = animador();
    const desenho = el("figure", { class: "demo-vista" });
    const vistas = VISTAS.map(() => el("figure", { class: "demo-vista" }));
    const custou = el("p", { class: "demo-custou", "aria-live": "polite" });
    const lista = el("ol", { class: "demo-log" });
    const aviso = el("p", { class: "demo-aviso" });
    const escolhe = (rotulo, id, valor) => {
      const s = el("select", { id }, Array.from({ length: VD }, (_, i) => el("option", { value: String(i), text: String(i) })));
      s.value = String(valor);
      s.addEventListener("change", () => { sel = null; habilitar(); desenhar(); });
      return [el("label", { for: id, text: rotulo }), s];
    };
    const [rotU, entU] = escolhe("u", "grafo-u", 0), [rotV, entV] = escolhe("v", "grafo-v", 3);
    const uv = () => [Number(entU.value), Number(entV.value)];
    // a aresta existe? (lido direto da matriz, sem contar: é o que o botão precisa saber)
    const liga = (u, v) => gs[0].casas[u * VD + v] === 1;

    function recomecar() {
      anim.parar();
      gs = VISTAS.map((v) => I.ESTRUTURAS[v](undefined, VD));
      // um anel e mais duas cordas sorteadas
      const arestas = Array.from({ length: VD }, (_, i) => [Math.min(i, (i + 1) % VD), Math.max(i, (i + 1) % VD)]);
      while (arestas.length < VD + 2) {
        const u = Math.floor(Math.random() * VD), v = Math.floor(Math.random() * VD);
        if (u !== v && !arestas.some(([a, b]) => a === Math.min(u, v) && b === Math.max(u, v))) arestas.push([Math.min(u, v), Math.max(u, v)]);
      }
      for (const [u, v] of arestas) gs.forEach((g) => g.por(u, v));
      qs = gs.map(quadroGrafo);
      log = []; sel = null;
      custou.textContent = `Um grafo com ${VD} vértices e ${arestas.length} arestas para começar; escolha u e v e clique numa operação.`;
      aviso.textContent = "";
      desenhar(); listar(); habilitar();
    }

    // o que cada vista mostra: as casas e a cor do papel de cada uma (lida, escrita)
    function quadroGrafo(g, j) {
      const v = VISTAS[j];
      if (v === "matriz") return { casas: g.casas.slice(), cores: {} };
      if (v === "lista") return { listas: g.listas.map((l) => l.casas()), cores: {} };
      return { colunas: g.colunas.map((c) => c.slice()), cores: {} };
    }

    function aplicarGrafo(j, ev) {
      const q = qs[j], v = VISTAS[j];
      q.cores = {};
      if (v === "matriz") {
        const c = `${ev.u},${ev.v}`;
        if (ev.t === "le") q.cores[c] = "le";
        else { q.casas[ev.u * VD + ev.v] = ev.x; q.cores[c] = "escreve"; }
      } else if (v === "lista") {
        const l = q.listas[ev.lista];
        if (ev.t === "le") q.cores[`${ev.lista},${ev.i}`] = "le";
        else if (ev.t === "escreve") { l[ev.i] = ev.x; q.cores[`${ev.lista},${ev.i}`] = "escreve"; }
        else if (ev.t === "realoca") q.listas[ev.lista] = l.concat(new Array(ev.para - l.length).fill(null));   // as casas novas, já do tamanho dobrado
        else if (ev.t === "copia") q.cores[`${ev.lista},${ev.k}`] = "escreve";
        else if (ev.t === "libera") l[ev.i] = null;
      } else {
        if (ev.t === "coluna") q.colunas.push(new Array(VD).fill(null));
        else if (ev.t === "tira") q.colunas.pop();
        else if (ev.t === "le") q.cores[`${ev.w},${ev.j}`] = "le";
        else { q.colunas[ev.j][ev.w] = ev.x; q.cores[`${ev.w},${ev.j}`] = "escreve"; }
      }
    }

    function nomeOp(chamada, [u, v]) {
      return { existe: `a aresta ${u}–${v} existe?`, vizinhos: `os vizinhos de ${u}`, grau: `o grau de ${u}`,
        por: `pôr a aresta ${u}–${v}`, tirar: `tirar a aresta ${u}–${v}` }[chamada];
    }

    function fazer(chamada, args) {
      anim.terminar();
      qs = gs.map(quadroGrafo);
      sel = { u: args[0], v: chamada === "vizinhos" || chamada === "grau" ? null : args[1] };
      const rs = gs.map((g) => I.operar(g, chamada, args));
      habilitar();
      const nome = nomeOp(chamada, args);
      const fim = () => {
        qs = gs.map(quadroGrafo);
        desenhar(); habilitar();
        const volta = rs[0].volta;
        const devolveu = chamada === "existe" ? (volta ? " → sim" : " → não")
          : chamada === "vizinhos" ? ` → ${volta.length ? volta.slice().sort((a, b) => a - b).join(", ") : "nenhum"}`
          : chamada === "grau" ? ` → ${volta}` : "";
        custou.replaceChildren(el("b", { text: `${nome}${devolveu}` }), el("span", { text: " custou:" }),
          ...rs.map((r, j) => el("span", { class: "custo-vista", text: `${nomeVar[VISTAS[j]]}: ${textoCusto(r)}` })));
        const realocou = rs[1].eventos.filter((e) => e.t === "realoca");
        aviso.textContent = realocou.map((e) => `A lista do vértice ${e.lista} encheu: reservou ${e.para} casas e copiou os vizinhos, um por um.`).join(" ");
        log.unshift({ nome: nome + devolveu, custos: rs.map((r) => r.leituras + r.escritas) });
        log = log.slice(0, 6);
        listar();
      };
      fim.quadro = desenhar;
      anim.tocar(rs.map((r) => r.eventos), aplicarGrafo, fim);
    }

    function listar() {
      lista.replaceChildren(...log.map((l) => el("li", {}, [el("span", { text: l.nome }),
        el("b", { text: l.custos.map((c) => mil(c)).join(" · ") })])));
    }

    // ---------- desenho ----------

    const fill = (papel, vazia) => (papel === "le" ? COR.le : papel === "escreve" ? COR.escreve : vazia ? COR.fundo : "#fff");
    // nas matrizes (binaria), o 0 fica apagado e o 1 em negrito; na lista, o valor é um vértice
    function celula(s, x, y, S, valor, papel, livre, binaria) {
      s.append(svg("rect", { x, y, width: S, height: S, rx: 2, fill: fill(papel, livre), stroke: papel ? fill(papel) : livre ? COR.palido : COR.linha,
        "stroke-width": 1, "stroke-dasharray": livre && !papel ? "3 3" : "" }));
      if (valor !== null) s.append(svg("text", { x: x + S / 2, y: y + S / 2 + 5, "text-anchor": "middle", "font-size": 13, "font-weight": binaria && valor === 0 ? 400 : 600,
        fill: papel ? "#fff" : binaria && valor === 0 ? COR.palido : COR.tinta }, String(valor)));
    }

    function desenhar() {
      // o grafo: hexágono, arestas com a letra da coluna delas na incidência
      const W = 300, H = 230, cx = W / 2, cy = 118, R = 88;
      const P = (i) => [cx + R * Math.cos(-Math.PI / 2 + 2 * Math.PI * i / VD), cy + R * Math.sin(-Math.PI / 2 + 2 * Math.PI * i / VD)];
      const s = svg("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: "img",
        "aria-label": `Grafo com ${VD} vértices e as arestas ${gs[0].arestas().map(([a, b]) => `${a}–${b}`).join(", ")}` });
      const inc = gs[2].colunas;
      inc.forEach((c, j) => {
        const [a, b] = c.flatMap((x, w) => (x ? [w] : []));
        const [x0, y0] = P(a), [x1, y1] = P(b);
        const pedida = sel && sel.v !== null && ((sel.u === a && sel.v === b) || (sel.u === b && sel.v === a));
        s.append(svg("line", { x1: x0, y1: y0, x2: x1, y2: y1, stroke: pedida ? COR.escreve : COR.tinta, "stroke-width": pedida ? 3 : 1.5 }));
        const mx = (x0 + x1) / 2 + (y1 - y0) * 0.08, my = (y0 + y1) / 2 - (x1 - x0) * 0.08;
        s.append(svg("text", { x: mx, y: my + 4, "text-anchor": "middle", "font-size": 11, fill: COR.cinza, stroke: "#fff", "stroke-width": 3, "paint-order": "stroke" }, letra(j)));
      });
      const [su, sv] = uv();
      if (sel && sel.v !== null && !liga(sel.u, sel.v)) {   // a aresta pedida e que não existe: tracejada
        const [x0, y0] = P(sel.u), [x1, y1] = P(sel.v);
        s.append(svg("line", { x1: x0, y1: y0, x2: x1, y2: y1, stroke: COR.escreve, "stroke-width": 2, "stroke-dasharray": "4 4" }));
      }
      for (let i = 0; i < VD; i++) {
        const [x, y] = P(i), marcado = i === su || (i === sv && su !== sv);
        s.append(svg("circle", { cx: x, cy: y, r: 15, fill: "#fff", stroke: marcado ? COR.escreve : COR.tinta, "stroke-width": marcado ? 2.5 : 1.5 }));
        s.append(svg("text", { x, y: y + 5, "text-anchor": "middle", "font-size": 14, "font-weight": 600, fill: COR.tinta }, String(i)));
        if (marcado) s.append(svg("text", { x: x + (x >= cx ? 20 : -20), y: y - 12, "text-anchor": x >= cx ? "start" : "end", "font-size": 11, "font-weight": 600, fill: COR.escreve }, i === su ? "u" : "v"));
      }
      desenho.replaceChildren(el("figcaption", { text: `o grafo: ${VD} vértices, ${gs[0].E} arestas` }), s);
      VISTAS.forEach((v, j) => vistas[j].replaceChildren(el("figcaption", { text: nomeVar[v] }), [vistaMatriz, vistaLista, vistaIncidencia][j](qs[j], gs[j])));
    }

    const S = 24, P0 = 22;                 // tamanho da casa e margem dos rótulos
    function vistaMatriz(q) {
      const W = P0 + VD * S + 2, H = P0 + VD * S + 30;
      const s = svg("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: "img", "aria-label": "Matriz de adjacência, linha a linha" });
      for (let i = 0; i < VD; i++) {
        s.append(svg("text", { x: P0 + i * S + S / 2, y: 14, "text-anchor": "middle", "font-size": 11, fill: COR.cinza }, String(i)));
        s.append(svg("text", { x: P0 - 7, y: P0 + i * S + S / 2 + 4, "text-anchor": "end", "font-size": 11, fill: COR.cinza }, String(i)));
      }
      for (let u = 0; u < VD; u++) for (let v = 0; v < VD; v++) celula(s, P0 + v * S, P0 + u * S, S, q.casas[u * VD + v], q.cores[`${u},${v}`], false, true);
      s.append(svg("text", { x: 0, y: H - 6, "font-size": 11, fill: COR.cinza }, `${VD} × ${VD} = ${VD * VD} casas`));
      return s;
    }

    function vistaLista(q, g) {
      const larg = Math.max(...q.listas.map((l) => l.length), 1);
      const W = P0 + larg * S + 2, H = VD * (S + 4) + 30;
      const s = svg("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: "img", "aria-label": "Lista de adjacência: um vetor de vizinhos por vértice" });
      q.listas.forEach((l, u) => {
        const y = u * (S + 4);
        s.append(svg("text", { x: P0 - 7, y: y + S / 2 + 4, "text-anchor": "end", "font-size": 11, fill: COR.cinza }, String(u)));
        l.forEach((x, i) => celula(s, P0 + i * S, y, S, x, q.cores[`${u},${i}`], x === null));
      });
      s.append(svg("text", { x: 0, y: H - 6, "font-size": 11, fill: COR.cinza }, `${VD} + ${g.capacidade - VD} = ${g.capacidade} casas`));
      return s;
    }

    function vistaIncidencia(q) {
      const E = q.colunas.length, W = P0 + Math.max(1, E) * S + 2, H = P0 + VD * S + 30;
      const s = svg("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: "img", "aria-label": "Matriz de incidência: uma coluna por aresta" });
      q.colunas.forEach((c, j) => {
        s.append(svg("text", { x: P0 + j * S + S / 2, y: 14, "text-anchor": "middle", "font-size": 11, fill: COR.cinza }, letra(j)));
        c.forEach((x, w) => celula(s, P0 + j * S, P0 + w * S, S, x, q.cores[`${w},${j}`], x === null, true));
      });
      for (let w = 0; w < VD; w++) s.append(svg("text", { x: P0 - 7, y: P0 + w * S + S / 2 + 4, "text-anchor": "end", "font-size": 11, fill: COR.cinza }, String(w)));
      s.append(svg("text", { x: 0, y: H - 6, "font-size": 11, fill: COR.cinza }, `${VD} × ${E} = ${VD * E} casas`));
      return s;
    }

    // ---------- controles ----------

    const botoes = [];
    const botao = (rot, chamada, cond) => {
      const b = el("button", { type: "button", class: "botao-passo", text: rot });
      b.addEventListener("click", () => { if (cond()) fazer(chamada, chamada === "vizinhos" || chamada === "grau" ? [uv()[0]] : uv()); });
      botoes.push({ b, cond });
      return b;
    };
    const diferentes = () => uv()[0] !== uv()[1];
    const ops = [
      botao("existe u–v?", "existe", diferentes),
      botao("vizinhos de u", "vizinhos", () => true),
      botao("grau de u", "grau", () => true),
      botao("pôr u–v", "por", () => diferentes() && !liga(...uv())),
      botao("tirar u–v", "tirar", () => diferentes() && liga(...uv())),
    ];
    function habilitar() { for (const { b, cond } of botoes) b.disabled = !cond(); }
    const recomeca = el("button", { type: "button", class: "botao-passo", text: "recomeçar" });
    recomeca.addEventListener("click", () => recomecar());

    // o palco: o grafo e as três vistas lado a lado; o painel: u e v, as operações, o custo e o histórico
    const legenda = el("p", { class: "demo-legenda", html:
      `<i style="background:${COR.le}"></i>casa lida <i style="background:${COR.escreve}"></i>casa escrita <i class="livre"></i>casa reservada, livre` });
    const bloco = (titulo, filhos, extra = "") => el("section", { class: `painel-bloco ${extra}` }, [el("h3", { text: titulo }), ...filhos]);
    const painel = el("aside", { class: "demo-painel", "aria-label": "Ferramentas" }, [
      bloco("entrada", [el("div", { class: "demo-campos" }, [rotU, entU, rotV, entV])]),
      bloco("operações", [el("div", { class: "demo-botoes" }, ops), recomeca]),
      bloco("custou", [custou, aviso]),
      bloco("últimas operações", [el("p", { class: "demo-aviso", text: "custo na matriz · na lista · na incidência" }), lista], "historico"),
    ]);
    const tela = el("div", { class: "demo-tela" }, [el("div", { class: "demo-figura demo-grafo" }, el("div", { class: "demo-vistas" }, [desenho, ...vistas])),
      legenda, el("p", { class: "demo-dica", text: tipoTexto("grafo") })]);
    const raiz = el("div", { class: "demo" }, [tela, painel]);
    recomecar();
    return { el: raiz, redesenhar: desenhar, parar() { anim.parar(); } };
  }

  // ---------- gráficos: custo × n e casas × n ----------

  // o menor n medido nas séries (o Grafo começa em V = 8, onde o anel de medição já é ele mesmo)
  const nMin = (inst) => Math.min(...Object.values(inst.medido.operacoes).flatMap((o) => o.serie.map((t) => t.n)));
  // texto da ficha com os números do dados.json: {ns} os n da tabela, {v0}–{v1} as séries,
  // e o que o próprio grafo de medição diz de si ({seguintes}, {grau}, {razao})
  const textoInst = (inst, t) => t.replace(/\{(\w+)\}/g, (_, c) => ({ ns: inst.medido.tamanhos.map(mil).join(", "), v0: nMin(inst), v1: nMax(inst),
    ...(inst.medido.anel || {}) })[c] ?? `{${c}}`);

  function graficoCusto(caixa, inst) {
    const ops = inst.medido.operacoes;
    const series = inst.grafico.map((g, k) => ({ ...g, cor: SERIES[k % SERIES.length], media: ops[g.id].seguidas === "media",
      pts: ops[g.id].serie.map((t) => [t.n, total(t)]) }));
    caixa.replaceChildren();
    const W = Math.max(300, caixa.clientWidth), H = 300, direto = W >= 600;
    const m = { l: 48, r: direto ? 170 : 16, t: 14, b: 40 };
    const xmax = Math.max(...series.flatMap((s) => s.pts.map((p) => p[0])));
    const ymax = Math.max(...series.flatMap((s) => s.pts.map((p) => p[1])));
    const passoY = ymax > 200 ? 50 : ymax > 100 ? 25 : ymax > 40 ? 10 : 5, topo = Math.ceil(ymax / passoY) * passoY;
    const X = (n) => m.l + n / xmax * (W - m.l - m.r), Y = (v) => m.t + (1 - v / topo) * (H - m.t - m.b);
    const s = svg("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": `Custo de cada operação (leituras + escritas) para ${inst.n || "n"} de ${nMin(inst)} a ${xmax}` });
    for (let v = 0; v <= topo; v += passoY) {
      s.append(svg("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: COR.linha }));
      s.append(svg("text", { x: m.l - 8, y: Y(v) + 4, "text-anchor": "end", "font-size": 12, fill: COR.cinza }, String(v)));
    }
    for (let n = 0; n <= xmax; n += 16) s.append(svg("text", { x: X(n), y: H - m.b + 18, "text-anchor": "middle", "font-size": 12, fill: COR.cinza }, String(n)));
    s.append(svg("text", { x: (m.l + W - m.r) / 2, y: H - 4, "text-anchor": "middle", "font-size": 12, fill: COR.cinza }, inst.eixo ? textoInst(inst, inst.eixo) : "n (valores já guardados)"));
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
    if (!mesmaCapacidade(inst) && Object.keys(inst.medido.capacidade).length > 1) return graficoCasasVistas(caixa, inst);
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

  // as vistas que guardam diferente (o Grafo): uma linha por vista, sem a referência de uma casa por valor
  function graficoCasasVistas(caixa, inst) {
    const v0 = nMin(inst), caps = Object.entries(inst.medido.capacidade).map(([v, c]) => [v, c.filter((t) => t.n >= v0)]);
    caixa.replaceChildren();
    const W = Math.max(300, caixa.clientWidth), H = 240, direto = W >= 600, m = { l: 58, r: direto ? 190 : 16, t: 14, b: 40 };
    const xmax = Math.max(...caps.flatMap(([, c]) => c.map((t) => t.n))), ymax = Math.max(...caps.flatMap(([, c]) => c.map((t) => t.casas)));
    const ordem = 10 ** Math.floor(Math.log10(ymax / 4)), passo = [1, 2, 5, 10].map((f) => f * ordem).find((p) => ymax / p <= 6);
    const topo = Math.ceil(ymax / passo) * passo;
    const X = (n) => m.l + n / xmax * (W - m.l - m.r), Y = (v) => m.t + (1 - v / topo) * (H - m.t - m.b);
    const s = svg("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": `Casas guardadas por cada vista, para ${inst.n || "n"} de ${v0} a ${xmax}` });
    for (let v = 0; v <= topo; v += passo) {
      s.append(svg("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: COR.linha }));
      s.append(svg("text", { x: m.l - 8, y: Y(v) + 4, "text-anchor": "end", "font-size": 12, fill: COR.cinza }, mil(v)));
    }
    for (let n = 0; n <= xmax; n += 10) s.append(svg("text", { x: X(n), y: H - m.b + 18, "text-anchor": "middle", "font-size": 12, fill: COR.cinza }, String(n)));
    s.append(svg("text", { x: (m.l + W - m.r) / 2, y: H - 4, "text-anchor": "middle", "font-size": 12, fill: COR.cinza }, inst.eixo ? textoInst(inst, inst.eixo) : "n"));
    const series = caps.map(([v, c], k) => ({ rotulo: inst.variantes[v], cor: SERIES[k % SERIES.length], pts: c.map((t) => [t.n, t.casas]) }));
    for (const se of series) s.append(svg("polyline", { points: se.pts.map(([n, v]) => `${X(n)},${Y(v)}`).join(" "), fill: "none", stroke: se.cor, "stroke-width": 2, "stroke-linejoin": "round" }));
    if (direto) {
      const fins = series.map((se) => ({ se, y: Y(se.pts.at(-1)[1]) })).sort((a, b) => a.y - b.y);
      for (let k = 1; k < fins.length; k++) fins[k].y = Math.max(fins[k].y, fins[k - 1].y + 15);
      for (const f of fins) s.append(svg("text", { x: X(xmax) + 8, y: f.y + 4, "font-size": 12, fill: f.se.cor, "font-weight": 600 }, `${f.se.rotulo}: ${mil(f.se.pts.at(-1)[1])}`));
    }
    caixa.append(s);
    if (!direto) caixa.append(el("p", { class: "legenda-linhas" }, series.map((se) =>
      el("span", {}, [el("i", { style: `border-top: 2px solid ${se.cor}` }), `${se.rotulo}: ${mil(se.pts.at(-1)[1])}`]))));
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
        ...ns.map((n) => el("th", { class: "num", text: `${inst.n || "n"} = ${mil(n)}` }))])),
      el("tbody", {}, corpo),
    ]));
  }

  /** Monta a página; devolve { el, redesenhar, parar }. ctx: { faixas, rotaFaixa, tocar, feat } */
  function pagina(inst, ctx) {
    const usam = ctx.faixas.filter((f) => (f.instrumentos || []).some((c) => c.id === inst.id));
    const d = inst.id === "grafo" ? demoGrafo(inst) : demo(inst, ctx);
    const fig1 = el("div"), fig2 = el("div");
    const ns = inst.medido.tamanhos, nome = inst.n || "n";
    // legendas próprias da ficha (o Grafo), com os números do dados.json
    const leg = inst.legendas || {}, preencher = (t) => textoInst(inst, t);
    // os detalhes ficam recolhidos; os gráficos só se desenham abertos (fechados, não têm largura)
    const detalhe = (titulo, resumo, filhos) => {
      const dt = el("details", { class: "detalhe" }, [el("summary", {}, [el("b", { text: titulo }), el("span", { text: resumo })]), el("div", { class: "detalhe-corpo" }, filhos)]);
      dt.addEventListener("toggle", () => { if (dt.open) redesenhar(); });
      return dt;
    };
    const conteudo = el("div", { class: "pagina-instrumento" }, [
      el("header", { class: "inst-cabeca" }, [
        glifo(inst.id, "mini-48"),
        el("div", {}, [
          el("p", { class: "rotulo", html: '<a href="#instrumentos">instrumento</a>' }),
          el("h1", { text: inst.nome }),
          el("p", { class: "frase", text: inst.frase }),
        ]),
        el("dl", { class: "inst-fatos" }, [
          el("dt", { text: "memória" }), el("dd", { class: "o", text: inst.memoria.notacao }),
          el("dt", { text: "toca em" }), el("dd", { text: `${usam.length} ${usam.length === 1 ? "faixa" : "faixas"}` }),
        ]),
      ]),

      d.el,

      usam.length ? ctx.prateleira("Toca em", null, null, usam.map(ctx.cartao)) : null,

      el("div", { class: "detalhes" }, [
        detalhe("Quanto custa cada operação", `leituras + escritas, medidas em Python com ${nome} = ${ns.map(mil).join(", ")}`, [
          el("p", { text: leg.operacoes ? preencher(leg.operacoes) : `Custo = leituras + escritas de casas, contadas rodando a estrutura em Python com n valores já guardados. Índices, o tamanho e a capacidade, guardados à parte, não contam.` }),
          tabela(inst),
          el("figure", { class: "figura" }, [fig1, el("figcaption", { text: leg.custo ? preencher(leg.custo) :
            `O custo de cada operação com n valores já guardados, para n de 0 a ${nMax(inst)}, medido uma vez por n. Os picos são as vezes em que as casas acabam (n = ${cheios(inst).join(", ")}). Tracejada: a média de n operações seguidas a partir da estrutura vazia, o custo amortizado.` })]),
        ]),
        detalhe("Memória", inst.memoria.notacao, [
          el("p", { text: inst.memoria.porque }),
          el("figure", { class: "figura" }, [fig2, el("figcaption", { text: leg.casas ? preencher(leg.casas) :
            `Casas reservadas depois de pôr n valores, a partir da estrutura vazia.${mesmaCapacidade(inst) ? " As duas filas reservam igual." : ""} Tracejada: uma casa por valor.` })]),
        ]),
        detalhe("História e técnica", inst.variante, [
          el("div", { class: "placa" }, el("dl", { html: `
            <dt>autoria</dt><dd>${esc(inst.placa ? inst.placa.autor : "—")}</dd>
            <dt>quando</dt><dd>${esc(inst.placa ? inst.placa.ano : "—")}</dd>
            <dt>técnica</dt><dd>Python, contando cada leitura e cada escrita de uma casa; a demo roda o mesmo em JavaScript</dd>` })),
          el("p", { class: "resumo", text: inst.resumo }),
        ]),
      ]),
    ]);
    const redesenhar = () => {
      d.redesenhar();
      if (fig1.closest("details").open) graficoCusto(fig1, inst);
      if (fig2.closest("details").open) graficoCasas(fig2, inst);
    };
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
      grafo: "Escolha u e v e clique numa operação: ela roda nas três vistas ao mesmo tempo, sobre as mesmas arestas, e cada vista mostra as casas que leu e escreveu. A letra de cada aresta no desenho é a coluna dela na matriz de incidência. Compare os vizinhos de u: a lista lê só eles, a matriz de adjacência lê a linha inteira.",
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
    return el("div", { class: "cartao" }, [
      el("span", { class: "cartao-capa" }, glifo(i.id)),
      el("a", { class: "cartao-link", href: `#instrumentos/${i.id}`, text: i.nome }),
      el("small", { text: `${i.frase} Toca em ${n} ${n === 1 ? "faixa" : "faixas"}.` }),
    ]);
  }

  window.PaginaInstrumento = { pagina, indice, cartao, glifo };
})();
