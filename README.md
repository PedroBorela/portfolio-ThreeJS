# Portfólio de Pedro Borela

Portfólio pessoal de **Pedro Borela Andrade**, desenvolvedor full-stack em Manhuaçu (MG).
Feito com React, Three.js e TailwindCSS, com cena 3D interativa no hero e um monitor
retrô que exibe a capa de cada projeto.

🔗 [pedroborela.dev](https://pedroborela.dev)

## Stack

| Camada | Tecnologias |
|---|---|
| UI | React 19, TailwindCSS 3, GSAP |
| 3D | Three.js, @react-three/fiber, @react-three/drei, react-globe.gl |
| Build | Vite 6 |
| Contato | EmailJS |

## Seções

- **Início**: cena 3D com o quarto de trabalho, logo do React, anel e cubo flutuantes.
- **Sobre**: bio, formação, globo com a localização (Manhuaçu, MG) e e-mail com copiar-em-um-clique.
- **Projetos**: carrossel dos trabalhos que estão no ar, com a capa renderizada no monitor 3D.
- **Stack & ferramentas**: o que uso em front-end, back-end/dados e build/deploy.
- **Experiência**: Origenow, Natureza em Flores e formação, com o boneco 3D reagindo ao hover.
- **Contato**: formulário funcional via EmailJS.

## Projetos em destaque

| Projeto | O que é | Stack |
|---|---|---|
| [Trilha Fashion](https://trilhafashion.com.br) | Landing do programa oficial de aceleração TikTok Shop | Next.js, React, Tailwind |
| [Consulta em Massa TTS](https://analytics.origenow.com.br) | Sistema de pesquisa e analytics de marketplace da Origenow | Next.js, Node, PostgreSQL |
| [A Constrular](https://aconstrular.com.br) | Institucional e catálogo, 6 unidades na região de Manhuaçu | Next.js, React, Tailwind |
| [ContMinas](https://soucontminas.com.br) | Contabilidade para e-commerce, integrada a Amazon e ML | Next.js, React, Tailwind |
| [LisoControl](https://projetointerdisciplinar-production.up.railway.app/) | Gestão financeira para universitários | React 19, TypeScript, Supabase |
| [Memória Sineira MG](https://memoria-sineira-mg-production.up.railway.app/) | Acervo digital do ofício de sineiro em Ouro Preto e Mariana | Next.js, Cloudflare Workers, D1 |
| [CoffeaWiki](https://coffea-wiki.vercel.app) | Catálogo interativo de cultivares de café | React, Vite, Tailwind |
| [GSAP Motion Lab](https://curso-gsap.vercel.app/) | Laboratório de animações web de alta performance | GSAP, Three.js |

## Estrutura

```
public/
  assets/        ícones de interface
  assets/tech/   ícones das tecnologias (simple-icons)
  assets/logos/  marcas dos projetos
  draco/         decodificador Draco self-hosted (usado pelos .glb)
  models/        modelos 3D (.glb) e animações (.fbx)
  textures/      texturas da cena e capas dos projetos
src/
  components/    componentes 3D e reutilizáveis
  constants/     dados do site (projetos, stack, experiências, navegação)
  sections/      seções da página
```

Todo o conteúdo do site (projetos, stack e experiências) vive em
`src/constants/index.js`. Para adicionar um projeto, basta acrescentar um objeto em
`myProjects` e colocar a capa em `public/textures/project/`.

## Rodando localmente

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # gera dist/
npm run preview # serve o build
npm run lint
```

Node 18 ou superior.

## Notas técnicas

- Os modelos `.glb` são comprimidos com Draco. O decodificador é servido de
  `public/draco/` em vez do CDN do Google, que carrega mais rápido e o site não quebra
  se o CDN estiver indisponível.
- As capas dos projetos são imagens (`.png`) aplicadas como textura no monitor 3D.
- O formulário de contato usa EmailJS; as chaves ficam em `src/sections/Contact.jsx`.
  São chaves públicas de front-end, mas o ideal é migrá-las para variáveis de
  ambiente (`import.meta.env.VITE_*`) antes de escalar o uso.

## Créditos

Base 3D inspirada no template de portfólio da JavaScript Mastery, reescrita com
conteúdo, estrutura de dados e projetos próprios.
