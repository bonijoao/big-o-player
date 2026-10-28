"""Junta ficha.json (texto) + dados.json (medido) + conferencia.json de cada
algoritmo, ficha.json + dados.json de cada estrutura (instrumentos/), as playlists e as duas playlists
de vídeo (conceitos e fundamentos) em dados.js, que a página carrega (funciona abrindo o arquivo direto,
sem servidor).

  python3 gerar.py            mede os instrumentos e junta
  python3 gerar.py --tudo     antes mede os algoritmos, confere no R e gera os pôsteres
Recusa ficha de faixa que credita uma estrutura que não existe, e playlist que esquece ou inventa faixa. Sempre, no fim: confere que o JavaScript do site conta igual ao Python.
"""
import json
import os
import subprocess
import sys

RAIZ = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(RAIZ, "motor"))
import pseudocodigo  # noqa: E402
ALGORITMOS = ["maximo", "multiplicacao", "fatorial", "fibrecursivo", "fibmemoria", "fibiterativo", "padrao",
              "sequencial", "binaria", "bolha", "insercao", "selecao", "intercalacao", "rapida", "heapsort",
              "parenteses", "atendimento", "inverter", "janela", "percursos", "abb", "avl", "prioridade", "largura", "profundidade", "dijkstra",
              "palavras", "repetidos", "encadeamento", "sondagem", "welford", "mediana", "histograma", "kmeans"]   # a ordem das medições; a das faixas vem do playlists.json
INSTRUMENTOS = ["vetor", "matriz", "texto", "pilha", "fila", "deque", "lista", "grafo", "arvore", "heap", "dicionario"]
# texto da ciclomática, o mesmo para todos (uma ficha pode sobrescrever)
CICLOMATICA = {
 "porque": "Cada for, while e if, e cada and/or numa condição, abre um caminho a mais pelo código. A complexidade ciclomática conta os caminhos independentes: qualquer percurso pela função é uma combinação deles. É um teto para quantos testes cobrem todos os ramos, não o mínimo.",
 "regra": "Regra de contagem: +1 por for, while, if, if-expressão, except e cada and/or. Compreensões de lista são proibidas na função medida, porque escondem um laço que o grafo não veria."
}
PESADOS = {"especies", "fotos", "final", "eventos"}   # só o vídeo usa; vetor e pontos alimentam a simulação


def ler(pasta, nome):
    caminho = os.path.join(pasta, nome)
    if not os.path.exists(caminho):
        return None
    with open(caminho) as f:
        return json.load(f)


def entrada(nome):
    pasta = os.path.join(RAIZ, "algoritmos", nome)
    ficha, dados = ler(pasta, "ficha.json"), ler(pasta, "dados.json")
    if not ficha.get("objetivo"):
        raise SystemExit(f"{nome}: a ficha precisa de \"objetivo\", a frase que diz o que a faixa resolve")
    ex = dados["exemplo"]
    pseudo = None
    if "pseudocodigo" in ficha:
        lido = pseudocodigo.ler(ficha["pseudocodigo"])
        m = pseudocodigo.medir(lido)
        if m["M"] != dados["ciclomatica"]["M"]:
            raise SystemExit(f"{nome}: o fluxograma do pseudocódigo dá M = {m['M']}, "
                             f"o código dá M = {dados['ciclomatica']['M']}; os dois precisam ter os mesmos ramos")
        pseudo = {**lido, **m}
    return {
        "ciclomatica": CICLOMATICA,
        "alg": nome,
        **{c: x for c, x in ficha.items() if c != "pseudocodigo"},
        "poster": f"algoritmos/{nome}/{nome}.png",
        "exemplo": {c: x for c, x in ex.items() if c not in PESADOS},
        "medido": {
            "tempo": dados["tempo"],
            "memoria": dados["memoria"],
            "ciclomatica": dados["ciclomatica"],
        },
        "conferencia": ler(pasta, "conferencia.json"),
        "pseudocodigo": pseudo,
    }


def instrumento(nome):
    pasta = os.path.join(RAIZ, "instrumentos", nome)
    ficha, dados = ler(pasta, "ficha.json"), ler(pasta, "dados.json")
    if not ficha.get("objetivo"):
        raise SystemExit(f"{nome}: a ficha precisa de \"objetivo\", a frase que diz para que serve o instrumento")
    ops = dados["operacoes"]
    for o in ficha["operacoes"] + ficha["grafico"]:
        if o["id"] not in ops:
            raise SystemExit(f"{nome}: a ficha cita a operação {o['id']}, que o medir.py não mede")
    # a página não precisa dos argumentos de cada chamada (o teste os lê do dados.json)
    for o in ops.values():
        for t in o["tabela"] + o["serie"]:
            t.pop("args", None)
    return {**ficha, "medido": {c: x for c, x in dados.items() if c != "conferir"}}


def conferir_creditos(galeria, instrumentos):
    ids = {i["id"] for i in instrumentos}
    for f in galeria:
        for c in f.get("instrumentos", []):
            if c["id"] not in ids:
                raise SystemExit(f"{f['alg']}: a ficha credita o instrumento {c['id']!r}, que não existe "
                                 f"(existem: {', '.join(sorted(ids))})")


def conferir_playlists(playlists, series):
    citadas = set()
    for p in playlists:
        for s in p["subcategorias"]:
            for nome in s["faixas"]:
                if nome not in ALGORITMOS:
                    raise SystemExit(f"playlist {p['id']}: a faixa {nome!r} não existe")
                citadas.add(nome)
    soltas = [n for n in ALGORITMOS if n not in citadas]
    if soltas:
        raise SystemExit(f"faixas fora de qualquer playlist: {', '.join(soltas)}")
    for s in series:   # um vídeo pronto aponta para um arquivo que existe
        for v in s["videos"]:
            if v.get("video") and not os.path.exists(os.path.join(RAIZ, v["video"])):
                raise SystemExit(f"{s['titulo']}: o vídeo {v['n']} aponta para {v['video']}, que não existe")


def main():
    if "--tudo" in sys.argv:
        for nome in ALGORITMOS:
            pasta = os.path.join("algoritmos", nome)
            subprocess.run([sys.executable, os.path.join(pasta, "medir.py")], cwd=RAIZ, check=True)
            subprocess.run(["Rscript", os.path.join(pasta, "conferir.R")], cwd=RAIZ, check=True)
            subprocess.run([sys.executable, "video.py", "poster"], cwd=os.path.join(RAIZ, pasta), check=True)
    for nome in INSTRUMENTOS:   # sempre: é rápido, e o teste JS × Python não compara com medida velha
        subprocess.run([sys.executable, os.path.join("instrumentos", nome, "medir.py")], cwd=RAIZ, check=True,
                       stdout=subprocess.DEVNULL)
    galeria = [entrada(n) for n in ALGORITMOS]
    instrumentos = [instrumento(n) for n in INSTRUMENTOS]
    conferir_creditos(galeria, instrumentos)
    playlists, conceitos, fundamentos = ler(RAIZ, "playlists.json"), ler(RAIZ, "conceitos.json"), ler(RAIZ, "fundamentos.json")
    conferir_playlists(playlists, [conceitos, fundamentos])
    with open(os.path.join(RAIZ, "dados.js"), "w") as f:
        f.write("// gerado por gerar.py; não editar à mão\n")
        f.write("window.GALERIA = " + json.dumps(galeria, ensure_ascii=False, indent=1) + ";\n")
        f.write("window.PLAYLISTS = " + json.dumps(playlists, ensure_ascii=False, indent=1) + ";\n")
        f.write("window.FUNDAMENTOS = " + json.dumps(fundamentos, ensure_ascii=False, indent=1) + ";\n")
        f.write("window.CONCEITOS = " + json.dumps(conceitos, ensure_ascii=False, indent=1) + ";\n")
        f.write("window.INSTRUMENTOS = " + json.dumps(instrumentos, ensure_ascii=False) + ";\n")
    print("dados.js:", ", ".join(g["nome"] for g in galeria), "| estruturas:", ", ".join(i["nome"] for i in instrumentos))
    subprocess.run(["node", os.path.join(RAIZ, "testes", "conferir_js.mjs")], check=True)


if __name__ == "__main__":
    main()
