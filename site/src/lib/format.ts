const TZ = "America/Sao_Paulo";

const fmt = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("pt-BR", { timeZone: TZ, ...options });

const longDate = fmt({ day: "numeric", month: "long", year: "numeric" });
const weekdayDate = fmt({ weekday: "long", day: "numeric", month: "long" });
const time = fmt({ hour: "2-digit", minute: "2-digit" });
const dayNumber = fmt({ day: "2-digit" });
const monthShort = fmt({ month: "short" });
const weekdayShort = fmt({ weekday: "short" });

/** 14 de outubro de 2026 */
export const formatDate = (iso: string) => longDate.format(new Date(iso));

/** domingo, 18 de outubro */
export const formatWeekdayDate = (iso: string) => weekdayDate.format(new Date(iso));

/** 19:30 */
export const formatTime = (iso: string) => time.format(new Date(iso));

/** Partes para o bloco de data da agenda. */
export const dateParts = (iso: string) => {
  const date = new Date(iso);
  return {
    day: dayNumber.format(date),
    month: monthShort.format(date).replace(".", ""),
    weekday: weekdayShort.format(date).replace(".", ""),
  };
};

export const youtubeThumb = (id: string, quality: "maxresdefault" | "hqdefault" = "maxresdefault") =>
  `https://i.ytimg.com/vi/${id}/${quality}.jpg`;

export const youtubeWatchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export const onlyDigits = (value = "") => value.replace(/\D/g, "");

/** "37 3232-7250" → "+553732327250" */
export const toE164 = (phone = "") => `+55${onlyDigits(phone)}`;

/** "37 3232-7250" → "(37) 3232-7250" */
export const formatPhone = (phone = "") => {
  const digits = onlyDigits(phone);
  if (digits.length < 10) return phone.trim();
  return `(${digits.slice(0, 2)}) ${digits.slice(2, -4)}-${digits.slice(-4)}`;
};

export const whatsappUrl = (phone = "", text?: string) =>
  `https://wa.me/55${onlyDigits(phone)}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mapsUrl = (address = "") =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.trim())}`;

export const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

const ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&ndash;": "–",
  "&mdash;": "—",
};

/**
 * O backend guarda textos (ex.: história) como HTML de editor rico, com estilos
 * inline. Convertemos em parágrafos de texto puro para renderizar com o nosso
 * próprio estilo, sem dangerouslySetInnerHTML.
 */
export function htmlToParagraphs(html = ""): string[] {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/gi, (entity) => ENTITIES[entity] ?? " ")
    .split(/\n+/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export const truncate = (text: string, max: number) =>
  text.length <= max ? text : `${text.slice(0, text.lastIndexOf(" ", max)).trim()}…`;

export interface TimelineEntry {
  period: string;
  text: string;
}

const PERIOD = /^\d{4}(\s*[–-]\s*\d{4})?;?$/;

/**
 * A história cadastrada termina com uma "Cronologia" (linhas de ano seguidas
 * de descrição). Separamos esse trecho para exibir como linha do tempo.
 */
export function splitTimeline(paragraphs: string[]): { story: string[]; timeline: TimelineEntry[] } {
  const start = paragraphs.findIndex((paragraph) => /^cronologia:?$/i.test(paragraph));
  if (start < 0) return { story: paragraphs, timeline: [] };

  const timeline: TimelineEntry[] = [];
  for (const paragraph of paragraphs.slice(start + 1)) {
    if (PERIOD.test(paragraph)) {
      timeline.push({ period: paragraph.replace(/;$/, "").replace(/\s*[–-]\s*/, "–"), text: "" });
    } else if (timeline.length > 0) {
      const last = timeline[timeline.length - 1];
      last.text = [last.text, paragraph.replace(/;$/, ".")].filter(Boolean).join(" ");
    }
  }
  return { story: paragraphs.slice(0, start), timeline: timeline.filter((entry) => entry.text) };
}

const NAME_SUFFIXES = /^(j[úu]nior|filho|neto|sobrinho)$/i;

/** "Marco Aurélio Oliveira Duarte Júnior" → "Marco Duarte Júnior"; "Vinícius Souza Melo" → "Vinícius Melo". */
export function shortName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 2) return parts.join(" ");
  const last = parts[parts.length - 1];
  if (NAME_SUFFIXES.test(last) && parts.length > 3) return `${parts[0]} ${parts[parts.length - 2]} ${last}`;
  return `${parts[0]} ${last}`;
}

/** ["Ana"] → "Ana"; ["Ana", "Bia"] → "Ana e Bia"; ["Ana", "Bia", "Caio"] → "Ana, Bia e Caio". */
export function joinNames(names: string[]) {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} e ${names[names.length - 1]}`;
}
