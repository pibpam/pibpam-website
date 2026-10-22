import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Backdrop } from "@/components/ambient/Backdrop";

/** Chamada para a história: fachada do templo ao fundo, texto sobre o escuro. */
export function AboutTeaser({ excerpt }: { excerpt?: string }) {
  return (
    <Section
      tone="pine"
      labelledBy="about-title"
      className="md:py-36"
      backdrop={
        <Backdrop
          image="/igreja.jpg"
          imageAlt="Fachada do templo da Primeira Igreja Batista em Pará de Minas, na Avenida Presidente Vargas"
          layout="right"
          position="50% 35%"
        />
      }
    >
      <div className="max-w-xl">
        <h2 id="about-title" className="text-3xl font-extrabold tracking-[-0.02em] text-balance md:text-5xl md:leading-[1.08]">
          Começou com um estudo bíblico num apartamento
        </h2>
        {excerpt && <p className="mt-6 text-lg leading-relaxed text-ink-inverse/80">{excerpt}</p>}
        <div className="mt-9">
          <ButtonLink href="/sobre" variant="accent" size="lg">
            Conheça nossa história
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
