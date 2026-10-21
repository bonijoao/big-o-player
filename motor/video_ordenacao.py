"""Vídeo padrão das ordenações: barrinhas enfileiradas, altura = valor.

A cor mostra o papel da barra, nunca o tamanho: azul = já está no lugar
final, coral = acabou de se mexer, tinta = o resto. Setinhas embaixo marcam
a comparação da vez. Embaixo das barras, a pilha de recursão (um traço por
chamada ativa) e, no merge, a lista auxiliar: a memória extra aparece.

O vídeo é a reprodução dos eventos gravados pelo algoritmo de verdade
(dados.json): cada comparação e cada escrita ocupam um quadro (uma troca
são duas escritas), então quem trabalha mais dura mais. Os primeiros
passos vão devagar.
"""
import json
import os

from cena import *  # noqa: F401,F403

ALBUM = (40, 105, 195)
MEXEU = (235, 95, 70)
PIVO = (222, 150, 20)         # quick: o pivô
MENOR = (0, 145, 155)         # quick: já comparado e menor que o pivô
MAIOR = (140, 80, 185)        # quick: já comparado e maior que o pivô
APAGADO = (214, 216, 221)     # fora do trecho da vez
PALIDO = (205, 208, 214)
VISIVEIS = ("compara", "troca", "escreve")
LENTOS = 8           # eventos visíveis mostrados devagar no começo
PASSO_LENTO = 0.45
PASSO = 1 / FPS      # depois: um quadro por comparação ou movimento
BX0, BX1, BTOPO = 70, 600, 96
AUX_TOPO, AUX_BASE = 420, 492


def _milhar(x):
    x = round(x)
    return f"{x:,}".replace(",", ".") if x >= 10000 else str(x)


def montar(pasta):
    with open(os.path.join(pasta, "dados.json")) as f:
        D = json.load(f)
    with open(os.path.join(pasta, "ficha.json")) as f:
        F = json.load(f)
    ex = D["exemplo"]
    N, eventos = ex["n"], ex["eventos"]
    tem_aux = "auxiliar" in D["memoria"]["detalhe"]
    tem_pilha = "pilha" in D["memoria"]["detalhe"]
    mov_nome = ex["movimento"]
    # sem pilha nem lista auxiliar, as barras ocupam o espaço de baixo
    BBASE = 316 if (tem_aux or tem_pilha) else 410
    LEGENDA_Y = 520 if tem_aux else 470
    PILHA_Y = 340 if tem_aux else 350   # sem lista auxiliar, abre espaço para o rótulo do pivô
    fundo_arvore = (AUX_TOPO - 28) if tem_aux else (LEGENDA_Y - 14)

    # ---- reprodução dos eventos: um estado depois de cada evento ----
    v, aux = list(ex["vetor"]), [None] * N
    pilha, pivo = [], None
    chamadas = []                  # árvore da recursão: (a, b, nível, evento de início, evento de fim)
    abertas = []
    part = None                    # quick: trecho, pivô, fronteira i e o último j comparado
    fim_part1 = None               # evento em que a primeira partição termina
    comps = movs = 0
    estados = []
    for k_ev, e in enumerate(eventos):
        tipo = e[0]
        foco, mexeu = None, ()
        if tipo == "compara":
            comps += 1
            foco = (e[1], e[2], e[3])
            if part is not None and e[1] == part["p"]:
                part = {**part, "j": e[2]}
        elif tipo == "troca":
            movs += 1
            i, j = e[1], e[2]
            v[i], v[j] = v[j], v[i]
            mexeu = (("v", i), ("v", j)) if i != j else ()   # trocar com ele mesmo não move nada
            if part is not None:
                if j == part["p"]:                 # pivô vai para o meio: partição feita
                    part = None
                    if fim_part1 is None:
                        fim_part1 = k_ev
                else:
                    part = {**part, "i": part["i"] + 1}
            if pivo in (i, j):
                pivo = j if pivo == i else i
        elif tipo == "escreve":
            movs += 1
            k, x, onde = e[1], e[2], e[3]
            (aux if onde == "aux" else v)[k] = x
            mexeu = ((onde, k),)
        elif tipo == "entra":
            pilha.append((e[1], e[2]))
            abertas.append(len(chamadas))
            chamadas.append([e[1], e[2], len(pilha) - 1, k_ev, None])
            pivo = None
        elif tipo == "sai":
            pilha.pop()
            chamadas[abertas.pop()][4] = k_ev
        elif tipo == "pivo":
            pivo = e[1]
            a0, b0 = pilha[-1]
            part = {"a": a0, "b": b0, "p": e[1], "i": a0, "j": None}
        pico_ate = max(estados[-1]["pico"] if estados else 0, (N if tem_aux else 0) + len(pilha))
        estados.append(dict(v=list(v), aux=list(aux), pilha=list(pilha), pivo=pivo, foco=foco, tipo=tipo, part=part,
                            mexeu=mexeu, comps=comps, movs=movs, visivel=tipo in VISIVEIS, pico=pico_ate))
    if v != sorted(ex["vetor"]) or comps != ex["ops"] or movs != ex["movimentos"]:
        raise AssertionError("a reprodução dos eventos não bate com a medição")
    if estados[-1]["pico"] != D["memoria"]["pico"]:
        raise AssertionError("o pico de memória da reprodução não bate com a medição")
    # azul = assentou de vez: está no lugar final e nenhuma escrita a toca depois
    ultimo = [-1] * N
    for k, st in enumerate(estados):
        for onde, i in st["mexeu"]:
            if onde == "v":
                ultimo[i] = k

    nivel_max = max((c[2] for c in chamadas), default=0)
    ROW = min(8, (fundo_arvore - PILHA_Y - 20) / max(1, nivel_max))

    # ---- relógio: quando cada evento acontece ----
    # câmera lenta no começo (no quick, a primeira partição inteira), depois um
    # quadro por comparação ou escrita; o quick pausa ao fim da primeira partição
    quick = fim_part1 is not None
    lentos = sum(1 for s in estados[:fim_part1 + 1] if s["visivel"]) if quick else LENTOS
    passo_lento = 0.3 if quick else PASSO_LENTO
    PAUSA = 2.6 if quick else 0
    T0 = 1.6                       # barras entram antes
    inicio, t, nvis = [], T0, 0
    t_pausa = None
    for k_ev, s in enumerate(estados):
        inicio.append(t)
        if s["visivel"]:
            quadros = 2 if s["tipo"] == "troca" else 1     # troca = duas escritas
            t += passo_lento if nvis < lentos else PASSO * quadros
            nvis += 1
        if quick and k_ev == fim_part1:
            t_pausa = t
            t += PAUSA
    T_FIM = t
    DUR = T_FIM + 3.0
    vis_idx = []                   # índice visível acumulado de cada evento
    c = 0
    for s in estados:
        c += s["visivel"]
        vis_idx.append(c)

    def estado_em(t):
        """Índice do último evento já acontecido (-1 = nenhum)."""
        lo, hi = 0, len(inicio)
        while lo < hi:
            m = (lo + hi) // 2
            if inicio[m] <= t:
                lo = m + 1
            else:
                hi = m
        return lo - 1

    bw = (BX1 - BX0) / N

    def barra_x(i):
        return BX0 + i * bw

    def cor_quick(i, x, k, part):
        """Quick: a cor diz o papel na partição da vez."""
        if x == i and k is not None and k >= ultimo[i]:
            return ALBUM
        if part is None:
            return INK
        if not (part["a"] <= i < part["b"]):
            return APAGADO
        if i == part["p"]:
            return PIVO
        if i < part["i"]:
            return MENOR
        if part["j"] is not None and i <= part["j"]:
            return MAIOR
        return INK

    def desenhar_barras(d, vals, topo, base, a, coral, palido=False, k=None, part=None):
        for i, x in enumerate(vals):
            if x is None:
                continue
            if quick and not palido:
                cor = cor_quick(i, x, k, part)
            elif palido:
                cor = (150, 153, 160)
            elif x == i and k is not None and k >= ultimo[i]:
                cor = ALBUM
            elif i in coral:
                cor = MEXEU
            else:
                cor = INK
            h = (x + 1) / N * (base - topo)
            d.rectangle((barra_x(i) + bw * 0.12, base - h, barra_x(i + 1) - bw * 0.12, base), fill=mix(cor, a))

    def seta(d, i, y, a):
        cx = barra_x(i) + bw / 2
        d.polygon([(cx, y), (cx - 5, y + 8), (cx + 5, y + 8)], fill=mix(INK, a))

    def principal(d, t, im):
        a = ease(t / 0.8)
        k = estado_em(t)
        s = estados[k] if k >= 0 else dict(v=ex["vetor"], aux=[None] * N, pilha=[], pivo=None,
                                           foco=None, comps=0, movs=0, pico=N if tem_aux else 0)
        agora = vis_idx[k] if k >= 0 else 0
        coral = {"v": set(), "aux": set()}
        for j in (range(0) if quick else range(max(0, k - 12), k + 1)):          # coral dura 3 eventos visíveis
            if j >= 0 and agora - vis_idx[j] < 3:
                for onde, i in estados[j]["mexeu"]:
                    coral[onde].add(i)
        line(d, (BX0, BBASE + 1), (BX1, BBASE + 1), PALIDO, a, 1)
        desenhar_barras(d, s["v"], BTOPO, BBASE, a, coral["v"], k=k, part=s.get("part"))
        fim = t >= T_FIM
        foco = s["foco"] if k >= 0 and estados[k]["visivel"] and not fim else None
        if foco and foco[2] == "v":
            seta(d, foco[0], BBASE + 5, a)
            seta(d, foco[1], BBASE + 5, a)
        if s["pivo"] is not None:
            texto(d, "pivô", barra_x(s["pivo"]) + bw / 2, BBASE + 14, 11, INK, b=True, align="c")
        # pilha de recursão
        if tem_pilha:
            np_ = len(s["pilha"])
            texto(d, f"pilha: {np_} {'nível' if np_ == 1 else 'níveis'}   (árvore de chamadas: escuro = aberta, claro = resolvida)",
                  BX0, PILHA_Y, 11, GRAY, alpha=a)
            for (x0, x1, nivel, ini, fim_c) in chamadas:
                if ini > k:
                    break
                y = PILHA_Y + 20 + nivel * ROW
                ativa = fim_c is None or fim_c > k
                cor = INK if ativa else PALIDO
                if x1 - x0 <= 1:                       # caso base: um número ou nenhum
                    cx = barra_x(x0) + bw / 2
                    d.ellipse((cx - 2, y - 2, cx + 2, y + 2), fill=mix(cor, a))
                else:
                    line(d, (barra_x(x0) + 2, y), (barra_x(x1) - 2, y), cor, a, 3)
        # lista auxiliar
        if tem_aux:
            texto(d, f"lista auxiliar: {N} posições de memória extra", BX0, AUX_TOPO - 22, 11, GRAY, alpha=a)
            line(d, (BX0, AUX_BASE + 1), (BX1, AUX_BASE + 1), PALIDO, a, 1)
            desenhar_barras(d, s["aux"], AUX_TOPO, AUX_BASE, a, coral["aux"], palido=True)
            for i in coral["aux"]:
                x = s["aux"][i]
                if x is not None:
                    h = (x + 1) / N * (AUX_BASE - AUX_TOPO)
                    d.rectangle((barra_x(i) + bw * 0.12, AUX_BASE - h, barra_x(i + 1) - bw * 0.12, AUX_BASE),
                                fill=MEXEU)
            if foco and foco[2] == "aux":
                seta(d, foco[0], AUX_BASE + 4, a)
                seta(d, foco[1], AUX_BASE + 4, a)
        # painel
        x = 650
        texto(d, "comparações", x, BTOPO - 6, 13, GRAY, alpha=a)
        texto(d, str(s["comps"]), x, BTOPO + 12, 40, GREEN if fim else INK, b=True, alpha=a)
        texto(d, mov_nome, x, BTOPO + 84, 13, GRAY, alpha=a)
        texto(d, str(s["movs"]), x, BTOPO + 100, 26, INK, b=True, alpha=a)
        extra = (N if tem_aux else 0) + len(s["pilha"])
        texto(d, "memória extra agora", x, BTOPO + 154, 13, GRAY, alpha=a)
        texto(d, f"{extra} {'valor' if extra == 1 else 'valores'}", x, BTOPO + 170, 20, INK, b=True, alpha=a)
        if tem_aux or tem_pilha:   # o pico inclui as chamadas mais fundas, que passam rápido demais para ver
            texto(d, f"pico até aqui: {s['pico']}", x, BTOPO + 196, 13, GREEN if fim else GRAY, b=fim, alpha=a)
        rich(d, [("n = ", "gray"), (str(N), "b"), (" números", "gray")], x, max(BBASE - 14, BTOPO + 228), 13, align="l", alpha=a)
        # legenda das cores
        ly = LEGENDA_Y
        itens = ([(BX0, PIVO, "pivô"), (BX0 + 70, MENOR, "menor que o pivô"), (BX0 + 220, MAIOR, "maior"),
                  (BX0 + 290, INK, "falta comparar"), (BX0 + 420, ALBUM, "no lugar final")] if quick else
                 [(BX0, ALBUM, "no lugar final"), (BX0 + 160, MEXEU, "acabou de se mexer"), (BX0 + 360, INK, "o resto")])
        for cx, cor, rot in itens:
            d.rectangle((cx, ly + 2, cx + 10, ly + 12), fill=mix(cor, a))
            texto(d, rot, cx + 16, ly - 1, 11, GRAY, alpha=a)
        # legenda do topo
        ideia = F["video"]["ideia"]
        nv = vis_idx[k] if k >= 0 else 0
        if fim:
            segs, t0 = [("ordenado: ", ""), (f"{ex['ops']} comparações", "bg"),
                        (f", {ex['movimentos']} {mov_nome}", "")], T_FIM
        elif quick and t_pausa <= t < t_pausa + PAUSA:
            segs, t0 = [(ideia[1], "")], t_pausa
        elif nv <= lentos and not (quick and t >= t_pausa):
            segs, t0 = [(ideia[0], "")], T0
        else:
            segs, t0 = [(ideia[-1], "")], (t_pausa + PAUSA) if quick else inicio[[i for i, n in enumerate(vis_idx) if n > lentos][0]]
        rich(d, segs, W / 2, 34, 18, n=(t - t0) * CPS * 1.6)

    # ---- resumo ----
    cres = D["tempo"]["crescimento"][-1]
    pico = D["memoria"]["pico"]
    M = D["ciclomatica"]["M"]
    linhas = [
        ("tempo", F["tempo"]["notacao"], f"{N} números: {ex['ops']} comparações"),
        ("memória", F["memoria"]["notacao"], f"{pico} valores extras no pico" if pico else "nenhum valor extra"),
        ("ciclomática", f"M = {M}", f"{M} caminhos independentes no código"),
    ]
    rodape = (f"com {cres['n']} números: {_milhar(cres['aleatorio']['media'])} comparações em média; "
              f"já ordenado: {_milhar(cres['ordenado']['comparacoes'])}; "
              f"invertido: {_milhar(cres['invertido']['comparacoes'])}")

    def resumo(d, t, im):
        for r, (nome, ordem, det) in enumerate(linhas):
            t0 = 0.3 + r * 1.3
            y = 150 + r * 82
            digitado(d, nome, 96, y, t - t0, 20, INK, b=True)
            digitado(d, ordem, 290, y, t - t0 - 0.25, 20, GREEN, b=True)
            digitado(d, det, 470, y + 3, t - t0 - 0.5, 16, INK)
        t0 = 0.3 + 3 * 1.3 + 0.3
        a = ease((t - t0) / 0.5)
        if a > 0:
            line(d, (96, 380), (W - 96, 380), EDGE, a, 1)
            texto(d, rodape, W / 2, 398, 14, GRAY, alpha=a, align="c")
        a = ease((t - t0 - 1.2) / 0.6)
        if a > 0:
            texto(d, f"{F['nome'].lower()} · é complexo, baby?", W / 2, 488, 13, GRAY, alpha=a, align="c")

    nome = F["nome"].lower()
    cenas = [
        typed([[("quantas comparações o ", ""), (nome, "b"), (" faz", "")],
               [("para ordenar ", ""), (f"{N} números", "b"), ("?", "")]], hold=1.0),
        (DUR, principal),
        (8.0, resumo),
    ]
    # pôster: a 40% do caminho, mas só depois de a segunda legenda terminar de digitar
    if quick:   # pôster: a pausa, com a primeira partição feita e o pivô no lugar
        return cenas, cenas[0][0] + t_pausa + len(F["video"]["ideia"][1]) / (CPS * 1.6) + 0.4
    t_leg2 = inicio[[i for i, n in enumerate(vis_idx) if n > lentos][0]] + len(F["video"]["ideia"][-1]) / (CPS * 1.6) + 0.3
    return cenas, cenas[0][0] + max(T0 + 0.4 * (T_FIM - T0), t_leg2)
