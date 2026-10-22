"""Pôster da faixa (motor/video_casos.py): um quadro parado, a capa provisória.
A animação mora na simulação ao vivo (simulacao/palco.js).

  python3 video.py poster              -> histograma.png
  python3 video.py folha 0 f.png       -> folha de contato
"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(AQUI, "..", "..", "motor"))
from cena import principal
from video_casos import montar_histograma

CENAS, T_POSTER = montar_histograma(AQUI)

if __name__ == "__main__":
    principal(os.path.join(AQUI, "histograma"), CENAS, T_POSTER)
