"""Pôsteres das faixas de busca, parênteses e fila de atendimento: um quadro
parado no visual dos vídeos (motor/video_ordenacao.py), desenhado a partir
do dados.json. A animação dessas faixas mora só na simulação ao vivo
(simulacao/palco.js); aqui sai a capa provisória.

  montar_busca(pasta) / montar_parenteses(pasta) / montar_atendimento(pasta)
devolvem (cenas, t_poster), como video_ordenacao.montar.
"""
import json
import os

from cena import *  # noqa: F401,F403

MEXEU = (235, 95, 70)
APAGADO = (214, 216, 221)
PALIDO = (205, 208, 214)
CLARO = (244, 245, 247)
BX0, BX1 = 70, 600


def _ler(pasta):
    with open(os.path.join(pasta, "dados.json")) as f:
        D = json.load(f)
    with open(os.path.join(pasta, "ficha.json")) as f:
        F = json.load(f)
    return D, F


def _painel(d, linhas):
    """Painel da direita: [(rótulo, valor, tamanho, verde?)]."""
    y = 90
    for rot, val, sz, verde in linhas:
        texto(d, rot, 650, y, 13, GRAY)
        texto(d, val, 650, y + 16, sz, GREEN if verde else INK, b=True)
        y += 16 + sz * 1.3 + 30


def montar_busca(pasta):
    D, F = _ler(pasta)
    ex = D["exemplo"]
    v, alvo, pos, N = ex["vetor"], ex["alvo"], ex["posicao"], ex["n"]
    olhadas = [e[1] for e in ex["eventos"] if e[0] == "compara"]
    binaria = "binaria" in os.path.basename(pasta)
    BTOPO, BBASE = 96, 410
    bw = (BX1 - BX0) / N
    altura = lambda x: (x / 2 + 1) / N * (BBASE - BTOPO)

    def cena(d, t, im):
        line(d, (BX0, BBASE + 1), (BX1, BBASE + 1), PALIDO, w=1)
        for i, x in enumerate(v):
            cor = GREEN if i == pos else (INK if (binaria and i in olhadas) or (not binaria and i > max(olhadas)) else APAGADO)
            if binaria and i != pos and i not in olhadas:
                cor = APAGADO
            h = altura(x)
            d.rectangle((BX0 + i * bw + bw * 0.12, BBASE - h, BX0 + i * bw + bw * 0.88, BBASE), fill=cor)
        ya = BBASE - altura(alvo)
        for x0 in range(BX0, BX1, 9):
            line(d, (x0, ya), (min(x0 + 5, BX1), ya), GRAY, w=1)
        texto(d, "alvo", BX0 - 6, ya - 8, 11, GRAY, align="r")
        _painel(d, [("comparações", str(ex["ops"]), 40, True), ("alvo", str(alvo), 26, False)])
        rich(d, [("achou o ", ""), (str(alvo), "b"), (f" na casa {pos + 1}: ", ""), (f"{ex['ops']} comparações", "bg")], W / 2, 34, 18)

    return [(1.0, cena)], 0.5


def montar_parenteses(pasta):
    D, F = _ler(pasta)
    ex = D["exemplo"]
    s, N = ex["texto"], ex["n"]
    # o instante em que a pilha está mais alta, e os pares já fechados até ali
    pilha, pares, melhor = [], [], None
    for k, c in enumerate(s):
        if c in "([{":
            pilha.append(k)
        else:
            pares.append((pilha.pop(), k))
        if melhor is None or len(pilha) > len(melhor[0]):
            melhor = (list(pilha), list(pares), k)
    altos, fechados, ate = melhor
    cw = min(30, (500 - BX0) / N)
    tam = max(10, min(24, int(cw * 0.95)))

    def cena(d, t, im):
        for k, c in enumerate(s):
            cor = MEXEU if k == ate else INK if k in altos else GRAY if k < ate else PALIDO
            texto(d, c, BX0 + k * cw + cw / 2, 120, tam, cor, b=True, align="c")
        for a, b in fechados:
            xa, xb = BX0 + a * cw + cw / 2, BX0 + b * cw + cw / 2
            prof = min(90, 8 + (xb - xa) * 0.35)
            d.arc((xa, 120 + tam + 18 - prof, xb, 120 + tam + 18 + prof), 0, 180, fill=PALIDO, width=1)
        ch = min(30, 330 / max(1, len(altos)))
        for j, k in enumerate(altos):
            y = 460 - (j + 1) * ch
            d.rectangle((534, y + 1, 586, y + ch - 1), fill=MEXEU if j == len(altos) - 1 else CLARO)
            texto(d, s[k], 560, y + ch / 2 - ch * 0.4, int(min(16, ch * 0.75)), INK, b=True, align="c")
        line(d, (530, 460), (590, 460), INK, w=2)
        texto(d, "pilha", 560, 460 - max(3, len(altos)) * ch - 36, 13, GRAY, align="c")
        _painel(d, [("operações na pilha", str(ex["ops"]), 40, True), ("pilha no ponto mais alto", f"{len(altos)} símbolos", 20, False)])
        rich(d, [("balanceado: ", ""), (f"{ex['ops']} operações na pilha", "bg")], W / 2, 34, 18)

    return [(1.0, cena)], 0.5


def montar_atendimento(pasta):
    D, F = _ler(pasta)
    ex = D["exemplo"]
    chegada, N = ex["chegada"], ex["n"]
    # o tamanho da fila ao longo do dia, refeito dos eventos gravados
    serie, n, fim, saiu = [(0, 0)], 0, 0, False
    for e in ex["eventos"]:
        if e[0] == "enfileira":
            n += 1
            serie.append((chegada[e[1]], n))
        elif e[0] == "desenfileira":     # sai da fila no minuto em que o caixa o chama (o "atende" logo depois)
            n -= 1
            saiu = True
        elif e[0] == "atende":
            if saiu:
                serie.append((e[2], n))
                saiu = False
            fim = max(fim, e[2] + ex["duracao"][e[1]])
    GY0, GY1, ymax = 150, 420, max(1, ex["maior"])
    gx = lambda m: BX0 + m / fim * (BX1 - BX0)
    gy = lambda q: GY1 - q / ymax * (GY1 - GY0 - 10)

    def cena(d, t, im):
        texto(d, "clientes na fila ao longo do tempo", BX0, GY0 - 40, 13, GRAY)
        line(d, (BX0, GY1), (BX1, GY1), PALIDO, w=1)
        for q in range(0, ymax + 1):
            texto(d, str(q), BX0 - 8, gy(q) - 8, 11, GRAY, align="r")
        pts, q = [(gx(0), gy(0))], 0
        juntos = {}                      # no mesmo minuto, vale o tamanho depois do último evento
        for m, tam in serie:
            juntos[m] = tam
        for m, tam in juntos.items():
            pts += [(gx(m), gy(q)), (gx(m), gy(tam))]
            q = tam
        pts.append((gx(fim), gy(q)))
        d.line(pts, fill=INK, width=3)
        for c in chegada:
            line(d, (gx(c), GY1 + 4), (gx(c), GY1 + 10), GRAY, w=1)
        texto(d, "chegadas", BX0, GY1 + 16, 11, GRAY)
        media = f"{ex['soma'] / N:.1f}".replace(".", ",")
        _painel(d, [("operações na fila", str(ex["ops"]), 40, True), ("espera média", f"{media} min", 26, False),
                    ("maior fila", f"{ex['maior']} clientes", 20, False)])
        rich(d, [("espera média ", ""), (f"{media} min", "bg"), (f", maior fila: {ex['maior']}", "")], W / 2, 34, 18)

    return [(1.0, cena)], 0.5
