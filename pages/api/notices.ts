import type { NextApiRequest, NextApiResponse } from 'next'
import { Api } from "../../services/api";
import { INotice } from '../../interfaces/Notice';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<INotice[]>
) {
  const api = new Api()
  const data = await api.getNotices()
  res.status(200).json(data)
}
