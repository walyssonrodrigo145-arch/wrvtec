import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { StatusSelect } from "@/app/master-panel/StatusSelect";
import { logoutAction } from "@/app/master-panel/actions";
import { sessaoAtiva } from "@/lib/admin-auth";
import { listarLeads } from "@/lib/leads-store";
import { statusValidos, type LeadStatus } from "@/lib/leads-types";
import { produtos } from "@/content/produtos";

export const metadata: Metadata = {
  title: "Gestão de leads",
  robots: { index: false, follow: false },
};

const formatadorData = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

function rotuloProduto(slug: string): string {
  if (!slug) return "—";
  if (slug === "outro") return "Outro assunto";
  return produtos.find((produto) => produto.slug === slug)?.nome ?? slug;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  if (!(await sessaoAtiva())) redirect("/master-panel/login");

  const { status, q } = await searchParams;
  const statusFiltro = statusValidos.includes(status as LeadStatus)
    ? (status as LeadStatus)
    : undefined;

  const todos = await listarLeads();
  const leads = await listarLeads({ status: statusFiltro, busca: q });

  const estatisticas = {
    total: todos.length,
    novos: todos.filter((lead) => lead.status === "novo").length,
    atendimento: todos.filter((lead) => lead.status === "em_atendimento").length,
    convertidos: todos.filter((lead) => lead.status === "convertido").length,
  };

  const filtroAtivo = Boolean(statusFiltro || q?.trim());

  return (
    <div className="min-h-screen bg-mist">
      <header className="border-b border-line/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="WRV Tecnologia — Página inicial">
              <Logo />
            </Link>
            <span className="hidden h-8 w-px bg-line sm:block" />
            <span className="hidden font-display text-sm font-semibold text-navy sm:block">
              Gestão de leads
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/api/master-panel/export"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-xs font-semibold text-navy shadow-sm transition-all duration-300 hover:border-blue/40 hover:text-blue"
            >
              <Icon name="check" className="h-3.5 w-3.5" />
              Exportar CSV
            </a>
            <Link
              href="/"
              className="inline-flex h-10 items-center rounded-full border border-line bg-white px-4 text-xs font-semibold text-navy shadow-sm transition-all duration-300 hover:border-blue/40 hover:text-blue"
            >
              Ver site
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex h-10 items-center rounded-full bg-navy px-4 text-xs font-semibold text-white transition-all duration-300 hover:bg-navy-deep"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Total de leads
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-navy">
              {estatisticas.total}
            </p>
          </div>
          <div className="rounded-2xl border border-blue/20 bg-blue/5 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue">
              Novos
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-blue">
              {estatisticas.novos}
            </p>
          </div>
          <div className="rounded-2xl border border-[#F59E0B]/25 bg-[#F59E0B]/5 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B45309]">
              Em atendimento
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-[#B45309]">
              {estatisticas.atendimento}
            </p>
          </div>
          <div className="rounded-2xl border border-success/25 bg-success/5 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-success">
              Convertidos
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-success">
              {estatisticas.convertidos}
            </p>
          </div>
        </div>

        <form
          method="GET"
          className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm sm:flex-row sm:items-center"
        >
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Buscar por nome, e-mail, empresa ou produto..."
            className="h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink shadow-sm transition-all duration-300 placeholder:text-muted/50 hover:border-blue/30 focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/10"
          />
          <select
            name="status"
            defaultValue={statusFiltro ?? ""}
            className="h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink shadow-sm transition-all duration-300 hover:border-blue/30 focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/10 sm:w-48"
          >
            <option value="">Todos os status</option>
            <option value="novo">Novo</option>
            <option value="em_atendimento">Em atendimento</option>
            <option value="convertido">Convertido</option>
            <option value="descartado">Descartado</option>
          </select>
          <button
            type="submit"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue to-blue-hover px-5 font-display text-sm font-semibold text-white shadow-lg shadow-blue/25 transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
          >
            Filtrar
          </button>
          {filtroAtivo ? (
            <Link
              href="/master-panel"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-line px-4 text-xs font-semibold text-muted transition-colors hover:text-blue"
            >
              Limpar
            </Link>
          ) : null}
        </form>

        {leads.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue/10 text-blue">
              <Icon name="mail" className="h-5 w-5" />
            </span>
            <p className="mt-4 font-display text-base font-semibold text-navy">
              {filtroAtivo
                ? "Nenhum lead encontrado com esse filtro"
                : "Nenhum lead por aqui ainda"}
            </p>
            <p className="mt-1.5 max-w-sm text-sm text-muted">
              {filtroAtivo
                ? "Ajuste a busca ou limpe os filtros para ver todos os leads."
                : "Assim que alguém enviar o formulário do site, o lead aparece nesta lista."}
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-3xl border border-line bg-white shadow-sm">
            <table className="w-full min-w-[920px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-mist/60 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  <th className="px-5 py-3.5">Data</th>
                  <th className="px-5 py-3.5">Lead</th>
                  <th className="px-5 py-3.5">Contato</th>
                  <th className="px-5 py-3.5">Produto</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Mensagem</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-line/70 text-sm last:border-b-0 hover:bg-mist/40"
                  >
                    <td className="whitespace-nowrap px-5 py-4 align-top text-xs text-muted">
                      {formatadorData.format(new Date(lead.created_at))}
                    </td>
                    <td className="px-5 py-4 align-top">
                      <p className="font-semibold text-navy">{lead.nome}</p>
                      {lead.empresa ? (
                        <p className="mt-0.5 text-xs text-muted">
                          {lead.empresa}
                        </p>
                      ) : null}
                      {lead.utm_source || lead.utm_campaign ? (
                        <p className="mt-1 text-[11px] text-muted/80">
                          {[lead.utm_source, lead.utm_medium, lead.utm_campaign]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-5 py-4 align-top text-xs">
                      <a
                        href={`mailto:${lead.email}`}
                        className="block font-medium text-blue hover:underline"
                      >
                        {lead.email}
                      </a>
                      {lead.telefone ? (
                        <a
                          href={`https://wa.me/55${lead.telefone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 block text-muted hover:text-blue"
                        >
                          {lead.telefone}
                        </a>
                      ) : null}
                    </td>
                    <td className="px-5 py-4 align-top text-xs text-navy">
                      {rotuloProduto(lead.produto)}
                    </td>
                    <td className="px-5 py-4 align-top">
                      <StatusSelect leadId={lead.id} status={lead.status} />
                    </td>
                    <td className="max-w-[280px] px-5 py-4 align-top">
                      <details className="group">
                        <summary className="cursor-pointer list-none text-xs font-medium text-blue hover:underline">
                          Ver mensagem
                        </summary>
                        <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-muted">
                          {lead.mensagem}
                        </p>
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-muted/70">
          Leads armazenados com segurança no servidor · Retenção conforme a
          Política de Privacidade
        </p>
      </main>
    </div>
  );
}
