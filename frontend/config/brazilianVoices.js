// config/brazilianVoices.js
export const brazilianFamousVoices = {
  // ⚽ JOGADORES DE FUTEBOL
  jogadores: [
    {
      id: 'pele',
      nome: 'Pelé',
      categoria: 'Jogador Lendário',
      voz_tipo: 'grave_calmo',
      descricao: 'Voz pausada e sábia do Rei do Futebol',
      emocao_padrao: 'sabedoria',
      frases_famosas: [
        'O futebol é a coisa mais importante dentre as menos importantes',
        'Edson Arantes do Nascimento, Pelé, o maior de todos os tempos'
      ],
      config_audio: {
        pitch: 0.85,
        speed: 0.9,
        timbre: 'grave',
        sotaque: 'paulista'
      }
    },
    {
      id: 'galvao-bueno',
      nome: 'Galvão Bueno',
      categoria: 'Narrador Esportivo',
      voz_tipo: 'agudo_emocionado',
      descricao: 'Voz emocionante e intensa das narrações esportivas',
      emocao_padrao: 'emocao_extrema',
      frases_famosas: [
        'É TETRA! É TETRA!',
        'Ronaldinho! Olha o que ele fez!',
        'Haja coração!'
      ],
      config_audio: {
        pitch: 1.3,
        speed: 1.2,
        timbre: 'agudo',
        intensidade: 'alta',
        vibrato: true
      }
    },
    {
      id: 'neymar',
      nome: 'Neymar Jr.',
      categoria: 'Jogador Atual',
      voz_tipo: 'juvenil_descontraido',
      descricao: 'Voz jovem e descontraída do craque',
      emocao_padrao: 'descontracao',
      frases_famosas: [
        'Ousadia e alegria',
        'To chegando com a minha cara metade'
      ],
      config_audio: {
        pitch: 1.1,
        speed: 1.0,
        timbre: 'medio_agudo',
        girias: true
      }
    },
    {
      id: 'ronaldo-fenomeno',
      nome: 'Ronaldo Fenômeno',
      categoria: 'Jogador Lendário',
      voz_tipo: 'grave_marcante',
      descricao: 'Voz grave e marcante do Fenômeno',
      emocao_padrao: 'confianca',
      frases_famosas: [
        'O que eu mais gosto de fazer é gol',
        'Fenômeno é apelido, Ronaldo é nome'
      ],
      config_audio: {
        pitch: 0.9,
        speed: 0.95,
        timbre: 'grave_aveludado',
        dente_aberto: true
      }
    },
    {
      id: 'romario',
      nome: 'Romário',
      categoria: 'Jogador/Político',
      voz_tipo: 'baixo_confiante',
      descricao: 'Voz baixa e confiante do Baixinho',
      emocao_padrao: 'ironia',
      frases_famosas: [
        'Deus me deu o dom, o resto é comigo',
        'Quando eu nasci, Deus falou: esse é o cara'
      ],
      config_audio: {
        pitch: 0.95,
        speed: 0.9,
        timbre: 'baixo_rouco',
        ironia: true
      }
    }
  ],

  // 📺 APRESENTADORES DE TV
  apresentadores: [
    {
      id: 'silvio-santos',
      nome: 'Silvio Santos',
      categoria: 'Apresentador Lendário',
      voz_tipo: 'caracteristica_inconfundivel',
      descricao: 'Voz única e icônica do maior apresentador do Brasil',
      emocao_padrao: 'carisma',
      frases_famosas: [
        'Quem quer dinheiro?',
        'Ma oe!',
        'Vai pra lá, vai pra cá'
      ],
      config_audio: {
        pitch: 1.15,
        speed: 1.1,
        timbre: 'anasalado_caracteristico',
        risada: 'caracteristica',
        bordao: true
      }
    },
    {
      id: 'faustao',
      nome: 'Faustão',
      categoria: 'Apresentador',
      voz_tipo: 'grave_estrondosa',
      descricao: 'Voz grave e estrondosa do Faustão',
      emocao_padrao: 'euforia',
      frases_famosas: [
        'Ô loco, meu!',
        'Quem sabe faz ao vivo!',
        'Errooooou!'
      ],
      config_audio: {
        pitch: 0.8,
        speed: 1.0,
        volume: 'alto',
        timbre: 'grave_imponente',
        intensidade: 'maxima'
      }
    },
    {
      id: 'xuxa',
      nome: 'Xuxa Meneghel',
      categoria: 'Apresentadora Infantil',
      voz_tipo: 'doce_animada',
      descricao: 'Voz doce e animada da Rainha dos Baixinhos',
      emocao_padrao: 'alegria',
      frases_famosas: [
        'Beijinho, beijinho, tchau, tchau',
        'Xuxa só para baixinhos'
      ],
      config_audio: {
        pitch: 1.2,
        speed: 1.15,
        timbre: 'doce_cristalino',
        entusiasmo: 'alto'
      }
    },
    {
      id: 'luciano-huck',
      nome: 'Luciano Huck',
      categoria: 'Apresentador',
      voz_tipo: 'carismatica_energetica',
      descricao: 'Voz carismática e energética',
      emocao_padrao: 'entusiasmo',
      frases_famosas: [
        'Vamos transformar vidas!',
        'É agora ou nunca!'
      ],
      config_audio: {
        pitch: 1.0,
        speed: 1.1,
        timbre: 'medio_claro',
        motivacional: true
      }
    },
    {
      id: 'datena',
      nome: 'José Luiz Datena',
      categoria: 'Apresentador/Jornalista',
      voz_tipo: 'intensa_dramatica',
      descricao: 'Voz intensa e dramática do jornalismo policial',
      emocao_padrao: 'indignacao',
      frases_famosas: [
        'Isso é um absurdo!',
        'Cadê as autoridades?'
      ],
      config_audio: {
        pitch: 0.95,
        speed: 1.3,
        volume: 'muito_alto',
        timbre: 'grave_rouco',
        urgencia: 'maxima'
      }
    }
  ],

  // 🎭 OUTRAS PERSONALIDADES
  outros: [
    {
      id: 'cid-moreira',
      nome: 'Cid Moreira',
      categoria: 'Narrador/Jornalista',
      voz_tipo: 'grave_imponente',
      descricao: 'A voz mais grave e imponente do Brasil',
      emocao_padrao: 'seriedade',
      frases_famosas: [
        'Boa noite.',
        'O Jornal Nacional...'
      ],
      config_audio: {
        pitch: 0.75,
        speed: 0.85,
        timbre: 'gravíssimo',
        ressonancia: 'maxima',
        pausa_dramatica: true
      }
    },
    {
      id: 'gilberto-gil',
      nome: 'Gilberto Gil',
      categoria: 'Cantor/Ex-Ministro',
      voz_tipo: 'calma_sabia',
      descricao: 'Voz calma, sábia e musical',
      emocao_padrao: 'sabedoria',
      frases_famosas: [
        'A paz é fruto da justiça',
        'Andar com fé eu vou'
      ],
      config_audio: {
        pitch: 0.9,
        speed: 0.8,
        timbre: 'suave_musical',
        musicalidade: 'alta',
        ritmo_baiano: true
      }
    },
    {
      id: 'drauzio-varella',
      nome: 'Dráuzio Varella',
      categoria: 'Médico/Escritor',
      voz_tipo: 'calma_cientifica',
      descricao: 'Voz calma e didática sobre saúde',
      emocao_padrao: 'didatica',
      frases_famosas: [
        'A prevenção é o melhor remédio',
        'Vamos falar sobre saúde'
      ],
      config_audio: {
        pitch: 0.9,
        speed: 0.85,
        timbre: 'medio_claro',
        didatico: true,
        pausa_explicativa: true
      }
    },
    {
      id: 'marilia-gabriela',
      nome: 'Marília Gabriela',
      categoria: 'Entrevistadora',
      voz_tipo: 'elegante_penetrante',
      descricao: 'Voz elegante com perguntas penetrantes',
      emocao_padrao: 'curiosidade',
      frases_famosas: [
        'Mas e aí, qual é a sua verdade?',
        'Me explica melhor isso'
      ],
      config_audio: {
        pitch: 1.05,
        speed: 0.95,
        timbre: 'medio_elegante',
        sofisticacao: 'alta'
      }
    },
    {
      id: 'jose-wilker',
      nome: 'José Wilker',
      categoria: 'Ator/Narrador',
      voz_tipo: 'grave_aquecida',
      descricao: 'Voz grave e aveludada do cinema brasileiro',
      emocao_padrao: 'dramatico',
      frases_famosas: [
        'A arte imita a vida',
        'O Brasil é um país continental'
      ],
      config_audio: {
        pitch: 0.85,
        speed: 0.9,
        timbre: 'grave_aveludado',
        dramaticidade: 'alta',
        cinema_quality: true
      }
    },
    {
      id: 'jorge-ben-jor',
      nome: 'Jorge Ben Jor',
      categoria: 'Cantor/Compositor',
      voz_tipo: 'ritmada_carismatica',
      descricao: 'Voz ritmada e cheia de suingue',
      emocao_padrao: 'alegria_contagiante',
      frases_famosas: [
        'País tropical, abençoado por Deus',
        'Mas que nada!'
      ],
      config_audio: {
        pitch: 1.1,
        speed: 1.05,
        timbre: 'medio_swingado',
        musicalidade: 'alta',
        suingue: 'maximo'
      }
    },
    {
      id: 'fernanda-montenegro',
      nome: 'Fernanda Montenegro',
      categoria: 'Atriz',
      voz_tipo: 'dramatica_profunda',
      descricao: 'Voz dramática e profunda da grande dama do teatro',
      emocao_padrao: 'emocao_pura',
      frases_famosas: [
        'A vida é a arte do encontro',
        'Central do Brasil'
      ],
      config_audio: {
        pitch: 0.9,
        speed: 0.85,
        timbre: 'dramatico_feminino',
        intensidade_emocional: 'maxima',
        vibrato_dramatico: true
      }
    },
    {
      id: 'chico-anysio',
      nome: 'Chico Anysio',
      categoria: 'Humorista',
      voz_tipo: 'versatil_caracteristica',
      descricao: 'Voz versátil com múltiplos personagens',
      emocao_padrao: 'humor',
      frases_famosas: [
        'É mentira, Terta?',
        'Bento Carneiro, o vampiro brasileiro'
      ],
      config_audio: {
        pitch: 'variavel',
        speed: 'variavel',
        timbre: 'multiplos',
        personagens: ['alberto_roberto', 'professor_raimundo', 'pantaleao'],
        humor: true
      }
    },
    {
      id: 'regina-case',
      nome: 'Regina Casé',
      categoria: 'Apresentadora',
      voz_tipo: 'popular_carismatica',
      descricao: 'Voz popular e carismática do povo brasileiro',
      emocao_padrao: 'empatia',
      frases_famosas: [
        'Isso é muito Brasil!',
        'Que maravilha!'
      ],
      config_audio: {
        pitch: 1.0,
        speed: 1.1,
        timbre: 'popular_alegre',
        brasilidade: 'maxima',
        expressoes_populares: true
      }
    },
    {
      id: 'milton-nascimento',
      nome: 'Milton Nascimento',
      categoria: 'Cantor',
      voz_tipo: 'angelical_unica',
      descricao: 'Voz única e angelical de Bituca',
      emocao_padrao: 'emocao_profunda',
      frases_famosas: [
        'Coração de estudante',
        'Travessia'
      ],
      config_audio: {
        pitch: 1.15,
        speed: 0.85,
        timbre: 'falsete_suave',
        vibrato_natural: true,
        emocao_pura: true
      }
    }
  ]
};
