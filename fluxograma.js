// Fluxograma desenhado a partir da árvore do pseudocódigo (gerar.py → dados.js).
// Layout estruturado: cada bloco mede a si mesmo (largura à esquerda e à
// direita do eixo, altura) e depois se desenha num eixo x e num topo y.
//   passo: retângulo · chamada a si mesmo: retângulo com barras (sub-rotina)
//   se/enquanto: losango por condição ("e" vira losangos encadeados)
//   para: hexágono (preparação de laço) · pare: retângulo que sai pelo trilho do laço
(function () {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";
  const CW = 7.25, LH = 15, G = 26, FS = 12;
  const TINTA = "#1e1e1e", CINZA = "#686c73", LINHA = "#8a8e95", VERDE = "#169646", FUNDO = "#f4f5f7";

  function svg(tag, attrs = {}, texto) {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    if (texto !== undefined) e.textContent = texto;
    return e;
  }

  // quebra em linhas de até `max` letras; "a ← b" e cada comando separado por ";"
  // ficam inteiros sempre que couberem
  function quebra(texto, max) {
    const linhas = [];
    for (const cmd of texto.split(/;\s*/)) linhas.push(...quebraUm(cmd.replace(/ ← /g, "\u00a0←\u00a0"), max));
    return linhas.map((l) => l.replace(/\u00a0/g, " "));
  }

  function quebraUm(texto, max) {
    const linhas = [];
    let atual = "";
    for (const p of texto.split(" ")) {
      if (atual && (atual + " " + p).length > max) { linhas.push(atual); atual = p; } else atual = atual ? atual + " " + p : p;
    }
    if (atual) linhas.push(atual);
    return linhas;
  }

  function textoMultilinha(g, linhas, cx, cy, attrs = {}) {
    const y0 = cy - (linhas.length - 1) * LH / 2 + 4;
    linhas.forEach((l, i) => g.append(svg("text", { x: cx, y: y0 + i * LH, "text-anchor": "middle", "font-size": FS, fill: TINTA, ...attrs }, l)));
  }

  function seta(g, pts, cor = LINHA) {
    g.append(svg("polyline", { points: pts.map((p) => p.join(",")).join(" "), fill: "none", stroke: cor, "stroke-width": 1.4 }));
    const [a, b] = [pts[pts.length - 2], pts[pts.length - 1]];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const p1 = [b[0] - 7 * Math.cos(ang - 0.45), b[1] - 7 * Math.sin(ang - 0.45)];
    const p2 = [b[0] - 7 * Math.cos(ang + 0.45), b[1] - 7 * Math.sin(ang + 0.45)];
    g.append(svg("polygon", { points: [b, p1, p2].map((p) => p.join(",")).join(" "), fill: cor }));
  }

  function linha(g, pts, cor = LINHA) {
    g.append(svg("polyline", { points: pts.map((p) => p.join(",")).join(" "), fill: "none", stroke: cor, "stroke-width": 1.4 }));
  }

  function rotulo(g, x, y, t, ancora = "start") {
    g.append(svg("text", { x, y, "font-size": 11, fill: CINZA, "text-anchor": ancora }, t));
  }

  // ---------- caixas ----------

  function caixa(texto, tipo) {
    const linhas = quebra(texto, 30);
    const w = Math.max(...linhas.map((l) => l.length)) * CW + (tipo === "chamada" ? 34 : 22);
    const h = linhas.length * LH + 14;
    return {
      L: w / 2, R: w / 2, h, termina: tipo === "pare",
      desenha(g, cx, y, ctx) {
        const x = cx - w / 2;
        if (tipo === "pill") g.append(svg("rect", { x, y, width: w, height: h, rx: h / 2, fill: FUNDO, stroke: TINTA, "stroke-width": 1.4 }));
        else g.append(svg("rect", { x, y, width: w, height: h, rx: 3, fill: "#fff", stroke: TINTA, "stroke-width": 1.4 }));
        if (tipo === "chamada") {
          linha(g, [[x + 7, y], [x + 7, y + h]], TINTA);
          linha(g, [[x + w - 7, y], [x + w - 7, y + h]], TINTA);
        }
        textoMultilinha(g, linhas, cx, y + h / 2, tipo === "pare" ? { "font-weight": 600 } : {});
        if (tipo === "pare") seta(g, [[cx + w / 2, y + h / 2], [ctx.trilho, y + h / 2]]);
      },
    };
  }

  // losango (se/enquanto) ou hexágono (para); devolve a forma com os vértices
  function decisao(texto, hexagono) {
    const linhas = quebra(texto, hexagono ? 24 : 16);
    const tw = Math.max(...linhas.map((l) => l.length)) * CW, th = linhas.length * LH;
    const w = hexagono ? tw + 40 : tw * 2 + 20, h = hexagono ? th + 16 : th * 2 + 18;
    return {
      L: w / 2, R: w / 2, h,
      desenha(g, cx, y) {
        const pts = hexagono
          ? [[cx - w / 2, y + h / 2], [cx - w / 2 + 12, y], [cx + w / 2 - 12, y], [cx + w / 2, y + h / 2], [cx + w / 2 - 12, y + h], [cx - w / 2 + 12, y + h]]
          : [[cx, y], [cx + w / 2, y + h / 2], [cx, y + h], [cx - w / 2, y + h / 2]];
        g.append(svg("polygon", { points: pts.map((p) => p.join(",")).join(" "), fill: "#eef7f1", stroke: VERDE, "stroke-width": 1.6 }));
        textoMultilinha(g, linhas, cx, y + h / 2);
      },
    };
  }

  // cadeia de condições: "sim" desce de uma para a próxima; "não" sai pela direita
  function cadeia(item) {
    const formas = item.conds.map((c) => decisao(item.rotulo === "para" ? c : `${c}?`, item.rotulo === "para"));   // o "para" já vem no texto
    const L = Math.max(...formas.map((f) => f.L)), R = Math.max(...formas.map((f) => f.R));
    const h = formas.reduce((t, f) => t + f.h, 0) + G * (formas.length - 1);
    return {
      L, R, h,
      desenha(g, cx, y) {
        const saidas = [];
        let yy = y;
        formas.forEach((f, k) => {
          f.desenha(g, cx, yy);
          saidas.push([cx + f.R, yy + f.h / 2]);
          if (k < formas.length - 1) {
            seta(g, [[cx, yy + f.h], [cx, yy + f.h + G]]);
            rotulo(g, cx + 6, yy + f.h + 14, item.rotulo === "para" ? "" : "sim");
          }
          yy += f.h + G;
        });
        return { saidas, base: y + h, esquerda: [cx - formas.at(-1).L, y + h - formas.at(-1).h / 2] };
      },
      sim: item.rotulo === "para" ? "cada" : "sim", nao: item.rotulo === "para" ? "acabou" : "não",
    };
  }

  // ---------- blocos ----------

  function sequencia(itens) {
    const partes = itens.map(bloco);
    if (!partes.length) return { L: 0, R: 0, h: 0, vazio: true, desenha() {} };
    const L = Math.max(...partes.map((p) => p.L)), R = Math.max(...partes.map((p) => p.R));
    const h = partes.reduce((t, p) => t + p.h, 0) + G * (partes.length - 1);
    return {
      L, R, h, termina: partes.at(-1).termina,
      desenha(g, cx, y, ctx) {
        let yy = y;
        partes.forEach((p, i) => {
          p.desenha(g, cx, yy, ctx);
          yy += p.h;
          if (i < partes.length - 1) {
            if (!p.termina) seta(g, [[cx, yy], [cx, yy + G]]);
            yy += G;
          }
        });
      },
    };
  }

  function se(item) {
    const c = cadeia(item);
    const T = sequencia(item.entao);
    const E = item.senao ? sequencia(item.senao) : null;
    if (!E) {
      const trilho = Math.max(c.R, T.R) + 36;   // folga para o rótulo "não"
      const h = c.h + G + T.h + 16;
      return {
        L: Math.max(c.L, T.L), R: trilho + 6, h, termina: false,
        desenha(g, cx, y, ctx) {
          const { saidas, base } = c.desenha(g, cx, y);
          seta(g, [[cx, base], [cx, base + G]]);
          rotulo(g, cx + 6, base + 14, c.sim);
          T.desenha(g, cx, base + G, ctx);
          const fim = y + h;
          if (!T.termina) linha(g, [[cx, base + G + T.h], [cx, fim]]);
          saidas.forEach(([x, yy]) => {
            linha(g, [[x, yy], [cx + trilho, yy], [cx + trilho, fim], [cx, fim]]);
            rotulo(g, x + 6, yy - 5, c.nao);
          });
        },
      };
    }
    const forma = c;
    const tx = -Math.max(T.R + 16, forma.L), ex = Math.max(E.L + 16, forma.R);
    const h = c.h + G + Math.max(T.h, E.h) + 16;
    return {
      L: -tx + T.L, R: ex + E.R, h, termina: T.termina && E.termina,
      desenha(g, cx, y, ctx) {
        const { saidas, base, esquerda } = c.desenha(g, cx, y);
        const topo = base + G, fim = y + h;
        seta(g, [esquerda, [cx + tx, esquerda[1]], [cx + tx, topo]]);
        rotulo(g, esquerda[0] - 6, esquerda[1] - 5, c.sim, "end");
        saidas.forEach(([x, yy]) => {
          seta(g, [[x, yy], [cx + ex, yy], [cx + ex, topo]]);
          rotulo(g, x + 6, yy - 5, c.nao);
        });
        T.desenha(g, cx + tx, topo, ctx);
        E.desenha(g, cx + ex, topo, ctx);
        if (!T.termina) linha(g, [[cx + tx, topo + T.h], [cx + tx, fim], [cx, fim]]);
        if (!E.termina) linha(g, [[cx + ex, topo + E.h], [cx + ex, fim], [cx, fim]]);
      },
    };
  }

  function laco(item) {
    const c = cadeia(item);
    const B = sequencia(item.corpo);
    const J = 14;
    const esq = Math.max(c.L, B.L) + 24, dir = Math.max(c.R, B.R) + 40;   // folga para "acabou"
    const h = J + c.h + G + B.h + 14 + 16;
    return {
      L: esq + 4, R: dir + 8, h, termina: false,
      desenha(g, cx, y, ctx) {
        linha(g, [[cx, y], [cx, y + J]]);
        const { saidas, base } = c.desenha(g, cx, y + J);
        seta(g, [[cx, base], [cx, base + G]]);
        rotulo(g, cx + 6, base + 14, c.sim);
        const fimCorpo = base + G + B.h;
        B.desenha(g, cx, base + G, { ...ctx, trilho: cx + dir });
        if (!B.termina) seta(g, [[cx, fimCorpo], [cx, fimCorpo + 14], [cx - esq, fimCorpo + 14], [cx - esq, y + J / 2], [cx, y + J / 2]]);
        const fim = y + h;
        saidas.forEach(([x, yy]) => {
          linha(g, [[x, yy], [cx + dir, yy], [cx + dir, fim], [cx, fim]]);
          rotulo(g, x + 6, yy - 5, c.nao);
        });
      },
    };
  }

  function bloco(item) {
    if (item.tipo === "se") return se(item);
    if (item.tipo === "laco") return laco(item);
    if (item.tipo === "pare") return caixa("pare", "pare");
    if (item.tipo === "acao") return caixa(item.texto, item.chamada ? "chamada" : "passo");
    return caixa(item.texto, "passo");   // devolva
  }

  // ---------- desenho completo ----------

  window.Fluxograma = function (pseudo) {
    const ini = caixa(`início: ${pseudo.assinatura}`, "pill");
    const corpo = sequencia(pseudo.arvore);
    const fim = caixa("fim", "pill");
    const L = Math.max(ini.L, corpo.L, fim.L), R = Math.max(ini.R, corpo.R, fim.R);
    const M = 12, W = Math.ceil(L + R + 2 * M), H = Math.ceil(ini.h + G + corpo.h + G + fim.h + 2 * M);
    const s = svg("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: "img",
      "aria-label": `Fluxograma de ${pseudo.nome}, gerado do pseudocódigo` });
    const g = svg("g");
    s.append(g);
    const cx = M + L;
    let y = M;
    ini.desenha(g, cx, y, {});
    y += ini.h;
    seta(g, [[cx, y], [cx, y + G]]);
    y += G;
    corpo.desenha(g, cx, y, {});
    y += corpo.h;
    if (!corpo.termina) seta(g, [[cx, y], [cx, y + G]]);
    y += G;
    fim.desenha(g, cx, y, {});
    return s;
  };
})();
