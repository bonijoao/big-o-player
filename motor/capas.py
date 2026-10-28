"""Recorta as capas de uma grade 2×2 (4 capas separadas por uma borda creme) e exporta em WebP.

  python3 motor/capas.py <grade.png> <alg ↖> <alg ↗> <alg ↙> <alg ↘>

Para cada capa, em capas/:
  <alg>-240.webp, <alg>-480.webp   a capa inteira (cartões, cabeça da playlist, encarte; 1× e 2×)
  <alg>-arte.webp                  só a ilustração, 96 px (a lateral, as linhas da playlist e a barra do
                                   player, onde a capa fica com 48 px e o título vira mancha)
O gerar.py liga a capa à faixa quando os arquivos existem; sem eles, a faixa fica com o pôster.

O corte acha, em cada quadrante, as linhas e colunas que são capa (quase nenhum pixel da cor da borda)
e tira o quadrado de dentro, 2 px para dentro, sem sobra de borda nem corte da arte.
Confira cada capa pelo título e pelo código impresso nela, não só pela posição.
"""
import os
import sys

import numpy as np
from PIL import Image

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SAIDA = os.path.join(RAIZ, "capas")
TAMANHOS = [240, 480]
ARTE = 96


def borda_de(a):
    """A cor da borda: a mediana da cruz entre as quatro capas."""
    meio = a.shape[0] // 2
    cruz = np.concatenate([a[meio - 3:meio + 3].reshape(-1, 3), a[:, meio - 3:meio + 3].reshape(-1, 3)])
    return np.median(cruz, axis=0)


def faixa(perfil, ini, lim=0.9):
    dentro = [ini + i for i, x in enumerate(perfil) if x >= lim]
    return dentro[0], dentro[-1]


def recortar(caminho):
    im = Image.open(caminho).convert("RGB")
    a = np.asarray(im).astype(int)
    capa = np.abs(a - borda_de(a)).sum(axis=2) > 24
    L = a.shape[0]
    for y0, y1, x0, x1 in [(0, L // 2, 0, L // 2), (0, L // 2, L // 2, L), (L // 2, L, 0, L // 2), (L // 2, L, L // 2, L)]:
        q = capa[y0:y1, x0:x1]
        ya, yb = faixa(q.mean(axis=1), y0)
        xa, xb = faixa(q.mean(axis=0), x0)
        lado = min(yb - ya, xb - xa) - 4
        x, y = round((xa + xb - lado) / 2), round((ya + yb - lado) / 2)
        yield im.crop((x, y, x + lado, y + lado))


def arte(im):
    """Só a ilustração: o quadrado de cima, sem o título grande nem o código."""
    L = im.size[0]
    s = round(0.62 * L)
    x, y = (L - s) // 2, round(0.06 * L)
    return im.crop((x, y, x + s, y + s))


def exportar(im, alg):
    os.makedirs(SAIDA, exist_ok=True)
    for t in TAMANHOS:
        im.resize((t, t), Image.LANCZOS).save(os.path.join(SAIDA, f"{alg}-{t}.webp"), quality=80, method=6)
    arte(im).resize((ARTE, ARTE), Image.LANCZOS).save(os.path.join(SAIDA, f"{alg}-arte.webp"), quality=82, method=6)


if __name__ == "__main__":
    grade, algs = sys.argv[1], sys.argv[2:]
    if len(algs) != 4:
        raise SystemExit("uso: python3 motor/capas.py <grade.png> <alg ↖> <alg ↗> <alg ↙> <alg ↘>")
    for alg, im in zip(algs, recortar(grade)):
        if not os.path.isdir(os.path.join(RAIZ, "algoritmos", alg)):
            raise SystemExit(f"{alg}: não há faixa com esse nome em algoritmos/")
        exportar(im, alg)
        print(f"{alg}: {im.size[0]} px → {', '.join(f'{t}' for t in TAMANHOS)} e arte {ARTE}")
