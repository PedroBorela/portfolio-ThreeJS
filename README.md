# Portfólio de Pedro Borela · v2

Portfólio pessoal de **Pedro Borela Andrade**, desenvolvedor full-stack em Manhuaçu (MG).
Página única com loader, hero com uma bolha de vidro em 3D, sobre em bento, projetos em
scroll horizontal, stack, experiência em acordeão e formulário de contato.

🔗 [pedroborela.dev](https://pedroborela.dev)

## Stack

| Camada | Tecnologias |
|---|---|
| UI | React 19, TailwindCSS 3 |
| Animação | GSAP 3 + ScrollTrigger (`@gsap/react`), Lenis (smooth scroll) |
| 3D | Three.js, @react-three/fiber, @react-three/drei (`MeshTransmissionMaterial`) |
| Contato | EmailJS (`@emailjs/browser`) |
| Build e CI | Vite 6, ESLint 9, GitHub Actions |

## Como rodar

Requer Node 20 ou superior.

```bash
npm install
cp .env.example .env   # preencha as chaves do EmailJS
npm run dev            # http://localhost:5173
npm run lint
npm run build          # gera dist/
npm run preview        # serve o build
```

## Variáveis de ambiente

O formulário de contato envia pelo EmailJS. As chaves ficam em `.env`, que está no
`.gitignore`; o modelo é o `.env.example`.

| Variável | Onde encontrar |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS → Email Services |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS → Email Templates |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS → Account → Public Key |

O template recebe `from_name`, `from_email`, `message`, `to_name` e `to_email`. Sem as
variáveis, o site funciona normalmente e o formulário mostra a mensagem de erro ao enviar.

> As variáveis `VITE_*` entram no bundle do navegador. A public key do EmailJS foi feita
> para isso; proteja o envio com a lista de domínios permitidos e o limite de envios no
> painel do EmailJS.

## Estrutura

```
public/
  assets/            ícones, terminal.png, logos/ e tech/ (ícones das tecnologias)
  fonts/             General Sans (woff2, servida localmente)
  textures/project/  capas dos projetos (1600×949)
src/
  constants/portfolio.js   todo o conteúdo: projetos, stack, experiência, navegação
  lib/gsap.js              registro dos plugins, breakpoints e helpers de animação
  hooks/
    useLenis.js            Lenis + ScrollTrigger pelo gsap.ticker; contexto e scrollTo
    useMagnetic.js         efeito magnético (ref)
    useTilt.js             tilt 3D + variáveis --mx/--my do brilho
    useHoverBounce.js      pulo elástico de chips e ícones
    useBrasiliaClock.js    relógio America/Sao_Paulo (um intervalo compartilhado)
    useMediaQuery.js       matchMedia reativo
  components/
    ui/                    Loader, Cursor, Background, GlassCard, MagneticButton,
                           Marquee, SectionTitle, Ping
    three/GlassBlob.jsx    bolha de vidro (carregada sob demanda)
  sections/                Navbar, Hero, MarqueeBand, About, Projects, OtherProjects,
                           Stack, Experience, Contact, Footer
  App.jsx                  composição, loader → intro, Lenis e âncoras
```

Para adicionar um projeto, acrescente um objeto em `FEATURED` (scroll horizontal) ou
`OTHERS` (lista) em `src/constants/portfolio.js` e coloque a capa em
`public/textures/project/`.

## Notas técnicas

- **Animações:** todas usam `useGSAP()` com `scope`, então são desfeitas ao desmontar.
  Desktop e mobile são separados com `gsap.matchMedia()`. O breakpoint único é
  `(max-width: 860px), (max-height: 719px)`; no Tailwind, o layout de desktop usa a
  variante `wide:`.
- **Projetos:** no desktop (≥861px de largura e ≥720px de altura) a seção fica fixa e
  a trilha rola na horizontal; no mobile vira uma coluna com fade-up.
- **Bolha 3D:** o `<Canvas>` é carregado com `lazy` + `Suspense` em um chunk separado.
  Os shaders são compilados com `compileAsync` antes do primeiro frame e o render
  pausa fora da viewport. Em telas menores que 700px a malha usa menos vértices.
- **Acessibilidade:** com `prefers-reduced-motion: reduce` não há Lenis, loader,
  cursor customizado nem animações contínuas, e todo o conteúdo aparece. O cursor
  customizado só existe com `(pointer: fine)`.
- **Dependências:** `three` fica em `0.175.x` porque o `three-stdlib` (usado pelo drei)
  ainda importa `LuminanceFormat`, removido no three r176.

## Deploy

O build é estático (`dist/`) e roda em qualquer host (Vercel, Netlify, Cloudflare Pages):

- comando de build: `npm run build`
- diretório de saída: `dist`
- variáveis: as três `VITE_EMAILJS_*` no painel do host

O workflow `.github/workflows/ci.yml` roda `lint` e `build` a cada push em `master` e
`redesign/v2` e em pull requests para `master`. Para o build do CI incluir as chaves,
cadastre as mesmas variáveis em **Settings → Secrets and variables → Actions**.
