"""Merge sort (de cima para baixo): divide o trecho ao meio, ordena cada
metade e intercala as duas, comparando sempre a frente de cada uma. Usa
uma lista auxiliar do tamanho do vetor."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "motor"))
from ordenacao import maior, escreve

MOVIMENTO = "escritas"


def intercalacao(v, a, b, aux, conta):
    conta.entra(a, b)
    if b - a > 1:
        m = (a + b) // 2
        intercalacao(v, a, m, aux, conta)
        intercalacao(v, m, b, aux, conta)
        for k in range(a, b):
            escreve(aux, k, v[k], conta, "aux")
        i, j, k = a, m, a
        while i < m and j < b:
            if maior(aux, i, j, conta, "aux"):
                escreve(v, k, aux[j], conta)
                j += 1
            else:
                escreve(v, k, aux[i], conta)
                i += 1
            k += 1
        while i < m:
            escreve(v, k, aux[i], conta)
            i += 1
            k += 1
        while j < b:
            escreve(v, k, aux[j], conta)
            j += 1
            k += 1
    conta.sai()


def ordenar(v, conta):
    aux = conta.aloca("auxiliar", [0] * len(v))
    intercalacao(v, 0, len(v), aux, conta)


MEDIDA = intercalacao
