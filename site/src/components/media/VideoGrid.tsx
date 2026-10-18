import type { IContent } from "@/types";
import { VideoCard } from "./VideoCard";

export function VideoGrid({ contents, tone }: { contents: IContent[]; tone?: "light" | "dark" }) {
  if (contents.length === 0) {
    return <p className="text-lg text-ink-muted">Nenhuma mensagem publicada aqui ainda. Veja as transmissões dos cultos.</p>;
  }
  return (
    <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {contents.map((content) => (
        <li key={content.uuid}>
          <VideoCard content={content} tone={tone} />
        </li>
      ))}
    </ul>
  );
}
