"""Mede o Fibonacci com memória (e os outros dois, para o gráfico comum) e grava dados.json.
Rodar: python3 algoritmos/fibmemoria/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import fibonacci  # noqa: E402

if __name__ == "__main__":
    fibonacci.medir("memoria", AQUI)
