"""Pôster da faixa (motor/video_casos.py): um quadro parado, a capa provisória.
A animação mora na simulação ao vivo (simulacao/palco.js).

  python3 video.py poster              -> inverter.png
  python3 video.py folha 0 f.png       -> folha de contato
"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(AQUI, "..", "..", "motor"))
from cena import principal
from video_casos import montar_inverter

CENAS, T_POSTER = montar_inverter(AQUI)

if __name__ == "__main__":
    principal(os.path.join(AQUI, "inverter"), CENAS, T_POSTER)
