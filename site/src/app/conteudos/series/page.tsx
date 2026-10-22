import { cacheLife } from "next/cache";
import { getSeriesList } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentNav } from "@/components/media/ContentNav";
import { Section } from "@/components/ui/Section";
import { SeriesCard } from "@/components/media/SeriesCard";

export const metadata = buildMetadata({
  title: "Séries de mensagens",
  description: "Séries de exposição bíblica da Primeira Igreja Batista em Pará de Minas, livro por livro e por temas.",
  path: "/conteudos/series",
});

export default async function SeriesPage() {
  "use cache";
  cacheLife("hours");

  // São poucas dezenas de séries: uma página só, sem paginação.
  const { data } = await getSeriesList(1, 100);

  return (
    <>
      <PageHeader
        title="Séries"
        description="Estudos que percorrem um livro ou um tema da Bíblia ao longo de vários cultos. Comece pela primeira mensagem e siga a sequência."
        breadcrumbs={[
          { name: "Mensagens", path: "/conteudos" },
          { name: "Séries", path: "/conteudos/series" },
        ]}
      >
        <ContentNav current="/conteudos/series" />
      </PageHeader>
      <Section labelledBy="series-list-title">
        <h2 id="series-list-title" className="sr-only">Todas as séries</h2>
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <li key={item.uuid}>
              <SeriesCard series={item} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
