# WRV Tecnologia — Landing Page

Site institucional da WRV Tecnologia (Next.js 15 + TypeScript + Tailwind CSS v4).

## Comandos

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:3000
npm run lint     # ESLint
npx tsc --noEmit # checagem de tipos
npm run build    # build de produção (pare o dev antes)
npm start        # sobe o build de produção
```

> Nunca rode `npm run build` com o `npm run dev` ligado: os dois usam a pasta `.next` e o dev quebra.

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SITE_URL` | Produção | URL pública do site (ex.: `https://wrvsystems.com.br`) |
| `NEXT_PUBLIC_GA_ID` | Não | ID do Google Analytics 4 (`G-XXXXXXX`); só carrega após consentimento |
| `RESEND_API_KEY` | Sim (leads) | Chave da API do Resend para envio dos leads |
| `LEAD_TO_EMAIL` | Sim (leads) | E-mail(s) que recebem os leads (separe múltiplos por vírgula) |
| `LEAD_FROM_EMAIL` | Sim (leads) | Remetente verificado no Resend |
| `RATE_LIMIT_SALT` | Recomendada | Sal para hash de IP no rate limit |
| `ADMIN_PASSWORD` | Sim (painel) | Senha de acesso ao painel `/admin` |
| `ADMIN_SESSION_SECRET` | Recomendada | Segredo da assinatura da sessão do painel |

Sem `RESEND_API_KEY`, o formulário continua funcionando em modo local (o lead é registrado no log do servidor e fica salvo no painel, sem envio de e-mail).

## Painel de gestão de leads

- Acesse `http://localhost:3000/admin` (senha = `ADMIN_PASSWORD`).
- Lista, busca, filtro por status, alteração de status e exportação CSV.
- Os leads ficam salvos em `.data/leads.json` (pasta ignorada pelo Git).
- Em VPS o arquivo persiste normalmente; **na Vercel o disco é efêmero** — nesse caso migrar para Postgres (ver `plano-gestao-leads.md`).

## Onde editar o conteúdo

| Conteúdo | Arquivo |
|----------|---------|
| Produtos / portfólio | `src/content/produtos.ts` |
| Seção "Conheça na prática" (telas) | `src/content/telas.ts` |
| Diferenciais | `src/content/diferenciais.ts` |
| Contato (WhatsApp, e-mail, local) | `src/content/site.ts` |
| Redes sociais | `src/content/redes-sociais.ts` |
| Imagens das telas | `public/prints/` (desktop 16:10 · mobile 9:19) |
| Molduras notebook/celular | `public/frames/laptop-frame.png` e `phone-frame.png` |

## Deploy

- **Vercel (recomendado):** importar o repositório, definir as variáveis de ambiente e apontar o domínio `wrvsystems.com.br` (DNS: `A` para `76.76.21.21` ou `CNAME` conforme instruído pela Vercel).
- **VPS:** `npm ci && npm run build && npm start` atrás de um proxy (Nginx) com HTTPS.
