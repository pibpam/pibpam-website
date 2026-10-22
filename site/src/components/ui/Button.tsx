import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "outline-inverse" | "ghost";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand-strong text-paper hover:bg-pine",
  accent: "bg-accent text-pine hover:bg-paper",
  outline: "border border-brand-strong/30 text-brand-strong hover:border-brand-strong hover:bg-brand-soft",
  "outline-inverse": "border border-ink-inverse/40 text-ink-inverse hover:border-ink-inverse hover:bg-ink-inverse/10",
  ghost: "text-brand-strong hover:bg-brand-soft",
};

const SIZES: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

const classes = (variant: Variant, size: Size, className: string) =>
  `inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

type ButtonLinkProps = BaseProps & Omit<ComponentProps<typeof Link>, "className" | "children">;

/** Link com cara de botão. URLs externas abrem em nova aba. */
export function ButtonLink({ variant = "primary", size = "md", icon, className = "", children, href, ...props }: ButtonLinkProps) {
  const external = typeof href === "string" && /^(https?:|mailto:|tel:)/.test(href);
  return (
    <Link
      href={href}
      className={classes(variant, size, className)}
      {...(external && href.toString().startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    >
      {icon}
      {children}
    </Link>
  );
}

type ButtonProps = BaseProps & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ variant = "primary", size = "md", icon, className = "", children, ...props }: ButtonProps) {
  return (
    <button className={classes(variant, size, className)} {...props}>
      {icon}
      {children}
    </button>
  );
}
