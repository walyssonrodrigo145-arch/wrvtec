export type ItemNavegacao = {
  label: string;
  href: string;
};

export const navegacao: ItemNavegacao[] = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/#produtos" },
  { label: "Sobre nós", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];
