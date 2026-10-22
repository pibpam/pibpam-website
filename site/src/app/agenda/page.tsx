import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import type { IScheduleDate } from "@/types";
import { getChurchInfo, getHighlightedSchedules, getSchedules } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { formatTime, formatWeekdayDate } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { AgendaList, agendaHref } from "@/components/agenda/AgendaList";
import { ServiceTimes } from "@/components/agenda/ServiceTimes";

export const metadata = buildMetadata({
  title: "Agenda",
  description: "Programação da Primeira Igreja Batista em Pará de Minas: cultos, Escola Bíblica Dominical, encontros e eventos especiais.",
  path: "/agenda",
});

const monthFormat = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric", timeZone: "America/Sao_Paulo" });

function groupByMonth(items: IScheduleDate[]) {
  const groups = new Map<string, IScheduleDate[]>();
  for (const item of items) {
    const key = monthFormat.format(new Date(item.scheduleDate));
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.entries()];
}

export default async function AgendaPage() {
  "use cache";
  cacheLife("minutes");

  const [schedules, highlighted, info] = await Promise.all([getSchedules(), getHighlightedSchedules(), getChurchInfo()]);
  const highlightIds = new Set(highlighted.map((item) => item.uuid));
  const months = groupByMonth(schedules.filter((item) => !highlightIds.has(item.uuid)));

  return (
    <>
      <PageHeader
        title="Agenda"
        description="O que acontece na igreja nas próximas semanas. Toque em um item para ver detalhes, local e inscrição quando houver."
        breadcrumbs={[{ name: "Agenda", path: "/agenda" }]}
      />

      {highlighted.length > 0 && (
        <Section labelledBy="destaques-title" className="pb-0 md:pb-0">
          <h2 id="destaques-title" className="text-2xl font-extrabold tracking-tight md:text-3xl">Em destaque</h2>
          <ul className="mt-8 grid gap-8 md:grid-cols-2">
            {highlighted.map((item) => (
              <li key={item.uuid} className="group relative overflow-hidden rounded-lg bg-pine text-ink-inverse">
                {item.schedule.image && (
                  <div className="relative aspect-[16/10]">
                    <Image src={item.schedule.image} alt="" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                )}
                <div className="p-6">
                  <p className="font-semibold text-accent">
                    <time dateTime={item.scheduleDate}>
                      {formatWeekdayDate(item.scheduleDate)}, {formatTime(item.scheduleDate)}
                    </time>
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight">
                    <Link href={agendaHref(item)} className="after:absolute after:inset-0 after:content-['']">
                      {item.schedule.title.trim()}
                    </Link>
                  </h3>
                  {item.schedule.shortDescription && <p className="mt-2 text-ink-inverse-muted">{item.schedule.shortDescription}</p>}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section labelledBy="proximos-title">
        <div className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div>
            <h2 id="proximos-title" className="sr-only">Próximas datas</h2>
            {months.length === 0 && <p className="text-lg text-ink-muted">Nenhuma data marcada nas próximas semanas além dos cultos regulares.</p>}
            <div className="space-y-14">
              {months.map(([month, items]) => (
                <div key={month}>
                  <h3 className="mb-2 text-xl font-bold first-letter:uppercase">{month}</h3>
                  <AgendaList items={items} />
                </div>
              ))}
            </div>
          </div>
          {info?.church_schedules?.length ? (
            <aside aria-labelledby="cultos-title" className="lg:sticky lg:top-28 lg:self-start">
              <h2 id="cultos-title" className="mb-4 text-xl font-bold">Toda semana</h2>
              <ServiceTimes items={info.church_schedules} tone="light" />
            </aside>
          ) : null}
        </div>
      </Section>
    </>
  );
}
