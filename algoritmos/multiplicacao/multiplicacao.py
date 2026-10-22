"""Multiplicação de matrizes, pela definição: C[i][j] é a soma de
A[i][k] · B[k][j] para k de 1 a n. São n² casas de C, cada uma com n
multiplicações: n³. Roda sobre a Matriz do instrumento (guardada linha a
linha), que conta cada casa lida e escrita.

Cada multiplicação conta 1 (`multiplicacoes`). A memória é a matriz C,
n² casas (`conta.ocupa`). A complexidade ciclomática é medida em `multiplicar`."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "instrumentos", "matriz"))
from matriz import Matriz  # noqa: E402


def vezes(a, b, conta):
    conta.op("multiplicacoes")
    return a * b


def multiplicar(A, B, conta):
    n = A.linhas
    C = Matriz(conta, n, n)
    conta.ocupa("C", n * n)
    for i in range(n):
        for j in range(n):
            s = 0
            for k in range(n):
                s += vezes(A.ler(i, k), B.ler(k, j), conta)
            C.escrever(i, j, s)
            conta.evento("casa", i, j, s)
    return C


MEDIDA = multiplicar


def matriz(conta, valores):
    """Uma Matriz n × n com os valores dados (linha a linha), posta sem contar."""
    n = len(valores)
    m = Matriz(conta, n, n)
    m.casas = [x for linha in valores for x in linha]
    return m


def sortear(n, r):
    return [[r.randrange(10) for _ in range(n)] for _ in range(n)]
