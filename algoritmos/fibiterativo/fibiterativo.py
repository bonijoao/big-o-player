"""Fibonacci iterativo: anda de baixo para cima guardando só os dois últimos
valores. n voltas, uma soma por volta, e nenhuma lista: O(n) de tempo e
O(1) de memória.

Cada soma conta 1 (`somas`). A complexidade ciclomática é medida em `fib`."""


def soma(a, b, conta):
    conta.op("somas")
    return a + b


def fib(n, conta):
    a, b = 0, 1
    for i in range(n):
        a, b = b, soma(a, b, conta)
        conta.evento("volta", i, a, b)
    return a


MEDIDA = fib


def rodar(n, conta):
    return fib(n, conta)
