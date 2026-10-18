import { z } from "zod";

export const SUBJECTS = [
  { value: "visita", label: "Quero visitar a igreja" },
  { value: "oracao", label: "Pedido de oração" },
  { value: "aconselhamento", label: "Conversar com um pastor" },
  { value: "outros", label: "Outro assunto" },
] as const;

/** Mesmo contrato do endpoint upstream POST /v1/contact-messages. */
export const contactSchema = z
  .object({
    name: z.string({ error: "Informe seu nome." }).trim().min(2, "Informe seu nome.").max(120),
    email: z.union([z.literal(""), z.email("Confira o e-mail.")]).optional(),
    phone: z
      .string()
      .trim()
      .max(20)
      .optional()
      .refine((value) => !value || value.replace(/\D/g, "").length >= 10, "Informe o telefone com DDD."),
    subject: z.enum(SUBJECTS.map((subject) => subject.value) as [string, ...string[]], { error: "Escolha um assunto." }),
    message: z.string({ error: "Escreva sua mensagem." }).trim().min(10, "Escreva um pouco mais na mensagem.").max(4000),
    consent: z.literal(true, { error: "Precisamos da sua autorização para responder." }),
  })
  .refine((data) => Boolean(data.email || data.phone), {
    message: "Informe um e-mail ou telefone para respondermos.",
    path: ["email"],
  });

export type ContactInput = z.infer<typeof contactSchema>;
