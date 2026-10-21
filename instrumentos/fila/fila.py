"""Duas filas, para comparar: o primeiro que entra é o primeiro que sai.

FilaIngenua: sobre o vetor dinâmico, o primeiro fica na casa 0; desenfileirar
remove a casa 0 e desloca todos os outros, O(n).
FilaCircular: casas próprias, com início e tamanho guardados à parte;
desenfileirar só lê a casa do início e anda o início uma casa, dando a volta
no fim do vetor, O(1). Quando enche, dobra e copia na ordem da fila.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "vetor"))
from vetor import Vetor  # noqa: E402


class FilaIngenua:
    def __init__(self, conta):
        self.v = Vetor(conta)

    def enfileirar(self, x):
        self.v.anexar(x)

    def desenfileirar(self):
        return self.v.remover(0)

    def primeiro(self):
        return self.v.ler(0)

    def valores(self):
        return self.v.valores()

    @property
    def n(self):
        return self.v.n

    @property
    def capacidade(self):
        return self.v.capacidade


class FilaCircular:
    def __init__(self, conta, capacidade=1):
        self.conta = conta
        self.casas = [None] * capacidade
        self.inicio = 0
        self.n = 0

    def _le(self, i):
        self.conta.op("leituras")
        return self.casas[i]

    def _escreve(self, i, x):
        self.conta.op("escritas")
        self.casas[i] = x

    def _realoca(self, capacidade):
        """Casas novas; copia os n valores na ordem da fila, começando da casa 0."""
        novas = [None] * capacidade
        for k in range(self.n):
            novas[k] = self._le((self.inicio + k) % len(self.casas))
            self.conta.op("escritas")
        self.casas = novas
        self.inicio = 0

    def enfileirar(self, x):
        if self.n == len(self.casas):
            self._realoca(2 * len(self.casas))
        self._escreve((self.inicio + self.n) % len(self.casas), x)
        self.n += 1

    def desenfileirar(self):
        x = self._le(self.inicio)
        self.casas[self.inicio] = None   # a casa volta a ficar livre (não conta)
        self.inicio = (self.inicio + 1) % len(self.casas)
        self.n -= 1
        return x

    def primeiro(self):
        return self._le(self.inicio)

    def valores(self):
        return [self.casas[(self.inicio + k) % len(self.casas)] for k in range(self.n)]

    @property
    def capacidade(self):
        return len(self.casas)
