import type { NextApiRequest, NextApiResponse } from 'next'
import { Api } from "../../../../services/api";
import { ILiturgySongCatalogEntry } from '../../../../interfaces/Liturgy';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILiturgySongCatalogEntry[]>
) {
  const api = new Api()
  const { authorization } = req.headers
  const data = await api.getLiturgySongsCatalog(authorization as string)
  res.json(data)
}
