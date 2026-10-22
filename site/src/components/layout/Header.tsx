"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";
import { useLive } from "@/components/live/LiveProvider";

/**
 * Transparente sobre o hero escuro da home; fica sólido ao rolar ou nas
 * demais páginas (que abrem com um cabeçalho claro).
 */
export function Header() {
  const pathname = usePathname();
  const { live } = useLive();
  const [scrolled, setScrolled] = useState(false);
  // O menu guarda a rota em que foi aberto: ao navegar ele fecha sozinho.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-40 ${
        overHero ? "bg-transparent text-ink-inverse" : "bg-paper/95 text-ink shadow-[0_1px_0_var(--line)] backdrop-blur"
      }`}
    >
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-sm focus:bg-paper focus:px-4 focus:py-2 focus:text-ink">
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-6 px-5 md:px-8">
        <Link href="/" aria-label="PIB Pará de Minas, página inicial" className="shrink-0">
          <Image src="/pibpam-logo.svg" alt="" width={148} height={38} priority />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isLive = link.href === "/ao-vivo";
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors ${
                  overHero ? "hover:bg-ink-inverse/10" : "hover:bg-brand-soft"
                } ${isActive(link.href) ? (overHero ? "text-brand" : "text-brand-strong") : ""}`}
              >
                {isLive && live && <span aria-hidden className="size-2 animate-live rounded-full bg-accent" />}
                {link.label}
                {isLive && live && <span className="sr-only">(transmissão acontecendo agora)</span>}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/sobre#visite"
            className={`hidden h-11 items-center rounded-full px-5 text-[0.95rem] font-semibold transition-colors sm:inline-flex ${
              overHero ? "bg-accent text-pine hover:bg-paper" : "bg-brand-strong text-paper hover:bg-pine"
            }`}
          >
            Planeje sua visita
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full hover:bg-ink/5 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpenAt(open ? null : pathname)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Principal"
          className="fixed inset-x-0 top-18 bottom-0 flex animate-rise flex-col gap-1 overflow-y-auto bg-paper px-5 pt-4 pb-10 text-ink lg:hidden"
        >
          {[{ href: "/", label: "Início" }, ...NAV_LINKS].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="flex items-center justify-between border-b border-line py-4 text-2xl font-bold tracking-tight aria-[current=page]:text-brand-strong"
            >
              {link.label}
              {link.href === "/ao-vivo" && live && <span className="rounded-full bg-accent px-3 py-1 text-sm text-pine">agora</span>}
            </Link>
          ))}
          <Link href="/sobre#visite" className="mt-6 inline-flex h-13 items-center justify-center rounded-full bg-brand-strong font-semibold text-paper">
            Planeje sua visita
          </Link>
        </nav>
      )}
    </header>
  );
}
