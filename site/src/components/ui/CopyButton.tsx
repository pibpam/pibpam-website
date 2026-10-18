"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  value: string;
  label: string;
  copiedLabel?: string;
  className?: string;
}

/** Copia `value` para a área de transferência e confirma por 2 segundos. */
export function CopyButton({ value, label, copiedLabel = "Copiado", className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback para navegadores sem a Clipboard API (ou sem permissão).
      const input = document.createElement("textarea");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex h-11 items-center gap-2 rounded-full border px-5 text-[0.95rem] font-semibold transition-colors duration-200 ${
        copied ? "border-success bg-success text-paper" : "border-brand-strong/30 text-brand-strong hover:border-brand-strong hover:bg-brand-soft"
      } ${className}`}
    >
      {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
