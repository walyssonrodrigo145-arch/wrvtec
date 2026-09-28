import type { IconName } from "@/components/ui/Icon";

export type Diferencial = {
  titulo: string;
  descricao: string;
  icone: IconName;
};

export const diferenciais: Diferencial[] = [
  {
    titulo: "Desenvolvimento sob medida",
    descricao: "Soluções alinhadas às suas necessidades.",
    icone: "code",
  },
  {
    titulo: "Segurança e confiabilidade",
    descricao: "Seus dados sempre protegidos.",
    icone: "shield",
  },
  {
    titulo: "Suporte especializado",
    descricao: "Estamos com você em todas as etapas.",
    icone: "headset",
  },
  {
    titulo: "Tecnologia moderna",
    descricao: "Sistemas escaláveis e de alta performance.",
    icone: "cloud",
  },
  {
    titulo: "Parceria de longo prazo",
    descricao: "Seu crescimento também é o nosso.",
    icone: "users",
  },
  {
    titulo: "Resultados reais",
    descricao: "Mais produtividade, organização e eficiência.",
    icone: "star",
  },
];
