import {IMember} from "./Member";

export interface ITeamMember {
    uuid: string
    role?: string
    createdAt: string
    member?: IMember
}
export interface ITeam {
    uuid: string
    name: string
    description?: string
    shortDescription?: string
    image?: string
    active: boolean
    created_at: string
    teamMember: ITeamMember[]
}

