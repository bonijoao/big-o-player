"""Mede os percursos e grava dados.json. Rodar: python3 algoritmos/percursos/medir.py

Tempo: nós visitados pela descida recursiva (cada um, uma vez). Memória: o
pico da pilha de chamadas (a chamada com p nulo também ocupa um nível) e, na
em largura, o pico da fila. As duas não convivem: uma roda depois da outra."""
import json
import os
import random
import statistics
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import arvores  # noqa: E402
import percursos  # noqa: E402

sys.setrecursionlimit(10000)   # a fila indiana de 1023 nós desce 1024 níveis
N_VIDEO, SEMENTE_VIDEO, CASO_VIDEO = 15, 7, "embaralhada"
TAMANHOS = [15, 31, 63, 127, 255, 511, 1023]   # 2ᵏ − 1: a cheia sai cheia
SEMENTES = range(1, 11)


def rodar(vals, c=None):
    """As três ordens (descida recursiva) e a em largura, com o que cada uma guardou."""
    c = c or Contador()
    a = arvores.montar(vals, c)
    ordens = {"pre": [], "em": [], "pos": []}
    percursos.percorrer(a, a.raiz, ordens, c)
    pilha, casas = c.pico, c.ops.get("leituras", 0)
    c2 = Contador()
    a.conta = c2
    larg = percursos.largura(a, c2)
    a.conta = c
    return {**ordens, "largura": larg, "visitas": c.ops.get("visitas", 0), "pilha": pilha, "fila": c2.pico,
            "casas": casas, "altura": a.altura()}


def varios(n, caso):
    sementes = SEMENTES if caso == "embaralhada" else [1]
    rs = [rodar(arvores.valores(n, caso, random.Random(s))) for s in sementes]
    vis = [x["visitas"] for x in rs]
    return ({"media": statistics.mean(vis), "min": min(vis), "max": max(vis), "pico": max(x["pilha"] for x in rs)},
            max(x["fila"] for x in rs))


if __name__ == "__main__":
    vals = arvores.valores(N_VIDEO, CASO_VIDEO, random.Random(SEMENTE_VIDEO))
    c = Contador()
    r = rodar(vals, c)
    assert r["em"] == sorted(vals) and r["visitas"] == N_VIDEO
    # a memória do encarte: a pilha da descida e, depois, a fila da largura, no mesmo contador
    a = arvores.montar(vals, c)
    percursos.largura(a, c)

    crescimento = []
    for n in TAMANHOS:
        g = {"n": n}
        for caso in ["crescente", "embaralhada", "cheia"]:
            g[caso], fila = varios(n, caso)
            if caso != "embaralhada":
                g[f"fila_{caso}"] = {"pico": fila}
        crescimento.append(g)

    conferir = []
    for n in [0, 1, 2, 3, 7, 15, 20]:
        for caso in arvores.CASOS:
            for s in ([1, 2, 3] if caso == "embaralhada" else [1]):
                v = arvores.valores(n, caso, random.Random(100 * n + s))
                conferir.append({"caso": caso, "valores": v, **rodar(v)})

    dados = {
        "exemplo": {
            "dados": f"{N_VIDEO} valores distintos de 10 a 99, embaralhados com a semente {SEMENTE_VIDEO}, postos numa árvore de busca comum",
            "n": N_VIDEO, "semente": SEMENTE_VIDEO, "caso": CASO_VIDEO, "valores": vals,
            **{k: r[k] for k in ["pre", "em", "pos", "largura", "pilha", "fila", "casas", "altura"]}, "ops": r["visitas"],
        },
        "tempo": {
            "unidade": "nós visitados",
            "tipo": "percursos",
            "series": [{"caso": "crescente", "nome": "pilha, em ordem crescente"},
                       {"caso": "embaralhada", "nome": "pilha, embaralhada (média)"},
                       {"caso": "cheia", "nome": "pilha, cheia"},
                       {"caso": "fila_cheia", "nome": "fila, cheia", "tempo": False},
                       {"caso": "fila_crescente", "nome": "fila, em ordem crescente", "tempo": False}],
            "banda": "embaralhada",
            "crescimento": crescimento,
            "eixo": "n (nós; quase dobra a cada passo)",
            "refs": ["n"],
            "refs_memoria": ["n", "log₂ n"],
            "crescimento_dados": f"média de {len(SEMENTES)} árvores embaralhadas por tamanho (em ordem e cheia: uma árvore, sempre a mesma)",
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(percursos.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"percursos: {vals} → pré {r['pre']}, largura {r['largura']}; pilha {r['pilha']}, fila {r['fila']}, "
          f"altura {r['altura']}, memória {dados['memoria']}, M={dados['ciclomatica']['M']}")
    for g in crescimento:
        print(f"  n={g['n']:5d} pilha: cresc {g['crescente']['pico']}, emb {g['embaralhada']['pico']}, cheia {g['cheia']['pico']}"
              f" | fila: cheia {g['fila_cheia']['pico']}, cresc {g['fila_crescente']['pico']}")
