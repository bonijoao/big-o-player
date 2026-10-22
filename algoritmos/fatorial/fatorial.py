"""Fatorial recursivo: n! = n · (n − 1)!, e 1! = 0! = 1. Cada chamada espera
a de baixo voltar para multiplicar: a pilha de chamadas desce n níveis antes
da primeira multiplicação.

Cada multiplicação conta 1 (`multiplicacoes`); cada nível da pilha, um valor
guardado (`conta.entra`/`sai`). A complexidade ciclomática é medida em `fatorial`."""


def fatorial(n, conta):
    conta.entra(n)
    if n <= 1:
        r = 1
    else:
        r = n * fatorial(n - 1, conta)
        conta.op("multiplicacoes")
        conta.evento("multiplica", n, r)
    conta.sai()
    return r


MEDIDA = fatorial
