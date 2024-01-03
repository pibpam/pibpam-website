import type { NextApiRequest, NextApiResponse } from 'next'
import { Api } from "../../../services/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ accessToken : string}>
) {
  const api = new Api()
  const { authorization } = req.headers
  const data = await api.getMe(authorization as string)
  res.json(data)
}
