import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type {
  ContentType,
  IBanner,
  IBroadcast,
  IChurchInfo,
  IContent,
  IContentList,
  IMinistry,
  IReadingPlanDay,
  IScheduleDate,
  ISeries,
  ISeriesList,
} from "@/types";

/**
 * Cliente do backend upstream. Só roda no servidor (`server-only`), então a
 * URL da API nunca vai para o browser — o cliente fala apenas com /api/site/*.
 */
const API_URL = (process.env.API ?? "https://api.pibpam.org/").replace(/\/?$/, "/");

async function request<T>(path: string): Promise<T> {
  const res = await fetch(new URL(path, API_URL), {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`API ${res.status} em ${path}`);
  return (await res.json()) as T;
}

/** Erros de rede não derrubam a página: a seção simplesmente fica vazia. */
async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    console.error(error);
    return fallback;
  }
}

const emptyList = { pagination: { page: 1, total: 0, limit: 0, totalPage: 0 }, data: [] };

async function fetchChurchInfo() {
  "use cache";
  cacheLife("hours");
  cacheTag("church");
  return request<IChurchInfo>("v1/churchs/info");
}

export const getChurchInfo = () => safe<IChurchInfo | null>(fetchChurchInfo(), null);

async function fetchContents(type: ContentType, page: number, limit: number) {
  "use cache";
  cacheLife("minutes");
  cacheTag("contents");
  const params = new URLSearchParams({ type, page: String(page), limit: String(limit) });
  return request<IContentList>(`v1/contents?${params}`);
}

export const getContents = (type: ContentType, page = 1, limit = 12) =>
  safe<IContentList>(fetchContents(type, page, limit), emptyList);

export async function getContent(uuid: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("contents", `content-${uuid}`);
  return request<IContent | null>(`v1/contents/${encodeURIComponent(uuid)}`);
}

async function fetchSeries(page: number, limit: number) {
  "use cache";
  cacheLife("hours");
  cacheTag("series");
  return request<ISeriesList>(`v1/series?page=${page}&limit=${limit}`);
}

export const getSeriesList = (page = 1, limit = 24) =>
  safe<ISeriesList>(fetchSeries(page, limit), emptyList);

export async function getSeries(uuid: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("series", `series-${uuid}`);
  return request<ISeries | null>(`v1/series/${encodeURIComponent(uuid)}`);
}

async function fetchSchedules(limit?: number) {
  "use cache";
  cacheLife("minutes");
  cacheTag("schedules");
  return request<IScheduleDate[]>(`v1/schedules${limit ? `?limit=${limit}` : ""}`);
}

export const getSchedules = (limit?: number) =>
  safe<IScheduleDate[]>(fetchSchedules(limit), []);

async function fetchHighlightedSchedules() {
  "use cache";
  cacheLife("minutes");
  cacheTag("schedules");
  return request<IScheduleDate[]>("v1/schedules/highlighted");
}

export const getHighlightedSchedules = () =>
  safe<IScheduleDate[]>(fetchHighlightedSchedules(), []);

export async function getScheduleDate(uuid: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag("schedules", `schedule-${uuid}`);
  return request<IScheduleDate | null>(`v1/schedules/date/${encodeURIComponent(uuid)}`);
}

async function fetchBanners() {
  "use cache";
  cacheLife("hours");
  cacheTag("banners");
  return request<IBanner[]>("v1/banners");
}

export const getBanners = () => safe<IBanner[]>(fetchBanners(), []);

interface RawTeam {
  uuid: string;
  name: string;
  shortDescription?: string;
  description?: string;
  image?: string;
  active?: boolean;
  teamMember?: { uuid: string; role?: string | null; member?: { name?: string; nickname?: string; image?: string | null } | null }[];
}

/** "MARIA DA SILVA" → "Maria da Silva" */
const titleCase = (value: string) =>
  value
    .toLowerCase()
    .split(/\s+/)
    .map((word) => (/^(da|de|do|das|dos|e)$/.test(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ");

async function fetchMinistries() {
  "use cache";
  cacheLife("hours");
  cacheTag("ministries");
  const teams = await request<RawTeam[]>("v1/teams");
  // A API devolve o cadastro completo de cada membro (endereço, telefone,
  // e-mail…). Aqui guardamos só nome, função e foto, e nada além disso
  // entra no cache, no HTML ou no payload do cliente.
  return teams
    .filter((team) => team.active !== false)
    .map<IMinistry>((team) => ({
      uuid: team.uuid,
      name: team.name.trim(),
      shortDescription: team.shortDescription?.trim().replace(/^-$/, "") || undefined,
      description: team.description?.trim().replace(/^-$/, "") || undefined,
      image: team.image || undefined,
      people: (team.teamMember ?? [])
        .filter((item) => item.member?.name)
        .map((item) => ({
          uuid: item.uuid,
          name: titleCase(item.member!.name!.trim()),
          role: item.role?.trim() || null,
          image: item.member?.image ?? null,
        })),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

export const getMinistries = () => safe<IMinistry[]>(fetchMinistries(), []);

/** Sem cache: usado pela rota /api/site/live, que define o próprio Cache-Control. */
export const getLives = () =>
  safe<IBroadcast[]>(
    fetch(new URL("v1/broadcast/lives", API_URL), { cache: "no-store" }).then((res) =>
      res.ok ? (res.json() as Promise<IBroadcast[]>) : [],
    ),
    [],
  );

/** Serviço externo de planos de leitura (o mesmo da Home do app). A chave fica só no servidor. */
const READING_PLANS_API = process.env.READING_PLANS_API?.replace(/\/?$/, "/");

async function fetchReadingPlanDay(slug: string) {
  "use cache";
  // A leitura nova libera à meia-noite: cache curto para a Home não ficar um dia atrás.
  cacheLife("minutes");
  cacheTag("reading-plan");
  if (!READING_PLANS_API) return null;
  const res = await fetch(new URL(`plans/${encodeURIComponent(slug)}/latest-day`, READING_PLANS_API), {
    headers: { Accept: "application/json", Authorization: `Bearer ${process.env.READING_PLANS_API_KEY ?? ""}` },
  });
  if (!res.ok) throw new Error(`Planos de leitura ${res.status} em ${slug}`);
  return (await res.json()) as IReadingPlanDay;
}

export const getReadingPlanDay = (slug: string) => safe<IReadingPlanDay | null>(fetchReadingPlanDay(slug), null);
