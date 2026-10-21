"""Mede o custo de cada operação das duas filas e grava dados.json. Rodar: python3 instrumentos/fila/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import instrumento  # noqa: E402
from fila import FilaCircular, FilaIngenua  # noqa: E402

ESTRUTURAS = {"ingenua": FilaIngenua, "circular": FilaCircular}
ENCHER = "enfileirar"
OPERACOES = []
for v in ESTRUTURAS:
    OPERACOES += [
        {"id": f"enfileirar-{v}", "estrutura": v, "chamada": "enfileirar", "args": lambda n: [-1]},
        {"id": f"enfileirar-media-{v}", "estrutura": v, "chamada": "enfileirar", "seguidas": "media"},
        {"id": f"enfileirar-pior-{v}", "estrutura": v, "chamada": "enfileirar", "seguidas": "pior"},
        {"id": f"desenfileirar-{v}", "estrutura": v, "chamada": "desenfileirar", "args": lambda n: [], "minimo": 1},
        {"id": f"primeiro-{v}", "estrutura": v, "chamada": "primeiro", "args": lambda n: [], "minimo": 1},
    ]


def sortear(r, variante, n):
    op = r.choice(["enfileirar", "enfileirar", "desenfileirar", "primeiro"]) if n else "enfileirar"
    return op, [r.randrange(100)] if op == "enfileirar" else []


if __name__ == "__main__":
    instrumento.medir(ESTRUTURAS, ENCHER, OPERACOES, sortear, AQUI)
