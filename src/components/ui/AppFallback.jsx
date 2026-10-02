// Última rede de segurança: em vez da tela preta, uma mensagem com o contato e o botão de recarregar
const AppFallback = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-pf-black px-gutter text-center text-pf-text">
    <p className="m-0 text-2xl font-semibold text-white">Pedro Borela</p>
    <p className="m-0 max-w-[420px] text-base leading-[1.6]">
      Algo deu errado ao carregar a página. Tente recarregar ou fale comigo em{' '}
      <a href="mailto:pborela2014@gmail.com" className="text-white underline underline-offset-4">
        pborela2014@gmail.com
      </a>
      .
    </p>
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="rounded-md border border-white/10 bg-white/5 px-5 py-3 text-base text-white"
    >
      Recarregar
    </button>
  </div>
);

export default AppFallback;
