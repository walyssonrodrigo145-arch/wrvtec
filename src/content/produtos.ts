export type ProdutoSlug =
  | "musicpro"
  | "dancepro"
  | "sitepro"
  | "apppro"
  | "cloudpro"
  | "solucoes-personalizadas";

export type ProdutoLogo =
  | "musicpro"
  | "dancepro"
  | "sitepro"
  | "apppro"
  | "cloudpro"
  | "personalizadas";

export type Produto = {
  slug: ProdutoSlug;
  nome: string;
  subtitulo: string;
  descricao: string;
  descricaoLonga: string;
  logo: ProdutoLogo;
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
    recursos: [
      "Controle de alunos e turmas",
      "Financeiro, planos e mensalidades",
      "Frequência e relatórios",
      "Comunicação com responsáveis",
    ],
    ordem: 2,
  },
  {
    slug: "sitepro",
    nome: "SitePro",
    subtitulo: "Sites profissionais e personalizados",
    descricao:
      "Tenha um site moderno, responsivo e completo para o seu negócio.",
    descricaoLonga:
      "Com o SitePro, sua empresa ganha um site profissional, rápido e preparado para aparecer no Google, com layout personalizado e foco total em gerar contatos e vendas.",
    logo: "sitepro",
    recursos: [
      "Layout moderno e responsivo",
      "Otimizado para SEO e performance",
      "Publicação e hospedagem incluídas",
      "Fácil de atualizar e evoluir",
    ],
    ordem: 3,
  },
  {
    slug: "apppro",
    nome: "AppPro",
    subtitulo: "Aplicativos sob medida",
    descricao:
      "Transforme sua ideia em um aplicativo funcional e de alto desempenho.",
    descricaoLonga:
      "O AppPro transforma a sua ideia em um aplicativo funcional para iOS e Android, com alto desempenho, boa experiência de uso e integração com os sistemas que você já utiliza.",
    logo: "apppro",
    recursos: [
      "Aplicativos para iOS e Android",
      "Experiência de uso de alto desempenho",
      "Integração com seus sistemas",
      "Publicação e atualização nas lojas",
    ],
    ordem: 4,
  },
  {
    slug: "cloudpro",
    nome: "CloudPro",
    subtitulo: "Infraestrutura em nuvem",
    descricao:
      "Mais segurança, flexibilidade e performance para o seu negócio.",
    descricaoLonga:
      "O CloudPro cuida da infraestrutura do seu negócio na nuvem, com servidores monitorados, backup, segurança e escalabilidade para acompanhar o seu crescimento.",
    logo: "cloudpro",
    recursos: [
      "Servidores em nuvem gerenciados",
      "Backup e segurança dos dados",
      "Escalabilidade sob demanda",
      "Monitoramento contínuo",
    ],
    ordem: 5,
  },
  {
    slug: "solucoes-personalizadas",
    nome: "Soluções Personalizadas",
    subtitulo: "Do seu jeito, para o seu desafio",
    descricao:
      "Desenvolvemos sistemas sob medida para atender às necessidades do projeto.",
    descricaoLonga:
      "Quando o desafio exige algo único, desenvolvemos sistemas sob medida: entendemos o seu processo, desenhamos a solução e construímos um software que se encaixa exatamente na sua operação.",
    logo: "personalizadas",
    recursos: [
      "Levantamento de requisitos com a sua equipe",
      "Desenvolvimento sob medida",
      "Integração com os processos do seu negócio",
      "Suporte e evolução contínua",
    ],
    ordem: 6,
  },
];

export function getProdutoPorSlug(slug: string): Produto | undefined {
  return produtos.find((produto) => produto.slug === slug);
}
