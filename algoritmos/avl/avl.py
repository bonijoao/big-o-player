"""Árvore equilibrada (AVL): insere como na árvore de busca comum, descendo e
comparando, mas na volta da recursão cada nó do caminho confere as alturas dos
dois lados. Se um ficou dois níveis mais alto, gira: o filho do lado pesado
sobe e o nó desce (rotação simples), ou o neto sobe primeiro (dupla). A árvore
nunca passa de 1,44 log₂ n níveis, em qualquer ordem de chegada. Roda sobre a
AVL do instrumento Árvore de busca, que guarda a altura de cada nó e sabe girar."""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(AQUI, "..", "..", "motor")]


def inserir(arvore, p, x, conta):
    conta.entra()
    if p is None:
        conta.sai()
        return arvore.nova(x)
    v = arvore.le_valor(p)
    conta.op("comparacoes")
    if x == v:
        conta.sai()
        return p
    conta.op("comparacoes")
    if x < v:
        e = arvore.le_esq(p)
        f = inserir(arvore, e, x, conta)
        if f is not e:
            arvore.escreve_esq(p, f)
    else:
        d = arvore.le_dir(p)
        f = inserir(arvore, d, x, conta)
        if f is not d:
            arvore.escreve_dir(p, f)
    conta.sai()
    return arvore.equilibra(p)


MEDIDA = inserir


def inserir_comum(arvore, x, conta):
    """A mesma descida na árvore comum, contando as mesmas comparações, para
    comparar; quem pendura o nó é o próprio instrumento (o custo dele não entra aqui)."""
    p = arvore.raiz
    while p is not None:
        v = arvore.le_valor(p)
        conta.op("comparacoes")
        if x == v:
            return
        conta.op("comparacoes")
        p = arvore.le_esq(p) if x < v else arvore.le_dir(p)
    arvore.inserir(x)
