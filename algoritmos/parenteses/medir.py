"""Mede os parênteses balanceados e grava dados.json. Rodar: python3 algoritmos/parenteses/medir.py"""
import json
import os
import random
import statistics
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import parenteses  # noqa: E402

N_VIDEO, SEMENTE_VIDEO = 24, 11
TAMANHOS = [16, 32, 64, 128, 256, 512, 1024]
SEMENTES = range(1, 11)
DISTRIBUICAO = range(1, 201)
CASOS = ["balanceada", "par_errado", "sobra_aberto", "so_abre"]
NOMES = {"balanceada": "balanceada", "par_errado": "um par errado", "sobra_aberto": "sobra aberto", "so_abre": "só abre"}


def rodar(texto, gravar=False):
    c = Contador()
    c.gravar = gravar
    certo = parenteses.balanceado(texto, c)
    return certo, c


def resumo(c):
    return {"ops": c.ops.get("empilhar", 0) + c.ops.get("desempilhar", 0), "pico": c.pico,
            "comparacoes": c.ops.get("comparacoes", 0),
            "casas": c.ops.get("leituras", 0) + c.ops.get("escritas", 0)}


def varios(n, caso, sementes):
    rs = [resumo(rodar(parenteses.gerar(n, caso, random.Random(s)))[1]) for s in sementes]
    ops = [r["ops"] for r in rs]
    return {"media": statistics.mean(ops), "min": min(ops), "max": max(ops), "pico": max(r["pico"] for r in rs)}


if __name__ == "__main__":
    texto = parenteses.gerar(N_VIDEO, "balanceada", random.Random(SEMENTE_VIDEO))
    certo, c = rodar(texto, gravar=True)
    r = resumo(c)

    crescimento = [{"n": n, **{k: varios(n, k, SEMENTES if k != "so_abre" else [1]) for k in CASOS}} for n in TAMANHOS]
    dist = [rodar(parenteses.gerar(N_VIDEO, "balanceada", random.Random(s)))[1].pico for s in DISTRIBUICAO]

    conferir = []
    for s in range(1, 6):
        for caso in CASOS + ["fecha_sem_abrir"]:
            t = parenteses.gerar(50, caso, random.Random(s))
            ok, cc = rodar(t)
            conferir.append({"texto": t, "caso": caso, "certo": ok, **resumo(cc)})

    dados = {
        "exemplo": {
            "dados": f"um texto balanceado de {N_VIDEO} símbolos, sorteado com a semente {SEMENTE_VIDEO}",
            "n": N_VIDEO, "semente": SEMENTE_VIDEO, "caso": "balanceada", "texto": texto, "certo": certo,
            "ops": r["ops"], "comparacoes": r["comparacoes"], "casas": r["casas"], "eventos": c.eventos,
        },
        "tempo": {
            "unidade": "operações na pilha",
            "tipo": "parenteses",
            "series": [{"caso": k, "nome": NOMES[k] + (" (média)" if k != "so_abre" else "")} for k in CASOS],
            "banda": "balanceada",
            "crescimento": crescimento,
            "eixo": "n (símbolos; dobra a cada passo)",
            "refs": ["n"],
            "crescimento_dados": f"média de {len(SEMENTES)} textos sorteados por tamanho (só abre: um texto)",
            "distribuicao": {"n": N_VIDEO, "vezes": len(dist), "valores": dist, "medida": "pico"},
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(parenteses.MEDIDA),
        "conferir": conferir,
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"parenteses: {texto} → {certo}, {r}, M={dados['ciclomatica']['M']}")
    for g in crescimento:
        print(f"  n={g['n']:5d} " + "  ".join(f"{k} {g[k]['media']:.1f}/pico {g[k]['pico']}" for k in CASOS))
    print(f"  {len(dist)} textos n={N_VIDEO}: pilha de {min(dist)} a {max(dist)}")
