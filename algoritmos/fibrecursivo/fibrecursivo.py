"""Fibonacci recursivo, direto da definição: fib(n) = fib(n − 1) + fib(n − 2),
com fib(0) = 0 e fib(1) = 1. As duas chamadas recalculam os mesmos valores
de novo e de novo: fib(n) faz fib(n + 1) − 1 somas e 2·fib(n + 1) − 1
chamadas, que crescem como φⁿ (φ ≈ 1,618). A pilha, porém, só desce n níveis.

Cada soma conta 1 (`somas`); cada nível da pilha, um valor guardado
(`conta.entra`/`sai`). A complexidade ciclomática é medida em `fib`."""


def soma(a, b, conta):
    conta.op("somas")
    return a + b


def fib(n, conta):
    conta.entra(n)
    if n <= 1:
        r = n
    else:
        r = soma(fib(n - 1, conta), fib(n - 2, conta), conta)
    conta.sai()
    return r


MEDIDA = fib


def rodar(n, conta):
    return fib(n, conta)
