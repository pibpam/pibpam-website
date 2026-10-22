import Link from "next/link";
import type { IScheduleDate } from "@/types";
import { dateParts, formatTime } from "@/lib/format";

export const agendaHref = (item: Pick<IScheduleDate, "uuid">) => `/agenda/${item.uuid}`;

interface AgendaListProps {
  items: IScheduleDate[];
  tone?: "light" | "dark";
}

/** Lista cronológica (não cards): data à esquerda, o que acontece à direita. */
export function AgendaList({ items, tone = "light" }: AgendaListProps) {
  const dark = tone === "dark";
  return (
    <ol className={`divide-y ${dark ? "divide-line-inverse border-line-inverse" : "divide-line border-line"} border-y`}>
      {items.map((item) => {
        const { day, month, weekday } = dateParts(item.scheduleDate);
        const { schedule } = item;
        return (
          <li key={item.uuid} className="group relative grid grid-cols-[4.5rem_1fr] items-center gap-5 py-5 md:grid-cols-[5.5rem_1fr_auto] md:gap-8">
            <time dateTime={item.scheduleDate} className="flex flex-col leading-none">
              <span className="text-4xl font-extrabold tracking-tight tabular-nums md:text-5xl">{day}</span>
              <span className={`mt-1 text-sm font-semibold ${dark ? "text-brand" : "text-brand-strong"}`}>
                {month}, {weekday}
              </span>
            </time>
            <div className="min-w-0">
              <h3 className="text-lg font-bold tracking-tight md:text-xl">
                <Link href={agendaHref(item)} className="after:absolute after:inset-0 after:content-[''] group-hover:underline">
                  {schedule.title.trim()}
                </Link>
              </h3>
              {schedule.shortDescription && (
                <p className={`mt-1 truncate ${dark ? "text-ink-inverse-muted" : "text-ink-muted"}`}>{schedule.shortDescription}</p>
              )}
            </div>
            <p className={`col-start-2 text-sm font-semibold tabular-nums md:col-start-auto md:text-base ${dark ? "text-ink-inverse-muted" : "text-ink-muted"}`}>
              {formatTime(item.scheduleDate)}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
