// Dados extraídos do protótipo Portfolio v2. Caminhos já relativos a /public.
export const T = {
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
  html: { name: 'HTML5', path: '/assets/tech/html5.svg' },
  css: { name: 'CSS', path: '/assets/tech/css.svg' },
};

export const NAV = [
  { name: 'Sobre', href: '#about' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Stack', href: '#stack' },
  { name: 'Experiência', href: '#work' },
  { name: 'Contato', href: '#contact' },
];

export const FEATURED = [
  { n: '01', kind: 'Landing page · TikTok Shop', title: 'Trilha Fashion', desc: 'Landing page do programa oficial de aceleração do TikTok Shop para sellers de moda.', href: 'https://trilhafashion.com.br', domain: 'trilhafashion.com.br', img: '/textures/project/trilhafashion.png', accent: '#FE2C55', tags: [T.next, T.react, T.tailwind, T.vercel] },
  { n: '02', kind: 'Sistema interno · Origenow', title: 'Consulta em Massa TTS', desc: 'Sistema de pesquisa e analytics para marketplaces, usado pelo time de inteligência comercial da Origenow.', href: 'https://analytics.origenow.com.br', domain: 'analytics.origenow.com.br', img: '/textures/project/consulta-tts-home.webp', accent: '#6366F1', tags: [T.next, T.node, T.postgres, T.tailwind] },
  { n: '03', kind: 'Institucional e catálogo', title: 'A Constrular', desc: 'Site institucional e catálogo de uma distribuidora de materiais de construção de Manhuaçu, com seis unidades na região.', href: 'https://aconstrular.com.br', domain: 'aconstrular.com.br', img: '/textures/project/constrular.png', accent: '#F59E0B', tags: [T.next, T.react, T.tailwind, T.vercel] },
  { n: '04', kind: 'Contabilidade para e-commerce', title: 'ContMinas', desc: 'Site de uma contabilidade especializada em vendedores da Amazon e do Mercado Livre, com SEO técnico e performance.', href: 'https://soucontminas.com.br', domain: 'soucontminas.com.br', img: '/textures/project/contminas.png', accent: '#10B981', tags: [T.next, T.react, T.tailwind, T.vercel] },
  { n: '05', kind: 'Saúde e bem-estar', title: 'Natureza em Cura', desc: 'Site de um espaço de yoga, meditação, psicologia e terapias integrativas, com agendamento de atendimentos.', href: 'https://www.naturezaemcura.com.br', domain: 'naturezaemcura.com.br', img: '/textures/project/naturezaemcura.webp', accent: '#65A30D', tags: [T.next, T.react, T.tailwind, T.vercel] },
  { n: '06', kind: 'Campanha · Deputado Federal RJ', title: 'André Português 1080', desc: 'Site de campanha com propostas, notícias, agenda, vídeos e recursos de acessibilidade como VLibras.', href: 'https://andreportugues.org', domain: 'andreportugues.org', img: '/textures/project/andreportugues.webp', accent: '#2563EB', tags: [T.html, T.css, T.js, T.tailwind] },
];

export const OTHERS = [
  { n: '07', title: 'LisoControl', kind: 'Finanças para universitários', href: 'https://projetointerdisciplinar-production.up.railway.app/', img: '/textures/project/lisocontrol-site.png', tags: [T.react, T.ts, T.supabase, T.vite] },
  { n: '08', title: 'Memória Sineira MG', kind: 'Acervo digital · UFV', href: 'https://memoria-sineira-mg-production.up.railway.app/', img: '/textures/project/memoria-sineira-site.png', tags: [T.next, T.ts, T.cloudflare, T.tailwind] },
  { n: '09', title: 'CoffeaWiki', kind: 'Catálogo de cultivares de café', href: 'https://coffea-wiki.vercel.app', img: '/textures/project/coffeawiki.png', tags: [T.react, T.vite, T.tailwind, T.js] },
  { n: '10', title: 'GSAP Motion Lab', kind: 'Laboratório de animações', href: 'https://curso-gsap.vercel.app/', img: '/textures/project/gsap-lab-site.png', tags: [T.gsap, T.js, T.three, T.vite] },
];

export const GROUPS = [
  { n: '01', title: 'Front-end', description: 'Desenvolvimento de interfaces e animações web.', items: [T.react, T.next, T.ts, T.js, T.tailwind, T.gsap, T.three, T.shadcn] },
  { n: '02', title: 'Back-end e dados', description: 'APIs, bancos de dados e integrações entre sistemas.', items: [T.node, T.express, T.postgres, T.supabase, T.python] },
  { n: '03', title: 'Build e deploy', description: 'Ferramentas de desenvolvimento, versionamento e deploy.', items: [T.vite, T.vercel, T.cloudflare, T.actions, T.figma] },
];

export const EXPS = [
  { name: 'Origenow', pos: 'Desenvolvimento full-stack', duration: '2026 até hoje', icon: '/assets/logos/origenow.webp', title: 'Desenvolvo sistemas internos, integrações de APIs e webhooks, além de sites e landing pages para clientes de e-commerce e marketplaces.' },
  { name: 'Natureza em Flores', pos: 'Marketing e desenvolvimento de produto interno', duration: '2024 até hoje', icon: '/assets/logos/natureza-em-flores.png', title: 'Atuo no marketing da empresa e desenvolvo um sistema interno para organizar pedidos, estoque e entregas.' },
  { name: 'IF Sudeste MG, Campus Manhuaçu', pos: 'Sistemas de Informação e iniciação científica', duration: '2023 até hoje', icon: '/assets/logos/if-sudeste-mg.svg', title: 'Sou graduando em Sistemas de Informação e bolsista de iniciação científica. Participei de pesquisas sobre jogos digitais aplicados ao ensino de inglês e do desenvolvimento de uma plataforma de realidade virtual, apresentada em Salvador. Na disciplina de Engenharia de Software III, desenvolvi um projeto sobre geração de cenários Gherkin com modelos de linguagem. Também participei da OBI no nível sênior e obtive o 3º lugar em Extensão no V ENEPE.' },
];

export const MARQUEE = ['Sistemas internos', 'Integrações e APIs', 'Sites e landing pages', 'Dados e analytics', 'Interfaces 3D', 'E-commerce e marketplaces'];
export const MANIFESTO = 'Sou desenvolvedor full-stack em Manhuaçu, MG. Na Origenow, construo sistemas internos, integrações de APIs e webhooks, e sites para e-commerce e marketplaces. Do banco de dados à última micro-interação.'.split(' ');

