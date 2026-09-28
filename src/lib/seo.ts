import type { Metadata } from "next";
import { site } from "@/content/site";
import { redesSociais } from "@/content/redes-sociais";

export const siteMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "WRV Tecnologia — Soluções digitais para o seu negócio",
    template: "%s | WRV Tecnologia",
  },
  description:
    "Desenvolvemos sistemas de gestão sob medida para escolas de música e de dança: MusicPro e DancePro, com suporte especializado e tecnologia moderna.",
  applicationName: site.nome,
  keywords: [
    "sistema para escola de música",
    "sistema para escola de dança",
    "software de gestão para escolas",
    "MusicPro",
    "DancePro",
    "WRV Tecnologia",
  ],
  authors: [{ name: site.nome, url: site.url }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.nome,
    title: "WRV Tecnologia — Soluções digitais para o seu negócio",
    description:
      "Sistemas, sites, aplicativos e infraestrutura em nuvem sob medida para o seu negócio.",
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "WRV Tecnologia — Soluções digitais para o seu negócio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WRV Tecnologia — Soluções digitais para o seu negócio",
    description:
      "Sistemas, sites, aplicativos e infraestrutura em nuvem sob medida para o seu negócio.",
    images: ["/og/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.nome,
  url: site.url,
  email: site.email,
  telephone: "+5511987654321",
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  sameAs: redesSociais.map((rede) => rede.href),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.nome,
  url: site.url,
  inLanguage: "pt-BR",
};
