import axios from "axios";
import { IGetAllContentsResponse } from "../interfaces/Contens";
import { IGetAllSeries } from "../interfaces/Series";
import {
  IGetAllEventsResponse,
  IEventDetail,
  ICreateRegistrationPayload,
  ICreateRegistrationResponse,
  ICreateInstallmentProofResponse,
  IRegistrationInstallment,
  IRegistrationSearchParams,
  IRegistrationSearchResult,
} from "../interfaces/Event";

export class ApiLocal {
  private client

  constructor() {
    this.client = axios.create({ baseURL: "/api/" })
    // this.client = axios.create({ baseURL: "https://www.pibpam.org/api/" })
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

  async savePushToken(token: string) {
    const { data } = await this.client.post("/notifications", { token })
    return data
  }

  async getEvents(page: number, pageSize: number) {
    const { data } = await this.client.get<IGetAllEventsResponse>("/events", {
      params: { page, pageSize },
    })
    return data
  }

  async getEvent(uuid: string) {
    const { data } = await this.client.get<IEventDetail>("/events/" + uuid)
    return data
  }

  async createRegistration(eventUuid: string, payload: ICreateRegistrationPayload) {
    const { data } = await this.client.post<ICreateRegistrationResponse>(
      `/events/${eventUuid}/registrations`,
      payload
    )
    return data
  }

  async searchRegistrations(params: IRegistrationSearchParams) {
    const { data } = await this.client.get<IRegistrationSearchResult[]>(
      "/registrations/search",
      { params }
    )
    return data
  }

  async createInstallmentProof(
    registrationUuid: string,
    installmentUuid: string,
    fileName: string
  ) {
    const { data } = await this.client.post<ICreateInstallmentProofResponse>(
      `/registrations/${registrationUuid}/installments/${installmentUuid}/proof`,
      { fileName }
    )
    return data
  }

  async regenerateInstallmentPix(registrationUuid: string, installmentUuid: string) {
    const { data } = await this.client.post<IRegistrationInstallment>(
      `/registrations/${registrationUuid}/installments/${installmentUuid}/pix/regenerate`
    )
    return data
  }
}
