"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { produtos } from "@/content/produtos";
import { site } from "@/content/site";
import { fieldErrors, leadSchema } from "@/lib/validators";
import { whatsappLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

type FormValues = {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  produto: string;
  mensagem: string;
  consentimento: boolean;
  website: string;
};

const valoresIniciais: FormValues = {
  nome: "",
  email: "",
  telefone: "",
  empresa: "",
  produto: "",
  mensagem: "",
  consentimento: false,
  website: "",
};

const opcoesProduto = [
  ...produtos.map((produto) => ({ value: produto.slug, label: produto.nome })),
  { value: "outro", label: "Outro assunto" },
];

function formatarTelefone(valor: string): string {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  if (digitos.length === 0) return "";
  if (digitos.length <= 2) return `(${digitos}`;
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

function classeCampo(temErro: boolean): string {
  return [
    "w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-ink shadow-sm transition-all duration-300 placeholder:text-muted/50 focus:outline-none focus:ring-4",
    temErro
      ? "border-error focus:border-error focus:ring-error/10"
      : "border-line hover:border-blue/30 focus:border-blue focus:ring-blue/10",
  ].join(" ");
}

export function ContatoForm() {
  const [values, setValues] = useState<FormValues>(valoresIniciais);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const iniciadoEm = useRef<number>(Date.now());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const produtoParam = params.get("produto");
    if (produtoParam && opcoesProduto.some((o) => o.value === produtoParam)) {
      setValues((atual) => ({ ...atual, produto: produtoParam }));
    }
  }, []);

  const atualizar = <K extends keyof FormValues>(campo: K, valor: FormValues[K]) => {
    setValues((atual) => ({ ...atual, [campo]: valor }));
  };

  const focarPrimeiroErro = (campos: Record<string, string>) => {
    const primeiro = Object.keys(campos)[0];
    if (!primeiro) return;
    window.requestAnimationFrame(() => {
      document.getElementById(`campo-${primeiro}`)?.focus();
    });
  };

  const enviar = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);

    const params = new URLSearchParams(window.location.search);
    const payload = {
      nome: values.nome,
      email: values.email,
      telefone: values.telefone,
      empresa: values.empresa,
      produto: values.produto,
      mensagem: values.mensagem,
      consentimento: values.consentimento,
      website: values.website,
      elapsedMs: Date.now() - iniciadoEm.current,
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
    };

    const validacao = leadSchema.safeParse(payload);
    if (!validacao.success) {
      const campos = fieldErrors(validacao.error);
      setErrors(campos);
      setStatus("idle");
      focarPrimeiroErro(campos);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const resposta = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validacao.data),
      });
      const dados = await resposta.json().catch(() => null);

      if (!resposta.ok || !dados?.ok) {
        if (resposta.status === 422 && dados?.error?.fields) {
          setErrors(dados.error.fields as Record<string, string>);
          setStatus("idle");
          focarPrimeiroErro(dados.error.fields as Record<string, string>);
          return;
        }
        setStatus("error");
        setServerError(
          dados?.error?.message ??
            "Não foi possível enviar sua mensagem. Tente novamente ou fale conosco pelo WhatsApp.",
        );
        track("form_submit_error", { motivo: dados?.error?.code ?? "desconhecido" });
        return;
      }

      setStatus("success");
      setValues(valoresIniciais);
      iniciadoEm.current = Date.now();
      track("form_submit_success");
    } catch {
      setStatus("error");
      setServerError(
        "Não foi possível enviar sua mensagem. Verifique sua conexão e tente novamente.",
      );
      track("form_submit_error", { motivo: "rede" });
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="relative flex h-full flex-col items-start justify-center overflow-hidden rounded-3xl border border-success/25 bg-white/90 p-8 shadow-[0_30px_60px_-30px_rgba(11,30,62,0.35)] backdrop-blur-md sm:p-10"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-success/10 blur-2xl"
        />
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-navy">
          Recebemos sua mensagem!
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Nossa equipe entrará em contato em até 1 dia útil. Se preferir falar
          agora, chame no WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            variant="outline"
            href={whatsappLink()}
            ariaLabel="Falar no WhatsApp"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Falar no WhatsApp
          </Button>
          <Button
            variant="outline"
            onClick={() => setStatus("idle")}
            className="border-none text-blue"
          >
            Enviar outra mensagem
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={enviar}
      noValidate
      className="relative rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_30px_60px_-30px_rgba(11,30,62,0.4)] backdrop-blur-md sm:p-8"
    >
      <h3 className="font-display text-lg font-semibold text-navy">
        Solicite um contato
      </h3>
      <p className="mt-1 text-sm text-muted">
        Preencha os dados abaixo e nossa equipe fala com você.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="campo-nome" className="text-xs font-semibold text-navy">
            Nome <span className="text-error">*</span>
          </label>
          <input
            id="campo-nome"
            name="nome"
            autoComplete="name"
            value={values.nome}
            onChange={(event) => atualizar("nome", event.target.value)}
            aria-invalid={Boolean(errors.nome)}
            aria-describedby={errors.nome ? "erro-nome" : undefined}
            className={`mt-1.5 ${classeCampo(Boolean(errors.nome))}`}
            placeholder="Seu nome completo"
          />
          {errors.nome ? (
            <p id="erro-nome" className="mt-1.5 text-xs text-error">
              {errors.nome}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="campo-email" className="text-xs font-semibold text-navy">
            E-mail <span className="text-error">*</span>
          </label>
          <input
            id="campo-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => atualizar("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "erro-email" : undefined}
            className={`mt-1.5 ${classeCampo(Boolean(errors.email))}`}
            placeholder="voce@empresa.com.br"
          />
          {errors.email ? (
            <p id="erro-email" className="mt-1.5 text-xs text-error">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="campo-telefone" className="text-xs font-semibold text-navy">
            WhatsApp / Telefone
          </label>
          <input
            id="campo-telefone"
            name="telefone"
            type="tel"
            autoComplete="tel"
            value={values.telefone}
            onChange={(event) =>
              atualizar("telefone", formatarTelefone(event.target.value))
            }
            aria-invalid={Boolean(errors.telefone)}
            aria-describedby={errors.telefone ? "erro-telefone" : undefined}
            className={`mt-1.5 ${classeCampo(Boolean(errors.telefone))}`}
            placeholder="(33) 98405-5949"
          />
          {errors.telefone ? (
            <p id="erro-telefone" className="mt-1.5 text-xs text-error">
              {errors.telefone}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="campo-empresa" className="text-xs font-semibold text-navy">
            Empresa
          </label>
          <input
            id="campo-empresa"
            name="empresa"
            autoComplete="organization"
            value={values.empresa}
            onChange={(event) => atualizar("empresa", event.target.value)}
            aria-invalid={Boolean(errors.empresa)}
            className={`mt-1.5 ${classeCampo(Boolean(errors.empresa))}`}
            placeholder="Nome da sua empresa (opcional)"
          />
          {errors.empresa ? (
            <p className="mt-1.5 text-xs text-error">{errors.empresa}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="campo-produto" className="text-xs font-semibold text-navy">
            Produto de interesse
          </label>
          <select
            id="campo-produto"
            name="produto"
            value={values.produto}
            onChange={(event) => atualizar("produto", event.target.value)}
            className={`mt-1.5 ${classeCampo(false)}`}
          >
            <option value="">Selecione</option>
            {opcoesProduto.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="campo-mensagem"
            className="text-xs font-semibold text-navy"
          >
            Mensagem <span className="text-error">*</span>
          </label>
          <textarea
            id="campo-mensagem"
            name="mensagem"
            rows={4}
            maxLength={1000}
            value={values.mensagem}
            onChange={(event) => atualizar("mensagem", event.target.value)}
            aria-invalid={Boolean(errors.mensagem)}
            aria-describedby={errors.mensagem ? "erro-mensagem" : undefined}
            className={`mt-1.5 resize-y ${classeCampo(Boolean(errors.mensagem))}`}
            placeholder="Conte um pouco sobre o seu projeto ou necessidade."
          />
          <div className="mt-1.5 flex items-start justify-between gap-4">
            {errors.mensagem ? (
              <p id="erro-mensagem" className="text-xs text-error">
                {errors.mensagem}
              </p>
            ) : (
              <span />
            )}
            <span className="text-xs text-muted/70">
              {values.mensagem.length}/1000
            </span>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
            <input
              id="campo-consentimento"
              type="checkbox"
              checked={values.consentimento}
              onChange={(event) =>
                atualizar("consentimento", event.target.checked)
              }
              aria-invalid={Boolean(errors.consentimento)}
              aria-describedby={
                errors.consentimento ? "erro-consentimento" : undefined
              }
              className="mt-0.5 h-4 w-4 rounded border-line text-blue focus:ring-blue/20"
            />
            <span>
              Concordo em ser contatado pela WRV Tecnologia e li a{" "}
              <Link
                href="/politica-de-privacidade"
                className="font-medium text-blue underline-offset-2 hover:underline"
              >
                Política de Privacidade
              </Link>
              . <span className="text-error">*</span>
            </span>
          </label>
          {errors.consentimento ? (
            <p id="erro-consentimento" className="mt-1.5 text-xs text-error">
              {errors.consentimento}
            </p>
          ) : null}
        </div>

        <div aria-hidden="true" className="absolute -left-[9999px] top-auto">
          <label htmlFor="campo-website">Não preencha este campo</label>
          <input
            id="campo-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => atualizar("website", event.target.value)}
          />
        </div>
      </div>

      {status === "error" && serverError ? (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-error/25 bg-error/5 p-4 text-sm text-error"
        >
          <p>{serverError}</p>
          <p className="mt-2 text-xs text-error/80">
            Você também pode falar direto pelo WhatsApp{" "}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2"
            >
              {site.telefoneExibicao}
            </a>{" "}
            ou enviar um e-mail para{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold underline underline-offset-2"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? "Enviando..." : "Enviar mensagem"}
          {status !== "submitting" ? (
            <Icon name="arrow-right" className="h-4 w-4" />
          ) : null}
        </Button>
        <p className="text-xs text-muted/80">
          Respondemos em até 1 dia útil.
        </p>
      </div>
    </form>
  );
}
