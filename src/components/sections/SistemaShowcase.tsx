"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Icon } from "@/components/ui/Icon";
import { LaptopFrame } from "@/components/ui/LaptopFrame";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { AjusteImagem, TelaSistema } from "@/content/telas";

const DURACAO_SLIDE = 6000;

function ConteudoTela({
  src,
  alt,
  sizes,
  ajuste = "cover",
}: {
  src: string;
  alt: string;
  sizes: string;
  ajuste?: AjusteImagem;
}) {
  if (!src) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-mist via-white to-blue/5 p-6 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue/10 text-blue">
          <Icon name="layers" />
        </span>
        <p className="text-sm font-semibold text-navy">Imagem em breve</p>
        {process.env.NODE_ENV === "development" ? (
          <p className="text-[11px] leading-relaxed text-muted">
            Adicione o arquivo em{" "}
            <code className="rounded bg-navy/5 px-1">public/prints/</code>
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={cn(
        ajuste === "contain" ? "object-contain" : "object-cover object-top",
      )}
    />
  );
}

function ImagemCompleta({
  src,
  alt,
  sizes,
  formato,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  formato: "desktop" | "mobile";
  className?: string;
}) {
  if (formato === "mobile") {
    return (
      <Image
        src={src}
        alt={alt}
        width={921}
        height={1707}
        quality={95}
        sizes={sizes}
        className={cn("h-72 w-auto max-w-none sm:h-96 lg:h-[29rem]", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1800}
      height={1166}
      quality={95}
      sizes={sizes}
      className={cn("h-auto w-full", className)}
    />
  );
}

export function SistemaShowcase({ itens }: { itens: TelaSistema[] }) {
  const [ativoId, setAtivoId] = useState(itens[0]?.id ?? "");
  const [versao, setVersao] = useState(0);
  const [emVista, setEmVista] = useState(false);
  const [comFoco, setComFoco] = useState(false);
  const [hover, setHover] = useState(false);
  const [abaVisivel, setAbaVisivel] = useState(true);
  const [reduzido, setReduzido] = useState(false);
  const vitrineRef = useRef<HTMLDivElement>(null);

  const ativo = itens.find((item) => item.id === ativoId) ?? itens[0];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const atualizar = () => setReduzido(mq.matches);
    atualizar();
    mq.addEventListener("change", atualizar);
    return () => mq.removeEventListener("change", atualizar);
  }, []);

  useEffect(() => {
    const aoMudar = () => setAbaVisivel(!document.hidden);
    aoMudar();
    document.addEventListener("visibilitychange", aoMudar);
    return () => document.removeEventListener("visibilitychange", aoMudar);
  }, []);

  useEffect(() => {
    const elemento = vitrineRef.current;
    if (!elemento || typeof IntersectionObserver === "undefined") {
      setEmVista(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entrada]) => setEmVista(entrada.isIntersecting),
      { threshold: 0.3 },
    );

    observer.observe(elemento);
    return () => observer.disconnect();
  }, []);

  const executando =
    !hover && !comFoco && emVista && abaVisivel && !reduzido;

  const proximo = useCallback(() => {
    setAtivoId((atualId) => {
      const indice = itens.findIndex((item) => item.id === atualId);
      const seguinte = itens[(indice + 1) % itens.length];
      return seguinte?.id ?? atualId;
    });
    setVersao((valor) => valor + 1);
  }, [itens]);

  const selecionar = (id: string) => {
    setAtivoId(id);
    setVersao((valor) => valor + 1);
  };

  if (!ativo) return null;

  const temDesktop = Boolean(ativo.desktop);
  const temMobile = Boolean(ativo.mobile);

  const conteudoDesktop = temDesktop ? (
    ativo.desktopCompleto ? (
      <ImagemCompleta
        src={ativo.desktop}
        alt={`Funcionalidade: ${ativo.titulo}`}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 72vw, 830px"
        formato="desktop"
      />
    ) : (
      <LaptopFrame>
        <ConteudoTela
          src={ativo.desktop}
          alt={`Funcionalidade: ${ativo.titulo}`}
          sizes="(max-width: 1024px) 92vw, 700px"
          ajuste={ativo.ajusteDesktop}
        />
      </LaptopFrame>
    )
  ) : null;

  const conteudoMobile = temMobile ? (
    ativo.mobileCompleto ? (
      <ImagemCompleta
        src={ativo.mobile}
        alt={`Funcionalidade no celular: ${ativo.titulo}`}
        sizes="(max-width: 640px) 180px, 240px"
        formato="mobile"
      />
    ) : (
      <PhoneFrame>
        <ConteudoTela
          src={ativo.mobile}
          alt={`Funcionalidade no celular: ${ativo.titulo}`}
          sizes="(max-width: 640px) 120px, 180px"
          ajuste={ativo.ajusteMobile}
        />
      </PhoneFrame>
    )
  ) : null;

  return (
    <Section
      id="sistema"
      className="relative overflow-hidden bg-white"
      containerClassName="max-w-7xl"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-blue/5 blur-3xl"
      />

      <div
        ref={vitrineRef}
        className="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocusCapture={() => setComFoco(true)}
        onBlurCapture={() => setComFoco(false)}
      >
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-end">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-blue">
                <span
                  aria-hidden="true"
                  className="h-px w-7 bg-gradient-to-r from-blue to-blue-light"
                />
                CONHEÇA NA PRÁTICA
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
                As principais funcionalidades{" "}
                <span className="bg-gradient-to-r from-blue to-blue-light bg-clip-text text-transparent">
                  em ação.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base lg:justify-self-end">
              Veja como o sistema funciona no computador e no celular. As telas
              avançam automaticamente — selecione uma funcionalidade para ver
              quando quiser.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.68fr_1.55fr] lg:gap-10">
          <Reveal>
            <div>
              <div
                role="tablist"
                aria-label="Funcionalidades do sistema"
                className="space-y-3"
              >
              {itens.map((item, indice) => {
                const selecionado = item.id === ativo.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`aba-${item.id}`}
                    aria-selected={selecionado}
                    aria-controls="painel-tela"
                    onClick={() => selecionar(item.id)}
                    className={cn(
                      "group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5",
                      selecionado
                        ? "border-blue/30 bg-white shadow-[0_24px_50px_-30px_rgba(29,111,242,0.5)]"
                        : "border-line/80 bg-white/60 hover:-translate-y-0.5 hover:border-blue/20 hover:bg-white hover:shadow-[0_18px_40px_-30px_rgba(11,30,62,0.5)]",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute bottom-4 left-0 top-4 w-[3px] rounded-r-full bg-gradient-to-b from-blue to-blue-light transition-opacity duration-300",
                        selecionado ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="flex items-start gap-3.5">
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold transition-colors duration-300",
                          selecionado
                            ? "bg-gradient-to-br from-blue to-blue-hover text-white shadow-md shadow-blue/30"
                            : "border border-line bg-white text-muted group-hover:border-blue/30 group-hover:text-blue",
                        )}
                      >
                        {String(indice + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span
                          className={cn(
                            "block text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                            selecionado ? "text-blue" : "text-muted/70",
                          )}
                        >
                          {item.sistema}
                        </span>
                        <span className="mt-1 block font-display text-base font-semibold text-navy">
                          {item.titulo}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted">
                          {item.descricao}
                        </span>
                      </span>
                    </span>

                    {selecionado && !reduzido ? (
                      <span
                        key={`progresso-${versao}`}
                        onAnimationEnd={proximo}
                        aria-hidden="true"
                        className="animate-progresso pointer-events-none absolute bottom-0 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-blue to-blue-light"
                        style={{
                          animationDuration: `${DURACAO_SLIDE}ms`,
                          animationPlayState: executando ? "running" : "paused",
                        }}
                      />
                    ) : null}
                  </button>
                );
              })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              id="painel-tela"
              role="tabpanel"
              aria-labelledby={`aba-${ativo.id}`}
            >
              <div
                key={`${ativo.id}-conteudo-${versao}`}
                className="animate-rise"
              >
                {temDesktop && temMobile ? (
                  <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:gap-6 lg:gap-2">
                    <div className="w-full min-w-0 flex-1">
                      {conteudoDesktop}
                    </div>
                    <div
                      className={
                        ativo.mobileCompleto && ativo.mobile
                          ? "shrink-0"
                          : "w-44 shrink-0 sm:w-40 lg:w-52"
                      }
                    >
                      {conteudoMobile}
                    </div>
                  </div>
                ) : temDesktop ? (
                  <div>{conteudoDesktop}</div>
                ) : temMobile ? (
                  <div className="flex justify-center">
                    <div className="w-52 sm:w-64">{conteudoMobile}</div>
                  </div>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
