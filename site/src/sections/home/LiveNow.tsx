"use client";

import Image from "next/image";
import Link from "next/link";
import { useLive } from "@/components/live/LiveProvider";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { Container } from "@/components/ui/Container";
import { youtubeThumb } from "@/lib/format";

/** Aparece só durante uma transmissão, logo abaixo do hero. */
export function LiveNow() {
  const { live } = useLive();
  if (!live) return null;

  return (
    <section aria-labelledby="live-title" className="animate-rise bg-paper py-12 md:py-16">
      <Container>
        <Link href="/ao-vivo" className="group grid items-center gap-6 rounded-lg bg-brand-soft p-4 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-10 md:p-5">
          <div className="relative aspect-video overflow-hidden rounded-md bg-pine">
            <Image src={live.image || youtubeThumb(live.ytId)} alt="" fill sizes="(min-width: 768px) 416px, 100vw" className="object-cover" />
          </div>
          <div className="pb-2 md:pb-0">
            <LiveBadge label="Ao vivo agora" />
            <h2 id="live-title" className="mt-4 text-2xl font-extrabold tracking-tight text-balance md:text-4xl">
              {live.title}
            </h2>
            {live.author && <p className="mt-2 text-ink-muted">{live.author.name}</p>}
            <span className="mt-6 inline-flex h-11 items-center rounded-full bg-brand-strong px-5 font-semibold text-paper group-hover:bg-pine">
              Assistir à transmissão
            </span>
          </div>
        </Link>
      </Container>
    </section>
  );
}
