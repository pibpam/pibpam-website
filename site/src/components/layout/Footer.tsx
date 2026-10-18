import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { getChurchInfo } from "@/lib/api";
import { APP_LINKS, CHURCH_LEGAL_NAME, EVENTS_URL, FALLBACK_CONTACT, NAV_LINKS } from "@/lib/site";
import { formatPhone, mapsUrl, toE164, whatsappUrl } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { sortSchedules } from "@/lib/schedule";

export async function Footer() {
  "use cache";
  cacheLife("hours");

  const info = await getChurchInfo();
  const address = info?.address?.trim() ?? FALLBACK_CONTACT.address;
  const phone = info?.phoneNumber ?? FALLBACK_CONTACT.phoneNumber;
  const email = info?.email ?? FALLBACK_CONTACT.email;

  return (
    <footer className="bg-pine text-ink-inverse">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div className="max-w-xs">
          <Image src="/pibpam-logo.svg" alt="PIB Pará de Minas" width={170} height={44} />
          <p className="mt-5 leading-relaxed text-ink-inverse-muted">{CHURCH_LEGAL_NAME}. Uma igreja batista que abre a Bíblia e anuncia Cristo em Pará de Minas.</p>
          <SocialLinks info={info} tone="dark" className="mt-6" />
        </div>

        <div>
          <h2 className="font-bold">Visite</h2>
          <address className="mt-4 not-italic leading-relaxed text-ink-inverse-muted">
            <a href={mapsUrl(address)} target="_blank" rel="noopener noreferrer" className="hover:text-ink-inverse">
              {address}
            </a>
          </address>
          {info?.church_schedules?.length ? (
            <ul className="mt-4 space-y-1 text-sm text-ink-inverse-muted">
              {sortSchedules(info.church_schedules).map((item) => (
                <li key={item.uuid}>
                  {item.text}: {item.day.toLowerCase()}, <span className="tabular-nums">{item.time}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div>
          <h2 className="font-bold">Fale com a gente</h2>
          <ul className="mt-4 space-y-2 text-ink-inverse-muted">
            <li>
              <a href={`tel:${toE164(phone)}`} className="hover:text-ink-inverse">{formatPhone(phone)}</a>
            </li>
            {info?.whatsAppNumber && (
              <li>
                <a href={whatsappUrl(info.whatsAppNumber)} target="_blank" rel="noopener noreferrer" className="hover:text-ink-inverse">
                  WhatsApp {formatPhone(info.whatsAppNumber)}
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${email}`} className="text-sm hover:text-ink-inverse">{email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold">Navegue</h2>
          <ul className="mt-4 space-y-2 text-ink-inverse-muted">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ink-inverse">{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/#contribua" className="hover:text-ink-inverse">Contribua</Link>
            </li>
            <li>
              <a href={EVENTS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink-inverse">Inscrições em eventos</a>
            </li>
          </ul>
          <h2 className="mt-8 font-bold">Baixe o app</h2>
          <div className="mt-3 flex gap-3 text-sm font-semibold">
            <a href={APP_LINKS.ios} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line-inverse px-4 py-2 hover:border-ink-inverse">iPhone</a>
            <a href={APP_LINKS.android} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line-inverse px-4 py-2 hover:border-ink-inverse">Android</a>
          </div>
        </div>
      </Container>
      <div className="border-t border-line-inverse">
        <Container className="flex flex-col gap-2 py-6 text-sm text-ink-inverse-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {CHURCH_LEGAL_NAME}</p>
          <Link href="/privacy" className="hover:text-ink-inverse">Política de privacidade</Link>
        </Container>
      </div>
    </footer>
  );
}
