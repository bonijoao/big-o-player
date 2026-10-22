"""Medição comum dos três Fibonacci (recursivo, com memória e iterativo).

As três faixas medem os mesmos n, na mesma unidade (somas), e cada dados.json
guarda as três séries: o gráfico de tempo de cada uma traz as outras duas
por trás. Cada faixa é um módulo com rodar(n, conta) e MEDIDA.
"""
import json
import os
import sys

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402

N_VIDEO = 10
TAMANHOS = [5, 10, 15, 20, 25, 30]
VERSOES = ["recursivo", "memoria", "iterativo"]
PASTAS = {"recursivo": "fibrecursivo", "memoria": "fibmemoria", "iterativo": "fibiterativo"}
NOMES = {"recursivo": "recursivo", "memoria": "com memória", "iterativo": "iterativo"}


def modulo(versao):
    pasta = os.path.join(RAIZ, "algoritmos", PASTAS[versao])
    if pasta not in sys.path:
        sys.path.insert(0, pasta)
    return __import__(PASTAS[versao])


def certo(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a


def rodar(versao, n, gravar=False):
    c = Contador()
    c.gravar = gravar
    f = modulo(versao).rodar(n, c)
    assert f == certo(n), (versao, n, f)
    chamadas = sum(1 for e in c.eventos if e[0] == "entra") if gravar else None
    return {"fib": f, "ops": c.ops.get("somas", 0), "pico": c.pico,
            "casas": c.ops.get("leituras", 0) + c.ops.get("escritas", 0)}, c


def medir(versao, pasta):
    r, c = rodar(versao, N_VIDEO, gravar=True)
    chamadas = sum(1 for e in c.eventos if e[0] == "entra")
    crescimento = [{"n": n, **{v: {k: x for k, x in rodar(v, n)[0].items() if k in ("ops", "pico")} for v in VERSOES}} for n in TAMANHOS]
    conferir = [{"n": n, **rodar(versao, n)[0]} for n in range(0, 21)]
    series = [{"caso": v, "nome": NOMES[v], **({} if v == versao else {"fundo": True})} for v in VERSOES]
    dados = {
        "exemplo": {"dados": f"n = {N_VIDEO}", "n": N_VIDEO, **r, "chamadas": chamadas, "eventos": c.eventos},
        "tempo": {
            "unidade": "somas",
            "tipo": f"fib_{versao}",
            "versao": versao,
            "series": series,
            "crescimento": crescimento,
            "eixo": "n",
            "refs": [],
            "crescimento_dados": "uma chamada por n: as contas só dependem de n",
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(modulo(versao).MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(pasta, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"fibonacci {versao}: fib({N_VIDEO}) = {r['fib']}, {r['ops']} somas, {chamadas} chamadas, {r['casas']} casas, pico {r['pico']} {c.pico_detalhe}, M={dados['ciclomatica']['M']}")
    for g in crescimento:
        print(f"  n={g['n']:3d} " + "  ".join(f"{v} {g[v]['ops']} somas/pico {g[v]['pico']}" for v in VERSOES))
    return dados
