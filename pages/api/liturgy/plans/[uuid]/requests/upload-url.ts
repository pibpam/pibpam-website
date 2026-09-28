import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../../../../../services/api";
import { ILiturgyRequestUploadUrlResponse } from "../../../../../../interfaces/LiturgyRequest";

interface IErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILiturgyRequestUploadUrlResponse | IErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { uuid } = req.query;
  const { fileName } = req.body as { fileName?: string };

  if (!uuid || typeof uuid !== "string" || !fileName) {
    return res.status(400).json({ message: "Parâmetros inválidos" });
  }

  const { authorization } = req.headers;

  try {
    const api = new Api();
    const data = await api.getLiturgyRequestUploadUrl(
      authorization as string,
      uuid,
      fileName
    );
    return res.status(200).json(data);
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message =
      error?.response?.data?.message || "Não foi possível preparar o upload";
    return res.status(status).json({ message });
  }
}
