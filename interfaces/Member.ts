export interface IMember {
    uuid: string
    name: string
    image?: string
    created_at: string
}

export interface IMemberBasic {
  uuid: string
  name: string
  birthday?: number
}
