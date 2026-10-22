import type { IContent } from "@/types";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { VideoCard } from "@/components/media/VideoCard";

export function LatestMessages({ contents }: { contents: IContent[] }) {
  if (contents.length === 0) return null;
  const [featured, ...rest] = contents;

  return (
    <Section labelledBy="latest-title">
      <SectionHeader
        id="latest-title"
        title="Última mensagem"
        description="Os cultos são transmitidos e ficam disponíveis aqui. Assista à exposição mais recente ou retome uma série."
        action={<ButtonLink href="/conteudos/transmissoes" variant="outline">Ver todas as mensagens</ButtonLink>}
      />
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
        <VideoCard content={featured} featured priority />
        <div className="grid content-start gap-8 sm:grid-cols-2 lg:grid-cols-1">
          {rest.slice(0, 2).map((content) => (
            <VideoCard key={content.uuid} content={content} sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw" />
          ))}
        </div>
      </div>
    </Section>
  );
}
