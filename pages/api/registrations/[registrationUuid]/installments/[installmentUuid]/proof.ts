import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../../../../../services/api";
import { ICreateInstallmentProofResponse } from "../../../../../../interfaces/Event";

interface IErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICreateInstallmentProofResponse | IErrorResponse>
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
    return res.status(400).json({ message: "Parâmetros inválidos" });
  }

  const { fileName } = req.body as { fileName?: string };

  if (!fileName) {
    return res.status(400).json({ message: "fileName is required" });
  }

  try {
    const api = new Api();
    const data = await api.createInstallmentProof(
      registrationUuid,
      installmentUuid,
      fileName
    );
    return res.status(200).json(data);
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message =
      error?.response?.data?.message || "Não foi possível enviar o comprovante";
    return res.status(status).json({ message });
  }
}
