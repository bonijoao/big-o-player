"""Mede o custo de cada operação dos dois dicionários e grava dados.json. Rodar: python3 instrumentos/dicionario/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import instrumento  # noqa: E402
from dicionario import DicEncadeamento, DicSondagem, chave_medida as k  # noqa: E402

ESTRUTURAS = {"encadeamento": DicEncadeamento, "sondagem": DicSondagem}
ENCHER = "encher"                # as chaves k(0), k(1), …, k(n − 1): 0, 1, …, n − 1 embaralhados
OPERACOES = []
for v in ESTRUTURAS:
    OPERACOES += [
        {"id": f"ler-{v}", "estrutura": v, "chamada": "ler", "args": lambda n: [k(n // 2)], "minimo": 1},
        {"id": f"ler-ausente-{v}", "estrutura": v, "chamada": "ler", "args": lambda n: [k(n)]},
        {"id": f"por-novo-{v}", "estrutura": v, "chamada": "por", "args": lambda n: [k(n), n]},
        {"id": f"por-media-{v}", "estrutura": v, "chamada": "encher", "seguidas": "media"},
        {"id": f"por-pior-{v}", "estrutura": v, "chamada": "encher", "seguidas": "pior"},
        {"id": f"por-existente-{v}", "estrutura": v, "chamada": "por", "args": lambda n: [k(0), -1], "minimo": 1},
        {"id": f"remover-{v}", "estrutura": v, "chamada": "remover", "args": lambda n: [k(n // 2)], "minimo": 1},
    ]


def sortear(r, variante, e):
    """Chaves de 0 a 23, para as operações acertarem chaves que estão (e lápides na sondagem)."""
    op = r.choice(["por", "por", "por", "ler", "tem", "remover"])
    k = r.randrange(24)
    return op, ([k, r.randrange(100)] if op == "por" else [k])


if __name__ == "__main__":
    instrumento.medir(ESTRUTURAS, ENCHER, OPERACOES, sortear, AQUI)
