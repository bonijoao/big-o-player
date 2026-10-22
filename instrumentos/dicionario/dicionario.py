"""Dois dicionários (tabelas de dispersão), para comparar: cada chave mora na
casa que a função de dispersão calcula, e as duas diferem no que fazem quando
duas chaves caem na mesma casa (uma colisão).

DicEncadeamento: m casas, cada uma com o início de uma corrente de nós; cada
nó tem três casas (chave, valor e próx). A chave nova entra no começo da
corrente da sua casa.
DicSondagem: m casas de chave e valor; se a casa está ocupada por outra chave,
tenta a seguinte, dando a volta no fim (sondagem linear). Remover deixa uma
lápide, que a busca pula e o pôr reaproveita.

As duas dobram m (e redistribuem todas as chaves) quando a ocupação α = n/m
passaria de 3/4; com `fixa=True`, m não muda (as faixas de colisão). As
lápides contam como ocupadas na sondagem.

Custo: cada leitura e cada escrita de uma casa conta 1 (chave, valor, próx ou
o início de uma corrente). Calcular a casa não conta. À parte, `sondagens`
conta as casas olhadas numa busca (no encadeamento, o início da corrente e
cada nó) e `comparacoes`, as chaves comparadas com a procurada. A mesma
estrutura, contando igual, está em simulacao/instrumentos.js.

Para usar numa faixa (o Fibonacci com memória, por exemplo):
    d = DicSondagem(conta)       # ou DicEncadeamento(conta)
    d.por(chave, valor); d.tem(chave); d.ler(chave)   # ler devolve None se não tem
"""

MULT = 2654435769              # ⌊2³² / φ⌋: a dispersão multiplicativa de Knuth
VOLTA = 2 ** 32


def numero(chave):
    """A chave como um número de 32 bits: o próprio inteiro, ou, numa palavra,
    o polinômio de base 31 sobre os códigos das letras."""
    if isinstance(chave, str):
        h = 0
        for letra in chave:
            h = (h * 31 + ord(letra)) % VOLTA
        return h
    return chave % VOLTA


def casa_de(chave, bits):
    """A casa da chave numa tabela de 2^bits casas: os bits de cima de numero(chave) × MULT (mod 2³²)."""
    return (numero(chave) * MULT % VOLTA) >> (32 - bits)


def chave_medida(i):
    """A i-ésima chave da medição: i embaralhado (o fmix32 do MurmurHash3, que não
    repete), para as chaves colidirem como chaves quaisquer, e não como 0, 1, 2, …"""
    h = i % VOLTA
    h ^= h >> 16
    h = h * 0x85EBCA6B % VOLTA
    h ^= h >> 13
    h = h * 0xC2B2AE35 % VOLTA
    h ^= h >> 16
    return h


_IGUAL = object()              # pôr sem valor: o valor é a própria chave


class _Dicionario:
    def __init__(self, conta, bits=3, fixa=False):
        self.conta = conta
        self.bits = bits
        self.fixa = fixa
        self.n = 0

    @property
    def m(self):
        return 2 ** self.bits

    def _cheia(self):
        """Mais uma chave passaria α de 3/4 (nunca, na tabela fixa)."""
        return not self.fixa and 4 * (self.usadas + 1) > 3 * self.m

    def tem(self, chave):
        return self._acha(chave) is not None

    def ler(self, chave):
        """O valor da chave, ou None se ela não está."""
        p = self._acha(chave)
        return None if p is None else self.le_valor(p)

    def encher(self, i):
        """Põe a i-ésima chave da medição, com i de valor (instrumentos/dicionario/medir.py)."""
        self.por(chave_medida(i), i)


class No:
    __slots__ = ("chave", "valor", "prox")

    def __init__(self):
        self.chave = self.valor = self.prox = None


class DicEncadeamento(_Dicionario):
    def __init__(self, conta, bits=3, fixa=False):
        super().__init__(conta, bits, fixa)
        self.cabeca = [None] * self.m

    @property
    def usadas(self):
        return self.n

    def le_cabeca(self, i):
        self.conta.op("leituras")
        return self.cabeca[i]

    def escreve_cabeca(self, i, p):
        self.conta.op("escritas")
        self.cabeca[i] = p

    def le_chave(self, p):
        self.conta.op("leituras")
        return p.chave

    def le_valor(self, p):
        self.conta.op("leituras")
        return p.valor

    def le_prox(self, p):
        self.conta.op("leituras")
        return p.prox

    def _escreve(self, p, campo, x):
        self.conta.op("escritas")
        setattr(p, campo, x)

    def _acha(self, chave):
        """Segue a corrente da casa da chave: o nó dela, ou None."""
        self.conta.op("sondagens")
        p = self.le_cabeca(casa_de(chave, self.bits))
        while p is not None:
            self.conta.op("sondagens")
            self.conta.op("comparacoes")
            if self.le_chave(p) == chave:
                return p
            p = self.le_prox(p)
        return None

    def por(self, chave, valor=_IGUAL):
        if valor is _IGUAL:
            valor = chave
        p = self._acha(chave)
        if p is not None:
            self._escreve(p, "valor", valor)
            return None
        if self._cheia():
            self._crescer()
        i = casa_de(chave, self.bits)
        c = No()                                  # pedir o nó à memória não conta
        self._escreve(c, "chave", chave)
        self._escreve(c, "valor", valor)
        self._escreve(c, "prox", self.le_cabeca(i))
        self.escreve_cabeca(i, c)
        self.n += 1
        return None

    def remover(self, chave):
        """Tira a chave da corrente: quem apontava para ela passa a apontar para o seguinte."""
        i = casa_de(chave, self.bits)
        self.conta.op("sondagens")
        ant, p = None, self.le_cabeca(i)
        while p is not None:
            self.conta.op("sondagens")
            self.conta.op("comparacoes")
            if self.le_chave(p) == chave:
                seg = self.le_prox(p)
                if ant is None:
                    self.escreve_cabeca(i, seg)
                else:
                    self._escreve(ant, "prox", seg)
                self.n -= 1
                return True
            ant, p = p, self.le_prox(p)
        return False

    def _crescer(self):
        """Dobra m: cada nó, lido na corrente velha, entra no começo da corrente da sua casa nova."""
        velha = self.cabeca
        self.bits += 1
        self.cabeca = [None] * self.m
        for i in range(len(velha)):
            self.conta.op("leituras")
            p = velha[i]
            while p is not None:
                seg = self.le_prox(p)
                j = casa_de(self.le_chave(p), self.bits)
                self._escreve(p, "prox", self.le_cabeca(j))
                self.escreve_cabeca(j, p)
                p = seg

    def valores(self):
        v = []
        for p in self.cabeca:
            while p is not None:
                v.append([p.chave, p.valor])
                p = p.prox
        return v

    @property
    def capacidade(self):
        return self.m + 3 * self.n               # os inícios das correntes e três casas por nó


class _Lapide:
    def __repr__(self):
        return "†"


LAPIDE = _Lapide()


class DicSondagem(_Dicionario):
    def __init__(self, conta, bits=3, fixa=False):
        super().__init__(conta, bits, fixa)
        self.chave = [None] * self.m
        self.valor = [None] * self.m
        self.lapides = 0

    @property
    def usadas(self):
        return self.n + self.lapides

    def le_chave(self, i):
        self.conta.op("leituras")
        return self.chave[i]

    def le_valor(self, i):
        self.conta.op("leituras")
        return self.valor[i]

    def escreve_chave(self, i, x):
        self.conta.op("escritas")
        self.chave[i] = x

    def escreve_valor(self, i, x):
        self.conta.op("escritas")
        self.valor[i] = x

    def _procura(self, chave):
        """Da casa da chave em diante: (a casa dela ou -1, a casa onde ela entraria:
        a primeira lápide do caminho, ou a vazia que encerrou a busca)."""
        i, livre = casa_de(chave, self.bits), -1
        for _ in range(self.m):
            self.conta.op("sondagens")
            k = self.le_chave(i)
            if k is None:
                return -1, (i if livre < 0 else livre)
            if k is LAPIDE:
                if livre < 0:
                    livre = i
            else:
                self.conta.op("comparacoes")
                if k == chave:
                    return i, livre
            i = (i + 1) % self.m
        return -1, livre                         # deu a volta: não há casa vazia

    def _acha(self, chave):
        i = self._procura(chave)[0]
        return None if i < 0 else i

    def _vaga(self, chave):
        """A primeira casa vazia a partir da casa da chave (numa tabela sem lápides)."""
        i = casa_de(chave, self.bits)
        while self.le_chave(i) is not None:
            i = (i + 1) % self.m
        return i

    def por(self, chave, valor=_IGUAL):
        if valor is _IGUAL:
            valor = chave
        i, livre = self._procura(chave)
        if i >= 0:
            self.escreve_valor(i, valor)
            return None
        reusa = livre >= 0 and self.chave[livre] is LAPIDE   # a busca já leu essa casa
        if not reusa and self._cheia():
            self._crescer()
            livre = self._vaga(chave)
        if livre < 0:
            raise ValueError("a tabela fixa está cheia")
        self.escreve_chave(livre, chave)
        self.escreve_valor(livre, valor)
        if reusa:
            self.lapides -= 1
        self.n += 1
        return None

    def remover(self, chave):
        """A casa da chave vira lápide: a busca de quem veio depois dela continua passando."""
        i = self._procura(chave)[0]
        if i < 0:
            return False
        self.escreve_chave(i, LAPIDE)
        self.valor[i] = None                     # o valor vai embora junto (não conta)
        self.n -= 1
        self.lapides += 1
        return True

    def _crescer(self):
        """Dobra m: cada chave da tabela velha vai para a primeira casa vazia a partir da sua casa nova.
        As lápides ficam para trás."""
        chaves, valores = self.chave, self.valor
        self.bits += 1
        self.chave, self.valor = [None] * self.m, [None] * self.m
        self.lapides = 0
        for i in range(len(chaves)):
            self.conta.op("leituras")
            k = chaves[i]
            if k is None or k is LAPIDE:
                continue
            self.conta.op("leituras")
            j = self._vaga(k)
            self.escreve_chave(j, k)
            self.escreve_valor(j, valores[i])

    def valores(self):
        v = []
        for k, x in zip(self.chave, self.valor):
            if k is not None and k is not LAPIDE:
                v.append([k, x])
        return v

    @property
    def capacidade(self):
        return 2 * self.m                        # chave e valor em cada casa
