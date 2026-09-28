import type { IconName } from "@/components/ui/Icon";

export type RedeSocial = {
  label: string;
  href: string;
  icone: IconName;
};

export const redesSociais: RedeSocial[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/wrvtecnologia",
    icone: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/wrvtecnologia",
    icone: "linkedin",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@wrvtecnologia",
    icone: "youtube",
  },
];
