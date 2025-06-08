import { IAuthor } from "./Author";
import { IPagination } from "./Pagination";
import { ISeries } from "./Series";

export interface IContent {
  uuid: string
  name: string
  description: string
  contentDate: string
  image?: string
  content: string
  serviceContent: "YOUTUBE"
  active: boolean
  created_at: string
  isLive: boolean
  startAt?: string
  finishAt?: string
  author?: IAuthor
  series_contents?: {
    uuid: string,
    position: number,
    ytPlaylistItemId?: string,
    created_at: string,
    series: ISeries
  }[]
}

export interface IGetAllContentsResponse extends IPagination {
  data: IContent[]
}

