import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

interface Crumb {
  name: string;
  path: string;
}

interface PageHeaderProps {
  title: string;
  description?: ReactNode;
  /** Trilha a partir de "Início" (exclusivo); o último item é a página atual. */
  breadcrumbs: Crumb[];
  children?: ReactNode;
}

/** Abertura das páginas internas: trilha, h1 e um parágrafo de contexto. */
export function PageHeader({ title, description, breadcrumbs, children }: PageHeaderProps) {
  return (
    <div className="bg-mist">
      <Container className="pt-10 pb-12 md:pt-14 md:pb-16">
        <nav aria-label="Trilha de navegação" className="text-sm text-ink-muted">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link href="/" className="hover:text-brand-strong">Início</Link>
            </li>
            {breadcrumbs.map((crumb, index) => {
              const last = index === breadcrumbs.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  {last ? (
                    <span aria-current="page" className="font-semibold text-ink">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path} className="hover:text-brand-strong">{crumb.name}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="mt-6 max-w-4xl animate-rise text-4xl font-extrabold tracking-[-0.03em] text-balance md:text-6xl md:leading-[1.05]">
          {title}
        </h1>
        {description && (
          <div className="mt-5 max-w-2xl animate-rise text-lg leading-relaxed text-ink-muted [animation-delay:80ms] md:text-xl">
            {description}
          </div>
        )}
        {children}
      </Container>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
    </div>
  );
}
