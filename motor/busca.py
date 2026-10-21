"""Molde comum das buscas: o ajudante que conta e a medição padrão.

Toda comparação de uma casa com o alvo passa por `igual()` ou `menor()`:
cada uma conta 1. O vetor guarda os números pares 0, 2, …, 2(n − 1), então
qualquer ímpar é um alvo ausente que cai entre dois números.

Cada busca é um módulo com:
  buscar(v, alvo, conta)  devolve a posição (base 0) ou −1
  MEDIDA                  a função cuja complexidade ciclomática é medida
  ORDENADO                se a busca precisa do vetor ordenado
"""
import json
import os
import random
import statistics
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from conta import Contador
from ciclomatica import medir as ciclomatica

N_VIDEO = 24
SEMENTE_VIDEO = 11
TAMANHOS = [16, 32, 64, 128, 256, 512, 1024]
CONFERIR = range(1, 6)            # vetores de 50 números que o R refaz
CASOS = ["comeco", "fim", "ausente", "sorteado"]
NOMES = {"comeco": "no começo", "fim": "no fim", "ausente": "ausente", "sorteado": "sorteado"}


# ---------- ajudantes usados dentro das buscas ----------

def igual(v, i, alvo, conta):
    conta.op("comparacoes")
    conta.evento("compara", i, "=")
    return v[i] == alvo


def menor(v, i, alvo, conta):
    conta.op("comparacoes")
    conta.evento("compara", i, "<")
    return v[i] < alvo


# ---------- entradas ----------

def vetor(n, semente, ordenado):
    v = [2 * k for k in range(n)]
    if not ordenado:
        random.Random(semente).shuffle(v)
    return v


def alvo(v, caso, r):
    """O alvo de cada caso: o primeiro do vetor, o último, um ímpar que não
    está nele (sorteado entre −1 e 2n − 1) ou um número sorteado do vetor."""
    if caso == "comeco":
        return v[0]
    if caso == "fim":
        return v[-1]
    if caso == "ausente":
        return 2 * r.randrange(len(v) + 1) - 1
    return v[r.randrange(len(v))]


def rodar(modulo, v, x, gravar=False):
    conta = Contador()
    conta.gravar = gravar
    pos = modulo.buscar(v, x, conta)
    certo = v.index(x) if x in v else -1
    if pos != certo:
        raise AssertionError(f"{modulo.__name__}: achou {pos}, devia {certo}")
    return pos, conta


def _ops(modulo, v, x):
    return rodar(modulo, v, x)[1].ops.get("comparacoes", 0)


def medir(modulo, pasta):
    ordenado = modulo.ORDENADO
    v = vetor(N_VIDEO, SEMENTE_VIDEO, ordenado)
    x = alvo(v, "sorteado", random.Random(SEMENTE_VIDEO))
    pos, c = rodar(modulo, v, x, gravar=True)

    crescimento = []
    for n in TAMANHOS:
        w = vetor(n, 1, ordenado)
        presentes = [_ops(modulo, w, y) for y in w]                    # todos os alvos possíveis
        ausentes = [_ops(modulo, w, 2 * k - 1) for k in range(n + 1)]  # todos os buracos
        crescimento.append({
            "n": n,
            "sorteado": {"media": statistics.mean(presentes), "min": min(presentes), "max": max(presentes)},
            "ausente": {"media": statistics.mean(ausentes), "min": min(ausentes), "max": max(ausentes)},
            "comeco": {"ops": _ops(modulo, w, w[0])},
            "fim": {"ops": _ops(modulo, w, w[-1])},
        })

    dist = [_ops(modulo, v, y) for y in v]

    conferir = []
    for s in CONFERIR:
        w = vetor(50, s, ordenado)
        r = random.Random(s)
        for caso in CASOS:
            y = alvo(w, caso, r)
            p, cc = rodar(modulo, w, y)
            conferir.append({"vetor": w, "alvo": y, "caso": caso, "posicao": p, "comparacoes": cc.ops.get("comparacoes", 0)})

    dados = {
        "exemplo": {
            "dados": (f"{N_VIDEO} números pares (de 0 a {2 * (N_VIDEO - 1)}) "
                      + ("em ordem" if ordenado else f"embaralhados com a semente {SEMENTE_VIDEO}")
                      + f", procurando o {x}"),
            "n": N_VIDEO, "semente": SEMENTE_VIDEO, "vetor": v, "alvo": x, "posicao": pos,
            "ops": c.ops.get("comparacoes", 0), "eventos": c.eventos,
        },
        "tempo": {
            "unidade": "comparações",
            "tipo": "busca",
            "series": [{"caso": k, "nome": NOMES[k] + (" (média)" if k in ("sorteado", "ausente") else "")} for k in CASOS],
            "banda": "sorteado",
            "crescimento": crescimento,
            "eixo": "n (números; dobra a cada passo)",
            "refs": ["n", "log₂ n"],
            "crescimento_dados": "sorteado e ausente: média de todos os alvos possíveis (todos os números do vetor, todos os buracos entre eles)",
            "distribuicao": {"n": N_VIDEO, "vezes": len(dist), "valores": dist, "destaque": c.ops.get("comparacoes", 0)},
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(modulo.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(pasta, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"{modulo.__name__}: vídeo n={N_VIDEO}, alvo {x} na posição {pos} → {dados['exemplo']['ops']} comparações, "
          f"M={dados['ciclomatica']['M']}")
    for g in crescimento:
        print(f"  n={g['n']:5d} sorteado {g['sorteado']['media']:8.2f} [{g['sorteado']['min']}–{g['sorteado']['max']}]  "
              f"ausente {g['ausente']['media']:8.2f} [{g['ausente']['min']}–{g['ausente']['max']}]  "
              f"começo {g['comeco']['ops']}  fim {g['fim']['ops']}")
    return dados
