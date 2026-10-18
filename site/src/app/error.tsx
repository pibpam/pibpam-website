"use client";

import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">Não foi possível carregar esta página</h1>
      <p className="mt-4 max-w-lg text-lg text-ink-muted">
        O servidor da igreja não respondeu a tempo. Tente de novo em alguns segundos.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={reset}>Tentar de novo</Button>
        <ButtonLink href="/" variant="outline">Ir para o início</ButtonLink>
      </div>
    </Container>
  );
}
