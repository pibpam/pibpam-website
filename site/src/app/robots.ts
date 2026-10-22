import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Áreas do app legado servidas pelo mesmo domínio que não devem ser indexadas.
        disallow: ["/api/", "/member", "/login", "/auth/", "/cadastro", "/recuperar-senha", "/inscricoes/acompanhamento/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
