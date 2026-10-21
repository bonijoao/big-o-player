"""Mede o bolha e grava dados.json. Rodar: python3 algoritmos/bolha/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import ordenacao
import bolha

if __name__ == "__main__":
    ordenacao.medir(bolha, AQUI)
