import { Section } from "@/components/layout/Section";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { produtos } from "@/content/produtos";

export function Portfolio() {
  return (
    <Section id="produtos" className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-blue/5 blur-3xl"
      />

      <div className="relative">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-end">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-blue">
                <span
                  aria-hidden="true"
                  className="h-px w-7 bg-gradient-to-r from-blue to-blue-light"
                />
                NOSSO PORTFÓLIO
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
                Sistemas e soluções para{" "}
                <span className="bg-gradient-to-r from-blue to-blue-light bg-clip-text text-transparent">
                  diferentes áreas.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base lg:justify-self-end">
              Conheça nossos principais produtos e descubra como podemos ajudar
              o seu negócio a ser mais eficiente, conectado e preparado para o
              futuro.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((produto, indice) => (
            <Reveal key={produto.slug} delay={indice * 70} className="h-full">
              <ProductCard produto={produto} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
