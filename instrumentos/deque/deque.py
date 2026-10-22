"""Deque circular: põe e tira pelas duas pontas.

É a fila circular (instrumentos/fila) com as duas pontas abertas: casas
próprias, com o início e o tamanho guardados à parte. Pôr na frente anda o
início uma casa para trás, dando a volta no começo do vetor; tirar de trás só
lê a última casa. Ninguém se desloca, por isso tudo custa 1, menos pôr com o
vetor cheio, que dobra e copia na ordem do deque.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "fila"))
from fila import FilaCircular  # noqa: E402


class Deque(FilaCircular):
    por_tras = FilaCircular.enfileirar
    tirar_frente = FilaCircular.desenfileirar
    frente = FilaCircular.primeiro

    def por_frente(self, x):
        if self.n == len(self.casas):
            self._realoca(2 * len(self.casas))
        self.inicio = (self.inicio - 1) % len(self.casas)
        self._escreve(self.inicio, x)
        self.n += 1

    def _ultima(self):
        return (self.inicio + self.n - 1) % len(self.casas)

    def tirar_tras(self):
        i = self._ultima()
        x = self._le(i)
        self.casas[i] = None            # a casa volta a ficar livre (não conta)
        self.n -= 1
        return x

    def fundo(self):
        return self._le(self._ultima())
