import type { NextApiRequest, NextApiResponse } from 'next'
import { Api } from "../../../services/api";
import { IGetMemberRotations } from '../../../interfaces/Rotation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGetMemberRotations>
) {
  const api = new Api()
  const { authorization } = req.headers
  const data = await api.getRotations(authorization as string)
  res.json(data)
}
