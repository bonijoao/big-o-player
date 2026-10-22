"""Mede o máximo de um vetor e grava dados.json. Rodar: python3 algoritmos/maximo/medir.py"""
import json
import os
import random
import statistics
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import maximo  # noqa: E402

N_VIDEO, SEMENTE_VIDEO = 24, 7
TAMANHOS = [16, 32, 64, 128, 256, 512, 1024]
SEMENTES = range(1, 101)
CASOS = ["sorteada", "crescente", "decrescente"]
NOMES = {"sorteada": "sorteado (média)", "crescente": "crescente", "decrescente": "decrescente"}
VEZES = 1000                                  # vetores sorteados na distribuição das trocas


def rodar(v, gravar=False):
    c = Contador()
    c.gravar = gravar
    m = maximo.maximo(v, c)
    assert m == max(v)
    return {"maximo": m, "ops": c.ops.get("comparacoes", 0), "trocas": c.ops.get("trocas", 0), "pico": c.pico}, c


def varios(n, caso):
    rs = [rodar(maximo.gerar(n, caso, random.Random(s)))[0] for s in (SEMENTES if caso == "sorteada" else [1])]
    ops, tr = [r["ops"] for r in rs], [r["trocas"] for r in rs]
    return {"media": statistics.mean(ops), "min": min(ops), "max": max(ops), "pico": 0,
            "trocas": statistics.mean(tr), "trocas_min": min(tr), "trocas_max": max(tr)}


if __name__ == "__main__":
    v = maximo.gerar(N_VIDEO, "sorteada", random.Random(SEMENTE_VIDEO))
    r, c = rodar(v, gravar=True)
    crescimento = [{"n": n, **{caso: varios(n, caso) for caso in CASOS}} for n in TAMANHOS]
    dist = [rodar(maximo.gerar(N_VIDEO, "sorteada", random.Random(1000 + s)))[0]["trocas"] for s in range(VEZES)]

    conferir = []
    for s in range(1, 6):
        for caso in CASOS:
            for n in (1, 2, 10, 50):
                vv = maximo.gerar(n, caso, random.Random(s))
                conferir.append({"caso": caso, "vetor": vv, **rodar(vv)[0]})

    dados = {
        "exemplo": {
            "dados": f"{N_VIDEO} valores sorteados de 10 a 99 com a semente {SEMENTE_VIDEO}",
            "n": N_VIDEO, "semente": SEMENTE_VIDEO, "vetor": v, **r, "eventos": c.eventos,
        },
        "tempo": {
            "unidade": "comparações",
            "tipo": "maximo",
            "series": [{"caso": k, "nome": NOMES[k]} for k in CASOS],
            "banda": "sorteada",
            "crescimento": crescimento,
            "eixo": "n (valores; dobra a cada passo)",
            "refs": ["n"],
            "crescimento_dados": f"sorteado: média de {len(SEMENTES)} vetores por tamanho (crescente e decrescente: um vetor)",
            "distribuicao": {"n": N_VIDEO, "vezes": VEZES, "valores": dist, "destaque": r["trocas"],
                             "media": statistics.mean(dist), "harmonico": sum(1 / k for k in range(2, N_VIDEO + 1))},
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(maximo.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"maximo: {v} → {r['maximo']}, {r['ops']} comparações, {r['trocas']} trocas, M={dados['ciclomatica']['M']}")
    print(f"  trocas em {VEZES} vetores de {N_VIDEO}: média {statistics.mean(dist):.3f} (H_n − 1 = {dados['tempo']['distribuicao']['harmonico']:.3f}), de {min(dist)} a {max(dist)}")
    for g in crescimento:
        print(f"  n={g['n']:5d} " + "  ".join(f"{k} {g[k]['media']:.0f} ops, {g[k]['trocas']:.2f} trocas" for k in CASOS))
