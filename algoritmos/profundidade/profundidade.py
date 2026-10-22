"""Busca em profundidade: anda sempre para um vizinho ainda não visto e só
volta quando o vértice da vez não tem mais nenhum. A pilha guarda o caminho
atual, da origem até o vértice da vez (o topo); próximo[u] diz qual vizinho
de u olhar na próxima vez que ele estiver no topo. É a recursão escrita com
uma pilha: visita na mesma ordem da versão recursiva. ordem[v] é o número
de visita de v e serve também de marca (0 = ainda não visto). O grafo é a
lista de adjacência do instrumento Grafo, e a pilha é a do instrumento Pilha."""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor"), os.path.join(AQUI, "..", "..", "instrumentos", "pilha")]
from pilha import Pilha  # noqa: E402


def empilha(pilha, v, conta):
    conta.op("empilhar")
    pilha.empilhar(v)
    conta.ocupa("pilha", pilha.n)
    conta.evento("empilha", v)


def desempilha(pilha, conta):
    conta.op("desempilhar")
    u = pilha.desempilhar()
    conta.ocupa("pilha", pilha.n)
    conta.evento("desempilha", u)


def topo(pilha, conta):
    conta.op("topo")
    return pilha.topo()


def olha(grafo, u, i, conta):
    conta.op("vizinhos")
    v = grafo.vizinho(u, i)
    conta.evento("olha", u, v)
    return v


def profundidade(grafo, s, conta):
    ordem = conta.aloca("ordem", [0] * grafo.V)        # 0 = ainda não visto
    proximo = conta.aloca("proximo", [0] * grafo.V)    # o próximo vizinho a olhar (a partir de 0)
    pilha = Pilha(conta)
    k = 1
    ordem[s] = k
    empilha(pilha, s, conta)
    while pilha.n > 0:
        u = topo(pilha, conta)
        if proximo[u] < grafo.grau(u):
            v = olha(grafo, u, proximo[u], conta)
            proximo[u] += 1
            if ordem[v] == 0:
                k += 1
                ordem[v] = k
                empilha(pilha, v, conta)
        else:
            desempilha(pilha, conta)
    return ordem


MEDIDA = profundidade
