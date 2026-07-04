import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../../../services/api";
import {
  ICreateRegistrationPayload,
  ICreateRegistrationResponse,
} from "../../../../interfaces/Event";

interface IErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICreateRegistrationResponse | IErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { uuid } = req.query;

  if (!uuid || typeof uuid !== "string") {
    return res.status(400).json({ message: "uuid is required" });
  }

  try {
    const api = new Api();
    const data = await api.createRegistration(
      uuid,
      req.body as ICreateRegistrationPayload
    );
    return res.status(201).json(data);
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message =
      error?.response?.data?.message || "Não foi possível concluir a inscrição";
    return res.status(status).json({ message });
  }
}
