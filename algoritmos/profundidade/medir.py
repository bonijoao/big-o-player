"""Mede a busca em profundidade e grava dados.json. Rodar: python3 algoritmos/profundidade/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import grade  # noqa: E402
import profundidade  # noqa: E402


def extra(ordem, c):
    """A ordem de visita (quem entra na pilha, na ordem) e o número de visita de cada vértice."""
    return {"visitas": [e[1] for e in c.eventos if e[0] == "empilha"], "ordem": ordem}


if __name__ == "__main__":
    grade.medir(profundidade.MEDIDA, AQUI, "operações na pilha e vizinhos olhados", "pilha", extra)
