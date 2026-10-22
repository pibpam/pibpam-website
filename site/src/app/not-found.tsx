import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="text-7xl font-extrabold tracking-tight text-brand md:text-9xl">404</p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">Esta página não existe</h1>
      <p className="mt-4 max-w-lg text-lg text-ink-muted">
        O link pode estar errado ou o conteúdo foi removido. Comece pela página inicial ou veja as mensagens mais recentes.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Ir para o início</ButtonLink>
        <ButtonLink href="/conteudos" variant="outline">Ver mensagens</ButtonLink>
      </div>
    </Container>
  );
}
