import type { ProdutoSlug } from "@/content/produtos";

export type AjusteImagem = "cover" | "contain";

export type TelaSistema = {
  id: string;
  produto: ProdutoSlug;
  titulo: string;
  descricao: string;
  sistema: string;
  desktop: string;
  mobile: string;
  ajusteDesktop?: AjusteImagem;
  ajusteMobile?: AjusteImagem;
};

export const telasSistema: TelaSistema[] = [
  {
    id: "visao-geral",
    produto: "musicpro",
    titulo: "Visão geral do negócio",
    descricao:
      "Acompanhe os principais indicadores em um painel claro e objetivo, atualizado em tempo real.",
    sistema: "MusicPro",
    desktop: "/prints/musicpro-dashboard-desktop.png",
    mobile: "/prints/musicpro-dashboard-mobile.png",
    ajusteDesktop: "contain",
    ajusteMobile: "cover",
  },
  {
    id: "financeiro",
    produto: "musicpro",
    titulo: "Financeiro e relatórios",
    descricao:
      "Controle mensalidades, entradas e saídas e acompanhe relatórios prontos para decidir melhor.",
    sistema: "MusicPro",
    desktop: "/prints/financeiro-desktop.png",
    mobile: "/prints/financeiro-mobile.png",
    ajusteDesktop: "contain",
    ajusteMobile: "cover",
  },
  {
    id: "contratos",
    produto: "musicpro",
    titulo: "Contratos e matrículas",
    descricao:
      "Organize contratos, matrículas e vencimentos em um só lugar, sem papelada.",
    sistema: "MusicPro",
    desktop: "/prints/contratos-desktop.png",
    mobile: "/prints/contratos-mobile.png",
    ajusteDesktop: "contain",
    ajusteMobile: "cover",
  },
  {
    id: "automacoes",
    produto: "musicpro",
    titulo: "Automações do dia a dia",
    descricao:
      "Automatize lembretes, cobranças e tarefas repetitivas para ganhar tempo na gestão.",
    sistema: "MusicPro",
    desktop: "/prints/automacoes-desktop.png",
    mobile: "/prints/automacoes-mobile.png",
    ajusteDesktop: "contain",
    ajusteMobile: "cover",
  },
];

export function getTelasPorProduto(slug: ProdutoSlug): TelaSistema[] {
  return telasSistema.filter((tela) => tela.produto === slug);
}
