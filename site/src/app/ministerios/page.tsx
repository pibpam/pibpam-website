import { cacheLife } from "next/cache";
import { getChurchInfo, getMinistries } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { MinistryCard } from "@/components/ministry/MinistryCard";
import { Backdrop } from "@/components/ambient/Backdrop";

export const metadata = buildMetadata({
  title: "Ministérios",
  description:
    "Conheça os ministérios da Primeira Igreja Batista em Pará de Minas: jovens, mulheres, homens, crianças, louvor, Escola Bíblica e mais. Saiba como servir.",
  path: "/ministerios",
});

export default async function MinisteriosPage() {
  "use cache";
  cacheLife("hours");

  const [ministries, info] = await Promise.all([getMinistries(), getChurchInfo()]);

  return (
    <>
      <PageHeader
        title="Ministérios"
        description="A igreja funciona porque cada membro serve com o dom que recebeu. Estes são os grupos que cuidam das pessoas, do culto e da casa."
        breadcrumbs={[{ name: "Ministérios", path: "/ministerios" }]}
      />

      <Section labelledBy="ministerios-lista-title">
        <h2 id="ministerios-lista-title" className="sr-only">Todos os ministérios</h2>
        {ministries.length > 0 ? (
          <ul className="grid gap-6 lg:grid-cols-2">
            {ministries.map((ministry) => (
              <li key={ministry.uuid}>
                <MinistryCard ministry={ministry} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-ink-muted">Os ministérios não puderam ser carregados agora. Tente novamente em instantes.</p>
        )}
      </Section>

      <Section tone="pine" labelledBy="servir-title" backdrop={<Backdrop />}>
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <h2 id="servir-title" className="text-3xl font-extrabold tracking-[-0.02em] text-balance md:text-[2.75rem] md:leading-[1.1]">
              Quer servir em um ministério?
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-inverse-muted">
              Conte para a gente onde você gostaria de ajudar. A secretaria coloca você em contato com a liderança do ministério.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <ButtonLink href="/contato" variant="accent">Enviar mensagem</ButtonLink>
            {info?.whatsAppNumber && (
              <ButtonLink href={whatsappUrl(info.whatsAppNumber, "Olá! Quero servir em um ministério da PIB Pará de Minas.")} variant="outline-inverse">
                Falar no WhatsApp
              </ButtonLink>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
