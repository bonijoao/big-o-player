"""Mede a busca de padrão ingênua e grava dados.json. Rodar: python3 algoritmos/padrao/medir.py

O português das curvas é o Dom Casmurro (na pasta da faixa de contar
palavras): as n primeiras letras, procurando as m letras que começam na
posição n − 2m (o padrão aparece pelo menos uma vez)."""
import json
import os
import random
import statistics
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import padrao  # noqa: E402

PADRAO_VIDEO = "gorjeiam"
TAMANHOS = [64, 128, 256, 512, 1024, 2048, 4096]
M_FIXO = 8                                       # o m do gráfico × n
N_FIXO, MS = 1024, [2, 4, 8, 16, 32, 64]         # o n e os m do gráfico × m
SEMENTES = range(1, 21)
CASOS = ["portugues", "dna", "pior"]
NOMES = {"portugues": "português (Dom Casmurro)", "dna": "DNA sorteado (média)", "pior": "pior caso (aaa…ab)"}


def rodar(t, p, gravar=False):
    c = Contador()
    c.gravar = gravar
    achou = padrao.buscar(padrao.texto(c, t), p, c)
    certo = [i for i in range(len(t) - len(p) + 1) if t[i:i + len(p)] == p]
    assert achou == certo, (t[:20], p, achou, certo)
    return {"achou": achou, "ops": c.ops.get("comparacoes", 0), "pico": c.pico, "casas": c.ops.get("leituras", 0)}, c


def entrada(caso, n, m, r, livro):
    if caso == "pior":
        return padrao.pior(n, m)
    if caso == "dna":
        return padrao.dna(n, m, r)
    t = livro[:n]
    return t, t[n - 2 * m:n - m]


def varios(caso, n, m, livro):
    rs = [rodar(*entrada(caso, n, m, random.Random(s), livro))[0] for s in (SEMENTES if caso == "dna" else [1])]
    ops = [r["ops"] for r in rs]
    return {"media": statistics.mean(ops), "min": min(ops), "max": max(ops), "pico": 0}


if __name__ == "__main__":
    t = padrao.estrofe()
    r, c = rodar(t, PADRAO_VIDEO, gravar=True)
    livro = padrao.ler_texto(os.path.join("..", "palavras", "dom-casmurro.txt"))
    crescimento = [{"n": n, **{caso: varios(caso, n, M_FIXO, livro) for caso in CASOS}} for n in TAMANHOS]
    por_k = [{"n": m, **{caso: varios(caso, N_FIXO, m, livro) for caso in CASOS}} for m in MS]

    conferir = [{"caso": "encarte", "texto": t, "padrao": p, **rodar(t, p)[0]} for p in ["gorjeiam", "gorj", "go", "a", "lá.", "Minha", "sabiá", "x"]]
    for s in range(1, 6):
        for n, m in [(30, 3), (60, 2), (40, 5), (10, 10), (8, 9)]:
            for caso in ["dna", "pior"]:
                tt, pp = entrada(caso, n, m, random.Random(s), livro) if m <= n else (padrao.dna(n, 1, random.Random(s))[0], "ACGTACGTA")
                conferir.append({"caso": caso, "texto": tt, "padrao": pp, **rodar(tt, pp)[0]})

    dados = {
        "exemplo": {
            "dados": "a primeira estrofe da Canção do Exílio (Gonçalves Dias, 1843), procurando \"gorjeiam\"",
            "n": len(t), "m": len(PADRAO_VIDEO), "k": len(PADRAO_VIDEO), "texto": t, "padrao": PADRAO_VIDEO, **r, "eventos": c.eventos,
        },
        "tempo": {
            "unidade": "comparações",
            "tipo": "busca_padrao",
            "series": [{"caso": k, "nome": NOMES[k]} for k in CASOS],
            "banda": "dna",
            "crescimento": crescimento,
            "eixo": f"n (letras do texto; dobra a cada passo), m = {M_FIXO}",
            "refs": ["n"],
            "crescimento_dados": f"no DNA, média de {len(SEMENTES)} textos sorteados por tamanho; o português e o pior caso, um texto",
            "k_fixo": M_FIXO,
            "por_k": por_k,
            "n_fixo": N_FIXO,
            "eixo_k": f"m (letras do padrão), n = {N_FIXO}",
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(padrao.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"padrao: n={len(t)} m={len(PADRAO_VIDEO)} → achou em {r['achou']}, {r['ops']} comparações, M={dados['ciclomatica']['M']}")
    for nome, serie in [("× n", crescimento), ("× m", por_k)]:
        for g in serie:
            print(f"  {nome} {g['n']:5d} " + "  ".join(f"{k} {g[k]['media']:.1f}" for k in CASOS))
