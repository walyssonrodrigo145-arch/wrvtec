export type LeadStatus =
  | "novo"
  | "em_atendimento"
  | "convertido"
  | "descartado";

export type Lead = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  produto: string;
  mensagem: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  status: LeadStatus;
  created_at: string;
};

export const statusValidos: LeadStatus[] = [
  "novo",
  "em_atendimento",
  "convertido",
  "descartado",
];

export const rotuloStatus: Record<LeadStatus, string> = {
  novo: "Novo",
  em_atendimento: "Em atendimento",
  convertido: "Convertido",
  descartado: "Descartado",
};
