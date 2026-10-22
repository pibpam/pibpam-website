import { MapPin, MessageCircle } from "lucide-react";
import type { IChurchInfo } from "@/types";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { FALLBACK_CONTACT } from "@/lib/site";
import { mapsUrl, whatsappUrl } from "@/lib/format";

export function VisitCTA({ info }: { info: IChurchInfo | null }) {
  const address = info?.address?.trim() ?? FALLBACK_CONTACT.address;
  return (
    <Section tone="mist" labelledBy="visit-title">
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <h2 id="visit-title" className="text-3xl font-extrabold tracking-[-0.02em] text-balance md:text-[2.75rem] md:leading-[1.1]">
            Vai nos visitar pela primeira vez?
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
            Chegue alguns minutos antes, alguém da recepção vai te receber na porta. Se quiser, mande uma mensagem antes e
            a gente te espera.
          </p>
          <address className="mt-6 flex items-start gap-2 font-semibold not-italic">
            <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-strong" />
            {address}
          </address>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <ButtonLink href={mapsUrl(address)} icon={<MapPin aria-hidden className="size-4" />}>
            Como chegar
          </ButtonLink>
          {info?.whatsAppNumber && (
            <ButtonLink
              href={whatsappUrl(info.whatsAppNumber, "Olá! Quero visitar a PIB Pará de Minas.")}
              variant="outline"
              icon={<MessageCircle aria-hidden className="size-4" />}
            >
              Falar no WhatsApp
            </ButtonLink>
          )}
        </div>
      </div>
    </Section>
  );
}
