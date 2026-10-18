import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";
import { getContents, getSchedules, getSeriesList } from "@/lib/api";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/sobre", priority: 0.9, changeFrequency: "monthly" },
  { path: "/conteudos", priority: 0.8, changeFrequency: "daily" },
  { path: "/conteudos/transmissoes", priority: 0.7, changeFrequency: "daily" },
  { path: "/conteudos/series", priority: 0.7, changeFrequency: "weekly" },
  { path: "/ministerios", priority: 0.7, changeFrequency: "monthly" },
  { path: "/agenda", priority: 0.8, changeFrequency: "daily" },
  { path: "/ao-vivo", priority: 0.7, changeFrequency: "daily" },
  { path: "/contato", priority: 0.8, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("hours");

  const [transmissions, series, agenda] = await Promise.all([
    getContents("transmission", 1, 200),
    getSeriesList(1, 100),
    getSchedules(),
  ]);

  return [
    ...STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({ url: `${SITE_URL}${path}`, priority, changeFrequency })),
    ...series.data.map((item) => ({
      url: `${SITE_URL}/conteudos/series/${item.uuid}`,
      lastModified: item.created_at,
      priority: 0.6,
    })),
    ...transmissions.data.map((content) => ({
      url: `${SITE_URL}/conteudos/video/${content.uuid}`,
      lastModified: content.contentDate,
      priority: 0.5,
    })),
    ...agenda.map((item) => ({ url: `${SITE_URL}/agenda/${item.uuid}`, priority: 0.4 })),
  ];
}
