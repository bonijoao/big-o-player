"""Mede o Dijkstra e grava dados.json. Rodar: python3 algoritmos/dijkstra/medir.py

Os grafos são as grades k × k das buscas em grafo (motor/grade.py), com um
peso de 1 a 9 sorteado para cada aresta. O tempo conta os acessos a casas: as
lidas e escritas no heap e uma leitura na lista de adjacência por vizinho
olhado. A memória é o vetor dist (V casas) mais o heap no pico."""
import json
import os
import random
import statistics
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import dijkstra  # noqa: E402
import grade  # noqa: E402

K_VIDEO, CASO_VIDEO, SEMENTE_VIDEO = 5, "sorteado", 27   # um grafo do encarte em que alguns pares saem vencidos
CASOS, NOMES = grade.CASOS, grade.NOMES
SEMENTES = range(1, 11)
DISTRIBUICAO = range(1, 201)
K_CONFERIR, SEMENTES_CONFERIR = 6, range(1, 6)


def grafo(k, caso, s):
    """As arestas e os pesos de uma grade do caso pedido, sorteados com a semente s."""
    r = random.Random(s)
    arestas = grade.gerar(k, caso, r)
    return arestas, grade.pesos(arestas, r)


def rodar(k, arestas, ps, gravar=False):
    c = Contador()
    c.gravar = gravar
    g = grade.lista_pesos(k * k, arestas, ps, c)
    dist = dijkstra.dijkstra(g, 0, c)
    V = k * k
    resumo = {"ops": c.ops.get("leituras", 0) + c.ops.get("escritas", 0),
              "operacoes": c.ops.get("inserir", 0) + c.ops.get("tirar", 0),
              "vizinhos": c.ops.get("vizinhos", 0), "descartados": c.ops.get("descartados", 0),
              "pico": c.pico, "estrutura": c.pico - V}
    return [None if d == dijkstra.INF else d for d in dist], c, resumo


def ordem(c):
    """Os vértices na ordem em que saem do heap valendo (os descartados ficam de fora)."""
    saidas, vencidos = [], 0
    for e in c.eventos:
        if e[0] == "tira":
            saidas.append(e[1])
        elif e[0] == "descarta":
            saidas.pop()
            vencidos += 1
    return saidas


def varios(k, caso):
    rs = [rodar(k, *grafo(k, caso, s))[2] for s in SEMENTES]
    ops = [x["ops"] for x in rs]
    return {"media": statistics.mean(ops), "min": min(ops), "max": max(ops), "pico": max(x["estrutura"] for x in rs),
            "arestas": statistics.mean(len(grafo(k, caso, s)[0]) for s in SEMENTES),
            "descartados": statistics.mean(x["descartados"] for x in rs)}


if __name__ == "__main__":
    arestas, ps = grafo(K_VIDEO, CASO_VIDEO, SEMENTE_VIDEO)
    dist, c, r = rodar(K_VIDEO, arestas, ps, gravar=True)

    crescimento = [{"n": k * k, "k": k, **{caso: varios(k, caso) for caso in CASOS}} for k in grade.KS]
    dist_heap = [rodar(K_VIDEO, *grafo(K_VIDEO, CASO_VIDEO, s))[2]["estrutura"] for s in DISTRIBUICAO]

    conferir = []
    for s in SEMENTES_CONFERIR:
        for caso in CASOS:
            a, p = grafo(K_CONFERIR, caso, s)
            dd, cc, resumo = rodar(K_CONFERIR, a, p, gravar=True)
            conferir.append({"caso": caso, "k": K_CONFERIR, "arestas": a, "pesos": p, "dist": dd, "ordem": ordem(cc), **resumo})

    V = K_VIDEO * K_VIDEO
    p0, p1 = grade.PESOS
    dados = {
        "exemplo": {
            "dados": (f"um grafo em grade {K_VIDEO} × {K_VIDEO} sorteado com a semente {SEMENTE_VIDEO}: {V} vértices e "
                      f"{len(arestas)} arestas, cada uma com um peso de {p0} a {p1}"),
            "n": V, "k": K_VIDEO, "semente": SEMENTE_VIDEO, "caso": CASO_VIDEO, "arestas": arestas, "pesos": ps,
            "faixa_pesos": [p0, p1], "dist": dist, "ordem": ordem(c), **r, "eventos": c.eventos,
        },
        "tempo": {
            "unidade": "acessos ao heap e à lista",
            "tipo": "dijkstra",
            "series": [{"caso": caso, "nome": NOMES[caso] + " (média)"} for caso in CASOS],
            "banda": "sorteado",
            "crescimento": crescimento,
            "eixo": "V (vértices de uma grade k × k; quase dobra a cada passo)",
            "refs": ["V log₂ V"],
            "crescimento_dados": f"média de {len(SEMENTES)} sorteios de pesos por tamanho (no sorteado, também das arestas)",
            "distribuicao": {"n": V, "vezes": len(dist_heap), "valores": dist_heap, "destaque": r["estrutura"]},
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(dijkstra.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"dijkstra: {V} vértices, {len(arestas)} arestas → {r}, M={dados['ciclomatica']['M']}")
    for g in crescimento:
        print(f"  V={g['n']:5d} " + "  ".join(f"{caso} {g[caso]['media']:.0f}/heap {g[caso]['pico']}/desc {g[caso]['descartados']:.1f}" for caso in CASOS))
    print(f"  {len(dist_heap)} grafos V={V}: heap de {min(dist_heap)} a {max(dist_heap)}")
