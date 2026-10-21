"""Peças de vídeo da galeria, no visual da skill explainer-videos.

Importa engine.py da skill sem alterar (fundo branco, IBM Plex Mono,
diagramas que se constroem) e acrescenta o que os vídeos daqui repetem:
texto alinhado, máquina de escrever, render só-MP4 por pipe, folha de
contato e pôster. Herdado de ~/Vídeos/trama-apresentacao/pecas.py.
"""
import os
import subprocess
import sys

sys.path.insert(0, os.path.expanduser("~/.claude/skills/explainer-videos"))
from engine import *  # noqa: F401,F403  W, H, FPS, CPS, cores, font, ease, mix, rich, box, line
from PIL import Image, ImageDraw

# três grupos: tons frios e distintos do verde de destaque e do vermelho de erro
GRUPOS = [(40, 105, 195), (140, 80, 185), (0, 140, 150)]
CLARO = (205, 208, 214)


def lerp(a, b, k):
    return a + (b - a) * k


def texto(d, s, x, y, sz=14, col=INK, b=False, alpha=1, align="l"):
    f = font(sz, b)
    if align == "c":
        x -= f.getlength(s) / 2
    elif align == "r":
        x -= f.getlength(s)
    d.text((x, y), s, font=f, fill=mix(col, alpha))


def digitado(d, s, x, y, t, sz=14, col=INK, b=False, alpha=1, align="l"):
    """texto() com máquina de escrever: t segundos desde o início."""
    n = int(max(0, t) * CPS)
    if n <= 0:
        return
    f = font(sz, b)
    if align == "c":
        x -= f.getlength(s) / 2
    elif align == "r":
        x -= f.getlength(s)
    d.text((x, y), s[:n], font=f, fill=mix(col, alpha))


def ponto(d, x, y, r, col, alpha=1):
    d.ellipse((x - r, y - r, x + r, y + r), fill=mix(col, alpha))


def anel(d, x, y, r, col, alpha=1, w=3):
    d.ellipse((x - r, y - r, x + r, y + r), outline=mix(col, alpha), width=w, fill=BG)
    ponto(d, x, y, 2.2, col, alpha)


# ---------- render, prévia e pôster ----------

def quadro(scenes, T):
    acc = 0
    for dur, fn in scenes:
        if T < acc + dur:
            im = Image.new("RGB", (W, H), BG)
            fn(ImageDraw.Draw(im), T - acc, im)
            return im
        acc += dur
    im = Image.new("RGB", (W, H), BG)
    dur, fn = scenes[-1]
    fn(ImageDraw.Draw(im), dur - 1 / FPS, im)
    return im


def folha(scenes, tempos, arq, cols=2):
    ims = []
    for T in tempos:
        im = quadro(scenes, T)
        ImageDraw.Draw(im).text((6, 4), f"{T:.1f}s", fill=(220, 0, 0))
        ims.append(im)
    rows = (len(ims) + cols - 1) // cols
    sheet = Image.new("RGB", (W * cols, H * rows), (120, 120, 120))
    for i, im in enumerate(ims):
        sheet.paste(im, ((i % cols) * W, (i // cols) * H))
    sheet.save(arq)


def duracao(scenes):
    return sum(int(dur * FPS) for dur, _ in scenes) / FPS


def render_mp4(arq, scenes):
    """Só o MP4 (15 fps, H.264, yuv420p), quadros direto para o ffmpeg."""
    p = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
                          "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-c:v", "libx264",
                          "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart", arq],
                         stdin=subprocess.PIPE)
    n = 0
    for dur, fn in scenes:
        for k in range(int(dur * FPS)):
            im = Image.new("RGB", (W, H), BG)
            fn(ImageDraw.Draw(im), k / FPS, im)
            p.stdin.write(im.tobytes())
            n += 1
    p.stdin.close()
    p.wait()
    print(os.path.basename(arq), round(n / FPS, 1), "s", os.path.getsize(arq) // 1024, "KB")


def principal(base, scenes, t_poster):
    """python3 video.py                     -> <base>.mp4 + <base>.png (pôster)
       python3 video.py poster              -> só o pôster (a capa provisória da faixa)
       python3 video.py folha t1,t2 a.png   -> folha de contato para conferir"""
    if len(sys.argv) > 1 and sys.argv[1] == "poster":
        quadro(scenes, t_poster).save(base + ".png", optimize=True)
        print(os.path.basename(base) + ".png")
        return
    if len(sys.argv) > 1 and sys.argv[1] == "folha":
        folha(scenes, [float(x) for x in sys.argv[2].split(",")], sys.argv[3])
        print(round(duracao(scenes), 1), "s (folha)")
        return
    render_mp4(base + ".mp4", scenes)
    quadro(scenes, t_poster).save(base + ".png", optimize=True)
