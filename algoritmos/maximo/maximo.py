"""Máximo de um vetor: guarda o maior visto até agora e compara com cada um
dos outros. São sempre n − 1 comparações. Quantas vezes o maior troca
depende da entrada: nenhuma num vetor decrescente, n − 1 num crescente e,
num embaralhado, em média 1/2 + 1/3 + … + 1/n (perto de ln n).

Cada comparação conta 1 (`comparacoes`); cada troca do maior, também
(`trocas`). A complexidade ciclomática é medida em `maximo`."""


def maior(v, i, m, conta):
    """v[i] > m: o da vez passa o maior até aqui?"""
    conta.op("comparacoes")
    conta.evento("compara", i)
    return v[i] > m


def maximo(v, conta):
    m = v[0]
    for i in range(1, len(v)):
        if maior(v, i, m, conta):
            m = v[i]
            conta.op("trocas")
            conta.evento("troca", i)
    return m


MEDIDA = maximo


def gerar(n, caso, r):
    """n valores de 10 a 99: sorteados (podem repetir), crescentes ou decrescentes (sem repetir)."""
    faixa = range(10, 100) if n <= 90 else range(1, 10 * n)
    if caso == "sorteada":
        return [r.choice(faixa) for _ in range(n)]
    v = sorted(r.sample(faixa, n))
    return v if caso == "crescente" else v[::-1]
