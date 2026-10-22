// O JavaScript do site tem de contar igual ao Python.
// Roda os algoritmos de simulacao/algoritmos.js nos vetores guardados em
// algoritmos/*/dados.json e compara contagens e resultado; confere também
// se cada evento cai numa linha do pseudocódigo do tipo certo. Para os
// instrumentos (instrumentos/*/dados.json), refaz cada chamada medida e as
// sequências sorteadas e exige o mesmo custo, operação por operação.
//   node testes/conferir_js.mjs
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const exigir = createRequire(import.meta.url);
const A = exigir(join(RAIZ, "simulacao", "algoritmos.js"));
const I = exigir(join(RAIZ, "simulacao", "instrumentos.js"));
const ler = (p) => JSON.parse(readFileSync(join(RAIZ, p), "utf8"));
let falhas = 0;

function confere(nome, obtido, esperado) {
  const ok = JSON.stringify(obtido) === JSON.stringify(esperado);
  if (!ok) { falhas++; console.log(`  ✗ ${nome}: JS ${JSON.stringify(obtido)} | Python ${JSON.stringify(esperado)}`); }
  return ok;
}

// tipo de cada linha do pseudocódigo
function tipos(pasta) {
  const linhas = ler(`algoritmos/${pasta}/ficha.json`).pseudocodigo.replace(/\n$/, "").split("\n");
  const nome = linhas[0].match(/procedimento\s+(\S+?)\(/)[1];
  return linhas.map((l) => {
    const t = l.trim();
    if (/^(se|enquanto|senão se) /.test(t)) return "decisao";
    if (/^para /.test(t)) return "laco";
    if (t.startsWith(nome + "(") || t.startsWith("procedimento")) return "chamada";
    return "passo";
  });
}

function confereLinhas(pasta, eventos) {
  const tl = tipos(pasta);
  const esperado = { compara: "decisao", troca: "passo", escreve: "passo", pivo: "passo", entra: "chamada",
    menor: "passo", dist: "passo", rotulo: ["decisao", "passo"], volta: "decisao", centros: "passo", testa: "decisao", pare: "passo",
    achou: "passo", devolva: "passo", meio: "passo", corta: "passo", le: "laco", empilha: "passo", desempilha: "passo",
    erro: "passo", enfileira: "passo", maior: "passo", chama: "passo", direto: "passo", atende: "passo",
    atribui: "passo", sai: "chamada", visita: "passo", olha: ["laco", "passo"], topo: "passo", avanca: "passo" };   // o retorno volta à linha da chamada; rótulo: o teste "≠" ou a troca
  let erros = 0;
  for (const e of eventos) {
    if (e.linha === undefined) continue;
    const t = tl[e.linha - 1];
    if (![].concat(esperado[e.t]).includes(t)) {
      if (erros++ < 3) console.log(`  ✗ ${pasta}: evento ${e.t} na linha ${e.linha} (${t})`);
    }
  }
  if (erros) falhas++;
  return erros === 0;
}

// o painel de variáveis do palco: cada evento leva os escalares da vez, na
// convenção do pseudocódigo (índices a partir de 1); eles têm de bater com
// os índices do próprio evento e com o vetor naquele instante
function confereVars(pasta, vetor, eventos) {
  const v = vetor ? vetor.slice() : null;
  const regra = {
    bolha: (e) => e.t !== "compara" || (e.vars.i === e.i + 1 && e.vars["v[i]"] === v[e.i] && e.vars["v[i + 1]"] === v[e.j]),
    insercao: (e) => e.t !== "compara" || (e.vars.j === e.j + 1 && e.vars["v[j − 1]"] === v[e.i] && e.vars["v[j]"] === v[e.j]),
    intercalacao: (e) => (e.t !== "compara" || (e.vars.i === e.i + 1 && e.vars.j === e.j + 1)) && (e.t !== "entra" || (e.vars.a === e.a + 1 && e.vars.b === e.b))
      && (e.t !== "escreve" || e.vars.k === e.k + 1),
    rapida: (e) => (e.t !== "compara" || (e.vars.j === e.j + 1 && e.vars["pivô"] === v[e.i])) && (e.t !== "entra" || (e.vars.a === e.a + 1 && e.vars.b === e.b))
      && (e.t !== "troca" || e.linha !== 7 || (e.vars.i === e.i + 1 && e.vars.j === e.j + 1)),
    selecao: (e) => (e.t !== "compara" || (e.vars.m === e.i + 1 && e.vars.j === e.j + 1 && e.vars["v[m]"] === v[e.i] && e.vars["v[j]"] === v[e.j]))
      && (e.t !== "menor" || e.vars.m === e.m + 1),
    sequencial: (e) => (e.t !== "compara" || (e.vars.i === e.i + 1 && e.vars["v[i]"] === v[e.i])) && (e.t !== "achou" || e.vars.achou === e.i + 1),
    binaria: (e) => (e.t !== "compara" || (e.vars.m === e.i + 1 && e.vars["v[m]"] === v[e.i])) && (e.t !== "meio" || e.vars.m === e.m + 1)
      && (e.t !== "corta" || (e.vars.a === e.a + 1 && e.vars.b === e.b + 1)) && (e.t !== "achou" || e.vars.achou === e.i + 1),
    parenteses: (e) => (e.t !== "le" || e.vars.s === e.s) && (e.t !== "desempilha" || e.vars.topo === e.s)
      && (e.t !== "compara" || (e.vars.topo === e.topo && e.vars.s === e.s)) && (e.t !== "erro" || e.vars.certo === false),
    atendimento: (e) => (e.t !== "enfileira" || (e.vars.i === e.i + 1 && e.vars["tamanho da fila"] === e.casas.filter((x) => x !== null).length))
      && (e.t !== "chama" && e.t !== "direto" || e.vars.k === e.k + 1)
      && (e.t !== "atende" || (e.vars.k === e.k + 1 && e.vars["início"] === e.inicio && e.vars.livre === e.fim)),
    largura: (e) => (e.t !== "visita" || (e.vars.u === e.u + 1 && e.vars["v"] === null)) && (e.t !== "olha" || (e.vars.u === e.u + 1 && e.vars.v === e.v + 1))
      && (e.t !== "atribui" || e.v === undefined || e.vars["dist[v]"] === e.d) && (e.t !== "enfileira" || e.vars["tamanho da fila"] >= 1),
    profundidade: (e) => (e.t !== "topo" || e.vars.u === e.u + 1) && (e.t !== "olha" || (e.vars.u === e.u + 1 && e.vars.v === e.v + 1 && e.vars["próximo[u]"] <= e.vars["grau(u)"]))
      && (e.t !== "atribui" || e.v === undefined || (e.vars.k === e.k && e.vars["ordem[v]"] === e.k)) && (e.t !== "desempilha" || e.vars.u === e.u + 1),
    kmeans: (e) => e.t !== "dist" || (e.vars.i === e.i + 1 && e.vars.j === e.j + 1 && e.vars[e.linha === 7 ? "menor" : "d"] === e.x),
  }[pasta];
  let erros = 0;
  const abertas = [];
  for (const e of eventos) {
    if (e.t === "entra") abertas.push(e.chamada);
    if (e.t === "sai") { abertas.pop(); if (e.nivel !== abertas.length || e.chamada !== (abertas.at(-1) ?? 0)) { if (erros++ < 3) console.log(`  ✗ ${pasta}: retorno no nível ${e.nivel}, chamada ${e.chamada}`); } }
    // escalares: número, booleano, null ou um símbolo (os parênteses mostram o caractere lido)
    const escalares = e.vars && Object.values(e.vars).every((x) => x === null || typeof x === "number" || typeof x === "boolean" || (typeof x === "string" && x.length === 1));
    if (!escalares || !regra(e)) { if (erros++ < 3) console.log(`  ✗ ${pasta}: variáveis do evento ${e.t} ${JSON.stringify(e.vars)}`); }
    if (v && e.t === "troca") { const x = v[e.i]; v[e.i] = v[e.j]; v[e.j] = x; }
    if (v && e.t === "escreve" && e.onde === "v") v[e.k] = e.x;
  }
  if (erros) falhas++;
  return erros === 0;
}

for (const pasta of ["bolha", "insercao", "selecao", "intercalacao", "rapida"]) {
  const d = ler(`algoritmos/${pasta}/dados.json`);
  const casos = [{ nome: "vídeo", vetor: d.exemplo.vetor, comparacoes: d.exemplo.ops, movimentos: d.exemplo.movimentos, pico: d.memoria.pico },
    ...d.conferir.map((c, i) => ({ nome: `conferir ${i + 1}`, ...c }))];
  let ok = true;
  for (const c of casos) {
    const r = A.ordenar(pasta, c.vetor);
    ok = confere(`${pasta} ${c.nome} comparações`, r.comparacoes, c.comparacoes) && ok;
    ok = confere(`${pasta} ${c.nome} movimentos`, r.movimentos, c.movimentos) && ok;
    if (c.pico !== undefined) ok = confere(`${pasta} ${c.nome} pico`, r.pico, c.pico) && ok;
  }
  ok = confereLinhas(pasta, A.ordenar(pasta, d.exemplo.vetor).eventos) && ok;
  for (const c of casos) ok = confereVars(pasta, c.vetor, A.ordenar(pasta, c.vetor).eventos) && ok;
  console.log(`${ok ? "ok" : "FALHOU"}: ${pasta} (${casos.length} vetores)`);
}

{
  const d = ler("algoritmos/kmeans/dados.json");
  const ex = d.exemplo;
  const r = A.kmeans(ex.pontos, ex.iniciais.map((i) => ex.pontos[i]));
  let ok = confere("kmeans voltas", r.voltas, ex.i);
  ok = confere("kmeans distâncias", r.distancias, ex.ops) && ok;
  ok = confere("kmeans rótulos", r.rotulos, ex.final.rotulos) && ok;
  const dif = Math.max(...r.centros.flatMap((q, j) => q.map((x, c) => Math.abs(x - ex.final.centros[j][c]))));
  ok = confere("kmeans centros (diferença < 1e-12)", dif < 1e-12, true) && ok;
  ok = confere("kmeans pico", r.pico, d.memoria.pico) && ok;
  ok = confereLinhas("kmeans", r.eventos) && ok;
  ok = confereVars("kmeans", null, r.eventos) && ok;
  console.log(`${ok ? "ok" : "FALHOU"}: kmeans`);
}

// ---------- buscas, parênteses e fila de atendimento ----------

for (const pasta of ["sequencial", "binaria"]) {
  const d = ler(`algoritmos/${pasta}/dados.json`), ex = d.exemplo;
  const casos = [{ caso: "encarte", vetor: ex.vetor, alvo: ex.alvo, posicao: ex.posicao, comparacoes: ex.ops }, ...d.conferir];
  let ok = true;
  for (const c of casos) {
    const r = A.buscar(pasta, c.vetor, c.alvo);
    ok = confere(`${pasta} ${c.caso} alvo ${c.alvo}`, { posicao: r.posicao, comparacoes: r.comparacoes }, { posicao: c.posicao, comparacoes: c.comparacoes }) && ok;
  }
  ok = confere(`${pasta} pico`, A.buscar(pasta, ex.vetor, ex.alvo).pico, d.memoria.pico) && ok;
  for (const c of casos) ok = confereLinhas(pasta, A.buscar(pasta, c.vetor, c.alvo).eventos) && ok;
  for (const c of casos) ok = confereVars(pasta, c.vetor, A.buscar(pasta, c.vetor, c.alvo).eventos) && ok;
  console.log(`${ok ? "ok" : "FALHOU"}: ${pasta} (${casos.length} buscas)`);
}

{
  const d = ler("algoritmos/parenteses/dados.json"), ex = d.exemplo;
  const medidas = (r) => ({ certo: r.certo, ops: r.ops, comparacoes: r.comparacoes, pico: r.pico, casas: r.casas });
  const casos = [{ caso: "encarte", texto: ex.texto, certo: ex.certo, ops: ex.ops, comparacoes: ex.comparacoes, pico: d.memoria.pico, casas: ex.casas }, ...d.conferir];
  let ok = true;
  for (const c of casos) ok = confere(`parenteses ${c.caso} ${c.texto}`, medidas(A.parenteses(c.texto)), medidas(c)) && ok;
  for (const c of casos) ok = confereLinhas("parenteses", A.parenteses(c.texto).eventos) && ok;
  for (const c of casos) ok = confereVars("parenteses", null, A.parenteses(c.texto).eventos) && ok;
  console.log(`${ok ? "ok" : "FALHOU"}: parenteses (${casos.length} textos)`);
}

{
  const d = ler("algoritmos/atendimento/dados.json"), ex = d.exemplo;
  const medidas = (r) => ({ soma: r.soma, maior: r.maior, esperas: r.esperas, ops: r.ops, pico: r.pico, casas: r.casas });
  const casos = [{ movimento: "encarte", ...ex, pico: d.memoria.pico }, ...d.conferir];
  let ok = true;
  for (const c of casos) ok = confere(`atendimento ${c.movimento}`, medidas(A.atendimento(c.chegada, c.duracao)), medidas(c)) && ok;
  for (const c of casos) ok = confereLinhas("atendimento", A.atendimento(c.chegada, c.duracao).eventos) && ok;
  for (const c of casos) ok = confereVars("atendimento", null, A.atendimento(c.chegada, c.duracao).eventos) && ok;
  console.log(`${ok ? "ok" : "FALHOU"}: atendimento (${casos.length} sorteios)`);
}

for (const pasta of ["largura", "profundidade"]) {
  const d = ler(`algoritmos/${pasta}/dados.json`), ex = d.exemplo;
  const res = pasta === "largura" ? "dist" : "ordem";
  const medidas = (r) => ({ visitas: r.visitas, [res]: r[res], ops: r.ops, estrutura: r.estrutura, casas: r.casas });
  const casos = [{ ...ex, caso: "encarte" }, ...d.conferir];
  let ok = confere(`${pasta} pico`, A[pasta](ex.k * ex.k, ex.arestas).pico, d.memoria.pico);
  for (const c of casos) ok = confere(`${pasta} ${c.caso} k=${c.k}`, medidas(A[pasta](c.k * c.k, c.arestas)), medidas(c)) && ok;
  for (const c of casos) ok = confereLinhas(pasta, A[pasta](c.k * c.k, c.arestas).eventos) && ok;
  for (const c of casos) ok = confereVars(pasta, null, A[pasta](c.k * c.k, c.arestas).eventos) && ok;
  console.log(`${ok ? "ok" : "FALHOU"}: ${pasta} (${casos.length} grafos)`);
}

// os geradores de entrada do palco (o menu "sortear"): cada caso tem de dar o que promete
{
  let ok = true;
  const mov = ler("algoritmos/atendimento/dados.json").exemplo.movimentos;
  for (let semente = 1; semente <= 60; semente++) {
    for (const n of [8, 12, 16, 24, 32, 40, 48, 64]) {
      for (const alg of ["sequencial", "binaria"]) {
        const pos = (caso) => { const e = A.entradaBusca(n, alg === "binaria", caso, semente); return A.buscar(alg, e.vetor, e.alvo).posicao; };
        ok = confere(`entrada ${alg} n=${n} s=${semente}`, [pos("comeco"), pos("fim"), pos("ausente"), pos("sorteado") >= 0], [0, n - 1, -1, true]) && ok;
      }
      const certo = (caso) => A.parenteses(A.textoParenteses(n, caso, semente)).certo;
      ok = confere(`texto n=${n} s=${semente}`, ["balanceada", "par_errado", "sobra_aberto", "so_abre"].map(certo), [true, false, false, false]) && ok;
      for (const [m, lim] of Object.entries(mov)) {
        const { chegada, duracao } = A.clientes(n, lim, semente);
        const dentro = (x, [a, b]) => x >= a && x <= b;
        const intervalos = chegada.every((c, k) => dentro(c - (k ? chegada[k - 1] : 0), lim.chegada));
        ok = confere(`clientes ${m} n=${n} s=${semente}`, [chegada.length, intervalos, duracao.every((d) => dentro(d, lim.atendimento))], [n, true, true]) && ok;
      }
    }
  }
  // grafos: o número de arestas de cada caso e o sorteado conexo (a busca visita todos)
  for (let semente = 1; semente <= 60; semente++) {
    for (const k of [3, 4, 5, 6, 7]) {
      const V = k * k, E = (caso) => A.grafoGrade(k, caso, semente).length;
      const visitou = A.largura(V, A.grafoGrade(k, "sorteado", semente)).visitas.length;
      ok = confere(`grafo k=${k} s=${semente}`, [E("grade"), E("caminho"), E("sorteado") >= V - 1, visitou], [2 * k * (k - 1), V - 1, true, V]) && ok;
    }
  }
  console.log(`${ok ? "ok" : "FALHOU"}: geradores de entrada do palco`);
}

// ---------- instrumentos ----------

const INSTRUMENTOS = readdirSync(join(RAIZ, "instrumentos"), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
if (!INSTRUMENTOS.length) { console.log("nenhum instrumento em instrumentos/"); process.exit(1); }
for (const pasta of INSTRUMENTOS) {
  const d = ler(`instrumentos/${pasta}/dados.json`);
  const custo = (r) => ({ leituras: r.leituras, escritas: r.escritas });
  let ok = true, casos = 0;
  for (const [id, o] of Object.entries(d.operacoes)) {
    for (const t of [...o.tabela, ...o.serie]) {
      casos++;
      let obtido;
      if (o.seguidas) {
        const e = I.montar(o.estrutura, d.encher, 0);
        let soma = { leituras: 0, escritas: 0 }, pior = null;
        for (let i = 0; i < t.n; i++) {
          const r = I.operar(e, o.chamada, [i]);
          soma = { leituras: soma.leituras + r.leituras, escritas: soma.escritas + r.escritas };
          if (!pior || r.leituras + r.escritas > pior.leituras + pior.escritas) pior = { k: i + 1, ...custo(r) };
        }
        obtido = o.seguidas === "pior" ? { n: t.n, ...pior } : { n: t.n, vezes: t.n, ...soma };
      } else {
        const e = I.montar(o.estrutura, d.encher, o.vazia ? 0 : t.n);   // as montagens partem da estrutura vazia
        obtido = { n: t.n, args: t.args, ...(o.vazia ? { vezes: t.n } : {}), ...custo(I.operar(e, o.chamada, t.args)) };
      }
      ok = confere(`${pasta} ${id} n=${t.n}`, obtido, t) && ok;
    }
  }
  for (const [v, serie] of Object.entries(d.capacidade)) {
    for (const t of serie) { casos++; ok = confere(`${pasta} ${v} capacidade n=${t.n}`, I.montar(v, d.encher, t.n).capacidade, t.casas) && ok; }
  }
  for (const c of d.conferir) {
    casos++;
    const e = I.montar(c.estrutura, d.encher, c.inicio ?? 0);
    const passos = c.passos.map((p) => ({ chamada: p.chamada, args: p.args, ...((r) => ({ volta: r.volta, ...custo(r) }))(I.operar(e, p.chamada, p.args)) }));
    ok = confere(`${pasta} ${c.estrutura} sequência ${c.semente}`, { passos, valores: e.valores(), casas: e.capacidade },
      { passos: c.passos, valores: c.valores, casas: c.casas }) && ok;
  }
  console.log(`${ok ? "ok" : "FALHOU"}: ${pasta} (${casos} medidas)`);
}

// a pilha de recursão que a página do instrumento repassa: o pico é o da faixa
for (const pasta of ["intercalacao", "rapida"]) {
  const d = ler(`algoritmos/${pasta}/dados.json`);
  const r = A.ordenar(pasta, d.exemplo.vetor);
  const p = I.Pilha();
  let pico = 0;
  for (const e of r.eventos) {
    if (e.t === "entra") I.operar(p, "empilhar", [[e.a, e.b]]);
    else if (e.t === "sai") I.operar(p, "desempilhar");
    pico = Math.max(pico, p.n);
  }
  const ok = confere(`${pasta} pico da pilha de chamadas`, pico, d.memoria.detalhe.pilha) && confere(`${pasta} pilha vazia no fim`, p.n, 0);
  console.log(`${ok ? "ok" : "FALHOU"}: pilha de chamadas de ${pasta}`);
}

if (falhas) { console.log(`${falhas} divergência(s) entre JS e Python`); process.exit(1); }
console.log("JS e Python contam igual.");
