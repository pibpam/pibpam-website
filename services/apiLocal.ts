import axios from "axios";
import { IGetAllContentsResponse } from "../interfaces/Contens";
import { IGetAllSeries } from "../interfaces/Series";
import { INotice } from "../interfaces/Notice";

export class ApiLocal {
  private client

  constructor() {
    this.client = axios.create({ baseURL: "api/" })
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
}
