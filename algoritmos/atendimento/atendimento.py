"""Fila de atendimento: um caixa, clientes que chegam em minutos sorteados.
Quem chega com o caixa ocupado entra na fila (a circular, do instrumento
Fila); quando o caixa fica livre, chama o primeiro da fila. Se a fila está
vazia, o próximo a chegar vai direto ao caixa e não espera."""
import os
import random
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor"), os.path.join(AQUI, "..", "..", "instrumentos", "fila")]
from fila import FilaCircular  # noqa: E402

# movimento: (menor e maior intervalo entre chegadas, menor e maior tempo de atendimento), em minutos
MOVIMENTOS = {"calmo": ((2, 6), (1, 5)), "no_limite": ((1, 5), (1, 5)), "lotado": ((1, 3), (2, 4))}


def enfileira(fila, i, conta):
    conta.op("enfileirar")
    fila.enfileirar(i)
    conta.ocupa("fila", fila.n)
    conta.evento("enfileira", i)


def desenfileira(fila, conta):
    conta.op("desenfileirar")
    k = fila.desenfileirar()
    conta.ocupa("fila", fila.n)
    conta.evento("desenfileira", k)
    return k


def atender(chegada, duracao, conta):
    n = len(chegada)
    fila = FilaCircular(conta)
    livre, soma, maior, i = 0, 0, 0, 0
    for _ in range(n):
        while i < n and chegada[i] < livre:
            enfileira(fila, i, conta)
            i += 1
            maior = max(maior, fila.n)
        if fila.n > 0:
            k = desenfileira(fila, conta)
        else:
            k = i
            i += 1
        inicio = max(livre, chegada[k])
        conta.evento("atende", k, inicio)
        soma += inicio - chegada[k]
        livre = inicio + duracao[k]
    return soma, maior


MEDIDA = atender


def sortear(n, movimento, r):
    """Chegadas (minuto em que cada cliente chega, crescente) e durações."""
    (c0, c1), (a0, a1) = MOVIMENTOS[movimento]
    chegada, t = [], 0
    for _ in range(n):
        t += r.randint(c0, c1)
        chegada.append(t)
    duracao = [r.randint(a0, a1) for _ in range(n)]
    return chegada, duracao
