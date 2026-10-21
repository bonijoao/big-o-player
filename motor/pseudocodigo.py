"""Pseudocódigo em português: leitura, árvore do fluxograma e M.

Formato (indentação de 4 espaços, como em Python):

    procedimento nome(args):
        x ← 1                         passo (retângulo)
        nome(v, a, m)                 chamada a si mesmo (sub-rotina)
        para i de 1 até n:            laço (losango + seta de volta)
        enquanto A e B:               laço; "e"/"ou" viram losangos encadeados
        se A:                         decisão
        senão se B:  /  senão:        outros ramos
        pare                          sai do laço mais próximo
        devolva x                     último passo

Só nas linhas de `se` e `enquanto`, " e " e " ou " são operadores lógicos.

O fluxograma é a árvore devolvida por `ler()`. O M sai do próprio fluxograma
por duas contas, como no código: decisões + 1 e arestas − nós + 2.
"""
import re

LACOS = ("para ", "enquanto ")


def _nivel(linha):
    espacos = len(linha) - len(linha.lstrip(" "))
    if espacos % 4:
        raise ValueError(f"indentação que não é múltipla de 4: {linha!r}")
    return espacos // 4


def _condicoes(texto, linha):
    if " ou " in f" {texto} ":
        raise ValueError(f"linha {linha}: 'ou' ainda não é desenhado no fluxograma; reescreva com 'se' separados")
    op = "ou" if " ou " in texto else "e"
    partes = [p.strip() for p in re.split(rf"\s+{op}\s+", texto)]
    return op, partes


def ler(texto):
    """Devolve {"assinatura", "nome", "arvore", "linhas"}."""
    linhas = [l.rstrip() for l in texto.strip("\n").split("\n")]
    cab = linhas[0].strip()
    m = re.match(r"procedimento\s+(\S+?)\((.*)\):$", cab)
    if not m:
        raise ValueError("a primeira linha deve ser 'procedimento nome(args):'")
    nome = m.group(1)
    itens = [(i + 1, _nivel(l), l.strip()) for i, l in enumerate(linhas) if l.strip()][1:]

    def bloco(pos, nivel):
        seq = []
        if pos >= len(itens) or itens[pos][1] < nivel:
            linha = itens[pos - 1][0] if pos else 1
            raise ValueError(f"linha {linha}: bloco sem corpo")
        while pos < len(itens) and itens[pos][1] >= nivel:
            if seq and seq[-1]["tipo"] in ("pare", "devolva"):
                raise ValueError(f"linha {itens[pos][0]}: nada pode vir depois de '{seq[-1]['tipo']}' no mesmo bloco")
            num, niv, t = itens[pos]
            if niv > nivel:
                raise ValueError(f"linha {num}: indentação inesperada")
            corpo = t[:-1].strip() if t.endswith(":") else None
            if corpo is None and re.match(r"(se|senão|para|enquanto)\b", t):
                raise ValueError(f"linha {num}: '{t.split()[0]}' sem dois-pontos no fim")
            if t.startswith("se ") and corpo is not None:
                op, conds = _condicoes(corpo[3:], num)
                entao, pos = bloco(pos + 1, nivel + 1)
                no = {"tipo": "se", "linha": num, "op": op, "conds": conds, "entao": entao, "senao": None}
                atual = no
                while pos < len(itens) and itens[pos][1] == nivel and itens[pos][2].startswith("senão"):
                    num2, _, t2 = itens[pos]
                    if t2.startswith("senão se ") and t2.endswith(":"):
                        op2, conds2 = _condicoes(t2[9:-1].strip(), num2)
                        ent2, pos = bloco(pos + 1, nivel + 1)
                        novo = {"tipo": "se", "linha": num2, "op": op2, "conds": conds2, "entao": ent2, "senao": None}
                        atual["senao"] = [novo]
                        atual = novo
                    elif t2 == "senão:":
                        atual["senao"], pos = bloco(pos + 1, nivel + 1)
                        break
                    else:
                        raise ValueError(f"linha {num2}: 'senão' mal formado")
                seq.append(no)
            elif t.startswith(LACOS) and corpo is not None:
                rot = "para" if t.startswith("para ") else "enquanto"
                if rot == "para":
                    op, conds = "e", [corpo]
                else:
                    op, conds = _condicoes(corpo[len("enquanto "):], num)
                c, pos = bloco(pos + 1, nivel + 1)
                seq.append({"tipo": "laco", "rotulo": rot, "linha": num, "op": op, "conds": conds, "corpo": c})
            elif t == "pare":
                seq.append({"tipo": "pare", "linha": num})
                pos += 1
            elif t.startswith("devolva"):
                if nivel != 1:
                    raise ValueError(f"linha {num}: 'devolva' só no fim do procedimento")
                seq.append({"tipo": "devolva", "linha": num, "texto": t})
                pos += 1
            elif corpo is not None:
                raise ValueError(f"linha {num}: bloco que não é se/senão/para/enquanto")
            else:
                seq.append({"tipo": "acao", "linha": num, "texto": t, "chamada": t.startswith(nome + "(")})
                pos += 1
        return seq, pos

    arvore, pos = bloco(0, 1)
    if pos != len(itens):
        raise ValueError(f"linha {itens[pos][0]}: fora do procedimento")
    return {"assinatura": cab[len("procedimento "):-1], "nome": nome, "arvore": arvore,
            "linhas": linhas}


# ---------- M pelo fluxograma ----------

def medir(lido):
    """Monta o grafo do fluxograma (um nó por caixa e por losango) e conta M
    de duas formas. Devolve {"M", "nos", "arestas", "decisoes"}."""
    nos, arestas, decisoes = [], [], []

    def no():
        nos.append(len(nos))
        return nos[-1]

    def liga(de, para):
        arestas.append((de, para))

    def condicoes(item, entram):
        """Losangos encadeados; devolve (primeiro, entram no corpo, saem pelo falso)."""
        cs = []
        for k, _ in enumerate(item["conds"]):
            n = no()
            decisoes.append(item["linha"])
            for e in (entram if k == 0 else [cs[-1]]):
                liga(e, n)
            cs.append(n)
        if item["op"] == "e":
            return cs[0], [cs[-1]], cs
        return cs[0], cs, [cs[-1]]

    def bloco(seq, entram, laco):
        for item in seq:
            t = item["tipo"]
            if t == "se":
                _, verdade, falso = condicoes(item, entram)
                entao = bloco(item["entao"], verdade, laco)
                senao = bloco(item["senao"], falso, laco) if item["senao"] else falso
                entram = entao + senao
            elif t == "laco":
                primeiro, verdade, falso = condicoes(item, entram)
                saidas = []
                corpo = bloco(item["corpo"], verdade, saidas)
                for e in corpo:
                    liga(e, primeiro)
                entram = falso + saidas
            elif t == "pare":
                n = no()
                for e in entram:
                    liga(e, n)
                if laco is None:
                    raise ValueError(f"linha {item['linha']}: 'pare' fora de laço")
                laco.append(n)
                entram = []
            else:
                n = no()
                for e in entram:
                    liga(e, n)
                entram = [n]
        return entram

    inicio = no()
    saidas = bloco(lido["arvore"], [inicio], None)
    fim = no()
    for e in saidas:
        liga(e, fim)
    pelo_grafo = len(arestas) - len(nos) + 2
    if pelo_grafo != len(decisoes) + 1:
        raise AssertionError(f"fluxograma: grafo dá {pelo_grafo}, decisões dão {len(decisoes) + 1}")
    return {"M": pelo_grafo, "nos": len(nos), "arestas": len(arestas), "decisoes": decisoes}
