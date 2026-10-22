"""Duas listas encadeadas, para comparar: cada valor sabe quem vem depois dele.

ListaEstatica: dois vetores do mesmo tamanho, valor e próx; o próx guarda o
índice da casa do valor seguinte (-1 no último). As casas livres formam a
lista de livres, encadeada pelo próprio próx. Quando o vetor enche, dobra e
copia as casas nos mesmos índices, para os próx continuarem valendo.
ListaDinamica: cada valor mora num nó alocado sozinho, com duas casas, valor
e próx; o próx guarda o nó seguinte (nulo no último). Nunca copia.

As duas guardam à parte o início, o fim e o tamanho (não contam). Custo: cada
leitura e cada escrita de uma casa, valor ou próx, conta 1. Seguir um ponteiro
é ler um próx. A mesma estrutura, contando igual, está em simulacao/instrumentos.js.
"""


class _Lista:
    """As operações, iguais nas duas: só muda o que é uma casa e o que é nulo."""

    def _anda(self, i):
        """Do início, segue i próx: o nó da posição i."""
        p = self.inicio
        for _ in range(i):
            p = self.le_prox(p)
        return p

    def ler(self, i):
        return self.le_valor(self._anda(i))

    def inserir_inicio(self, x):
        c = self._nova(x)
        self.escreve_prox(c, self.inicio)
        if self.n == 0:
            self.fim = c
        self.inicio = c
        self.n += 1

    def inserir_fim(self, x):
        c = self._nova(x)
        self.escreve_prox(c, self.NULO)
        if self.n == 0:
            self.inicio = c
        else:
            self.escreve_prox(self.fim, c)
        self.fim = c
        self.n += 1

    def inserir(self, i, x):
        """Insere na posição i: anda até o nó i − 1 e o liga ao novo."""
        if i == 0:
            return self.inserir_inicio(x)
        if i == self.n:
            return self.inserir_fim(x)
        p = self._anda(i - 1)
        c = self._nova(x)
        self.escreve_prox(c, self.le_prox(p))
        self.escreve_prox(p, c)
        self.n += 1

    def remover_inicio(self):
        c = self.inicio
        x = self.le_valor(c)
        self.inicio = self.le_prox(c)
        self._devolve(c)
        self.n -= 1
        if self.n == 0:
            self.fim = self.NULO
        return x

    def remover(self, i):
        """Tira o valor da posição i: o nó i − 1 passa a apontar para o i + 1."""
        if i == 0:
            return self.remover_inicio()
        p = self._anda(i - 1)
        c = self.le_prox(p)
        x = self.le_valor(c)
        self.escreve_prox(p, self.le_prox(c))
        if c == self.fim:
            self.fim = p
        self._devolve(c)
        self.n -= 1
        return x

    def buscar(self, x):
        """Segue os próx desde o início: a posição do primeiro x, ou -1."""
        p, k = self.inicio, 0
        while not self._nulo(p):
            if self.le_valor(p) == x:
                return k
            p = self.le_prox(p)
            k += 1
        return -1


class ListaEstatica(_Lista):
    NULO = -1

    def __init__(self, conta, capacidade=1):
        self.conta = conta
        self.valor = [None] * capacidade
        self.prox = [k + 1 if k + 1 < capacidade else -1 for k in range(capacidade)]
        self.livre = 0                  # a primeira casa da lista de livres
        self.inicio = self.fim = -1
        self.n = 0

    def _nulo(self, p):
        return p == -1

    def le_valor(self, i):
        self.conta.op("leituras")
        return self.valor[i]

    def le_prox(self, i):
        self.conta.op("leituras")
        return self.prox[i]

    def escreve_valor(self, i, x):
        self.conta.op("escritas")
        self.valor[i] = x

    def escreve_prox(self, i, j):
        self.conta.op("escritas")
        self.prox[i] = j

    def _realoca(self, capacidade):
        """Cheio: casas novas; copia cada casa (valor e próx) no mesmo índice e
        encadeia as novas na lista de livres."""
        velho = len(self.valor)
        valor, prox = [None] * capacidade, [-1] * capacidade
        for k in range(velho):
            valor[k] = self.le_valor(k)
            self.conta.op("escritas")
            prox[k] = self.le_prox(k)
            self.conta.op("escritas")
        self.valor, self.prox = valor, prox
        for k in range(velho, capacidade):
            self.escreve_prox(k, k + 1 if k + 1 < capacidade else -1)
        self.livre = velho

    def _nova(self, x):
        """Tira a primeira casa da lista de livres e escreve o valor nela."""
        if self.livre == -1:
            self._realoca(2 * len(self.valor))
        c = self.livre
        self.livre = self.le_prox(c)
        self.escreve_valor(c, x)
        return c

    def _devolve(self, c):
        """A casa volta para o começo da lista de livres."""
        self.escreve_prox(c, self.livre)
        self.valor[c] = None            # a casa volta a ficar livre (não conta)
        self.livre = c

    def valores(self):
        v, p = [], self.inicio
        while p != -1:
            v.append(self.valor[p])
            p = self.prox[p]
        return v

    @property
    def capacidade(self):
        return 2 * len(self.valor)      # duas casas por posição: valor e próx


class No:
    __slots__ = ("valor", "prox")

    def __init__(self):
        self.valor = None
        self.prox = None


class ListaDinamica(_Lista):
    NULO = None

    def __init__(self, conta):
        self.conta = conta
        self.inicio = self.fim = None
        self.n = 0

    def _nulo(self, p):
        return p is None

    def le_valor(self, p):
        self.conta.op("leituras")
        return p.valor

    def le_prox(self, p):
        self.conta.op("leituras")
        return p.prox

    def escreve_valor(self, p, x):
        self.conta.op("escritas")
        p.valor = x

    def escreve_prox(self, p, q):
        self.conta.op("escritas")
        p.prox = q

    def _nova(self, x):
        """Aloca um nó sozinho (pedir memória não conta) e escreve o valor nele."""
        c = No()
        self.escreve_valor(c, x)
        return c

    def _devolve(self, c):
        pass                            # o nó é solto; ninguém mais aponta para ele

    def valores(self):
        v, p = [], self.inicio
        while p is not None:
            v.append(p.valor)
            p = p.prox
        return v

    @property
    def capacidade(self):
        return 2 * self.n               # duas casas por nó: valor e próx
