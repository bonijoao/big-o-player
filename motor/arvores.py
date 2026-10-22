"""Entradas das faixas de árvore (Percursos, Busca em árvore, AVL): n valores
distintos numa ordem de chegada, e a árvore comum montada com eles fora da conta.

A ordem de chegada é que decide a forma da árvore comum:
  crescente     cada valor é o maior até ali: a fila indiana, pendurada à direita
  decrescente   a fila indiana pendurada à esquerda
  embaralhada   sorteada: em média, cada valor fica a pouco mais de log₂ n níveis da raiz
  cheia         o do meio primeiro, depois os do meio de cada metade, nível por
                nível: com n = 2ᵏ − 1, a árvore sai cheia, com k níveis
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "instrumentos", "arvore"))
from arvore import ArvoreComum  # noqa: E402

CASOS = ["crescente", "decrescente", "embaralhada", "cheia"]


def cheia(v):
    """A ordem que monta a árvore mais baixa: os meios, nível por nível."""
    ordem, fila = [], [(0, len(v) - 1)] if v else []
    while fila:
        a, b = fila.pop(0)
        if a > b:
            continue
        m = (a + b) // 2
        ordem.append(v[m])
        fila += [(a, m - 1), (m + 1, b)]
    return ordem


def valores(n, caso, r):
    """n valores distintos (de 10 a 99 quando cabem; senão de 1 a 10n), na ordem do caso."""
    faixa = range(10, 100) if n <= 90 else range(1, 10 * n + 1)
    v = sorted(r.sample(faixa, n))
    if caso == "crescente":
        return v
    if caso == "decrescente":
        return v[::-1]
    if caso == "cheia":
        return cheia(v)
    r.shuffle(v)
    return v


def montar(vals, conta):
    """A árvore comum com os valores na ordem dada, montada fora da conta."""
    a = ArvoreComum(conta)
    for x in vals:
        a.inserir(x)
    conta.ops.clear()
    return a
