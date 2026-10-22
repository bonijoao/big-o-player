"""Média e variância em uma passada (Welford), e as duas contas com que ele
é comparado: a soma dos quadrados (uma passada, mas cancela) e as duas
passadas (exata, mas lê tudo duas vezes e precisa guardar os valores).

Cada valor lido conta 1 (`leituras`). A complexidade ciclomática é medida
em `welford`."""


def welford(x, conta):
    n, media, m2 = 0, 0.0, 0.0
    for valor in x:
        conta.op("leituras")
        n += 1
        delta = valor - media
        media += delta / n
        m2 += delta * (valor - media)
        conta.evento("le", n - 1, delta, media, m2)
    return media, m2 / (n - 1)


def soma_dos_quadrados(x, conta):
    """Var = (Σx² − (Σx)²/n)/(n − 1): os dois somatórios ficam enormes e
    quase iguais, e a subtração joga fora os algarismos que importam."""
    n, s1, s2 = 0, 0.0, 0.0
    for valor in x:
        conta.op("leituras")
        n += 1
        s1 += valor
        s2 += valor * valor
    return s1 / n, (s2 - s1 * s1 / n) / (n - 1)


def duas_passadas(x, conta):
    """Primeiro a média; depois, numa segunda leitura, os desvios. Num fluxo
    (dados que passam uma vez só), a segunda leitura exige ter guardado tudo."""
    guardados, s = [], 0.0
    for valor in x:
        conta.op("leituras")
        guardados.append(valor)
        conta.ocupa("guardados", len(guardados))
        s += valor
    media = s / len(guardados)
    q = 0.0
    for valor in guardados:
        conta.op("leituras")
        d = valor - media
        q += d * d
    return media, q / (len(guardados) - 1)


MEDIDA = welford
FORMULAS = {"welford": welford, "soma": soma_dos_quadrados, "duas": duas_passadas}
