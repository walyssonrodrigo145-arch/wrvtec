import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { LeadInput } from "@/lib/validators";
import type { Lead, LeadStatus } from "@/lib/leads-types";

const ARQUIVO = path.join(process.cwd(), ".data", "leads.json");
const LIMITE_REGISTROS = 2000;

async function ler(): Promise<Lead[]> {
  try {
    const conteudo = await fs.readFile(ARQUIVO, "utf8");
    const dados = JSON.parse(conteudo) as Lead[];
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

async function escrever(leads: Lead[]): Promise<void> {
  await fs.mkdir(path.dirname(ARQUIVO), { recursive: true });
  const temporario = `${ARQUIVO}.tmp`;
  await fs.writeFile(temporario, JSON.stringify(leads, null, 2), "utf8");
  await fs.rename(temporario, ARQUIVO);
}

export async function salvarLead(input: LeadInput): Promise<boolean> {
  try {
    const leads = await ler();
    const novo: Lead = {
      id: randomUUID(),
      nome: input.nome,
      email: input.email,
      telefone: input.telefone ?? "",
      empresa: input.empresa ?? "",
      produto: input.produto ?? "",
      mensagem: input.mensagem,
      utm_source: input.utmSource ?? "",
      utm_medium: input.utmMedium ?? "",
      utm_campaign: input.utmCampaign ?? "",
      status: "novo",
      created_at: new Date().toISOString(),
    };
    leads.unshift(novo);
    await escrever(leads.slice(0, LIMITE_REGISTROS));
    return true;
  } catch (error) {
    console.error("[leads] Falha ao persistir lead no armazenamento local", error);
    return false;
  }
}

export async function listarLeads(filtro?: {
  status?: LeadStatus;
  busca?: string;
}): Promise<Lead[]> {
  const leads = await ler();
  const busca = filtro?.busca?.trim().toLowerCase();

  return leads.filter((lead) => {
    if (filtro?.status && lead.status !== filtro.status) return false;
    if (busca) {
      const alvo = `${lead.nome} ${lead.email} ${lead.empresa} ${lead.produto}`.toLowerCase();
      if (!alvo.includes(busca)) return false;
    }
    return true;
  });
}

export async function atualizarStatusLead(
  id: string,
  status: LeadStatus,
): Promise<boolean> {
  const leads = await ler();
  const alvo = leads.find((lead) => lead.id === id);
  if (!alvo) return false;
  alvo.status = status;
  await escrever(leads);
  return true;
}

export function gerarCsv(leads: Lead[]): string {
  const colunas = [
    "id",
    "created_at",
    "status",
    "nome",
    "email",
    "telefone",
    "empresa",
    "produto",
    "mensagem",
    "utm_source",
    "utm_medium",
    "utm_campaign",
  ] as const;

  const escapar = (valor: string) => {
    const perigoso = /^[=+\-@\t\r]/.test(valor);
    const seguro = perigoso ? `'${valor}` : valor;
    return `"${seguro.replaceAll('"', '""')}"`;
  };

  const linhas = leads.map((lead) =>
    colunas.map((coluna) => escapar(String(lead[coluna] ?? ""))).join(";"),
  );

  return [colunas.join(";"), ...linhas].join("\r\n");
}
