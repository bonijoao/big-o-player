"""Busca sequencial: olha casa por casa, da primeira à última, até achar o
alvo. Não precisa de vetor ordenado; no pior caso, olha todas."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "motor"))
from busca import igual

ORDENADO = False


def busca_sequencial(v, alvo, conta):
    achou = -1
    for i in range(len(v)):
        if igual(v, i, alvo, conta):
            achou = i
            break
    return achou


buscar = busca_sequencial
MEDIDA = busca_sequencial
