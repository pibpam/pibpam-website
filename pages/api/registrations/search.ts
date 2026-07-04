import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../../services/api";
import { IRegistrationSearchResult } from "../../../interfaces/Event";

interface IErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IRegistrationSearchResult[] | IErrorResponse>
) {
  const { code, email, eventUuid } = req.query;

  const params = {
    code: typeof code === "string" ? code : undefined,
    email: typeof email === "string" ? email : undefined,
    eventUuid: typeof eventUuid === "string" ? eventUuid : undefined,
  };

  if (!params.code && !params.email) {
    return res.status(400).json({ message: "Informe o código ou o e-mail." });
  }

  try {
    const api = new Api();
    const data = await api.searchRegistrations(params);
    return res.status(200).json(data);
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message =
      error?.response?.data?.message || "Erro ao buscar a inscrição";
    return res.status(status).json({ message });
  }
}
