import axios from "axios";
import { IContent, IGetAllContentsResponse } from "../interfaces/Contens";
import { ITeam } from "../interfaces/Team";
import { IScheduleDate } from "../interfaces/Schedule";
import { IChurchInfo, IChurchSchedule } from "../interfaces/Church";
import { IGetAllSeries } from "../interfaces/Series";
import { ILyric } from "../interfaces/Lyric";
import { IMemberBasic } from "../interfaces/Member";
import { IBroadcast } from "../interfaces/Broadcast";
import { IGetAllGroupResponse } from "../interfaces/Group";
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

export class Api {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.API,
    });
  }

  async getChurchInfo() {
    const { data } = await this.client.get<IChurchInfo>("v1/churchs/info");
    return data;
  }

  async getChurchSchedule() {
    const { data } = await this.client.get<IChurchSchedule[]>(
      "v1/churchs/schedule"
    );
    return data;
  }

  async getContents(
    page: number,
    type: "preach" | "transmission" | "live",
    limit?: number,
    published?: boolean
  ) {
    const params = { type } as {
      limit?: number;
      page?: number;
      published?: number;
    };
    if (limit) {
      params.limit = limit;
    }
    if (page) {
      params.page = page;
    }
    if (published !== undefined) {
      params.published = +published;
    }
    const { data } = await this.client.get<IGetAllContentsResponse>(
      "v1/contents",
      { params }
    );
    return data;
  }

  async getAllGroups() {
    const { data } = await this.client.get<IGetAllGroupResponse>("v1/group");
    return data;
  }

  async getSeries(page: number, limit?: number) {
    const params = {} as { limit?: number; page?: number };
    if (limit) {
      params.limit = limit;
    }
    if (page) {
      params.page = page;
    }
    const { data } = await this.client.get<IGetAllSeries>("v1/series", {
      params,
    });
    return data;
  }

  async getLives() {
    const { data } = await this.client.get<IBroadcast[]>("v1/broadcast/lives");
    return data;
  }

  async getBroadcast(uuid: string) {
    const { data } = await this.client.get<IBroadcast>("v1/broadcast/" + uuid);
    return data;
  }

  async getContent(uuid: string) {
    const { data } = await this.client.get<IContent>("v1/contents/" + uuid);
    return data;
  }

  async getOneSeries(uuid: string) {
    const { data } = await this.client.get<IContent>("v1/series/" + uuid);
    return data;
  }

  async getMinistries() {
    const { data } = await this.client.get<ITeam[]>("v1/teams");
    return data;
  }

  async getMinistry(uuid: string) {
    const { data } = await this.client.get<ITeam>("v1/teams/" + uuid);
    return data;
  }

  async getSchedule(scheduleUuid: string) {
    const { data } = await this.client.get<IScheduleDate>(
      "v1/schedules/date/" + scheduleUuid
    );
    return data;
  }

  async getSchedulesHighlighted() {
    const { data } = await this.client.get<IScheduleDate[]>(
      "v1/schedules/highlighted"
    );
    return data;
  }

  async getSchedules(limit?: number) {
    const params = {} as { limit?: number };
    if (limit) {
      params.limit = limit;
    }

    const { data } = await this.client.get<IScheduleDate[]>("v1/schedules", {
      params,
    });
    return data;
  }

  async getEvents(page?: number, pageSize?: number) {
    const params = {} as { page?: number; pageSize?: number };
    if (page) {
      params.page = page;
    }
    if (pageSize) {
      params.pageSize = pageSize;
    }
    const { data } = await this.client.get<IGetAllEventsResponse>("v1/events", {
      params,
    });
    return data;
  }

  async getEvent(uuid: string) {
    const { data } = await this.client.get<IEventDetail>("v1/events/" + uuid);
    return data;
  }

  async createRegistration(
    eventUuid: string,
    payload: ICreateRegistrationPayload
  ) {
    const { data } = await this.client.post<ICreateRegistrationResponse>(
      `v1/events/${eventUuid}/registrations`,
      payload
    );
    return data;
  }

  async searchRegistrations(params: IRegistrationSearchParams) {
    const { data } = await this.client.get<IRegistrationSearchResult[]>(
      "v1/events/registrations/search",
      { params }
    );
    return data;
  }

  async createInstallmentProof(
    registrationUuid: string,
    installmentUuid: string,
    fileName: string
  ) {
    const { data } = await this.client.post<ICreateInstallmentProofResponse>(
      `v1/events/registrations/${registrationUuid}/installments/${installmentUuid}/proof`,
      { fileName }
    );
    return data;
  }

  // Regenera o Pix (copia-e-cola/QR) de uma parcela MERCADO_PAGO_PIX expirada.
  // Sem login — o próprio comprador usa a partir da tela de acompanhamento.
  // Novo código sempre expira em agora + 3 dias.
  async regenerateInstallmentPix(
    registrationUuid: string,
    installmentUuid: string
  ) {
    const { data } = await this.client.post<IRegistrationInstallment>(
      `v1/events/registrations/${registrationUuid}/installments/${installmentUuid}/pix/regenerate`
    );
    return data;
  }

  async getAllLyrics(type: string) {
    const { data } = await this.client.get<ILyric[]>("v1/lyrics/" + type);
    return data;
  }

  async getLyric(number: number, type: string) {
    const { data } = await this.client.get<ILyric>(
      "v1/lyrics/" + type + "/" + number
    );
    return data;
  }

  async getMonthBirthDateMembers() {
    const date = new Date();
    const { data } = await this.client.get<IMemberBasic[]>(
      "v1/members/birthday",
      {
        params: {
          month: date.getMonth() + 1,
        },
      }
    );
    return data;
  }

  async savePushToken(token: string) {
    const { data } = await this.client.post("v1/notifications/device", {
      token,
    });
    return data;
  }

}
