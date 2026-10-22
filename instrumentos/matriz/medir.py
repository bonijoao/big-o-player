"""Mede o custo de cada operação da matriz e grava dados.json. Rodar: python3 instrumentos/matriz/medir.py

O n da tabela e do gráfico é o lado: a matriz de medição tem n × n casas
(matriz.quadrada). As perguntas são sobre a linha e a coluna do meio.
"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import instrumento  # noqa: E402
from matriz import Matriz, quadrada  # noqa: E402

ESTRUTURAS = {"linha_a_linha": Matriz}
INICIO = 4        # as sequências sorteadas começam da matriz 4 × 4
OPERACOES = [
    {"id": "ler", "estrutura": "linha_a_linha", "chamada": "ler", "args": lambda n: [n // 2, n // 2], "minimo": 1},
    {"id": "escrever", "estrutura": "linha_a_linha", "chamada": "escrever", "args": lambda n: [n // 2, n // 2, -1], "minimo": 1},
    {"id": "linha", "estrutura": "linha_a_linha", "chamada": "linha", "args": lambda n: [n // 2], "minimo": 1},
    {"id": "coluna", "estrutura": "linha_a_linha", "chamada": "coluna", "args": lambda n: [n // 2], "minimo": 1},
    {"id": "transpor", "estrutura": "linha_a_linha", "chamada": "transpor", "args": lambda n: []},
    {"id": "criar", "estrutura": "linha_a_linha", "chamada": "criar", "args": lambda n: [n, n]},
]


def sortear(r, variante, m):
    """Uma operação válida na matriz de agora (que pode ter virado retangular)."""
    op = r.choice(["ler", "ler", "escrever", "escrever", "linha", "coluna", "transpor", "criar"])
    if op == "criar":
        return op, [r.randint(1, 5), r.randint(1, 5)]
    if op == "transpor":
        return op, []
    i, j = r.randrange(m.linhas), r.randrange(m.colunas)
    if op == "ler":
        return op, [i, j]
    if op == "escrever":
        return op, [i, j, r.randrange(100)]
    return op, [i] if op == "linha" else [j]


if __name__ == "__main__":
    instrumento.medir(ESTRUTURAS, quadrada, OPERACOES, sortear, AQUI, INICIO)
