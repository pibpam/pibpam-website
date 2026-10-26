import axios from "axios";
import { IPlanLatestDay } from "../interfaces/ReadingPlan";

// Serviço externo de planos de leitura. Server-side only: a chave não pode ir para o cliente.
export class ReadingPlansApi {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.READING_PLANS_API,
      headers: {
        Authorization: `Bearer ${process.env.READING_PLANS_API_KEY}`,
      },
      timeout: 10000,
    });
  }

  async getLatestDay(slug: string) {
    const { data } = await this.client.get<IPlanLatestDay>(
      `plans/${slug}/latest-day`,
    );
    return data;
  }
}
