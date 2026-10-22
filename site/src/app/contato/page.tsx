import { cacheLife } from "next/cache";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { getChurchInfo } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { FALLBACK_CONTACT } from "@/lib/site";
import { formatPhone, mapsUrl, toE164, whatsappUrl } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { SocialLinks } from "@/components/ui/SocialLinks";

export const metadata = buildMetadata({
  title: "Contato",
  description: "Fale com a Primeira Igreja Batista em Pará de Minas: telefone, WhatsApp, e-mail, endereço e formulário de contato.",
  path: "/contato",
});

function Channel({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 border-t border-line py-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong">{icon}</span>
      <div>
        <p className="text-sm text-ink-muted">{label}</p>
        <div className="mt-0.5 font-semibold break-words">{children}</div>
      </div>
    </li>
  );
}

export default async function ContatoPage() {
  "use cache";
  cacheLife("hours");

  const info = await getChurchInfo();
  const address = info?.address?.trim() ?? FALLBACK_CONTACT.address;
  const phone = info?.phoneNumber ?? FALLBACK_CONTACT.phoneNumber;
  const email = info?.email ?? FALLBACK_CONTACT.email;
  const link = "hover:text-brand-strong hover:underline";

  return (
    <>
      <PageHeader
        title="Fale com a gente"
        description="Quer visitar, fazer um pedido de oração ou conversar com um pastor? Escreva pelo formulário ou use o canal que preferir."
        breadcrumbs={[{ name: "Contato", path: "/contato" }]}
      />
      <Section labelledBy="form-title">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-20">
          <div>
            <h2 id="form-title" className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl">Envie uma mensagem</h2>
            <ContactForm whatsapp={info?.whatsAppNumber} />
          </div>
          <aside aria-labelledby="canais-title">
            <h2 id="canais-title" className="mb-4 text-2xl font-extrabold tracking-tight md:text-3xl">Outros canais</h2>
            <ul className="border-b border-line">
              {info?.whatsAppNumber && (
                <Channel icon={<MessageCircle aria-hidden className="size-5" />} label="WhatsApp da secretaria">
                  <a href={whatsappUrl(info.whatsAppNumber)} target="_blank" rel="noopener noreferrer" className={link}>
                    {formatPhone(info.whatsAppNumber)}
                  </a>
                </Channel>
              )}
              <Channel icon={<Phone aria-hidden className="size-5" />} label="Telefone">
                <a href={`tel:${toE164(phone)}`} className={link}>{formatPhone(phone)}</a>
              </Channel>
              <Channel icon={<Mail aria-hidden className="size-5" />} label="E-mail">
                <a href={`mailto:${email}`} className={link}>{email}</a>
              </Channel>
              <Channel icon={<MapPin aria-hidden className="size-5" />} label="Endereço">
                <a href={mapsUrl(address)} target="_blank" rel="noopener noreferrer" className={link}>{address}</a>
              </Channel>
            </ul>
            <SocialLinks info={info} className="mt-8" />
          </aside>
        </div>
      </Section>
      <section aria-label="Mapa" className="h-[420px] bg-brand-soft">
        <MapEmbed address={address} className="rounded-none" />
      </section>
    </>
  );
}
