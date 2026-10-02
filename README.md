# Portfólio de Pedro Borela · v2

Portfólio pessoal de **Pedro Borela Andrade**, desenvolvedor full-stack em Manhuaçu (MG).
Home com loader, hero com uma bolha de vidro em 3D, sobre em bento, projetos em
scroll horizontal, stack, experiência em acordeão e formulário de contato, e a página
`/servicos` com a oferta (landing page básica, landing page premium e sistema sob medida),
o processo de trabalho, projetos de exemplo e o formulário com o serviço pré-selecionado.

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

O template recebe `from_name`, `from_email`, `reply_to`, `phone`, `service`, `page`,
`message`, `raw_message`, `to_name` e `to_email`. O `message` já traz serviço, WhatsApp e
página no topo, então um template que só usa `{{message}}` continua completo. Sem as
variáveis, o site funciona normalmente e o formulário mostra a mensagem de erro ao enviar.
O campo escondido `website` é um honeypot: se vier preenchido, o envio é ignorado.

> As variáveis `VITE_*` entram no bundle do navegador. A public key do EmailJS foi feita
> para isso; proteja o envio com a lista de domínios permitidos e o limite de envios no
> painel do EmailJS.

## Estrutura

```
public/
  assets/            ícones, terminal.png, logos/ e tech/ (ícones das tecnologias)
  fonts/             General Sans (woff2, servida localmente)
  textures/project/  capas dos projetos (1600×949)
  hdri/              HDR do reflexo da bolha 3D (antes vinha do raw.githack.com)
src/
  constants/portfolio.js   todo o conteúdo: projetos, stack, experiência, navegação
  lib/gsap.js              registro dos plugins, breakpoints e helpers de animação
  lib/router.js            rotas / e /servicos (History API), título da página
  lib/webgl.js             teste de WebGL2 antes de baixar o chunk 3D
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
    ui/ErrorBoundary.jsx   isola falhas (a bolha 3D e o app inteiro têm fallback)
    three/GlassBlob.jsx    bolha de vidro (carregada sob demanda)
  pages/Services.jsx       página /servicos
  sections/                Navbar, Hero, MarqueeBand, About, Projects, OtherProjects,
                           ServicesCta, Stack, Experience, Contact, Footer
  App.jsx                  composição, loader → intro, Lenis, rotas e links internos
```

Os serviços, o processo e as opções do formulário ficam em `SERVICES`, `PROCESS` e
`SERVICE_OPTIONS`, no mesmo arquivo.

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
  pausa fora da viewport. Em telas menores que 700px e em telas de toque a malha usa
  menos vértices, o DPR é menor e a transmissão usa menos amostras.
- **Falhas da bolha 3D:** sem WebGL2 o chunk nem é baixado; se o chunk, o HDR ou o
  contexto WebGL falharem (o iOS derruba contextos sob pressão de memória), um
  `ErrorBoundary` troca o canvas por uma bolha estática em CSS. Antes disso, qualquer
  falha ali desmontava a página inteira e deixava a tela preta.
- **Rotas:** `/` e `/servicos`, com um roteador mínimo em `lib/router.js`. O host precisa
  devolver o `index.html` em qualquer caminho (o Railway já faz isso). Links como
  `/#projects` trocam de página e rolam até a seção.
- **Acessibilidade:** com `prefers-reduced-motion: reduce` não há Lenis, loader,
  cursor customizado nem animações contínuas, e todo o conteúdo aparece. O cursor
  customizado só existe com `(pointer: fine)`.
- **Dependências:** `three` fica em `0.175.x` porque o `three-stdlib` (usado pelo drei)
  ainda importa `LuminanceFormat`, removido no three r176.

## Deploy

O site está no Railway (serviço `portfolio-ThreeJS`, branch `redesign/v2`). O build é
estático (`dist/`) e roda em qualquer host:

- comando de build: `npm run build`
- diretório de saída: `dist`
- variáveis: as três `VITE_EMAILJS_*` no painel do host. Elas entram no bundle **no
  build**, então depois de cadastrar é preciso um novo deploy.

O workflow `.github/workflows/ci.yml` roda `lint` e `build` a cada push em `master` e
`redesign/v2` e em pull requests para `master`. Para o build do CI incluir as chaves,
cadastre as mesmas variáveis em **Settings → Secrets and variables → Actions**.
