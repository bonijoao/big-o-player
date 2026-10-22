"""Mede o custo de cada operação dos dois textos e grava dados.json. Rodar: python3 instrumentos/texto/medir.py

O texto de medição tem as n letras a, b, c, …, z, a, b, … (texto.letras).
"""
import os
import string
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import instrumento  # noqa: E402
from texto import TextoImutavel, TextoPedacos  # noqa: E402

ESTRUTURAS = {"imutavel": TextoImutavel, "pedacos": TextoPedacos}


def letras(n):
    return [string.ascii_lowercase[k % 26] for k in range(n)]


def escrever(classe, conta, n):
    """O texto de medição: as n letras, postas uma a uma."""
    t = classe(conta)
    for x in letras(n):
        t.acrescentar(x)
    return t


escrever.__name__ = "letras"
OPERACOES = []
for v in ESTRUTURAS:
    OPERACOES += [
        {"id": f"acrescentar-{v}", "estrutura": v, "chamada": "acrescentar", "args": lambda n: ["!"]},
        {"id": f"acrescentar-media-{v}", "estrutura": v, "chamada": "acrescentar", "seguidas": "media"},
        {"id": f"montar-{v}", "estrutura": v, "chamada": "montar", "args": lambda n: [letras(n)], "vazia": True, "minimo": 1},
        {"id": f"juntar-{v}", "estrutura": v, "chamada": "juntar", "args": lambda n: []},
        {"id": f"ler-{v}", "estrutura": v, "chamada": "ler", "args": lambda n: [n // 2], "minimo": 1},
        {"id": f"comprimento-{v}", "estrutura": v, "chamada": "comprimento", "args": lambda n: []},
        {"id": f"fatiar-{v}", "estrutura": v, "chamada": "fatiar", "args": lambda n: [n // 4, n // 4 + n // 2]},
        {"id": f"comparar-{v}", "estrutura": v, "chamada": "comparar", "args": lambda n: ["".join(letras(n))]},
    ]


def sortear(r, variante, t):
    n = t.n
    op = r.choice(["acrescentar", "acrescentar", "acrescentar", "juntar", "ler", "comprimento", "fatiar", "comparar"]) if n else "acrescentar"
    if op == "acrescentar":
        return op, [r.choice(string.ascii_lowercase)]
    if op == "ler":
        return op, [r.randrange(n)]
    if op == "fatiar":
        a = r.randrange(n + 1)
        return op, [a, r.randint(a, n)]
    if op == "comparar":
        s = list("".join(str(x) for x in t.valores()))   # igual, ou com uma letra trocada
        if s and r.random() < 0.5:
            s[r.randrange(len(s))] = "#"
        return op, ["".join(s)]
    return op, []


if __name__ == "__main__":
    instrumento.medir(ESTRUTURAS, escrever, OPERACOES, sortear, AQUI)
