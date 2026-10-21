"""Mede a busca sequencial e grava dados.json. Rodar: python3 algoritmos/sequencial/medir.py"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

import busca
import sequencial

if __name__ == "__main__":
    busca.medir(sequencial, AQUI)
