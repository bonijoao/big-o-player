"""Mede o Welford (e as duas contas com que ele é comparado) e grava dados.json.

O erro de cada conta é medido contra a variância exata dos mesmos números,
calculada em frações (fractions.Fraction), sem arredondamento nenhum.
Nada na página é digitado à mão: tudo sai daqui.
Rodar da raiz do projeto: python3 algoritmos/welford/medir.py
"""
import csv
import json
import os
import random
import sys
from fractions import Fraction

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import welford  # noqa: E402

MENU = [0, 10 ** 6, 10 ** 8, 10 ** 9]              # os deslocamentos do palco
ERRO = [10 ** e for e in range(0, 11)]             # o gráfico do erro: de 1 a 10¹⁰
TAMANHOS = [16, 32, 64, 128, 256, 512, 1024]
CASOS = list(welford.FORMULAS)
NOMES = {"welford": "Welford", "soma": "soma dos quadrados", "duas": "duas passadas"}


def lakehuron():
    with open(os.path.join(AQUI, "lakehuron.csv")) as f:
        linhas = list(csv.DictReader(f))
    return [int(l["ano"]) for l in linhas], [float(l["nivel"]) for l in linhas]


def exata(x):
    """Variância amostral exata dos números em ponto flutuante dados."""
    q = [Fraction(v) for v in x]
    m = sum(q) / len(q)
    return sum((v - m) ** 2 for v in q) / (len(q) - 1)


def rodar(x, gravar=False):
    """As três contas sobre x: média, variância, leituras e pico de cada uma."""
    out, cw = {}, None
    for nome, f in welford.FORMULAS.items():
        c = Contador()
        c.gravar = gravar and nome == "welford"
        media, var = f(x, c)
        out[nome] = {"media": media, "variancia": var, "ops": c.ops["leituras"], "pico": c.pico}
        if nome == "welford":
            cw = c
    return out, cw


def erro_relativo(var, certa):
    return float(abs(Fraction(var) - certa) / certa)


if __name__ == "__main__":
    anos, x = lakehuron()
    n = len(x)
    r, c = rodar(x, gravar=True)

    menu = []
    for d in MENU:
        y = [v + d for v in x]
        rr, _ = rodar(y)
        certa = exata(y)
        menu.append({"deslocamento": d, "exata": float(certa),
                     **{k: {"media": rr[k]["media"], "variancia": rr[k]["variancia"],
                            "erro": erro_relativo(rr[k]["variancia"], certa)} for k in CASOS}})

    erro = {"deslocamentos": ERRO, **{k: [] for k in CASOS}}
    for d in ERRO:
        y = [v + d for v in x]
        rr, _ = rodar(y)
        certa = exata(y)
        for k in CASOS:
            erro[k].append(erro_relativo(rr[k]["variancia"], certa))

    crescimento = []
    for tam in TAMANHOS:
        g = random.Random(tam)
        rr, _ = rodar([g.gauss(579, 1.3) for _ in range(tam)])
        crescimento.append({"n": tam, **{k: {"ops": rr[k]["ops"], "pico": rr[k]["pico"]} for k in CASOS}})

    # o que o R refaz: o LakeHuron com os deslocamentos do menu e normais sorteadas
    conferir = [{"caso": f"LakeHuron + {d}", "x": [v + d for v in x]} for d in MENU]
    for s in range(1, 4):
        g = random.Random(s)
        conferir.append({"caso": f"normal sorteada {s}", "x": [g.gauss(100 * s, s) for _ in range(50 * s)]})
    for q in conferir:
        rr, _ = rodar(q["x"])
        q.update({k: [rr[k]["media"], rr[k]["variancia"]] for k in CASOS})

    dados = {
        "exemplo": {
            "dados": f"LakeHuron (R), nível do lago Huron, pés, {anos[0]}–{anos[-1]}",
            "n": n, "anos": anos, "x": x, "media": r["welford"]["media"], "variancia": r["welford"]["variancia"],
            "menu": menu, "ops": r["welford"]["ops"], "eventos": c.eventos,
        },
        "tempo": {
            "unidade": "leituras",
            "tipo": "welford",
            "series": [{"caso": k, "nome": NOMES[k]} for k in CASOS],
            "crescimento": crescimento,
            "eixo": "n (valores; dobra a cada passo)",
            "refs": [],
            "crescimento_dados": "normais sorteadas; as leituras não dependem dos valores",
            "erro": erro,
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(welford.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"welford: LakeHuron n={n} → média {r['welford']['media']:.6f}, variância {r['welford']['variancia']:.10f}, "
          f"{r['welford']['ops']} leituras, pico {c.pico}, M={dados['ciclomatica']['M']}")
    for m in menu:
        print(f"  +{m['deslocamento']:<10d} exata {m['exata']:.10f}  " + "  ".join(f"{k} {m[k]['variancia']:.6g} ({m[k]['erro']:.1e})" for k in CASOS))
    for g in crescimento:
        print(f"  n={g['n']:5d} " + "  ".join(f"{k} {g[k]['ops']}/{g[k]['pico']}" for k in CASOS))
