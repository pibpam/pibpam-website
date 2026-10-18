import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LiveBar } from "@/components/live/LiveBar";
import { LiveProvider } from "@/components/live/LiveProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { getChurchInfo } from "@/lib/api";
import { churchJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const GA_ID = "G-7HTJQHF1X6";
const CLARITY_ID = "ifcbvo85r0";
// Só em produção, para não poluir as métricas com acessos de desenvolvimento.
const ANALYTICS = process.env.NODE_ENV === "production";

function Analytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
      <Script id="clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
      </Script>
    </>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Primeira Igreja Batista em Pará de Minas`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ["igreja batista", "Pará de Minas", "igreja em Pará de Minas", "culto", "exposição bíblica", "PIB", "PIBPAM"],
  openGraph: {
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  appleWebApp: { title: SITE_NAME },
};

export const viewport: Viewport = {
  themeColor: "#12302f",
  width: "device-width",
  initialScale: 1,
};

async function StructuredData() {
  const info = await getChurchInfo();
  return <JsonLd data={[churchJsonLd(info), websiteJsonLd()]} />;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: o Next desliga o scroll suave durante a troca de página
    // (senão a home abre rolada e "desliza" até o topo com o header sólido por cima).
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${jakarta.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <LiveProvider>
          <LiveBar />
          <Header />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
        </LiveProvider>
        <StructuredData />
        {ANALYTICS && <Analytics />}
      </body>
    </html>
  );
}
