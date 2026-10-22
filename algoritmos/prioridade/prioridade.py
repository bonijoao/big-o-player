"""Pronto-socorro: um médico e pacientes que chegam em minutos sorteados, cada
um com uma gravidade de 1 (a mais urgente) a 5. Quem chega com o médico ocupado
entra na fila de prioridade, o Heap do instrumento. Quando o médico fica livre,
chama o mais urgente e, no empate, quem chegou primeiro: a chave do heap de
mínimo é o par (gravidade, ordem de chegada). Se ninguém espera, o próximo a
chegar entra direto.

É o gêmeo da fila de atendimento (algoritmos/atendimento): mesmo dia, mesmos
movimentos, mas a fila não é mais por ordem de chegada."""
import os
import random
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor"), os.path.join(AQUI, "..", "..", "instrumentos", "heap"),
                os.path.join(AQUI, "..", "atendimento")]
from heap import Heap  # noqa: E402
from atendimento import MOVIMENTOS  # noqa: E402

GRAVIDADES = (1, 5)


def insere(heap, i, g, conta):
    conta.op("inserir")
    heap.inserir([g, i])
    conta.ocupa("heap", heap.n)
    conta.evento("insere", i)


def tira(heap, conta):
    conta.op("tirar")
    g, k = heap.tirar()
    conta.ocupa("heap", heap.n)
    conta.evento("chama", k)
    return k


def atender(chegada, duracao, gravidade, conta):
    n = len(chegada)
    heap = Heap(conta)
    livre, soma, maior, i = 0, 0, 0, 0
    for _ in range(n):
        while i < n and chegada[i] < livre:
            insere(heap, i, gravidade[i], conta)
            i += 1
            maior = max(maior, heap.n)
        if heap.n > 0:
            k = tira(heap, conta)
        else:
            k = i
            i += 1
        inicio = max(livre, chegada[k])
        conta.evento("atende", k, inicio)
        soma += inicio - chegada[k]
        livre = inicio + duracao[k]
    return soma, maior


MEDIDA = atender


def sortear(n, movimento, r):
    """Chegadas (crescentes), durações e gravidades: as duas primeiras como na fila de atendimento."""
    (c0, c1), (a0, a1) = MOVIMENTOS[movimento]
    chegada, t = [], 0
    for _ in range(n):
        t += r.randint(c0, c1)
        chegada.append(t)
    duracao = [r.randint(a0, a1) for _ in range(n)]
    gravidade = [r.randint(*GRAVIDADES) for _ in range(n)]
    return chegada, duracao, gravidade


if __name__ == "__main__":
    from conta import Contador
    c = Contador()
    print(atender(*sortear(12, "lotado", random.Random(1)), c), c.ops, c.pico)
