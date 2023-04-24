import {IAuthor} from "./Author";

export interface IDevotinal {
    active: boolean
    author?: IAuthor
    content: string
    contentDate: string
    created_at: string
    image?: string
    title: string
    uuid: string
}
