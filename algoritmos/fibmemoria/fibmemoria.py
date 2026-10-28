"""Fibonacci com memória: a mesma recursão, mas cada fib(k) calculado fica
guardado na casa k de um Vetor (memo), vazia até ser calculada. Quando a
chamada volta a pedir fib(k), lê a resposta guardada em vez de recalcular.
Cada fib(k) é somado uma vez só: n − 1 somas e 2n − 1 chamadas. Paga com a
memória: as respostas guardadas, mais a pilha, que desce n níveis.

Roda sobre o Vetor do instrumento, que conta as casas lidas e escritas no
mesmo Contador; olhar o memo é ler uma casa, sempre o mesmo custo. Cada soma
conta 1 (`somas`). A complexidade ciclomática é medida em `fib_memo`."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "instrumentos", "vetor"))
from vetor import Vetor  # noqa: E402


def soma(a, b, conta):
    conta.op("somas")
    return a + b


def fib_memo(n, memo, conta):
    conta.entra(n)
    if n <= 1:
        r = n
    elif (guardado := memo.ler(n)) is not None:
        r = guardado
        conta.evento("lembra", n)
    else:
        r = soma(fib_memo(n - 1, memo, conta), fib_memo(n - 2, memo, conta), conta)
        memo.escrever(n, r)
        memo.guardadas += 1
        conta.ocupa("memo", memo.guardadas)
        conta.evento("guarda", n, r)
    conta.sai()
    return r


MEDIDA = fib_memo


def rodar(n, conta):
    memo = Vetor(conta, n + 1)   # as n + 1 casas, de fib(0) a fib(n), vazias; reservar não conta
    memo.guardadas = 0
    return fib_memo(n, memo, conta)
