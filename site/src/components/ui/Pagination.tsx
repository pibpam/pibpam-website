import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  basePath: string;
  page: number;
  totalPages: number;
}

/** Links reais (?pagina=N) para os buscadores seguirem todo o arquivo. */
export function Pagination({ basePath, page, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;
  const href = (target: number) => (target === 1 ? basePath : `${basePath}?pagina=${target}`);
  const linkClass = "inline-flex h-11 items-center gap-1 rounded-full border border-line px-5 font-semibold hover:border-brand-strong hover:text-brand-strong";

  return (
    <nav aria-label="Paginação" className="mt-14 flex items-center justify-between gap-4">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className={linkClass}>
          <ChevronLeft aria-hidden className="size-4" /> Mais recentes
        </Link>
      ) : (
        <span />
      )}
      <p className="text-sm text-ink-muted">
        Página {page} de {totalPages}
      </p>
      {page < totalPages ? (
        <Link href={href(page + 1)} rel="next" className={linkClass}>
          Mais antigas <ChevronRight aria-hidden className="size-4" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

export function parsePage(value: string | string[] | undefined) {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}
