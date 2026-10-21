"""Mede o intercalacao e grava dados.json. Rodar: python3 algoritmos/intercalacao/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import ordenacao
import intercalacao

if __name__ == "__main__":
    ordenacao.medir(intercalacao, AQUI)
