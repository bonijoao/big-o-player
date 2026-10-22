// O player: álbuns (famílias), faixas (algoritmos), vídeo grande que vira mini
// player arrastável, e o encarte de cada faixa. Os números vêm de dados.js.
(function () {
  "use strict";

  const { el, mil, esc } = window.Graficos;
  const G = window.GALERIA || [];
  const INSTS = window.INSTRUMENTOS || [];
  const ALBUNS = (window.ALBUNS || []).map((a) => ({ ...a, faixas: G.filter((f) => f.familia === a.familia) }));
  const $ = (s, raiz = document) => raiz.querySelector(s);
  const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const albumDe = (f) => ALBUNS.find((a) => a.familia === f.familia);
  const rotaFaixa = (f) => `#${albumDe(f).id}/${f.id}`;
  const relogio = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const nFaixas = (n) => `${n} ${n === 1 ? "faixa" : "faixas"}`;

  // ---------- feat.: os instrumentos que a faixa toca ----------

  const creditos = (f) => (f.instrumentos || []).map((c) => ({ ...c, inst: INSTS.find((i) => i.id === c.id) })).filter((c) => c.inst);
  const featTexto = (f) => { const cs = creditos(f); return cs.length ? `feat. ${cs.map((c) => c.inst.nome).join(", ")}` : ""; };

  function feat(f) {
    const cs = creditos(f);
    if (!cs.length) return null;
    return el("span", { class: "feat" }, [" feat. ", ...cs.flatMap((c, k) => [k ? ", " : "", el("a", { href: `#instrumentos/${c.id}`, text: c.inst.nome })])]);
  }

  // ---------- capas ----------

  function capaFaixa(f, extra = "") {
    return el("span", { class: `capa ${extra}` }, f ? el("img", { src: f.poster, alt: "", loading: "lazy" }) : null);
  }

  function capaAlbum(a, extra = "") {
    const fs = a.faixas.slice(0, 4);
    if (!fs.length) return el("span", { class: `capa vazia ${extra}` });
    const m = el("span", { class: `capa mosaico ${fs.length < 4 ? "um" : ""} ${extra}` });
    (fs.length < 4 ? fs.slice(0, 1) : fs).forEach((f) => m.append(el("img", { src: f.poster, alt: "", loading: "lazy" })));
    return m;
  }

  // ---------- barra lateral ----------

  function desenharLateral(atual, instAtual) {
    $("#instrumentos-nav").replaceChildren(...INSTS.map((i) => el("a", { class: "album-mini", href: `#instrumentos/${i.id}`, "aria-current": String(i.id === instAtual) }, [
      window.PaginaInstrumento.glifo(i.id, "mini-48"),
      el("span", {}, [el("b", { text: i.nome }), el("small", { text: i.frase })]),
    ])));
    $("#albuns").replaceChildren(...ALBUNS.map((a) => el("a", { class: "album-mini", href: `#${a.id}`, "aria-current": String(a.id === atual) }, [
      capaAlbum(a, "mini-48"),
      el("span", {}, [el("b", { text: a.titulo }),
        el("small", { text: a.faixas.length ? nFaixas(a.faixas.length) : `${a.em_producao.length} em produção` })]),
    ])));
    if (instAtual) document.querySelector('#biblioteca [data-mostra="instrumentos-nav"]').click();   // na página de um instrumento, a lista dele
  }

  // ---------- páginas ----------

  // ---------- cartões e prateleiras (a home e o "toca em" dos instrumentos) ----------

  // a fileira curada do topo da home: um caminho curto para quem chega
  const COMECE = ["busca-sequencial", "busca-binaria", "bubble-sort", "merge-sort", "k-means"];

  function cartaoFaixa(f) {
    const play = el("button", { type: "button", class: "cartao-play", "aria-label": `Tocar ${f.nome}`, text: "▶" });
    play.addEventListener("click", () => tocar(f));
    return el("div", { class: "cartao", "data-id": f.id }, [
      el("span", { class: "cartao-capa" }, [capaFaixa(f), play]),
      el("a", { class: "cartao-link", href: rotaFaixa(f), text: f.nome }),
      el("small", {}, [el("span", { class: "o", text: f.tempo.notacao }), featTexto(f) ? ` · ${featTexto(f)}` : ""]),
    ]);
  }

  function cartaoProducao(p) {
    return el("div", { class: "cartao producao" }, [
      el("span", { class: "cartao-capa" }, el("span", { class: "capa vazia" })),
      el("b", { text: p.nome }),
      el("small", {}, [el("span", { class: "o", text: p.tempo }), " · em produção"]),
    ]);
  }

  // uma prateleira: título (link), "Mostrar tudo" e a fileira, que rola na horizontal
  function prateleira(titulo, href, frase, itens, extra = "") {
    const fileira = el("ul", { class: "fileira", "aria-label": titulo }, itens.map((i) => el("li", {}, i)));
    const seta = (dir, rot) => {
      const b = el("button", { type: "button", class: "icone seta", "aria-label": rot, text: dir < 0 ? "‹" : "›" });
      b.addEventListener("click", () => fileira.scrollBy({ left: dir * fileira.clientWidth * 0.8, behavior: calmo ? "auto" : "smooth" }));
      return b;
    };
    return el("section", { class: `prateleira ${extra}` }, [
      el("header", {}, [
        el("div", {}, [el("h2", {}, href ? el("a", { href, text: titulo }) : titulo), frase ? el("p", { text: frase }) : null]),
        el("div", { class: "prateleira-acoes" }, [seta(-1, `${titulo}: voltar`), seta(1, `${titulo}: avançar`),
          href ? el("a", { class: "mostrar-tudo", href, text: "Mostrar tudo" }) : null]),
      ]),
      fileira,
    ]);
  }

  let filtroHome = "tudo";               // vale só nesta visita

  function inicio() {
    const comece = COMECE.map((id) => G.find((f) => f.id === id)).filter(Boolean);
    const raiz = el("div", { class: "inicio", "data-filtro": filtroHome });
    const chips = [["tudo", "Tudo"], ["faixas", "Faixas"], ["instrumentos", "Instrumentos"]].map(([v, rot]) => {
      const b = el("button", { type: "button", class: "chip", "aria-pressed": String(v === filtroHome), text: rot });
      b.addEventListener("click", () => {
        filtroHome = raiz.dataset.filtro = v;
        chips.forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
      });
      return b;
    });
    raiz.append(
      el("h1", { class: "so-leitor", text: "É complexo, baby?" }),
      el("div", { class: "chips", role: "group", "aria-label": "Mostrar" }, chips),
      ...[
        comece.length && prateleira("Comece por aqui", null, "Duas buscas, duas ordenações e um agrupamento: um caminho curto para pegar o jeito.", comece.map(cartaoFaixa), "de-faixas destaque"),
        ...ALBUNS.map((a) => prateleira(a.titulo, `#${a.id}`, a.frase, [...a.faixas.map(cartaoFaixa), ...a.em_producao.map(cartaoProducao)], "de-faixas")),
        INSTS.length && prateleira("Instrumentos", "#instrumentos", "As estruturas de dados que as faixas tocam.", INSTS.map((i) => window.PaginaInstrumento.cartao(i, ctxInstrumento)), "de-instrumentos"),
      ].filter(Boolean),
    );
    return raiz;
  }

  function album(a) {
    const total = a.faixas.reduce((t, f) => t + duracao(f), 0);
    const linhas = a.faixas.map((f, i) => {
      const tr = el("tr", { class: "tocavel", "data-id": f.id }, [
        el("td", { class: "n", text: String(i + 1) }),
        el("td", {}, el("div", { class: "faixa" }, [capaFaixa(f, "mini-48"),
          el("div", {}, [el("a", { href: rotaFaixa(f), text: f.nome }), feat(f), el("small", { text: f.variante })])])),
        el("td", { class: "o", text: f.tempo.notacao }),
        el("td", { class: "o esconde-estreito", text: f.memoria.notacao }),
        el("td", { class: "o esconde-estreito", text: `M = ${f.medido.ciclomatica.M}` }),
        el("td", { class: "dur", text: relogio(duracao(f)) }),
      ]);
      tr.addEventListener("click", (e) => { if (!e.target.closest("a")) tocar(f, a); });
      return tr;
    });
    const prod = a.em_producao.map((p, i) => el("tr", { class: "producao" }, [
      el("td", { class: "n", text: String(a.faixas.length + i + 1) }),
      el("td", {}, el("div", { class: "faixa" }, [el("span", { class: "capa vazia mini-48" }), el("div", {}, [el("span", { text: p.nome }), el("small", { text: "em produção" })])])),
      el("td", { class: "o", text: p.tempo }),
      el("td", { class: "o esconde-estreito", text: p.memoria }),
      el("td", { class: "o esconde-estreito", text: "—" }),
      el("td", { class: "dur", text: "—" }),
    ]));
    let botao = null;
    if (a.faixas.length) {
      botao = el("button", { type: "button", class: "botao-tocar", text: "▶ Tocar o álbum" });
      botao.addEventListener("click", () => tocar(a.faixas[0], a));
    }
    return el("div", {}, [
      el("header", { class: "cabeca" }, [capaAlbum(a), el("div", {}, [
        el("span", { class: "rotulo", text: "álbum" }),
        el("h1", { text: a.titulo }),
        el("p", { text: a.frase }),
        el("div", { class: "acoes" }, [botao, el("span", { text: a.faixas.length ? `${nFaixas(a.faixas.length)}, ${relogio(total)}` : "nenhuma faixa pronta ainda" })]),
      ])]),
      el("table", { class: "faixas" }, [
        el("thead", {}, el("tr", {}, ["#", "faixa", "tempo", "memória", "caminhos", "duração"].map((t, i) =>
          el("th", { class: i === 3 || i === 4 ? "esconde-estreito" : i === 5 ? "dur" : "", text: t })))),
        el("tbody", {}, [...linhas, ...prod]),
      ]),
    ]);
  }

  // ---------- encarte ----------

  // o que cada tipo de faixa nova diz da entrada do encarte (os números vêm do dados.json)
  const decimal = (x) => (Math.round(x * 10) / 10).toFixed(1).replace(".", ",");
  const ENCARTE = {
    busca: { entrada: "números", conta: (ex) => `${ex.n} números, ${ex.posicao >= 0 ? `o ${ex.alvo} está na casa ${ex.posicao + 1}` : `o ${ex.alvo} não está no vetor`}, na entrada do encarte` },
    parenteses: { entrada: "símbolos", conta: (ex) => `${ex.n} símbolos, ${ex.comparacoes} pares conferidos, na entrada do encarte` },
    atendimento: { entrada: "clientes", conta: (ex) => `${ex.n} clientes, espera média de ${decimal(ex.soma / ex.n)} min, na entrada do encarte` },
  };

  const PALAVRAS = /^(\s*)(procedimento|para|enquanto|senão se|senão|se|pare|devolva)\b/;

  function blocoPseudo(f) {
    const p = f.pseudocodigo;
    const porLinha = {};
    p.decisoes.forEach((l) => (porLinha[l] = (porLinha[l] || 0) + 1));
    const ol = el("ol");
    p.linhas.forEach((l, i) => {
      let h = esc(l).replace(PALAVRAS, '$1<span class="kw">$2</span>');
      if (/^\s*(se|senão se|enquanto)\b/.test(l)) h = h.replace(/ (e|ou) /g, ' <span class="kw">$1</span> ');
      const n = porLinha[i + 1];
      ol.append(el("li", n ? { class: "decisao", "data-n": n, "data-linha": i + 1, html: h || " " } : { "data-linha": i + 1, html: h || " " }));
    });
    return el("div", { class: "pseudo", role: "figure", "aria-label": "Pseudocódigo em português", "data-faixa": f.id }, ol);
  }

  function encarte(f) {
    const a = albumDe(f), ex = f.exemplo, m = f.medido, c = m.ciclomatica, cf = f.conferencia, p = f.pseudocodigo;
    const ordena = m.tempo.tipo === "ordenacao", casos = !!m.tempo.series;
    const entrada = ENCARTE[m.tempo.tipo] ? ENCARTE[m.tempo.tipo].entrada : ordena ? "números" : "pontos";
    const gr = f.graficos || {};
    // as legendas dos gráficos das faixas novas: texto da ficha, números do dados.json
    const preencher = (t) => (t || "").replace(/\{(\w+)\}/g, (_, c) => ({
      n0: mil(m.tempo.crescimento[0].n), n1: mil(m.tempo.crescimento.at(-1).n), dados: m.tempo.crescimento_dados[0].toUpperCase() + m.tempo.crescimento_dados.slice(1),
      vezes: dist.vezes, nd: dist.n, min: Math.min(...(dist.valores || [0])), max: Math.max(...(dist.valores || [0])),
    })[c] ?? `{${c}}`);
    const temPicoCasos = casos && m.tempo.crescimento.some((d) => m.tempo.series.some((sr) => d[sr.caso].pico > 0));
    const temPilhaOuAux = ordena && m.tempo.crescimento.some((d) => d.invertido.pico > 0 || d.aleatorio.pico > 0);
    const dist = m.tempo.distribuicao;
    const fig1 = el("div"), fig2 = el("div"), fig3 = el("div"), codigo = el("div"), fluxo = el("div", { class: "fluxo", "data-faixa": f.id });

    const capa = el("button", { type: "button", class: "capa-tocar", "aria-label": `Tocar ${f.nome}` }, capaFaixa(f));
    capa.addEventListener("click", () => tocar(f, a));
    const botao = el("button", { type: "button", class: "botao-tocar", text: "▶ Tocar" });
    botao.addEventListener("click", () => tocar(f, a));

    const conteudo = el("div", {}, [
      el("a", { class: "voltar", href: `#${a.id}`, text: `álbum ${a.titulo}` }),
      el("div", { class: "encarte-topo" }, [capa, el("div", {}, [
        el("div", { class: "placa" }, [
          el("h1", { text: f.nome }),
          creditos(f).length ? el("p", { class: "feat-linha" }, feat(f)) : null,
          el("p", { class: "variante", text: f.variante }),
          el("dl", { html: `
            <dt>autoria</dt><dd>${esc(f.placa ? f.placa.autor : "—")}</dd>
            <dt>quando</dt><dd>${esc(f.placa ? f.placa.ano : "—")}</dd>
            <dt>técnica</dt><dd>Python, sobre ${esc(ex.dados)}</dd>
            ${creditos(f).length ? `<dt>instrumentos</dt><dd>${creditos(f).map((c) => `<a href="#instrumentos/${c.id}">${esc(c.inst.nome)}</a> (${esc(c.papel)})`).join("<br>")}</dd>` : ""}
            <dt>tempo</dt><dd><span class="o">${esc(f.tempo.notacao)}</span>, ${mil(ex.ops)} ${esc(m.tempo.unidade)} na entrada do encarte</dd>
            <dt>memória</dt><dd><span class="o">${esc(f.memoria.notacao)}</span>, ${m.memoria.pico ? `${mil(m.memoria.pico)} valores extras no pico` : "nenhum valor extra"}</dd>
            <dt>caminhos</dt><dd><span class="o">M = ${c.M}</span></dd>
            <dt>duração</dt><dd>${relogio(duracao(f))} a 1×, na entrada do encarte</dd>` }),
        ]),
        el("p", { class: "resumo", text: f.resumo }),
        el("p", { class: "ao-vivo", "data-ao-vivo": f.id }),
        el("div", { class: "acoes" }, [botao, el("span", { text: `faixa ${a.faixas.indexOf(f) + 1} de ${a.faixas.length}, álbum ${a.titulo}` })]),
      ])]),

      el("div", { class: "tres" }, [
        el("section", {}, [
          el("h2", { text: "Tempo" }),
          el("p", { class: "ordem", text: f.tempo.notacao }),
          el("p", { class: "conta", html: `<b>${mil(ex.ops)}</b> ${esc(m.tempo.unidade)}<span>${ENCARTE[m.tempo.tipo] ? ENCARTE[m.tempo.tipo].conta(ex) : ordena ? `${ex.n} números, ${ex.movimentos} ${esc(ex.movimento)} na entrada do encarte` : `${ex.n} × ${ex.k} × ${ex.i} na entrada do encarte`}</span>` }),
          el("p", { class: "porque", text: f.tempo.porque }),
          f.tempo.nota && el("p", { class: "nota", text: f.tempo.nota }),
        ]),
        el("section", {}, [
          el("h2", { text: "Memória" }),
          el("p", { class: "ordem", text: f.memoria.notacao }),
          el("p", { class: "conta", html: m.memoria.pico
            ? `<b>${mil(m.memoria.pico)}</b> ${m.memoria.pico === 1 ? "valor" : "valores"} no pico<span>além dos ${ex.n} ${entrada} de entrada</span>`
            : `<b>nenhum</b> valor extra<span>${esc(f.memoria.vazio || "ordena dentro do próprio vetor")}</span>` }),
          el("p", { class: "porque", text: f.memoria.porque }),
          f.memoria.nota && el("p", { class: "nota", text: f.memoria.nota }),
        ]),
        el("section", {}, [
          el("h2", { text: "Caminhos" }),
          el("p", { class: "ordem", text: `M = ${c.M}` }),
          el("p", { class: "conta", html: `<b>${c.decisoes.length}</b> decisões + 1<span>complexidade ciclomática da função</span>` }),
          el("p", { class: "porque", text: f.ciclomatica.porque }),
          f.ciclomatica.regra && el("p", { class: "nota", text: f.ciclomatica.regra }),
        ]),
      ]),

      p && el("section", { class: "secao" }, [
        el("h2", { text: "O algoritmo em português" }),
        el("p", { text: "O pseudocódigo é o jeito em que o algoritmo seria proposto, sem depender de linguagem; os índices começam em 1. O fluxograma é gerado dele: losango para cada decisão (uma condição com \"e\" vira dois), hexágono para cada laço \"para\" (o \"enquanto\" é um losango, porque testa uma condição), e a seta da esquerda volta ao começo do laço." }),
        el("div", { class: "contas-m", html:
          `<span>fluxograma: ${p.decisoes.length} decisões + 1 = <b>${p.M}</b></span><span>${p.arestas} setas − ${p.nos} caixas + 2 = <b>${p.M}</b></span><span>código Python: <b>M = ${c.M}</b>${p.M === c.M ? ", os mesmos ramos" : ""}</span>` }),
        el("div", { class: "algoritmo" }, [blocoPseudo(f), fluxo]),
      ]),

      casos ? el("section", { class: "secao" }, [
        el("h2", { text: gr.titulo }),
        el("p", { text: gr.texto }),
        el("div", { class: "dois" }, [
          el("figure", { class: "figura" }, [fig1, el("figcaption", { text: preencher(gr.crescimento) })]),
          el("figure", { class: "figura" }, [fig2, el("figcaption", { text: preencher(gr.distribuicao) })]),
        ]),
      ]) : ordena ? el("section", { class: "secao" }, [
        el("h2", { text: "Tempo: como cresce, e o que muda com a entrada" }),
        el("p", { text: "As mesmas contas para vetores cada vez maiores e para três tipos de entrada. Em escala logarítmica, a inclinação da linha é o expoente: quem cresce como n² sobe duas vezes mais íngreme que quem cresce como n." }),
        el("div", { class: "dois" }, [
          el("figure", { class: "figura" }, [fig1, el("figcaption", { text:
            `Comparações para n de ${m.tempo.crescimento[0].n} a ${mil(m.tempo.crescimento.at(-1).n)}. ${m.tempo.crescimento_dados}; a faixa cinza vai do menor ao maior dos aleatórios. Tracejadas: n²/2 e n log₂ n, de referência.` })]),
          el("figure", { class: "figura" }, [fig2, el("figcaption", { text:
            `${dist.vetores} vetores embaralhados de ${dist.n} números: ${Math.min(...dist.comparacoes) === Math.max(...dist.comparacoes) ? `sempre ${Math.min(...dist.comparacoes)}` : `de ${Math.min(...dist.comparacoes)} a ${Math.max(...dist.comparacoes)}`} comparações. A entrada do encarte usa a semente ${ex.semente}.` })]),
        ]),
      ]) : el("section", { class: "secao" }, [
        el("h2", { text: "Tempo: o que cresce, e o que não se controla" }),
        el("p", { text: "Cada volta custa exatamente n·k distâncias. O total é isso vezes o número de voltas, e as voltas mudam com os dados e com o começo." }),
        el("div", { class: "dois" }, [
          el("figure", { class: "figura" }, [fig1, el("figcaption", { text:
            `Total medido (preto) e custo de uma volta (cinza) para n de ${mil(m.tempo.crescimento[0].n)} a ${mil(m.tempo.crescimento.at(-1).n)}, k = ${ex.k}, em escala logarítmica: a razão entre os dois é o número de voltas. Um sorteio por n. ${m.tempo.crescimento_dados}.` })]),
          el("figure", { class: "figura" }, [fig2, el("figcaption", { text:
            `O mesmo iris, ${m.tempo.voltas_por_semente.sementes} sorteios diferentes dos centros iniciais: de ${Math.min(...m.tempo.voltas_por_semente.voltas)} a ${Math.max(...m.tempo.voltas_por_semente.voltas)} voltas. A entrada do encarte usa a semente ${ex.semente}.` })]),
        ]),
      ]),

      el("section", { class: "secao" }, [
        el("h2", { text: "Memória: o que fica guardado" }),
        el("p", { text: "Cada quadradinho é um valor guardado no momento de maior uso. A entrada não conta; variáveis soltas, como o índice do laço, também não." }),
        el("div", { class: "figura" }, window.Graficos.blocoMemoria(f)),
        temPicoCasos && el("figure", { class: "figura" }, [fig3, el("figcaption", { text: preencher(gr.memoria) })]),
        temPilhaOuAux && el("figure", { class: "figura" }, [fig3, el("figcaption", { text:
          "Memória extra no pico para cada n (lista auxiliar e níveis da pilha de recursão), nas três entradas. Aleatório: o maior pico entre os vetores embaralhados." })]),
      ]),

      el("section", { class: "secao" }, [
        el("h2", { text: "Caminhos: onde o código se divide" }),
        el("p", { text: "O código abaixo é exatamente o que roda e é medido. Os pontos à esquerda são os comandos; as curvas, os saltos possíveis (tracejadas: de volta ao começo do laço). Os pontos verdes são as decisões." }),
        el("div", { class: "contas-m", html:
          `<span>${c.decisoes.length} decisões + 1 = <b>${c.M}</b></span><span>${c.arestas} arestas − ${c.nos} nós + 2 = <b>${c.M}</b></span>` }),
        codigo,
      ]),
      cf && el("p", { class: "conferido", html: `<b>Conferido no R.</b> ${esc(cf.resumo)}` }),
    ]);

    if (p) fluxo.append(window.Fluxograma(p));
    redesenhar = () => {
      const Gr = window.Graficos;
      if (casos) {
        Gr.graficoCasos(fig1, f, "ops");
        Gr.graficoHistograma(fig2, dist.valores, dist.destaque, preencher(gr.rotulo));
        if (temPicoCasos) Gr.graficoCasos(fig3, f, "pico");
      } else if (ordena) {
        Gr.graficoOrdenacao(fig1, f, "comparacoes");
        Gr.graficoHistograma(fig2, dist.comparacoes, ex.ops, `comparações (n = ${dist.n})`);
        if (temPilhaOuAux) Gr.graficoOrdenacao(fig3, f, "pico");
      } else {
        Gr.graficoCrescimento(fig1, f);
        Gr.graficoHistograma(fig2, m.tempo.voltas_por_semente.voltas, ex.i, "voltas até parar (i)");
      }
      codigo.replaceChildren(Gr.blocoCodigo(f));
    };
    return conteudo;
  }

  // ---------- rotas ----------

  let redesenhar = null, paginaInst = null;
  const ctxInstrumento = { faixas: G, rotaFaixa, feat, tocar: (f) => tocar(f), cartao: cartaoFaixa, prateleira };

  function rota() {
    let h = "";
    try { h = decodeURIComponent(location.hash.slice(1)); } catch (e) { h = ""; }   // hash malformado: volta ao início
    const velho = G.find((f) => f.id === h);          // links antigos: #k-means
    if (velho) { location.replace(rotaFaixa(velho)); return; }
    const [idAlbum, idFaixa] = h.split("/");
    const a = ALBUNS.find((x) => x.id === idAlbum);
    const f = a && idFaixa ? a.faixas.find((x) => x.id === idFaixa) : null;
    const main = $("#conteudo");
    redesenhar = null;
    if (paginaInst) { paginaInst.parar(); paginaInst = null; }   // a demo para; a faixa tocando, não
    const inst = idAlbum === "instrumentos" && idFaixa ? INSTS.find((x) => x.id === idFaixa) : null;
    if (f) { main.replaceChildren(encarte(f)); document.title = `${f.nome} · É complexo, baby?`; }
    else if (a) { main.replaceChildren(album(a)); document.title = `${a.titulo} · É complexo, baby?`; }
    else if (inst) {
      paginaInst = window.PaginaInstrumento.pagina(inst, ctxInstrumento);
      main.replaceChildren(paginaInst.el);
      redesenhar = paginaInst.redesenhar;
      document.title = `${inst.nome} · instrumentos · É complexo, baby?`;
    } else if (idAlbum === "instrumentos") {
      main.replaceChildren(window.PaginaInstrumento.indice(INSTS, ctxInstrumento));
      document.title = "Instrumentos · É complexo, baby?";
    } else { main.replaceChildren(inicio()); document.title = "É complexo, baby?"; }
    desenharLateral(a ? a.id : null, inst ? inst.id : null);
    if (redesenhar) redesenhar();
    marcarTocando();
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }

  // ---------- player ----------
  // a faixa é uma simulação ao vivo (simulacao/palco.js): o algoritmo roda em
  // JS, e o relógio anda pelas "unidades" da execução (uma comparação = 1)

  const palco = $("#palco"), fundo = $("#fundo"), tela = $("#tela");
  const botaoTocar = $("#tocar"), trilho = $("#trilho");
  let faixa = null, fila = [], sim = null, u = 0, tocando = false, vel = 1, ultimoQuadro = 0, painelEm = null;
  let accelerando = false;              // o ritmo que acelera; vale para todas as faixas, só nesta visita
  let pos = null, arrasto = null, esperaProxima = null;
  const cfgs = {};                      // a entrada escolhida em cada faixa
  const padroes = {};                   // simulação padrão (para a duração das listas), por ritmo

  // o menu de entrada de cada tipo de faixa: rótulo, opções, tamanhos e o botão de sorteio
  const ENTRADAS = {
    ordenacao: { rotulo: "entrada", ns: [8, 16, 24, 32, 48, 64], sortear: "embaralhar", sorteado: "aleatorio",
      opcoes: [["padrao", "a do encarte", "a entrada do encarte"], ["aleatorio", "aleatória", "entrada aleatória"], ["ordenado", "já ordenada", "entrada já ordenada"], ["invertido", "invertida", "entrada invertida"]] },
    busca: { rotulo: "alvo", ns: [8, 16, 24, 32, 48, 64], sortear: "sortear", sorteado: "sorteado",
      opcoes: [["padrao", "o do encarte", "o alvo do encarte"], ["sorteado", "sorteado", "alvo sorteado"], ["comeco", "no começo", "alvo no começo"], ["fim", "no fim", "alvo no fim"], ["ausente", "ausente", "alvo ausente"]] },
    parenteses: { rotulo: "texto", ns: [8, 12, 16, 24, 32, 40], sortear: "sortear texto", sorteado: "balanceada",
      opcoes: [["padrao", "o do encarte", "o texto do encarte"], ["balanceada", "balanceado", "texto balanceado"], ["par_errado", "um par errado", "um par errado"], ["sobra_aberto", "sobra aberto", "sobrando aberto"], ["so_abre", "só abre", "só abrindo"]] },
    atendimento: { rotulo: "movimento", ns: [8, 12, 16, 24, 32, 48], sortear: "sortear clientes", sorteado: "no_limite",
      opcoes: [["padrao", "o do encarte", "os clientes do encarte"], ["calmo", "calmo", "movimento calmo"], ["no_limite", "no limite", "movimento no limite"], ["lotado", "lotado", "movimento lotado"]] },
  };
  const tipoDe = (f) => f.medido.tempo.tipo || "ordenacao";
  const rotuloCfg = (f, c) => (ENTRADAS[tipoDe(f)].opcoes.find((o) => o[0] === c.tipo) || [])[2];

  const cfgPadrao = (f) => (f.alg === "kmeans" ? { k: f.exemplo.iniciais.length, semente: null } : { tipo: "padrao", n: f.exemplo.n, semente: 1 });
  function duracao(f) {
    const chave = `${f.id}:${accelerando}`;
    if (!padroes[chave]) padroes[chave] = window.Palco.criar(f, cfgPadrao(f), accelerando);
    return padroes[chave].total / padroes[chave].ritmo;   // segundos a 1×
  }

  function modo(m) {
    palco.dataset.modo = m;
    palco.hidden = m === "oculto";
    fundo.hidden = m !== "grande";
    const botao = $("#palco-modo");
    botao.textContent = m === "grande" ? "–" : "⤢";
    botao.setAttribute("aria-label", m === "grande" ? "Minimizar" : "Ampliar");
    if (m === "grande") palco.style.left = palco.style.top = "";
    if (m === "mini") posicionarMini();
    pintar();
  }

  function montarSim() {
    sim = window.Palco.criar(faixa, cfgs[faixa.id], accelerando);
    u = 0;
    painelEm = null;
    atualizarBarra();
    pintar();
  }

  function tocar(f, a) {
    fila = (a || albumDe(f)).faixas;
    clearTimeout(esperaProxima);
    if (!faixa || faixa.id !== f.id) {
      faixa = f;
      if (!cfgs[f.id]) cfgs[f.id] = cfgPadrao(f);
      sincronizarControles();
      montarSim();
    } else if (u >= sim.total) u = 0;
    modo("grande");
    play(true);
    marcarTocando();
  }

  function play(sim_) {
    tocando = sim_ && !!sim;
    botaoTocar.textContent = tocando ? "❚❚" : "▶";
    botaoTocar.setAttribute("aria-label", tocando ? "Pausar" : "Tocar");
    ultimoQuadro = performance.now();
    marcarTocando();
  }

  function pular(passo) {
    if (!faixa) return;
    const i = fila.indexOf(faixa) + passo;
    if (i >= 0 && i < fila.length) {
      const grande = palco.dataset.modo === "grande";
      tocar(fila[i]);
      if (!grande) modo("mini");                    // quem está lendo continua lendo
    }
  }

  // o laço de animação: avança o relógio e redesenha
  function quadro(agora) {
    if (tocando && sim) {
      u = Math.min(sim.total, u + (agora - ultimoQuadro) / 1000 * sim.ritmo * vel);
      if (u >= sim.total) {
        play(false);
        esperaProxima = setTimeout(() => pular(1), 1500);   // o álbum segue tocando
      }
      pintar();
    }
    ultimoQuadro = agora;
    requestAnimationFrame(quadro);
  }

  function pintar() {
    if (!sim || palco.hidden) return atualizarTempo();
    window.Palco.pintar(tela, sim, u);
    atualizarTempo();
    pintarVariaveis();
  }

  // ---------- painel de variáveis: a linha que roda e os escalares da vez ----------

  const valor = (x) => (x === null || x === undefined ? "—" : x === true ? "verdadeiro" : x === false ? "falso"
    : Number.isInteger(x) ? mil(x) : x.toLocaleString("pt-BR", { maximumFractionDigits: 3 }));

  function pintarVariaveis() {
    const caixa = $("#palco-vars");
    if (palco.dataset.modo !== "grande") return;
    const p = sim.varsEm(u);
    const chave = p ? p.k : -1;
    if (chave === painelEm) return;
    painelEm = chave;
    if (!p) { caixa.replaceChildren(el("p", { class: "vars-vazio", text: "As variáveis aparecem no primeiro passo." })); return; }
    const texto = p.linha && faixa.pseudocodigo ? faixa.pseudocodigo.linhas[p.linha - 1].trim() : "";
    const recursiva = Object.prototype.hasOwnProperty.call(p.vars, "a") && Object.prototype.hasOwnProperty.call(p.vars, "b");
    caixa.replaceChildren(
      el("p", { class: "vars-linha" }, [el("span", { text: p.linha ? `linha ${p.linha}` : "" }), el("code", { text: texto })]),
      el("dl", { class: "vars" }, Object.entries(p.vars).flatMap(([n, x]) => {
        const mudou = p.mudou.includes(n);
        return [el("dt", { text: n, class: mudou ? "mudou" : "" }), el("dd", { text: valor(x), class: mudou ? "mudou" : "" })];
      })),
      ...(recursiva && p.nivel ? [el("p", { class: "vars-nivel", text: `chamada aberta no nível ${p.nivel} da pilha de recursão` })] : []),
    );
  }

  function atualizarTempo() {
    if (!sim) return;
    $("#tempo-agora").textContent = relogio(u / (sim.ritmo * vel));
    $("#tempo-total").textContent = relogio(sim.total / (sim.ritmo * vel));
    if (!arrastandoTrilho) trilho.value = String(sim.total ? Math.round(1000 * u / sim.total) : 0);
    const feitos = sim.passos.filter((x) => x <= u + 1e-9).length;
    $("#passo-conta").textContent = `passo ${feitos} de ${sim.passos.length}`;
    const vivo = document.querySelector(`[data-ao-vivo="${faixa.id}"]`);
    if (vivo) vivo.textContent = textoAoVivo();
  }

  function textoAoVivo() {
    const r = sim.resumo, c = cfgs[faixa.id];
    if (sim.aoVivo) return sim.aoVivo(u, { rotulo: rotuloCfg(faixa, c) });
    if (faixa.alg === "kmeans") {
      return `Tocando agora: k = ${r.k}, ${c.semente === null ? "os centros do encarte" : "centros sorteados"}; ${mil(sim.contagemEm(u))} de ${mil(r.distancias)} distâncias, ${r.voltas} voltas.`;
    }
    const entrada = { padrao: "a entrada do encarte", aleatorio: "entrada aleatória", ordenado: "entrada já ordenada", invertido: "entrada invertida" }[c.tipo];
    return `Tocando agora: n = ${r.n}, ${entrada}; ${mil(sim.contagemEm(u))} de ${mil(r.comparacoes)} comparações, ${mil(r.movimentos)} ${r.movimento}, ${r.pico ? `pico de ${r.pico} valores extras` : "sem memória extra"}.`;
  }

  function atualizarBarra() {
    const a = albumDe(faixa);
    $("#agora-capa").replaceChildren(el("img", { src: faixa.poster, alt: "" }));
    $("#agora-nome").replaceChildren(faixa.nome, featTexto(faixa) ? el("span", { class: "feat", text: ` ${featTexto(faixa)}` }) : "");
    $("#agora-album").textContent = `${a.titulo}, faixa ${fila.indexOf(faixa) + 1}`;
    $("#agora").href = rotaFaixa(faixa);
    $("#palco-titulo").replaceChildren(faixa.nome, feat(faixa) || "", ` · ${a.titulo}`);
    const r = sim.resumo;
    const med = sim.medidor && sim.medidor().split("<br>");
    $("#medidor").innerHTML = med
      ? `<b>${esc(faixa.tempo.notacao)}</b> ${med[0]}<br><b>${esc(faixa.memoria.notacao)}</b> ${med[1]}, <b>M = ${faixa.medido.ciclomatica.M}</b>`
      : faixa.alg === "kmeans"
      ? `<b>${esc(faixa.tempo.notacao)}</b> ${mil(r.distancias)} distâncias, ${r.voltas} voltas<br><b>${esc(faixa.memoria.notacao)}</b> ${mil(r.pico)} valores, <b>M = ${faixa.medido.ciclomatica.M}</b>`
      : `<b>${esc(faixa.tempo.notacao)}</b> ${mil(r.comparacoes)} comparações, n = ${r.n}<br><b>${esc(faixa.memoria.notacao)}</b> ${r.pico ? `${mil(r.pico)} valores` : "sem memória extra"}, <b>M = ${faixa.medido.ciclomatica.M}</b>`;
    habilitar();
  }

  function habilitar() {
    const i = faixa ? fila.indexOf(faixa) : -1;
    botaoTocar.disabled = !faixa;
    $("#anterior").disabled = i <= 0;
    $("#proxima").disabled = i < 0 || i >= fila.length - 1;
    trilho.disabled = !faixa;
  }

  function marcarTocando() {
    document.querySelectorAll(".faixas tr[data-id]").forEach((tr, i) => {
      const sim_ = !!faixa && tr.dataset.id === faixa.id;
      tr.classList.toggle("tocando", sim_);
      tr.querySelector(".n").textContent = sim_ && tocando ? "▶" : String(i + 1);   // tocando: ▶; pausada: o número, em verde
    });
    document.querySelectorAll(".cartao[data-id]").forEach((c) => c.classList.toggle("tocando", !!faixa && c.dataset.id === faixa.id));
  }

  // ---------- controles da faixa ----------

  function sincronizarControles() {
    const c = cfgs[faixa.id], km = faixa.alg === "kmeans";
    palco.classList.toggle("e-kmeans", km);
    if (km) $("#cfg-k").value = String(c.k);
    else {
      const E = ENTRADAS[tipoDe(faixa)];
      $("#cfg-tipo-rotulo").textContent = E.rotulo;
      $("#cfg-tipo").replaceChildren(...E.opcoes.map(([v, t]) => el("option", { value: v, text: t })));
      const ns = E.ns.includes(c.n) ? E.ns : [...E.ns, c.n].sort((p, q) => p - q);   // o n do encarte sempre aparece
      $("#cfg-n").replaceChildren(...ns.map((n) => el("option", { text: String(n) })));
      $("#cfg-tipo").value = c.tipo; $("#cfg-n").value = String(c.n); $("#cfg-n").disabled = c.tipo === "padrao";
    }
    $("#cfg-sortear").textContent = km ? "sortear centros" : ENTRADAS[tipoDe(faixa)].sortear;
  }

  function mudarCfg(muda) {
    if (!faixa) return;
    clearTimeout(esperaProxima);
    Object.assign(cfgs[faixa.id], muda);
    sincronizarControles();
    const estava = tocando;
    montarSim();
    play(estava);
  }

  $("#cfg-tipo").addEventListener("change", (e) => {
    const tipo = e.target.value;
    mudarCfg(tipo === "padrao" ? cfgPadrao(faixa) : { tipo, n: Number($("#cfg-n").value), semente: novaSemente() });
  });
  $("#cfg-n").addEventListener("change", (e) => mudarCfg({ n: Number(e.target.value), semente: novaSemente() }));
  $("#cfg-k").addEventListener("change", (e) => mudarCfg({ k: Number(e.target.value), semente: novaSemente() }));
  $("#cfg-sortear").addEventListener("click", () => {
    if (faixa.alg === "kmeans") mudarCfg({ semente: novaSemente() });
    else {
      const E = ENTRADAS[tipoDe(faixa)], atual = cfgs[faixa.id].tipo;
      // ordenações: embaralhar é sempre "aleatória"; nas outras, sorteia de novo o caso escolhido
      const tipo = tipoDe(faixa) === "ordenacao" || atual === "padrao" ? E.sorteado : atual;
      mudarCfg({ tipo, n: Number($("#cfg-n").value), semente: novaSemente() });
    }
  });
  $("#cfg-vel").addEventListener("change", (e) => { vel = Number(e.target.value); atualizarTempo(); });
  // accelerando: troca o ritmo sem perder o lugar (o mesmo evento, na linha do tempo nova)
  $("#cfg-acelera").addEventListener("click", (e) => {
    const botao = e.currentTarget;
    accelerando = !accelerando;
    botao.setAttribute("aria-pressed", String(accelerando));
    if (!faixa) return;
    const k = sim.eventoEm(u), estava = tocando;
    sim = window.Palco.criar(faixa, cfgs[faixa.id], accelerando);
    u = sim.uDoEvento(k);
    painelEm = null;
    play(estava);
    pintar();
    if (!paginaInst) { const y = window.scrollY; rota(); window.scrollTo(0, y); botao.focus(); }   // as durações mostradas mudam com o ritmo
  });
  const novaSemente = () => Math.floor(Math.random() * 2 ** 31);

  // passo a passo: pausa e vai ao fim do passo anterior/seguinte
  function passo(dir) {
    if (!sim) return;
    clearTimeout(esperaProxima);
    play(false);
    const ps = sim.passos, eps = 1e-9;
    if (dir > 0) u = ps.find((x) => x > u + eps) ?? sim.total;
    else u = [...ps].reverse().find((x) => x < u - eps) ?? 0;
    pintar();
  }
  $("#passo-antes").addEventListener("click", () => passo(-1));
  $("#passo-depois").addEventListener("click", () => passo(1));

  // ---------- barra do player ----------

  botaoTocar.addEventListener("click", () => {
    if (!faixa) return;
    clearTimeout(esperaProxima);
    if (!tocando) {
      if (u >= sim.total) u = 0;
      if (palco.dataset.modo === "oculto") modo("mini");
      play(true);
    } else play(false);
  });
  $("#anterior").addEventListener("click", () => pular(-1));
  $("#proxima").addEventListener("click", () => pular(1));
  let arrastandoTrilho = false;
  trilho.addEventListener("input", () => {
    if (!sim) return;
    arrastandoTrilho = true;
    clearTimeout(esperaProxima);
    u = sim.total * Number(trilho.value) / 1000;
    pintar();
  });
  trilho.addEventListener("change", () => { arrastandoTrilho = false; });
  tela.addEventListener("click", () => { if (palco.dataset.modo === "grande") botaoTocar.click(); });

  // grande → mini: minimizar, clicar fora ou Esc; a simulação continua
  $("#palco-modo").addEventListener("click", (e) => { e.stopPropagation(); modo(palco.dataset.modo === "grande" ? "mini" : "grande"); });
  $("#palco-fechar").addEventListener("click", (e) => { e.stopPropagation(); play(false); clearTimeout(esperaProxima); modo("oculto"); });
  fundo.addEventListener("click", () => modo("mini"));
  document.querySelectorAll(".palco-controles select").forEach((s) => s.addEventListener("change", () => s.blur()));   // as setas voltam a ser do player
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && palco.dataset.modo === "grande") { modo("mini"); return; }
    if (e.target.closest("input, select, textarea")) return;
    if (e.key === " " && faixa && !e.target.closest("button, a")) { e.preventDefault(); botaoTocar.click(); }
    if (palco.dataset.modo === "grande" && (e.key === "ArrowRight" || e.key === "ArrowLeft")) { e.preventDefault(); passo(e.key === "ArrowRight" ? 1 : -1); }
  });

  // mini player: arrasta pela tela, sempre dentro dela; um toque sem arrastar amplia
  function posicionarMini() {
    const barra = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--barra"), 10) || 84;
    if (!pos) pos = { x: window.innerWidth - palco.offsetWidth - 20, y: window.innerHeight - palco.offsetHeight - barra - 20 };
    prenderMini();
  }

  function prenderMini() {
    if (palco.dataset.modo !== "mini" || !pos) return;
    const barra = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--barra"), 10) || 84;
    pos.x = Math.min(Math.max(8, pos.x), window.innerWidth - palco.offsetWidth - 8);
    pos.y = Math.min(Math.max(8, pos.y), window.innerHeight - barra - palco.offsetHeight - 8);   // nunca atrás da barra
    palco.style.left = `${pos.x}px`;
    palco.style.top = `${pos.y}px`;
  }

  palco.addEventListener("pointerdown", (e) => {
    if (palco.dataset.modo !== "mini" || e.target.closest("button, a")) return;
    e.preventDefault();
    arrasto = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y, moveu: false };
    palco.setPointerCapture(e.pointerId);
  });
  palco.addEventListener("pointermove", (e) => {
    if (!arrasto) return;
    const dx = e.clientX - arrasto.x, dy = e.clientY - arrasto.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) { arrasto.moveu = true; palco.classList.add("arrastando"); }
    pos.x = arrasto.px + dx;
    pos.y = arrasto.py + dy;
    prenderMini();
  });
  palco.addEventListener("pointerup", () => {
    if (arrasto && !arrasto.moveu) modo("grande");
    arrasto = null;
    palco.classList.remove("arrastando");
  });

  let espera;
  window.addEventListener("resize", () => {
    clearTimeout(espera);
    espera = setTimeout(() => { if (redesenhar) redesenhar(); prenderMini(); pintar(); }, 120);
  });
  window.addEventListener("hashchange", rota);

  // Biblioteca: alterna a lista de álbuns e a de instrumentos
  const chipsBib = document.querySelectorAll("#biblioteca .chip");
  chipsBib.forEach((b) => b.addEventListener("click", () => {
    chipsBib.forEach((c) => {
      c.setAttribute("aria-pressed", String(c === b));
      $(`#${c.dataset.mostra}`).hidden = c !== b;
    });
  }));

  if (calmo) document.querySelector(".cursor").style.display = "none";
  habilitar();
  rota();
  requestAnimationFrame(quadro);
})();
