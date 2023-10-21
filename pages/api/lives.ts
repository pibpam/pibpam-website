// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {Api} from "../../services/api";
import {IContent} from "../../interfaces/Contens";
import { IBroadcast } from '../../interfaces/Broadcast';

export default async function handler(
    req: NextApiRequest,
  res: NextApiResponse<IBroadcast[]>
) {
    const api = new Api()
    const data = await api.getLives()
    res.status(200).json(data)
}
