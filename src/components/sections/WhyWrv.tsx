import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { diferenciais } from "@/content/diferenciais";

export function WhyWrv() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-navy py-16 text-white sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-blue/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-blue-light/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7B3FF2]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-blue-light">
            <span
              aria-hidden="true"
              className="h-px w-7 bg-gradient-to-r from-blue-light to-transparent"
            />
            POR QUE ESCOLHER A WRV TECNOLOGIA
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Mais do que sistemas,{" "}
            <span className="bg-gradient-to-r from-blue-light to-[#8FC0FF] bg-clip-text text-transparent">
              entregamos soluções.
            </span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
            Unimos tecnologia, experiência e um atendimento próximo para criar
            soluções que realmente fazem a diferença no seu dia a dia.
          </p>
          <div className="mt-8">
            <Button href="/sobre" variant="onDark" size="lg" className="group">
              Sobre a WRV
              <Icon
                name="arrow-right"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </div>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2">
          {diferenciais.map((item, indice) => (
            <li key={item.titulo} className="h-full">
              <Reveal delay={indice * 70} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-light/30 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-blue/10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue/30 to-blue-light/10 text-blue-light ring-1 ring-inset ring-blue/25 transition-transform duration-300 group-hover:scale-105">
                    <Icon name={item.icone} />
                  </span>
                  <h3 className="mt-4 font-display text-[15px] font-semibold">
                    {item.titulo}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                    {item.descricao}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
