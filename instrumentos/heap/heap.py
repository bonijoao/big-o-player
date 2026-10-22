"""Heap de mínimo sobre o vetor dinâmico (instrumentos/vetor): o menor fica na casa 0.

A árvore não existe na memória: ela é o próprio vetor lido pela conta dos
índices. Os filhos da casa i são 2i + 1 e 2i + 2, e o pai é ⌊(i − 1)/2⌋.
Todo pai é menor ou igual aos filhos.

Inserir põe o valor no fim e o sobe, trocando com o pai enquanto for menor.
Tirar o menor leva o último para a casa 0 e o desce, trocando com o menor dos
filhos. Montar de uma vez põe todos no vetor e desce cada pai, de baixo para
cima: O(n), contra O(n log n) de inserir um por um.

Os valores podem ser números ou pares comparados em ordem (gravidade, chegada),
(distância, vértice), como nas faixas. Custo: cada leitura e escrita de uma
casa, pelo Vetor. A mesma estrutura, contando igual, está em
simulacao/instrumentos.js.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "vetor"))
from vetor import Vetor  # noqa: E402


class Heap:
    def __init__(self, conta):
        self.v = Vetor(conta)

    def _subir(self, i, x):
        """x está na casa i: troca com o pai enquanto for menor que ele."""
        while i > 0:
            p = (i - 1) // 2
            y = self.v.ler(p)
            if not x < y:
                break
            self.v.escrever(i, y)
            self.v.escrever(p, x)
            i = p

    def _descer(self, i, x):
        """x está na casa i: troca com o menor dos filhos enquanto um filho for menor."""
        n = self.v.n
        while 2 * i + 1 < n:
            m = 2 * i + 1
            xm = self.v.ler(m)
            if m + 1 < n:
                xd = self.v.ler(m + 1)
                if xd < xm:
                    m, xm = m + 1, xd
            if not xm < x:
                break
            self.v.escrever(i, xm)
            self.v.escrever(m, x)
            i = m

    def inserir(self, x):
        self.v.anexar(x)
        self._subir(self.v.n - 1, x)

    def tirar(self):
        """Tira e devolve o menor: o último vai para a casa 0 e desce."""
        menor = self.v.ler(0)
        ult = self.v.remover(self.v.n - 1)
        if self.v.n > 0:
            self.v.escrever(0, ult)
            self._descer(0, ult)
        return menor

    def menor(self):
        return self.v.ler(0)

    def montar(self, valores):
        """De uma vez: anexa todos e desce cada pai, do último pai até a raiz."""
        for x in valores:
            self.v.anexar(x)
        for i in range(self.v.n // 2 - 1, -1, -1):
            self._descer(i, self.v.ler(i))

    def inserir_todos(self, valores):
        """Um por um: cada valor entra no fim e sobe."""
        for x in valores:
            self.inserir(x)

    def valores(self):
        return self.v.valores()

    @property
    def n(self):
        return self.v.n

    @property
    def capacidade(self):
        return self.v.capacidade
