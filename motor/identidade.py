"""A imagem de compartilhamento (og.png, 1200 × 630) e o ícone (icone.png, 180 × 180) do site.
Rodar da raiz do projeto: python3 motor/identidade.py

O desenho segue o site: papel branco, IBM Plex Mono, tinta quase preta e o verde só
no cursor da marca. As curvas são as contas de verdade (passos para n de 1 a 32),
na mesma escala, sem cor por tamanho.
"""
import math
import os

from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
FONTES = os.path.expanduser("~/.fonts")
PAPEL, TINTA, CINZA, LINHA, VERDE = (255, 255, 255), (30, 30, 30), (104, 108, 115), (222, 224, 228), (22, 150, 70)


def fonte(peso, tam):
    return ImageFont.truetype(os.path.join(FONTES, f"IBMPlexMono-{peso}.ttf"), tam)


def og():
    im = Image.new("RGB", (1200, 630), PAPEL)
    d = ImageDraw.Draw(im)
    x0 = 80
    titulo = fonte("Bold", 92)
    d.text((x0, 120), "Big O Player", font=titulo, fill=TINTA)
    fim = d.textlength("Big O Player", font=titulo)
    d.rectangle([x0 + fim + 10, 140, x0 + fim + 52, 210], fill=VERDE)   # o cursor da marca
    corpo = fonte("Regular", 30)
    for i, linha in enumerate(["Algoritmos tocando ao vivo, com cada", "passo contado e conferido no R."]):
        d.text((x0, 268 + 44 * i), linha, font=corpo, fill=CINZA)
    d.text((x0, 520), "uaipedro.github.io/big-o-player", font=fonte("Medium", 24), fill=TINTA)

    # as curvas: passos para n de 1 a 32, na mesma escala, o eixo cortado em 32 passos
    gx0, gx1, gy0, gy1 = 730, 1040, 520, 300
    d.line([gx0, gy0, gx1, gy0], fill=LINHA, width=2)
    d.line([gx0, gy0, gx0, gy1 - 40], fill=LINHA, width=2)
    curvas = [("n²", lambda n: n * n), ("n log n", lambda n: n * math.log2(n)), ("n", lambda n: n), ("log n", lambda n: math.log2(n)), ("1", lambda n: 1)]
    teto = 32
    rot = fonte("Medium", 20)
    for nome, f in curvas:
        pts = []
        for k in range(1, 321):
            n = 1 + 31 * k / 320
            y = f(n)
            if y > teto:
                break
            pts.append((gx0 + (gx1 - gx0) * (n - 1) / 31, gy0 - (gy0 - gy1) * y / teto))
        d.line(pts, fill=TINTA, width=3)
        lx, ly = pts[-1]
        d.text((min(lx + 8, gx1 + 10), ly - 30 if nome in ("log n", "1") else ly - 12), nome, font=rot, fill=CINZA)
    im.save(os.path.join(RAIZ, "og.png"), optimize=True)


def icone():
    im = Image.new("RGB", (180, 180), TINTA)
    d = ImageDraw.Draw(im)
    f = fonte("Bold", 120)
    d.text((26, 18), "O", font=f, fill=PAPEL)
    d.rectangle([118, 46, 148, 136], fill=VERDE)
    im.save(os.path.join(RAIZ, "icone.png"), optimize=True)


if __name__ == "__main__":
    og()
    icone()
    print("og.png (1200 × 630) e icone.png (180 × 180)")
