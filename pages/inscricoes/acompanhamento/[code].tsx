import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { FiArrowRight, FiCheck, FiCopy } from "react-icons/fi";
import Website from "../../../layout/container/Website";
import Header from "../../../components/Header";
import HeaderContainer from "../../../components/HeaderContainer";
import PixPaymentSheet from "../../../components/PixPaymentSheet";
import ShareButton from "../../../components/ShareButton";
import InscriptionResponsibles from "../../../components/Inscription/Responsibles";
import InscriptionFaqs from "../../../components/Inscription/Faqs";
import { DetailsExtra } from "../../../components/Inscription/styles";
import { Closed, EventName, PixCopy, SectionLabel, Page, Summary, SummaryRow, SummaryTotal, Wrapper } from "../../../styles/Inscription";
import { CodeBox, CodeLabel, CodeValue, CtaLink, SuccessActions, TrackBadge } from "../../../styles/Tracking";
import ParticipantItem from "../../../container/Tracking/ParticipantItem";
import InstallmentItem from "../../../container/Tracking/InstallmentItem";
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
};

const statusLabel = (status?: string) => {
  if (!status) return "";
  return STATUS_LABELS[status] || status;
};

const TrackingPage: NextPage<ITrackingPage> = ({ code, registration, event }) => {
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

  const activeInstallment =
    installments.find((i) => i.uuid === activeInstallmentUuid) || null;

  const total = formatPrice(registration?.totalAmount);

  // Meio de pagamento vem direto na inscrição.
  const paymentMethod = registration?.paymentMethod || null;
  const isPix = paymentMethod?.type === "PIX";
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
                <TrackBadge $status={registration.status}>
                  {statusLabel(registration.status)}
                </TrackBadge>
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

                {registration.paymentUrl && (
                  <SuccessActions style={{ maxWidth: "100%" }}>
                    <CtaLink
                      type="button"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.location.href = registration.paymentUrl as string;
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
        />
      </>
    </Website>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  const code = params?.code;

  if (!code || typeof code !== "string") {
    return { notFound: true };
  }

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

  return { props: { code, registration, event } };
};

export default TrackingPage;
