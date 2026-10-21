"""Busca binária: compara o alvo com o meio do trecho que ainda pode contê-lo
e descarta a metade em que ele não pode estar. Precisa do vetor ordenado."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "motor"))
from busca import igual, menor

ORDENADO = True


def busca_binaria(v, alvo, conta):
    a, b = 0, len(v) - 1
    achou = -1
    while a <= b:
        m = (a + b) // 2
        if igual(v, m, alvo, conta):
            achou = m
            break
        elif menor(v, m, alvo, conta):
            a = m + 1
        else:
            b = m - 1
    return achou


buscar = busca_binaria
MEDIDA = busca_binaria
