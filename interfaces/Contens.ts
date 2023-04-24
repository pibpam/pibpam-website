import {IAuthor} from "./Author";

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
}
