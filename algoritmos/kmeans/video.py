"""Vídeo do K-means: por que custa n × k × i distâncias.

Lê tudo de dados.json (gerado por medir.py): pontos, centros e rótulos de
cada volta, contagens e o resumo. Nenhum número é digitado aqui.

  python3 video.py                    -> kmeans.mp4 + kmeans.png (pôster)
  python3 video.py folha 5,12,20 f.png -> folha de contato
"""
import json
import os
import random
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(AQUI, "..", "..", "motor"))
from cena import *  # noqa: F401,F403

with open(os.path.join(AQUI, "dados.json")) as f:
    D = json.load(f)
with open(os.path.join(AQUI, "ficha.json")) as f:
    FICHA = json.load(f)
EX = D["exemplo"]
PTS, FOTOS, N, K, I = EX["pontos"], EX["fotos"], EX["n"], EX["k"], EX["i"]
POR_VOLTA = EX["por_volta"]
MUDARAM = [sum(1 for a, b in zip(FOTOS[v]["rotulos"], FOTOS[v - 1]["rotulos"] if v else [-1] * N)
               if a != b) for v in range(I)]
VOLTAS = D["tempo"]["voltas_por_semente"]["voltas"]
MEM = D["memoria"]

# ---------- geometria ----------
PX0, PX1, PY0, PY1 = 78, 540, 100, 412
XMIN, XMAX, YMIN, YMAX = 0.6, 7.2, -0.15, 2.7


def P(x, y):
    return (PX0 + (x - XMIN) / (XMAX - XMIN) * (PX1 - PX0),
            PY1 - (y - YMIN) / (YMAX - YMIN) * (PY1 - PY0))


ORDEM = list(range(N))
random.Random(7).shuffle(ORDEM)        # ordem só da animação; cada flor é independente
LENTOS = 4                             # flores mostradas devagar na volta 1
PASSO_LENTO = 0.8
SX0, SX1, SY = PX0, PX1, 460            # tira de memória (rótulos)

# ---------- linha do tempo da cena principal ----------
T_CENTROS = 2.2
T_V1 = 3.4
T_V1_RAPIDO = T_V1 + LENTOS * PASSO_LENTO
T_V1_FIM = T_V1_RAPIDO + 2.6
T_MOVE1 = T_V1_FIM + 1.8
DUR_MOVE = 1.6
T_V2 = T_MOVE1 + DUR_MOVE + 0.4
DUR_VOLTA, DUR_VARRE, DUR_DESLIZA = 1.55, 0.85, 0.55
T_FIM = T_V2 + (I - 2) * DUR_VOLTA + DUR_VARRE
DUR_PRINCIPAL = T_FIM + 3.2


def inicio_volta(v):
    return T_V1 if v == 0 else T_V2 + (v - 1) * DUR_VOLTA


def estado(t):
    """(volta, flores já processadas na volta, centros atuais)."""
    if t < T_V1:
        return -1, 0, FOTOS[0]["centros"]
    if t < T_V1_FIM:
        if t < T_V1_RAPIDO:
            m = int((t - T_V1) / PASSO_LENTO)
        else:
            m = LENTOS + int((N - LENTOS) * ease((t - T_V1_RAPIDO) / (T_V1_FIM - T_V1_RAPIDO)))
        return 0, min(m, N), FOTOS[0]["centros"]
    if t < T_V2:
        k = ease((t - T_MOVE1) / DUR_MOVE)
        return 0, N, mistura(FOTOS[0]["centros"], FOTOS[1]["centros"], k)
    v = min(I - 1, 1 + int((t - T_V2) / DUR_VOLTA))
    u = t - inicio_volta(v)
    m = int(N * ease(u / DUR_VARRE)) if u < DUR_VARRE else N
    c = FOTOS[v]["centros"]
    if v + 1 < I and u > DUR_VARRE + 0.1:
        c = mistura(c, FOTOS[v + 1]["centros"], ease((u - DUR_VARRE - 0.1) / DUR_DESLIZA))
    return v, m, c


def mistura(a, b, k):
    return [[lerp(p[0], q[0], k), lerp(p[1], q[1], k)] for p, q in zip(a, b)]


def rotulo_visivel(v, m, idx_na_ordem, flor):
    """Cor da flor: rótulo da volta atual se a varredura já passou, senão o anterior."""
    if v < 0:
        return -1
    if idx_na_ordem < m:
        return FOTOS[v]["rotulos"][flor]
    return FOTOS[v - 1]["rotulos"][flor] if v > 0 else -1


POS = {f: i for i, f in enumerate(ORDEM)}

# ---------- desenho ----------


def eixos(d, a):
    line(d, (PX0, PY1), (PX1, PY1), CLARO, a, 1)
    line(d, (PX0, PY0), (PX0, PY1), CLARO, a, 1)
    for x in range(1, 8):
        X, _ = P(x, 0)
        line(d, (X, PY1), (X, PY1 + 4), CLARO, a, 1)
        texto(d, str(x), X, PY1 + 6, 11, GRAY, alpha=a, align="c")
    for y in range(0, 3):
        _, Y = P(0, y)
        line(d, (PX0 - 4, Y), (PX0, Y), CLARO, a, 1)
        texto(d, str(y), PX0 - 8, Y - 7, 11, GRAY, alpha=a, align="r")
    texto(d, "comprimento da pétala (cm)", PX1, PY1 + 22, 11, GRAY, alpha=a, align="r")
    texto(d, "largura (cm)", PX0 + 6, PY0 - 6, 11, GRAY, alpha=a)


def flores(d, t, v, m):
    for flor, (x, y) in enumerate(PTS):
        a = ease((t - 0.3 - flor * 0.009) / 0.3)
        if a <= 0:
            continue
        g = rotulo_visivel(v, m, POS[flor], flor)
        ponto(d, *P(x, y), 3.4, GRUPOS[g] if g >= 0 else (175, 178, 184), a)


def linhas_medindo(d, t, v, m, centros):
    """As distâncias sendo medidas: linhas de cada flor da vez até cada centro."""
    if v < 0:
        return 0
    if m >= N and not (v == 0 and t < T_V1_RAPIDO):
        return K * m
    if v == 0 and t < T_V1_RAPIDO:
        s = int((t - T_V1) / PASSO_LENTO)
        u = (t - T_V1) - s * PASSO_LENTO
        flor = ORDEM[s]
        p = P(*PTS[flor])
        vence = FOTOS[0]["rotulos"][flor]
        feitas = 0
        for j, c in enumerate(centros):
            k = ease((u - 0.1 * j) / 0.15)
            if k <= 0:
                continue
            q = P(*c)
            fim = (lerp(p[0], q[0], k), lerp(p[1], q[1], k))
            if u > 0.5 and j == vence:
                line(d, p, fim, GRUPOS[j], 1, 3)
            else:
                line(d, p, fim, (150, 153, 160), 0.55 if u > 0.5 else 1, 1)
            feitas += k >= 1
        ponto(d, *p, 5.5, INK)
        return K * s + feitas
    for s in range(max(0, m - 5), m):
        p = P(*PTS[ORDEM[s]])
        a = 0.25 + 0.6 * (s - m + 6) / 6
        for c in centros:
            line(d, p, P(*c), (150, 153, 160), a, 1)
    return K * m


def centros_desenho(d, t, centros):
    a = ease((t - T_CENTROS) / 0.5)
    if a <= 0:
        return
    for j, c in enumerate(centros):
        X, Y = P(*c)
        r = 9 + 6 * (1 - a)
        anel(d, X, Y, r, GRUPOS[j], a)


def tira_memoria(d, t, v, m):
    a = ease((t - T_V1) / 0.5)
    if a <= 0:
        return
    w = (SX1 - SX0) / N
    for flor in range(N):
        g = rotulo_visivel(v, m, POS[flor], flor)
        col = GRUPOS[g] if g >= 0 else LIGHT
        d.rectangle((SX0 + flor * w, SY, SX0 + (flor + 1) * w - 0.6, SY + 12), fill=mix(col, a))
    d.rectangle((SX0 - 1, SY - 1, SX1, SY + 13), outline=mix(EDGE, a))
    det = MEM["detalhe"]
    outros = MEM["pico"] - det["rotulos"]
    texto(d, f"memória: {det['rotulos']} rótulos (um por flor) + {outros} dos centros e somas",
          SX0, SY + 20, 12, GRAY, alpha=a)


def painel(d, t, v, m, contadas):
    a = ease((t - T_V1) / 0.5)
    if a <= 0:
        return
    x = 600
    texto(d, "distâncias calculadas", x, PY0 - 6, 13, GRAY, alpha=a)
    total = POR_VOLTA * max(v, 0) + contadas
    fim = t >= T_FIM
    texto(d, f"{total}", x, PY0 + 12, 40, GREEN if fim else INK, b=True, alpha=a)

    y0 = PY0 + 92
    rich(d, [("n = ", "gray"), (f"{N}", "b"), (" flores   k = ", "gray"), (f"{K}", "b"), (" centros", "gray")],
         x, PY1 + 22 - 2, 13, align="l", alpha=a)
    texto(d, "volta       total  mudaram", x, y0, 13, GRAY, alpha=a)
    line(d, (x, y0 + 20), (x + 300, y0 + 20), EDGE, a, 1)
    for w in range(I):
        pronto = T_V1_FIM if w == 0 else inicio_volta(w) + DUR_VARRE
        b = ease((t - pronto) / 0.3)
        if b <= 0:
            continue
        y = y0 + 28 + w * 22
        ultima = w == I - 1
        col = GREEN if ultima else INK
        texto(d, f"{w + 1:>5}", x, y, 14, INK, alpha=b)
        texto(d, f"{POR_VOLTA * (w + 1):>10}", x + 56, y, 14, INK, alpha=b)
        texto(d, f"{MUDARAM[w]:>7}", x + 166, y, 14, col, b=ultima, alpha=b)


def legenda_topo(d, t):
    falas = [
        (0.3, [("iris: as pétalas de ", ""), (f"{N} flores", "b")]),
        (T_CENTROS, [(f"{K} centros", "b"), (" sorteados para começar", "")]),
        (T_V1, [("cada flor mede a distância até ", ""), ("cada centro", "b")]),
        (T_V1_FIM + 0.2, [(f"{N} × {K} = ", ""), (f"{POR_VOLTA} distâncias", "bg"), (" por volta", "")]),
        (T_MOVE1, [("cada centro vai para a ", ""), ("média", "b"), (" do seu grupo", "")]),
        (T_V2, [("e repete: ", ""), (f"+{POR_VOLTA}", "b"), (" a cada volta", "")]),
        (T_FIM + 0.3, [(f"na volta {I} ", ""), ("ninguém mudou", "b"), (" de grupo: para", "")]),
    ]
    atual = [f for f in falas if t >= f[0]][-1:] if t >= falas[0][0] else []
    for t0, segs in atual:
        rich(d, segs, W / 2, 34, 19, n=(t - t0) * CPS * 1.6)


def principal_cena(d, t, im):
    v, m, centros = estado(t)
    eixos(d, ease(t / 0.6))
    contadas = linhas_medindo(d, t, v, m, centros)
    flores(d, t, v, m)
    if v == 0 and T_V1 <= t < T_V1_RAPIDO:
        linhas_medindo(d, t, v, m, centros)   # a flor da vez por cima das outras
    centros_desenho(d, t, centros)
    tira_memoria(d, t, v, m)
    painel(d, t, v, m, contadas)
    legenda_topo(d, t)


# ---------- resumo ----------
M = D["ciclomatica"]["M"]
LINHAS = [
    ("tempo", FICHA["tempo"]["notacao"], f"{N} × {K} × {I} = {EX['ops']} distâncias"),
    ("memória", FICHA["memoria"]["notacao"], f"{MEM['pico']} valores além dos dados"),
    ("ciclomática", f"M = {M}", f"{M} caminhos independentes no código"),
]


def resumo(d, t, im):
    for r, (nome, ordem, det) in enumerate(LINHAS):
        t0 = 0.3 + r * 1.3
        y = 150 + r * 82
        digitado(d, nome, 96, y, t - t0, 20, INK, b=True)
        digitado(d, ordem, 290, y, t - t0 - 0.25, 20, GREEN, b=True)
        digitado(d, det, 470, y + 3, t - t0 - 0.5, 16, INK)
    t0 = 0.3 + 3 * 1.3 + 0.3
    a = ease((t - t0) / 0.5)
    if a > 0:
        line(d, (96, 380), (W - 96, 380), EDGE, a, 1)
        rich(d, [("o ", "gray"), ("i", "b"), (f" depende do começo: de {min(VOLTAS)} a {max(VOLTAS)} voltas em "
                                           f"{len(VOLTAS)} sorteios", "gray")],
             W / 2, 400, 15, alpha=a)
    a = ease((t - t0 - 1.2) / 0.6)
    if a > 0:
        texto(d, "k-means · é complexo, baby?", W / 2, 488, 13, GRAY, alpha=a, align="c")


CENAS = [
    typed([[("quantas contas o ", ""), ("k-means", "b"), (" faz", "")],
           [("para separar ", ""), (f"{N} flores", "b"), (" em ", ""), (f"{K} grupos", "b"), ("?", "")]],
          hold=1.0),
    (DUR_PRINCIPAL, principal_cena),
    (9.0, resumo),
]

if __name__ == "__main__":
    principal(os.path.join(AQUI, "kmeans"), CENAS, t_poster=CENAS[0][0] + T_FIM + 2.0)
