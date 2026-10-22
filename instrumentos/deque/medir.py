"""Mede o custo de cada operação do deque circular e grava dados.json. Rodar: python3 instrumentos/deque/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import instrumento  # noqa: E402
from deque import Deque  # noqa: E402

ESTRUTURAS = {"deque": Deque}
ENCHER = "por_tras"
OPERACOES = [
    {"id": "por-tras", "estrutura": "deque", "chamada": "por_tras", "args": lambda n: [-1]},
    {"id": "por-tras-media", "estrutura": "deque", "chamada": "por_tras", "seguidas": "media"},
    {"id": "por-tras-pior", "estrutura": "deque", "chamada": "por_tras", "seguidas": "pior"},
    {"id": "por-frente", "estrutura": "deque", "chamada": "por_frente", "args": lambda n: [-1]},
    {"id": "por-frente-media", "estrutura": "deque", "chamada": "por_frente", "seguidas": "media"},
    {"id": "tirar-frente", "estrutura": "deque", "chamada": "tirar_frente", "args": lambda n: [], "minimo": 1},
    {"id": "tirar-tras", "estrutura": "deque", "chamada": "tirar_tras", "args": lambda n: [], "minimo": 1},
    {"id": "frente", "estrutura": "deque", "chamada": "frente", "args": lambda n: [], "minimo": 1},
    {"id": "fundo", "estrutura": "deque", "chamada": "fundo", "args": lambda n: [], "minimo": 1},
]


def sortear(r, variante, e):
    if e.n == 0:
        op = r.choice(["por_frente", "por_tras"])
    else:
        op = r.choice(["por_frente", "por_tras", "por_frente", "por_tras", "tirar_frente", "tirar_tras", "frente", "fundo"])
    return op, [r.randrange(100)] if op.startswith("por") else []


if __name__ == "__main__":
    instrumento.medir(ESTRUTURAS, ENCHER, OPERACOES, sortear, AQUI)
