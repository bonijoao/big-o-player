// gerado por gerar.py; não editar à mão
window.GALERIA = [
 {
  "ciclomatica": {
   "porque": "Cada for, while e if, e cada and/or numa condição, abre um caminho a mais pelo código. A complexidade ciclomática conta os caminhos independentes: qualquer percurso pela função é uma combinação deles. É um teto para quantos testes cobrem todos os ramos, não o mínimo.",
   "regra": "Regra de contagem: +1 por for, while, if, if-expressão, except e cada and/or. Compreensões de lista são proibidas na função medida, porque escondem um laço que o grafo não veria."
  },
  "alg": "sequencial",
  "id": "busca-sequencial",
  "nome": "Busca sequencial",
  "variante": "da primeira casa à última",
  "familia": "busca",
  "resumo": "Olha casa por casa, da primeira à última, até achar o alvo. Funciona em qualquer vetor, ordenado ou não; quando o alvo não está lá, só descobre isso depois de olhar todas as casas.",
  "instrumentos": [
   {
    "id": "vetor",
    "papel": "onde se procura, lido casa por casa"
   }
  ],
  "tempo": {
   "notacao": "O(n)",
   "porque": "Cada casa olhada é uma comparação com o alvo. Se o alvo está numa posição sorteada, em média olha metade do vetor, (n + 1)/2 casas; se não está, olha as n.",
   "nota": "Melhor caso: o alvo é o primeiro, e basta uma comparação, O(1). O que manda é o pior caso: alvo no fim ou ausente."
  },
  "memoria": {
   "notacao": "O(1)",
   "porque": "Só guarda o índice da casa da vez e a posição achada, que não crescem com n.",
   "vazio": "procura dentro do próprio vetor"
  },
  "video": {
   "ideia": [
    "olha casa por casa até achar o alvo",
    "alvo ausente: só sabe depois de olhar todas"
   ]
  },
  "graficos": {
   "titulo": "Tempo: como cresce, e onde está o alvo",
   "texto": "As mesmas buscas em vetores cada vez maiores, para quatro lugares do alvo. Em escala logarítmica, quem cresce como n sobe em linha reta, com inclinação 1.",
   "crescimento": "Comparações para n de {n0} a {n1}. {dados}; a faixa cinza vai do alvo mais barato ao mais caro. Tracejadas: n e log₂ n, de referência.",
   "distribuicao": "Os {vezes} alvos possíveis num vetor de {nd} números: de {min} a {max} comparações. A barra preta é o alvo do encarte.",
   "rotulo": "comparações (n = {nd})"
  },
  "placa": {
   "autor": "método tradicional",
   "ano": "—"
  },
  "poster": "algoritmos/sequencial/sequencial.png",
  "exemplo": {
   "dados": "24 números pares (de 0 a 46) embaralhados com a semente 11, procurando o 20",
   "n": 24,
   "semente": 11,
   "vetor": [
    26,
    38,
    40,
    6,
    44,
    16,
    0,
    22,
    8,
    14,
    2,
    4,
    24,
    18,
    20,
    30,
    10,
    12,
    36,
    32,
    42,
    46,
    34,
    28
   ],
   "alvo": 20,
   "posicao": 14,
   "ops": 15
  },
  "medido": {
   "tempo": {
    "unidade": "comparações",
    "tipo": "busca",
    "series": [
     {
      "caso": "comeco",
      "nome": "no começo"
     },
     {
      "caso": "fim",
      "nome": "no fim"
     },
     {
      "caso": "ausente",
      "nome": "ausente (média)"
     },
     {
      "caso": "sorteado",
      "nome": "sorteado (média)"
     }
    ],
    "banda": "sorteado",
    "crescimento": [
     {
      "n": 16,
      "sorteado": {
       "media": 8.5,
       "min": 1,
       "max": 16
      },
      "ausente": {
       "media": 16,
       "min": 16,
       "max": 16
      },
      "comeco": {
       "ops": 1
      },
      "fim": {
       "ops": 16
      }
     },
     {
      "n": 32,
      "sorteado": {
       "media": 16.5,
       "min": 1,
       "max": 32
      },
      "ausente": {
       "media": 32,
       "min": 32,
       "max": 32
      },
      "comeco": {
       "ops": 1
      },
      "fim": {
       "ops": 32
      }
     },
     {
      "n": 64,
      "sorteado": {
       "media": 32.5,
       "min": 1,
       "max": 64
      },
      "ausente": {
       "media": 64,
       "min": 64,
       "max": 64
      },
      "comeco": {
       "ops": 1
      },
      "fim": {
       "ops": 64
      }
     },
     {
      "n": 128,
      "sorteado": {
       "media": 64.5,
       "min": 1,
       "max": 128
      },
      "ausente": {
       "media": 128,
       "min": 128,
       "max": 128
      },
      "comeco": {
       "ops": 1
      },
      "fim": {
       "ops": 128
      }
     },
     {
      "n": 256,
      "sorteado": {
       "media": 128.5,
       "min": 1,
       "max": 256
      },
      "ausente": {
       "media": 256,
       "min": 256,
       "max": 256
      },
      "comeco": {
       "ops": 1
      },
      "fim": {
       "ops": 256
      }
     },
     {
      "n": 512,
      "sorteado": {
       "media": 256.5,
       "min": 1,
       "max": 512
      },
      "ausente": {
       "media": 512,
       "min": 512,
       "max": 512
      },
      "comeco": {
       "ops": 1
      },
      "fim": {
       "ops": 512
      }
     },
     {
      "n": 1024,
      "sorteado": {
       "media": 512.5,
       "min": 1,
       "max": 1024
      },
      "ausente": {
       "media": 1024,
       "min": 1024,
       "max": 1024
      },
      "comeco": {
       "ops": 1
      },
      "fim": {
       "ops": 1024
      }
     }
    ],
    "eixo": "n (números; dobra a cada passo)",
    "refs": [
     "n",
     "log₂ n"
    ],
    "crescimento_dados": "sorteado e ausente: média de todos os alvos possíveis (todos os números do vetor, todos os buracos entre eles)",
    "distribuicao": {
     "n": 24,
     "vezes": 24,
     "valores": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24
     ],
     "destaque": 15
    }
   },
   "memoria": {
    "pico": 0,
    "detalhe": {}
   },
   "ciclomatica": {
    "M": 3,
    "nos": 8,
    "arestas": 9,
    "decisoes": [
     {
      "linha": 3,
      "tipo": "for"
     },
     {
      "linha": 4,
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
       "rotulo": "for"
      },
      {
       "id": 3,
       "linha": 4,
       "rotulo": "if"
      },
      {
       "id": 4,
       "linha": 5,
       "rotulo": "assign"
      },
      {
       "id": 5,
       "linha": 6,
       "rotulo": "break"
      },
      {
       "id": 6,
       "linha": 7,
       "rotulo": "return"
      },
      {
       "id": 7,
       "linha": 8,
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
       "de": 3,
       "para": 2,
       "tipo": "volta"
      },
      {
       "de": 2,
       "para": 6,
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
      }
     ]
    },
    "codigo": "def busca_sequencial(v, alvo, conta):\n    achou = -1\n    for i in range(len(v)):\n        if igual(v, i, alvo, conta):\n            achou = i\n            break\n    return achou\n"
   }
  },
  "conferencia": {
   "referencia": "sequencial_r() (reimplementação em R) e match()",
   "versao_r": "4.6.0",
   "vetores": 20,
   "tudo_ok": true,
   "resumo": "Reescrito em R 4.6.0 e rodado em 20 buscas em vetores de 50 números (alvo no começo, no fim, ausente e sorteado): a posição achada bate com match() e as comparações batem uma a uma com o Python."
  },
  "pseudocodigo": {
   "assinatura": "busca_sequencial(v, alvo)",
   "nome": "busca_sequencial",
   "arvore": [
    {
     "tipo": "acao",
     "linha": 2,
     "texto": "achou ← 0",
     "chamada": false
    },
    {
     "tipo": "laco",
     "rotulo": "para",
     "linha": 3,
     "op": "e",
     "conds": [
      "para i de 1 até n"
     ],
     "corpo": [
      {
       "tipo": "se",
       "linha": 4,
       "op": "e",
       "conds": [
        "v[i] = alvo"
       ],
       "entao": [
        {
         "tipo": "acao",
         "linha": 5,
         "texto": "achou ← i",
         "chamada": false
        },
        {
         "tipo": "pare",
         "linha": 6
        }
       ],
       "senao": null
      }
     ]
    },
    {
     "tipo": "devolva",
     "linha": 7,
     "texto": "devolva achou"
    }
   ],
   "linhas": [
    "procedimento busca_sequencial(v, alvo):",
    "    achou ← 0",
    "    para i de 1 até n:",
    "        se v[i] = alvo:",
    "            achou ← i",
    "            pare",
    "    devolva achou"
   ],
   "M": 3,
   "nos": 8,
   "arestas": 9,
   "decisoes": [
    3,
    4
   ]
  }
 },
 {
  "ciclomatica": {
   "porque": "Cada for, while e if, e cada and/or numa condição, abre um caminho a mais pelo código. A complexidade ciclomática conta os caminhos independentes: qualquer percurso pela função é uma combinação deles. É um teto para quantos testes cobrem todos os ramos, não o mínimo.",
   "regra": "Regra de contagem: +1 por for, while, if, if-expressão, except e cada and/or. Compreensões de lista são proibidas na função medida, porque escondem um laço que o grafo não veria."
  },
  "alg": "binaria",
  "id": "busca-binaria",
  "nome": "Busca binária",
  "variante": "corta o trecho pela metade",
  "familia": "busca",
  "resumo": "Num vetor ordenado, compara o alvo com o número do meio do trecho que ainda pode contê-lo. Se o alvo é maior, descarta a metade da esquerda; se é menor, a da direita. Cada comparação joga fora metade do que sobrou.",
  "instrumentos": [
   {
    "id": "vetor",
    "papel": "onde se procura, já em ordem; ler o meio custa o mesmo que ler a ponta"
   }
  ],
  "tempo": {
   "notacao": "O(log n)",
   "porque": "Cada volta corta o trecho pela metade: de n casas sobram n/2, depois n/4, e em cerca de log₂ n voltas não sobra nada. Cada volta compara o alvo com o meio até duas vezes (igual? menor?).",
   "nota": "Dobrar o vetor custa uma volta a mais, não o dobro. O preço é a ordem: num vetor embaralhado, seria preciso ordenar antes, O(n log n)."
  },
  "memoria": {
   "notacao": "O(1)",
   "porque": "Só guarda as duas pontas do trecho, o meio e a posição achada, que não crescem com n.",
   "vazio": "procura dentro do próprio vetor"
  },
  "video": {
   "ideia": [
    "compara com o meio e descarta a metade errada",
    "cada comparação joga fora metade do que sobrou"
   ]
  },
  "graficos": {
   "titulo": "Tempo: como cresce, e onde está o alvo",
   "texto": "As mesmas buscas em vetores cada vez maiores, para quatro lugares do alvo. Em escala logarítmica, a linha de n sobe reta; a da busca binária quase não sai do chão.",
   "crescimento": "Comparações para n de {n0} a {n1}. {dados}; a faixa cinza vai do alvo mais barato ao mais caro. Tracejadas: n e log₂ n, de referência.",
   "distribuicao": "Os {vezes} alvos possíveis num vetor de {nd} números: de {min} a {max} comparações. A barra preta é o alvo do encarte.",
   "rotulo": "comparações (n = {nd})"
  },
  "placa": {
   "autor": "John Mauchly, na primeira descrição publicada",
   "ano": "1946, nas aulas da Moore School; a primeira versão que vale para qualquer n é de Derrick Lehmer, em 1960 (Knuth, The Art of Computer Programming, vol. 3)"
  },
  "poster": "algoritmos/binaria/binaria.png",
  "exemplo": {
   "dados": "24 números pares (de 0 a 46) em ordem, procurando o 28",
   "n": 24,
   "semente": 11,
   "vetor": [
    0,
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    26,
    28,
    30,
    32,
    34,
    36,
    38,
    40,
    42,
    44,
    46
   ],
   "alvo": 28,
   "posicao": 14,
   "ops": 5
  },
  "medido": {
   "tempo": {
    "unidade": "comparações",
    "tipo": "busca",
    "series": [
     {
      "caso": "comeco",
      "nome": "no começo"
     },
     {
      "caso": "fim",
      "nome": "no fim"
     },
     {
      "caso": "ausente",
      "nome": "ausente (média)"
     },
     {
      "caso": "sorteado",
      "nome": "sorteado (média)"
     }
    ],
    "banda": "sorteado",
    "crescimento": [
     {
      "n": 16,
      "sorteado": {
       "media": 5.75,
       "min": 1,
       "max": 9
      },
      "ausente": {
       "media": 8.235294117647058,
       "min": 8,
       "max": 10
      },
      "comeco": {
       "ops": 7
      },
      "fim": {
       "ops": 9
      }
     },
     {
      "n": 32,
      "sorteado": {
       "media": 7.4375,
       "min": 1,
       "max": 11
      },
      "ausente": {
       "media": 10.121212121212121,
       "min": 10,
       "max": 12
      },
      "comeco": {
       "ops": 9
      },
      "fim": {
       "ops": 11
      }
     },
     {
      "n": 64,
      "sorteado": {
       "media": 9.25,
       "min": 1,
       "max": 13
      },
      "ausente": {
       "media": 12.061538461538461,
       "min": 12,
       "max": 14
      },
      "comeco": {
       "ops": 11
      },
      "fim": {
       "ops": 13
      }
     },
     {
      "n": 128,
      "sorteado": {
       "media": 11.140625,
       "min": 1,
       "max": 15
      },
      "ausente": {
       "media": 14.031007751937985,
       "min": 14,
       "max": 16
      },
      "comeco": {
       "ops": 13
      },
      "fim": {
       "ops": 15
      }
     },
     {
      "n": 256,
      "sorteado": {
       "media": 13.078125,
       "min": 1,
       "max": 17
      },
      "ausente": {
       "media": 16.01556420233463,
       "min": 16,
       "max": 18
      },
      "comeco": {
       "ops": 15
      },
      "fim": {
       "ops": 17
      }
     },
     {
      "n": 512,
      "sorteado": {
       "media": 15.04296875,
       "min": 1,
       "max": 19
      },
      "ausente": {
       "media": 18.007797270955166,
       "min": 18,
       "max": 20
      },
      "comeco": {
       "ops": 17
      },
      "fim": {
       "ops": 19
      }
     },
     {
      "n": 1024,
      "sorteado": {
       "media": 17.0234375,
       "min": 1,
       "max": 21
      },
      "ausente": {
       "media": 20.00390243902439,
       "min": 20,
       "max": 22
      },
      "comeco": {
       "ops": 19
      },
      "fim": {
       "ops": 21
      }
     }
    ],
    "eixo": "n (números; dobra a cada passo)",
    "refs": [
     "n",
     "log₂ n"
    ],
    "crescimento_dados": "sorteado e ausente: média de todos os alvos possíveis (todos os números do vetor, todos os buracos entre eles)",
    "distribuicao": {
     "n": 24,
     "vezes": 24,
     "valores": [
      7,
      9,
      5,
      7,
      9,
      3,
      7,
      9,
      5,
      7,
      9,
      1,
      7,
      9,
      5,
      7,
      9,
      3,
      7,
      9,
      5,
      9,
      7,
      9
     ],
     "destaque": 5
    }
   },
   "memoria": {
    "pico": 0,
    "detalhe": {}
   },
   "ciclomatica": {
    "M": 4,
    "nos": 13,
    "arestas": 15,
    "decisoes": [
     {
      "linha": 4,
      "tipo": "while"
     },
     {
      "linha": 6,
      "tipo": "if"
     },
     {
      "linha": 9,
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
       "rotulo": "while"
      },
      {
       "id": 4,
       "linha": 5,
       "rotulo": "assign"
      },
      {
       "id": 5,
       "linha": 6,
       "rotulo": "if"
      },
      {
       "id": 6,
       "linha": 7,
       "rotulo": "assign"
      },
      {
       "id": 7,
       "linha": 8,
       "rotulo": "break"
      },
      {
       "id": 8,
       "linha": 9,
       "rotulo": "if"
      },
      {
       "id": 9,
       "linha": 10,
       "rotulo": "assign"
      },
      {
       "id": 10,
       "linha": 12,
       "rotulo": "assign"
      },
      {
       "id": 11,
       "linha": 13,
       "rotulo": "return"
      },
      {
       "id": 12,
       "linha": 14,
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
       "de": 5,
       "para": 8,
       "tipo": "segue"
      },
      {
       "de": 8,
       "para": 9,
       "tipo": "segue"
      },
      {
       "de": 8,
       "para": 10,
       "tipo": "segue"
      },
      {
       "de": 9,
       "para": 3,
       "tipo": "volta"
      },
      {
       "de": 10,
       "para": 3,
       "tipo": "volta"
      },
      {
       "de": 3,
       "para": 11,
       "tipo": "segue"
      },
      {
       "de": 7,
       "para": 11,
       "tipo": "segue"
      },
      {
       "de": 11,
       "para": 12,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def busca_binaria(v, alvo, conta):\n    a, b = 0, len(v) - 1\n    achou = -1\n    while a <= b:\n        m = (a + b) // 2\n        if igual(v, m, alvo, conta):\n            achou = m\n            break\n        elif menor(v, m, alvo, conta):\n            a = m + 1\n        else:\n            b = m - 1\n    return achou\n"
   }
  },
  "conferencia": {
   "referencia": "binaria_r() (reimplementação em R) e match()",
   "versao_r": "4.6.0",
   "vetores": 20,
   "tudo_ok": true,
   "resumo": "Reescrito em R 4.6.0 e rodado em 20 buscas em vetores de 50 números (alvo no começo, no fim, ausente e sorteado): a posição achada bate com match() e as comparações batem uma a uma com o Python."
  },
  "pseudocodigo": {
   "assinatura": "busca_binaria(v, alvo)",
   "nome": "busca_binaria",
   "arvore": [
    {
     "tipo": "acao",
     "linha": 2,
     "texto": "a ← 1;  b ← n;  achou ← 0",
     "chamada": false
    },
    {
     "tipo": "laco",
     "rotulo": "enquanto",
     "linha": 3,
     "op": "e",
     "conds": [
      "a ≤ b"
     ],
     "corpo": [
      {
       "tipo": "acao",
       "linha": 4,
       "texto": "m ← ⌊(a + b) / 2⌋",
       "chamada": false
      },
      {
       "tipo": "se",
       "linha": 5,
       "op": "e",
       "conds": [
        "v[m] = alvo"
       ],
       "entao": [
        {
         "tipo": "acao",
         "linha": 6,
         "texto": "achou ← m",
         "chamada": false
        },
        {
         "tipo": "pare",
         "linha": 7
        }
       ],
       "senao": [
        {
         "tipo": "se",
         "linha": 8,
         "op": "e",
         "conds": [
          "v[m] < alvo"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 9,
           "texto": "a ← m + 1",
           "chamada": false
          }
         ],
         "senao": [
          {
           "tipo": "acao",
           "linha": 11,
           "texto": "b ← m − 1",
           "chamada": false
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "tipo": "devolva",
     "linha": 12,
     "texto": "devolva achou"
    }
   ],
   "linhas": [
    "procedimento busca_binaria(v, alvo):",
    "    a ← 1;  b ← n;  achou ← 0",
    "    enquanto a ≤ b:",
    "        m ← ⌊(a + b) / 2⌋",
    "        se v[m] = alvo:",
    "            achou ← m",
    "            pare",
    "        senão se v[m] < alvo:",
    "            a ← m + 1",
    "        senão:",
    "            b ← m − 1",
    "    devolva achou"
   ],
   "M": 4,
   "nos": 12,
   "arestas": 14,
   "decisoes": [
    3,
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
  "alg": "bolha",
  "id": "bubble-sort",
  "nome": "Bubble sort",
  "variante": "com parada antecipada",
  "familia": "ordenação",
  "resumo": "Compara vizinhos e troca os que estão fora de ordem. Cada passada leva o maior número que sobrou para o fim; se uma passada não troca nada, o vetor está pronto.",
  "instrumentos": [
   {
    "id": "vetor",
    "papel": "a entrada, ordenada no próprio vetor"
   }
  ],
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
   "ano": "1956, na primeira descrição conhecida (Edward H. Friend, \"sorting by exchange\"); o nome bubble sort aparece em 1962, com Kenneth Iverson"
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
  "instrumentos": [
   {
    "id": "vetor",
    "papel": "a entrada, ordenada no próprio vetor"
   }
  ],
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
   "ano": "anterior aos computadores; John Mauchly discute uma variante em 1946, nas aulas da Moore School"
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
  "alg": "selecao",
  "id": "selection-sort",
  "nome": "Selection sort",
  "variante": "uma troca por passada",
  "familia": "ordenação",
  "resumo": "Procura o menor número do que ainda falta e o troca com o primeiro do que falta. A cada passada, a frente do vetor ganha um número no lugar final.",
  "instrumentos": [
   {
    "id": "vetor",
    "papel": "a entrada, ordenada no próprio vetor"
   }
  ],
  "tempo": {
   "notacao": "O(n²)",
   "porque": "Para achar o menor, cada passada olha todos os que faltam: (n − 1) + (n − 2) + … + 1 = n(n − 1)/2 comparações. E olha sempre, porque só dá para saber qual é o menor depois de ver todos: a conta não muda com a entrada.",
   "nota": "As trocas são poucas: exatamente n − 1, uma por passada, mesmo num vetor já ordenado (ali, cada número troca com ele mesmo). Por isso o selection serve quando mover um valor custa caro."
  },
  "memoria": {
   "notacao": "O(1)",
   "porque": "Troca dentro do próprio vetor; só guarda a posição do menor até agora e os índices do laço."
  },
  "video": {
   "ideia": [
    "procura o menor do que falta e o traz para a frente",
    "uma troca por passada, seja qual for a entrada"
   ]
  },
  "placa": {
   "autor": "sem autoria única",
   "ano": "—"
  },
  "poster": "algoritmos/selecao/selecao.png",
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
   "ops": 276,
   "movimentos": 23,
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
       "media": 120,
       "min": 120,
       "max": 120,
       "movimentos": 15,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 120,
       "movimentos": 15,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 120,
       "movimentos": 15,
       "pico": 0
      }
     },
     {
      "n": 32,
      "aleatorio": {
       "media": 496,
       "min": 496,
       "max": 496,
       "movimentos": 31,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 496,
       "movimentos": 31,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 496,
       "movimentos": 31,
       "pico": 0
      }
     },
     {
      "n": 64,
      "aleatorio": {
       "media": 2016,
       "min": 2016,
       "max": 2016,
       "movimentos": 63,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 2016,
       "movimentos": 63,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 2016,
       "movimentos": 63,
       "pico": 0
      }
     },
     {
      "n": 128,
      "aleatorio": {
       "media": 8128,
       "min": 8128,
       "max": 8128,
       "movimentos": 127,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 8128,
       "movimentos": 127,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 8128,
       "movimentos": 127,
       "pico": 0
      }
     },
     {
      "n": 256,
      "aleatorio": {
       "media": 32640,
       "min": 32640,
       "max": 32640,
       "movimentos": 255,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 32640,
       "movimentos": 255,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 32640,
       "movimentos": 255,
       "pico": 0
      }
     },
     {
      "n": 512,
      "aleatorio": {
       "media": 130816,
       "min": 130816,
       "max": 130816,
       "movimentos": 511,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 130816,
       "movimentos": 511,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 130816,
       "movimentos": 511,
       "pico": 0
      }
     },
     {
      "n": 1024,
      "aleatorio": {
       "media": 523776,
       "min": 523776,
       "max": 523776,
       "movimentos": 1023,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 523776,
       "movimentos": 1023,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 523776,
       "movimentos": 1023,
       "pico": 0
      }
     }
    ],
    "crescimento_dados": "Aleatório: média de 10 vetores embaralhados por tamanho; ordenado e invertido: um vetor cada",
    "distribuicao": {
     "n": 24,
     "vetores": 200,
     "comparacoes": [
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276,
      276
     ]
    }
   },
   "memoria": {
    "pico": 0,
    "detalhe": {}
   },
   "ciclomatica": {
    "M": 4,
    "nos": 9,
    "arestas": 11,
    "decisoes": [
     {
      "linha": 3,
      "tipo": "for"
     },
     {
      "linha": 5,
      "tipo": "for"
     },
     {
      "linha": 6,
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
       "rotulo": "for"
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
       "rotulo": "if"
      },
      {
       "id": 6,
       "linha": 7,
       "rotulo": "assign"
      },
      {
       "id": 7,
       "linha": 8,
       "rotulo": "expr"
      },
      {
       "id": 8,
       "linha": 9,
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
       "para": 4,
       "tipo": "volta"
      },
      {
       "de": 5,
       "para": 4,
       "tipo": "volta"
      },
      {
       "de": 4,
       "para": 7,
       "tipo": "segue"
      },
      {
       "de": 7,
       "para": 2,
       "tipo": "volta"
      },
      {
       "de": 2,
       "para": 8,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def selecao(v, conta):\n    n = len(v)\n    for i in range(n - 1):\n        m = i\n        for j in range(i + 1, n):\n            if maior(v, m, j, conta):\n                m = j\n        troca(v, i, m, conta)\n"
   }
  },
  "conferencia": {
   "referencia": "selecao_r() (reimplementação em R) e sort()",
   "versao_r": "4.6.0",
   "vetores": 7,
   "tudo_ok": true,
   "resumo": "Reescrito em R 4.6.0 e rodado em 7 vetores de 50 números (5 embaralhados, 1 ordenado, 1 invertido): a ordem final bate com sort() e as comparações e os movimentos batem um a um com o Python."
  },
  "pseudocodigo": {
   "assinatura": "selection_sort(v)",
   "nome": "selection_sort",
   "arvore": [
    {
     "tipo": "laco",
     "rotulo": "para",
     "linha": 2,
     "op": "e",
     "conds": [
      "para i de 1 até n − 1"
     ],
     "corpo": [
      {
       "tipo": "acao",
       "linha": 3,
       "texto": "m ← i",
       "chamada": false
      },
      {
       "tipo": "laco",
       "rotulo": "para",
       "linha": 4,
       "op": "e",
       "conds": [
        "para j de i + 1 até n"
       ],
       "corpo": [
        {
         "tipo": "se",
         "linha": 5,
         "op": "e",
         "conds": [
          "v[m] > v[j]"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 6,
           "texto": "m ← j",
           "chamada": false
          }
         ],
         "senao": null
        }
       ]
      },
      {
       "tipo": "acao",
       "linha": 7,
       "texto": "troque v[i] com v[m]",
       "chamada": false
      }
     ]
    }
   ],
   "linhas": [
    "procedimento selection_sort(v):",
    "    para i de 1 até n − 1:",
    "        m ← i",
    "        para j de i + 1 até n:",
    "            se v[m] > v[j]:",
    "                m ← j",
    "        troque v[i] com v[m]"
   ],
   "M": 4,
   "nos": 8,
   "arestas": 10,
   "decisoes": [
    2,
    4,
    5
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
  "instrumentos": [
   {
    "id": "vetor",
    "papel": "a entrada e a lista auxiliar"
   },
   {
    "id": "pilha",
    "papel": "a pilha de recursão"
   }
  ],
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
  "instrumentos": [
   {
    "id": "vetor",
    "papel": "a entrada, ordenada no próprio vetor"
   },
   {
    "id": "pilha",
    "papel": "a pilha de recursão"
   }
  ],
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
  "alg": "parenteses",
  "id": "parenteses-balanceados",
  "nome": "Parênteses balanceados",
  "variante": "três tipos de símbolo: ( [ {",
  "familia": "estruturas lineares",
  "resumo": "Lê o texto da esquerda para a direita. Cada símbolo que abre vai para a pilha; cada um que fecha tira o do topo, que tem de ser o seu par. Se a pilha está vazia na hora de fechar, se o par não bate ou se sobra alguém na pilha no fim, o texto não está balanceado.",
  "instrumentos": [
   {
    "id": "pilha",
    "papel": "os símbolos que abriram e ainda não fecharam; o último a abrir é o primeiro a fechar"
   }
  ],
  "tempo": {
   "notacao": "O(n)",
   "porque": "Cada símbolo é lido uma vez e custa uma operação na pilha: empilhar se abre, desempilhar se fecha. Empilhar e desempilhar custam 1 cada (só de vez em quando o vetor da pilha dobra), então o total cresce como n.",
   "nota": "Um par errado para a leitura ali mesmo: o custo depende de onde está o erro, mas nunca passa de n."
  },
  "memoria": {
   "notacao": "O(n)",
   "porque": "A pilha guarda os símbolos que abriram e ainda não fecharam. Num texto sorteado, ela sobe e desce e fica bem abaixo de n; no pior caso, o texto só abre e a pilha fica do tamanho dele.",
   "nomes": {
    "simbolos": "símbolos na pilha"
   },
   "cresce_com_n": [
    "simbolos"
   ],
   "vazio": "não guarda nada"
  },
  "video": {
   "ideia": [
    "quem abre vai para a pilha; quem fecha tira o do topo",
    "o último a abrir é o primeiro a fechar"
   ]
  },
  "graficos": {
   "titulo": "Tempo: como cresce, e que texto entra",
   "texto": "As mesmas contas para textos cada vez maiores e para quatro tipos de texto. Em escala logarítmica, quem cresce como n sobe em linha reta, com inclinação 1.",
   "crescimento": "Operações na pilha para n de {n0} a {n1}. {dados}; a faixa cinza vai do menor ao maior dos textos balanceados. Tracejada: n, de referência.",
   "distribuicao": "{vezes} textos balanceados de {nd} símbolos: a pilha mais alta vai de {min} a {max} símbolos. A barra preta é o texto do encarte.",
   "rotulo": "pilha mais alta (n = {nd})",
   "memoria": "Pilha mais alta para cada n, nos quatro tipos de texto (nos sorteados, a maior entre eles). Só abrir enche a pilha com o texto inteiro."
  },
  "placa": {
   "autor": "sem autoria única",
   "ano": "—"
  },
  "poster": "algoritmos/parenteses/parenteses.png",
  "exemplo": {
   "dados": "um texto balanceado de 24 símbolos, sorteado com a semente 11",
   "n": 24,
   "semente": 11,
   "caso": "balanceada",
   "texto": "[[](){()}]{{[{{}(){}}]}}",
   "certo": true,
   "ops": 24,
   "comparacoes": 12,
   "casas": 38
  },
  "medido": {
   "tempo": {
    "unidade": "operações na pilha",
    "tipo": "parenteses",
    "series": [
     {
      "caso": "balanceada",
      "nome": "balanceada (média)"
     },
     {
      "caso": "par_errado",
      "nome": "um par errado (média)"
     },
     {
      "caso": "sobra_aberto",
      "nome": "sobra aberto (média)"
     },
     {
      "caso": "so_abre",
      "nome": "só abre"
     }
    ],
    "banda": "balanceada",
    "crescimento": [
     {
      "n": 16,
      "balanceada": {
       "media": 16,
       "min": 16,
       "max": 16,
       "pico": 6
      },
      "par_errado": {
       "media": 11.2,
       "min": 5,
       "max": 16,
       "pico": 6
      },
      "sobra_aberto": {
       "media": 16,
       "min": 16,
       "max": 16,
       "pico": 6
      },
      "so_abre": {
       "media": 16,
       "min": 16,
       "max": 16,
       "pico": 16
      }
     },
     {
      "n": 32,
      "balanceada": {
       "media": 32,
       "min": 32,
       "max": 32,
       "pico": 9
      },
      "par_errado": {
       "media": 16.3,
       "min": 3,
       "max": 29,
       "pico": 9
      },
      "sobra_aberto": {
       "media": 32,
       "min": 32,
       "max": 32,
       "pico": 9
      },
      "so_abre": {
       "media": 32,
       "min": 32,
       "max": 32,
       "pico": 32
      }
     },
     {
      "n": 64,
      "balanceada": {
       "media": 64,
       "min": 64,
       "max": 64,
       "pico": 19
      },
      "par_errado": {
       "media": 28.5,
       "min": 6,
       "max": 61,
       "pico": 19
      },
      "sobra_aberto": {
       "media": 64,
       "min": 64,
       "max": 64,
       "pico": 19
      },
      "so_abre": {
       "media": 64,
       "min": 64,
       "max": 64,
       "pico": 64
      }
     },
     {
      "n": 128,
      "balanceada": {
       "media": 128,
       "min": 128,
       "max": 128,
       "pico": 25
      },
      "par_errado": {
       "media": 85,
       "min": 10,
       "max": 127,
       "pico": 25
      },
      "sobra_aberto": {
       "media": 128,
       "min": 128,
       "max": 128,
       "pico": 25
      },
      "so_abre": {
       "media": 128,
       "min": 128,
       "max": 128,
       "pico": 128
      }
     },
     {
      "n": 256,
      "balanceada": {
       "media": 256,
       "min": 256,
       "max": 256,
       "pico": 36
      },
      "par_errado": {
       "media": 129.5,
       "min": 21,
       "max": 256,
       "pico": 25
      },
      "sobra_aberto": {
       "media": 256,
       "min": 256,
       "max": 256,
       "pico": 36
      },
      "so_abre": {
       "media": 256,
       "min": 256,
       "max": 256,
       "pico": 256
      }
     },
     {
      "n": 512,
      "balanceada": {
       "media": 512,
       "min": 512,
       "max": 512,
       "pico": 46
      },
      "par_errado": {
       "media": 265.4,
       "min": 55,
       "max": 482,
       "pico": 30
      },
      "sobra_aberto": {
       "media": 512,
       "min": 512,
       "max": 512,
       "pico": 46
      },
      "so_abre": {
       "media": 512,
       "min": 512,
       "max": 512,
       "pico": 512
      }
     },
     {
      "n": 1024,
      "balanceada": {
       "media": 1024,
       "min": 1024,
       "max": 1024,
       "pico": 74
      },
      "par_errado": {
       "media": 328.1,
       "min": 17,
       "max": 948,
       "pico": 29
      },
      "sobra_aberto": {
       "media": 1024,
       "min": 1024,
       "max": 1024,
       "pico": 74
      },
      "so_abre": {
       "media": 1024,
       "min": 1024,
       "max": 1024,
       "pico": 1024
      }
     }
    ],
    "eixo": "n (símbolos; dobra a cada passo)",
    "refs": [
     "n"
    ],
    "crescimento_dados": "média de 10 textos sorteados por tamanho (só abre: um texto)",
    "distribuicao": {
     "n": 24,
     "vezes": 200,
     "valores": [
      6,
      5,
      7,
      5,
      3,
      4,
      5,
      2,
      2,
      2,
      5,
      5,
      4,
      3,
      2,
      4,
      8,
      4,
      5,
      4,
      7,
      10,
      3,
      7,
      6,
      5,
      7,
      4,
      4,
      5,
      5,
      5,
      6,
      4,
      4,
      5,
      8,
      3,
      6,
      6,
      3,
      4,
      4,
      4,
      4,
      5,
      5,
      5,
      3,
      6,
      9,
      4,
      5,
      3,
      4,
      4,
      5,
      4,
      3,
      4,
      2,
      4,
      4,
      6,
      6,
      2,
      4,
      5,
      4,
      5,
      5,
      9,
      3,
      3,
      8,
      3,
      3,
      7,
      3,
      3,
      4,
      3,
      3,
      3,
      5,
      7,
      8,
      4,
      5,
      5,
      4,
      7,
      5,
      6,
      4,
      4,
      5,
      7,
      4,
      4,
      3,
      7,
      4,
      8,
      3,
      3,
      7,
      5,
      3,
      5,
      3,
      4,
      4,
      5,
      8,
      5,
      2,
      6,
      3,
      3,
      3,
      6,
      2,
      3,
      5,
      2,
      3,
      7,
      5,
      8,
      4,
      5,
      9,
      8,
      4,
      3,
      2,
      7,
      8,
      3,
      4,
      2,
      5,
      2,
      7,
      2,
      3,
      5,
      2,
      4,
      3,
      5,
      9,
      5,
      8,
      3,
      4,
      8,
      3,
      5,
      8,
      4,
      4,
      4,
      4,
      6,
      6,
      7,
      6,
      2,
      3,
      6,
      6,
      5,
      8,
      6,
      8,
      5,
      2,
      3,
      3,
      5,
      5,
      5,
      7,
      3,
      7,
      3,
      3,
      6,
      4,
      4,
      8,
      4,
      6,
      7,
      6,
      6,
      6,
      5
     ],
     "destaque": 5
    }
   },
   "memoria": {
    "pico": 5,
    "detalhe": {
     "simbolos": 5
    }
   },
   "ciclomatica": {
    "M": 6,
    "nos": 17,
    "arestas": 21,
    "decisoes": [
     {
      "linha": 4,
      "tipo": "for"
     },
     {
      "linha": 5,
      "tipo": "if"
     },
     {
      "linha": 7,
      "tipo": "if"
     },
     {
      "linha": 12,
      "tipo": "if"
     },
     {
      "linha": 15,
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
       "rotulo": "if"
      },
      {
       "id": 7,
       "linha": 8,
       "rotulo": "assign"
      },
      {
       "id": 8,
       "linha": 9,
       "rotulo": "break"
      },
      {
       "id": 9,
       "linha": 11,
       "rotulo": "assign"
      },
      {
       "id": 10,
       "linha": 12,
       "rotulo": "if"
      },
      {
       "id": 11,
       "linha": 13,
       "rotulo": "assign"
      },
      {
       "id": 12,
       "linha": 14,
       "rotulo": "break"
      },
      {
       "id": 13,
       "linha": 15,
       "rotulo": "if"
      },
      {
       "id": 14,
       "linha": 16,
       "rotulo": "assign"
      },
      {
       "id": 15,
       "linha": 17,
       "rotulo": "return"
      },
      {
       "id": 16,
       "linha": 18,
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
       "de": 4,
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
       "de": 6,
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
       "de": 5,
       "para": 3,
       "tipo": "volta"
      },
      {
       "de": 10,
       "para": 3,
       "tipo": "volta"
      },
      {
       "de": 3,
       "para": 13,
       "tipo": "segue"
      },
      {
       "de": 8,
       "para": 13,
       "tipo": "segue"
      },
      {
       "de": 12,
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
       "de": 13,
       "para": 15,
       "tipo": "segue"
      },
      {
       "de": 15,
       "para": 16,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def balanceado(texto, conta):\n    pilha = Pilha(conta)\n    certo = True\n    for s in texto:\n        if s in ABRE:\n            empilha(pilha, s, conta)\n        elif pilha.n == 0:\n            certo = False\n            break\n        else:\n            topo = desempilha(pilha, conta)\n            if par_errado(topo, s, conta):\n                certo = False\n                break\n    if pilha.n > 0:\n        certo = False\n    return certo\n"
   }
  },
  "conferencia": {
   "referencia": "parenteses_r() (reimplementação em R) e a regra de apagar pares com gsub()",
   "versao_r": "4.6.0",
   "vetores": 25,
   "tudo_ok": true,
   "resumo": "Reescrito em R 4.6.0 e rodado em 25 textos de 50 símbolos (balanceados, com um par errado, sobrando aberto, só abrindo e fechando sem abrir): o veredito bate com o Python e com a regra de apagar pares até não sobrar nenhum, e as operações na pilha, as comparações e a pilha mais alta batem uma a uma."
  },
  "pseudocodigo": {
   "assinatura": "balanceado(texto)",
   "nome": "balanceado",
   "arvore": [
    {
     "tipo": "acao",
     "linha": 2,
     "texto": "pilha ← vazia;  certo ← verdadeiro",
     "chamada": false
    },
    {
     "tipo": "laco",
     "rotulo": "para",
     "linha": 3,
     "op": "e",
     "conds": [
      "para cada símbolo s do texto"
     ],
     "corpo": [
      {
       "tipo": "se",
       "linha": 4,
       "op": "e",
       "conds": [
        "s abre"
       ],
       "entao": [
        {
         "tipo": "acao",
         "linha": 5,
         "texto": "empilhe s",
         "chamada": false
        }
       ],
       "senao": [
        {
         "tipo": "se",
         "linha": 6,
         "op": "e",
         "conds": [
          "a pilha está vazia"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 7,
           "texto": "certo ← falso",
           "chamada": false
          },
          {
           "tipo": "pare",
           "linha": 8
          }
         ],
         "senao": [
          {
           "tipo": "acao",
           "linha": 10,
           "texto": "topo ← desempilhe",
           "chamada": false
          },
          {
           "tipo": "se",
           "linha": 11,
           "op": "e",
           "conds": [
            "topo não é o par de s"
           ],
           "entao": [
            {
             "tipo": "acao",
             "linha": 12,
             "texto": "certo ← falso",
             "chamada": false
            },
            {
             "tipo": "pare",
             "linha": 13
            }
           ],
           "senao": null
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "tipo": "se",
     "linha": 14,
     "op": "e",
     "conds": [
      "a pilha não está vazia"
     ],
     "entao": [
      {
       "tipo": "acao",
       "linha": 15,
       "texto": "certo ← falso",
       "chamada": false
      }
     ],
     "senao": null
    },
    {
     "tipo": "devolva",
     "linha": 16,
     "texto": "devolva certo"
    }
   ],
   "linhas": [
    "procedimento balanceado(texto):",
    "    pilha ← vazia;  certo ← verdadeiro",
    "    para cada símbolo s do texto:",
    "        se s abre:",
    "            empilhe s",
    "        senão se a pilha está vazia:",
    "            certo ← falso",
    "            pare",
    "        senão:",
    "            topo ← desempilhe",
    "            se topo não é o par de s:",
    "                certo ← falso",
    "                pare",
    "    se a pilha não está vazia:",
    "        certo ← falso",
    "    devolva certo"
   ],
   "M": 6,
   "nos": 16,
   "arestas": 20,
   "decisoes": [
    3,
    4,
    6,
    11,
    14
   ]
  }
 },
 {
  "ciclomatica": {
   "porque": "Cada for, while e if, e cada and/or numa condição, abre um caminho a mais pelo código. A complexidade ciclomática conta os caminhos independentes: qualquer percurso pela função é uma combinação deles. É um teto para quantos testes cobrem todos os ramos, não o mínimo.",
   "regra": "Regra de contagem: +1 por for, while, if, if-expressão, except e cada and/or. Compreensões de lista são proibidas na função medida, porque escondem um laço que o grafo não veria."
  },
  "alg": "atendimento",
  "id": "fila-de-atendimento",
  "nome": "Fila de atendimento",
  "variante": "um caixa, minutos inteiros",
  "familia": "estruturas lineares",
  "resumo": "Clientes chegam a um caixa em minutos sorteados. Quem chega com o caixa ocupado entra no fim da fila; quando o caixa fica livre, chama o primeiro da fila. Ao fim, a conta dá a espera média e a maior fila que se formou.",
  "instrumentos": [
   {
    "id": "fila",
    "papel": "os clientes esperando, na versão circular: chamar o próximo custa 1"
   }
  ],
  "tempo": {
   "notacao": "O(n)",
   "porque": "Cada cliente que espera entra na fila uma vez e sai uma vez; quem chega com o caixa livre nem passa por ela. São no máximo 2n operações, e cada uma custa 1 na fila circular.",
   "nota": "Na fila ingênua, chamar o próximo puxa todos os outros uma casa para a frente: num dia lotado, com a fila crescendo, o total vira O(n²)."
  },
  "memoria": {
   "notacao": "O(n)",
   "porque": "A fila guarda quem está esperando. Num dia calmo, quase ninguém; num dia lotado, com mais gente chegando do que o caixa dá conta, a fila cresce sem parar e chega a uma fração de n.",
   "nomes": {
    "fila": "clientes esperando na fila"
   },
   "cresce_com_n": [
    "fila"
   ],
   "vazio": "não guarda nada"
  },
  "video": {
   "ideia": [
    "quem chega com o caixa ocupado entra no fim da fila",
    "o caixa livre chama o primeiro da fila"
   ]
  },
  "graficos": {
   "titulo": "Tempo: como cresce, e o movimento do dia",
   "texto": "As mesmas contas para cada vez mais clientes e para três movimentos: calmo, no limite (chegam tantos quantos o caixa atende) e lotado. Em escala logarítmica, quem cresce como n sobe em linha reta.",
   "crescimento": "Operações na fila para n de {n0} a {n1} clientes. {dados}; a faixa cinza vai do menor ao maior dos sorteios no limite. Tracejada: 2n, o teto (se todos esperassem).",
   "distribuicao": "{vezes} sorteios de {nd} clientes no limite: a maior fila vai de {min} a {max} clientes. A barra preta é o sorteio do encarte.",
   "rotulo": "maior fila (n = {nd})",
   "memoria": "Maior fila para cada n, nos três movimentos (a maior entre os sorteios). Lotado, a fila cresce com n; calmo, quase não sai do lugar."
  },
  "placa": {
   "autor": "sem autoria única",
   "ano": "—"
  },
  "poster": "algoritmos/atendimento/atendimento.png",
  "exemplo": {
   "dados": "24 clientes sorteados com a semente 11: um chega a cada 1 a 5 minutos e é atendido em 1 a 5 minutos",
   "n": 24,
   "semente": 11,
   "caso": "no_limite",
   "chegada": [
    4,
    9,
    13,
    17,
    22,
    27,
    29,
    31,
    36,
    40,
    45,
    47,
    48,
    52,
    55,
    57,
    58,
    63,
    64,
    69,
    73,
    77,
    82,
    84
   ],
   "duracao": [
    5,
    1,
    5,
    1,
    1,
    1,
    2,
    2,
    5,
    1,
    4,
    3,
    4,
    5,
    2,
    5,
    2,
    3,
    4,
    1,
    1,
    4,
    3,
    4
   ],
   "movimentos": {
    "calmo": {
     "chegada": [
      2,
      6
     ],
     "atendimento": [
      1,
      5
     ]
    },
    "no_limite": {
     "chegada": [
      1,
      5
     ],
     "atendimento": [
      1,
      5
     ]
    },
    "lotado": {
     "chegada": [
      1,
      3
     ],
     "atendimento": [
      2,
      4
     ]
    }
   },
   "soma": 68,
   "maior": 3,
   "esperas": [
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    2,
    4,
    4,
    6,
    6,
    10,
    7,
    9,
    8,
    5,
    2,
    1,
    2
   ],
   "ops": 30,
   "casas": 36
  },
  "medido": {
   "tempo": {
    "unidade": "operações na fila",
    "tipo": "atendimento",
    "series": [
     {
      "caso": "calmo",
      "nome": "calmo (média)"
     },
     {
      "caso": "no_limite",
      "nome": "no limite (média)"
     },
     {
      "caso": "lotado",
      "nome": "lotado (média)"
     }
    ],
    "banda": "no_limite",
    "crescimento": [
     {
      "n": 16,
      "calmo": {
       "media": 11,
       "min": 6,
       "max": 18,
       "pico": 2,
       "espera": 0.73125
      },
      "no_limite": {
       "media": 24.2,
       "min": 18,
       "max": 30,
       "pico": 4,
       "espera": 3.425
      },
      "lotado": {
       "media": 29.6,
       "min": 28,
       "max": 30,
       "pico": 7,
       "espera": 8.25625
      }
     },
     {
      "n": 32,
      "calmo": {
       "media": 25,
       "min": 14,
       "max": 34,
       "pico": 3,
       "espera": 1.015625
      },
      "no_limite": {
       "media": 51.2,
       "min": 36,
       "max": 60,
       "pico": 7,
       "espera": 4.85
      },
      "lotado": {
       "media": 61.2,
       "min": 58,
       "max": 62,
       "pico": 13,
       "espera": 15.39375
      }
     },
     {
      "n": 64,
      "calmo": {
       "media": 52.2,
       "min": 34,
       "max": 74,
       "pico": 3,
       "espera": 1.078125
      },
      "no_limite": {
       "media": 113.2,
       "min": 86,
       "max": 124,
       "pico": 12,
       "espera": 8.3796875
      },
      "lotado": {
       "media": 125.8,
       "min": 124,
       "max": 126,
       "pico": 27,
       "espera": 35.940625
      }
     },
     {
      "n": 128,
      "calmo": {
       "media": 99.8,
       "min": 66,
       "max": 132,
       "pico": 4,
       "espera": 1.03359375
      },
      "no_limite": {
       "media": 221,
       "min": 168,
       "max": 254,
       "pico": 16,
       "espera": 9.6953125
      },
      "lotado": {
       "media": 253,
       "min": 250,
       "max": 254,
       "pico": 49,
       "espera": 62.3546875
      }
     },
     {
      "n": 256,
      "calmo": {
       "media": 197.2,
       "min": 156,
       "max": 254,
       "pico": 5,
       "espera": 1.108984375
      },
      "no_limite": {
       "media": 451,
       "min": 408,
       "max": 508,
       "pico": 30,
       "espera": 17.376171875
      },
      "lotado": {
       "media": 509.2,
       "min": 508,
       "max": 510,
       "pico": 93,
       "espera": 127.384375
      }
     },
     {
      "n": 512,
      "calmo": {
       "media": 403.8,
       "min": 336,
       "max": 458,
       "pico": 7,
       "espera": 1.093359375
      },
      "no_limite": {
       "media": 936.6,
       "min": 840,
       "max": 1014,
       "pico": 36,
       "espera": 21.10078125
      },
      "lotado": {
       "media": 1020.8,
       "min": 1018,
       "max": 1022,
       "pico": 189,
       "espera": 259.4751953125
      }
     },
     {
      "n": 1024,
      "calmo": {
       "media": 819.8,
       "min": 712,
       "max": 968,
       "pico": 5,
       "espera": 1.08203125
      },
      "no_limite": {
       "media": 1934.4,
       "min": 1804,
       "max": 2016,
       "pico": 45,
       "espera": 35.38671875
      },
      "lotado": {
       "media": 2045.2,
       "min": 2042,
       "max": 2046,
       "pico": 359,
       "espera": 509.96328125
      }
     }
    ],
    "eixo": "n (clientes; dobra a cada passo)",
    "refs": [
     "2n"
    ],
    "crescimento_dados": "média de 10 sorteios de clientes por tamanho",
    "distribuicao": {
     "n": 24,
     "vezes": 200,
     "valores": [
      2,
      4,
      2,
      4,
      4,
      2,
      5,
      4,
      3,
      3,
      3,
      3,
      7,
      3,
      8,
      5,
      3,
      6,
      4,
      2,
      3,
      5,
      4,
      3,
      3,
      4,
      3,
      5,
      5,
      5,
      5,
      2,
      2,
      4,
      2,
      4,
      3,
      3,
      6,
      4,
      2,
      4,
      2,
      2,
      5,
      4,
      4,
      2,
      5,
      4,
      2,
      5,
      5,
      1,
      3,
      2,
      3,
      2,
      2,
      5,
      4,
      6,
      5,
      6,
      2,
      2,
      4,
      5,
      1,
      2,
      3,
      5,
      1,
      4,
      2,
      2,
      4,
      3,
      2,
      2,
      4,
      4,
      7,
      2,
      3,
      4,
      5,
      4,
      2,
      2,
      2,
      3,
      4,
      2,
      5,
      4,
      4,
      6,
      3,
      3,
      3,
      1,
      6,
      7,
      4,
      3,
      2,
      4,
      2,
      3,
      3,
      2,
      3,
      3,
      3,
      4,
      2,
      2,
      4,
      6,
      2,
      4,
      4,
      5,
      2,
      2,
      5,
      3,
      3,
      4,
      2,
      4,
      3,
      4,
      2,
      4,
      3,
      6,
      2,
      4,
      3,
      3,
      4,
      5,
      3,
      7,
      2,
      3,
      8,
      7,
      3,
      4,
      2,
      1,
      4,
      2,
      6,
      6,
      2,
      3,
      3,
      3,
      4,
      3,
      5,
      5,
      3,
      2,
      4,
      3,
      5,
      2,
      5,
      3,
      2,
      3,
      3,
      4,
      2,
      8,
      4,
      7,
      5,
      4,
      2,
      3,
      3,
      5,
      4,
      4,
      5,
      3,
      2,
      3,
      4,
      2,
      5,
      3,
      2,
      3
     ],
     "destaque": 3
    }
   },
   "memoria": {
    "pico": 3,
    "detalhe": {
     "fila": 3
    }
   },
   "ciclomatica": {
    "M": 5,
    "nos": 20,
    "arestas": 23,
    "decisoes": [
     {
      "linha": 5,
      "tipo": "for"
     },
     {
      "linha": 6,
      "tipo": "and/or"
     },
     {
      "linha": 6,
      "tipo": "while"
     },
     {
      "linha": 10,
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
       "rotulo": "while"
      },
      {
       "id": 6,
       "linha": 6,
       "rotulo": "e"
      },
      {
       "id": 7,
       "linha": 7,
       "rotulo": "expr"
      },
      {
       "id": 8,
       "linha": 8,
       "rotulo": "augassign"
      },
      {
       "id": 9,
       "linha": 9,
       "rotulo": "assign"
      },
      {
       "id": 10,
       "linha": 10,
       "rotulo": "if"
      },
      {
       "id": 11,
       "linha": 11,
       "rotulo": "assign"
      },
      {
       "id": 12,
       "linha": 13,
       "rotulo": "assign"
      },
      {
       "id": 13,
       "linha": 14,
       "rotulo": "augassign"
      },
      {
       "id": 14,
       "linha": 15,
       "rotulo": "assign"
      },
      {
       "id": 15,
       "linha": 16,
       "rotulo": "expr"
      },
      {
       "id": 16,
       "linha": 17,
       "rotulo": "augassign"
      },
      {
       "id": 17,
       "linha": 18,
       "rotulo": "assign"
      },
      {
       "id": 18,
       "linha": 19,
       "rotulo": "return"
      },
      {
       "id": 19,
       "linha": 20,
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
       "para": 5,
       "tipo": "volta"
      },
      {
       "de": 5,
       "para": 10,
       "tipo": "segue"
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
       "de": 10,
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
       "para": 4,
       "tipo": "volta"
      },
      {
       "de": 4,
       "para": 18,
       "tipo": "segue"
      },
      {
       "de": 18,
       "para": 19,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def atender(chegada, duracao, conta):\n    n = len(chegada)\n    fila = FilaCircular(conta)\n    livre, soma, maior, i = 0, 0, 0, 0\n    for _ in range(n):\n        while i < n and chegada[i] < livre:\n            enfileira(fila, i, conta)\n            i += 1\n            maior = max(maior, fila.n)\n        if fila.n > 0:\n            k = desenfileira(fila, conta)\n        else:\n            k = i\n            i += 1\n        inicio = max(livre, chegada[k])\n        conta.evento(\"atende\", k, inicio)\n        soma += inicio - chegada[k]\n        livre = inicio + duracao[k]\n    return soma, maior\n"
   }
  },
  "conferencia": {
   "referencia": "recursão de Lindley em R, sem fila",
   "versao_r": "4.6.0",
   "vetores": 15,
   "tudo_ok": true,
   "resumo": "Refeito em R 4.6.0 pela recursão de Lindley, que calcula a espera de cada cliente sem montar fila nenhuma, em 15 sorteios de 50 clientes (calmo, no limite e lotado): a espera de cada cliente, a maior fila e as operações na fila batem uma a uma com o Python."
  },
  "pseudocodigo": {
   "assinatura": "atender(chegada, duração)",
   "nome": "atender",
   "arvore": [
    {
     "tipo": "acao",
     "linha": 2,
     "texto": "fila ← vazia;  livre ← 0;  i ← 1",
     "chamada": false
    },
    {
     "tipo": "acao",
     "linha": 3,
     "texto": "soma ← 0;  maior ← 0",
     "chamada": false
    },
    {
     "tipo": "laco",
     "rotulo": "para",
     "linha": 4,
     "op": "e",
     "conds": [
      "para cada atendimento, de 1 até n"
     ],
     "corpo": [
      {
       "tipo": "laco",
       "rotulo": "enquanto",
       "linha": 5,
       "op": "e",
       "conds": [
        "i ≤ n",
        "chegada[i] < livre"
       ],
       "corpo": [
        {
         "tipo": "acao",
         "linha": 6,
         "texto": "enfileire i;  i ← i + 1",
         "chamada": false
        },
        {
         "tipo": "acao",
         "linha": 7,
         "texto": "maior ← máximo(maior, tamanho da fila)",
         "chamada": false
        }
       ]
      },
      {
       "tipo": "se",
       "linha": 8,
       "op": "e",
       "conds": [
        "a fila não está vazia"
       ],
       "entao": [
        {
         "tipo": "acao",
         "linha": 9,
         "texto": "k ← desenfileire",
         "chamada": false
        }
       ],
       "senao": [
        {
         "tipo": "acao",
         "linha": 11,
         "texto": "k ← i;  i ← i + 1",
         "chamada": false
        }
       ]
      },
      {
       "tipo": "acao",
       "linha": 12,
       "texto": "início ← máximo(livre, chegada[k])",
       "chamada": false
      },
      {
       "tipo": "acao",
       "linha": 13,
       "texto": "soma ← soma + início − chegada[k]",
       "chamada": false
      },
      {
       "tipo": "acao",
       "linha": 14,
       "texto": "livre ← início + duração[k]",
       "chamada": false
      }
     ]
    },
    {
     "tipo": "devolva",
     "linha": 15,
     "texto": "devolva soma, maior"
    }
   ],
   "linhas": [
    "procedimento atender(chegada, duração):",
    "    fila ← vazia;  livre ← 0;  i ← 1",
    "    soma ← 0;  maior ← 0",
    "    para cada atendimento, de 1 até n:",
    "        enquanto i ≤ n e chegada[i] < livre:",
    "            enfileire i;  i ← i + 1",
    "            maior ← máximo(maior, tamanho da fila)",
    "        se a fila não está vazia:",
    "            k ← desenfileire",
    "        senão:",
    "            k ← i;  i ← i + 1",
    "        início ← máximo(livre, chegada[k])",
    "        soma ← soma + início − chegada[k]",
    "        livre ← início + duração[k]",
    "    devolva soma, maior"
   ],
   "M": 5,
   "nos": 16,
   "arestas": 19,
   "decisoes": [
    4,
    5,
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
  "alg": "largura",
  "id": "busca-em-largura",
  "nome": "Busca em largura",
  "variante": "grafo em grade, a partir de um canto",
  "familia": "grafos",
  "resumo": "Sai da origem e visita o grafo em camadas: primeiro os vizinhos dela, depois os vizinhos dos vizinhos. Quem é visto entra no fim da fila e espera a vez; quem sai da fila tem os vizinhos olhados um por um. A distância de cada vértice à origem, em arestas, sai de graça: é a do vértice que o descobriu mais um.",
  "instrumentos": [
   {
    "id": "grafo",
    "papel": "a lista de adjacência: os vizinhos de u custam grau(u) leituras"
   },
   {
    "id": "fila",
    "papel": "os vértices vistos que esperam a vez, na versão circular; quem foi visto primeiro sai primeiro"
   }
  ],
  "tempo": {
   "notacao": "O(V + E)",
   "porque": "Cada vértice entra na fila uma vez e sai uma vez: 2V operações. Quando ele sai, olha cada vizinho; somando todos os vértices, cada aresta é olhada pelas duas pontas: 2E. O total cresce como V + E.",
   "nota": "Numa matriz de adjacência, olhar os vizinhos de u custa V leituras, seja qual for o grau: o total vira O(V²). Na grade, E fica entre V − 1 e 2V, e V + E cresce como V."
  },
  "memoria": {
   "notacao": "O(V)",
   "porque": "O vetor dist guarda uma distância por vértice: V casas. A fila guarda a fronteira, os vistos que esperam a vez; no caminho ela nunca passa de 1, na grade cheia chega à diagonal, e num grafo em estrela chegaria a V − 1.",
   "nomes": {
    "dist": "distâncias (uma por vértice)",
    "fila": "vértices na fila"
   },
   "cresce_com_n": [
    "dist"
   ],
   "vazados": "na fila, a fronteira da busca",
   "variavel": "V"
  },
  "video": {
   "ideia": [
    "quem é visto entra no fim da fila; quem sai olha os vizinhos",
    "camada por camada: a distância é a do vizinho que descobriu, mais um"
   ]
  },
  "graficos": {
   "titulo": "Tempo: como cresce, e que grafo entra",
   "texto": "As mesmas contas para grades cada vez maiores e para três grafos: sorteado, grade cheia e caminho em serpentina. Em escala logarítmica, quem cresce como V sobe em linha reta, com inclinação 1; os três grafos correm paralelos, separados pelo número de arestas.",
   "crescimento": "Operações na fila e vizinhos olhados para V de {n0} a {n1}. {dados}; a faixa cinza vai do menor ao maior dos grafos sorteados. Tracejada: V, de referência.",
   "distribuicao": "{vezes} grafos sorteados de {nd} vértices: a fila mais longa vai de {min} a {max} vértices. A barra preta é o grafo do encarte.",
   "rotulo": "fila mais longa (V = {nd})",
   "memoria": "A fila mais longa para cada V, nos três grafos (nos sorteados, a maior entre eles). O vetor dist, sempre com V casas, fica de fora. No caminho, a fila nunca passa de 1; na grade cheia, ela é a diagonal, que cresce como a raiz de V."
  },
  "placa": {
   "autor": "Edward F. Moore (o caminho mais curto num labirinto)",
   "ano": "1959"
  },
  "poster": "algoritmos/largura/largura.png",
  "exemplo": {
   "dados": "um grafo em grade 5 × 5 sorteado com a semente 11: 25 vértices e 29 arestas",
   "n": 25,
   "k": 5,
   "semente": 11,
   "caso": "sorteado",
   "arestas": [
    [
     0,
     1
    ],
    [
     0,
     5
    ],
    [
     1,
     2
    ],
    [
     2,
     3
    ],
    [
     2,
     7
    ],
    [
     3,
     4
    ],
    [
     3,
     8
    ],
    [
     5,
     6
    ],
    [
     5,
     10
    ],
    [
     6,
     7
    ],
    [
     6,
     11
    ],
    [
     7,
     8
    ],
    [
     8,
     9
    ],
    [
     8,
     13
    ],
    [
     10,
     11
    ],
    [
     11,
     16
    ],
    [
     12,
     13
    ],
    [
     12,
     17
    ],
    [
     13,
     14
    ],
    [
     14,
     19
    ],
    [
     15,
     16
    ],
    [
     16,
     17
    ],
    [
     16,
     21
    ],
    [
     17,
     22
    ],
    [
     18,
     19
    ],
    [
     18,
     23
    ],
    [
     20,
     21
    ],
    [
     21,
     22
    ],
    [
     23,
     24
    ]
   ],
   "ops": 108,
   "pico": 30,
   "estrutura": 5,
   "casas": 122,
   "visitas": [
    0,
    1,
    5,
    2,
    6,
    10,
    3,
    7,
    11,
    4,
    8,
    16,
    9,
    13,
    15,
    17,
    21,
    12,
    14,
    22,
    20,
    19,
    18,
    23,
    24
   ],
   "dist": [
    0,
    1,
    2,
    3,
    4,
    1,
    2,
    3,
    4,
    5,
    2,
    3,
    6,
    5,
    6,
    5,
    4,
    5,
    8,
    7,
    6,
    5,
    6,
    9,
    10
   ]
  },
  "medido": {
   "tempo": {
    "unidade": "operações na fila e vizinhos olhados",
    "tipo": "grafo",
    "series": [
     {
      "caso": "sorteado",
      "nome": "sorteado (média)"
     },
     {
      "caso": "grade",
      "nome": "grade cheia"
     },
     {
      "caso": "caminho",
      "nome": "caminho"
     }
    ],
    "banda": "sorteado",
    "crescimento": [
     {
      "n": 16,
      "k": 4,
      "sorteado": {
       "media": 67.8,
       "min": 64,
       "max": 70,
       "pico": 5,
       "arestas": 17.9
      },
      "grade": {
       "media": 80,
       "min": 80,
       "max": 80,
       "pico": 4,
       "arestas": 24
      },
      "caminho": {
       "media": 62,
       "min": 62,
       "max": 62,
       "pico": 1,
       "arestas": 15
      }
     },
     {
      "n": 36,
      "k": 6,
      "sorteado": {
       "media": 158.6,
       "min": 146,
       "max": 166,
       "pico": 10,
       "arestas": 43.3
      },
      "grade": {
       "media": 192,
       "min": 192,
       "max": 192,
       "pico": 6,
       "arestas": 60
      },
      "caminho": {
       "media": 142,
       "min": 142,
       "max": 142,
       "pico": 1,
       "arestas": 35
      }
     },
     {
      "n": 64,
      "k": 8,
      "sorteado": {
       "media": 287,
       "min": 276,
       "max": 296,
       "pico": 9,
       "arestas": 79.5
      },
      "grade": {
       "media": 352,
       "min": 352,
       "max": 352,
       "pico": 8,
       "arestas": 112
      },
      "caminho": {
       "media": 254,
       "min": 254,
       "max": 254,
       "pico": 1,
       "arestas": 63
      }
     },
     {
      "n": 121,
      "k": 11,
      "sorteado": {
       "media": 549.4,
       "min": 526,
       "max": 566,
       "pico": 15,
       "arestas": 153.7
      },
      "grade": {
       "media": 682,
       "min": 682,
       "max": 682,
       "pico": 11,
       "arestas": 220
      },
      "caminho": {
       "media": 482,
       "min": 482,
       "max": 482,
       "pico": 1,
       "arestas": 120
      }
     },
     {
      "n": 256,
      "k": 16,
      "sorteado": {
       "media": 1176.8,
       "min": 1148,
       "max": 1212,
       "pico": 23,
       "arestas": 332.4
      },
      "grade": {
       "media": 1472,
       "min": 1472,
       "max": 1472,
       "pico": 16,
       "arestas": 480
      },
      "caminho": {
       "media": 1022,
       "min": 1022,
       "max": 1022,
       "pico": 1,
       "arestas": 255
      }
     },
     {
      "n": 529,
      "k": 23,
      "sorteado": {
       "media": 2446.6,
       "min": 2424,
       "max": 2474,
       "pico": 33,
       "arestas": 694.3
      },
      "grade": {
       "media": 3082,
       "min": 3082,
       "max": 3082,
       "pico": 23,
       "arestas": 1012
      },
      "caminho": {
       "media": 2114,
       "min": 2114,
       "max": 2114,
       "pico": 1,
       "arestas": 528
      }
     },
     {
      "n": 1024,
      "k": 32,
      "sorteado": {
       "media": 4736.6,
       "min": 4704,
       "max": 4778,
       "pico": 43,
       "arestas": 1344.3
      },
      "grade": {
       "media": 6016,
       "min": 6016,
       "max": 6016,
       "pico": 32,
       "arestas": 1984
      },
      "caminho": {
       "media": 4094,
       "min": 4094,
       "max": 4094,
       "pico": 1,
       "arestas": 1023
      }
     },
     {
      "n": 2025,
      "k": 45,
      "sorteado": {
       "media": 9413.8,
       "min": 9376,
       "max": 9462,
       "pico": 65,
       "arestas": 2681.9
      },
      "grade": {
       "media": 11970,
       "min": 11970,
       "max": 11970,
       "pico": 45,
       "arestas": 3960
      },
      "caminho": {
       "media": 8098,
       "min": 8098,
       "max": 8098,
       "pico": 1,
       "arestas": 2024
      }
     },
     {
      "n": 4096,
      "k": 64,
      "sorteado": {
       "media": 19039.8,
       "min": 18956,
       "max": 19118,
       "pico": 84,
       "arestas": 5423.9
      },
      "grade": {
       "media": 24320,
       "min": 24320,
       "max": 24320,
       "pico": 64,
       "arestas": 8064
      },
      "caminho": {
       "media": 16382,
       "min": 16382,
       "max": 16382,
       "pico": 1,
       "arestas": 4095
      }
     }
    ],
    "eixo": "V (vértices de uma grade k × k; quase dobra a cada passo)",
    "refs": [
     "V"
    ],
    "crescimento_dados": "média de 10 grafos sorteados por tamanho (grade cheia e caminho: um grafo, sempre o mesmo)",
    "distribuicao": {
     "n": 25,
     "vezes": 200,
     "valores": [
      5,
      5,
      5,
      5,
      5,
      4,
      5,
      5,
      6,
      5,
      5,
      6,
      5,
      5,
      4,
      5,
      6,
      5,
      6,
      8,
      4,
      5,
      5,
      5,
      5,
      4,
      6,
      5,
      6,
      5,
      6,
      5,
      5,
      3,
      5,
      5,
      5,
      6,
      6,
      5,
      6,
      4,
      5,
      5,
      4,
      6,
      5,
      5,
      6,
      5,
      7,
      6,
      5,
      5,
      4,
      5,
      8,
      5,
      5,
      4,
      5,
      4,
      5,
      4,
      6,
      4,
      7,
      6,
      6,
      5,
      6,
      5,
      5,
      3,
      6,
      4,
      5,
      5,
      5,
      6,
      5,
      4,
      6,
      6,
      6,
      4,
      7,
      6,
      4,
      4,
      6,
      5,
      6,
      5,
      5,
      6,
      5,
      5,
      6,
      5,
      4,
      7,
      4,
      5,
      4,
      5,
      5,
      4,
      5,
      5,
      4,
      4,
      6,
      5,
      5,
      6,
      5,
      6,
      5,
      5,
      5,
      4,
      6,
      7,
      6,
      6,
      6,
      5,
      5,
      5,
      3,
      4,
      5,
      5,
      5,
      7,
      5,
      4,
      6,
      6,
      4,
      6,
      6,
      6,
      5,
      6,
      6,
      6,
      6,
      3,
      4,
      5,
      5,
      5,
      6,
      5,
      4,
      5,
      6,
      5,
      5,
      7,
      5,
      6,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      6,
      5,
      6,
      5,
      7,
      6,
      6,
      5,
      4,
      6,
      6,
      6,
      5,
      5,
      6,
      5,
      6,
      5,
      6,
      5,
      7,
      5,
      6,
      4,
      4,
      5,
      4,
      7
     ],
     "destaque": 5
    }
   },
   "memoria": {
    "pico": 30,
    "detalhe": {
     "dist": 25,
     "fila": 5
    }
   },
   "ciclomatica": {
    "M": 4,
    "nos": 14,
    "arestas": 16,
    "decisoes": [
     {
      "linha": 6,
      "tipo": "while"
     },
     {
      "linha": 8,
      "tipo": "for"
     },
     {
      "linha": 10,
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
       "rotulo": "expr"
      },
      {
       "id": 5,
       "linha": 6,
       "rotulo": "while"
      },
      {
       "id": 6,
       "linha": 7,
       "rotulo": "assign"
      },
      {
       "id": 7,
       "linha": 8,
       "rotulo": "for"
      },
      {
       "id": 8,
       "linha": 9,
       "rotulo": "assign"
      },
      {
       "id": 9,
       "linha": 10,
       "rotulo": "if"
      },
      {
       "id": 10,
       "linha": 11,
       "rotulo": "assign"
      },
      {
       "id": 11,
       "linha": 12,
       "rotulo": "expr"
      },
      {
       "id": 12,
       "linha": 13,
       "rotulo": "return"
      },
      {
       "id": 13,
       "linha": 14,
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
       "para": 7,
       "tipo": "volta"
      },
      {
       "de": 9,
       "para": 7,
       "tipo": "volta"
      },
      {
       "de": 7,
       "para": 5,
       "tipo": "volta"
      },
      {
       "de": 5,
       "para": 12,
       "tipo": "segue"
      },
      {
       "de": 12,
       "para": 13,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def largura(grafo, s, conta):\n    dist = conta.aloca(\"dist\", [None] * grafo.V)     # None = ∞, ainda não visto\n    fila = FilaCircular(conta)\n    dist[s] = 0\n    enfileira(fila, s, conta)\n    while fila.n > 0:\n        u = desenfileira(fila, conta)\n        for i in range(grafo.grau(u)):\n            v = olha(grafo, u, i, conta)\n            if dist[v] is None:\n                dist[v] = dist[u] + 1\n                enfileira(fila, v, conta)\n    return dist\n"
   }
  },
  "conferencia": {
   "referencia": "igraph::bfs() (igraph 2.3.3) e largura_r() (reimplementação em R)",
   "versao_r": "4.6.0",
   "vetores": 16,
   "tudo_ok": true,
   "resumo": "Rodado no R 4.6.0 com o igraph 2.3.3 em 16 grafos (o do encarte e 15 grades 6 × 6: sorteadas, cheias e em caminho): a ordem de visita e a distância de cada vértice batem com o bfs() do igraph, e a reimplementação em R conta as mesmas operações e a mesma fila mais longa."
  },
  "pseudocodigo": {
   "assinatura": "largura(G, s)",
   "nome": "largura",
   "arvore": [
    {
     "tipo": "acao",
     "linha": 2,
     "texto": "dist[v] ← ∞ para todo vértice v",
     "chamada": false
    },
    {
     "tipo": "acao",
     "linha": 3,
     "texto": "dist[s] ← 0;  enfileire s",
     "chamada": false
    },
    {
     "tipo": "laco",
     "rotulo": "enquanto",
     "linha": 4,
     "op": "e",
     "conds": [
      "a fila não está vazia"
     ],
     "corpo": [
      {
       "tipo": "acao",
       "linha": 5,
       "texto": "u ← desenfileire",
       "chamada": false
      },
      {
       "tipo": "laco",
       "rotulo": "para",
       "linha": 6,
       "op": "e",
       "conds": [
        "para cada vizinho v de u"
       ],
       "corpo": [
        {
         "tipo": "se",
         "linha": 7,
         "op": "e",
         "conds": [
          "dist[v] = ∞"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 8,
           "texto": "dist[v] ← dist[u] + 1",
           "chamada": false
          },
          {
           "tipo": "acao",
           "linha": 9,
           "texto": "enfileire v",
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
     "linha": 10,
     "texto": "devolva dist"
    }
   ],
   "linhas": [
    "procedimento largura(G, s):",
    "    dist[v] ← ∞ para todo vértice v",
    "    dist[s] ← 0;  enfileire s",
    "    enquanto a fila não está vazia:",
    "        u ← desenfileire",
    "        para cada vizinho v de u:",
    "            se dist[v] = ∞:",
    "                dist[v] ← dist[u] + 1",
    "                enfileire v",
    "    devolva dist"
   ],
   "M": 4,
   "nos": 11,
   "arestas": 13,
   "decisoes": [
    4,
    6,
    7
   ]
  }
 },
 {
  "ciclomatica": {
   "porque": "Cada for, while e if, e cada and/or numa condição, abre um caminho a mais pelo código. A complexidade ciclomática conta os caminhos independentes: qualquer percurso pela função é uma combinação deles. É um teto para quantos testes cobrem todos os ramos, não o mínimo.",
   "regra": "Regra de contagem: +1 por for, while, if, if-expressão, except e cada and/or. Compreensões de lista são proibidas na função medida, porque escondem um laço que o grafo não veria."
  },
  "alg": "profundidade",
  "id": "busca-em-profundidade",
  "nome": "Busca em profundidade",
  "variante": "grafo em grade, a partir de um canto; pilha no lugar da recursão",
  "familia": "grafos",
  "resumo": "Sai da origem e anda sempre para um vizinho ainda não visto, o mais fundo que der. Quando o vértice da vez não tem mais vizinho novo, volta um passo e tenta o próximo vizinho de quem veio antes. A pilha guarda o caminho de volta: é a recursão escrita à mão, e visita na mesma ordem da versão recursiva.",
  "instrumentos": [
   {
    "id": "grafo",
    "papel": "a lista de adjacência: o próximo vizinho de u custa uma leitura"
   },
   {
    "id": "pilha",
    "papel": "o caminho da origem até o vértice da vez; voltar é desempilhar"
   }
  ],
  "tempo": {
   "notacao": "O(V + E)",
   "porque": "Cada vértice é empilhado e desempilhado uma vez: 2V. Cada aresta é olhada pelas duas pontas: 2E. Antes de cada olhada, e mais uma vez por vértice quando acabam os vizinhos, a busca lê o topo da pilha: 2E + V. O total cresce como V + E.",
   "nota": "Numa matriz de adjacência, achar o próximo vizinho varre a linha do vértice: o total vira O(V²). Na grade, E fica entre V − 1 e 2V, e V + E cresce como V."
  },
  "memoria": {
   "notacao": "O(V)",
   "porque": "Dois vetores de V casas: ordem (o número de visita de cada vértice, 0 se ainda não visto) e próximo (qual vizinho olhar na volta). A pilha guarda o caminho atual: na grade cheia e no caminho, a busca desce por todos os vértices sem voltar, e a pilha chega a V.",
   "nomes": {
    "ordem": "ordem de visita (uma por vértice)",
    "proximo": "próximo vizinho (um por vértice)",
    "pilha": "vértices na pilha"
   },
   "cresce_com_n": [
    "ordem",
    "proximo",
    "pilha"
   ],
   "variavel": "V"
  },
  "video": {
   "ideia": [
    "anda para um vizinho novo; sem vizinho novo, volta um passo",
    "a pilha é o caminho de volta: o último a entrar é o primeiro a sair"
   ]
  },
  "graficos": {
   "titulo": "Tempo: como cresce, e que grafo entra",
   "texto": "As mesmas contas para grades cada vez maiores e para três grafos: sorteado, grade cheia e caminho em serpentina. Em escala logarítmica, quem cresce como V sobe em linha reta, com inclinação 1; os três grafos correm paralelos, separados pelo número de arestas.",
   "crescimento": "Operações na pilha e vizinhos olhados para V de {n0} a {n1}. {dados}; a faixa cinza vai do menor ao maior dos grafos sorteados. Tracejada: V, de referência.",
   "distribuicao": "{vezes} grafos sorteados de {nd} vértices: a pilha mais alta vai de {min} a {max} vértices. A barra preta é o grafo do encarte.",
   "rotulo": "pilha mais alta (V = {nd})",
   "memoria": "A pilha mais alta para cada V, nos três grafos (nos sorteados, a maior entre eles). Os vetores ordem e próximo, sempre com V casas cada, ficam de fora. Na grade cheia e no caminho, a pilha chega a V."
  },
  "placa": {
   "autor": "Charles Pierre Trémaux (saída de labirintos, à mão)",
   "ano": "século XIX"
  },
  "poster": "algoritmos/profundidade/profundidade.png",
  "exemplo": {
   "dados": "um grafo em grade 5 × 5 sorteado com a semente 11: 25 vértices e 29 arestas",
   "n": 25,
   "k": 5,
   "semente": 11,
   "caso": "sorteado",
   "arestas": [
    [
     0,
     1
    ],
    [
     0,
     5
    ],
    [
     1,
     2
    ],
    [
     2,
     3
    ],
    [
     2,
     7
    ],
    [
     3,
     4
    ],
    [
     3,
     8
    ],
    [
     5,
     6
    ],
    [
     5,
     10
    ],
    [
     6,
     7
    ],
    [
     6,
     11
    ],
    [
     7,
     8
    ],
    [
     8,
     9
    ],
    [
     8,
     13
    ],
    [
     10,
     11
    ],
    [
     11,
     16
    ],
    [
     12,
     13
    ],
    [
     12,
     17
    ],
    [
     13,
     14
    ],
    [
     14,
     19
    ],
    [
     15,
     16
    ],
    [
     16,
     17
    ],
    [
     16,
     21
    ],
    [
     17,
     22
    ],
    [
     18,
     19
    ],
    [
     18,
     23
    ],
    [
     20,
     21
    ],
    [
     21,
     22
    ],
    [
     23,
     24
    ]
   ],
   "ops": 191,
   "pico": 69,
   "estrutura": 19,
   "casas": 253,
   "visitas": [
    0,
    1,
    2,
    3,
    4,
    8,
    7,
    6,
    5,
    10,
    11,
    16,
    15,
    17,
    12,
    13,
    14,
    19,
    18,
    23,
    24,
    22,
    21,
    20,
    9
   ],
   "ordem": [
    1,
    2,
    3,
    4,
    5,
    9,
    8,
    7,
    6,
    25,
    10,
    11,
    15,
    16,
    17,
    13,
    12,
    14,
    19,
    18,
    24,
    23,
    22,
    20,
    21
   ]
  },
  "medido": {
   "tempo": {
    "unidade": "operações na pilha e vizinhos olhados",
    "tipo": "grafo",
    "series": [
     {
      "caso": "sorteado",
      "nome": "sorteado (média)"
     },
     {
      "caso": "grade",
      "nome": "grade cheia"
     },
     {
      "caso": "caminho",
      "nome": "caminho"
     }
    ],
    "banda": "sorteado",
    "crescimento": [
     {
      "n": 16,
      "k": 4,
      "sorteado": {
       "media": 119.6,
       "min": 112,
       "max": 124,
       "pico": 14,
       "arestas": 17.9
      },
      "grade": {
       "media": 144,
       "min": 144,
       "max": 144,
       "pico": 16,
       "arestas": 24
      },
      "caminho": {
       "media": 108,
       "min": 108,
       "max": 108,
       "pico": 16,
       "arestas": 15
      }
     },
     {
      "n": 36,
      "k": 6,
      "sorteado": {
       "media": 281.2,
       "min": 256,
       "max": 296,
       "pico": 30,
       "arestas": 43.3
      },
      "grade": {
       "media": 348,
       "min": 348,
       "max": 348,
       "pico": 36,
       "arestas": 60
      },
      "caminho": {
       "media": 248,
       "min": 248,
       "max": 248,
       "pico": 36,
       "arestas": 35
      }
     },
     {
      "n": 64,
      "k": 8,
      "sorteado": {
       "media": 510,
       "min": 488,
       "max": 528,
       "pico": 49,
       "arestas": 79.5
      },
      "grade": {
       "media": 640,
       "min": 640,
       "max": 640,
       "pico": 64,
       "arestas": 112
      },
      "caminho": {
       "media": 444,
       "min": 444,
       "max": 444,
       "pico": 64,
       "arestas": 63
      }
     },
     {
      "n": 121,
      "k": 11,
      "sorteado": {
       "media": 977.8,
       "min": 931,
       "max": 1011,
       "pico": 90,
       "arestas": 153.7
      },
      "grade": {
       "media": 1243,
       "min": 1243,
       "max": 1243,
       "pico": 121,
       "arestas": 220
      },
      "caminho": {
       "media": 843,
       "min": 843,
       "max": 843,
       "pico": 121,
       "arestas": 120
      }
     },
     {
      "n": 256,
      "k": 16,
      "sorteado": {
       "media": 2097.6,
       "min": 2040,
       "max": 2168,
       "pico": 174,
       "arestas": 332.4
      },
      "grade": {
       "media": 2688,
       "min": 2688,
       "max": 2688,
       "pico": 256,
       "arestas": 480
      },
      "caminho": {
       "media": 1788,
       "min": 1788,
       "max": 1788,
       "pico": 256,
       "arestas": 255
      }
     },
     {
      "n": 529,
      "k": 23,
      "sorteado": {
       "media": 4364.2,
       "min": 4319,
       "max": 4419,
       "pico": 367,
       "arestas": 694.3
      },
      "grade": {
       "media": 5635,
       "min": 5635,
       "max": 5635,
       "pico": 529,
       "arestas": 1012
      },
      "caminho": {
       "media": 3699,
       "min": 3699,
       "max": 3699,
       "pico": 529,
       "arestas": 528
      }
     },
     {
      "n": 1024,
      "k": 32,
      "sorteado": {
       "media": 8449.2,
       "min": 8384,
       "max": 8532,
       "pico": 692,
       "arestas": 1344.3
      },
      "grade": {
       "media": 11008,
       "min": 11008,
       "max": 11008,
       "pico": 1024,
       "arestas": 1984
      },
      "caminho": {
       "media": 7164,
       "min": 7164,
       "max": 7164,
       "pico": 1024,
       "arestas": 1023
      }
     },
     {
      "n": 2025,
      "k": 45,
      "sorteado": {
       "media": 16802.6,
       "min": 16727,
       "max": 16899,
       "pico": 1285,
       "arestas": 2681.9
      },
      "grade": {
       "media": 21915,
       "min": 21915,
       "max": 21915,
       "pico": 2025,
       "arestas": 3960
      },
      "caminho": {
       "media": 14171,
       "min": 14171,
       "max": 14171,
       "pico": 2025,
       "arestas": 2024
      }
     },
     {
      "n": 4096,
      "k": 64,
      "sorteado": {
       "media": 33983.6,
       "min": 33816,
       "max": 34140,
       "pico": 2623,
       "arestas": 5423.9
      },
      "grade": {
       "media": 44544,
       "min": 44544,
       "max": 44544,
       "pico": 4096,
       "arestas": 8064
      },
      "caminho": {
       "media": 28668,
       "min": 28668,
       "max": 28668,
       "pico": 4096,
       "arestas": 4095
      }
     }
    ],
    "eixo": "V (vértices de uma grade k × k; quase dobra a cada passo)",
    "refs": [
     "V"
    ],
    "crescimento_dados": "média de 10 grafos sorteados por tamanho (grade cheia e caminho: um grafo, sempre o mesmo)",
    "distribuicao": {
     "n": 25,
     "vezes": 200,
     "valores": [
      14,
      17,
      14,
      19,
      20,
      12,
      17,
      20,
      16,
      19,
      19,
      19,
      21,
      19,
      18,
      16,
      11,
      16,
      19,
      21,
      14,
      19,
      20,
      20,
      17,
      20,
      17,
      18,
      19,
      19,
      19,
      18,
      23,
      19,
      22,
      20,
      18,
      20,
      16,
      19,
      17,
      24,
      19,
      21,
      16,
      13,
      17,
      15,
      17,
      18,
      21,
      20,
      19,
      15,
      17,
      17,
      15,
      15,
      18,
      18,
      21,
      19,
      17,
      19,
      17,
      18,
      15,
      17,
      19,
      15,
      23,
      19,
      16,
      11,
      23,
      13,
      17,
      13,
      17,
      18,
      20,
      21,
      19,
      22,
      18,
      17,
      21,
      19,
      12,
      16,
      12,
      19,
      20,
      17,
      18,
      13,
      22,
      18,
      19,
      22,
      21,
      14,
      13,
      16,
      17,
      21,
      21,
      15,
      19,
      22,
      17,
      20,
      15,
      19,
      14,
      21,
      17,
      17,
      13,
      20,
      21,
      17,
      17,
      17,
      15,
      17,
      15,
      18,
      15,
      22,
      17,
      19,
      19,
      20,
      18,
      20,
      24,
      20,
      15,
      20,
      15,
      19,
      14,
      19,
      17,
      18,
      16,
      17,
      22,
      17,
      16,
      17,
      16,
      23,
      17,
      12,
      14,
      18,
      19,
      12,
      21,
      17,
      16,
      23,
      16,
      15,
      20,
      21,
      17,
      17,
      16,
      17,
      19,
      23,
      19,
      21,
      18,
      14,
      18,
      21,
      12,
      19,
      19,
      16,
      12,
      17,
      14,
      19,
      19,
      18,
      21,
      18,
      15,
      9,
      15,
      20,
      17,
      18,
      10,
      20
     ],
     "destaque": 19
    }
   },
   "memoria": {
    "pico": 69,
    "detalhe": {
     "ordem": 25,
     "proximo": 25,
     "pilha": 19
    }
   },
   "ciclomatica": {
    "M": 4,
    "nos": 19,
    "arestas": 21,
    "decisoes": [
     {
      "linha": 8,
      "tipo": "while"
     },
     {
      "linha": 10,
      "tipo": "if"
     },
     {
      "linha": 13,
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
       "rotulo": "assign"
      },
      {
       "id": 5,
       "linha": 6,
       "rotulo": "assign"
      },
      {
       "id": 6,
       "linha": 7,
       "rotulo": "expr"
      },
      {
       "id": 7,
       "linha": 8,
       "rotulo": "while"
      },
      {
       "id": 8,
       "linha": 9,
       "rotulo": "assign"
      },
      {
       "id": 9,
       "linha": 10,
       "rotulo": "if"
      },
      {
       "id": 10,
       "linha": 11,
       "rotulo": "assign"
      },
      {
       "id": 11,
       "linha": 12,
       "rotulo": "augassign"
      },
      {
       "id": 12,
       "linha": 13,
       "rotulo": "if"
      },
      {
       "id": 13,
       "linha": 14,
       "rotulo": "augassign"
      },
      {
       "id": 14,
       "linha": 15,
       "rotulo": "assign"
      },
      {
       "id": 15,
       "linha": 16,
       "rotulo": "expr"
      },
      {
       "id": 16,
       "linha": 18,
       "rotulo": "expr"
      },
      {
       "id": 17,
       "linha": 19,
       "rotulo": "return"
      },
      {
       "id": 18,
       "linha": 20,
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
       "de": 9,
       "para": 16,
       "tipo": "segue"
      },
      {
       "de": 15,
       "para": 7,
       "tipo": "volta"
      },
      {
       "de": 12,
       "para": 7,
       "tipo": "volta"
      },
      {
       "de": 16,
       "para": 7,
       "tipo": "volta"
      },
      {
       "de": 7,
       "para": 17,
       "tipo": "segue"
      },
      {
       "de": 17,
       "para": 18,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def profundidade(grafo, s, conta):\n    ordem = conta.aloca(\"ordem\", [0] * grafo.V)        # 0 = ainda não visto\n    proximo = conta.aloca(\"proximo\", [0] * grafo.V)    # o próximo vizinho a olhar (a partir de 0)\n    pilha = Pilha(conta)\n    k = 1\n    ordem[s] = k\n    empilha(pilha, s, conta)\n    while pilha.n > 0:\n        u = topo(pilha, conta)\n        if proximo[u] < grafo.grau(u):\n            v = olha(grafo, u, proximo[u], conta)\n            proximo[u] += 1\n            if ordem[v] == 0:\n                k += 1\n                ordem[v] = k\n                empilha(pilha, v, conta)\n        else:\n            desempilha(pilha, conta)\n    return ordem\n"
   }
  },
  "conferencia": {
   "referencia": "igraph::dfs() (igraph 2.3.3) e profundidade_r() (reimplementação recursiva em R)",
   "versao_r": "4.6.0",
   "vetores": 16,
   "tudo_ok": true,
   "resumo": "Rodado no R 4.6.0 com o igraph 2.3.3 em 16 grafos (o do encarte e 15 grades 6 × 6: sorteadas, cheias e em caminho): a ordem de visita bate com o dfs() do igraph, e a versão recursiva em R visita na mesma ordem, conta as mesmas operações e chega à mesma pilha mais alta."
  },
  "pseudocodigo": {
   "assinatura": "profundidade(G, s)",
   "nome": "profundidade",
   "arvore": [
    {
     "tipo": "acao",
     "linha": 2,
     "texto": "ordem[v] ← 0 e próximo[v] ← 1 para todo vértice v",
     "chamada": false
    },
    {
     "tipo": "acao",
     "linha": 3,
     "texto": "k ← 1;  ordem[s] ← k;  empilhe s",
     "chamada": false
    },
    {
     "tipo": "laco",
     "rotulo": "enquanto",
     "linha": 4,
     "op": "e",
     "conds": [
      "a pilha não está vazia"
     ],
     "corpo": [
      {
       "tipo": "acao",
       "linha": 5,
       "texto": "u ← topo da pilha",
       "chamada": false
      },
      {
       "tipo": "se",
       "linha": 6,
       "op": "e",
       "conds": [
        "próximo[u] ≤ grau(u)"
       ],
       "entao": [
        {
         "tipo": "acao",
         "linha": 7,
         "texto": "v ← o próximo[u]-ésimo vizinho de u",
         "chamada": false
        },
        {
         "tipo": "acao",
         "linha": 8,
         "texto": "próximo[u] ← próximo[u] + 1",
         "chamada": false
        },
        {
         "tipo": "se",
         "linha": 9,
         "op": "e",
         "conds": [
          "ordem[v] = 0"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 10,
           "texto": "k ← k + 1;  ordem[v] ← k",
           "chamada": false
          },
          {
           "tipo": "acao",
           "linha": 11,
           "texto": "empilhe v",
           "chamada": false
          }
         ],
         "senao": null
        }
       ],
       "senao": [
        {
         "tipo": "acao",
         "linha": 13,
         "texto": "desempilhe",
         "chamada": false
        }
       ]
      }
     ]
    },
    {
     "tipo": "devolva",
     "linha": 14,
     "texto": "devolva ordem"
    }
   ],
   "linhas": [
    "procedimento profundidade(G, s):",
    "    ordem[v] ← 0 e próximo[v] ← 1 para todo vértice v",
    "    k ← 1;  ordem[s] ← k;  empilhe s",
    "    enquanto a pilha não está vazia:",
    "        u ← topo da pilha",
    "        se próximo[u] ≤ grau(u):",
    "            v ← o próximo[u]-ésimo vizinho de u",
    "            próximo[u] ← próximo[u] + 1",
    "            se ordem[v] = 0:",
    "                k ← k + 1;  ordem[v] ← k",
    "                empilhe v",
    "        senão:",
    "            desempilhe",
    "    devolva ordem"
   ],
   "M": 4,
   "nos": 14,
   "arestas": 16,
   "decisoes": [
    4,
    6,
    9
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
  "instrumentos": [
   {
    "id": "vetor",
    "papel": "os rótulos (um por flor) e os centros"
   }
  ],
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
  "id": "primeiros-passos",
  "titulo": "Primeiros passos",
  "familia": "primeiros passos",
  "frase": "Laços, decisões e recursão: o básico, com as contas à mostra.",
  "em_producao": [
   {
    "nome": "Máximo de um vetor",
    "tempo": "O(n)",
    "memoria": "O(1)"
   },
   {
    "nome": "Multiplicação de matrizes",
    "tempo": "O(n³)",
    "memoria": "O(n²)"
   },
   {
    "nome": "Fatorial recursivo",
    "tempo": "O(n)",
    "memoria": "O(n)"
   },
   {
    "nome": "Fibonacci recursivo",
    "tempo": "O(φⁿ)",
    "memoria": "O(n)"
   },
   {
    "nome": "Fibonacci com memória",
    "tempo": "O(n)",
    "memoria": "O(n)"
   },
   {
    "nome": "Fibonacci iterativo",
    "tempo": "O(n)",
    "memoria": "O(1)"
   },
   {
    "nome": "Busca de padrão ingênua",
    "tempo": "O(n·m)",
    "memoria": "O(1)"
   }
  ]
 },
 {
  "id": "busca",
  "titulo": "Busca",
  "familia": "busca",
  "frase": "Achar um valor num vetor: olhando casa por casa, ou cortando pela metade.",
  "em_producao": []
 },
 {
  "id": "ordenacao",
  "titulo": "Ordenação",
  "familia": "ordenação",
  "frase": "Jeitos de pôr números em ordem. Tocado na sequência, o álbum vai do O(n²) ao O(n log n).",
  "em_producao": [
   {
    "nome": "Heapsort",
    "tempo": "O(n log n)",
    "memoria": "O(1)"
   }
  ]
 },
 {
  "id": "estruturas-lineares",
  "titulo": "Estruturas lineares",
  "familia": "estruturas lineares",
  "frase": "Pilhas, filas e listas trabalhando: quem entra, quem sai e quanto custa.",
  "em_producao": [
   {
    "nome": "Inverter lista encadeada",
    "tempo": "O(n)",
    "memoria": "O(1)"
   },
   {
    "nome": "Máximo em janela deslizante",
    "tempo": "O(n) (ingênuo O(n·k))",
    "memoria": "O(k)"
   }
  ]
 },
 {
  "id": "arvores-e-heaps",
  "titulo": "Árvores e heaps",
  "familia": "árvores e heaps",
  "frase": "Guardar em galhos para achar descendo poucos níveis.",
  "em_producao": [
   {
    "nome": "Percursos de árvore (pré, em, pós-ordem e em largura)",
    "tempo": "O(n)",
    "memoria": "O(h)"
   },
   {
    "nome": "Busca em árvore (em ordem × embaralhado)",
    "tempo": "O(h), h de log n a n",
    "memoria": "O(n)"
   },
   {
    "nome": "Árvore equilibrada (AVL)",
    "tempo": "O(log n) por operação",
    "memoria": "O(n)"
   },
   {
    "nome": "Fila de prioridade",
    "tempo": "O(log n) por operação",
    "memoria": "O(n)"
   }
  ]
 },
 {
  "id": "grafos",
  "titulo": "Grafos",
  "familia": "grafos",
  "frase": "Caminhos, vizinhos e distâncias.",
  "em_producao": [
   {
    "nome": "Dijkstra",
    "tempo": "O((V + E) log V)",
    "memoria": "O(V)"
   }
  ]
 },
 {
  "id": "dispersao",
  "titulo": "Dispersão",
  "familia": "dispersão",
  "frase": "Tabelas de dispersão: achar pela chave sem procurar, até as chaves colidirem.",
  "em_producao": [
   {
    "nome": "Contar palavras",
    "tempo": "O(n) médio",
    "memoria": "O(d)"
   },
   {
    "nome": "Achar repetidos (vetor × dicionário)",
    "tempo": "O(n²) × O(n) médio",
    "memoria": "O(1) × O(n)"
   },
   {
    "nome": "Colisão por encadeamento",
    "tempo": "O(1 + α) médio",
    "memoria": "O(m + n)"
   },
   {
    "nome": "Colisão por sondagem linear",
    "tempo": "O(1/(1 − α)) médio",
    "memoria": "O(m)"
   }
  ]
 },
 {
  "id": "estatistica",
  "titulo": "Estatística",
  "familia": "estatística",
  "frase": "Algoritmos que rodam por trás de uma análise.",
  "em_producao": [
   {
    "nome": "Mediana por quickselect",
    "tempo": "O(n) médio",
    "memoria": "O(1)"
   },
   {
    "nome": "Média e variância em uma passada (Welford)",
    "tempo": "O(n)",
    "memoria": "O(1)"
   },
   {
    "nome": "Histograma",
    "tempo": "O(n)",
    "memoria": "O(c)"
   }
  ]
 }
];
window.INSTRUMENTOS = [{"id": "vetor", "nome": "Vetor", "variante": "dinâmico, com capacidade que dobra quando enche", "frase": "Casas numeradas, uma ao lado da outra.", "resumo": "Guarda os valores em casas contíguas, numeradas a partir de 0. Qualquer casa se alcança direto pelo número dela. O preço aparece quando o meio muda: abrir ou fechar uma casa no começo obriga todos os vizinhos a andar uma casa. E, quando as casas reservadas acabam, o vetor reserva o dobro e copia tudo.", "placa": {"autor": "sem autoria única", "ano": "—"}, "memoria": {"notacao": "O(n)", "porque": "Uma casa por valor, mais a folga: logo depois de dobrar, até metade das casas reservadas está vazia. Depois de n anexações a partir de uma casa, a capacidade fica entre n e 2n. Remover não devolve casas."}, "operacoes": [{"id": "ler", "nome": "ler v[i]", "notacao": "O(1)", "porque": "O endereço da casa i se calcula direto (onde o vetor começa + i): uma leitura, sem passar pelas outras casas."}, {"id": "escrever", "nome": "escrever em v[i]", "notacao": "O(1)", "porque": "Pelo mesmo endereço calculado: uma escrita."}, {"id": "anexar", "nome": "anexar no fim, com folga", "notacao": "O(1)", "porque": "Se ainda sobra casa reservada, é só escrever na primeira livre."}, {"id": "anexar-pior", "nome": "anexar no fim, a mais cara de n seguidas", "notacao": "O(n)", "porque": "Quando o vetor enche, reserva o dobro de casas e copia cada valor (uma leitura e uma escrita por valor) antes de escrever o novo."}, {"id": "anexar-media", "nome": "anexar no fim, média de n seguidas", "notacao": "O(1) amortizado", "porque": "Como a capacidade dobra, as cópias ficam cada vez mais raras: somadas, dão menos de 2n valores copiados ao longo de n anexações. Dividido por n, o custo médio não cresce com n."}, {"id": "inserir-inicio", "nome": "inserir na posição 0", "notacao": "O(n)", "porque": "Cada valor anda uma casa para a direita (uma leitura e uma escrita) antes de a casa 0 ficar livre."}, {"id": "remover-inicio", "nome": "remover da posição 0", "notacao": "O(n)", "porque": "Lê o valor da casa 0 e puxa cada vizinho uma casa para a esquerda."}, {"id": "remover-fim", "nome": "remover do fim", "notacao": "O(1)", "porque": "Lê a última casa; ninguém precisa andar."}, {"id": "buscar", "nome": "buscar um valor que não está lá", "notacao": "O(n)", "porque": "Sem ordem, a busca sequencial lê casa por casa; um valor ausente obriga a ler todas."}], "grafico": [{"id": "anexar", "rotulo": "anexar"}, {"id": "anexar-media", "rotulo": "anexar, média"}, {"id": "inserir-inicio", "rotulo": "inserir em 0"}, {"id": "buscar", "rotulo": "buscar ausente"}, {"id": "ler", "rotulo": "ler v[i]"}], "medido": {"encher": "anexar", "tamanhos": [10, 100, 1000], "operacoes": {"ler": {"estrutura": "vetor", "chamada": "ler", "seguidas": null, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}, "escrever": {"estrutura": "vetor", "chamada": "escrever", "seguidas": null, "tabela": [{"n": 10, "leituras": 0, "escritas": 1}, {"n": 100, "leituras": 0, "escritas": 1}, {"n": 1000, "leituras": 0, "escritas": 1}], "serie": [{"n": 1, "leituras": 0, "escritas": 1}, {"n": 2, "leituras": 0, "escritas": 1}, {"n": 3, "leituras": 0, "escritas": 1}, {"n": 4, "leituras": 0, "escritas": 1}, {"n": 5, "leituras": 0, "escritas": 1}, {"n": 6, "leituras": 0, "escritas": 1}, {"n": 7, "leituras": 0, "escritas": 1}, {"n": 8, "leituras": 0, "escritas": 1}, {"n": 9, "leituras": 0, "escritas": 1}, {"n": 10, "leituras": 0, "escritas": 1}, {"n": 11, "leituras": 0, "escritas": 1}, {"n": 12, "leituras": 0, "escritas": 1}, {"n": 13, "leituras": 0, "escritas": 1}, {"n": 14, "leituras": 0, "escritas": 1}, {"n": 15, "leituras": 0, "escritas": 1}, {"n": 16, "leituras": 0, "escritas": 1}, {"n": 17, "leituras": 0, "escritas": 1}, {"n": 18, "leituras": 0, "escritas": 1}, {"n": 19, "leituras": 0, "escritas": 1}, {"n": 20, "leituras": 0, "escritas": 1}, {"n": 21, "leituras": 0, "escritas": 1}, {"n": 22, "leituras": 0, "escritas": 1}, {"n": 23, "leituras": 0, "escritas": 1}, {"n": 24, "leituras": 0, "escritas": 1}, {"n": 25, "leituras": 0, "escritas": 1}, {"n": 26, "leituras": 0, "escritas": 1}, {"n": 27, "leituras": 0, "escritas": 1}, {"n": 28, "leituras": 0, "escritas": 1}, {"n": 29, "leituras": 0, "escritas": 1}, {"n": 30, "leituras": 0, "escritas": 1}, {"n": 31, "leituras": 0, "escritas": 1}, {"n": 32, "leituras": 0, "escritas": 1}, {"n": 33, "leituras": 0, "escritas": 1}, {"n": 34, "leituras": 0, "escritas": 1}, {"n": 35, "leituras": 0, "escritas": 1}, {"n": 36, "leituras": 0, "escritas": 1}, {"n": 37, "leituras": 0, "escritas": 1}, {"n": 38, "leituras": 0, "escritas": 1}, {"n": 39, "leituras": 0, "escritas": 1}, {"n": 40, "leituras": 0, "escritas": 1}, {"n": 41, "leituras": 0, "escritas": 1}, {"n": 42, "leituras": 0, "escritas": 1}, {"n": 43, "leituras": 0, "escritas": 1}, {"n": 44, "leituras": 0, "escritas": 1}, {"n": 45, "leituras": 0, "escritas": 1}, {"n": 46, "leituras": 0, "escritas": 1}, {"n": 47, "leituras": 0, "escritas": 1}, {"n": 48, "leituras": 0, "escritas": 1}, {"n": 49, "leituras": 0, "escritas": 1}, {"n": 50, "leituras": 0, "escritas": 1}, {"n": 51, "leituras": 0, "escritas": 1}, {"n": 52, "leituras": 0, "escritas": 1}, {"n": 53, "leituras": 0, "escritas": 1}, {"n": 54, "leituras": 0, "escritas": 1}, {"n": 55, "leituras": 0, "escritas": 1}, {"n": 56, "leituras": 0, "escritas": 1}, {"n": 57, "leituras": 0, "escritas": 1}, {"n": 58, "leituras": 0, "escritas": 1}, {"n": 59, "leituras": 0, "escritas": 1}, {"n": 60, "leituras": 0, "escritas": 1}]}, "anexar": {"estrutura": "vetor", "chamada": "anexar", "seguidas": null, "tabela": [{"n": 10, "leituras": 0, "escritas": 1}, {"n": 100, "leituras": 0, "escritas": 1}, {"n": 1000, "leituras": 0, "escritas": 1}], "serie": [{"n": 0, "leituras": 0, "escritas": 1}, {"n": 1, "leituras": 1, "escritas": 2}, {"n": 2, "leituras": 2, "escritas": 3}, {"n": 3, "leituras": 0, "escritas": 1}, {"n": 4, "leituras": 4, "escritas": 5}, {"n": 5, "leituras": 0, "escritas": 1}, {"n": 6, "leituras": 0, "escritas": 1}, {"n": 7, "leituras": 0, "escritas": 1}, {"n": 8, "leituras": 8, "escritas": 9}, {"n": 9, "leituras": 0, "escritas": 1}, {"n": 10, "leituras": 0, "escritas": 1}, {"n": 11, "leituras": 0, "escritas": 1}, {"n": 12, "leituras": 0, "escritas": 1}, {"n": 13, "leituras": 0, "escritas": 1}, {"n": 14, "leituras": 0, "escritas": 1}, {"n": 15, "leituras": 0, "escritas": 1}, {"n": 16, "leituras": 16, "escritas": 17}, {"n": 17, "leituras": 0, "escritas": 1}, {"n": 18, "leituras": 0, "escritas": 1}, {"n": 19, "leituras": 0, "escritas": 1}, {"n": 20, "leituras": 0, "escritas": 1}, {"n": 21, "leituras": 0, "escritas": 1}, {"n": 22, "leituras": 0, "escritas": 1}, {"n": 23, "leituras": 0, "escritas": 1}, {"n": 24, "leituras": 0, "escritas": 1}, {"n": 25, "leituras": 0, "escritas": 1}, {"n": 26, "leituras": 0, "escritas": 1}, {"n": 27, "leituras": 0, "escritas": 1}, {"n": 28, "leituras": 0, "escritas": 1}, {"n": 29, "leituras": 0, "escritas": 1}, {"n": 30, "leituras": 0, "escritas": 1}, {"n": 31, "leituras": 0, "escritas": 1}, {"n": 32, "leituras": 32, "escritas": 33}, {"n": 33, "leituras": 0, "escritas": 1}, {"n": 34, "leituras": 0, "escritas": 1}, {"n": 35, "leituras": 0, "escritas": 1}, {"n": 36, "leituras": 0, "escritas": 1}, {"n": 37, "leituras": 0, "escritas": 1}, {"n": 38, "leituras": 0, "escritas": 1}, {"n": 39, "leituras": 0, "escritas": 1}, {"n": 40, "leituras": 0, "escritas": 1}, {"n": 41, "leituras": 0, "escritas": 1}, {"n": 42, "leituras": 0, "escritas": 1}, {"n": 43, "leituras": 0, "escritas": 1}, {"n": 44, "leituras": 0, "escritas": 1}, {"n": 45, "leituras": 0, "escritas": 1}, {"n": 46, "leituras": 0, "escritas": 1}, {"n": 47, "leituras": 0, "escritas": 1}, {"n": 48, "leituras": 0, "escritas": 1}, {"n": 49, "leituras": 0, "escritas": 1}, {"n": 50, "leituras": 0, "escritas": 1}, {"n": 51, "leituras": 0, "escritas": 1}, {"n": 52, "leituras": 0, "escritas": 1}, {"n": 53, "leituras": 0, "escritas": 1}, {"n": 54, "leituras": 0, "escritas": 1}, {"n": 55, "leituras": 0, "escritas": 1}, {"n": 56, "leituras": 0, "escritas": 1}, {"n": 57, "leituras": 0, "escritas": 1}, {"n": 58, "leituras": 0, "escritas": 1}, {"n": 59, "leituras": 0, "escritas": 1}, {"n": 60, "leituras": 0, "escritas": 1}]}, "anexar-media": {"estrutura": "vetor", "chamada": "anexar", "seguidas": "media", "tabela": [{"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 100, "vezes": 100, "leituras": 127, "escritas": 227}, {"n": 1000, "vezes": 1000, "leituras": 1023, "escritas": 2023}], "serie": [{"n": 1, "vezes": 1, "leituras": 0, "escritas": 1}, {"n": 2, "vezes": 2, "leituras": 1, "escritas": 3}, {"n": 3, "vezes": 3, "leituras": 3, "escritas": 6}, {"n": 4, "vezes": 4, "leituras": 3, "escritas": 7}, {"n": 5, "vezes": 5, "leituras": 7, "escritas": 12}, {"n": 6, "vezes": 6, "leituras": 7, "escritas": 13}, {"n": 7, "vezes": 7, "leituras": 7, "escritas": 14}, {"n": 8, "vezes": 8, "leituras": 7, "escritas": 15}, {"n": 9, "vezes": 9, "leituras": 15, "escritas": 24}, {"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 11, "vezes": 11, "leituras": 15, "escritas": 26}, {"n": 12, "vezes": 12, "leituras": 15, "escritas": 27}, {"n": 13, "vezes": 13, "leituras": 15, "escritas": 28}, {"n": 14, "vezes": 14, "leituras": 15, "escritas": 29}, {"n": 15, "vezes": 15, "leituras": 15, "escritas": 30}, {"n": 16, "vezes": 16, "leituras": 15, "escritas": 31}, {"n": 17, "vezes": 17, "leituras": 31, "escritas": 48}, {"n": 18, "vezes": 18, "leituras": 31, "escritas": 49}, {"n": 19, "vezes": 19, "leituras": 31, "escritas": 50}, {"n": 20, "vezes": 20, "leituras": 31, "escritas": 51}, {"n": 21, "vezes": 21, "leituras": 31, "escritas": 52}, {"n": 22, "vezes": 22, "leituras": 31, "escritas": 53}, {"n": 23, "vezes": 23, "leituras": 31, "escritas": 54}, {"n": 24, "vezes": 24, "leituras": 31, "escritas": 55}, {"n": 25, "vezes": 25, "leituras": 31, "escritas": 56}, {"n": 26, "vezes": 26, "leituras": 31, "escritas": 57}, {"n": 27, "vezes": 27, "leituras": 31, "escritas": 58}, {"n": 28, "vezes": 28, "leituras": 31, "escritas": 59}, {"n": 29, "vezes": 29, "leituras": 31, "escritas": 60}, {"n": 30, "vezes": 30, "leituras": 31, "escritas": 61}, {"n": 31, "vezes": 31, "leituras": 31, "escritas": 62}, {"n": 32, "vezes": 32, "leituras": 31, "escritas": 63}, {"n": 33, "vezes": 33, "leituras": 63, "escritas": 96}, {"n": 34, "vezes": 34, "leituras": 63, "escritas": 97}, {"n": 35, "vezes": 35, "leituras": 63, "escritas": 98}, {"n": 36, "vezes": 36, "leituras": 63, "escritas": 99}, {"n": 37, "vezes": 37, "leituras": 63, "escritas": 100}, {"n": 38, "vezes": 38, "leituras": 63, "escritas": 101}, {"n": 39, "vezes": 39, "leituras": 63, "escritas": 102}, {"n": 40, "vezes": 40, "leituras": 63, "escritas": 103}, {"n": 41, "vezes": 41, "leituras": 63, "escritas": 104}, {"n": 42, "vezes": 42, "leituras": 63, "escritas": 105}, {"n": 43, "vezes": 43, "leituras": 63, "escritas": 106}, {"n": 44, "vezes": 44, "leituras": 63, "escritas": 107}, {"n": 45, "vezes": 45, "leituras": 63, "escritas": 108}, {"n": 46, "vezes": 46, "leituras": 63, "escritas": 109}, {"n": 47, "vezes": 47, "leituras": 63, "escritas": 110}, {"n": 48, "vezes": 48, "leituras": 63, "escritas": 111}, {"n": 49, "vezes": 49, "leituras": 63, "escritas": 112}, {"n": 50, "vezes": 50, "leituras": 63, "escritas": 113}, {"n": 51, "vezes": 51, "leituras": 63, "escritas": 114}, {"n": 52, "vezes": 52, "leituras": 63, "escritas": 115}, {"n": 53, "vezes": 53, "leituras": 63, "escritas": 116}, {"n": 54, "vezes": 54, "leituras": 63, "escritas": 117}, {"n": 55, "vezes": 55, "leituras": 63, "escritas": 118}, {"n": 56, "vezes": 56, "leituras": 63, "escritas": 119}, {"n": 57, "vezes": 57, "leituras": 63, "escritas": 120}, {"n": 58, "vezes": 58, "leituras": 63, "escritas": 121}, {"n": 59, "vezes": 59, "leituras": 63, "escritas": 122}, {"n": 60, "vezes": 60, "leituras": 63, "escritas": 123}]}, "anexar-pior": {"estrutura": "vetor", "chamada": "anexar", "seguidas": "pior", "tabela": [{"n": 10, "k": 9, "leituras": 8, "escritas": 9}, {"n": 100, "k": 65, "leituras": 64, "escritas": 65}, {"n": 1000, "k": 513, "leituras": 512, "escritas": 513}], "serie": []}, "inserir-inicio": {"estrutura": "vetor", "chamada": "inserir", "seguidas": null, "tabela": [{"n": 10, "leituras": 10, "escritas": 11}, {"n": 100, "leituras": 100, "escritas": 101}, {"n": 1000, "leituras": 1000, "escritas": 1001}], "serie": [{"n": 0, "leituras": 0, "escritas": 1}, {"n": 1, "leituras": 2, "escritas": 3}, {"n": 2, "leituras": 4, "escritas": 5}, {"n": 3, "leituras": 3, "escritas": 4}, {"n": 4, "leituras": 8, "escritas": 9}, {"n": 5, "leituras": 5, "escritas": 6}, {"n": 6, "leituras": 6, "escritas": 7}, {"n": 7, "leituras": 7, "escritas": 8}, {"n": 8, "leituras": 16, "escritas": 17}, {"n": 9, "leituras": 9, "escritas": 10}, {"n": 10, "leituras": 10, "escritas": 11}, {"n": 11, "leituras": 11, "escritas": 12}, {"n": 12, "leituras": 12, "escritas": 13}, {"n": 13, "leituras": 13, "escritas": 14}, {"n": 14, "leituras": 14, "escritas": 15}, {"n": 15, "leituras": 15, "escritas": 16}, {"n": 16, "leituras": 32, "escritas": 33}, {"n": 17, "leituras": 17, "escritas": 18}, {"n": 18, "leituras": 18, "escritas": 19}, {"n": 19, "leituras": 19, "escritas": 20}, {"n": 20, "leituras": 20, "escritas": 21}, {"n": 21, "leituras": 21, "escritas": 22}, {"n": 22, "leituras": 22, "escritas": 23}, {"n": 23, "leituras": 23, "escritas": 24}, {"n": 24, "leituras": 24, "escritas": 25}, {"n": 25, "leituras": 25, "escritas": 26}, {"n": 26, "leituras": 26, "escritas": 27}, {"n": 27, "leituras": 27, "escritas": 28}, {"n": 28, "leituras": 28, "escritas": 29}, {"n": 29, "leituras": 29, "escritas": 30}, {"n": 30, "leituras": 30, "escritas": 31}, {"n": 31, "leituras": 31, "escritas": 32}, {"n": 32, "leituras": 64, "escritas": 65}, {"n": 33, "leituras": 33, "escritas": 34}, {"n": 34, "leituras": 34, "escritas": 35}, {"n": 35, "leituras": 35, "escritas": 36}, {"n": 36, "leituras": 36, "escritas": 37}, {"n": 37, "leituras": 37, "escritas": 38}, {"n": 38, "leituras": 38, "escritas": 39}, {"n": 39, "leituras": 39, "escritas": 40}, {"n": 40, "leituras": 40, "escritas": 41}, {"n": 41, "leituras": 41, "escritas": 42}, {"n": 42, "leituras": 42, "escritas": 43}, {"n": 43, "leituras": 43, "escritas": 44}, {"n": 44, "leituras": 44, "escritas": 45}, {"n": 45, "leituras": 45, "escritas": 46}, {"n": 46, "leituras": 46, "escritas": 47}, {"n": 47, "leituras": 47, "escritas": 48}, {"n": 48, "leituras": 48, "escritas": 49}, {"n": 49, "leituras": 49, "escritas": 50}, {"n": 50, "leituras": 50, "escritas": 51}, {"n": 51, "leituras": 51, "escritas": 52}, {"n": 52, "leituras": 52, "escritas": 53}, {"n": 53, "leituras": 53, "escritas": 54}, {"n": 54, "leituras": 54, "escritas": 55}, {"n": 55, "leituras": 55, "escritas": 56}, {"n": 56, "leituras": 56, "escritas": 57}, {"n": 57, "leituras": 57, "escritas": 58}, {"n": 58, "leituras": 58, "escritas": 59}, {"n": 59, "leituras": 59, "escritas": 60}, {"n": 60, "leituras": 60, "escritas": 61}]}, "remover-inicio": {"estrutura": "vetor", "chamada": "remover", "seguidas": null, "tabela": [{"n": 10, "leituras": 10, "escritas": 9}, {"n": 100, "leituras": 100, "escritas": 99}, {"n": 1000, "leituras": 1000, "escritas": 999}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 2, "escritas": 1}, {"n": 3, "leituras": 3, "escritas": 2}, {"n": 4, "leituras": 4, "escritas": 3}, {"n": 5, "leituras": 5, "escritas": 4}, {"n": 6, "leituras": 6, "escritas": 5}, {"n": 7, "leituras": 7, "escritas": 6}, {"n": 8, "leituras": 8, "escritas": 7}, {"n": 9, "leituras": 9, "escritas": 8}, {"n": 10, "leituras": 10, "escritas": 9}, {"n": 11, "leituras": 11, "escritas": 10}, {"n": 12, "leituras": 12, "escritas": 11}, {"n": 13, "leituras": 13, "escritas": 12}, {"n": 14, "leituras": 14, "escritas": 13}, {"n": 15, "leituras": 15, "escritas": 14}, {"n": 16, "leituras": 16, "escritas": 15}, {"n": 17, "leituras": 17, "escritas": 16}, {"n": 18, "leituras": 18, "escritas": 17}, {"n": 19, "leituras": 19, "escritas": 18}, {"n": 20, "leituras": 20, "escritas": 19}, {"n": 21, "leituras": 21, "escritas": 20}, {"n": 22, "leituras": 22, "escritas": 21}, {"n": 23, "leituras": 23, "escritas": 22}, {"n": 24, "leituras": 24, "escritas": 23}, {"n": 25, "leituras": 25, "escritas": 24}, {"n": 26, "leituras": 26, "escritas": 25}, {"n": 27, "leituras": 27, "escritas": 26}, {"n": 28, "leituras": 28, "escritas": 27}, {"n": 29, "leituras": 29, "escritas": 28}, {"n": 30, "leituras": 30, "escritas": 29}, {"n": 31, "leituras": 31, "escritas": 30}, {"n": 32, "leituras": 32, "escritas": 31}, {"n": 33, "leituras": 33, "escritas": 32}, {"n": 34, "leituras": 34, "escritas": 33}, {"n": 35, "leituras": 35, "escritas": 34}, {"n": 36, "leituras": 36, "escritas": 35}, {"n": 37, "leituras": 37, "escritas": 36}, {"n": 38, "leituras": 38, "escritas": 37}, {"n": 39, "leituras": 39, "escritas": 38}, {"n": 40, "leituras": 40, "escritas": 39}, {"n": 41, "leituras": 41, "escritas": 40}, {"n": 42, "leituras": 42, "escritas": 41}, {"n": 43, "leituras": 43, "escritas": 42}, {"n": 44, "leituras": 44, "escritas": 43}, {"n": 45, "leituras": 45, "escritas": 44}, {"n": 46, "leituras": 46, "escritas": 45}, {"n": 47, "leituras": 47, "escritas": 46}, {"n": 48, "leituras": 48, "escritas": 47}, {"n": 49, "leituras": 49, "escritas": 48}, {"n": 50, "leituras": 50, "escritas": 49}, {"n": 51, "leituras": 51, "escritas": 50}, {"n": 52, "leituras": 52, "escritas": 51}, {"n": 53, "leituras": 53, "escritas": 52}, {"n": 54, "leituras": 54, "escritas": 53}, {"n": 55, "leituras": 55, "escritas": 54}, {"n": 56, "leituras": 56, "escritas": 55}, {"n": 57, "leituras": 57, "escritas": 56}, {"n": 58, "leituras": 58, "escritas": 57}, {"n": 59, "leituras": 59, "escritas": 58}, {"n": 60, "leituras": 60, "escritas": 59}]}, "remover-fim": {"estrutura": "vetor", "chamada": "remover", "seguidas": null, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}, "buscar": {"estrutura": "vetor", "chamada": "buscar", "seguidas": null, "tabela": [{"n": 10, "leituras": 10, "escritas": 0}, {"n": 100, "leituras": 100, "escritas": 0}, {"n": 1000, "leituras": 1000, "escritas": 0}], "serie": [{"n": 0, "leituras": 0, "escritas": 0}, {"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 2, "escritas": 0}, {"n": 3, "leituras": 3, "escritas": 0}, {"n": 4, "leituras": 4, "escritas": 0}, {"n": 5, "leituras": 5, "escritas": 0}, {"n": 6, "leituras": 6, "escritas": 0}, {"n": 7, "leituras": 7, "escritas": 0}, {"n": 8, "leituras": 8, "escritas": 0}, {"n": 9, "leituras": 9, "escritas": 0}, {"n": 10, "leituras": 10, "escritas": 0}, {"n": 11, "leituras": 11, "escritas": 0}, {"n": 12, "leituras": 12, "escritas": 0}, {"n": 13, "leituras": 13, "escritas": 0}, {"n": 14, "leituras": 14, "escritas": 0}, {"n": 15, "leituras": 15, "escritas": 0}, {"n": 16, "leituras": 16, "escritas": 0}, {"n": 17, "leituras": 17, "escritas": 0}, {"n": 18, "leituras": 18, "escritas": 0}, {"n": 19, "leituras": 19, "escritas": 0}, {"n": 20, "leituras": 20, "escritas": 0}, {"n": 21, "leituras": 21, "escritas": 0}, {"n": 22, "leituras": 22, "escritas": 0}, {"n": 23, "leituras": 23, "escritas": 0}, {"n": 24, "leituras": 24, "escritas": 0}, {"n": 25, "leituras": 25, "escritas": 0}, {"n": 26, "leituras": 26, "escritas": 0}, {"n": 27, "leituras": 27, "escritas": 0}, {"n": 28, "leituras": 28, "escritas": 0}, {"n": 29, "leituras": 29, "escritas": 0}, {"n": 30, "leituras": 30, "escritas": 0}, {"n": 31, "leituras": 31, "escritas": 0}, {"n": 32, "leituras": 32, "escritas": 0}, {"n": 33, "leituras": 33, "escritas": 0}, {"n": 34, "leituras": 34, "escritas": 0}, {"n": 35, "leituras": 35, "escritas": 0}, {"n": 36, "leituras": 36, "escritas": 0}, {"n": 37, "leituras": 37, "escritas": 0}, {"n": 38, "leituras": 38, "escritas": 0}, {"n": 39, "leituras": 39, "escritas": 0}, {"n": 40, "leituras": 40, "escritas": 0}, {"n": 41, "leituras": 41, "escritas": 0}, {"n": 42, "leituras": 42, "escritas": 0}, {"n": 43, "leituras": 43, "escritas": 0}, {"n": 44, "leituras": 44, "escritas": 0}, {"n": 45, "leituras": 45, "escritas": 0}, {"n": 46, "leituras": 46, "escritas": 0}, {"n": 47, "leituras": 47, "escritas": 0}, {"n": 48, "leituras": 48, "escritas": 0}, {"n": 49, "leituras": 49, "escritas": 0}, {"n": 50, "leituras": 50, "escritas": 0}, {"n": 51, "leituras": 51, "escritas": 0}, {"n": 52, "leituras": 52, "escritas": 0}, {"n": 53, "leituras": 53, "escritas": 0}, {"n": 54, "leituras": 54, "escritas": 0}, {"n": 55, "leituras": 55, "escritas": 0}, {"n": 56, "leituras": 56, "escritas": 0}, {"n": 57, "leituras": 57, "escritas": 0}, {"n": 58, "leituras": 58, "escritas": 0}, {"n": 59, "leituras": 59, "escritas": 0}, {"n": 60, "leituras": 60, "escritas": 0}]}}, "capacidade": {"vetor": [{"n": 0, "casas": 1}, {"n": 1, "casas": 1}, {"n": 2, "casas": 2}, {"n": 3, "casas": 4}, {"n": 4, "casas": 4}, {"n": 5, "casas": 8}, {"n": 6, "casas": 8}, {"n": 7, "casas": 8}, {"n": 8, "casas": 8}, {"n": 9, "casas": 16}, {"n": 10, "casas": 16}, {"n": 11, "casas": 16}, {"n": 12, "casas": 16}, {"n": 13, "casas": 16}, {"n": 14, "casas": 16}, {"n": 15, "casas": 16}, {"n": 16, "casas": 16}, {"n": 17, "casas": 32}, {"n": 18, "casas": 32}, {"n": 19, "casas": 32}, {"n": 20, "casas": 32}, {"n": 21, "casas": 32}, {"n": 22, "casas": 32}, {"n": 23, "casas": 32}, {"n": 24, "casas": 32}, {"n": 25, "casas": 32}, {"n": 26, "casas": 32}, {"n": 27, "casas": 32}, {"n": 28, "casas": 32}, {"n": 29, "casas": 32}, {"n": 30, "casas": 32}, {"n": 31, "casas": 32}, {"n": 32, "casas": 32}, {"n": 33, "casas": 64}, {"n": 34, "casas": 64}, {"n": 35, "casas": 64}, {"n": 36, "casas": 64}, {"n": 37, "casas": 64}, {"n": 38, "casas": 64}, {"n": 39, "casas": 64}, {"n": 40, "casas": 64}, {"n": 41, "casas": 64}, {"n": 42, "casas": 64}, {"n": 43, "casas": 64}, {"n": 44, "casas": 64}, {"n": 45, "casas": 64}, {"n": 46, "casas": 64}, {"n": 47, "casas": 64}, {"n": 48, "casas": 64}, {"n": 49, "casas": 64}, {"n": 50, "casas": 64}, {"n": 51, "casas": 64}, {"n": 52, "casas": 64}, {"n": 53, "casas": 64}, {"n": 54, "casas": 64}, {"n": 55, "casas": 64}, {"n": 56, "casas": 64}, {"n": 57, "casas": 64}, {"n": 58, "casas": 64}, {"n": 59, "casas": 64}, {"n": 60, "casas": 64}]}}}, {"id": "pilha", "nome": "Pilha", "variante": "sobre um vetor dinâmico; o topo é o fim do vetor", "frase": "O último que entra é o primeiro que sai.", "resumo": "Só se mexe no topo: empilhar põe um valor em cima, desempilhar tira o de cima. Montada sobre o vetor, com o topo no fim dele, nenhum valor precisa andar. É a mesma ideia da pilha de chamadas: cada chamada recursiva empilha um nível, e cada retorno desempilha.", "placa": {"autor": "Alan Turing; Friedrich L. Bauer e Klaus Samelson", "ano": "1946 (Turing, \"bury\" e \"unbury\"); 1955, com pedido de patente em 1957 (Bauer e Samelson)"}, "memoria": {"notacao": "O(n)", "porque": "As casas do vetor por baixo: uma por valor empilhado, mais a folga do vetor, que dobra quando enche. Desempilhar não devolve casas."}, "operacoes": [{"id": "empilhar", "nome": "empilhar, com folga", "notacao": "O(1)", "porque": "Anexa no fim do vetor: uma escrita."}, {"id": "empilhar-pior", "nome": "empilhar, o mais caro de n seguidos", "notacao": "O(n)", "porque": "Quando o vetor de baixo enche, ele dobra e copia todos os valores."}, {"id": "empilhar-media", "nome": "empilhar, média de n seguidos", "notacao": "O(1) amortizado", "porque": "As cópias ficam cada vez mais raras, como no vetor: o custo médio não cresce com n."}, {"id": "desempilhar", "nome": "desempilhar", "notacao": "O(1)", "porque": "Lê a última casa e diminui o tamanho; ninguém anda."}, {"id": "topo", "nome": "ver o topo", "notacao": "O(1)", "porque": "Uma leitura da última casa."}], "grafico": [{"id": "empilhar", "rotulo": "empilhar"}, {"id": "empilhar-media", "rotulo": "empilhar, média"}, {"id": "desempilhar", "rotulo": "desempilhar"}], "medido": {"encher": "empilhar", "tamanhos": [10, 100, 1000], "operacoes": {"empilhar": {"estrutura": "pilha", "chamada": "empilhar", "seguidas": null, "tabela": [{"n": 10, "leituras": 0, "escritas": 1}, {"n": 100, "leituras": 0, "escritas": 1}, {"n": 1000, "leituras": 0, "escritas": 1}], "serie": [{"n": 0, "leituras": 0, "escritas": 1}, {"n": 1, "leituras": 1, "escritas": 2}, {"n": 2, "leituras": 2, "escritas": 3}, {"n": 3, "leituras": 0, "escritas": 1}, {"n": 4, "leituras": 4, "escritas": 5}, {"n": 5, "leituras": 0, "escritas": 1}, {"n": 6, "leituras": 0, "escritas": 1}, {"n": 7, "leituras": 0, "escritas": 1}, {"n": 8, "leituras": 8, "escritas": 9}, {"n": 9, "leituras": 0, "escritas": 1}, {"n": 10, "leituras": 0, "escritas": 1}, {"n": 11, "leituras": 0, "escritas": 1}, {"n": 12, "leituras": 0, "escritas": 1}, {"n": 13, "leituras": 0, "escritas": 1}, {"n": 14, "leituras": 0, "escritas": 1}, {"n": 15, "leituras": 0, "escritas": 1}, {"n": 16, "leituras": 16, "escritas": 17}, {"n": 17, "leituras": 0, "escritas": 1}, {"n": 18, "leituras": 0, "escritas": 1}, {"n": 19, "leituras": 0, "escritas": 1}, {"n": 20, "leituras": 0, "escritas": 1}, {"n": 21, "leituras": 0, "escritas": 1}, {"n": 22, "leituras": 0, "escritas": 1}, {"n": 23, "leituras": 0, "escritas": 1}, {"n": 24, "leituras": 0, "escritas": 1}, {"n": 25, "leituras": 0, "escritas": 1}, {"n": 26, "leituras": 0, "escritas": 1}, {"n": 27, "leituras": 0, "escritas": 1}, {"n": 28, "leituras": 0, "escritas": 1}, {"n": 29, "leituras": 0, "escritas": 1}, {"n": 30, "leituras": 0, "escritas": 1}, {"n": 31, "leituras": 0, "escritas": 1}, {"n": 32, "leituras": 32, "escritas": 33}, {"n": 33, "leituras": 0, "escritas": 1}, {"n": 34, "leituras": 0, "escritas": 1}, {"n": 35, "leituras": 0, "escritas": 1}, {"n": 36, "leituras": 0, "escritas": 1}, {"n": 37, "leituras": 0, "escritas": 1}, {"n": 38, "leituras": 0, "escritas": 1}, {"n": 39, "leituras": 0, "escritas": 1}, {"n": 40, "leituras": 0, "escritas": 1}, {"n": 41, "leituras": 0, "escritas": 1}, {"n": 42, "leituras": 0, "escritas": 1}, {"n": 43, "leituras": 0, "escritas": 1}, {"n": 44, "leituras": 0, "escritas": 1}, {"n": 45, "leituras": 0, "escritas": 1}, {"n": 46, "leituras": 0, "escritas": 1}, {"n": 47, "leituras": 0, "escritas": 1}, {"n": 48, "leituras": 0, "escritas": 1}, {"n": 49, "leituras": 0, "escritas": 1}, {"n": 50, "leituras": 0, "escritas": 1}, {"n": 51, "leituras": 0, "escritas": 1}, {"n": 52, "leituras": 0, "escritas": 1}, {"n": 53, "leituras": 0, "escritas": 1}, {"n": 54, "leituras": 0, "escritas": 1}, {"n": 55, "leituras": 0, "escritas": 1}, {"n": 56, "leituras": 0, "escritas": 1}, {"n": 57, "leituras": 0, "escritas": 1}, {"n": 58, "leituras": 0, "escritas": 1}, {"n": 59, "leituras": 0, "escritas": 1}, {"n": 60, "leituras": 0, "escritas": 1}]}, "empilhar-media": {"estrutura": "pilha", "chamada": "empilhar", "seguidas": "media", "tabela": [{"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 100, "vezes": 100, "leituras": 127, "escritas": 227}, {"n": 1000, "vezes": 1000, "leituras": 1023, "escritas": 2023}], "serie": [{"n": 1, "vezes": 1, "leituras": 0, "escritas": 1}, {"n": 2, "vezes": 2, "leituras": 1, "escritas": 3}, {"n": 3, "vezes": 3, "leituras": 3, "escritas": 6}, {"n": 4, "vezes": 4, "leituras": 3, "escritas": 7}, {"n": 5, "vezes": 5, "leituras": 7, "escritas": 12}, {"n": 6, "vezes": 6, "leituras": 7, "escritas": 13}, {"n": 7, "vezes": 7, "leituras": 7, "escritas": 14}, {"n": 8, "vezes": 8, "leituras": 7, "escritas": 15}, {"n": 9, "vezes": 9, "leituras": 15, "escritas": 24}, {"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 11, "vezes": 11, "leituras": 15, "escritas": 26}, {"n": 12, "vezes": 12, "leituras": 15, "escritas": 27}, {"n": 13, "vezes": 13, "leituras": 15, "escritas": 28}, {"n": 14, "vezes": 14, "leituras": 15, "escritas": 29}, {"n": 15, "vezes": 15, "leituras": 15, "escritas": 30}, {"n": 16, "vezes": 16, "leituras": 15, "escritas": 31}, {"n": 17, "vezes": 17, "leituras": 31, "escritas": 48}, {"n": 18, "vezes": 18, "leituras": 31, "escritas": 49}, {"n": 19, "vezes": 19, "leituras": 31, "escritas": 50}, {"n": 20, "vezes": 20, "leituras": 31, "escritas": 51}, {"n": 21, "vezes": 21, "leituras": 31, "escritas": 52}, {"n": 22, "vezes": 22, "leituras": 31, "escritas": 53}, {"n": 23, "vezes": 23, "leituras": 31, "escritas": 54}, {"n": 24, "vezes": 24, "leituras": 31, "escritas": 55}, {"n": 25, "vezes": 25, "leituras": 31, "escritas": 56}, {"n": 26, "vezes": 26, "leituras": 31, "escritas": 57}, {"n": 27, "vezes": 27, "leituras": 31, "escritas": 58}, {"n": 28, "vezes": 28, "leituras": 31, "escritas": 59}, {"n": 29, "vezes": 29, "leituras": 31, "escritas": 60}, {"n": 30, "vezes": 30, "leituras": 31, "escritas": 61}, {"n": 31, "vezes": 31, "leituras": 31, "escritas": 62}, {"n": 32, "vezes": 32, "leituras": 31, "escritas": 63}, {"n": 33, "vezes": 33, "leituras": 63, "escritas": 96}, {"n": 34, "vezes": 34, "leituras": 63, "escritas": 97}, {"n": 35, "vezes": 35, "leituras": 63, "escritas": 98}, {"n": 36, "vezes": 36, "leituras": 63, "escritas": 99}, {"n": 37, "vezes": 37, "leituras": 63, "escritas": 100}, {"n": 38, "vezes": 38, "leituras": 63, "escritas": 101}, {"n": 39, "vezes": 39, "leituras": 63, "escritas": 102}, {"n": 40, "vezes": 40, "leituras": 63, "escritas": 103}, {"n": 41, "vezes": 41, "leituras": 63, "escritas": 104}, {"n": 42, "vezes": 42, "leituras": 63, "escritas": 105}, {"n": 43, "vezes": 43, "leituras": 63, "escritas": 106}, {"n": 44, "vezes": 44, "leituras": 63, "escritas": 107}, {"n": 45, "vezes": 45, "leituras": 63, "escritas": 108}, {"n": 46, "vezes": 46, "leituras": 63, "escritas": 109}, {"n": 47, "vezes": 47, "leituras": 63, "escritas": 110}, {"n": 48, "vezes": 48, "leituras": 63, "escritas": 111}, {"n": 49, "vezes": 49, "leituras": 63, "escritas": 112}, {"n": 50, "vezes": 50, "leituras": 63, "escritas": 113}, {"n": 51, "vezes": 51, "leituras": 63, "escritas": 114}, {"n": 52, "vezes": 52, "leituras": 63, "escritas": 115}, {"n": 53, "vezes": 53, "leituras": 63, "escritas": 116}, {"n": 54, "vezes": 54, "leituras": 63, "escritas": 117}, {"n": 55, "vezes": 55, "leituras": 63, "escritas": 118}, {"n": 56, "vezes": 56, "leituras": 63, "escritas": 119}, {"n": 57, "vezes": 57, "leituras": 63, "escritas": 120}, {"n": 58, "vezes": 58, "leituras": 63, "escritas": 121}, {"n": 59, "vezes": 59, "leituras": 63, "escritas": 122}, {"n": 60, "vezes": 60, "leituras": 63, "escritas": 123}]}, "empilhar-pior": {"estrutura": "pilha", "chamada": "empilhar", "seguidas": "pior", "tabela": [{"n": 10, "k": 9, "leituras": 8, "escritas": 9}, {"n": 100, "k": 65, "leituras": 64, "escritas": 65}, {"n": 1000, "k": 513, "leituras": 512, "escritas": 513}], "serie": []}, "desempilhar": {"estrutura": "pilha", "chamada": "desempilhar", "seguidas": null, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}, "topo": {"estrutura": "pilha", "chamada": "topo", "seguidas": null, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}}, "capacidade": {"pilha": [{"n": 0, "casas": 1}, {"n": 1, "casas": 1}, {"n": 2, "casas": 2}, {"n": 3, "casas": 4}, {"n": 4, "casas": 4}, {"n": 5, "casas": 8}, {"n": 6, "casas": 8}, {"n": 7, "casas": 8}, {"n": 8, "casas": 8}, {"n": 9, "casas": 16}, {"n": 10, "casas": 16}, {"n": 11, "casas": 16}, {"n": 12, "casas": 16}, {"n": 13, "casas": 16}, {"n": 14, "casas": 16}, {"n": 15, "casas": 16}, {"n": 16, "casas": 16}, {"n": 17, "casas": 32}, {"n": 18, "casas": 32}, {"n": 19, "casas": 32}, {"n": 20, "casas": 32}, {"n": 21, "casas": 32}, {"n": 22, "casas": 32}, {"n": 23, "casas": 32}, {"n": 24, "casas": 32}, {"n": 25, "casas": 32}, {"n": 26, "casas": 32}, {"n": 27, "casas": 32}, {"n": 28, "casas": 32}, {"n": 29, "casas": 32}, {"n": 30, "casas": 32}, {"n": 31, "casas": 32}, {"n": 32, "casas": 32}, {"n": 33, "casas": 64}, {"n": 34, "casas": 64}, {"n": 35, "casas": 64}, {"n": 36, "casas": 64}, {"n": 37, "casas": 64}, {"n": 38, "casas": 64}, {"n": 39, "casas": 64}, {"n": 40, "casas": 64}, {"n": 41, "casas": 64}, {"n": 42, "casas": 64}, {"n": 43, "casas": 64}, {"n": 44, "casas": 64}, {"n": 45, "casas": 64}, {"n": 46, "casas": 64}, {"n": 47, "casas": 64}, {"n": 48, "casas": 64}, {"n": 49, "casas": 64}, {"n": 50, "casas": 64}, {"n": 51, "casas": 64}, {"n": 52, "casas": 64}, {"n": 53, "casas": 64}, {"n": 54, "casas": 64}, {"n": 55, "casas": 64}, {"n": 56, "casas": 64}, {"n": 57, "casas": 64}, {"n": 58, "casas": 64}, {"n": 59, "casas": 64}, {"n": 60, "casas": 64}]}}}, {"id": "fila", "nome": "Fila", "variante": "duas versões: ingênua e circular", "frase": "O primeiro que entra é o primeiro que sai.", "resumo": "Entra-se pelo fim e sai-se pelo começo. Na fila ingênua, o primeiro mora na casa 0 do vetor, e cada saída puxa todos os outros uma casa para a frente. Na fila circular, ninguém anda: quem anda é o marcador do início, que dá a volta quando chega ao fim do vetor.", "placa": {"autor": "sem autoria única", "ano": "—"}, "memoria": {"notacao": "O(n)", "porque": "Nas duas, uma casa por valor na fila mais a folga do vetor, que dobra quando enche; desenfileirar não devolve casas. A circular guarda também onde a fila começa."}, "variantes": {"ingenua": "ingênua", "circular": "circular"}, "operacoes": [{"id": "enfileirar-ingenua", "nome": "enfileirar, com folga", "notacao": "O(1)", "porque": "Escreve na casa logo depois do último."}, {"id": "enfileirar-circular", "nome": "enfileirar, com folga", "notacao": "O(1)", "porque": "Escreve na casa logo depois do último, dando a volta se passar do fim do vetor."}, {"id": "enfileirar-pior-circular", "nome": "enfileirar, o mais caro de n seguidos", "notacao": "O(n)", "porque": "Quando enche, dobra e copia a fila na ordem, a partir da casa 0. Na ingênua, o mesmo."}, {"id": "enfileirar-media-circular", "nome": "enfileirar, média de n seguidos", "notacao": "O(1) amortizado", "porque": "As cópias ficam cada vez mais raras: o custo médio não cresce com n. Na ingênua, o mesmo."}, {"id": "desenfileirar-ingenua", "nome": "desenfileirar", "notacao": "O(n)", "porque": "Tira o valor da casa 0 e puxa cada um dos outros uma casa para a frente."}, {"id": "desenfileirar-circular", "nome": "desenfileirar", "notacao": "O(1)", "porque": "Lê a casa do início e anda o marcador do início uma casa. Ninguém se desloca."}, {"id": "primeiro-ingenua", "nome": "ver o primeiro", "notacao": "O(1)", "porque": "Uma leitura da casa 0."}, {"id": "primeiro-circular", "nome": "ver o primeiro", "notacao": "O(1)", "porque": "Uma leitura da casa do início."}], "grafico": [{"id": "desenfileirar-ingenua", "rotulo": "desenfileirar, ingênua"}, {"id": "desenfileirar-circular", "rotulo": "desenfileirar, circular"}, {"id": "enfileirar-circular", "rotulo": "enfileirar"}, {"id": "enfileirar-media-circular", "rotulo": "enfileirar, média"}], "medido": {"encher": "enfileirar", "tamanhos": [10, 100, 1000], "operacoes": {"enfileirar-ingenua": {"estrutura": "ingenua", "chamada": "enfileirar", "seguidas": null, "tabela": [{"n": 10, "leituras": 0, "escritas": 1}, {"n": 100, "leituras": 0, "escritas": 1}, {"n": 1000, "leituras": 0, "escritas": 1}], "serie": [{"n": 0, "leituras": 0, "escritas": 1}, {"n": 1, "leituras": 1, "escritas": 2}, {"n": 2, "leituras": 2, "escritas": 3}, {"n": 3, "leituras": 0, "escritas": 1}, {"n": 4, "leituras": 4, "escritas": 5}, {"n": 5, "leituras": 0, "escritas": 1}, {"n": 6, "leituras": 0, "escritas": 1}, {"n": 7, "leituras": 0, "escritas": 1}, {"n": 8, "leituras": 8, "escritas": 9}, {"n": 9, "leituras": 0, "escritas": 1}, {"n": 10, "leituras": 0, "escritas": 1}, {"n": 11, "leituras": 0, "escritas": 1}, {"n": 12, "leituras": 0, "escritas": 1}, {"n": 13, "leituras": 0, "escritas": 1}, {"n": 14, "leituras": 0, "escritas": 1}, {"n": 15, "leituras": 0, "escritas": 1}, {"n": 16, "leituras": 16, "escritas": 17}, {"n": 17, "leituras": 0, "escritas": 1}, {"n": 18, "leituras": 0, "escritas": 1}, {"n": 19, "leituras": 0, "escritas": 1}, {"n": 20, "leituras": 0, "escritas": 1}, {"n": 21, "leituras": 0, "escritas": 1}, {"n": 22, "leituras": 0, "escritas": 1}, {"n": 23, "leituras": 0, "escritas": 1}, {"n": 24, "leituras": 0, "escritas": 1}, {"n": 25, "leituras": 0, "escritas": 1}, {"n": 26, "leituras": 0, "escritas": 1}, {"n": 27, "leituras": 0, "escritas": 1}, {"n": 28, "leituras": 0, "escritas": 1}, {"n": 29, "leituras": 0, "escritas": 1}, {"n": 30, "leituras": 0, "escritas": 1}, {"n": 31, "leituras": 0, "escritas": 1}, {"n": 32, "leituras": 32, "escritas": 33}, {"n": 33, "leituras": 0, "escritas": 1}, {"n": 34, "leituras": 0, "escritas": 1}, {"n": 35, "leituras": 0, "escritas": 1}, {"n": 36, "leituras": 0, "escritas": 1}, {"n": 37, "leituras": 0, "escritas": 1}, {"n": 38, "leituras": 0, "escritas": 1}, {"n": 39, "leituras": 0, "escritas": 1}, {"n": 40, "leituras": 0, "escritas": 1}, {"n": 41, "leituras": 0, "escritas": 1}, {"n": 42, "leituras": 0, "escritas": 1}, {"n": 43, "leituras": 0, "escritas": 1}, {"n": 44, "leituras": 0, "escritas": 1}, {"n": 45, "leituras": 0, "escritas": 1}, {"n": 46, "leituras": 0, "escritas": 1}, {"n": 47, "leituras": 0, "escritas": 1}, {"n": 48, "leituras": 0, "escritas": 1}, {"n": 49, "leituras": 0, "escritas": 1}, {"n": 50, "leituras": 0, "escritas": 1}, {"n": 51, "leituras": 0, "escritas": 1}, {"n": 52, "leituras": 0, "escritas": 1}, {"n": 53, "leituras": 0, "escritas": 1}, {"n": 54, "leituras": 0, "escritas": 1}, {"n": 55, "leituras": 0, "escritas": 1}, {"n": 56, "leituras": 0, "escritas": 1}, {"n": 57, "leituras": 0, "escritas": 1}, {"n": 58, "leituras": 0, "escritas": 1}, {"n": 59, "leituras": 0, "escritas": 1}, {"n": 60, "leituras": 0, "escritas": 1}]}, "enfileirar-media-ingenua": {"estrutura": "ingenua", "chamada": "enfileirar", "seguidas": "media", "tabela": [{"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 100, "vezes": 100, "leituras": 127, "escritas": 227}, {"n": 1000, "vezes": 1000, "leituras": 1023, "escritas": 2023}], "serie": [{"n": 1, "vezes": 1, "leituras": 0, "escritas": 1}, {"n": 2, "vezes": 2, "leituras": 1, "escritas": 3}, {"n": 3, "vezes": 3, "leituras": 3, "escritas": 6}, {"n": 4, "vezes": 4, "leituras": 3, "escritas": 7}, {"n": 5, "vezes": 5, "leituras": 7, "escritas": 12}, {"n": 6, "vezes": 6, "leituras": 7, "escritas": 13}, {"n": 7, "vezes": 7, "leituras": 7, "escritas": 14}, {"n": 8, "vezes": 8, "leituras": 7, "escritas": 15}, {"n": 9, "vezes": 9, "leituras": 15, "escritas": 24}, {"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 11, "vezes": 11, "leituras": 15, "escritas": 26}, {"n": 12, "vezes": 12, "leituras": 15, "escritas": 27}, {"n": 13, "vezes": 13, "leituras": 15, "escritas": 28}, {"n": 14, "vezes": 14, "leituras": 15, "escritas": 29}, {"n": 15, "vezes": 15, "leituras": 15, "escritas": 30}, {"n": 16, "vezes": 16, "leituras": 15, "escritas": 31}, {"n": 17, "vezes": 17, "leituras": 31, "escritas": 48}, {"n": 18, "vezes": 18, "leituras": 31, "escritas": 49}, {"n": 19, "vezes": 19, "leituras": 31, "escritas": 50}, {"n": 20, "vezes": 20, "leituras": 31, "escritas": 51}, {"n": 21, "vezes": 21, "leituras": 31, "escritas": 52}, {"n": 22, "vezes": 22, "leituras": 31, "escritas": 53}, {"n": 23, "vezes": 23, "leituras": 31, "escritas": 54}, {"n": 24, "vezes": 24, "leituras": 31, "escritas": 55}, {"n": 25, "vezes": 25, "leituras": 31, "escritas": 56}, {"n": 26, "vezes": 26, "leituras": 31, "escritas": 57}, {"n": 27, "vezes": 27, "leituras": 31, "escritas": 58}, {"n": 28, "vezes": 28, "leituras": 31, "escritas": 59}, {"n": 29, "vezes": 29, "leituras": 31, "escritas": 60}, {"n": 30, "vezes": 30, "leituras": 31, "escritas": 61}, {"n": 31, "vezes": 31, "leituras": 31, "escritas": 62}, {"n": 32, "vezes": 32, "leituras": 31, "escritas": 63}, {"n": 33, "vezes": 33, "leituras": 63, "escritas": 96}, {"n": 34, "vezes": 34, "leituras": 63, "escritas": 97}, {"n": 35, "vezes": 35, "leituras": 63, "escritas": 98}, {"n": 36, "vezes": 36, "leituras": 63, "escritas": 99}, {"n": 37, "vezes": 37, "leituras": 63, "escritas": 100}, {"n": 38, "vezes": 38, "leituras": 63, "escritas": 101}, {"n": 39, "vezes": 39, "leituras": 63, "escritas": 102}, {"n": 40, "vezes": 40, "leituras": 63, "escritas": 103}, {"n": 41, "vezes": 41, "leituras": 63, "escritas": 104}, {"n": 42, "vezes": 42, "leituras": 63, "escritas": 105}, {"n": 43, "vezes": 43, "leituras": 63, "escritas": 106}, {"n": 44, "vezes": 44, "leituras": 63, "escritas": 107}, {"n": 45, "vezes": 45, "leituras": 63, "escritas": 108}, {"n": 46, "vezes": 46, "leituras": 63, "escritas": 109}, {"n": 47, "vezes": 47, "leituras": 63, "escritas": 110}, {"n": 48, "vezes": 48, "leituras": 63, "escritas": 111}, {"n": 49, "vezes": 49, "leituras": 63, "escritas": 112}, {"n": 50, "vezes": 50, "leituras": 63, "escritas": 113}, {"n": 51, "vezes": 51, "leituras": 63, "escritas": 114}, {"n": 52, "vezes": 52, "leituras": 63, "escritas": 115}, {"n": 53, "vezes": 53, "leituras": 63, "escritas": 116}, {"n": 54, "vezes": 54, "leituras": 63, "escritas": 117}, {"n": 55, "vezes": 55, "leituras": 63, "escritas": 118}, {"n": 56, "vezes": 56, "leituras": 63, "escritas": 119}, {"n": 57, "vezes": 57, "leituras": 63, "escritas": 120}, {"n": 58, "vezes": 58, "leituras": 63, "escritas": 121}, {"n": 59, "vezes": 59, "leituras": 63, "escritas": 122}, {"n": 60, "vezes": 60, "leituras": 63, "escritas": 123}]}, "enfileirar-pior-ingenua": {"estrutura": "ingenua", "chamada": "enfileirar", "seguidas": "pior", "tabela": [{"n": 10, "k": 9, "leituras": 8, "escritas": 9}, {"n": 100, "k": 65, "leituras": 64, "escritas": 65}, {"n": 1000, "k": 513, "leituras": 512, "escritas": 513}], "serie": []}, "desenfileirar-ingenua": {"estrutura": "ingenua", "chamada": "desenfileirar", "seguidas": null, "tabela": [{"n": 10, "leituras": 10, "escritas": 9}, {"n": 100, "leituras": 100, "escritas": 99}, {"n": 1000, "leituras": 1000, "escritas": 999}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 2, "escritas": 1}, {"n": 3, "leituras": 3, "escritas": 2}, {"n": 4, "leituras": 4, "escritas": 3}, {"n": 5, "leituras": 5, "escritas": 4}, {"n": 6, "leituras": 6, "escritas": 5}, {"n": 7, "leituras": 7, "escritas": 6}, {"n": 8, "leituras": 8, "escritas": 7}, {"n": 9, "leituras": 9, "escritas": 8}, {"n": 10, "leituras": 10, "escritas": 9}, {"n": 11, "leituras": 11, "escritas": 10}, {"n": 12, "leituras": 12, "escritas": 11}, {"n": 13, "leituras": 13, "escritas": 12}, {"n": 14, "leituras": 14, "escritas": 13}, {"n": 15, "leituras": 15, "escritas": 14}, {"n": 16, "leituras": 16, "escritas": 15}, {"n": 17, "leituras": 17, "escritas": 16}, {"n": 18, "leituras": 18, "escritas": 17}, {"n": 19, "leituras": 19, "escritas": 18}, {"n": 20, "leituras": 20, "escritas": 19}, {"n": 21, "leituras": 21, "escritas": 20}, {"n": 22, "leituras": 22, "escritas": 21}, {"n": 23, "leituras": 23, "escritas": 22}, {"n": 24, "leituras": 24, "escritas": 23}, {"n": 25, "leituras": 25, "escritas": 24}, {"n": 26, "leituras": 26, "escritas": 25}, {"n": 27, "leituras": 27, "escritas": 26}, {"n": 28, "leituras": 28, "escritas": 27}, {"n": 29, "leituras": 29, "escritas": 28}, {"n": 30, "leituras": 30, "escritas": 29}, {"n": 31, "leituras": 31, "escritas": 30}, {"n": 32, "leituras": 32, "escritas": 31}, {"n": 33, "leituras": 33, "escritas": 32}, {"n": 34, "leituras": 34, "escritas": 33}, {"n": 35, "leituras": 35, "escritas": 34}, {"n": 36, "leituras": 36, "escritas": 35}, {"n": 37, "leituras": 37, "escritas": 36}, {"n": 38, "leituras": 38, "escritas": 37}, {"n": 39, "leituras": 39, "escritas": 38}, {"n": 40, "leituras": 40, "escritas": 39}, {"n": 41, "leituras": 41, "escritas": 40}, {"n": 42, "leituras": 42, "escritas": 41}, {"n": 43, "leituras": 43, "escritas": 42}, {"n": 44, "leituras": 44, "escritas": 43}, {"n": 45, "leituras": 45, "escritas": 44}, {"n": 46, "leituras": 46, "escritas": 45}, {"n": 47, "leituras": 47, "escritas": 46}, {"n": 48, "leituras": 48, "escritas": 47}, {"n": 49, "leituras": 49, "escritas": 48}, {"n": 50, "leituras": 50, "escritas": 49}, {"n": 51, "leituras": 51, "escritas": 50}, {"n": 52, "leituras": 52, "escritas": 51}, {"n": 53, "leituras": 53, "escritas": 52}, {"n": 54, "leituras": 54, "escritas": 53}, {"n": 55, "leituras": 55, "escritas": 54}, {"n": 56, "leituras": 56, "escritas": 55}, {"n": 57, "leituras": 57, "escritas": 56}, {"n": 58, "leituras": 58, "escritas": 57}, {"n": 59, "leituras": 59, "escritas": 58}, {"n": 60, "leituras": 60, "escritas": 59}]}, "primeiro-ingenua": {"estrutura": "ingenua", "chamada": "primeiro", "seguidas": null, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}, "enfileirar-circular": {"estrutura": "circular", "chamada": "enfileirar", "seguidas": null, "tabela": [{"n": 10, "leituras": 0, "escritas": 1}, {"n": 100, "leituras": 0, "escritas": 1}, {"n": 1000, "leituras": 0, "escritas": 1}], "serie": [{"n": 0, "leituras": 0, "escritas": 1}, {"n": 1, "leituras": 1, "escritas": 2}, {"n": 2, "leituras": 2, "escritas": 3}, {"n": 3, "leituras": 0, "escritas": 1}, {"n": 4, "leituras": 4, "escritas": 5}, {"n": 5, "leituras": 0, "escritas": 1}, {"n": 6, "leituras": 0, "escritas": 1}, {"n": 7, "leituras": 0, "escritas": 1}, {"n": 8, "leituras": 8, "escritas": 9}, {"n": 9, "leituras": 0, "escritas": 1}, {"n": 10, "leituras": 0, "escritas": 1}, {"n": 11, "leituras": 0, "escritas": 1}, {"n": 12, "leituras": 0, "escritas": 1}, {"n": 13, "leituras": 0, "escritas": 1}, {"n": 14, "leituras": 0, "escritas": 1}, {"n": 15, "leituras": 0, "escritas": 1}, {"n": 16, "leituras": 16, "escritas": 17}, {"n": 17, "leituras": 0, "escritas": 1}, {"n": 18, "leituras": 0, "escritas": 1}, {"n": 19, "leituras": 0, "escritas": 1}, {"n": 20, "leituras": 0, "escritas": 1}, {"n": 21, "leituras": 0, "escritas": 1}, {"n": 22, "leituras": 0, "escritas": 1}, {"n": 23, "leituras": 0, "escritas": 1}, {"n": 24, "leituras": 0, "escritas": 1}, {"n": 25, "leituras": 0, "escritas": 1}, {"n": 26, "leituras": 0, "escritas": 1}, {"n": 27, "leituras": 0, "escritas": 1}, {"n": 28, "leituras": 0, "escritas": 1}, {"n": 29, "leituras": 0, "escritas": 1}, {"n": 30, "leituras": 0, "escritas": 1}, {"n": 31, "leituras": 0, "escritas": 1}, {"n": 32, "leituras": 32, "escritas": 33}, {"n": 33, "leituras": 0, "escritas": 1}, {"n": 34, "leituras": 0, "escritas": 1}, {"n": 35, "leituras": 0, "escritas": 1}, {"n": 36, "leituras": 0, "escritas": 1}, {"n": 37, "leituras": 0, "escritas": 1}, {"n": 38, "leituras": 0, "escritas": 1}, {"n": 39, "leituras": 0, "escritas": 1}, {"n": 40, "leituras": 0, "escritas": 1}, {"n": 41, "leituras": 0, "escritas": 1}, {"n": 42, "leituras": 0, "escritas": 1}, {"n": 43, "leituras": 0, "escritas": 1}, {"n": 44, "leituras": 0, "escritas": 1}, {"n": 45, "leituras": 0, "escritas": 1}, {"n": 46, "leituras": 0, "escritas": 1}, {"n": 47, "leituras": 0, "escritas": 1}, {"n": 48, "leituras": 0, "escritas": 1}, {"n": 49, "leituras": 0, "escritas": 1}, {"n": 50, "leituras": 0, "escritas": 1}, {"n": 51, "leituras": 0, "escritas": 1}, {"n": 52, "leituras": 0, "escritas": 1}, {"n": 53, "leituras": 0, "escritas": 1}, {"n": 54, "leituras": 0, "escritas": 1}, {"n": 55, "leituras": 0, "escritas": 1}, {"n": 56, "leituras": 0, "escritas": 1}, {"n": 57, "leituras": 0, "escritas": 1}, {"n": 58, "leituras": 0, "escritas": 1}, {"n": 59, "leituras": 0, "escritas": 1}, {"n": 60, "leituras": 0, "escritas": 1}]}, "enfileirar-media-circular": {"estrutura": "circular", "chamada": "enfileirar", "seguidas": "media", "tabela": [{"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 100, "vezes": 100, "leituras": 127, "escritas": 227}, {"n": 1000, "vezes": 1000, "leituras": 1023, "escritas": 2023}], "serie": [{"n": 1, "vezes": 1, "leituras": 0, "escritas": 1}, {"n": 2, "vezes": 2, "leituras": 1, "escritas": 3}, {"n": 3, "vezes": 3, "leituras": 3, "escritas": 6}, {"n": 4, "vezes": 4, "leituras": 3, "escritas": 7}, {"n": 5, "vezes": 5, "leituras": 7, "escritas": 12}, {"n": 6, "vezes": 6, "leituras": 7, "escritas": 13}, {"n": 7, "vezes": 7, "leituras": 7, "escritas": 14}, {"n": 8, "vezes": 8, "leituras": 7, "escritas": 15}, {"n": 9, "vezes": 9, "leituras": 15, "escritas": 24}, {"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 11, "vezes": 11, "leituras": 15, "escritas": 26}, {"n": 12, "vezes": 12, "leituras": 15, "escritas": 27}, {"n": 13, "vezes": 13, "leituras": 15, "escritas": 28}, {"n": 14, "vezes": 14, "leituras": 15, "escritas": 29}, {"n": 15, "vezes": 15, "leituras": 15, "escritas": 30}, {"n": 16, "vezes": 16, "leituras": 15, "escritas": 31}, {"n": 17, "vezes": 17, "leituras": 31, "escritas": 48}, {"n": 18, "vezes": 18, "leituras": 31, "escritas": 49}, {"n": 19, "vezes": 19, "leituras": 31, "escritas": 50}, {"n": 20, "vezes": 20, "leituras": 31, "escritas": 51}, {"n": 21, "vezes": 21, "leituras": 31, "escritas": 52}, {"n": 22, "vezes": 22, "leituras": 31, "escritas": 53}, {"n": 23, "vezes": 23, "leituras": 31, "escritas": 54}, {"n": 24, "vezes": 24, "leituras": 31, "escritas": 55}, {"n": 25, "vezes": 25, "leituras": 31, "escritas": 56}, {"n": 26, "vezes": 26, "leituras": 31, "escritas": 57}, {"n": 27, "vezes": 27, "leituras": 31, "escritas": 58}, {"n": 28, "vezes": 28, "leituras": 31, "escritas": 59}, {"n": 29, "vezes": 29, "leituras": 31, "escritas": 60}, {"n": 30, "vezes": 30, "leituras": 31, "escritas": 61}, {"n": 31, "vezes": 31, "leituras": 31, "escritas": 62}, {"n": 32, "vezes": 32, "leituras": 31, "escritas": 63}, {"n": 33, "vezes": 33, "leituras": 63, "escritas": 96}, {"n": 34, "vezes": 34, "leituras": 63, "escritas": 97}, {"n": 35, "vezes": 35, "leituras": 63, "escritas": 98}, {"n": 36, "vezes": 36, "leituras": 63, "escritas": 99}, {"n": 37, "vezes": 37, "leituras": 63, "escritas": 100}, {"n": 38, "vezes": 38, "leituras": 63, "escritas": 101}, {"n": 39, "vezes": 39, "leituras": 63, "escritas": 102}, {"n": 40, "vezes": 40, "leituras": 63, "escritas": 103}, {"n": 41, "vezes": 41, "leituras": 63, "escritas": 104}, {"n": 42, "vezes": 42, "leituras": 63, "escritas": 105}, {"n": 43, "vezes": 43, "leituras": 63, "escritas": 106}, {"n": 44, "vezes": 44, "leituras": 63, "escritas": 107}, {"n": 45, "vezes": 45, "leituras": 63, "escritas": 108}, {"n": 46, "vezes": 46, "leituras": 63, "escritas": 109}, {"n": 47, "vezes": 47, "leituras": 63, "escritas": 110}, {"n": 48, "vezes": 48, "leituras": 63, "escritas": 111}, {"n": 49, "vezes": 49, "leituras": 63, "escritas": 112}, {"n": 50, "vezes": 50, "leituras": 63, "escritas": 113}, {"n": 51, "vezes": 51, "leituras": 63, "escritas": 114}, {"n": 52, "vezes": 52, "leituras": 63, "escritas": 115}, {"n": 53, "vezes": 53, "leituras": 63, "escritas": 116}, {"n": 54, "vezes": 54, "leituras": 63, "escritas": 117}, {"n": 55, "vezes": 55, "leituras": 63, "escritas": 118}, {"n": 56, "vezes": 56, "leituras": 63, "escritas": 119}, {"n": 57, "vezes": 57, "leituras": 63, "escritas": 120}, {"n": 58, "vezes": 58, "leituras": 63, "escritas": 121}, {"n": 59, "vezes": 59, "leituras": 63, "escritas": 122}, {"n": 60, "vezes": 60, "leituras": 63, "escritas": 123}]}, "enfileirar-pior-circular": {"estrutura": "circular", "chamada": "enfileirar", "seguidas": "pior", "tabela": [{"n": 10, "k": 9, "leituras": 8, "escritas": 9}, {"n": 100, "k": 65, "leituras": 64, "escritas": 65}, {"n": 1000, "k": 513, "leituras": 512, "escritas": 513}], "serie": []}, "desenfileirar-circular": {"estrutura": "circular", "chamada": "desenfileirar", "seguidas": null, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}, "primeiro-circular": {"estrutura": "circular", "chamada": "primeiro", "seguidas": null, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}}, "capacidade": {"ingenua": [{"n": 0, "casas": 1}, {"n": 1, "casas": 1}, {"n": 2, "casas": 2}, {"n": 3, "casas": 4}, {"n": 4, "casas": 4}, {"n": 5, "casas": 8}, {"n": 6, "casas": 8}, {"n": 7, "casas": 8}, {"n": 8, "casas": 8}, {"n": 9, "casas": 16}, {"n": 10, "casas": 16}, {"n": 11, "casas": 16}, {"n": 12, "casas": 16}, {"n": 13, "casas": 16}, {"n": 14, "casas": 16}, {"n": 15, "casas": 16}, {"n": 16, "casas": 16}, {"n": 17, "casas": 32}, {"n": 18, "casas": 32}, {"n": 19, "casas": 32}, {"n": 20, "casas": 32}, {"n": 21, "casas": 32}, {"n": 22, "casas": 32}, {"n": 23, "casas": 32}, {"n": 24, "casas": 32}, {"n": 25, "casas": 32}, {"n": 26, "casas": 32}, {"n": 27, "casas": 32}, {"n": 28, "casas": 32}, {"n": 29, "casas": 32}, {"n": 30, "casas": 32}, {"n": 31, "casas": 32}, {"n": 32, "casas": 32}, {"n": 33, "casas": 64}, {"n": 34, "casas": 64}, {"n": 35, "casas": 64}, {"n": 36, "casas": 64}, {"n": 37, "casas": 64}, {"n": 38, "casas": 64}, {"n": 39, "casas": 64}, {"n": 40, "casas": 64}, {"n": 41, "casas": 64}, {"n": 42, "casas": 64}, {"n": 43, "casas": 64}, {"n": 44, "casas": 64}, {"n": 45, "casas": 64}, {"n": 46, "casas": 64}, {"n": 47, "casas": 64}, {"n": 48, "casas": 64}, {"n": 49, "casas": 64}, {"n": 50, "casas": 64}, {"n": 51, "casas": 64}, {"n": 52, "casas": 64}, {"n": 53, "casas": 64}, {"n": 54, "casas": 64}, {"n": 55, "casas": 64}, {"n": 56, "casas": 64}, {"n": 57, "casas": 64}, {"n": 58, "casas": 64}, {"n": 59, "casas": 64}, {"n": 60, "casas": 64}], "circular": [{"n": 0, "casas": 1}, {"n": 1, "casas": 1}, {"n": 2, "casas": 2}, {"n": 3, "casas": 4}, {"n": 4, "casas": 4}, {"n": 5, "casas": 8}, {"n": 6, "casas": 8}, {"n": 7, "casas": 8}, {"n": 8, "casas": 8}, {"n": 9, "casas": 16}, {"n": 10, "casas": 16}, {"n": 11, "casas": 16}, {"n": 12, "casas": 16}, {"n": 13, "casas": 16}, {"n": 14, "casas": 16}, {"n": 15, "casas": 16}, {"n": 16, "casas": 16}, {"n": 17, "casas": 32}, {"n": 18, "casas": 32}, {"n": 19, "casas": 32}, {"n": 20, "casas": 32}, {"n": 21, "casas": 32}, {"n": 22, "casas": 32}, {"n": 23, "casas": 32}, {"n": 24, "casas": 32}, {"n": 25, "casas": 32}, {"n": 26, "casas": 32}, {"n": 27, "casas": 32}, {"n": 28, "casas": 32}, {"n": 29, "casas": 32}, {"n": 30, "casas": 32}, {"n": 31, "casas": 32}, {"n": 32, "casas": 32}, {"n": 33, "casas": 64}, {"n": 34, "casas": 64}, {"n": 35, "casas": 64}, {"n": 36, "casas": 64}, {"n": 37, "casas": 64}, {"n": 38, "casas": 64}, {"n": 39, "casas": 64}, {"n": 40, "casas": 64}, {"n": 41, "casas": 64}, {"n": 42, "casas": 64}, {"n": 43, "casas": 64}, {"n": 44, "casas": 64}, {"n": 45, "casas": 64}, {"n": 46, "casas": 64}, {"n": 47, "casas": 64}, {"n": 48, "casas": 64}, {"n": 49, "casas": 64}, {"n": 50, "casas": 64}, {"n": 51, "casas": 64}, {"n": 52, "casas": 64}, {"n": 53, "casas": 64}, {"n": 54, "casas": 64}, {"n": 55, "casas": 64}, {"n": 56, "casas": 64}, {"n": 57, "casas": 64}, {"n": 58, "casas": 64}, {"n": 59, "casas": 64}, {"n": 60, "casas": 64}]}}}, {"id": "grafo", "nome": "Grafo", "variante": "três vistas: matriz de adjacência, lista de adjacência e matriz de incidência", "frase": "Pontos e as ligações entre eles, guardados de três jeitos.", "resumo": "Um grafo são vértices e arestas, cada aresta ligando dois vértices. Aqui ele não é dirigido: a aresta u–v vale nos dois sentidos. As mesmas arestas cabem em três vistas, e cada uma responde rápido a uma pergunta e devagar a outra. A matriz de adjacência diz na hora se u e v estão ligados, mas guarda V × V casas. A lista de adjacência guarda só os vizinhos de cada um e entrega os vizinhos de u sem procurar. A matriz de incidência guarda uma coluna por aresta: tudo começa varrendo a linha de u.", "placa": {"autor": "sem autoria única", "ano": "—"}, "n": "V", "eixo": "V (vértices, com E = 3V arestas)", "memoria": {"notacao": "O(V²), O(V + E) e O(V · E)", "porque": "A matriz de adjacência guarda V × V casas, tenha o grafo poucas arestas ou muitas. A lista de adjacência guarda uma casa por vértice (onde começa a lista dele) e duas por aresta (u na lista de v e v na lista de u), mais a folga de cada vetor, que dobra quando enche. A matriz de incidência guarda V casas por aresta."}, "variantes": {"matriz": "matriz de adjacência", "lista": "lista de adjacência", "incidencia": "matriz de incidência"}, "operacoes": [{"id": "existe-matriz", "nome": "a aresta u–v existe?", "notacao": "O(1)", "porque": "Uma leitura: a casa da linha u e coluna v."}, {"id": "existe-lista", "nome": "a aresta u–v existe?", "notacao": "O(grau)", "porque": "Busca v na lista de u, casa por casa; se não está lá, lê a lista inteira."}, {"id": "existe-incidencia", "nome": "a aresta u–v existe?", "notacao": "O(E)", "porque": "Varre a linha de u; em cada coluna com 1, olha se v também tem 1 ali."}, {"id": "vizinhos-matriz", "nome": "os vizinhos de u", "notacao": "O(V)", "porque": "Lê a linha u inteira, V casas, mesmo que u tenha poucos vizinhos."}, {"id": "vizinhos-lista", "nome": "os vizinhos de u", "notacao": "O(grau)", "porque": "Lê a lista de u: uma casa por vizinho, nada mais."}, {"id": "vizinhos-incidencia", "nome": "os vizinhos de u", "notacao": "O(E + grau · V)", "porque": "Varre a linha de u e, em cada coluna com 1, desce a coluna até achar a outra ponta."}, {"id": "grau-matriz", "nome": "o grau de u", "notacao": "O(V)", "porque": "Soma a linha u inteira."}, {"id": "grau-lista", "nome": "o grau de u", "notacao": "O(1)", "porque": "É o tamanho do vetor de u, guardado à parte: nenhuma casa lida."}, {"id": "grau-incidencia", "nome": "o grau de u", "notacao": "O(E)", "porque": "Soma a linha de u: uma casa por aresta."}, {"id": "por-matriz", "nome": "pôr a aresta u–v", "notacao": "O(1)", "porque": "Escreve 1 nas casas (u, v) e (v, u)."}, {"id": "por-lista", "nome": "pôr a aresta u–v, com folga", "notacao": "O(1) amortizado", "porque": "Anexa v na lista de u e u na lista de v. Se um dos vetores enche, dobra e copia, como no Vetor."}, {"id": "por-incidencia", "nome": "pôr a aresta u–v", "notacao": "O(V)", "porque": "Abre uma coluna nova e escreve as V casas dela: 1 em u e em v, 0 no resto."}, {"id": "tirar-matriz", "nome": "tirar a aresta u–v", "notacao": "O(1)", "porque": "Escreve 0 nas casas (u, v) e (v, u)."}, {"id": "tirar-lista", "nome": "tirar a aresta u–v", "notacao": "O(grau)", "porque": "Busca v na lista de u, tira e puxa os de depois uma casa para trás; o mesmo com u na lista de v."}, {"id": "tirar-incidencia", "nome": "tirar a aresta u–v", "notacao": "O(E + V)", "porque": "Acha a coluna da aresta varrendo a linha de u e põe a última coluna no lugar dela, V leituras e V escritas."}], "grafico": [{"id": "vizinhos-matriz", "rotulo": "vizinhos, matriz de adjacência"}, {"id": "vizinhos-lista", "rotulo": "vizinhos, lista"}, {"id": "vizinhos-incidencia", "rotulo": "vizinhos, incidência"}, {"id": "existe-matriz", "rotulo": "existe, matriz de adjacência"}], "legendas": {"operacoes": "Custo = leituras + escritas de casas, contadas rodando as três vistas em Python no grafo de medição: V vértices, cada um ligado aos três seguintes dando a volta (E = 3V, grau 6), com V = {ns}. As perguntas são sobre o vértice 0, com uma aresta que não existe no existe e no pôr (o pior caso de quem procura). O número de vértices e de arestas e o tamanho de cada lista, guardados à parte, não contam.", "custo": "O custo de achar os vizinhos de um vértice nas três vistas, e o de saber se uma aresta existe na matriz de adjacência, para V de {v0} a {v1} no grafo de medição, medido uma vez por V. Os vizinhos são sempre 6: a lista lê só eles, a matriz de adjacência lê a linha inteira e a de incidência varre a linha e desce as colunas.", "casas": "Casas que cada vista guarda no grafo de medição, para V de {v0} a {v1} (E = 3V). A lista cresce como V; as duas matrizes, como V², e a de incidência três vezes mais depressa, porque E = 3V."}, "medido": {"encher": "anel", "tamanhos": [10, 100, 1000], "operacoes": {"existe-matriz": {"estrutura": "matriz", "chamada": "existe", "seguidas": null, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}, "vizinhos-matriz": {"estrutura": "matriz", "chamada": "vizinhos", "seguidas": null, "tabela": [{"n": 10, "leituras": 10, "escritas": 0}, {"n": 100, "leituras": 100, "escritas": 0}, {"n": 1000, "leituras": 1000, "escritas": 0}], "serie": [{"n": 8, "leituras": 8, "escritas": 0}, {"n": 9, "leituras": 9, "escritas": 0}, {"n": 10, "leituras": 10, "escritas": 0}, {"n": 11, "leituras": 11, "escritas": 0}, {"n": 12, "leituras": 12, "escritas": 0}, {"n": 13, "leituras": 13, "escritas": 0}, {"n": 14, "leituras": 14, "escritas": 0}, {"n": 15, "leituras": 15, "escritas": 0}, {"n": 16, "leituras": 16, "escritas": 0}, {"n": 17, "leituras": 17, "escritas": 0}, {"n": 18, "leituras": 18, "escritas": 0}, {"n": 19, "leituras": 19, "escritas": 0}, {"n": 20, "leituras": 20, "escritas": 0}, {"n": 21, "leituras": 21, "escritas": 0}, {"n": 22, "leituras": 22, "escritas": 0}, {"n": 23, "leituras": 23, "escritas": 0}, {"n": 24, "leituras": 24, "escritas": 0}, {"n": 25, "leituras": 25, "escritas": 0}, {"n": 26, "leituras": 26, "escritas": 0}, {"n": 27, "leituras": 27, "escritas": 0}, {"n": 28, "leituras": 28, "escritas": 0}, {"n": 29, "leituras": 29, "escritas": 0}, {"n": 30, "leituras": 30, "escritas": 0}, {"n": 31, "leituras": 31, "escritas": 0}, {"n": 32, "leituras": 32, "escritas": 0}, {"n": 33, "leituras": 33, "escritas": 0}, {"n": 34, "leituras": 34, "escritas": 0}, {"n": 35, "leituras": 35, "escritas": 0}, {"n": 36, "leituras": 36, "escritas": 0}, {"n": 37, "leituras": 37, "escritas": 0}, {"n": 38, "leituras": 38, "escritas": 0}, {"n": 39, "leituras": 39, "escritas": 0}, {"n": 40, "leituras": 40, "escritas": 0}, {"n": 41, "leituras": 41, "escritas": 0}, {"n": 42, "leituras": 42, "escritas": 0}, {"n": 43, "leituras": 43, "escritas": 0}, {"n": 44, "leituras": 44, "escritas": 0}, {"n": 45, "leituras": 45, "escritas": 0}, {"n": 46, "leituras": 46, "escritas": 0}, {"n": 47, "leituras": 47, "escritas": 0}, {"n": 48, "leituras": 48, "escritas": 0}, {"n": 49, "leituras": 49, "escritas": 0}, {"n": 50, "leituras": 50, "escritas": 0}, {"n": 51, "leituras": 51, "escritas": 0}, {"n": 52, "leituras": 52, "escritas": 0}, {"n": 53, "leituras": 53, "escritas": 0}, {"n": 54, "leituras": 54, "escritas": 0}, {"n": 55, "leituras": 55, "escritas": 0}, {"n": 56, "leituras": 56, "escritas": 0}, {"n": 57, "leituras": 57, "escritas": 0}, {"n": 58, "leituras": 58, "escritas": 0}, {"n": 59, "leituras": 59, "escritas": 0}, {"n": 60, "leituras": 60, "escritas": 0}]}, "grau-matriz": {"estrutura": "matriz", "chamada": "grau", "seguidas": null, "tabela": [{"n": 10, "leituras": 10, "escritas": 0}, {"n": 100, "leituras": 100, "escritas": 0}, {"n": 1000, "leituras": 1000, "escritas": 0}], "serie": [{"n": 8, "leituras": 8, "escritas": 0}, {"n": 9, "leituras": 9, "escritas": 0}, {"n": 10, "leituras": 10, "escritas": 0}, {"n": 11, "leituras": 11, "escritas": 0}, {"n": 12, "leituras": 12, "escritas": 0}, {"n": 13, "leituras": 13, "escritas": 0}, {"n": 14, "leituras": 14, "escritas": 0}, {"n": 15, "leituras": 15, "escritas": 0}, {"n": 16, "leituras": 16, "escritas": 0}, {"n": 17, "leituras": 17, "escritas": 0}, {"n": 18, "leituras": 18, "escritas": 0}, {"n": 19, "leituras": 19, "escritas": 0}, {"n": 20, "leituras": 20, "escritas": 0}, {"n": 21, "leituras": 21, "escritas": 0}, {"n": 22, "leituras": 22, "escritas": 0}, {"n": 23, "leituras": 23, "escritas": 0}, {"n": 24, "leituras": 24, "escritas": 0}, {"n": 25, "leituras": 25, "escritas": 0}, {"n": 26, "leituras": 26, "escritas": 0}, {"n": 27, "leituras": 27, "escritas": 0}, {"n": 28, "leituras": 28, "escritas": 0}, {"n": 29, "leituras": 29, "escritas": 0}, {"n": 30, "leituras": 30, "escritas": 0}, {"n": 31, "leituras": 31, "escritas": 0}, {"n": 32, "leituras": 32, "escritas": 0}, {"n": 33, "leituras": 33, "escritas": 0}, {"n": 34, "leituras": 34, "escritas": 0}, {"n": 35, "leituras": 35, "escritas": 0}, {"n": 36, "leituras": 36, "escritas": 0}, {"n": 37, "leituras": 37, "escritas": 0}, {"n": 38, "leituras": 38, "escritas": 0}, {"n": 39, "leituras": 39, "escritas": 0}, {"n": 40, "leituras": 40, "escritas": 0}, {"n": 41, "leituras": 41, "escritas": 0}, {"n": 42, "leituras": 42, "escritas": 0}, {"n": 43, "leituras": 43, "escritas": 0}, {"n": 44, "leituras": 44, "escritas": 0}, {"n": 45, "leituras": 45, "escritas": 0}, {"n": 46, "leituras": 46, "escritas": 0}, {"n": 47, "leituras": 47, "escritas": 0}, {"n": 48, "leituras": 48, "escritas": 0}, {"n": 49, "leituras": 49, "escritas": 0}, {"n": 50, "leituras": 50, "escritas": 0}, {"n": 51, "leituras": 51, "escritas": 0}, {"n": 52, "leituras": 52, "escritas": 0}, {"n": 53, "leituras": 53, "escritas": 0}, {"n": 54, "leituras": 54, "escritas": 0}, {"n": 55, "leituras": 55, "escritas": 0}, {"n": 56, "leituras": 56, "escritas": 0}, {"n": 57, "leituras": 57, "escritas": 0}, {"n": 58, "leituras": 58, "escritas": 0}, {"n": 59, "leituras": 59, "escritas": 0}, {"n": 60, "leituras": 60, "escritas": 0}]}, "por-matriz": {"estrutura": "matriz", "chamada": "por", "seguidas": null, "tabela": [{"n": 10, "leituras": 0, "escritas": 2}, {"n": 100, "leituras": 0, "escritas": 2}, {"n": 1000, "leituras": 0, "escritas": 2}], "serie": [{"n": 8, "leituras": 0, "escritas": 2}, {"n": 9, "leituras": 0, "escritas": 2}, {"n": 10, "leituras": 0, "escritas": 2}, {"n": 11, "leituras": 0, "escritas": 2}, {"n": 12, "leituras": 0, "escritas": 2}, {"n": 13, "leituras": 0, "escritas": 2}, {"n": 14, "leituras": 0, "escritas": 2}, {"n": 15, "leituras": 0, "escritas": 2}, {"n": 16, "leituras": 0, "escritas": 2}, {"n": 17, "leituras": 0, "escritas": 2}, {"n": 18, "leituras": 0, "escritas": 2}, {"n": 19, "leituras": 0, "escritas": 2}, {"n": 20, "leituras": 0, "escritas": 2}, {"n": 21, "leituras": 0, "escritas": 2}, {"n": 22, "leituras": 0, "escritas": 2}, {"n": 23, "leituras": 0, "escritas": 2}, {"n": 24, "leituras": 0, "escritas": 2}, {"n": 25, "leituras": 0, "escritas": 2}, {"n": 26, "leituras": 0, "escritas": 2}, {"n": 27, "leituras": 0, "escritas": 2}, {"n": 28, "leituras": 0, "escritas": 2}, {"n": 29, "leituras": 0, "escritas": 2}, {"n": 30, "leituras": 0, "escritas": 2}, {"n": 31, "leituras": 0, "escritas": 2}, {"n": 32, "leituras": 0, "escritas": 2}, {"n": 33, "leituras": 0, "escritas": 2}, {"n": 34, "leituras": 0, "escritas": 2}, {"n": 35, "leituras": 0, "escritas": 2}, {"n": 36, "leituras": 0, "escritas": 2}, {"n": 37, "leituras": 0, "escritas": 2}, {"n": 38, "leituras": 0, "escritas": 2}, {"n": 39, "leituras": 0, "escritas": 2}, {"n": 40, "leituras": 0, "escritas": 2}, {"n": 41, "leituras": 0, "escritas": 2}, {"n": 42, "leituras": 0, "escritas": 2}, {"n": 43, "leituras": 0, "escritas": 2}, {"n": 44, "leituras": 0, "escritas": 2}, {"n": 45, "leituras": 0, "escritas": 2}, {"n": 46, "leituras": 0, "escritas": 2}, {"n": 47, "leituras": 0, "escritas": 2}, {"n": 48, "leituras": 0, "escritas": 2}, {"n": 49, "leituras": 0, "escritas": 2}, {"n": 50, "leituras": 0, "escritas": 2}, {"n": 51, "leituras": 0, "escritas": 2}, {"n": 52, "leituras": 0, "escritas": 2}, {"n": 53, "leituras": 0, "escritas": 2}, {"n": 54, "leituras": 0, "escritas": 2}, {"n": 55, "leituras": 0, "escritas": 2}, {"n": 56, "leituras": 0, "escritas": 2}, {"n": 57, "leituras": 0, "escritas": 2}, {"n": 58, "leituras": 0, "escritas": 2}, {"n": 59, "leituras": 0, "escritas": 2}, {"n": 60, "leituras": 0, "escritas": 2}]}, "tirar-matriz": {"estrutura": "matriz", "chamada": "tirar", "seguidas": null, "tabela": [{"n": 10, "leituras": 0, "escritas": 2}, {"n": 100, "leituras": 0, "escritas": 2}, {"n": 1000, "leituras": 0, "escritas": 2}], "serie": [{"n": 8, "leituras": 0, "escritas": 2}, {"n": 9, "leituras": 0, "escritas": 2}, {"n": 10, "leituras": 0, "escritas": 2}, {"n": 11, "leituras": 0, "escritas": 2}, {"n": 12, "leituras": 0, "escritas": 2}, {"n": 13, "leituras": 0, "escritas": 2}, {"n": 14, "leituras": 0, "escritas": 2}, {"n": 15, "leituras": 0, "escritas": 2}, {"n": 16, "leituras": 0, "escritas": 2}, {"n": 17, "leituras": 0, "escritas": 2}, {"n": 18, "leituras": 0, "escritas": 2}, {"n": 19, "leituras": 0, "escritas": 2}, {"n": 20, "leituras": 0, "escritas": 2}, {"n": 21, "leituras": 0, "escritas": 2}, {"n": 22, "leituras": 0, "escritas": 2}, {"n": 23, "leituras": 0, "escritas": 2}, {"n": 24, "leituras": 0, "escritas": 2}, {"n": 25, "leituras": 0, "escritas": 2}, {"n": 26, "leituras": 0, "escritas": 2}, {"n": 27, "leituras": 0, "escritas": 2}, {"n": 28, "leituras": 0, "escritas": 2}, {"n": 29, "leituras": 0, "escritas": 2}, {"n": 30, "leituras": 0, "escritas": 2}, {"n": 31, "leituras": 0, "escritas": 2}, {"n": 32, "leituras": 0, "escritas": 2}, {"n": 33, "leituras": 0, "escritas": 2}, {"n": 34, "leituras": 0, "escritas": 2}, {"n": 35, "leituras": 0, "escritas": 2}, {"n": 36, "leituras": 0, "escritas": 2}, {"n": 37, "leituras": 0, "escritas": 2}, {"n": 38, "leituras": 0, "escritas": 2}, {"n": 39, "leituras": 0, "escritas": 2}, {"n": 40, "leituras": 0, "escritas": 2}, {"n": 41, "leituras": 0, "escritas": 2}, {"n": 42, "leituras": 0, "escritas": 2}, {"n": 43, "leituras": 0, "escritas": 2}, {"n": 44, "leituras": 0, "escritas": 2}, {"n": 45, "leituras": 0, "escritas": 2}, {"n": 46, "leituras": 0, "escritas": 2}, {"n": 47, "leituras": 0, "escritas": 2}, {"n": 48, "leituras": 0, "escritas": 2}, {"n": 49, "leituras": 0, "escritas": 2}, {"n": 50, "leituras": 0, "escritas": 2}, {"n": 51, "leituras": 0, "escritas": 2}, {"n": 52, "leituras": 0, "escritas": 2}, {"n": 53, "leituras": 0, "escritas": 2}, {"n": 54, "leituras": 0, "escritas": 2}, {"n": 55, "leituras": 0, "escritas": 2}, {"n": 56, "leituras": 0, "escritas": 2}, {"n": 57, "leituras": 0, "escritas": 2}, {"n": 58, "leituras": 0, "escritas": 2}, {"n": 59, "leituras": 0, "escritas": 2}, {"n": 60, "leituras": 0, "escritas": 2}]}, "existe-lista": {"estrutura": "lista", "chamada": "existe", "seguidas": null, "tabela": [{"n": 10, "leituras": 6, "escritas": 0}, {"n": 100, "leituras": 6, "escritas": 0}, {"n": 1000, "leituras": 6, "escritas": 0}], "serie": [{"n": 8, "leituras": 6, "escritas": 0}, {"n": 9, "leituras": 6, "escritas": 0}, {"n": 10, "leituras": 6, "escritas": 0}, {"n": 11, "leituras": 6, "escritas": 0}, {"n": 12, "leituras": 6, "escritas": 0}, {"n": 13, "leituras": 6, "escritas": 0}, {"n": 14, "leituras": 6, "escritas": 0}, {"n": 15, "leituras": 6, "escritas": 0}, {"n": 16, "leituras": 6, "escritas": 0}, {"n": 17, "leituras": 6, "escritas": 0}, {"n": 18, "leituras": 6, "escritas": 0}, {"n": 19, "leituras": 6, "escritas": 0}, {"n": 20, "leituras": 6, "escritas": 0}, {"n": 21, "leituras": 6, "escritas": 0}, {"n": 22, "leituras": 6, "escritas": 0}, {"n": 23, "leituras": 6, "escritas": 0}, {"n": 24, "leituras": 6, "escritas": 0}, {"n": 25, "leituras": 6, "escritas": 0}, {"n": 26, "leituras": 6, "escritas": 0}, {"n": 27, "leituras": 6, "escritas": 0}, {"n": 28, "leituras": 6, "escritas": 0}, {"n": 29, "leituras": 6, "escritas": 0}, {"n": 30, "leituras": 6, "escritas": 0}, {"n": 31, "leituras": 6, "escritas": 0}, {"n": 32, "leituras": 6, "escritas": 0}, {"n": 33, "leituras": 6, "escritas": 0}, {"n": 34, "leituras": 6, "escritas": 0}, {"n": 35, "leituras": 6, "escritas": 0}, {"n": 36, "leituras": 6, "escritas": 0}, {"n": 37, "leituras": 6, "escritas": 0}, {"n": 38, "leituras": 6, "escritas": 0}, {"n": 39, "leituras": 6, "escritas": 0}, {"n": 40, "leituras": 6, "escritas": 0}, {"n": 41, "leituras": 6, "escritas": 0}, {"n": 42, "leituras": 6, "escritas": 0}, {"n": 43, "leituras": 6, "escritas": 0}, {"n": 44, "leituras": 6, "escritas": 0}, {"n": 45, "leituras": 6, "escritas": 0}, {"n": 46, "leituras": 6, "escritas": 0}, {"n": 47, "leituras": 6, "escritas": 0}, {"n": 48, "leituras": 6, "escritas": 0}, {"n": 49, "leituras": 6, "escritas": 0}, {"n": 50, "leituras": 6, "escritas": 0}, {"n": 51, "leituras": 6, "escritas": 0}, {"n": 52, "leituras": 6, "escritas": 0}, {"n": 53, "leituras": 6, "escritas": 0}, {"n": 54, "leituras": 6, "escritas": 0}, {"n": 55, "leituras": 6, "escritas": 0}, {"n": 56, "leituras": 6, "escritas": 0}, {"n": 57, "leituras": 6, "escritas": 0}, {"n": 58, "leituras": 6, "escritas": 0}, {"n": 59, "leituras": 6, "escritas": 0}, {"n": 60, "leituras": 6, "escritas": 0}]}, "vizinhos-lista": {"estrutura": "lista", "chamada": "vizinhos", "seguidas": null, "tabela": [{"n": 10, "leituras": 6, "escritas": 0}, {"n": 100, "leituras": 6, "escritas": 0}, {"n": 1000, "leituras": 6, "escritas": 0}], "serie": [{"n": 8, "leituras": 6, "escritas": 0}, {"n": 9, "leituras": 6, "escritas": 0}, {"n": 10, "leituras": 6, "escritas": 0}, {"n": 11, "leituras": 6, "escritas": 0}, {"n": 12, "leituras": 6, "escritas": 0}, {"n": 13, "leituras": 6, "escritas": 0}, {"n": 14, "leituras": 6, "escritas": 0}, {"n": 15, "leituras": 6, "escritas": 0}, {"n": 16, "leituras": 6, "escritas": 0}, {"n": 17, "leituras": 6, "escritas": 0}, {"n": 18, "leituras": 6, "escritas": 0}, {"n": 19, "leituras": 6, "escritas": 0}, {"n": 20, "leituras": 6, "escritas": 0}, {"n": 21, "leituras": 6, "escritas": 0}, {"n": 22, "leituras": 6, "escritas": 0}, {"n": 23, "leituras": 6, "escritas": 0}, {"n": 24, "leituras": 6, "escritas": 0}, {"n": 25, "leituras": 6, "escritas": 0}, {"n": 26, "leituras": 6, "escritas": 0}, {"n": 27, "leituras": 6, "escritas": 0}, {"n": 28, "leituras": 6, "escritas": 0}, {"n": 29, "leituras": 6, "escritas": 0}, {"n": 30, "leituras": 6, "escritas": 0}, {"n": 31, "leituras": 6, "escritas": 0}, {"n": 32, "leituras": 6, "escritas": 0}, {"n": 33, "leituras": 6, "escritas": 0}, {"n": 34, "leituras": 6, "escritas": 0}, {"n": 35, "leituras": 6, "escritas": 0}, {"n": 36, "leituras": 6, "escritas": 0}, {"n": 37, "leituras": 6, "escritas": 0}, {"n": 38, "leituras": 6, "escritas": 0}, {"n": 39, "leituras": 6, "escritas": 0}, {"n": 40, "leituras": 6, "escritas": 0}, {"n": 41, "leituras": 6, "escritas": 0}, {"n": 42, "leituras": 6, "escritas": 0}, {"n": 43, "leituras": 6, "escritas": 0}, {"n": 44, "leituras": 6, "escritas": 0}, {"n": 45, "leituras": 6, "escritas": 0}, {"n": 46, "leituras": 6, "escritas": 0}, {"n": 47, "leituras": 6, "escritas": 0}, {"n": 48, "leituras": 6, "escritas": 0}, {"n": 49, "leituras": 6, "escritas": 0}, {"n": 50, "leituras": 6, "escritas": 0}, {"n": 51, "leituras": 6, "escritas": 0}, {"n": 52, "leituras": 6, "escritas": 0}, {"n": 53, "leituras": 6, "escritas": 0}, {"n": 54, "leituras": 6, "escritas": 0}, {"n": 55, "leituras": 6, "escritas": 0}, {"n": 56, "leituras": 6, "escritas": 0}, {"n": 57, "leituras": 6, "escritas": 0}, {"n": 58, "leituras": 6, "escritas": 0}, {"n": 59, "leituras": 6, "escritas": 0}, {"n": 60, "leituras": 6, "escritas": 0}]}, "grau-lista": {"estrutura": "lista", "chamada": "grau", "seguidas": null, "tabela": [{"n": 10, "leituras": 0, "escritas": 0}, {"n": 100, "leituras": 0, "escritas": 0}, {"n": 1000, "leituras": 0, "escritas": 0}], "serie": [{"n": 8, "leituras": 0, "escritas": 0}, {"n": 9, "leituras": 0, "escritas": 0}, {"n": 10, "leituras": 0, "escritas": 0}, {"n": 11, "leituras": 0, "escritas": 0}, {"n": 12, "leituras": 0, "escritas": 0}, {"n": 13, "leituras": 0, "escritas": 0}, {"n": 14, "leituras": 0, "escritas": 0}, {"n": 15, "leituras": 0, "escritas": 0}, {"n": 16, "leituras": 0, "escritas": 0}, {"n": 17, "leituras": 0, "escritas": 0}, {"n": 18, "leituras": 0, "escritas": 0}, {"n": 19, "leituras": 0, "escritas": 0}, {"n": 20, "leituras": 0, "escritas": 0}, {"n": 21, "leituras": 0, "escritas": 0}, {"n": 22, "leituras": 0, "escritas": 0}, {"n": 23, "leituras": 0, "escritas": 0}, {"n": 24, "leituras": 0, "escritas": 0}, {"n": 25, "leituras": 0, "escritas": 0}, {"n": 26, "leituras": 0, "escritas": 0}, {"n": 27, "leituras": 0, "escritas": 0}, {"n": 28, "leituras": 0, "escritas": 0}, {"n": 29, "leituras": 0, "escritas": 0}, {"n": 30, "leituras": 0, "escritas": 0}, {"n": 31, "leituras": 0, "escritas": 0}, {"n": 32, "leituras": 0, "escritas": 0}, {"n": 33, "leituras": 0, "escritas": 0}, {"n": 34, "leituras": 0, "escritas": 0}, {"n": 35, "leituras": 0, "escritas": 0}, {"n": 36, "leituras": 0, "escritas": 0}, {"n": 37, "leituras": 0, "escritas": 0}, {"n": 38, "leituras": 0, "escritas": 0}, {"n": 39, "leituras": 0, "escritas": 0}, {"n": 40, "leituras": 0, "escritas": 0}, {"n": 41, "leituras": 0, "escritas": 0}, {"n": 42, "leituras": 0, "escritas": 0}, {"n": 43, "leituras": 0, "escritas": 0}, {"n": 44, "leituras": 0, "escritas": 0}, {"n": 45, "leituras": 0, "escritas": 0}, {"n": 46, "leituras": 0, "escritas": 0}, {"n": 47, "leituras": 0, "escritas": 0}, {"n": 48, "leituras": 0, "escritas": 0}, {"n": 49, "leituras": 0, "escritas": 0}, {"n": 50, "leituras": 0, "escritas": 0}, {"n": 51, "leituras": 0, "escritas": 0}, {"n": 52, "leituras": 0, "escritas": 0}, {"n": 53, "leituras": 0, "escritas": 0}, {"n": 54, "leituras": 0, "escritas": 0}, {"n": 55, "leituras": 0, "escritas": 0}, {"n": 56, "leituras": 0, "escritas": 0}, {"n": 57, "leituras": 0, "escritas": 0}, {"n": 58, "leituras": 0, "escritas": 0}, {"n": 59, "leituras": 0, "escritas": 0}, {"n": 60, "leituras": 0, "escritas": 0}]}, "por-lista": {"estrutura": "lista", "chamada": "por", "seguidas": null, "tabela": [{"n": 10, "leituras": 0, "escritas": 2}, {"n": 100, "leituras": 0, "escritas": 2}, {"n": 1000, "leituras": 0, "escritas": 2}], "serie": [{"n": 8, "leituras": 0, "escritas": 2}, {"n": 9, "leituras": 0, "escritas": 2}, {"n": 10, "leituras": 0, "escritas": 2}, {"n": 11, "leituras": 0, "escritas": 2}, {"n": 12, "leituras": 0, "escritas": 2}, {"n": 13, "leituras": 0, "escritas": 2}, {"n": 14, "leituras": 0, "escritas": 2}, {"n": 15, "leituras": 0, "escritas": 2}, {"n": 16, "leituras": 0, "escritas": 2}, {"n": 17, "leituras": 0, "escritas": 2}, {"n": 18, "leituras": 0, "escritas": 2}, {"n": 19, "leituras": 0, "escritas": 2}, {"n": 20, "leituras": 0, "escritas": 2}, {"n": 21, "leituras": 0, "escritas": 2}, {"n": 22, "leituras": 0, "escritas": 2}, {"n": 23, "leituras": 0, "escritas": 2}, {"n": 24, "leituras": 0, "escritas": 2}, {"n": 25, "leituras": 0, "escritas": 2}, {"n": 26, "leituras": 0, "escritas": 2}, {"n": 27, "leituras": 0, "escritas": 2}, {"n": 28, "leituras": 0, "escritas": 2}, {"n": 29, "leituras": 0, "escritas": 2}, {"n": 30, "leituras": 0, "escritas": 2}, {"n": 31, "leituras": 0, "escritas": 2}, {"n": 32, "leituras": 0, "escritas": 2}, {"n": 33, "leituras": 0, "escritas": 2}, {"n": 34, "leituras": 0, "escritas": 2}, {"n": 35, "leituras": 0, "escritas": 2}, {"n": 36, "leituras": 0, "escritas": 2}, {"n": 37, "leituras": 0, "escritas": 2}, {"n": 38, "leituras": 0, "escritas": 2}, {"n": 39, "leituras": 0, "escritas": 2}, {"n": 40, "leituras": 0, "escritas": 2}, {"n": 41, "leituras": 0, "escritas": 2}, {"n": 42, "leituras": 0, "escritas": 2}, {"n": 43, "leituras": 0, "escritas": 2}, {"n": 44, "leituras": 0, "escritas": 2}, {"n": 45, "leituras": 0, "escritas": 2}, {"n": 46, "leituras": 0, "escritas": 2}, {"n": 47, "leituras": 0, "escritas": 2}, {"n": 48, "leituras": 0, "escritas": 2}, {"n": 49, "leituras": 0, "escritas": 2}, {"n": 50, "leituras": 0, "escritas": 2}, {"n": 51, "leituras": 0, "escritas": 2}, {"n": 52, "leituras": 0, "escritas": 2}, {"n": 53, "leituras": 0, "escritas": 2}, {"n": 54, "leituras": 0, "escritas": 2}, {"n": 55, "leituras": 0, "escritas": 2}, {"n": 56, "leituras": 0, "escritas": 2}, {"n": 57, "leituras": 0, "escritas": 2}, {"n": 58, "leituras": 0, "escritas": 2}, {"n": 59, "leituras": 0, "escritas": 2}, {"n": 60, "leituras": 0, "escritas": 2}]}, "tirar-lista": {"estrutura": "lista", "chamada": "tirar", "seguidas": null, "tabela": [{"n": 10, "leituras": 14, "escritas": 10}, {"n": 100, "leituras": 14, "escritas": 10}, {"n": 1000, "leituras": 14, "escritas": 10}], "serie": [{"n": 8, "leituras": 14, "escritas": 10}, {"n": 9, "leituras": 14, "escritas": 10}, {"n": 10, "leituras": 14, "escritas": 10}, {"n": 11, "leituras": 14, "escritas": 10}, {"n": 12, "leituras": 14, "escritas": 10}, {"n": 13, "leituras": 14, "escritas": 10}, {"n": 14, "leituras": 14, "escritas": 10}, {"n": 15, "leituras": 14, "escritas": 10}, {"n": 16, "leituras": 14, "escritas": 10}, {"n": 17, "leituras": 14, "escritas": 10}, {"n": 18, "leituras": 14, "escritas": 10}, {"n": 19, "leituras": 14, "escritas": 10}, {"n": 20, "leituras": 14, "escritas": 10}, {"n": 21, "leituras": 14, "escritas": 10}, {"n": 22, "leituras": 14, "escritas": 10}, {"n": 23, "leituras": 14, "escritas": 10}, {"n": 24, "leituras": 14, "escritas": 10}, {"n": 25, "leituras": 14, "escritas": 10}, {"n": 26, "leituras": 14, "escritas": 10}, {"n": 27, "leituras": 14, "escritas": 10}, {"n": 28, "leituras": 14, "escritas": 10}, {"n": 29, "leituras": 14, "escritas": 10}, {"n": 30, "leituras": 14, "escritas": 10}, {"n": 31, "leituras": 14, "escritas": 10}, {"n": 32, "leituras": 14, "escritas": 10}, {"n": 33, "leituras": 14, "escritas": 10}, {"n": 34, "leituras": 14, "escritas": 10}, {"n": 35, "leituras": 14, "escritas": 10}, {"n": 36, "leituras": 14, "escritas": 10}, {"n": 37, "leituras": 14, "escritas": 10}, {"n": 38, "leituras": 14, "escritas": 10}, {"n": 39, "leituras": 14, "escritas": 10}, {"n": 40, "leituras": 14, "escritas": 10}, {"n": 41, "leituras": 14, "escritas": 10}, {"n": 42, "leituras": 14, "escritas": 10}, {"n": 43, "leituras": 14, "escritas": 10}, {"n": 44, "leituras": 14, "escritas": 10}, {"n": 45, "leituras": 14, "escritas": 10}, {"n": 46, "leituras": 14, "escritas": 10}, {"n": 47, "leituras": 14, "escritas": 10}, {"n": 48, "leituras": 14, "escritas": 10}, {"n": 49, "leituras": 14, "escritas": 10}, {"n": 50, "leituras": 14, "escritas": 10}, {"n": 51, "leituras": 14, "escritas": 10}, {"n": 52, "leituras": 14, "escritas": 10}, {"n": 53, "leituras": 14, "escritas": 10}, {"n": 54, "leituras": 14, "escritas": 10}, {"n": 55, "leituras": 14, "escritas": 10}, {"n": 56, "leituras": 14, "escritas": 10}, {"n": 57, "leituras": 14, "escritas": 10}, {"n": 58, "leituras": 14, "escritas": 10}, {"n": 59, "leituras": 14, "escritas": 10}, {"n": 60, "leituras": 14, "escritas": 10}]}, "existe-incidencia": {"estrutura": "incidencia", "chamada": "existe", "seguidas": null, "tabela": [{"n": 10, "leituras": 36, "escritas": 0}, {"n": 100, "leituras": 306, "escritas": 0}, {"n": 1000, "leituras": 3006, "escritas": 0}], "serie": [{"n": 8, "leituras": 30, "escritas": 0}, {"n": 9, "leituras": 33, "escritas": 0}, {"n": 10, "leituras": 36, "escritas": 0}, {"n": 11, "leituras": 39, "escritas": 0}, {"n": 12, "leituras": 42, "escritas": 0}, {"n": 13, "leituras": 45, "escritas": 0}, {"n": 14, "leituras": 48, "escritas": 0}, {"n": 15, "leituras": 51, "escritas": 0}, {"n": 16, "leituras": 54, "escritas": 0}, {"n": 17, "leituras": 57, "escritas": 0}, {"n": 18, "leituras": 60, "escritas": 0}, {"n": 19, "leituras": 63, "escritas": 0}, {"n": 20, "leituras": 66, "escritas": 0}, {"n": 21, "leituras": 69, "escritas": 0}, {"n": 22, "leituras": 72, "escritas": 0}, {"n": 23, "leituras": 75, "escritas": 0}, {"n": 24, "leituras": 78, "escritas": 0}, {"n": 25, "leituras": 81, "escritas": 0}, {"n": 26, "leituras": 84, "escritas": 0}, {"n": 27, "leituras": 87, "escritas": 0}, {"n": 28, "leituras": 90, "escritas": 0}, {"n": 29, "leituras": 93, "escritas": 0}, {"n": 30, "leituras": 96, "escritas": 0}, {"n": 31, "leituras": 99, "escritas": 0}, {"n": 32, "leituras": 102, "escritas": 0}, {"n": 33, "leituras": 105, "escritas": 0}, {"n": 34, "leituras": 108, "escritas": 0}, {"n": 35, "leituras": 111, "escritas": 0}, {"n": 36, "leituras": 114, "escritas": 0}, {"n": 37, "leituras": 117, "escritas": 0}, {"n": 38, "leituras": 120, "escritas": 0}, {"n": 39, "leituras": 123, "escritas": 0}, {"n": 40, "leituras": 126, "escritas": 0}, {"n": 41, "leituras": 129, "escritas": 0}, {"n": 42, "leituras": 132, "escritas": 0}, {"n": 43, "leituras": 135, "escritas": 0}, {"n": 44, "leituras": 138, "escritas": 0}, {"n": 45, "leituras": 141, "escritas": 0}, {"n": 46, "leituras": 144, "escritas": 0}, {"n": 47, "leituras": 147, "escritas": 0}, {"n": 48, "leituras": 150, "escritas": 0}, {"n": 49, "leituras": 153, "escritas": 0}, {"n": 50, "leituras": 156, "escritas": 0}, {"n": 51, "leituras": 159, "escritas": 0}, {"n": 52, "leituras": 162, "escritas": 0}, {"n": 53, "leituras": 165, "escritas": 0}, {"n": 54, "leituras": 168, "escritas": 0}, {"n": 55, "leituras": 171, "escritas": 0}, {"n": 56, "leituras": 174, "escritas": 0}, {"n": 57, "leituras": 177, "escritas": 0}, {"n": 58, "leituras": 180, "escritas": 0}, {"n": 59, "leituras": 183, "escritas": 0}, {"n": 60, "leituras": 186, "escritas": 0}]}, "vizinhos-incidencia": {"estrutura": "incidencia", "chamada": "vizinhos", "seguidas": null, "tabela": [{"n": 10, "leituras": 60, "escritas": 0}, {"n": 100, "leituras": 600, "escritas": 0}, {"n": 1000, "leituras": 6000, "escritas": 0}], "serie": [{"n": 8, "leituras": 48, "escritas": 0}, {"n": 9, "leituras": 54, "escritas": 0}, {"n": 10, "leituras": 60, "escritas": 0}, {"n": 11, "leituras": 66, "escritas": 0}, {"n": 12, "leituras": 72, "escritas": 0}, {"n": 13, "leituras": 78, "escritas": 0}, {"n": 14, "leituras": 84, "escritas": 0}, {"n": 15, "leituras": 90, "escritas": 0}, {"n": 16, "leituras": 96, "escritas": 0}, {"n": 17, "leituras": 102, "escritas": 0}, {"n": 18, "leituras": 108, "escritas": 0}, {"n": 19, "leituras": 114, "escritas": 0}, {"n": 20, "leituras": 120, "escritas": 0}, {"n": 21, "leituras": 126, "escritas": 0}, {"n": 22, "leituras": 132, "escritas": 0}, {"n": 23, "leituras": 138, "escritas": 0}, {"n": 24, "leituras": 144, "escritas": 0}, {"n": 25, "leituras": 150, "escritas": 0}, {"n": 26, "leituras": 156, "escritas": 0}, {"n": 27, "leituras": 162, "escritas": 0}, {"n": 28, "leituras": 168, "escritas": 0}, {"n": 29, "leituras": 174, "escritas": 0}, {"n": 30, "leituras": 180, "escritas": 0}, {"n": 31, "leituras": 186, "escritas": 0}, {"n": 32, "leituras": 192, "escritas": 0}, {"n": 33, "leituras": 198, "escritas": 0}, {"n": 34, "leituras": 204, "escritas": 0}, {"n": 35, "leituras": 210, "escritas": 0}, {"n": 36, "leituras": 216, "escritas": 0}, {"n": 37, "leituras": 222, "escritas": 0}, {"n": 38, "leituras": 228, "escritas": 0}, {"n": 39, "leituras": 234, "escritas": 0}, {"n": 40, "leituras": 240, "escritas": 0}, {"n": 41, "leituras": 246, "escritas": 0}, {"n": 42, "leituras": 252, "escritas": 0}, {"n": 43, "leituras": 258, "escritas": 0}, {"n": 44, "leituras": 264, "escritas": 0}, {"n": 45, "leituras": 270, "escritas": 0}, {"n": 46, "leituras": 276, "escritas": 0}, {"n": 47, "leituras": 282, "escritas": 0}, {"n": 48, "leituras": 288, "escritas": 0}, {"n": 49, "leituras": 294, "escritas": 0}, {"n": 50, "leituras": 300, "escritas": 0}, {"n": 51, "leituras": 306, "escritas": 0}, {"n": 52, "leituras": 312, "escritas": 0}, {"n": 53, "leituras": 318, "escritas": 0}, {"n": 54, "leituras": 324, "escritas": 0}, {"n": 55, "leituras": 330, "escritas": 0}, {"n": 56, "leituras": 336, "escritas": 0}, {"n": 57, "leituras": 342, "escritas": 0}, {"n": 58, "leituras": 348, "escritas": 0}, {"n": 59, "leituras": 354, "escritas": 0}, {"n": 60, "leituras": 360, "escritas": 0}]}, "grau-incidencia": {"estrutura": "incidencia", "chamada": "grau", "seguidas": null, "tabela": [{"n": 10, "leituras": 30, "escritas": 0}, {"n": 100, "leituras": 300, "escritas": 0}, {"n": 1000, "leituras": 3000, "escritas": 0}], "serie": [{"n": 8, "leituras": 24, "escritas": 0}, {"n": 9, "leituras": 27, "escritas": 0}, {"n": 10, "leituras": 30, "escritas": 0}, {"n": 11, "leituras": 33, "escritas": 0}, {"n": 12, "leituras": 36, "escritas": 0}, {"n": 13, "leituras": 39, "escritas": 0}, {"n": 14, "leituras": 42, "escritas": 0}, {"n": 15, "leituras": 45, "escritas": 0}, {"n": 16, "leituras": 48, "escritas": 0}, {"n": 17, "leituras": 51, "escritas": 0}, {"n": 18, "leituras": 54, "escritas": 0}, {"n": 19, "leituras": 57, "escritas": 0}, {"n": 20, "leituras": 60, "escritas": 0}, {"n": 21, "leituras": 63, "escritas": 0}, {"n": 22, "leituras": 66, "escritas": 0}, {"n": 23, "leituras": 69, "escritas": 0}, {"n": 24, "leituras": 72, "escritas": 0}, {"n": 25, "leituras": 75, "escritas": 0}, {"n": 26, "leituras": 78, "escritas": 0}, {"n": 27, "leituras": 81, "escritas": 0}, {"n": 28, "leituras": 84, "escritas": 0}, {"n": 29, "leituras": 87, "escritas": 0}, {"n": 30, "leituras": 90, "escritas": 0}, {"n": 31, "leituras": 93, "escritas": 0}, {"n": 32, "leituras": 96, "escritas": 0}, {"n": 33, "leituras": 99, "escritas": 0}, {"n": 34, "leituras": 102, "escritas": 0}, {"n": 35, "leituras": 105, "escritas": 0}, {"n": 36, "leituras": 108, "escritas": 0}, {"n": 37, "leituras": 111, "escritas": 0}, {"n": 38, "leituras": 114, "escritas": 0}, {"n": 39, "leituras": 117, "escritas": 0}, {"n": 40, "leituras": 120, "escritas": 0}, {"n": 41, "leituras": 123, "escritas": 0}, {"n": 42, "leituras": 126, "escritas": 0}, {"n": 43, "leituras": 129, "escritas": 0}, {"n": 44, "leituras": 132, "escritas": 0}, {"n": 45, "leituras": 135, "escritas": 0}, {"n": 46, "leituras": 138, "escritas": 0}, {"n": 47, "leituras": 141, "escritas": 0}, {"n": 48, "leituras": 144, "escritas": 0}, {"n": 49, "leituras": 147, "escritas": 0}, {"n": 50, "leituras": 150, "escritas": 0}, {"n": 51, "leituras": 153, "escritas": 0}, {"n": 52, "leituras": 156, "escritas": 0}, {"n": 53, "leituras": 159, "escritas": 0}, {"n": 54, "leituras": 162, "escritas": 0}, {"n": 55, "leituras": 165, "escritas": 0}, {"n": 56, "leituras": 168, "escritas": 0}, {"n": 57, "leituras": 171, "escritas": 0}, {"n": 58, "leituras": 174, "escritas": 0}, {"n": 59, "leituras": 177, "escritas": 0}, {"n": 60, "leituras": 180, "escritas": 0}]}, "por-incidencia": {"estrutura": "incidencia", "chamada": "por", "seguidas": null, "tabela": [{"n": 10, "leituras": 0, "escritas": 10}, {"n": 100, "leituras": 0, "escritas": 100}, {"n": 1000, "leituras": 0, "escritas": 1000}], "serie": [{"n": 8, "leituras": 0, "escritas": 8}, {"n": 9, "leituras": 0, "escritas": 9}, {"n": 10, "leituras": 0, "escritas": 10}, {"n": 11, "leituras": 0, "escritas": 11}, {"n": 12, "leituras": 0, "escritas": 12}, {"n": 13, "leituras": 0, "escritas": 13}, {"n": 14, "leituras": 0, "escritas": 14}, {"n": 15, "leituras": 0, "escritas": 15}, {"n": 16, "leituras": 0, "escritas": 16}, {"n": 17, "leituras": 0, "escritas": 17}, {"n": 18, "leituras": 0, "escritas": 18}, {"n": 19, "leituras": 0, "escritas": 19}, {"n": 20, "leituras": 0, "escritas": 20}, {"n": 21, "leituras": 0, "escritas": 21}, {"n": 22, "leituras": 0, "escritas": 22}, {"n": 23, "leituras": 0, "escritas": 23}, {"n": 24, "leituras": 0, "escritas": 24}, {"n": 25, "leituras": 0, "escritas": 25}, {"n": 26, "leituras": 0, "escritas": 26}, {"n": 27, "leituras": 0, "escritas": 27}, {"n": 28, "leituras": 0, "escritas": 28}, {"n": 29, "leituras": 0, "escritas": 29}, {"n": 30, "leituras": 0, "escritas": 30}, {"n": 31, "leituras": 0, "escritas": 31}, {"n": 32, "leituras": 0, "escritas": 32}, {"n": 33, "leituras": 0, "escritas": 33}, {"n": 34, "leituras": 0, "escritas": 34}, {"n": 35, "leituras": 0, "escritas": 35}, {"n": 36, "leituras": 0, "escritas": 36}, {"n": 37, "leituras": 0, "escritas": 37}, {"n": 38, "leituras": 0, "escritas": 38}, {"n": 39, "leituras": 0, "escritas": 39}, {"n": 40, "leituras": 0, "escritas": 40}, {"n": 41, "leituras": 0, "escritas": 41}, {"n": 42, "leituras": 0, "escritas": 42}, {"n": 43, "leituras": 0, "escritas": 43}, {"n": 44, "leituras": 0, "escritas": 44}, {"n": 45, "leituras": 0, "escritas": 45}, {"n": 46, "leituras": 0, "escritas": 46}, {"n": 47, "leituras": 0, "escritas": 47}, {"n": 48, "leituras": 0, "escritas": 48}, {"n": 49, "leituras": 0, "escritas": 49}, {"n": 50, "leituras": 0, "escritas": 50}, {"n": 51, "leituras": 0, "escritas": 51}, {"n": 52, "leituras": 0, "escritas": 52}, {"n": 53, "leituras": 0, "escritas": 53}, {"n": 54, "leituras": 0, "escritas": 54}, {"n": 55, "leituras": 0, "escritas": 55}, {"n": 56, "leituras": 0, "escritas": 56}, {"n": 57, "leituras": 0, "escritas": 57}, {"n": 58, "leituras": 0, "escritas": 58}, {"n": 59, "leituras": 0, "escritas": 59}, {"n": 60, "leituras": 0, "escritas": 60}]}, "tirar-incidencia": {"estrutura": "incidencia", "chamada": "tirar", "seguidas": null, "tabela": [{"n": 10, "leituras": 12, "escritas": 10}, {"n": 100, "leituras": 102, "escritas": 100}, {"n": 1000, "leituras": 1002, "escritas": 1000}], "serie": [{"n": 8, "leituras": 10, "escritas": 8}, {"n": 9, "leituras": 11, "escritas": 9}, {"n": 10, "leituras": 12, "escritas": 10}, {"n": 11, "leituras": 13, "escritas": 11}, {"n": 12, "leituras": 14, "escritas": 12}, {"n": 13, "leituras": 15, "escritas": 13}, {"n": 14, "leituras": 16, "escritas": 14}, {"n": 15, "leituras": 17, "escritas": 15}, {"n": 16, "leituras": 18, "escritas": 16}, {"n": 17, "leituras": 19, "escritas": 17}, {"n": 18, "leituras": 20, "escritas": 18}, {"n": 19, "leituras": 21, "escritas": 19}, {"n": 20, "leituras": 22, "escritas": 20}, {"n": 21, "leituras": 23, "escritas": 21}, {"n": 22, "leituras": 24, "escritas": 22}, {"n": 23, "leituras": 25, "escritas": 23}, {"n": 24, "leituras": 26, "escritas": 24}, {"n": 25, "leituras": 27, "escritas": 25}, {"n": 26, "leituras": 28, "escritas": 26}, {"n": 27, "leituras": 29, "escritas": 27}, {"n": 28, "leituras": 30, "escritas": 28}, {"n": 29, "leituras": 31, "escritas": 29}, {"n": 30, "leituras": 32, "escritas": 30}, {"n": 31, "leituras": 33, "escritas": 31}, {"n": 32, "leituras": 34, "escritas": 32}, {"n": 33, "leituras": 35, "escritas": 33}, {"n": 34, "leituras": 36, "escritas": 34}, {"n": 35, "leituras": 37, "escritas": 35}, {"n": 36, "leituras": 38, "escritas": 36}, {"n": 37, "leituras": 39, "escritas": 37}, {"n": 38, "leituras": 40, "escritas": 38}, {"n": 39, "leituras": 41, "escritas": 39}, {"n": 40, "leituras": 42, "escritas": 40}, {"n": 41, "leituras": 43, "escritas": 41}, {"n": 42, "leituras": 44, "escritas": 42}, {"n": 43, "leituras": 45, "escritas": 43}, {"n": 44, "leituras": 46, "escritas": 44}, {"n": 45, "leituras": 47, "escritas": 45}, {"n": 46, "leituras": 48, "escritas": 46}, {"n": 47, "leituras": 49, "escritas": 47}, {"n": 48, "leituras": 50, "escritas": 48}, {"n": 49, "leituras": 51, "escritas": 49}, {"n": 50, "leituras": 52, "escritas": 50}, {"n": 51, "leituras": 53, "escritas": 51}, {"n": 52, "leituras": 54, "escritas": 52}, {"n": 53, "leituras": 55, "escritas": 53}, {"n": 54, "leituras": 56, "escritas": 54}, {"n": 55, "leituras": 57, "escritas": 55}, {"n": 56, "leituras": 58, "escritas": 56}, {"n": 57, "leituras": 59, "escritas": 57}, {"n": 58, "leituras": 60, "escritas": 58}, {"n": 59, "leituras": 61, "escritas": 59}, {"n": 60, "leituras": 62, "escritas": 60}]}}, "capacidade": {"matriz": [{"n": 0, "casas": 0}, {"n": 1, "casas": 1}, {"n": 2, "casas": 4}, {"n": 3, "casas": 9}, {"n": 4, "casas": 16}, {"n": 5, "casas": 25}, {"n": 6, "casas": 36}, {"n": 7, "casas": 49}, {"n": 8, "casas": 64}, {"n": 9, "casas": 81}, {"n": 10, "casas": 100}, {"n": 11, "casas": 121}, {"n": 12, "casas": 144}, {"n": 13, "casas": 169}, {"n": 14, "casas": 196}, {"n": 15, "casas": 225}, {"n": 16, "casas": 256}, {"n": 17, "casas": 289}, {"n": 18, "casas": 324}, {"n": 19, "casas": 361}, {"n": 20, "casas": 400}, {"n": 21, "casas": 441}, {"n": 22, "casas": 484}, {"n": 23, "casas": 529}, {"n": 24, "casas": 576}, {"n": 25, "casas": 625}, {"n": 26, "casas": 676}, {"n": 27, "casas": 729}, {"n": 28, "casas": 784}, {"n": 29, "casas": 841}, {"n": 30, "casas": 900}, {"n": 31, "casas": 961}, {"n": 32, "casas": 1024}, {"n": 33, "casas": 1089}, {"n": 34, "casas": 1156}, {"n": 35, "casas": 1225}, {"n": 36, "casas": 1296}, {"n": 37, "casas": 1369}, {"n": 38, "casas": 1444}, {"n": 39, "casas": 1521}, {"n": 40, "casas": 1600}, {"n": 41, "casas": 1681}, {"n": 42, "casas": 1764}, {"n": 43, "casas": 1849}, {"n": 44, "casas": 1936}, {"n": 45, "casas": 2025}, {"n": 46, "casas": 2116}, {"n": 47, "casas": 2209}, {"n": 48, "casas": 2304}, {"n": 49, "casas": 2401}, {"n": 50, "casas": 2500}, {"n": 51, "casas": 2601}, {"n": 52, "casas": 2704}, {"n": 53, "casas": 2809}, {"n": 54, "casas": 2916}, {"n": 55, "casas": 3025}, {"n": 56, "casas": 3136}, {"n": 57, "casas": 3249}, {"n": 58, "casas": 3364}, {"n": 59, "casas": 3481}, {"n": 60, "casas": 3600}], "lista": [{"n": 0, "casas": 0}, {"n": 1, "casas": 2}, {"n": 2, "casas": 4}, {"n": 3, "casas": 9}, {"n": 4, "casas": 20}, {"n": 5, "casas": 25}, {"n": 6, "casas": 54}, {"n": 7, "casas": 63}, {"n": 8, "casas": 72}, {"n": 9, "casas": 81}, {"n": 10, "casas": 90}, {"n": 11, "casas": 99}, {"n": 12, "casas": 108}, {"n": 13, "casas": 117}, {"n": 14, "casas": 126}, {"n": 15, "casas": 135}, {"n": 16, "casas": 144}, {"n": 17, "casas": 153}, {"n": 18, "casas": 162}, {"n": 19, "casas": 171}, {"n": 20, "casas": 180}, {"n": 21, "casas": 189}, {"n": 22, "casas": 198}, {"n": 23, "casas": 207}, {"n": 24, "casas": 216}, {"n": 25, "casas": 225}, {"n": 26, "casas": 234}, {"n": 27, "casas": 243}, {"n": 28, "casas": 252}, {"n": 29, "casas": 261}, {"n": 30, "casas": 270}, {"n": 31, "casas": 279}, {"n": 32, "casas": 288}, {"n": 33, "casas": 297}, {"n": 34, "casas": 306}, {"n": 35, "casas": 315}, {"n": 36, "casas": 324}, {"n": 37, "casas": 333}, {"n": 38, "casas": 342}, {"n": 39, "casas": 351}, {"n": 40, "casas": 360}, {"n": 41, "casas": 369}, {"n": 42, "casas": 378}, {"n": 43, "casas": 387}, {"n": 44, "casas": 396}, {"n": 45, "casas": 405}, {"n": 46, "casas": 414}, {"n": 47, "casas": 423}, {"n": 48, "casas": 432}, {"n": 49, "casas": 441}, {"n": 50, "casas": 450}, {"n": 51, "casas": 459}, {"n": 52, "casas": 468}, {"n": 53, "casas": 477}, {"n": 54, "casas": 486}, {"n": 55, "casas": 495}, {"n": 56, "casas": 504}, {"n": 57, "casas": 513}, {"n": 58, "casas": 522}, {"n": 59, "casas": 531}, {"n": 60, "casas": 540}], "incidencia": [{"n": 0, "casas": 0}, {"n": 1, "casas": 0}, {"n": 2, "casas": 2}, {"n": 3, "casas": 9}, {"n": 4, "casas": 24}, {"n": 5, "casas": 50}, {"n": 6, "casas": 90}, {"n": 7, "casas": 147}, {"n": 8, "casas": 192}, {"n": 9, "casas": 243}, {"n": 10, "casas": 300}, {"n": 11, "casas": 363}, {"n": 12, "casas": 432}, {"n": 13, "casas": 507}, {"n": 14, "casas": 588}, {"n": 15, "casas": 675}, {"n": 16, "casas": 768}, {"n": 17, "casas": 867}, {"n": 18, "casas": 972}, {"n": 19, "casas": 1083}, {"n": 20, "casas": 1200}, {"n": 21, "casas": 1323}, {"n": 22, "casas": 1452}, {"n": 23, "casas": 1587}, {"n": 24, "casas": 1728}, {"n": 25, "casas": 1875}, {"n": 26, "casas": 2028}, {"n": 27, "casas": 2187}, {"n": 28, "casas": 2352}, {"n": 29, "casas": 2523}, {"n": 30, "casas": 2700}, {"n": 31, "casas": 2883}, {"n": 32, "casas": 3072}, {"n": 33, "casas": 3267}, {"n": 34, "casas": 3468}, {"n": 35, "casas": 3675}, {"n": 36, "casas": 3888}, {"n": 37, "casas": 4107}, {"n": 38, "casas": 4332}, {"n": 39, "casas": 4563}, {"n": 40, "casas": 4800}, {"n": 41, "casas": 5043}, {"n": 42, "casas": 5292}, {"n": 43, "casas": 5547}, {"n": 44, "casas": 5808}, {"n": 45, "casas": 6075}, {"n": 46, "casas": 6348}, {"n": 47, "casas": 6627}, {"n": 48, "casas": 6912}, {"n": 49, "casas": 7203}, {"n": 50, "casas": 7500}, {"n": 51, "casas": 7803}, {"n": 52, "casas": 8112}, {"n": 53, "casas": 8427}, {"n": 54, "casas": 8748}, {"n": 55, "casas": 9075}, {"n": 56, "casas": 9408}, {"n": 57, "casas": 9747}, {"n": 58, "casas": 10092}, {"n": 59, "casas": 10443}, {"n": 60, "casas": 10800}]}}}];
