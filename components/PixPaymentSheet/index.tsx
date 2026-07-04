import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  FiCheck,
  FiCheckCircle,
  FiCopy,
  FiDownload,
  FiUpload,
  FiX,
} from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import Modal from "../Modal";
import styles from "../../styles/components/PixPaymentSheet.module.scss";
import { ApiLocal } from "../../services/apiLocal";
import { ICashPaymentInfo, IEventPixManualKey } from "../../interfaces/Event";

interface IPixPaymentSheet {
  open: boolean;
  onClose: () => void;
  // Código Pix copia-e-cola (EMV) — preferencial, permite QR code.
  pixCopyPaste?: string | null;
  // Fallback quando não há copia-e-cola: chave PIX manual configurada no evento.
  manualKey?: IEventPixManualKey | null;
  // Dados do responsável pelo recebimento, quando o pagamento é em dinheiro.
  cashInfo?: ICashPaymentInfo | null;
  // Necessários para enviar/baixar o comprovante da parcela.
  registrationUuid?: string;
  installmentUuid?: string;
  proofUrl?: string | null;
  onProofUploaded?: (proofUrl: string) => void;
}

const MANUAL_KEY_TYPE_LABELS: Record<string, string> = {
  cpf: "CPF",
  cnpj: "CNPJ",
  email: "E-mail",
  phone: "Telefone",
  random: "Chave aleatória",
};

const PixPaymentSheet: React.FC<IPixPaymentSheet> = ({
  open,
  onClose,
  pixCopyPaste,
  manualKey,
  cashInfo,
  registrationUuid,
  installmentUuid,
  proofUrl,
  onProofUploaded,
}) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [justUploaded, setJustUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!pixCopyPaste) {
      setQrCode(null);
      return;
    }
    let cancelled = false;
    QRCode.toDataURL(pixCopyPaste, { margin: 1, width: 260 })
      .then((url) => {
        if (!cancelled) setQrCode(url);
      })
      .catch(() => {
        if (!cancelled) setQrCode(null);
      });
    return () => {
      cancelled = true;
    };
  }, [pixCopyPaste]);

  useEffect(() => {
    if (!open) {
      setCopied(false);
      setUploadError(null);
      setJustUploaded(false);
    }
  }, [open]);

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

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileSelected = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !registrationUuid || !installmentUuid) return;

    setUploading(true);
    setUploadError(null);
    try {
      const apiLocal = new ApiLocal();
      const { signedUrl, proofUrl: uploadedUrl } =
        await apiLocal.createInstallmentProof(
          registrationUuid,
          installmentUuid,
          file.name
        );

      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type || "application/octet-stream" },
      });

      if (!uploadResponse.ok) {
        throw new Error("Falha ao enviar o arquivo");
      }

      setJustUploaded(true);
      onProofUploaded?.(uploadedUrl);
    } catch (err) {
      setUploadError(
        "Não foi possível enviar o comprovante. Tente novamente."
      );
    } finally {
      setUploading(false);
    }
  };

  const renderProofSection = () => {
    if (!registrationUuid || !installmentUuid) return null;

    return (
      <div className={styles.proofSection}>
        {justUploaded && (
          <div className={styles.proofSuccess}>
            <FiCheckCircle /> Comprovante enviado com sucesso!
          </div>
        )}
        {proofUrl ? (
          <a
            href={proofUrl}
            download
            target="_blank"
            rel="noreferrer"
            className={styles.proofButton}
          >
            <FiDownload /> Baixar comprovante
          </a>
        ) : (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className={styles.fileInput}
              onChange={handleFileSelected}
            />
            <button
              type="button"
              className={styles.proofButton}
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? (
                <ImSpinner2 className={styles.spinner} />
              ) : (
                <>
                  <FiUpload /> Enviar comprovante
                </>
              )}
            </button>
            {uploadError && (
              <span className={styles.proofError}>{uploadError}</span>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fechar"
        >
          <FiX />
        </button>
        <h2 className={styles.title}>
          {!pixCopyPaste && !manualKey && cashInfo
            ? "Pagamento em dinheiro"
            : "Pagamento via PIX"}
        </h2>

        {pixCopyPaste ? (
          <>
            <p className={styles.subtitle}>
              Escaneie o QR code ou copie o código para pagar no app do seu
              banco.
            </p>
            {qrCode && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrCode} alt="QR Code PIX" className={styles.qr} />
            )}
            <button
              type="button"
              className={styles.copyButton}
              onClick={() => copyToClipboard(pixCopyPaste)}
            >
              {copied ? (
                <>
                  <FiCheck /> Copiado!
                </>
              ) : (
                <>
                  <FiCopy /> Copiar código PIX
                </>
              )}
            </button>
            {renderProofSection()}
          </>
        ) : manualKey ? (
          <>
            <p className={styles.subtitle}>
              Pague usando a chave PIX abaixo e envie o comprovante à
              organização do evento.
            </p>
            <div className={styles.manualBox}>
              <span className={styles.manualLabel}>
                {MANUAL_KEY_TYPE_LABELS[manualKey.type] || manualKey.type}
              </span>
              <strong className={styles.manualValue}>{manualKey.key}</strong>
              {manualKey.name && (
                <span className={styles.manualName}>{manualKey.name}</span>
              )}
            </div>
            <button
              type="button"
              className={styles.copyButton}
              onClick={() => copyToClipboard(manualKey.key)}
            >
              {copied ? (
                <>
                  <FiCheck /> Copiado!
                </>
              ) : (
                <>
                  <FiCopy /> Copiar chave PIX
                </>
              )}
            </button>
            {renderProofSection()}
          </>
        ) : cashInfo ? (
          <>
            <p className={styles.subtitle}>
              Entregue o valor combinado ao responsável abaixo e envie o
              comprovante, se houver.
            </p>
            <div className={styles.manualBox}>
              <span className={styles.manualLabel}>
                Responsável pelo recebimento
              </span>
              <strong className={styles.manualValue}>
                {cashInfo.name || "Não informado"}
              </strong>
              {cashInfo.phone && (
                <span className={styles.manualName}>{cashInfo.phone}</span>
              )}
            </div>
            {renderProofSection()}
          </>
        ) : (
          <p className={styles.subtitle}>
            Dados do pagamento não disponíveis no momento.
          </p>
        )}
      </div>
    </Modal>
  );
};

export default PixPaymentSheet;
