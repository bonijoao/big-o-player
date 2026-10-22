"""Mede o custo de cada operação do heap e grava dados.json. Rodar: python3 instrumentos/heap/medir.py

A estrutura medida é montada inserindo 0, 1, …, n − 1: já é um heap, com o
vetor em ordem. Inserir −1 sobe até a raiz e tirar o menor faz o último descer
até uma folha, os piores casos. As duas montagens partem do heap vazio com os
mesmos n valores em ordem decrescente, o pior caso das duas.
"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import instrumento  # noqa: E402
from heap import Heap  # noqa: E402

ESTRUTURAS = {"heap": Heap}
ENCHER = "inserir"
DECRESCENTES = lambda n: list(range(n, 0, -1))  # noqa: E731
OPERACOES = [
    {"id": "inserir", "estrutura": "heap", "chamada": "inserir", "args": lambda n: [-1]},
    {"id": "tirar", "estrutura": "heap", "chamada": "tirar", "args": lambda n: [], "minimo": 1},
    {"id": "menor", "estrutura": "heap", "chamada": "menor", "args": lambda n: [], "minimo": 1},
    {"id": "montar", "estrutura": "heap", "chamada": "montar", "args": lambda n: [DECRESCENTES(n)], "minimo": 1, "vazia": True},
    {"id": "inserir_todos", "estrutura": "heap", "chamada": "inserir_todos", "args": lambda n: [DECRESCENTES(n)], "minimo": 1, "vazia": True},
]


def sortear(r, variante, e):
    if not e.n:
        return "inserir", [r.randrange(100)]
    op = r.choice(["inserir", "inserir", "tirar", "menor", "montar"])
    if op == "inserir":
        return op, [r.randrange(100)]
    if op == "montar":
        return op, [[r.randrange(100) for _ in range(r.randint(1, 4))]]
    return op, []


if __name__ == "__main__":
    instrumento.medir(ESTRUTURAS, ENCHER, OPERACOES, sortear, AQUI)
