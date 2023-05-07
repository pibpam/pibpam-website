export interface IChurchInfo {
    uuid: string
    name: string
    address?: string
    site?: string
    phoneNumber?: string
    whatsAppNumber?: string
    instagramUrl?: string
    instagramName?: string
    youTubeUrl?: string
    youTubeName?: string
    spotifyUrl?: string
    spotifyName?: string
    email?: string
    history?: string
    shepherdText?: string
    created_at: string
    church_schedules: IChurchSchedule[]
}

export interface IChurchSchedule {
    uuid: string
    text: string
    day: string
    time: string
    created_at: string
}
