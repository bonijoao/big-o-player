"""Duas árvores de busca, para comparar: à esquerda de cada nó, só os menores;
à direita, só os maiores. Buscar é descer comparando, um nível por vez.

ArvoreComum: cada nó tem três casas, valor, esq e dir. Insere onde a descida
acaba, sem mexer em mais nada: com os valores em ordem, vira uma fila indiana.
ArvoreAVL: cada nó tem quatro casas, a quarta é a altura da subárvore (uma
folha tem altura 1). Na volta de cada inserção e remoção, confere se as
alturas dos dois lados diferem em mais de 1 e, se diferem, gira: as quatro
rotações (simples à esquerda, simples à direita e as duas duplas).

As duas guardam à parte a raiz e o tamanho (não contam). Custo: cada leitura e
cada escrita de uma casa conta 1; seguir um ponteiro é ler um esq ou um dir.
Pedir um nó e soltá-lo não conta. Valor repetido não entra. A mesma estrutura,
contando igual, está em simulacao/instrumentos.js.
"""


class No:
    __slots__ = ("valor", "esq", "dir", "altura")

    def __init__(self):
        self.valor = self.esq = self.dir = None
        self.altura = 0


class _Arvore:
    CASAS = 3

    def __init__(self, conta):
        self.conta = conta
        self.raiz = None
        self.n = 0

    # ---------- as casas de um nó ----------

    def le_valor(self, p):
        self.conta.op("leituras")
        return p.valor

    def le_esq(self, p):
        self.conta.op("leituras")
        return p.esq

    def le_dir(self, p):
        self.conta.op("leituras")
        return p.dir

    def escreve_valor(self, p, x):
        self.conta.op("escritas")
        p.valor = x

    def escreve_esq(self, p, q):
        self.conta.op("escritas")
        p.esq = q

    def escreve_dir(self, p, q):
        self.conta.op("escritas")
        p.dir = q

    # ---------- as operações iguais nas duas ----------

    def buscar(self, x):
        """Desce da raiz: igual, achou; menor, vai para a esquerda; maior, para a direita."""
        p = self.raiz
        while p is not None:
            v = self.le_valor(p)
            if x == v:
                return True
            p = self.le_esq(p) if x < v else self.le_dir(p)
        return False

    def menor(self):
        """Desce sempre pela esquerda: o último nó é o menor."""
        p = self.raiz
        if p is None:
            return None
        while True:
            e = self.le_esq(p)
            if e is None:
                return self.le_valor(p)
            p = e

    def montar(self, valores):
        """Parte da árvore vazia e insere os valores, um por um, na ordem dada."""
        for x in valores:
            self.inserir(x)

    # ---------- sem contar: o que a página e o teste leem ----------

    def valores(self):
        """Em ordem (esquerda, nó, direita), sem recursão: a fila indiana pode ter mil níveis."""
        v, pilha, p = [], [], self.raiz
        while pilha or p is not None:
            while p is not None:
                pilha.append(p)
                p = p.esq
            p = pilha.pop()
            v.append(p.valor)
            p = p.dir
        return v

    def altura(self):
        """Níveis do caminho mais longo da raiz a uma folha (a vazia tem 0)."""
        h, nivel = 0, [self.raiz] if self.raiz is not None else []
        while nivel:
            h += 1
            nivel = [f for p in nivel for f in (p.esq, p.dir) if f is not None]
        return h

    @property
    def capacidade(self):
        return self.CASAS * self.n


class ArvoreComum(_Arvore):
    def nova(self, x):
        """Pede um nó (não conta) e escreve as três casas: o valor e dois nulos."""
        c = No()
        self.escreve_valor(c, x)
        self.escreve_esq(c, None)
        self.escreve_dir(c, None)
        return c

    def inserir(self, x):
        """Desce como na busca e pendura o nó novo onde ela acaba."""
        if self.raiz is None:
            self.raiz = self.nova(x)
            self.n += 1
            return True
        p = self.raiz
        while True:
            v = self.le_valor(p)
            if x == v:
                return False
            if x < v:
                f = self.le_esq(p)
                if f is None:
                    self.escreve_esq(p, self.nova(x))
                    break
            else:
                f = self.le_dir(p)
                if f is None:
                    self.escreve_dir(p, self.nova(x))
                    break
            p = f
        self.n += 1
        return True

    def _liga(self, pai, lado, filho):
        if pai is None:
            self.raiz = filho                # a raiz fica à parte: não conta
        elif lado == "esq":
            self.escreve_esq(pai, filho)
        else:
            self.escreve_dir(pai, filho)

    def remover(self, x):
        """Acha o nó; sem um dos filhos, o outro sobe para o lugar dele. Com os
        dois, o sucessor (o menor da direita) dá o valor e sai no lugar dele."""
        pai, lado, p = None, None, self.raiz
        while p is not None:
            v = self.le_valor(p)
            if x == v:
                break
            pai, lado = p, "esq" if x < v else "dir"
            p = self.le_esq(p) if x < v else self.le_dir(p)
        if p is None:
            return False
        e, d = self.le_esq(p), self.le_dir(p)
        if e is not None and d is not None:
            pai_s, s = p, d
            while True:
                f = self.le_esq(s)
                if f is None:
                    break
                pai_s, s = s, f
            self.escreve_valor(p, self.le_valor(s))
            r = self.le_dir(s)
            if pai_s is p:
                self.escreve_dir(p, r)
            else:
                self.escreve_esq(pai_s, r)
        else:
            self._liga(pai, lado, e if e is not None else d)
        self.n -= 1
        return True


class ArvoreAVL(_Arvore):
    CASAS = 4

    def le_altura(self, p):
        self.conta.op("leituras")
        return p.altura

    def escreve_altura(self, p, h):
        self.conta.op("escritas")
        p.altura = h

    def nova(self, x):
        """Pede um nó (não conta) e escreve as quatro casas: o valor, dois nulos e a altura 1."""
        c = No()
        self.escreve_valor(c, x)
        self.escreve_esq(c, None)
        self.escreve_dir(c, None)
        self.escreve_altura(c, 1)
        return c

    def _h(self, p):
        return 0 if p is None else self.le_altura(p)

    def _atualiza(self, p):
        self.escreve_altura(p, 1 + max(self._h(self.le_esq(p)), self._h(self.le_dir(p))))

    def _gira_dir(self, p):
        """O filho esquerdo sobe: p vira o filho direito dele, e o filho direito dele passa para p."""
        e = self.le_esq(p)
        self.escreve_esq(p, self.le_dir(e))
        self.escreve_dir(e, p)
        self._atualiza(p)
        self._atualiza(e)
        self.conta.op("rotacoes")
        return e

    def _gira_esq(self, p):
        d = self.le_dir(p)
        self.escreve_dir(p, self.le_esq(d))
        self.escreve_esq(d, p)
        self._atualiza(p)
        self._atualiza(d)
        self.conta.op("rotacoes")
        return d

    def equilibra(self, p):
        """Na volta: se um lado ficou 2 níveis mais alto, gira (duas vezes, se o
        neto pesado está do lado de dentro); senão, só reescreve a altura."""
        e, d = self.le_esq(p), self.le_dir(p)
        he, hd = self._h(e), self._h(d)
        if he > hd + 1:
            if self._h(self.le_esq(e)) < self._h(self.le_dir(e)):
                self.escreve_esq(p, self._gira_esq(e))
            return self._gira_dir(p)
        if hd > he + 1:
            if self._h(self.le_dir(d)) < self._h(self.le_esq(d)):
                self.escreve_dir(p, self._gira_dir(d))
            return self._gira_esq(p)
        self.escreve_altura(p, 1 + max(he, hd))
        return p

    def inserir(self, x):
        antes = self.n
        self.raiz = self._inserir(self.raiz, x)   # a raiz fica à parte: não conta
        return self.n > antes

    def _inserir(self, p, x):
        if p is None:
            self.n += 1
            return self.nova(x)
        v = self.le_valor(p)
        if x == v:
            return p
        if x < v:
            e = self.le_esq(p)
            f = self._inserir(e, x)
            if f is not e:
                self.escreve_esq(p, f)
        else:
            d = self.le_dir(p)
            f = self._inserir(d, x)
            if f is not d:
                self.escreve_dir(p, f)
        return self.equilibra(p)

    def remover(self, x):
        antes = self.n
        self.raiz = self._remover(self.raiz, x)
        return self.n < antes

    def _remover(self, p, x):
        if p is None:
            return None
        v = self.le_valor(p)
        if x == v:
            e, d = self.le_esq(p), self.le_dir(p)
            if e is None or d is None:
                self.n -= 1
                return d if e is None else e   # o nó é solto; o filho que houver sobe
            s = d
            while True:
                f = self.le_esq(s)
                if f is None:
                    break
                s = f
            y = self.le_valor(s)
            self.escreve_valor(p, y)
            f = self._remover(d, y)            # tira o sucessor da direita, equilibrando na volta
            if f is not d:
                self.escreve_dir(p, f)
        elif x < v:
            e = self.le_esq(p)
            f = self._remover(e, x)
            if f is not e:
                self.escreve_esq(p, f)
        else:
            d = self.le_dir(p)
            f = self._remover(d, x)
            if f is not d:
                self.escreve_dir(p, f)
        return self.equilibra(p)
