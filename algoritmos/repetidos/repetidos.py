"""Achar repetidos: para cada posição do vetor, se o valor já apareceu antes.
Com o dicionário, cada valor pergunta à tabela se já passou por ali e, se não,
entra nela: uma ida à tabela por valor, O(n) no médio. Com o vetor, cada valor
é comparado com todos os anteriores até achar um igual: num vetor sem
repetidos, n(n − 1)/2 comparações. Roda sobre o Dicionário (sondagem linear)."""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor"), os.path.join(AQUI, "..", "..", "instrumentos", "dicionario")]
from dicionario import DicSondagem  # noqa: E402


def repetidos(v, conta):
    d = DicSondagem(conta)
    rep = []
    for x in v:
        if d.tem(x):
            rep.append(True)
        else:
            rep.append(False)
            d.por(x, True)
            conta.ocupa("chaves", d.n)
    return rep


MEDIDA = repetidos


def repetidos_vetor(v, conta):
    """Sem dicionário: compara cada valor com os anteriores, até achar um igual."""
    rep = []
    for i in range(len(v)):
        achou = False
        for j in range(i):
            conta.op("comparacoes")
            if v[j] == v[i]:
                achou = True
                break
        rep.append(achou)
    return rep


# ---------- entradas ----------

def gerar(n, caso, r):
    """n valores. Pequenos (até 90, no palco): de 10 a 99; "poucos" usa só de 10 a 19.
    Grandes: de 1 a n (sorteados), uma permutação de 1 a n (distintos) ou de 1 a 10 (poucos)."""
    if n <= 90:
        faixa, poucos = range(10, 100), range(10, 20)
    else:
        faixa, poucos = range(1, n + 1), range(1, 11)
    if caso == "distintos":
        return r.sample(faixa, n)
    return [r.choice(poucos if caso == "poucos" else faixa) for _ in range(n)]
