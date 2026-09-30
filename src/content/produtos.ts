export type ProdutoSlug = "musicpro" | "dancepro";

export type ProdutoLogo = "musicpro" | "dancepro";

export type Produto = {
  slug: ProdutoSlug;
  nome: string;
  subtitulo: string;
  descricao: string;
  descricaoLonga: string;
  logo: ProdutoLogo;
  url: string;
  recursos: string[];
  ordem: number;
};

export const produtos: Produto[] = [
  {
    slug: "musicpro",
    nome: "MusicPro",
    subtitulo: "Gestão para escolas de música",
    descricao:
      "Organize alunos, aulas, financeiro, professores e muito mais em um só lugar.",
    descricaoLonga:
      "O MusicPro é o sistema de gestão completo para escolas de música. Centralize matrículas, turmas, agenda de aulas, mensalidades e relatórios em uma plataforma simples de usar, feita para o dia a dia da sua escola.",
    logo: "musicpro",
    url: "https://wrmusicpro.com.br/",
    recursos: [
      "Gestão de alunos, turmas e professores",
      "Controle financeiro e de mensalidades",
      "Agenda de aulas e reposições",
      "Relatórios e indicadores de desempenho",
    ],
    ordem: 1,
  },
  {
    slug: "dancepro",
    nome: "DancePro",
    subtitulo: "Gestão para escolas de dança",
    descricao:
      "Controle de alunos, turmas, financeiro, relatórios e muito mais.",
    descricaoLonga:
      "O DancePro organiza a rotina da sua escola de dança: turmas, horários, mensalidades, frequência e comunicação com os responsáveis, tudo em um único sistema.",
    logo: "dancepro",
    url: "https://dancepro.wrvsystems.com.br/",
    recursos: [
      "Controle de alunos e turmas",
      "Financeiro, planos e mensalidades",
      "Frequência e relatórios",
      "Comunicação com responsáveis",
    ],
    ordem: 2,
  },
];

export function getProdutoPorSlug(slug: string): Produto | undefined {
  return produtos.find((produto) => produto.slug === slug);
}
