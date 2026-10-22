import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "paper" | "mist" | "pine";

const TONES: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  pine: "bg-pine text-ink-inverse",
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  /** id do título, para aria-labelledby */
  labelledBy?: string;
  /** Fundo imersivo (ex.: <Backdrop />), desenhado atrás do conteúdo. */
  backdrop?: ReactNode;
}

export function Section({ id, tone = "paper", className = "", children, labelledBy, backdrop }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${TONES[tone]} py-16 md:py-24 ${backdrop ? "relative isolate overflow-hidden" : ""} ${className}`}
    >
      {backdrop}
      <Container className={backdrop ? "relative" : ""}>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  id: string;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: "light" | "dark";
  /** Ação abaixo do texto, para cabeçalhos em coluna estreita. */
  stacked?: boolean;
}

export function SectionHeader({ id, title, description, action, tone = "light", stacked = false }: SectionHeaderProps) {
  return (
    <div className={`mb-10 flex flex-col gap-4 md:mb-12 ${stacked ? "items-start gap-6" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className="max-w-2xl">
        <h2 id={id} className="text-3xl font-extrabold tracking-[-0.02em] text-balance md:text-[2.75rem] md:leading-[1.1]">
          {title}
        </h2>
        {description && (
          <p className={`mt-3 text-lg leading-relaxed ${tone === "dark" ? "text-ink-inverse-muted" : "text-ink-muted"}`}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
