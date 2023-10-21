import { IAuthor } from "./Author"

export interface IBroadcast {
  active: boolean
  author: null | IAuthor
  created_at: string
  description: string
  finishAt: string
  image?: string
  privacyStatus: string
  serviceContent: "YOUTUBE"
  startAt: string
  title: string
  uuid?: string
  waitingBroadcast: boolean
  ytId: string
  ytItemPlaylist?: string
  ytLiveStreamId?: string
  ytPlaylist?: string
  ytStatus: string
}