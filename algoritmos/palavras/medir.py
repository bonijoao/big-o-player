"""Mede a contagem de palavras e grava dados.json. Rodar: python3 algoritmos/palavras/medir.py"""
import json
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [AQUI, os.path.join(AQUI, "..", "..", "motor")]

from conta import Contador  # noqa: E402
from ciclomatica import medir as ciclomatica  # noqa: E402
import palavras  # noqa: E402

TAMANHOS = [500, 1000, 2000, 4000, 8000, 16000, 32000, 64000]   # palavras do começo do Dom Casmurro
COMECOS = [20, 40, 60, 80]                                       # o começo da Canção, no palco


def rodar(p):
    c = Contador()
    d = palavras.contar(p, c)
    contagens = sorted(d.valores(), key=lambda pc: (-pc[1], pc[0]))
    return {"n": len(p), "d": d.n, "m": d.m, "ops": c.ops.get("leituras", 0) + c.ops.get("escritas", 0),
            "comparacoes": c.ops.get("comparacoes", 0), "pico": c.pico, "contagens": contagens}, c


if __name__ == "__main__":
    cancao = palavras.palavras_de(palavras.ler_texto("cancao-do-exilio.txt"))
    casmurro = palavras.palavras_de(palavras.ler_texto("dom-casmurro.txt"))
    r, c = rodar(cancao)

    crescimento = []
    for n in TAMANHOS + [len(casmurro)]:
        g = rodar(casmurro[:n])[0]
        crescimento.append({"n": n, "casmurro": {"media": g["ops"], "min": g["ops"], "max": g["ops"], "pico": g["pico"], "d": g["d"], "m": g["m"]}})

    # para o JS refazer igual e para o R conferir com table()
    conferir = [{"texto": "cancao", "palavras": cancao, **r}]
    for n in COMECOS:
        conferir.append({"texto": f"cancao[:{n}]", "palavras": cancao[:n], **rodar(cancao[:n])[0]})
    for n in [1, 2, 1000]:
        conferir.append({"texto": f"casmurro[:{n}]", "palavras": casmurro[:n], **rodar(casmurro[:n])[0]})
    inteiro = rodar(casmurro)[0]

    dados = {
        "exemplo": {
            "dados": f"a Canção do Exílio, de Gonçalves Dias ({len(cancao)} palavras)",
            "n": len(cancao), "palavras": cancao, "comecos": COMECOS, **{k: x for k, x in r.items() if k != "n"},
        },
        "tempo": {
            "unidade": "casas lidas e escritas",
            "tipo": "palavras",
            "series": [{"caso": "casmurro", "nome": "Dom Casmurro"}],
            "crescimento": crescimento,
            "eixo": "n (palavras; dobra a cada passo)",
            "refs": ["n"],
            "refs_memoria": ["2n"],
            "crescimento_dados": "um trecho por tamanho, sempre do começo do livro; o último é o livro inteiro",
        },
        "memoria": {"pico": c.pico, "detalhe": c.pico_detalhe},
        "ciclomatica": ciclomatica(palavras.MEDIDA),
        "conferir": conferir,
        "casmurro": {"n": inteiro["n"], "d": inteiro["d"], "contagens": inteiro["contagens"]},
    }
    with open(os.path.join(AQUI, "dados.json"), "w") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"palavras: Canção {r['n']} palavras, {r['d']} distintas, m = {r['m']}, {r['ops']} casas, pico {r['pico']}, M={dados['ciclomatica']['M']}")
    print("  mais frequentes:", r["contagens"][:8])
    for g in crescimento:
        x = g["casmurro"]
        print(f"  n={g['n']:6d}  casas {x['media']:7d} ({x['media'] / g['n']:.2f} por palavra)  d={x['d']:5d}  m={x['m']}")
