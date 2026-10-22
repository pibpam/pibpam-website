import Image from "next/image";
import Link from "next/link";
import type { IContent } from "@/types";
import { formatDate, youtubeThumb } from "@/lib/format";

interface VideoCardProps {
  content: IContent;
  /** Tamanho de destaque (primeiro item da home). */
  featured?: boolean;
  tone?: "light" | "dark";
  sizes?: string;
  priority?: boolean;
}

export const videoHref = (content: Pick<IContent, "uuid">) => `/conteudos/video/${content.uuid}`;

/**
 * Card de mensagem. A miniatura já traz o título do sermão; abaixo dela damos
 * destaque à passagem bíblica (descrição), que é o que identifica a exposição.
 */
export function VideoCard({ content, featured = false, tone = "light", sizes, priority }: VideoCardProps) {
  const muted = tone === "dark" ? "text-ink-inverse-muted" : "text-ink-muted";
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-video overflow-hidden rounded-md bg-pine-soft">
        <Image
          src={content.image || youtubeThumb(content.content)}
          alt=""
          fill
          priority={priority}
          sizes={sizes ?? (featured ? "(min-width: 1024px) 720px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw")}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className={featured ? "mt-5" : "mt-4"}>
        <h3 className={`${featured ? "text-2xl md:text-3xl" : "text-lg"} font-bold tracking-tight text-balance`}>
          <Link href={videoHref(content)} className="after:absolute after:inset-0 after:content-['']">
            {content.name}
          </Link>
        </h3>
        {content.description && <p className={`mt-1 font-medium ${featured ? "text-lg" : ""} ${muted}`}>{content.description}</p>}
        <p className={`mt-2 text-sm ${muted}`}>
          {[content.author?.name, formatDate(content.contentDate)].filter(Boolean).join(", ")}
        </p>
      </div>
    </article>
  );
}
