"""Dois textos, para comparar: um vetor de caracteres montado letra por letra.

TextoImutavel (concatenar no laço): como a str do Python, o texto nunca muda
depois de pronto. Acrescentar uma letra reserva um bloco novo com uma casa a
mais, copia todas as letras e escreve a nova: O(n). Montar n letras assim
custa 1 + 2 + … + n cópias, O(n²).
TextoPedacos (juntar no fim): as letras vão para uma lista de pedaços, o
Vetor que dobra quando enche (anexar é O(1) amortizado). Juntar copia tudo
uma vez só num bloco do tamanho certo: O(n). Montar n letras e juntar, O(n).

Custo: cada leitura e escrita de casa conta 1. O tamanho, guardado à parte,
não conta. A mesma estrutura, contando igual, está em simulacao/instrumentos.js.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "vetor"))
from vetor import Vetor  # noqa: E402


def _copia(conta, ler, n):
    """Um bloco novo com as n letras lidas por ler(k): uma leitura e uma escrita cada."""
    novas = [None] * n
    for k in range(n):
        novas[k] = ler(k)
        conta.op("escritas")
    return novas


class _Comum:
    """O que as duas versões leem igual: uma letra por casa."""

    def ler(self, i):
        return self._le(i)

    def comprimento(self):
        return self.n

    def fatiar(self, a, b):
        """As letras de a até b − 1 num texto novo: lê e escreve cada uma."""
        return "".join(_copia(self.conta, lambda k: self._le(a + k), b - a))

    def comparar(self, s):
        """Igual a s? Compara letra a letra até a primeira diferença; cada letra do texto lida conta 1."""
        if self.n != len(s):
            return False
        for i in range(self.n):
            if self._le(i) != s[i]:
                return False
        return True


class TextoImutavel(_Comum):
    def __init__(self, conta):
        self.conta = conta
        self.casas = []

    def _le(self, i):
        self.conta.op("leituras")
        return self.casas[i]

    def acrescentar(self, x):
        """texto ← texto + x: um bloco novo com n + 1 casas, as n letras copiadas e a nova escrita."""
        novas = _copia(self.conta, self._le, len(self.casas)) + [None]
        novas[-1] = x
        self.conta.op("escritas")
        self.casas = novas

    def juntar(self):
        """Já é um bloco só: não há o que juntar."""
        return "".join(str(x) for x in self.casas)

    def montar(self, letras):
        for x in letras:
            self.acrescentar(x)
        return self.juntar()

    def valores(self):
        return list(self.casas)

    @property
    def n(self):
        return len(self.casas)

    @property
    def capacidade(self):
        return len(self.casas)


class TextoPedacos(_Comum):
    def __init__(self, conta):
        self.conta = conta
        self.pedacos = Vetor(conta)

    def _le(self, i):
        return self.pedacos.ler(i)

    def acrescentar(self, x):
        """pedaços.anexar(x): uma escrita, ou a cópia de todos quando o vetor dobra."""
        self.pedacos.anexar(x)

    def juntar(self):
        """Um bloco do tamanho certo, com cada pedaço copiado uma vez: n leituras e n escritas."""
        return "".join(str(x) for x in _copia(self.conta, self._le, self.n))

    def montar(self, letras):
        for x in letras:
            self.acrescentar(x)
        return self.juntar()

    def valores(self):
        return self.pedacos.valores()

    @property
    def n(self):
        return self.pedacos.n

    @property
    def capacidade(self):
        return self.pedacos.capacidade
