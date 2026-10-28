"""A marca do site, toda tirada da capa CI-00 (marca/ci-00.webp, o recorte da capa "Big O Player").
Rodar da raiz do projeto: python3 motor/identidade.py

  marca/disco-64.webp, marca/disco-128.webp   o disco recortado da capa, com fundo transparente (a marca)
  favicon.svg                                 o disco simplificado: disco preto, selo creme, anel preto, ponto
                                              vermelho (em 16 a 48 px os detalhes da capa somem)
  favicon-32.png, icone.png (180), icone-512.png   o mesmo desenho em PNG; o de 180 é o apple-touch-icon,
                                              opaco, sobre o branco quente
  og.png                                      a imagem de compartilhamento, 1200 × 630, na linguagem das capas de
                                              Conceitos importantes: o fundo da capa, o disco e o título da própria capa
"""
import os
from math import cos, pi, sin

import numpy as np
from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
FONTES = os.path.expanduser("~/.fonts")
PAPEL = (253, 252, 249)        # --papel, variante a
PRETO, CREME, VERMELHO = (22, 22, 22), (243, 234, 214), (232, 52, 30)


def capa():
    return Image.open(os.path.join(RAIZ, "marca", "ci-00.webp")).convert("RGB")


def circulo_do_disco(im):
    """Acha o disco: para cada ângulo, de fora para dentro, a borda onde começa o preto do vinil
    (mais escuro que o fundo da capa); depois, o círculo dos mínimos quadrados, sem os pontos fora dele."""
    a = np.asarray(im.convert("L")).astype(float)
    cx, cy = 0.5 * a.shape[1], 0.41 * a.shape[0]
    pts = []
    for k in range(360):
        t = 2 * pi * k / 360
        for r in range(int(0.43 * a.shape[0]), int(0.25 * a.shape[0]), -1):
            ok = all(0 <= (x := int(round(cx + (r - j) * cos(t)))) < a.shape[1] and 0 <= (y := int(round(cy + (r - j) * sin(t)))) < a.shape[0]
                     and a[y, x] < 24 for j in range(4))
            if ok:
                pts.append((cx + r * cos(t), cy + r * sin(t)))
                break
    P = np.array(pts)
    for _ in range(4):
        A = np.c_[2 * P[:, 0], 2 * P[:, 1], np.ones(len(P))]
        x0, y0, c = np.linalg.lstsq(A, (P ** 2).sum(1), rcond=None)[0]
        R = np.sqrt(c + x0 ** 2 + y0 ** 2)
        P = P[np.abs(np.hypot(P[:, 0] - x0, P[:, 1] - y0) - R) < 4]
    return x0, y0, R


def disco(im):
    """O disco da capa com fundo transparente (a máscara circular anti-serrilhada)."""
    x0, y0, R = circulo_do_disco(im)
    lado = int(np.ceil(2 * R)) + 2
    x1, y1 = int(np.floor(x0 - lado / 2)), int(np.floor(y0 - lado / 2))
    F = 4
    m = Image.new("L", (lado * F, lado * F), 0)
    cx, cy, r = (x0 - x1) * F, (y0 - y1) * F, (R - 0.6) * F
    ImageDraw.Draw(m).ellipse((cx - r, cy - r, cx + r, cy + r), fill=255)
    d = im.crop((x1, y1, x1 + lado, y1 + lado)).convert("RGBA")
    d.putalpha(m.resize((lado, lado), Image.LANCZOS))
    return d


# o disco simplificado, em frações do raio: o vinil, o selo creme, o anel preto e o ponto vermelho
SIMPLES = [("disco", 1.0, PRETO), ("selo", 0.56, CREME), ("anel", 0.36, PRETO), ("miolo", 0.22, CREME), ("ponto", 0.12, VERMELHO)]


def svg():
    hexa = lambda c: "#%02x%02x%02x" % c
    circulos = "".join(f'<circle cx="32" cy="32" r="{32 * f:g}" fill="{hexa(c)}"/>' for _, f, c in SIMPLES)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">{circulos}</svg>\n'


def icone(lado, fundo=None, margem=0.0):
    F = 8
    im = Image.new("RGBA", (lado * F, lado * F), fundo + (255,) if fundo else (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    c, R = lado * F / 2, lado * F / 2 * (1 - margem)
    for _, f, cor in SIMPLES:
        d.ellipse((c - R * f, c - R * f, c + R * f, c + R * f), fill=cor + (255,))
    return im.resize((lado, lado), Image.LANCZOS)


def titulo_da_capa(im):
    """O "Big O Player" impresso embaixo da capa (creme sobre o fundo), recortado justo."""
    a = np.asarray(im.convert("L")).astype(int)
    H = a.shape[0]
    baixo = a[int(0.74 * H):] > 150
    ys, xs = np.nonzero(baixo)
    return im.crop((xs.min() - 2, int(0.74 * H) + ys.min() - 2, xs.max() + 3, int(0.74 * H) + ys.max() + 3))


def og(im, d):
    fundo = tuple(int(x) for x in np.median(np.asarray(im)[5:40, 5:40].reshape(-1, 3), axis=0))
    tela = Image.new("RGB", (1200, 630), fundo)
    D = 470
    dd = d.resize((D, D), Image.LANCZOS)
    tela.paste(dd, (70, (630 - D) // 2), dd)
    t = titulo_da_capa(im)
    larg = 560
    t = t.resize((larg, round(t.size[1] * larg / t.size[0])), Image.LANCZOS)
    x = 590
    tela.paste(t, (x, 218))
    dr = ImageDraw.Draw(tela)
    mono = ImageFont.truetype(os.path.join(FONTES, "IBMPlexMono-Medium.ttf"), 26)
    for i, linha in enumerate(["Algoritmos tocando ao vivo,", "com cada passo contado."]):
        dr.text((x, 218 + t.size[1] + 40 + 38 * i), linha, font=mono, fill=CREME)
    rotulo = ImageFont.truetype(os.path.join(FONTES, "IBMPlexMono-Medium.ttf"), 20)
    dr.text((x, 120), "BIG-O-PLAYER", font=rotulo, fill=CREME)
    fim = x + dr.textlength("BIG-O-PLAYER", font=rotulo) + 12   # o ponto vermelho, colado ao rótulo, como na capa
    dr.ellipse((fim, 127, fim + 11, 138), fill=VERMELHO)
    return tela


if __name__ == "__main__":
    im = capa()
    d = disco(im)
    os.makedirs(os.path.join(RAIZ, "marca"), exist_ok=True)
    for t in (64, 128):
        d.resize((t, t), Image.LANCZOS).save(os.path.join(RAIZ, "marca", f"disco-{t}.webp"), quality=90, method=6)
    open(os.path.join(RAIZ, "favicon.svg"), "w").write(svg())
    icone(32).save(os.path.join(RAIZ, "favicon-32.png"), optimize=True)
    icone(180, PAPEL, 0.12).convert("RGB").save(os.path.join(RAIZ, "icone.png"), optimize=True)
    icone(512).save(os.path.join(RAIZ, "icone-512.png"), optimize=True)
    og(im, d).save(os.path.join(RAIZ, "og.png"), optimize=True)
    print("marca/disco-64.webp, marca/disco-128.webp, favicon.svg, favicon-32.png, icone.png (180), icone-512.png, og.png")
