import type { ComponentType, ReactElement } from "react";
import {
  ArrowRight,
  Check,
  Cloud,
  Code,
  ExternalLink,
  Globe,
  Headphones,
  Layers,
  Mail,
  MapPin,
  Menu,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Users,
  X,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/cn";

export type IconName =
  | "sparkles"
  | "headset"
  | "layers"
  | "shield"
  | "cloud"
  | "users"
  | "star"
  | "code"
  | "arrow-right"
  | "menu"
  | "close"
  | "check"
  | "mail"
  | "map-pin"
  | "globe"
  | "smartphone"
  | "gear"
  | "external-link"
  | "whatsapp"
  | "instagram"
  | "linkedin"
  | "youtube";

const lucide: Record<Exclude<IconName, "whatsapp" | "instagram" | "linkedin" | "youtube">, ComponentType<LucideProps>> = {
  sparkles: Sparkles,
  headset: Headphones,
  layers: Layers,
  shield: ShieldCheck,
  cloud: Cloud,
  users: Users,
  star: Star,
  code: Code,
  "arrow-right": ArrowRight,
  menu: Menu,
  close: X,
  check: Check,
  mail: Mail,
  "map-pin": MapPin,
  globe: Globe,
  smartphone: Smartphone,
  gear: Settings,
  "external-link": ExternalLink,
};

const brands: Record<"whatsapp" | "instagram" | "linkedin" | "youtube", ReactElement> = {
  whatsapp: (
    <path
      fill="currentColor"
      stroke="none"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"
    />
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.09h4.56V24H.22zM8.34 8.09h4.37v2.17h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 6.99V24h-4.56v-8.06c0-1.92-.03-4.4-2.68-4.4-2.68 0-3.09 2.09-3.09 4.25V24H8.34z"
    />
  ),
  youtube: (
    <path
      fill="currentColor"
      stroke="none"
      d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"
    />
  ),
};

export function Icon({
  name,
  className,
  strokeWidth = 1.8,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const LucideIcon = lucide[name as keyof typeof lucide];

  if (LucideIcon) {
    return <LucideIcon className={cn("h-5 w-5 shrink-0", className)} strokeWidth={strokeWidth} aria-hidden="true" />;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("h-5 w-5 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {brands[name as keyof typeof brands]}
    </svg>
  );
}
