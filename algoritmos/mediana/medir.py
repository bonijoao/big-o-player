"""Mede a mediana por quickselect e grava dados.json.

Nada na página é digitado à mão: tudo sai daqui.
Rodar da raiz do projeto: python3 algoritmos/mediana/medir.py
"""
import csv
import json
import os
import random
import statistics
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import mediana  # noqa: E402

TAMANHOS = [16, 32, 64, 128, 256, 512, 1024]
SEMENTES = range(1, 11)          # 10 vetores embaralhados por tamanho
DISTRIBUICAO = range(1, 201)     # 200 embaralhamentos do próprio trees
CASOS = ["aleatorio", "ordenado", "invertido"]
NOMES = {"aleatorio": "aleatória (média)", "ordenado": "já ordenada", "invertido": "invertida"}


def trees():
    with open(os.path.join(AQUI, "trees.csv")) as f:
        return [float(l["volume"]) for l in csv.DictReader(f)]


def rodar(v, gravar=False):
    c = Contador()
    c.gravar = gravar
    w = list(v)
    m = mediana.mediana(w, c)
    if m != statistics.median(v):
        raise AssertionError(f"mediana {m}, devia {statistics.median(v)}")
    return {"mediana": m, "comparacoes": c.ops.get("comparacoes", 0), "trocas": c.ops.get("trocas", 0), "pico": c.pico}, c


def embaralhado(v, semente):
    w = list(v)
    random.Random(semente).shuffle(w)
    return w


def entrada(n, caso, semente=1):
    if caso == "ordenado":
        return list(range(n))
    if caso == "invertido":
        return list(range(n - 1, -1, -1))
    return embaralhado(range(n), semente)


if __name__ == "__main__":
    x = trees()
    r, c = rodar(x, gravar=True)
    n = len(x)

    crescimento = []
    for tam in TAMANHOS:
        alea = [rodar(entrada(tam, "aleatorio", s))[0] for s in SEMENTES]
        comps = [a["comparacoes"] for a in alea]
        crescimento.append({
            "n": tam,
            "aleatorio": {"media": statistics.mean(comps), "min": min(comps), "max": max(comps), "pico": max(a["pico"] for a in alea)},
            **{caso: (lambda q: {"ops": q["comparacoes"], "pico": q["pico"]})(rodar(entrada(tam, caso))[0]) for caso in ("ordenado", "invertido")},
        })

    dist = [rodar(embaralhado(x, s))[0]["comparacoes"] for s in DISTRIBUICAO]

    # o que o R refaz: o próprio trees, embaralhamentos dele, n par e ímpar, empates, ordenado e invertido
    conferir = [{"caso": "trees", "vetor": x}]
    conferir += [{"caso": f"trees embaralhado {s}", "vetor": embaralhado(x, s)} for s in range(1, 4)]
    for s in range(1, 5):
        rr = random.Random(s)
        tam = 49 + s % 2                                   # 50 e 49: n par e ímpar
        conferir.append({"caso": f"inteiros com empates {s}", "vetor": [rr.randint(0, 20) for _ in range(tam)]})
    conferir += [{"caso": caso, "vetor": entrada(tam, caso)} for caso in ("ordenado", "invertido") for tam in (49, 50)]
    for q in conferir:
        q.update(rodar(q["vetor"])[0])

    dados = {
        "exemplo": {
            "dados": "trees (R), volume de 31 cerejeiras-pretas, pés³, na ordem do R",
            "n": n, "k": (n - 1) // 2 + 1, "vetor": x, "mediana": r["mediana"], "media": statistics.fmean(x),
            "ops": r["comparacoes"], "trocas": r["trocas"], "eventos": c.eventos,
        },
        "tempo": {
            "unidade": "comparações",
            "tipo": "mediana",
            "series": [{"caso": k, "nome": NOMES[k]} for k in CASOS],
            "banda": "aleatorio",
            "crescimento": crescimento,
            "eixo": "n (números; dobra a cada passo)",
            "refs": ["n²/2", "n"],
            "crescimento_dados": f"aleatória: média de {len(SEMENTES)} vetores embaralhados por tamanho; já ordenada e invertida: um vetor cada",
            "distribuicao": {"n": n, "vezes": len(dist), "valores": dist, "destaque": r["comparacoes"]},
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(mediana.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"mediana: trees n={n} → {r['mediana']} com {r['comparacoes']} comparações, {r['trocas']} trocas, "
          f"pico {c.pico}, M={dados['ciclomatica']['M']}")
    for g in crescimento:
        a = g["aleatorio"]
        print(f"  n={g['n']:5d} aleatória {a['media']:9.1f} [{a['min']}–{a['max']}]  "
              f"ordenada {g['ordenado']['ops']:7d}  invertida {g['invertido']['ops']:7d}")
    print(f"  {len(dist)} embaralhamentos do trees: {min(dist)} a {max(dist)} comparações (média {statistics.mean(dist):.1f})")
