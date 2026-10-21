// gerado por gerar.py; não editar à mão
window.GALERIA = [
 {
  "ciclomatica": {
   "porque": "Cada for, while e if, e cada and/or numa condição, abre um caminho a mais pelo código. A complexidade ciclomática conta os caminhos independentes: qualquer percurso pela função é uma combinação deles. É um teto para quantos testes cobrem todos os ramos, não o mínimo.",
   "regra": "Regra de contagem: +1 por for, while, if, if-expressão, except e cada and/or. Compreensões de lista são proibidas na função medida, porque escondem um laço que o grafo não veria."
  },
  "alg": "bolha",
  "id": "bubble-sort",
  "nome": "Bubble sort",
  "variante": "com parada antecipada",
  "familia": "ordenação",
  "resumo": "Compara vizinhos e troca os que estão fora de ordem. Cada passada leva o maior número que sobrou para o fim; se uma passada não troca nada, o vetor está pronto.",
  "tempo": {
   "notacao": "O(n²)",
   "porque": "Cada passada compara os vizinhos da parte que ainda não está no fim, e são até n − 1 passadas: somadas, dão n(n − 1)/2 comparações no pior caso.",
   "nota": "Melhor caso: vetor já ordenado. A primeira passada não troca nada e o algoritmo para depois de n − 1 comparações, O(n)."
  },
  "memoria": {
   "notacao": "O(1)",
   "porque": "Troca os números dentro do próprio vetor. Só guarda índices soltos, que não crescem com n.",
   "nomes": {
    "auxiliar": "lista auxiliar (uma posição por número)",
    "pilha": "níveis da pilha de recursão"
   }
  },
  "video": {
   "ideia": [
    "compara dois vizinhos; se estão fora de ordem, troca",
    "cada passada leva o maior que sobrou para o fim"
   ]
  },
  "placa": {
   "autor": "autoria incerta",
   "ano": "anos 1950; o nome bubble sort aparece em 1962, com Kenneth Iverson"
  },
  "poster": "algoritmos/bolha/bolha.png",
  "exemplo": {
   "dados": "24 números (de 0 a 23) embaralhados com a semente 11",
   "n": 24,
   "semente": 11,
   "vetor": [
    13,
    19,
    20,
    3,
    22,
    8,
    0,
    11,
    4,
    7,
    1,
    2,
    12,
    9,
    10,
    15,
    5,
    6,
    18,
    16,
    21,
    23,
    17,
    14
   ],
   "ops": 210,
   "movimentos": 111,
   "movimento": "trocas"
  },
  "medido": {
   "tempo": {
    "unidade": "comparações",
    "tipo": "ordenacao",
    "crescimento": [
     {
      "n": 16,
      "aleatorio": {
       "media": 113.1,
       "min": 99,
       "max": 120,
       "movimentos": 62.3,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 15,
       "movimentos": 0,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 120,
       "movimentos": 120,
       "pico": 0
      }
     },
     {
      "n": 32,
      "aleatorio": {
       "media": 480.1,
       "min": 460,
       "max": 495,
       "movimentos": 260.9,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 31,
       "movimentos": 0,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 496,
       "movimentos": 496,
       "pico": 0
      }
     },
     {
      "n": 64,
      "aleatorio": {
       "media": 1987.3,
       "min": 1961,
       "max": 2010,
       "movimentos": 1014.2,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 63,
       "movimentos": 0,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 2016,
       "movimentos": 2016,
       "pico": 0
      }
     },
     {
      "n": 128,
      "aleatorio": {
       "media": 8074.3,
       "min": 8037,
       "max": 8118,
       "movimentos": 4095.2,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 127,
       "movimentos": 0,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 8128,
       "movimentos": 8128,
       "pico": 0
      }
     },
     {
      "n": 256,
      "aleatorio": {
       "media": 32523.2,
       "min": 32387,
       "max": 32630,
       "movimentos": 16452.9,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 255,
       "movimentos": 0,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 32640,
       "movimentos": 32640,
       "pico": 0
      }
     },
     {
      "n": 512,
      "aleatorio": {
       "media": 130572.5,
       "min": 130288,
       "max": 130806,
       "movimentos": 65312.4,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 511,
       "movimentos": 0,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 130816,
       "movimentos": 130816,
       "pico": 0
      }
     },
     {
      "n": 1024,
      "aleatorio": {
       "media": 523183.7,
       "min": 522345,
       "max": 523766,
       "movimentos": 262166.4,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 1023,
       "movimentos": 0,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 523776,
       "movimentos": 523776,
       "pico": 0
      }
     }
    ],
    "crescimento_dados": "Aleatório: média de 10 vetores embaralhados por tamanho; ordenado e invertido: um vetor cada",
    "distribuicao": {
     "n": 24,
     "vetores": 200,
     "comparacoes": [
      270,
      276,
      255,
      266,
      266,
      273,
      266,
      261,
      261,
      275,
      210,
      255,
      248,
      273,
      276,
      255,
      231,
      270,
      275,
      261,
      266,
      275,
      275,
      248,
      276,
      255,
      255,
      273,
      273,
      273,
      276,
      275,
      261,
      273,
      261,
      275,
      270,
      261,
      273,
      270,
      248,
      275,
      276,
      261,
      261,
      275,
      273,
      261,
      275,
      240,
      255,
      275,
      255,
      270,
      275,
      276,
      276,
      261,
      273,
      255,
      261,
      270,
      255,
      270,
      231,
      275,
      275,
      261,
      275,
      273,
      273,
      275,
      270,
      266,
      266,
      261,
      248,
      270,
      270,
      248,
      255,
      270,
      270,
      273,
      261,
      276,
      270,
      270,
      275,
      270,
      275,
      231,
      261,
      266,
      266,
      248,
      270,
      273,
      248,
      270,
      261,
      270,
      266,
      276,
      270,
      275,
      255,
      270,
      261,
      240,
      261,
      210,
      276,
      266,
      266,
      270,
      261,
      255,
      261,
      248,
      275,
      261,
      276,
      275,
      255,
      275,
      276,
      261,
      270,
      266,
      266,
      270,
      248,
      266,
      221,
      270,
      275,
      261,
      276,
      276,
      276,
      231,
      275,
      275,
      275,
      270,
      261,
      270,
      275,
      248,
      240,
      261,
      273,
      261,
      210,
      248,
      270,
      270,
      261,
      273,
      255,
      276,
      240,
      273,
      276,
      266,
      273,
      270,
      248,
      261,
      261,
      261,
      248,
      276,
      273,
      276,
      261,
      273,
      270,
      273,
      270,
      240,
      275,
      276,
      273,
      248,
      266,
      273,
      261,
      275,
      248,
      270,
      255,
      273,
      273,
      273,
      276,
      276,
      270,
      276
     ]
    }
   },
   "memoria": {
    "pico": 0,
    "detalhe": {}
   },
   "ciclomatica": {
    "M": 5,
    "nos": 10,
    "arestas": 13,
    "decisoes": [
     {
      "linha": 2,
      "tipo": "for"
     },
     {
      "linha": 4,
      "tipo": "for"
     },
     {
      "linha": 5,
      "tipo": "if"
     },
     {
      "linha": 8,
      "tipo": "if"
     }
    ],
    "grafo": {
     "nos": [
      {
       "id": 0,
       "linha": 1,
       "rotulo": "início"
      },
      {
       "id": 1,
       "linha": 2,
       "rotulo": "for"
      },
      {
       "id": 2,
       "linha": 3,
       "rotulo": "assign"
      },
      {
       "id": 3,
       "linha": 4,
       "rotulo": "for"
      },
      {
       "id": 4,
       "linha": 5,
       "rotulo": "if"
      },
      {
       "id": 5,
       "linha": 6,
       "rotulo": "expr"
      },
      {
       "id": 6,
       "linha": 7,
       "rotulo": "assign"
      },
      {
       "id": 7,
       "linha": 8,
       "rotulo": "if"
      },
      {
       "id": 8,
       "linha": 9,
       "rotulo": "break"
      },
      {
       "id": 9,
       "linha": 10,
       "rotulo": "fim"
      }
     ],
     "arestas": [
      {
       "de": 0,
       "para": 1,
       "tipo": "segue"
      },
      {
       "de": 1,
       "para": 2,
       "tipo": "segue"
      },
      {
       "de": 2,
       "para": 3,
       "tipo": "segue"
      },
      {
       "de": 3,
       "para": 4,
       "tipo": "segue"
      },
      {
       "de": 4,
       "para": 5,
       "tipo": "segue"
      },
      {
       "de": 5,
       "para": 6,
       "tipo": "segue"
      },
      {
       "de": 6,
       "para": 3,
       "tipo": "volta"
      },
      {
       "de": 4,
       "para": 3,
       "tipo": "volta"
      },
      {
       "de": 3,
       "para": 7,
       "tipo": "segue"
      },
      {
       "de": 7,
       "para": 8,
       "tipo": "segue"
      },
      {
       "de": 7,
       "para": 1,
       "tipo": "volta"
      },
      {
       "de": 1,
       "para": 9,
       "tipo": "segue"
      },
      {
       "de": 8,
       "para": 9,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def bolha(v, conta):\n    for fim in range(len(v) - 1, 0, -1):\n        trocou = False\n        for i in range(fim):\n            if maior(v, i, i + 1, conta):\n                troca(v, i, i + 1, conta)\n                trocou = True\n        if not trocou:\n            break\n"
   }
  },
  "conferencia": {
   "referencia": "bolha_r() (reimplementação em R) e sort()",
   "versao_r": "4.6.0",
   "vetores": 7,
   "tudo_ok": true,
   "resumo": "Reescrito em R 4.6.0 e rodado em 7 vetores de 50 números (5 embaralhados, 1 ordenado, 1 invertido): a ordem final bate com sort() e as comparações e os movimentos batem um a um com o Python."
  },
  "pseudocodigo": {
   "assinatura": "bubble_sort(v)",
   "nome": "bubble_sort",
   "arvore": [
    {
     "tipo": "laco",
     "rotulo": "para",
     "linha": 2,
     "op": "e",
     "conds": [
      "para fim de n − 1 descendo até 1"
     ],
     "corpo": [
      {
       "tipo": "acao",
       "linha": 3,
       "texto": "trocou ← falso",
       "chamada": false
      },
      {
       "tipo": "laco",
       "rotulo": "para",
       "linha": 4,
       "op": "e",
       "conds": [
        "para i de 1 até fim"
       ],
       "corpo": [
        {
         "tipo": "se",
         "linha": 5,
         "op": "e",
         "conds": [
          "v[i] > v[i + 1]"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 6,
           "texto": "troque v[i] com v[i + 1]",
           "chamada": false
          },
          {
           "tipo": "acao",
           "linha": 7,
           "texto": "trocou ← verdadeiro",
           "chamada": false
          }
         ],
         "senao": null
        }
       ]
      },
      {
       "tipo": "se",
       "linha": 8,
       "op": "e",
       "conds": [
        "não trocou"
       ],
       "entao": [
        {
         "tipo": "pare",
         "linha": 9
        }
       ],
       "senao": null
      }
     ]
    }
   ],
   "linhas": [
    "procedimento bubble_sort(v):",
    "    para fim de n − 1 descendo até 1:",
    "        trocou ← falso",
    "        para i de 1 até fim:",
    "            se v[i] > v[i + 1]:",
    "                troque v[i] com v[i + 1]",
    "                trocou ← verdadeiro",
    "        se não trocou:",
    "            pare"
   ],
   "M": 5,
   "nos": 10,
   "arestas": 13,
   "decisoes": [
    2,
    4,
    5,
    8
   ]
  }
 },
 {
  "ciclomatica": {
   "porque": "Cada for, while e if, e cada and/or numa condição, abre um caminho a mais pelo código. A complexidade ciclomática conta os caminhos independentes: qualquer percurso pela função é uma combinação deles. É um teto para quantos testes cobrem todos os ramos, não o mínimo.",
   "regra": "Regra de contagem: +1 por for, while, if, if-expressão, except e cada and/or. Compreensões de lista são proibidas na função medida, porque escondem um laço que o grafo não veria."
  },
  "alg": "insercao",
  "id": "insertion-sort",
  "nome": "Insertion sort",
  "variante": "com trocas entre vizinhos",
  "familia": "ordenação",
  "resumo": "Pega o próximo número e o faz descer, trocando com o vizinho da esquerda, até encontrar alguém menor. A parte da esquerda fica sempre ordenada.",
  "tempo": {
   "notacao": "O(n²)",
   "porque": "Cada número desce até encontrar o seu lugar: em média passa por metade dos que já estão ordenados, o que soma cerca de n²/4 comparações; no pior caso (vetor invertido), n(n − 1)/2.",
   "nota": "Melhor caso: vetor já ordenado. Cada número compara uma vez com o vizinho e fica onde está: n − 1 comparações, O(n)."
  },
  "memoria": {
   "notacao": "O(1)",
   "porque": "Também troca dentro do próprio vetor; só guarda índices soltos.",
   "nomes": {
    "auxiliar": "lista auxiliar (uma posição por número)",
    "pilha": "níveis da pilha de recursão"
   }
  },
  "video": {
   "ideia": [
    "o próximo número desce até achar alguém menor",
    "a esquerda fica sempre ordenada"
   ]
  },
  "placa": {
   "autor": "método tradicional",
   "ano": "anterior aos computadores"
  },
  "poster": "algoritmos/insercao/insercao.png",
  "exemplo": {
   "dados": "24 números (de 0 a 23) embaralhados com a semente 11",
   "n": 24,
   "semente": 11,
   "vetor": [
    13,
    19,
    20,
    3,
    22,
    8,
    0,
    11,
    4,
    7,
    1,
    2,
    12,
    9,
    10,
    15,
    5,
    6,
    18,
    16,
    21,
    23,
    17,
    14
   ],
   "ops": 132,
   "movimentos": 111,
   "movimento": "trocas"
  },
  "medido": {
   "tempo": {
    "unidade": "comparações",
    "tipo": "ordenacao",
    "crescimento": [
     {
      "n": 16,
      "aleatorio": {
       "media": 74.9,
       "min": 56,
       "max": 92,
       "movimentos": 62.3,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 15,
       "movimentos": 0,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 120,
       "movimentos": 120,
       "pico": 0
      }
     },
     {
      "n": 32,
      "aleatorio": {
       "media": 289.3,
       "min": 245,
       "max": 326,
       "movimentos": 260.9,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 31,
       "movimentos": 0,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 496,
       "movimentos": 496,
       "pico": 0
      }
     },
     {
      "n": 64,
      "aleatorio": {
       "media": 1073.4,
       "min": 908,
       "max": 1219,
       "movimentos": 1014.2,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 63,
       "movimentos": 0,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 2016,
       "movimentos": 2016,
       "pico": 0
      }
     },
     {
      "n": 128,
      "aleatorio": {
       "media": 4217.5,
       "min": 3737,
       "max": 4522,
       "movimentos": 4095.2,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 127,
       "movimentos": 0,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 8128,
       "movimentos": 8128,
       "pico": 0
      }
     },
     {
      "n": 256,
      "aleatorio": {
       "media": 16703.4,
       "min": 14796,
       "max": 17621,
       "movimentos": 16452.9,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 255,
       "movimentos": 0,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 32640,
       "movimentos": 32640,
       "pico": 0
      }
     },
     {
      "n": 512,
      "aleatorio": {
       "media": 65816.8,
       "min": 60825,
       "max": 68601,
       "movimentos": 65312.4,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 511,
       "movimentos": 0,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 130816,
       "movimentos": 130816,
       "pico": 0
      }
     },
     {
      "n": 1024,
      "aleatorio": {
       "media": 263181.9,
       "min": 253858,
       "max": 271664,
       "movimentos": 262166.4,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 1023,
       "movimentos": 0,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 523776,
       "movimentos": 523776,
       "pico": 0
      }
     }
    ],
    "crescimento_dados": "Aleatório: média de 10 vetores embaralhados por tamanho; ordenado e invertido: um vetor cada",
    "distribuicao": {
     "n": 24,
     "vetores": 200,
     "comparacoes": [
      188,
      163,
      163,
      198,
      168,
      189,
      194,
      183,
      161,
      156,
      132,
      149,
      167,
      156,
      182,
      142,
      156,
      173,
      160,
      192,
      139,
      182,
      157,
      124,
      165,
      146,
      159,
      167,
      144,
      158,
      182,
      232,
      117,
      177,
      140,
      202,
      155,
      148,
      165,
      175,
      152,
      186,
      195,
      169,
      169,
      165,
      166,
      146,
      179,
      143,
      107,
      182,
      136,
      148,
      168,
      142,
      181,
      125,
      159,
      161,
      149,
      173,
      160,
      148,
      137,
      157,
      150,
      131,
      196,
      148,
      170,
      172,
      167,
      178,
      129,
      169,
      164,
      199,
      157,
      127,
      145,
      169,
      161,
      177,
      126,
      177,
      169,
      187,
      150,
      147,
      144,
      143,
      163,
      178,
      136,
      170,
      164,
      168,
      158,
      170,
      150,
      142,
      146,
      186,
      162,
      178,
      144,
      168,
      143,
      156,
      149,
      133,
      152,
      169,
      155,
      139,
      158,
      140,
      159,
      160,
      148,
      177,
      174,
      176,
      151,
      147,
      162,
      151,
      157,
      166,
      185,
      176,
      138,
      165,
      138,
      158,
      186,
      160,
      127,
      186,
      131,
      107,
      199,
      172,
      162,
      169,
      135,
      142,
      221,
      179,
      139,
      176,
      164,
      124,
      115,
      169,
      140,
      158,
      145,
      153,
      146,
      146,
      145,
      177,
      189,
      150,
      148,
      156,
      138,
      159,
      130,
      146,
      133,
      173,
      174,
      199,
      139,
      158,
      185,
      170,
      147,
      155,
      183,
      162,
      143,
      146,
      147,
      151,
      154,
      196,
      158,
      147,
      166,
      158,
      151,
      158,
      191,
      148,
      144,
      197
     ]
    }
   },
   "memoria": {
    "pico": 0,
    "detalhe": {}
   },
   "ciclomatica": {
    "M": 4,
    "nos": 8,
    "arestas": 10,
    "decisoes": [
     {
      "linha": 2,
      "tipo": "for"
     },
     {
      "linha": 4,
      "tipo": "and/or"
     },
     {
      "linha": 4,
      "tipo": "while"
     }
    ],
    "grafo": {
     "nos": [
      {
       "id": 0,
       "linha": 1,
       "rotulo": "início"
      },
      {
       "id": 1,
       "linha": 2,
       "rotulo": "for"
      },
      {
       "id": 2,
       "linha": 3,
       "rotulo": "assign"
      },
      {
       "id": 3,
       "linha": 4,
       "rotulo": "while"
      },
      {
       "id": 4,
       "linha": 4,
       "rotulo": "e"
      },
      {
       "id": 5,
       "linha": 5,
       "rotulo": "expr"
      },
      {
       "id": 6,
       "linha": 6,
       "rotulo": "augassign"
      },
      {
       "id": 7,
       "linha": 7,
       "rotulo": "fim"
      }
     ],
     "arestas": [
      {
       "de": 0,
       "para": 1,
       "tipo": "segue"
      },
      {
       "de": 1,
       "para": 2,
       "tipo": "segue"
      },
      {
       "de": 2,
       "para": 3,
       "tipo": "segue"
      },
      {
       "de": 3,
       "para": 4,
       "tipo": "segue"
      },
      {
       "de": 4,
       "para": 5,
       "tipo": "segue"
      },
      {
       "de": 5,
       "para": 6,
       "tipo": "segue"
      },
      {
       "de": 6,
       "para": 3,
       "tipo": "volta"
      },
      {
       "de": 3,
       "para": 1,
       "tipo": "volta"
      },
      {
       "de": 4,
       "para": 1,
       "tipo": "volta"
      },
      {
       "de": 1,
       "para": 7,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def insercao(v, conta):\n    for i in range(1, len(v)):\n        j = i\n        while j > 0 and maior(v, j - 1, j, conta):\n            troca(v, j - 1, j, conta)\n            j -= 1\n"
   }
  },
  "conferencia": {
   "referencia": "insercao_r() (reimplementação em R) e sort()",
   "versao_r": "4.6.0",
   "vetores": 7,
   "tudo_ok": true,
   "resumo": "Reescrito em R 4.6.0 e rodado em 7 vetores de 50 números (5 embaralhados, 1 ordenado, 1 invertido): a ordem final bate com sort() e as comparações e os movimentos batem um a um com o Python."
  },
  "pseudocodigo": {
   "assinatura": "insertion_sort(v)",
   "nome": "insertion_sort",
   "arvore": [
    {
     "tipo": "laco",
     "rotulo": "para",
     "linha": 2,
     "op": "e",
     "conds": [
      "para i de 2 até n"
     ],
     "corpo": [
      {
       "tipo": "acao",
       "linha": 3,
       "texto": "j ← i",
       "chamada": false
      },
      {
       "tipo": "laco",
       "rotulo": "enquanto",
       "linha": 4,
       "op": "e",
       "conds": [
        "j > 1",
        "v[j − 1] > v[j]"
       ],
       "corpo": [
        {
         "tipo": "acao",
         "linha": 5,
         "texto": "troque v[j − 1] com v[j]",
         "chamada": false
        },
        {
         "tipo": "acao",
         "linha": 6,
         "texto": "j ← j − 1",
         "chamada": false
        }
       ]
      }
     ]
    }
   ],
   "linhas": [
    "procedimento insertion_sort(v):",
    "    para i de 2 até n:",
    "        j ← i",
    "        enquanto j > 1 e v[j − 1] > v[j]:",
    "            troque v[j − 1] com v[j]",
    "            j ← j − 1"
   ],
   "M": 4,
   "nos": 8,
   "arestas": 10,
   "decisoes": [
    2,
    4,
    4
   ]
  }
 },
 {
  "ciclomatica": {
   "porque": "Cada for, while e if, e cada and/or numa condição, abre um caminho a mais pelo código. A complexidade ciclomática conta os caminhos independentes: qualquer percurso pela função é uma combinação deles. É um teto para quantos testes cobrem todos os ramos, não o mínimo.",
   "regra": "Regra de contagem: +1 por for, while, if, if-expressão, except e cada and/or. Compreensões de lista são proibidas na função medida, porque escondem um laço que o grafo não veria."
  },
  "alg": "intercalacao",
  "id": "merge-sort",
  "nome": "Merge sort",
  "variante": "de cima para baixo",
  "familia": "ordenação",
  "resumo": "Divide o vetor ao meio até sobrar um número por pedaço e depois intercala os pedaços dois a dois, comparando sempre a frente de cada um.",
  "tempo": {
   "notacao": "O(n log n)",
   "porque": "Dividir ao meio dá log₂ n níveis; em cada nível, intercalar todos os pedaços custa no máximo n comparações. Vale para qualquer entrada.",
   "nota": "Vetor ordenado ou invertido custa menos que o aleatório (uma metade acaba antes), mas continua na ordem de n log n."
  },
  "memoria": {
   "notacao": "O(n)",
   "porque": "Precisa de uma lista auxiliar do tamanho do vetor para intercalar, mais a pilha de recursão, que desce cerca de log₂ n + 1 níveis (a última chamada, de um número só, também conta).",
   "nomes": {
    "auxiliar": "lista auxiliar (uma posição por número)",
    "pilha": "níveis da pilha de recursão"
   },
   "cresce_com_n": [
    "auxiliar"
   ],
   "vazados": "são níveis da pilha, que crescem com log n"
  },
  "video": {
   "ideia": [
    "divide ao meio até sobrar um número por pedaço",
    "intercala os pedaços comparando a frente de cada um"
   ]
  },
  "placa": {
   "autor": "John von Neumann",
   "ano": "1945"
  },
  "poster": "algoritmos/intercalacao/intercalacao.png",
  "exemplo": {
   "dados": "24 números (de 0 a 23) embaralhados com a semente 11",
   "n": 24,
   "semente": 11,
   "vetor": [
    13,
    19,
    20,
    3,
    22,
    8,
    0,
    11,
    4,
    7,
    1,
    2,
    12,
    9,
    10,
    15,
    5,
    6,
    18,
    16,
    21,
    23,
    17,
    14
   ],
   "ops": 79,
   "movimentos": 224,
   "movimento": "escritas"
  },
  "medido": {
   "tempo": {
    "unidade": "comparações",
    "tipo": "ordenacao",
    "crescimento": [
     {
      "n": 16,
      "aleatorio": {
       "media": 45.9,
       "min": 43,
       "max": 48,
       "movimentos": 128,
       "pico": 21
      },
      "ordenado": {
       "comparacoes": 32,
       "movimentos": 128,
       "pico": 21
      },
      "invertido": {
       "comparacoes": 32,
       "movimentos": 128,
       "pico": 21
      }
     },
     {
      "n": 32,
      "aleatorio": {
       "media": 122.6,
       "min": 120,
       "max": 126,
       "movimentos": 320,
       "pico": 38
      },
      "ordenado": {
       "comparacoes": 80,
       "movimentos": 320,
       "pico": 38
      },
      "invertido": {
       "comparacoes": 80,
       "movimentos": 320,
       "pico": 38
      }
     },
     {
      "n": 64,
      "aleatorio": {
       "media": 307.3,
       "min": 301,
       "max": 313,
       "movimentos": 768,
       "pico": 71
      },
      "ordenado": {
       "comparacoes": 192,
       "movimentos": 768,
       "pico": 71
      },
      "invertido": {
       "comparacoes": 192,
       "movimentos": 768,
       "pico": 71
      }
     },
     {
      "n": 128,
      "aleatorio": {
       "media": 738.9,
       "min": 730,
       "max": 747,
       "movimentos": 1792,
       "pico": 136
      },
      "ordenado": {
       "comparacoes": 448,
       "movimentos": 1792,
       "pico": 136
      },
      "invertido": {
       "comparacoes": 448,
       "movimentos": 1792,
       "pico": 136
      }
     },
     {
      "n": 256,
      "aleatorio": {
       "media": 1723.3,
       "min": 1710,
       "max": 1730,
       "movimentos": 4096,
       "pico": 265
      },
      "ordenado": {
       "comparacoes": 1024,
       "movimentos": 4096,
       "pico": 265
      },
      "invertido": {
       "comparacoes": 1024,
       "movimentos": 4096,
       "pico": 265
      }
     },
     {
      "n": 512,
      "aleatorio": {
       "media": 3963,
       "min": 3943,
       "max": 3978,
       "movimentos": 9216,
       "pico": 522
      },
      "ordenado": {
       "comparacoes": 2304,
       "movimentos": 9216,
       "pico": 522
      },
      "invertido": {
       "comparacoes": 2304,
       "movimentos": 9216,
       "pico": 522
      }
     },
     {
      "n": 1024,
      "aleatorio": {
       "media": 8952.5,
       "min": 8920,
       "max": 8971,
       "movimentos": 20480,
       "pico": 1035
      },
      "ordenado": {
       "comparacoes": 5120,
       "movimentos": 20480,
       "pico": 1035
      },
      "invertido": {
       "comparacoes": 5120,
       "movimentos": 20480,
       "pico": 1035
      }
     }
    ],
    "crescimento_dados": "Aleatório: média de 10 vetores embaralhados por tamanho; ordenado e invertido: um vetor cada",
    "distribuicao": {
     "n": 24,
     "vetores": 200,
     "comparacoes": [
      78,
      83,
      84,
      78,
      81,
      84,
      83,
      81,
      81,
      87,
      79,
      83,
      82,
      83,
      84,
      80,
      81,
      87,
      84,
      81,
      83,
      81,
      81,
      81,
      78,
      83,
      81,
      80,
      81,
      82,
      82,
      77,
      81,
      84,
      80,
      84,
      78,
      83,
      81,
      80,
      83,
      85,
      82,
      83,
      85,
      84,
      74,
      84,
      84,
      85,
      79,
      85,
      81,
      86,
      83,
      84,
      80,
      83,
      82,
      83,
      82,
      85,
      82,
      82,
      81,
      82,
      83,
      82,
      86,
      84,
      83,
      88,
      85,
      79,
      83,
      81,
      80,
      84,
      83,
      81,
      82,
      83,
      76,
      84,
      79,
      79,
      78,
      79,
      86,
      81,
      80,
      84,
      85,
      84,
      83,
      86,
      83,
      78,
      85,
      86,
      80,
      85,
      82,
      86,
      85,
      78,
      83,
      85,
      77,
      80,
      86,
      82,
      80,
      83,
      81,
      82,
      84,
      80,
      85,
      84,
      84,
      80,
      82,
      85,
      83,
      83,
      82,
      84,
      79,
      81,
      82,
      84,
      84,
      83,
      81,
      84,
      78,
      84,
      81,
      84,
      80,
      80,
      83,
      85,
      81,
      83,
      85,
      80,
      81,
      81,
      81,
      81,
      80,
      81,
      87,
      83,
      81,
      83,
      85,
      86,
      83,
      81,
      82,
      82,
      81,
      82,
      81,
      86,
      87,
      83,
      83,
      81,
      83,
      81,
      82,
      83,
      83,
      86,
      79,
      85,
      84,
      84,
      79,
      85,
      84,
      81,
      81,
      79,
      84,
      79,
      82,
      77,
      84,
      78,
      83,
      78,
      86,
      84,
      78,
      79
     ]
    }
   },
   "memoria": {
    "pico": 30,
    "detalhe": {
     "auxiliar": 24,
     "pilha": 6
    }
   },
   "ciclomatica": {
    "M": 8,
    "nos": 27,
    "arestas": 33,
    "decisoes": [
     {
      "linha": 3,
      "tipo": "if"
     },
     {
      "linha": 7,
      "tipo": "for"
     },
     {
      "linha": 10,
      "tipo": "and/or"
     },
     {
      "linha": 10,
      "tipo": "while"
     },
     {
      "linha": 11,
      "tipo": "if"
     },
     {
      "linha": 18,
      "tipo": "while"
     },
     {
      "linha": 22,
      "tipo": "while"
     }
    ],
    "grafo": {
     "nos": [
      {
       "id": 0,
       "linha": 1,
       "rotulo": "início"
      },
      {
       "id": 1,
       "linha": 2,
       "rotulo": "expr"
      },
      {
       "id": 2,
       "linha": 3,
       "rotulo": "if"
      },
      {
       "id": 3,
       "linha": 4,
       "rotulo": "assign"
      },
      {
       "id": 4,
       "linha": 5,
       "rotulo": "expr"
      },
      {
       "id": 5,
       "linha": 6,
       "rotulo": "expr"
      },
      {
       "id": 6,
       "linha": 7,
       "rotulo": "for"
      },
      {
       "id": 7,
       "linha": 8,
       "rotulo": "expr"
      },
      {
       "id": 8,
       "linha": 9,
       "rotulo": "assign"
      },
      {
       "id": 9,
       "linha": 10,
       "rotulo": "while"
      },
      {
       "id": 10,
       "linha": 10,
       "rotulo": "e"
      },
      {
       "id": 11,
       "linha": 11,
       "rotulo": "if"
      },
      {
       "id": 12,
       "linha": 12,
       "rotulo": "expr"
      },
      {
       "id": 13,
       "linha": 13,
       "rotulo": "augassign"
      },
      {
       "id": 14,
       "linha": 15,
       "rotulo": "expr"
      },
      {
       "id": 15,
       "linha": 16,
       "rotulo": "augassign"
      },
      {
       "id": 16,
       "linha": 17,
       "rotulo": "augassign"
      },
      {
       "id": 17,
       "linha": 18,
       "rotulo": "while"
      },
      {
       "id": 18,
       "linha": 19,
       "rotulo": "expr"
      },
      {
       "id": 19,
       "linha": 20,
       "rotulo": "augassign"
      },
      {
       "id": 20,
       "linha": 21,
       "rotulo": "augassign"
      },
      {
       "id": 21,
       "linha": 22,
       "rotulo": "while"
      },
      {
       "id": 22,
       "linha": 23,
       "rotulo": "expr"
      },
      {
       "id": 23,
       "linha": 24,
       "rotulo": "augassign"
      },
      {
       "id": 24,
       "linha": 25,
       "rotulo": "augassign"
      },
      {
       "id": 25,
       "linha": 26,
       "rotulo": "expr"
      },
      {
       "id": 26,
       "linha": 27,
       "rotulo": "fim"
      }
     ],
     "arestas": [
      {
       "de": 0,
       "para": 1,
       "tipo": "segue"
      },
      {
       "de": 1,
       "para": 2,
       "tipo": "segue"
      },
      {
       "de": 2,
       "para": 3,
       "tipo": "segue"
      },
      {
       "de": 3,
       "para": 4,
       "tipo": "segue"
      },
      {
       "de": 4,
       "para": 5,
       "tipo": "segue"
      },
      {
       "de": 5,
       "para": 6,
       "tipo": "segue"
      },
      {
       "de": 6,
       "para": 7,
       "tipo": "segue"
      },
      {
       "de": 7,
       "para": 6,
       "tipo": "volta"
      },
      {
       "de": 6,
       "para": 8,
       "tipo": "segue"
      },
      {
       "de": 8,
       "para": 9,
       "tipo": "segue"
      },
      {
       "de": 9,
       "para": 10,
       "tipo": "segue"
      },
      {
       "de": 10,
       "para": 11,
       "tipo": "segue"
      },
      {
       "de": 11,
       "para": 12,
       "tipo": "segue"
      },
      {
       "de": 12,
       "para": 13,
       "tipo": "segue"
      },
      {
       "de": 11,
       "para": 14,
       "tipo": "segue"
      },
      {
       "de": 14,
       "para": 15,
       "tipo": "segue"
      },
      {
       "de": 13,
       "para": 16,
       "tipo": "segue"
      },
      {
       "de": 15,
       "para": 16,
       "tipo": "segue"
      },
      {
       "de": 16,
       "para": 9,
       "tipo": "volta"
      },
      {
       "de": 9,
       "para": 17,
       "tipo": "segue"
      },
      {
       "de": 10,
       "para": 17,
       "tipo": "segue"
      },
      {
       "de": 17,
       "para": 18,
       "tipo": "segue"
      },
      {
       "de": 18,
       "para": 19,
       "tipo": "segue"
      },
      {
       "de": 19,
       "para": 20,
       "tipo": "segue"
      },
      {
       "de": 20,
       "para": 17,
       "tipo": "volta"
      },
      {
       "de": 17,
       "para": 21,
       "tipo": "segue"
      },
      {
       "de": 21,
       "para": 22,
       "tipo": "segue"
      },
      {
       "de": 22,
       "para": 23,
       "tipo": "segue"
      },
      {
       "de": 23,
       "para": 24,
       "tipo": "segue"
      },
      {
       "de": 24,
       "para": 21,
       "tipo": "volta"
      },
      {
       "de": 21,
       "para": 25,
       "tipo": "segue"
      },
      {
       "de": 2,
       "para": 25,
       "tipo": "segue"
      },
      {
       "de": 25,
       "para": 26,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def intercalacao(v, a, b, aux, conta):\n    conta.entra(a, b)\n    if b - a > 1:\n        m = (a + b) // 2\n        intercalacao(v, a, m, aux, conta)\n        intercalacao(v, m, b, aux, conta)\n        for k in range(a, b):\n            escreve(aux, k, v[k], conta, \"aux\")\n        i, j, k = a, m, a\n        while i < m and j < b:\n            if maior(aux, i, j, conta, \"aux\"):\n                escreve(v, k, aux[j], conta)\n                j += 1\n            else:\n                escreve(v, k, aux[i], conta)\n                i += 1\n            k += 1\n        while i < m:\n            escreve(v, k, aux[i], conta)\n            i += 1\n            k += 1\n        while j < b:\n            escreve(v, k, aux[j], conta)\n            j += 1\n            k += 1\n    conta.sai()\n"
   }
  },
  "conferencia": {
   "referencia": "intercalacao_r() (reimplementação em R) e sort()",
   "versao_r": "4.6.0",
   "vetores": 7,
   "tudo_ok": true,
   "resumo": "Reescrito em R 4.6.0 e rodado em 7 vetores de 50 números (5 embaralhados, 1 ordenado, 1 invertido): a ordem final bate com sort() e as comparações e os movimentos batem um a um com o Python."
  },
  "pseudocodigo": {
   "assinatura": "merge_sort(v, a, b)",
   "nome": "merge_sort",
   "arvore": [
    {
     "tipo": "se",
     "linha": 2,
     "op": "e",
     "conds": [
      "a < b"
     ],
     "entao": [
      {
       "tipo": "acao",
       "linha": 3,
       "texto": "m ← ⌊(a + b − 1) ÷ 2⌋",
       "chamada": false
      },
      {
       "tipo": "acao",
       "linha": 4,
       "texto": "merge_sort(v, a, m)",
       "chamada": true
      },
      {
       "tipo": "acao",
       "linha": 5,
       "texto": "merge_sort(v, m + 1, b)",
       "chamada": true
      },
      {
       "tipo": "laco",
       "rotulo": "para",
       "linha": 6,
       "op": "e",
       "conds": [
        "para k de a até b"
       ],
       "corpo": [
        {
         "tipo": "acao",
         "linha": 7,
         "texto": "aux[k] ← v[k]",
         "chamada": false
        }
       ]
      },
      {
       "tipo": "acao",
       "linha": 8,
       "texto": "i ← a;  j ← m + 1;  k ← a",
       "chamada": false
      },
      {
       "tipo": "laco",
       "rotulo": "enquanto",
       "linha": 9,
       "op": "e",
       "conds": [
        "i ≤ m",
        "j ≤ b"
       ],
       "corpo": [
        {
         "tipo": "se",
         "linha": 10,
         "op": "e",
         "conds": [
          "aux[i] > aux[j]"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 11,
           "texto": "v[k] ← aux[j];  j ← j + 1",
           "chamada": false
          }
         ],
         "senao": [
          {
           "tipo": "acao",
           "linha": 13,
           "texto": "v[k] ← aux[i];  i ← i + 1",
           "chamada": false
          }
         ]
        },
        {
         "tipo": "acao",
         "linha": 14,
         "texto": "k ← k + 1",
         "chamada": false
        }
       ]
      },
      {
       "tipo": "laco",
       "rotulo": "enquanto",
       "linha": 15,
       "op": "e",
       "conds": [
        "i ≤ m"
       ],
       "corpo": [
        {
         "tipo": "acao",
         "linha": 16,
         "texto": "v[k] ← aux[i];  i ← i + 1;  k ← k + 1",
         "chamada": false
        }
       ]
      },
      {
       "tipo": "laco",
       "rotulo": "enquanto",
       "linha": 17,
       "op": "e",
       "conds": [
        "j ≤ b"
       ],
       "corpo": [
        {
         "tipo": "acao",
         "linha": 18,
         "texto": "v[k] ← aux[j];  j ← j + 1;  k ← k + 1",
         "chamada": false
        }
       ]
      }
     ],
     "senao": null
    }
   ],
   "linhas": [
    "procedimento merge_sort(v, a, b):",
    "    se a < b:",
    "        m ← ⌊(a + b − 1) ÷ 2⌋",
    "        merge_sort(v, a, m)",
    "        merge_sort(v, m + 1, b)",
    "        para k de a até b:",
    "            aux[k] ← v[k]",
    "        i ← a;  j ← m + 1;  k ← a",
    "        enquanto i ≤ m e j ≤ b:",
    "            se aux[i] > aux[j]:",
    "                v[k] ← aux[j];  j ← j + 1",
    "            senão:",
    "                v[k] ← aux[i];  i ← i + 1",
    "            k ← k + 1",
    "        enquanto i ≤ m:",
    "            v[k] ← aux[i];  i ← i + 1;  k ← k + 1",
    "        enquanto j ≤ b:",
    "            v[k] ← aux[j];  j ← j + 1;  k ← k + 1"
   ],
   "M": 8,
   "nos": 19,
   "arestas": 25,
   "decisoes": [
    2,
    6,
    9,
    9,
    10,
    15,
    17
   ]
  }
 },
 {
  "ciclomatica": {
   "porque": "Cada for, while e if, e cada and/or numa condição, abre um caminho a mais pelo código. A complexidade ciclomática conta os caminhos independentes: qualquer percurso pela função é uma combinação deles. É um teto para quantos testes cobrem todos os ramos, não o mínimo.",
   "regra": "Regra de contagem: +1 por for, while, if, if-expressão, except e cada and/or. Compreensões de lista são proibidas na função medida, porque escondem um laço que o grafo não veria."
  },
  "alg": "rapida",
  "id": "quick-sort",
  "nome": "Quick sort",
  "variante": "partição de Lomuto, pivô = último",
  "familia": "ordenação",
  "resumo": "Escolhe um pivô, passa os menores para a esquerda e os maiores para a direita, põe o pivô entre os dois lados e repete em cada lado.",
  "tempo": {
   "notacao": "O(n log n)",
   "porque": "Em média, o pivô divide o trecho em pedaços razoavelmente equilibrados: a recursão desce na ordem de log n níveis, e cada nível compara no máximo n números.",
   "nota": "Pior caso: vetor já ordenado (ou invertido) com o pivô no último. Cada partição só tira o pivô do trecho, e o custo vira n(n − 1)/2, O(n²). Esta variante troca até quando i = j (um número com ele mesmo); essas trocas contam."
  },
  "memoria": {
   "notacao": "O(log n)",
   "porque": "Ordena no próprio vetor, mas cada chamada recursiva ocupa um nível da pilha. Em média, a pilha desce na ordem de log n níveis; nos vetores embaralhados medidos, cerca de duas vezes log₂ n.",
   "nota": "No pior caso (vetor já ordenado), a pilha desce n níveis: O(n).",
   "nomes": {
    "auxiliar": "lista auxiliar (uma posição por número)",
    "pilha": "níveis da pilha de recursão"
   },
   "cresce_com_n": [],
   "vazados": "são níveis da pilha"
  },
  "video": {
   "ideia": [
    "pivô = o último do trecho; quem é menor que ele vai para a esquerda",
    "o pivô vai para o meio: já está no lugar final",
    "e repete em cada lado, cada vez num trecho menor"
   ]
  },
  "placa": {
   "autor": "Tony Hoare",
   "ano": "1959, publicado em 1961"
  },
  "poster": "algoritmos/rapida/rapida.png",
  "exemplo": {
   "dados": "24 números (de 0 a 23) embaralhados com a semente 11",
   "n": 24,
   "semente": 11,
   "vetor": [
    13,
    19,
    20,
    3,
    22,
    8,
    0,
    11,
    4,
    7,
    1,
    2,
    12,
    9,
    10,
    15,
    5,
    6,
    18,
    16,
    21,
    23,
    17,
    14
   ],
   "ops": 83,
   "movimentos": 63,
   "movimento": "trocas"
  },
  "medido": {
   "tempo": {
    "unidade": "comparações",
    "tipo": "ordenacao",
    "crescimento": [
     {
      "n": 16,
      "aleatorio": {
       "media": 47.5,
       "min": 41,
       "max": 51,
       "movimentos": 33,
       "pico": 8
      },
      "ordenado": {
       "comparacoes": 120,
       "movimentos": 135,
       "pico": 16
      },
      "invertido": {
       "comparacoes": 120,
       "movimentos": 71,
       "pico": 16
      }
     },
     {
      "n": 32,
      "aleatorio": {
       "media": 134.6,
       "min": 118,
       "max": 155,
       "movimentos": 83.8,
       "pico": 10
      },
      "ordenado": {
       "comparacoes": 496,
       "movimentos": 527,
       "pico": 32
      },
      "invertido": {
       "comparacoes": 496,
       "movimentos": 271,
       "pico": 32
      }
     },
     {
      "n": 64,
      "aleatorio": {
       "media": 348.6,
       "min": 309,
       "max": 400,
       "movimentos": 209,
       "pico": 14
      },
      "ordenado": {
       "comparacoes": 2016,
       "movimentos": 2079,
       "pico": 64
      },
      "invertido": {
       "comparacoes": 2016,
       "movimentos": 1055,
       "pico": 64
      }
     },
     {
      "n": 128,
      "aleatorio": {
       "media": 870.8,
       "min": 766,
       "max": 1013,
       "movimentos": 487.9,
       "pico": 17
      },
      "ordenado": {
       "comparacoes": 8128,
       "movimentos": 8255,
       "pico": 128
      },
      "invertido": {
       "comparacoes": 8128,
       "movimentos": 4159,
       "pico": 128
      }
     },
     {
      "n": 256,
      "aleatorio": {
       "media": 2105.7,
       "min": 1955,
       "max": 2507,
       "movimentos": 1207.8,
       "pico": 24
      },
      "ordenado": {
       "comparacoes": 32640,
       "movimentos": 32895,
       "pico": 256
      },
      "invertido": {
       "comparacoes": 32640,
       "movimentos": 16511,
       "pico": 256
      }
     },
     {
      "n": 512,
      "aleatorio": {
       "media": 4670.7,
       "min": 4290,
       "max": 4940,
       "movimentos": 2628.3,
       "pico": 21
      },
      "ordenado": {
       "comparacoes": 130816,
       "movimentos": 131327,
       "pico": 512
      },
      "invertido": {
       "comparacoes": 130816,
       "movimentos": 65791,
       "pico": 512
      }
     },
     {
      "n": 1024,
      "aleatorio": {
       "media": 10923.9,
       "min": 10544,
       "max": 11409,
       "movimentos": 6203.9,
       "pico": 27
      },
      "ordenado": {
       "comparacoes": 523776,
       "movimentos": 524799,
       "pico": 1024
      },
      "invertido": {
       "comparacoes": 523776,
       "movimentos": 262655,
       "pico": 1024
      }
     }
    ],
    "crescimento_dados": "Aleatório: média de 10 vetores embaralhados por tamanho; ordenado e invertido: um vetor cada",
    "distribuicao": {
     "n": 24,
     "vetores": 200,
     "comparacoes": [
      107,
      103,
      98,
      88,
      88,
      86,
      78,
      87,
      89,
      109,
      83,
      75,
      86,
      84,
      86,
      86,
      82,
      96,
      126,
      131,
      89,
      95,
      83,
      90,
      87,
      102,
      91,
      92,
      95,
      85,
      108,
      92,
      83,
      87,
      81,
      82,
      130,
      86,
      81,
      86,
      85,
      93,
      98,
      82,
      85,
      124,
      79,
      81,
      92,
      81,
      100,
      88,
      87,
      85,
      90,
      110,
      111,
      80,
      86,
      79,
      85,
      84,
      82,
      102,
      82,
      91,
      96,
      99,
      130,
      89,
      94,
      95,
      99,
      102,
      90,
      73,
      79,
      78,
      86,
      89,
      94,
      91,
      99,
      107,
      80,
      114,
      94,
      81,
      94,
      93,
      101,
      86,
      82,
      82,
      98,
      84,
      95,
      83,
      81,
      96,
      84,
      96,
      98,
      114,
      86,
      119,
      96,
      87,
      94,
      81,
      94,
      83,
      129,
      88,
      79,
      120,
      83,
      111,
      76,
      81,
      109,
      78,
      95,
      92,
      80,
      101,
      97,
      91,
      89,
      86,
      87,
      78,
      96,
      83,
      89,
      95,
      97,
      82,
      97,
      93,
      105,
      93,
      84,
      92,
      93,
      86,
      91,
      86,
      100,
      77,
      99,
      86,
      86,
      87,
      93,
      81,
      89,
      89,
      80,
      93,
      83,
      100,
      88,
      89,
      98,
      90,
      78,
      112,
      81,
      88,
      81,
      77,
      84,
      116,
      74,
      118,
      87,
      96,
      77,
      94,
      120,
      81,
      97,
      87,
      104,
      89,
      73,
      111,
      84,
      93,
      86,
      84,
      91,
      97,
      89,
      109,
      103,
      119,
      87,
      118
     ]
    }
   },
   "memoria": {
    "pico": 8,
    "detalhe": {
     "pilha": 8
    }
   },
   "ciclomatica": {
    "M": 4,
    "nos": 15,
    "arestas": 17,
    "decisoes": [
     {
      "linha": 3,
      "tipo": "if"
     },
     {
      "linha": 7,
      "tipo": "for"
     },
     {
      "linha": 8,
      "tipo": "if"
     }
    ],
    "grafo": {
     "nos": [
      {
       "id": 0,
       "linha": 1,
       "rotulo": "início"
      },
      {
       "id": 1,
       "linha": 2,
       "rotulo": "expr"
      },
      {
       "id": 2,
       "linha": 3,
       "rotulo": "if"
      },
      {
       "id": 3,
       "linha": 4,
       "rotulo": "assign"
      },
      {
       "id": 4,
       "linha": 5,
       "rotulo": "expr"
      },
      {
       "id": 5,
       "linha": 6,
       "rotulo": "assign"
      },
      {
       "id": 6,
       "linha": 7,
       "rotulo": "for"
      },
      {
       "id": 7,
       "linha": 8,
       "rotulo": "if"
      },
      {
       "id": 8,
       "linha": 9,
       "rotulo": "expr"
      },
      {
       "id": 9,
       "linha": 10,
       "rotulo": "augassign"
      },
      {
       "id": 10,
       "linha": 11,
       "rotulo": "expr"
      },
      {
       "id": 11,
       "linha": 12,
       "rotulo": "expr"
      },
      {
       "id": 12,
       "linha": 13,
       "rotulo": "expr"
      },
      {
       "id": 13,
       "linha": 14,
       "rotulo": "expr"
      },
      {
       "id": 14,
       "linha": 15,
       "rotulo": "fim"
      }
     ],
     "arestas": [
      {
       "de": 0,
       "para": 1,
       "tipo": "segue"
      },
      {
       "de": 1,
       "para": 2,
       "tipo": "segue"
      },
      {
       "de": 2,
       "para": 3,
       "tipo": "segue"
      },
      {
       "de": 3,
       "para": 4,
       "tipo": "segue"
      },
      {
       "de": 4,
       "para": 5,
       "tipo": "segue"
      },
      {
       "de": 5,
       "para": 6,
       "tipo": "segue"
      },
      {
       "de": 6,
       "para": 7,
       "tipo": "segue"
      },
      {
       "de": 7,
       "para": 8,
       "tipo": "segue"
      },
      {
       "de": 8,
       "para": 9,
       "tipo": "segue"
      },
      {
       "de": 9,
       "para": 6,
       "tipo": "volta"
      },
      {
       "de": 7,
       "para": 6,
       "tipo": "volta"
      },
      {
       "de": 6,
       "para": 10,
       "tipo": "segue"
      },
      {
       "de": 10,
       "para": 11,
       "tipo": "segue"
      },
      {
       "de": 11,
       "para": 12,
       "tipo": "segue"
      },
      {
       "de": 12,
       "para": 13,
       "tipo": "segue"
      },
      {
       "de": 2,
       "para": 13,
       "tipo": "segue"
      },
      {
       "de": 13,
       "para": 14,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def rapida(v, a, b, conta):\n    conta.entra(a, b)\n    if b - a > 1:\n        p = b - 1\n        conta.evento(\"pivo\", p)\n        i = a\n        for j in range(a, b - 1):\n            if maior(v, p, j, conta):\n                troca(v, i, j, conta)\n                i += 1\n        troca(v, i, p, conta)\n        rapida(v, a, i, conta)\n        rapida(v, i + 1, b, conta)\n    conta.sai()\n"
   }
  },
  "conferencia": {
   "referencia": "rapida_r() (reimplementação em R) e sort()",
   "versao_r": "4.6.0",
   "vetores": 7,
   "tudo_ok": true,
   "resumo": "Reescrito em R 4.6.0 e rodado em 7 vetores de 50 números (5 embaralhados, 1 ordenado, 1 invertido): a ordem final bate com sort() e as comparações e os movimentos batem um a um com o Python."
  },
  "pseudocodigo": {
   "assinatura": "quick_sort(v, a, b)",
   "nome": "quick_sort",
   "arvore": [
    {
     "tipo": "se",
     "linha": 2,
     "op": "e",
     "conds": [
      "a < b"
     ],
     "entao": [
      {
       "tipo": "acao",
       "linha": 3,
       "texto": "pivô ← v[b]",
       "chamada": false
      },
      {
       "tipo": "acao",
       "linha": 4,
       "texto": "i ← a",
       "chamada": false
      },
      {
       "tipo": "laco",
       "rotulo": "para",
       "linha": 5,
       "op": "e",
       "conds": [
        "para j de a até b − 1"
       ],
       "corpo": [
        {
         "tipo": "se",
         "linha": 6,
         "op": "e",
         "conds": [
          "v[j] < pivô"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 7,
           "texto": "troque v[i] com v[j]",
           "chamada": false
          },
          {
           "tipo": "acao",
           "linha": 8,
           "texto": "i ← i + 1",
           "chamada": false
          }
         ],
         "senao": null
        }
       ]
      },
      {
       "tipo": "acao",
       "linha": 9,
       "texto": "troque v[i] com v[b]",
       "chamada": false
      },
      {
       "tipo": "acao",
       "linha": 10,
       "texto": "quick_sort(v, a, i − 1)",
       "chamada": true
      },
      {
       "tipo": "acao",
       "linha": 11,
       "texto": "quick_sort(v, i + 1, b)",
       "chamada": true
      }
     ],
     "senao": null
    }
   ],
   "linhas": [
    "procedimento quick_sort(v, a, b):",
    "    se a < b:",
    "        pivô ← v[b]",
    "        i ← a",
    "        para j de a até b − 1:",
    "            se v[j] < pivô:",
    "                troque v[i] com v[j]",
    "                i ← i + 1",
    "        troque v[i] com v[b]",
    "        quick_sort(v, a, i − 1)",
    "        quick_sort(v, i + 1, b)"
   ],
   "M": 4,
   "nos": 12,
   "arestas": 14,
   "decisoes": [
    2,
    5,
    6
   ]
  }
 },
 {
  "ciclomatica": {
   "porque": "Cada for, while e if, e cada and/or numa condição, abre um caminho a mais pelo código. A complexidade ciclomática conta os caminhos independentes: qualquer percurso pela função é uma combinação deles. É um teto para quantos testes cobrem todos os ramos, não o mínimo.",
   "regra": "Regra de contagem: +1 por for, while, if, if-expressão, except e cada and/or. Compreensões de lista são proibidas na função medida, porque escondem um laço que o grafo não veria."
  },
  "alg": "kmeans",
  "id": "k-means",
  "nome": "K-means",
  "variante": "algoritmo de Lloyd",
  "familia": "estatística",
  "resumo": "Separa pontos em k grupos. Cada ponto vai para o centro mais próximo, cada centro vai para a média do seu grupo, e o algoritmo repete até nenhum ponto mudar de grupo.",
  "tempo": {
   "notacao": "O(n·k·i)",
   "porque": "Em cada volta, cada um dos n pontos mede a distância até cada um dos k centros: são n·k contas por volta. O número de voltas, i, depende dos dados e de onde os centros começam; só se sabe rodando.",
   "nota": "Em d dimensões, cada distância custa d contas, e o total vira O(n·k·i·d). Aqui d = 2."
  },
  "memoria": {
   "notacao": "O(n + k)",
   "porque": "Um rótulo por ponto, que diz a que grupo ele pertence, e, para cada centro, a posição, as somas e a contagem do grupo. Os pontos em si são a entrada e não entram na conta.",
   "nomes": {
    "rotulos": "rótulos (um por ponto)",
    "centros": "centros (k × 2)",
    "soma_x": "soma de x por grupo",
    "soma_y": "soma de y por grupo",
    "contagens": "pontos por grupo"
   },
   "nota": "Em d dimensões, os centros e as somas ocupam k·d valores, e a memória vira O(n + k·d). Aqui d = 2.",
   "cresce_com_n": [
    "rotulos"
   ],
   "vazados": "crescem com k"
  },
  "placa": {
   "autor": "Stuart Lloyd",
   "ano": "1957, publicado em 1982"
  },
  "poster": "algoritmos/kmeans/kmeans.png",
  "exemplo": {
   "dados": "iris (R), pétalas: comprimento × largura, cm",
   "n": 150,
   "k": 3,
   "d": 2,
   "semente": 4,
   "iniciais": [
    60,
    77,
    26
   ],
   "i": 7,
   "ops": 3150,
   "por_volta": 450,
   "pontos": [
    [
     1.4,
     0.2
    ],
    [
     1.4,
     0.2
    ],
    [
     1.3,
     0.2
    ],
    [
     1.5,
     0.2
    ],
    [
     1.4,
     0.2
    ],
    [
     1.7,
     0.4
    ],
    [
     1.4,
     0.3
    ],
    [
     1.5,
     0.2
    ],
    [
     1.4,
     0.2
    ],
    [
     1.5,
     0.1
    ],
    [
     1.5,
     0.2
    ],
    [
     1.6,
     0.2
    ],
    [
     1.4,
     0.1
    ],
    [
     1.1,
     0.1
    ],
    [
     1.2,
     0.2
    ],
    [
     1.5,
     0.4
    ],
    [
     1.3,
     0.4
    ],
    [
     1.4,
     0.3
    ],
    [
     1.7,
     0.3
    ],
    [
     1.5,
     0.3
    ],
    [
     1.7,
     0.2
    ],
    [
     1.5,
     0.4
    ],
    [
     1.0,
     0.2
    ],
    [
     1.7,
     0.5
    ],
    [
     1.9,
     0.2
    ],
    [
     1.6,
     0.2
    ],
    [
     1.6,
     0.4
    ],
    [
     1.5,
     0.2
    ],
    [
     1.4,
     0.2
    ],
    [
     1.6,
     0.2
    ],
    [
     1.6,
     0.2
    ],
    [
     1.5,
     0.4
    ],
    [
     1.5,
     0.1
    ],
    [
     1.4,
     0.2
    ],
    [
     1.5,
     0.2
    ],
    [
     1.2,
     0.2
    ],
    [
     1.3,
     0.2
    ],
    [
     1.4,
     0.1
    ],
    [
     1.3,
     0.2
    ],
    [
     1.5,
     0.2
    ],
    [
     1.3,
     0.3
    ],
    [
     1.3,
     0.3
    ],
    [
     1.3,
     0.2
    ],
    [
     1.6,
     0.6
    ],
    [
     1.9,
     0.4
    ],
    [
     1.4,
     0.3
    ],
    [
     1.6,
     0.2
    ],
    [
     1.4,
     0.2
    ],
    [
     1.5,
     0.2
    ],
    [
     1.4,
     0.2
    ],
    [
     4.7,
     1.4
    ],
    [
     4.5,
     1.5
    ],
    [
     4.9,
     1.5
    ],
    [
     4.0,
     1.3
    ],
    [
     4.6,
     1.5
    ],
    [
     4.5,
     1.3
    ],
    [
     4.7,
     1.6
    ],
    [
     3.3,
     1.0
    ],
    [
     4.6,
     1.3
    ],
    [
     3.9,
     1.4
    ],
    [
     3.5,
     1.0
    ],
    [
     4.2,
     1.5
    ],
    [
     4.0,
     1.0
    ],
    [
     4.7,
     1.4
    ],
    [
     3.6,
     1.3
    ],
    [
     4.4,
     1.4
    ],
    [
     4.5,
     1.5
    ],
    [
     4.1,
     1.0
    ],
    [
     4.5,
     1.5
    ],
    [
     3.9,
     1.1
    ],
    [
     4.8,
     1.8
    ],
    [
     4.0,
     1.3
    ],
    [
     4.9,
     1.5
    ],
    [
     4.7,
     1.2
    ],
    [
     4.3,
     1.3
    ],
    [
     4.4,
     1.4
    ],
    [
     4.8,
     1.4
    ],
    [
     5.0,
     1.7
    ],
    [
     4.5,
     1.5
    ],
    [
     3.5,
     1.0
    ],
    [
     3.8,
     1.1
    ],
    [
     3.7,
     1.0
    ],
    [
     3.9,
     1.2
    ],
    [
     5.1,
     1.6
    ],
    [
     4.5,
     1.5
    ],
    [
     4.5,
     1.6
    ],
    [
     4.7,
     1.5
    ],
    [
     4.4,
     1.3
    ],
    [
     4.1,
     1.3
    ],
    [
     4.0,
     1.3
    ],
    [
     4.4,
     1.2
    ],
    [
     4.6,
     1.4
    ],
    [
     4.0,
     1.2
    ],
    [
     3.3,
     1.0
    ],
    [
     4.2,
     1.3
    ],
    [
     4.2,
     1.2
    ],
    [
     4.2,
     1.3
    ],
    [
     4.3,
     1.3
    ],
    [
     3.0,
     1.1
    ],
    [
     4.1,
     1.3
    ],
    [
     6.0,
     2.5
    ],
    [
     5.1,
     1.9
    ],
    [
     5.9,
     2.1
    ],
    [
     5.6,
     1.8
    ],
    [
     5.8,
     2.2
    ],
    [
     6.6,
     2.1
    ],
    [
     4.5,
     1.7
    ],
    [
     6.3,
     1.8
    ],
    [
     5.8,
     1.8
    ],
    [
     6.1,
     2.5
    ],
    [
     5.1,
     2.0
    ],
    [
     5.3,
     1.9
    ],
    [
     5.5,
     2.1
    ],
    [
     5.0,
     2.0
    ],
    [
     5.1,
     2.4
    ],
    [
     5.3,
     2.3
    ],
    [
     5.5,
     1.8
    ],
    [
     6.7,
     2.2
    ],
    [
     6.9,
     2.3
    ],
    [
     5.0,
     1.5
    ],
    [
     5.7,
     2.3
    ],
    [
     4.9,
     2.0
    ],
    [
     6.7,
     2.0
    ],
    [
     4.9,
     1.8
    ],
    [
     5.7,
     2.1
    ],
    [
     6.0,
     1.8
    ],
    [
     4.8,
     1.8
    ],
    [
     4.9,
     1.8
    ],
    [
     5.6,
     2.1
    ],
    [
     5.8,
     1.6
    ],
    [
     6.1,
     1.9
    ],
    [
     6.4,
     2.0
    ],
    [
     5.6,
     2.2
    ],
    [
     5.1,
     1.5
    ],
    [
     5.6,
     1.4
    ],
    [
     6.1,
     2.3
    ],
    [
     5.6,
     2.4
    ],
    [
     5.5,
     1.8
    ],
    [
     4.8,
     1.8
    ],
    [
     5.4,
     2.1
    ],
    [
     5.6,
     2.4
    ],
    [
     5.1,
     2.3
    ],
    [
     5.1,
     1.9
    ],
    [
     5.9,
     2.3
    ],
    [
     5.7,
     2.5
    ],
    [
     5.2,
     2.3
    ],
    [
     5.0,
     1.9
    ],
    [
     5.2,
     2.0
    ],
    [
     5.4,
     2.3
    ],
    [
     5.1,
     1.8
    ]
   ]
  },
  "medido": {
   "tempo": {
    "unidade": "distâncias",
    "crescimento": [
     {
      "n": 150,
      "i": 5,
      "ops": 2250,
      "pico": 165
     },
     {
      "n": 300,
      "i": 7,
      "ops": 6300,
      "pico": 315
     },
     {
      "n": 600,
      "i": 7,
      "ops": 12600,
      "pico": 615
     },
     {
      "n": 1200,
      "i": 7,
      "ops": 25200,
      "pico": 1215
     },
     {
      "n": 2400,
      "i": 11,
      "ops": 79200,
      "pico": 2415
     },
     {
      "n": 4800,
      "i": 11,
      "ops": 158400,
      "pico": 4815
     }
    ],
    "crescimento_dados": "Dados simulados: três nuvens normais (semente 2026), centros iniciais sorteados com a semente 1",
    "voltas_por_semente": {
     "sementes": 200,
     "voltas": [
      15,
      15,
      7,
      7,
      8,
      7,
      6,
      16,
      9,
      8,
      10,
      9,
      7,
      7,
      6,
      8,
      10,
      11,
      10,
      15,
      8,
      16,
      13,
      8,
      7,
      8,
      9,
      12,
      3,
      6,
      11,
      14,
      6,
      9,
      6,
      13,
      9,
      7,
      7,
      10,
      6,
      12,
      15,
      8,
      8,
      10,
      5,
      5,
      7,
      4,
      9,
      7,
      9,
      7,
      11,
      7,
      15,
      8,
      2,
      8,
      3,
      10,
      4,
      7,
      7,
      7,
      10,
      7,
      15,
      7,
      2,
      13,
      5,
      2,
      9,
      8,
      6,
      10,
      5,
      8,
      10,
      8,
      8,
      7,
      7,
      7,
      14,
      4,
      15,
      3,
      14,
      11,
      9,
      11,
      10,
      4,
      6,
      3,
      8,
      9,
      7,
      11,
      2,
      6,
      4,
      8,
      10,
      13,
      8,
      9,
      7,
      9,
      14,
      5,
      5,
      5,
      15,
      8,
      3,
      7,
      5,
      9,
      17,
      2,
      7,
      7,
      8,
      9,
      7,
      8,
      7,
      9,
      8,
      9,
      8,
      11,
      9,
      3,
      7,
      11,
      7,
      7,
      8,
      5,
      7,
      16,
      8,
      5,
      12,
      7,
      8,
      6,
      12,
      8,
      10,
      8,
      6,
      11,
      8,
      5,
      9,
      6,
      10,
      5,
      11,
      9,
      7,
      2,
      5,
      8,
      10,
      7,
      10,
      12,
      7,
      16,
      9,
      3,
      14,
      5,
      11,
      7,
      15,
      6,
      17,
      8,
      6,
      7,
      4,
      10,
      11,
      7,
      9,
      11,
      4,
      4,
      14,
      5,
      9,
      11
     ]
    }
   },
   "memoria": {
    "pico": 165,
    "detalhe": {
     "centros": 6,
     "rotulos": 150,
     "soma_x": 3,
     "soma_y": 3,
     "contagens": 3
    }
   },
   "ciclomatica": {
    "M": 10,
    "nos": 32,
    "arestas": 40,
    "decisoes": [
     {
      "linha": 5,
      "tipo": "for"
     },
     {
      "linha": 7,
      "tipo": "for"
     },
     {
      "linha": 10,
      "tipo": "for"
     },
     {
      "linha": 12,
      "tipo": "if"
     },
     {
      "linha": 14,
      "tipo": "if"
     },
     {
      "linha": 18,
      "tipo": "if"
     },
     {
      "linha": 23,
      "tipo": "for"
     },
     {
      "linha": 28,
      "tipo": "for"
     },
     {
      "linha": 29,
      "tipo": "if"
     }
    ],
    "grafo": {
     "nos": [
      {
       "id": 0,
       "linha": 1,
       "rotulo": "início"
      },
      {
       "id": 1,
       "linha": 2,
       "rotulo": "assign"
      },
      {
       "id": 2,
       "linha": 3,
       "rotulo": "assign"
      },
      {
       "id": 3,
       "linha": 4,
       "rotulo": "assign"
      },
      {
       "id": 4,
       "linha": 5,
       "rotulo": "for"
      },
      {
       "id": 5,
       "linha": 6,
       "rotulo": "assign"
      },
      {
       "id": 6,
       "linha": 7,
       "rotulo": "for"
      },
      {
       "id": 7,
       "linha": 8,
       "rotulo": "assign"
      },
      {
       "id": 8,
       "linha": 9,
       "rotulo": "assign"
      },
      {
       "id": 9,
       "linha": 10,
       "rotulo": "for"
      },
      {
       "id": 10,
       "linha": 11,
       "rotulo": "assign"
      },
      {
       "id": 11,
       "linha": 12,
       "rotulo": "if"
      },
      {
       "id": 12,
       "linha": 13,
       "rotulo": "assign"
      },
      {
       "id": 13,
       "linha": 14,
       "rotulo": "if"
      },
      {
       "id": 14,
       "linha": 15,
       "rotulo": "assign"
      },
      {
       "id": 15,
       "linha": 16,
       "rotulo": "assign"
      },
      {
       "id": 16,
       "linha": 17,
       "rotulo": "expr"
      },
      {
       "id": 17,
       "linha": 18,
       "rotulo": "if"
      },
      {
       "id": 18,
       "linha": 19,
       "rotulo": "break"
      },
      {
       "id": 19,
       "linha": 20,
       "rotulo": "assign"
      },
      {
       "id": 20,
       "linha": 21,
       "rotulo": "assign"
      },
      {
       "id": 21,
       "linha": 22,
       "rotulo": "assign"
      },
      {
       "id": 22,
       "linha": 23,
       "rotulo": "for"
      },
      {
       "id": 23,
       "linha": 24,
       "rotulo": "assign"
      },
      {
       "id": 24,
       "linha": 25,
       "rotulo": "augassign"
      },
      {
       "id": 25,
       "linha": 26,
       "rotulo": "augassign"
      },
      {
       "id": 26,
       "linha": 27,
       "rotulo": "augassign"
      },
      {
       "id": 27,
       "linha": 28,
       "rotulo": "for"
      },
      {
       "id": 28,
       "linha": 29,
       "rotulo": "if"
      },
      {
       "id": 29,
       "linha": 30,
       "rotulo": "assign"
      },
      {
       "id": 30,
       "linha": 31,
       "rotulo": "return"
      },
      {
       "id": 31,
       "linha": 32,
       "rotulo": "fim"
      }
     ],
     "arestas": [
      {
       "de": 0,
       "para": 1,
       "tipo": "segue"
      },
      {
       "de": 1,
       "para": 2,
       "tipo": "segue"
      },
      {
       "de": 2,
       "para": 3,
       "tipo": "segue"
      },
      {
       "de": 3,
       "para": 4,
       "tipo": "segue"
      },
      {
       "de": 4,
       "para": 5,
       "tipo": "segue"
      },
      {
       "de": 5,
       "para": 6,
       "tipo": "segue"
      },
      {
       "de": 6,
       "para": 7,
       "tipo": "segue"
      },
      {
       "de": 7,
       "para": 8,
       "tipo": "segue"
      },
      {
       "de": 8,
       "para": 9,
       "tipo": "segue"
      },
      {
       "de": 9,
       "para": 10,
       "tipo": "segue"
      },
      {
       "de": 10,
       "para": 11,
       "tipo": "segue"
      },
      {
       "de": 11,
       "para": 12,
       "tipo": "segue"
      },
      {
       "de": 12,
       "para": 9,
       "tipo": "volta"
      },
      {
       "de": 11,
       "para": 9,
       "tipo": "volta"
      },
      {
       "de": 9,
       "para": 13,
       "tipo": "segue"
      },
      {
       "de": 13,
       "para": 14,
       "tipo": "segue"
      },
      {
       "de": 14,
       "para": 15,
       "tipo": "segue"
      },
      {
       "de": 15,
       "para": 6,
       "tipo": "volta"
      },
      {
       "de": 13,
       "para": 6,
       "tipo": "volta"
      },
      {
       "de": 6,
       "para": 16,
       "tipo": "segue"
      },
      {
       "de": 16,
       "para": 17,
       "tipo": "segue"
      },
      {
       "de": 17,
       "para": 18,
       "tipo": "segue"
      },
      {
       "de": 17,
       "para": 19,
       "tipo": "segue"
      },
      {
       "de": 19,
       "para": 20,
       "tipo": "segue"
      },
      {
       "de": 20,
       "para": 21,
       "tipo": "segue"
      },
      {
       "de": 21,
       "para": 22,
       "tipo": "segue"
      },
      {
       "de": 22,
       "para": 23,
       "tipo": "segue"
      },
      {
       "de": 23,
       "para": 24,
       "tipo": "segue"
      },
      {
       "de": 24,
       "para": 25,
       "tipo": "segue"
      },
      {
       "de": 25,
       "para": 26,
       "tipo": "segue"
      },
      {
       "de": 26,
       "para": 22,
       "tipo": "volta"
      },
      {
       "de": 22,
       "para": 27,
       "tipo": "segue"
      },
      {
       "de": 27,
       "para": 28,
       "tipo": "segue"
      },
      {
       "de": 28,
       "para": 29,
       "tipo": "segue"
      },
      {
       "de": 29,
       "para": 27,
       "tipo": "volta"
      },
      {
       "de": 28,
       "para": 27,
       "tipo": "volta"
      },
      {
       "de": 27,
       "para": 4,
       "tipo": "volta"
      },
      {
       "de": 4,
       "para": 30,
       "tipo": "segue"
      },
      {
       "de": 18,
       "para": 30,
       "tipo": "segue"
      },
      {
       "de": 30,
       "para": 31,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def kmeans(pontos, iniciais, conta):\n    k = len(iniciais)\n    centros = conta.aloca(\"centros\", copy.deepcopy(iniciais))\n    rotulos = conta.aloca(\"rotulos\", [-1] * len(pontos))\n    for volta in range(MAX_VOLTAS):\n        mudou = False\n        for i, p in enumerate(pontos):\n            melhor = 0\n            menor = distancia(p, centros[0], conta)\n            for j in range(1, k):\n                d = distancia(p, centros[j], conta)\n                if d < menor:\n                    melhor, menor = j, d\n            if rotulos[i] != melhor:\n                rotulos[i] = melhor\n                mudou = True\n        conta.foto(rotulos=rotulos, centros=centros)\n        if not mudou:\n            break\n        soma_x = conta.aloca(\"soma_x\", [0.0] * k)\n        soma_y = conta.aloca(\"soma_y\", [0.0] * k)\n        contagens = conta.aloca(\"contagens\", [0] * k)\n        for i, p in enumerate(pontos):\n            j = rotulos[i]\n            soma_x[j] += p[0]\n            soma_y[j] += p[1]\n            contagens[j] += 1\n        for j in range(k):\n            if contagens[j] > 0:\n                centros[j] = [soma_x[j] / contagens[j], soma_y[j] / contagens[j]]\n    return rotulos, centros\n"
   }
  },
  "conferencia": {
   "referencia": "kmeans(algorithm = \"Lloyd\")",
   "versao_r": "4.6.0",
   "particao_igual": true,
   "maior_diferenca_centros": 0,
   "voltas_r": 7,
   "voltas_python": 7,
   "tudo_ok": true,
   "resumo": "Com os mesmos centros iniciais, o kmeans(algorithm = \"Lloyd\") do R 4.6.0 chega à mesma partição, com diferença máxima de 0 nos centros, em 7 voltas (aqui: 7)."
  },
  "pseudocodigo": {
   "assinatura": "k_means(pontos, iniciais)",
   "nome": "k_means",
   "arvore": [
    {
     "tipo": "acao",
     "linha": 2,
     "texto": "centros ← cópia dos centros iniciais",
     "chamada": false
    },
    {
     "tipo": "acao",
     "linha": 3,
     "texto": "rótulos ← uma posição vazia por ponto",
     "chamada": false
    },
    {
     "tipo": "laco",
     "rotulo": "para",
     "linha": 4,
     "op": "e",
     "conds": [
      "para volta de 1 até 100"
     ],
     "corpo": [
      {
       "tipo": "acao",
       "linha": 5,
       "texto": "mudou ← falso",
       "chamada": false
      },
      {
       "tipo": "laco",
       "rotulo": "para",
       "linha": 6,
       "op": "e",
       "conds": [
        "para cada ponto p, na posição i"
       ],
       "corpo": [
        {
         "tipo": "acao",
         "linha": 7,
         "texto": "melhor ← 1;  menor ← distância(p, centro 1)",
         "chamada": false
        },
        {
         "tipo": "laco",
         "rotulo": "para",
         "linha": 8,
         "op": "e",
         "conds": [
          "para j de 2 até k"
         ],
         "corpo": [
          {
           "tipo": "acao",
           "linha": 9,
           "texto": "d ← distância(p, centro j)",
           "chamada": false
          },
          {
           "tipo": "se",
           "linha": 10,
           "op": "e",
           "conds": [
            "d < menor"
           ],
           "entao": [
            {
             "tipo": "acao",
             "linha": 11,
             "texto": "melhor ← j;  menor ← d",
             "chamada": false
            }
           ],
           "senao": null
          }
         ]
        },
        {
         "tipo": "se",
         "linha": 12,
         "op": "e",
         "conds": [
          "rótulo[i] ≠ melhor"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 13,
           "texto": "rótulo[i] ← melhor;  mudou ← verdadeiro",
           "chamada": false
          }
         ],
         "senao": null
        }
       ]
      },
      {
       "tipo": "se",
       "linha": 14,
       "op": "e",
       "conds": [
        "não mudou"
       ],
       "entao": [
        {
         "tipo": "pare",
         "linha": 15
        }
       ],
       "senao": null
      },
      {
       "tipo": "acao",
       "linha": 16,
       "texto": "zere a soma e a contagem de cada grupo",
       "chamada": false
      },
      {
       "tipo": "laco",
       "rotulo": "para",
       "linha": 17,
       "op": "e",
       "conds": [
        "para cada ponto p, na posição i"
       ],
       "corpo": [
        {
         "tipo": "acao",
         "linha": 18,
         "texto": "some p ao grupo rótulo[i] e conte mais um nele",
         "chamada": false
        }
       ]
      },
      {
       "tipo": "laco",
       "rotulo": "para",
       "linha": 19,
       "op": "e",
       "conds": [
        "para j de 1 até k"
       ],
       "corpo": [
        {
         "tipo": "se",
         "linha": 20,
         "op": "e",
         "conds": [
          "o grupo j tem pontos"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 21,
           "texto": "centro j ← soma do grupo j ÷ contagem do grupo j",
           "chamada": false
          }
         ],
         "senao": null
        }
       ]
      }
     ]
    },
    {
     "tipo": "devolva",
     "linha": 22,
     "texto": "devolva rótulos, centros"
    }
   ],
   "linhas": [
    "procedimento k_means(pontos, iniciais):",
    "    centros ← cópia dos centros iniciais",
    "    rótulos ← uma posição vazia por ponto",
    "    para volta de 1 até 100:",
    "        mudou ← falso",
    "        para cada ponto p, na posição i:",
    "            melhor ← 1;  menor ← distância(p, centro 1)",
    "            para j de 2 até k:",
    "                d ← distância(p, centro j)",
    "                se d < menor:",
    "                    melhor ← j;  menor ← d",
    "            se rótulo[i] ≠ melhor:",
    "                rótulo[i] ← melhor;  mudou ← verdadeiro",
    "        se não mudou:",
    "            pare",
    "        zere a soma e a contagem de cada grupo",
    "        para cada ponto p, na posição i:",
    "            some p ao grupo rótulo[i] e conte mais um nele",
    "        para j de 1 até k:",
    "            se o grupo j tem pontos:",
    "                centro j ← soma do grupo j ÷ contagem do grupo j",
    "    devolva rótulos, centros"
   ],
   "M": 10,
   "nos": 23,
   "arestas": 31,
   "decisoes": [
    4,
    6,
    8,
    10,
    12,
    14,
    17,
    19,
    20
   ]
  }
 }
];
window.ALBUNS = [
 {
  "id": "ordenacao",
  "titulo": "Ordenação",
  "familia": "ordenação",
  "frase": "Quatro jeitos de pôr números em ordem. Tocado na sequência, o álbum vai do O(n²) ao O(n log n).",
  "em_producao": []
 },
 {
  "id": "estatistica",
  "titulo": "Estatística",
  "familia": "estatística",
  "frase": "Algoritmos que rodam por trás de uma análise.",
  "em_producao": []
 },
 {
  "id": "grafos",
  "titulo": "Grafos",
  "familia": "grafos",
  "frase": "Caminhos, vizinhos e distâncias.",
  "em_producao": [
   {
    "nome": "Busca em largura",
    "tempo": "O(V + E)",
    "memoria": "O(V)"
   },
   {
    "nome": "Dijkstra",
    "tempo": "O((V + E) log V)",
    "memoria": "O(V)"
   }
  ]
 }
];
