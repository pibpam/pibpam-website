"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { youtubeThumb } from "@/lib/format";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  poster?: string;
  /** Carrega o player direto (ex.: transmissão ao vivo). */
  autoload?: boolean;
}

/**
 * Fachada leve: mostra só a imagem até o clique e então carrega o iframe do
 * YouTube (youtube-nocookie). Evita ~1 MB de JS do player no carregamento.
 */
export function YouTubeEmbed({ videoId, title, poster, autoload = false }: YouTubeEmbedProps) {
  const [active, setActive] = useState(autoload);

  return (
    <div className="relative aspect-video overflow-hidden rounded-md bg-pine">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0 size-full cursor-pointer">
          <Image src={poster || youtubeThumb(videoId)} alt="" fill priority sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
          <span className="absolute inset-0 bg-pine/20 transition-colors group-hover:bg-pine/35" />
          <span className="absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-pine shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play aria-hidden className="ml-1 size-8 fill-current" />
          </span>
          <span className="sr-only">Assistir: {title}</span>
        </button>
      )}
    </div>
  );
}
