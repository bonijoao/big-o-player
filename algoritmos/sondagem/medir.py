"""Mede a colisão por sondagem e grava dados.json. Rodar: python3 algoritmos/sondagem/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import colisao  # noqa: E402
import sondagem  # noqa: E402

if __name__ == "__main__":
    colisao.medir(sondagem, AQUI, "sondagem", {"a50": 0.5, "a75": 0.75, "a90": 0.9}, amax=0.95, passo=0.05,
                  ns_conferir=[0, 1, 8, 12, 15])
