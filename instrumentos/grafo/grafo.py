"""Grafo não dirigido, em três vistas: as mesmas arestas guardadas de três jeitos.

GrafoMatriz: matriz de adjacência V × V, guardada linha a linha; a casa
(u, v) vale 1 se há aresta u–v. Saber se a aresta existe custa uma leitura;
achar os vizinhos de u lê a linha inteira, V casas.
GrafoLista: lista de adjacência, um vetor dinâmico (instrumentos/vetor) por
vértice com os vizinhos dele. Os vizinhos de u custam grau(u) leituras; o
grau é o tamanho do vetor, guardado à parte, e não custa nada.
GrafoIncidencia: matriz de incidência V × E, uma coluna por aresta, com 1 nas
duas pontas. Tudo começa varrendo a linha de u, E casas.

Custo: cada leitura e cada escrita de uma casa passa por `conta.op()`, como
no Vetor. O número de vértices e de arestas não conta. A mesma estrutura,
contando igual, está em simulacao/instrumentos.js.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "vetor"))
from vetor import Vetor  # noqa: E402


class GrafoMatriz:
    def __init__(self, conta, V):
        self.conta = conta
        self.V = V
        self.casas = [0] * (V * V)      # a casa (u, v) é a u·V + v
        self.E = 0

    def _le(self, u, v):
        self.conta.op("leituras")
        return self.casas[u * self.V + v]

    def _escreve(self, u, v, x):
        self.conta.op("escritas")
        self.casas[u * self.V + v] = x

    def por(self, u, v):
        self._escreve(u, v, 1)
        self._escreve(v, u, 1)
        self.E += 1

    def tirar(self, u, v):
        if not self.casas[u * self.V + v]:          # conferir sem contar: tirar só aresta que existe
            raise ValueError(f"a aresta {u}–{v} não existe")
        self._escreve(u, v, 0)
        self._escreve(v, u, 0)
        self.E -= 1

    def existe(self, u, v):
        return self._le(u, v) == 1

    def vizinhos(self, u):
        viz = []
        for v in range(self.V):
            if self._le(u, v) == 1:
                viz.append(v)
        return viz

    def grau(self, u):
        g = 0
        for v in range(self.V):
            g += self._le(u, v)
        return g

    def valores(self):
        return self.arestas()

    def arestas(self):
        return [[u, v] for u in range(self.V) for v in range(u + 1, self.V) if self.casas[u * self.V + v]]

    @property
    def capacidade(self):
        return len(self.casas)


class GrafoLista:
    def __init__(self, conta, V):
        self.conta = conta
        self.V = V
        self.listas = [Vetor(conta) for _ in range(V)]
        self.E = 0

    def por(self, u, v):
        self.listas[u].anexar(v)
        self.listas[v].anexar(u)
        self.E += 1

    def tirar(self, u, v):
        i = self.listas[u].buscar(v)
        if i < 0:
            raise ValueError(f"a aresta {u}–{v} não existe")
        self.listas[u].remover(i)
        self.listas[v].remover(self.listas[v].buscar(u))
        self.E -= 1

    def existe(self, u, v):
        return self.listas[u].buscar(v) >= 0

    def vizinhos(self, u):
        lu = self.listas[u]
        return [lu.ler(i) for i in range(lu.n)]

    def vizinho(self, u, i):
        """O i-ésimo vizinho de u (a partir de 0): uma leitura."""
        return self.listas[u].ler(i)

    def grau(self, u):
        return self.listas[u].n

    def valores(self):
        return self.arestas()

    def arestas(self):
        return sorted([u, v] for u in range(self.V) for v in self.listas[u].valores() if u < v)

    @property
    def capacidade(self):
        """Uma casa por vértice (onde começa a lista dele) mais as casas reservadas de cada lista."""
        return self.V + sum(lu.capacidade for lu in self.listas)


class GrafoIncidencia:
    def __init__(self, conta, V):
        self.conta = conta
        self.V = V
        self.colunas = []               # uma coluna de V casas por aresta

    @property
    def E(self):
        return len(self.colunas)

    def _le(self, w, j):
        self.conta.op("leituras")
        return self.colunas[j][w]

    def _escreve(self, w, j, x):
        self.conta.op("escritas")
        self.colunas[j][w] = x

    def _outra_ponta(self, u, j):
        """Desce a coluna j até achar a ponta que não é u."""
        for w in range(self.V):
            if w != u and self._le(w, j) == 1:
                return w
        return -1

    def _coluna(self, u, v):
        """A coluna da aresta u–v, ou -1: varre a linha de u e, em cada 1, olha a casa de v."""
        for j in range(self.E):
            if self._le(u, j) == 1 and self._le(v, j) == 1:
                return j
        return -1

    def por(self, u, v):
        """Uma coluna nova: escreve as V casas dela (1 nas duas pontas, 0 no resto)."""
        self.colunas.append([None] * self.V)
        j = self.E - 1
        for w in range(self.V):
            self._escreve(w, j, 1 if w == u or w == v else 0)

    def tirar(self, u, v):
        """Acha a coluna e põe a última no lugar dela: V leituras e V escritas."""
        j = self._coluna(u, v)
        if j < 0:
            raise ValueError(f"a aresta {u}–{v} não existe")
        ult = self.E - 1
        if j != ult:
            for w in range(self.V):
                self._escreve(w, j, self._le(w, ult))
        self.colunas.pop()

    def existe(self, u, v):
        return self._coluna(u, v) >= 0

    def vizinhos(self, u):
        viz = []
        for j in range(self.E):
            if self._le(u, j) == 1:
                viz.append(self._outra_ponta(u, j))
        return viz

    def grau(self, u):
        g = 0
        for j in range(self.E):
            g += self._le(u, j)
        return g

    def valores(self):
        return self.arestas()

    def arestas(self):
        return sorted(sorted(w for w in range(self.V) if c[w]) for c in self.colunas)

    @property
    def capacidade(self):
        return self.V * self.E


def anel(V):
    """O grafo de medição: cada vértice ligado aos três seguintes, dando a volta
    (sem laço nem aresta repetida quando V é pequeno). Com V ≥ 7, E = 3V e grau 6:
    os vetores da lista ficam com folga (6 valores em 8 casas)."""
    vistas, arestas = set(), []
    for i in range(V):
        for d in (1, 2, 3):
            u, v = i, (i + d) % V
            par = (min(u, v), max(u, v))
            if u != v and par not in vistas:
                vistas.add(par)
                arestas.append(list(par))
    return arestas
