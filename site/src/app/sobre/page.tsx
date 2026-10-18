import Image from "next/image";
import { cacheLife } from "next/cache";
import { getChurchInfo } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { FALLBACK_CONTACT, FOUNDED_YEAR } from "@/lib/site";
import { htmlToParagraphs, mapsUrl, splitTimeline, whatsappUrl } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceTimes } from "@/components/agenda/ServiceTimes";
import { MapEmbed } from "@/components/contact/MapEmbed";

export const metadata = buildMetadata({
  title: "Sobre a igreja",
  description: `Conheça a história da Primeira Igreja Batista em Pará de Minas, fundada em ${FOUNDED_YEAR}, nossos horários de culto e como nos visitar.`,
  path: "/sobre",
});

const FIRST_VISIT = [
  {
    title: "Chegue alguns minutos antes",
    text: "A recepção fica na entrada do templo e te ajuda a encontrar um lugar e o que precisar.",
  },
  {
    title: "Venha como estiver",
    text: "Não há roupa certa. O que importa é estar junto, ouvir a Palavra e cantar com a igreja.",
  },
  {
    title: "Traga as crianças",
    text: "Elas são bem-vindas no culto. Pergunte na recepção sobre as atividades para cada idade.",
  },
  {
    title: "Fique para conversar",
    text: "Depois do culto, os pastores e a liderança gostam de conhecer quem chegou. Não é preciso se apresentar no púlpito.",
  },
];

export default async function SobrePage() {
  "use cache";
  cacheLife("hours");

  const info = await getChurchInfo();
  const { story: history, timeline } = splitTimeline(htmlToParagraphs(info?.history));
  const pastoral = htmlToParagraphs(info?.shepherdText);
  const address = info?.address?.trim() ?? FALLBACK_CONTACT.address;
  const years = new Date().getFullYear() - FOUNDED_YEAR;

  return (
    <>
      <PageHeader
        title="Uma igreja batista em Pará de Minas"
        description={`Há ${years} anos a Primeira Igreja Batista reúne famílias da cidade para adorar a Deus, estudar a Bíblia e servir ao próximo.`}
        breadcrumbs={[{ name: "Sobre", path: "/sobre" }]}
      />

      <Section labelledBy="historia-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,40rem)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 id="historia-title" className="text-3xl font-extrabold tracking-[-0.02em] md:text-[2.75rem] md:leading-[1.1]">
              Nossa história
            </h2>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-lg">
              <Image src="/igreja.jpg" alt="Fachada do templo da PIB Pará de Minas" fill sizes="(min-width: 1024px) 440px, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="space-y-5 text-lg leading-[1.75] text-ink/90">
            {history.length > 0 ? (
              history.map((paragraph, index) => <p key={index}>{paragraph}</p>)
            ) : (
              <p>A história da igreja não pôde ser carregada agora. Tente novamente em instantes.</p>
            )}
          </div>
        </div>
      </Section>

      {timeline.length > 0 && (
        <Section tone="mist" labelledBy="cronologia-title">
          <h2 id="cronologia-title" className="text-3xl font-extrabold tracking-[-0.02em] md:text-[2.75rem]">Linha do tempo</h2>
          <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {timeline.map((entry, index) => (
              <li key={index} className="border-l-2 border-brand pl-5">
                <p className="text-2xl font-extrabold tracking-tight text-brand-strong tabular-nums">{entry.period}</p>
                <p className="mt-1 leading-relaxed text-ink-muted">{entry.text}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {pastoral.length > 0 && (
        <Section tone="mist" labelledBy="pastoral-title">
          <h2 id="pastoral-title" className="text-3xl font-extrabold tracking-[-0.02em] md:text-[2.75rem]">Palavra pastoral</h2>
          <div className="mt-6 max-w-2xl space-y-5 text-lg leading-[1.75]">
            {pastoral.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </Section>
      )}

      <Section id="visite" tone="pine" labelledBy="visite-title" className="scroll-mt-18">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="visite-title" className="text-3xl font-extrabold tracking-[-0.02em] text-balance md:text-[2.75rem] md:leading-[1.1]">
              Planeje sua visita
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-inverse-muted">
              Estamos na Avenida Presidente Vargas, no bairro Providência. Escolha um dos horários abaixo, o próximo culto
              aparece destacado.
            </p>
            {info?.church_schedules?.length ? (
              <div className="mt-8 max-w-md">
                <ServiceTimes items={info.church_schedules} />
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={mapsUrl(address)} variant="accent">Como chegar</ButtonLink>
              {info?.whatsAppNumber && (
                <ButtonLink href={whatsappUrl(info.whatsAppNumber, "Olá! Quero visitar a PIB Pará de Minas.")} variant="outline-inverse">
                  Avisar que vou
                </ButtonLink>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <MapEmbed address={address} className="min-h-80 flex-1" />
            <address className="not-italic text-ink-inverse-muted">{address}</address>
          </div>
        </div>
      </Section>

      <Section labelledBy="primeira-vez-title">
        <h2 id="primeira-vez-title" className="text-3xl font-extrabold tracking-[-0.02em] md:text-[2.75rem]">
          Na sua primeira vez
        </h2>
        <dl className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {FIRST_VISIT.map((item) => (
            <div key={item.title} className="border-t-2 border-brand pt-5">
              <dt className="text-xl font-bold">{item.title}</dt>
              <dd className="mt-2 text-lg leading-relaxed text-ink-muted">{item.text}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
