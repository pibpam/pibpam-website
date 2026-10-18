"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLive } from "./LiveProvider";

/** Faixa no topo do site enquanto há transmissão. */
export function LiveBar() {
  const { live } = useLive();
  const pathname = usePathname();
  if (!live || pathname === "/ao-vivo") return null;

  return (
    <Link
      href="/ao-vivo"
      className="flex animate-rise items-center justify-center gap-3 bg-accent px-4 py-2 text-sm font-semibold text-pine hover:underline"
    >
      <span aria-hidden className="size-2 animate-live rounded-full bg-pine" />
      <span className="truncate">Estamos ao vivo agora: {live.title}</span>
      <span className="hidden font-bold sm:inline">Assistir</span>
    </Link>
  );
}
