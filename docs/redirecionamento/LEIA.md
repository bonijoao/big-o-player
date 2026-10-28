# Redirecionar o endereço antigo

O repositório foi renomeado de `eh-complexo-baby` para `big-o-player`, e o GitHub Pages não redireciona repositórios renomeados: `https://uaipedro.github.io/eh-complexo-baby/` dá 404.

O `index.html` desta pasta leva ao endereço novo mantendo o `#` (por exemplo, `#busca/busca-binaria`). O site novo redireciona as rotas antigas de álbum e de instrumento para as playlists e as estruturas.

Passo a passo (só o Pedro, porque cria um repositório público):

1. No GitHub, crie um repositório público vazio chamado `eh-complexo-baby` em `uaipedro`.
2. Suba só o `index.html` desta pasta, na raiz:

   ```bash
   mkdir /tmp/eh-complexo-baby && cp docs/redirecionamento/index.html /tmp/eh-complexo-baby/ && cd /tmp/eh-complexo-baby && git init -b main && git add index.html && git commit -m "Redireciona para big-o-player" && git remote add origin git@github.com:uaipedro/eh-complexo-baby.git && git push -u origin main
   ```

3. Em Settings → Pages, publique a branch `main`, pasta `/ (root)`.
4. Teste `https://uaipedro.github.io/eh-complexo-baby/#k-means`: tem que abrir o K-means no endereço novo.

Atenção: criar um repositório com o nome antigo faz o GitHub parar de redirecionar `github.com/uaipedro/eh-complexo-baby` para `big-o-player` (os links do código, não os do site).
