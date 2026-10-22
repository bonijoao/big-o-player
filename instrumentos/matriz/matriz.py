"""Matriz guardada linha a linha: as linhas × colunas casas num bloco só, uma
linha depois da outra. A casa (i, j) mora no endereço i·colunas + j, que se
calcula direto: ler ou escrever uma casa é O(1), sem passar pelas outras.

Custo: cada leitura e cada escrita de uma casa passa por `conta.op()`. As
dimensões, guardadas à parte, não contam. A mesma estrutura, contando igual,
está em simulacao/instrumentos.js.
"""


class Matriz:
    def __init__(self, conta, linhas=0, colunas=0):
        self.conta = conta
        self.linhas, self.colunas = linhas, colunas
        self.casas = [0] * (linhas * colunas)

    # ---------- acesso a uma casa: o que se conta ----------

    def endereco(self, i, j):
        return i * self.colunas + j

    def _le(self, k):
        self.conta.op("leituras")
        return self.casas[k]

    def _escreve(self, k, x):
        self.conta.op("escritas")
        self.casas[k] = x

    # ---------- operações ----------

    def criar(self, linhas, colunas):
        """Reserva um bloco novo de linhas × colunas casas e escreve 0 em cada uma."""
        self.linhas, self.colunas = linhas, colunas
        self.casas = [None] * (linhas * colunas)
        for k in range(linhas * colunas):
            self._escreve(k, 0)

    def ler(self, i, j):
        return self._le(self.endereco(i, j))

    def escrever(self, i, j, x):
        self._escreve(self.endereco(i, j), x)

    def linha(self, i):
        """As colunas casas da linha i, que estão lado a lado no bloco."""
        saida = []
        for j in range(self.colunas):
            saida.append(self._le(self.endereco(i, j)))
        return saida

    def coluna(self, j):
        """As linhas casas da coluna j: o mesmo número de leituras, mas pulando colunas casas de uma para a outra."""
        saida = []
        for i in range(self.linhas):
            saida.append(self._le(self.endereco(i, j)))
        return saida

    def transpor(self):
        """Um bloco novo de colunas × linhas: a casa (i, j) vai para (j, i). Lê e escreve cada casa uma vez."""
        novas = [None] * (self.linhas * self.colunas)
        for i in range(self.linhas):
            for j in range(self.colunas):
                novas[j * self.linhas + i] = self._le(self.endereco(i, j))
                self.conta.op("escritas")
        self.casas = novas
        self.linhas, self.colunas = self.colunas, self.linhas

    def valores(self):
        return [self.casas[i * self.colunas:(i + 1) * self.colunas] for i in range(self.linhas)]

    @property
    def n(self):
        return len(self.casas)

    @property
    def capacidade(self):
        return len(self.casas)


def quadrada(classe, conta, n):
    """A matriz de medição: n × n, com a casa (i, j) valendo i·n + j (a ordem das casas no bloco)."""
    m = classe(conta, n, n)
    m.casas = list(range(n * n))
    return m
