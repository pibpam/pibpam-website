import type { NextApiRequest, NextApiResponse } from 'next'
import { Api } from "../../services/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  const api = new Api()
  const { token } = req.body
  await api.savePushToken(token)
  res.status(200)
}
