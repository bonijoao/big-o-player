"""Mede o máximo em janela deslizante (o do deque e o ingênuo) e grava dados.json. Rodar: python3 algoritmos/janela/medir.py"""
import json
import os
import random
import statistics
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import janela  # noqa: E402

N_VIDEO, K_VIDEO, SEMENTE_VIDEO = 16, 4, 11
TAMANHOS = [16, 32, 64, 128, 256, 512, 1024]
K_FIXO = 8                                   # o k do gráfico × n
N_FIXO, KS = 256, [2, 4, 8, 16, 32, 64, 128]  # o n e os k do gráfico × k
SEMENTES = range(1, 11)
CASOS = ["sorteada", "crescente", "decrescente"]
NOMES = {"sorteada": "sorteada", "crescente": "crescente", "decrescente": "decrescente"}


def rodar(v, k, gravar=False):
    c = Contador()
    c.gravar = gravar
    saida = janela.maximos(v, k, c)
    ci = Contador()
    assert janela.ingenuo(v, k, ci) == saida
    return {"maximos": saida, "ops": c.ops.get("comparacoes", 0), "deque": c.ops.get("deque", 0),
            "ingenuo": ci.ops.get("comparacoes", 0), "pico": c.pico,
            "casas": c.ops.get("leituras", 0) + c.ops.get("escritas", 0)}, c


def varios(n, k, caso):
    rs = [rodar(janela.gerar(n, caso, random.Random(s)), k)[0] for s in (SEMENTES if caso == "sorteada" else [1])]
    ops = [r["ops"] for r in rs]
    return {"media": statistics.mean(ops), "min": min(ops), "max": max(ops), "pico": max(r["pico"] for r in rs)}


def ingenuo(n, k):
    r = rodar(janela.gerar(n, "sorteada", random.Random(1)), k)[0]
    return {"media": r["ingenuo"], "min": r["ingenuo"], "max": r["ingenuo"], "pico": 0}


if __name__ == "__main__":
    v = janela.gerar(N_VIDEO, "sorteada", random.Random(SEMENTE_VIDEO))
    r, c = rodar(v, K_VIDEO, gravar=True)

    crescimento = [{"n": n, **{caso: varios(n, K_FIXO, caso) for caso in CASOS}, "ingenuo": ingenuo(n, K_FIXO)} for n in TAMANHOS]
    por_k = [{"n": k, **{caso: varios(N_FIXO, k, caso) for caso in CASOS}, "ingenuo": ingenuo(N_FIXO, k)} for k in KS]

    conferir = []
    for s in range(1, 6):
        for caso in CASOS:
            for n, k in [(30, 1), (30, 3), (30, 7), (30, 30), (5, 5)]:
                vv = janela.gerar(n, caso, random.Random(s))
                conferir.append({"caso": caso, "vetor": vv, "k": k, **rodar(vv, k)[0]})

    dados = {
        "exemplo": {
            "dados": f"{N_VIDEO} valores sorteados de 10 a 99 com a semente {SEMENTE_VIDEO}, janela de k = {K_VIDEO}",
            "n": N_VIDEO, "k": K_VIDEO, "semente": SEMENTE_VIDEO, "caso": "sorteada", "vetor": v, **r, "eventos": c.eventos,
        },
        "tempo": {
            "unidade": "comparações",
            "tipo": "janela",
            "series": [{"caso": "sorteada", "nome": "sorteada (média)"}, {"caso": "crescente", "nome": "crescente"},
                       {"caso": "decrescente", "nome": "decrescente"}, {"caso": "ingenuo", "nome": "ingênuo", "memoria": False}],
            "banda": "sorteada",
            "crescimento": crescimento,
            "eixo": f"n (valores; dobra a cada passo), k = {K_FIXO}",
            "refs": [],
            "crescimento_dados": f"no deque, média de {len(SEMENTES)} vetores sorteados por tamanho (crescente e decrescente: um vetor)",
            "k_fixo": K_FIXO,
            "por_k": por_k,
            "n_fixo": N_FIXO,
            "eixo_k": f"k (tamanho da janela; dobra a cada passo), n = {N_FIXO}",
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(janela.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"janela: {v} k={K_VIDEO} → {r['maximos']}, {r['ops']} comparações (ingênuo {r['ingenuo']}), deque {r['deque']}, pico {r['pico']}, M={dados['ciclomatica']['M']}")
    for nome, serie in [("× n", crescimento), ("× k", por_k)]:
        for g in serie:
            print(f"  {nome} {g['n']:5d} " + "  ".join(f"{c} {g[c]['media']:.1f}/pico {g[c]['pico']}" for c in CASOS + ["ingenuo"]))
