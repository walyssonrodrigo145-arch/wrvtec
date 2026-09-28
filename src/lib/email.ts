import type { LeadInput } from "@/lib/validators";
import { site } from "@/content/site";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function maskEmail(email: string): string {
  const [usuario, dominio] = email.split("@");
  if (!usuario || !dominio) return "***";
  const visivel = usuario.slice(0, 2);
  return `${visivel}***@${dominio}`;
}

function renderLeadEmail(lead: LeadInput): string {
  const linhas: Array<[string, string]> = [
    ["Nome", lead.nome],
    ["E-mail", lead.email],
    ["Telefone", lead.telefone || "Não informado"],
    ["Empresa", lead.empresa || "Não informada"],
    ["Produto de interesse", lead.produto || "Não informado"],
    ["Mensagem", lead.mensagem],
  ];

  const corpo = linhas
    .map(
      ([rotulo, valor]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #E3E9F4;font:600 13px Arial,sans-serif;color:#0B1E3E;white-space:nowrap;vertical-align:top;">${escapeHtml(rotulo)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #E3E9F4;font:400 14px Arial,sans-serif;color:#0F172A;">${escapeHtml(valor).replaceAll("\n", "<br/>")}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="background:#F4F7FC;padding:24px;font-family:Arial,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #E3E9F4;border-radius:12px;overflow:hidden;">
        <div style="background:#0B1E3E;padding:18px 24px;">
          <span style="font:700 20px Arial,sans-serif;color:#FFFFFF;">WRV <span style="color:#4DA3FF;">Tecnologia</span></span>
          <div style="font:400 12px Arial,sans-serif;color:#B8C6E0;margin-top:2px;">Novo lead recebido pelo site</div>
        </div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
          ${corpo}
        </table>
        <div style="padding:14px 24px;font:400 11px Arial,sans-serif;color:#55627A;">
          Enviado automaticamente pelo formulário de contato de ${site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    </div>`;
}

export function registrarLeadLocal(lead: LeadInput, motivo: string): void {
  console.info(
    `[contato] Lead registrado no log local (${motivo}):`,
    JSON.stringify({
      nome: lead.nome,
      email: maskEmail(lead.email),
      telefone: lead.telefone ? "informado" : "não informado",
      produto: lead.produto || null,
    }),
  );
}

export async function sendLeadEmail(
  lead: LeadInput,
): Promise<{ delivered: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const destinatarios = (process.env.LEAD_TO_EMAIL ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
  const remetente =
    process.env.LEAD_FROM_EMAIL ?? "WRV Site <onboarding@resend.dev>";

  if (!apiKey || destinatarios.length === 0) {
    registrarLeadLocal(lead, "envio de e-mail não configurado");
    return { delivered: false };
  }

  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: remetente,
      to: destinatarios,
      reply_to: lead.email,
      subject: `Novo lead pelo site: ${lead.nome}`,
      html: renderLeadEmail(lead),
    }),
  });

  if (!resposta.ok) {
    throw new Error(`Falha ao enviar e-mail de lead (status ${resposta.status})`);
  }

  return { delivered: true };
}
