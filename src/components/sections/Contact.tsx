import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ContatoForm } from "@/components/sections/ContatoForm";
import { site } from "@/content/site";
import { whatsappLink } from "@/lib/whatsapp";

export function Contact() {
  return (
    <Section id="contato" className="relative overflow-hidden bg-mist">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-blue/5 blur-3xl"
      />

      <div className="relative grid items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <Reveal className="h-full">
          <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-navy p-8 text-white shadow-2xl shadow-navy/25 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue/25 blur-3xl" />
              <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-blue-light/15 blur-3xl" />
              <div className="bg-grid absolute inset-0 opacity-[0.35]" />
            </div>

            <div className="relative">
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-blue-light">
                <span
                  aria-hidden="true"
                  className="h-px w-7 bg-gradient-to-r from-blue-light to-transparent"
                />
                VAMOS CONVERSAR?
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-[2.1rem]">
                Tem um projeto em mente? Nós podemos ajudar.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                Entre em contato com a nossa equipe e descubra como a tecnologia
                da WRV pode impulsionar o seu negócio.
              </p>

              <div className="mt-7">
                <Button
                  variant="white"
                  size="lg"
                  href={whatsappLink()}
                  ariaLabel="Fale conosco pelo WhatsApp"
                  className="group"
                >
                  <Icon name="whatsapp" className="h-4 w-4" />
                  Fale Conosco
                  <Icon
                    name="arrow-right"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </div>

              <ul className="mt-10 space-y-3">
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-light/30 hover:bg-white/[0.09]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue/30 to-blue-light/10 text-blue-light ring-1 ring-inset ring-blue/25">
                      <Icon name="whatsapp" className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">
                        {site.telefoneExibicao}
                      </span>
                      <span className="block text-xs text-white/55">
                        Atendimento via WhatsApp
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-light/30 hover:bg-white/[0.09]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue/30 to-blue-light/10 text-blue-light ring-1 ring-inset ring-blue/25">
                      <Icon name="mail" className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">
                        {site.email}
                      </span>
                      <span className="block text-xs text-white/55">
                        Envie um e-mail
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue/30 to-blue-light/10 text-blue-light ring-1 ring-inset ring-blue/25">
                    <Icon name="map-pin" className="h-[18px] w-[18px]" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">
                      {site.localizacao}
                    </span>
                    <span className="block text-xs text-white/55">
                      {site.localizacaoComplemento}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="h-full">
          <ContatoForm />
        </Reveal>
      </div>
    </Section>
  );
}
