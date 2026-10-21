"""Quicksort (partição de Lomuto, pivô = último do trecho): passa os
menores que o pivô para a esquerda, põe o pivô entre os dois lados e
repete em cada lado."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "motor"))
from ordenacao import maior, troca

MOVIMENTO = "trocas"


def rapida(v, a, b, conta):
    conta.entra(a, b)
    if b - a > 1:
        p = b - 1
        conta.evento("pivo", p)
        i = a
        for j in range(a, b - 1):
            if maior(v, p, j, conta):
                troca(v, i, j, conta)
                i += 1
        troca(v, i, p, conta)
        rapida(v, a, i, conta)
        rapida(v, i + 1, b, conta)
    conta.sai()


def ordenar(v, conta):
    rapida(v, 0, len(v), conta)


MEDIDA = rapida
