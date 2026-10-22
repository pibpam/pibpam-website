"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { SUBJECTS, contactSchema } from "@/lib/contact";
import { whatsappUrl } from "@/lib/format";
import { Button, ButtonLink } from "@/components/ui/Button";

type Errors = Partial<Record<string, string>>;
type Status = { kind: "idle" | "sending" | "sent" } | { kind: "error"; message: string; fallback: boolean };

const field =
  "mt-2 block w-full rounded-sm border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-muted/70 transition-colors focus:border-brand-strong focus:outline-none aria-[invalid=true]:border-danger";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-danger">
      {message}
    </p>
  );
}

export function ContactForm({ whatsapp }: { whatsapp?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [draft, setDraft] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
      consent: form.get("consent") === "on",
      website: String(form.get("website") ?? ""),
    };
    const subjectLabel = SUBJECTS.find((subject) => subject.value === values.subject)?.label ?? "Contato";
    setDraft(`Olá! Sou ${values.name}. ${subjectLabel}.\n\n${values.message}`);

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(fieldErrors).map(([key, messages]) => [key, messages?.[0]])));
      setStatus({ kind: "idle" });
      const first = Object.keys(fieldErrors)[0];
      if (first) (event.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/site/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ kind: "sent" });
        return;
      }
      setStatus({ kind: "error", message: data.error ?? "Não foi possível enviar agora.", fallback: Boolean(data.fallback) });
    } catch {
      setStatus({ kind: "error", message: "Sem conexão com a internet. Confira e tente de novo.", fallback: true });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="animate-rise rounded-lg bg-brand-soft p-8">
        <CheckCircle2 aria-hidden className="size-10 text-success" />
        <h3 className="mt-4 text-2xl font-extrabold tracking-tight">Mensagem enviada</h3>
        <p className="mt-2 text-lg text-ink-muted">A secretaria recebeu sua mensagem e vai responder pelo contato que você informou.</p>
      </div>
    );
  }

  const describedBy = (name: string) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="name" className="font-semibold">Seu nome</label>
        <input id="name" name="name" autoComplete="name" className={field} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} />
        <FieldError id="name-error" message={errors.name} />
      </div>
      <div>
        <label htmlFor="email" className="font-semibold">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} />
        <FieldError id="email-error" message={errors.email} />
      </div>
      <div>
        <label htmlFor="phone" className="font-semibold">Telefone ou WhatsApp</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(37) 99999-9999" className={field} aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy("phone")} />
        <FieldError id="phone-error" message={errors.phone} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="subject" className="font-semibold">Assunto</label>
        <select id="subject" name="subject" defaultValue="" className={field} aria-invalid={Boolean(errors.subject)} aria-describedby={describedBy("subject")}>
          <option value="" disabled>Escolha uma opção</option>
          {SUBJECTS.map((subject) => (
            <option key={subject.value} value={subject.value}>{subject.label}</option>
          ))}
        </select>
        <FieldError id="subject-error" message={errors.subject} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="font-semibold">Mensagem</label>
        <textarea id="message" name="message" rows={6} className={`${field} resize-y`} aria-invalid={Boolean(errors.message)} aria-describedby={describedBy("message")} />
        <FieldError id="message-error" message={errors.message} />
      </div>

      {/* Honeypot: escondido de pessoas e leitores de tela. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <label htmlFor="website">Site</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3">
          <input name="consent" type="checkbox" className="mt-1 size-5 shrink-0 accent-brand-strong" aria-invalid={Boolean(errors.consent)} aria-describedby={describedBy("consent")} />
          <span className="text-ink-muted">
            Autorizo a PIB Pará de Minas a usar estes dados apenas para responder a esta mensagem.
          </span>
        </label>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2" aria-live="polite">
        {status.kind === "error" && (
          <div className="rounded-sm border border-danger/30 bg-danger/5 p-4">
            <p className="font-semibold text-danger">{status.message}</p>
            {status.fallback && whatsapp && (
              <>
                <p className="mt-1 text-ink-muted">Sua mensagem não se perdeu: envie pelo WhatsApp da secretaria.</p>
                <ButtonLink href={whatsappUrl(whatsapp, draft)} variant="outline" className="mt-3" icon={<MessageCircle aria-hidden className="size-4" />}>
                  Enviar pelo WhatsApp
                </ButtonLink>
              </>
            )}
          </div>
        )}
        <Button type="submit" size="lg" className="self-start" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Enviando…" : "Enviar mensagem"}
        </Button>
      </div>
    </form>
  );
}
