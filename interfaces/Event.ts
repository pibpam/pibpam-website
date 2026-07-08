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
  type: "PIX" | "CASH" | "CARD" | "MERCADO_PAGO" | string;
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
  // Presente quando o meio de pagamento é MERCADO_PAGO (Checkout Pro).
  paymentUrl?: string;
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
  status: "pending" | "paid" | "overdue" | "cancelled" | string;
  proofUrl: string | null;
  // Código Pix copia-e-cola (EMV), gerado automaticamente quando o meio é PIX
  // com pixEmvConfig completo. Nulo em PIX manual ou meios não-PIX.
  pixCopyPaste: string | null;
  paidAt: string | null;
}

export interface IRegistrationSearchResult {
  uuid: string;
  code: string;
  responsibleName: string;
  responsiblePhone: string;
  responsibleEmail: string;
  installmentsCount: number;
  totalAmount: number | string;
  status: "pending" | "confirmed" | "cancelled" | string;
  // Meio de pagamento escolhido na inscrição, com os dados (PIX EMV/manual,
  // responsável do dinheiro etc.) para exibir na tela de acompanhamento.
  paymentMethod: IEventPaymentMethod | null;
  paymentUrl: string | null;
  mpPreferenceId: string | null;
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
