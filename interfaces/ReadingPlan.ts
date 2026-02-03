import { IBook, IVerse } from "../data/bibles";
import { IAuthor } from "./Author";
import { IPagination } from "./Pagination";

export type UUID = string;
export type ISODateString = string;

export interface IReference {
  chapter: string;
  book: IBook;
  verses: IVerse[];
}


export interface DailyReading {
  uuid: UUID;
  title: string;
  image: string;
  audio: string | null;
  reference: string;
  devotional: string | null;
  transcription: string | null;
  created_at: ISODateString;
  references?: IReference[];
  author?: IAuthor
}

export interface IReadingPlanItem {
  uuid: UUID;
  position: number;
  created_at: ISODateString;
  dailyReading: DailyReading;
}

export interface IReadingPlan {
  uuid: UUID;
  title: string;
  description: string;
  image: string;
  active: boolean;
  created_at: ISODateString;
  readingPlanItems?: IReadingPlanItem[];
  itemsQtd?: number
}

export interface IGetAllReadingPlan extends IPagination {
  data: IReadingPlan[];
}
