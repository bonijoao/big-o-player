"""Mede a fila de atendimento e grava dados.json. Rodar: python3 algoritmos/atendimento/medir.py"""
import json
import os
import random
import statistics
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import atendimento  # noqa: E402

N_VIDEO, SEMENTE_VIDEO, MOVIMENTO_VIDEO = 24, 11, "no_limite"
TAMANHOS = [16, 32, 64, 128, 256, 512, 1024]
SEMENTES = range(1, 11)
DISTRIBUICAO = range(1, 201)
CASOS = list(atendimento.MOVIMENTOS)
NOMES = {"calmo": "calmo", "no_limite": "no limite", "lotado": "lotado"}


def rodar(chegada, duracao):
    c = Contador()
    c.gravar = True   # a espera de cada cliente sai dos eventos "atende"
    soma, maior = atendimento.atender(chegada, duracao, c)
    esperas = [None] * len(chegada)
    for e in c.eventos:
        if e[0] == "atende":
            esperas[e[1]] = e[2] - chegada[e[1]]
    assert sum(esperas) == soma
    return {"soma": soma, "maior": maior, "esperas": esperas, "pico": c.pico,
            "ops": c.ops.get("enfileirar", 0) + c.ops.get("desenfileirar", 0),
            "casas": c.ops.get("leituras", 0) + c.ops.get("escritas", 0)}, c


def varios(n, mov):
    rs = [rodar(*atendimento.sortear(n, mov, random.Random(s)))[0] for s in SEMENTES]
    ops = [r["ops"] for r in rs]
    return {"media": statistics.mean(ops), "min": min(ops), "max": max(ops), "pico": max(r["pico"] for r in rs),
            "espera": statistics.mean(r["soma"] / n for r in rs)}


if __name__ == "__main__":
    chegada, duracao = atendimento.sortear(N_VIDEO, MOVIMENTO_VIDEO, random.Random(SEMENTE_VIDEO))
    r, c = rodar(chegada, duracao)

    crescimento = [{"n": n, **{m: varios(n, m) for m in CASOS}} for n in TAMANHOS]
    dist = [rodar(*atendimento.sortear(N_VIDEO, MOVIMENTO_VIDEO, random.Random(s)))[0]["maior"] for s in DISTRIBUICAO]

    conferir = []
    for s in range(1, 6):
        for m in CASOS:
            ch, du = atendimento.sortear(50, m, random.Random(s))
            rr = rodar(ch, du)[0]
            conferir.append({"movimento": m, "chegada": ch, "duracao": du, **rr})

    (c0, c1), (a0, a1) = atendimento.MOVIMENTOS[MOVIMENTO_VIDEO]
    dados = {
        "exemplo": {
            "dados": (f"{N_VIDEO} clientes sorteados com a semente {SEMENTE_VIDEO}: um chega a cada {c0} a {c1} minutos "
                      f"e é atendido em {a0} a {a1} minutos"),
            "n": N_VIDEO, "semente": SEMENTE_VIDEO, "caso": MOVIMENTO_VIDEO, "chegada": chegada, "duracao": duracao,
            "movimentos": {m: {"chegada": list(v[0]), "atendimento": list(v[1])} for m, v in atendimento.MOVIMENTOS.items()},
            "soma": r["soma"], "maior": r["maior"], "esperas": r["esperas"],
            "ops": r["ops"], "casas": r["casas"], "eventos": c.eventos,
        },
        "tempo": {
            "unidade": "operações na fila",
            "tipo": "atendimento",
            "series": [{"caso": m, "nome": NOMES[m] + " (média)"} for m in CASOS],
            "banda": "no_limite",
            "crescimento": crescimento,
            "eixo": "n (clientes; dobra a cada passo)",
            "refs": ["2n"],
            "crescimento_dados": f"média de {len(SEMENTES)} sorteios de clientes por tamanho",
            "distribuicao": {"n": N_VIDEO, "vezes": len(dist), "valores": dist, "destaque": r["maior"]},
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(atendimento.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"atendimento: {MOVIMENTO_VIDEO} n={N_VIDEO} → espera total {r['soma']}, maior fila {r['maior']}, "
          f"{r['ops']} operações, pico {c.pico}, M={dados['ciclomatica']['M']}")
    for g in crescimento:
        print(f"  n={g['n']:5d} " + "  ".join(f"{m} {g[m]['media']:.1f} ops/pico {g[m]['pico']}/espera {g[m]['espera']:.1f}" for m in CASOS))
    print(f"  {len(dist)} sorteios n={N_VIDEO}: maior fila de {min(dist)} a {max(dist)}")
