import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  FiCheck,
  FiCheckCircle,
  FiCopy,
  FiDownload,
  FiRefreshCw,
  FiUpload,
  FiX,
} from "react-icons/fi";
import Modal from "../Modal";
import { ApiLocal } from "../../services/apiLocal";
import StringUtils from "../../utils/StringUtils";
import { ICashPaymentInfo, IEventPixManualKey } from "../../interfaces/Event";
import { AppContext } from "../../contexts/app";
import { DateUtils } from "../../utils/Date";
import {
  CloseButton,
  Container,
  CopyButton,
  ExpiryNote,
  FileInput,
  ManualBox,
  ManualLabel,
  ManualName,
  ManualValue,
  ProofButton,
  ProofError,
  ProofSection,
  ProofSuccess,
  Qr,
  RegenerateButton,
  Spinner,
  Subtitle,
  Title,
} from "./styles";

interface IPixPaymentSheet {
  open: boolean;
  onClose: () => void;
  // Código Pix copia-e-cola (EMV ou MERCADO_PAGO_PIX) — preferencial, permite QR code.
  pixCopyPaste?: string | null;
  // Só em MERCADO_PAGO_PIX: QR já pronto do backend — evita gerar client-side.
  pixQrCodeBase64?: string | null;
  // Só em MERCADO_PAGO_PIX: validade do código atual.
  pixExpiresAt?: string | null;
  // Fallback quando não há copia-e-cola: chave PIX manual configurada no evento.
  manualKey?: IEventPixManualKey | null;
  // Dados do responsável pelo recebimento, quando o pagamento é em dinheiro.
  cashInfo?: ICashPaymentInfo | null;
  // Necessários para enviar/baixar o comprovante da parcela e regenerar o Pix.
  registrationUuid?: string;
  installmentUuid?: string;
  proofUrl?: string | null;
  onProofUploaded?: (proofUrl: string) => void;
  // MERCADO_PAGO_PIX confirma o pagamento sozinho via webhook — não faz
  // sentido pedir comprovante. Só se aplica ao Pix (EMV/MERCADO_PAGO_PIX);
  // chave manual e dinheiro sempre pedem comprovante, por serem sempre
  // conferidos manualmente.
  pixAutoConfirmed?: boolean;
  // Só relevante quando pixExpiresAt existe (MERCADO_PAGO_PIX): chamado com a
  // parcela atualizada após regenerar o código expirado.
  onPixRegenerated?: (installment: {
    pixCopyPaste: string | null;
    pixQrCodeBase64: string | null;
    pixExpiresAt: string | null;
  }) => void;
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
  pixQrCodeBase64,
  pixExpiresAt,
  manualKey,
  cashInfo,
  registrationUuid,
  installmentUuid,
  proofUrl,
  onProofUploaded,
  onPixRegenerated,
  pixAutoConfirmed,
}) => {
  const { isApp, isMobile } = useContext(AppContext);
  // No modal de desktop já existe um botão de fechar próprio (fora do
  // conteúdo) — o daqui é só para a bottom sheet mobile, evitar duplicar.
  const isDesktop = useMemo(() => !isApp && !isMobile, [isApp, isMobile]);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [justUploaded, setJustUploaded] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [regenerateError, setRegenerateError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // QR já pronto do backend (MERCADO_PAGO_PIX) tem prioridade — evita gerar
  // client-side um QR que o Mercado Pago já processou.
  useEffect(() => {
    if (pixQrCodeBase64) {
      setQrCode(
        pixQrCodeBase64.startsWith("data:")
          ? pixQrCodeBase64
          : `data:image/png;base64,${pixQrCodeBase64}`
      );
      return;
    }
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
  }, [pixCopyPaste, pixQrCodeBase64]);

  const expiresAtDate = pixExpiresAt ? new Date(pixExpiresAt) : null;
  const isExpired = !!expiresAtDate && expiresAtDate.getTime() < Date.now();

  useEffect(() => {
    if (!open) {
      setCopied(false);
      setUploadError(null);
      setJustUploaded(false);
      setRegenerateError(null);
    }
  }, [open]);

  const handleRegenerate = async () => {
    if (!registrationUuid || !installmentUuid) return;

    setRegenerating(true);
    setRegenerateError(null);
    try {
      const apiLocal = new ApiLocal();
      const installment = await apiLocal.regenerateInstallmentPix(
        registrationUuid,
        installmentUuid
      );
      onPixRegenerated?.({
        pixCopyPaste: installment.pixCopyPaste,
        pixQrCodeBase64: installment.pixQrCodeBase64,
        pixExpiresAt: installment.pixExpiresAt,
      });
    } catch (err) {
      setRegenerateError(
        "Não foi possível gerar um novo código Pix. Tente novamente."
      );
    } finally {
      setRegenerating(false);
    }
  };

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
      <ProofSection>
        {justUploaded && (
          <ProofSuccess>
            <FiCheckCircle /> Comprovante enviado com sucesso!
          </ProofSuccess>
        )}
        {proofUrl ? (
          <ProofButton
            as="a"
            href={proofUrl}
            download
            target="_blank"
            rel="noreferrer"
          >
            <FiDownload /> Baixar comprovante
          </ProofButton>
        ) : (
          <>
            <FileInput
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileSelected}
            />
            <ProofButton
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? (
                <Spinner />
              ) : (
                <>
                  <FiUpload /> Enviar comprovante
                </>
              )}
            </ProofButton>
            {uploadError && (
              <ProofError>{uploadError}</ProofError>
            )}
          </>
        )}
      </ProofSection>
    );
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <Container>
        {!isDesktop && (
          <CloseButton
            type="button"
            onClick={onClose}
            aria-label="Fechar"
          >
            <FiX />
          </CloseButton>
        )}
        <Title>
          {!pixCopyPaste && !manualKey && cashInfo
            ? "Pagamento em dinheiro"
            : "Pagamento via PIX"}
        </Title>

        {pixCopyPaste ? (
          <>
            <Subtitle>
              Escaneie o QR code ou copie o código para pagar no app do seu
              banco.
            </Subtitle>
            {expiresAtDate && (
              <ExpiryNote $expired={isExpired}>
                {isExpired
                  ? "Código expirado"
                  : `Válido até ${DateUtils.formatDateDefault(
                      pixExpiresAt as string
                    )} às ${DateUtils.formatTime(pixExpiresAt as string)}`}
              </ExpiryNote>
            )}
            {isExpired ? (
              <>
                <RegenerateButton
                  type="button"
                  disabled={regenerating}
                  onClick={handleRegenerate}
                >
                  {regenerating ? (
                    <Spinner />
                  ) : (
                    <>
                      <FiRefreshCw /> Gerar novo código
                    </>
                  )}
                </RegenerateButton>
                {regenerateError && <ProofError>{regenerateError}</ProofError>}
              </>
            ) : (
              <>
                {qrCode && (
                  <Qr src={qrCode} alt="QR Code PIX" />
                )}
                <CopyButton
                  type="button"
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
                </CopyButton>
              </>
            )}
            {!pixAutoConfirmed && renderProofSection()}
          </>
        ) : manualKey ? (
          <>
            <Subtitle>
              Pague usando a chave PIX abaixo e envie o comprovante à
              organização do evento.
            </Subtitle>
            <ManualBox>
              <ManualLabel>
                {MANUAL_KEY_TYPE_LABELS[manualKey.type] || manualKey.type}
              </ManualLabel>
              <ManualValue>{manualKey.key}</ManualValue>
              {manualKey.name && (
                <ManualName>{manualKey.name}</ManualName>
              )}
            </ManualBox>
            <CopyButton
              type="button"
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
            </CopyButton>
            {renderProofSection()}
          </>
        ) : cashInfo ? (
          <>
            <Subtitle>
              Entregue o valor combinado ao responsável abaixo.
            </Subtitle>
            <ManualBox>
              <ManualLabel>
                Responsável pelo recebimento
              </ManualLabel>
              <ManualValue>
                {cashInfo.name || "Não informado"}
              </ManualValue>
              {cashInfo.phone && (
                <ManualName>
                  {StringUtils.maskPhone(cashInfo.phone)}
                </ManualName>
              )}
            </ManualBox>
          </>
        ) : (
          <Subtitle>
            Dados do pagamento não disponíveis no momento.
          </Subtitle>
        )}
      </Container>
    </Modal>
  );
};

export default PixPaymentSheet;
