import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { gsap, useGSAP, batchFade, MOTION } from '../lib/gsap';
import MagneticButton from '../components/ui/MagneticButton';
import SectionTitle from '../components/ui/SectionTitle';

const EMAIL = 'pborela2014@gmail.com';
const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/PedroBorela', icon: '/assets/github.svg', iconClass: 'h-1/2 w-1/2' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pedro-borela-25b421250/',
    icon: '/assets/tech/linkedin.svg',
    iconClass: 'h-[44%] w-[44%] brightness-0 invert',
  },
  { label: 'Instagram', href: 'https://instagram.com/pedro.borela', icon: '/assets/instagram.svg', iconClass: 'h-1/2 w-1/2' },
];

// Campo do formulário (PfField): label acima, input #0E0E10 com borda #1C1C21
const Field = ({ label, name, multiline = false, ...props }) => {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <label className="flex flex-col gap-3">
      <span className="text-lg text-pf-text">{label}</span>
      <Tag
        name={name}
        className="min-h-14 w-full resize-none rounded-lg border border-pf-border bg-pf-surface px-5 py-3.5 text-lg text-pf-text-strong outline-none transition-colors placeholder:text-pf-muted focus:border-pf-muted"
        {...props}
      />
    </label>
  );
};

const SUBMIT_LABEL = { idle: 'Enviar mensagem', sending: 'Enviando...', sent: 'Mensagem enviada', error: 'Enviar mensagem' };

const Contact = () => {
  const rootRef = useRef(null);
  const formRef = useRef(null);
  const sentTimer = useRef(null);
  const [status, setStatus] = useState('idle');

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => batchFade(rootRef.current));
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  useEffect(() => () => clearTimeout(sentTimer.current), []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const data = new FormData(formRef.current);
    setStatus('sending');
    clearTimeout(sentTimer.current);

    try {
      if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) {
        throw new Error('EmailJS não configurado: defina as variáveis VITE_EMAILJS_* no .env');
      }
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: data.get('name'),
          from_email: data.get('email'),
          message: data.get('message'),
          to_name: 'Pedro',
          to_email: EMAIL,
        },
        { publicKey: EMAILJS.publicKey },
      );
      formRef.current.reset();
      setStatus('sent');
      sentTimer.current = setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.warn('Falha ao enviar a mensagem:', error);
      setStatus('error');
    }
  };

  const sent = status === 'sent';

  return (
    <section ref={rootRef} id="contact" className="relative overflow-hidden px-gutter pb-section-end pt-section">
      <img
        src="/assets/terminal.png"
        alt=""
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.22] [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]"
      />
      <div className="relative mx-auto grid max-w-site grid-cols-1 items-start gap-[clamp(48px,6vw,96px)] wide:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div>
          <span data-fade="" className="mb-4 block text-sm text-pf-muted">
            06 · Contato
          </span>
          <SectionTitle
            lines={['Vamos construir', 'algo juntos?']}
            className="text-[clamp(48px,6.6vw,100px)] leading-[0.98] tracking-[-0.045em]"
          />
          <p data-fade="" className="mb-0 mt-8 max-w-[460px] text-lg leading-[1.6] text-pf-text">
            Entre em contato para conversar sobre desenvolvimento de sites, sistemas, integrações ou outros projetos digitais.
          </p>
          <div data-fade="" className="mt-10 flex flex-col gap-6">
            <a
              href={`mailto:${EMAIL}`}
              className="flex w-fit items-center gap-2.5 text-xl text-pf-text-strong transition-colors hover:text-white"
            >
              {EMAIL} <img src="/assets/arrow-up.png" alt="" className="h-3 w-3" />
            </a>
            <div className="flex gap-3">
              {SOCIALS.map((social) => (
                <MagneticButton
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  strength={0.45}
                  className="blur-glass box-content flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/10 bg-white/5"
                >
                  <img src={social.icon} alt="" className={social.iconClass} />
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          data-fade=""
          className="glass relative flex flex-col gap-7 p-[clamp(24px,3vw,40px)] backdrop-blur-[24px] backdrop-saturate-[1.4]"
        >
          <Field label="Nome" name="name" type="text" placeholder="Ex.: Maria Silva" autoComplete="name" required />
          <Field label="E-mail" name="email" type="email" placeholder="Ex.: maria@empresa.com.br" autoComplete="email" required />
          <Field label="Mensagem" name="message" multiline rows={5} placeholder="Descreva brevemente o seu projeto." required />
          <MagneticButton
            as="button"
            type="submit"
            strength={0.15}
            disabled={status === 'sending'}
            className="flex min-h-14 items-center justify-center gap-3 rounded-lg bg-pf-muted-2 px-5 py-2 text-lg text-white shadow-[0_25px_50px_-12px_#0E0E10] transition-colors hover:bg-[#4A4A5C] disabled:cursor-wait"
          >
            {SUBMIT_LABEL[status]}
            <span className="relative h-3 w-3" aria-hidden="true">
              <img
                src="/assets/arrow-up.png"
                alt=""
                className={`absolute inset-0 h-full w-full brightness-0 invert ${sent ? 'opacity-0' : 'opacity-100'}`}
              />
              <img src="/assets/tick.svg" alt="" className={`absolute inset-0 h-full w-full ${sent ? 'opacity-100' : 'opacity-0'}`} />
            </span>
          </MagneticButton>
          <div aria-live="polite" className="empty:hidden">
            {sent && <p className="m-0 text-center text-[15px] text-pf-ping">Sua mensagem foi enviada! Respondo em breve.</p>}
            {status === 'error' && (
              <p className="m-0 text-center text-[15px] text-[#F87171]">
                Não consegui enviar sua mensagem. Tente de novo ou me chame por e-mail.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
