import type { IScheduleDate } from "@/types";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { AgendaList } from "@/components/agenda/AgendaList";

export function AgendaPreview({ items }: { items: IScheduleDate[] }) {
  if (items.length === 0) return null;
  return (
    <Section labelledBy="agenda-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <SectionHeader
          id="agenda-title"
          stacked
          title="Próximos dias"
          description="Cultos, Escola Bíblica, encontros dos ministérios e eventos especiais."
          action={<ButtonLink href="/agenda" variant="outline">Ver agenda completa</ButtonLink>}
        />
        <AgendaList items={items} />
      </div>
    </Section>
  );
}
