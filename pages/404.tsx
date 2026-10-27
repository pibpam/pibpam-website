import type { NextPage } from "next";
import React from "react";
import { Container } from "@/components/ui/Container";
import Website from "../layout/container/Website";
import AppHeader from "../components/AppHeader";
import AppButton from "../components/AppButton";

const NotFound: NextPage = () => {
  return (
    <Website title={"404"}>
      <>
        <AppHeader title="Página não encontrada" />
        <Container className="flex flex-col items-start gap-5 pt-12 pb-32">
          <p className="text-6xl font-extrabold tracking-tight text-brand-strong">404</p>
          <h1 className="text-2xl font-extrabold tracking-tight text-balance">O que você procura não está mais aqui</h1>
          <p className="text-lg leading-relaxed text-ink-muted">
            O endereço pode ter mudado ou o conteúdo foi removido.
          </p>
          <AppButton href="/">Ir para o início</AppButton>
        </Container>
      </>
    </Website>
  );
};

export default NotFound;
