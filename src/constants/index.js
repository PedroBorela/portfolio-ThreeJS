export const navLinks = [
  {
    id: 1,
    name: 'Início',
    href: '#home',
  },
  {
    id: 2,
    name: 'Sobre',
    href: '#about',
  },
  {
    id: 3,
    name: 'Projetos',
    href: '#projects',
  },
  {
    id: 4,
    name: 'Stack',
    href: '#stack',
  },
  {
    id: 5,
    name: 'Experiência',
    href: '#work',
  },
  {
    id: 6,
    name: 'Contato',
    href: '#contact',
  },
];

// Atalhos de ícones para reaproveitar nas tags dos projetos
const tech = {
  react: { name: 'React', path: '/assets/tech/react.svg' },
  next: { name: 'Next.js', path: '/assets/tech/nextdotjs.svg' },
  ts: { name: 'TypeScript', path: '/assets/tech/typescript.svg' },
  js: { name: 'JavaScript', path: '/assets/tech/javascript.svg' },
  tailwind: { name: 'TailwindCSS', path: '/assets/tech/tailwindcss.svg' },
  node: { name: 'Node.js', path: '/assets/tech/nodedotjs.svg' },
  express: { name: 'Express', path: '/assets/tech/express.svg' },
  supabase: { name: 'Supabase', path: '/assets/tech/supabase.svg' },
  postgres: { name: 'PostgreSQL', path: '/assets/tech/postgresql.svg' },
  vite: { name: 'Vite', path: '/assets/tech/vite.svg' },
  gsap: { name: 'GSAP', path: '/assets/tech/greensock.svg' },
  three: { name: 'Three.js', path: '/assets/tech/threedotjs.svg' },
  python: { name: 'Python', path: '/assets/tech/python.svg' },
  cloudflare: { name: 'Cloudflare', path: '/assets/tech/cloudflare.svg' },
  vercel: { name: 'Vercel', path: '/assets/tech/vercel.svg' },
  actions: { name: 'GitHub Actions', path: '/assets/tech/githubactions.svg' },
  shadcn: { name: 'shadcn/ui', path: '/assets/tech/shadcnui.svg' },
  figma: { name: 'Figma', path: '/assets/tech/figma.svg' },
};

const withIds = (items) => items.map((item, index) => ({ id: index + 1, ...item }));

export const myProjects = [
  {
    title: 'Trilha Fashion: programa oficial TikTok Shop',
    desc: 'Landing page do programa oficial de aceleração do TikTok Shop para sellers de moda.',
    subdesc:
      'Apresenta as etapas do programa, conteúdos, calendário de encontros e acesso aos grupos de WhatsApp por região.',
    href: 'https://trilhafashion.com.br',
    texture: '/textures/project/trilhafashion.png',
    logo: '/assets/logos/trilhafashion.svg',
    logoStyle: {
      backgroundColor: '#2A1016',
      border: '0.2px solid #45151F',
      boxShadow: '0px 0px 60px 0px #FE2C554D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: withIds([tech.next, tech.react, tech.tailwind, tech.vercel]),
  },
  {
    title: 'Consulta em Massa TTS da Origenow',
    desc: 'Sistema interno de pesquisa e analytics para marketplaces, usado pelo time de inteligência comercial da Origenow.',
    subdesc:
      'Processa consultas em lote, controla novas tentativas, normaliza resultados e exporta relatórios.',
    href: 'https://analytics.origenow.com.br',
    texture: '/textures/project/consulta-tts.png',
    logo: '/assets/logos/consulta-tts.svg',
    logoStyle: {
      backgroundColor: '#141433',
      border: '0.2px solid #1F1F52',
      boxShadow: '0px 0px 60px 0px #6366F14D',
    },
    spotlight: '/assets/spotlight2.png',
    tags: withIds([tech.next, tech.node, tech.postgres, tech.tailwind]),
  },
  {
    title: 'A Constrular: institucional e catálogo',
    desc: 'Site institucional e catálogo de uma distribuidora de materiais de construção de Manhuaçu, com seis unidades na região.',
    subdesc:
      'Reúne produtos por categoria, páginas das unidades, rotas, telefones e solicitação de cotação pelo WhatsApp.',
    href: 'https://aconstrular.com.br',
    texture: '/textures/project/constrular.png',
    logo: '/assets/logos/constrular.svg',
    logoStyle: {
      backgroundColor: '#2A1D08',
      border: '0.2px solid #45300D',
      boxShadow: '0px 0px 60px 0px #F59E0B4D',
    },
    spotlight: '/assets/spotlight3.png',
    tags: withIds([tech.next, tech.react, tech.tailwind, tech.vercel]),
  },
  {
    title: 'ContMinas: contabilidade para e-commerce',
    desc: 'Site de uma contabilidade especializada em vendedores da Amazon e do Mercado Livre.',
    subdesc:
      'Apresenta serviços, depoimentos e formulário de diagnóstico, com trabalho de SEO técnico e performance.',
    href: 'https://soucontminas.com.br',
    texture: '/textures/project/contminas.png',
    logo: '/assets/logos/contminas.svg',
    logoStyle: {
      backgroundColor: '#0C2620',
      border: '0.2px solid #133D33',
      boxShadow: '0px 0px 60px 0px #10B9814D',
    },
    spotlight: '/assets/spotlight4.png',
    tags: withIds([tech.next, tech.react, tech.tailwind, tech.vercel]),
  },
  {
    title: 'LisoControl: finanças para universitários',
    desc: 'Aplicação de gestão financeira para universitários, com controle de gastos, cartões, parcelas e limites por categoria.',
    subdesc:
      'Inclui despesas recorrentes, geração de parcelas, relatórios e exportação em CSV. Utiliza React, TypeScript e Supabase com Row Level Security.',
    href: 'https://projetointerdisciplinar-production.up.railway.app/',
    texture: '/textures/project/lisocontrol-site.png',
    logo: '/assets/logos/lisocontrol.svg',
    logoStyle: {
      backgroundColor: '#0D2818',
      border: '0.2px solid #144026',
      boxShadow: '0px 0px 60px 0px #22C55E4D',
    },
    spotlight: '/assets/spotlight5.png',
    tags: withIds([tech.react, tech.ts, tech.supabase, tech.vite]),
  },
  {
    title: 'Memória Sineira MG: acervo digital',
    desc: 'Acervo digital sobre sinos, toques e o ofício de sineiro em Ouro Preto e Mariana, criado para uma pesquisa de mestrado da UFV.',
    subdesc:
      'Reúne documentos, paisagens sonoras, fotografias e mapas gerados com dados geográficos do IBGE.',
    href: 'https://memoria-sineira-mg-production.up.railway.app/',
    texture: '/textures/project/memoria-sineira-site.png',
    logo: '/assets/logos/memoria-sineira.svg',
    logoStyle: {
      backgroundColor: '#2A1B0C',
      border: '0.2px solid #452D13',
      boxShadow: '0px 0px 60px 0px #CD7F324D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: withIds([tech.next, tech.ts, tech.cloudflare, tech.tailwind]),
  },
  {
    title: 'CoffeaWiki: catálogo de cultivares de café',
    desc: 'Catálogo de cultivares de Coffea arabica para consulta por produtores, agrônomos e estudantes.',
    subdesc:
      'Organiza informações sobre origem, produtividade, porte, resistência a doenças e condições de cultivo.',
    href: 'https://coffea-wiki.vercel.app',
    texture: '/textures/project/coffeawiki.png',
    logo: '/assets/logos/coffeawiki.svg',
    logoStyle: {
      backgroundColor: '#2A1E10',
      border: '0.2px solid #45311A',
      boxShadow: '0px 0px 60px 0px #C0873F4D',
    },
    spotlight: '/assets/spotlight2.png',
    tags: withIds([tech.react, tech.vite, tech.tailwind, tech.js]),
  },
  {
    title: 'GSAP Motion Lab',
    desc: 'Projeto de estudos e testes de animações para interfaces web.',
    subdesc:
      'Inclui exemplos com ScrollTrigger, timelines, transições e testes de desempenho em telas menores.',
    href: 'https://curso-gsap.vercel.app/',
    texture: '/textures/project/gsap-lab-site.png',
    logo: '/assets/logos/gsap-lab.svg',
    logoStyle: {
      backgroundColor: '#1B2607',
      border: '0.2px solid #2C3D0C',
      boxShadow: '0px 0px 60px 0px #88CE024D',
    },
    spotlight: '/assets/spotlight3.png',
    tags: withIds([tech.gsap, tech.js, tech.three, tech.vite]),
  },
];

export const techStack = [
  {
    id: 1,
    title: 'Front-end',
    description: 'Desenvolvimento de interfaces e animações web.',
    items: [tech.react, tech.next, tech.ts, tech.js, tech.tailwind, tech.gsap, tech.three, tech.shadcn],
  },
  {
    id: 2,
    title: 'Back-end & dados',
    description: 'APIs, bancos de dados e integrações entre sistemas.',
    items: [tech.node, tech.express, tech.postgres, tech.supabase, tech.python],
  },
  {
    id: 3,
    title: 'Build & deploy',
    description: 'Ferramentas de desenvolvimento, versionamento e deploy.',
    items: [tech.vite, tech.vercel, tech.cloudflare, tech.actions, tech.figma],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.8, 0],
    cubePosition: isSmall ? [6, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [8, -5, 0] : [11, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 3, 0] : isTablet ? [8, 2, 0] : [16, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-14, 5, 0] : isTablet ? [-16, 4, 0] : [-24, 11, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'Origenow',
    pos: 'Desenvolvimento Full-Stack',
    duration: '2026 até hoje',
    title:
      'Desenvolvo sistemas internos, integrações de APIs e webhooks, além de sites e landing pages para clientes de e-commerce e marketplaces.',
    icon: '/assets/logos/origenow.webp',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'Natureza em Flores',
    pos: 'Marketing e desenvolvimento de produto interno',
    duration: '2024 até hoje',
    title:
      'Atuo no marketing da empresa e desenvolvo um sistema interno para organizar pedidos, estoque e entregas.',
    icon: '/assets/logos/natureza-em-flores.png',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'IF Sudeste MG, Campus Manhuaçu',
    pos: 'Sistemas de Informação e iniciação científica',
    duration: '2023 até hoje',
    title:
      'Sou graduando em Sistemas de Informação e bolsista de iniciação científica. Participei de pesquisas sobre jogos digitais aplicados ao ensino de inglês e do desenvolvimento de uma plataforma de realidade virtual, apresentada em Salvador. Na disciplina de Engenharia de Software III, desenvolvi um projeto sobre geração de cenários Gherkin com modelos de linguagem. Também participei da OBI no nível sênior e obtive o 3º lugar em Extensão no V ENEPE.',
    icon: '/assets/logos/if-sudeste-mg.svg',
    animation: 'salute',
  },
];
