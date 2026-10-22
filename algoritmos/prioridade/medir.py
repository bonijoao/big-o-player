"""Mede o pronto-socorro e grava dados.json. Rodar: python3 algoritmos/prioridade/medir.py

O tempo conta as casas lidas e escritas no heap (o custo do instrumento), e
não as operações: cada inserir e cada tirar custa até a altura do heap, e é
isso que faz o log n aparecer na conta do dia."""
import json
import os
import random
import statistics
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import prioridade  # noqa: E402

N_VIDEO, SEMENTE_VIDEO, MOVIMENTO_VIDEO = 24, 11, "lotado"
TAMANHOS = [16, 32, 64, 128, 256, 512, 1024]
SEMENTES = range(1, 11)
DISTRIBUICAO = range(1, 201)
CASOS = list(prioridade.MOVIMENTOS)
NOMES = {"calmo": "calmo", "no_limite": "no limite", "lotado": "lotado"}


def rodar(chegada, duracao, gravidade):
    c = Contador()
    c.gravar = True   # a espera e a ordem de atendimento saem dos eventos "atende"
    soma, maior = prioridade.atender(chegada, duracao, gravidade, c)
    esperas, ordem = [None] * len(chegada), []
    for e in c.eventos:
        if e[0] == "atende":
            esperas[e[1]] = e[2] - chegada[e[1]]
            ordem.append(e[1])
    assert sum(esperas) == soma
    return {"soma": soma, "maior": maior, "esperas": esperas, "ordem": ordem, "pico": c.pico,
            "ops": c.ops.get("leituras", 0) + c.ops.get("escritas", 0),
            "operacoes": c.ops.get("inserir", 0) + c.ops.get("tirar", 0)}, c


def por_gravidade(esperas, gravidade):
    """A espera média de cada gravidade (None se ninguém daquela gravidade chegou)."""
    g0, g1 = prioridade.GRAVIDADES
    medias = []
    for g in range(g0, g1 + 1):
        w = [e for e, gg in zip(esperas, gravidade) if gg == g]
        medias.append(statistics.mean(w) if w else None)
    return medias


def varios(n, mov):
    rs = [rodar(*prioridade.sortear(n, mov, random.Random(s)))[0] for s in SEMENTES]
    ops = [r["ops"] for r in rs]
    return {"media": statistics.mean(ops), "min": min(ops), "max": max(ops), "pico": max(r["pico"] for r in rs),
            "operacoes": statistics.mean(r["operacoes"] for r in rs), "espera": statistics.mean(r["soma"] / n for r in rs)}


if __name__ == "__main__":
    chegada, duracao, gravidade = prioridade.sortear(N_VIDEO, MOVIMENTO_VIDEO, random.Random(SEMENTE_VIDEO))
    r, c = rodar(chegada, duracao, gravidade)

    crescimento = [{"n": n, **{m: varios(n, m) for m in CASOS}} for n in TAMANHOS]
    dist = [rodar(*prioridade.sortear(N_VIDEO, MOVIMENTO_VIDEO, random.Random(s)))[0]["maior"] for s in DISTRIBUICAO]

    conferir = []
    for s in range(1, 6):
        for m in CASOS:
            ch, du, gr = prioridade.sortear(50, m, random.Random(s))
            rr = rodar(ch, du, gr)[0]
            conferir.append({"movimento": m, "chegada": ch, "duracao": du, "gravidade": gr, **rr})

    (c0, c1), (a0, a1) = prioridade.MOVIMENTOS[MOVIMENTO_VIDEO]
    g0, g1 = prioridade.GRAVIDADES
    dados = {
        "exemplo": {
            "dados": (f"{N_VIDEO} pacientes sorteados com a semente {SEMENTE_VIDEO}: um chega a cada {c0} a {c1} minutos, "
                      f"é atendido em {a0} a {a1} minutos e tem gravidade de {g0} (a mais urgente) a {g1}"),
            "n": N_VIDEO, "semente": SEMENTE_VIDEO, "caso": MOVIMENTO_VIDEO,
            "chegada": chegada, "duracao": duracao, "gravidade": gravidade,
            "movimentos": {m: {"chegada": list(v[0]), "atendimento": list(v[1])} for m, v in prioridade.MOVIMENTOS.items()},
            "gravidades": [g0, g1],
            "soma": r["soma"], "maior": r["maior"], "esperas": r["esperas"], "ordem": r["ordem"],
            "por_gravidade": por_gravidade(r["esperas"], gravidade),
            "ops": r["ops"], "operacoes": r["operacoes"], "eventos": c.eventos,
        },
        "tempo": {
            "unidade": "acessos ao heap",
            "tipo": "prioridade",
            "series": [{"caso": m, "nome": NOMES[m] + " (média)"} for m in CASOS],
            "banda": "no_limite",
            "crescimento": crescimento,
            "eixo": "n (pacientes; dobra a cada passo)",
            "refs": ["n log₂ n"],
            "crescimento_dados": f"média de {len(SEMENTES)} sorteios de pacientes por tamanho",
            "distribuicao": {"n": N_VIDEO, "vezes": len(dist), "valores": dist, "destaque": r["maior"]},
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(prioridade.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"prioridade: {MOVIMENTO_VIDEO} n={N_VIDEO} → espera total {r['soma']}, maior fila {r['maior']}, "
          f"{r['ops']} acessos ao heap em {r['operacoes']} operações, pico {c.pico}, M={dados['ciclomatica']['M']}, "
          f"por gravidade {dados['exemplo']['por_gravidade']}")
    for g in crescimento:
        print(f"  n={g['n']:5d} " + "  ".join(f"{m} {g[m]['media']:.0f} acessos/{g[m]['operacoes']:.0f} ops/pico {g[m]['pico']}" for m in CASOS))
    print(f"  {len(dist)} sorteios n={N_VIDEO}: maior fila de {min(dist)} a {max(dist)}")
