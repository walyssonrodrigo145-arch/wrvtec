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
  desktopCompleto?: boolean;
  mobileCompleto?: boolean;
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
    desktopCompleto: true,
    mobileCompleto: true,
  },
  {
    id: "portal-aluno",
    produto: "musicpro",
    titulo: "Portal e app do aluno",
    descricao:
      "Seus alunos acompanham aulas, materiais, avisos e resultados pelo Portal do Aluno — e pelo aplicativo no celular.",
    sistema: "MusicPro · Área do aluno",
    desktop: "/prints/musicpro-portal-aluno-desktop.png",
    mobile: "/prints/musicpro-portal-aluno-mobile.png",
    desktopCompleto: true,
    mobileCompleto: true,
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
    desktopCompleto: true,
    mobileCompleto: true,
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
    desktopCompleto: true,
    mobileCompleto: true,
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
    desktopCompleto: true,
    mobileCompleto: true,
  },
  {
    id: "aulas",
    produto: "musicpro",
    titulo: "Aulas e agenda",
    descricao:
      "Agenda completa com turmas, horários, presenças e reposições — na mão do professor e da escola, direto no celular.",
    sistema: "MusicPro",
    desktop: "/prints/musicpro-aulas-desktop.png",
    mobile: "/prints/musicpro-agenda-mobile.png",
    desktopCompleto: true,
    mobileCompleto: true,
  },
  {
    id: "escola-em-numeros",
    produto: "musicpro",
    titulo: "Sua escola em números",
    descricao:
      "Acompanhe os principais indicadores da escola — alunos ativos, aulas e receita — em tempo real.",
    sistema: "MusicPro",
    desktop: "/prints/musicpro-numeros-desktop.png",
    mobile: "",
    desktopCompleto: true,
  },
  {
    id: "agenda-em-harmonia",
    produto: "musicpro",
    titulo: "Sua agenda em harmonia",
    descricao:
      "Organize aulas, horários e professores em um só lugar, com a semana inteira em um só olhar.",
    sistema: "MusicPro",
    desktop: "/prints/musicpro-agenda-desktop.png",
    mobile: "",
    desktopCompleto: true,
  },
  {
    id: "financas-sob-controle",
    produto: "musicpro",
    titulo: "Finanças sob controle",
    descricao:
      "Acompanhe mensalidades, recebimentos e despesas com clareza, sem depender de planilhas.",
    sistema: "MusicPro",
    desktop: "/prints/musicpro-financas-desktop.png",
    mobile: "",
    desktopCompleto: true,
  },
  {
    id: "cada-aluno-mais-perto",
    produto: "musicpro",
    titulo: "Cada aluno, mais perto",
    descricao:
      "Gerencie matrículas e acompanhe o status e o histórico de cada aluno em um só lugar.",
    sistema: "MusicPro",
    desktop: "/prints/musicpro-alunos-desktop.png",
    mobile: "",
    desktopCompleto: true,
  },
  {
    id: "mais-musica-menos-tarefas",
    produto: "musicpro",
    titulo: "Mais música, menos tarefas",
    descricao:
      "Automatize lembretes e mensagens para os alunos e ganhe tempo na rotina da escola.",
    sistema: "MusicPro",
    desktop: "/prints/musicpro-tarefas-desktop.png",
    mobile: "",
    desktopCompleto: true,
  },
  {
    id: "dancepro-visao-geral",
    produto: "dancepro",
    titulo: "Sua escola em uma visão só",
    descricao:
      "Alunos, aulas e receita no mesmo painel, com os principais indicadores da escola atualizados em tempo real.",
    sistema: "DancePro",
    desktop: "/prints/dancepro-dashboard-desktop.png",
    mobile: "",
    desktopCompleto: true,
  },
  {
    id: "dancepro-alunos",
    produto: "dancepro",
    titulo: "Gestão de alunos",
    descricao:
      "Matrículas e mensalidades em um só lugar: acompanhe alunos, modalidades, níveis e status sem perder o controle.",
    sistema: "DancePro",
    desktop: "/prints/dancepro-alunos-desktop.png",
    mobile: "",
    desktopCompleto: true,
  },
  {
    id: "dancepro-aulas",
    produto: "dancepro",
    titulo: "Aulas e ensaios",
    descricao:
      "Uma agenda cheia de movimento: turmas, horários, estúdios e ocupação da semana organizados em um só lugar.",
    sistema: "DancePro",
    desktop: "/prints/dancepro-aulas-desktop.png",
    mobile: "",
    desktopCompleto: true,
  },
  {
    id: "dancepro-financeiro",
    produto: "dancepro",
    titulo: "Controle financeiro",
    descricao:
      "Mensalidades e recebimentos sob controle, com previsão por vencimento e visão clara do fluxo de caixa.",
    sistema: "DancePro",
    desktop: "/prints/dancepro-financeiro-desktop.png",
    mobile: "",
    desktopCompleto: true,
  },
  {
    id: "dancepro-relatorios",
    produto: "dancepro",
    titulo: "Decisões com dados",
    descricao:
      "Indicadores para acompanhar sua escola: receita, inadimplência, evolução financeira e métricas operacionais.",
    sistema: "DancePro",
    desktop: "/prints/dancepro-relatorios-desktop.png",
    mobile: "",
    desktopCompleto: true,
  },
];

export function getTelasPorProduto(slug: ProdutoSlug): TelaSistema[] {
  return telasSistema.filter((tela) => tela.produto === slug);
}
