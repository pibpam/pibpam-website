import type { NextApiRequest, NextApiResponse } from 'next'
import { Api } from "../../../../services/api";
import { ILiturgyPlanAsset } from '../../../../interfaces/Liturgy';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILiturgyPlanAsset[]>
) {
  const api = new Api()
  const { authorization } = req.headers
  const { uuid } = req.query
  const data = await api.getLiturgyPlanAssets(authorization as string, uuid as string)
  res.json(data)
}
