"""Heapsort: arruma o vetor num heap de máximo (o maior na casa 0) e depois
troca a raiz com o fim do heap, que encolhe uma casa e desce a nova raiz.

Um laço só faz as duas fases, com o mesmo descer: enquanto há pai para
arrumar (i > 0), desce o próximo pai, de baixo para cima (montar de uma vez,
como no instrumento Heap); depois, cada volta leva o maior para o fim e desce
a raiz. É o descer do Heap com a comparação invertida."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "motor"))
from ordenacao import maior, troca

MOVIMENTO = "trocas"


def heapsort(v, conta):
    n = len(v)
    fim, i = n, n // 2
    while fim > 1:
        if i > 0:
            i -= 1
        else:
            fim -= 1
            troca(v, 0, fim, conta)
        p = i
        while 2 * p + 1 < fim:
            f = 2 * p + 1
            if f + 1 < fim and maior(v, f + 1, f, conta):
                f += 1
            if maior(v, f, p, conta):
                troca(v, p, f, conta)
                p = f
            else:
                break


ordenar = heapsort
MEDIDA = heapsort
