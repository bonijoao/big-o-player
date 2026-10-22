"""Mede o custo de cada operação das duas árvores de busca e grava dados.json. Rodar: python3 instrumentos/arvore/medir.py

A árvore medida é montada inserindo 0, 1, …, n − 1 em ordem: a comum vira uma
fila indiana (cada nó só tem o filho da direita) e a AVL gira até ficar com uns
log₂ n níveis. Buscar o maior, inserir n e remover o maior descem a árvore
inteira; ver o menor fica na raiz da comum. As duas montagens partem da árvore
vazia com os mesmos n valores, em ordem e embaralhados (sempre o mesmo
embaralhamento para cada n).
"""
import os
import random
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import instrumento  # noqa: E402
from arvore import ArvoreAVL, ArvoreComum  # noqa: E402

ESTRUTURAS = {"comum": ArvoreComum, "avl": ArvoreAVL}
ENCHER = "inserir"


def embaralhados(n):
    v = list(range(n))
    random.Random(n).shuffle(v)
    return v


OPERACOES = []
for v in ESTRUTURAS:
    OPERACOES += [
        {"id": f"buscar-maior-{v}", "estrutura": v, "chamada": "buscar", "args": lambda n: [n - 1], "minimo": 1},
        {"id": f"inserir-{v}", "estrutura": v, "chamada": "inserir", "args": lambda n: [n]},
        {"id": f"remover-maior-{v}", "estrutura": v, "chamada": "remover", "args": lambda n: [n - 1], "minimo": 1},
        {"id": f"menor-{v}", "estrutura": v, "chamada": "menor", "args": lambda n: [], "minimo": 1},
        {"id": f"montar-ordem-{v}", "estrutura": v, "chamada": "montar", "args": lambda n: [list(range(n))], "minimo": 1, "vazia": True},
        {"id": f"montar-embaralhado-{v}", "estrutura": v, "chamada": "montar", "args": lambda n: [embaralhados(n)], "minimo": 1, "vazia": True},
    ]


def sortear(r, variante, e):
    if not e.n:
        return "inserir", [r.randrange(100)]
    op = r.choice(["inserir", "inserir", "inserir", "buscar", "remover", "remover", "menor"])
    if op == "menor":
        return op, []
    if op == "remover" and r.random() < 0.8:
        return op, [r.choice(e.valores())]   # quase sempre um que está lá (escolher não conta)
    return op, [r.randrange(100)]


if __name__ == "__main__":
    instrumento.medir(ESTRUTURAS, ENCHER, OPERACOES, sortear, AQUI)
