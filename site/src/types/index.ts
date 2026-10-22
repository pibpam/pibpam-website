// Cópia enxuta de ../interfaces/* do app legado, só com o que o site usa.
// Mantenha em sincronia se o formato da API mudar.

export interface IPagination {
  pagination: { page: number; total: number; limit: number; totalPage: number };
}

export interface IChurchSchedule {
  uuid: string;
  text: string;
  day: string;
  time: string;
}

export interface IChurchInfo {
  uuid: string;
  name: string;
  address?: string;
  site?: string;
  phoneNumber?: string;
  whatsAppNumber?: string;
  instagramUrl?: string;
  instagramName?: string;
  youTubeUrl?: string;
  youTubeName?: string;
  spotifyUrl?: string;
  spotifyName?: string;
  email?: string;
  history?: string;
  shepherdText?: string;
  church_schedules: IChurchSchedule[];
}

export interface IAuthor {
  uuid: string;
  name: string;
  image?: string;
}

export type ContentType = "preach" | "transmission" | "live";

export interface ISeriesSummary {
  uuid: string;
  title: string;
  description?: string;
  image?: string;
}

export interface IContent {
  uuid: string;
  name: string;
  description: string;
  contentDate: string;
  image?: string;
  /** id do vídeo no YouTube */
  content: string;
  serviceContent: "YOUTUBE";
  active: boolean;
  published?: boolean;
  isLive: boolean;
  type?: ContentType;
  author?: IAuthor | null;
  series_contents?: { uuid: string; position: number; series: ISeriesSummary }[];
}

export type IContentList = IPagination & { data: IContent[] };

export interface ISeries extends ISeriesSummary {
  active: boolean;
  created_at: string;
  series_contents: { uuid: string; position?: number; content: IContent }[];
}

export type ISeriesList = IPagination & { data: ISeries[] };

export interface ITeamSummary {
  uuid: string;
  name: string;
  image?: string;
}

export interface ISchedule {
  uuid: string;
  title: string;
  shortDescription?: string | null;
  description?: string | null;
  image?: string | null;
  enrollmentLink?: string | null;
  highlight: boolean;
  address?: string | null;
  addressRedirect?: string | null;
  team?: ITeamSummary | null;
  promotionalVideo?: string | null;
}

export interface IScheduleDate {
  uuid: string;
  scheduleDate: string;
  schedule: ISchedule;
}

export interface IBroadcast {
  uuid?: string;
  title: string;
  description: string;
  image?: string;
  ytId: string;
  ytStatus: string;
  startAt: string;
  finishAt: string;
  active: boolean;
  author: IAuthor | null;
}

export interface IBanner {
  uuid: string;
  title: string;
  subtitle?: string;
  type: "EXTERNAL" | "INTERNAL" | "NO_ACTION";
  url?: string | null;
  image: string;
}

/** Pessoa de um ministério já reduzida ao que é público (nome e função). */
export interface IMinistryPerson {
  uuid: string;
  name: string;
  role?: string | null;
  image?: string | null;
}

export interface IMinistry {
  uuid: string;
  name: string;
  shortDescription?: string;
  description?: string;
  image?: string;
  people: IMinistryPerson[];
}
