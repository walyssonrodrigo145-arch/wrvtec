import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductLogo } from "@/components/ui/ProductLogo";
import { SistemaShowcase } from "@/components/sections/SistemaShowcase";
import { getProdutoPorSlug, produtos } from "@/content/produtos";
import { getTelasPorProduto } from "@/content/telas";
import { whatsappLink } from "@/lib/whatsapp";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return produtos.map((produto) => ({ slug: produto.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const produto = getProdutoPorSlug(slug);

  if (!produto) {
    return { title: "Produto não encontrado" };
  }

  return {
    title: produto.nome,
    description: produto.descricao,
    alternates: { canonical: `/produtos/${produto.slug}` },
  };
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  const produto = getProdutoPorSlug(slug);

  if (!produto) notFound();

  const outros = produtos.filter((item) => item.slug !== produto.slug);
  const telas = getTelasPorProduto(produto.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-mist pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-light/20 blur-3xl" />
          <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-blue/10 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Link
            href="/#produtos"
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue transition-colors hover:text-blue-hover"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 6-6 6 6 6" />
            </svg>
            Voltar para produtos
          </Link>

          <div className="mt-6">
            <ProductLogo produto={produto} />
          </div>

          <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">
            {produto.nome}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {produto.descricaoLonga}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`/?produto=${produto.slug}#contato`} size="lg">
              Fale com um especialista
              <Icon name="arrow-right" className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" href={produto.url}>
              <Icon name="external-link" className="h-4 w-4" />
              Conhecer o sistema
            </Button>
            <Button variant="outline" size="lg" href={whatsappLink()}>
              <Icon name="whatsapp" className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {telas.length > 0 ? <SistemaShowcase itens={telas} /> : null}

      <Section className="bg-mist">
        <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
          O que está incluído
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {produto.recursos.map((recurso) => (
            <li
              key={recurso}
              className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue">
                <Icon name="check" className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium leading-relaxed text-navy">
                {recurso}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-white">
        <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
          Conheça também
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {outros.slice(0, 3).map((item) => (
            <ProductCard key={item.slug} produto={item} />
          ))}
        </div>
      </Section>
    </>
  );
}
