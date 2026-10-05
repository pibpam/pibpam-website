import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../../services/api";

interface ILinkResponse {
  accessToken: string;
  rotationUuid: string;
}

interface IErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILinkResponse | IErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token } = req.body as { token?: string };

  if (!token) {
    return res.status(400).json({ message: "token is required" });
  }

  try {
    const api = new Api();
    const data = await api.authByRotationLink(token);
    return res.status(200).json(data);
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message = error?.response?.data?.message || "Link inválido ou expirado.";
    return res.status(status).json({ message });
  }
}
