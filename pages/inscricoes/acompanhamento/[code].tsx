import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiCopy,
  FiCreditCard,
  FiDollarSign,
} from "react-icons/fi";
import { FaPix } from "react-icons/fa6";
import Website from "../../../layout/container/Website";
import Header from "../../../components/Header";
import HeaderContainer from "../../../components/HeaderContainer";
import PixPaymentSheet from "../../../components/PixPaymentSheet";
import styles from "../../../styles/Inscription.module.scss";
import useMenu from "../../../hooks/useMenu";
import useHeader from "../../../hooks/useHeader";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { DateUtils } from "../../../utils/Date";
import { Api } from "../../../services/api";
import {
  IRegistrationInstallment,
  IRegistrationSearchResult,
} from "../../../interfaces/Event";

interface ITrackingPage {
  code: string;
  registration: IRegistrationSearchResult | null;
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

const TrackingPage: NextPage<ITrackingPage> = ({ code, registration }) => {
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
        <main className={styles.page}>
          <div className={styles.wrapper} style={{ paddingTop: 96 }}>
            <h1 className={styles.event__name}>Acompanhamento</h1>

            <div className={styles.code__box} style={{ maxWidth: "100%" }}>
              <span className={styles.code__label}>Código da inscrição</span>
              <strong className={styles.code__value}>{code}</strong>
              {registration?.status && (
                <span
                  className={`${styles.track__badge} ${
                    styles[`track__badge_${registration.status}`] || ""
                  }`}
                >
                  {statusLabel(registration.status)}
                </span>
              )}
              <button
                type="button"
                className={styles.pix__copy}
                onClick={copyCode}
              >
                {codeCopied ? (
                  <>
                    <FiCheck /> Copiado!
                  </>
                ) : (
                  <>
                    <FiCopy /> Copiar código
                  </>
                )}
              </button>
            </div>

            {registration ? (
              <>
                {/* Resumo */}
                <div className={styles.summary} style={{ marginTop: 16 }}>
                  <div className={styles.summary__row}>
                    <span>Responsável</span>
                    <span>{registration.responsibleName}</span>
                  </div>
                  <div className={styles.summary__row}>
                    <span>E-mail</span>
                    <span>{registration.responsibleEmail}</span>
                  </div>
                  <div className={styles.summary__row}>
                    <span>Participantes</span>
                    <span>{registration.participants.length}</span>
                  </div>
                  {total && (
                    <div className={styles.summary__total}>
                      <span>Total</span>
                      <span>{total}</span>
                    </div>
                  )}
                </div>

                {registration.paymentUrl && (
                  <div
                    className={styles.success__actions}
                    style={{ maxWidth: "100%" }}
                  >
                    <button
                      type="button"
                      className={styles.cta__link}
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.location.href = registration.paymentUrl as string;
                        }
                      }}
                    >
                      Ir para o pagamento <FiArrowRight />
                    </button>
                  </div>
                )}

                {/* Participantes */}
                {!!registration.participants.length && (
                  <>
                    <p className={styles.section__label}>Participantes</p>
                    {registration.participants.map((p) => (
                      <div className={styles.track__item} key={p.uuid}>
                        <div className={styles.track__item_head}>
                          <strong>{p.name}</strong>
                          <span>{formatPrice(p.price)}</span>
                        </div>
                        {p.isMinor && p.responsibleName && (
                          <span className={styles.track__item_sub}>
                            Responsável: {p.responsibleName}
                            {p.responsiblePhone ? ` · ${p.responsiblePhone}` : ""}
                          </span>
                        )}
                        {p.addons.map((a) => (
                          <span className={styles.track__item_sub} key={a.uuid}>
                            Adicional: {a.addon.name}
                          </span>
                        ))}
                      </div>
                    ))}
                  </>
                )}

                {/* Parcelas */}
                {!!installments.length && (
                  <>
                    <p className={styles.section__label}>Parcelas</p>
                    {[...installments]
                      .sort((a, b) => a.number - b.number)
                      .map((inst) => {
                        const clickable = (isPix || isCash) && isPayable(inst);
                        return (
                          <div
                            className={`${styles.track__item} ${
                              clickable ? styles.track__item_clickable : ""
                            }`}
                            key={inst.uuid}
                            role={clickable ? "button" : undefined}
                            tabIndex={clickable ? 0 : undefined}
                            onClick={
                              clickable
                                ? () => setActiveInstallmentUuid(inst.uuid)
                                : undefined
                            }
                            onKeyDown={
                              clickable
                                ? (e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      setActiveInstallmentUuid(inst.uuid);
                                    }
                                  }
                                : undefined
                            }
                          >
                            <div className={styles.track__item_head}>
                              <div className={styles.track__item_title}>
                                <span
                                  className={`${styles.track__method_icon} ${
                                    clickable
                                      ? styles.track__method_icon_active
                                      : ""
                                  }`}
                                >
                                  {isPix ? (
                                    <FaPix />
                                  ) : isCash ? (
                                    <FiDollarSign />
                                  ) : (
                                    <FiCreditCard />
                                  )}
                                </span>
                                <strong>
                                  {registration.installmentsCount > 1
                                    ? `Parcela ${inst.number}/${registration.installmentsCount}`
                                    : "Pagamento"}
                                </strong>
                              </div>
                              <span>{formatPrice(inst.amount)}</span>
                            </div>
                            <span className={styles.track__item_sub}>
                              {inst.dueDate
                                ? `Vencimento: ${DateUtils.formatDateDefault(
                                    inst.dueDate
                                  )} · `
                                : ""}
                              {statusLabel(inst.status)}
                            </span>
                            {inst.proofUrl && (
                              <a
                                className={styles.track__proof}
                                href={inst.proofUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Ver comprovante
                              </a>
                            )}
                          </div>
                        );
                      })}
                  </>
                )}
              </>
            ) : (
              <div className={styles.closed} style={{ marginTop: 16 }}>
                Nenhuma inscrição encontrada para este código. Confira o código e
                tente novamente.
              </div>
            )}
          </div>
        </main>

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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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

  return { props: { code, registration } };
};

export default TrackingPage;
