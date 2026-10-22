"""Colisão por encadeamento: pôr chaves numa tabela de m casas fixas, em que
cada casa guarda o início de uma corrente de nós. A chave nova procura na
corrente da sua casa (para não entrar duas vezes) e, sem achar, entra no
começo. Uma sondagem é uma casa olhada: o início da corrente e cada nó.
Com n chaves, a corrente tem α = n/m nós em média: pôr custa 1 + α sondagens,
e α pode passar de 1. Roda sobre as casas do Dicionário (DicEncadeamento com m fixo)."""
import os
import random
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor"), os.path.join(AQUI, "..", "..", "instrumentos", "dicionario")]
from dicionario import DicEncadeamento, No, casa_de  # noqa: E402


def olha(t, p, conta):
    """Uma sondagem: o início da corrente (p = None) ou o nó p; devolve o que a casa guarda."""
    conta.op("sondagens")
    return p


def inserir(t, k, conta):
    i = casa_de(k, t.bits)
    p = olha(t, t.le_cabeca(i), conta)
    while p is not None:
        if t.le_chave(p) == k:
            break
        p = olha(t, t.le_prox(p), conta)
    if p is None:
        p = No()
        t._escreve(p, "chave", k)
        t._escreve(p, "valor", k)
        t._escreve(p, "prox", t.le_cabeca(i))
        t.escreve_cabeca(i, p)
        t.n += 1
        conta.ocupa("nos", 3 * t.n)
    return p


MEDIDA = inserir


def tabela(bits, conta):
    t = DicEncadeamento(conta, bits=bits, fixa=True)
    conta.ocupa("tabela", t.m)
    return t


def inserir_todas(chaves, bits, conta):
    """Põe as chaves uma a uma; devolve a tabela e as sondagens de cada uma."""
    t = tabela(bits, conta)
    sondagens = []
    for k in chaves:
        antes = conta.ops.get("sondagens", 0)
        inserir(t, k, conta)
        sondagens.append(conta.ops.get("sondagens", 0) - antes)
    return t, sondagens


def formula_media(a):
    """Sondagens médias por chave, pondo até α (Knuth): 1 + α/2."""
    return 1 + a / 2


def formula_ultima(a):
    """Sondagens para pôr uma chave nova com ocupação α: o início e a corrente inteira, 1 + α."""
    return 1 + a


def chaves(n, caso, bits, r):
    """n chaves distintas de 100 a 999 (no palco), sorteadas ou todas caindo na mesma casa."""
    if caso == "mesma_casa":
        alvo = casa_de(r.randrange(100, 1000), bits)
        todas = [k for k in range(100, 1000) if casa_de(k, bits) == alvo]
        return r.sample(todas, n)
    return r.sample(range(100, 1000), n)
