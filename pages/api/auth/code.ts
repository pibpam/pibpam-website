import type { NextApiRequest, NextApiResponse } from 'next'
import { Api } from "../../../services/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ accessToken : string}>
) {
  const api = new Api()
  const { token } = req.body
  const data = await api.authByToken(token)
  res.json(data)
}
