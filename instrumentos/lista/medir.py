"""Mede o custo de cada operação das duas listas encadeadas e grava dados.json. Rodar: python3 instrumentos/lista/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import instrumento  # noqa: E402
from lista import ListaDinamica, ListaEstatica  # noqa: E402

ESTRUTURAS = {"estatica": ListaEstatica, "dinamica": ListaDinamica}
ENCHER = "inserir_fim"
OPERACOES = []
for v in ESTRUTURAS:
    OPERACOES += [
        {"id": f"ler-ultima-{v}", "estrutura": v, "chamada": "ler", "args": lambda n: [n - 1], "minimo": 1},
        {"id": f"inserir-inicio-{v}", "estrutura": v, "chamada": "inserir_inicio", "args": lambda n: [-1]},
        {"id": f"inserir-fim-{v}", "estrutura": v, "chamada": "inserir_fim", "args": lambda n: [-1]},
        {"id": f"inserir-fim-media-{v}", "estrutura": v, "chamada": "inserir_fim", "seguidas": "media"},
        {"id": f"inserir-fim-pior-{v}", "estrutura": v, "chamada": "inserir_fim", "seguidas": "pior"},
        {"id": f"inserir-meio-{v}", "estrutura": v, "chamada": "inserir", "args": lambda n: [n // 2, -1]},
        {"id": f"remover-inicio-{v}", "estrutura": v, "chamada": "remover_inicio", "args": lambda n: [], "minimo": 1},
        {"id": f"remover-fim-{v}", "estrutura": v, "chamada": "remover", "args": lambda n: [n - 1], "minimo": 1},
        {"id": f"buscar-ausente-{v}", "estrutura": v, "chamada": "buscar", "args": lambda n: [-1]},
    ]


def sortear(r, variante, e):
    n = e.n
    if n == 0:
        op = r.choice(["inserir_inicio", "inserir_fim", "inserir"])
    else:
        op = r.choice(["inserir_inicio", "inserir_fim", "inserir", "inserir", "ler", "remover_inicio", "remover", "buscar"])
    x = r.randrange(100)
    return op, {"inserir_inicio": [x], "inserir_fim": [x], "inserir": [r.randint(0, n), x],
                "ler": [r.randrange(n)] if n else [], "remover_inicio": [],
                "remover": [r.randrange(n)] if n else [], "buscar": [x]}[op]


if __name__ == "__main__":
    instrumento.medir(ESTRUTURAS, ENCHER, OPERACOES, sortear, AQUI)
