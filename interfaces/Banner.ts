export interface IBanner {
    uuid: string
    title: string
    category: string
    type: EBannerType,
    url?: string,
    startAt?: string,
    finishAt?: string
    image: string
    active: boolean
    created_at: string
    subtitle?: string
}

export enum EBannerType {
    EXTERNAL = "EXTERNAL",
    INTERNAL = "INTERNAL",
    NO_ACTION = "NO_ACTION"
}

