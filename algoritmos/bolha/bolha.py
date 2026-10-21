"""Bubble sort com parada antecipada: compara vizinhos e troca os que estão
fora de ordem; cada passada leva o maior que sobrou para o fim. Se uma
passada não troca nada, o vetor já está ordenado e o algoritmo para."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "motor"))
from ordenacao import maior, troca

MOVIMENTO = "trocas"


def bolha(v, conta):
    for fim in range(len(v) - 1, 0, -1):
        trocou = False
        for i in range(fim):
            if maior(v, i, i + 1, conta):
                troca(v, i, i + 1, conta)
                trocou = True
        if not trocou:
            break


ordenar = bolha
MEDIDA = bolha
