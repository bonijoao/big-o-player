"""Molde das faixas de grafo (busca em largura e em profundidade): os grafos
em grade k × k que elas percorrem.

Os vértices 0 a V − 1 (V = k²) ficam na grade linha a linha: o vértice da
linha r e coluna c é r·k + c. As arestas só ligam vizinhos de linha ou de
coluna, então o desenho sai da conta e nada se cruza. Três casos:
  grade     todas as 2k(k − 1) arestas
  sorteado  conexo: uma árvore que cobre a grade (Kruskal com as arestas
            embaralhadas) mais cada aresta que sobrou com chance 1/3
  caminho   uma serpentina: a linha 0 da esquerda para a direita, a linha 1
            de volta, e assim por diante; o vértice 0 é uma das pontas
As arestas vão em ordem (u, v), u < v, e a lista de adjacência é montada
nessa ordem: os vizinhos de cada vértice ficam em ordem crescente.
"""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(AQUI, "..", "instrumentos", "grafo"))
from grafo import GrafoLista  # noqa: E402

CASOS = ["sorteado", "grade", "caminho"]
NOMES = {"sorteado": "sorteado", "grade": "grade cheia", "caminho": "caminho"}
EXTRA = 1 / 3      # no sorteado, a chance de cada aresta que sobra da árvore


def todas(k):
    """As 2k(k − 1) arestas da grade cheia, em ordem."""
    arestas = []
    for u in range(k * k):
        r, c = divmod(u, k)
        if c + 1 < k:
            arestas.append([u, u + 1])
        if r + 1 < k:
            arestas.append([u, u + k])
    return sorted(arestas)


def gerar(k, caso, r):
    """As arestas de um grafo em grade k × k do caso pedido."""
    if caso == "grade":
        return todas(k)
    if caso == "caminho":
        ordem = []
        for linha in range(k):
            cols = range(k) if linha % 2 == 0 else range(k - 1, -1, -1)
            ordem += [linha * k + c for c in cols]
        return sorted(sorted([ordem[i], ordem[i + 1]]) for i in range(len(ordem) - 1))
    if caso != "sorteado":
        raise ValueError(f"caso desconhecido: {caso}")
    pai = list(range(k * k))

    def raiz(x):
        while pai[x] != x:
            pai[x] = pai[pai[x]]
            x = pai[x]
        return x

    candidatas = todas(k)
    r.shuffle(candidatas)
    escolhidas = []
    for u, v in candidatas:
        a, b = raiz(u), raiz(v)
        if a != b:
            pai[a] = b
            escolhidas.append([u, v])
        elif r.random() < EXTRA:
            escolhidas.append([u, v])
    return sorted(escolhidas)


def lista(V, arestas, conta):
    """A lista de adjacência do grafo; montá-la não entra na conta da faixa."""
    g = GrafoLista(conta, V)
    for u, v in arestas:
        g.por(u, v)
    conta.ops.clear()
    return g


# ---------- medição padrão das duas faixas ----------

K_VIDEO, CASO_VIDEO, SEMENTE_VIDEO = 5, "sorteado", 11
KS = [4, 6, 8, 11, 16, 23, 32, 45, 64]       # V = k² quase dobra a cada passo
SEMENTES = range(1, 11)
DISTRIBUICAO = range(1, 201)
K_CONFERIR, SEMENTES_CONFERIR = 6, range(1, 6)


def rodar(alg, k, arestas, gravar=False):
    """Roda a busca a partir do vértice 0 e resume o que contou. `estrutura` é a fila ou a pilha."""
    from conta import Contador
    c = Contador()
    c.gravar = gravar
    g = lista(k * k, arestas, c)
    resultado = alg(g, 0, c)
    casas = c.ops.get("leituras", 0) + c.ops.get("escritas", 0)
    ops = sum(x for nome, x in c.ops.items() if nome not in ("leituras", "escritas"))
    fixo = sum(x for nome, x in c.vivos.items() if nome not in ("fila", "pilha"))   # os vetores de V casas
    return resultado, c, {"ops": ops, "pico": c.pico, "estrutura": c.pico - fixo, "casas": casas}


def medir(alg, pasta, unidade, estrutura, extra):
    """Mede uma das buscas e grava dados.json. `extra(resultado, c)` acrescenta o
    resultado próprio da faixa (a ordem de visita, as distâncias)."""
    import json
    import random
    import statistics
    from ciclomatica import medir as ciclomatica

    arestas = gerar(K_VIDEO, CASO_VIDEO, random.Random(SEMENTE_VIDEO))
    res, c, r = rodar(alg, K_VIDEO, arestas, gravar=True)

    def varios(k, caso):
        sementes = SEMENTES if caso == "sorteado" else [1]
        rs = [rodar(alg, k, gerar(k, caso, random.Random(s)))[2] for s in sementes]
        ops = [x["ops"] for x in rs]
        return {"media": statistics.mean(ops), "min": min(ops), "max": max(ops),
                "pico": max(x["estrutura"] for x in rs), "arestas": statistics.mean(len(gerar(k, caso, random.Random(s))) for s in sementes)}

    crescimento = [{"n": k * k, "k": k, **{caso: varios(k, caso) for caso in CASOS}} for k in KS]
    dist = [rodar(alg, K_VIDEO, gerar(K_VIDEO, CASO_VIDEO, random.Random(s)))[2]["estrutura"] for s in DISTRIBUICAO]

    conferir = []
    for s in SEMENTES_CONFERIR:
        for caso in CASOS:
            a = gerar(K_CONFERIR, caso, random.Random(s))
            rr, cc, resumo = rodar(alg, K_CONFERIR, a, gravar=True)
            conferir.append({"caso": caso, "k": K_CONFERIR, "arestas": a, **resumo, **extra(rr, cc)})

    V = K_VIDEO * K_VIDEO
    dados = {
        "exemplo": {
            "dados": f"um grafo em grade {K_VIDEO} × {K_VIDEO} sorteado com a semente {SEMENTE_VIDEO}: {V} vértices e {len(arestas)} arestas",
            "n": V, "k": K_VIDEO, "semente": SEMENTE_VIDEO, "caso": CASO_VIDEO, "arestas": arestas,
            **r, **extra(res, c), "eventos": c.eventos,
        },
        "tempo": {
            "unidade": unidade,
            "tipo": "grafo",
            "series": [{"caso": caso, "nome": NOMES[caso] + (" (média)" if caso == "sorteado" else "")} for caso in CASOS],
            "banda": "sorteado",
            "crescimento": crescimento,
            "eixo": "V (vértices de uma grade k × k; quase dobra a cada passo)",
            "refs": ["V"],
            "crescimento_dados": f"média de {len(SEMENTES)} grafos sorteados por tamanho (grade cheia e caminho: um grafo, sempre o mesmo)",
            "distribuicao": {"n": V, "vezes": len(dist), "valores": dist, "destaque": r["estrutura"]},
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(alg),
        "conferir": conferir,
    }
    with open(os.path.join(pasta, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    nome = os.path.basename(pasta)
    print(f"{nome}: {V} vértices, {len(arestas)} arestas → {r}, M={dados['ciclomatica']['M']}")
    for g in crescimento:
        print(f"  V={g['n']:5d} " + "  ".join(f"{caso} {g[caso]['media']:.1f}/{estrutura} {g[caso]['pico']}" for caso in CASOS))
    print(f"  {len(dist)} grafos V={V}: {estrutura} de {min(dist)} a {max(dist)}")
    return dados
