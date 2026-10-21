"""Pilha sobre um vetor dinâmico (instrumentos/vetor): o topo é o fim do vetor.

Empilhar é anexar no fim; desempilhar e topo leem a última casa. Ninguém se
desloca, por isso tudo custa 1, menos o empilhar que encontra o vetor cheio.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "vetor"))
from vetor import Vetor  # noqa: E402


class Pilha:
    def __init__(self, conta):
        self.v = Vetor(conta)

    def empilhar(self, x):
        self.v.anexar(x)

    def desempilhar(self):
        return self.v.remover(self.v.n - 1)

    def topo(self):
        return self.v.ler(self.v.n - 1)

    def valores(self):
        return self.v.valores()

    @property
    def n(self):
        return self.v.n

    @property
    def capacidade(self):
        return self.v.capacidade
