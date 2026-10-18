import { cacheLife } from "next/cache";
import { getContents, getSeriesList } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentNav } from "@/components/media/ContentNav";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { VideoGrid } from "@/components/media/VideoGrid";
import { SeriesCard } from "@/components/media/SeriesCard";

export const metadata = buildMetadata({
  title: "Mensagens e transmissões",
  description:
    "Assista aos cultos transmitidos e às séries de exposição bíblica da Primeira Igreja Batista em Pará de Minas.",
  path: "/conteudos",
});

export default async function ConteudosPage() {
  "use cache";
  cacheLife("minutes");

  const [transmissions, series] = await Promise.all([getContents("transmission", 1, 6), getSeriesList(1, 6)]);

  return (
    <>
      <PageHeader
        title="Mensagens"
        description="Cada culto é transmitido e fica guardado aqui. Assista à exposição mais recente ou acompanhe uma série do começo."
        breadcrumbs={[{ name: "Mensagens", path: "/conteudos" }]}
      >
        <ContentNav current="/conteudos" />
      </PageHeader>

      <Section labelledBy="transmissoes-title">
        <SectionHeader
          id="transmissoes-title"
          title="Cultos transmitidos"
          description={`${transmissions.pagination.total} cultos disponíveis.`}
          action={<ButtonLink href="/conteudos/transmissoes" variant="outline">Ver todos</ButtonLink>}
        />
        <VideoGrid contents={transmissions.data} />
      </Section>

      {series.data.length > 0 && (
        <Section tone="mist" labelledBy="series-hub-title">
          <SectionHeader
            id="series-hub-title"
            title="Séries"
            description="Exposições que percorrem um livro ou um tema da Bíblia."
            action={<ButtonLink href="/conteudos/series" variant="outline">Todas as séries</ButtonLink>}
          />
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {series.data.map((item) => (
              <li key={item.uuid}>
                <SeriesCard series={item} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
