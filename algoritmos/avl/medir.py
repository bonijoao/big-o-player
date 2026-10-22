"""Mede a AVL e grava dados.json. Rodar: python3 algoritmos/avl/medir.py

Insere os n valores, um por um, na ordem de chegada. Tempo: comparações na
descida (até duas por nó: igual? menor?), em média por inserção; as rotações
ficam no detalhe. Para comparar, a árvore comum recebe os mesmos valores e
conta as mesmas comparações. Memória: as 4n casas da árvore (o nó novo já
conta) mais a pilha da recursão, que desce a altura + 1 níveis."""
import json
import os
import random
import statistics
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor"), os.path.join(AQUI, "..", "..", "instrumentos", "arvore")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
from arvore import ArvoreAVL, ArvoreComum  # noqa: E402
import arvores  # noqa: E402
import avl  # noqa: E402

sys.setrecursionlimit(10000)
N_VIDEO, SEMENTE_VIDEO, CASO_VIDEO = 15, 7, "crescente"
TAMANHOS = [15, 31, 63, 127, 255, 511, 1023]
SEMENTES = range(1, 11)


def rodar(vals, c=None):
    c = c or Contador()
    a = ArvoreAVL(c)
    comps = []
    for x in vals:
        c.ocupa("arvore", 4 * (a.n + 1))      # o nó novo já conta
        antes = c.ops.get("comparacoes", 0)
        a.raiz = avl.inserir(a, a.raiz, x, c)
        a.n += 1
        comps.append(c.ops.get("comparacoes", 0) - antes)
    cc = Contador()
    b = ArvoreComum(cc)
    for x in vals:
        avl.inserir_comum(b, x, cc)
    assert a.valores() == sorted(vals) == b.valores()
    return {"comparacoes": comps, "ops": c.ops.get("comparacoes", 0), "rotacoes": c.ops.get("rotacoes", 0),
            "altura": a.altura(), "comum": cc.ops.get("comparacoes", 0), "altura_comum": b.altura(),
            "casas": c.ops.get("leituras", 0) + c.ops.get("escritas", 0), "pico": c.pico, "valores_finais": a.valores()}


def varios(n, caso):
    sementes = SEMENTES if caso == "embaralhada" else [1]
    rs = [rodar(arvores.valores(n, caso, random.Random(s))) for s in sementes]
    serie = lambda chave, alt: {  # noqa: E731
        "media": statistics.mean(x[chave] / n for x in rs), "min": min(x[chave] / n for x in rs), "max": max(x[chave] / n for x in rs),
        "altura": statistics.mean(x[alt] for x in rs)}
    return {"avl": {**serie("ops", "altura"), "rotacoes": statistics.mean(x["rotacoes"] for x in rs)}, "comum": serie("comum", "altura_comum")}


if __name__ == "__main__":
    vals = arvores.valores(N_VIDEO, CASO_VIDEO, random.Random(SEMENTE_VIDEO))
    c = Contador()
    r = rodar(vals, c)

    crescimento = []
    for n in TAMANHOS:
        g = {"n": n}
        for caso in ["crescente", "embaralhada"]:
            v = varios(n, caso)
            g[f"avl_{caso}"], g[f"comum_{caso}"] = v["avl"], v["comum"]
        crescimento.append(g)

    conferir = []
    for n in [0, 1, 2, 3, 7, 15, 20, 40]:
        for caso in arvores.CASOS:
            for s in ([1, 2, 3] if caso == "embaralhada" else [1]):
                v = arvores.valores(n, caso, random.Random(100 * n + s))
                rr = rodar(v)
                rr.pop("valores_finais")
                conferir.append({"caso": caso, "valores": v, **rr})

    r.pop("valores_finais")
    dados = {
        "exemplo": {
            "dados": f"{N_VIDEO} valores distintos de 10 a 99, sorteados com a semente {SEMENTE_VIDEO} e inseridos em ordem crescente numa AVL",
            "n": N_VIDEO, "semente": SEMENTE_VIDEO, "caso": CASO_VIDEO, "valores": vals, **r,
        },
        "tempo": {
            "unidade": "comparações",
            "tipo": "avl",
            "series": [{"caso": "avl_crescente", "nome": "AVL, em ordem crescente"}, {"caso": "avl_embaralhada", "nome": "AVL, embaralhada (média)"},
                       {"caso": "comum_crescente", "nome": "comum, em ordem crescente"}, {"caso": "comum_embaralhada", "nome": "comum, embaralhada (média)"}],
            "banda": "avl_embaralhada",
            "crescimento": crescimento,
            "eixo": "n (valores inseridos; quase dobra a cada passo)",
            "refs": ["n", "log₂ n"],
            "refs_altura": ["n", "log₂ n"],
            "altura": True,
            "crescimento_dados": f"média de {len(SEMENTES)} entradas embaralhadas por tamanho (em ordem: uma entrada, sempre a mesma)",
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(avl.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"avl: {vals} → {r['ops']} comparações, {r['rotacoes']} rotações, altura {r['altura']} (comum: {r['comum']}, altura {r['altura_comum']}), "
          f"memória {dados['memoria']}, M={dados['ciclomatica']['M']}")
    for g in crescimento:
        print(f"  n={g['n']:5d} " + "  ".join(f"{k}: {g[k]['media']:.1f}/ins h {g[k]['altura']:.1f}" for k in g if k != "n"))
