"use client";

import { useEffect, useState } from "react";
import type { IChurchSchedule } from "@/types";
import { sortSchedules, weekdayIndex } from "@/lib/schedule";

/** Índice do próximo horário semanal a partir de agora (horário de Brasília). */
function nextIndex(items: IChurchSchedule[]) {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  const minutesNow = now.getDay() * 1440 + now.getHours() * 60 + now.getMinutes();
  let best = -1;
  let bestDelta = Infinity;
  items.forEach((item, index) => {
    const day = weekdayIndex(item.day);
    const [hours, minutes] = item.time.split(":").map(Number);
    if (day < 0 || Number.isNaN(hours)) return;
    // +120 min: um culto em andamento continua sendo "agora" por duas horas.
    let delta = day * 1440 + hours * 60 + (minutes || 0) + 120 - minutesNow;
    if (delta < 0) delta += 7 * 1440;
    if (delta < bestDelta) {
      bestDelta = delta;
      best = index;
    }
  });
  return best;
}

interface ServiceTimesProps {
  items: IChurchSchedule[];
  tone?: "light" | "dark";
}

/**
 * Horários fixos de culto. Renderizados no servidor; depois da hidratação o
 * próximo encontro ganha o destaque em lime (depende do horário do visitante,
 * por isso não pode ir para o HTML cacheado).
 */
export function ServiceTimes({ items, tone = "dark" }: ServiceTimesProps) {
  const sorted = sortSchedules(items);
  const [next, setNext] = useState(-1);

  useEffect(() => {
    const update = () => setNext(nextIndex(sorted));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const dark = tone === "dark";
  return (
    <ul className="grid gap-2">
      {sorted.map((item, index) => {
        const isNext = index === next;
        return (
          <li
            key={item.uuid}
            className={`flex items-baseline justify-between gap-4 rounded-sm px-4 py-3 transition-colors duration-500 ${
              isNext ? "bg-accent text-pine" : dark ? "bg-ink-inverse/6" : "bg-brand-soft"
            }`}
          >
            <span className="min-w-0">
              <span className="block font-bold">{item.day}</span>
              <span className={`block text-sm ${isNext ? "text-pine/80" : dark ? "text-ink-inverse-muted" : "text-ink-muted"}`}>
                {item.text}
                {isNext && ", o próximo encontro"}
              </span>
            </span>
            <span className="text-2xl font-extrabold tracking-tight tabular-nums">{item.time}</span>
          </li>
        );
      })}
    </ul>
  );
}
