"""Mediana por quickselect: a partição do quick sort (Lomuto, pivô = último
do trecho), mas sem recursão. Depois de cada partição o pivô está no lugar
final; o laço só segue o lado onde está a casa do meio. Com n par, a outra
casa do meio é o menor do lado direito, e a mediana é a média das duas."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "motor"))
from ordenacao import maior, troca


def mediana(v, conta):
    n = len(v)
    k = (n - 1) // 2                # a casa do meio (a de baixo, se n é par)
    a, b = 0, n - 1                 # o trecho vivo, fechado nos dois lados
    while a < b:
        conta.evento("trecho", a, b)
        i = a
        for j in range(a, b):
            if maior(v, b, j, conta):
                troca(v, i, j, conta)
                i += 1
        troca(v, i, b, conta)
        if i == k:
            break
        elif i < k:
            a = i + 1
        else:
            b = i - 1
    resposta = v[k]
    if n % 2 == 0:
        m = k + 1
        for j in range(k + 2, n):
            if maior(v, m, j, conta):
                m = j
        resposta = (v[k] + v[m]) / 2
    return resposta


MEDIDA = mediana
