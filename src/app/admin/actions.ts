"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  criarSessao,
  encerrarSessao,
  sessaoAtiva,
  verificarSenha,
} from "@/lib/admin-auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { hashKey } from "@/lib/hash";
import { atualizarStatusLead } from "@/lib/leads-store";
import { statusValidos, type LeadStatus } from "@/lib/leads-types";

export async function loginAction(formData: FormData): Promise<void> {
  const senha = String(formData.get("senha") ?? "");
  const cabecalhos = await headers();
  const ip =
    cabecalhos.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

  const limite = checkRateLimit(hashKey(`login:${ip}`));
  if (!limite.allowed) {
    redirect("/admin/login?erro=limite");
  }

  if (!verificarSenha(senha)) {
    redirect("/admin/login?erro=1");
  }

  await criarSessao();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await encerrarSessao();
  redirect("/admin/login");
}

export async function atualizarStatusAction(
  id: string,
  status: string,
): Promise<void> {
  if (!(await sessaoAtiva())) return;
  if (!statusValidos.includes(status as LeadStatus)) return;
  await atualizarStatusLead(id, status as LeadStatus);
  revalidatePath("/admin");
}
