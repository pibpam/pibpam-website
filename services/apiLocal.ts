import axios from "axios";
import { IGetAllContentsResponse } from "../interfaces/Contens";
import { IGetAllSeries } from "../interfaces/Series";
import { INotice } from "../interfaces/Notice";
import { IUser } from "../interfaces/User";
import { IGetMemberRotations } from "../interfaces/Rotation";
import {
  IAttendanceBatchPayload,
  ICohort,
  ICohortLesson,
} from "../interfaces/Cohort";
import { ICreateAccountPayload, IThirdPartyAuthPayload } from "./api";
import {
  IGetAllEventsResponse,
  IEventDetail,
  ICreateRegistrationPayload,
  ICreateRegistrationResponse,
  ICreateInstallmentProofResponse,
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

  async authByIdToken(idToken: string) {
    const { data } = await this.client.post<{ accessToken: string }>("/auth", { idToken })
    return data
  }

  async createAccount(payload: ICreateAccountPayload) {
    const { data } = await this.client.post("/account", payload)
    return data
  }

  async authWithThirdParty(payload: IThirdPartyAuthPayload) {
    const { data } = await this.client.post<{ accessToken: string }>("/auth/third-party", payload)
    return data
  }

  async getMe(token: string) {
    const { data } = await this.client.get<IUser>("/member/me", { headers: { Authorization: token } })
    return data
  }

  async getRotations(token: string) {
    const { data } = await this.client.get<IGetMemberRotations>("/rotation/get", { headers: { Authorization: token } })
    return data
  }

  async saveAvailability(token: string, data: { status: string, rotationItem: string }) {
    const result = await this.client.post("/rotation/availability", data, { headers: { Authorization: token } })
    return result
  }

  async getMemberCohorts(token: string) {
    const { data } = await this.client.get<ICohort[]>("/member/cohorts", {
      headers: { Authorization: token },
    })
    return data
  }

  async getCohortLessons(token: string, cohortUuid: string) {
    const { data } = await this.client.get<ICohortLesson[]>(`/member/cohorts/${cohortUuid}/lessons`, {
      headers: { Authorization: token },
    })
    return data
  }

  async saveAttendanceBatch(token: string, payload: IAttendanceBatchPayload) {
    const { data } = await this.client.post("/member/attendance/batch", payload, {
      headers: { Authorization: token },
    })
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
}
