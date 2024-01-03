import type { NextApiRequest, NextApiResponse } from 'next'
import { Api } from '../../../services/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const api = new Api()
  const { authorization } = req.headers
  const data = await api.saveAvailability(authorization as string, req.body)
  res.json(data)
}
