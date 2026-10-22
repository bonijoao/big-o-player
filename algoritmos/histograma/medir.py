"""Mede o histograma e grava dados.json.

Nada na página é digitado à mão: tudo sai daqui.
Rodar da raiz do projeto: python3 algoritmos/histograma/medir.py
"""
import csv
import json
import os
import random
import statistics
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import histograma as hg  # noqa: E402

TAMANHOS = [16, 32, 64, 128, 256, 512, 1024, 2048, 4096]
SEMENTES = range(1, 11)
DISTRIBUICAO = range(1, 201)
CASOS = ["normal", "uniforme", "bimodal"]
NOMES = {"normal": "normal", "uniforme": "uniforme", "bimodal": "bimodal"}
# os sorteios, com uma casa decimal (como uma medida de verdade): muitos valores caem em cima de um limite
FORMAS = {"normal": "normal (média 50, dp 10)", "uniforme": "uniforme de 0 a 100", "bimodal": "metade normal (35, 6), metade normal (65, 6)"}


def sortear(n, forma, r):
    if forma == "normal":
        return [round(r.gauss(50, 10), 1) for _ in range(n)]
    if forma == "uniforme":
        return [round(r.uniform(0, 100), 1) for _ in range(n)]
    return [round(r.gauss(35, 6) if r.random() < 0.5 else r.gauss(65, 6), 1) for _ in range(n)]


def faithful():
    with open(os.path.join(AQUI, "faithful.csv")) as f:
        return [float(l["duracao"]) for l in csv.DictReader(f)]


def rodar(x, gravar=False):
    c = Contador()
    c.gravar = gravar
    contagens, a, h = hg.histograma(x, c)
    if sum(contagens) != len(x):
        raise AssertionError("as contagens não somam n")
    return {"contagens": contagens, "a": a, "h": h, "c": len(contagens), "ops": c.ops["leituras"], "pico": c.pico}, c


def varios(n, forma):
    rs = [rodar(sortear(n, forma, random.Random(s)))[0] for s in SEMENTES]
    ops = [r["ops"] for r in rs]
    return {"media": statistics.mean(ops), "min": min(ops), "max": max(ops), "pico": max(r["pico"] for r in rs)}


if __name__ == "__main__":
    x = faithful()
    r, c = rodar(x, gravar=True)
    n = len(x)

    crescimento = [{"n": tam, **{f: varios(tam, f) for f in CASOS}} for tam in TAMANHOS]
    dist = [rodar(sortear(n, "normal", random.Random(s)))[0]["c"] for s in DISTRIBUICAO]

    conferir = [{"caso": "faithful", "x": x}]
    for s in range(1, 4):
        for f in CASOS:
            conferir.append({"caso": f"{f} {s}", "x": sortear(40 * s * s, f, random.Random(s))})
    for q in conferir:
        rr = rodar(q["x"])[0]
        q.update({k: rr[k] for k in ("contagens", "a", "h", "ops", "pico")})

    menor, maior = min(x), max(x)
    dados = {
        "exemplo": {
            "dados": "faithful (R), duração de 272 erupções do Old Faithful, minutos",
            "n": n, "x": x, "menor": menor, "maior": maior, "sturges": hg.sturges(n),
            "c": r["c"], "a": r["a"], "h": r["h"], "contagens": r["contagens"],
            "formas": FORMAS, "ops": r["ops"], "eventos": c.eventos,
        },
        "tempo": {
            "unidade": "leituras",
            "tipo": "histograma",
            "series": [{"caso": f, "nome": NOMES[f] + " (média)"} for f in CASOS],
            "banda": "normal",
            "crescimento": crescimento,
            "eixo": "n (valores; dobra a cada passo)",
            "refs": ["2n"],
            "refs_memoria": ["log₂ n + 1"],
            "crescimento_dados": f"média de {len(SEMENTES)} sorteios por tamanho",
            "distribuicao": {"n": n, "vezes": len(dist), "valores": dist, "destaque": r["c"]},
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(hg.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"histograma: faithful n={n}, de {menor} a {maior} → {r['c']} classes de {r['h']} a partir de {r['a']} "
          f"(Sturges: {hg.sturges(n)}): {r['contagens']}, {r['ops']} leituras, pico {c.pico}, M={dados['ciclomatica']['M']}")
    for g in crescimento:
        print(f"  n={g['n']:5d} " + "  ".join(f"{f} {g[f]['media']:.0f} ops, até {g[f]['pico']} classes" for f in CASOS))
    print(f"  {len(dist)} normais de n={n}: de {min(dist)} a {max(dist)} classes")
