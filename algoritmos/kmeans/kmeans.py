"""K-means pelo algoritmo de Lloyd, com contadores.

Cada distância calculada passa por `distancia()`, que conta; cada lista
auxiliar passa por `conta.aloca()`. `conta.foto()` só guarda o estado de cada
volta para o vídeo. A complexidade ciclomática é medida na função `kmeans`.
"""

import copy

MAX_VOLTAS = 100


def distancia(p, q, conta):
    """Quadrado da distância euclidiana (mesmo vencedor, sem raiz)."""
    conta.op("distancias")
    return (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2


def kmeans(pontos, iniciais, conta):
    k = len(iniciais)
    centros = conta.aloca("centros", copy.deepcopy(iniciais))
    rotulos = conta.aloca("rotulos", [-1] * len(pontos))
    for volta in range(MAX_VOLTAS):
        mudou = False
        for i, p in enumerate(pontos):
            melhor = 0
            menor = distancia(p, centros[0], conta)
            for j in range(1, k):
                d = distancia(p, centros[j], conta)
                if d < menor:
                    melhor, menor = j, d
            if rotulos[i] != melhor:
                rotulos[i] = melhor
                mudou = True
        conta.foto(rotulos=rotulos, centros=centros)
        if not mudou:
            break
        soma_x = conta.aloca("soma_x", [0.0] * k)
        soma_y = conta.aloca("soma_y", [0.0] * k)
        contagens = conta.aloca("contagens", [0] * k)
        for i, p in enumerate(pontos):
            j = rotulos[i]
            soma_x[j] += p[0]
            soma_y[j] += p[1]
            contagens[j] += 1
        for j in range(k):
            if contagens[j] > 0:
                centros[j] = [soma_x[j] / contagens[j], soma_y[j] / contagens[j]]
    return rotulos, centros
