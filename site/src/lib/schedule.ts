import type { IChurchSchedule } from "@/types";

export const WEEKDAYS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

/** Índice do dia (0 = domingo) a partir do texto livre salvo no backend ("Quarta-feira"). */
export const weekdayIndex = (day: string) => WEEKDAYS.findIndex((weekday) => day.toLowerCase().startsWith(weekday));

/** Horários semanais em ordem: domingo primeiro, depois por horário. */
export const sortSchedules = (items: IChurchSchedule[]) =>
  [...items].sort((a, b) => {
    const order = (item: IChurchSchedule) => {
      const day = weekdayIndex(item.day);
      return (day < 0 ? 7 : day) * 10000 + Number(item.time.replace(":", ""));
    };
    return order(a) - order(b);
  });
