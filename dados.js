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
  "alg": "heapsort",
  "id": "heapsort",
  "nome": "Heapsort",
  "variante": "heap de máximo no próprio vetor, montado de baixo para cima",
  "familia": "ordenação",
  "resumo": "Arruma o vetor num heap de máximo, em que todo pai é maior que os filhos e o maior fica na casa 1. Depois troca a raiz com o último do heap: o maior vai para o lugar final, o heap encolhe uma casa, e a raiz nova desce até achar o lugar dela. Repete até o heap ter um número só.",
  "instrumentos": [
   {
    "id": "vetor",
    "papel": "a entrada, ordenada no próprio vetor"
   },
   {
    "id": "heap",
    "papel": "o heap mora no começo do vetor; montar de uma vez e descer são os do Heap, com a comparação invertida (de máximo)"
   }
  ],
  "tempo": {
   "notacao": "O(n log n)",
   "porque": "Montar o heap de baixo para cima custa O(n). Depois, cada uma das n − 1 trocas da raiz faz a nova raiz descer no máximo a altura do heap, log₂ n níveis, com duas comparações por nível. Isso vale para qualquer entrada: não existe vetor ruim para o heapsort.",
   "nota": "Já ordenado não ajuda, e ajuda até menos: o vetor crescente é o pior para montar um heap de máximo, porque todo pai é menor que os filhos. O quick sort costuma comparar menos no aleatório, mas chega a n²/2 no vetor já ordenado."
  },
  "memoria": {
   "notacao": "O(1)",
   "porque": "O heap e a parte já ordenada dividem o mesmo vetor: o heap no começo, os maiores no fim. Só guarda os índices fim, i, p e f."
  },
  "video": {
   "ideia": [
    "monta um heap de máximo: cada pai desce até ficar maior que os filhos",
    "o maior do heap vai para o fim; o heap encolhe uma casa e a raiz nova desce"
   ]
  },
  "placa": {
   "autor": "J. W. J. Williams; Robert W. Floyd (montar de baixo para cima)",
   "ano": "1964"
  },
  "poster": "algoritmos/heapsort/heapsort.png",
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
   "ops": 148,
   "movimentos": 91,
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
       "media": 81,
       "min": 79,
       "max": 84,
       "movimentos": 52.1,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 85,
       "movimentos": 58,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 72,
       "movimentos": 42,
       "pico": 0
      }
     },
     {
      "n": 32,
      "aleatorio": {
       "media": 221.4,
       "min": 217,
       "max": 226,
       "movimentos": 134.3,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 231,
       "movimentos": 146,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 202,
       "movimentos": 112,
       "pico": 0
      }
     },
     {
      "n": 64,
      "aleatorio": {
       "media": 573.5,
       "min": 557,
       "max": 583,
       "movimentos": 329.4,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 593,
       "movimentos": 362,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 525,
       "movimentos": 288,
       "pico": 0
      }
     },
     {
      "n": 128,
      "aleatorio": {
       "media": 1400.5,
       "min": 1393,
       "max": 1421,
       "movimentos": 786.4,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 1459,
       "movimentos": 850,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 1294,
       "movimentos": 702,
       "pico": 0
      }
     },
     {
      "n": 256,
      "aleatorio": {
       "media": 3306.7,
       "min": 3292,
       "max": 3323,
       "movimentos": 1823.9,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 3452,
       "movimentos": 1972,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 3106,
       "movimentos": 1642,
       "pico": 0
      }
     },
     {
      "n": 512,
      "aleatorio": {
       "media": 7645.3,
       "min": 7622,
       "max": 7683,
       "movimentos": 4162.4,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 7958,
       "movimentos": 4464,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 7203,
       "movimentos": 3772,
       "pico": 0
      }
     },
     {
      "n": 1024,
      "aleatorio": {
       "media": 17304.3,
       "min": 17273,
       "max": 17354,
       "movimentos": 9325,
       "pico": 0
      },
      "ordenado": {
       "comparacoes": 18060,
       "movimentos": 9968,
       "pico": 0
      },
      "invertido": {
       "comparacoes": 16407,
       "movimentos": 8542,
       "pico": 0
      }
     }
    ],
    "crescimento_dados": "Aleatório: média de 10 vetores embaralhados por tamanho; ordenado e invertido: um vetor cada",
    "distribuicao": {
     "n": 24,
     "vetores": 200,
     "comparacoes": [
      146,
      153,
      148,
      143,
      148,
      143,
      149,
      155,
      150,
      150,
      148,
      152,
      147,
      144,
      151,
      147,
      152,
      153,
      157,
      149,
      157,
      143,
      148,
      149,
      145,
      155,
      141,
      151,
      157,
      151,
      150,
      145,
      150,
      158,
      152,
      151,
      148,
      150,
      149,
      141,
      153,
      149,
      147,
      141,
      155,
      156,
      144,
      146,
      151,
      153,
      149,
      148,
      150,
      148,
      154,
      155,
      148,
      156,
      152,
      150,
      151,
      149,
      154,
      150,
      149,
      143,
      148,
      145,
      148,
      148,
      141,
      147,
      146,
      147,
      150,
      145,
      148,
      151,
      144,
      155,
      148,
      150,
      149,
      147,
      155,
      148,
      151,
      153,
      154,
      146,
      152,
      150,
      151,
      147,
      151,
      149,
      148,
      146,
      148,
      145,
      155,
      146,
      148,
      149,
      156,
      141,
      140,
      150,
      154,
      149,
      150,
      145,
      150,
      149,
      152,
      148,
      150,
      153,
      144,
      154,
      148,
      153,
      153,
      154,
      148,
      153,
      148,
      149,
      145,
      151,
      143,
      148,
      151,
      149,
      153,
      144,
      141,
      153,
      155,
      151,
      146,
      151,
      150,
      154,
      151,
      156,
      152,
      152,
      152,
      147,
      152,
      151,
      151,
      150,
      146,
      149,
      151,
      148,
      143,
      149,
      150,
      147,
      149,
      144,
      151,
      149,
      147,
      149,
      155,
      149,
      152,
      151,
      148,
      142,
      145,
      149,
      142,
      146,
      143,
      146,
      154,
      150,
      155,
      153,
      155,
      146,
      145,
      157,
      148,
      149,
      148,
      156,
      148,
      151,
      154,
      139,
      146,
      150,
      151,
      146
     ]
    }
   },
   "memoria": {
    "pico": 0,
    "detalhe": {}
   },
   "ciclomatica": {
    "M": 7,
    "nos": 19,
    "arestas": 24,
    "decisoes": [
     {
      "linha": 4,
      "tipo": "while"
     },
     {
      "linha": 5,
      "tipo": "if"
     },
     {
      "linha": 11,
      "tipo": "while"
     },
     {
      "linha": 13,
      "tipo": "and/or"
     },
     {
      "linha": 13,
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
       "rotulo": "while"
      },
      {
       "id": 4,
       "linha": 5,
       "rotulo": "if"
      },
      {
       "id": 5,
       "linha": 6,
       "rotulo": "augassign"
      },
      {
       "id": 6,
       "linha": 8,
       "rotulo": "augassign"
      },
      {
       "id": 7,
       "linha": 9,
       "rotulo": "expr"
      },
      {
       "id": 8,
       "linha": 10,
       "rotulo": "assign"
      },
      {
       "id": 9,
       "linha": 11,
       "rotulo": "while"
      },
      {
       "id": 10,
       "linha": 12,
       "rotulo": "assign"
      },
      {
       "id": 11,
       "linha": 13,
       "rotulo": "if"
      },
      {
       "id": 12,
       "linha": 13,
       "rotulo": "e"
      },
      {
       "id": 13,
       "linha": 14,
       "rotulo": "augassign"
      },
      {
       "id": 14,
       "linha": 15,
       "rotulo": "if"
      },
      {
       "id": 15,
       "linha": 16,
       "rotulo": "expr"
      },
      {
       "id": 16,
       "linha": 17,
       "rotulo": "assign"
      },
      {
       "id": 17,
       "linha": 19,
       "rotulo": "break"
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
       "de": 5,
       "para": 8,
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
       "de": 11,
       "para": 14,
       "tipo": "segue"
      },
      {
       "de": 12,
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
       "de": 14,
       "para": 17,
       "tipo": "segue"
      },
      {
       "de": 16,
       "para": 9,
       "tipo": "volta"
      },
      {
       "de": 9,
       "para": 3,
       "tipo": "volta"
      },
      {
       "de": 17,
       "para": 3,
       "tipo": "volta"
      },
      {
       "de": 3,
       "para": 18,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def heapsort(v, conta):\n    n = len(v)\n    fim, i = n, n // 2\n    while fim > 1:\n        if i > 0:\n            i -= 1\n        else:\n            fim -= 1\n            troca(v, 0, fim, conta)\n        p = i\n        while 2 * p + 1 < fim:\n            f = 2 * p + 1\n            if f + 1 < fim and maior(v, f + 1, f, conta):\n                f += 1\n            if maior(v, f, p, conta):\n                troca(v, p, f, conta)\n                p = f\n            else:\n                break\n"
   }
  },
  "conferencia": {
   "referencia": "heapsort_r() (reimplementação em R) e sort()",
   "versao_r": "4.6.0",
   "vetores": 7,
   "tudo_ok": true,
   "resumo": "Reescrito em R 4.6.0 e rodado em 7 vetores de 50 números (5 embaralhados, 1 ordenado, 1 invertido): a ordem final bate com sort() e as comparações e os movimentos batem um a um com o Python."
  },
  "pseudocodigo": {
   "assinatura": "heapsort(v)",
   "nome": "heapsort",
   "arvore": [
    {
     "tipo": "acao",
     "linha": 2,
     "texto": "fim ← n;  i ← ⌊n/2⌋ + 1",
     "chamada": false
    },
    {
     "tipo": "laco",
     "rotulo": "enquanto",
     "linha": 3,
     "op": "e",
     "conds": [
      "fim > 1"
     ],
     "corpo": [
      {
       "tipo": "se",
       "linha": 4,
       "op": "e",
       "conds": [
        "i > 1"
       ],
       "entao": [
        {
         "tipo": "acao",
         "linha": 5,
         "texto": "i ← i − 1",
         "chamada": false
        }
       ],
       "senao": [
        {
         "tipo": "acao",
         "linha": 7,
         "texto": "troque v[1] com v[fim]",
         "chamada": false
        },
        {
         "tipo": "acao",
         "linha": 8,
         "texto": "fim ← fim − 1",
         "chamada": false
        }
       ]
      },
      {
       "tipo": "acao",
       "linha": 9,
       "texto": "p ← i",
       "chamada": false
      },
      {
       "tipo": "laco",
       "rotulo": "enquanto",
       "linha": 10,
       "op": "e",
       "conds": [
        "2p ≤ fim"
       ],
       "corpo": [
        {
         "tipo": "acao",
         "linha": 11,
         "texto": "f ← 2p",
         "chamada": false
        },
        {
         "tipo": "se",
         "linha": 12,
         "op": "e",
         "conds": [
          "f < fim",
          "v[f + 1] > v[f]"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 13,
           "texto": "f ← f + 1",
           "chamada": false
          }
         ],
         "senao": null
        },
        {
         "tipo": "se",
         "linha": 14,
         "op": "e",
         "conds": [
          "v[f] > v[p]"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 15,
           "texto": "troque v[p] com v[f];  p ← f",
           "chamada": false
          }
         ],
         "senao": [
          {
           "tipo": "pare",
           "linha": 17
          }
         ]
        }
       ]
      }
     ]
    }
   ],
   "linhas": [
    "procedimento heapsort(v):",
    "    fim ← n;  i ← ⌊n/2⌋ + 1",
    "    enquanto fim > 1:",
    "        se i > 1:",
    "            i ← i − 1",
    "        senão:",
    "            troque v[1] com v[fim]",
    "            fim ← fim − 1",
    "        p ← i",
    "        enquanto 2p ≤ fim:",
    "            f ← 2p",
    "            se f < fim e v[f + 1] > v[f]:",
    "                f ← f + 1",
    "            se v[f] > v[p]:",
    "                troque v[p] com v[f];  p ← f",
    "            senão:",
    "                pare"
   ],
   "M": 7,
   "nos": 17,
   "arestas": 22,
   "decisoes": [
    3,
    4,
    10,
    12,
    12,
    14
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
  "alg": "prioridade",
  "id": "fila-de-prioridade",
  "nome": "Fila de prioridade",
  "variante": "pronto-socorro: um médico, gravidade de 1 a 5",
  "familia": "árvores e heaps",
  "resumo": "Pacientes chegam ao pronto-socorro em minutos sorteados, cada um com uma gravidade de 1 (a mais urgente) a 5. Quem chega com o médico ocupado espera na fila de prioridade. Quando o médico fica livre, chama o mais urgente e, no empate, quem chegou primeiro. É a Fila de atendimento com outra regra: aqui, quem chega por último pode passar na frente.",
  "instrumentos": [
   {
    "id": "heap",
    "papel": "a fila de prioridade: um heap de mínimo com a chave (gravidade, chegada); chamar o próximo é tirar o menor"
   }
  ],
  "tempo": {
   "notacao": "O(n log n)",
   "porque": "Cada paciente que espera entra no heap uma vez e sai uma vez. Entrar sobe e sair desce, e cada um anda no máximo a altura do heap, uns log₂ n níveis. São até 2n operações de O(log n) cada.",
   "nota": "Num dia calmo, o heap quase não passa de um ou dois pacientes, e cada operação custa pouco: o total fica perto de n. Lotado, o heap cresce com o dia, e a altura dele aparece na conta. Uma fila ingênua, que procurasse o mais urgente olhando todos, faria O(n) por chamada e O(n²) no dia."
  },
  "memoria": {
   "notacao": "O(n)",
   "porque": "O heap guarda quem está esperando, um par (gravidade, chegada) por paciente. Num dia calmo, quase ninguém; lotado, o heap cresce sem parar e chega a uma fração de n.",
   "nomes": {
    "heap": "pacientes esperando no heap"
   },
   "cresce_com_n": [
    "heap"
   ],
   "vazio": "não guarda nada"
  },
  "video": {
   "ideia": [
    "quem chega com o médico ocupado entra no heap: sobe enquanto for mais urgente que o pai",
    "o médico chama o topo do heap, o mais urgente; o último sobe para a raiz e desce"
   ]
  },
  "graficos": {
   "titulo": "Tempo: como cresce, e o movimento do dia",
   "texto": "As mesmas contas para cada vez mais pacientes e para três movimentos: calmo, no limite (chegam tantos quantos o médico atende) e lotado. Em escala logarítmica, quem cresce como n sobe em linha reta, com inclinação 1; o lotado sobe um pouco mais inclinado, porque o heap fica alto.",
   "crescimento": "Acessos ao heap (casas lidas e escritas) para n de {n0} a {n1} pacientes. {dados}; a faixa cinza vai do menor ao maior dos sorteios no limite. Tracejada: n log₂ n, de referência.",
   "distribuicao": "{vezes} sorteios de {nd} pacientes num dia lotado: a maior fila vai de {min} a {max} pacientes. A barra preta é o sorteio do encarte.",
   "rotulo": "maior fila (n = {nd})",
   "memoria": "Maior fila para cada n, nos três movimentos (a maior entre os sorteios). Lotado, o heap cresce com n; calmo, quase não sai do lugar."
  },
  "placa": {
   "autor": "sem autoria única; o heap como fila de prioridade é de J. W. J. Williams",
   "ano": "1964"
  },
  "poster": "algoritmos/prioridade/prioridade.png",
  "exemplo": {
   "dados": "24 pacientes sorteados com a semente 11: um chega a cada 1 a 3 minutos, é atendido em 2 a 4 minutos e tem gravidade de 1 (a mais urgente) a 5",
   "n": 24,
   "semente": 11,
   "caso": "lotado",
   "chegada": [
    2,
    5,
    7,
    9,
    12,
    15,
    16,
    17,
    20,
    22,
    25,
    28,
    29,
    30,
    32,
    34,
    35,
    36,
    39,
    42,
    45,
    46,
    49,
    51
   ],
   "duracao": [
    3,
    4,
    4,
    4,
    4,
    2,
    4,
    2,
    4,
    2,
    2,
    2,
    2,
    2,
    4,
    2,
    3,
    3,
    3,
    4,
    2,
    4,
    2,
    4
   ],
   "gravidade": [
    3,
    4,
    1,
    1,
    4,
    3,
    4,
    5,
    1,
    3,
    3,
    2,
    5,
    3,
    1,
    1,
    5,
    1,
    4,
    1,
    3,
    4,
    1,
    1
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
   "gravidades": [
    1,
    5
   ],
   "soma": 260,
   "maior": 7,
   "esperas": [
    0,
    0,
    2,
    4,
    7,
    2,
    40,
    50,
    3,
    5,
    6,
    1,
    40,
    12,
    1,
    3,
    36,
    3,
    21,
    2,
    3,
    17,
    1,
    1
   ],
   "ordem": [
    0,
    1,
    2,
    3,
    5,
    4,
    8,
    9,
    11,
    10,
    14,
    15,
    17,
    13,
    19,
    20,
    22,
    23,
    6,
    18,
    21,
    7,
    12,
    16
   ],
   "por_gravidade": [
    2.2222222222222223,
    1,
    4.666666666666667,
    17,
    42
   ],
   "ops": 252,
   "operacoes": 44
  },
  "medido": {
   "tempo": {
    "unidade": "acessos ao heap",
    "tipo": "prioridade",
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
       "media": 18.3,
       "min": 9,
       "max": 35,
       "pico": 2,
       "operacoes": 11,
       "espera": 0.71875
      },
      "no_limite": {
       "media": 67.3,
       "min": 33,
       "max": 127,
       "pico": 4,
       "operacoes": 24.2,
       "espera": 3.575
      },
      "lotado": {
       "media": 141.8,
       "min": 75,
       "max": 173,
       "pico": 8,
       "operacoes": 29.6,
       "espera": 8.375
      }
     },
     {
      "n": 32,
      "calmo": {
       "media": 46,
       "min": 21,
       "max": 81,
       "pico": 3,
       "operacoes": 25,
       "espera": 1.046875
      },
      "no_limite": {
       "media": 172.2,
       "min": 77,
       "max": 334,
       "pico": 7,
       "operacoes": 51.2,
       "espera": 5.3375
      },
      "lotado": {
       "media": 407.9,
       "min": 304,
       "max": 481,
       "pico": 14,
       "operacoes": 61.2,
       "espera": 15.428125
      }
     },
     {
      "n": 64,
      "calmo": {
       "media": 96.8,
       "min": 51,
       "max": 141,
       "pico": 3,
       "operacoes": 52.2,
       "espera": 1.0921875
      },
      "no_limite": {
       "media": 497.6,
       "min": 214,
       "max": 725,
       "pico": 13,
       "operacoes": 113.2,
       "espera": 8.24375
      },
      "lotado": {
       "media": 1178.7,
       "min": 1090,
       "max": 1267,
       "pico": 26,
       "operacoes": 125.8,
       "espera": 35.8796875
      }
     },
     {
      "n": 128,
      "calmo": {
       "media": 183,
       "min": 111,
       "max": 318,
       "pico": 5,
       "operacoes": 99.8,
       "espera": 1.03359375
      },
      "no_limite": {
       "media": 1062.6,
       "min": 465,
       "max": 1984,
       "pico": 17,
       "operacoes": 221,
       "espera": 9.8640625
      },
      "lotado": {
       "media": 2958.2,
       "min": 2447,
       "max": 3141,
       "pico": 51,
       "operacoes": 253,
       "espera": 62.83359375
      }
     },
     {
      "n": 256,
      "calmo": {
       "media": 381.9,
       "min": 262,
       "max": 621,
       "pico": 4,
       "operacoes": 197.2,
       "espera": 1.088671875
      },
      "no_limite": {
       "media": 2833.3,
       "min": 1594,
       "max": 5174,
       "pico": 27,
       "operacoes": 451,
       "espera": 16.8109375
      },
      "lotado": {
       "media": 7334.2,
       "min": 6909,
       "max": 7614,
       "pico": 92,
       "operacoes": 509.2,
       "espera": 125.089453125
      }
     },
     {
      "n": 512,
      "calmo": {
       "media": 772.7,
       "min": 565,
       "max": 1023,
       "pico": 7,
       "operacoes": 403.8,
       "espera": 1.1123046875
      },
      "no_limite": {
       "media": 6666.9,
       "min": 3193,
       "max": 10662,
       "pico": 31,
       "operacoes": 936.6,
       "espera": 21.2427734375
      },
      "lotado": {
       "media": 17654.3,
       "min": 17481,
       "max": 17898,
       "pico": 181,
       "operacoes": 1020.8,
       "espera": 258.63984375
      }
     },
     {
      "n": 1024,
      "calmo": {
       "media": 1514,
       "min": 1173,
       "max": 1909,
       "pico": 5,
       "operacoes": 819.8,
       "espera": 1.08564453125
      },
      "no_limite": {
       "media": 17440.1,
       "min": 11362,
       "max": 25056,
       "pico": 47,
       "operacoes": 1934.4,
       "espera": 35.0130859375
      },
      "lotado": {
       "media": 40736.4,
       "min": 40155,
       "max": 41366,
       "pico": 366,
       "operacoes": 2045.2,
       "espera": 511.49091796875
      }
     }
    ],
    "eixo": "n (pacientes; dobra a cada passo)",
    "refs": [
     "n log₂ n"
    ],
    "crescimento_dados": "média de 10 sorteios de pacientes por tamanho",
    "distribuicao": {
     "n": 24,
     "vezes": 200,
     "valores": [
      8,
      6,
      6,
      10,
      6,
      10,
      11,
      11,
      5,
      9,
      7,
      7,
      8,
      8,
      9,
      8,
      6,
      8,
      8,
      8,
      10,
      9,
      9,
      9,
      8,
      7,
      9,
      12,
      8,
      10,
      9,
      6,
      6,
      10,
      6,
      8,
      8,
      7,
      10,
      8,
      10,
      10,
      6,
      8,
      8,
      8,
      9,
      5,
      6,
      10,
      4,
      10,
      9,
      8,
      6,
      6,
      8,
      11,
      6,
      11,
      8,
      10,
      9,
      6,
      8,
      7,
      10,
      5,
      8,
      5,
      8,
      4,
      8,
      8,
      6,
      11,
      8,
      7,
      9,
      7,
      7,
      9,
      9,
      5,
      6,
      7,
      8,
      5,
      8,
      4,
      10,
      7,
      7,
      9,
      8,
      9,
      9,
      9,
      8,
      7,
      8,
      5,
      9,
      9,
      11,
      5,
      4,
      12,
      8,
      8,
      8,
      8,
      9,
      8,
      7,
      8,
      10,
      6,
      8,
      7,
      7,
      8,
      9,
      11,
      7,
      7,
      9,
      8,
      7,
      5,
      8,
      11,
      5,
      10,
      5,
      9,
      9,
      9,
      5,
      9,
      7,
      8,
      10,
      10,
      6,
      10,
      5,
      7,
      12,
      10,
      6,
      10,
      7,
      6,
      8,
      9,
      11,
      7,
      9,
      10,
      7,
      6,
      11,
      10,
      9,
      9,
      8,
      8,
      8,
      9,
      13,
      8,
      6,
      8,
      7,
      7,
      6,
      9,
      7,
      10,
      11,
      10,
      9,
      9,
      7,
      9,
      8,
      10,
      8,
      9,
      8,
      9,
      8,
      7,
      7,
      8,
      10,
      7,
      5,
      9
     ],
     "destaque": 7
    }
   },
   "memoria": {
    "pico": 7,
    "detalhe": {
     "heap": 7
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
    "codigo": "def atender(chegada, duracao, gravidade, conta):\n    n = len(chegada)\n    heap = Heap(conta)\n    livre, soma, maior, i = 0, 0, 0, 0\n    for _ in range(n):\n        while i < n and chegada[i] < livre:\n            insere(heap, i, gravidade[i], conta)\n            i += 1\n            maior = max(maior, heap.n)\n        if heap.n > 0:\n            k = tira(heap, conta)\n        else:\n            k = i\n            i += 1\n        inicio = max(livre, chegada[k])\n        conta.evento(\"atende\", k, inicio)\n        soma += inicio - chegada[k]\n        livre = inicio + duracao[k]\n    return soma, maior\n"
   }
  },
  "conferencia": {
   "referencia": "order() em R, sem heap, e um heap reescrito em R que conta casas",
   "versao_r": "4.6.0",
   "vetores": 16,
   "tudo_ok": true,
   "resumo": "Refeito em R 4.6.0 em 16 sorteios (o do encarte e 15 de 50 pacientes: calmo, no limite e lotado). Escolhendo o mais urgente com order(), sem heap nenhum, a ordem de atendimento, a espera de cada paciente e a maior fila batem com o Python; um heap reescrito em R conta os mesmos acessos ao heap."
  },
  "pseudocodigo": {
   "assinatura": "pronto_socorro(chegada, duração, gravidade)",
   "nome": "pronto_socorro",
   "arvore": [
    {
     "tipo": "acao",
     "linha": 2,
     "texto": "heap ← vazio;  livre ← 0;  i ← 1",
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
         "texto": "insira (gravidade[i], i) no heap;  i ← i + 1",
         "chamada": false
        },
        {
         "tipo": "acao",
         "linha": 7,
         "texto": "maior ← máximo(maior, tamanho do heap)",
         "chamada": false
        }
       ]
      },
      {
       "tipo": "se",
       "linha": 8,
       "op": "e",
       "conds": [
        "o heap não está vazio"
       ],
       "entao": [
        {
         "tipo": "acao",
         "linha": 9,
         "texto": "(g, k) ← tire o menor do heap",
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
    "procedimento pronto_socorro(chegada, duração, gravidade):",
    "    heap ← vazio;  livre ← 0;  i ← 1",
    "    soma ← 0;  maior ← 0",
    "    para cada atendimento, de 1 até n:",
    "        enquanto i ≤ n e chegada[i] < livre:",
    "            insira (gravidade[i], i) no heap;  i ← i + 1",
    "            maior ← máximo(maior, tamanho do heap)",
    "        se o heap não está vazio:",
    "            (g, k) ← tire o menor do heap",
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
  "alg": "dijkstra",
  "id": "dijkstra",
  "nome": "Dijkstra",
  "variante": "grafo em grade com pesos, heap que reinsere e descarta",
  "familia": "grafos",
  "resumo": "Acha a distância mínima da origem a cada vértice, num grafo em que cada aresta tem um peso, o custo de atravessá-la. Um heap guarda pares (distância, vértice), e sai sempre o mais perto da origem: quando ele sai, a distância dele já é a menor possível. Então olha os vizinhos dele e, se passar por ele encurta o caminho até algum, anota a distância nova e põe o par no heap. O par antigo daquele vizinho continua lá dentro; quando sair, estará vencido e é jogado fora.",
  "instrumentos": [
   {
    "id": "grafo",
    "papel": "a lista de adjacência, com o par (vizinho, peso) em cada casa: os vizinhos de u custam grau(u) leituras"
   },
   {
    "id": "heap",
    "papel": "os pares (distância, vértice) esperando a vez; sai sempre o mais perto da origem"
   }
  ],
  "tempo": {
   "notacao": "O((V + E) log V)",
   "porque": "Cada vértice que sai do heap valendo olha cada vizinho uma vez: somando todos, cada aresta é olhada pelas duas pontas, 2E leituras. Cada distância que melhora põe um par no heap, no máximo uma vez por aresta olhada, e cada par entra e sai uma vez, subindo ou descendo até log₂ do tamanho do heap. O total cresce como (V + E) log V.",
   "nota": "Na grade, E fica entre V − 1 e 2V, e a conta vira V log V. O heap que diminui a prioridade de um vértice em vez de reinseri-lo, como no livro de Cormen, guarda no máximo V pares; reinserindo, ele pode guardar um por aresta, mas cada par vencido só custa uma saída a mais."
  },
  "memoria": {
   "notacao": "O(V + E)",
   "porque": "O vetor dist guarda uma distância por vértice: V casas. O heap guarda a fronteira, os vértices alcançados que ainda não saíram, mais os pares vencidos que ainda não saíram: no pior caso, um par por aresta. Na grade, isso fica bem abaixo de V; no caminho, o heap nunca passa de 1.",
   "nomes": {
    "dist": "distâncias (uma por vértice)",
    "heap": "pares no heap"
   },
   "cresce_com_n": [
    "dist"
   ],
   "vazados": "no heap, a fronteira e os pares vencidos",
   "variavel": "V"
  },
  "video": {
   "ideia": [
    "sai do heap o mais perto; por ele, algum vizinho fica mais perto?",
    "o par vencido sai depois e é descartado: a distância já melhorou"
   ]
  },
  "graficos": {
   "titulo": "Tempo: como cresce, e que grafo entra",
   "texto": "As mesmas contas para grades cada vez maiores e para três grafos: sorteado, grade cheia e caminho em serpentina, todos com pesos de 1 a 9 sorteados. Em escala logarítmica, quem cresce como V sobe em linha reta, com inclinação 1. A grade cheia corre acima do sorteado, quase paralela: com mais arestas, olha mais vizinhos, o heap fica mais alto e descarta mais pares. No caminho, o heap tem um par só, e a conta é quase linear.",
   "crescimento": "Acessos ao heap e à lista para V de {n0} a {n1}. {dados}; a faixa cinza vai do menor ao maior dos grafos sorteados. Tracejada: V log₂ V, de referência.",
   "distribuicao": "{vezes} grafos sorteados de {nd} vértices: o heap mais alto vai de {min} a {max} pares. A barra preta é o grafo do encarte.",
   "rotulo": "heap mais alto (V = {nd})",
   "memoria": "O heap mais alto para cada V, nos três grafos (nos sorteados, o maior entre eles). O vetor dist, sempre com V casas, fica de fora. No caminho, o heap nunca passa de 1; na grade cheia, ele carrega a fronteira e os pares vencidos."
  },
  "placa": {
   "autor": "Edsger W. Dijkstra",
   "ano": "1959"
  },
  "poster": "algoritmos/dijkstra/dijkstra.png",
  "exemplo": {
   "dados": "um grafo em grade 5 × 5 sorteado com a semente 27: 25 vértices e 30 arestas, cada uma com um peso de 1 a 9",
   "n": 25,
   "k": 5,
   "semente": 27,
   "caso": "sorteado",
   "arestas": [
    [
     0,
     1
    ],
    [
     1,
     2
    ],
    [
     1,
     6
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
     4,
     9
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
     7,
     12
    ],
    [
     8,
     9
    ],
    [
     10,
     15
    ],
    [
     11,
     12
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
     13,
     18
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
     15,
     20
    ],
    [
     16,
     21
    ],
    [
     17,
     18
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
     22,
     23
    ],
    [
     23,
     24
    ]
   ],
   "pesos": [
    8,
    8,
    6,
    1,
    6,
    3,
    5,
    3,
    8,
    6,
    9,
    1,
    9,
    4,
    3,
    4,
    8,
    9,
    2,
    6,
    6,
    1,
    7,
    6,
    2,
    5,
    5,
    9,
    2,
    5
   ],
   "faixa_pesos": [
    1,
    9
   ],
   "dist": [
    0,
    8,
    16,
    44,
    38,
    19,
    14,
    17,
    26,
    35,
    22,
    20,
    18,
    26,
    28,
    25,
    24,
    27,
    29,
    34,
    32,
    30,
    36,
    34,
    39
   ],
   "ordem": [
    0,
    1,
    6,
    2,
    7,
    12,
    5,
    11,
    10,
    16,
    15,
    8,
    13,
    17,
    14,
    18,
    21,
    20,
    19,
    23,
    9,
    22,
    4,
    24,
    3
   ],
   "ops": 359,
   "operacoes": 58,
   "vizinhos": 60,
   "descartados": 4,
   "pico": 32,
   "estrutura": 7
  },
  "medido": {
   "tempo": {
    "unidade": "acessos ao heap e à lista",
    "tipo": "dijkstra",
    "series": [
     {
      "caso": "sorteado",
      "nome": "sorteado (média)"
     },
     {
      "caso": "grade",
      "nome": "grade cheia (média)"
     },
     {
      "caso": "caminho",
      "nome": "caminho (média)"
     }
    ],
    "banda": "sorteado",
    "crescimento": [
     {
      "n": 16,
      "k": 4,
      "sorteado": {
       "media": 166.9,
       "min": 123,
       "max": 210,
       "pico": 6,
       "arestas": 17.9,
       "descartados": 0.7
      },
      "grade": {
       "media": 236.6,
       "min": 202,
       "max": 310,
       "pico": 8,
       "arestas": 24,
       "descartados": 2.2
      },
      "caminho": {
       "media": 78,
       "min": 78,
       "max": 78,
       "pico": 1,
       "arestas": 15,
       "descartados": 0
      }
     },
     {
      "n": 36,
      "k": 6,
      "sorteado": {
       "media": 483.8,
       "min": 405,
       "max": 567,
       "pico": 10,
       "arestas": 43.3,
       "descartados": 2
      },
      "grade": {
       "media": 685,
       "min": 611,
       "max": 780,
       "pico": 13,
       "arestas": 60,
       "descartados": 6.6
      },
      "caminho": {
       "media": 178,
       "min": 178,
       "max": 178,
       "pico": 1,
       "arestas": 35,
       "descartados": 0
      }
     },
     {
      "n": 64,
      "k": 8,
      "sorteado": {
       "media": 991.1,
       "min": 916,
       "max": 1105,
       "pico": 13,
       "arestas": 79.5,
       "descartados": 4.4
      },
      "grade": {
       "media": 1357.1,
       "min": 1227,
       "max": 1491,
       "pico": 20,
       "arestas": 112,
       "descartados": 11.9
      },
      "caminho": {
       "media": 318,
       "min": 318,
       "max": 318,
       "pico": 1,
       "arestas": 63,
       "descartados": 0
      }
     },
     {
      "n": 121,
      "k": 11,
      "sorteado": {
       "media": 2173.8,
       "min": 1956,
       "max": 2416,
       "pico": 23,
       "arestas": 153.7,
       "descartados": 8.2
      },
      "grade": {
       "media": 2918.8,
       "min": 2663,
       "max": 3236,
       "pico": 31,
       "arestas": 220,
       "descartados": 24.9
      },
      "caminho": {
       "media": 603,
       "min": 603,
       "max": 603,
       "pico": 1,
       "arestas": 120,
       "descartados": 0
      }
     },
     {
      "n": 256,
      "k": 16,
      "sorteado": {
       "media": 5339,
       "min": 4908,
       "max": 5711,
       "pico": 29,
       "arestas": 332.4,
       "descartados": 22.1
      },
      "grade": {
       "media": 7081.7,
       "min": 6725,
       "max": 7270,
       "pico": 40,
       "arestas": 480,
       "descartados": 57.3
      },
      "caminho": {
       "media": 1278,
       "min": 1278,
       "max": 1278,
       "pico": 1,
       "arestas": 255,
       "descartados": 0
      }
     },
     {
      "n": 529,
      "k": 23,
      "sorteado": {
       "media": 12216.1,
       "min": 12042,
       "max": 12487,
       "pico": 47,
       "arestas": 694.3,
       "descartados": 43
      },
      "grade": {
       "media": 16014.1,
       "min": 15682,
       "max": 16346,
       "pico": 60,
       "arestas": 1012,
       "descartados": 127.1
      },
      "caminho": {
       "media": 2643,
       "min": 2643,
       "max": 2643,
       "pico": 1,
       "arestas": 528,
       "descartados": 0
      }
     },
     {
      "n": 1024,
      "k": 32,
      "sorteado": {
       "media": 25932.9,
       "min": 25346,
       "max": 26546,
       "pico": 61,
       "arestas": 1344.3,
       "descartados": 84.1
      },
      "grade": {
       "media": 33683.5,
       "min": 33068,
       "max": 34228,
       "pico": 84,
       "arestas": 1984,
       "descartados": 245.2
      },
      "caminho": {
       "media": 5118,
       "min": 5118,
       "max": 5118,
       "pico": 1,
       "arestas": 1023,
       "descartados": 0
      }
     },
     {
      "n": 2025,
      "k": 45,
      "sorteado": {
       "media": 55036.1,
       "min": 54511,
       "max": 55954,
       "pico": 85,
       "arestas": 2681.9,
       "descartados": 160.1
      },
      "grade": {
       "media": 71368.8,
       "min": 70754,
       "max": 72307,
       "pico": 116,
       "arestas": 3960,
       "descartados": 488.9
      },
      "caminho": {
       "media": 10123,
       "min": 10123,
       "max": 10123,
       "pico": 1,
       "arestas": 2024,
       "descartados": 0
      }
     },
     {
      "n": 4096,
      "k": 64,
      "sorteado": {
       "media": 120778.6,
       "min": 119451,
       "max": 122479,
       "pico": 118,
       "arestas": 5423.9,
       "descartados": 337
      },
      "grade": {
       "media": 153720.1,
       "min": 151990,
       "max": 156265,
       "pico": 168,
       "arestas": 8064,
       "descartados": 973.1
      },
      "caminho": {
       "media": 20478,
       "min": 20478,
       "max": 20478,
       "pico": 1,
       "arestas": 4095,
       "descartados": 0
      }
     }
    ],
    "eixo": "V (vértices de uma grade k × k; quase dobra a cada passo)",
    "refs": [
     "V log₂ V"
    ],
    "crescimento_dados": "média de 10 sorteios de pesos por tamanho (no sorteado, também das arestas)",
    "distribuicao": {
     "n": 25,
     "vezes": 200,
     "valores": [
      6,
      5,
      5,
      6,
      7,
      6,
      7,
      6,
      4,
      9,
      5,
      7,
      5,
      5,
      5,
      8,
      6,
      6,
      6,
      9,
      5,
      5,
      7,
      8,
      5,
      4,
      7,
      7,
      7,
      7,
      5,
      8,
      7,
      4,
      9,
      5,
      5,
      7,
      8,
      9,
      6,
      7,
      6,
      7,
      4,
      8,
      7,
      5,
      6,
      5,
      7,
      6,
      7,
      6,
      4,
      8,
      6,
      7,
      7,
      4,
      6,
      5,
      7,
      7,
      8,
      5,
      7,
      5,
      7,
      5,
      6,
      5,
      6,
      5,
      7,
      5,
      5,
      5,
      8,
      8,
      7,
      6,
      7,
      6,
      7,
      6,
      6,
      6,
      5,
      4,
      7,
      5,
      6,
      7,
      6,
      6,
      5,
      5,
      6,
      5,
      5,
      6,
      6,
      6,
      5,
      6,
      7,
      6,
      6,
      6,
      5,
      4,
      8,
      5,
      5,
      8,
      6,
      9,
      5,
      5,
      4,
      4,
      6,
      9,
      8,
      6,
      8,
      6,
      8,
      6,
      4,
      5,
      5,
      7,
      5,
      6,
      6,
      4,
      8,
      6,
      5,
      9,
      7,
      7,
      6,
      6,
      8,
      9,
      5,
      4,
      5,
      7,
      8,
      5,
      7,
      6,
      4,
      6,
      8,
      5,
      4,
      7,
      7,
      6,
      5,
      5,
      7,
      6,
      7,
      8,
      6,
      4,
      6,
      7,
      8,
      7,
      7,
      7,
      7,
      5,
      6,
      8,
      6,
      7,
      6,
      5,
      7,
      7,
      8,
      5,
      7,
      7,
      7,
      7,
      7,
      4,
      5,
      6,
      4,
      8
     ],
     "destaque": 7
    }
   },
   "memoria": {
    "pico": 32,
    "detalhe": {
     "dist": 25,
     "heap": 7
    }
   },
   "ciclomatica": {
    "M": 5,
    "nos": 17,
    "arestas": 20,
    "decisoes": [
     {
      "linha": 6,
      "tipo": "while"
     },
     {
      "linha": 8,
      "tipo": "if"
     },
     {
      "linha": 9,
      "tipo": "for"
     },
     {
      "linha": 11,
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
       "rotulo": "if"
      },
      {
       "id": 8,
       "linha": 9,
       "rotulo": "for"
      },
      {
       "id": 9,
       "linha": 10,
       "rotulo": "assign"
      },
      {
       "id": 10,
       "linha": 11,
       "rotulo": "if"
      },
      {
       "id": 11,
       "linha": 12,
       "rotulo": "assign"
      },
      {
       "id": 12,
       "linha": 13,
       "rotulo": "expr"
      },
      {
       "id": 13,
       "linha": 15,
       "rotulo": "expr"
      },
      {
       "id": 14,
       "linha": 16,
       "rotulo": "expr"
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
       "para": 8,
       "tipo": "volta"
      },
      {
       "de": 10,
       "para": 8,
       "tipo": "volta"
      },
      {
       "de": 7,
       "para": 13,
       "tipo": "segue"
      },
      {
       "de": 13,
       "para": 14,
       "tipo": "segue"
      },
      {
       "de": 8,
       "para": 5,
       "tipo": "volta"
      },
      {
       "de": 14,
       "para": 5,
       "tipo": "volta"
      },
      {
       "de": 5,
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
    "codigo": "def dijkstra(grafo, s, conta):\n    dist = conta.aloca(\"dist\", [INF] * grafo.V)\n    heap = Heap(conta)\n    dist[s] = 0\n    insere(heap, 0, s, conta)\n    while heap.n > 0:\n        d, u = tira(heap, conta)\n        if d == dist[u]:\n            for i in range(grafo.grau(u)):\n                v, w = olha(grafo, u, i, conta)\n                if d + w < dist[v]:\n                    dist[v] = d + w\n                    insere(heap, dist[v], v, conta)\n        else:\n            conta.op(\"descartados\")\n            conta.evento(\"descarta\", u, d)\n    return dist\n"
   }
  },
  "conferencia": {
   "referencia": "igraph::distances() (igraph 2.3.3) e dijkstra_r() (reimplementação em R)",
   "versao_r": "4.6.0",
   "vetores": 16,
   "tudo_ok": true,
   "resumo": "Rodado no R 4.6.0 com o igraph 2.3.3 em 16 grafos com pesos (o do encarte e 15 grades 6 × 6: sorteadas, cheias e em caminho): a distância de cada vértice bate com o distances() do igraph, e a reimplementação em R, com um heap que conta casas, conta os mesmos acessos, descarta os mesmos pares, tira os vértices na mesma ordem e chega ao mesmo heap mais alto."
  },
  "pseudocodigo": {
   "assinatura": "dijkstra(G, s)",
   "nome": "dijkstra",
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
     "texto": "dist[s] ← 0;  insira (0, s) no heap",
     "chamada": false
    },
    {
     "tipo": "laco",
     "rotulo": "enquanto",
     "linha": 4,
     "op": "e",
     "conds": [
      "o heap não está vazio"
     ],
     "corpo": [
      {
       "tipo": "acao",
       "linha": 5,
       "texto": "(d, u) ← tire o menor do heap",
       "chamada": false
      },
      {
       "tipo": "se",
       "linha": 6,
       "op": "e",
       "conds": [
        "d = dist[u]"
       ],
       "entao": [
        {
         "tipo": "laco",
         "rotulo": "para",
         "linha": 7,
         "op": "e",
         "conds": [
          "para cada vizinho v de u, com peso w"
         ],
         "corpo": [
          {
           "tipo": "se",
           "linha": 8,
           "op": "e",
           "conds": [
            "d + w < dist[v]"
           ],
           "entao": [
            {
             "tipo": "acao",
             "linha": 9,
             "texto": "dist[v] ← d + w",
             "chamada": false
            },
            {
             "tipo": "acao",
             "linha": 10,
             "texto": "insira (dist[v], v) no heap",
             "chamada": false
            }
           ],
           "senao": null
          }
         ]
        }
       ],
       "senao": [
        {
         "tipo": "acao",
         "linha": 12,
         "texto": "descarte o par (d, u), que está vencido",
         "chamada": false
        }
       ]
      }
     ]
    },
    {
     "tipo": "devolva",
     "linha": 13,
     "texto": "devolva dist"
    }
   ],
   "linhas": [
    "procedimento dijkstra(G, s):",
    "    dist[v] ← ∞ para todo vértice v",
    "    dist[s] ← 0;  insira (0, s) no heap",
    "    enquanto o heap não está vazio:",
    "        (d, u) ← tire o menor do heap",
    "        se d = dist[u]:",
    "            para cada vizinho v de u, com peso w:",
    "                se d + w < dist[v]:",
    "                    dist[v] ← d + w",
    "                    insira (dist[v], v) no heap",
    "        senão:",
    "            descarte o par (d, u), que está vencido",
    "    devolva dist"
   ],
   "M": 5,
   "nos": 13,
   "arestas": 16,
   "decisoes": [
    4,
    6,
    7,
    8
   ]
  }
 },
 {
  "ciclomatica": {
   "porque": "Cada for, while e if, e cada and/or numa condição, abre um caminho a mais pelo código. A complexidade ciclomática conta os caminhos independentes: qualquer percurso pela função é uma combinação deles. É um teto para quantos testes cobrem todos os ramos, não o mínimo.",
   "regra": "Regra de contagem: +1 por for, while, if, if-expressão, except e cada and/or. Compreensões de lista são proibidas na função medida, porque escondem um laço que o grafo não veria."
  },
  "alg": "welford",
  "id": "media-e-variancia",
  "nome": "Média e variância em uma passada",
  "variante": "algoritmo de Welford",
  "familia": "estatística",
  "resumo": "Lê os valores uma vez só, na ordem em que chegam, e mantém a média e a soma dos quadrados dos desvios sempre atualizadas. Não guarda os valores e, quando os números são grandes e a variação é pequena, perde muito menos precisão que a fórmula da soma dos quadrados, que desanda.",
  "tempo": {
   "notacao": "O(n)",
   "porque": "Cada valor é lido uma vez e atualiza três números (n, média e M2) com meia dúzia de contas. São n leituras. As duas passadas leem tudo duas vezes: 2n.",
   "nota": "A soma dos quadrados também lê n valores, mas calcula Σx² − (Σx)²/n: dois números enormes e quase iguais. A subtração joga fora os algarismos que sobram, e a variância pode sair até negativa. O Welford só soma desvios pequenos: o erro dele cresce com a razão média/dp, e o da soma dos quadrados, com o quadrado dela. A conta mais precisa continua sendo a de duas passadas, que paga com a memória."
  },
  "memoria": {
   "notacao": "O(1)",
   "porque": "Guarda só n, a média e M2, que não crescem com n. Os valores passam e vão embora: dá para calcular sobre um fluxo que não cabe na memória.",
   "nota": "As duas passadas precisam ler os mesmos valores de novo; num fluxo, isso exige guardar todos os n: O(n).",
   "nomes": {
    "guardados": "valores guardados para a segunda passada"
   },
   "cresce_com_n": [
    "guardados"
   ],
   "vazio": "não guarda nenhum dos valores lidos",
   "soltos": "só guarda n, a média e M2"
  },
  "video": {
   "ideia": [
    "cada ano lido corrige a média pelo desvio δ dividido por n",
    "M2 soma desvios pequenos: a variância é M2 / (n − 1)"
   ]
  },
  "graficos": {
   "titulo": "Tempo, memória e precisão: três contas para a mesma variância",
   "texto": "As três contas leem os mesmos valores. O Welford e a soma dos quadrados leem cada um uma vez; as duas passadas, duas vezes. O que separa o Welford da soma dos quadrados não é o tempo, é a precisão.",
   "crescimento": "Leituras para n de {n0} a {n1}. {dados}. O Welford e a soma dos quadrados leem n valores; as duas passadas, 2n.",
   "erro": "O LakeHuron somado a uma constante, de 1 a 10¹⁰ pés: a variância não muda, mas o erro de cada conta, sim. Erro relativo contra a variância exata dos mesmos números, calculada em frações. Erro zero aparece no chão do gráfico.",
   "memoria": "Valores guardados no pico para cada n. O Welford e a soma dos quadrados não guardam nada; as duas passadas, num fluxo, guardam os n."
  },
  "placa": {
   "autor": "B. P. Welford",
   "ano": "1962"
  },
  "poster": "algoritmos/welford/welford.png",
  "exemplo": {
   "dados": "LakeHuron (R), nível do lago Huron, pés, 1875–1972",
   "n": 98,
   "anos": [
    1875,
    1876,
    1877,
    1878,
    1879,
    1880,
    1881,
    1882,
    1883,
    1884,
    1885,
    1886,
    1887,
    1888,
    1889,
    1890,
    1891,
    1892,
    1893,
    1894,
    1895,
    1896,
    1897,
    1898,
    1899,
    1900,
    1901,
    1902,
    1903,
    1904,
    1905,
    1906,
    1907,
    1908,
    1909,
    1910,
    1911,
    1912,
    1913,
    1914,
    1915,
    1916,
    1917,
    1918,
    1919,
    1920,
    1921,
    1922,
    1923,
    1924,
    1925,
    1926,
    1927,
    1928,
    1929,
    1930,
    1931,
    1932,
    1933,
    1934,
    1935,
    1936,
    1937,
    1938,
    1939,
    1940,
    1941,
    1942,
    1943,
    1944,
    1945,
    1946,
    1947,
    1948,
    1949,
    1950,
    1951,
    1952,
    1953,
    1954,
    1955,
    1956,
    1957,
    1958,
    1959,
    1960,
    1961,
    1962,
    1963,
    1964,
    1965,
    1966,
    1967,
    1968,
    1969,
    1970,
    1971,
    1972
   ],
   "x": [
    580.38,
    581.86,
    580.97,
    580.8,
    579.79,
    580.39,
    580.42,
    580.82,
    581.4,
    581.32,
    581.44,
    581.68,
    581.17,
    580.53,
    580.01,
    579.91,
    579.14,
    579.16,
    579.55,
    579.67,
    578.44,
    578.24,
    579.1,
    579.09,
    579.35,
    578.82,
    579.32,
    579.01,
    579.0,
    579.8,
    579.83,
    579.72,
    579.89,
    580.01,
    579.37,
    578.69,
    578.19,
    578.67,
    579.55,
    578.92,
    578.09,
    579.37,
    580.13,
    580.14,
    579.51,
    579.24,
    578.66,
    578.86,
    578.05,
    577.79,
    576.75,
    576.75,
    577.82,
    578.64,
    580.58,
    579.48,
    577.38,
    576.9,
    576.94,
    576.24,
    576.84,
    576.85,
    576.9,
    577.79,
    578.18,
    577.51,
    577.23,
    578.42,
    579.61,
    579.05,
    579.26,
    579.22,
    579.38,
    579.1,
    577.95,
    578.12,
    579.75,
    580.85,
    580.41,
    579.96,
    579.61,
    578.76,
    578.18,
    577.21,
    577.13,
    579.1,
    578.25,
    577.91,
    576.89,
    575.96,
    576.8,
    577.68,
    578.38,
    578.52,
    579.74,
    579.31,
    579.89,
    579.96
   ],
   "media": 579.0040816326531,
   "variancia": 1.7379110035766465,
   "menu": [
    {
     "deslocamento": 0,
     "exata": 1.7379110035766856,
     "welford": {
      "media": 579.0040816326531,
      "variancia": 1.7379110035766465,
      "erro": 2.2529040742782927e-14
     },
     "soma": {
      "media": 579.004081632653,
      "variancia": 1.7379110035361702,
      "erro": 2.3312725664089616e-11
     },
     "duas": {
      "media": 579.004081632653,
      "variancia": 1.7379110035766865,
      "erro": 4.687012614105791e-16
     }
    },
    {
     "deslocamento": 1000000,
     "exata": 1.7379110035794898,
     "welford": {
      "media": 1000579.0040816325,
      "variancia": 1.7379110034500167,
      "erro": 7.449928120724301e-11
     },
     "soma": {
      "media": 1000579.004081632,
      "variancia": 1.7393685567010309,
      "erro": 0.000838681105383983
     },
     "duas": {
      "media": 1000579.004081632,
      "variancia": 1.7379110035794896,
      "erro": 1.4022851205544097e-16
     }
    },
    {
     "deslocamento": 100000000,
     "exata": 1.73791100308163,
     "welford": {
      "media": 100000579.00408164,
      "variancia": 1.7379110177094057,
      "erro": 8.416872698269971e-09
     },
     "soma": {
      "media": 100000579.00408159,
      "variancia": 15.835051546391753,
      "erro": 8.111543409480317
     },
     "duas": {
      "media": 100000579.00408159,
      "variancia": 1.7379110030816316,
      "erro": 9.038187339309262e-16
     }
    },
    {
     "deslocamento": 1000000000,
     "exata": 1.737911000708042,
     "welford": {
      "media": 1000000579.0040815,
      "variancia": 1.7379107495461512,
      "erro": 1.4451942055135335e-07
     },
     "soma": {
      "media": 1000000579.0040822,
      "variancia": -1182.3505154639174,
      "erro": 681.3285755037032
     },
     "duas": {
      "media": 1000000579.0040822,
      "variancia": 1.7379110007083707,
      "erro": 1.8912050188504934e-13
     }
    }
   ],
   "ops": 98
  },
  "medido": {
   "tempo": {
    "unidade": "leituras",
    "tipo": "welford",
    "series": [
     {
      "caso": "welford",
      "nome": "Welford"
     },
     {
      "caso": "soma",
      "nome": "soma dos quadrados"
     },
     {
      "caso": "duas",
      "nome": "duas passadas"
     }
    ],
    "crescimento": [
     {
      "n": 16,
      "welford": {
       "ops": 16,
       "pico": 0
      },
      "soma": {
       "ops": 16,
       "pico": 0
      },
      "duas": {
       "ops": 32,
       "pico": 16
      }
     },
     {
      "n": 32,
      "welford": {
       "ops": 32,
       "pico": 0
      },
      "soma": {
       "ops": 32,
       "pico": 0
      },
      "duas": {
       "ops": 64,
       "pico": 32
      }
     },
     {
      "n": 64,
      "welford": {
       "ops": 64,
       "pico": 0
      },
      "soma": {
       "ops": 64,
       "pico": 0
      },
      "duas": {
       "ops": 128,
       "pico": 64
      }
     },
     {
      "n": 128,
      "welford": {
       "ops": 128,
       "pico": 0
      },
      "soma": {
       "ops": 128,
       "pico": 0
      },
      "duas": {
       "ops": 256,
       "pico": 128
      }
     },
     {
      "n": 256,
      "welford": {
       "ops": 256,
       "pico": 0
      },
      "soma": {
       "ops": 256,
       "pico": 0
      },
      "duas": {
       "ops": 512,
       "pico": 256
      }
     },
     {
      "n": 512,
      "welford": {
       "ops": 512,
       "pico": 0
      },
      "soma": {
       "ops": 512,
       "pico": 0
      },
      "duas": {
       "ops": 1024,
       "pico": 512
      }
     },
     {
      "n": 1024,
      "welford": {
       "ops": 1024,
       "pico": 0
      },
      "soma": {
       "ops": 1024,
       "pico": 0
      },
      "duas": {
       "ops": 2048,
       "pico": 1024
      }
     }
    ],
    "eixo": "n (valores; dobra a cada passo)",
    "refs": [],
    "crescimento_dados": "normais sorteadas; as leituras não dependem dos valores",
    "erro": {
     "deslocamentos": [
      1,
      10,
      100,
      1000,
      10000,
      100000,
      1000000,
      10000000,
      100000000,
      1000000000,
      10000000000
     ],
     "welford": [
      2.2529040742782927e-14,
      2.2529040742782927e-14,
      2.2529040742782927e-14,
      1.4899233319984064e-13,
      1.91103078477202e-12,
      4.796442017049981e-12,
      7.449928120724301e-11,
      3.535769693436417e-10,
      8.416872698269971e-09,
      1.4451942055135335e-07,
      8.337530698361263e-08
     ],
     "soma": [
      1.0927768949548748e-10,
      1.5347449454867984e-10,
      6.750953071728199e-11,
      6.750810101114916e-11,
      8.730092048394877e-09,
      5.643292309291203e-06,
      0.000838681105383983,
      0.00843904894698922,
      8.111543409480317,
      681.3285755037032,
      1.0
     ],
     "duas": [
      4.687012614105791e-16,
      4.687012614105791e-16,
      4.687012614105791e-16,
      1.8071106009161944e-17,
      6.850156236968592e-16,
      2.4813885665947786e-16,
      1.4022851205544097e-16,
      2.819198054527853e-16,
      9.038187339309262e-16,
      1.8912050188504934e-13,
      1.7809258367106447e-14
     ]
    }
   },
   "memoria": {
    "pico": 0,
    "detalhe": {}
   },
   "ciclomatica": {
    "M": 2,
    "nos": 11,
    "arestas": 11,
    "decisoes": [
     {
      "linha": 3,
      "tipo": "for"
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
       "rotulo": "expr"
      },
      {
       "id": 4,
       "linha": 5,
       "rotulo": "augassign"
      },
      {
       "id": 5,
       "linha": 6,
       "rotulo": "assign"
      },
      {
       "id": 6,
       "linha": 7,
       "rotulo": "augassign"
      },
      {
       "id": 7,
       "linha": 8,
       "rotulo": "augassign"
      },
      {
       "id": 8,
       "linha": 9,
       "rotulo": "expr"
      },
      {
       "id": 9,
       "linha": 10,
       "rotulo": "return"
      },
      {
       "id": 10,
       "linha": 11,
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
       "para": 2,
       "tipo": "volta"
      },
      {
       "de": 2,
       "para": 9,
       "tipo": "segue"
      },
      {
       "de": 9,
       "para": 10,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def welford(x, conta):\n    n, media, m2 = 0, 0.0, 0.0\n    for valor in x:\n        conta.op(\"leituras\")\n        n += 1\n        delta = valor - media\n        media += delta / n\n        m2 += delta * (valor - media)\n        conta.evento(\"le\", n - 1, delta, media, m2)\n    return media, m2 / (n - 1)\n"
   }
  },
  "conferencia": {
   "referencia": "var() e mean(); a soma dos quadrados refeita num laço em R",
   "versao_r": "4.6.0",
   "vetores": 7,
   "tudo_ok": true,
   "resumo": "No R 4.6.0, o var(LakeHuron) dá 1,737911004. Em 7 vetores (o LakeHuron com cada deslocamento do palco e normais sorteadas), o Welford fica a menos de 1 parte em um milhão do var() (no pior caso, 1,4e-07) e as duas passadas, a menos de 1 em um trilhão. A soma dos quadrados refeita num laço em R dá exatamente os números do Python, inclusive a variância de -1182,35 com +10⁹."
  },
  "pseudocodigo": {
   "assinatura": "welford(fluxo)",
   "nome": "welford",
   "arvore": [
    {
     "tipo": "acao",
     "linha": 2,
     "texto": "n ← 0;  média ← 0;  M2 ← 0",
     "chamada": false
    },
    {
     "tipo": "laco",
     "rotulo": "para",
     "linha": 3,
     "op": "e",
     "conds": [
      "para cada valor x do fluxo"
     ],
     "corpo": [
      {
       "tipo": "acao",
       "linha": 4,
       "texto": "n ← n + 1",
       "chamada": false
      },
      {
       "tipo": "acao",
       "linha": 5,
       "texto": "δ ← x − média",
       "chamada": false
      },
      {
       "tipo": "acao",
       "linha": 6,
       "texto": "média ← média + δ / n",
       "chamada": false
      },
      {
       "tipo": "acao",
       "linha": 7,
       "texto": "M2 ← M2 + δ · (x − média)",
       "chamada": false
      }
     ]
    },
    {
     "tipo": "devolva",
     "linha": 8,
     "texto": "devolva média, M2 / (n − 1)"
    }
   ],
   "linhas": [
    "procedimento welford(fluxo):",
    "    n ← 0;  média ← 0;  M2 ← 0",
    "    para cada valor x do fluxo:",
    "        n ← n + 1",
    "        δ ← x − média",
    "        média ← média + δ / n",
    "        M2 ← M2 + δ · (x − média)",
    "    devolva média, M2 / (n − 1)"
   ],
   "M": 2,
   "nos": 9,
   "arestas": 9,
   "decisoes": [
    3
   ]
  }
 },
 {
  "ciclomatica": {
   "porque": "Cada for, while e if, e cada and/or numa condição, abre um caminho a mais pelo código. A complexidade ciclomática conta os caminhos independentes: qualquer percurso pela função é uma combinação deles. É um teto para quantos testes cobrem todos os ramos, não o mínimo.",
   "regra": "Regra de contagem: +1 por for, while, if, if-expressão, except e cada and/or. Compreensões de lista são proibidas na função medida, porque escondem um laço que o grafo não veria."
  },
  "alg": "mediana",
  "id": "mediana-por-quickselect",
  "nome": "Mediana por quickselect",
  "variante": "partição de Lomuto, pivô = último, sem recursão",
  "familia": "estatística",
  "resumo": "Acha o número do meio sem ordenar tudo. Particiona como o quick sort, vê de que lado do pivô ficou a casa do meio e continua só daquele lado. Com n par, o outro número do meio é o menor do lado direito.",
  "instrumentos": [
   {
    "id": "vetor",
    "papel": "a entrada, particionada no próprio vetor"
   }
  ],
  "tempo": {
   "notacao": "O(n) médio",
   "porque": "Cada partição compara o trecho inteiro com o pivô, mas o laço segue só o lado onde está o meio. Com o pivô caindo num lugar qualquer, esse lado tem em média três quartos do trecho, e a soma n + 3n/4 + (3/4)²n + … fica abaixo de 4n. A conta exata dá 2(1 + ln 2)·n, cerca de 3,4n comparações; com n par, achar o outro do meio custa mais n/2 − 1, e o total vai para perto de 3,9n. O quick sort, que segue os dois lados, paga cerca de 1,39 n log₂ n.",
   "nota": "Pior caso: entrada já ordenada ou invertida, com o pivô no último. Cada partição só tira uma casa do trecho, e a conta vira O(n²). O trees vem do R ordenado pelo diâmetro, e o volume acompanha o diâmetro: com o pivô no último, a ordem do R cai do lado caro e custa mais que quase todos os embaralhamentos dos mesmos números (veja a distribuição abaixo), embora longe do pior caso. Sortear o pivô resolve isso na prática."
  },
  "memoria": {
   "notacao": "O(1)",
   "porque": "Troca dentro do próprio vetor e guarda só índices soltos (a, b, i, j, k, m). Não há pilha: o quick sort precisa dela para voltar e ordenar o outro lado, e o quickselect nunca volta.",
   "nota": "O vetor sai daqui fora da ordem original. Se a entrada não pode ser mexida, é preciso trabalhar numa cópia: O(n).",
   "vazio": "procura dentro do próprio vetor, e o deixa fora da ordem original"
  },
  "video": {
   "ideia": [
    "pivô = o último do trecho; os menores vão para a esquerda",
    "o pivô cai no lugar final: a casa do meio está de um lado só",
    "e segue só daquele lado, até o pivô cair na casa do meio"
   ]
  },
  "graficos": {
   "titulo": "Tempo: como cresce, e a ordem em que os dados chegam",
   "texto": "As mesmas contas para vetores cada vez maiores e para três ordens de entrada. Em escala logarítmica, quem cresce como n sobe em linha reta com inclinação 1, e quem cresce como n² sobe duas vezes mais íngreme.",
   "crescimento": "Comparações para n de {n0} a {n1}. {dados}; a faixa cinza vai do menor ao maior dos embaralhados. Tracejadas: n²/2 e n, de referência.",
   "distribuicao": "Os mesmos {nd} volumes do trees em {vezes} ordens sorteadas: de {min} a {max} comparações. A barra preta é a ordem do R, mais cara que {acima} dos {vezes} sorteios.",
   "rotulo": "comparações (n = {nd})"
  },
  "placa": {
   "autor": "Tony Hoare (FIND)",
   "ano": "1961"
  },
  "poster": "algoritmos/mediana/mediana.png",
  "exemplo": {
   "dados": "trees (R), volume de 31 cerejeiras-pretas, pés³, na ordem do R",
   "n": 31,
   "k": 16,
   "vetor": [
    10.3,
    10.3,
    10.2,
    16.4,
    18.8,
    19.7,
    15.6,
    18.2,
    22.6,
    19.9,
    24.2,
    21.0,
    21.4,
    21.3,
    19.1,
    22.2,
    33.8,
    27.4,
    25.7,
    24.9,
    34.5,
    31.7,
    36.3,
    38.3,
    42.6,
    55.4,
    55.7,
    58.3,
    51.5,
    51.0,
    77.0
   ],
   "mediana": 24.2,
   "media": 30.17096774193548,
   "ops": 183,
   "trocas": 181
  },
  "medido": {
   "tempo": {
    "unidade": "comparações",
    "tipo": "mediana",
    "series": [
     {
      "caso": "aleatorio",
      "nome": "aleatória (média)"
     },
     {
      "caso": "ordenado",
      "nome": "já ordenada"
     },
     {
      "caso": "invertido",
      "nome": "invertida"
     }
    ],
    "banda": "aleatorio",
    "crescimento": [
     {
      "n": 16,
      "aleatorio": {
       "media": 35.3,
       "min": 22,
       "max": 47,
       "pico": 0
      },
      "ordenado": {
       "ops": 106,
       "pico": 0
      },
      "invertido": {
       "ops": 127,
       "pico": 0
      }
     },
     {
      "n": 32,
      "aleatorio": {
       "media": 87.9,
       "min": 46,
       "max": 125,
       "pico": 0
      },
      "ordenado": {
       "ops": 406,
       "pico": 0
      },
      "invertido": {
       "ops": 511,
       "pico": 0
      }
     },
     {
      "n": 64,
      "aleatorio": {
       "media": 201.6,
       "min": 139,
       "max": 289,
       "pico": 0
      },
      "ordenado": {
       "ops": 1582,
       "pico": 0
      },
      "invertido": {
       "ops": 2047,
       "pico": 0
      }
     },
     {
      "n": 128,
      "aleatorio": {
       "media": 429.2,
       "min": 279,
       "max": 698,
       "pico": 0
      },
      "ordenado": {
       "ops": 6238,
       "pico": 0
      },
      "invertido": {
       "ops": 8191,
       "pico": 0
      }
     },
     {
      "n": 256,
      "aleatorio": {
       "media": 832.3,
       "min": 562,
       "max": 1680,
       "pico": 0
      },
      "ordenado": {
       "ops": 24766,
       "pico": 0
      },
      "invertido": {
       "ops": 32767,
       "pico": 0
      }
     },
     {
      "n": 512,
      "aleatorio": {
       "media": 1624.5,
       "min": 1157,
       "max": 2198,
       "pico": 0
      },
      "ordenado": {
       "ops": 98686,
       "pico": 0
      },
      "invertido": {
       "ops": 131071,
       "pico": 0
      }
     },
     {
      "n": 1024,
      "aleatorio": {
       "media": 3519,
       "min": 2566,
       "max": 4659,
       "pico": 0
      },
      "ordenado": {
       "ops": 393982,
       "pico": 0
      },
      "invertido": {
       "ops": 524287,
       "pico": 0
      }
     }
    ],
    "eixo": "n (números; dobra a cada passo)",
    "refs": [
     "n²/2",
     "n"
    ],
    "crescimento_dados": "aleatória: média de 10 vetores embaralhados por tamanho; já ordenada e invertida: um vetor cada",
    "distribuicao": {
     "n": 31,
     "vezes": 200,
     "valores": [
      90,
      186,
      104,
      75,
      45,
      95,
      30,
      82,
      80,
      75,
      70,
      59,
      45,
      100,
      123,
      83,
      70,
      77,
      64,
      123,
      125,
      121,
      100,
      65,
      50,
      111,
      63,
      122,
      81,
      65,
      120,
      159,
      64,
      61,
      47,
      30,
      86,
      71,
      87,
      99,
      56,
      100,
      125,
      77,
      57,
      130,
      87,
      47,
      82,
      47,
      106,
      78,
      58,
      114,
      100,
      147,
      110,
      58,
      135,
      69,
      66,
      77,
      118,
      46,
      79,
      80,
      84,
      95,
      103,
      95,
      30,
      120,
      45,
      84,
      85,
      59,
      76,
      117,
      91,
      50,
      68,
      67,
      54,
      70,
      97,
      114,
      90,
      77,
      118,
      125,
      107,
      68,
      79,
      61,
      85,
      63,
      128,
      73,
      66,
      81,
      65,
      75,
      94,
      162,
      85,
      63,
      87,
      105,
      74,
      71,
      92,
      65,
      73,
      86,
      88,
      99,
      109,
      90,
      91,
      72,
      112,
      95,
      116,
      82,
      114,
      60,
      127,
      166,
      47,
      56,
      30,
      72,
      64,
      67,
      55,
      53,
      133,
      79,
      92,
      93,
      99,
      48,
      80,
      52,
      97,
      82,
      54,
      64,
      85,
      57,
      69,
      92,
      78,
      91,
      55,
      80,
      46,
      75,
      47,
      89,
      68,
      93,
      69,
      76,
      144,
      72,
      89,
      92,
      56,
      86,
      80,
      78,
      30,
      125,
      73,
      94,
      149,
      103,
      95,
      125,
      65,
      72,
      83,
      68,
      120,
      30,
      103,
      106,
      47,
      106,
      105,
      78,
      68,
      120,
      48,
      116,
      74,
      100,
      88,
      146
     ],
     "destaque": 183
    }
   },
   "memoria": {
    "pico": 0,
    "detalhe": {}
   },
   "ciclomatica": {
    "M": 9,
    "nos": 26,
    "arestas": 33,
    "decisoes": [
     {
      "linha": 5,
      "tipo": "while"
     },
     {
      "linha": 8,
      "tipo": "for"
     },
     {
      "linha": 9,
      "tipo": "if"
     },
     {
      "linha": 13,
      "tipo": "if"
     },
     {
      "linha": 15,
      "tipo": "if"
     },
     {
      "linha": 20,
      "tipo": "if"
     },
     {
      "linha": 22,
      "tipo": "for"
     },
     {
      "linha": 23,
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
       "rotulo": "while"
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
       "rotulo": "for"
      },
      {
       "id": 8,
       "linha": 9,
       "rotulo": "if"
      },
      {
       "id": 9,
       "linha": 10,
       "rotulo": "expr"
      },
      {
       "id": 10,
       "linha": 11,
       "rotulo": "augassign"
      },
      {
       "id": 11,
       "linha": 12,
       "rotulo": "expr"
      },
      {
       "id": 12,
       "linha": 13,
       "rotulo": "if"
      },
      {
       "id": 13,
       "linha": 14,
       "rotulo": "break"
      },
      {
       "id": 14,
       "linha": 15,
       "rotulo": "if"
      },
      {
       "id": 15,
       "linha": 16,
       "rotulo": "assign"
      },
      {
       "id": 16,
       "linha": 18,
       "rotulo": "assign"
      },
      {
       "id": 17,
       "linha": 19,
       "rotulo": "assign"
      },
      {
       "id": 18,
       "linha": 20,
       "rotulo": "if"
      },
      {
       "id": 19,
       "linha": 21,
       "rotulo": "assign"
      },
      {
       "id": 20,
       "linha": 22,
       "rotulo": "for"
      },
      {
       "id": 21,
       "linha": 23,
       "rotulo": "if"
      },
      {
       "id": 22,
       "linha": 24,
       "rotulo": "assign"
      },
      {
       "id": 23,
       "linha": 25,
       "rotulo": "assign"
      },
      {
       "id": 24,
       "linha": 26,
       "rotulo": "return"
      },
      {
       "id": 25,
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
       "para": 7,
       "tipo": "volta"
      },
      {
       "de": 8,
       "para": 7,
       "tipo": "volta"
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
      },
      {
       "de": 12,
       "para": 13,
       "tipo": "segue"
      },
      {
       "de": 12,
       "para": 14,
       "tipo": "segue"
      },
      {
       "de": 14,
       "para": 15,
       "tipo": "segue"
      },
      {
       "de": 14,
       "para": 16,
       "tipo": "segue"
      },
      {
       "de": 15,
       "para": 4,
       "tipo": "volta"
      },
      {
       "de": 16,
       "para": 4,
       "tipo": "volta"
      },
      {
       "de": 4,
       "para": 17,
       "tipo": "segue"
      },
      {
       "de": 13,
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
       "para": 20,
       "tipo": "volta"
      },
      {
       "de": 21,
       "para": 20,
       "tipo": "volta"
      },
      {
       "de": 20,
       "para": 23,
       "tipo": "segue"
      },
      {
       "de": 23,
       "para": 24,
       "tipo": "segue"
      },
      {
       "de": 18,
       "para": 24,
       "tipo": "segue"
      },
      {
       "de": 24,
       "para": 25,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def mediana(v, conta):\n    n = len(v)\n    k = (n - 1) // 2                # a casa do meio (a de baixo, se n é par)\n    a, b = 0, n - 1                 # o trecho vivo, fechado nos dois lados\n    while a < b:\n        conta.evento(\"trecho\", a, b)\n        i = a\n        for j in range(a, b):\n            if maior(v, b, j, conta):\n                troca(v, i, j, conta)\n                i += 1\n        troca(v, i, b, conta)\n        if i == k:\n            break\n        elif i < k:\n            a = i + 1\n        else:\n            b = i - 1\n    resposta = v[k]\n    if n % 2 == 0:\n        m = k + 1\n        for j in range(k + 2, n):\n            if maior(v, m, j, conta):\n                m = j\n        resposta = (v[k] + v[m]) / 2\n    return resposta\n"
   }
  },
  "conferencia": {
   "referencia": "median() e quickselect_r() (reimplementação em R)",
   "versao_r": "4.6.0",
   "vetores": 12,
   "tudo_ok": true,
   "resumo": "No R 4.6.0, o median(trees$Volume) dá 24,2, a mesma mediana do Python. Em 12 vetores (o trees, embaralhamentos dele, inteiros com empates, n par e ímpar, já ordenados e invertidos), a mediana bate com o median() e as comparações e as trocas batem uma a uma com uma reimplementação em R."
  },
  "pseudocodigo": {
   "assinatura": "mediana(v)",
   "nome": "mediana",
   "arvore": [
    {
     "tipo": "acao",
     "linha": 2,
     "texto": "k ← ⌊(n + 1) / 2⌋",
     "chamada": false
    },
    {
     "tipo": "acao",
     "linha": 3,
     "texto": "a ← 1;  b ← n",
     "chamada": false
    },
    {
     "tipo": "laco",
     "rotulo": "enquanto",
     "linha": 4,
     "op": "e",
     "conds": [
      "a < b"
     ],
     "corpo": [
      {
       "tipo": "acao",
       "linha": 5,
       "texto": "pivô ← v[b]",
       "chamada": false
      },
      {
       "tipo": "acao",
       "linha": 6,
       "texto": "i ← a",
       "chamada": false
      },
      {
       "tipo": "laco",
       "rotulo": "para",
       "linha": 7,
       "op": "e",
       "conds": [
        "para j de a até b − 1"
       ],
       "corpo": [
        {
         "tipo": "se",
         "linha": 8,
         "op": "e",
         "conds": [
          "v[j] < pivô"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 9,
           "texto": "troque v[i] com v[j]",
           "chamada": false
          },
          {
           "tipo": "acao",
           "linha": 10,
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
       "linha": 11,
       "texto": "troque v[i] com v[b]",
       "chamada": false
      },
      {
       "tipo": "se",
       "linha": 12,
       "op": "e",
       "conds": [
        "i = k"
       ],
       "entao": [
        {
         "tipo": "pare",
         "linha": 13
        }
       ],
       "senao": [
        {
         "tipo": "se",
         "linha": 14,
         "op": "e",
         "conds": [
          "i < k"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 15,
           "texto": "a ← i + 1",
           "chamada": false
          }
         ],
         "senao": [
          {
           "tipo": "acao",
           "linha": 17,
           "texto": "b ← i − 1",
           "chamada": false
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "tipo": "acao",
     "linha": 18,
     "texto": "resposta ← v[k]",
     "chamada": false
    },
    {
     "tipo": "se",
     "linha": 19,
     "op": "e",
     "conds": [
      "n é par"
     ],
     "entao": [
      {
       "tipo": "acao",
       "linha": 20,
       "texto": "m ← k + 1",
       "chamada": false
      },
      {
       "tipo": "laco",
       "rotulo": "para",
       "linha": 21,
       "op": "e",
       "conds": [
        "para j de k + 2 até n"
       ],
       "corpo": [
        {
         "tipo": "se",
         "linha": 22,
         "op": "e",
         "conds": [
          "v[j] < v[m]"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 23,
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
       "linha": 24,
       "texto": "resposta ← (v[k] + v[m]) / 2",
       "chamada": false
      }
     ],
     "senao": null
    },
    {
     "tipo": "devolva",
     "linha": 25,
     "texto": "devolva resposta"
    }
   ],
   "linhas": [
    "procedimento mediana(v):",
    "    k ← ⌊(n + 1) / 2⌋",
    "    a ← 1;  b ← n",
    "    enquanto a < b:",
    "        pivô ← v[b]",
    "        i ← a",
    "        para j de a até b − 1:",
    "            se v[j] < pivô:",
    "                troque v[i] com v[j]",
    "                i ← i + 1",
    "        troque v[i] com v[b]",
    "        se i = k:",
    "            pare",
    "        senão se i < k:",
    "            a ← i + 1",
    "        senão:",
    "            b ← i − 1",
    "    resposta ← v[k]",
    "    se n é par:",
    "        m ← k + 1",
    "        para j de k + 2 até n:",
    "            se v[j] < v[m]:",
    "                m ← j",
    "        resposta ← (v[k] + v[m]) / 2",
    "    devolva resposta"
   ],
   "M": 9,
   "nos": 25,
   "arestas": 32,
   "decisoes": [
    4,
    7,
    8,
    12,
    14,
    19,
    21,
    22
   ]
  }
 },
 {
  "ciclomatica": {
   "porque": "Cada for, while e if, e cada and/or numa condição, abre um caminho a mais pelo código. A complexidade ciclomática conta os caminhos independentes: qualquer percurso pela função é uma combinação deles. É um teto para quantos testes cobrem todos os ramos, não o mínimo.",
   "regra": "Regra de contagem: +1 por for, while, if, if-expressão, except e cada and/or. Compreensões de lista são proibidas na função medida, porque escondem um laço que o grafo não veria."
  },
  "alg": "histograma",
  "id": "histograma",
  "nome": "Histograma",
  "variante": "classes de Sturges, como o hist() do R",
  "familia": "estatística",
  "resumo": "Conta quantos valores caem em cada classe. Uma passada acha o menor e o maior, as classes saem da regra de Sturges com limites redondos, e outra passada põe cada valor na sua classe com uma conta só, sem procurar.",
  "instrumentos": [
   {
    "id": "vetor",
    "papel": "as contagens, uma casa por classe"
   }
  ],
  "tempo": {
   "notacao": "O(n)",
   "porque": "Cada valor é lido duas vezes: uma para achar o menor e o maior, outra para cair na sua classe. Com classes da mesma largura h, a classe de x sai de teto((x − a)/h), uma conta que não depende de quantas classes há. São 2n leituras, qualquer que seja a forma dos dados.",
   "nota": "Com classes de larguras diferentes, a classe teria de ser procurada nos limites: uma busca binária custa log₂ c por valor, e o total vira O(n log c). As classes são fechadas à direita, como no hist() do R: um valor em cima de um limite fica na classe de baixo, e a primeira classe também fica com o próprio limite de baixo."
  },
  "memoria": {
   "notacao": "O(c)",
   "porque": "Guarda as contagens, uma casa por classe. Os valores são a entrada e não entram na conta.",
   "nota": "Pela regra de Sturges, c ≈ log₂ n + 1: dobrar n acrescenta uma classe. O pretty() do R ainda arredonda os limites para números redondos, e o número de classes muda com onde caem o menor e o maior.",
   "nomes": {
    "contagens": "contagens (uma por classe)"
   },
   "cresce_com_n": [],
   "vazados": "crescem como log₂ n"
  },
  "video": {
   "ideia": [
    "primeiro, uma passada para achar o menor e o maior",
    "depois, cada valor cai na sua classe com uma conta só"
   ]
  },
  "graficos": {
   "titulo": "Tempo e memória: o que cresce com n, e o que muda com os dados",
   "texto": "As mesmas contas para cada vez mais valores e três formas de dados. Em escala logarítmica, quem cresce como n sobe em linha reta: as leituras não dependem da forma dos dados, só de n.",
   "crescimento": "Leituras para n de {n0} a {n1}, nas três formas. {dados}. Tracejada: 2n.",
   "distribuicao": "{vezes} amostras normais de {nd} valores: de {min} a {max} classes, conforme onde caem o menor e o maior. A barra preta é o faithful.",
   "rotulo": "classes (n = {nd})",
   "memoria": "Classes (a memória) para cada n, nas três formas (a maior entre os sorteios). Tracejada: log₂ n + 1, a regra de Sturges sem arredondar. Os limites redondos fazem o número de classes andar aos saltos, e às vezes parar."
  },
  "placa": {
   "autor": "Karl Pearson (o nome); Herbert Sturges (o número de classes)",
   "ano": "1895; 1926"
  },
  "poster": "algoritmos/histograma/histograma.png",
  "exemplo": {
   "dados": "faithful (R), duração de 272 erupções do Old Faithful, minutos",
   "n": 272,
   "x": [
    3.6,
    1.8,
    3.333,
    2.283,
    4.533,
    2.883,
    4.7,
    3.6,
    1.95,
    4.35,
    1.833,
    3.917,
    4.2,
    1.75,
    4.7,
    2.167,
    1.75,
    4.8,
    1.6,
    4.25,
    1.8,
    1.75,
    3.45,
    3.067,
    4.533,
    3.6,
    1.967,
    4.083,
    3.85,
    4.433,
    4.3,
    4.467,
    3.367,
    4.033,
    3.833,
    2.017,
    1.867,
    4.833,
    1.833,
    4.783,
    4.35,
    1.883,
    4.567,
    1.75,
    4.533,
    3.317,
    3.833,
    2.1,
    4.633,
    2.0,
    4.8,
    4.716,
    1.833,
    4.833,
    1.733,
    4.883,
    3.717,
    1.667,
    4.567,
    4.317,
    2.233,
    4.5,
    1.75,
    4.8,
    1.817,
    4.4,
    4.167,
    4.7,
    2.067,
    4.7,
    4.033,
    1.967,
    4.5,
    4.0,
    1.983,
    5.067,
    2.017,
    4.567,
    3.883,
    3.6,
    4.133,
    4.333,
    4.1,
    2.633,
    4.067,
    4.933,
    3.95,
    4.517,
    2.167,
    4.0,
    2.2,
    4.333,
    1.867,
    4.817,
    1.833,
    4.3,
    4.667,
    3.75,
    1.867,
    4.9,
    2.483,
    4.367,
    2.1,
    4.5,
    4.05,
    1.867,
    4.7,
    1.783,
    4.85,
    3.683,
    4.733,
    2.3,
    4.9,
    4.417,
    1.7,
    4.633,
    2.317,
    4.6,
    1.817,
    4.417,
    2.617,
    4.067,
    4.25,
    1.967,
    4.6,
    3.767,
    1.917,
    4.5,
    2.267,
    4.65,
    1.867,
    4.167,
    2.8,
    4.333,
    1.833,
    4.383,
    1.883,
    4.933,
    2.033,
    3.733,
    4.233,
    2.233,
    4.533,
    4.817,
    4.333,
    1.983,
    4.633,
    2.017,
    5.1,
    1.8,
    5.033,
    4.0,
    2.4,
    4.6,
    3.567,
    4.0,
    4.5,
    4.083,
    1.8,
    3.967,
    2.2,
    4.15,
    2.0,
    3.833,
    3.5,
    4.583,
    2.367,
    5.0,
    1.933,
    4.617,
    1.917,
    2.083,
    4.583,
    3.333,
    4.167,
    4.333,
    4.5,
    2.417,
    4.0,
    4.167,
    1.883,
    4.583,
    4.25,
    3.767,
    2.033,
    4.433,
    4.083,
    1.833,
    4.417,
    2.183,
    4.8,
    1.833,
    4.8,
    4.1,
    3.966,
    4.233,
    3.5,
    4.366,
    2.25,
    4.667,
    2.1,
    4.35,
    4.133,
    1.867,
    4.6,
    1.783,
    4.367,
    3.85,
    1.933,
    4.5,
    2.383,
    4.7,
    1.867,
    3.833,
    3.417,
    4.233,
    2.4,
    4.8,
    2.0,
    4.15,
    1.867,
    4.267,
    1.75,
    4.483,
    4.0,
    4.117,
    4.083,
    4.267,
    3.917,
    4.55,
    4.083,
    2.417,
    4.183,
    2.217,
    4.45,
    1.883,
    1.85,
    4.283,
    3.95,
    2.333,
    4.15,
    2.35,
    4.933,
    2.9,
    4.583,
    3.833,
    2.083,
    4.367,
    2.133,
    4.35,
    2.2,
    4.45,
    3.567,
    4.5,
    4.15,
    3.817,
    3.917,
    4.45,
    2.0,
    4.283,
    4.767,
    4.533,
    1.85,
    4.25,
    1.983,
    2.25,
    4.75,
    4.117,
    2.15,
    4.417,
    1.817,
    4.467
   ],
   "menor": 1.6,
   "maior": 5.1,
   "sturges": 10,
   "c": 8,
   "a": 1.5,
   "h": 0.5,
   "contagens": [
    55,
    37,
    5,
    9,
    34,
    75,
    54,
    3
   ],
   "formas": {
    "normal": "normal (média 50, dp 10)",
    "uniforme": "uniforme de 0 a 100",
    "bimodal": "metade normal (35, 6), metade normal (65, 6)"
   },
   "ops": 544
  },
  "medido": {
   "tempo": {
    "unidade": "leituras",
    "tipo": "histograma",
    "series": [
     {
      "caso": "normal",
      "nome": "normal (média)"
     },
     {
      "caso": "uniforme",
      "nome": "uniforme (média)"
     },
     {
      "caso": "bimodal",
      "nome": "bimodal (média)"
     }
    ],
    "banda": "normal",
    "crescimento": [
     {
      "n": 16,
      "normal": {
       "media": 32,
       "min": 32,
       "max": 32,
       "pico": 7
      },
      "uniforme": {
       "media": 32,
       "min": 32,
       "max": 32,
       "pico": 5
      },
      "bimodal": {
       "media": 32,
       "min": 32,
       "max": 32,
       "pico": 7
      }
     },
     {
      "n": 32,
      "normal": {
       "media": 64,
       "min": 64,
       "max": 64,
       "pico": 9
      },
      "uniforme": {
       "media": 64,
       "min": 64,
       "max": 64,
       "pico": 5
      },
      "bimodal": {
       "media": 64,
       "min": 64,
       "max": 64,
       "pico": 7
      }
     },
     {
      "n": 64,
      "normal": {
       "media": 128,
       "min": 128,
       "max": 128,
       "pico": 10
      },
      "uniforme": {
       "media": 128,
       "min": 128,
       "max": 128,
       "pico": 10
      },
      "bimodal": {
       "media": 128,
       "min": 128,
       "max": 128,
       "pico": 7
      }
     },
     {
      "n": 128,
      "normal": {
       "media": 256,
       "min": 256,
       "max": 256,
       "pico": 12
      },
      "uniforme": {
       "media": 256,
       "min": 256,
       "max": 256,
       "pico": 10
      },
      "bimodal": {
       "media": 256,
       "min": 256,
       "max": 256,
       "pico": 12
      }
     },
     {
      "n": 256,
      "normal": {
       "media": 512,
       "min": 512,
       "max": 512,
       "pico": 14
      },
      "uniforme": {
       "media": 512,
       "min": 512,
       "max": 512,
       "pico": 10
      },
      "bimodal": {
       "media": 512,
       "min": 512,
       "max": 512,
       "pico": 14
      }
     },
     {
      "n": 512,
      "normal": {
       "media": 1024,
       "min": 1024,
       "max": 1024,
       "pico": 15
      },
      "uniforme": {
       "media": 1024,
       "min": 1024,
       "max": 1024,
       "pico": 10
      },
      "bimodal": {
       "media": 1024,
       "min": 1024,
       "max": 1024,
       "pico": 14
      }
     },
     {
      "n": 1024,
      "normal": {
       "media": 2048,
       "min": 2048,
       "max": 2048,
       "pico": 15
      },
      "uniforme": {
       "media": 2048,
       "min": 2048,
       "max": 2048,
       "pico": 10
      },
      "bimodal": {
       "media": 2048,
       "min": 2048,
       "max": 2048,
       "pico": 15
      }
     },
     {
      "n": 2048,
      "normal": {
       "media": 4096,
       "min": 4096,
       "max": 4096,
       "pico": 16
      },
      "uniforme": {
       "media": 4096,
       "min": 4096,
       "max": 4096,
       "pico": 10
      },
      "bimodal": {
       "media": 4096,
       "min": 4096,
       "max": 4096,
       "pico": 16
      }
     },
     {
      "n": 4096,
      "normal": {
       "media": 8192,
       "min": 8192,
       "max": 8192,
       "pico": 16
      },
      "uniforme": {
       "media": 8192,
       "min": 8192,
       "max": 8192,
       "pico": 10
      },
      "bimodal": {
       "media": 8192,
       "min": 8192,
       "max": 8192,
       "pico": 16
      }
     }
    ],
    "eixo": "n (valores; dobra a cada passo)",
    "refs": [
     "2n"
    ],
    "refs_memoria": [
     "log₂ n + 1"
    ],
    "crescimento_dados": "média de 10 sorteios por tamanho",
    "distribuicao": {
     "n": 272,
     "vezes": 200,
     "valores": [
      12,
      14,
      13,
      13,
      13,
      13,
      12,
      14,
      12,
      12,
      12,
      14,
      14,
      12,
      15,
      13,
      13,
      13,
      12,
      12,
      13,
      14,
      12,
      14,
      11,
      13,
      12,
      14,
      12,
      12,
      14,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      11,
      12,
      13,
      11,
      11,
      11,
      13,
      12,
      12,
      12,
      14,
      13,
      11,
      11,
      15,
      13,
      12,
      13,
      14,
      13,
      12,
      13,
      15,
      10,
      13,
      12,
      12,
      11,
      11,
      11,
      13,
      13,
      12,
      8,
      12,
      14,
      11,
      14,
      13,
      14,
      13,
      14,
      12,
      12,
      13,
      14,
      12,
      11,
      13,
      12,
      12,
      11,
      14,
      13,
      15,
      12,
      12,
      13,
      13,
      10,
      12,
      12,
      13,
      14,
      11,
      14,
      11,
      11,
      12,
      8,
      11,
      11,
      14,
      14,
      12,
      11,
      10,
      12,
      12,
      11,
      12,
      11,
      12,
      13,
      11,
      12,
      11,
      12,
      12,
      11,
      11,
      12,
      12,
      10,
      11,
      11,
      13,
      12,
      11,
      12,
      13,
      12,
      12,
      11,
      13,
      13,
      12,
      12,
      13,
      13,
      12,
      12,
      11,
      12,
      11,
      11,
      12,
      12,
      13,
      11,
      12,
      13,
      12,
      14,
      14,
      12,
      14,
      12,
      14,
      14,
      13,
      12,
      12,
      12,
      13,
      13,
      13,
      12,
      14,
      11,
      12,
      9,
      12,
      13,
      10,
      13,
      11,
      12,
      12,
      12,
      13,
      12,
      14,
      14,
      12,
      14,
      13,
      11,
      13,
      15,
      12
     ],
     "destaque": 8
    }
   },
   "memoria": {
    "pico": 8,
    "detalhe": {
     "contagens": 8
    }
   },
   "ciclomatica": {
    "M": 6,
    "nos": 24,
    "arestas": 28,
    "decisoes": [
     {
      "linha": 5,
      "tipo": "for"
     },
     {
      "linha": 8,
      "tipo": "if"
     },
     {
      "linha": 10,
      "tipo": "if"
     },
     {
      "linha": 16,
      "tipo": "for"
     },
     {
      "linha": 19,
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
       "rotulo": "expr"
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
       "rotulo": "assign"
      },
      {
       "id": 13,
       "linha": 14,
       "rotulo": "assign"
      },
      {
       "id": 14,
       "linha": 15,
       "rotulo": "assign"
      },
      {
       "id": 15,
       "linha": 16,
       "rotulo": "for"
      },
      {
       "id": 16,
       "linha": 17,
       "rotulo": "expr"
      },
      {
       "id": 17,
       "linha": 18,
       "rotulo": "assign"
      },
      {
       "id": 18,
       "linha": 19,
       "rotulo": "if"
      },
      {
       "id": 19,
       "linha": 20,
       "rotulo": "assign"
      },
      {
       "id": 20,
       "linha": 21,
       "rotulo": "augassign"
      },
      {
       "id": 21,
       "linha": 22,
       "rotulo": "expr"
      },
      {
       "id": 22,
       "linha": 23,
       "rotulo": "return"
      },
      {
       "id": 23,
       "linha": 24,
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
       "de": 7,
       "para": 9,
       "tipo": "segue"
      },
      {
       "de": 9,
       "para": 10,
       "tipo": "segue"
      },
      {
       "de": 8,
       "para": 4,
       "tipo": "volta"
      },
      {
       "de": 10,
       "para": 4,
       "tipo": "volta"
      },
      {
       "de": 9,
       "para": 4,
       "tipo": "volta"
      },
      {
       "de": 4,
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
       "de": 18,
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
       "para": 15,
       "tipo": "volta"
      },
      {
       "de": 15,
       "para": 22,
       "tipo": "segue"
      },
      {
       "de": 22,
       "para": 23,
       "tipo": "segue"
      }
     ]
    },
    "codigo": "def histograma(x, conta):\n    n = len(x)\n    conta.op(\"leituras\")\n    menor = maior = x[0]\n    for i in range(1, n):\n        conta.op(\"leituras\")\n        valor = x[i]\n        if valor < menor:\n            menor = valor\n        elif valor > maior:\n            maior = valor\n    conta.evento(\"faixa\", menor, maior)\n    c, a, h = classes(menor, maior, n)\n    contagens = conta.aloca(\"contagens\", [0] * c)\n    folga = deslize(c, menor, maior, h)\n    for i in range(n):\n        conta.op(\"leituras\")\n        j = math.ceil((x[i] - a) / h - folga)\n        if j < 1:\n            j = 1\n        contagens[j - 1] += 1\n        conta.evento(\"conta\", i, j - 1)\n    return contagens, a, h\n"
   }
  },
  "conferencia": {
   "referencia": "hist(plot = FALSE): $breaks e $counts",
   "versao_r": "4.6.0",
   "vetores": 10,
   "tudo_ok": true,
   "resumo": "No R 4.6.0, o hist(faithful$eruptions) dá 8 classes de 1,5 a 5,5, com as contagens 55, 37, 5, 9, 34, 75, 54, 3. Em 10 vetores (o faithful e amostras normais, uniformes e bimodais, 48 valores em cima de um limite de classe), os limites e as contagens batem classe por classe com o Python."
  },
  "pseudocodigo": {
   "assinatura": "histograma(x)",
   "nome": "histograma",
   "arvore": [
    {
     "tipo": "acao",
     "linha": 2,
     "texto": "menor ← x[1];  maior ← x[1]",
     "chamada": false
    },
    {
     "tipo": "laco",
     "rotulo": "para",
     "linha": 3,
     "op": "e",
     "conds": [
      "para i de 2 até n"
     ],
     "corpo": [
      {
       "tipo": "se",
       "linha": 4,
       "op": "e",
       "conds": [
        "x[i] < menor"
       ],
       "entao": [
        {
         "tipo": "acao",
         "linha": 5,
         "texto": "menor ← x[i]",
         "chamada": false
        }
       ],
       "senao": [
        {
         "tipo": "se",
         "linha": 6,
         "op": "e",
         "conds": [
          "x[i] > maior"
         ],
         "entao": [
          {
           "tipo": "acao",
           "linha": 7,
           "texto": "maior ← x[i]",
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
     "tipo": "acao",
     "linha": 8,
     "texto": "c, a, h ← classes de Sturges, de menor a maior",
     "chamada": false
    },
    {
     "tipo": "acao",
     "linha": 9,
     "texto": "contagens ← c zeros",
     "chamada": false
    },
    {
     "tipo": "laco",
     "rotulo": "para",
     "linha": 10,
     "op": "e",
     "conds": [
      "para i de 1 até n"
     ],
     "corpo": [
      {
       "tipo": "acao",
       "linha": 11,
       "texto": "j ← teto((x[i] − a) / h)",
       "chamada": false
      },
      {
       "tipo": "se",
       "linha": 12,
       "op": "e",
       "conds": [
        "j < 1"
       ],
       "entao": [
        {
         "tipo": "acao",
         "linha": 13,
         "texto": "j ← 1",
         "chamada": false
        }
       ],
       "senao": null
      },
      {
       "tipo": "acao",
       "linha": 14,
       "texto": "contagens[j] ← contagens[j] + 1",
       "chamada": false
      }
     ]
    },
    {
     "tipo": "devolva",
     "linha": 15,
     "texto": "devolva contagens"
    }
   ],
   "linhas": [
    "procedimento histograma(x):",
    "    menor ← x[1];  maior ← x[1]",
    "    para i de 2 até n:",
    "        se x[i] < menor:",
    "            menor ← x[i]",
    "        senão se x[i] > maior:",
    "            maior ← x[i]",
    "    c, a, h ← classes de Sturges, de menor a maior",
    "    contagens ← c zeros",
    "    para i de 1 até n:",
    "        j ← teto((x[i] − a) / h)",
    "        se j < 1:",
    "            j ← 1",
    "        contagens[j] ← contagens[j] + 1",
    "    devolva contagens"
   ],
   "M": 6,
   "nos": 16,
   "arestas": 20,
   "decisoes": [
    3,
    4,
    6,
    10,
    12
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
  "em_producao": []
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
   }
  ]
 },
 {
  "id": "grafos",
  "titulo": "Grafos",
  "familia": "grafos",
  "frase": "Caminhos, vizinhos e distâncias.",
  "em_producao": []
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
  "em_producao": []
 }
];
window.INSTRUMENTOS = [{"id": "vetor", "nome": "Vetor", "variante": "dinâmico, com capacidade que dobra quando enche", "frase": "Casas numeradas, uma ao lado da outra.", "resumo": "Guarda os valores em casas contíguas, numeradas a partir de 0. Qualquer casa se alcança direto pelo número dela. O preço aparece quando o meio muda: abrir ou fechar uma casa no começo obriga todos os vizinhos a andar uma casa. E, quando as casas reservadas acabam, o vetor reserva o dobro e copia tudo.", "placa": {"autor": "sem autoria única", "ano": "—"}, "memoria": {"notacao": "O(n)", "porque": "Uma casa por valor, mais a folga: logo depois de dobrar, até metade das casas reservadas está vazia. Depois de n anexações a partir de uma casa, a capacidade fica entre n e 2n. Remover não devolve casas."}, "operacoes": [{"id": "ler", "nome": "ler v[i]", "notacao": "O(1)", "porque": "O endereço da casa i se calcula direto (onde o vetor começa + i): uma leitura, sem passar pelas outras casas."}, {"id": "escrever", "nome": "escrever em v[i]", "notacao": "O(1)", "porque": "Pelo mesmo endereço calculado: uma escrita."}, {"id": "anexar", "nome": "anexar no fim, com folga", "notacao": "O(1)", "porque": "Se ainda sobra casa reservada, é só escrever na primeira livre."}, {"id": "anexar-pior", "nome": "anexar no fim, a mais cara de n seguidas", "notacao": "O(n)", "porque": "Quando o vetor enche, reserva o dobro de casas e copia cada valor (uma leitura e uma escrita por valor) antes de escrever o novo."}, {"id": "anexar-media", "nome": "anexar no fim, média de n seguidas", "notacao": "O(1) amortizado", "porque": "Como a capacidade dobra, as cópias ficam cada vez mais raras: somadas, dão menos de 2n valores copiados ao longo de n anexações. Dividido por n, o custo médio não cresce com n."}, {"id": "inserir-inicio", "nome": "inserir na posição 0", "notacao": "O(n)", "porque": "Cada valor anda uma casa para a direita (uma leitura e uma escrita) antes de a casa 0 ficar livre."}, {"id": "remover-inicio", "nome": "remover da posição 0", "notacao": "O(n)", "porque": "Lê o valor da casa 0 e puxa cada vizinho uma casa para a esquerda."}, {"id": "remover-fim", "nome": "remover do fim", "notacao": "O(1)", "porque": "Lê a última casa; ninguém precisa andar."}, {"id": "buscar", "nome": "buscar um valor que não está lá", "notacao": "O(n)", "porque": "Sem ordem, a busca sequencial lê casa por casa; um valor ausente obriga a ler todas."}], "grafico": [{"id": "anexar", "rotulo": "anexar"}, {"id": "anexar-media", "rotulo": "anexar, média"}, {"id": "inserir-inicio", "rotulo": "inserir em 0"}, {"id": "buscar", "rotulo": "buscar ausente"}, {"id": "ler", "rotulo": "ler v[i]"}], "medido": {"encher": "anexar", "tamanhos": [10, 100, 1000], "operacoes": {"ler": {"estrutura": "vetor", "chamada": "ler", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}, "escrever": {"estrutura": "vetor", "chamada": "escrever", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 0, "escritas": 1}, {"n": 100, "leituras": 0, "escritas": 1}, {"n": 1000, "leituras": 0, "escritas": 1}], "serie": [{"n": 1, "leituras": 0, "escritas": 1}, {"n": 2, "leituras": 0, "escritas": 1}, {"n": 3, "leituras": 0, "escritas": 1}, {"n": 4, "leituras": 0, "escritas": 1}, {"n": 5, "leituras": 0, "escritas": 1}, {"n": 6, "leituras": 0, "escritas": 1}, {"n": 7, "leituras": 0, "escritas": 1}, {"n": 8, "leituras": 0, "escritas": 1}, {"n": 9, "leituras": 0, "escritas": 1}, {"n": 10, "leituras": 0, "escritas": 1}, {"n": 11, "leituras": 0, "escritas": 1}, {"n": 12, "leituras": 0, "escritas": 1}, {"n": 13, "leituras": 0, "escritas": 1}, {"n": 14, "leituras": 0, "escritas": 1}, {"n": 15, "leituras": 0, "escritas": 1}, {"n": 16, "leituras": 0, "escritas": 1}, {"n": 17, "leituras": 0, "escritas": 1}, {"n": 18, "leituras": 0, "escritas": 1}, {"n": 19, "leituras": 0, "escritas": 1}, {"n": 20, "leituras": 0, "escritas": 1}, {"n": 21, "leituras": 0, "escritas": 1}, {"n": 22, "leituras": 0, "escritas": 1}, {"n": 23, "leituras": 0, "escritas": 1}, {"n": 24, "leituras": 0, "escritas": 1}, {"n": 25, "leituras": 0, "escritas": 1}, {"n": 26, "leituras": 0, "escritas": 1}, {"n": 27, "leituras": 0, "escritas": 1}, {"n": 28, "leituras": 0, "escritas": 1}, {"n": 29, "leituras": 0, "escritas": 1}, {"n": 30, "leituras": 0, "escritas": 1}, {"n": 31, "leituras": 0, "escritas": 1}, {"n": 32, "leituras": 0, "escritas": 1}, {"n": 33, "leituras": 0, "escritas": 1}, {"n": 34, "leituras": 0, "escritas": 1}, {"n": 35, "leituras": 0, "escritas": 1}, {"n": 36, "leituras": 0, "escritas": 1}, {"n": 37, "leituras": 0, "escritas": 1}, {"n": 38, "leituras": 0, "escritas": 1}, {"n": 39, "leituras": 0, "escritas": 1}, {"n": 40, "leituras": 0, "escritas": 1}, {"n": 41, "leituras": 0, "escritas": 1}, {"n": 42, "leituras": 0, "escritas": 1}, {"n": 43, "leituras": 0, "escritas": 1}, {"n": 44, "leituras": 0, "escritas": 1}, {"n": 45, "leituras": 0, "escritas": 1}, {"n": 46, "leituras": 0, "escritas": 1}, {"n": 47, "leituras": 0, "escritas": 1}, {"n": 48, "leituras": 0, "escritas": 1}, {"n": 49, "leituras": 0, "escritas": 1}, {"n": 50, "leituras": 0, "escritas": 1}, {"n": 51, "leituras": 0, "escritas": 1}, {"n": 52, "leituras": 0, "escritas": 1}, {"n": 53, "leituras": 0, "escritas": 1}, {"n": 54, "leituras": 0, "escritas": 1}, {"n": 55, "leituras": 0, "escritas": 1}, {"n": 56, "leituras": 0, "escritas": 1}, {"n": 57, "leituras": 0, "escritas": 1}, {"n": 58, "leituras": 0, "escritas": 1}, {"n": 59, "leituras": 0, "escritas": 1}, {"n": 60, "leituras": 0, "escritas": 1}]}, "anexar": {"estrutura": "vetor", "chamada": "anexar", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 0, "escritas": 1}, {"n": 100, "leituras": 0, "escritas": 1}, {"n": 1000, "leituras": 0, "escritas": 1}], "serie": [{"n": 0, "leituras": 0, "escritas": 1}, {"n": 1, "leituras": 1, "escritas": 2}, {"n": 2, "leituras": 2, "escritas": 3}, {"n": 3, "leituras": 0, "escritas": 1}, {"n": 4, "leituras": 4, "escritas": 5}, {"n": 5, "leituras": 0, "escritas": 1}, {"n": 6, "leituras": 0, "escritas": 1}, {"n": 7, "leituras": 0, "escritas": 1}, {"n": 8, "leituras": 8, "escritas": 9}, {"n": 9, "leituras": 0, "escritas": 1}, {"n": 10, "leituras": 0, "escritas": 1}, {"n": 11, "leituras": 0, "escritas": 1}, {"n": 12, "leituras": 0, "escritas": 1}, {"n": 13, "leituras": 0, "escritas": 1}, {"n": 14, "leituras": 0, "escritas": 1}, {"n": 15, "leituras": 0, "escritas": 1}, {"n": 16, "leituras": 16, "escritas": 17}, {"n": 17, "leituras": 0, "escritas": 1}, {"n": 18, "leituras": 0, "escritas": 1}, {"n": 19, "leituras": 0, "escritas": 1}, {"n": 20, "leituras": 0, "escritas": 1}, {"n": 21, "leituras": 0, "escritas": 1}, {"n": 22, "leituras": 0, "escritas": 1}, {"n": 23, "leituras": 0, "escritas": 1}, {"n": 24, "leituras": 0, "escritas": 1}, {"n": 25, "leituras": 0, "escritas": 1}, {"n": 26, "leituras": 0, "escritas": 1}, {"n": 27, "leituras": 0, "escritas": 1}, {"n": 28, "leituras": 0, "escritas": 1}, {"n": 29, "leituras": 0, "escritas": 1}, {"n": 30, "leituras": 0, "escritas": 1}, {"n": 31, "leituras": 0, "escritas": 1}, {"n": 32, "leituras": 32, "escritas": 33}, {"n": 33, "leituras": 0, "escritas": 1}, {"n": 34, "leituras": 0, "escritas": 1}, {"n": 35, "leituras": 0, "escritas": 1}, {"n": 36, "leituras": 0, "escritas": 1}, {"n": 37, "leituras": 0, "escritas": 1}, {"n": 38, "leituras": 0, "escritas": 1}, {"n": 39, "leituras": 0, "escritas": 1}, {"n": 40, "leituras": 0, "escritas": 1}, {"n": 41, "leituras": 0, "escritas": 1}, {"n": 42, "leituras": 0, "escritas": 1}, {"n": 43, "leituras": 0, "escritas": 1}, {"n": 44, "leituras": 0, "escritas": 1}, {"n": 45, "leituras": 0, "escritas": 1}, {"n": 46, "leituras": 0, "escritas": 1}, {"n": 47, "leituras": 0, "escritas": 1}, {"n": 48, "leituras": 0, "escritas": 1}, {"n": 49, "leituras": 0, "escritas": 1}, {"n": 50, "leituras": 0, "escritas": 1}, {"n": 51, "leituras": 0, "escritas": 1}, {"n": 52, "leituras": 0, "escritas": 1}, {"n": 53, "leituras": 0, "escritas": 1}, {"n": 54, "leituras": 0, "escritas": 1}, {"n": 55, "leituras": 0, "escritas": 1}, {"n": 56, "leituras": 0, "escritas": 1}, {"n": 57, "leituras": 0, "escritas": 1}, {"n": 58, "leituras": 0, "escritas": 1}, {"n": 59, "leituras": 0, "escritas": 1}, {"n": 60, "leituras": 0, "escritas": 1}]}, "anexar-media": {"estrutura": "vetor", "chamada": "anexar", "seguidas": "media", "vazia": false, "tabela": [{"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 100, "vezes": 100, "leituras": 127, "escritas": 227}, {"n": 1000, "vezes": 1000, "leituras": 1023, "escritas": 2023}], "serie": [{"n": 1, "vezes": 1, "leituras": 0, "escritas": 1}, {"n": 2, "vezes": 2, "leituras": 1, "escritas": 3}, {"n": 3, "vezes": 3, "leituras": 3, "escritas": 6}, {"n": 4, "vezes": 4, "leituras": 3, "escritas": 7}, {"n": 5, "vezes": 5, "leituras": 7, "escritas": 12}, {"n": 6, "vezes": 6, "leituras": 7, "escritas": 13}, {"n": 7, "vezes": 7, "leituras": 7, "escritas": 14}, {"n": 8, "vezes": 8, "leituras": 7, "escritas": 15}, {"n": 9, "vezes": 9, "leituras": 15, "escritas": 24}, {"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 11, "vezes": 11, "leituras": 15, "escritas": 26}, {"n": 12, "vezes": 12, "leituras": 15, "escritas": 27}, {"n": 13, "vezes": 13, "leituras": 15, "escritas": 28}, {"n": 14, "vezes": 14, "leituras": 15, "escritas": 29}, {"n": 15, "vezes": 15, "leituras": 15, "escritas": 30}, {"n": 16, "vezes": 16, "leituras": 15, "escritas": 31}, {"n": 17, "vezes": 17, "leituras": 31, "escritas": 48}, {"n": 18, "vezes": 18, "leituras": 31, "escritas": 49}, {"n": 19, "vezes": 19, "leituras": 31, "escritas": 50}, {"n": 20, "vezes": 20, "leituras": 31, "escritas": 51}, {"n": 21, "vezes": 21, "leituras": 31, "escritas": 52}, {"n": 22, "vezes": 22, "leituras": 31, "escritas": 53}, {"n": 23, "vezes": 23, "leituras": 31, "escritas": 54}, {"n": 24, "vezes": 24, "leituras": 31, "escritas": 55}, {"n": 25, "vezes": 25, "leituras": 31, "escritas": 56}, {"n": 26, "vezes": 26, "leituras": 31, "escritas": 57}, {"n": 27, "vezes": 27, "leituras": 31, "escritas": 58}, {"n": 28, "vezes": 28, "leituras": 31, "escritas": 59}, {"n": 29, "vezes": 29, "leituras": 31, "escritas": 60}, {"n": 30, "vezes": 30, "leituras": 31, "escritas": 61}, {"n": 31, "vezes": 31, "leituras": 31, "escritas": 62}, {"n": 32, "vezes": 32, "leituras": 31, "escritas": 63}, {"n": 33, "vezes": 33, "leituras": 63, "escritas": 96}, {"n": 34, "vezes": 34, "leituras": 63, "escritas": 97}, {"n": 35, "vezes": 35, "leituras": 63, "escritas": 98}, {"n": 36, "vezes": 36, "leituras": 63, "escritas": 99}, {"n": 37, "vezes": 37, "leituras": 63, "escritas": 100}, {"n": 38, "vezes": 38, "leituras": 63, "escritas": 101}, {"n": 39, "vezes": 39, "leituras": 63, "escritas": 102}, {"n": 40, "vezes": 40, "leituras": 63, "escritas": 103}, {"n": 41, "vezes": 41, "leituras": 63, "escritas": 104}, {"n": 42, "vezes": 42, "leituras": 63, "escritas": 105}, {"n": 43, "vezes": 43, "leituras": 63, "escritas": 106}, {"n": 44, "vezes": 44, "leituras": 63, "escritas": 107}, {"n": 45, "vezes": 45, "leituras": 63, "escritas": 108}, {"n": 46, "vezes": 46, "leituras": 63, "escritas": 109}, {"n": 47, "vezes": 47, "leituras": 63, "escritas": 110}, {"n": 48, "vezes": 48, "leituras": 63, "escritas": 111}, {"n": 49, "vezes": 49, "leituras": 63, "escritas": 112}, {"n": 50, "vezes": 50, "leituras": 63, "escritas": 113}, {"n": 51, "vezes": 51, "leituras": 63, "escritas": 114}, {"n": 52, "vezes": 52, "leituras": 63, "escritas": 115}, {"n": 53, "vezes": 53, "leituras": 63, "escritas": 116}, {"n": 54, "vezes": 54, "leituras": 63, "escritas": 117}, {"n": 55, "vezes": 55, "leituras": 63, "escritas": 118}, {"n": 56, "vezes": 56, "leituras": 63, "escritas": 119}, {"n": 57, "vezes": 57, "leituras": 63, "escritas": 120}, {"n": 58, "vezes": 58, "leituras": 63, "escritas": 121}, {"n": 59, "vezes": 59, "leituras": 63, "escritas": 122}, {"n": 60, "vezes": 60, "leituras": 63, "escritas": 123}]}, "anexar-pior": {"estrutura": "vetor", "chamada": "anexar", "seguidas": "pior", "vazia": false, "tabela": [{"n": 10, "k": 9, "leituras": 8, "escritas": 9}, {"n": 100, "k": 65, "leituras": 64, "escritas": 65}, {"n": 1000, "k": 513, "leituras": 512, "escritas": 513}], "serie": []}, "inserir-inicio": {"estrutura": "vetor", "chamada": "inserir", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 10, "escritas": 11}, {"n": 100, "leituras": 100, "escritas": 101}, {"n": 1000, "leituras": 1000, "escritas": 1001}], "serie": [{"n": 0, "leituras": 0, "escritas": 1}, {"n": 1, "leituras": 2, "escritas": 3}, {"n": 2, "leituras": 4, "escritas": 5}, {"n": 3, "leituras": 3, "escritas": 4}, {"n": 4, "leituras": 8, "escritas": 9}, {"n": 5, "leituras": 5, "escritas": 6}, {"n": 6, "leituras": 6, "escritas": 7}, {"n": 7, "leituras": 7, "escritas": 8}, {"n": 8, "leituras": 16, "escritas": 17}, {"n": 9, "leituras": 9, "escritas": 10}, {"n": 10, "leituras": 10, "escritas": 11}, {"n": 11, "leituras": 11, "escritas": 12}, {"n": 12, "leituras": 12, "escritas": 13}, {"n": 13, "leituras": 13, "escritas": 14}, {"n": 14, "leituras": 14, "escritas": 15}, {"n": 15, "leituras": 15, "escritas": 16}, {"n": 16, "leituras": 32, "escritas": 33}, {"n": 17, "leituras": 17, "escritas": 18}, {"n": 18, "leituras": 18, "escritas": 19}, {"n": 19, "leituras": 19, "escritas": 20}, {"n": 20, "leituras": 20, "escritas": 21}, {"n": 21, "leituras": 21, "escritas": 22}, {"n": 22, "leituras": 22, "escritas": 23}, {"n": 23, "leituras": 23, "escritas": 24}, {"n": 24, "leituras": 24, "escritas": 25}, {"n": 25, "leituras": 25, "escritas": 26}, {"n": 26, "leituras": 26, "escritas": 27}, {"n": 27, "leituras": 27, "escritas": 28}, {"n": 28, "leituras": 28, "escritas": 29}, {"n": 29, "leituras": 29, "escritas": 30}, {"n": 30, "leituras": 30, "escritas": 31}, {"n": 31, "leituras": 31, "escritas": 32}, {"n": 32, "leituras": 64, "escritas": 65}, {"n": 33, "leituras": 33, "escritas": 34}, {"n": 34, "leituras": 34, "escritas": 35}, {"n": 35, "leituras": 35, "escritas": 36}, {"n": 36, "leituras": 36, "escritas": 37}, {"n": 37, "leituras": 37, "escritas": 38}, {"n": 38, "leituras": 38, "escritas": 39}, {"n": 39, "leituras": 39, "escritas": 40}, {"n": 40, "leituras": 40, "escritas": 41}, {"n": 41, "leituras": 41, "escritas": 42}, {"n": 42, "leituras": 42, "escritas": 43}, {"n": 43, "leituras": 43, "escritas": 44}, {"n": 44, "leituras": 44, "escritas": 45}, {"n": 45, "leituras": 45, "escritas": 46}, {"n": 46, "leituras": 46, "escritas": 47}, {"n": 47, "leituras": 47, "escritas": 48}, {"n": 48, "leituras": 48, "escritas": 49}, {"n": 49, "leituras": 49, "escritas": 50}, {"n": 50, "leituras": 50, "escritas": 51}, {"n": 51, "leituras": 51, "escritas": 52}, {"n": 52, "leituras": 52, "escritas": 53}, {"n": 53, "leituras": 53, "escritas": 54}, {"n": 54, "leituras": 54, "escritas": 55}, {"n": 55, "leituras": 55, "escritas": 56}, {"n": 56, "leituras": 56, "escritas": 57}, {"n": 57, "leituras": 57, "escritas": 58}, {"n": 58, "leituras": 58, "escritas": 59}, {"n": 59, "leituras": 59, "escritas": 60}, {"n": 60, "leituras": 60, "escritas": 61}]}, "remover-inicio": {"estrutura": "vetor", "chamada": "remover", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 10, "escritas": 9}, {"n": 100, "leituras": 100, "escritas": 99}, {"n": 1000, "leituras": 1000, "escritas": 999}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 2, "escritas": 1}, {"n": 3, "leituras": 3, "escritas": 2}, {"n": 4, "leituras": 4, "escritas": 3}, {"n": 5, "leituras": 5, "escritas": 4}, {"n": 6, "leituras": 6, "escritas": 5}, {"n": 7, "leituras": 7, "escritas": 6}, {"n": 8, "leituras": 8, "escritas": 7}, {"n": 9, "leituras": 9, "escritas": 8}, {"n": 10, "leituras": 10, "escritas": 9}, {"n": 11, "leituras": 11, "escritas": 10}, {"n": 12, "leituras": 12, "escritas": 11}, {"n": 13, "leituras": 13, "escritas": 12}, {"n": 14, "leituras": 14, "escritas": 13}, {"n": 15, "leituras": 15, "escritas": 14}, {"n": 16, "leituras": 16, "escritas": 15}, {"n": 17, "leituras": 17, "escritas": 16}, {"n": 18, "leituras": 18, "escritas": 17}, {"n": 19, "leituras": 19, "escritas": 18}, {"n": 20, "leituras": 20, "escritas": 19}, {"n": 21, "leituras": 21, "escritas": 20}, {"n": 22, "leituras": 22, "escritas": 21}, {"n": 23, "leituras": 23, "escritas": 22}, {"n": 24, "leituras": 24, "escritas": 23}, {"n": 25, "leituras": 25, "escritas": 24}, {"n": 26, "leituras": 26, "escritas": 25}, {"n": 27, "leituras": 27, "escritas": 26}, {"n": 28, "leituras": 28, "escritas": 27}, {"n": 29, "leituras": 29, "escritas": 28}, {"n": 30, "leituras": 30, "escritas": 29}, {"n": 31, "leituras": 31, "escritas": 30}, {"n": 32, "leituras": 32, "escritas": 31}, {"n": 33, "leituras": 33, "escritas": 32}, {"n": 34, "leituras": 34, "escritas": 33}, {"n": 35, "leituras": 35, "escritas": 34}, {"n": 36, "leituras": 36, "escritas": 35}, {"n": 37, "leituras": 37, "escritas": 36}, {"n": 38, "leituras": 38, "escritas": 37}, {"n": 39, "leituras": 39, "escritas": 38}, {"n": 40, "leituras": 40, "escritas": 39}, {"n": 41, "leituras": 41, "escritas": 40}, {"n": 42, "leituras": 42, "escritas": 41}, {"n": 43, "leituras": 43, "escritas": 42}, {"n": 44, "leituras": 44, "escritas": 43}, {"n": 45, "leituras": 45, "escritas": 44}, {"n": 46, "leituras": 46, "escritas": 45}, {"n": 47, "leituras": 47, "escritas": 46}, {"n": 48, "leituras": 48, "escritas": 47}, {"n": 49, "leituras": 49, "escritas": 48}, {"n": 50, "leituras": 50, "escritas": 49}, {"n": 51, "leituras": 51, "escritas": 50}, {"n": 52, "leituras": 52, "escritas": 51}, {"n": 53, "leituras": 53, "escritas": 52}, {"n": 54, "leituras": 54, "escritas": 53}, {"n": 55, "leituras": 55, "escritas": 54}, {"n": 56, "leituras": 56, "escritas": 55}, {"n": 57, "leituras": 57, "escritas": 56}, {"n": 58, "leituras": 58, "escritas": 57}, {"n": 59, "leituras": 59, "escritas": 58}, {"n": 60, "leituras": 60, "escritas": 59}]}, "remover-fim": {"estrutura": "vetor", "chamada": "remover", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}, "buscar": {"estrutura": "vetor", "chamada": "buscar", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 10, "escritas": 0}, {"n": 100, "leituras": 100, "escritas": 0}, {"n": 1000, "leituras": 1000, "escritas": 0}], "serie": [{"n": 0, "leituras": 0, "escritas": 0}, {"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 2, "escritas": 0}, {"n": 3, "leituras": 3, "escritas": 0}, {"n": 4, "leituras": 4, "escritas": 0}, {"n": 5, "leituras": 5, "escritas": 0}, {"n": 6, "leituras": 6, "escritas": 0}, {"n": 7, "leituras": 7, "escritas": 0}, {"n": 8, "leituras": 8, "escritas": 0}, {"n": 9, "leituras": 9, "escritas": 0}, {"n": 10, "leituras": 10, "escritas": 0}, {"n": 11, "leituras": 11, "escritas": 0}, {"n": 12, "leituras": 12, "escritas": 0}, {"n": 13, "leituras": 13, "escritas": 0}, {"n": 14, "leituras": 14, "escritas": 0}, {"n": 15, "leituras": 15, "escritas": 0}, {"n": 16, "leituras": 16, "escritas": 0}, {"n": 17, "leituras": 17, "escritas": 0}, {"n": 18, "leituras": 18, "escritas": 0}, {"n": 19, "leituras": 19, "escritas": 0}, {"n": 20, "leituras": 20, "escritas": 0}, {"n": 21, "leituras": 21, "escritas": 0}, {"n": 22, "leituras": 22, "escritas": 0}, {"n": 23, "leituras": 23, "escritas": 0}, {"n": 24, "leituras": 24, "escritas": 0}, {"n": 25, "leituras": 25, "escritas": 0}, {"n": 26, "leituras": 26, "escritas": 0}, {"n": 27, "leituras": 27, "escritas": 0}, {"n": 28, "leituras": 28, "escritas": 0}, {"n": 29, "leituras": 29, "escritas": 0}, {"n": 30, "leituras": 30, "escritas": 0}, {"n": 31, "leituras": 31, "escritas": 0}, {"n": 32, "leituras": 32, "escritas": 0}, {"n": 33, "leituras": 33, "escritas": 0}, {"n": 34, "leituras": 34, "escritas": 0}, {"n": 35, "leituras": 35, "escritas": 0}, {"n": 36, "leituras": 36, "escritas": 0}, {"n": 37, "leituras": 37, "escritas": 0}, {"n": 38, "leituras": 38, "escritas": 0}, {"n": 39, "leituras": 39, "escritas": 0}, {"n": 40, "leituras": 40, "escritas": 0}, {"n": 41, "leituras": 41, "escritas": 0}, {"n": 42, "leituras": 42, "escritas": 0}, {"n": 43, "leituras": 43, "escritas": 0}, {"n": 44, "leituras": 44, "escritas": 0}, {"n": 45, "leituras": 45, "escritas": 0}, {"n": 46, "leituras": 46, "escritas": 0}, {"n": 47, "leituras": 47, "escritas": 0}, {"n": 48, "leituras": 48, "escritas": 0}, {"n": 49, "leituras": 49, "escritas": 0}, {"n": 50, "leituras": 50, "escritas": 0}, {"n": 51, "leituras": 51, "escritas": 0}, {"n": 52, "leituras": 52, "escritas": 0}, {"n": 53, "leituras": 53, "escritas": 0}, {"n": 54, "leituras": 54, "escritas": 0}, {"n": 55, "leituras": 55, "escritas": 0}, {"n": 56, "leituras": 56, "escritas": 0}, {"n": 57, "leituras": 57, "escritas": 0}, {"n": 58, "leituras": 58, "escritas": 0}, {"n": 59, "leituras": 59, "escritas": 0}, {"n": 60, "leituras": 60, "escritas": 0}]}}, "capacidade": {"vetor": [{"n": 0, "casas": 1}, {"n": 1, "casas": 1}, {"n": 2, "casas": 2}, {"n": 3, "casas": 4}, {"n": 4, "casas": 4}, {"n": 5, "casas": 8}, {"n": 6, "casas": 8}, {"n": 7, "casas": 8}, {"n": 8, "casas": 8}, {"n": 9, "casas": 16}, {"n": 10, "casas": 16}, {"n": 11, "casas": 16}, {"n": 12, "casas": 16}, {"n": 13, "casas": 16}, {"n": 14, "casas": 16}, {"n": 15, "casas": 16}, {"n": 16, "casas": 16}, {"n": 17, "casas": 32}, {"n": 18, "casas": 32}, {"n": 19, "casas": 32}, {"n": 20, "casas": 32}, {"n": 21, "casas": 32}, {"n": 22, "casas": 32}, {"n": 23, "casas": 32}, {"n": 24, "casas": 32}, {"n": 25, "casas": 32}, {"n": 26, "casas": 32}, {"n": 27, "casas": 32}, {"n": 28, "casas": 32}, {"n": 29, "casas": 32}, {"n": 30, "casas": 32}, {"n": 31, "casas": 32}, {"n": 32, "casas": 32}, {"n": 33, "casas": 64}, {"n": 34, "casas": 64}, {"n": 35, "casas": 64}, {"n": 36, "casas": 64}, {"n": 37, "casas": 64}, {"n": 38, "casas": 64}, {"n": 39, "casas": 64}, {"n": 40, "casas": 64}, {"n": 41, "casas": 64}, {"n": 42, "casas": 64}, {"n": 43, "casas": 64}, {"n": 44, "casas": 64}, {"n": 45, "casas": 64}, {"n": 46, "casas": 64}, {"n": 47, "casas": 64}, {"n": 48, "casas": 64}, {"n": 49, "casas": 64}, {"n": 50, "casas": 64}, {"n": 51, "casas": 64}, {"n": 52, "casas": 64}, {"n": 53, "casas": 64}, {"n": 54, "casas": 64}, {"n": 55, "casas": 64}, {"n": 56, "casas": 64}, {"n": 57, "casas": 64}, {"n": 58, "casas": 64}, {"n": 59, "casas": 64}, {"n": 60, "casas": 64}]}}}, {"id": "pilha", "nome": "Pilha", "variante": "sobre um vetor dinâmico; o topo é o fim do vetor", "frase": "O último que entra é o primeiro que sai.", "resumo": "Só se mexe no topo: empilhar põe um valor em cima, desempilhar tira o de cima. Montada sobre o vetor, com o topo no fim dele, nenhum valor precisa andar. É a mesma ideia da pilha de chamadas: cada chamada recursiva empilha um nível, e cada retorno desempilha.", "placa": {"autor": "Alan Turing; Friedrich L. Bauer e Klaus Samelson", "ano": "1946 (Turing, \"bury\" e \"unbury\"); 1955, com pedido de patente em 1957 (Bauer e Samelson)"}, "memoria": {"notacao": "O(n)", "porque": "As casas do vetor por baixo: uma por valor empilhado, mais a folga do vetor, que dobra quando enche. Desempilhar não devolve casas."}, "operacoes": [{"id": "empilhar", "nome": "empilhar, com folga", "notacao": "O(1)", "porque": "Anexa no fim do vetor: uma escrita."}, {"id": "empilhar-pior", "nome": "empilhar, o mais caro de n seguidos", "notacao": "O(n)", "porque": "Quando o vetor de baixo enche, ele dobra e copia todos os valores."}, {"id": "empilhar-media", "nome": "empilhar, média de n seguidos", "notacao": "O(1) amortizado", "porque": "As cópias ficam cada vez mais raras, como no vetor: o custo médio não cresce com n."}, {"id": "desempilhar", "nome": "desempilhar", "notacao": "O(1)", "porque": "Lê a última casa e diminui o tamanho; ninguém anda."}, {"id": "topo", "nome": "ver o topo", "notacao": "O(1)", "porque": "Uma leitura da última casa."}], "grafico": [{"id": "empilhar", "rotulo": "empilhar"}, {"id": "empilhar-media", "rotulo": "empilhar, média"}, {"id": "desempilhar", "rotulo": "desempilhar"}], "medido": {"encher": "empilhar", "tamanhos": [10, 100, 1000], "operacoes": {"empilhar": {"estrutura": "pilha", "chamada": "empilhar", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 0, "escritas": 1}, {"n": 100, "leituras": 0, "escritas": 1}, {"n": 1000, "leituras": 0, "escritas": 1}], "serie": [{"n": 0, "leituras": 0, "escritas": 1}, {"n": 1, "leituras": 1, "escritas": 2}, {"n": 2, "leituras": 2, "escritas": 3}, {"n": 3, "leituras": 0, "escritas": 1}, {"n": 4, "leituras": 4, "escritas": 5}, {"n": 5, "leituras": 0, "escritas": 1}, {"n": 6, "leituras": 0, "escritas": 1}, {"n": 7, "leituras": 0, "escritas": 1}, {"n": 8, "leituras": 8, "escritas": 9}, {"n": 9, "leituras": 0, "escritas": 1}, {"n": 10, "leituras": 0, "escritas": 1}, {"n": 11, "leituras": 0, "escritas": 1}, {"n": 12, "leituras": 0, "escritas": 1}, {"n": 13, "leituras": 0, "escritas": 1}, {"n": 14, "leituras": 0, "escritas": 1}, {"n": 15, "leituras": 0, "escritas": 1}, {"n": 16, "leituras": 16, "escritas": 17}, {"n": 17, "leituras": 0, "escritas": 1}, {"n": 18, "leituras": 0, "escritas": 1}, {"n": 19, "leituras": 0, "escritas": 1}, {"n": 20, "leituras": 0, "escritas": 1}, {"n": 21, "leituras": 0, "escritas": 1}, {"n": 22, "leituras": 0, "escritas": 1}, {"n": 23, "leituras": 0, "escritas": 1}, {"n": 24, "leituras": 0, "escritas": 1}, {"n": 25, "leituras": 0, "escritas": 1}, {"n": 26, "leituras": 0, "escritas": 1}, {"n": 27, "leituras": 0, "escritas": 1}, {"n": 28, "leituras": 0, "escritas": 1}, {"n": 29, "leituras": 0, "escritas": 1}, {"n": 30, "leituras": 0, "escritas": 1}, {"n": 31, "leituras": 0, "escritas": 1}, {"n": 32, "leituras": 32, "escritas": 33}, {"n": 33, "leituras": 0, "escritas": 1}, {"n": 34, "leituras": 0, "escritas": 1}, {"n": 35, "leituras": 0, "escritas": 1}, {"n": 36, "leituras": 0, "escritas": 1}, {"n": 37, "leituras": 0, "escritas": 1}, {"n": 38, "leituras": 0, "escritas": 1}, {"n": 39, "leituras": 0, "escritas": 1}, {"n": 40, "leituras": 0, "escritas": 1}, {"n": 41, "leituras": 0, "escritas": 1}, {"n": 42, "leituras": 0, "escritas": 1}, {"n": 43, "leituras": 0, "escritas": 1}, {"n": 44, "leituras": 0, "escritas": 1}, {"n": 45, "leituras": 0, "escritas": 1}, {"n": 46, "leituras": 0, "escritas": 1}, {"n": 47, "leituras": 0, "escritas": 1}, {"n": 48, "leituras": 0, "escritas": 1}, {"n": 49, "leituras": 0, "escritas": 1}, {"n": 50, "leituras": 0, "escritas": 1}, {"n": 51, "leituras": 0, "escritas": 1}, {"n": 52, "leituras": 0, "escritas": 1}, {"n": 53, "leituras": 0, "escritas": 1}, {"n": 54, "leituras": 0, "escritas": 1}, {"n": 55, "leituras": 0, "escritas": 1}, {"n": 56, "leituras": 0, "escritas": 1}, {"n": 57, "leituras": 0, "escritas": 1}, {"n": 58, "leituras": 0, "escritas": 1}, {"n": 59, "leituras": 0, "escritas": 1}, {"n": 60, "leituras": 0, "escritas": 1}]}, "empilhar-media": {"estrutura": "pilha", "chamada": "empilhar", "seguidas": "media", "vazia": false, "tabela": [{"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 100, "vezes": 100, "leituras": 127, "escritas": 227}, {"n": 1000, "vezes": 1000, "leituras": 1023, "escritas": 2023}], "serie": [{"n": 1, "vezes": 1, "leituras": 0, "escritas": 1}, {"n": 2, "vezes": 2, "leituras": 1, "escritas": 3}, {"n": 3, "vezes": 3, "leituras": 3, "escritas": 6}, {"n": 4, "vezes": 4, "leituras": 3, "escritas": 7}, {"n": 5, "vezes": 5, "leituras": 7, "escritas": 12}, {"n": 6, "vezes": 6, "leituras": 7, "escritas": 13}, {"n": 7, "vezes": 7, "leituras": 7, "escritas": 14}, {"n": 8, "vezes": 8, "leituras": 7, "escritas": 15}, {"n": 9, "vezes": 9, "leituras": 15, "escritas": 24}, {"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 11, "vezes": 11, "leituras": 15, "escritas": 26}, {"n": 12, "vezes": 12, "leituras": 15, "escritas": 27}, {"n": 13, "vezes": 13, "leituras": 15, "escritas": 28}, {"n": 14, "vezes": 14, "leituras": 15, "escritas": 29}, {"n": 15, "vezes": 15, "leituras": 15, "escritas": 30}, {"n": 16, "vezes": 16, "leituras": 15, "escritas": 31}, {"n": 17, "vezes": 17, "leituras": 31, "escritas": 48}, {"n": 18, "vezes": 18, "leituras": 31, "escritas": 49}, {"n": 19, "vezes": 19, "leituras": 31, "escritas": 50}, {"n": 20, "vezes": 20, "leituras": 31, "escritas": 51}, {"n": 21, "vezes": 21, "leituras": 31, "escritas": 52}, {"n": 22, "vezes": 22, "leituras": 31, "escritas": 53}, {"n": 23, "vezes": 23, "leituras": 31, "escritas": 54}, {"n": 24, "vezes": 24, "leituras": 31, "escritas": 55}, {"n": 25, "vezes": 25, "leituras": 31, "escritas": 56}, {"n": 26, "vezes": 26, "leituras": 31, "escritas": 57}, {"n": 27, "vezes": 27, "leituras": 31, "escritas": 58}, {"n": 28, "vezes": 28, "leituras": 31, "escritas": 59}, {"n": 29, "vezes": 29, "leituras": 31, "escritas": 60}, {"n": 30, "vezes": 30, "leituras": 31, "escritas": 61}, {"n": 31, "vezes": 31, "leituras": 31, "escritas": 62}, {"n": 32, "vezes": 32, "leituras": 31, "escritas": 63}, {"n": 33, "vezes": 33, "leituras": 63, "escritas": 96}, {"n": 34, "vezes": 34, "leituras": 63, "escritas": 97}, {"n": 35, "vezes": 35, "leituras": 63, "escritas": 98}, {"n": 36, "vezes": 36, "leituras": 63, "escritas": 99}, {"n": 37, "vezes": 37, "leituras": 63, "escritas": 100}, {"n": 38, "vezes": 38, "leituras": 63, "escritas": 101}, {"n": 39, "vezes": 39, "leituras": 63, "escritas": 102}, {"n": 40, "vezes": 40, "leituras": 63, "escritas": 103}, {"n": 41, "vezes": 41, "leituras": 63, "escritas": 104}, {"n": 42, "vezes": 42, "leituras": 63, "escritas": 105}, {"n": 43, "vezes": 43, "leituras": 63, "escritas": 106}, {"n": 44, "vezes": 44, "leituras": 63, "escritas": 107}, {"n": 45, "vezes": 45, "leituras": 63, "escritas": 108}, {"n": 46, "vezes": 46, "leituras": 63, "escritas": 109}, {"n": 47, "vezes": 47, "leituras": 63, "escritas": 110}, {"n": 48, "vezes": 48, "leituras": 63, "escritas": 111}, {"n": 49, "vezes": 49, "leituras": 63, "escritas": 112}, {"n": 50, "vezes": 50, "leituras": 63, "escritas": 113}, {"n": 51, "vezes": 51, "leituras": 63, "escritas": 114}, {"n": 52, "vezes": 52, "leituras": 63, "escritas": 115}, {"n": 53, "vezes": 53, "leituras": 63, "escritas": 116}, {"n": 54, "vezes": 54, "leituras": 63, "escritas": 117}, {"n": 55, "vezes": 55, "leituras": 63, "escritas": 118}, {"n": 56, "vezes": 56, "leituras": 63, "escritas": 119}, {"n": 57, "vezes": 57, "leituras": 63, "escritas": 120}, {"n": 58, "vezes": 58, "leituras": 63, "escritas": 121}, {"n": 59, "vezes": 59, "leituras": 63, "escritas": 122}, {"n": 60, "vezes": 60, "leituras": 63, "escritas": 123}]}, "empilhar-pior": {"estrutura": "pilha", "chamada": "empilhar", "seguidas": "pior", "vazia": false, "tabela": [{"n": 10, "k": 9, "leituras": 8, "escritas": 9}, {"n": 100, "k": 65, "leituras": 64, "escritas": 65}, {"n": 1000, "k": 513, "leituras": 512, "escritas": 513}], "serie": []}, "desempilhar": {"estrutura": "pilha", "chamada": "desempilhar", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}, "topo": {"estrutura": "pilha", "chamada": "topo", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}}, "capacidade": {"pilha": [{"n": 0, "casas": 1}, {"n": 1, "casas": 1}, {"n": 2, "casas": 2}, {"n": 3, "casas": 4}, {"n": 4, "casas": 4}, {"n": 5, "casas": 8}, {"n": 6, "casas": 8}, {"n": 7, "casas": 8}, {"n": 8, "casas": 8}, {"n": 9, "casas": 16}, {"n": 10, "casas": 16}, {"n": 11, "casas": 16}, {"n": 12, "casas": 16}, {"n": 13, "casas": 16}, {"n": 14, "casas": 16}, {"n": 15, "casas": 16}, {"n": 16, "casas": 16}, {"n": 17, "casas": 32}, {"n": 18, "casas": 32}, {"n": 19, "casas": 32}, {"n": 20, "casas": 32}, {"n": 21, "casas": 32}, {"n": 22, "casas": 32}, {"n": 23, "casas": 32}, {"n": 24, "casas": 32}, {"n": 25, "casas": 32}, {"n": 26, "casas": 32}, {"n": 27, "casas": 32}, {"n": 28, "casas": 32}, {"n": 29, "casas": 32}, {"n": 30, "casas": 32}, {"n": 31, "casas": 32}, {"n": 32, "casas": 32}, {"n": 33, "casas": 64}, {"n": 34, "casas": 64}, {"n": 35, "casas": 64}, {"n": 36, "casas": 64}, {"n": 37, "casas": 64}, {"n": 38, "casas": 64}, {"n": 39, "casas": 64}, {"n": 40, "casas": 64}, {"n": 41, "casas": 64}, {"n": 42, "casas": 64}, {"n": 43, "casas": 64}, {"n": 44, "casas": 64}, {"n": 45, "casas": 64}, {"n": 46, "casas": 64}, {"n": 47, "casas": 64}, {"n": 48, "casas": 64}, {"n": 49, "casas": 64}, {"n": 50, "casas": 64}, {"n": 51, "casas": 64}, {"n": 52, "casas": 64}, {"n": 53, "casas": 64}, {"n": 54, "casas": 64}, {"n": 55, "casas": 64}, {"n": 56, "casas": 64}, {"n": 57, "casas": 64}, {"n": 58, "casas": 64}, {"n": 59, "casas": 64}, {"n": 60, "casas": 64}]}}}, {"id": "fila", "nome": "Fila", "variante": "duas versões: ingênua e circular", "frase": "O primeiro que entra é o primeiro que sai.", "resumo": "Entra-se pelo fim e sai-se pelo começo. Na fila ingênua, o primeiro mora na casa 0 do vetor, e cada saída puxa todos os outros uma casa para a frente. Na fila circular, ninguém anda: quem anda é o marcador do início, que dá a volta quando chega ao fim do vetor.", "placa": {"autor": "sem autoria única", "ano": "—"}, "memoria": {"notacao": "O(n)", "porque": "Nas duas, uma casa por valor na fila mais a folga do vetor, que dobra quando enche; desenfileirar não devolve casas. A circular guarda também onde a fila começa."}, "variantes": {"ingenua": "ingênua", "circular": "circular"}, "operacoes": [{"id": "enfileirar-ingenua", "nome": "enfileirar, com folga", "notacao": "O(1)", "porque": "Escreve na casa logo depois do último."}, {"id": "enfileirar-circular", "nome": "enfileirar, com folga", "notacao": "O(1)", "porque": "Escreve na casa logo depois do último, dando a volta se passar do fim do vetor."}, {"id": "enfileirar-pior-circular", "nome": "enfileirar, o mais caro de n seguidos", "notacao": "O(n)", "porque": "Quando enche, dobra e copia a fila na ordem, a partir da casa 0. Na ingênua, o mesmo."}, {"id": "enfileirar-media-circular", "nome": "enfileirar, média de n seguidos", "notacao": "O(1) amortizado", "porque": "As cópias ficam cada vez mais raras: o custo médio não cresce com n. Na ingênua, o mesmo."}, {"id": "desenfileirar-ingenua", "nome": "desenfileirar", "notacao": "O(n)", "porque": "Tira o valor da casa 0 e puxa cada um dos outros uma casa para a frente."}, {"id": "desenfileirar-circular", "nome": "desenfileirar", "notacao": "O(1)", "porque": "Lê a casa do início e anda o marcador do início uma casa. Ninguém se desloca."}, {"id": "primeiro-ingenua", "nome": "ver o primeiro", "notacao": "O(1)", "porque": "Uma leitura da casa 0."}, {"id": "primeiro-circular", "nome": "ver o primeiro", "notacao": "O(1)", "porque": "Uma leitura da casa do início."}], "grafico": [{"id": "desenfileirar-ingenua", "rotulo": "desenfileirar, ingênua"}, {"id": "desenfileirar-circular", "rotulo": "desenfileirar, circular"}, {"id": "enfileirar-circular", "rotulo": "enfileirar"}, {"id": "enfileirar-media-circular", "rotulo": "enfileirar, média"}], "medido": {"encher": "enfileirar", "tamanhos": [10, 100, 1000], "operacoes": {"enfileirar-ingenua": {"estrutura": "ingenua", "chamada": "enfileirar", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 0, "escritas": 1}, {"n": 100, "leituras": 0, "escritas": 1}, {"n": 1000, "leituras": 0, "escritas": 1}], "serie": [{"n": 0, "leituras": 0, "escritas": 1}, {"n": 1, "leituras": 1, "escritas": 2}, {"n": 2, "leituras": 2, "escritas": 3}, {"n": 3, "leituras": 0, "escritas": 1}, {"n": 4, "leituras": 4, "escritas": 5}, {"n": 5, "leituras": 0, "escritas": 1}, {"n": 6, "leituras": 0, "escritas": 1}, {"n": 7, "leituras": 0, "escritas": 1}, {"n": 8, "leituras": 8, "escritas": 9}, {"n": 9, "leituras": 0, "escritas": 1}, {"n": 10, "leituras": 0, "escritas": 1}, {"n": 11, "leituras": 0, "escritas": 1}, {"n": 12, "leituras": 0, "escritas": 1}, {"n": 13, "leituras": 0, "escritas": 1}, {"n": 14, "leituras": 0, "escritas": 1}, {"n": 15, "leituras": 0, "escritas": 1}, {"n": 16, "leituras": 16, "escritas": 17}, {"n": 17, "leituras": 0, "escritas": 1}, {"n": 18, "leituras": 0, "escritas": 1}, {"n": 19, "leituras": 0, "escritas": 1}, {"n": 20, "leituras": 0, "escritas": 1}, {"n": 21, "leituras": 0, "escritas": 1}, {"n": 22, "leituras": 0, "escritas": 1}, {"n": 23, "leituras": 0, "escritas": 1}, {"n": 24, "leituras": 0, "escritas": 1}, {"n": 25, "leituras": 0, "escritas": 1}, {"n": 26, "leituras": 0, "escritas": 1}, {"n": 27, "leituras": 0, "escritas": 1}, {"n": 28, "leituras": 0, "escritas": 1}, {"n": 29, "leituras": 0, "escritas": 1}, {"n": 30, "leituras": 0, "escritas": 1}, {"n": 31, "leituras": 0, "escritas": 1}, {"n": 32, "leituras": 32, "escritas": 33}, {"n": 33, "leituras": 0, "escritas": 1}, {"n": 34, "leituras": 0, "escritas": 1}, {"n": 35, "leituras": 0, "escritas": 1}, {"n": 36, "leituras": 0, "escritas": 1}, {"n": 37, "leituras": 0, "escritas": 1}, {"n": 38, "leituras": 0, "escritas": 1}, {"n": 39, "leituras": 0, "escritas": 1}, {"n": 40, "leituras": 0, "escritas": 1}, {"n": 41, "leituras": 0, "escritas": 1}, {"n": 42, "leituras": 0, "escritas": 1}, {"n": 43, "leituras": 0, "escritas": 1}, {"n": 44, "leituras": 0, "escritas": 1}, {"n": 45, "leituras": 0, "escritas": 1}, {"n": 46, "leituras": 0, "escritas": 1}, {"n": 47, "leituras": 0, "escritas": 1}, {"n": 48, "leituras": 0, "escritas": 1}, {"n": 49, "leituras": 0, "escritas": 1}, {"n": 50, "leituras": 0, "escritas": 1}, {"n": 51, "leituras": 0, "escritas": 1}, {"n": 52, "leituras": 0, "escritas": 1}, {"n": 53, "leituras": 0, "escritas": 1}, {"n": 54, "leituras": 0, "escritas": 1}, {"n": 55, "leituras": 0, "escritas": 1}, {"n": 56, "leituras": 0, "escritas": 1}, {"n": 57, "leituras": 0, "escritas": 1}, {"n": 58, "leituras": 0, "escritas": 1}, {"n": 59, "leituras": 0, "escritas": 1}, {"n": 60, "leituras": 0, "escritas": 1}]}, "enfileirar-media-ingenua": {"estrutura": "ingenua", "chamada": "enfileirar", "seguidas": "media", "vazia": false, "tabela": [{"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 100, "vezes": 100, "leituras": 127, "escritas": 227}, {"n": 1000, "vezes": 1000, "leituras": 1023, "escritas": 2023}], "serie": [{"n": 1, "vezes": 1, "leituras": 0, "escritas": 1}, {"n": 2, "vezes": 2, "leituras": 1, "escritas": 3}, {"n": 3, "vezes": 3, "leituras": 3, "escritas": 6}, {"n": 4, "vezes": 4, "leituras": 3, "escritas": 7}, {"n": 5, "vezes": 5, "leituras": 7, "escritas": 12}, {"n": 6, "vezes": 6, "leituras": 7, "escritas": 13}, {"n": 7, "vezes": 7, "leituras": 7, "escritas": 14}, {"n": 8, "vezes": 8, "leituras": 7, "escritas": 15}, {"n": 9, "vezes": 9, "leituras": 15, "escritas": 24}, {"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 11, "vezes": 11, "leituras": 15, "escritas": 26}, {"n": 12, "vezes": 12, "leituras": 15, "escritas": 27}, {"n": 13, "vezes": 13, "leituras": 15, "escritas": 28}, {"n": 14, "vezes": 14, "leituras": 15, "escritas": 29}, {"n": 15, "vezes": 15, "leituras": 15, "escritas": 30}, {"n": 16, "vezes": 16, "leituras": 15, "escritas": 31}, {"n": 17, "vezes": 17, "leituras": 31, "escritas": 48}, {"n": 18, "vezes": 18, "leituras": 31, "escritas": 49}, {"n": 19, "vezes": 19, "leituras": 31, "escritas": 50}, {"n": 20, "vezes": 20, "leituras": 31, "escritas": 51}, {"n": 21, "vezes": 21, "leituras": 31, "escritas": 52}, {"n": 22, "vezes": 22, "leituras": 31, "escritas": 53}, {"n": 23, "vezes": 23, "leituras": 31, "escritas": 54}, {"n": 24, "vezes": 24, "leituras": 31, "escritas": 55}, {"n": 25, "vezes": 25, "leituras": 31, "escritas": 56}, {"n": 26, "vezes": 26, "leituras": 31, "escritas": 57}, {"n": 27, "vezes": 27, "leituras": 31, "escritas": 58}, {"n": 28, "vezes": 28, "leituras": 31, "escritas": 59}, {"n": 29, "vezes": 29, "leituras": 31, "escritas": 60}, {"n": 30, "vezes": 30, "leituras": 31, "escritas": 61}, {"n": 31, "vezes": 31, "leituras": 31, "escritas": 62}, {"n": 32, "vezes": 32, "leituras": 31, "escritas": 63}, {"n": 33, "vezes": 33, "leituras": 63, "escritas": 96}, {"n": 34, "vezes": 34, "leituras": 63, "escritas": 97}, {"n": 35, "vezes": 35, "leituras": 63, "escritas": 98}, {"n": 36, "vezes": 36, "leituras": 63, "escritas": 99}, {"n": 37, "vezes": 37, "leituras": 63, "escritas": 100}, {"n": 38, "vezes": 38, "leituras": 63, "escritas": 101}, {"n": 39, "vezes": 39, "leituras": 63, "escritas": 102}, {"n": 40, "vezes": 40, "leituras": 63, "escritas": 103}, {"n": 41, "vezes": 41, "leituras": 63, "escritas": 104}, {"n": 42, "vezes": 42, "leituras": 63, "escritas": 105}, {"n": 43, "vezes": 43, "leituras": 63, "escritas": 106}, {"n": 44, "vezes": 44, "leituras": 63, "escritas": 107}, {"n": 45, "vezes": 45, "leituras": 63, "escritas": 108}, {"n": 46, "vezes": 46, "leituras": 63, "escritas": 109}, {"n": 47, "vezes": 47, "leituras": 63, "escritas": 110}, {"n": 48, "vezes": 48, "leituras": 63, "escritas": 111}, {"n": 49, "vezes": 49, "leituras": 63, "escritas": 112}, {"n": 50, "vezes": 50, "leituras": 63, "escritas": 113}, {"n": 51, "vezes": 51, "leituras": 63, "escritas": 114}, {"n": 52, "vezes": 52, "leituras": 63, "escritas": 115}, {"n": 53, "vezes": 53, "leituras": 63, "escritas": 116}, {"n": 54, "vezes": 54, "leituras": 63, "escritas": 117}, {"n": 55, "vezes": 55, "leituras": 63, "escritas": 118}, {"n": 56, "vezes": 56, "leituras": 63, "escritas": 119}, {"n": 57, "vezes": 57, "leituras": 63, "escritas": 120}, {"n": 58, "vezes": 58, "leituras": 63, "escritas": 121}, {"n": 59, "vezes": 59, "leituras": 63, "escritas": 122}, {"n": 60, "vezes": 60, "leituras": 63, "escritas": 123}]}, "enfileirar-pior-ingenua": {"estrutura": "ingenua", "chamada": "enfileirar", "seguidas": "pior", "vazia": false, "tabela": [{"n": 10, "k": 9, "leituras": 8, "escritas": 9}, {"n": 100, "k": 65, "leituras": 64, "escritas": 65}, {"n": 1000, "k": 513, "leituras": 512, "escritas": 513}], "serie": []}, "desenfileirar-ingenua": {"estrutura": "ingenua", "chamada": "desenfileirar", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 10, "escritas": 9}, {"n": 100, "leituras": 100, "escritas": 99}, {"n": 1000, "leituras": 1000, "escritas": 999}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 2, "escritas": 1}, {"n": 3, "leituras": 3, "escritas": 2}, {"n": 4, "leituras": 4, "escritas": 3}, {"n": 5, "leituras": 5, "escritas": 4}, {"n": 6, "leituras": 6, "escritas": 5}, {"n": 7, "leituras": 7, "escritas": 6}, {"n": 8, "leituras": 8, "escritas": 7}, {"n": 9, "leituras": 9, "escritas": 8}, {"n": 10, "leituras": 10, "escritas": 9}, {"n": 11, "leituras": 11, "escritas": 10}, {"n": 12, "leituras": 12, "escritas": 11}, {"n": 13, "leituras": 13, "escritas": 12}, {"n": 14, "leituras": 14, "escritas": 13}, {"n": 15, "leituras": 15, "escritas": 14}, {"n": 16, "leituras": 16, "escritas": 15}, {"n": 17, "leituras": 17, "escritas": 16}, {"n": 18, "leituras": 18, "escritas": 17}, {"n": 19, "leituras": 19, "escritas": 18}, {"n": 20, "leituras": 20, "escritas": 19}, {"n": 21, "leituras": 21, "escritas": 20}, {"n": 22, "leituras": 22, "escritas": 21}, {"n": 23, "leituras": 23, "escritas": 22}, {"n": 24, "leituras": 24, "escritas": 23}, {"n": 25, "leituras": 25, "escritas": 24}, {"n": 26, "leituras": 26, "escritas": 25}, {"n": 27, "leituras": 27, "escritas": 26}, {"n": 28, "leituras": 28, "escritas": 27}, {"n": 29, "leituras": 29, "escritas": 28}, {"n": 30, "leituras": 30, "escritas": 29}, {"n": 31, "leituras": 31, "escritas": 30}, {"n": 32, "leituras": 32, "escritas": 31}, {"n": 33, "leituras": 33, "escritas": 32}, {"n": 34, "leituras": 34, "escritas": 33}, {"n": 35, "leituras": 35, "escritas": 34}, {"n": 36, "leituras": 36, "escritas": 35}, {"n": 37, "leituras": 37, "escritas": 36}, {"n": 38, "leituras": 38, "escritas": 37}, {"n": 39, "leituras": 39, "escritas": 38}, {"n": 40, "leituras": 40, "escritas": 39}, {"n": 41, "leituras": 41, "escritas": 40}, {"n": 42, "leituras": 42, "escritas": 41}, {"n": 43, "leituras": 43, "escritas": 42}, {"n": 44, "leituras": 44, "escritas": 43}, {"n": 45, "leituras": 45, "escritas": 44}, {"n": 46, "leituras": 46, "escritas": 45}, {"n": 47, "leituras": 47, "escritas": 46}, {"n": 48, "leituras": 48, "escritas": 47}, {"n": 49, "leituras": 49, "escritas": 48}, {"n": 50, "leituras": 50, "escritas": 49}, {"n": 51, "leituras": 51, "escritas": 50}, {"n": 52, "leituras": 52, "escritas": 51}, {"n": 53, "leituras": 53, "escritas": 52}, {"n": 54, "leituras": 54, "escritas": 53}, {"n": 55, "leituras": 55, "escritas": 54}, {"n": 56, "leituras": 56, "escritas": 55}, {"n": 57, "leituras": 57, "escritas": 56}, {"n": 58, "leituras": 58, "escritas": 57}, {"n": 59, "leituras": 59, "escritas": 58}, {"n": 60, "leituras": 60, "escritas": 59}]}, "primeiro-ingenua": {"estrutura": "ingenua", "chamada": "primeiro", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}, "enfileirar-circular": {"estrutura": "circular", "chamada": "enfileirar", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 0, "escritas": 1}, {"n": 100, "leituras": 0, "escritas": 1}, {"n": 1000, "leituras": 0, "escritas": 1}], "serie": [{"n": 0, "leituras": 0, "escritas": 1}, {"n": 1, "leituras": 1, "escritas": 2}, {"n": 2, "leituras": 2, "escritas": 3}, {"n": 3, "leituras": 0, "escritas": 1}, {"n": 4, "leituras": 4, "escritas": 5}, {"n": 5, "leituras": 0, "escritas": 1}, {"n": 6, "leituras": 0, "escritas": 1}, {"n": 7, "leituras": 0, "escritas": 1}, {"n": 8, "leituras": 8, "escritas": 9}, {"n": 9, "leituras": 0, "escritas": 1}, {"n": 10, "leituras": 0, "escritas": 1}, {"n": 11, "leituras": 0, "escritas": 1}, {"n": 12, "leituras": 0, "escritas": 1}, {"n": 13, "leituras": 0, "escritas": 1}, {"n": 14, "leituras": 0, "escritas": 1}, {"n": 15, "leituras": 0, "escritas": 1}, {"n": 16, "leituras": 16, "escritas": 17}, {"n": 17, "leituras": 0, "escritas": 1}, {"n": 18, "leituras": 0, "escritas": 1}, {"n": 19, "leituras": 0, "escritas": 1}, {"n": 20, "leituras": 0, "escritas": 1}, {"n": 21, "leituras": 0, "escritas": 1}, {"n": 22, "leituras": 0, "escritas": 1}, {"n": 23, "leituras": 0, "escritas": 1}, {"n": 24, "leituras": 0, "escritas": 1}, {"n": 25, "leituras": 0, "escritas": 1}, {"n": 26, "leituras": 0, "escritas": 1}, {"n": 27, "leituras": 0, "escritas": 1}, {"n": 28, "leituras": 0, "escritas": 1}, {"n": 29, "leituras": 0, "escritas": 1}, {"n": 30, "leituras": 0, "escritas": 1}, {"n": 31, "leituras": 0, "escritas": 1}, {"n": 32, "leituras": 32, "escritas": 33}, {"n": 33, "leituras": 0, "escritas": 1}, {"n": 34, "leituras": 0, "escritas": 1}, {"n": 35, "leituras": 0, "escritas": 1}, {"n": 36, "leituras": 0, "escritas": 1}, {"n": 37, "leituras": 0, "escritas": 1}, {"n": 38, "leituras": 0, "escritas": 1}, {"n": 39, "leituras": 0, "escritas": 1}, {"n": 40, "leituras": 0, "escritas": 1}, {"n": 41, "leituras": 0, "escritas": 1}, {"n": 42, "leituras": 0, "escritas": 1}, {"n": 43, "leituras": 0, "escritas": 1}, {"n": 44, "leituras": 0, "escritas": 1}, {"n": 45, "leituras": 0, "escritas": 1}, {"n": 46, "leituras": 0, "escritas": 1}, {"n": 47, "leituras": 0, "escritas": 1}, {"n": 48, "leituras": 0, "escritas": 1}, {"n": 49, "leituras": 0, "escritas": 1}, {"n": 50, "leituras": 0, "escritas": 1}, {"n": 51, "leituras": 0, "escritas": 1}, {"n": 52, "leituras": 0, "escritas": 1}, {"n": 53, "leituras": 0, "escritas": 1}, {"n": 54, "leituras": 0, "escritas": 1}, {"n": 55, "leituras": 0, "escritas": 1}, {"n": 56, "leituras": 0, "escritas": 1}, {"n": 57, "leituras": 0, "escritas": 1}, {"n": 58, "leituras": 0, "escritas": 1}, {"n": 59, "leituras": 0, "escritas": 1}, {"n": 60, "leituras": 0, "escritas": 1}]}, "enfileirar-media-circular": {"estrutura": "circular", "chamada": "enfileirar", "seguidas": "media", "vazia": false, "tabela": [{"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 100, "vezes": 100, "leituras": 127, "escritas": 227}, {"n": 1000, "vezes": 1000, "leituras": 1023, "escritas": 2023}], "serie": [{"n": 1, "vezes": 1, "leituras": 0, "escritas": 1}, {"n": 2, "vezes": 2, "leituras": 1, "escritas": 3}, {"n": 3, "vezes": 3, "leituras": 3, "escritas": 6}, {"n": 4, "vezes": 4, "leituras": 3, "escritas": 7}, {"n": 5, "vezes": 5, "leituras": 7, "escritas": 12}, {"n": 6, "vezes": 6, "leituras": 7, "escritas": 13}, {"n": 7, "vezes": 7, "leituras": 7, "escritas": 14}, {"n": 8, "vezes": 8, "leituras": 7, "escritas": 15}, {"n": 9, "vezes": 9, "leituras": 15, "escritas": 24}, {"n": 10, "vezes": 10, "leituras": 15, "escritas": 25}, {"n": 11, "vezes": 11, "leituras": 15, "escritas": 26}, {"n": 12, "vezes": 12, "leituras": 15, "escritas": 27}, {"n": 13, "vezes": 13, "leituras": 15, "escritas": 28}, {"n": 14, "vezes": 14, "leituras": 15, "escritas": 29}, {"n": 15, "vezes": 15, "leituras": 15, "escritas": 30}, {"n": 16, "vezes": 16, "leituras": 15, "escritas": 31}, {"n": 17, "vezes": 17, "leituras": 31, "escritas": 48}, {"n": 18, "vezes": 18, "leituras": 31, "escritas": 49}, {"n": 19, "vezes": 19, "leituras": 31, "escritas": 50}, {"n": 20, "vezes": 20, "leituras": 31, "escritas": 51}, {"n": 21, "vezes": 21, "leituras": 31, "escritas": 52}, {"n": 22, "vezes": 22, "leituras": 31, "escritas": 53}, {"n": 23, "vezes": 23, "leituras": 31, "escritas": 54}, {"n": 24, "vezes": 24, "leituras": 31, "escritas": 55}, {"n": 25, "vezes": 25, "leituras": 31, "escritas": 56}, {"n": 26, "vezes": 26, "leituras": 31, "escritas": 57}, {"n": 27, "vezes": 27, "leituras": 31, "escritas": 58}, {"n": 28, "vezes": 28, "leituras": 31, "escritas": 59}, {"n": 29, "vezes": 29, "leituras": 31, "escritas": 60}, {"n": 30, "vezes": 30, "leituras": 31, "escritas": 61}, {"n": 31, "vezes": 31, "leituras": 31, "escritas": 62}, {"n": 32, "vezes": 32, "leituras": 31, "escritas": 63}, {"n": 33, "vezes": 33, "leituras": 63, "escritas": 96}, {"n": 34, "vezes": 34, "leituras": 63, "escritas": 97}, {"n": 35, "vezes": 35, "leituras": 63, "escritas": 98}, {"n": 36, "vezes": 36, "leituras": 63, "escritas": 99}, {"n": 37, "vezes": 37, "leituras": 63, "escritas": 100}, {"n": 38, "vezes": 38, "leituras": 63, "escritas": 101}, {"n": 39, "vezes": 39, "leituras": 63, "escritas": 102}, {"n": 40, "vezes": 40, "leituras": 63, "escritas": 103}, {"n": 41, "vezes": 41, "leituras": 63, "escritas": 104}, {"n": 42, "vezes": 42, "leituras": 63, "escritas": 105}, {"n": 43, "vezes": 43, "leituras": 63, "escritas": 106}, {"n": 44, "vezes": 44, "leituras": 63, "escritas": 107}, {"n": 45, "vezes": 45, "leituras": 63, "escritas": 108}, {"n": 46, "vezes": 46, "leituras": 63, "escritas": 109}, {"n": 47, "vezes": 47, "leituras": 63, "escritas": 110}, {"n": 48, "vezes": 48, "leituras": 63, "escritas": 111}, {"n": 49, "vezes": 49, "leituras": 63, "escritas": 112}, {"n": 50, "vezes": 50, "leituras": 63, "escritas": 113}, {"n": 51, "vezes": 51, "leituras": 63, "escritas": 114}, {"n": 52, "vezes": 52, "leituras": 63, "escritas": 115}, {"n": 53, "vezes": 53, "leituras": 63, "escritas": 116}, {"n": 54, "vezes": 54, "leituras": 63, "escritas": 117}, {"n": 55, "vezes": 55, "leituras": 63, "escritas": 118}, {"n": 56, "vezes": 56, "leituras": 63, "escritas": 119}, {"n": 57, "vezes": 57, "leituras": 63, "escritas": 120}, {"n": 58, "vezes": 58, "leituras": 63, "escritas": 121}, {"n": 59, "vezes": 59, "leituras": 63, "escritas": 122}, {"n": 60, "vezes": 60, "leituras": 63, "escritas": 123}]}, "enfileirar-pior-circular": {"estrutura": "circular", "chamada": "enfileirar", "seguidas": "pior", "vazia": false, "tabela": [{"n": 10, "k": 9, "leituras": 8, "escritas": 9}, {"n": 100, "k": 65, "leituras": 64, "escritas": 65}, {"n": 1000, "k": 513, "leituras": 512, "escritas": 513}], "serie": []}, "desenfileirar-circular": {"estrutura": "circular", "chamada": "desenfileirar", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}, "primeiro-circular": {"estrutura": "circular", "chamada": "primeiro", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}}, "capacidade": {"ingenua": [{"n": 0, "casas": 1}, {"n": 1, "casas": 1}, {"n": 2, "casas": 2}, {"n": 3, "casas": 4}, {"n": 4, "casas": 4}, {"n": 5, "casas": 8}, {"n": 6, "casas": 8}, {"n": 7, "casas": 8}, {"n": 8, "casas": 8}, {"n": 9, "casas": 16}, {"n": 10, "casas": 16}, {"n": 11, "casas": 16}, {"n": 12, "casas": 16}, {"n": 13, "casas": 16}, {"n": 14, "casas": 16}, {"n": 15, "casas": 16}, {"n": 16, "casas": 16}, {"n": 17, "casas": 32}, {"n": 18, "casas": 32}, {"n": 19, "casas": 32}, {"n": 20, "casas": 32}, {"n": 21, "casas": 32}, {"n": 22, "casas": 32}, {"n": 23, "casas": 32}, {"n": 24, "casas": 32}, {"n": 25, "casas": 32}, {"n": 26, "casas": 32}, {"n": 27, "casas": 32}, {"n": 28, "casas": 32}, {"n": 29, "casas": 32}, {"n": 30, "casas": 32}, {"n": 31, "casas": 32}, {"n": 32, "casas": 32}, {"n": 33, "casas": 64}, {"n": 34, "casas": 64}, {"n": 35, "casas": 64}, {"n": 36, "casas": 64}, {"n": 37, "casas": 64}, {"n": 38, "casas": 64}, {"n": 39, "casas": 64}, {"n": 40, "casas": 64}, {"n": 41, "casas": 64}, {"n": 42, "casas": 64}, {"n": 43, "casas": 64}, {"n": 44, "casas": 64}, {"n": 45, "casas": 64}, {"n": 46, "casas": 64}, {"n": 47, "casas": 64}, {"n": 48, "casas": 64}, {"n": 49, "casas": 64}, {"n": 50, "casas": 64}, {"n": 51, "casas": 64}, {"n": 52, "casas": 64}, {"n": 53, "casas": 64}, {"n": 54, "casas": 64}, {"n": 55, "casas": 64}, {"n": 56, "casas": 64}, {"n": 57, "casas": 64}, {"n": 58, "casas": 64}, {"n": 59, "casas": 64}, {"n": 60, "casas": 64}], "circular": [{"n": 0, "casas": 1}, {"n": 1, "casas": 1}, {"n": 2, "casas": 2}, {"n": 3, "casas": 4}, {"n": 4, "casas": 4}, {"n": 5, "casas": 8}, {"n": 6, "casas": 8}, {"n": 7, "casas": 8}, {"n": 8, "casas": 8}, {"n": 9, "casas": 16}, {"n": 10, "casas": 16}, {"n": 11, "casas": 16}, {"n": 12, "casas": 16}, {"n": 13, "casas": 16}, {"n": 14, "casas": 16}, {"n": 15, "casas": 16}, {"n": 16, "casas": 16}, {"n": 17, "casas": 32}, {"n": 18, "casas": 32}, {"n": 19, "casas": 32}, {"n": 20, "casas": 32}, {"n": 21, "casas": 32}, {"n": 22, "casas": 32}, {"n": 23, "casas": 32}, {"n": 24, "casas": 32}, {"n": 25, "casas": 32}, {"n": 26, "casas": 32}, {"n": 27, "casas": 32}, {"n": 28, "casas": 32}, {"n": 29, "casas": 32}, {"n": 30, "casas": 32}, {"n": 31, "casas": 32}, {"n": 32, "casas": 32}, {"n": 33, "casas": 64}, {"n": 34, "casas": 64}, {"n": 35, "casas": 64}, {"n": 36, "casas": 64}, {"n": 37, "casas": 64}, {"n": 38, "casas": 64}, {"n": 39, "casas": 64}, {"n": 40, "casas": 64}, {"n": 41, "casas": 64}, {"n": 42, "casas": 64}, {"n": 43, "casas": 64}, {"n": 44, "casas": 64}, {"n": 45, "casas": 64}, {"n": 46, "casas": 64}, {"n": 47, "casas": 64}, {"n": 48, "casas": 64}, {"n": 49, "casas": 64}, {"n": 50, "casas": 64}, {"n": 51, "casas": 64}, {"n": 52, "casas": 64}, {"n": 53, "casas": 64}, {"n": 54, "casas": 64}, {"n": 55, "casas": 64}, {"n": 56, "casas": 64}, {"n": 57, "casas": 64}, {"n": 58, "casas": 64}, {"n": 59, "casas": 64}, {"n": 60, "casas": 64}]}}}, {"id": "grafo", "nome": "Grafo", "variante": "três vistas: matriz de adjacência, lista de adjacência e matriz de incidência", "frase": "Pontos e as ligações entre eles, guardados de três jeitos.", "resumo": "Um grafo são vértices e arestas, cada aresta ligando dois vértices. Aqui ele não é dirigido: a aresta u–v vale nos dois sentidos. As mesmas arestas cabem em três vistas, e cada uma responde rápido a uma pergunta e devagar a outra. A matriz de adjacência diz na hora se u e v estão ligados, mas guarda V × V casas. A lista de adjacência guarda só os vizinhos de cada um e entrega os vizinhos de u sem procurar. A matriz de incidência guarda uma coluna por aresta: tudo começa varrendo a linha de u.", "placa": {"autor": "sem autoria única", "ano": "—"}, "n": "V", "eixo": "V (vértices, com E = {razao}V arestas)", "memoria": {"notacao": "O(V²), O(V + E) e O(V · E)", "porque": "A matriz de adjacência guarda V × V casas, tenha o grafo poucas arestas ou muitas. A lista de adjacência guarda uma casa por vértice (onde começa a lista dele) e duas por aresta (u na lista de v e v na lista de u), mais a folga de cada vetor, que dobra quando enche. A matriz de incidência guarda V casas por aresta."}, "variantes": {"matriz": "matriz de adjacência", "lista": "lista de adjacência", "incidencia": "matriz de incidência"}, "operacoes": [{"id": "existe-matriz", "nome": "a aresta u–v existe?", "notacao": "O(1)", "porque": "Uma leitura: a casa da linha u e coluna v."}, {"id": "existe-lista", "nome": "a aresta u–v existe?", "notacao": "O(grau)", "porque": "Busca v na lista de u, casa por casa; se não está lá, lê a lista inteira."}, {"id": "existe-incidencia", "nome": "a aresta u–v existe?", "notacao": "O(E)", "porque": "Varre a linha de u; em cada coluna com 1, olha se v também tem 1 ali."}, {"id": "vizinhos-matriz", "nome": "os vizinhos de u", "notacao": "O(V)", "porque": "Lê a linha u inteira, V casas, mesmo que u tenha poucos vizinhos."}, {"id": "vizinhos-lista", "nome": "os vizinhos de u", "notacao": "O(grau)", "porque": "Lê a lista de u: uma casa por vizinho, nada mais."}, {"id": "vizinhos-incidencia", "nome": "os vizinhos de u", "notacao": "O(E + grau · V)", "porque": "Varre a linha de u e, em cada coluna com 1, desce a coluna até achar a outra ponta."}, {"id": "grau-matriz", "nome": "o grau de u", "notacao": "O(V)", "porque": "Soma a linha u inteira."}, {"id": "grau-lista", "nome": "o grau de u", "notacao": "O(1)", "porque": "É o tamanho do vetor de u, guardado à parte: nenhuma casa lida."}, {"id": "grau-incidencia", "nome": "o grau de u", "notacao": "O(E)", "porque": "Soma a linha de u: uma casa por aresta."}, {"id": "por-matriz", "nome": "pôr a aresta u–v", "notacao": "O(1)", "porque": "Escreve 1 nas casas (u, v) e (v, u)."}, {"id": "por-lista", "nome": "pôr a aresta u–v, com folga", "notacao": "O(1) amortizado", "porque": "Anexa v na lista de u e u na lista de v. Se um dos vetores enche, dobra e copia, como no Vetor."}, {"id": "por-incidencia", "nome": "pôr a aresta u–v", "notacao": "O(V)", "porque": "Abre uma coluna nova e escreve as V casas dela: 1 em u e em v, 0 no resto."}, {"id": "tirar-matriz", "nome": "tirar a aresta u–v", "notacao": "O(1)", "porque": "Escreve 0 nas casas (u, v) e (v, u)."}, {"id": "tirar-lista", "nome": "tirar a aresta u–v", "notacao": "O(grau)", "porque": "Busca v na lista de u, tira e puxa os de depois uma casa para trás; o mesmo com u na lista de v."}, {"id": "tirar-incidencia", "nome": "tirar a aresta u–v", "notacao": "O(E + V)", "porque": "Acha a coluna da aresta varrendo a linha de u e põe a última coluna no lugar dela, V leituras e V escritas."}], "grafico": [{"id": "vizinhos-matriz", "rotulo": "vizinhos, matriz de adjacência"}, {"id": "vizinhos-lista", "rotulo": "vizinhos, lista"}, {"id": "vizinhos-incidencia", "rotulo": "vizinhos, incidência"}, {"id": "existe-matriz", "rotulo": "existe, matriz de adjacência"}], "legendas": {"operacoes": "Custo = leituras + escritas de casas, contadas rodando as três vistas em Python no grafo de medição: V vértices, cada um ligado aos {seguintes} seguintes dando a volta (E = {razao}V, grau {grau}), com V = {ns}. As perguntas são sobre o vértice 0, com uma aresta que não existe no existe e no pôr (o pior caso de quem procura). O número de vértices e de arestas e o tamanho de cada lista, guardados à parte, não contam.", "custo": "O custo de achar os vizinhos de um vértice nas três vistas, e o de saber se uma aresta existe na matriz de adjacência, para V de {v0} a {v1} no grafo de medição, medido uma vez por V. Os vizinhos são sempre {grau}: a lista lê só eles, a matriz de adjacência lê a linha inteira e a de incidência varre a linha e desce as colunas.", "casas": "Casas que cada vista guarda no grafo de medição, para V de {v0} a {v1} (E = {razao}V). A lista cresce como V; as duas matrizes, como V², e a de incidência {razao} vezes mais depressa que a de adjacência, porque E = {razao}V."}, "medido": {"encher": "anel", "tamanhos": [10, 100, 1000], "operacoes": {"existe-matriz": {"estrutura": "matriz", "chamada": "existe", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}, "vizinhos-matriz": {"estrutura": "matriz", "chamada": "vizinhos", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 10, "escritas": 0}, {"n": 100, "leituras": 100, "escritas": 0}, {"n": 1000, "leituras": 1000, "escritas": 0}], "serie": [{"n": 8, "leituras": 8, "escritas": 0}, {"n": 9, "leituras": 9, "escritas": 0}, {"n": 10, "leituras": 10, "escritas": 0}, {"n": 11, "leituras": 11, "escritas": 0}, {"n": 12, "leituras": 12, "escritas": 0}, {"n": 13, "leituras": 13, "escritas": 0}, {"n": 14, "leituras": 14, "escritas": 0}, {"n": 15, "leituras": 15, "escritas": 0}, {"n": 16, "leituras": 16, "escritas": 0}, {"n": 17, "leituras": 17, "escritas": 0}, {"n": 18, "leituras": 18, "escritas": 0}, {"n": 19, "leituras": 19, "escritas": 0}, {"n": 20, "leituras": 20, "escritas": 0}, {"n": 21, "leituras": 21, "escritas": 0}, {"n": 22, "leituras": 22, "escritas": 0}, {"n": 23, "leituras": 23, "escritas": 0}, {"n": 24, "leituras": 24, "escritas": 0}, {"n": 25, "leituras": 25, "escritas": 0}, {"n": 26, "leituras": 26, "escritas": 0}, {"n": 27, "leituras": 27, "escritas": 0}, {"n": 28, "leituras": 28, "escritas": 0}, {"n": 29, "leituras": 29, "escritas": 0}, {"n": 30, "leituras": 30, "escritas": 0}, {"n": 31, "leituras": 31, "escritas": 0}, {"n": 32, "leituras": 32, "escritas": 0}, {"n": 33, "leituras": 33, "escritas": 0}, {"n": 34, "leituras": 34, "escritas": 0}, {"n": 35, "leituras": 35, "escritas": 0}, {"n": 36, "leituras": 36, "escritas": 0}, {"n": 37, "leituras": 37, "escritas": 0}, {"n": 38, "leituras": 38, "escritas": 0}, {"n": 39, "leituras": 39, "escritas": 0}, {"n": 40, "leituras": 40, "escritas": 0}, {"n": 41, "leituras": 41, "escritas": 0}, {"n": 42, "leituras": 42, "escritas": 0}, {"n": 43, "leituras": 43, "escritas": 0}, {"n": 44, "leituras": 44, "escritas": 0}, {"n": 45, "leituras": 45, "escritas": 0}, {"n": 46, "leituras": 46, "escritas": 0}, {"n": 47, "leituras": 47, "escritas": 0}, {"n": 48, "leituras": 48, "escritas": 0}, {"n": 49, "leituras": 49, "escritas": 0}, {"n": 50, "leituras": 50, "escritas": 0}, {"n": 51, "leituras": 51, "escritas": 0}, {"n": 52, "leituras": 52, "escritas": 0}, {"n": 53, "leituras": 53, "escritas": 0}, {"n": 54, "leituras": 54, "escritas": 0}, {"n": 55, "leituras": 55, "escritas": 0}, {"n": 56, "leituras": 56, "escritas": 0}, {"n": 57, "leituras": 57, "escritas": 0}, {"n": 58, "leituras": 58, "escritas": 0}, {"n": 59, "leituras": 59, "escritas": 0}, {"n": 60, "leituras": 60, "escritas": 0}]}, "grau-matriz": {"estrutura": "matriz", "chamada": "grau", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 10, "escritas": 0}, {"n": 100, "leituras": 100, "escritas": 0}, {"n": 1000, "leituras": 1000, "escritas": 0}], "serie": [{"n": 8, "leituras": 8, "escritas": 0}, {"n": 9, "leituras": 9, "escritas": 0}, {"n": 10, "leituras": 10, "escritas": 0}, {"n": 11, "leituras": 11, "escritas": 0}, {"n": 12, "leituras": 12, "escritas": 0}, {"n": 13, "leituras": 13, "escritas": 0}, {"n": 14, "leituras": 14, "escritas": 0}, {"n": 15, "leituras": 15, "escritas": 0}, {"n": 16, "leituras": 16, "escritas": 0}, {"n": 17, "leituras": 17, "escritas": 0}, {"n": 18, "leituras": 18, "escritas": 0}, {"n": 19, "leituras": 19, "escritas": 0}, {"n": 20, "leituras": 20, "escritas": 0}, {"n": 21, "leituras": 21, "escritas": 0}, {"n": 22, "leituras": 22, "escritas": 0}, {"n": 23, "leituras": 23, "escritas": 0}, {"n": 24, "leituras": 24, "escritas": 0}, {"n": 25, "leituras": 25, "escritas": 0}, {"n": 26, "leituras": 26, "escritas": 0}, {"n": 27, "leituras": 27, "escritas": 0}, {"n": 28, "leituras": 28, "escritas": 0}, {"n": 29, "leituras": 29, "escritas": 0}, {"n": 30, "leituras": 30, "escritas": 0}, {"n": 31, "leituras": 31, "escritas": 0}, {"n": 32, "leituras": 32, "escritas": 0}, {"n": 33, "leituras": 33, "escritas": 0}, {"n": 34, "leituras": 34, "escritas": 0}, {"n": 35, "leituras": 35, "escritas": 0}, {"n": 36, "leituras": 36, "escritas": 0}, {"n": 37, "leituras": 37, "escritas": 0}, {"n": 38, "leituras": 38, "escritas": 0}, {"n": 39, "leituras": 39, "escritas": 0}, {"n": 40, "leituras": 40, "escritas": 0}, {"n": 41, "leituras": 41, "escritas": 0}, {"n": 42, "leituras": 42, "escritas": 0}, {"n": 43, "leituras": 43, "escritas": 0}, {"n": 44, "leituras": 44, "escritas": 0}, {"n": 45, "leituras": 45, "escritas": 0}, {"n": 46, "leituras": 46, "escritas": 0}, {"n": 47, "leituras": 47, "escritas": 0}, {"n": 48, "leituras": 48, "escritas": 0}, {"n": 49, "leituras": 49, "escritas": 0}, {"n": 50, "leituras": 50, "escritas": 0}, {"n": 51, "leituras": 51, "escritas": 0}, {"n": 52, "leituras": 52, "escritas": 0}, {"n": 53, "leituras": 53, "escritas": 0}, {"n": 54, "leituras": 54, "escritas": 0}, {"n": 55, "leituras": 55, "escritas": 0}, {"n": 56, "leituras": 56, "escritas": 0}, {"n": 57, "leituras": 57, "escritas": 0}, {"n": 58, "leituras": 58, "escritas": 0}, {"n": 59, "leituras": 59, "escritas": 0}, {"n": 60, "leituras": 60, "escritas": 0}]}, "por-matriz": {"estrutura": "matriz", "chamada": "por", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 0, "escritas": 2}, {"n": 100, "leituras": 0, "escritas": 2}, {"n": 1000, "leituras": 0, "escritas": 2}], "serie": [{"n": 8, "leituras": 0, "escritas": 2}, {"n": 9, "leituras": 0, "escritas": 2}, {"n": 10, "leituras": 0, "escritas": 2}, {"n": 11, "leituras": 0, "escritas": 2}, {"n": 12, "leituras": 0, "escritas": 2}, {"n": 13, "leituras": 0, "escritas": 2}, {"n": 14, "leituras": 0, "escritas": 2}, {"n": 15, "leituras": 0, "escritas": 2}, {"n": 16, "leituras": 0, "escritas": 2}, {"n": 17, "leituras": 0, "escritas": 2}, {"n": 18, "leituras": 0, "escritas": 2}, {"n": 19, "leituras": 0, "escritas": 2}, {"n": 20, "leituras": 0, "escritas": 2}, {"n": 21, "leituras": 0, "escritas": 2}, {"n": 22, "leituras": 0, "escritas": 2}, {"n": 23, "leituras": 0, "escritas": 2}, {"n": 24, "leituras": 0, "escritas": 2}, {"n": 25, "leituras": 0, "escritas": 2}, {"n": 26, "leituras": 0, "escritas": 2}, {"n": 27, "leituras": 0, "escritas": 2}, {"n": 28, "leituras": 0, "escritas": 2}, {"n": 29, "leituras": 0, "escritas": 2}, {"n": 30, "leituras": 0, "escritas": 2}, {"n": 31, "leituras": 0, "escritas": 2}, {"n": 32, "leituras": 0, "escritas": 2}, {"n": 33, "leituras": 0, "escritas": 2}, {"n": 34, "leituras": 0, "escritas": 2}, {"n": 35, "leituras": 0, "escritas": 2}, {"n": 36, "leituras": 0, "escritas": 2}, {"n": 37, "leituras": 0, "escritas": 2}, {"n": 38, "leituras": 0, "escritas": 2}, {"n": 39, "leituras": 0, "escritas": 2}, {"n": 40, "leituras": 0, "escritas": 2}, {"n": 41, "leituras": 0, "escritas": 2}, {"n": 42, "leituras": 0, "escritas": 2}, {"n": 43, "leituras": 0, "escritas": 2}, {"n": 44, "leituras": 0, "escritas": 2}, {"n": 45, "leituras": 0, "escritas": 2}, {"n": 46, "leituras": 0, "escritas": 2}, {"n": 47, "leituras": 0, "escritas": 2}, {"n": 48, "leituras": 0, "escritas": 2}, {"n": 49, "leituras": 0, "escritas": 2}, {"n": 50, "leituras": 0, "escritas": 2}, {"n": 51, "leituras": 0, "escritas": 2}, {"n": 52, "leituras": 0, "escritas": 2}, {"n": 53, "leituras": 0, "escritas": 2}, {"n": 54, "leituras": 0, "escritas": 2}, {"n": 55, "leituras": 0, "escritas": 2}, {"n": 56, "leituras": 0, "escritas": 2}, {"n": 57, "leituras": 0, "escritas": 2}, {"n": 58, "leituras": 0, "escritas": 2}, {"n": 59, "leituras": 0, "escritas": 2}, {"n": 60, "leituras": 0, "escritas": 2}]}, "tirar-matriz": {"estrutura": "matriz", "chamada": "tirar", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 0, "escritas": 2}, {"n": 100, "leituras": 0, "escritas": 2}, {"n": 1000, "leituras": 0, "escritas": 2}], "serie": [{"n": 8, "leituras": 0, "escritas": 2}, {"n": 9, "leituras": 0, "escritas": 2}, {"n": 10, "leituras": 0, "escritas": 2}, {"n": 11, "leituras": 0, "escritas": 2}, {"n": 12, "leituras": 0, "escritas": 2}, {"n": 13, "leituras": 0, "escritas": 2}, {"n": 14, "leituras": 0, "escritas": 2}, {"n": 15, "leituras": 0, "escritas": 2}, {"n": 16, "leituras": 0, "escritas": 2}, {"n": 17, "leituras": 0, "escritas": 2}, {"n": 18, "leituras": 0, "escritas": 2}, {"n": 19, "leituras": 0, "escritas": 2}, {"n": 20, "leituras": 0, "escritas": 2}, {"n": 21, "leituras": 0, "escritas": 2}, {"n": 22, "leituras": 0, "escritas": 2}, {"n": 23, "leituras": 0, "escritas": 2}, {"n": 24, "leituras": 0, "escritas": 2}, {"n": 25, "leituras": 0, "escritas": 2}, {"n": 26, "leituras": 0, "escritas": 2}, {"n": 27, "leituras": 0, "escritas": 2}, {"n": 28, "leituras": 0, "escritas": 2}, {"n": 29, "leituras": 0, "escritas": 2}, {"n": 30, "leituras": 0, "escritas": 2}, {"n": 31, "leituras": 0, "escritas": 2}, {"n": 32, "leituras": 0, "escritas": 2}, {"n": 33, "leituras": 0, "escritas": 2}, {"n": 34, "leituras": 0, "escritas": 2}, {"n": 35, "leituras": 0, "escritas": 2}, {"n": 36, "leituras": 0, "escritas": 2}, {"n": 37, "leituras": 0, "escritas": 2}, {"n": 38, "leituras": 0, "escritas": 2}, {"n": 39, "leituras": 0, "escritas": 2}, {"n": 40, "leituras": 0, "escritas": 2}, {"n": 41, "leituras": 0, "escritas": 2}, {"n": 42, "leituras": 0, "escritas": 2}, {"n": 43, "leituras": 0, "escritas": 2}, {"n": 44, "leituras": 0, "escritas": 2}, {"n": 45, "leituras": 0, "escritas": 2}, {"n": 46, "leituras": 0, "escritas": 2}, {"n": 47, "leituras": 0, "escritas": 2}, {"n": 48, "leituras": 0, "escritas": 2}, {"n": 49, "leituras": 0, "escritas": 2}, {"n": 50, "leituras": 0, "escritas": 2}, {"n": 51, "leituras": 0, "escritas": 2}, {"n": 52, "leituras": 0, "escritas": 2}, {"n": 53, "leituras": 0, "escritas": 2}, {"n": 54, "leituras": 0, "escritas": 2}, {"n": 55, "leituras": 0, "escritas": 2}, {"n": 56, "leituras": 0, "escritas": 2}, {"n": 57, "leituras": 0, "escritas": 2}, {"n": 58, "leituras": 0, "escritas": 2}, {"n": 59, "leituras": 0, "escritas": 2}, {"n": 60, "leituras": 0, "escritas": 2}]}, "existe-lista": {"estrutura": "lista", "chamada": "existe", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 6, "escritas": 0}, {"n": 100, "leituras": 6, "escritas": 0}, {"n": 1000, "leituras": 6, "escritas": 0}], "serie": [{"n": 8, "leituras": 6, "escritas": 0}, {"n": 9, "leituras": 6, "escritas": 0}, {"n": 10, "leituras": 6, "escritas": 0}, {"n": 11, "leituras": 6, "escritas": 0}, {"n": 12, "leituras": 6, "escritas": 0}, {"n": 13, "leituras": 6, "escritas": 0}, {"n": 14, "leituras": 6, "escritas": 0}, {"n": 15, "leituras": 6, "escritas": 0}, {"n": 16, "leituras": 6, "escritas": 0}, {"n": 17, "leituras": 6, "escritas": 0}, {"n": 18, "leituras": 6, "escritas": 0}, {"n": 19, "leituras": 6, "escritas": 0}, {"n": 20, "leituras": 6, "escritas": 0}, {"n": 21, "leituras": 6, "escritas": 0}, {"n": 22, "leituras": 6, "escritas": 0}, {"n": 23, "leituras": 6, "escritas": 0}, {"n": 24, "leituras": 6, "escritas": 0}, {"n": 25, "leituras": 6, "escritas": 0}, {"n": 26, "leituras": 6, "escritas": 0}, {"n": 27, "leituras": 6, "escritas": 0}, {"n": 28, "leituras": 6, "escritas": 0}, {"n": 29, "leituras": 6, "escritas": 0}, {"n": 30, "leituras": 6, "escritas": 0}, {"n": 31, "leituras": 6, "escritas": 0}, {"n": 32, "leituras": 6, "escritas": 0}, {"n": 33, "leituras": 6, "escritas": 0}, {"n": 34, "leituras": 6, "escritas": 0}, {"n": 35, "leituras": 6, "escritas": 0}, {"n": 36, "leituras": 6, "escritas": 0}, {"n": 37, "leituras": 6, "escritas": 0}, {"n": 38, "leituras": 6, "escritas": 0}, {"n": 39, "leituras": 6, "escritas": 0}, {"n": 40, "leituras": 6, "escritas": 0}, {"n": 41, "leituras": 6, "escritas": 0}, {"n": 42, "leituras": 6, "escritas": 0}, {"n": 43, "leituras": 6, "escritas": 0}, {"n": 44, "leituras": 6, "escritas": 0}, {"n": 45, "leituras": 6, "escritas": 0}, {"n": 46, "leituras": 6, "escritas": 0}, {"n": 47, "leituras": 6, "escritas": 0}, {"n": 48, "leituras": 6, "escritas": 0}, {"n": 49, "leituras": 6, "escritas": 0}, {"n": 50, "leituras": 6, "escritas": 0}, {"n": 51, "leituras": 6, "escritas": 0}, {"n": 52, "leituras": 6, "escritas": 0}, {"n": 53, "leituras": 6, "escritas": 0}, {"n": 54, "leituras": 6, "escritas": 0}, {"n": 55, "leituras": 6, "escritas": 0}, {"n": 56, "leituras": 6, "escritas": 0}, {"n": 57, "leituras": 6, "escritas": 0}, {"n": 58, "leituras": 6, "escritas": 0}, {"n": 59, "leituras": 6, "escritas": 0}, {"n": 60, "leituras": 6, "escritas": 0}]}, "vizinhos-lista": {"estrutura": "lista", "chamada": "vizinhos", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 6, "escritas": 0}, {"n": 100, "leituras": 6, "escritas": 0}, {"n": 1000, "leituras": 6, "escritas": 0}], "serie": [{"n": 8, "leituras": 6, "escritas": 0}, {"n": 9, "leituras": 6, "escritas": 0}, {"n": 10, "leituras": 6, "escritas": 0}, {"n": 11, "leituras": 6, "escritas": 0}, {"n": 12, "leituras": 6, "escritas": 0}, {"n": 13, "leituras": 6, "escritas": 0}, {"n": 14, "leituras": 6, "escritas": 0}, {"n": 15, "leituras": 6, "escritas": 0}, {"n": 16, "leituras": 6, "escritas": 0}, {"n": 17, "leituras": 6, "escritas": 0}, {"n": 18, "leituras": 6, "escritas": 0}, {"n": 19, "leituras": 6, "escritas": 0}, {"n": 20, "leituras": 6, "escritas": 0}, {"n": 21, "leituras": 6, "escritas": 0}, {"n": 22, "leituras": 6, "escritas": 0}, {"n": 23, "leituras": 6, "escritas": 0}, {"n": 24, "leituras": 6, "escritas": 0}, {"n": 25, "leituras": 6, "escritas": 0}, {"n": 26, "leituras": 6, "escritas": 0}, {"n": 27, "leituras": 6, "escritas": 0}, {"n": 28, "leituras": 6, "escritas": 0}, {"n": 29, "leituras": 6, "escritas": 0}, {"n": 30, "leituras": 6, "escritas": 0}, {"n": 31, "leituras": 6, "escritas": 0}, {"n": 32, "leituras": 6, "escritas": 0}, {"n": 33, "leituras": 6, "escritas": 0}, {"n": 34, "leituras": 6, "escritas": 0}, {"n": 35, "leituras": 6, "escritas": 0}, {"n": 36, "leituras": 6, "escritas": 0}, {"n": 37, "leituras": 6, "escritas": 0}, {"n": 38, "leituras": 6, "escritas": 0}, {"n": 39, "leituras": 6, "escritas": 0}, {"n": 40, "leituras": 6, "escritas": 0}, {"n": 41, "leituras": 6, "escritas": 0}, {"n": 42, "leituras": 6, "escritas": 0}, {"n": 43, "leituras": 6, "escritas": 0}, {"n": 44, "leituras": 6, "escritas": 0}, {"n": 45, "leituras": 6, "escritas": 0}, {"n": 46, "leituras": 6, "escritas": 0}, {"n": 47, "leituras": 6, "escritas": 0}, {"n": 48, "leituras": 6, "escritas": 0}, {"n": 49, "leituras": 6, "escritas": 0}, {"n": 50, "leituras": 6, "escritas": 0}, {"n": 51, "leituras": 6, "escritas": 0}, {"n": 52, "leituras": 6, "escritas": 0}, {"n": 53, "leituras": 6, "escritas": 0}, {"n": 54, "leituras": 6, "escritas": 0}, {"n": 55, "leituras": 6, "escritas": 0}, {"n": 56, "leituras": 6, "escritas": 0}, {"n": 57, "leituras": 6, "escritas": 0}, {"n": 58, "leituras": 6, "escritas": 0}, {"n": 59, "leituras": 6, "escritas": 0}, {"n": 60, "leituras": 6, "escritas": 0}]}, "grau-lista": {"estrutura": "lista", "chamada": "grau", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 0, "escritas": 0}, {"n": 100, "leituras": 0, "escritas": 0}, {"n": 1000, "leituras": 0, "escritas": 0}], "serie": [{"n": 8, "leituras": 0, "escritas": 0}, {"n": 9, "leituras": 0, "escritas": 0}, {"n": 10, "leituras": 0, "escritas": 0}, {"n": 11, "leituras": 0, "escritas": 0}, {"n": 12, "leituras": 0, "escritas": 0}, {"n": 13, "leituras": 0, "escritas": 0}, {"n": 14, "leituras": 0, "escritas": 0}, {"n": 15, "leituras": 0, "escritas": 0}, {"n": 16, "leituras": 0, "escritas": 0}, {"n": 17, "leituras": 0, "escritas": 0}, {"n": 18, "leituras": 0, "escritas": 0}, {"n": 19, "leituras": 0, "escritas": 0}, {"n": 20, "leituras": 0, "escritas": 0}, {"n": 21, "leituras": 0, "escritas": 0}, {"n": 22, "leituras": 0, "escritas": 0}, {"n": 23, "leituras": 0, "escritas": 0}, {"n": 24, "leituras": 0, "escritas": 0}, {"n": 25, "leituras": 0, "escritas": 0}, {"n": 26, "leituras": 0, "escritas": 0}, {"n": 27, "leituras": 0, "escritas": 0}, {"n": 28, "leituras": 0, "escritas": 0}, {"n": 29, "leituras": 0, "escritas": 0}, {"n": 30, "leituras": 0, "escritas": 0}, {"n": 31, "leituras": 0, "escritas": 0}, {"n": 32, "leituras": 0, "escritas": 0}, {"n": 33, "leituras": 0, "escritas": 0}, {"n": 34, "leituras": 0, "escritas": 0}, {"n": 35, "leituras": 0, "escritas": 0}, {"n": 36, "leituras": 0, "escritas": 0}, {"n": 37, "leituras": 0, "escritas": 0}, {"n": 38, "leituras": 0, "escritas": 0}, {"n": 39, "leituras": 0, "escritas": 0}, {"n": 40, "leituras": 0, "escritas": 0}, {"n": 41, "leituras": 0, "escritas": 0}, {"n": 42, "leituras": 0, "escritas": 0}, {"n": 43, "leituras": 0, "escritas": 0}, {"n": 44, "leituras": 0, "escritas": 0}, {"n": 45, "leituras": 0, "escritas": 0}, {"n": 46, "leituras": 0, "escritas": 0}, {"n": 47, "leituras": 0, "escritas": 0}, {"n": 48, "leituras": 0, "escritas": 0}, {"n": 49, "leituras": 0, "escritas": 0}, {"n": 50, "leituras": 0, "escritas": 0}, {"n": 51, "leituras": 0, "escritas": 0}, {"n": 52, "leituras": 0, "escritas": 0}, {"n": 53, "leituras": 0, "escritas": 0}, {"n": 54, "leituras": 0, "escritas": 0}, {"n": 55, "leituras": 0, "escritas": 0}, {"n": 56, "leituras": 0, "escritas": 0}, {"n": 57, "leituras": 0, "escritas": 0}, {"n": 58, "leituras": 0, "escritas": 0}, {"n": 59, "leituras": 0, "escritas": 0}, {"n": 60, "leituras": 0, "escritas": 0}]}, "por-lista": {"estrutura": "lista", "chamada": "por", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 0, "escritas": 2}, {"n": 100, "leituras": 0, "escritas": 2}, {"n": 1000, "leituras": 0, "escritas": 2}], "serie": [{"n": 8, "leituras": 0, "escritas": 2}, {"n": 9, "leituras": 0, "escritas": 2}, {"n": 10, "leituras": 0, "escritas": 2}, {"n": 11, "leituras": 0, "escritas": 2}, {"n": 12, "leituras": 0, "escritas": 2}, {"n": 13, "leituras": 0, "escritas": 2}, {"n": 14, "leituras": 0, "escritas": 2}, {"n": 15, "leituras": 0, "escritas": 2}, {"n": 16, "leituras": 0, "escritas": 2}, {"n": 17, "leituras": 0, "escritas": 2}, {"n": 18, "leituras": 0, "escritas": 2}, {"n": 19, "leituras": 0, "escritas": 2}, {"n": 20, "leituras": 0, "escritas": 2}, {"n": 21, "leituras": 0, "escritas": 2}, {"n": 22, "leituras": 0, "escritas": 2}, {"n": 23, "leituras": 0, "escritas": 2}, {"n": 24, "leituras": 0, "escritas": 2}, {"n": 25, "leituras": 0, "escritas": 2}, {"n": 26, "leituras": 0, "escritas": 2}, {"n": 27, "leituras": 0, "escritas": 2}, {"n": 28, "leituras": 0, "escritas": 2}, {"n": 29, "leituras": 0, "escritas": 2}, {"n": 30, "leituras": 0, "escritas": 2}, {"n": 31, "leituras": 0, "escritas": 2}, {"n": 32, "leituras": 0, "escritas": 2}, {"n": 33, "leituras": 0, "escritas": 2}, {"n": 34, "leituras": 0, "escritas": 2}, {"n": 35, "leituras": 0, "escritas": 2}, {"n": 36, "leituras": 0, "escritas": 2}, {"n": 37, "leituras": 0, "escritas": 2}, {"n": 38, "leituras": 0, "escritas": 2}, {"n": 39, "leituras": 0, "escritas": 2}, {"n": 40, "leituras": 0, "escritas": 2}, {"n": 41, "leituras": 0, "escritas": 2}, {"n": 42, "leituras": 0, "escritas": 2}, {"n": 43, "leituras": 0, "escritas": 2}, {"n": 44, "leituras": 0, "escritas": 2}, {"n": 45, "leituras": 0, "escritas": 2}, {"n": 46, "leituras": 0, "escritas": 2}, {"n": 47, "leituras": 0, "escritas": 2}, {"n": 48, "leituras": 0, "escritas": 2}, {"n": 49, "leituras": 0, "escritas": 2}, {"n": 50, "leituras": 0, "escritas": 2}, {"n": 51, "leituras": 0, "escritas": 2}, {"n": 52, "leituras": 0, "escritas": 2}, {"n": 53, "leituras": 0, "escritas": 2}, {"n": 54, "leituras": 0, "escritas": 2}, {"n": 55, "leituras": 0, "escritas": 2}, {"n": 56, "leituras": 0, "escritas": 2}, {"n": 57, "leituras": 0, "escritas": 2}, {"n": 58, "leituras": 0, "escritas": 2}, {"n": 59, "leituras": 0, "escritas": 2}, {"n": 60, "leituras": 0, "escritas": 2}]}, "tirar-lista": {"estrutura": "lista", "chamada": "tirar", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 14, "escritas": 10}, {"n": 100, "leituras": 14, "escritas": 10}, {"n": 1000, "leituras": 14, "escritas": 10}], "serie": [{"n": 8, "leituras": 14, "escritas": 10}, {"n": 9, "leituras": 14, "escritas": 10}, {"n": 10, "leituras": 14, "escritas": 10}, {"n": 11, "leituras": 14, "escritas": 10}, {"n": 12, "leituras": 14, "escritas": 10}, {"n": 13, "leituras": 14, "escritas": 10}, {"n": 14, "leituras": 14, "escritas": 10}, {"n": 15, "leituras": 14, "escritas": 10}, {"n": 16, "leituras": 14, "escritas": 10}, {"n": 17, "leituras": 14, "escritas": 10}, {"n": 18, "leituras": 14, "escritas": 10}, {"n": 19, "leituras": 14, "escritas": 10}, {"n": 20, "leituras": 14, "escritas": 10}, {"n": 21, "leituras": 14, "escritas": 10}, {"n": 22, "leituras": 14, "escritas": 10}, {"n": 23, "leituras": 14, "escritas": 10}, {"n": 24, "leituras": 14, "escritas": 10}, {"n": 25, "leituras": 14, "escritas": 10}, {"n": 26, "leituras": 14, "escritas": 10}, {"n": 27, "leituras": 14, "escritas": 10}, {"n": 28, "leituras": 14, "escritas": 10}, {"n": 29, "leituras": 14, "escritas": 10}, {"n": 30, "leituras": 14, "escritas": 10}, {"n": 31, "leituras": 14, "escritas": 10}, {"n": 32, "leituras": 14, "escritas": 10}, {"n": 33, "leituras": 14, "escritas": 10}, {"n": 34, "leituras": 14, "escritas": 10}, {"n": 35, "leituras": 14, "escritas": 10}, {"n": 36, "leituras": 14, "escritas": 10}, {"n": 37, "leituras": 14, "escritas": 10}, {"n": 38, "leituras": 14, "escritas": 10}, {"n": 39, "leituras": 14, "escritas": 10}, {"n": 40, "leituras": 14, "escritas": 10}, {"n": 41, "leituras": 14, "escritas": 10}, {"n": 42, "leituras": 14, "escritas": 10}, {"n": 43, "leituras": 14, "escritas": 10}, {"n": 44, "leituras": 14, "escritas": 10}, {"n": 45, "leituras": 14, "escritas": 10}, {"n": 46, "leituras": 14, "escritas": 10}, {"n": 47, "leituras": 14, "escritas": 10}, {"n": 48, "leituras": 14, "escritas": 10}, {"n": 49, "leituras": 14, "escritas": 10}, {"n": 50, "leituras": 14, "escritas": 10}, {"n": 51, "leituras": 14, "escritas": 10}, {"n": 52, "leituras": 14, "escritas": 10}, {"n": 53, "leituras": 14, "escritas": 10}, {"n": 54, "leituras": 14, "escritas": 10}, {"n": 55, "leituras": 14, "escritas": 10}, {"n": 56, "leituras": 14, "escritas": 10}, {"n": 57, "leituras": 14, "escritas": 10}, {"n": 58, "leituras": 14, "escritas": 10}, {"n": 59, "leituras": 14, "escritas": 10}, {"n": 60, "leituras": 14, "escritas": 10}]}, "existe-incidencia": {"estrutura": "incidencia", "chamada": "existe", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 36, "escritas": 0}, {"n": 100, "leituras": 306, "escritas": 0}, {"n": 1000, "leituras": 3006, "escritas": 0}], "serie": [{"n": 8, "leituras": 30, "escritas": 0}, {"n": 9, "leituras": 33, "escritas": 0}, {"n": 10, "leituras": 36, "escritas": 0}, {"n": 11, "leituras": 39, "escritas": 0}, {"n": 12, "leituras": 42, "escritas": 0}, {"n": 13, "leituras": 45, "escritas": 0}, {"n": 14, "leituras": 48, "escritas": 0}, {"n": 15, "leituras": 51, "escritas": 0}, {"n": 16, "leituras": 54, "escritas": 0}, {"n": 17, "leituras": 57, "escritas": 0}, {"n": 18, "leituras": 60, "escritas": 0}, {"n": 19, "leituras": 63, "escritas": 0}, {"n": 20, "leituras": 66, "escritas": 0}, {"n": 21, "leituras": 69, "escritas": 0}, {"n": 22, "leituras": 72, "escritas": 0}, {"n": 23, "leituras": 75, "escritas": 0}, {"n": 24, "leituras": 78, "escritas": 0}, {"n": 25, "leituras": 81, "escritas": 0}, {"n": 26, "leituras": 84, "escritas": 0}, {"n": 27, "leituras": 87, "escritas": 0}, {"n": 28, "leituras": 90, "escritas": 0}, {"n": 29, "leituras": 93, "escritas": 0}, {"n": 30, "leituras": 96, "escritas": 0}, {"n": 31, "leituras": 99, "escritas": 0}, {"n": 32, "leituras": 102, "escritas": 0}, {"n": 33, "leituras": 105, "escritas": 0}, {"n": 34, "leituras": 108, "escritas": 0}, {"n": 35, "leituras": 111, "escritas": 0}, {"n": 36, "leituras": 114, "escritas": 0}, {"n": 37, "leituras": 117, "escritas": 0}, {"n": 38, "leituras": 120, "escritas": 0}, {"n": 39, "leituras": 123, "escritas": 0}, {"n": 40, "leituras": 126, "escritas": 0}, {"n": 41, "leituras": 129, "escritas": 0}, {"n": 42, "leituras": 132, "escritas": 0}, {"n": 43, "leituras": 135, "escritas": 0}, {"n": 44, "leituras": 138, "escritas": 0}, {"n": 45, "leituras": 141, "escritas": 0}, {"n": 46, "leituras": 144, "escritas": 0}, {"n": 47, "leituras": 147, "escritas": 0}, {"n": 48, "leituras": 150, "escritas": 0}, {"n": 49, "leituras": 153, "escritas": 0}, {"n": 50, "leituras": 156, "escritas": 0}, {"n": 51, "leituras": 159, "escritas": 0}, {"n": 52, "leituras": 162, "escritas": 0}, {"n": 53, "leituras": 165, "escritas": 0}, {"n": 54, "leituras": 168, "escritas": 0}, {"n": 55, "leituras": 171, "escritas": 0}, {"n": 56, "leituras": 174, "escritas": 0}, {"n": 57, "leituras": 177, "escritas": 0}, {"n": 58, "leituras": 180, "escritas": 0}, {"n": 59, "leituras": 183, "escritas": 0}, {"n": 60, "leituras": 186, "escritas": 0}]}, "vizinhos-incidencia": {"estrutura": "incidencia", "chamada": "vizinhos", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 60, "escritas": 0}, {"n": 100, "leituras": 600, "escritas": 0}, {"n": 1000, "leituras": 6000, "escritas": 0}], "serie": [{"n": 8, "leituras": 48, "escritas": 0}, {"n": 9, "leituras": 54, "escritas": 0}, {"n": 10, "leituras": 60, "escritas": 0}, {"n": 11, "leituras": 66, "escritas": 0}, {"n": 12, "leituras": 72, "escritas": 0}, {"n": 13, "leituras": 78, "escritas": 0}, {"n": 14, "leituras": 84, "escritas": 0}, {"n": 15, "leituras": 90, "escritas": 0}, {"n": 16, "leituras": 96, "escritas": 0}, {"n": 17, "leituras": 102, "escritas": 0}, {"n": 18, "leituras": 108, "escritas": 0}, {"n": 19, "leituras": 114, "escritas": 0}, {"n": 20, "leituras": 120, "escritas": 0}, {"n": 21, "leituras": 126, "escritas": 0}, {"n": 22, "leituras": 132, "escritas": 0}, {"n": 23, "leituras": 138, "escritas": 0}, {"n": 24, "leituras": 144, "escritas": 0}, {"n": 25, "leituras": 150, "escritas": 0}, {"n": 26, "leituras": 156, "escritas": 0}, {"n": 27, "leituras": 162, "escritas": 0}, {"n": 28, "leituras": 168, "escritas": 0}, {"n": 29, "leituras": 174, "escritas": 0}, {"n": 30, "leituras": 180, "escritas": 0}, {"n": 31, "leituras": 186, "escritas": 0}, {"n": 32, "leituras": 192, "escritas": 0}, {"n": 33, "leituras": 198, "escritas": 0}, {"n": 34, "leituras": 204, "escritas": 0}, {"n": 35, "leituras": 210, "escritas": 0}, {"n": 36, "leituras": 216, "escritas": 0}, {"n": 37, "leituras": 222, "escritas": 0}, {"n": 38, "leituras": 228, "escritas": 0}, {"n": 39, "leituras": 234, "escritas": 0}, {"n": 40, "leituras": 240, "escritas": 0}, {"n": 41, "leituras": 246, "escritas": 0}, {"n": 42, "leituras": 252, "escritas": 0}, {"n": 43, "leituras": 258, "escritas": 0}, {"n": 44, "leituras": 264, "escritas": 0}, {"n": 45, "leituras": 270, "escritas": 0}, {"n": 46, "leituras": 276, "escritas": 0}, {"n": 47, "leituras": 282, "escritas": 0}, {"n": 48, "leituras": 288, "escritas": 0}, {"n": 49, "leituras": 294, "escritas": 0}, {"n": 50, "leituras": 300, "escritas": 0}, {"n": 51, "leituras": 306, "escritas": 0}, {"n": 52, "leituras": 312, "escritas": 0}, {"n": 53, "leituras": 318, "escritas": 0}, {"n": 54, "leituras": 324, "escritas": 0}, {"n": 55, "leituras": 330, "escritas": 0}, {"n": 56, "leituras": 336, "escritas": 0}, {"n": 57, "leituras": 342, "escritas": 0}, {"n": 58, "leituras": 348, "escritas": 0}, {"n": 59, "leituras": 354, "escritas": 0}, {"n": 60, "leituras": 360, "escritas": 0}]}, "grau-incidencia": {"estrutura": "incidencia", "chamada": "grau", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 30, "escritas": 0}, {"n": 100, "leituras": 300, "escritas": 0}, {"n": 1000, "leituras": 3000, "escritas": 0}], "serie": [{"n": 8, "leituras": 24, "escritas": 0}, {"n": 9, "leituras": 27, "escritas": 0}, {"n": 10, "leituras": 30, "escritas": 0}, {"n": 11, "leituras": 33, "escritas": 0}, {"n": 12, "leituras": 36, "escritas": 0}, {"n": 13, "leituras": 39, "escritas": 0}, {"n": 14, "leituras": 42, "escritas": 0}, {"n": 15, "leituras": 45, "escritas": 0}, {"n": 16, "leituras": 48, "escritas": 0}, {"n": 17, "leituras": 51, "escritas": 0}, {"n": 18, "leituras": 54, "escritas": 0}, {"n": 19, "leituras": 57, "escritas": 0}, {"n": 20, "leituras": 60, "escritas": 0}, {"n": 21, "leituras": 63, "escritas": 0}, {"n": 22, "leituras": 66, "escritas": 0}, {"n": 23, "leituras": 69, "escritas": 0}, {"n": 24, "leituras": 72, "escritas": 0}, {"n": 25, "leituras": 75, "escritas": 0}, {"n": 26, "leituras": 78, "escritas": 0}, {"n": 27, "leituras": 81, "escritas": 0}, {"n": 28, "leituras": 84, "escritas": 0}, {"n": 29, "leituras": 87, "escritas": 0}, {"n": 30, "leituras": 90, "escritas": 0}, {"n": 31, "leituras": 93, "escritas": 0}, {"n": 32, "leituras": 96, "escritas": 0}, {"n": 33, "leituras": 99, "escritas": 0}, {"n": 34, "leituras": 102, "escritas": 0}, {"n": 35, "leituras": 105, "escritas": 0}, {"n": 36, "leituras": 108, "escritas": 0}, {"n": 37, "leituras": 111, "escritas": 0}, {"n": 38, "leituras": 114, "escritas": 0}, {"n": 39, "leituras": 117, "escritas": 0}, {"n": 40, "leituras": 120, "escritas": 0}, {"n": 41, "leituras": 123, "escritas": 0}, {"n": 42, "leituras": 126, "escritas": 0}, {"n": 43, "leituras": 129, "escritas": 0}, {"n": 44, "leituras": 132, "escritas": 0}, {"n": 45, "leituras": 135, "escritas": 0}, {"n": 46, "leituras": 138, "escritas": 0}, {"n": 47, "leituras": 141, "escritas": 0}, {"n": 48, "leituras": 144, "escritas": 0}, {"n": 49, "leituras": 147, "escritas": 0}, {"n": 50, "leituras": 150, "escritas": 0}, {"n": 51, "leituras": 153, "escritas": 0}, {"n": 52, "leituras": 156, "escritas": 0}, {"n": 53, "leituras": 159, "escritas": 0}, {"n": 54, "leituras": 162, "escritas": 0}, {"n": 55, "leituras": 165, "escritas": 0}, {"n": 56, "leituras": 168, "escritas": 0}, {"n": 57, "leituras": 171, "escritas": 0}, {"n": 58, "leituras": 174, "escritas": 0}, {"n": 59, "leituras": 177, "escritas": 0}, {"n": 60, "leituras": 180, "escritas": 0}]}, "por-incidencia": {"estrutura": "incidencia", "chamada": "por", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 0, "escritas": 10}, {"n": 100, "leituras": 0, "escritas": 100}, {"n": 1000, "leituras": 0, "escritas": 1000}], "serie": [{"n": 8, "leituras": 0, "escritas": 8}, {"n": 9, "leituras": 0, "escritas": 9}, {"n": 10, "leituras": 0, "escritas": 10}, {"n": 11, "leituras": 0, "escritas": 11}, {"n": 12, "leituras": 0, "escritas": 12}, {"n": 13, "leituras": 0, "escritas": 13}, {"n": 14, "leituras": 0, "escritas": 14}, {"n": 15, "leituras": 0, "escritas": 15}, {"n": 16, "leituras": 0, "escritas": 16}, {"n": 17, "leituras": 0, "escritas": 17}, {"n": 18, "leituras": 0, "escritas": 18}, {"n": 19, "leituras": 0, "escritas": 19}, {"n": 20, "leituras": 0, "escritas": 20}, {"n": 21, "leituras": 0, "escritas": 21}, {"n": 22, "leituras": 0, "escritas": 22}, {"n": 23, "leituras": 0, "escritas": 23}, {"n": 24, "leituras": 0, "escritas": 24}, {"n": 25, "leituras": 0, "escritas": 25}, {"n": 26, "leituras": 0, "escritas": 26}, {"n": 27, "leituras": 0, "escritas": 27}, {"n": 28, "leituras": 0, "escritas": 28}, {"n": 29, "leituras": 0, "escritas": 29}, {"n": 30, "leituras": 0, "escritas": 30}, {"n": 31, "leituras": 0, "escritas": 31}, {"n": 32, "leituras": 0, "escritas": 32}, {"n": 33, "leituras": 0, "escritas": 33}, {"n": 34, "leituras": 0, "escritas": 34}, {"n": 35, "leituras": 0, "escritas": 35}, {"n": 36, "leituras": 0, "escritas": 36}, {"n": 37, "leituras": 0, "escritas": 37}, {"n": 38, "leituras": 0, "escritas": 38}, {"n": 39, "leituras": 0, "escritas": 39}, {"n": 40, "leituras": 0, "escritas": 40}, {"n": 41, "leituras": 0, "escritas": 41}, {"n": 42, "leituras": 0, "escritas": 42}, {"n": 43, "leituras": 0, "escritas": 43}, {"n": 44, "leituras": 0, "escritas": 44}, {"n": 45, "leituras": 0, "escritas": 45}, {"n": 46, "leituras": 0, "escritas": 46}, {"n": 47, "leituras": 0, "escritas": 47}, {"n": 48, "leituras": 0, "escritas": 48}, {"n": 49, "leituras": 0, "escritas": 49}, {"n": 50, "leituras": 0, "escritas": 50}, {"n": 51, "leituras": 0, "escritas": 51}, {"n": 52, "leituras": 0, "escritas": 52}, {"n": 53, "leituras": 0, "escritas": 53}, {"n": 54, "leituras": 0, "escritas": 54}, {"n": 55, "leituras": 0, "escritas": 55}, {"n": 56, "leituras": 0, "escritas": 56}, {"n": 57, "leituras": 0, "escritas": 57}, {"n": 58, "leituras": 0, "escritas": 58}, {"n": 59, "leituras": 0, "escritas": 59}, {"n": 60, "leituras": 0, "escritas": 60}]}, "tirar-incidencia": {"estrutura": "incidencia", "chamada": "tirar", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 12, "escritas": 10}, {"n": 100, "leituras": 102, "escritas": 100}, {"n": 1000, "leituras": 1002, "escritas": 1000}], "serie": [{"n": 8, "leituras": 10, "escritas": 8}, {"n": 9, "leituras": 11, "escritas": 9}, {"n": 10, "leituras": 12, "escritas": 10}, {"n": 11, "leituras": 13, "escritas": 11}, {"n": 12, "leituras": 14, "escritas": 12}, {"n": 13, "leituras": 15, "escritas": 13}, {"n": 14, "leituras": 16, "escritas": 14}, {"n": 15, "leituras": 17, "escritas": 15}, {"n": 16, "leituras": 18, "escritas": 16}, {"n": 17, "leituras": 19, "escritas": 17}, {"n": 18, "leituras": 20, "escritas": 18}, {"n": 19, "leituras": 21, "escritas": 19}, {"n": 20, "leituras": 22, "escritas": 20}, {"n": 21, "leituras": 23, "escritas": 21}, {"n": 22, "leituras": 24, "escritas": 22}, {"n": 23, "leituras": 25, "escritas": 23}, {"n": 24, "leituras": 26, "escritas": 24}, {"n": 25, "leituras": 27, "escritas": 25}, {"n": 26, "leituras": 28, "escritas": 26}, {"n": 27, "leituras": 29, "escritas": 27}, {"n": 28, "leituras": 30, "escritas": 28}, {"n": 29, "leituras": 31, "escritas": 29}, {"n": 30, "leituras": 32, "escritas": 30}, {"n": 31, "leituras": 33, "escritas": 31}, {"n": 32, "leituras": 34, "escritas": 32}, {"n": 33, "leituras": 35, "escritas": 33}, {"n": 34, "leituras": 36, "escritas": 34}, {"n": 35, "leituras": 37, "escritas": 35}, {"n": 36, "leituras": 38, "escritas": 36}, {"n": 37, "leituras": 39, "escritas": 37}, {"n": 38, "leituras": 40, "escritas": 38}, {"n": 39, "leituras": 41, "escritas": 39}, {"n": 40, "leituras": 42, "escritas": 40}, {"n": 41, "leituras": 43, "escritas": 41}, {"n": 42, "leituras": 44, "escritas": 42}, {"n": 43, "leituras": 45, "escritas": 43}, {"n": 44, "leituras": 46, "escritas": 44}, {"n": 45, "leituras": 47, "escritas": 45}, {"n": 46, "leituras": 48, "escritas": 46}, {"n": 47, "leituras": 49, "escritas": 47}, {"n": 48, "leituras": 50, "escritas": 48}, {"n": 49, "leituras": 51, "escritas": 49}, {"n": 50, "leituras": 52, "escritas": 50}, {"n": 51, "leituras": 53, "escritas": 51}, {"n": 52, "leituras": 54, "escritas": 52}, {"n": 53, "leituras": 55, "escritas": 53}, {"n": 54, "leituras": 56, "escritas": 54}, {"n": 55, "leituras": 57, "escritas": 55}, {"n": 56, "leituras": 58, "escritas": 56}, {"n": 57, "leituras": 59, "escritas": 57}, {"n": 58, "leituras": 60, "escritas": 58}, {"n": 59, "leituras": 61, "escritas": 59}, {"n": 60, "leituras": 62, "escritas": 60}]}}, "capacidade": {"matriz": [{"n": 0, "casas": 0}, {"n": 1, "casas": 1}, {"n": 2, "casas": 4}, {"n": 3, "casas": 9}, {"n": 4, "casas": 16}, {"n": 5, "casas": 25}, {"n": 6, "casas": 36}, {"n": 7, "casas": 49}, {"n": 8, "casas": 64}, {"n": 9, "casas": 81}, {"n": 10, "casas": 100}, {"n": 11, "casas": 121}, {"n": 12, "casas": 144}, {"n": 13, "casas": 169}, {"n": 14, "casas": 196}, {"n": 15, "casas": 225}, {"n": 16, "casas": 256}, {"n": 17, "casas": 289}, {"n": 18, "casas": 324}, {"n": 19, "casas": 361}, {"n": 20, "casas": 400}, {"n": 21, "casas": 441}, {"n": 22, "casas": 484}, {"n": 23, "casas": 529}, {"n": 24, "casas": 576}, {"n": 25, "casas": 625}, {"n": 26, "casas": 676}, {"n": 27, "casas": 729}, {"n": 28, "casas": 784}, {"n": 29, "casas": 841}, {"n": 30, "casas": 900}, {"n": 31, "casas": 961}, {"n": 32, "casas": 1024}, {"n": 33, "casas": 1089}, {"n": 34, "casas": 1156}, {"n": 35, "casas": 1225}, {"n": 36, "casas": 1296}, {"n": 37, "casas": 1369}, {"n": 38, "casas": 1444}, {"n": 39, "casas": 1521}, {"n": 40, "casas": 1600}, {"n": 41, "casas": 1681}, {"n": 42, "casas": 1764}, {"n": 43, "casas": 1849}, {"n": 44, "casas": 1936}, {"n": 45, "casas": 2025}, {"n": 46, "casas": 2116}, {"n": 47, "casas": 2209}, {"n": 48, "casas": 2304}, {"n": 49, "casas": 2401}, {"n": 50, "casas": 2500}, {"n": 51, "casas": 2601}, {"n": 52, "casas": 2704}, {"n": 53, "casas": 2809}, {"n": 54, "casas": 2916}, {"n": 55, "casas": 3025}, {"n": 56, "casas": 3136}, {"n": 57, "casas": 3249}, {"n": 58, "casas": 3364}, {"n": 59, "casas": 3481}, {"n": 60, "casas": 3600}], "lista": [{"n": 0, "casas": 0}, {"n": 1, "casas": 2}, {"n": 2, "casas": 4}, {"n": 3, "casas": 9}, {"n": 4, "casas": 20}, {"n": 5, "casas": 25}, {"n": 6, "casas": 54}, {"n": 7, "casas": 63}, {"n": 8, "casas": 72}, {"n": 9, "casas": 81}, {"n": 10, "casas": 90}, {"n": 11, "casas": 99}, {"n": 12, "casas": 108}, {"n": 13, "casas": 117}, {"n": 14, "casas": 126}, {"n": 15, "casas": 135}, {"n": 16, "casas": 144}, {"n": 17, "casas": 153}, {"n": 18, "casas": 162}, {"n": 19, "casas": 171}, {"n": 20, "casas": 180}, {"n": 21, "casas": 189}, {"n": 22, "casas": 198}, {"n": 23, "casas": 207}, {"n": 24, "casas": 216}, {"n": 25, "casas": 225}, {"n": 26, "casas": 234}, {"n": 27, "casas": 243}, {"n": 28, "casas": 252}, {"n": 29, "casas": 261}, {"n": 30, "casas": 270}, {"n": 31, "casas": 279}, {"n": 32, "casas": 288}, {"n": 33, "casas": 297}, {"n": 34, "casas": 306}, {"n": 35, "casas": 315}, {"n": 36, "casas": 324}, {"n": 37, "casas": 333}, {"n": 38, "casas": 342}, {"n": 39, "casas": 351}, {"n": 40, "casas": 360}, {"n": 41, "casas": 369}, {"n": 42, "casas": 378}, {"n": 43, "casas": 387}, {"n": 44, "casas": 396}, {"n": 45, "casas": 405}, {"n": 46, "casas": 414}, {"n": 47, "casas": 423}, {"n": 48, "casas": 432}, {"n": 49, "casas": 441}, {"n": 50, "casas": 450}, {"n": 51, "casas": 459}, {"n": 52, "casas": 468}, {"n": 53, "casas": 477}, {"n": 54, "casas": 486}, {"n": 55, "casas": 495}, {"n": 56, "casas": 504}, {"n": 57, "casas": 513}, {"n": 58, "casas": 522}, {"n": 59, "casas": 531}, {"n": 60, "casas": 540}], "incidencia": [{"n": 0, "casas": 0}, {"n": 1, "casas": 0}, {"n": 2, "casas": 2}, {"n": 3, "casas": 9}, {"n": 4, "casas": 24}, {"n": 5, "casas": 50}, {"n": 6, "casas": 90}, {"n": 7, "casas": 147}, {"n": 8, "casas": 192}, {"n": 9, "casas": 243}, {"n": 10, "casas": 300}, {"n": 11, "casas": 363}, {"n": 12, "casas": 432}, {"n": 13, "casas": 507}, {"n": 14, "casas": 588}, {"n": 15, "casas": 675}, {"n": 16, "casas": 768}, {"n": 17, "casas": 867}, {"n": 18, "casas": 972}, {"n": 19, "casas": 1083}, {"n": 20, "casas": 1200}, {"n": 21, "casas": 1323}, {"n": 22, "casas": 1452}, {"n": 23, "casas": 1587}, {"n": 24, "casas": 1728}, {"n": 25, "casas": 1875}, {"n": 26, "casas": 2028}, {"n": 27, "casas": 2187}, {"n": 28, "casas": 2352}, {"n": 29, "casas": 2523}, {"n": 30, "casas": 2700}, {"n": 31, "casas": 2883}, {"n": 32, "casas": 3072}, {"n": 33, "casas": 3267}, {"n": 34, "casas": 3468}, {"n": 35, "casas": 3675}, {"n": 36, "casas": 3888}, {"n": 37, "casas": 4107}, {"n": 38, "casas": 4332}, {"n": 39, "casas": 4563}, {"n": 40, "casas": 4800}, {"n": 41, "casas": 5043}, {"n": 42, "casas": 5292}, {"n": 43, "casas": 5547}, {"n": 44, "casas": 5808}, {"n": 45, "casas": 6075}, {"n": 46, "casas": 6348}, {"n": 47, "casas": 6627}, {"n": 48, "casas": 6912}, {"n": 49, "casas": 7203}, {"n": 50, "casas": 7500}, {"n": 51, "casas": 7803}, {"n": 52, "casas": 8112}, {"n": 53, "casas": 8427}, {"n": 54, "casas": 8748}, {"n": 55, "casas": 9075}, {"n": 56, "casas": 9408}, {"n": 57, "casas": 9747}, {"n": 58, "casas": 10092}, {"n": 59, "casas": 10443}, {"n": 60, "casas": 10800}]}, "anel": {"seguintes": 3, "grau": 6, "razao": 3, "minimo": 8}}}, {"id": "heap", "nome": "Heap", "variante": "de mínimo, sobre um vetor dinâmico; a árvore é o próprio vetor", "frase": "Uma árvore guardada num vetor: o menor sempre no topo.", "resumo": "Todo pai é menor ou igual aos filhos, então o menor de todos mora no topo. A árvore não tem ponteiros: ela é o vetor lido por uma conta. Os filhos da casa i estão nas casas 2i + 1 e 2i + 2, e o pai está na casa ⌊(i − 1)/2⌋. Inserir põe o valor no fim e o sobe; tirar o menor leva o último para o topo e o desce. Cada um anda no máximo a altura da árvore, uns log₂ n níveis. É a fila de prioridade das faixas, e o heapsort usa o mesmo descer, com a comparação invertida.", "placa": {"autor": "J. W. J. Williams (heapsort); Robert W. Floyd (montar de baixo para cima)", "ano": "1964"}, "memoria": {"notacao": "O(n)", "porque": "As casas do vetor por baixo: uma por valor guardado, mais a folga do vetor, que dobra quando enche. Pai e filhos não guardam nada: saem da conta dos índices."}, "legendas": {"operacoes": "Custo = leituras + escritas de casas, contadas rodando o heap em Python. Inserir, tirar e ver o menor rodam num heap já montado com 0, 1, …, n − 1: inserir −1 sobe até a raiz e tirar o menor desce até uma folha, os piores casos. As duas montagens partem do heap vazio e recebem os mesmos n valores, do maior para o menor; nelas, a tabela traz o total e o custo por valor.", "custo": "O custo para n de {v0} a {v1}, medido uma vez por n. Cheia: tirar o menor, que cresce com a altura da árvore, em degraus a cada potência de 2. Tracejadas: as duas montagens, em custo por valor (o total dividido por n). Montar de uma vez fica parado; inserir um por um cresce como log n. Inserir sozinho fica de fora: além de subir, ele paga as vezes em que as casas acabam e o vetor dobra, como no Vetor."}, "operacoes": [{"id": "inserir", "nome": "inserir", "notacao": "O(log n)", "porque": "Escreve no fim e sobe: a cada nível, lê o pai e, se o novo é menor, troca os dois (duas escritas). Sobe no máximo a altura da árvore."}, {"id": "tirar", "nome": "tirar o menor", "notacao": "O(log n)", "porque": "Lê a casa 0, leva o último para lá e o desce: a cada nível, lê os dois filhos e troca com o menor deles."}, {"id": "menor", "nome": "ver o menor", "notacao": "O(1)", "porque": "Uma leitura da casa 0: o menor está sempre no topo."}, {"id": "montar", "nome": "montar de uma vez", "notacao": "O(n)", "porque": "Põe os n valores no vetor e desce cada pai, do último até a raiz. Metade das casas são folhas e nem descem; só a raiz desce a árvore inteira. Somando as alturas, menos de n trocas."}, {"id": "inserir_todos", "nome": "inserir um por um", "notacao": "O(n log n)", "porque": "n inserções seguidas. Do maior para o menor, cada valor novo sobe até a raiz: o k-ésimo sobe log₂ k níveis."}], "grafico": [{"id": "tirar", "rotulo": "tirar o menor"}, {"id": "inserir_todos", "rotulo": "um por um"}, {"id": "montar", "rotulo": "de uma vez"}], "medido": {"encher": "inserir", "tamanhos": [10, 100, 1000], "operacoes": {"inserir": {"estrutura": "heap", "chamada": "inserir", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 3, "escritas": 7}, {"n": 100, "leituras": 6, "escritas": 13}, {"n": 1000, "leituras": 9, "escritas": 19}], "serie": [{"n": 0, "leituras": 0, "escritas": 1}, {"n": 1, "leituras": 2, "escritas": 4}, {"n": 2, "leituras": 3, "escritas": 5}, {"n": 3, "leituras": 2, "escritas": 5}, {"n": 4, "leituras": 6, "escritas": 9}, {"n": 5, "leituras": 2, "escritas": 5}, {"n": 6, "leituras": 2, "escritas": 5}, {"n": 7, "leituras": 3, "escritas": 7}, {"n": 8, "leituras": 11, "escritas": 15}, {"n": 9, "leituras": 3, "escritas": 7}, {"n": 10, "leituras": 3, "escritas": 7}, {"n": 11, "leituras": 3, "escritas": 7}, {"n": 12, "leituras": 3, "escritas": 7}, {"n": 13, "leituras": 3, "escritas": 7}, {"n": 14, "leituras": 3, "escritas": 7}, {"n": 15, "leituras": 4, "escritas": 9}, {"n": 16, "leituras": 20, "escritas": 25}, {"n": 17, "leituras": 4, "escritas": 9}, {"n": 18, "leituras": 4, "escritas": 9}, {"n": 19, "leituras": 4, "escritas": 9}, {"n": 20, "leituras": 4, "escritas": 9}, {"n": 21, "leituras": 4, "escritas": 9}, {"n": 22, "leituras": 4, "escritas": 9}, {"n": 23, "leituras": 4, "escritas": 9}, {"n": 24, "leituras": 4, "escritas": 9}, {"n": 25, "leituras": 4, "escritas": 9}, {"n": 26, "leituras": 4, "escritas": 9}, {"n": 27, "leituras": 4, "escritas": 9}, {"n": 28, "leituras": 4, "escritas": 9}, {"n": 29, "leituras": 4, "escritas": 9}, {"n": 30, "leituras": 4, "escritas": 9}, {"n": 31, "leituras": 5, "escritas": 11}, {"n": 32, "leituras": 37, "escritas": 43}, {"n": 33, "leituras": 5, "escritas": 11}, {"n": 34, "leituras": 5, "escritas": 11}, {"n": 35, "leituras": 5, "escritas": 11}, {"n": 36, "leituras": 5, "escritas": 11}, {"n": 37, "leituras": 5, "escritas": 11}, {"n": 38, "leituras": 5, "escritas": 11}, {"n": 39, "leituras": 5, "escritas": 11}, {"n": 40, "leituras": 5, "escritas": 11}, {"n": 41, "leituras": 5, "escritas": 11}, {"n": 42, "leituras": 5, "escritas": 11}, {"n": 43, "leituras": 5, "escritas": 11}, {"n": 44, "leituras": 5, "escritas": 11}, {"n": 45, "leituras": 5, "escritas": 11}, {"n": 46, "leituras": 5, "escritas": 11}, {"n": 47, "leituras": 5, "escritas": 11}, {"n": 48, "leituras": 5, "escritas": 11}, {"n": 49, "leituras": 5, "escritas": 11}, {"n": 50, "leituras": 5, "escritas": 11}, {"n": 51, "leituras": 5, "escritas": 11}, {"n": 52, "leituras": 5, "escritas": 11}, {"n": 53, "leituras": 5, "escritas": 11}, {"n": 54, "leituras": 5, "escritas": 11}, {"n": 55, "leituras": 5, "escritas": 11}, {"n": 56, "leituras": 5, "escritas": 11}, {"n": 57, "leituras": 5, "escritas": 11}, {"n": 58, "leituras": 5, "escritas": 11}, {"n": 59, "leituras": 5, "escritas": 11}, {"n": 60, "leituras": 5, "escritas": 11}]}, "tirar": {"estrutura": "heap", "chamada": "tirar", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 8, "escritas": 7}, {"n": 100, "leituras": 14, "escritas": 13}, {"n": 1000, "leituras": 20, "escritas": 19}], "serie": [{"n": 1, "leituras": 2, "escritas": 0}, {"n": 2, "leituras": 2, "escritas": 1}, {"n": 3, "leituras": 3, "escritas": 3}, {"n": 4, "leituras": 4, "escritas": 3}, {"n": 5, "leituras": 5, "escritas": 5}, {"n": 6, "leituras": 6, "escritas": 5}, {"n": 7, "leituras": 6, "escritas": 5}, {"n": 8, "leituras": 6, "escritas": 5}, {"n": 9, "leituras": 7, "escritas": 7}, {"n": 10, "leituras": 8, "escritas": 7}, {"n": 11, "leituras": 8, "escritas": 7}, {"n": 12, "leituras": 8, "escritas": 7}, {"n": 13, "leituras": 8, "escritas": 7}, {"n": 14, "leituras": 8, "escritas": 7}, {"n": 15, "leituras": 8, "escritas": 7}, {"n": 16, "leituras": 8, "escritas": 7}, {"n": 17, "leituras": 9, "escritas": 9}, {"n": 18, "leituras": 10, "escritas": 9}, {"n": 19, "leituras": 10, "escritas": 9}, {"n": 20, "leituras": 10, "escritas": 9}, {"n": 21, "leituras": 10, "escritas": 9}, {"n": 22, "leituras": 10, "escritas": 9}, {"n": 23, "leituras": 10, "escritas": 9}, {"n": 24, "leituras": 10, "escritas": 9}, {"n": 25, "leituras": 10, "escritas": 9}, {"n": 26, "leituras": 10, "escritas": 9}, {"n": 27, "leituras": 10, "escritas": 9}, {"n": 28, "leituras": 10, "escritas": 9}, {"n": 29, "leituras": 10, "escritas": 9}, {"n": 30, "leituras": 10, "escritas": 9}, {"n": 31, "leituras": 10, "escritas": 9}, {"n": 32, "leituras": 10, "escritas": 9}, {"n": 33, "leituras": 11, "escritas": 11}, {"n": 34, "leituras": 12, "escritas": 11}, {"n": 35, "leituras": 12, "escritas": 11}, {"n": 36, "leituras": 12, "escritas": 11}, {"n": 37, "leituras": 12, "escritas": 11}, {"n": 38, "leituras": 12, "escritas": 11}, {"n": 39, "leituras": 12, "escritas": 11}, {"n": 40, "leituras": 12, "escritas": 11}, {"n": 41, "leituras": 12, "escritas": 11}, {"n": 42, "leituras": 12, "escritas": 11}, {"n": 43, "leituras": 12, "escritas": 11}, {"n": 44, "leituras": 12, "escritas": 11}, {"n": 45, "leituras": 12, "escritas": 11}, {"n": 46, "leituras": 12, "escritas": 11}, {"n": 47, "leituras": 12, "escritas": 11}, {"n": 48, "leituras": 12, "escritas": 11}, {"n": 49, "leituras": 12, "escritas": 11}, {"n": 50, "leituras": 12, "escritas": 11}, {"n": 51, "leituras": 12, "escritas": 11}, {"n": 52, "leituras": 12, "escritas": 11}, {"n": 53, "leituras": 12, "escritas": 11}, {"n": 54, "leituras": 12, "escritas": 11}, {"n": 55, "leituras": 12, "escritas": 11}, {"n": 56, "leituras": 12, "escritas": 11}, {"n": 57, "leituras": 12, "escritas": 11}, {"n": 58, "leituras": 12, "escritas": 11}, {"n": 59, "leituras": 12, "escritas": 11}, {"n": 60, "leituras": 12, "escritas": 11}]}, "menor": {"estrutura": "heap", "chamada": "menor", "seguidas": null, "vazia": false, "tabela": [{"n": 10, "leituras": 1, "escritas": 0}, {"n": 100, "leituras": 1, "escritas": 0}, {"n": 1000, "leituras": 1, "escritas": 0}], "serie": [{"n": 1, "leituras": 1, "escritas": 0}, {"n": 2, "leituras": 1, "escritas": 0}, {"n": 3, "leituras": 1, "escritas": 0}, {"n": 4, "leituras": 1, "escritas": 0}, {"n": 5, "leituras": 1, "escritas": 0}, {"n": 6, "leituras": 1, "escritas": 0}, {"n": 7, "leituras": 1, "escritas": 0}, {"n": 8, "leituras": 1, "escritas": 0}, {"n": 9, "leituras": 1, "escritas": 0}, {"n": 10, "leituras": 1, "escritas": 0}, {"n": 11, "leituras": 1, "escritas": 0}, {"n": 12, "leituras": 1, "escritas": 0}, {"n": 13, "leituras": 1, "escritas": 0}, {"n": 14, "leituras": 1, "escritas": 0}, {"n": 15, "leituras": 1, "escritas": 0}, {"n": 16, "leituras": 1, "escritas": 0}, {"n": 17, "leituras": 1, "escritas": 0}, {"n": 18, "leituras": 1, "escritas": 0}, {"n": 19, "leituras": 1, "escritas": 0}, {"n": 20, "leituras": 1, "escritas": 0}, {"n": 21, "leituras": 1, "escritas": 0}, {"n": 22, "leituras": 1, "escritas": 0}, {"n": 23, "leituras": 1, "escritas": 0}, {"n": 24, "leituras": 1, "escritas": 0}, {"n": 25, "leituras": 1, "escritas": 0}, {"n": 26, "leituras": 1, "escritas": 0}, {"n": 27, "leituras": 1, "escritas": 0}, {"n": 28, "leituras": 1, "escritas": 0}, {"n": 29, "leituras": 1, "escritas": 0}, {"n": 30, "leituras": 1, "escritas": 0}, {"n": 31, "leituras": 1, "escritas": 0}, {"n": 32, "leituras": 1, "escritas": 0}, {"n": 33, "leituras": 1, "escritas": 0}, {"n": 34, "leituras": 1, "escritas": 0}, {"n": 35, "leituras": 1, "escritas": 0}, {"n": 36, "leituras": 1, "escritas": 0}, {"n": 37, "leituras": 1, "escritas": 0}, {"n": 38, "leituras": 1, "escritas": 0}, {"n": 39, "leituras": 1, "escritas": 0}, {"n": 40, "leituras": 1, "escritas": 0}, {"n": 41, "leituras": 1, "escritas": 0}, {"n": 42, "leituras": 1, "escritas": 0}, {"n": 43, "leituras": 1, "escritas": 0}, {"n": 44, "leituras": 1, "escritas": 0}, {"n": 45, "leituras": 1, "escritas": 0}, {"n": 46, "leituras": 1, "escritas": 0}, {"n": 47, "leituras": 1, "escritas": 0}, {"n": 48, "leituras": 1, "escritas": 0}, {"n": 49, "leituras": 1, "escritas": 0}, {"n": 50, "leituras": 1, "escritas": 0}, {"n": 51, "leituras": 1, "escritas": 0}, {"n": 52, "leituras": 1, "escritas": 0}, {"n": 53, "leituras": 1, "escritas": 0}, {"n": 54, "leituras": 1, "escritas": 0}, {"n": 55, "leituras": 1, "escritas": 0}, {"n": 56, "leituras": 1, "escritas": 0}, {"n": 57, "leituras": 1, "escritas": 0}, {"n": 58, "leituras": 1, "escritas": 0}, {"n": 59, "leituras": 1, "escritas": 0}, {"n": 60, "leituras": 1, "escritas": 0}]}, "montar": {"estrutura": "heap", "chamada": "montar", "seguidas": null, "vazia": true, "tabela": [{"n": 10, "vezes": 10, "leituras": 34, "escritas": 41}, {"n": 100, "vezes": 100, "leituras": 367, "escritas": 419}, {"n": 1000, "vezes": 1000, "leituras": 3505, "escritas": 4007}], "serie": [{"n": 1, "vezes": 1, "leituras": 0, "escritas": 1}, {"n": 2, "vezes": 2, "leituras": 3, "escritas": 5}, {"n": 3, "vezes": 3, "leituras": 6, "escritas": 8}, {"n": 4, "vezes": 4, "leituras": 9, "escritas": 13}, {"n": 5, "vezes": 5, "leituras": 15, "escritas": 18}, {"n": 6, "vezes": 6, "leituras": 16, "escritas": 21}, {"n": 7, "vezes": 7, "leituras": 18, "escritas": 22}, {"n": 8, "vezes": 8, "leituras": 21, "escritas": 27}, {"n": 9, "vezes": 9, "leituras": 33, "escritas": 38}, {"n": 10, "vezes": 10, "leituras": 34, "escritas": 41}, {"n": 11, "vezes": 11, "leituras": 36, "escritas": 42}, {"n": 12, "vezes": 12, "leituras": 37, "escritas": 45}, {"n": 13, "vezes": 13, "leituras": 41, "escritas": 48}, {"n": 14, "vezes": 14, "leituras": 42, "escritas": 51}, {"n": 15, "vezes": 15, "leituras": 44, "escritas": 52}, {"n": 16, "vezes": 16, "leituras": 47, "escritas": 57}, {"n": 17, "vezes": 17, "leituras": 67, "escritas": 76}, {"n": 18, "vezes": 18, "leituras": 70, "escritas": 81}, {"n": 19, "vezes": 19, "leituras": 72, "escritas": 82}, {"n": 20, "vezes": 20, "leituras": 73, "escritas": 85}, {"n": 21, "vezes": 21, "leituras": 75, "escritas": 86}, {"n": 22, "vezes": 22, "leituras": 78, "escritas": 91}, {"n": 23, "vezes": 23, "leituras": 80, "escritas": 92}, {"n": 24, "vezes": 24, "leituras": 81, "escritas": 95}, {"n": 25, "vezes": 25, "leituras": 85, "escritas": 98}, {"n": 26, "vezes": 26, "leituras": 88, "escritas": 103}, {"n": 27, "vezes": 27, "leituras": 90, "escritas": 104}, {"n": 28, "vezes": 28, "leituras": 91, "escritas": 107}, {"n": 29, "vezes": 29, "leituras": 93, "escritas": 108}, {"n": 30, "vezes": 30, "leituras": 96, "escritas": 113}, {"n": 31, "vezes": 31, "leituras": 98, "escritas": 114}, {"n": 32, "vezes": 32, "leituras": 101, "escritas": 119}, {"n": 33, "vezes": 33, "leituras": 137, "escritas": 154}, {"n": 34, "vezes": 34, "leituras": 141, "escritas": 161}, {"n": 35, "vezes": 35, "leituras": 144, "escritas": 162}, {"n": 36, "vezes": 36, "leituras": 145, "escritas": 165}, {"n": 37, "vezes": 37, "leituras": 147, "escritas": 166}, {"n": 38, "vezes": 38, "leituras": 149, "escritas": 171}, {"n": 39, "vezes": 39, "leituras": 152, "escritas": 172}, {"n": 40, "vezes": 40, "leituras": 153, "escritas": 175}, {"n": 41, "vezes": 41, "leituras": 155, "escritas": 176}, {"n": 42, "vezes": 42, "leituras": 159, "escritas": 183}, {"n": 43, "vezes": 43, "leituras": 162, "escritas": 184}, {"n": 44, "vezes": 44, "leituras": 163, "escritas": 187}, {"n": 45, "vezes": 45, "leituras": 165, "escritas": 188}, {"n": 46, "vezes": 46, "leituras": 167, "escritas": 193}, {"n": 47, "vezes": 47, "leituras": 170, "escritas": 194}, {"n": 48, "vezes": 48, "leituras": 171, "escritas": 197}, {"n": 49, "vezes": 49, "leituras": 175, "escritas": 200}, {"n": 50, "vezes": 50, "leituras": 179, "escritas": 207}, {"n": 51, "vezes": 51, "leituras": 182, "escritas": 208}, {"n": 52, "vezes": 52, "leituras": 183, "escritas": 211}, {"n": 53, "vezes": 53, "leituras": 185, "escritas": 212}, {"n": 54, "vezes": 54, "leituras": 187, "escritas": 217}, {"n": 55, "vezes": 55, "leituras": 190, "escritas": 218}, {"n": 56, "vezes": 56, "leituras": 191, "escritas": 221}, {"n": 57, "vezes": 57, "leituras": 193, "escritas": 222}, {"n": 58, "vezes": 58, "leituras": 197, "escritas": 229}, {"n": 59, "vezes": 59, "leituras": 200, "escritas": 230}, {"n": 60, "vezes": 60, "leituras": 201, "escritas": 233}]}, "inserir_todos": {"estrutura": "heap", "chamada": "inserir_todos", "seguidas": null, "vazia": true, "tabela": [{"n": 10, "vezes": 10, "leituras": 34, "escritas": 63}, {"n": 100, "vezes": 100, "leituras": 607, "escritas": 1187}, {"n": 1000, "vezes": 1000, "leituras": 9010, "escritas": 17997}], "serie": [{"n": 1, "vezes": 1, "leituras": 0, "escritas": 1}, {"n": 2, "vezes": 2, "leituras": 2, "escritas": 5}, {"n": 3, "vezes": 3, "leituras": 5, "escritas": 10}, {"n": 4, "vezes": 4, "leituras": 7, "escritas": 15}, {"n": 5, "vezes": 5, "leituras": 13, "escritas": 24}, {"n": 6, "vezes": 6, "leituras": 15, "escritas": 29}, {"n": 7, "vezes": 7, "leituras": 17, "escritas": 34}, {"n": 8, "vezes": 8, "leituras": 20, "escritas": 41}, {"n": 9, "vezes": 9, "leituras": 31, "escritas": 56}, {"n": 10, "vezes": 10, "leituras": 34, "escritas": 63}, {"n": 11, "vezes": 11, "leituras": 37, "escritas": 70}, {"n": 12, "vezes": 12, "leituras": 40, "escritas": 77}, {"n": 13, "vezes": 13, "leituras": 43, "escritas": 84}, {"n": 14, "vezes": 14, "leituras": 46, "escritas": 91}, {"n": 15, "vezes": 15, "leituras": 49, "escritas": 98}, {"n": 16, "vezes": 16, "leituras": 53, "escritas": 107}, {"n": 17, "vezes": 17, "leituras": 73, "escritas": 132}, {"n": 18, "vezes": 18, "leituras": 77, "escritas": 141}, {"n": 19, "vezes": 19, "leituras": 81, "escritas": 150}, {"n": 20, "vezes": 20, "leituras": 85, "escritas": 159}, {"n": 21, "vezes": 21, "leituras": 89, "escritas": 168}, {"n": 22, "vezes": 22, "leituras": 93, "escritas": 177}, {"n": 23, "vezes": 23, "leituras": 97, "escritas": 186}, {"n": 24, "vezes": 24, "leituras": 101, "escritas": 195}, {"n": 25, "vezes": 25, "leituras": 105, "escritas": 204}, {"n": 26, "vezes": 26, "leituras": 109, "escritas": 213}, {"n": 27, "vezes": 27, "leituras": 113, "escritas": 222}, {"n": 28, "vezes": 28, "leituras": 117, "escritas": 231}, {"n": 29, "vezes": 29, "leituras": 121, "escritas": 240}, {"n": 30, "vezes": 30, "leituras": 125, "escritas": 249}, {"n": 31, "vezes": 31, "leituras": 129, "escritas": 258}, {"n": 32, "vezes": 32, "leituras": 134, "escritas": 269}, {"n": 33, "vezes": 33, "leituras": 171, "escritas": 312}, {"n": 34, "vezes": 34, "leituras": 176, "escritas": 323}, {"n": 35, "vezes": 35, "leituras": 181, "escritas": 334}, {"n": 36, "vezes": 36, "leituras": 186, "escritas": 345}, {"n": 37, "vezes": 37, "leituras": 191, "escritas": 356}, {"n": 38, "vezes": 38, "leituras": 196, "escritas": 367}, {"n": 39, "vezes": 39, "leituras": 201, "escritas": 378}, {"n": 40, "vezes": 40, "leituras": 206, "escritas": 389}, {"n": 41, "vezes": 41, "leituras": 211, "escritas": 400}, {"n": 42, "vezes": 42, "leituras": 216, "escritas": 411}, {"n": 43, "vezes": 43, "leituras": 221, "escritas": 422}, {"n": 44, "vezes": 44, "leituras": 226, "escritas": 433}, {"n": 45, "vezes": 45, "leituras": 231, "escritas": 444}, {"n": 46, "vezes": 46, "leituras": 236, "escritas": 455}, {"n": 47, "vezes": 47, "leituras": 241, "escritas": 466}, {"n": 48, "vezes": 48, "leituras": 246, "escritas": 477}, {"n": 49, "vezes": 49, "leituras": 251, "escritas": 488}, {"n": 50, "vezes": 50, "leituras": 256, "escritas": 499}, {"n": 51, "vezes": 51, "leituras": 261, "escritas": 510}, {"n": 52, "vezes": 52, "leituras": 266, "escritas": 521}, {"n": 53, "vezes": 53, "leituras": 271, "escritas": 532}, {"n": 54, "vezes": 54, "leituras": 276, "escritas": 543}, {"n": 55, "vezes": 55, "leituras": 281, "escritas": 554}, {"n": 56, "vezes": 56, "leituras": 286, "escritas": 565}, {"n": 57, "vezes": 57, "leituras": 291, "escritas": 576}, {"n": 58, "vezes": 58, "leituras": 296, "escritas": 587}, {"n": 59, "vezes": 59, "leituras": 301, "escritas": 598}, {"n": 60, "vezes": 60, "leituras": 306, "escritas": 609}]}}, "capacidade": {"heap": [{"n": 0, "casas": 1}, {"n": 1, "casas": 1}, {"n": 2, "casas": 2}, {"n": 3, "casas": 4}, {"n": 4, "casas": 4}, {"n": 5, "casas": 8}, {"n": 6, "casas": 8}, {"n": 7, "casas": 8}, {"n": 8, "casas": 8}, {"n": 9, "casas": 16}, {"n": 10, "casas": 16}, {"n": 11, "casas": 16}, {"n": 12, "casas": 16}, {"n": 13, "casas": 16}, {"n": 14, "casas": 16}, {"n": 15, "casas": 16}, {"n": 16, "casas": 16}, {"n": 17, "casas": 32}, {"n": 18, "casas": 32}, {"n": 19, "casas": 32}, {"n": 20, "casas": 32}, {"n": 21, "casas": 32}, {"n": 22, "casas": 32}, {"n": 23, "casas": 32}, {"n": 24, "casas": 32}, {"n": 25, "casas": 32}, {"n": 26, "casas": 32}, {"n": 27, "casas": 32}, {"n": 28, "casas": 32}, {"n": 29, "casas": 32}, {"n": 30, "casas": 32}, {"n": 31, "casas": 32}, {"n": 32, "casas": 32}, {"n": 33, "casas": 64}, {"n": 34, "casas": 64}, {"n": 35, "casas": 64}, {"n": 36, "casas": 64}, {"n": 37, "casas": 64}, {"n": 38, "casas": 64}, {"n": 39, "casas": 64}, {"n": 40, "casas": 64}, {"n": 41, "casas": 64}, {"n": 42, "casas": 64}, {"n": 43, "casas": 64}, {"n": 44, "casas": 64}, {"n": 45, "casas": 64}, {"n": 46, "casas": 64}, {"n": 47, "casas": 64}, {"n": 48, "casas": 64}, {"n": 49, "casas": 64}, {"n": 50, "casas": 64}, {"n": 51, "casas": 64}, {"n": 52, "casas": 64}, {"n": 53, "casas": 64}, {"n": 54, "casas": 64}, {"n": 55, "casas": 64}, {"n": 56, "casas": 64}, {"n": 57, "casas": 64}, {"n": 58, "casas": 64}, {"n": 59, "casas": 64}, {"n": 60, "casas": 64}]}}}];
