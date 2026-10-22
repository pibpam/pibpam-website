import type { MetadataRoute } from "next";
import { CHURCH_LEGAL_NAME, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: CHURCH_LEGAL_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#12302f",
    lang: "pt-BR",
    icons: [{ src: "/icon.png", sizes: "48x48", type: "image/png" }],
  };
}
