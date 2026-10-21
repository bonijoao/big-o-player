"""Mede a busca binaria e grava dados.json. Rodar: python3 algoritmos/binaria/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import busca
import binaria

if __name__ == "__main__":
    busca.medir(binaria, AQUI)
