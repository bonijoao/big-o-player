"""Recorta as capas de uma grade (2×2, ou 1×2 com duas lado a lado, separadas por uma borda creme)
e exporta em WebP.

  python3 motor/capas.py <grade.png> <alg ↖> <alg ↗> <alg ↙> <alg ↘>
  python3 motor/capas.py <duas.png> <alg ←> <alg →>
  python3 motor/capas.py <grade.png> mediana@0.5 …   (@: o lado da ilustração, em fração da capa; padrão 0.62)

Para cada capa, em capas/:
  <alg>-240.webp, <alg>-480.webp   a capa inteira (cartões, cabeça da playlist, encarte; 1× e 2×)
  <alg>-arte.webp                  só a ilustração, 96 px (a lateral, as linhas da playlist e a barra do
                                   player, onde a capa fica com 48 px e o título vira mancha)
O gerar.py liga a capa à faixa quando os arquivos existem; sem eles, a faixa fica com o pôster.
Os vídeos de Conceitos importantes e de Fundamentos usam o nome <série>-<n> (conceitos-0, fundamentos-1),
o mesmo do "capa" do item no conceitos.json e no fundamentos.json.

O corte acha, em cada quadrante, as linhas e colunas que são capa (quase nenhum pixel da cor da borda)
e tira o quadrado de dentro, 2 px para dentro, sem sobra de borda nem corte da arte.
Confira cada capa pelo título e pelo código impresso nela, não só pela posição.
"""
import json
import os
import sys

import numpy as np
from PIL import Image

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SAIDA = os.path.join(RAIZ, "capas")
TAMANHOS = [240, 480]
ARTE = 96


def grade_de(a):
    """Quantas linhas e colunas de capas: 2×2 numa imagem quadrada, 1×2 numa com o dobro da largura."""
    H, W = a.shape[:2]
    return (1, 2) if W > 1.5 * H else (2, 2)


def borda_de(a):
    """A cor da borda: a mediana das faixas do meio, entre as capas."""
    H, W = a.shape[:2]
    lin, _ = grade_de(a)
    faixas = [a[:, W // 2 - 3:W // 2 + 3].reshape(-1, 3)]
    if lin == 2:
        faixas.append(a[H // 2 - 3:H // 2 + 3].reshape(-1, 3))
    return np.median(np.concatenate(faixas), axis=0)


def faixa(perfil, ini, lim=0.9):
    dentro = [ini + i for i, x in enumerate(perfil) if x >= lim]
    return dentro[0], dentro[-1]


def existe(nome):
    """Uma faixa (pasta em algoritmos/) ou um vídeo das séries (conceitos-0, fundamentos-1…)."""
    if os.path.isdir(os.path.join(RAIZ, "algoritmos", nome)):
        return True
    serie, _, n = nome.rpartition("-")
    caminho = os.path.join(RAIZ, f"{serie}.json")
    if serie in ("conceitos", "fundamentos") and n.isdigit() and os.path.exists(caminho):
        return any(v["n"] == int(n) for v in json.load(open(caminho, encoding="utf-8"))["videos"])
    return False


def recortar(caminho):
    im = Image.open(caminho).convert("RGB")
    a = np.asarray(im).astype(int)
    capa = np.abs(a - borda_de(a)).sum(axis=2) > 24
    H, W = a.shape[:2]
    lin, col = grade_de(a)
    celulas = [(r * H // lin, (r + 1) * H // lin, c * W // col, (c + 1) * W // col) for r in range(lin) for c in range(col)]
    for y0, y1, x0, x1 in celulas:
        q = capa[y0:y1, x0:x1]
        ya, yb = faixa(q.mean(axis=1), y0)
        xa, xb = faixa(q.mean(axis=0), x0)
        lado = min(yb - ya, xb - xa) - 4
        x, y = round((xa + xb - lado) / 2), round((ya + yb - lado) / 2)
        yield im.crop((x, y, x + lado, y + lado))


def arte(im, lado=0.62):
    """Só a ilustração: o quadrado de cima, sem o título grande nem o código. Quando o título
    começa mais alto (três linhas), um lado menor deixa o título de fora."""
    L = im.size[0]
    s = round(lado * L)
    x, y = (L - s) // 2, round(0.06 * L)
    return im.crop((x, y, x + s, y + s))


def exportar(im, alg, lado=0.62):
    os.makedirs(SAIDA, exist_ok=True)
    for t in TAMANHOS:
        im.resize((t, t), Image.LANCZOS).save(os.path.join(SAIDA, f"{alg}-{t}.webp"), quality=80, method=6)
    arte(im, lado).resize((ARTE, ARTE), Image.LANCZOS).save(os.path.join(SAIDA, f"{alg}-arte.webp"), quality=82, method=6)


if __name__ == "__main__":
    grade, algs = sys.argv[1], sys.argv[2:]
    lin, col = grade_de(np.asarray(Image.open(grade)))
    if len(algs) != lin * col:
        raise SystemExit(f"a imagem tem {lin * col} capas ({lin}×{col}); passe um alg para cada, da esquerda para a direita e de cima para baixo")
    for pedido, im in zip(algs, recortar(grade)):
        alg, _, lado = pedido.partition("@")
        if not existe(alg):
            raise SystemExit(f"{alg}: não há faixa com esse nome em algoritmos/, nem vídeo com esse número nas séries")
        exportar(im, alg, float(lado or 0.62))
        print(f"{alg}: {im.size[0]} px → {', '.join(f'{t}' for t in TAMANHOS)} e arte {ARTE}")
