"""Mede achar repetidos (com o dicionário e com o vetor) e grava dados.json. Rodar: python3 algoritmos/repetidos/medir.py"""
import json
import os
import random
import statistics
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import repetidos  # noqa: E402

N_VIDEO, SEMENTE_VIDEO = 16, 10
TAMANHOS = [16, 32, 64, 128, 256, 512, 1024, 2048]
SEMENTES = range(1, 11)
CASOS = ["sorteada", "distintos", "poucos"]


def rodar(v):
    c = Contador()
    rep = repetidos.repetidos(v, c)
    cv = Contador()
    assert repetidos.repetidos_vetor(v, cv) == rep
    return {"repetido": rep, "ops": c.ops.get("comparacoes", 0), "ops_vetor": cv.ops.get("comparacoes", 0), "pico": c.pico,
            "casas": c.ops.get("leituras", 0) + c.ops.get("escritas", 0)}


def varios(n, caso, chave="ops"):
    rs = [rodar(repetidos.gerar(n, caso, random.Random(s))) for s in (SEMENTES if caso != "distintos" or chave == "ops" else [1])]
    x = [r[chave] for r in rs]
    return {"media": statistics.mean(x), "min": min(x), "max": max(x), "pico": max(r["pico"] for r in rs) if chave == "ops" else 0}


if __name__ == "__main__":
    v = repetidos.gerar(N_VIDEO, "sorteada", random.Random(SEMENTE_VIDEO))
    r = rodar(v)
    c = Contador()
    repetidos.repetidos(v, c)

    crescimento = [{"n": n, "sorteada": varios(n, "sorteada"), "distintos": varios(n, "distintos"), "poucos": varios(n, "poucos"),
                    "vetor_sorteada": varios(n, "sorteada", "ops_vetor"), "vetor_distintos": varios(n, "distintos", "ops_vetor")} for n in TAMANHOS]

    conferir = []
    for s in range(1, 6):
        for caso in CASOS:
            for n in [0, 1, 5, 30, 200]:
                vv = repetidos.gerar(n, caso, random.Random(1000 * s + n))
                conferir.append({"caso": caso, "vetor": vv, **rodar(vv)})

    dados = {
        "exemplo": {
            "dados": f"{N_VIDEO} valores sorteados de 10 a 99 com a semente {SEMENTE_VIDEO}",
            "n": N_VIDEO, "semente": SEMENTE_VIDEO, "caso": "sorteada", "vetor": v, **r,
        },
        "tempo": {
            "unidade": "comparações",
            "tipo": "repetidos",
            "series": [{"caso": "sorteada", "nome": "dicionário, sorteados (média)"}, {"caso": "distintos", "nome": "dicionário, distintos"},
                       {"caso": "vetor_sorteada", "nome": "vetor, sorteados", "memoria": False},
                       {"caso": "vetor_distintos", "nome": "vetor, distintos", "memoria": False}],
            "banda": "sorteada",
            "crescimento": crescimento,
            "eixo": "n (valores; dobra a cada passo)",
            "refs": ["n", "n²/2"],
            "refs_memoria": ["n"],
            "crescimento_dados": f"média de {len(SEMENTES)} vetores sorteados por tamanho (de 1 a n, com repetição) e de {len(SEMENTES)} permutações (distintos)",
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(repetidos.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"repetidos: {v} → {sum(r['repetido'])} repetidos, {r['ops']} comparações (vetor {r['ops_vetor']}), pico {r['pico']}, M={dados['ciclomatica']['M']}")
    for g in crescimento:
        print(f"  n={g['n']:5d} " + "  ".join(f"{k} {g[k]['media']:.0f}/p{g[k]['pico']}" for k in ["sorteada", "distintos", "poucos", "vetor_sorteada", "vetor_distintos"]))
