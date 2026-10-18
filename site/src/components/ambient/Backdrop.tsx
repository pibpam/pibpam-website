import Image from "next/image";
import { AmbientGradient } from "./AmbientGradient";

interface BackdropProps {
  /** Foto de fundo (opcional). Sem foto, fica só o degradê sobre o pine. */
  image?: string;
  imageAlt?: string;
  /**
   * full: a foto cobre a seção inteira (precisa de imagem grande).
   * right: no desktop a foto ocupa a metade direita e some para a esquerda;
   * serve para fotos menores e deixa o texto à esquerda sobre o escuro.
   */
  layout?: "full" | "right";
  /** Ponto focal da foto (CSS object-position). */
  position?: string;
  priority?: boolean;
}

/**
 * Fundo imersivo das seções escuras. Camadas, de baixo para cima: foto → véu
 * pine (legibilidade) → degradê animado. O pai precisa ser
 * `relative isolate overflow-hidden bg-pine`, com o conteúdo `relative`.
 */
export function Backdrop({ image, imageAlt = "", layout = "full", position = "50% 50%", priority = false }: BackdropProps) {
  return (
    <>
      {image && (
        <div
          className={`absolute inset-0 -z-20 ${
            layout === "right" ? "lg:left-auto lg:w-[62%] lg:[mask-image:linear-gradient(to_right,transparent,black_45%)]" : ""
          }`}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes={layout === "right" ? "(min-width: 1024px) 62vw, 100vw" : "100vw"}
            className="object-cover"
            style={{ objectPosition: position }}
          />
        </div>
      )}
      {image && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--pine)_92%,transparent)_0%,color-mix(in_srgb,var(--pine)_78%,transparent)_45%,color-mix(in_srgb,var(--pine)_45%,transparent)_100%),linear-gradient(to_top,var(--pine)_0%,transparent_40%)]"
        />
      )}
      <AmbientGradient />
    </>
  );
}
