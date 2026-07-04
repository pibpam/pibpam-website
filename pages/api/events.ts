import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../services/api";
import { IGetAllEventsResponse } from "../../interfaces/Event";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGetAllEventsResponse>
) {
  const api = new Api();
  const { page = 1, pageSize = 20 } = req.query;
  const data = await api.getEvents(Number(page), Number(pageSize));
  res.status(200).json(data);
}
