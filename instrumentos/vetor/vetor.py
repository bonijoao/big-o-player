"""Vetor dinâmico instrumentado: casas contíguas e capacidade que dobra quando enche.

Custo: cada leitura e cada escrita de uma casa passa por `conta.op()`.
O tamanho, a capacidade e os índices guardados à parte não contam, como nas
faixas. A mesma estrutura, contando igual, está em simulacao/instrumentos.js.
"""


class Vetor:
    def __init__(self, conta, capacidade=1):
        self.conta = conta
        self.casas = [None] * capacidade
        self.n = 0

    # ---------- acesso a uma casa: o que se conta ----------

    def _le(self, i):
        self.conta.op("leituras")
        return self.casas[i]

    def _escreve(self, i, x):
        self.conta.op("escritas")
        self.casas[i] = x

    def _realoca(self, capacidade):
        """Reserva casas novas e copia os n valores: n leituras e n escritas."""
        novas = [None] * capacidade
        for i in range(self.n):
            novas[i] = self._le(i)
            self.conta.op("escritas")
        self.casas = novas

    # ---------- operações ----------

    def ler(self, i):
        return self._le(i)

    def escrever(self, i, x):
        self._escreve(i, x)

    def anexar(self, x):
        """Insere no fim; se o vetor está cheio, antes dobra a capacidade."""
        if self.n == len(self.casas):
            self._realoca(2 * len(self.casas))
        self._escreve(self.n, x)
        self.n += 1

    def inserir(self, i, x):
        """Insere na posição i, deslocando uma casa para a direita quem está de i em diante."""
        if self.n == len(self.casas):
            self._realoca(2 * len(self.casas))
        for j in range(self.n, i, -1):
            self._escreve(j, self._le(j - 1))
        self._escreve(i, x)
        self.n += 1

    def remover(self, i):
        """Tira o valor da posição i e desloca quem está depois dela uma casa para a esquerda."""
        x = self._le(i)
        for j in range(i, self.n - 1):
            self._escreve(j, self._le(j + 1))
        self.n -= 1
        self.casas[self.n] = None      # a casa volta a ficar livre (não conta)
        return x

    def buscar(self, x):
        """Busca sequencial: a posição da primeira ocorrência de x, ou -1."""
        for i in range(self.n):
            if self._le(i) == x:
                return i
        return -1

    def valores(self):
        return self.casas[:self.n]

    @property
    def capacidade(self):
        return len(self.casas)
