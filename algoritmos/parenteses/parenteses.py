"""Parênteses balanceados: cada símbolo que abre vai para a pilha; cada um
que fecha tira o do topo, que tem de ser o seu par. No fim, a pilha tem de
estar vazia. Três tipos de símbolo, ( [ {, para o par importar."""
import os
import random
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor"), os.path.join(AQUI, "..", "..", "instrumentos", "pilha")]
from pilha import Pilha  # noqa: E402

ABRE = "([{"
PAR = {")": "(", "]": "[", "}": "{"}
FECHA = {a: f for f, a in PAR.items()}


def empilha(pilha, s, conta):
    conta.op("empilhar")
    pilha.empilhar(s)
    conta.ocupa("simbolos", pilha.n)
    conta.evento("empilha", s)


def desempilha(pilha, conta):
    conta.op("desempilhar")
    s = pilha.desempilhar()
    conta.ocupa("simbolos", pilha.n)
    conta.evento("desempilha", s)
    return s


def par_errado(topo, s, conta):
    conta.op("comparacoes")
    conta.evento("compara", topo, s)
    return topo != PAR[s]


def balanceado(texto, conta):
    pilha = Pilha(conta)
    certo = True
    for s in texto:
        if s in ABRE:
            empilha(pilha, s, conta)
        elif pilha.n == 0:
            certo = False
            break
        else:
            topo = desempilha(pilha, conta)
            if par_errado(topo, s, conta):
                certo = False
                break
    if pilha.n > 0:
        certo = False
    return certo


MEDIDA = balanceado


# ---------- entradas ----------

def gerar(n, caso, r):
    """Texto de n símbolos (n par) de um caso: balanceada, um par errado,
    sobra aberto, só abre ou fecha sem abrir."""
    if n % 2:
        raise ValueError("o texto precisa de um número par de símbolos")
    if caso == "so_abre":
        return "".join(r.choice(ABRE) for _ in range(n))
    if caso == "fecha_sem_abrir":
        return "]" + gerar(n - 2, "balanceada", r) + "]"
    t, pilha = [], []
    for k in range(n):
        resta = n - k
        if pilha and (len(pilha) == resta or r.random() < 0.5):
            t.append(FECHA[pilha.pop()])
        else:
            a = r.choice(ABRE)
            pilha.append(a)
            t.append(a)
    if caso == "par_errado":
        j = r.choice([k for k in range(n) if t[k] in PAR])
        t[j] = r.choice([f for f in PAR if f != t[j]])
    elif caso == "sobra_aberto":
        t[-1] = r.choice(ABRE)
    return "".join(t)
