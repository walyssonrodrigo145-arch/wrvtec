import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { diferenciais } from "@/content/diferenciais";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Sobre nós",
  description:
    "Conheça a WRV Tecnologia: tecnologia para simplificar negócios e conectar pessoas. Sistemas, sites, aplicativos e infraestrutura em nuvem sob medida.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-mist pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-light/20 blur-3xl" />
          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-blue/10 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.22em] text-blue">
            SOBRE A WRV TECNOLOGIA
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">
            Tecnologia para simplificar negócios e conectar pessoas.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            A WRV Tecnologia desenvolve sistemas e soluções sob medida para
            empresas, escolas, profissionais e negócios de diferentes áreas.
            Unimos tecnologia, experiência e um atendimento próximo para criar
            soluções que realmente fazem a diferença no dia a dia dos nossos
            clientes.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Do planejamento à execução, estamos com você: entendemos o seu
            desafio, desenhamos a solução e acompanhamos a evolução do seu
            negócio com suporte especializado e parceria de longo prazo.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
          Por que escolher a WRV Tecnologia
        </h2>
        <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {diferenciais.map((item) => (
            <li key={item.titulo}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-mist text-blue">
                <Icon name={item.icone} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-navy">
                {item.titulo}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {item.descricao}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-navy text-white">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Vamos conversar sobre o seu projeto?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Fale com a nossa equipe pelo WhatsApp ou envie uma mensagem
              contando o seu desafio.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="white" size="lg" href="/#contato">
              Fale Conosco
              <Icon name="arrow-right" className="h-4 w-4" />
            </Button>
            <Button variant="onDark" size="lg" href={`mailto:${site.email}`}>
              {site.email}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
