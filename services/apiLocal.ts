import axios from "axios";
import { IGetAllContentsResponse } from "../interfaces/Contens";
import { IGetAllSeries } from "../interfaces/Series";
import { INotice } from "../interfaces/Notice";
import { IUser } from "../interfaces/User";

export class ApiLocal {
  private client

  constructor() {
    this.client = axios.create({ baseURL: "https://www.pibpam.org/api/" })
  }

  async getContents(page: number, limit: number, published?: boolean, type = 'transmission') {
    const { data } = await this.client.get<IGetAllContentsResponse>("/contents", {
      params: {
        page, limit, published, type
      }
    })
    return data
  }

  async getSeries(page: number, limit: number) {
    const { data } = await this.client.get<IGetAllSeries>("/series", {
      params: {
        page, limit
      }
    })
    return data
  }

  async getNotices() {
    const { data } = await this.client.get<INotice[]>("/notices")
    return data
  }

  async savePushToken(token: string) {
    const { data } = await this.client.post("/notifications", { token })
    return data
  }

  async authByCode(token: string) {
    const { data } = await this.client.post<{ accessToken: string }>("/auth/code", { token })
    return data
  }

  async getMe(token: string) {
    const { data } = await this.client.get<IUser>("/member/me", { headers: { Authorization: token } })
    return data
  }
}
