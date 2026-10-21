"""Mede o custo de cada operação do vetor e grava dados.json. Rodar: python3 instrumentos/vetor/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import instrumento  # noqa: E402
from vetor import Vetor  # noqa: E402

ESTRUTURAS = {"vetor": Vetor}
ENCHER = "anexar"
OPERACOES = [
    {"id": "ler", "estrutura": "vetor", "chamada": "ler", "args": lambda n: [n // 2], "minimo": 1},
    {"id": "escrever", "estrutura": "vetor", "chamada": "escrever", "args": lambda n: [n // 2, -1], "minimo": 1},
    {"id": "anexar", "estrutura": "vetor", "chamada": "anexar", "args": lambda n: [-1]},
    {"id": "anexar-media", "estrutura": "vetor", "chamada": "anexar", "seguidas": "media"},
    {"id": "anexar-pior", "estrutura": "vetor", "chamada": "anexar", "seguidas": "pior"},
    {"id": "inserir-inicio", "estrutura": "vetor", "chamada": "inserir", "args": lambda n: [0, -1]},
    {"id": "remover-inicio", "estrutura": "vetor", "chamada": "remover", "args": lambda n: [0], "minimo": 1},
    {"id": "remover-fim", "estrutura": "vetor", "chamada": "remover", "args": lambda n: [n - 1], "minimo": 1},
    {"id": "buscar", "estrutura": "vetor", "chamada": "buscar", "args": lambda n: [-1]},
]


def sortear(r, variante, n):
    ops = ["anexar", "inserir", "buscar"] + (["ler", "escrever", "remover"] if n else [])
    op = r.choice(ops)
    if op == "anexar":
        return op, [r.randrange(100)]
    if op == "inserir":
        return op, [r.randrange(n + 1), r.randrange(100)]
    if op == "buscar":
        return op, [r.randrange(100)]
    if op == "escrever":
        return op, [r.randrange(n), r.randrange(100)]
    return op, [r.randrange(n)]


if __name__ == "__main__":
    instrumento.medir(ESTRUTURAS, ENCHER, OPERACOES, sortear, AQUI)
