"""Medição comum das duas faixas de colisão (algoritmos/encadeamento e
algoritmos/sondagem): o exemplo do encarte, as sondagens × α contra as
fórmulas de Knuth, o total × m com α fixo e as entradas que o JS refaz.

O módulo da faixa traz inserir_todas(chaves, bits, conta), formula_media(α),
formula_ultima(α) e chaves(n, caso, bits, r).
"""
import json
import os
import random
import statistics

from conta import Contador
from ciclomatica import medir as ciclomatica

BITS_VIDEO, N_VIDEO, SEMENTE_VIDEO = 4, 12, 3   # m = 16 casas, α = 3/4
BITS_ALFA, SEMENTES_ALFA = 16, 20               # m = 65 536: sondagens × α (as fórmulas valem para m grande)
BITS_CRESC = range(6, 13, 2)                    # m = 64, 256, 1024 e 4096: total × m, com α fixo
SEMENTES = range(1, 11)


def rodar(mod, chaves, bits):
    c = Contador()
    t, sondagens = mod.inserir_todas(chaves, bits, c)
    return {"sondagens": sondagens, "ops": sum(sondagens), "pico": c.pico,
            "casas": c.ops.get("leituras", 0) + c.ops.get("escritas", 0), "tabela": t.valores()}, c


def alfas(mod, amax, passo):
    """Para cada α do gráfico: a média das sondagens por chave pondo até α (a busca
    com sucesso) e a média das inserções em volta de α (a busca sem sucesso, com
    α ocupado), em SEMENTES_ALFA tabelas de 2^BITS_ALFA casas."""
    m = 2 ** BITS_ALFA
    pontos = [round(passo * k, 2) for k in range(1, int(round(amax / passo)) + 1)]
    janela = m // 200                            # inserções de cada lado de α·m (α ± 0,005)
    porsem = []
    for s in range(1, SEMENTES_ALFA + 1):
        r = random.Random(s)
        n = int(amax * m) + janela + 1
        chaves = r.sample(range(1, 2 ** 31), n)
        porsem.append(rodar(mod, chaves, BITS_ALFA)[0]["sondagens"])
    saida = []
    for a in pontos:
        n = int(round(a * m))
        medias = [statistics.mean(sd[:n]) for sd in porsem]
        ultimas = [statistics.mean(sd[n - janela:n + janela]) for sd in porsem]
        saida.append({"alfa": a, "media": statistics.mean(medias), "media_min": min(medias), "media_max": max(medias),
                      "ultima": statistics.mean(ultimas), "ultima_min": min(ultimas), "ultima_max": max(ultimas),
                      "formula_media": mod.formula_media(a), "formula_ultima": mod.formula_ultima(a)})
    return {"m": m, "sementes": SEMENTES_ALFA, "janela": janela, "pontos": saida}


def crescimento(mod, casos):
    """Total de sondagens pondo α·m chaves, para m dobrando, com α fixo (um caso por α)."""
    linhas = []
    for bits in BITS_CRESC:
        m, g = 2 ** bits, {}
        for caso, a in casos.items():
            rs = [rodar(mod, random.Random(s).sample(range(1, 2 ** 31), int(a * m)), bits)[0] for s in SEMENTES]
            ops = [x["ops"] for x in rs]
            g[caso] = {"media": statistics.mean(ops), "min": min(ops), "max": max(ops), "pico": max(x["pico"] for x in rs)}
        linhas.append({"n": m, **g})
    return linhas


def medir(mod, pasta, tipo, casos, amax, passo, ns_conferir):
    ch = mod.chaves(N_VIDEO, "sorteadas", BITS_VIDEO, random.Random(SEMENTE_VIDEO))
    r, c = rodar(mod, ch, BITS_VIDEO)
    conferir = []
    for s in range(1, 6):
        for n in ns_conferir:
            for caso in ["sorteadas", "mesma_casa"]:
                ks = mod.chaves(n, caso, BITS_VIDEO, random.Random(100 * s + n))
                conferir.append({"caso": caso, "bits": BITS_VIDEO, "chaves": ks, **rodar(mod, ks, BITS_VIDEO)[0]})
        ks = random.Random(s).sample(range(1, 2 ** 31), 200)
        conferir.append({"caso": "grandes", "bits": 8, "chaves": ks, **rodar(mod, ks, 8)[0]})
    nomes = {k: f"α = {str(a).replace('.', ',')}" for k, a in casos.items()}
    dados = {
        "exemplo": {
            "dados": f"{N_VIDEO} chaves sorteadas de 100 a 999 com a semente {SEMENTE_VIDEO}, numa tabela de {2 ** BITS_VIDEO} casas",
            "n": N_VIDEO, "m": 2 ** BITS_VIDEO, "bits": BITS_VIDEO, "semente": SEMENTE_VIDEO, "caso": "sorteadas", "chaves": ch, **r,
        },
        "tempo": {
            "unidade": "sondagens",
            "tipo": tipo,
            "series": [{"caso": k, "nome": nomes[k]} for k in casos],
            "crescimento": crescimento(mod, casos),
            "eixo": "m (casas da tabela), com n = α·m",
            "refs": ["m"],
            "crescimento_dados": f"média de {len(SEMENTES)} sorteios de chaves por tamanho",
            "alfa": alfas(mod, amax, passo),
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(mod.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(pasta, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"{tipo}: {ch} → {r['sondagens']} = {r['ops']} sondagens, pico {r['pico']}, M={dados['ciclomatica']['M']}")
    for p in dados["tempo"]["alfa"]["pontos"]:
        print(f"  α={p['alfa']:.2f}  média {p['media']:7.3f} (fórmula {p['formula_media']:7.3f}, {100 * (p['media'] / p['formula_media'] - 1):+5.1f}%)"
              f"  última {p['ultima']:8.3f} (fórmula {p['formula_ultima']:8.3f}, {100 * (p['ultima'] / p['formula_ultima'] - 1):+5.1f}%)")
    return dados
