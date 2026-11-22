export type Action = { label: string; href?: string; external?: boolean; toast?: string };
export type Reply = { text: string; facts?: [string, string][]; actions: Action[] };
export type ReplyKey = 'recruiter' | 'dev' | 'curious';

export const SCRIPT: {
    start: string;
    again: string;
    replies: Record<ReplyKey, Reply>;
} = {
    start: 'Olá! eu sou o Ruan. Antes de começarmos nossa jornada, me conta: o que você veio descobrir por aqui?',
    again: 'Tudo certo! Qual dessas opções combina melhor com o que você procura?',
    replies: {
        recruiter: {
            text: 'Ah! então vamos direto ao ponto! Sou Desenvolvedor Full Stack Júnior e procuro minha primeira oportunidade na área, aqui está um resumo da minha formação:',
            facts: [
                ['Formação', 'Análise e Desenvolvimento de Sistemas (ADS)'],
                ['Stack', 'JavaScript, TypeScript, Node.js, React e Tailwind CSS'],
                ['Estudando', 'APIs REST e Docker'],
            ],
            actions: [
                { label: 'Ver meus projetos', href: '#projetos' },
                { label: 'Falar comigo', href: '#contato' },
            ],
        },
        dev: {
            text: 'Boa! Então vamos falar de códigos. Todos os meus projetos têm seus repositórios abertos no Github. Recomendo começar pela To-Do API, um projeto em desenvolvimento com TypeScript, Prisma, testes, autenticação, e integração com Docker. Quer dar uma olhada?',
            actions: [
                { label: 'Abrir To-Do API', href: 'https://github.com/Rp-1177/To-Do-API', external: true },
                { label: 'Ver todos os projetos', href: '#projetos' },
            ],
        },
        curious : {
            text: 'Então fique à vontade! Quando não estou programando, costumo me perder em mundos fictícios, boas histórias e mecânicas de jogos que sempre têm algo novo a ensinar, aliás, tem um segredo por aqui...talvez uma combinação de teclas ou um botão revele algo!',
            actions: [
                { label: 'Ver minhas inspirações', href: '#jogos' },
                { label: 'Quero uma dica', toast: 'Digite: ↑ ↑ ↓ ↓ ← → ← → B A' },
            ],
        },
    },
};

export const CHOICES: { key: ReplyKey; label: string }[] = [
    { key: 'recruiter', label: 'Sou recrutador' },
    { key: 'dev', label: 'Sou dev, quero ver o código' },
    { key: 'curious', label: 'Só estou passando' },
];

export type Project = {
    id: string; name: string; summary: string; text: string;
    tags: string[]; href: string; tree: string;
};

export const PROJECTS: Project[] = [
    {
        id: 'todo-api',
        name: 'To-Do-API',
        summary: 'API REST em desenvolvimento para gerenciar tarefas',
        text: 'API para gerenciar tarefas, escrita em TypeScript. Usa Prisma para conversar com banco de dados, Vitest para testar o código e integração com docker.',
        tags: ['TypesScript', 'Node.js', 'Prisma', 'Express.js', 'Vitest', 'Docker'],
        href: 'https://github.com/Rp-1177/To-Do-API',
        tree: 'To-Do-API/\n├─ prisma/\n├─ src/\n├─ .env.example\n├─ package.json\n├─ requests.http\n├─ tsconfig.json\n└─ vitest.config.ts',
    },
    {
        id: 'full-stack',
        name: 'projeto_full-stack',
        summary: 'Primeira Aplicação full-stack feito na faculdade construída em fases',
        text: 'Projeto dividido em duas fases: a primeira monta a base da aplicação e a segunda adiciona o backend.',
        tags: ['JavaScript', 'Node.js', 'Express.js', 'PostGree'],
        href: 'https://github.com/Rp-1177/projeto_full-stack',
        tree: 'projeto_full-stack/\n├─ fase-1/\n└─ fase-2/\n   └─ backend/',
    },
    {
        id: 'portfolio',
        name: 'Portfolio-rp',
        summary: 'O site que você está vendo',
        text: 'Feito com React e TypeScript. Dialogos, partículas, animações, segredo e tema escritos por mim.',
        tags: ['React', 'TypeScript', 'Vite', 'Motion'],
        href: 'https://github.com/Rp-1177/portfolio-rp',
        tree: 'portfolio-rp/\n├─ public/\n└─ src/\n   ├─ components/\n   ├─ hooks/\n   └─ data/',
    },
];

export type Game = { id: string; name: string; title: string; text: string };

export const GAMES: Game[] = [
    { id: 'undertale', name: 'Undertale', title: 'Escolhas que importam', text: 'Em undertale, cada escolha pode mudar o rumo da jornada. Levo essa ideia para o desenvolvimento de interfaces: cada interação deve ser clara, previsível e oferecer ao usuário um retorno sobre suas ações.' },
    { id: 'persona', name: 'Persona', title: 'Interface com personalidade', text: 'Um menu não precisa ser apenas funcional, ele também pode transmitir personalidade. Persona me mostrou como cores, animações e elementos visuais podem criar uma identidade marcante sem comprometer a clareza e a facilidade de uso.' },
    { id: 'pokemon', name: 'Pokemon', title: 'Simplicidade que gera profundidade', text: 'Pokémon combina regras relativamente simples para criar sistemas cheios de possibilidades. Essa ideia me inspira no desenvolvimento back-end, contruir estruturas organizadas, com responsabilidades bem definidas, capazes de crescer sem perder consistência.' },    { id: 'hollow', name: 'Hollow Knight', title: 'Menos, mas com propósito', text: 'Cada detalhe contribui para a atmosfera e a experiência do jogador em Hollow Knight, essa atenção ao essencial me inspira a desenvolver interfaces mais limpas e funcionais. Entre adicionar por adicionar e simplificar, prefiro manter apenas o que realmente faz sentido.' },
];

export type SectionId = 'sobre' | 'projetos' | 'jogos' | 'contato';

export const ASSIST: Record<'hello' | SectionId, string> = {
    hello: 'Oi! Eu sou o Ruan em Pixels, seu guia! estarei por perto para apresentar cada seção.',
    sobre: 'Aqui esta uma parte da minha trajetória, minhas habilidades e os conhecimentos que continuo aprimorando.',
    projetos: 'Aqui estão alguns dos projetos que desenvolvi e compartilhei no Github. Escolha um para conhecer suas funcionalidades e as tecnologias utilizadas!',
    jogos: 'Aqui estão alguns dos jogos que marcaram minha jornada e as ideias que levei de cada um para o desenvolvimento.',
    contato: 'Chegamos ao fim da jornada! Se gostou do que viu ou acredita que podemos construir algo juntos, aqui estão meus contatos para continuarmos essa conversa!',
};

export const SECTIONS: SectionId[] = ['sobre', 'projetos', 'jogos', 'contato'];

export const SPRITE = {
    idle: '/img/ruan.png',
    talk: ['/img/ruan-meia-boca.png', '/img/ruan-falando.png'], 
    jump: '/img/ruan-pulando.png',
};

export const ABOUT = {
  title: 'Desenvolvo aplicações web do back-end à interface',
  paragraphs: [
    'Sou formado em Análise e Desenvolvimento de Sistemas e estou iniciando minha trajetória como desenvolvedor Full Stack. Gosto de aprender construindo. Cada projeto que desenvolvo nasce de uma ideia, um desafio ou algo que quero entender melhor na prática.',
    'Atualmente, estou aprofundando meus conhecimentos em APIs REST, TypeScript e Docker, enquanto busco minha primeira oportunidade para colaborar com uma equipe, aprender com profissonais experientes e contribuir com soluções reais.',
  ],
};

export const SHEET: { title: string; items: string[] }[] = [
  { title: 'Uso nos meus projetos', items: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Prisma', 'Vitest', 'Tailwind CSS', 'Express'] },
  { title: 'Aprofundando agora', items: ['APIs REST', 'Docker', 'Boas práticas de desenvolvimento' ] },
  { title: 'Ferramentas', items: ['Git', 'GitHub', 'PostgreSQL', 'PostMan', 'VS Code'] },
  { title: 'Meu jeito de desenvolver', items: ['Aprender construindo', 'Entender os problemas', 'Buscar soluções simples e bem estruturadas' ] },
];

export type ContactLink = {
  label: string;
  sub: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

export const CONTACT: ContactLink[] = [
  { label: 'Enviar e-mail', sub: 'rpnascimento1177@gmail.com', href: 'mailto:rpnascimento1177@gmail.com' },
  { label: 'Abrir GitHub', sub: 'github.com/Rp-1177', href: 'https://github.com/Rp-1177', external: true },
  { label: 'Abrir LinkedIn', sub: 'linkedin.com/in/rp1177', href: 'https://www.linkedin.com/in/rp1177', external: true },
];

export const JOURNAL = {
  title: 'Memórias de um desenvolvedor',
  lead: 'Como tudo começou e os caminhos que me trouxeram até aqui, contados em quatro capítulos.',
  hello: 'Esse é o meu diário de jornada! Aqui guardo um pouco da minha história. Pode ler com calma, vou ficar por aqui caso precise de alguma coisa!.',
  chapters: [
    {
      title: 'O primeiro contato',
      text: 'Meu interesse por tecnologia começou desde cedo. Na internet, eu passava horas explorando curiosidades e descobrindo coisas novas. Na adolescência, essa curiosidade foi além, comecei a explorar os arquivos internos dos jogos que jogava tentando entender o que existia por trás deles. Também acompanhava um criador de conteúdo que era programador. Ver como ele transformava linhas de código em algo funcional me fascinava. Mesmo sendo experiente, ele cometia erros, testava, corrigia e continuava, aquilo me mostrou que programar também era um processo de tentativa, aprendizado e persistência. Por muito tempo, essa curiosidade continuou comigo, uma curiosidade que começou muito antes de eu entender o que era programar.',
    },
    {
      title: 'A decisão',
      text: 'Durante a adolescência, continuei me aproximando da tecnologia por meio de cursos de informática, design gráfico e montagem e manutenção de computadores. Aos 18 anos, trabalhei por cerca de um ano realizando instalações de internet em residências. Nesse período, também ajudava minha mãe com as demandas digitais do salão de beleza dela, criava cartazes usando o Canvas, e então comecei a pensar em como a programação poderia me ajudar nisso, como eu poderia desenvolver soluções para facilitar o trabalho dela e ajudar em seu negocio. E foi nesse momento que comecei a enxergar a programação como um caminho que eu realmente queria seguir profissionalmente, decidi estudar pra me tornar um desenvolvedor.',
    },
    {
      title: 'A faculdade',
    text: 'Dois anos depois de decidir seguir na programação, surgiu uma oportunidade de dar um passo importante em direção ao meu objetivo, ingressar no curso de Análise e Desenvolvimento de Sistemas da UNIALFA. Em meio à pandemia, prestei o vestibular e conquistei minha vaga na modalidade EAD. Durante a graduação, tive contato com diferentes áreas da tecnologia, estudando disciplinas como Engenharia de Software, Segurança da Informação, Infraestrutura e Redes, Análise e Projeto de Sistemas, Programação e Banco de Dados. Entre tantos assuntos, foram o desenvolvimento de softwares e o trabalho com banco de dados que despertaram meu interesse e aos poucos, comecei a direcionar meus estudos para o desenvolvimento Front-end e Back-end, nas quais decidi construir minha trajetória profissional.',
    },
    {
      title: 'O próximo nível',
      text: 'Hoje, com a graduação em Análise e Desenvolvimento de Sistemas concluída, continuo aprofundando meus conhecimentos e transformando o aprendizado em prática, no VS Code, desenvolvo projetos próprios e experimentos para explorar tecnologias como React, TypeScript, Tailwind CSS, Node.js, Express e Docker, além de utilizar ferramentas como Git e GitHub para organizar e compartilhar meu progresso. Gosto de transformar ideias em projetos, experimentar novas possibilidades e aprender com cada desafio que encontro pelo caminho. Agora, busco minha primeiro oportunidade como Desenvolvedor Full Stack Júnior, onde possa colaborar com uma equipe, aprender com outros profissionais e contribuir com soluções de qualidade. Minha jornada até aqui foi construída por curiosidade, decisões e aprendizado, mas essa história está longe de terminar, este é apenas o próximo nível.',
    },
  ],
};