"""Busca em árvore: desce da raiz comparando o valor procurado com o de cada
nó. Igual, achou; menor, só pode estar à esquerda; maior, só à direita. Cada
nível descarta um lado inteiro, e a busca custa no máximo a altura da árvore.
Roda sobre a árvore comum do instrumento Árvore de busca, montada com os
valores na ordem em que chegaram: é a ordem que decide a altura."""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor")]


def buscar(arvore, x, conta):
    p = arvore.raiz
    achou = False
    while p is not None:
        v = arvore.le_valor(p)
        conta.op("comparacoes")
        if x == v:
            achou = True
            break
        conta.op("comparacoes")
        if x < v:
            p = arvore.le_esq(p)
        else:
            p = arvore.le_dir(p)
    return achou


MEDIDA = buscar
