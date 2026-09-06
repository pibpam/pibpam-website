import { useCallback, useEffect, useMemo, useState } from "react";
import JSZip from "jszip";
import { ILiturgyManifestItem } from "../interfaces/Liturgy";
import { isPptxItem } from "../utils/liturgyManifest";

/**
 * Extração client-side dos slides de um `.pptx` já enviado — porta de
 * `ManifestEditor/pptxSlides.ts` do admin de gestão. Um `.pptx` é um pacote OOXML (zip de
 * XMLs + mídia); como os decks daqui são montados como "uma imagem de página inteira por
 * slide", dá pra reconstruir a prévia sem renderizar OOXML de verdade: acha, em cada
 * `ppt/slides/slideN.xml`, o último `<p:pic>` (topo do z-index) e resolve o `r:embed` no
 * `.rels` até o arquivo em `ppt/media/`. Slides ocultos (`<p:sld show="0">`) ficam de fora.
 *
 * Limitação conhecida (herdada do admin): imagem de fundo herdada de slideLayout/slideMaster
 * ou aplicada como *fill* (não `<p:pic>`) não aparece na prévia. Tudo roda no navegador.
 */

export interface IPptxSlide {
  slide: number;
  url: string;
  extension: string;
}

export type TPptxSlidesStatus = "loading" | "ready" | "error";

export interface IPptxSlidesState {
  status: TPptxSlidesStatus;
  slides: IPptxSlide[];
  error?: string;
}

const RELATIONSHIPS_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

const MIME_BY_EXTENSION: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  bmp: "image/bmp",
  webp: "image/webp",
  tiff: "image/tiff",
  emf: "image/emf",
  wmf: "image/wmf",
};

export const pptxCacheKey = (url: string): string => url.split("?")[0];

const CACHE = new Map<string, Promise<IPptxSlide[]>>();

const slideNumber = (path: string): number => Number(path.match(/slide(\d+)\.xml/)?.[1] ?? 0);

const resolveMediaPath = (target: string): string =>
  target.startsWith("../") ? `ppt${target.slice(2)}` : `ppt/slides/${target}`;

const extractSlideImages = async (file: Blob): Promise<IPptxSlide[]> => {
  const zip = await JSZip.loadAsync(file);
  const parser = new DOMParser();

  const slidePaths = Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => slideNumber(a) - slideNumber(b));

  const slides: IPptxSlide[] = [];

  for (const slidePath of slidePaths) {
    const num = slideNumber(slidePath);
    const slideXml = await zip.file(slidePath)?.async("text");
    if (!slideXml) continue;
    const slideDoc = parser.parseFromString(slideXml, "application/xml");

    const sldEl = slideDoc.getElementsByTagName("p:sld")[0];
    if (sldEl?.getAttribute("show") === "0") continue;

    const pics = Array.from(slideDoc.getElementsByTagName("p:pic"));
    const lastPic = pics[pics.length - 1];
    if (!lastPic) continue;

    const blipEl = lastPic.getElementsByTagName("a:blip")[0];
    const embedId = blipEl?.getAttributeNS(RELATIONSHIPS_NS, "embed") || blipEl?.getAttribute("r:embed");
    if (!embedId) continue;

    const relsXml = await zip.file(`ppt/slides/_rels/slide${num}.xml.rels`)?.async("text");
    if (!relsXml) continue;
    const relsDoc = parser.parseFromString(relsXml, "application/xml");
    const target = Array.from(relsDoc.getElementsByTagName("Relationship"))
      .find((relationship) => relationship.getAttribute("Id") === embedId)
      ?.getAttribute("Target");
    if (!target) continue;

    const imagePath = resolveMediaPath(target);
    const imageFile = zip.file(imagePath);
    if (!imageFile) continue;

    const extension = (imagePath.split(".").pop() || "png").toLowerCase();
    const buffer = await imageFile.async("arraybuffer");
    const blob = new Blob([buffer], { type: MIME_BY_EXTENSION[extension] || "application/octet-stream" });
    slides.push({ slide: num, url: URL.createObjectURL(blob), extension });
  }

  return slides;
};

const loadSlides = (url: string): Promise<IPptxSlide[]> => {
  const key = pptxCacheKey(url);
  const cached = CACHE.get(key);
  if (cached) return cached;

  const promise = fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Falha ao baixar o arquivo (${response.status})`);
      return response.blob();
    })
    .then(extractSlideImages)
    .catch((error) => {
      CACHE.delete(key);
      throw error;
    });

  CACHE.set(key, promise);
  return promise;
};

export interface IPptxSlidesApi {
  getState: (item: ILiturgyManifestItem) => IPptxSlidesState | undefined;
  isExpanded: (item: ILiturgyManifestItem) => boolean;
  toggleExpanded: (item: ILiturgyManifestItem) => void;
}

export const usePptxSlides = (
  items: ILiturgyManifestItem[],
  getPreviewUrl: (item: ILiturgyManifestItem) => string | undefined,
): IPptxSlidesApi => {
  const [states, setStates] = useState<Record<string, IPptxSlidesState>>({});
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const urls = useMemo(() => {
    const unique = new Set<string>();
    items.forEach((item) => {
      if (!isPptxItem(item)) return;
      const url = getPreviewUrl(item);
      if (url) unique.add(url);
    });
    return Array.from(unique);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, getPreviewUrl]);

  const urlsKey = urls.join("|");

  useEffect(() => {
    let cancelled = false;

    urls.forEach((url) => {
      const key = pptxCacheKey(url);
      setStates((state) => (state[key] ? state : { ...state, [key]: { status: "loading", slides: [] } }));

      loadSlides(url)
        .then((slides) => {
          if (cancelled) return;
          setStates((state) => ({ ...state, [key]: { status: "ready", slides } }));
        })
        .catch((error: unknown) => {
          if (cancelled) return;
          const message = error instanceof Error ? error.message : "Erro ao ler o arquivo";
          setStates((state) => ({ ...state, [key]: { status: "error", slides: [], error: message } }));
        });
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlsKey]);

  const keyOf = useCallback(
    (item: ILiturgyManifestItem) => {
      if (!isPptxItem(item)) return undefined;
      const url = getPreviewUrl(item);
      return url ? pptxCacheKey(url) : undefined;
    },
    [getPreviewUrl],
  );

  const getState = useCallback(
    (item: ILiturgyManifestItem) => {
      const key = keyOf(item);
      return key ? states[key] : undefined;
    },
    [keyOf, states],
  );

  const isExpanded = useCallback(
    (item: ILiturgyManifestItem) => {
      const key = keyOf(item);
      return key ? !collapsed[key] : false;
    },
    [keyOf, collapsed],
  );

  const toggleExpanded = useCallback(
    (item: ILiturgyManifestItem) => {
      const key = keyOf(item);
      if (!key) return;
      setCollapsed((state) => ({ ...state, [key]: !state[key] }));
    },
    [keyOf],
  );

  return { getState, isExpanded, toggleExpanded };
};
