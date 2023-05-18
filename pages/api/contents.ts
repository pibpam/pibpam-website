import type {NextApiRequest, NextApiResponse} from 'next'
import {Api} from "../../services/api";
import {IGetAllContentsResponse} from "../../interfaces/Contens";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IGetAllContentsResponse>
) {
    const api = new Api()
    const {page = 1, limit = 20, type = "transmission"} = req.query
    const data = await api.getContents(Number(page), "transmission", Number(limit))
    res.status(200).json(data)
}
