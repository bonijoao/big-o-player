"""Mede o insercao e grava dados.json. Rodar: python3 algoritmos/insercao/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import ordenacao
import insercao

if __name__ == "__main__":
    ordenacao.medir(insercao, AQUI)
