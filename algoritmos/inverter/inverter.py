"""Inverter lista encadeada: anda pela lista uma vez, virando o próx de cada
nó para o anterior. Três ponteiros bastam: o anterior (que já está virado), o
atual e o próximo (guardado antes de virar, senão o resto da lista se perde).
Roda sobre a lista dinâmica do instrumento Lista encadeada."""
import os
import random
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor"), os.path.join(AQUI, "..", "..", "instrumentos", "lista")]
from lista import ListaDinamica  # noqa: E402


def inverter(lista, conta):
    anterior = None
    atual = lista.inicio
    while atual is not None:
        proximo = lista.le_prox(atual)
        lista.escreve_prox(atual, anterior)
        conta.op("ponteiros")
        anterior = atual
        atual = proximo
    lista.fim = lista.inicio
    lista.inicio = anterior


MEDIDA = inverter


def montar(valores, conta):
    """A lista de entrada, montada fora da conta."""
    lista = ListaDinamica(conta)
    for x in valores:
        lista.inserir_fim(x)
    conta.ops.clear()
    return lista


def gerar(n, r):
    return [r.randrange(10, 100) for _ in range(n)]
