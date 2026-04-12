import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../services/api";
import { ICreateAccountPayload } from "../../services/api";

interface IErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown | IErrorResponse>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, name } = req.body as Partial<ICreateAccountPayload>;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "email, password and name are required" });
  }

  try {
    const api = new Api();
    const data = await api.createAccount({ email, password, name });
    return res.status(200).json(data);
  } catch (error: any) {
    const status = error?.response?.status || 500;

    const errorsApiToUi: Record<string, string> = {
      "E-mail already used": "E-mail já cadastrado.",
    };

    const errorKey = error?.response?.data?.data as string;
    const message = errorsApiToUi[errorKey] || "Não foi possível criar a conta";
    return res.status(status).json({ message });
  }
}
