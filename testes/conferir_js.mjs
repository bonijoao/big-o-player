// O JavaScript do site tem de contar igual ao Python.
// Roda os algoritmos de simulacao/algoritmos.js nos vetores guardados em
// algoritmos/*/dados.json e compara contagens e resultado; confere também
// se cada evento cai numa linha do pseudocódigo do tipo certo.
//   node testes/conferir_js.mjs
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const A = createRequire(import.meta.url)(join(RAIZ, "simulacao", "algoritmos.js"));
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
    dist: "passo", rotulo: ["decisao", "passo"], volta: "decisao", centros: "passo", testa: "decisao", pare: "passo" };   // rótulo: o teste "≠" ou a troca
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
  console.log(`${ok ? "ok" : "FALHOU"}: kmeans`);
}

if (falhas) { console.log(`${falhas} divergência(s) entre JS e Python`); process.exit(1); }
console.log("JS e Python contam igual.");
