import { ILiturgyManifestItem, ILiturgyType } from "./Liturgy";

export type LiturgyRequestType = "add" | "remove" | "comment";
export type LiturgyRequestStatus = "pending" | "approved" | "rejected";

export interface ICreateLiturgyRequestPayload {
  type: LiturgyRequestType;
  /** Obrigatório em "add": item proposto (id ainda não atribuído, o backend gera). */
  item?: ILiturgyManifestItem;
  /** "add": inserir antes deste id; null/omitido insere no fim do manifest. */
  anchorItemId?: string | null;
  /** "add" com upload: nome físico devolvido por getLiturgyRequestUploadUrl. */
  pendingFileName?: string;
  /** Obrigatório em "remove"/"comment": item ao qual a solicitação se refere. */
  targetItemId?: string;
  /** Obrigatório em "remove"/"comment", opcional em "add". */
  comment?: string;
}

export interface ILiturgyRequestUploadUrlResponse {
  signedUrl: string;
  fileName: string;
}

export interface ILiturgyRequest {
  uuid: string;
  type: LiturgyRequestType;
  status: LiturgyRequestStatus;
  liturgyPlan: { uuid: string; date: string; liturgyType?: ILiturgyType };
  targetItemId?: string;
  anchorItemId?: string | null;
  payloadItem?: ILiturgyManifestItem;
  comment?: string;
  reviewNote?: string;
  created_at: string;
  reviewedAt?: string;
}
