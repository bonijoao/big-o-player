"""Capas dos protótipos de estética: cada capa é o rastro real do algoritmo.

Ordenação: 40 valores embaralhados (semente fixa); cada linha da capa é o
vetor depois de um passo, cada cor um valor. K-means: regiões dos centros
finais, as flores e o caminho de cada centro volta a volta (dados.json). Grafos: busca em largura numa grade com paredes; cor =
distância até a origem.

  python3 docs/esteticas/capas.py   -> docs/esteticas/capas/*.png
"""
import json
import os
import random
from collections import deque

from PIL import Image, ImageDraw

AQUI = os.path.dirname(os.path.abspath(__file__))
SAIDA = os.path.join(AQUI, "capas")
LADO = 600
N = 40


def degrade(paleta, k):
    """Cor em k ∈ [0, 1] ao longo da paleta."""
    k = max(0.0, min(1.0, k)) * (len(paleta) - 1)
    i = min(int(k), len(paleta) - 2)
    f = k - i
    return tuple(int(a + (b - a) * f) for a, b in zip(paleta[i], paleta[i + 1]))


ORDENACAO = [(24, 32, 72), (40, 105, 195), (0, 160, 160), (240, 200, 60), (235, 95, 70)]
GRAFOS = [(250, 236, 200), (240, 150, 60), (190, 50, 70), (60, 20, 60)]


# ---------- ordenações: devolvem o vetor depois de cada passo ----------

def bolha(v):
    v, passos = v[:], []
    for fim in range(len(v) - 1, 0, -1):
        for i in range(fim):
            if v[i] > v[i + 1]:
                v[i], v[i + 1] = v[i + 1], v[i]
        passos.append(v[:])
    return passos


def insercao(v):
    v, passos = v[:], []
    for i in range(1, len(v)):
        x, j = v[i], i - 1
        while j >= 0 and v[j] > x:
            v[j + 1] = v[j]
            j -= 1
        v[j + 1] = x
        passos.append(v[:])
    return passos


def intercalacao(v):
    v, passos = v[:], []

    def ordena(a, b):
        if b - a < 2:
            return
        m = (a + b) // 2
        ordena(a, m)
        ordena(m, b)
        v[a:b] = sorted(v[a:b])   # a intercalação das duas metades
        passos.append(v[:])

    ordena(0, len(v))
    return passos


def rapida(v):
    v, passos = v[:], []

    def ordena(a, b):
        if b - a < 2:
            return
        piv, i = v[b - 1], a
        for j in range(a, b - 1):
            if v[j] < piv:
                v[i], v[j] = v[j], v[i]
                i += 1
        v[i], v[b - 1] = v[b - 1], v[i]
        passos.append(v[:])
        ordena(a, i)
        ordena(i + 1, b)

    ordena(0, len(v))
    return passos


def capa_ordenacao(nome, func):
    v = list(range(N))
    random.Random(11).shuffle(v)
    linhas = [v] + func(v)
    im = Image.new("RGB", (LADO, LADO))
    d = ImageDraw.Draw(im)
    h, w = LADO / len(linhas), LADO / N
    for r, lin in enumerate(linhas):
        for c, x in enumerate(lin):
            d.rectangle((c * w, r * h, (c + 1) * w, (r + 1) * h + 1), fill=degrade(ORDENACAO, x / (N - 1)))
    im.save(os.path.join(SAIDA, f"{nome}.png"))
    return len(linhas) - 1


# ---------- K-means: grupos finais do iris ----------

def capa_kmeans():
    """Regiões de cada centro final, as flores e o caminho dos centros nas voltas."""
    with open(os.path.join(AQUI, "..", "..", "algoritmos", "kmeans", "dados.json")) as f:
        ex = json.load(f)["exemplo"]
    cores = [(40, 105, 195), (140, 80, 185), (0, 140, 150)]
    tinta = [tuple(int(255 - (255 - c) * 0.16) for c in cor) for cor in cores]
    P = lambda x, y: (40 + (x - 0.9) / 6.2 * 520, 560 - (y + 0.05) / 2.6 * 520)
    Q = lambda X, Y: (0.9 + (X - 40) / 520 * 6.2, (560 - Y) / 520 * 2.6 - 0.05)
    finais = ex["final"]["centros"]
    im = Image.new("RGB", (LADO, LADO))
    px = im.load()
    for X in range(LADO):
        for Y in range(LADO):
            x, y = Q(X, Y)
            g = min(range(3), key=lambda j: (x - finais[j][0]) ** 2 + (y - finais[j][1]) ** 2)
            px[X, Y] = tinta[g]
    d = ImageDraw.Draw(im)
    for (x, y), g in zip(ex["pontos"], ex["final"]["rotulos"]):
        cx, cy = P(x, y)
        d.ellipse((cx - 9, cy - 9, cx + 9, cy + 9), fill=cores[g])
    for j in range(3):
        trilha = [P(*f["centros"][j]) for f in ex["fotos"]]
        d.line(trilha, fill=(30, 30, 30), width=4)
        for cx, cy in trilha[:-1]:
            d.ellipse((cx - 6, cy - 6, cx + 6, cy + 6), fill=(30, 30, 30))
        cx, cy = trilha[-1]
        d.ellipse((cx - 22, cy - 22, cx + 22, cy + 22), outline=(30, 30, 30), width=5)
    im.save(os.path.join(SAIDA, "kmeans.png"))


# ---------- busca em largura numa grade ----------

def capa_bfs():
    n = 30
    r = random.Random(5)
    parede = {(i, j) for i in range(n) for j in range(n) if r.random() < 0.28}
    origem = (n // 2, n // 2)
    parede.discard(origem)
    dist, fila = {origem: 0}, deque([origem])
    while fila:
        i, j = fila.popleft()
        for a, b in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):
            if 0 <= a < n and 0 <= b < n and (a, b) not in parede and (a, b) not in dist:
                dist[(a, b)] = dist[(i, j)] + 1
                fila.append((a, b))
    mx = max(dist.values())
    im = Image.new("RGB", (LADO, LADO), (30, 30, 30))
    d = ImageDraw.Draw(im)
    s = LADO / n
    for (i, j), k in dist.items():
        d.rectangle((j * s + 1, i * s + 1, (j + 1) * s - 1, (i + 1) * s - 1), fill=degrade(GRAFOS, k / mx))
    im.save(os.path.join(SAIDA, "bfs.png"))


# ---------- linguagens sem cor por valor (tinta sobre papel) ----------

PAPEL, TINTA, VERDE = (255, 255, 255), (30, 30, 30), (22, 150, 70)
SS = 2  # desenha em dobro e reduz: traço liso


def rastro(func):
    v = list(range(N))
    random.Random(11).shuffle(v)
    return [v] + func(v)


# eventos troca a troca (para os fios): o vetor depois de cada troca

def bolha_trocas(v):
    v, ev = v[:], []
    for fim in range(len(v) - 1, 0, -1):
        for i in range(fim):
            if v[i] > v[i + 1]:
                v[i], v[i + 1] = v[i + 1], v[i]
                ev.append(v[:])
    return ev


def insercao_trocas(v):
    v, ev = v[:], []
    for i in range(1, len(v)):
        j = i
        while j > 0 and v[j - 1] > v[j]:
            v[j - 1], v[j] = v[j], v[j - 1]
            ev.append(v[:])
            j -= 1
    return ev


def rapida_trocas(v):
    v, ev = v[:], []

    def ordena(a, b):
        if b - a < 2:
            return
        piv, i = v[b - 1], a
        for j in range(a, b - 1):
            if v[j] < piv:
                if i != j:
                    v[i], v[j] = v[j], v[i]
                    ev.append(v[:])
                i += 1
        if i != b - 1:
            v[i], v[b - 1] = v[b - 1], v[i]
            ev.append(v[:])
        ordena(a, i)
        ordena(i + 1, b)

    ordena(0, len(v))
    return ev


FIOS_N = 20


def capa_fios(nome, func):
    """Cada número é um fio: x = posição no vetor, desce um degrau por troca
    (intercalação: por intercalação). O maior número vai em verde."""
    v = list(range(FIOS_N))
    random.Random(3).shuffle(v)
    linhas = [v] + func(v)
    L = LADO * SS
    im = Image.new("RGB", (L, L), PAPEL)
    d = ImageDraw.Draw(im)
    m = 56 * SS
    X = lambda pos: m + pos / (FIOS_N - 1) * (L - 2 * m)
    Y = lambda r: m + r / (len(linhas) - 1) * (L - 2 * m)
    for valor in sorted(range(FIOS_N), key=lambda x: x == FIOS_N - 1):
        pts = [(X(lin.index(valor)), Y(r)) for r, lin in enumerate(linhas)]
        destaque = valor == FIOS_N - 1
        d.line(pts, fill=VERDE if destaque else TINTA, width=(5 if destaque else 3) * SS // 2 * 2 // 2, joint="curve")
    im.resize((LADO, LADO), Image.LANCZOS).save(os.path.join(SAIDA, f"fios-{nome}.png"))
    return len(linhas) - 1


def capa_pulsar(nome, func):
    """Cada passo é uma linha; o relevo é a distância de cada número até o
    seu lugar final, então o caos se acalma até virar reta. Empilhadas de
    cima para baixo, cada linha esconde a de trás (Unknown Pleasures)."""
    linhas = rastro(func)
    L = LADO * SS
    im = Image.new("RGB", (L, L), PAPEL)
    d = ImageDraw.Draw(im)
    m, alt = 60 * SS, 90 * SS
    passo = (L - 2 * m - alt) / (len(linhas) - 1)
    for r, lin in enumerate(linhas):
        base = m + alt + r * passo
        pts = [(m + c / (N - 1) * (L - 2 * m), base - abs(x - c) / (N - 1) * alt * 1.6) for c, x in enumerate(lin)]
        d.polygon(pts + [(L - m, base + 2), (m, base + 2)], fill=PAPEL)
        d.line(pts, fill=TINTA, width=2 * SS, joint="curve")
    im.resize((LADO, LADO), Image.LANCZOS).save(os.path.join(SAIDA, f"pulsar-{nome}.png"))


def capa_bfs_arvore():
    """Busca em largura na mesma grade: a árvore que a busca constrói,
    cada casa ligada a quem a descobriu; a origem em verde."""
    n = 30
    r = random.Random(5)
    parede = {(i, j) for i in range(n) for j in range(n) if r.random() < 0.28}
    origem = (n // 2, n // 2)
    parede.discard(origem)
    pai, fila = {origem: None}, deque([origem])
    while fila:
        i, j = fila.popleft()
        for a, b in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):
            if 0 <= a < n and 0 <= b < n and (a, b) not in parede and (a, b) not in pai:
                pai[(a, b)] = (i, j)
                fila.append((a, b))
    L = LADO * SS
    im = Image.new("RGB", (L, L), PAPEL)
    d = ImageDraw.Draw(im)
    s, m = (L - 60 * SS) / (n - 1), 30 * SS
    P = lambda c: (m + c[1] * s, m + c[0] * s)
    for c, p in pai.items():
        if p:
            d.line([P(p), P(c)], fill=TINTA, width=3 * SS)
    for c in pai:
        x, y = P(c)
        d.ellipse((x - 3 * SS, y - 3 * SS, x + 3 * SS, y + 3 * SS), fill=TINTA)
    x, y = P(origem)
    d.ellipse((x - 11 * SS, y - 11 * SS, x + 11 * SS, y + 11 * SS), fill=VERDE)
    im.resize((LADO, LADO), Image.LANCZOS).save(os.path.join(SAIDA, "arvore-bfs.png"))


# ---------- barras: altura = valor; cor = papel da barra, não o tamanho ----------

ALBUM = (40, 105, 195)       # já no lugar final
MEXEU = (235, 95, 70)        # acabou de se mexer neste passo
FUNDO_BARRAS = (238, 242, 248)
BARRAS_N = 24


def estados(func):
    """Do embaralhado até o primeiro passo em que o vetor fica ordenado
    (passadas finais que só confirmam a ordem não entram na capa)."""
    v = list(range(BARRAS_N))
    random.Random(11).shuffle(v)
    linhas = [v] + func(v)
    pronto = next(i for i, lin in enumerate(linhas) if lin == sorted(lin))
    return linhas[:pronto + 1]


def barras(d, lin, ant, x0, y0, w, h, gap=0.18):
    bw = w / len(lin)
    for i, x in enumerate(lin):
        if x == i:
            cor = ALBUM
        elif ant is not None and ant[i] != x:
            cor = MEXEU
        else:
            cor = TINTA
        alt = (x + 1) / len(lin) * h
        d.rectangle((x0 + i * bw + bw * gap / 2, y0 + h - alt, x0 + (i + 1) * bw - bw * gap / 2, y0 + h), fill=cor)


def capa_barras(nome, func):
    """Um retrato a 40% do caminho até ordenar."""
    linhas = estados(func)
    k = max(1, round(0.4 * (len(linhas) - 1)))
    L = LADO * SS
    im = Image.new("RGB", (L, L), FUNDO_BARRAS)
    barras(ImageDraw.Draw(im), linhas[k], linhas[k - 1], 48 * SS, 48 * SS, L - 96 * SS, L - 96 * SS)
    im.resize((LADO, LADO), Image.LANCZOS).save(os.path.join(SAIDA, f"barras-{nome}.png"))


def capa_barras_grade(nome, func):
    """Nove momentos, do embaralhado ao ordenado, em leitura de livro."""
    linhas = estados(func)
    idx = [round(i * (len(linhas) - 1) / 8) for i in range(9)]
    L = LADO * SS
    im = Image.new("RGB", (L, L), FUNDO_BARRAS)
    d = ImageDraw.Draw(im)
    m, g = 30 * SS, 22 * SS
    c = (L - 2 * m - 2 * g) / 3
    for n, k in enumerate(idx):
        x0, y0 = m + (n % 3) * (c + g), m + (n // 3) * (c + g)
        barras(d, linhas[k], linhas[k - 1] if k else None, x0, y0, c, c, gap=0.25)
    im.resize((LADO, LADO), Image.LANCZOS).save(os.path.join(SAIDA, f"grade-{nome}.png"))


if __name__ == "__main__":
    os.makedirs(SAIDA, exist_ok=True)
    for nome, func in [("bolha", bolha), ("insercao", insercao), ("intercalacao", intercalacao), ("rapida", rapida)]:
        print(nome, capa_ordenacao(nome, func), "passos")
        capa_pulsar(nome, func)
        capa_barras(nome, func)
        capa_barras_grade(nome, func)
    for nome, func in [("bolha", bolha_trocas), ("insercao", insercao_trocas),
                       ("intercalacao", intercalacao), ("rapida", rapida_trocas)]:
        print("fios", nome, capa_fios(nome, func), "eventos")
    capa_kmeans()
    capa_bfs()
    capa_bfs_arvore()
    print("capas em", SAIDA)
