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