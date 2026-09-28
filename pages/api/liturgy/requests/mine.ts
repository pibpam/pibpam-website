import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../../../services/api";
import { ILiturgyRequest } from "../../../../interfaces/LiturgyRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILiturgyRequest[]>
) {
  const api = new Api();
  const { authorization } = req.headers;
  const data = await api.getMyLiturgyRequests(authorization as string);
  res.json(data);
}
