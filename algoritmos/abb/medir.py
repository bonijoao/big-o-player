"""Mede a busca em árvore e grava dados.json. Rodar: python3 algoritmos/abb/medir.py

Monta a árvore comum com os n valores na ordem de chegada (fora da conta) e
busca cada um deles, na mesma ordem. Tempo: comparações (até duas por nó:
igual? menor?), em média por busca e na mais cara. Memória: as 3n casas da
árvore (a busca em si só guarda o nó da vez)."""
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
import abb  # noqa: E402

N_VIDEO, SEMENTE_VIDEO, CASO_VIDEO = 15, 7, "embaralhada"
TAMANHOS = [15, 31, 63, 127, 255, 511, 1023]
SEMENTES = range(1, 11)


def rodar(vals, alvos=None, c=None):
    """Monta com `vals` e busca cada alvo (os próprios valores, se não vier nenhum)."""
    c = c or Contador()
    a = arvores.montar(vals, c)
    c.ocupa("arvore", a.capacidade)
    comps, achou = [], []
    for x in vals if alvos is None else alvos:
        antes = c.ops.get("comparacoes", 0)
        achou.append(abb.buscar(a, x, c))
        comps.append(c.ops.get("comparacoes", 0) - antes)
    ops = c.ops.get("comparacoes", 0)
    return {"comparacoes": comps, "achou": achou, "ops": ops, "altura": a.altura(), "pico": c.pico,
            "casas": c.ops.get("leituras", 0)}


def varios(n, caso):
    sementes = SEMENTES if caso == "embaralhada" else [1]
    rs = [rodar(arvores.valores(n, caso, random.Random(s))) for s in sementes]
    medias = [x["ops"] / n for x in rs]
    alts = [x["altura"] for x in rs]
    return {"media": statistics.mean(medias), "min": min(medias), "max": max(medias),
            "pior": max(max(x["comparacoes"]) for x in rs), "altura": statistics.mean(alts), "altura_min": min(alts), "altura_max": max(alts)}


if __name__ == "__main__":
    vals = arvores.valores(N_VIDEO, CASO_VIDEO, random.Random(SEMENTE_VIDEO))
    c = Contador()
    r = rodar(vals, c=c)
    assert all(r["achou"])

    crescimento = [{"n": n, **{caso: varios(n, caso) for caso in ["crescente", "embaralhada"]}} for n in TAMANHOS]

    conferir = []
    for n in [0, 1, 2, 3, 7, 15, 20]:
        for caso in arvores.CASOS:
            for s in ([1, 2, 3] if caso == "embaralhada" else [1]):
                rr = random.Random(100 * n + s)
                v = arvores.valores(n, caso, rr)
                alvos = v + [rr.randrange(0, 1000) for _ in range(3)]   # e uns que quase sempre não estão
                conferir.append({"caso": caso, "valores": v, "alvos": alvos, **rodar(v, alvos)})

    dados = {
        "exemplo": {
            "dados": f"{N_VIDEO} valores distintos de 10 a 99, embaralhados com a semente {SEMENTE_VIDEO}, postos numa árvore de busca comum e depois buscados um por um",
            "n": N_VIDEO, "semente": SEMENTE_VIDEO, "caso": CASO_VIDEO, "valores": vals,
            "comparacoes": r["comparacoes"], "ops": r["ops"], "altura": r["altura"], "pior": max(r["comparacoes"]), "casas": r["casas"],
        },
        "tempo": {
            "unidade": "comparações",
            "tipo": "abb",
            "series": [{"caso": "crescente", "nome": "em ordem crescente"}, {"caso": "embaralhada", "nome": "embaralhada (média)"}],
            "banda": "embaralhada",
            "crescimento": crescimento,
            "eixo": "n (valores na árvore; quase dobra a cada passo)",
            "refs": ["n", "log₂ n"],
            "refs_altura": ["n", "log₂ n"],
            "altura": True,
            "crescimento_dados": f"média de {len(SEMENTES)} árvores embaralhadas por tamanho (em ordem: uma árvore, sempre a mesma)",
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(abb.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"abb: {vals} → {r['comparacoes']} = {r['ops']} comparações, altura {r['altura']}, memória {dados['memoria']}, M={dados['ciclomatica']['M']}")
    for g in crescimento:
        print(f"  n={g['n']:5d} " + "  ".join(f"{caso}: {g[caso]['media']:.1f}/busca, pior {g[caso]['pior']}, h {g[caso]['altura']:.1f}" for caso in ["crescente", "embaralhada"]))
