export const READING_PLAN_SLUG = "juntos-na-palavra";

export const readingPlanDayUrl = (dayId: string) =>
  `https://planos-leitura.vercel.app/planos/${READING_PLAN_SLUG}/${dayId}`;
