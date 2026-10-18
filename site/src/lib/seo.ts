import type { Metadata } from "next";
import type { IChurchInfo, IContent, IScheduleDate } from "@/types";
import { CHURCH_LEGAL_NAME, FALLBACK_CONTACT, FOUNDED_YEAR, SITE_NAME, SITE_URL } from "./site";
import { youtubeThumb } from "./format";

interface PageMeta {
  title?: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article" | "video.other";
}

export function buildMetadata({ title, description, path, image, type = "website" }: PageMeta): Metadata {
  const images = image ? [{ url: image }] : undefined;
  return {
    // Sem `title` a página herda o título padrão do layout (chave ausente, não undefined).
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title ?? SITE_NAME,
      description,
      url: path,
      type,
      siteName: SITE_NAME,
      locale: "pt_BR",
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? SITE_NAME,
      description,
      ...(images && { images }),
    },
  };
}

const absolute = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

const DAY_TO_SCHEMA: Record<string, string> = {
  domingo: "Sunday",
  segunda: "Monday",
  terça: "Tuesday",
  quarta: "Wednesday",
  quinta: "Thursday",
  sexta: "Friday",
  sábado: "Saturday",
};

export function churchJsonLd(info: IChurchInfo | null) {
  const address = info?.address ?? FALLBACK_CONTACT.address;
  const sameAs = [info?.instagramUrl, info?.youTubeUrl, info?.spotifyUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": `${SITE_URL}/#church`,
    name: CHURCH_LEGAL_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: absolute("/pibpam-logo.svg"),
    image: absolute("/igreja.jpg"),
    foundingDate: String(FOUNDED_YEAR),
    telephone: info?.phoneNumber ?? FALLBACK_CONTACT.phoneNumber,
    email: info?.email ?? FALLBACK_CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.split(/\s[-/]\s/)[0]?.trim(),
      addressLocality: "Pará de Minas",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    sameAs,
    openingHoursSpecification: info?.church_schedules?.flatMap((item) => {
      const key = Object.keys(DAY_TO_SCHEMA).find((day) => item.day.toLowerCase().startsWith(day));
      if (!key) return [];
      return [{ "@type": "OpeningHoursSpecification", dayOfWeek: DAY_TO_SCHEMA[key], opens: item.time, description: item.text }];
    }),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_URL}/#church` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Início", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function videoJsonLd(content: IContent, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: content.name,
    description: content.description || `Mensagem de ${content.author?.name ?? SITE_NAME}`,
    thumbnailUrl: [content.image ?? youtubeThumb(content.content)],
    uploadDate: content.contentDate,
    embedUrl: `https://www.youtube.com/embed/${content.content}`,
    url: absolute(path),
    publisher: { "@id": `${SITE_URL}/#church` },
    ...(content.author && { author: { "@type": "Person", name: content.author.name } }),
  };
}

export function eventJsonLd(item: IScheduleDate, path: string) {
  const { schedule } = item;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: schedule.title.trim(),
    description: schedule.description || schedule.shortDescription || undefined,
    startDate: item.scheduleDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: absolute(path),
    ...(schedule.image && { image: [schedule.image] }),
    location: {
      "@type": "Place",
      name: CHURCH_LEGAL_NAME,
      address: schedule.address || FALLBACK_CONTACT.address,
    },
    organizer: { "@id": `${SITE_URL}/#church` },
  };
}
