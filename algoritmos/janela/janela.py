"""Máximo em janela deslizante: o maior valor de cada trecho de k casas
seguidas do vetor. O deque guarda posições, da frente para o fundo, com
valores que só diminuem: a frente sai quando fica para trás da janela, e quem
chega tira de trás todos os que não são maiores que ele (nunca mais serão o
máximo). O máximo da janela é sempre o da frente. Roda sobre o Deque do
instrumento. O ingênuo, para comparar, olha as k casas de cada janela."""
import os
import random
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor"), os.path.join(AQUI, "..", "..", "instrumentos", "deque")]
from deque import Deque  # noqa: E402


def nao_maior(v, j, i, conta):
    """v[j] ≤ v[i]: o do fundo não é maior que o que chega."""
    conta.op("comparacoes")
    return v[j] <= v[i]


def poe(d, i, conta):
    conta.op("deque")
    d.por_tras(i)
    conta.ocupa("posicoes", d.n)
    conta.evento("poe", i)


def tira_tras(d, conta):
    conta.op("deque")
    j = d.tirar_tras()
    conta.ocupa("posicoes", d.n)
    conta.evento("tira_tras", j)


def tira_frente(d, conta):
    conta.op("deque")
    j = d.tirar_frente()
    conta.ocupa("posicoes", d.n)
    conta.evento("tira_frente", j)


def maximos(v, k, conta):
    d = Deque(conta)
    saida = []
    for i in range(len(v)):
        if i >= k and d.frente() == i - k:
            tira_frente(d, conta)
        while d.n > 0 and nao_maior(v, d.fundo(), i, conta):
            tira_tras(d, conta)
        poe(d, i, conta)
        if i >= k - 1:
            saida.append(v[d.frente()])
    return saida


MEDIDA = maximos


def ingenuo(v, k, conta):
    """Olha as k casas de cada janela: k − 1 comparações por janela."""
    saida = []
    for a in range(len(v) - k + 1):
        m = v[a]
        for j in range(a + 1, a + k):
            conta.op("comparacoes")
            if v[j] > m:
                m = v[j]
        saida.append(m)
    return saida


# ---------- entradas ----------

def gerar(n, caso, r):
    """n valores: sorteados (podem repetir), crescentes ou decrescentes (sem repetir)."""
    faixa = range(10, 100) if n <= 90 else range(1, 10 * n)
    if caso == "sorteada":
        return [r.choice(faixa) for _ in range(n)]
    v = sorted(r.sample(faixa, n))
    return v if caso == "crescente" else v[::-1]
