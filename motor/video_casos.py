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


def montar_grafo(pasta):
    """Busca em largura ou em profundidade: o grafo do encarte no fim, com a
    árvore da busca em tinta e, em cada vértice, a distância (largura) ou a
    ordem de visita (profundidade), em verde: é o resultado."""
    D, F = _ler(pasta)
    ex = D["exemplo"]
    k, V, arestas = ex["k"], ex["n"], ex["arestas"]
    largura = "dist" in ex
    num = ex["dist"] if largura else ex["ordem"]
    # a árvore: cada vértice descoberto liga-se a quem estava em visita (largura) ou no topo (profundidade)
    arvore, vez, pilha = set(), None, []
    for e in ex["eventos"]:
        if e[0] == "visita":
            vez = e[1]
        elif e[0] in ("enfileira", "empilha"):
            alvo = vez if largura else (pilha[-1] if pilha else None)
            if alvo is not None:
                arvore.add(tuple(sorted((alvo, e[1]))))
            if not largura:
                pilha.append(e[1])
        elif e[0] == "desempilha":
            pilha.pop()
    GX0, GY0 = 90, 100
    passo = min(360, 110 * (k - 1)) / max(1, k - 1)
    raio = min(17, passo * 0.3)
    pos = lambda u: (GX0 + (u % k) * passo, GY0 + (u // k) * passo)
    nome = "fila" if largura else "pilha"

    def cena(d, t, im):
        for a, b in arestas:
            naArvore = (a, b) in arvore
            line(d, pos(a), pos(b), INK if naArvore else PALIDO, w=3 if naArvore else 1)
        for v in range(V):
            x, y = pos(v)
            d.ellipse((x - raio, y - raio, x + raio, y + raio), fill=CLARO, outline=GRAY, width=1)
            texto(d, str(num[v]), x, y - raio * 0.55, int(min(15, raio * 0.95)), GREEN, b=True, align="c")
        _painel(d, [("operações", str(ex["ops"]), 40, True),
                    (f"{nome} mais {'longa' if largura else 'alta'}", f"{ex['estrutura']} vértices", 20, False)])
        fim = f", o mais longe a {max(num)} arestas" if largura else f", pilha de até {ex['estrutura']}"
        rich(d, [("visitou os ", ""), (f"{V} vértices", "b"), (": ", ""), (f"{ex['ops']} operações", "bg"), (fim, "")], W / 2, 34, 18)

    return [(1.0, cena)], 0.5


def _seta(d, x0, y0, x1, y1, cor, w=2):
    """Uma seta reta de (x0, y0) até (x1, y1), com a ponta no fim."""
    import math
    line(d, (x0, y0), (x1, y1), cor, w=w)
    a = math.atan2(y1 - y0, x1 - x0)
    for da in (-0.45, 0.45):
        line(d, (x1, y1), (x1 - 9 * math.cos(a + da), y1 - 9 * math.sin(a + da)), cor, w=w)


def montar_inverter(pasta):
    """Inverter lista encadeada: os nós no meio da inversão. Os da esquerda já
    apontam para trás (setas por baixo); os da direita, ainda para a frente."""
    D, F = _ler(pasta)
    ex = D["exemplo"]
    v, N = ex["valores"], ex["n"]
    meio = N // 2                       # os nós 0 … meio − 1 já viraram; o atual é o meio
    NW, G = 64, 6
    x0 = BX0 + (BX1 - BX0 - N * NW - (N - 1) * G) / 2
    xs = [x0 + k * (NW + G) for k in range(N)]
    Y = 200

    def cena(d, t, im):
        for k, x in enumerate(xs):
            d.rectangle((x, Y, x + 34, Y + 40), fill="white", outline=INK, width=2)
            d.rectangle((x + 34, Y, x + NW, Y + 40), fill=CLARO, outline=INK, width=2)
            texto(d, str(v[k]), x + 17, Y + 10, 16, INK, b=True, align="c")
            texto(d, str(k + 1), x + NW / 2, Y - 24, 11, GRAY, align="c")
        for k in range(N - 1):
            if k + 1 < meio:            # já virado: o nó k + 1 aponta para o k, por baixo (fundos alternados, para não encavalar)
                fundo = Y + 58 + (k % 2) * 16
                line(d, (xs[k + 1] + 49, Y + 40), (xs[k + 1] + 49, fundo), INK, w=2)
                line(d, (xs[k + 1] + 49, fundo), (xs[k] + 17, fundo), INK, w=2)
                _seta(d, xs[k] + 17, fundo, xs[k] + 17, Y + 42, INK)
            elif k >= meio:             # ainda não: o nó k aponta para o k + 1
                _seta(d, xs[k] + NW - 4, Y + 20, xs[k + 1] - 1, Y + 20, INK)
        for nome, k in [("anterior", meio - 1), ("atual", meio), ("próximo", meio + 1)]:
            cor = MEXEU if nome == "atual" else INK
            x = xs[k] + NW / 2
            d.polygon([(x, Y + 92), (x - 6, Y + 102), (x + 6, Y + 102)], fill=cor)
            texto(d, nome, x, Y + 106, 13, cor, b=True, align="c")
        _painel(d, [("ponteiros trocados", f"{meio} de {N}", 40, False), ("memória extra", "3 ponteiros", 20, False)])
        rich(d, [("guarda o próximo, ", ""), ("vira o ponteiro", "b"), (", anda: ", ""), (f"{N} trocas no total", "bg")], W / 2, 34, 18)

    return [(1.0, cena)], 0.5


def montar_janela(pasta):
    """Máximo em janela deslizante: o vetor com a janela de agora, o deque de
    posições embaixo e, mais abaixo, os máximos já achados, em verde."""
    D, F = _ler(pasta)
    ex = D["exemplo"]
    v, N, k = ex["vetor"], ex["n"], ex["k"]
    # refaz o deque até a janela que termina em `ate`, sem contar nada
    ate, dq = min(N - 1, k + N // 2), []
    for i in range(ate + 1):
        if i >= k and dq[0] == i - k:
            dq.pop(0)
        while dq and v[dq[-1]] <= v[i]:
            dq.pop()
        dq.append(i)
    achados = ex["maximos"][:ate - k + 2]
    cw = min(34, (BX1 - BX0) / N)

    def cena(d, t, im):
        texto(d, "vetor", BX0, 96, 11, GRAY)
        for i, x in enumerate(v):
            xx = BX0 + i * cw
            dentro = ate - k < i <= ate
            d.rectangle((xx + 1, 116, xx + cw - 1, 150), fill=MEXEU if i == ate else (CLARO if dentro else "white"),
                        outline=INK if dentro else PALIDO, width=1)
            texto(d, str(x), xx + cw / 2, 124, int(min(15, cw * 0.45)), (255, 255, 255) if i == ate else INK, b=True, align="c")
        xa, xb = BX0 + (ate - k + 1) * cw, BX0 + (ate + 1) * cw
        line(d, (xa, 108), (xb, 108), INK, w=3)
        texto(d, f"janela de {k}", (xa + xb) / 2, 84, 11, INK, align="c")
        texto(d, "deque (frente → fundo)", BX0, 196, 11, GRAY)
        for j, p in enumerate(dq):
            xx = BX0 + j * 58
            d.rectangle((xx, 216, xx + 52, 262), fill=CLARO, outline=INK, width=2)
            texto(d, str(v[p]), xx + 26, 222, 16, INK, b=True, align="c")
            texto(d, f"pos {p + 1}", xx + 26, 244, 10, GRAY, align="c")
        texto(d, "máximos", BX0, 306, 11, GRAY)
        for j, m in enumerate(achados):
            xx = BX0 + (j + k - 1) * cw
            texto(d, str(m), xx + cw / 2, 326, int(min(15, cw * 0.45)), GREEN, b=True, align="c")
        _painel(d, [("comparações", str(ex["ops"]), 40, True), ("o ingênuo faria", str(ex["ingenuo"]), 26, False),
                    ("deque mais cheio", f"{ex['pico']} posições", 20, False)])
        rich(d, [("n = ", ""), (str(N), "b"), (f", k = {k}: ", ""), (f"{ex['ops']} comparações", "bg"), (f" (ingênuo: {ex['ingenuo']})", "")], W / 2, 34, 18)

    return [(1.0, cena)], 0.5


def _num(x, casas=1):
    """Número com vírgula decimal e separador de milhar, como na página."""
    s = f"{x:,.{casas}f}".replace(",", " ").replace(".", ",").replace(" ", ".")
    return s


def montar_mediana(pasta):
    """Mediana por quickselect: o vetor do encarte como o algoritmo o deixa,
    com a casa do meio em verde (o resultado) e a média tracejada."""
    D, F = _ler(pasta)
    ex = D["exemplo"]
    v, N = list(ex["vetor"]), ex["n"]
    for e in ex["eventos"]:              # refaz as trocas para chegar ao vetor final
        if e[0] == "troca":
            v[e[1]], v[e[2]] = v[e[2]], v[e[1]]
    k = ex["k"] - 1
    BTOPO, BBASE = 96, 410
    bw = (BX1 - BX0) / N
    topo = max(v)
    altura = lambda x: x / topo * (BBASE - BTOPO)

    def cena(d, t, im):
        line(d, (BX0, BBASE + 1), (BX1, BBASE + 1), PALIDO, w=1)
        for i, x in enumerate(v):
            cor = GREEN if i == k else INK
            d.rectangle((BX0 + i * bw + bw * 0.12, BBASE - altura(x), BX0 + i * bw + bw * 0.88, BBASE), fill=cor)
        ym = BBASE - altura(ex["media"])
        for x0 in range(BX0, BX1, 9):
            line(d, (x0, ym), (min(x0 + 5, BX1), ym), GRAY, w=1)
        texto(d, "média", BX0 - 6, ym - 8, 11, GRAY, align="r")
        _painel(d, [("comparações", str(ex["ops"]), 40, True), ("mediana", _num(ex["mediana"]), 26, False),
                    ("média", _num(ex["media"]), 20, False)])
        rich(d, [("mediana ", ""), (_num(ex["mediana"]), "bg"), (f": {ex['ops']} comparações, sem ordenar tudo", "")], W / 2, 34, 18)

    return [(1.0, cena)], 0.5


def montar_welford(pasta):
    """Welford: a série do LakeHuron com a média corrente e a faixa de ±1 dp
    que ela vai formando, e a variância final em verde."""
    D, F = _ler(pasta)
    ex = D["exemplo"]
    anos, x = ex["anos"], ex["x"]
    medias, dps, n, media, m2 = [], [], 0, 0.0, 0.0
    for valor in x:
        n += 1
        delta = valor - media
        media += delta / n
        m2 += delta * (valor - media)
        medias.append(media)
        dps.append((m2 / (n - 1)) ** 0.5 if n > 1 else 0.0)
    lo, hi = min(x) - 0.3, max(x) + 0.3
    GY0, GY1 = 110, 400
    gx = lambda i: BX0 + i / (len(x) - 1) * (BX1 - BX0)
    gy = lambda y: GY1 - (y - lo) / (hi - lo) * (GY1 - GY0)

    def cena(d, t, im):
        cima = [(gx(i), gy(medias[i] + dps[i])) for i in range(1, len(x))]
        baixo = [(gx(i), gy(medias[i] - dps[i])) for i in range(len(x) - 1, 0, -1)]
        d.polygon(cima + baixo, fill=CLARO)
        d.line([(gx(i), gy(medias[i])) for i in range(len(x))], fill=INK, width=3)
        for i, y in enumerate(x):
            ponto(d, gx(i), gy(y), 2.6, GRAY)
        line(d, (BX0, GY1 + 8), (BX1, GY1 + 8), PALIDO, w=1)
        texto(d, str(anos[0]), BX0, GY1 + 14, 11, GRAY)
        texto(d, str(anos[-1]), BX1, GY1 + 14, 11, GRAY, align="r")
        _painel(d, [("leituras", str(ex["ops"]), 40, False), ("variância", _num(ex["variancia"], 4), 26, True),
                    ("média", _num(ex["media"], 2), 20, False)])
        rich(d, [("uma passada: variância ", ""), (_num(ex["variancia"], 4), "bg"), (f", sem guardar os {ex['n']} anos", "")], W / 2, 34, 18)

    return [(1.0, cena)], 0.5


def montar_histograma(pasta):
    """Histograma: as contagens do faithful em verde (o resultado), com os
    limites das classes embaixo."""
    D, F = _ler(pasta)
    ex = D["exemplo"]
    cont, a, h, c = ex["contagens"], ex["a"], ex["h"], ex["c"]
    BTOPO, BBASE = 110, 400
    bw = (BX1 - BX0) / c
    topo = max(cont)

    def cena(d, t, im):
        line(d, (BX0, BBASE + 1), (BX1, BBASE + 1), PALIDO, w=1)
        for j, q in enumerate(cont):
            hh = q / topo * (BBASE - BTOPO)
            d.rectangle((BX0 + j * bw + 2, BBASE - hh, BX0 + (j + 1) * bw - 2, BBASE), fill=GREEN)
            texto(d, str(q), BX0 + (j + 0.5) * bw, BBASE - hh - 18, 12, INK, align="c")
        for j in range(c + 1):
            texto(d, _num(a + j * h), BX0 + j * bw, BBASE + 8, 11, GRAY, align="c")
        _painel(d, [("leituras", str(ex["ops"]), 40, False), ("classes", str(c), 26, True),
                    ("valores", str(ex["n"]), 20, False)])
        rich(d, [(f"{ex['n']} erupções em ", ""), (f"{c} classes", "bg"), (f": {ex['ops']} leituras", "")], W / 2, 34, 18)

    return [(1.0, cena)], 0.5
