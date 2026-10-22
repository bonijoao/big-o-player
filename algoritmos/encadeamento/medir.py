"""Mede a colisão por encadeamento e grava dados.json. Rodar: python3 algoritmos/encadeamento/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import colisao  # noqa: E402
import encadeamento  # noqa: E402

if __name__ == "__main__":
    colisao.medir(encadeamento, AQUI, "encadeamento", {"a50": 0.5, "a100": 1.0, "a200": 2.0}, amax=2.0, passo=0.1,
                  ns_conferir=[0, 1, 8, 16, 32])
