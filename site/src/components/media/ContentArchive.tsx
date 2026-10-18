import { Suspense } from "react";
import type { ContentType } from "@/types";
import { getContents } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { Pagination, parsePage } from "@/components/ui/Pagination";
import { VideoGrid } from "./VideoGrid";

const PAGE_SIZE = 12;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function ArchiveResults({ type, basePath, searchParams }: { type: ContentType; basePath: string; searchParams: SearchParams }) {
  const page = parsePage((await searchParams).pagina);
  const { data, pagination } = await getContents(type, page, PAGE_SIZE);
  return (
    <>
      <VideoGrid contents={data} />
      <Pagination basePath={basePath} page={page} totalPages={pagination.totalPage} />
    </>
  );
}

function ArchiveSkeleton() {
  return (
    <ul aria-hidden className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <li key={index}>
          <div className="aspect-video animate-pulse rounded-md bg-brand-soft" />
          <div className="mt-4 h-5 w-3/4 animate-pulse rounded-sm bg-brand-soft" />
          <div className="mt-2 h-4 w-1/2 animate-pulse rounded-sm bg-brand-soft" />
        </li>
      ))}
    </ul>
  );
}

/** Arquivo paginado de vídeos de um tipo (ex.: transmissões). */
export function ContentArchive(props: { type: ContentType; basePath: string; searchParams: SearchParams }) {
  return (
    <section aria-label="Lista de vídeos" className="py-14 md:py-20">
      <Container>
        <Suspense fallback={<ArchiveSkeleton />}>
          <ArchiveResults {...props} />
        </Suspense>
      </Container>
    </section>
  );
}
