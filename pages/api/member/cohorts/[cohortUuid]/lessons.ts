import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../../../../services/api";
import { ICohortLesson } from "../../../../../interfaces/Cohort";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICohortLesson[]>
) {
  const { cohortUuid } = req.query;
  const api = new Api();
  const { authorization } = req.headers;

  if (!cohortUuid || Array.isArray(cohortUuid)) {
    return res.status(400).json([]);
  }

  const data = await api.getCohortLessons(authorization as string, cohortUuid);
  return res.json(data);
}
