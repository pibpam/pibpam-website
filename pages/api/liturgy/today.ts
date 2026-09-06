import type { NextApiRequest, NextApiResponse } from 'next'
import { Api } from "../../../services/api";
import { ILiturgyPlan } from '../../../interfaces/Liturgy';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILiturgyPlan[]>
) {
  const api = new Api()
  const { authorization } = req.headers
  const data = await api.getLiturgyPlansToday(authorization as string)
  res.json(data)
}
