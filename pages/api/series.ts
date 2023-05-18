import type {NextApiRequest, NextApiResponse} from 'next'
import {Api} from "../../services/api";
import {IGetAllSeries} from "../../interfaces/Series";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IGetAllSeries>
) {
    const api = new Api()
    const {page = 1, limit = 20} = req.query
    const data = await api.getSeries(Number(page), Number(limit))
    res.status(200).json(data)
}
