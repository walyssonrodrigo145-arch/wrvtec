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
    id: "portal-aluno",
    produto: "musicpro",
    titulo: "Portal e app do aluno",
    descricao:
      "Seus alunos acompanham aulas, materiais, avisos e resultados pelo Portal do Aluno — e pelo aplicativo no celular.",
    sistema: "MusicPro · Área do aluno",
    desktop: "/prints/musicpro-portal-aluno-desktop.png",
    mobile: "",
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
      "Monte modelos de contrato em blocos, com variáveis automáticas, e organize matrículas sem papelada.",
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
      "Automatize lembretes de aula, cobranças, avisos e mensagens de aniversário pelo WhatsApp.",
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
