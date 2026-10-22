"""Contar palavras: quantas vezes cada palavra aparece num texto. Cada palavra
é uma chave do Dicionário (a versão com sondagem linear, como o dict do
Python): se já está, a contagem sobe 1; se não está, entra com 1. Cada
palavra custa uma ida ao dicionário (às vezes três: ver se tem, ler e pôr),
seja o texto de cem palavras ou de cem mil."""
import os
import re
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor"), os.path.join(AQUI, "..", "..", "instrumentos", "dicionario")]
from dicionario import DicSondagem  # noqa: E402

LETRAS = re.compile(r"[^\W\d_]+")      # uma palavra: letras seguidas (o hífen e o apóstrofo separam)


def ler_texto(nome):
    """O texto do arquivo, sem o cabeçalho (tudo até a primeira linha em branco)."""
    with open(os.path.join(AQUI, nome), encoding="utf-8") as f:
        return f.read().split("\n\n", 1)[1]


def palavras_de(texto):
    """As palavras do texto, em minúsculas, na ordem."""
    return LETRAS.findall(texto.lower())


def contar(p, conta):
    d = DicSondagem(conta)
    for x in p:
        if d.tem(x):
            d.por(x, d.ler(x) + 1)
        else:
            d.por(x, 1)
        conta.ocupa("palavras", d.n)
        conta.ocupa("contagens", d.n)
    return d


MEDIDA = contar
