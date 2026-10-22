"""Mede o heapsort e grava dados.json. Rodar: python3 algoritmos/heapsort/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import ordenacao
import heapsort

if __name__ == "__main__":
    ordenacao.medir(heapsort, AQUI)
