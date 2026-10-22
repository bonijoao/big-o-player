"""Percursos de árvore: visitar todos os nós de uma árvore de busca, cada um
uma vez. Uma única descida recursiva dá as três ordens em profundidade, que só
diferem no momento de anotar o nó: antes de descer (pré-ordem), entre os dois
lados (em ordem, que numa árvore de busca sai ordenada) e depois de voltar
(pós-ordem). A recursão usa a pilha de chamadas. A em largura troca a pilha por
uma fila e anota nível por nível. Roda sobre a árvore comum do instrumento
Árvore de busca, e a fila é a circular do instrumento Fila."""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor"), os.path.join(AQUI, "..", "..", "instrumentos", "fila")]
from fila import FilaCircular  # noqa: E402


def percorrer(arvore, p, ordens, conta):
    conta.entra()
    if p is not None:
        conta.op("visitas")
        v = arvore.le_valor(p)
        ordens["pre"].append(v)
        percorrer(arvore, arvore.le_esq(p), ordens, conta)
        ordens["em"].append(v)
        percorrer(arvore, arvore.le_dir(p), ordens, conta)
        ordens["pos"].append(v)
    conta.sai()


MEDIDA = percorrer


def largura(arvore, conta):
    """Nível por nível: tira o primeiro da fila, anota e põe os filhos no fim."""
    ordem, fila = [], FilaCircular(conta)
    if arvore.raiz is not None:
        fila.enfileirar(arvore.raiz)
        conta.ocupa("fila", fila.n)
    while fila.n > 0:
        p = fila.desenfileirar()
        conta.ocupa("fila", fila.n)
        ordem.append(arvore.le_valor(p))
        for f in (arvore.le_esq(p), arvore.le_dir(p)):
            if f is not None:
                fila.enfileirar(f)
                conta.ocupa("fila", fila.n)
    return ordem
