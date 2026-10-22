import Link from "next/link";

const TABS = [
  { href: "/conteudos", label: "Destaques" },
  { href: "/conteudos/transmissoes", label: "Cultos transmitidos" },
  { href: "/conteudos/series", label: "Séries" },
  { href: "/ao-vivo", label: "Ao vivo" },
];

/** Navegação entre as seções de conteúdo; `current` marca a aba ativa. */
export function ContentNav({ current }: { current: string }) {
  return (
    <nav aria-label="Seções de conteúdo" className="mt-8 -mx-5 overflow-x-auto px-5">
      <ul className="flex gap-2">
        {TABS.map((tab) => (
          <li key={tab.href}>
            <Link
              href={tab.href}
              aria-current={tab.href === current ? "page" : undefined}
              className="inline-flex h-10 items-center rounded-full border border-line bg-paper px-4 text-sm font-semibold whitespace-nowrap hover:border-brand-strong aria-[current=page]:border-brand-strong aria-[current=page]:bg-brand-strong aria-[current=page]:text-paper"
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
