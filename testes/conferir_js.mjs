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
    dist: "passo", rotulo: ["decisao", "passo"], volta: "decisao", centros: "passo", testa: "decisao", pare: "passo",
    atribui: "passo", sai: "chamada" };   // o retorno volta à linha da chamada   // rótulo: o teste "≠" ou a troca
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
    kmeans: (e) => e.t !== "dist" || (e.vars.i === e.i + 1 && e.vars.j === e.j + 1 && e.vars[e.linha === 7 ? "menor" : "d"] === e.x),
  }[pasta];
  let erros = 0;
  const abertas = [];
  for (const e of eventos) {
    if (e.t === "entra") abertas.push(e.chamada);
    if (e.t === "sai") { abertas.pop(); if (e.nivel !== abertas.length || e.chamada !== (abertas.at(-1) ?? 0)) { if (erros++ < 3) console.log(`  ✗ ${pasta}: retorno no nível ${e.nivel}, chamada ${e.chamada}`); } }
    const escalares = e.vars && Object.values(e.vars).every((x) => x === null || typeof x === "number" || typeof x === "boolean");
    if (!escalares || !regra(e)) { if (erros++ < 3) console.log(`  ✗ ${pasta}: variáveis do evento ${e.t} ${JSON.stringify(e.vars)}`); }
    if (v && e.t === "troca") { const x = v[e.i]; v[e.i] = v[e.j]; v[e.j] = x; }
    if (v && e.t === "escreve" && e.onde === "v") v[e.k] = e.x;
  }
  if (erros) falhas++;
  return erros === 0;
}

for (const pasta of ["bolha", "insercao", "intercalacao", "rapida"]) {
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
        const e = I.montar(o.estrutura, d.encher, t.n);
        obtido = { n: t.n, args: t.args, ...custo(I.operar(e, o.chamada, t.args)) };
      }
      ok = confere(`${pasta} ${id} n=${t.n}`, obtido, t) && ok;
    }
  }
  for (const [v, serie] of Object.entries(d.capacidade)) {
    for (const t of serie) { casos++; ok = confere(`${pasta} ${v} capacidade n=${t.n}`, I.montar(v, d.encher, t.n).capacidade, t.casas) && ok; }
  }
  for (const c of d.conferir) {
    casos++;
    const e = I.montar(c.estrutura, d.encher, 0);
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
