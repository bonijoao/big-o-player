"""Roda o K-means instrumentado e grava todos os números em dados.json.

Nada na página nem no vídeo é digitado à mão: tudo sai daqui.
Rodar da raiz do projeto: python3 algoritmos/kmeans/medir.py
"""
import csv
import json
import os
import random
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador
from ciclomatica import medir as ciclomatica
import kmeans as km

K = 3
SEMENTE = 4          # início do vídeo: dois centros no meio, um entre as setosas
SEMENTES = range(1, 201)
TAMANHOS = [150, 300, 600, 1200, 2400, 4800]


def iris():
    with open(os.path.join(AQUI, "iris.csv")) as f:
        linhas = list(csv.DictReader(f))
    return ([[float(l["comprimento"]), float(l["largura"])] for l in linhas],
            [l["especie"] for l in linhas])


def inicio(pontos, semente):
    """Forgy: k pontos sorteados como centros iniciais. O iris tem pontos
    repetidos; se dois centros caírem no mesmo lugar, sorteia de novo."""
    r = random.Random(semente)
    while True:
        idx = r.sample(range(len(pontos)), K)
        if len({tuple(pontos[i]) for i in idx}) == K:
            return idx


def rodar(pontos, semente):
    conta = Contador()
    idx = inicio(pontos, semente)
    rotulos, centros = km.kmeans(pontos, [pontos[i] for i in idx], conta)
    return conta, idx, rotulos, centros


def simulado(n, semente=2026):
    """Três nuvens normais parecidas com as pétalas do iris."""
    r = random.Random(semente)
    medias = [(1.5, 0.25, 0.17, 0.10), (4.3, 1.3, 0.47, 0.20), (5.6, 2.0, 0.55, 0.27)]
    return [[r.gauss(mx, sx), r.gauss(my, sy)]
            for i in range(n) for mx, my, sx, sy in [medias[i % 3]]]


def main():
    pontos, especies = iris()
    conta, idx, rotulos, centros = rodar(pontos, SEMENTE)
    n, i = len(pontos), len(conta.fotos)

    voltas = [len(rodar(pontos, s)[0].fotos) for s in SEMENTES]

    crescimento = []
    for tam in TAMANHOS:
        c, *_ = rodar(simulado(tam), 1)
        crescimento.append({"n": tam, "i": len(c.fotos), "ops": c.ops["distancias"], "pico": c.pico})

    dados = {
        "exemplo": {
            "dados": "iris (R), pétalas: comprimento × largura, cm",
            "n": n, "k": K, "d": 2, "semente": SEMENTE, "iniciais": idx,
            "i": i, "ops": conta.ops["distancias"], "por_volta": n * K,
            "pontos": pontos, "especies": especies,
            "fotos": [{"rotulos": f["rotulos"], "centros": f["centros"],
                       "ops": f["ops"]["distancias"]} for f in conta.fotos],
            "final": {"rotulos": rotulos, "centros": centros},
        },
        "tempo": {
            "unidade": "distâncias",
            "crescimento": crescimento,
            "crescimento_dados": "Dados simulados: três nuvens normais (semente 2026), centros iniciais sorteados com a semente 1",
            "voltas_por_semente": {"sementes": len(SEMENTES), "voltas": voltas},
        },
        "memoria": {"pico": conta.pico, "detalhe": conta.pico_detalhe},
        "ciclomatica": ciclomatica(km.kmeans),
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False, indent=1)
    with open(os.path.join(AQUI, "inicio.csv"), "w") as f:
        f.write("indice\n" + "".join(f"{j + 1}\n" for j in idx))  # base 1 para o R

    print(f"iris n={n} k={K} semente={SEMENTE} início={idx}: {i} voltas, "
          f"{conta.ops['distancias']} distâncias, pico {conta.pico} valores {conta.pico_detalhe}")
    print(f"voltas em {len(SEMENTES)} sementes: min {min(voltas)} max {max(voltas)}")
    for c in crescimento:
        print(f"  n={c['n']:5d}  i={c['i']:2d}  distâncias={c['ops']:7d}  pico={c['pico']}")
    print(f"ciclomática M={dados['ciclomatica']['M']}")


if __name__ == "__main__":
    main()
