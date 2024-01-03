import axios from "axios";
import { IDevotinal } from "../interfaces/Devotinal";
import { IContent, IGetAllContentsResponse } from "../interfaces/Contens";
import { ITeam } from "../interfaces/Team";
import { IScheduleDate } from "../interfaces/Schedule";
import { IChurchInfo, IChurchSchedule } from "../interfaces/Church";
import { IGetAllSeries } from "../interfaces/Series";
import { IBanner } from "../interfaces/Banner";
import { ICollection } from "../interfaces/Collection";
import { INotice } from "../interfaces/Notice";
import { ILyric } from "../interfaces/Lyric";
import { IMemberBasic } from "../interfaces/Member";
import { IBroadcast } from "../interfaces/Broadcast";
import { IGetMemberRotations } from "../interfaces/Rotation";

export class Api {
  private client

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3333/"
    })
  }

  async getDevotionals(limit?: number) {
    const params = {} as { limit?: number }
    if (limit) {
      params.limit = limit
    }
    const { data } = await this.client.get<IDevotinal[]>("v1/devotionals", { params })
    return data
  }

  async getDevotional(uuid: string) {
    const { data } = await this.client.get<IDevotinal>("v1/devotionals/" + uuid)
    return data
  }

  async getChurchInfo() {
    const { data } = await this.client.get<IChurchInfo>("v1/churchs/info")
    return data
  }

  async getChurchSchedule() {
    const { data } = await this.client.get<IChurchSchedule[]>("v1/churchs/schedule")
    return data
  }

  async getContents(page: number, type: "preach" | "transmission" | "live", limit?: number, published?: boolean) {
    const params = { type } as { limit?: number, page?: number, published?: number }
    if (limit) {
      params.limit = limit
    }
    if (page) {
      params.page = page
    }
    if (published !== undefined) {
      params.published = +published
    }
    const { data } = await this.client.get<IGetAllContentsResponse>("v1/contents", { params })
    return data
  }

  async getSeries(page: number, limit?: number) {
    const params = {} as { limit?: number, page?: number }
    if (limit) {
      params.limit = limit
    }
    if (page) {
      params.page = page
    }
    const { data } = await this.client.get<IGetAllSeries>("v1/series", { params })
    return data
  }

  async getLives() {
    const { data } = await this.client.get<IBroadcast[]>("v1/broadcast/lives")
    return data
  }

  async getBroadcast(uuid: string) {
    const { data } = await this.client.get<IBroadcast>("v1/broadcast/" + uuid)
    return data
  }

  async getContent(uuid: string) {
    const { data } = await this.client.get<IContent>("v1/contents/" + uuid)
    return data
  }

  async getOneSeries(uuid: string) {
    const { data } = await this.client.get<IContent>("v1/series/" + uuid)
    return data
  }

  async getMinistries() {
    const { data } = await this.client.get<ITeam[]>("v1/teams")
    return data
  }

  async getMinistry(uuid: string) {
    const { data } = await this.client.get<ITeam>("v1/teams/" + uuid)
    return data
  }

  async getSchedule(scheduleUuid: string) {
    const { data } = await this.client.get<IScheduleDate>("v1/schedules/date/" + scheduleUuid)
    return data
  }

  async getSchedulesHighlighted() {
    const { data } = await this.client.get<IScheduleDate[]>("v1/schedules/highlighted")
    return data
  }

  async getSchedules(limit?: number) {
    const params = {} as { limit?: number }
    if (limit) {
      params.limit = limit
    }

    const { data } = await this.client.get<IScheduleDate[]>("v1/schedules", { params })
    return data
  }

  async getBanners() {
    const { data } = await this.client.get<IBanner[]>("v1/banners")
    return data
  }

  async getCollections() {
    const { data } = await this.client.get<ICollection[]>("v1/collections")
    return data
  }

  async getCollection(uuid: string) {
    const { data } = await this.client.get<ICollection>("v1/collections/" + uuid)
    return data
  }

  async getNotices() {
    const { data } = await this.client.get<INotice[]>("v1/notices")
    return data
  }


  async getAllLyrics(type: string) {
    const { data } = await this.client.get<ILyric[]>("v1/lyrics/" + type)
    return data
  }

  async getLyric(number: number, type: string) {
    const { data } = await this.client.get<ILyric>("v1/lyrics/" + type + "/" + number)
    return data
  }

  async getMonthBithDateMembers() {
    const date = new Date()
    const { data } = await this.client.get<IMemberBasic[]>("v1/members/birthday", {
      params: {
        month: date.getMonth() + 1
      }
    })
    return data
  }

  async getRotations(token: string) {
    const { data } = await this.client.get<IGetMemberRotations>("v1/member/rotations", { headers: { Authorization: `Bearer ${token}`}})
    return data
  }

  async saveAvailability(token: string, { rotationItem, status }: { status: string, rotationItem: string}) {
    const { data } = await this.client.post<{ uuid: string, status: 'unavailable' | 'available' | 'unknown' }>("v1/member/rotations/availability", { rotationItem, status }, { headers: { Authorization: `Bearer ${token}`}})
    return data
  }

  async savePushToken(token: string) {
    const { data } = await this.client.post("v1/notifications/device", {
      token
    })
    return data
  }

  // Public Route
  async authByToken(code: string) {
    const { data } = await this.client.post("auth/member/code", {
      code
    })
    return data
  }

  async getMe(token: string) {
    const { data } = await this.client.get("v1/member/users/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  }
}
