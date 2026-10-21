"""Molde comum dos instrumentos (estruturas de dados): o custo medido de cada operação.

Cada instrumento declara, no seu medir.py:
  ESTRUTURAS  {variante: classe}; a classe recebe um Contador
  ENCHER      a operação que põe um valor (monta a estrutura com 0, 1, …, n − 1)
  OPERACOES   [{id, estrutura, chamada, args(n) → lista, minimo, seguidas?}]
              seguidas = "media" ou "pior": n chamadas a partir da estrutura vazia
  sortear     sortear(r, variante, n) → (chamada, args): sequências para conferir

Custo = leituras + escritas de casas (instrumentos/vetor/vetor.py). Para cada
operação, guarda a chamada exata (com os argumentos) e o que ela custou, para
o JavaScript refazer igual (testes/conferir_js.mjs). Nada aqui é estimado.
"""
import json
import os
import random

from conta import Contador

TAMANHOS = [10, 100, 1000]   # a tabela da página (fora das potências de 2: o vetor montado tem folga)
SERIE = range(0, 61)         # o gráfico custo × n (termina fora de uma potência de 2)
CONFERIR = range(1, 6)       # sementes das sequências sorteadas
PASSOS = 80                  # operações por sequência


def montar(classe, encher, n):
    conta = Contador()
    e = classe(conta)
    for i in range(n):
        getattr(e, encher)(i)
    conta.ops.clear()
    return e, conta


def custo(conta):
    return {"leituras": conta.ops.get("leituras", 0), "escritas": conta.ops.get("escritas", 0)}


def uma(classe, encher, op, n):
    """Monta com n valores e roda a operação uma vez."""
    e, conta = montar(classe, encher, n)
    args = op["args"](n)
    getattr(e, op["chamada"])(*args)
    return {"n": n, "args": args, **custo(conta)}


def seguidas(classe, op, n):
    """n chamadas seguidas a partir da estrutura vazia: o total (média = total ÷ n,
    o custo amortizado) ou a mais cara delas (pior, com a posição k, de 1 a n)."""
    e, conta = montar(classe, op["chamada"], 0)
    pior = None
    for i in range(n):
        conta_antes = custo(conta)
        getattr(e, op["chamada"])(i)
        agora = custo(conta)
        uma_vez = {c: agora[c] - conta_antes[c] for c in agora}
        if pior is None or sum(uma_vez.values()) > pior["leituras"] + pior["escritas"]:
            pior = {"k": i + 1, **uma_vez}
    if op["seguidas"] == "pior":
        return {"n": n, **pior}
    return {"n": n, "vezes": n, **custo(conta)}


def medir(ESTRUTURAS, ENCHER, OPERACOES, sortear, pasta):
    operacoes = {}
    for op in OPERACOES:
        classe = ESTRUTURAS[op["estrutura"]]
        minimo = op.get("minimo", 0)
        if op.get("seguidas"):
            tabela = [seguidas(classe, op, n) for n in TAMANHOS]
            serie = [seguidas(classe, op, n) for n in SERIE if n >= 1] if op["seguidas"] == "media" else []
        else:
            tabela = [uma(classe, ENCHER, op, n) for n in TAMANHOS]
            serie = [uma(classe, ENCHER, op, n) for n in SERIE if n >= minimo]
        operacoes[op["id"]] = {"estrutura": op["estrutura"], "chamada": op["chamada"],
                               "seguidas": op.get("seguidas"), "tabela": tabela, "serie": serie}

    capacidade = {v: [{"n": n, "casas": montar(c, ENCHER, n)[0].capacidade} for n in SERIE]
                  for v, c in ESTRUTURAS.items()}

    conferir = []
    for v, classe in ESTRUTURAS.items():
        for s in CONFERIR:
            r = random.Random(s)
            e, conta = montar(classe, ENCHER, 0)
            passos = []
            for _ in range(PASSOS):
                chamada, args = sortear(r, v, e.n)
                conta.ops.clear()
                volta = getattr(e, chamada)(*args)
                passos.append({"chamada": chamada, "args": args, "volta": volta, **custo(conta)})
            conferir.append({"estrutura": v, "semente": s, "passos": passos,
                             "valores": e.valores(), "casas": e.capacidade})

    dados = {"encher": ENCHER, "tamanhos": TAMANHOS, "operacoes": operacoes,
             "capacidade": capacidade, "conferir": conferir}
    with open(os.path.join(pasta, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)

    print(f"{os.path.basename(pasta)}:")
    for i, o in operacoes.items():
        cel = []
        for t in o["tabela"]:
            total = t["leituras"] + t["escritas"]
            cel.append(f"n={t['n']}: {total / t['vezes']:.3f}" if o["seguidas"] == "media" else f"n={t['n']}: {total}")
        print(f"  {i:24s} {'  '.join(cel)}")
    return dados
