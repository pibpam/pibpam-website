import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../../../../../../services/api";
import { IRegistrationInstallment } from "../../../../../../../interfaces/Event";

interface IErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IRegistrationInstallment | IErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { registrationUuid, installmentUuid } = req.query;

  if (
    !registrationUuid ||
    typeof registrationUuid !== "string" ||
    !installmentUuid ||
    typeof installmentUuid !== "string"
  ) {
    return res
      .status(400)
      .json({ message: "registrationUuid e installmentUuid são obrigatórios" });
  }

  try {
    const api = new Api();
    const data = await api.regenerateInstallmentPix(
      registrationUuid,
      installmentUuid
    );
    return res.status(200).json(data);
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message =
      error?.response?.data?.message ||
      "Não foi possível gerar um novo código Pix";
    return res.status(status).json({ message });
  }
}
