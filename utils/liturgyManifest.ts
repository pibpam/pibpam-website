import React from "react";
import {
  PiArticle,
  PiBookBookmark,
  PiCode,
  PiFile,
  PiFilmSlate,
  PiImage,
  PiMusicNotes,
  PiSpeakerHigh,
  PiTextAa,
  PiWarningCircle,
} from "react-icons/pi";
import { ILiturgyManifestItem, ILiturgyPlanAsset, ILiturgySongCatalogEntry } from "../interfaces/Liturgy";

/**
 * Lógica de apresentação do manifest (ícone/nome/preview por item), portada de
 * `ManifestEditor/manifestDisplay.ts` do admin de gestão — versão reduzida pra leitura:
 * resolve nome/artista de "song" via `GET /v1/liturgy/catalog/musicas` (mesmo catálogo do
 * Holyrics que o admin usa), mas sem catálogo de textos/scripts (a tela pública não tem
 * acesso a eles) — esses dois tipos caem pro id cru, igual ao admin quando os catálogos
 * não são passados.
 */

export const TYPE_ICONS: Record<ILiturgyManifestItem["type"], React.ReactNode> = {
  title: React.createElement(PiTextAa),
  video: React.createElement(PiFilmSlate),
  image: React.createElement(PiImage),
  script: React.createElement(PiCode),
  song: React.createElement(PiMusicNotes),
  verse: React.createElement(PiBookBookmark),
  text: React.createElement(PiArticle),
  file: React.createElement(PiFile),
  audio: React.createElement(PiSpeakerHigh),
  plain_text: React.createElement(PiWarningCircle),
};

export interface IManifestItemDisplay {
  icon: React.ReactNode;
  name: string;
  /** Segunda linha de texto (ex.: artista da música) — sem repetir pendente/oculto, que viram badge. */
  meta?: string;
  pending: boolean;
  pinned: boolean;
  color?: string;
}

const findSong = (songsCatalog: ILiturgySongCatalogEntry[], songId?: string) =>
  songId ? songsCatalog.find((candidate) => String(candidate.id) === songId) : undefined;

const describeItemName = (item: ILiturgyManifestItem, songsCatalog: ILiturgySongCatalogEntry[]): string => {
  switch (item.type) {
    case "title":
      return item.name || "sem nome";
    case "video":
    case "image":
    case "file":
    case "audio":
      return item.name || item.arquivo || "Sem arquivo";
    case "script":
      return item.script_id || "sem script";
    case "song": {
      if (item.musica_id) return item.musica_id;
      return findSong(songsCatalog, item.song_id)?.title || item.song_id || "sem id";
    }
    case "verse":
      return item.text || "sem referência";
    case "text":
      return item.text_id || "sem id";
    case "plain_text":
      return item.name || item.text || "sem texto";
    default:
      return item.type;
  }
};

export const describeManifestItem = (
  item: ILiturgyManifestItem,
  songsCatalog: ILiturgySongCatalogEntry[] = [],
): IManifestItemDisplay => {
  const song = item.type === "song" && !item.musica_id ? findSong(songsCatalog, item.song_id) : undefined;
  const artist = song?.artist || song?.author;

  return {
    icon: TYPE_ICONS[item.type],
    name: describeItemName(item, songsCatalog),
    meta: artist || undefined,
    pending: !!item.musica_id,
    pinned: !!item.fromTemplate,
    color: item.type === "title" ? item.background_color : undefined,
  };
};

/**
 * Url pública do arquivo de um item, resolvida a partir de `GET /v1/liturgy/plans/:uuid/assets`
 * (indexado pela posição do item no manifest) — mais simples que o base/evento por nome de
 * arquivo do admin, já que este endpoint já vem escopado ao plano.
 */
export const getAssetUrl = (
  item: ILiturgyManifestItem,
  index: number,
  assets: ILiturgyPlanAsset[],
): string | undefined => {
  if (!item.arquivo) return undefined;
  return assets.find((asset) => asset.index === index)?.metadata?.url;
};

export const isPptxItem = (item: ILiturgyManifestItem): boolean =>
  !!item.arquivo && /\.pptx$/i.test(item.arquivo);
