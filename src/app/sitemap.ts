import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { produtos } from "@/content/produtos";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const agora = new Date();

  const rotas = [
    { rota: "", prioridade: 1 },
    { rota: "/sobre", prioridade: 0.7 },
    { rota: "/politica-de-privacidade", prioridade: 0.3 },
    ...produtos.map((produto) => ({
      rota: `/produtos/${produto.slug}`,
      prioridade: 0.8,
    })),
  ];

  return rotas.map(({ rota, prioridade }) => ({
    url: `${base}${rota}`,
    lastModified: agora,
    changeFrequency: "monthly",
    priority: prioridade,
  }));
}
