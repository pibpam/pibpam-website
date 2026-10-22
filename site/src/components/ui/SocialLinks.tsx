import type { IconType } from "react-icons";
import { FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa6";
import type { IChurchInfo } from "@/types";

type Socials = Pick<IChurchInfo, "instagramUrl" | "instagramName" | "youTubeUrl" | "youTubeName" | "spotifyUrl" | "spotifyName">;

interface SocialLinksProps {
  info: Socials | null;
  tone?: "light" | "dark";
  className?: string;
}

/** Redes sociais da igreja como botões de ícone (com nome acessível). */
export function SocialLinks({ info, tone = "light", className = "" }: SocialLinksProps) {
  const links: { href?: string; label: string; Icon: IconType }[] = [
    { href: info?.instagramUrl, label: `Instagram ${info?.instagramName ?? ""}`.trim(), Icon: FaInstagram },
    { href: info?.youTubeUrl, label: `YouTube ${info?.youTubeName ?? ""}`.trim(), Icon: FaYoutube },
    { href: info?.spotifyUrl, label: `Spotify ${info?.spotifyName ?? ""}`.trim(), Icon: FaSpotify },
  ];
  const available = links.filter((link): link is typeof link & { href: string } => Boolean(link.href));
  if (available.length === 0) return null;

  const style =
    tone === "dark"
      ? "border-line-inverse text-ink-inverse hover:border-accent hover:bg-accent hover:text-pine"
      : "border-line text-brand-strong hover:border-brand-strong hover:bg-brand-strong hover:text-paper";

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {available.map(({ href, label, Icon }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={`flex size-11 items-center justify-center rounded-full border transition-colors duration-200 ${style}`}
          >
            <Icon aria-hidden className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
