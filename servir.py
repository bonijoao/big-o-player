"""Serve a galeria localmente com suporte a pedidos por trecho (Range).

O `python3 -m http.server` não atende Range; sem isso o navegador não deixa
pular para uma parte do vídeo que ainda não baixou, e o seletor de tempo do
player fica preso. Rodar da raiz: python3 servir.py [porta]  (padrão 8765)
"""
import http.server
import os
import re
import sys


class ComTrechos(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        trecho = self.headers.get("Range")
        caminho = self.translate_path(self.path)
        if not trecho or not os.path.isfile(caminho):
            return super().send_head()
        m = re.match(r"bytes=(\d*)-(\d*)$", trecho.strip())
        tamanho = os.path.getsize(caminho)
        if not m or (not m.group(1) and not m.group(2)):
            self.send_error(416, "Range inválido")
            return None
        if m.group(1):
            ini = int(m.group(1))
            fim = int(m.group(2)) if m.group(2) else tamanho - 1
        else:                                   # bytes=-N: os últimos N
            ini, fim = max(0, tamanho - int(m.group(2))), tamanho - 1
        fim = min(fim, tamanho - 1)
        if ini > fim:
            self.send_response(416)
            self.send_header("Content-Range", f"bytes */{tamanho}")
            self.end_headers()
            return None
        f = open(caminho, "rb")
        f.seek(ini)
        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(caminho))
        self.send_header("Content-Range", f"bytes {ini}-{fim}/{tamanho}")
        self.send_header("Content-Length", str(fim - ini + 1))
        self.send_header("Accept-Ranges", "bytes")
        self.end_headers()
        self.restante = fim - ini + 1
        return f

    def copyfile(self, origem, destino):
        restante = getattr(self, "restante", None)
        if restante is None:
            return super().copyfile(origem, destino)
        while restante > 0:
            bloco = origem.read(min(64 * 1024, restante))
            if not bloco:
                break
            destino.write(bloco)
            restante -= len(bloco)

    def end_headers(self):
        if not self.headers.get("Range"):
            self.send_header("Accept-Ranges", "bytes")
        super().end_headers()


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    porta = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    print(f"galeria em http://127.0.0.1:{porta}/")
    http.server.ThreadingHTTPServer(("127.0.0.1", porta), ComTrechos).serve_forever()
