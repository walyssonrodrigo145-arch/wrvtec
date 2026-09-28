import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { HeroMockup } from "@/components/sections/HeroMockup";
import { site } from "@/content/site";

const selos: Array<{ label: string; icone: IconName }> = [
  { label: "Inovação constante", icone: "sparkles" },
  { label: "Suporte especializado", icone: "headset" },
  { label: "Soluções personalizadas", icone: "layers" },
  { label: "Segurança dos seus dados", icone: "shield" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-mist pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-light/25 blur-3xl" />
        <div className="absolute -right-24 top-32 h-[28rem] w-[28rem] rounded-full bg-blue/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#7B3FF2]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <p className="animate-rise flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-blue">
            <span
              aria-hidden="true"
              className="h-px w-7 bg-gradient-to-r from-blue to-blue-light"
            />
            {site.eyebrow}
          </p>

          <h1 className="animate-rise mt-4 font-display text-4xl font-bold leading-[1.12] text-navy [animation-delay:80ms] sm:text-5xl lg:text-[3.3rem]">
            Soluções digitais para o seu negócio{" "}
            <span className="bg-gradient-to-r from-blue to-blue-light bg-clip-text text-transparent">
              ir mais longe.
            </span>
          </h1>

          <p className="animate-rise mt-6 max-w-xl text-base leading-relaxed text-muted [animation-delay:160ms] sm:text-lg">
            Desenvolvemos sistemas e soluções sob medida para empresas, escolas,
            profissionais e negócios de diferentes áreas. Mais organização,
            eficiência e resultados através da tecnologia.
          </p>

          <div className="animate-rise mt-8 [animation-delay:240ms]">
            <Button href="/#produtos" size="lg" className="group">
              Conheça nossos produtos
              <Icon
                name="arrow-right"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </div>

          <ul className="animate-rise mt-10 grid grid-cols-2 gap-x-5 gap-y-4 [animation-delay:320ms] lg:grid-cols-4">
            {selos.map((selo) => (
              <li key={selo.label} className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-blue shadow-sm">
                  <Icon name={selo.icone} className="h-[18px] w-[18px]" />
                </span>
                <span className="text-xs font-medium leading-tight text-navy/75">
                  {selo.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-rise relative [animation-delay:200ms]">
          <HeroMockup className="h-auto w-full" />

          <div className="animate-float absolute -right-2 top-2 w-44 rotate-2 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-[0_18px_40px_-18px_rgba(11,30,62,0.45)] backdrop-blur-md sm:top-6 sm:w-52">
            <p className="font-display text-[13px] italic leading-snug text-navy">
              Do planejamento à execução, estamos com você.
            </p>
            <svg
              viewBox="0 0 72 10"
              className="mt-2 h-2.5 w-16 text-blue"
              aria-hidden="true"
            >
              <path
                d="M2 7c12-6 22-6 34-2 12 4 22 4 34-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="absolute bottom-24 left-0 hidden items-center gap-2.5 rounded-2xl border border-white/70 bg-white/75 py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-20px_rgba(11,30,62,0.5)] backdrop-blur-md sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success">
              <Icon name="shield" className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold text-navy">
              Dados protegidos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
