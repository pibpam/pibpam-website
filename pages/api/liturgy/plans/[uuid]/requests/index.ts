import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../../../../../services/api";
import {
  ICreateLiturgyRequestPayload,
  ILiturgyRequest,
} from "../../../../../../interfaces/LiturgyRequest";

interface IErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILiturgyRequest | IErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { uuid } = req.query;
  if (!uuid || typeof uuid !== "string") {
    return res.status(400).json({ message: "Parâmetros inválidos" });
  }

  const { authorization } = req.headers;
  const payload = req.body as ICreateLiturgyRequestPayload;

  try {
    const api = new Api();
    const data = await api.createLiturgyRequest(
      authorization as string,
      uuid,
      payload
    );
    return res.status(200).json(data);
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message =
      error?.response?.data?.message || "Não foi possível enviar a solicitação";
    return res.status(status).json({ message });
  }
}
