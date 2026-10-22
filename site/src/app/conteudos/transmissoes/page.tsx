import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentNav } from "@/components/media/ContentNav";
import { ContentArchive } from "@/components/media/ContentArchive";

export const metadata = buildMetadata({
  title: "Cultos transmitidos",
  description: "Todos os cultos da Primeira Igreja Batista em Pará de Minas transmitidos ao vivo, com a exposição bíblica de cada encontro.",
  path: "/conteudos/transmissoes",
});

export default function TransmissoesPage({ searchParams }: PageProps<"/conteudos/transmissoes">) {
  return (
    <>
      <PageHeader
        title="Cultos transmitidos"
        description="Os cultos de domingo e quarta, do mais recente ao mais antigo."
        breadcrumbs={[
          { name: "Mensagens", path: "/conteudos" },
          { name: "Cultos transmitidos", path: "/conteudos/transmissoes" },
        ]}
      >
        <ContentNav current="/conteudos/transmissoes" />
      </PageHeader>
      <ContentArchive type="transmission" basePath="/conteudos/transmissoes" searchParams={searchParams} />
    </>
  );
}
