import React, { useEffect, useState } from "react";
import {
  FiCheck,
  FiCopy,
  FiInfo,
  FiMail,
  FiX,
} from "react-icons/fi";
import { PiQrCode } from "react-icons/pi";
import { PIX } from "@/lib/site";
import Modal from "../Modal";
import {
  Actions,
  Block,
  CloseButton,
  Container,
  CopyButton,
  Details,
  Header,
  Notice,
} from "./styles";

interface IGiveSheet {
  open: boolean;
  onClose: () => void;
}

type CopyTarget = "key" | "code";

const copyToClipboard = (text: string) => {
  const fallback = () => {
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand("copy");
    } catch {
      /* noop */
    }
    document.body.removeChild(el);
  };

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(fallback);
  } else {
    fallback();
  }
};

/** Formas de contribuir (mesmo conteúdo da seção "Contribua" do site): envelope no culto ou Pix. */
const GiveSheet: React.FC<IGiveSheet> = ({ open, onClose }) => {
  const [copied, setCopied] = useState<CopyTarget | null>(null);

  useEffect(() => {
    if (!open) setCopied(null);
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(null), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = (target: CopyTarget, value: string) => {
    copyToClipboard(value);
    setCopied(target);
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <Container>
        <CloseButton type="button" onClick={onClose} aria-label="Fechar">
          <FiX />
        </CloseButton>

        <Header>
          <h2>Contribua</h2>
          <p>
            Dízimos e ofertas sustentam o culto, o cuidado com as pessoas e a
            missão da igreja. Você pode contribuir de duas formas.
          </p>
        </Header>

        <Block>
          <h3>
            <FiMail aria-hidden /> No culto
          </h3>
          <p>
            Use o envelope de contribuição disponível no templo e entregue no
            momento da oferta.
          </p>
        </Block>

        <Block>
          <h3>
            <PiQrCode aria-hidden /> Pelo Pix
          </h3>
          <Details>
            <div>
              <dt>Chave ({PIX.keyLabel.toLowerCase()})</dt>
              <dd data-key>{PIX.key}</dd>
            </div>
            <div>
              <dt>Favorecido</dt>
              <dd>{PIX.recipient}</dd>
            </div>
          </Details>
          <Actions>
            <CopyButton
              type="button"
              $copied={copied === "key"}
              onClick={() => copy("key", PIX.keyValue)}
            >
              {copied === "key" ? (
                <>
                  <FiCheck /> Chave copiada
                </>
              ) : (
                <>
                  <FiCopy /> Copiar chave
                </>
              )}
            </CopyButton>
            <CopyButton
              type="button"
              $copied={copied === "code"}
              onClick={() => copy("code", PIX.copyPaste)}
            >
              {copied === "code" ? (
                <>
                  <FiCheck /> Código copiado
                </>
              ) : (
                <>
                  <FiCopy /> Pix copia e cola
                </>
              )}
            </CopyButton>
          </Actions>
        </Block>

        <Notice>
          <FiInfo aria-hidden />
          <span>
            <strong>Importante:</strong> ao contribuir pelo Pix, escreva na
            descrição do que se trata a contribuição, por exemplo dízimo, oferta
            ou missões.
          </span>
        </Notice>
      </Container>
    </Modal>
  );
};

export default GiveSheet;
