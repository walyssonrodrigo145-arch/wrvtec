"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { atualizarStatusAction } from "@/app/master-panel/actions";
import { rotuloStatus, statusValidos, type LeadStatus } from "@/lib/leads-types";

export function StatusSelect({
  leadId,
  status,
}: {
  leadId: string;
  status: LeadStatus;
}) {
  const [pendente, iniciarTransicao] = useTransition();
  const router = useRouter();

  const classes: Record<LeadStatus, string> = {
    novo: "border-blue/30 bg-blue/5 text-blue",
    em_atendimento: "border-[#F59E0B]/30 bg-[#F59E0B]/5 text-[#B45309]",
    convertido: "border-success/30 bg-success/5 text-success",
    descartado: "border-line bg-mist text-muted",
  };

  return (
    <select
      value={status}
      disabled={pendente}
      aria-label="Alterar status do lead"
      onChange={(evento) => {
        const novoStatus = evento.target.value;
        iniciarTransicao(async () => {
          await atualizarStatusAction(leadId, novoStatus);
          router.refresh();
        });
      }}
      className={`w-full min-w-[140px] rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue/10 disabled:opacity-60 ${classes[status]}`}
    >
      {statusValidos.map((valor) => (
        <option key={valor} value={valor}>
          {rotuloStatus[valor]}
        </option>
      ))}
    </select>
  );
}
