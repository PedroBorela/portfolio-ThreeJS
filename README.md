# Portfólio 3D com React e Three.js

Este é um projeto de portfólio interativo desenvolvido com React, Three.js e TailwindCSS. Ele apresenta animações 3D, seções dinâmicas e uma interface moderna para exibir projetos, experiências e informações de contato.

## 🚀 Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **Three.js**: Framework para renderização 3D.
- **@react-three/fiber**: Integração do Three.js com React.
- **@react-three/drei**: Conjunto de utilitários para facilitar o uso do Three.js.
- **TailwindCSS**: Framework CSS para estilização.
- **GSAP**: Biblioteca para animações avançadas.
- **EmailJS**: Serviço para envio de e-mails diretamente do front-end.
- **Vite**: Ferramenta para desenvolvimento e build do projeto.

## 📁 Estrutura de Pastas

- `./public`: Contém arquivos estáticos acessíveis publicamente.
  - `assets`: Imagens, texturas e outros recursos estáticos.
  - `favicon.ico`: Ícone do site.

- `./src`: Código-fonte principal da aplicação React.
  - `components`: Componentes reutilizáveis.
    - `Navbar.jsx`: Barra de navegação.
    - `Footer.jsx`: Rodapé.
    - `Button.jsx`: Exemplo de botão reutilizável.
  - `constants`: Dados estáticos.
    - `data.js`: Dados como links de navegação e projetos.
  - `sections`: Seções do site.
    - `Hero.jsx`: Seção inicial.
    - `About.jsx`: Seção "Sobre Mim".
    - `Projects.jsx`: Seção de projetos.
    - `Experience.jsx`: Seção de experiência.
    - `Contact.jsx`: Seção de contato.
  - `styles`: Estilos globais e específicos.
    - `globals.css`: Estilos globais.
  - `App.jsx`: Componente principal do aplicativo.
  - `main.jsx`: Ponto de entrada do React.
  - `index.css`: Estilos principais.

- `./.gitignore`: Lista de arquivos/pastas ignorados pelo Git (ex: node_modules, .env).
- `./package.json`: Configuração do projeto (dependências, scripts, metadados).
- `./tailwind.config.js`: Configuração do TailwindCSS.
- `./vite.config.js`: Configuração do Vite (build, plugins, server).
- `README.md`: Documentação do projeto.




## 🖥️ Funcionalidades

- **Hero Section**: Apresentação inicial com animações 3D.
- **Sobre Mim**: Informações sobre o desenvolvedor e sua experiência.
- **Projetos**: Galeria de projetos com detalhes e links para visualização.
- **Experiência**: Animações 3D interativas para exibir experiências de trabalho.
- **Clientes**: Depoimentos de clientes com avaliações.
- **Contato**: Formulário funcional para envio de mensagens via EmailJS.
- **Footer**: Rodapé com links para redes sociais e informações legais.

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- Gerenciador de pacotes npm ou yarn

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/threejs_portfolio.git
   cd threejs_portfolio

npm install

npm run dev

http://localhost:5173



