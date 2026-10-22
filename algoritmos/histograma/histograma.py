"""Histograma com as classes do hist() do R: o número de classes de Sturges,
limites "redondos" escolhidos como o pretty() do R e classes fechadas à
direita (a primeira, fechada também à esquerda).

Uma passada acha o menor e o maior; outra põe cada valor na sua classe. Com
classes de mesma largura h, a classe sai de uma conta, teto((x − a)/h), sem
procurar nada. Cada valor lido conta 1 (`leituras`); as contagens são o
único vetor auxiliar, uma casa por classe."""
import math
import sys

EPS = sys.float_info.epsilon
FOLGA = 1e-7      # o hist() do R desloca os limites em 1e-7 × h: um valor a um fio do limite fica na classe de baixo


def sturges(n):
    return math.ceil(math.log2(n) + 1)


def pretty(menor, maior, ndiv, min_n=1, h=1.5, h5=2.75):
    """O R_pretty do R (src/appl/pretty.c), com os padrões do pretty():
    devolve (a, b, unidade), com b − a = c × unidade."""
    dx = maior - menor
    if dx == 0 and maior == 0:
        cell, pequeno = 1.0, True
    else:
        cell = max(abs(menor), abs(maior))
        u = 1 + (1 / (1 + h) if h5 >= 1.5 * h + 0.5 else 1.5 / (1 + h5))
        u *= max(1, ndiv) * EPS
        pequeno = dx < cell * u * 3
    if pequeno:
        if cell > 10:
            cell = 9 + cell / 10
        cell *= 0.75
        if min_n > 1:
            cell /= min_n
    else:
        cell = dx
        if ndiv > 1:
            cell /= ndiv
    base = 10.0 ** math.floor(math.log10(cell))
    unit = base
    if 2 * base - cell < h * (cell - unit):
        unit = 2 * base
        if 5 * base - cell < h5 * (cell - unit):
            unit = 5 * base
            if 10 * base - cell < h * (cell - unit):
                unit = 10 * base
    ns = math.floor(menor / unit + 1e-10)
    nu = math.ceil(maior / unit - 1e-10)
    while ns * unit > menor + 1e-10 * unit:
        ns -= 1
    while nu * unit < maior - 1e-10 * unit:
        nu += 1
    k = int(0.5 + nu - ns)
    if k < min_n:
        k = min_n - k
        if ns >= 0:
            nu += k // 2
            ns -= k // 2 + k % 2
        else:
            ns -= k // 2
            nu += k // 2 + k % 2
    return ns * unit, nu * unit, unit


def classes(menor, maior, n):
    """(c, a, h): quantas classes, onde começa a primeira e a largura."""
    a, b, h = pretty(menor, maior, sturges(n))
    return round((b - a) / h), a, h


def histograma(x, conta):
    n = len(x)
    conta.op("leituras")
    menor = maior = x[0]
    for i in range(1, n):
        conta.op("leituras")
        valor = x[i]
        if valor < menor:
            menor = valor
        elif valor > maior:
            maior = valor
    conta.evento("faixa", menor, maior)
    c, a, h = classes(menor, maior, n)
    contagens = conta.aloca("contagens", [0] * c)
    for i in range(n):
        conta.op("leituras")
        j = math.ceil((x[i] - a) / h - FOLGA)
        if j < 1:
            j = 1
        contagens[j - 1] += 1
        conta.evento("conta", i, j - 1)
    return contagens, a, h


MEDIDA = histograma
