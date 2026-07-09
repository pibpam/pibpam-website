import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { FiAlertTriangle, FiArrowRight, FiCheck, FiCopy } from "react-icons/fi";
import Website from "../../../layout/container/Website";
import Header from "../../../components/Header";
import HeaderContainer from "../../../components/HeaderContainer";
import PixPaymentSheet from "../../../components/PixPaymentSheet";
import ShareButton from "../../../components/ShareButton";
import InscriptionResponsibles from "../../../components/Inscription/Responsibles";
import InscriptionFaqs from "../../../components/Inscription/Faqs";
import { DetailsExtra } from "../../../components/Inscription/styles";
import { Closed, EventName, PixCopy, SectionLabel, Page, Summary, SummaryRow, SummaryTotal, Wrapper } from "../../../styles/Inscription";
import { CodeBox, CodeLabel, CodeValue, CtaLink, SuccessActions } from "../../../styles/Tracking";
import Badge, { BadgeVariant } from "../../../components/Badge";
import ParticipantItem from "../../../container/Tracking/ParticipantItem";
import InstallmentItem from "../../../container/Tracking/InstallmentItem";
import CheckoutStatusBanner, {
  CheckoutStatus,
} from "../../../container/Tracking/CheckoutStatusBanner";
import {
  Container as AlertContainer,
  Content as AlertContent,
  Icon as AlertIcon,
  Message as AlertMessage,
  Title as AlertTitle,
} from "../../../container/Tracking/CheckoutStatusBanner/styles";
import useMenu from "../../../hooks/useMenu";
import useHeader from "../../../hooks/useHeader";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { Api } from "../../../services/api";
import {
  IEventDetail,
  IRegistrationInstallment,
  IRegistrationSearchResult,
} from "../../../interfaces/Event";

interface ITrackingPage {
  code: string;
  registration: IRegistrationSearchResult | null;
  // Só disponível quando a busca por código encontra a inscrição (o uuid do
  // evento vem em `registration.event`).
  event: IEventDetail | null;
  // Vem do redirect do checkout: `?status=success|pending|failure`.
  // "pending" não tem banner próprio — o status da parcela já cobre esse caso.
  checkoutStatus: CheckoutStatus | null;
}

const formatPrice = (price?: number | string | null) => {
  const value = typeof price === "string" ? parseFloat(price) : price;
  if (value === undefined || value === null || !Number.isFinite(value)) {
    return null;
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendente",
  paid: "Pago",
  confirmed: "Confirmada",
  overdue: "Atrasada",
  cancelled: "Cancelada",
  canceled: "Cancelada",
  refunded: "Reembolsada",
};

const statusLabel = (status?: string) => {
  if (!status) return "";
  return STATUS_LABELS[status] || status;
};

const STATUS_BADGE_VARIANTS: Record<string, BadgeVariant> = {
  pending: "warning",
  paid: "success",
  confirmed: "success",
  overdue: "warning",
  cancelled: "error",
  canceled: "error",
  refunded: "error",
};

const statusBadgeVariant = (status?: string): BadgeVariant =>
  (status && STATUS_BADGE_VARIANTS[status]) || "neutral";

const TrackingPage: NextPage<ITrackingPage> = ({
  code,
  registration,
  event,
  checkoutStatus,
}) => {
  const { open, toggleMenu } = useMenu();
  const { scrollActive, changeScroll } = useHeader();
  const { goBack } = useAppNavigation();
  // Cópia local das parcelas: permite refletir o comprovante enviado sem
  // precisar recarregar a página (os dados originais vêm via SSR).
  const [installments, setInstallments] = useState<IRegistrationInstallment[]>(
    registration?.installments || []
  );
  const [activeInstallmentUuid, setActiveInstallmentUuid] = useState<
    string | null
  >(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const [showCheckoutStatus, setShowCheckoutStatus] = useState(
    !!checkoutStatus
  );

  const activeInstallment =
    installments.find((i) => i.uuid === activeInstallmentUuid) || null;

  const total = formatPrice(registration?.totalAmount);

  // Meio de pagamento vem direto na inscrição.
  const paymentMethod = registration?.paymentMethod || null;
  const isPix =
    paymentMethod?.type === "PIX" || paymentMethod?.type === "MERCADO_PAGO_PIX";
  const isCash = paymentMethod?.type === "CASH";
  const cashInfo = isCash
    ? {
        name: paymentMethod?.cashResponsibleName ?? null,
        phone: paymentMethod?.cashResponsiblePhone ?? null,
      }
    : null;

  // Não usamos await: o writeText pode ficar pendente quando a aba não está
  // focada, o que travaria o feedback visual.
  const copyCode = () => {
    const fallback = () => {
      const el = document.createElement("textarea");
      el.value = code;
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
      navigator.clipboard.writeText(code).catch(fallback);
    } else {
      fallback();
    }

    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const isPayable = (inst: IRegistrationInstallment) =>
    inst.status === "pending" || inst.status === "overdue";

  // Checkout Pro (MERCADO_PAGO) sempre gera 1 parcela só; o link de
  // redirecionamento agora vive na parcela, não mais na inscrição.
  const payableWithUrl = installments.find(
    (i) => i.paymentUrl && isPayable(i)
  );

  return (
    <Website
      title={`Acompanhamento · ${code}`}
      hasTabNavigator={false}
      changeScroll={changeScroll}
      openMenu={open}
      toggleMenu={toggleMenu}
    >
      <>
        <HeaderContainer active={true}>
          <Header
            goBack={() => goBack({ fallback: "/inscricoes" })}
            toggleMenu={toggleMenu}
          />
        </HeaderContainer>
        <Page>
          <Wrapper style={{ paddingTop: 96 }}>
            <EventName>Acompanhamento</EventName>

            <CodeBox style={{ maxWidth: "100%" }}>
              <CodeLabel>Código da inscrição</CodeLabel>
              <CodeValue>{code}</CodeValue>
              {registration?.status && (
                <Badge variant={statusBadgeVariant(registration.status)}>
                  {statusLabel(registration.status)}
                </Badge>
              )}
              <PixCopy type="button" onClick={copyCode}>
                {codeCopied ? (
                  <>
                    <FiCheck /> Copiado!
                  </>
                ) : (
                  <>
                    <FiCopy /> Copiar código
                  </>
                )}
              </PixCopy>
            </CodeBox>

            {checkoutStatus && showCheckoutStatus && (
              <CheckoutStatusBanner
                status={checkoutStatus}
                onClose={() => setShowCheckoutStatus(false)}
              />
            )}

            {!!registration?.hasOverduePayment && (
              <AlertContainer $status="warning" role="alert">
                <AlertIcon>
                  <FiAlertTriangle />
                </AlertIcon>
                <AlertContent>
                  <AlertTitle>Pagamento em atraso</AlertTitle>
                  <AlertMessage>
                    {(registration.overdueInstallmentsCount || 1) > 1
                      ? `${registration.overdueInstallmentsCount} parcelas estão vencidas.`
                      : "Uma parcela está vencida."}{" "}
                    Regularize para manter sua inscrição confirmada.
                  </AlertMessage>
                </AlertContent>
              </AlertContainer>
            )}

            {registration ? (
              <>
                {/* Resumo */}
                <Summary style={{ marginTop: 16 }}>
                  <SummaryRow>
                    <span>Responsável</span>
                    <span>{registration.responsibleName}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>E-mail</span>
                    <span>{registration.responsibleEmail}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Participantes</span>
                    <span>{registration.participants.length}</span>
                  </SummaryRow>
                  {total && (
                    <SummaryTotal>
                      <span>Total</span>
                      <span>{total}</span>
                    </SummaryTotal>
                  )}
                </Summary>

                {payableWithUrl &&
                  registration.status !== "refunded" &&
                  registration.status !== "confirmed" && (
                    <SuccessActions style={{ maxWidth: "100%" }}>
                      <CtaLink
                        type="button"
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            window.location.href = payableWithUrl.paymentUrl as string;
                          }
                        }}
                      >
                        Ir para o pagamento <FiArrowRight />
                      </CtaLink>
                    </SuccessActions>
                  )}

                {/* Participantes */}
                {!!registration.participants.length && (
                  <>
                    <SectionLabel>Participantes</SectionLabel>
                    {registration.participants.map((p) => (
                      <ParticipantItem
                        key={p.uuid}
                        participant={p}
                        formatPrice={formatPrice}
                      />
                    ))}
                  </>
                )}

                {/* Parcelas */}
                {!!installments.length && (
                  <>
                    <SectionLabel>Parcelas</SectionLabel>
                    {[...installments]
                      .sort((a, b) => a.number - b.number)
                      .map((inst) => (
                        <InstallmentItem
                          key={inst.uuid}
                          installment={inst}
                          installmentsCount={registration.installmentsCount}
                          isPix={isPix}
                          isCash={isCash}
                          clickable={(isPix || isCash) && isPayable(inst)}
                          formatPrice={formatPrice}
                          statusLabel={statusLabel}
                          onSelect={() => setActiveInstallmentUuid(inst.uuid)}
                        />
                      ))}
                  </>
                )}
              </>
            ) : (
              <Closed style={{ marginTop: 16 }}>
                Nenhuma inscrição encontrada para este código. Confira o código e
                tente novamente.
              </Closed>
            )}

            <ShareButton
              large
              url={`https://pibpam.org/inscricoes/acompanhamento/${code}`}
              message={`Acompanhamento da inscrição ${code}`}
            />

            {event && (
              <DetailsExtra>
                <InscriptionResponsibles
                  responsibles={event.responsibles || []}
                  eventName={event.name}
                />
                <InscriptionFaqs faqs={event.faqs || []} />
              </DetailsExtra>
            )}
          </Wrapper>
        </Page>

        <PixPaymentSheet
          open={!!activeInstallment}
          onClose={() => setActiveInstallmentUuid(null)}
          pixCopyPaste={activeInstallment?.pixCopyPaste}
          pixQrCodeBase64={activeInstallment?.pixQrCodeBase64}
          pixExpiresAt={activeInstallment?.pixExpiresAt}
          pixAutoConfirmed={paymentMethod?.type === "MERCADO_PAGO_PIX"}
          manualKey={isPix ? paymentMethod?.pixManualKey : null}
          cashInfo={cashInfo}
          registrationUuid={registration?.uuid}
          installmentUuid={activeInstallment?.uuid}
          proofUrl={activeInstallment?.proofUrl}
          onProofUploaded={(proofUrl) => {
            setInstallments((state) =>
              state.map((i) =>
                i.uuid === activeInstallmentUuid ? { ...i, proofUrl } : i
              )
            );
          }}
          onPixRegenerated={(updated) => {
            setInstallments((state) =>
              state.map((i) =>
                i.uuid === activeInstallmentUuid ? { ...i, ...updated } : i
              )
            );
          }}
        />
      </>
    </Website>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const code = params?.code;

  if (!code || typeof code !== "string") {
    return { notFound: true };
  }

  // Vem do redirect do checkout (Mercado Pago): `?status=success|pending|failure`.
  // "pending" não tem banner próprio — o status da parcela já cobre esse caso.
  // O Mercado Pago appenda seus próprios parâmetros no back_url ao redirecionar
  // de volta, e um deles também se chama `status` (vocabulário do MP, ex.
  // "approved"/"rejected") — isso duplica a chave na URL e o Next.js entrega
  // `query.status` como array em vez de string. A nossa é sempre a primeira
  // (vem do back_url original, antes do MP appendar as dele).
  const rawStatus = query?.status;
  const firstStatus = Array.isArray(rawStatus) ? rawStatus[0] : rawStatus;
  const checkoutStatus: CheckoutStatus | null =
    firstStatus === "success" || firstStatus === "failure" ? firstStatus : null;

  const api = new Api();

  let registration: IRegistrationSearchResult | null = null;
  try {
    const results = await api.searchRegistrations({ code });
    registration =
      results.find((r) => r.code === code) || results[0] || null;
  } catch (error) {
    registration = null;
  }

  // O uuid do evento vem no retorno da busca por código; buscamos o detalhe
  // completo (faqs, responsáveis etc.) a partir dele.
  const eventUuid = registration?.event?.uuid;
  let event: IEventDetail | null = null;
  if (eventUuid) {
    try {
      event = await api.getEvent(eventUuid);
    } catch (error) {
      event = null;
    }
  }

  return { props: { code, registration, event, checkoutStatus } };
};

export default TrackingPage;
