"""Busca em largura: a partir da origem, visita os vizinhos dela, depois os
vizinhos dos vizinhos, camada por camada. Uma fila guarda quem já foi visto
e ainda espera a vez; a distância de cada vértice à origem serve também de
marca de visto (∞ = ainda não visto). O grafo é a lista de adjacência do
instrumento Grafo, e a fila é a circular do instrumento Fila."""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor"), os.path.join(AQUI, "..", "..", "instrumentos", "fila")]
from fila import FilaCircular  # noqa: E402


def enfileira(fila, v, conta):
    conta.op("enfileirar")
    fila.enfileirar(v)
    conta.ocupa("fila", fila.n)
    conta.evento("enfileira", v)


def desenfileira(fila, conta):
    conta.op("desenfileirar")
    u = fila.desenfileirar()
    conta.ocupa("fila", fila.n)
    conta.evento("visita", u)
    return u


def olha(grafo, u, i, conta):
    conta.op("vizinhos")
    v = grafo.vizinho(u, i)
    conta.evento("olha", u, v)
    return v


def largura(grafo, s, conta):
    dist = conta.aloca("dist", [None] * grafo.V)     # None = ∞, ainda não visto
    fila = FilaCircular(conta)
    dist[s] = 0
    enfileira(fila, s, conta)
    while fila.n > 0:
        u = desenfileira(fila, conta)
        for i in range(grafo.grau(u)):
            v = olha(grafo, u, i, conta)
            if dist[v] is None:
                dist[v] = dist[u] + 1
                enfileira(fila, v, conta)
    return dist


MEDIDA = largura
