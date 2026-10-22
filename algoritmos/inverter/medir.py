"""Mede a inversão da lista encadeada e grava dados.json. Rodar: python3 algoritmos/inverter/medir.py"""
import json
import os
import random
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import inverter  # noqa: E402

N_VIDEO, SEMENTE_VIDEO = 8, 11
TAMANHOS = [16, 32, 64, 128, 256, 512, 1024]
SEMENTES = range(1, 11)


def rodar(valores):
    c = Contador()
    lista = inverter.montar(valores, c)
    inverter.inverter(lista, c)
    return {"invertida": lista.valores(), "ops": c.ops.get("ponteiros", 0), "pico": c.pico,
            "casas": c.ops.get("leituras", 0) + c.ops.get("escritas", 0)}, c


def varios(n):
    ops = [rodar(inverter.gerar(n, random.Random(s)))[0]["ops"] for s in SEMENTES]
    return {"media": sum(ops) / len(ops), "min": min(ops), "max": max(ops), "pico": 0}


if __name__ == "__main__":
    valores = inverter.gerar(N_VIDEO, random.Random(SEMENTE_VIDEO))
    r, c = rodar(valores)
    assert r["invertida"] == valores[::-1]

    crescimento = [{"n": n, "sorteada": varios(n)} for n in TAMANHOS]
    conferir = []
    for n in [0, 1, 2, 3, 7, 20, 50]:
        for s in range(1, 4):
            v = inverter.gerar(n, random.Random(100 * n + s))
            conferir.append({"valores": v, **rodar(v)[0]})

    dados = {
        "exemplo": {
            "dados": f"uma lista de {N_VIDEO} valores sorteados de 10 a 99, com a semente {SEMENTE_VIDEO}",
            "n": N_VIDEO, "semente": SEMENTE_VIDEO, "valores": valores, **r,
        },
        "tempo": {
            "unidade": "ponteiros trocados",
            "tipo": "inverter",
            "series": [{"caso": "sorteada", "nome": "lista sorteada"}],
            "crescimento": crescimento,
            "eixo": "n (nós; dobra a cada passo)",
            "refs": ["n"],
            "crescimento_dados": f"média de {len(SEMENTES)} listas sorteadas por tamanho",
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(inverter.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"inverter: {valores} → {r['invertida']}, {r['ops']} ponteiros, {r['casas']} casas, M={dados['ciclomatica']['M']}")
    for g in crescimento:
        print(f"  n={g['n']:5d} {g['sorteada']}")
