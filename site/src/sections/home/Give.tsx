import { Info, Mail, QrCode } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { CopyButton } from "@/components/ui/CopyButton";
import { PixQrCode } from "@/components/give/PixQrCode";
import { PIX } from "@/lib/site";

/** Formas de contribuir: envelope no culto ou Pix. */
export function Give() {
  return (
    <Section id="contribua" labelledBy="contribua-title" className="scroll-mt-18">
      <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-20">
        <div>
          <h2 id="contribua-title" className="text-3xl font-extrabold tracking-[-0.02em] text-balance md:text-[2.75rem] md:leading-[1.1]">
            Contribua
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
            Dízimos e ofertas sustentam o culto, o cuidado com as pessoas e a missão da igreja. Você pode contribuir de duas formas.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="border-t-2 border-brand pt-5">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <Mail aria-hidden className="size-5 text-brand-strong" />
                No culto
              </h3>
              <p className="mt-2 leading-relaxed text-ink-muted">
                Use o envelope de contribuição disponível no templo e entregue no momento da oferta.
              </p>
            </div>
            <div className="border-t-2 border-brand pt-5">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <QrCode aria-hidden className="size-5 text-brand-strong" />
                Pelo Pix
              </h3>
              <dl className="mt-2 space-y-1 text-ink-muted">
                <div>
                  <dt className="inline">Chave ({PIX.keyLabel.toLowerCase()}): </dt>
                  <dd className="inline text-lg font-bold text-ink tabular-nums">{PIX.key}</dd>
                </div>
                <div>
                  <dt className="inline">Favorecido: </dt>
                  <dd className="inline">{PIX.recipient}</dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">
                <CopyButton value={PIX.keyValue} label="Copiar chave" copiedLabel="Chave copiada" />
                <CopyButton value={PIX.copyPaste} label="Pix copia e cola" copiedLabel="Código copiado" />
              </div>
            </div>
          </div>

          <p className="mt-8 flex max-w-2xl gap-3 rounded-md bg-accent/25 p-4 leading-relaxed text-ink">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-pine" />
            <span>
              <strong>Importante:</strong> ao contribuir pelo Pix, escreva na descrição do que se trata a contribuição, por exemplo
              dízimo, oferta ou missões.
            </span>
          </p>
        </div>

        {/* No celular não dá para escanear a própria tela: lá ficam só os botões de copiar. */}
        <figure className="hidden self-start rounded-lg bg-mist p-6 text-center md:block">
          <PixQrCode payload={PIX.copyPaste} className="mx-auto aspect-square w-full max-w-64 rounded-sm bg-paper p-3" />
          <figcaption className="mt-4 text-sm text-ink-muted">
            Aponte a câmera do app do seu banco para pagar com Pix.
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
