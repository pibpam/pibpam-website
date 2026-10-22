interface LiveBadgeProps {
  label?: string;
  className?: string;
}

/** Selo "Ao vivo" com o ponto pulsante — a única animação contínua do site. */
export function LiveBadge({ label = "Ao vivo", className = "" }: LiveBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-bold text-pine ${className}`}>
      <span aria-hidden className="size-2 animate-live rounded-full bg-pine" />
      {label}
    </span>
  );
}
