import { cacheLife } from "next/cache";
import { getChurchInfo, getContents } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { LivePlayer } from "@/components/live/LivePlayer";
import { ServiceTimes } from "@/components/agenda/ServiceTimes";
import { VideoCard } from "@/components/media/VideoCard";
import { Section, SectionHeader } from "@/components/ui/Section";
import { VideoGrid } from "@/components/media/VideoGrid";
import { Backdrop } from "@/components/ambient/Backdrop";

export const metadata = buildMetadata({
  title: "Ao vivo",
  description: "Assista ao culto da Primeira Igreja Batista em Pará de Minas ao vivo, aos domingos e quartas.",
  path: "/ao-vivo",
});

export default async function AoVivoPage() {
  "use cache";
  cacheLife("minutes");

  const [info, recent] = await Promise.all([getChurchInfo(), getContents("transmission", 1, 4)]);
  const [last, ...previous] = recent.data;

  const offline = (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
      <div>
        <p className="text-lg text-ink-inverse-muted">Não estamos transmitindo agora. A última transmissão foi:</p>
        {last && (
          <div className="mt-6">
            <VideoCard content={last} featured tone="dark" priority />
          </div>
        )}
      </div>
      {info?.church_schedules?.length ? (
        <div>
          <h2 className="mb-4 text-lg font-bold">Próximas transmissões</h2>
          <ServiceTimes items={info.church_schedules} />
          <p className="mt-4 text-sm text-ink-inverse-muted">Esta página atualiza sozinha quando o culto começar.</p>
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      {/* Degradê animado ao fundo: durante a transmissão ele acelera e puxa para o lime. */}
      <section aria-labelledby="ao-vivo-title" className="relative isolate overflow-hidden bg-pine pb-16 text-ink-inverse md:pb-24">
        <Backdrop />
        <Container className="relative pt-10 md:pt-14">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 id="ao-vivo-title" className="text-4xl font-extrabold tracking-[-0.03em] md:text-6xl">
                Ao vivo
              </h1>
              <p className="mt-3 max-w-xl text-lg text-ink-inverse-muted">
                Os cultos são transmitidos pelo YouTube. Assista daqui, de onde estiver.
              </p>
            </div>
            {info?.youTubeUrl && (
              <ButtonLink href={info.youTubeUrl} variant="outline-inverse">
                Inscreva-se no canal
              </ButtonLink>
            )}
          </div>
          <LivePlayer offline={offline} />
        </Container>
      </section>

      {previous.length > 0 && (
        <Section labelledBy="anteriores-title">
          <SectionHeader
            id="anteriores-title"
            title="Transmissões anteriores"
            action={<ButtonLink href="/conteudos/transmissoes" variant="outline">Ver todas</ButtonLink>}
          />
          <VideoGrid contents={previous} />
        </Section>
      )}
    </>
  );
}
