"""Junta ficha.json (texto) + dados.json (medido) + conferencia.json de cada
algoritmo em dados.js, que a página carrega (funciona abrindo o arquivo direto,
sem servidor).

  python3 gerar.py            só junta
  python3 gerar.py --tudo     antes mede, confere no R e renderiza os vídeos
"""
import json
import os
import subprocess
import sys

RAIZ = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(RAIZ, "motor"))
import pseudocodigo  # noqa: E402
ALGORITMOS = ["bolha", "insercao", "intercalacao", "rapida", "kmeans"]   # ordem da galeria
# texto da ciclomática, o mesmo para todos (uma ficha pode sobrescrever)
CICLOMATICA = {
 "porque": "Cada for, while e if, e cada and/or numa condição, abre um caminho a mais pelo código. A complexidade ciclomática conta os caminhos independentes: qualquer percurso pela função é uma combinação deles. É um teto para quantos testes cobrem todos os ramos, não o mínimo.",
 "regra": "Regra de contagem: +1 por for, while, if, if-expressão, except e cada and/or. Compreensões de lista são proibidas na função medida, porque escondem um laço que o grafo não veria."
}
PESADOS = {"pontos", "especies", "fotos", "final", "eventos", "vetor"}   # só o vídeo usa


def ler(pasta, nome):
    caminho = os.path.join(pasta, nome)
    if not os.path.exists(caminho):
        return None
    with open(caminho) as f:
        return json.load(f)


def entrada(nome):
    pasta = os.path.join(RAIZ, "algoritmos", nome)
    ficha, dados = ler(pasta, "ficha.json"), ler(pasta, "dados.json")
    ex = dados["exemplo"]
    pseudo = None
    if "pseudocodigo" in ficha:
        lido = pseudocodigo.ler(ficha["pseudocodigo"])
        m = pseudocodigo.medir(lido)
        if m["M"] != dados["ciclomatica"]["M"]:
            raise SystemExit(f"{nome}: o fluxograma do pseudocódigo dá M = {m['M']}, "
                             f"o código dá M = {dados['ciclomatica']['M']}; os dois precisam ter os mesmos ramos")
        pseudo = {**lido, **m}
    video = os.path.join(pasta, f"{nome}.mp4")
    duracao = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", video],
                                   capture_output=True, text=True, check=True).stdout)
    return {
        "ciclomatica": CICLOMATICA,
        "duracao": round(duracao, 1),
        **{c: x for c, x in ficha.items() if c != "pseudocodigo"},
        "video": f"algoritmos/{nome}/{nome}.mp4",
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


def main():
    if "--tudo" in sys.argv:
        for nome in ALGORITMOS:
            pasta = os.path.join("algoritmos", nome)
            subprocess.run([sys.executable, os.path.join(pasta, "medir.py")], cwd=RAIZ, check=True)
            subprocess.run(["Rscript", os.path.join(pasta, "conferir.R")], cwd=RAIZ, check=True)
            subprocess.run([sys.executable, "video.py"], cwd=os.path.join(RAIZ, pasta), check=True)
    galeria = [entrada(n) for n in ALGORITMOS]
    with open(os.path.join(RAIZ, "dados.js"), "w") as f:
        f.write("// gerado por gerar.py; não editar à mão\n")
        f.write("window.GALERIA = " + json.dumps(galeria, ensure_ascii=False, indent=1) + ";\n")
        f.write("window.ALBUNS = " + json.dumps(ler(RAIZ, "albuns.json"), ensure_ascii=False, indent=1) + ";\n")
    print("dados.js:", ", ".join(g["nome"] for g in galeria))


if __name__ == "__main__":
    main()
