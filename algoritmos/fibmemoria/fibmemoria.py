"""Fibonacci com memória: a mesma recursão, mas cada fib(k) calculado fica
guardado num Dicionário (memo). Quando a chamada volta a pedir fib(k), lê a
resposta guardada em vez de recalcular. Cada fib(k) é somado uma vez só:
n − 1 somas e 2n − 1 chamadas. Paga com a memória: as chaves guardadas,
mais a pilha, que desce n níveis.

Roda sobre o Dicionário com sondagem linear do instrumento, que conta as
casas lidas e escritas no mesmo Contador. Cada soma conta 1 (`somas`).
A complexidade ciclomática é medida em `fib_memo`."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "instrumentos", "dicionario"))
from dicionario import DicSondagem  # noqa: E402


def soma(a, b, conta):
    conta.op("somas")
    return a + b


def fib_memo(n, memo, conta):
    conta.entra(n)
    if n <= 1:
        r = n
    elif memo.tem(n):
        r = memo.ler(n)
        conta.evento("lembra", n)
    else:
        r = soma(fib_memo(n - 1, memo, conta), fib_memo(n - 2, memo, conta), conta)
        memo.por(n, r)
        conta.ocupa("memo", memo.n)
        conta.evento("guarda", n, r)
    conta.sai()
    return r


MEDIDA = fib_memo


def rodar(n, conta):
    return fib_memo(n, DicSondagem(conta), conta)
