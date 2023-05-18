import {IPagination} from "./Pagination";
import {IContent} from "./Contens";

export interface ISeries {
    uuid: string
    title: string
    description?: string
    image?: string
    active: boolean
    created_at: string
    series_contents: ISeriesContent[]
}

export interface ISeriesContent {
    uuid: string
    created_at: string
    content: IContent
}

export interface IGetAllSeries extends IPagination {
    data: ISeries[]
}
