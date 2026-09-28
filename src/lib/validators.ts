import { z } from "zod";
import { produtos } from "@/content/produtos";

export const produtoSlugs: [string, ...string[]] = [
  produtos[0]?.slug ?? "outro",
  ...produtos.slice(1).map((produto) => produto.slug),
  "outro",
];

export const leadSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe seu nome (mínimo 2 caracteres).")
    .max(120, "Máximo de 120 caracteres."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, "E-mail muito longo.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Informe um e-mail válido."),
  telefone: z
    .string()
    .trim()
    .regex(/^$|^[0-9()+\-\s]{8,20}$/, "Informe um telefone válido.")
    .optional(),
  empresa: z.string().trim().max(120, "Máximo de 120 caracteres.").optional(),
  produto: z.enum(produtoSlugs).or(z.literal("")).optional(),
  mensagem: z
    .string()
    .trim()
    .min(10, "A mensagem deve ter pelo menos 10 caracteres.")
    .max(1000, "Limite de 1000 caracteres."),
  consentimento: z
    .boolean()
    .refine((valor) => valor === true, "É necessário aceitar a Política de Privacidade."),
  website: z.string().max(200).optional(),
  elapsedMs: z.number().nonnegative().optional(),
  utmSource: z.string().trim().max(120).optional(),
  utmMedium: z.string().trim().max(120).optional(),
  utmCampaign: z.string().trim().max(120).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fields[key]) fields[key] = issue.message;
  }
  return fields;
}
