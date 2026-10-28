"""Mede a multiplicação de matrizes e grava dados.json. Rodar: python3 algoritmos/multiplicacao/medir.py"""
import json
import os
import random
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import multiplicacao  # noqa: E402

N_VIDEO, SEMENTE_VIDEO = 4, 3
TAMANHOS = [2, 4, 8, 16, 32, 64]


def rodar(a, b, gravar=False):
    c = Contador()
    c.gravar = gravar
    C = multiplicacao.multiplicar(multiplicacao.matriz(c, a), multiplicacao.matriz(c, b), c)
    return {"C": C.valores(), "ops": c.ops.get("multiplicacoes", 0), "pico": c.pico,
            "casas": c.ops.get("leituras", 0) + c.ops.get("escritas", 0)}, c


if __name__ == "__main__":
    r0 = random.Random(SEMENTE_VIDEO)
    a, b = multiplicacao.sortear(N_VIDEO, r0), multiplicacao.sortear(N_VIDEO, r0)
    r, c = rodar(a, b, gravar=True)
    crescimento = []
    for n in TAMANHOS:
        g = random.Random(n)
        rr = rodar(multiplicacao.sortear(n, g), multiplicacao.sortear(n, g))[0]
        crescimento.append({"n": n, "sorteada": {"ops": rr["ops"], "pico": rr["pico"], "casas": rr["casas"]}})

    conferir = []
    for s in range(1, 4):
        for n in (1, 2, 3, 5, 8):
            g = random.Random(100 * s + n)
            aa, bb = multiplicacao.sortear(n, g), multiplicacao.sortear(n, g)
            conferir.append({"A": aa, "B": bb, **rodar(aa, bb)[0]})

    dados = {
        "exemplo": {
            "dados": f"duas matrizes {N_VIDEO} × {N_VIDEO} com valores de 0 a 9 sorteados com a semente {SEMENTE_VIDEO}",
            "n": N_VIDEO, "semente": SEMENTE_VIDEO, "A": a, "B": b, **r, "eventos": c.eventos,
        },
        "tempo": {
            "unidade": "multiplicações",
            "tipo": "matrizes",
            "series": [{"caso": "sorteada", "nome": "matrizes sorteadas"}],
            "crescimento": crescimento,
            "eixo": "n (lado das matrizes n × n; dobra a cada passo)",
            "refs": ["n³"],
            "crescimento_dados": "um par de matrizes sorteadas por tamanho; as contas não dependem dos valores",
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(multiplicacao.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"multiplicacao: n={N_VIDEO} → {r['ops']} multiplicações, {r['casas']} casas, pico {r['pico']}, M={dados['ciclomatica']['M']}")
    for g in crescimento:
        print(f"  n={g['n']:3d} {g['sorteada']['ops']} multiplicações, pico {g['sorteada']['pico']}, casas {g['sorteada']['casas']}")
