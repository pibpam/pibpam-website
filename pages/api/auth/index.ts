import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../../services/api";

interface IAuthResponse {
  accessToken: string;
}

interface IErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAuthResponse | IErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { idToken } = req.body as { idToken?: string };

  if (!idToken) {
    return res.status(400).json({ message: "idToken is required" });
  }

  try {
    const api = new Api();
    const data = await api.authByFirebaseIdToken(idToken);
    return res.status(200).json(data);
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message = error?.response?.data?.message || "Authentication failed";
    return res.status(status).json({ message });
  }
}
