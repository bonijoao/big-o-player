"""Busca de padrão ingênua: encosta o padrão p (m letras) em cada posição i
do texto t (n letras) e compara letra a letra, da esquerda para a direita,
até errar ou casar as m. No pior caso (texto "aaaa…a", padrão "aa…ab"),
cada posição compara m letras: (n − m + 1)·m, O(n·m). Num texto de verdade,
quase toda posição erra na primeira ou na segunda letra: perto de n.

O texto mora no Texto do instrumento (um vetor de caracteres), que conta
cada letra lida. Cada comparação de letras conta 1 (`comparacoes`). A
complexidade ciclomática é medida em `buscar`."""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(AQUI, "..", "..", "instrumentos", "texto"))
from texto import TextoImutavel  # noqa: E402


def igual(t, k, p, j, conta):
    """t[k] = p[j]?"""
    conta.op("comparacoes")
    conta.evento("compara", k, j)
    return t.ler(k) == p[j]


def buscar(t, p, conta):
    n, m = t.n, len(p)
    achou = []
    for i in range(n - m + 1):
        j = 0
        while j < m and igual(t, i + j, p, j, conta):
            j += 1
        if j == m:
            achou.append(i)
            conta.evento("achou", i)
    return achou


MEDIDA = buscar


def texto(conta, s):
    """Um Texto com as letras de s, posto sem contar."""
    t = TextoImutavel(conta)
    t.casas = list(s)
    return t


# ---------- entradas ----------

def ler_texto(nome):
    """O texto do arquivo, sem o cabeçalho (tudo até a primeira linha em branco), numa linha só."""
    with open(os.path.join(AQUI, nome), encoding="utf-8") as f:
        return " ".join(f.read().split("\n\n", 1)[1].split())


def estrofe():
    """A primeira estrofe da Canção do Exílio, numa linha só."""
    with open(os.path.join(AQUI, "cancao-do-exilio.txt"), encoding="utf-8") as f:
        return " ".join(f.read().split("\n\n")[1].split())


def pior(n, m):
    """O pior caso: n − 1 letras a e um b no fim; o padrão, m − 1 letras a e um b."""
    return "a" * (n - 1) + "b", "a" * (m - 1) + "b"


def dna(n, m, r):
    """n bases sorteadas; o padrão, m bases sorteadas à parte."""
    return "".join(r.choice("ACGT") for _ in range(n)), "".join(r.choice("ACGT") for _ in range(m))
