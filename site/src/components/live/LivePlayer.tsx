"use client";

import type { ReactNode } from "react";
import { useLive } from "./LiveProvider";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { JsonLd } from "@/components/seo/JsonLd";

/**
 * Player da transmissão. Enquanto não há live, mostra `offline` (conteúdo
 * renderizado no servidor: próximo culto e último vídeo).
 */
export function LivePlayer({ offline }: { offline: ReactNode }) {
  const { live } = useLive();

  // Sem live (ou antes da primeira consulta) o conteúdo offline vai no HTML,
  // o que mantém a página indexável.
  if (!live) return <>{offline}</>;

  return (
    <div className="animate-rise">
      <YouTubeEmbed videoId={live.ytId} title={live.title} poster={live.image} autoload />
      <div className="mt-6 flex flex-col gap-3">
        <LiveBadge label="Transmitindo agora" className="self-start" />
        <h2 className="text-2xl font-extrabold tracking-tight text-ink-inverse md:text-4xl">{live.title}</h2>
        {live.author && <p className="text-ink-inverse-muted">{live.author.name}</p>}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: live.title,
          description: live.description || live.title,
          thumbnailUrl: [live.image || `https://i.ytimg.com/vi/${live.ytId}/maxresdefault.jpg`],
          uploadDate: live.startAt,
          embedUrl: `https://www.youtube.com/embed/${live.ytId}`,
          publication: { "@type": "BroadcastEvent", isLiveBroadcast: true, startDate: live.startAt },
        }}
      />
    </div>
  );
}
