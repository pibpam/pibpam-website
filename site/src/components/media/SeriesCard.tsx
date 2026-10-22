import Image from "next/image";
import Link from "next/link";
import type { ISeries } from "@/types";

export const seriesHref = (series: Pick<ISeries, "uuid">) => `/conteudos/series/${series.uuid}`;

export function SeriesCard({ series, tone = "light" }: { series: ISeries; tone?: "light" | "dark" }) {
  const count = series.series_contents?.length ?? 0;
  return (
    <article className="group relative">
      <div className="relative aspect-video overflow-hidden rounded-md bg-pine-soft">
        {series.image && (
          <Image
            src={series.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 85vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>
      <h3 className="mt-4 text-lg font-bold tracking-tight">
        <Link href={seriesHref(series)} className="after:absolute after:inset-0 after:content-['']">
          {series.title}
        </Link>
      </h3>
      {count > 0 && (
        <p className={`mt-1 text-sm ${tone === "dark" ? "text-ink-inverse-muted" : "text-ink-muted"}`}>
          {count} {count === 1 ? "mensagem" : "mensagens"}
        </p>
      )}
    </article>
  );
}
