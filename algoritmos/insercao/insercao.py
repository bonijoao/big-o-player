"""Insertion sort (com trocas entre vizinhos): cada número novo desce,
trocando com o vizinho da esquerda, até encontrar alguém menor que ele.
A parte da esquerda fica sempre ordenada."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "motor"))
from ordenacao import maior, troca

MOVIMENTO = "trocas"


def insercao(v, conta):
    for i in range(1, len(v)):
        j = i
        while j > 0 and maior(v, j - 1, j, conta):
            troca(v, j - 1, j, conta)
            j -= 1


ordenar = insercao
MEDIDA = insercao
