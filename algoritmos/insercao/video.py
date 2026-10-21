"""Vídeo do insercao no molde das barrinhas (motor/video_ordenacao.py).

  python3 video.py                     -> insercao.mp4 + insercao.png (pôster)
  python3 video.py folha 5,12,20 f.png -> folha de contato
"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(AQUI, "..", "..", "motor"))
from cena import principal
from video_ordenacao import montar

CENAS, T_POSTER = montar(AQUI)

if __name__ == "__main__":
    principal(os.path.join(AQUI, "insercao"), CENAS, T_POSTER)
