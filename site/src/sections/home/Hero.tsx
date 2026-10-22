import type { IChurchSchedule } from "@/types";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ServiceTimes } from "@/components/agenda/ServiceTimes";
import { Backdrop } from "@/components/ambient/Backdrop";
import { CHURCH_LEGAL_NAME } from "@/lib/site";

/**
 * Camadas, de baixo para cima: foto da igreja → véu escuro na cor da marca
 * (legibilidade) → degradê animado (WebGL) → header e conteúdo.
 */
export function Hero({ schedules }: { schedules: IChurchSchedule[] }) {
  return (
    // -mt-18 / pt-18: a seção sobe para trás do header transparente.
    <section
      aria-labelledby="hero-title"
      className="relative isolate -mt-18 flex min-h-[100svh] flex-col justify-end overflow-hidden bg-pine pt-18 text-ink-inverse lg:min-h-[92svh]"
    >
      <Backdrop
        image="/hero.jpg"
        imageAlt="Membros da PIB Pará de Minas reunidos no templo, sorrindo e com as mãos levantadas"
        position="50% 45%"
        priority
      />

      <Container className="relative grid gap-12 pt-16 pb-16 lg:grid-cols-[1fr_22rem] lg:gap-20 lg:pb-24">
        <div className="max-w-3xl self-end">
          <h1 id="hero-title" className="animate-rise text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[5rem]">
            {CHURCH_LEGAL_NAME}
          </h1>
          <p className="mt-6 max-w-xl animate-rise text-xl font-medium text-ink-inverse/85 [animation-delay:120ms] md:text-2xl">
            Uma igreja para você e para sua família.
          </p>
          <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:220ms]">
            <ButtonLink href="/sobre#visite" variant="accent" size="lg">
              Planeje sua visita
            </ButtonLink>
            <ButtonLink href="/conteudos" variant="outline-inverse" size="lg">
              Assistir às mensagens
            </ButtonLink>
          </div>
        </div>

        {schedules.length > 0 && (
          <div className="animate-rise self-end [animation-delay:320ms]">
            <h2 className="mb-4 text-lg font-bold">Nossos cultos</h2>
            <ServiceTimes items={schedules} />
          </div>
        )}
      </Container>
    </section>
  );
}
