"""Selection sort: procura o menor do que falta e o troca com o primeiro do
que falta. Uma troca por passada, mesmo quando o menor já está no lugar."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "motor"))
from ordenacao import maior, troca

MOVIMENTO = "trocas"


def selecao(v, conta):
    n = len(v)
    for i in range(n - 1):
        m = i
        for j in range(i + 1, n):
            if maior(v, m, j, conta):
                m = j
        troca(v, i, m, conta)


ordenar = selecao
MEDIDA = selecao
