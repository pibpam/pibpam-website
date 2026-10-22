import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSeries, getSeriesList } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { formatDate, isUuid } from "@/lib/format";
import { atLeastOne } from "@/lib/static-params";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { videoHref } from "@/components/media/VideoCard";

export async function generateStaticParams() {
  const { data } = await getSeriesList(1, 6);
  return atLeastOne(data.map((series) => ({ id: series.uuid })));
}

const load = (id: string) => (isUuid(id) ? getSeries(id) : Promise.resolve(null));

export async function generateMetadata({ params }: PageProps<"/conteudos/series/[id]">) {
  const { id } = await params;
  const series = await load(id);
  if (!series) return {};
  return buildMetadata({
    title: `Série ${series.title}`,
    description: series.description || `Todas as mensagens da série ${series.title} na PIB Pará de Minas.`,
    path: `/conteudos/series/${series.uuid}`,
    image: series.image,
  });
}

export default async function SeriesDetailPage({ params }: PageProps<"/conteudos/series/[id]">) {
  const { id } = await params;
  const series = await load(id);
  if (!series) notFound();

  const path = `/conteudos/series/${series.uuid}`;
  const episodes = [...(series.series_contents ?? [])]
    .filter((item) => item.content?.active !== false)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

  return (
    <>
      <PageHeader
        title={series.title}
        description={series.description}
        breadcrumbs={[
          { name: "Mensagens", path: "/conteudos" },
          { name: "Séries", path: "/conteudos/series" },
          { name: series.title, path },
        ]}
      />
      <Section labelledBy="episodios-title">
        <div className="grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-16">
          {series.image && (
            <div className="relative aspect-video self-start overflow-hidden rounded-md lg:sticky lg:top-28">
              <Image src={series.image} alt="" fill priority sizes="(min-width: 1024px) 352px, 100vw" className="object-cover" />
            </div>
          )}
          <div>
            <h2 id="episodios-title" className="text-2xl font-extrabold tracking-tight">
              {episodes.length} {episodes.length === 1 ? "mensagem" : "mensagens"} nesta série
            </h2>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {episodes.map(({ uuid, content }, index) => (
                <li key={uuid} className="group relative grid grid-cols-[2.5rem_1fr] gap-4 py-5 md:grid-cols-[3rem_1fr_auto] md:items-center">
                  {/* A série é uma sequência real: a numeração indica a ordem de estudo. */}
                  <span className="text-2xl font-extrabold text-brand-strong tabular-nums">{index + 1}</span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold group-hover:underline">
                      <Link href={videoHref(content)} className="after:absolute after:inset-0 after:content-['']">
                        {content.name}
                      </Link>
                    </h3>
                    {content.description && <p className="mt-1 text-ink-muted">{content.description}</p>}
                  </div>
                  <p className="col-start-2 text-sm text-ink-muted md:col-start-auto">{formatDate(content.contentDate)}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    </>
  );
}
