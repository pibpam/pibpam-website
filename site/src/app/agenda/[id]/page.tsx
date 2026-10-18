import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { getScheduleDate, getSchedules } from "@/lib/api";
import { buildMetadata, eventJsonLd } from "@/lib/seo";
import { FALLBACK_CONTACT } from "@/lib/site";
import { formatTime, formatWeekdayDate, htmlToParagraphs, isUuid, mapsUrl } from "@/lib/format";
import { atLeastOne } from "@/lib/static-params";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateStaticParams() {
  const items = await getSchedules(6);
  return atLeastOne(items.map((item) => ({ id: item.uuid })));
}

const load = (id: string) => (isUuid(id) ? getScheduleDate(id) : Promise.resolve(null));

export async function generateMetadata({ params }: PageProps<"/agenda/[id]">) {
  const { id } = await params;
  const item = await load(id);
  if (!item) return {};
  const { schedule } = item;
  return buildMetadata({
    title: `${schedule.title.trim()}, ${formatWeekdayDate(item.scheduleDate)}`,
    description:
      schedule.shortDescription ||
      schedule.description ||
      `${schedule.title.trim()} na Primeira Igreja Batista em Pará de Minas, ${formatWeekdayDate(item.scheduleDate)} às ${formatTime(item.scheduleDate)}.`,
    path: `/agenda/${item.uuid}`,
    image: schedule.image,
  });
}

/** Extrai o id de um link/ID do YouTube salvo como vídeo promocional. */
const youtubeId = (value?: string | null) => {
  const trimmed = value?.trim() ?? "";
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  return trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/)?.[1];
};

export default async function AgendaItemPage({ params }: PageProps<"/agenda/[id]">) {
  const { id } = await params;
  const item = await load(id);
  if (!item) notFound();

  const { schedule } = item;
  const path = `/agenda/${item.uuid}`;
  const title = schedule.title.trim();
  const address = schedule.address || FALLBACK_CONTACT.address;
  const mapHref = schedule.addressRedirect
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(schedule.addressRedirect)}`
    : mapsUrl(address);
  const description = htmlToParagraphs(schedule.description ?? "");
  const video = youtubeId(schedule.promotionalVideo);

  return (
    <>
      <PageHeader
        title={title}
        description={schedule.shortDescription}
        breadcrumbs={[
          { name: "Agenda", path: "/agenda" },
          { name: title, path },
        ]}
      />
      <Container className="grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <div className="space-y-8">
          {video ? (
            <YouTubeEmbed videoId={video} title={title} poster={schedule.image ?? undefined} />
          ) : (
            schedule.image && (
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                <Image src={schedule.image} alt="" fill priority sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
              </div>
            )
          )}
          {description.length > 0 && (
            <div className="max-w-2xl space-y-4 text-lg leading-relaxed">
              {description.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          )}
        </div>

        <aside className="self-start rounded-lg bg-mist p-6 lg:sticky lg:top-28">
          <dl className="space-y-5">
            <div className="flex gap-3">
              <CalendarDays aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-strong" />
              <div>
                <dt className="sr-only">Data</dt>
                <dd className="font-bold first-letter:uppercase">
                  <time dateTime={item.scheduleDate}>{formatWeekdayDate(item.scheduleDate)}</time>
                </dd>
                <dd className="text-ink-muted tabular-nums">às {formatTime(item.scheduleDate)}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-strong" />
              <div>
                <dt className="sr-only">Local</dt>
                <dd>{address}</dd>
                <dd>
                  <a href={mapHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-strong hover:underline">
                    Como chegar
                  </a>
                </dd>
              </div>
            </div>
            {schedule.team && (
              <div className="flex gap-3">
                <Users aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-strong" />
                <div>
                  <dt className="sr-only">Ministério</dt>
                  <dd>{schedule.team.name}</dd>
                </div>
              </div>
            )}
          </dl>
          {schedule.enrollmentLink && (
            <ButtonLink href={schedule.enrollmentLink} className="mt-6 w-full">
              Fazer inscrição
            </ButtonLink>
          )}
        </aside>
      </Container>
      <JsonLd data={eventJsonLd(item, path)} />
    </>
  );
}
