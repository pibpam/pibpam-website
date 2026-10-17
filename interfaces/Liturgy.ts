export type LiturgyManifestItemType =
  | "video"
  | "script"
  | "image"
  | "song"
  | "verse"
  | "file"
  | "text"
  | "title"
  | "plain_text"
  | "audio";

export type LiturgyManifestOrigem = "base" | "evento";

export interface ILiturgyManifestItem {
  type: LiturgyManifestItemType;
  id?: string;
  name?: string;
  background_color?: string;
  origem?: LiturgyManifestOrigem;
  arquivo?: string;
  settings?: { repeat?: boolean };
  script_id?: string;
  song_id?: string;
  musica_id?: string;
  text_id?: string;
  text?: string;
  theme?: string;
  version?: string;
  fromTemplate?: boolean;
  hidden?: boolean;
}

export interface ILiturgyType {
  uuid: string;
  nome: string;
  slug: string;
}

/** Mesmo ciclo do admin: draft (em criação) → ready (aprovado) → running (em execução) → finished. */
export type LiturgyPlanStatus = "draft" | "ready" | "running" | "finished";

export interface ILiturgyPlan {
  uuid: string;
  date: string;
  manifest: ILiturgyManifestItem[];
  liturgyType: ILiturgyType;
  /** Ausente em plano gravado antes do campo existir — tratar como "draft". */
  status?: LiturgyPlanStatus;
}

export interface ILiturgyPlanAsset {
  index: number;
  arquivo: string;
  origem: string;
  metadata: { url: string; etag: string; lastModified: string } | null;
}

/** Entrada do catálogo de músicas sincronizado do Holyrics (`GET /v1/liturgy/catalog/musicas`). */
export interface ILiturgySongCatalogEntry {
  id: string;
  title: string;
  artist?: string;
  author?: string;
}
