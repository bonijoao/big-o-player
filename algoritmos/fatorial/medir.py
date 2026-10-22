"""Mede o fatorial recursivo e grava dados.json. Rodar: python3 algoritmos/fatorial/medir.py

Os fatoriais passam de 2⁵³ a partir de 19!: vão como texto no dados.json,
para o JavaScript não arredondar."""
import json
import math
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import fatorial  # noqa: E402

N_VIDEO = 10
TAMANHOS = [4, 8, 16, 32, 64, 128, 256]


def rodar(n, gravar=False):
    c = Contador()
    c.gravar = gravar
    f = fatorial.fatorial(n, c)
    assert f == math.factorial(n)
    return {"fatorial": str(f), "ops": c.ops.get("multiplicacoes", 0), "pico": c.pico}, c


if __name__ == "__main__":
    r, c = rodar(N_VIDEO, gravar=True)
    crescimento = [{"n": n, "unico": {k: v for k, v in rodar(n)[0].items() if k != "fatorial"}} for n in TAMANHOS]
    conferir = [{"n": n, **rodar(n)[0]} for n in range(0, 21)]
    dados = {
        "exemplo": {"dados": f"n = {N_VIDEO}", "n": N_VIDEO, **r, "eventos": c.eventos},
        "tempo": {
            "unidade": "multiplicações",
            "tipo": "fatorial",
            "series": [{"caso": "unico", "nome": "fatorial(n)"}],
            "crescimento": crescimento,
            "eixo": "n (dobra a cada passo)",
            "refs": ["n"],
            "refs_memoria": ["n"],
            "crescimento_dados": "uma chamada por n: as contas só dependem de n",
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(fatorial.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"fatorial: {N_VIDEO}! = {r['fatorial']}, {r['ops']} multiplicações, pilha de {r['pico']}, M={dados['ciclomatica']['M']}")
    for g in crescimento:
        print(f"  n={g['n']:4d} {g['unico']['ops']} multiplicações, pilha {g['unico']['pico']}")
