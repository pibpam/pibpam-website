import {ITeam} from "./Team";

export interface ISchedule {
    uuid: string
    title: string
    shortDescription?: string
    description?: string
    image?: string
    enrollmentLink?: string
    highlight: boolean
    vacancies?: number
    publicSchedule?: string
    address?: string
    addressRedirect?: string
    extraData?: string
    created_at: string
    team?: ITeam
}

export interface IScheduleDate {
    uuid: string
    scheduleDate: string
    created_at: string
    schedule: ISchedule
}
