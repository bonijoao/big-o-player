"""Mede a busca em largura e grava dados.json. Rodar: python3 algoritmos/largura/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import grade  # noqa: E402
import largura  # noqa: E402


def extra(dist, c):
    """A ordem de visita (quem sai da fila, na ordem) e a distância de cada vértice à origem."""
    return {"visitas": [e[1] for e in c.eventos if e[0] == "visita"], "dist": dist}


if __name__ == "__main__":
    grade.medir(largura.MEDIDA, AQUI, "operações na fila e vizinhos olhados", "fila", extra)
