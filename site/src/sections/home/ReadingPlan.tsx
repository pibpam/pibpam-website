import { ArrowUpRight, BookOpen, Headphones, MessageSquareText, PlayCircle } from "lucide-react";
import type { IReadingPlanDay } from "@/types";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { READING_PLAN } from "@/lib/site";

const ITEM_ICONS: Record<string, typeof BookOpen> = {
  bible_reading: BookOpen,
  audio: Headphones,
  video: PlayCircle,
};

const dayDate = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", day: "numeric", month: "long" });

/** unlock_date é uma data pura (YYYY-MM-DD): formatar em UTC evita cair no dia anterior. */
const formatDay = (date: string) => dayDate.format(new Date(`${date}T12:00:00Z`));

/** Convite para o plano de leitura, com a leitura mais recente quando o serviço responde. */
export function ReadingPlan({ reading }: { reading: IReadingPlanDay | null }) {
  return (
    <Section id="plano-de-leitura" tone="pine" labelledBy="reading-title" className="scroll-mt-18">
      <div className={`grid gap-10 lg:gap-16 ${reading ? "lg:grid-cols-[1fr_26rem] lg:items-center" : ""}`}>
        <div className="max-w-xl">
          <p className="font-semibold text-accent">Plano de leitura · {reading?.plan.title ?? "Juntos na Palavra"}</p>
          <h2 id="reading-title" className="mt-3 text-3xl font-extrabold tracking-[-0.02em] text-balance md:text-[2.75rem] md:leading-[1.1]">
            Leia a Bíblia junto com a igreja
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-inverse-muted">
            Um trecho por dia, com devocional, áudio e vídeo. Comece hoje e caminhe pelas Escrituras no mesmo ritmo dos irmãos.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {reading && (
              <ButtonLink href={reading.day.url} variant="accent" size="lg">
                Ler a leitura do dia
              </ButtonLink>
            )}
            <ButtonLink
              href={reading?.plan.url ?? READING_PLAN.url}
              variant={reading ? "outline-inverse" : "accent"}
              size="lg"
              icon={<ArrowUpRight aria-hidden className="size-4" />}
            >
              Ver o plano completo
            </ButtonLink>
          </div>
        </div>

        {reading && (
          <a
            href={reading.day.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border border-line-inverse bg-ink-inverse/5 p-6 transition-colors hover:border-ink-inverse/40 hover:bg-ink-inverse/10 md:p-8"
          >
            <p className="text-sm text-ink-inverse-muted">
              Dia {reading.day.position} · {formatDay(reading.day.unlock_date)}
            </p>
            <p className="mt-2 flex items-start justify-between gap-4 text-2xl font-extrabold tracking-tight md:text-3xl">
              {reading.day.title}
              <ArrowUpRight aria-hidden className="mt-1 size-6 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </p>
            {reading.items.length > 0 && (
              <ul className="mt-6 space-y-3 border-t border-line-inverse pt-6">
                {reading.items.map((item) => {
                  const Icon = ITEM_ICONS[item.type] ?? MessageSquareText;
                  return (
                    <li key={item.id} className="flex items-center gap-3">
                      <Icon aria-hidden className="size-5 shrink-0 text-accent" />
                      <span className="font-semibold">{item.title}</span>
                      {item.reference && <span className="text-ink-inverse-muted">{item.reference}</span>}
                    </li>
                  );
                })}
              </ul>
            )}
          </a>
        )}
      </div>
    </Section>
  );
}
