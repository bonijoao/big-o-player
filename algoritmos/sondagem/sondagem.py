"""Colisão por sondagem linear: pôr chaves numa tabela de m casas fixas, em que
cada casa guarda uma chave. A chave nova olha a sua casa e, se está ocupada
por outra, a seguinte, dando a volta no fim, até achar a casa vazia onde entra.
Uma sondagem é uma casa olhada, inclusive a vazia do fim. As chaves ocupadas
formam blocos, e quem cai num bloco anda até o fim dele: perto de α = 1 os
blocos se juntam, e pôr custa ½(1 + 1/(1 − α)²) sondagens. Roda sobre as casas
do Dicionário (DicSondagem com m fixo)."""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor"), os.path.join(AQUI, "..", "..", "instrumentos", "dicionario")]
from dicionario import DicSondagem, casa_de  # noqa: E402


def olha(t, i, conta):
    """Uma sondagem: lê a chave guardada na casa i (None se vazia)."""
    conta.op("sondagens")
    return t.le_chave(i)


def inserir(t, k, conta):
    i = casa_de(k, t.bits)
    x = olha(t, i, conta)
    while x is not None:
        if x == k:
            break
        i = (i + 1) % t.m
        x = olha(t, i, conta)
    if x is None:
        t.escreve_chave(i, k)
        t.escreve_valor(i, k)
        t.n += 1
    return i


MEDIDA = inserir


def tabela(bits, conta):
    t = DicSondagem(conta, bits=bits, fixa=True)
    conta.ocupa("tabela", 2 * t.m)
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
    """Sondagens médias por chave, pondo até α (Knuth): ½(1 + 1/(1 − α))."""
    return (1 + 1 / (1 - a)) / 2


def formula_ultima(a):
    """Sondagens para pôr uma chave nova com ocupação α (Knuth): ½(1 + 1/(1 − α)²)."""
    return (1 + 1 / (1 - a) ** 2) / 2


def chaves(n, caso, bits, r):
    """n chaves distintas de 100 a 999 (no palco), sorteadas ou todas caindo na mesma casa."""
    if caso == "mesma_casa":
        alvo = casa_de(r.randrange(100, 1000), bits)
        todas = [k for k in range(100, 1000) if casa_de(k, bits) == alvo]
        return r.sample(todas, n)
    return r.sample(range(100, 1000), n)
