"""Dijkstra: as distâncias mínimas da origem a todos os vértices, num grafo com
pesos positivos. Um heap de mínimo (o do instrumento Heap) guarda pares
(distância, vértice); sai sempre o mais perto da origem. Quando a distância de
v melhora, entra no heap um par novo e o velho fica lá: ao sair, ele está
vencido (d maior que dist[v]) e é descartado. É o jeito do heapq do Python, sem
a operação de diminuir a prioridade.

O grafo é a grade k × k de motor/grade.py, com a lista de adjacência do
instrumento Grafo guardando em cada casa o par (vizinho, peso)."""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor"), os.path.join(AQUI, "..", "..", "instrumentos", "heap")]
from heap import Heap  # noqa: E402

INF = float("inf")


def insere(heap, d, v, conta):
    conta.op("inserir")
    heap.inserir((d, v))
    conta.ocupa("heap", heap.n)
    conta.evento("insere", v, d)


def tira(heap, conta):
    conta.op("tirar")
    d, u = heap.tirar()
    conta.ocupa("heap", heap.n)
    conta.evento("tira", u, d)
    return d, u


def olha(grafo, u, i, conta):
    conta.op("vizinhos")
    v, w = grafo.vizinho(u, i)
    conta.evento("olha", u, v, w)
    return v, w


def dijkstra(grafo, s, conta):
    dist = conta.aloca("dist", [INF] * grafo.V)
    heap = Heap(conta)
    dist[s] = 0
    insere(heap, 0, s, conta)
    while heap.n > 0:
        d, u = tira(heap, conta)
        if d == dist[u]:
            for i in range(grafo.grau(u)):
                v, w = olha(grafo, u, i, conta)
                if d + w < dist[v]:
                    dist[v] = d + w
                    insere(heap, dist[v], v, conta)
        else:
            conta.op("descartados")
            conta.evento("descarta", u, d)
    return dist


MEDIDA = dijkstra
