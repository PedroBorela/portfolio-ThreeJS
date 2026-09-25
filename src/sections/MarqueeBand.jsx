import { MARQUEE } from '../constants/portfolio';
import Marquee from '../components/ui/Marquee';

// Faixa inclinada entre o hero e o sobre; os itens alternam preenchido e contorno.
const MarqueeBand = () => (
  <div className="blur-glass-sat relative z-[2] mx-[-4vw] mt-6 -rotate-2 overflow-hidden border-y border-white/[0.08] bg-white/[0.03] py-[22px]">
    <Marquee
      items={MARQUEE}
      speed={36}
      renderItem={(text, i, clone) => (
        <span
          key={i}
          aria-hidden={clone || undefined}
          className={`flex items-center gap-9 whitespace-nowrap pr-9 text-[clamp(28px,4vw,56px)] font-semibold tracking-[-0.03em] ${
            i % 2 ? 'text-outline' : 'text-pf-silver'
          }`}
        >
          {text}
          <span className="h-2.5 w-2.5 rounded-full bg-pf-muted-2" />
        </span>
      )}
    />
  </div>
);

export default MarqueeBand;
