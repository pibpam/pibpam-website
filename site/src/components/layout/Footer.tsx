import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { Clock, LayoutDashboard, Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import type { ReactNode } from "react";
import { getChurchInfo } from "@/lib/api";
import { ADMIN_URL, APP_LINKS, CHURCH_CNPJ, CHURCH_LEGAL_NAME, EVENTS_URL, FALLBACK_CONTACT, NAV_LINKS } from "@/lib/site";
import { formatPhone, mapsUrl, toE164, whatsappUrl } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { sortSchedules } from "@/lib/schedule";
import type { IChurchSchedule } from "@/types";

/** Linha com ícone alinhado à primeira linha do texto (h-[1lh] acompanha o line-height). */
function IconLine({ icon, className = "", children }: { icon: ReactNode; className?: string; children: ReactNode }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <span className="flex h-[1lh] shrink-0 items-center text-accent">{icon}</span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/** Agrupa os horários (já ordenados) por dia, mantendo a ordem. */
function groupByDay(items: IChurchSchedule[]) {
  const groups: { day: string; items: IChurchSchedule[] }[] = [];
  for (const item of sortSchedules(items)) {
    const day = item.day.charAt(0).toUpperCase() + item.day.slice(1).toLowerCase();
    const last = groups[groups.length - 1];
    if (last?.day === day) last.items.push(item);
    else groups.push({ day, items: [item] });
  }
  return groups;
}

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
            <IconLine icon={<MapPin aria-hidden className="size-4" />}>
              <a href={mapsUrl(address)} target="_blank" rel="noopener noreferrer" className="hover:text-ink-inverse">
                {address}
              </a>
            </IconLine>
          </address>
          {info?.church_schedules?.length ? (
            <IconLine icon={<Clock aria-hidden className="size-4" />} className="mt-4 text-sm text-ink-inverse-muted">
              <div className="space-y-3">
                {groupByDay(info.church_schedules).map((group) => (
                  <div key={group.day}>
                    <h3 className="font-semibold text-ink-inverse">{group.day}</h3>
                    <ul className="mt-1 space-y-0.5">
                      {group.items.map((item) => (
                        <li key={item.uuid} className="grid grid-cols-[3rem_1fr] gap-x-2">
                          <span className="tabular-nums text-ink-inverse">{item.time}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </IconLine>
          ) : null}
        </div>

        <div>
          <h2 className="font-bold">Fale com a gente</h2>
          <ul className="mt-4 space-y-2 text-ink-inverse-muted">
            <li>
              <IconLine icon={<Phone aria-hidden className="size-4" />}>
                <a href={`tel:${toE164(phone)}`} className="hover:text-ink-inverse">{formatPhone(phone)}</a>
              </IconLine>
            </li>
            {info?.whatsAppNumber && (
              <li>
                <IconLine icon={<FaWhatsapp aria-hidden className="size-4" />}>
                  <a href={whatsappUrl(info.whatsAppNumber)} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap hover:text-ink-inverse" aria-label={`WhatsApp ${formatPhone(info.whatsAppNumber)}`}>
                    {formatPhone(info.whatsAppNumber)}
                  </a>
                </IconLine>
              </li>
            )}
            <li>
              <IconLine icon={<Mail aria-hidden className="size-4" />} className="text-sm">
                <a href={`mailto:${email}`} className="break-words hover:text-ink-inverse">{email}</a>
              </IconLine>
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
          <ul className="mt-5 space-y-2 text-ink-inverse-muted">
            <li>
              <IconLine icon={<Smartphone aria-hidden className="size-4" />}>
                <a href={APP_LINKS.web} target="_blank" rel="noopener noreferrer" className="hover:text-ink-inverse">Usar o app no navegador</a>
              </IconLine>
            </li>
            <li>
              <IconLine icon={<LayoutDashboard aria-hidden className="size-4" />}>
                <a href={ADMIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink-inverse">Sistema de gestão</a>
              </IconLine>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-line-inverse">
        <Container className="flex flex-col gap-2 py-6 text-sm text-ink-inverse-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {CHURCH_LEGAL_NAME} · CNPJ {CHURCH_CNPJ}</p>
          <Link href="/privacy" className="hover:text-ink-inverse">Política de privacidade</Link>
        </Container>
      </div>
    </footer>
  );
}
