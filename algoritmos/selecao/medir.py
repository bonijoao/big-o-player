"""Mede o selecao e grava dados.json. Rodar: python3 algoritmos/selecao/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import ordenacao
import selecao

if __name__ == "__main__":
    ordenacao.medir(selecao, AQUI)
