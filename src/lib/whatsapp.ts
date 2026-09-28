import { site } from "@/content/site";

export function whatsappLink(mensagem: string = site.whatsappMensagem): string {
  return `https://wa.me/${site.whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
}
