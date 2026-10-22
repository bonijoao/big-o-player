"""Mede o custo de cada operação nas três vistas do grafo e grava dados.json. Rodar: python3 instrumentos/grafo/medir.py

O n da tabela e do gráfico é V, o número de vértices, no grafo de medição
(grafo.anel: cada vértice ligado aos três seguintes, E = 3V). As perguntas
são sobre o vértice 0: a aresta 0–V/2 não existe (o pior caso de quem
procura), e a 0–1 existe.
"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import instrumento  # noqa: E402
from grafo import GrafoIncidencia, GrafoLista, GrafoMatriz, anel  # noqa: E402

ESTRUTURAS = {"matriz": GrafoMatriz, "lista": GrafoLista, "incidencia": GrafoIncidencia}
MINIMO = 8        # com menos vértices, a aresta 0–V/2 já está no anel
INICIO = 6        # as sequências sorteadas começam do anel de 6 vértices (todas as 15 arestas)


def montar_anel(classe, conta, V):
    g = classe(conta, V)
    for u, v in anel(V):
        g.por(u, v)
    return g


montar_anel.__name__ = "anel"
OPERACOES = []
for v in ESTRUTURAS:
    OPERACOES += [
        {"id": f"existe-{v}", "estrutura": v, "chamada": "existe", "args": lambda n: [0, n // 2], "minimo": MINIMO},
        {"id": f"vizinhos-{v}", "estrutura": v, "chamada": "vizinhos", "args": lambda n: [0], "minimo": MINIMO},
        {"id": f"grau-{v}", "estrutura": v, "chamada": "grau", "args": lambda n: [0], "minimo": MINIMO},
        {"id": f"por-{v}", "estrutura": v, "chamada": "por", "args": lambda n: [0, n // 2], "minimo": MINIMO},
        {"id": f"tirar-{v}", "estrutura": v, "chamada": "tirar", "args": lambda n: [0, 1], "minimo": MINIMO},
    ]


def sortear(r, variante, g):
    """Uma operação válida no grafo de agora: só põe aresta que não existe e só tira a que existe."""
    existentes = g.arestas()
    livres = [[u, v] for u in range(g.V) for v in range(u + 1, g.V) if [u, v] not in existentes]
    ops = ["existe", "vizinhos", "grau"] + ["por"] * 2 * bool(livres) + ["tirar"] * bool(existentes)
    op = r.choice(ops)
    if op == "por":
        return op, r.choice(livres)
    if op == "tirar":
        u, v = r.choice(existentes)
        return op, [u, v] if r.random() < 0.5 else [v, u]
    if op == "existe":
        u, v = r.sample(range(g.V), 2)
        return op, [u, v]
    return op, [r.randrange(g.V)]


if __name__ == "__main__":
    instrumento.medir(ESTRUTURAS, montar_anel, OPERACOES, sortear, AQUI, INICIO)
