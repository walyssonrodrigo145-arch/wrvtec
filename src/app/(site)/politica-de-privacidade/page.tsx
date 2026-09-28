import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como a WRV Tecnologia coleta, utiliza, armazena e protege os dados enviados pelo site.",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: true, follow: true },
};

const blocos = [
  {
    titulo: "1. Informações que coletamos",
    texto:
      "Coletamos apenas as informações fornecidas voluntariamente por você nos canais de contato do site: nome, e-mail, telefone/WhatsApp, empresa, produto de interesse e mensagem. Também podemos coletar dados de navegação anônimos (páginas visitadas e interações) quando você aceita o uso de cookies.",
  },
  {
    titulo: "2. Como usamos as informações",
    texto:
      "Os dados são utilizados exclusivamente para responder à sua solicitação de contato, apresentar propostas comerciais, prestar suporte e melhorar a experiência de navegação no site. Não vendemos nem compartilhamos seus dados com terceiros para fins publicitários.",
  },
  {
    titulo: "3. Base legal e consentimento",
    texto:
      "O tratamento dos dados é realizado com base no seu consentimento (Lei Geral de Proteção de Dados — LGPD, Lei nº 13.709/2018), manifestado no momento do envio do formulário ou ao aceitar os cookies do site.",
  },
  {
    titulo: "4. Armazenamento e segurança",
    texto:
      "As informações são armazenadas em ambiente controlado e protegido, com medidas técnicas e administrativas adequadas para evitar acessos não autorizados, perda ou alteração dos dados.",
  },
  {
    titulo: "5. Tempo de retenção",
    texto:
      "Os dados de contato são mantidos por até 12 meses após o último contato ou enquanto durar a relação comercial, e depois são excluídos ou anonimizados.",
  },
  {
    titulo: "6. Seus direitos",
    texto:
      "Você pode solicitar a qualquer momento a confirmação, o acesso, a correção, a portabilidade ou a exclusão dos seus dados pessoais, bem como revogar o consentimento dado.",
  },
  {
    titulo: "7. Cookies",
    texto:
      "Utilizamos cookies essenciais para o funcionamento do site e, mediante consentimento, cookies de medição para entender como o site é utilizado. Você pode aceitar ou recusar os cookies não essenciais no banner exibido na primeira visita.",
  },
  {
    titulo: "8. Contato do encarregado",
    texto: `Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato pelo e-mail ${site.email}.`,
  },
];

export default function PoliticaPage() {
  return (
    <Section className="bg-white pt-32 sm:pt-36">
      <p className="text-xs font-semibold tracking-[0.22em] text-blue">
        WRV TECNOLOGIA
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
        Política de Privacidade
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        Esta política descreve como a WRV Tecnologia trata os dados pessoais
        coletados por meio deste site, em conformidade com a LGPD.
      </p>

      <div className="mt-10 max-w-3xl space-y-8">
        {blocos.map((bloco) => (
          <div key={bloco.titulo}>
            <h2 className="font-display text-lg font-semibold text-navy">
              {bloco.titulo}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              {bloco.texto}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-12 text-xs text-muted/70">
        Última atualização: setembro de {new Date().getFullYear()}.
      </p>
    </Section>
  );
}
