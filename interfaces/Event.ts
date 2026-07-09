import { IPagination } from "./Pagination";

export interface IEventBatch {
  uuid: string;
  name: string;
  order: number;
  // A API retorna valores monetários como string (ex.: "210.00").
  price: number | string;
  startDate: string | null;
  endDate: string | null;
  maxQuantity: number | null;
}

export interface IEventResponsible {
  name: string;
  phone: string;
  // Indica se o telefone informado é WhatsApp.
  whatsapp: boolean;
}

export interface IEvent {
  uuid: string;
  name: string;
  description: string | null;
  descriptionHtml: string | null;
  image: string | null;
  location: string | null;
  startDate: string | null;
  endDate: string | null;
  purchaseDeadline: string | null;
  maxParticipants: number | null;
  forMinors: boolean;
  status: "draft" | "published" | string;
  responsibles: IEventResponsible[] | null;
  created_at: string;
  updated_at: string;
  activeBatch: IEventBatch | null;
  takenSpots: number;
  availableSpots: number | null;
  soldOut: boolean;
}

export interface IGetAllEventsResponse extends IPagination {
  data: IEvent[];
}

export interface IEventCustomFieldOption {
  label: string;
  value: string;
  image: string | null;
}

export interface IEventCustomField {
  uuid: string;
  label: string;
  type: "text" | "textarea" | "number" | "date" | "select" | string;
  required: boolean;
  options: IEventCustomFieldOption[] | null;
  order: number;
}

export interface IEventPixEmvConfig {
  key: string;
  merchantName: string;
  merchantCity: string;
}

export interface IEventPixManualKey {
  name: string | null;
  type: string;
  key: string;
}

export interface IEventPaymentMethod {
  uuid: string;
  // MERCADO_PAGO: Checkout Pro, sempre 1x. MERCADO_PAGO_PIX: Pix dinâmico
  // (QR + copia-e-cola) via API do Mercado Pago, com parcelamento real —
  // cada parcela vira uma cobrança Pix independente.
  type: "PIX" | "CASH" | "CARD" | "MERCADO_PAGO" | "MERCADO_PAGO_PIX" | string;
  label: string;
  feeType: "none" | "percent" | "fixed" | string;
  feeValue: number | string;
  maxInstallments: number;
  // Presentes quando type === "PIX": pixEmvConfig gera o copia-e-cola
  // automaticamente; pixManualKey é usado quando não há EMV configurado.
  pixEmvConfig: IEventPixEmvConfig | null;
  pixManualKey: IEventPixManualKey | null;
  cashResponsibleName: string | null;
  cashResponsiblePhone: string | null;
}

export interface IEventProduct {
  uuid: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number | string;
  hasVariation: boolean;
  variations: string[];
}

export interface IEventAddon {
  uuid: string;
  name: string;
  description: string | null;
  image: string | null;
  price: number | string;
  maxQuantity: number | null;
  active: boolean;
  reserved: number;
  available: number | null;
  soldOut: boolean;
}

export interface IEventAddonGroup {
  uuid: string;
  title: string;
  description: string | null;
  minSelection: number;
  maxSelection: number;
  addons: IEventAddon[];
}

export interface IEventFaq {
  uuid: string;
  question: string;
  // Resposta em HTML.
  anwser: string;
  order: number;
}

export interface IEventDetail extends IEvent {
  batches: IEventBatch[];
  customFields: IEventCustomField[];
  paymentMethods: IEventPaymentMethod[];
  products: IEventProduct[];
  addonGroups: IEventAddonGroup[];
  faqs: IEventFaq[];
}

// ---- Registration payload (POST /v1/events/{eventUuid}/registrations) ----
export interface IRegistrationParticipant {
  name: string;
  phone: string;
  birthDate: string;
  responsibleName: string;
  responsiblePhone: string;
  products: { productUuid: string; variation: string }[];
  selections?: { groupUuid: string; addonUuid: string }[];
  customFieldValues: { customFieldUuid: string; value: string }[];
}

export interface ICreateRegistrationPayload {
  memberUuid?: string;
  responsibleName: string;
  responsiblePhone: string;
  responsibleEmail: string;
  paymentMethodUuid: string;
  installmentsCount: number;
  participants: IRegistrationParticipant[];
}

export interface ICreateRegistrationResponse {
  uuid?: string;
  // Código legível da inscrição, exibido ao usuário e usado no acompanhamento.
  code?: string;
  // Dados de pagamento (paymentUrl, pixCopyPaste etc.) vêm em cada parcela,
  // não mais na raiz da inscrição — ver IRegistrationInstallment.
  installments?: IRegistrationInstallment[];
  [key: string]: unknown;
}

// ---- Busca de inscrição: GET /v1/events/registrations/search ----
export interface IRegistrationSearchParams {
  code?: string;
  email?: string;
  eventUuid?: string;
}

export interface IRegistrationParticipantAddon {
  uuid: string;
  price: number | string;
  addon: IEventAddon;
}

export interface IRegistrationParticipantProduct {
  uuid: string;
  price: number | string;
  variation: string | null;
  product: IEventProduct;
}

export interface IRegistrationSearchParticipant {
  uuid: string;
  name: string;
  phone: string | null;
  birthDate: string | null;
  isMinor: boolean;
  responsibleName: string | null;
  responsiblePhone: string | null;
  price: number | string;
  addons: IRegistrationParticipantAddon[];
  products: IRegistrationParticipantProduct[];
}

export interface IRegistrationInstallment {
  uuid: string;
  number: number;
  dueDate: string | null;
  amount: number | string;
  status: "pending" | "paid" | "overdue" | "cancelled" | "refunded" | string;
  proofUrl: string | null;
  // Código Pix copia-e-cola (EMV) — presente em PIX manual (estático) ou
  // MERCADO_PAGO_PIX (dinâmico). Nulo nos demais meios.
  pixCopyPaste: string | null;
  // Só em MERCADO_PAGO_PIX: imagem do QR pronta, para usar direto num <img>.
  pixQrCodeBase64: string | null;
  // Só em MERCADO_PAGO_PIX: validade do pixCopyPaste/pixQrCodeBase64 atual.
  pixExpiresAt: string | null;
  // URL de redirecionamento — só em MERCADO_PAGO (Checkout Pro).
  paymentUrl: string | null;
  // Só em MERCADO_PAGO (Checkout Pro).
  mpPreferenceId: string | null;
  // Em MERCADO_PAGO ou MERCADO_PAGO_PIX.
  mpPaymentId: string | null;
  // Preenchido quando a parcela foi estornada manualmente.
  refundComment: string | null;
  // Calculado na hora (status === "pending" && dueDate no passado) — não é
  // persistido, não confundir com `status` (não existe transição real pra
  // "overdue" no banco).
  isOverdue: boolean;
  paidAt: string | null;
}

export interface IRegistrationSearchResult {
  uuid: string;
  code: string;
  // Evento da inscrição (dados básicos) — usado para buscar o detalhe
  // completo (faqs, responsáveis etc.) na tela de acompanhamento.
  event: { uuid: string } | null;
  responsibleName: string;
  responsiblePhone: string;
  responsibleEmail: string;
  installmentsCount: number;
  totalAmount: number | string;
  status: "pending" | "confirmed" | "cancelled" | "refunded" | string;
  // Meio de pagamento escolhido na inscrição, com os dados (PIX EMV/manual,
  // responsável do dinheiro etc.) para exibir na tela de acompanhamento.
  paymentMethod: IEventPaymentMethod | null;
  // Ausentes na resposta de criação (parcela recém-criada nunca está
  // vencida) — só vêm em list/getById/search.
  hasOverduePayment?: boolean;
  overdueInstallmentsCount?: number;
  participants: IRegistrationSearchParticipant[];
  installments: IRegistrationInstallment[];
}

// ---- Comprovante de pagamento (upload) ----
// POST /v1/events/registrations/{registrationUuid}/installments/{installmentUuid}/proof
export interface ICreateInstallmentProofResponse {
  // URL assinada para upload direto do arquivo (PUT).
  signedUrl: string;
  // URL final do comprovante após o upload, salva na parcela.
  proofUrl: string;
}

// Dados do responsável pelo recebimento, quando o meio de pagamento é dinheiro.
export interface ICashPaymentInfo {
  name: string | null;
  phone: string | null;
}
