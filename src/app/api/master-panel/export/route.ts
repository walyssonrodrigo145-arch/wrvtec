import { sessaoAtiva } from "@/lib/admin-auth";
import { gerarCsv, listarLeads } from "@/lib/leads-store";

export const runtime = "nodejs";

export async function GET() {
  if (!(await sessaoAtiva())) {
    return new Response("Não autorizado", { status: 401 });
  }

  const leads = await listarLeads();
  const csv = gerarCsv(leads);
  const data = new Date().toISOString().slice(0, 10);

  return new Response(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-wrv-${data}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
