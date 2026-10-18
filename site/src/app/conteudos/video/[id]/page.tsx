import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, getContents } from "@/lib/api";
import { buildMetadata, videoJsonLd } from "@/lib/seo";
import { formatDate, isUuid, youtubeThumb, youtubeWatchUrl } from "@/lib/format";
import { atLeastOne } from "@/lib/static-params";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { VideoGrid } from "@/components/media/VideoGrid";
import { seriesHref } from "@/components/media/SeriesCard";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateStaticParams() {
  const { data } = await getContents("transmission", 1, 6);
  return atLeastOne(data.map((content) => ({ id: content.uuid })));
}

const load = (id: string) => (isUuid(id) ? getContent(id) : Promise.resolve(null));

export async function generateMetadata({ params }: PageProps<"/conteudos/video/[id]">) {
  const { id } = await params;
  const content = await load(id);
  if (!content) return {};
  const author = content.author?.name ? ` com ${content.author.name}` : "";
  return buildMetadata({
    title: content.name,
    description: `${content.description || "Mensagem"}${author}. Culto de ${formatDate(content.contentDate)} na PIB Pará de Minas.`,
    path: `/conteudos/video/${content.uuid}`,
    image: content.image || youtubeThumb(content.content),
    type: "video.other",
  });
}

export default async function VideoPage({ params }: PageProps<"/conteudos/video/[id]">) {
  const { id } = await params;
  const content = await load(id);
  if (!content) notFound();

  const path = `/conteudos/video/${content.uuid}`;
  const series = content.series_contents?.[0]?.series;
  const recent = await getContents("transmission", 1, 4);
  const more = recent.data.filter((item) => item.uuid !== content.uuid).slice(0, 3);

  return (
    <>
      <PageHeader
        title={content.name}
        description={
          <p>
            {content.description && <span className="font-semibold text-ink">{content.description}. </span>}
            {[content.author?.name, formatDate(content.contentDate)].filter(Boolean).join(", ")}
          </p>
        }
        breadcrumbs={[
          { name: "Mensagens", path: "/conteudos" },
          { name: content.name, path },
        ]}
      />

      <Container className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
          <YouTubeEmbed videoId={content.content} title={content.name} poster={content.image} />
          <aside className="flex flex-col gap-6">
            {series && (
              <div className="rounded-md bg-brand-soft p-5">
                <p className="text-sm text-ink-muted">Faz parte da série</p>
                <Link href={seriesHref(series)} className="mt-1 block text-lg font-bold hover:text-brand-strong">
                  {series.title}
                </Link>
              </div>
            )}
            <ButtonLink href={youtubeWatchUrl(content.content)} variant="outline">
              Abrir no YouTube
            </ButtonLink>
          </aside>
        </div>
      </Container>

      {more.length > 0 && (
        <Section tone="mist" labelledBy="mais-title">
          <SectionHeader
            id="mais-title"
            title="Continue assistindo"
            action={<ButtonLink href="/conteudos/transmissoes" variant="outline">Ver todas</ButtonLink>}
          />
          <VideoGrid contents={more} />
        </Section>
      )}

      <JsonLd data={videoJsonLd(content, path)} />
    </>
  );
}
