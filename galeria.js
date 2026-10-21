// O player: álbuns (famílias), faixas (algoritmos), vídeo grande que vira mini
// player arrastável, e o encarte de cada faixa. Os números vêm de dados.js.
(function () {
  "use strict";

  const { el, mil, esc } = window.Graficos;
  const G = window.GALERIA || [];
  const ALBUNS = (window.ALBUNS || []).map((a) => ({ ...a, faixas: G.filter((f) => f.familia === a.familia) }));
  const $ = (s, raiz = document) => raiz.querySelector(s);
  const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const albumDe = (f) => ALBUNS.find((a) => a.familia === f.familia);
  const rotaFaixa = (f) => `#${albumDe(f).id}/${f.id}`;
  const relogio = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const nFaixas = (n) => `${n} ${n === 1 ? "faixa" : "faixas"}`;

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

  function desenharLateral(atual) {
    $("#albuns").replaceChildren(...ALBUNS.map((a) => el("a", { class: "album-mini", href: `#${a.id}`, "aria-current": String(a.id === atual) }, [
      capaAlbum(a, "mini-48"),
      el("span", {}, [el("b", { text: a.titulo }),
        el("small", { text: a.faixas.length ? nFaixas(a.faixas.length) : `${a.em_producao.length} em produção` })]),
    ])));
  }

  // ---------- páginas ----------

  function inicio() {
    return el("div", { class: "inicio" }, [
      el("h1", { text: "É complexo, baby?" }),
      el("p", { class: "lede", text: "Algoritmos como discos. Cada tema é um álbum, cada algoritmo uma faixa: o vídeo mostra o algoritmo trabalhando, e o encarte traz quantas operações ele faz, quanta memória guarda e quantos caminhos tem, tudo contado rodando o código." }),
      el("div", { class: "estante" }, ALBUNS.map((a) => el("a", { class: "disco", href: `#${a.id}` }, [
        capaAlbum(a),
        el("b", { text: a.titulo }),
        el("small", { text: a.faixas.length ? `${nFaixas(a.faixas.length)}, ${relogio(a.faixas.reduce((t, f) => t + f.duracao, 0))}` : "em produção" }),
      ]))),
    ]);
  }

  function album(a) {
    const total = a.faixas.reduce((t, f) => t + f.duracao, 0);
    const linhas = a.faixas.map((f, i) => {
      const tr = el("tr", { class: "tocavel", "data-id": f.id }, [
        el("td", { class: "n", text: String(i + 1) }),
        el("td", {}, el("div", { class: "faixa" }, [capaFaixa(f, "mini-48"),
          el("div", {}, [el("a", { href: rotaFaixa(f), text: f.nome }), el("small", { text: f.variante })])])),
        el("td", { class: "o", text: f.tempo.notacao }),
        el("td", { class: "o esconde-estreito", text: f.memoria.notacao }),
        el("td", { class: "o esconde-estreito", text: `M = ${f.medido.ciclomatica.M}` }),
        el("td", { class: "dur", text: relogio(f.duracao) }),
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
      ol.append(el("li", n ? { class: "decisao", "data-n": n, html: h || " " } : { html: h || " " }));
    });
    return el("div", { class: "pseudo", role: "figure", "aria-label": "Pseudocódigo em português" }, ol);
  }

  function encarte(f) {
    const a = albumDe(f), ex = f.exemplo, m = f.medido, c = m.ciclomatica, cf = f.conferencia, p = f.pseudocodigo;
    const ordena = m.tempo.tipo === "ordenacao";
    const entrada = ordena ? "números" : "pontos";
    const temPilhaOuAux = ordena && m.tempo.crescimento.some((d) => d.invertido.pico > 0 || d.aleatorio.pico > 0);
    const dist = m.tempo.distribuicao;
    const fig1 = el("div"), fig2 = el("div"), fig3 = el("div"), codigo = el("div"), fluxo = el("div", { class: "fluxo" });

    const capa = el("button", { type: "button", class: "capa-tocar", "aria-label": `Tocar ${f.nome}` }, capaFaixa(f));
    capa.addEventListener("click", () => tocar(f, a));
    const botao = el("button", { type: "button", class: "botao-tocar", text: "▶ Tocar" });
    botao.addEventListener("click", () => tocar(f, a));

    const conteudo = el("div", {}, [
      el("a", { class: "voltar", href: `#${a.id}`, text: `álbum ${a.titulo}` }),
      el("div", { class: "encarte-topo" }, [capa, el("div", {}, [
        el("div", { class: "placa" }, [
          el("h1", { text: f.nome }),
          el("p", { class: "variante", text: f.variante }),
          el("dl", { html: `
            <dt>autoria</dt><dd>${esc(f.placa ? f.placa.autor : "—")}</dd>
            <dt>quando</dt><dd>${esc(f.placa ? f.placa.ano : "—")}</dd>
            <dt>técnica</dt><dd>Python, sobre ${esc(ex.dados)}</dd>
            <dt>tempo</dt><dd><span class="o">${esc(f.tempo.notacao)}</span>, ${mil(ex.ops)} ${esc(m.tempo.unidade)} no vídeo</dd>
            <dt>memória</dt><dd><span class="o">${esc(f.memoria.notacao)}</span>, ${m.memoria.pico ? `${mil(m.memoria.pico)} valores extras no pico` : "nenhum valor extra"}</dd>
            <dt>caminhos</dt><dd><span class="o">M = ${c.M}</span></dd>
            <dt>duração</dt><dd>${relogio(f.duracao)}</dd>` }),
        ]),
        el("p", { class: "resumo", text: f.resumo }),
        el("div", { class: "acoes" }, [botao, el("span", { text: `faixa ${a.faixas.indexOf(f) + 1} de ${a.faixas.length}, álbum ${a.titulo}` })]),
      ])]),

      el("div", { class: "tres" }, [
        el("section", {}, [
          el("h2", { text: "Tempo" }),
          el("p", { class: "ordem", text: f.tempo.notacao }),
          el("p", { class: "conta", html: `<b>${mil(ex.ops)}</b> ${esc(m.tempo.unidade)}<span>${ordena ? `${ex.n} números, ${ex.movimentos} ${esc(ex.movimento)} no vídeo` : `${ex.n} × ${ex.k} × ${ex.i} no exemplo do vídeo`}</span>` }),
          el("p", { class: "porque", text: f.tempo.porque }),
          f.tempo.nota && el("p", { class: "nota", text: f.tempo.nota }),
        ]),
        el("section", {}, [
          el("h2", { text: "Memória" }),
          el("p", { class: "ordem", text: f.memoria.notacao }),
          el("p", { class: "conta", html: m.memoria.pico
            ? `<b>${mil(m.memoria.pico)}</b> ${m.memoria.pico === 1 ? "valor" : "valores"} no pico<span>além dos ${ex.n} ${entrada} de entrada</span>`
            : "<b>nenhum</b> valor extra<span>ordena dentro do próprio vetor</span>" }),
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

      ordena ? el("section", { class: "secao" }, [
        el("h2", { text: "Tempo: como cresce, e o que muda com a entrada" }),
        el("p", { text: "As mesmas contas para vetores cada vez maiores e para três tipos de entrada. Em escala logarítmica, a inclinação da linha é o expoente: quem cresce como n² sobe duas vezes mais íngreme que quem cresce como n." }),
        el("div", { class: "dois" }, [
          el("figure", { class: "figura" }, [fig1, el("figcaption", { text:
            `Comparações para n de ${m.tempo.crescimento[0].n} a ${mil(m.tempo.crescimento.at(-1).n)}. ${m.tempo.crescimento_dados}; a faixa cinza vai do menor ao maior dos aleatórios. Tracejadas: n²/2 e n log₂ n, de referência.` })]),
          el("figure", { class: "figura" }, [fig2, el("figcaption", { text:
            `${dist.vetores} vetores embaralhados de ${dist.n} números: de ${Math.min(...dist.comparacoes)} a ${Math.max(...dist.comparacoes)} comparações. O vídeo usa a semente ${ex.semente}.` })]),
        ]),
      ]) : el("section", { class: "secao" }, [
        el("h2", { text: "Tempo: o que cresce, e o que não se controla" }),
        el("p", { text: "Cada volta custa exatamente n·k distâncias. O total é isso vezes o número de voltas, e as voltas mudam com os dados e com o começo." }),
        el("div", { class: "dois" }, [
          el("figure", { class: "figura" }, [fig1, el("figcaption", { text:
            `Total medido (preto) e custo de uma volta (cinza) para n de ${mil(m.tempo.crescimento[0].n)} a ${mil(m.tempo.crescimento.at(-1).n)}, k = ${ex.k}, em escala logarítmica: a razão entre os dois é o número de voltas. Um sorteio por n. ${m.tempo.crescimento_dados}.` })]),
          el("figure", { class: "figura" }, [fig2, el("figcaption", { text:
            `O mesmo iris, ${m.tempo.voltas_por_semente.sementes} sorteios diferentes dos centros iniciais: de ${Math.min(...m.tempo.voltas_por_semente.voltas)} a ${Math.max(...m.tempo.voltas_por_semente.voltas)} voltas. O vídeo usa a semente ${ex.semente}.` })]),
        ]),
      ]),

      el("section", { class: "secao" }, [
        el("h2", { text: "Memória: o que fica guardado" }),
        el("p", { text: "Cada quadradinho é um valor guardado no momento de maior uso. A entrada não conta; variáveis soltas, como o índice do laço, também não." }),
        el("div", { class: "figura" }, window.Graficos.blocoMemoria(f)),
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
      if (ordena) {
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

  let redesenhar = null;

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
    if (f) { main.replaceChildren(encarte(f)); document.title = `${f.nome} · É complexo, baby?`; }
    else if (a) { main.replaceChildren(album(a)); document.title = `${a.titulo} · É complexo, baby?`; }
    else { main.replaceChildren(inicio()); document.title = "É complexo, baby?"; }
    desenharLateral(a ? a.id : null);
    if (redesenhar) redesenhar();
    marcarTocando();
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }

  // ---------- player ----------
  // um só <video>, fora das rotas: trocar de página não para a faixa

  const video = $("#video"), palco = $("#palco"), fundo = $("#fundo");
  const botaoTocar = $("#tocar"), trilho = $("#trilho");
  let faixa = null, fila = [], pos = null, arrasto = null, arrastandoTrilho = false;

  function modo(m) {
    palco.dataset.modo = m;
    palco.hidden = m === "oculto";
    fundo.hidden = m !== "grande";
    const botao = $("#palco-modo");
    botao.textContent = m === "grande" ? "–" : "⤢";
    botao.setAttribute("aria-label", m === "grande" ? "Minimizar" : "Ampliar");
    if (m === "grande") palco.style.left = palco.style.top = "";
    if (m === "mini") posicionarMini();
  }

  // o vídeo é baixado inteiro e tocado da memória: assim o seletor de tempo
  // funciona em qualquer servidor, até nos que não atendem pedidos por trecho
  // (por file://, o download é bloqueado e o endereço direto já funciona)
  const copias = {};
  async function fonte(f) {
    if (!copias[f.id]) {
      copias[f.id] = fetch(f.video)
        .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(r.status))))
        .then((b) => URL.createObjectURL(b))
        .catch(() => f.video);
    }
    return copias[f.id];
  }

  async function tocar(f, a) {
    fila = (a || albumDe(f)).faixas;
    modo("grande");
    if (!faixa || faixa.id !== f.id) {
      faixa = f;
      video.poster = f.poster;
      atualizarBarra();
      marcarTocando();
      const src = await fonte(f);
      if (faixa !== f) return;                       // trocou de faixa enquanto baixava
      video.src = src;
    }
    video.play().catch(() => {});
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

  function atualizarBarra() {
    const a = albumDe(faixa);
    $("#agora-capa").replaceChildren(el("img", { src: faixa.poster, alt: "" }));
    $("#agora-nome").textContent = faixa.nome;
    $("#agora-album").textContent = `${a.titulo}, faixa ${fila.indexOf(faixa) + 1}`;
    $("#agora").href = rotaFaixa(faixa);
    $("#palco-titulo").textContent = `${faixa.nome} · ${a.titulo}`;
    $("#medidor").innerHTML = `<b>${esc(faixa.tempo.notacao)}</b> ${mil(faixa.exemplo.ops)} ${esc(faixa.medido.tempo.unidade)}<br>`
      + `<b>${esc(faixa.memoria.notacao)}</b> ${faixa.medido.memoria.pico ? `${mil(faixa.medido.memoria.pico)} valores` : "sem memória extra"}, <b>M = ${faixa.medido.ciclomatica.M}</b>`;
    $("#tempo-total").textContent = relogio(faixa.duracao);
    $("#tempo-agora").textContent = "0:00";
    trilho.value = "0";
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
      const sim = !!faixa && tr.dataset.id === faixa.id;
      tr.classList.toggle("tocando", sim);
      tr.querySelector(".n").textContent = sim && !video.paused ? "▶" : String(i + 1);   // tocando: ▶; pausada: o número, em verde
    });
  }

  botaoTocar.addEventListener("click", () => {
    if (!faixa) return;
    if (video.paused) {
      video.play().catch(() => {});
      if (palco.dataset.modo === "oculto") modo("mini");
    } else video.pause();
  });
  $("#anterior").addEventListener("click", () => pular(-1));
  $("#proxima").addEventListener("click", () => pular(1));
  video.addEventListener("play", () => { botaoTocar.textContent = "❚❚"; botaoTocar.setAttribute("aria-label", "Pausar"); marcarTocando(); });
  video.addEventListener("pause", () => { botaoTocar.textContent = "▶"; botaoTocar.setAttribute("aria-label", "Tocar"); marcarTocando(); });
  video.addEventListener("ended", () => pular(1));   // o álbum segue tocando
  video.addEventListener("timeupdate", () => {
    if (!video.duration) return;
    $("#tempo-agora").textContent = relogio(video.currentTime);
    if (!arrastandoTrilho) trilho.value = String(Math.round(1000 * video.currentTime / video.duration));
  });
  video.addEventListener("click", () => {
    if (palco.dataset.modo === "grande") { if (video.paused) video.play().catch(() => {}); else video.pause(); }
  });
  trilho.addEventListener("input", () => {
    arrastandoTrilho = true;
    if (video.duration) video.currentTime = video.duration * Number(trilho.value) / 1000;
  });
  trilho.addEventListener("change", () => { arrastandoTrilho = false; });

  // grande → mini: minimizar, clicar fora ou Esc; o vídeo continua tocando
  $("#palco-modo").addEventListener("click", (e) => { e.stopPropagation(); modo(palco.dataset.modo === "grande" ? "mini" : "grande"); });
  $("#palco-fechar").addEventListener("click", (e) => { e.stopPropagation(); video.pause(); modo("oculto"); });
  fundo.addEventListener("click", () => modo("mini"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && palco.dataset.modo === "grande") modo("mini");
    if (e.key === " " && faixa && !e.target.closest("input, button, a, textarea")) { e.preventDefault(); botaoTocar.click(); }
  });

  // mini player: arrasta pela tela, sempre dentro dela; um toque sem arrastar amplia
  function posicionarMini() {
    const barra = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--barra"), 10) || 84;
    if (!pos) pos = { x: window.innerWidth - palco.offsetWidth - 20, y: window.innerHeight - palco.offsetHeight - barra - 20 };
    prenderMini();
  }

  function prenderMini() {
    if (palco.dataset.modo !== "mini" || !pos) return;
    pos.x = Math.min(Math.max(8, pos.x), window.innerWidth - palco.offsetWidth - 8);
    const barra = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--barra"), 10) || 84;
    pos.y = Math.min(Math.max(8, pos.y), window.innerHeight - barra - palco.offsetHeight - 8);   // nunca atrás da barra
    palco.style.left = `${pos.x}px`;
    palco.style.top = `${pos.y}px`;
  }

  palco.addEventListener("pointerdown", (e) => {
    if (palco.dataset.modo !== "mini" || e.target.closest("button")) return;
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
    espera = setTimeout(() => { if (redesenhar) redesenhar(); prenderMini(); }, 120);
  });
  window.addEventListener("hashchange", rota);

  if (calmo) document.querySelector(".cursor").style.display = "none";
  habilitar();
  rota();
})();
