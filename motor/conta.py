"""Contador que o algoritmo carrega enquanto roda.

Tempo: cada operação contada passa por `op()`.
Memória: cada lista auxiliar passa por `aloca()`; o tamanho é o número de
valores guardados (listas aninhadas somam os elementos). Uma estrutura que
cresce e encolhe (pilha, fila) avisa quantos valores guarda com `ocupa()`. Variáveis escalares
(índices, a menor distância da vez) não contam: são O(1).
Recursão: `entra()`/`sai()` contam cada nível ativo da pilha como 1 valor.
Fotos e eventos: `foto()` e `evento()` guardam o estado para o vídeo, sem
influir na contagem.
"""
import copy


def tamanho(valor):
    if isinstance(valor, (list, tuple)):
        return sum(tamanho(v) for v in valor)
    return 1


class Contador:
    def __init__(self):
        self.ops = {}
        self.vivos = {}
        self.pico = 0
        self.pico_detalhe = {}
        self.fotos = []
        self.gravar = False   # eventos só para o vídeo; desligado nas séries grandes
        self.eventos = []

    def op(self, nome, n=1):
        self.ops[nome] = self.ops.get(nome, 0) + n

    def aloca(self, nome, valor):
        """Registra a lista `nome` (substitui a anterior de mesmo nome)."""
        self.vivos[nome] = tamanho(valor)
        self._confere_pico()
        return valor

    def ocupa(self, nome, n):
        """Registra que a estrutura `nome` guarda n valores agora."""
        self.vivos[nome] = n
        self._confere_pico()

    def _confere_pico(self):
        total = sum(self.vivos.values())
        if total > self.pico:
            self.pico = total
            self.pico_detalhe = dict(self.vivos)

    def foto(self, **estado):
        self.fotos.append({**copy.deepcopy(estado), "ops": dict(self.ops)})

    # recursão: cada nível ativo na pilha de chamadas conta como 1 valor
    def entra(self, *faixa):
        self.vivos["pilha"] = self.vivos.get("pilha", 0) + 1
        self._confere_pico()
        self.evento("entra", *faixa)

    def sai(self):
        self.vivos["pilha"] -= 1
        self.evento("sai")

    def evento(self, *e):
        if self.gravar:
            self.eventos.append(list(e))
