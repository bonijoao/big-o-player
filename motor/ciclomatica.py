"""Complexidade ciclomática de uma função Python, por duas contas.

1. Decisões + 1 (regra de McCabe/radon): cada if, for, while, if-expressão,
   except e operador and/or abre um caminho a mais.
2. Grafo de fluxo de controle: um nó por comando (mais início e fim), um nó
   a mais por and/or de uma condição (o curto-circuito), arestas para onde
   a execução pode seguir; M = arestas - nós + 2.

As duas precisam bater; `medir()` recusa se não baterem. O grafo cobre os
comandos que os algoritmos daqui usam (if/for/while/break/continue/return);
compreensões de lista ficam de fora de propósito (escondem laços).
"""
import ast
import inspect
import textwrap


def _arvore(func):
    fonte = textwrap.dedent(inspect.getsource(func))
    return fonte, ast.parse(fonte).body[0]


def decisoes(no_func):
    """Lista (linha, tipo) de cada ponto de decisão."""
    achadas = []
    for no in ast.walk(no_func):
        if isinstance(no, (ast.If, ast.For, ast.While, ast.IfExp)):
            achadas.append((no.lineno, type(no).__name__.lower()))
        elif isinstance(no, ast.ExceptHandler):
            achadas.append((no.lineno, "except"))
        elif isinstance(no, ast.BoolOp):
            achadas += [(no.lineno, "and/or")] * (len(no.values) - 1)
        elif isinstance(no, ast.comprehension):
            raise ValueError("compreensão de lista: reescreva como laço explícito")
    return sorted(achadas)


class _Grafo:
    def __init__(self):
        self.nos = []      # (id, linha, rótulo)
        self.arestas = []  # (de, para, tipo)

    def no(self, linha, rotulo):
        self.nos.append((len(self.nos), linha, rotulo))
        return len(self.nos) - 1

    def liga(self, de, para, tipo="segue"):
        self.arestas.append((de, para, tipo))


def _condicao(g, c, entram):
    """Nós do teste de um if/while. Um `a and b` (ou `a or b`) vira uma
    cadeia de nós, porque o curto-circuito cria um caminho a mais.
    Devolve (primeiro nó, nós que entram no corpo, nós que saem pelo falso)."""
    teste = c.test
    partes = teste.values if isinstance(teste, ast.BoolOp) else [teste]
    if any(isinstance(n, ast.BoolOp) for p in partes for n in ast.walk(p)):
        raise ValueError(f"linha {c.lineno}: and/or aninhado; simplifique a condição")
    e = isinstance(teste, ast.BoolOp) and isinstance(teste.op, ast.And)
    nos = []
    for k, _ in enumerate(partes):
        rot = type(c).__name__.lower() if k == 0 else ("e" if e else "ou")
        n = g.no(c.lineno, rot)
        for x in (entram if k == 0 else [nos[-1]]):
            g.liga(x, n)
        nos.append(n)
    if e:          # todos verdadeiros entram; qualquer falso sai
        return nos[0], [nos[-1]], nos
    return nos[0], nos, [nos[-1]]   # or: qualquer verdadeiro entra


def _bloco(g, comandos, entram, laco, fim):
    """Liga `entram` ao primeiro comando; devolve os nós que seguem adiante."""
    for c in comandos:
        if isinstance(c, (ast.If, ast.While)):
            n, verdade, falso = _condicao(g, c, entram)
        else:
            n = g.no(c.lineno, type(c).__name__.lower())
            for e in entram:
                g.liga(e, n)
            verdade = falso = [n]
        if isinstance(c, ast.If):
            entao = _bloco(g, c.body, verdade, laco, fim)
            senao = _bloco(g, c.orelse, falso, laco, fim) if c.orelse else falso
            entram = entao + senao
        elif isinstance(c, (ast.For, ast.While)):
            saidas = []
            corpo = _bloco(g, c.body, verdade, (n, saidas), fim)
            for e in corpo:
                g.liga(e, n, "volta")
            entram = falso + saidas
        elif isinstance(c, ast.Break):
            laco[1].append(n)
            entram = []
        elif isinstance(c, ast.Continue):
            g.liga(n, laco[0], "volta")
            entram = []
        elif isinstance(c, ast.Return):
            g.liga(n, fim)
            entram = []
        elif isinstance(c, (ast.Try, ast.With, ast.Match)):
            raise ValueError(f"comando sem suporte no grafo: {type(c).__name__}")
        else:
            entram = [n]
    return entram


def medir(func):
    fonte, no_func = _arvore(func)
    g = _Grafo()
    inicio = g.no(no_func.lineno, "início")
    # o nó de fim é criado por último (fica no fim da lista); até lá, vale -1
    saidas = _bloco(g, no_func.body, [inicio], None, -1)
    fim = g.no(no_func.end_lineno + 1, "fim")
    g.arestas = [(a, fim if b == -1 else b, t) for a, b, t in g.arestas]
    for e in saidas:
        g.liga(e, fim)
    pelo_grafo = len(g.arestas) - len(g.nos) + 2
    lista = decisoes(no_func)
    if pelo_grafo != len(lista) + 1:
        raise AssertionError(f"grafo dá {pelo_grafo}, decisões dão {len(lista) + 1}")
    return {
        "M": pelo_grafo,
        "nos": len(g.nos),
        "arestas": len(g.arestas),
        "decisoes": [{"linha": l, "tipo": t} for l, t in lista],
        "grafo": {
            "nos": [{"id": i, "linha": l, "rotulo": r} for i, l, r in g.nos],
            "arestas": [{"de": a, "para": b, "tipo": t} for a, b, t in g.arestas],
        },
        "codigo": fonte,
    }
