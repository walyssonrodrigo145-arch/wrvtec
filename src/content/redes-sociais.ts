import type { IconName } from "@/components/ui/Icon";

export type RedeSocial = {
  label: string;
  href: string;
  icone: IconName;
};

export const redesSociais: RedeSocial[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/musicpro.oficial",
    icone: "instagram",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@WRVTecnologiaTutorias",
    icone: "youtube",
  },
];
