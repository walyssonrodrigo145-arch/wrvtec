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
