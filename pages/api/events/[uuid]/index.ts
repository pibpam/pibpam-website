import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../../../services/api";
import { IEventDetail } from "../../../../interfaces/Event";

interface IErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IEventDetail | IErrorResponse>
) {
  const { uuid } = req.query;

  if (!uuid || typeof uuid !== "string") {
    return res.status(400).json({ message: "uuid is required" });
  }

  try {
    const api = new Api();
    const data = await api.getEvent(uuid);
    return res.status(200).json(data);
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message =
      error?.response?.data?.message ||
      (status === 404 ? "Evento não encontrado" : "Erro ao buscar evento");
    return res.status(status).json({ message });
  }
}
