"""Mede o custo de cada operação da pilha e grava dados.json. Rodar: python3 instrumentos/pilha/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import instrumento  # noqa: E402
from pilha import Pilha  # noqa: E402

ESTRUTURAS = {"pilha": Pilha}
ENCHER = "empilhar"
OPERACOES = [
    {"id": "empilhar", "estrutura": "pilha", "chamada": "empilhar", "args": lambda n: [-1]},
    {"id": "empilhar-media", "estrutura": "pilha", "chamada": "empilhar", "seguidas": "media"},
    {"id": "empilhar-pior", "estrutura": "pilha", "chamada": "empilhar", "seguidas": "pior"},
    {"id": "desempilhar", "estrutura": "pilha", "chamada": "desempilhar", "args": lambda n: [], "minimo": 1},
    {"id": "topo", "estrutura": "pilha", "chamada": "topo", "args": lambda n: [], "minimo": 1},
]


def sortear(r, variante, e):
    n = e.n
    op = r.choice(["empilhar", "empilhar", "desempilhar", "topo"]) if n else "empilhar"
    return op, [r.randrange(100)] if op == "empilhar" else []


if __name__ == "__main__":
    instrumento.medir(ESTRUTURAS, ENCHER, OPERACOES, sortear, AQUI)
