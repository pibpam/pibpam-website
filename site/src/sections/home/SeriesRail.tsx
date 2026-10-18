import type { ISeries } from "@/types";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SeriesCard } from "@/components/media/SeriesCard";

/** Trilho horizontal com rolagem por snap; no desktop mostra três por vez. */
export function SeriesRail({ series }: { series: ISeries[] }) {
  if (series.length === 0) return null;
  return (
    <Section tone="mist" labelledBy="series-title">
      <SectionHeader
        id="series-title"
        title="Séries de mensagens"
        description="Estudos que percorrem um livro ou um tema da Bíblia ao longo de vários domingos."
        action={<ButtonLink href="/conteudos/series" variant="outline">Todas as séries</ButtonLink>}
      />
      <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-6 md:scroll-px-8 overflow-x-auto px-5 pb-4 [scrollbar-width:thin] md:-mx-8 md:px-8">
        {series.map((item) => (
          <li key={item.uuid} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-3rem)/3)]">
            <SeriesCard series={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
