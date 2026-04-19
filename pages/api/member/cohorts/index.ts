import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../../../services/api";
import { ICohort } from "../../../../interfaces/Cohort";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICohort[]>
) {
  const api = new Api();
  const { authorization } = req.headers;
  const data = await api.getMemberCohorts(authorization as string);
  res.json(data);
}
