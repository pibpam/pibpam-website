import React, { useContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  FiCalendar,
  FiCheck,
  FiCreditCard,
  FiDollarSign,
  FiMapPin,
  FiPlus,
  FiSearch,
  FiShoppingCart,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import { FaPix } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import styles from "../../styles/Inscription.module.scss";
import SecondaryButton from "../Button/Secondary";
import ThirdButton from "../Button/Third";
import CheckRegistrationSheet from "../CheckRegistrationSheet";
import { DateUtils } from "../../utils/Date";
import StringUtils from "../../utils/StringUtils";
import { ApiLocal } from "../../services/apiLocal";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { UserContext } from "../../contexts/user";
import { PostMessageContext } from "../../contexts/postMessage";
import {
  IEventAddon,
  IEventCustomField,
  IEventDetail,
  IEventProduct,
} from "../../interfaces/Event";

const paymentIcon = (type: string) => {
  switch (type) {
    case "PIX":
      return <FaPix />;
    case "CASH":
      return <FiDollarSign />;
    case "MERCADO_PAGO":
      return <FiShoppingCart />;
    case "CARD":
    default:
      return <FiCreditCard />;
  }
};

interface IInscriptionFlowProps {
  event: IEventDetail;
}

type Role = "responsible" | "participant_adult" | "participant_minor";

interface ResponsibleForm {
  name: string;
  email: string;
  phone: string;
}

interface ParticipantForm {
  id: string;
  name: string;
  phone: string;
  birthDate: string;
  // Dados do responsável pelo menor (quando role = participant_minor).
  guardianName: string;
  guardianPhone: string;
  customFields: Record<string, string>;
  addonUuid?: string;
  productUuid?: string;
  productVariation?: string;
}

const toNumber = (value?: number | string | null) => {
  const n = typeof value === "string" ? parseFloat(value) : value;
  return Number.isFinite(n as number) ? (n as number) : 0;
};

const formatPrice = (price?: number | string | null) => {
  const value = toNumber(price);
  if (value === 0) {
    return "Gratuito";
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const emptyParticipant = (): ParticipantForm => ({
  id: uuidv4(),
  name: "",
  phone: "",
  birthDate: "",
  guardianName: "",
  guardianPhone: "",
  customFields: {},
});

const InscriptionFlow: React.FC<IInscriptionFlowProps> = ({ event }) => {
  const { user } = useContext(UserContext);
  const { deviceInfo } = useContext(PostMessageContext);
  const { goTo } = useAppNavigation();
  // Espaço para o stepper ficar abaixo do header (fixo) do app.
  const topOffset = (deviceInfo?.top || 0) + 80;
  const hasBatch = !!event.activeBatch;
  const registrationClosed = !hasBatch || event.soldOut;

  // Steps são dinâmicos: a etapa de "papel" só existe em eventos para menores.
  const steps = useMemo(() => {
    const base = ["details"];
    if (event.forMinors) base.push("role");
    return [...base, "responsible", "participants", "payment", "review"];
  }, [event.forMinors]);

  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [checkOpen, setCheckOpen] = useState(false);

  const [role, setRole] = useState<Role | null>(
    event.forMinors ? null : "responsible"
  );
  const [responsible, setResponsible] = useState<ResponsibleForm>({
    name: "",
    email: "",
    phone: "",
  });
  const [participants, setParticipants] = useState<ParticipantForm[]>([
    emptyParticipant(),
  ]);
  const [paymentMethodUuid, setPaymentMethodUuid] = useState<string | null>(
    null
  );
  const [installments, setInstallments] = useState(1);

  const currentStep = steps[stepIndex];

  const isMinorParticipant = role === "participant_minor";

  // Quando o cadastro é do próprio participante MAIOR de idade, o primeiro
  // participante é a mesma pessoa do responsável financeiro — reusamos nome e
  // telefone dela em vez de pedir de novo.
  const isSelfParticipant = (index: number) =>
    role === "participant_adult" && index === 0;

  // Participante menor de idade: só um participante, sem adicionar outros.
  const canAddParticipants = !isMinorParticipant;

  const productsByUuid = useMemo(() => {
    const map: Record<string, IEventProduct> = {};
    event.products.forEach((p) => (map[p.uuid] = p));
    return map;
  }, [event.products]);

  const addonsByUuid = useMemo(() => {
    const map: Record<string, IEventAddon> = {};
    event.addons?.forEach((a) => (map[a.uuid] = a));
    return map;
  }, [event.addons]);

  const selectedPayment = useMemo(
    () => event.paymentMethods.find((m) => m.uuid === paymentMethodUuid),
    [event.paymentMethods, paymentMethodUuid]
  );

  // ---- totais ----
  const basePrice = toNumber(event.activeBatch?.price);
  const productsTotal = participants.reduce((acc, p) => {
    const product = p.productUuid ? productsByUuid[p.productUuid] : undefined;
    return acc + toNumber(product?.price);
  }, 0);
  const addonsTotal = participants.reduce((acc, p) => {
    const addon = p.addonUuid ? addonsByUuid[p.addonUuid] : undefined;
    return acc + toNumber(addon?.price);
  }, 0);
  const subtotal =
    basePrice * participants.length + productsTotal + addonsTotal;
  const fee = useMemo(() => {
    if (!selectedPayment) return 0;
    if (selectedPayment.feeType === "percent") {
      return (subtotal * toNumber(selectedPayment.feeValue)) / 100;
    }
    if (selectedPayment.feeType === "fixed") {
      return toNumber(selectedPayment.feeValue);
    }
    return 0;
  }, [selectedPayment, subtotal]);
  const total = subtotal + fee;

  // ---- validação por etapa ----
  const validateStep = (): string | null => {
    switch (currentStep) {
      case "role":
        if (!role) return "Selecione se você é o responsável ou participante.";
        return null;
      case "responsible": {
        const { name, email, phone } = responsible;
        if (!name.trim()) return "Informe o nome do responsável financeiro.";
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          return "Informe um e-mail válido.";
        if (!phone.trim()) return "Informe o telefone.";
        return null;
      }
      case "participants": {
        if (!participants.length) return "Adicione ao menos um participante.";
        for (let i = 0; i < participants.length; i++) {
          const p = participants[i];
          if (!isSelfParticipant(i) && !p.name.trim())
            return `Participante ${i + 1}: informe o nome.`;
          if (!p.birthDate)
            return `Participante ${i + 1}: informe a data de nascimento.`;
          if (isMinorParticipant) {
            if (!p.guardianName.trim())
              return "Informe o nome do responsável pelo menor.";
            if (!p.guardianPhone.trim())
              return "Informe o telefone do responsável pelo menor.";
            const sameName =
              p.guardianName.trim().toLowerCase() ===
              responsible.name.trim().toLowerCase();
            const samePhone =
              p.guardianPhone.replace(/\D/g, "") ===
              responsible.phone.replace(/\D/g, "");
            if (sameName && samePhone)
              return "O responsável pelo menor deve ser diferente do responsável financeiro.";
          }
          for (const field of event.customFields) {
            if (field.required && !p.customFields[field.uuid]?.trim()) {
              return `Participante ${i + 1}: preencha "${field.label}".`;
            }
          }
          if (event.addons?.length && !p.addonUuid) {
            return `Participante ${i + 1}: selecione um adicional.`;
          }
          if (event.products.length && !p.productUuid) {
            return `Participante ${i + 1}: selecione um produto.`;
          }
          const product = p.productUuid
            ? productsByUuid[p.productUuid]
            : undefined;
          if (product?.hasVariation && !p.productVariation) {
            return `Participante ${i + 1}: selecione a variação de "${
              product.name
            }".`;
          }
        }
        return null;
      }
      case "payment":
        if (!paymentMethodUuid) return "Selecione uma forma de pagamento.";
        return null;
      default:
        return null;
    }
  };

  const goNext = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setDirection(1);
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  const goBack = () => {
    setError(null);
    setDirection(-1);
    setStepIndex((i) => Math.max(i - 1, 0));
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const apiLocal = new ApiLocal();
      const response = await apiLocal.createRegistration(event.uuid, {
        memberUuid: user?.member?.uuid,
        responsibleName: responsible.name,
        responsiblePhone: responsible.phone,
        responsibleEmail: responsible.email,
        paymentMethodUuid: paymentMethodUuid || "",
        installmentsCount: installments,
        participants: participants.map((p, index) => ({
          // Participante que é o próprio financeiro reaproveita nome/telefone.
          name: isSelfParticipant(index) ? responsible.name : p.name,
          phone: isSelfParticipant(index) ? responsible.phone : p.phone,
          birthDate: p.birthDate,
          // Menor: responsável informado no participante (≠ financeiro).
          // Demais casos: o próprio responsável financeiro.
          responsibleName: isMinorParticipant
            ? p.guardianName
            : responsible.name,
          responsiblePhone: isMinorParticipant
            ? p.guardianPhone
            : responsible.phone,
          addonUuid: p.addonUuid,
          products: p.productUuid
            ? [
                {
                  productUuid: p.productUuid,
                  variation: p.productVariation || "",
                },
              ]
            : [],
          customFieldValues: Object.entries(p.customFields).map(
            ([customFieldUuid, value]) => ({ customFieldUuid, value })
          ),
        })),
      });

      // Checkout Pro (MERCADO_PAGO): redireciona para a URL de pagamento.
      if (response?.paymentUrl && typeof window !== "undefined") {
        window.location.href = response.paymentUrl;
        return;
      }

      // Sucesso: manda o usuário direto para o acompanhamento da inscrição.
      await goTo({
        pathname: `/inscricoes/acompanhamento/${response?.code || ""}`,
        showLoading: true,
      });
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Não foi possível concluir a inscrição. Tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ---- participantes ----
  const updateParticipant = (id: string, patch: Partial<ParticipantForm>) => {
    setParticipants((state) =>
      state.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  };

  const updateCustomField = (id: string, fieldUuid: string, value: string) => {
    setParticipants((state) =>
      state.map((p) =>
        p.id === id
          ? { ...p, customFields: { ...p.customFields, [fieldUuid]: value } }
          : p
      )
    );
  };

  const addParticipant = () =>
    setParticipants((state) =>
      canAddParticipants ? [...state, emptyParticipant()] : state
    );

  const removeParticipant = (id: string) =>
    setParticipants((state) =>
      state.length > 1 ? state.filter((p) => p.id !== id) : state
    );

  const renderCustomField = (
    participant: ParticipantForm,
    field: IEventCustomField
  ) => {
    const value = participant.customFields[field.uuid] || "";
    const onChange = (v: string) =>
      updateCustomField(participant.id, field.uuid, v);
    const options = field.options || [];

    return (
      <div className={styles.field} key={field.uuid}>
        <label>
          {field.label}
          {field.required && <span className={styles.required}> *</span>}
        </label>
        {options.length > 0 ? (
          <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">Selecione...</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : field.type === "textarea" ? (
          <textarea value={value} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <input
            type={
              field.type === "number"
                ? "number"
                : field.type === "date"
                ? "date"
                : "text"
            }
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
    );
  };

  return (
    <div
      className={styles.flow}
      style={{
        paddingTop: topOffset,
        minHeight: `calc(100vh - ${topOffset + 40}px)`,
      }}
    >
      <div className={styles.stepper} style={{ top: topOffset }}>
        <div className={styles.progress}>
          {steps.map((s, i) => (
            <div
              key={s}
              className={`${styles.progress__step} ${
                i === stepIndex
                  ? styles.progress__step_active
                  : i < stepIndex
                  ? styles.progress__step_done
                  : ""
              }`}
            />
          ))}
        </div>
        <span className={styles.stepper__label}>
          Passo {stepIndex + 1} de {steps.length}
        </span>
      </div>

      <div className={styles.stepViewport}>
        <div
          key={currentStep}
          className={`${styles.step} ${
            stepIndex === 0
              ? ""
              : direction > 0
              ? styles.step_forward
              : styles.step_back
          }`}
        >

      {/* ---------- ETAPA: detalhes do evento ---------- */}
      {currentStep === "details" && (
        <div>
          {event.image && (
            <div
              className={styles.hero}
              style={{ backgroundImage: `url('${event.image}')` }}
            />
          )}
          <h1 className={styles.event__name}>{event.name}</h1>
          <div className={styles.event__meta}>
            {event.startDate && (
              <span>
                <FiCalendar />
                {DateUtils.formatDateDefault(event.startDate)}
                {event.endDate ? ` até ${DateUtils.formatDateDefault(
                  event.endDate
                )}` : ""}
              </span>
            )}
            {event.location && (
              <span>
                <FiMapPin />
                {event.location}
              </span>
            )}
          </div>

          <div className={styles.check__registration}>
            <span>Já se inscreveu neste evento?</span>
            <button
              type="button"
              className={styles.check__registration_link}
              onClick={() => setCheckOpen(true)}
            >
              <FiSearch /> Verificar inscrição
            </button>
          </div>

          {(event.descriptionHtml || event.description) && (
            <div
              className={styles.event__description}
              dangerouslySetInnerHTML={{
                __html: event.descriptionHtml || event.description || "",
              }}
            />
          )}
          {registrationClosed && (
            <div className={styles.closed}>
              {event.soldOut
                ? "As vagas para este evento estão esgotadas."
                : "As inscrições para este evento não estão disponíveis no momento."}
            </div>
          )}
        </div>
      )}

      {/* ---------- ETAPA: papel (eventos para menores) ---------- */}
      {currentStep === "role" && (
        <div>
          <h2 className={styles.step__title}>Quem está se inscrevendo?</h2>
          <p className={styles.step__subtitle}>
            Evento para menores de idade. Para inscrever menores, escolha
            &quot;Sou o responsável&quot;.
          </p>
          <div className={styles.choices}>
            <button
              type="button"
              className={`${styles.choice} ${
                role === "responsible" ? styles.choice__selected : ""
              }`}
              onClick={() => setRole("responsible")}
            >
              <span className={styles.choice__title}>Sou o responsável</span>
              <span className={styles.choice__desc}>
                Vou inscrever um ou mais menores sob minha responsabilidade.
              </span>
            </button>
            <button
              type="button"
              className={`${styles.choice} ${
                role === "participant_adult" ? styles.choice__selected : ""
              }`}
              onClick={() => setRole("participant_adult")}
            >
              <span className={styles.choice__title}>
                Sou participante · maior de idade
              </span>
              <span className={styles.choice__desc}>
                Vou participar do evento e tenho mais de 18 anos.
              </span>
            </button>
            <button
              type="button"
              className={`${styles.choice} ${
                role === "participant_minor" ? styles.choice__selected : ""
              }`}
              onClick={() => {
                setRole("participant_minor");
                // Menor: apenas um participante.
                setParticipants((state) => state.slice(0, 1));
              }}
            >
              <span className={styles.choice__title}>
                Sou participante · menor de idade
              </span>
              <span className={styles.choice__desc}>
                Vou participar do evento e tenho menos de 18 anos.
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ---------- ETAPA: responsável financeiro ---------- */}
      {currentStep === "responsible" && (
        <div>
          <h2 className={styles.step__title}>Responsável financeiro</h2>
          <p className={styles.step__subtitle}>
            Dados de quem ficará responsável pelo pagamento da inscrição.
          </p>
          <div className={styles.form}>
            <div className={styles.field}>
              <label>
                Nome completo<span className={styles.required}> *</span>
              </label>
              <input
                value={responsible.name}
                onChange={(e) =>
                  setResponsible({ ...responsible, name: e.target.value })
                }
              />
            </div>
            <div className={styles.field}>
              <label>
                E-mail<span className={styles.required}> *</span>
              </label>
              <input
                type="email"
                value={responsible.email}
                onChange={(e) =>
                  setResponsible({ ...responsible, email: e.target.value })
                }
              />
            </div>
            <div className={styles.field}>
              <label>
                Telefone<span className={styles.required}> *</span>
              </label>
              <input
                type="tel"
                inputMode="tel"
                placeholder="(31) 99999-9999"
                value={responsible.phone}
                onChange={(e) =>
                  setResponsible({
                    ...responsible,
                    phone: StringUtils.maskPhone(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* ---------- ETAPA: participantes ---------- */}
      {currentStep === "participants" && (
        <div>
          <h2 className={styles.step__title}>
            {isMinorParticipant ? "Participante" : "Participantes"}
          </h2>
          <p className={styles.step__subtitle}>
            {isMinorParticipant
              ? "Preencha os dados do participante e do responsável."
              : "Preencha os dados de cada participante e escolha o adicional."}
          </p>
          {participants.map((p, index) => (
            <div className={styles.participant} key={p.id}>
              <div className={styles.participant__head}>
                <strong>
                  <FiUser />{" "}
                  {isMinorParticipant ? "Participante" : `Participante ${index + 1}`}
                </strong>
                {participants.length > 1 && (
                  <button
                    type="button"
                    className={styles.participant__remove}
                    onClick={() => removeParticipant(p.id)}
                  >
                    <FiTrash2 /> remover
                  </button>
                )}
              </div>

              <div className={styles.form}>
                {isSelfParticipant(index) ? (
                  <div className={styles.self__note}>
                    Usaremos seu nome e telefone informados no responsável
                    financeiro.
                  </div>
                ) : (
                  <div className={styles.field}>
                    <label>
                      Nome completo<span className={styles.required}> *</span>
                    </label>
                    <input
                      value={p.name}
                      onChange={(e) =>
                        updateParticipant(p.id, { name: e.target.value })
                      }
                    />
                  </div>
                )}
                <div className={styles.field}>
                  <label>
                    Data de nascimento
                    <span className={styles.required}> *</span>
                  </label>
                  <input
                    type="date"
                    value={p.birthDate}
                    onChange={(e) =>
                      updateParticipant(p.id, { birthDate: e.target.value })
                    }
                  />
                </div>
                {!isSelfParticipant(index) && (
                  <div className={styles.field}>
                    <label>Telefone</label>
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder="(31) 99999-9999"
                      value={p.phone}
                      onChange={(e) =>
                        updateParticipant(p.id, {
                          phone: StringUtils.maskPhone(e.target.value),
                        })
                      }
                    />
                  </div>
                )}
                {event.customFields
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((field) => renderCustomField(p, field))}

                {isMinorParticipant && (
                  <>
                    <p className={styles.section__label}>
                      Responsável pelo menor
                    </p>
                    <div className={styles.field}>
                      <label>
                        Nome do responsável
                        <span className={styles.required}> *</span>
                      </label>
                      <input
                        value={p.guardianName}
                        onChange={(e) =>
                          updateParticipant(p.id, {
                            guardianName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className={styles.field}>
                      <label>
                        Telefone do responsável
                        <span className={styles.required}> *</span>
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        placeholder="(31) 99999-9999"
                        value={p.guardianPhone}
                        onChange={(e) =>
                          updateParticipant(p.id, {
                            guardianPhone: StringUtils.maskPhone(e.target.value),
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </div>

              {!!event.addons?.length && (
                <>
                  <p className={styles.section__label}>
                    Adicional<span className={styles.required}> *</span>
                  </p>
                  <div className={styles.choices}>
                    {event.addons.map((addon) => {
                      const selected = p.addonUuid === addon.uuid;
                      const disabled = addon.soldOut || !addon.active;
                      return (
                        <button
                          key={addon.uuid}
                          type="button"
                          disabled={disabled}
                          className={`${styles.addon} ${
                            selected ? styles.addon__selected : ""
                          } ${disabled ? styles.addon__disabled : ""}`}
                          onClick={() =>
                            updateParticipant(p.id, { addonUuid: addon.uuid })
                          }
                        >
                          {addon.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={addon.image}
                              alt={addon.name}
                              className={styles.addon__img}
                            />
                          )}
                          <span className={styles.addon__info}>
                            <span className={styles.addon__name}>
                              {addon.name}
                            </span>
                            {addon.description && (
                              <span className={styles.addon__desc}>
                                {addon.description}
                              </span>
                            )}
                            <span className={styles.addon__meta}>
                              <span className={styles.choice__price}>
                                {formatPrice(addon.price)}
                              </span>
                              {disabled ? (
                                <span className={styles.addon__soldout}>
                                  Esgotado
                                </span>
                              ) : (
                                addon.available !== null && (
                                  <span className={styles.addon__avail}>
                                    {addon.available} disponíveis
                                  </span>
                                )
                              )}
                            </span>
                          </span>
                          {selected && (
                            <FiCheck className={styles.addon__check} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {event.products.length > 0 && (
                <>
                  <p className={styles.section__label}>Produtos</p>
                  <div className={styles.choices}>
                    {event.products.map((product) => {
                      const selected = p.productUuid === product.uuid;
                      return (
                        <div key={product.uuid}>
                          <button
                            type="button"
                            className={`${styles.choice} ${
                              selected ? styles.choice__selected : ""
                            }`}
                            onClick={() =>
                              updateParticipant(p.id, {
                                productUuid: product.uuid,
                                productVariation: undefined,
                              })
                            }
                          >
                            <span className={styles.choice__title}>
                              {product.name}
                              <span className={styles.choice__price}>
                                {formatPrice(product.price)}
                              </span>
                            </span>
                          </button>
                          {selected && product.hasVariation && (
                            <div
                              className={styles.field}
                              style={{ marginTop: 8 }}
                            >
                              <label>Variação</label>
                              <select
                                value={p.productVariation || ""}
                                onChange={(e) =>
                                  updateParticipant(p.id, {
                                    productVariation: e.target.value,
                                  })
                                }
                              >
                                <option value="">Selecione...</option>
                                {product.variations.map((v) => (
                                  <option key={v} value={v}>
                                    {v}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ))}

          {canAddParticipants && (
            <button
              type="button"
              className={styles.add__participant}
              onClick={addParticipant}
            >
              <FiPlus /> Adicionar participante
            </button>
          )}
        </div>
      )}

      {/* ---------- ETAPA: pagamento ---------- */}
      {currentStep === "payment" && (
        <div>
          <h2 className={styles.step__title}>Forma de pagamento</h2>
          <p className={styles.step__subtitle}>
            Escolha como deseja pagar a inscrição.
          </p>
          <div className={styles.choices}>
            {event.paymentMethods.map((method) => {
              const selected = paymentMethodUuid === method.uuid;
              return (
                <div key={method.uuid}>
                  <button
                    type="button"
                    className={`${styles.choice} ${
                      selected ? styles.choice__selected : ""
                    }`}
                    onClick={() => setPaymentMethodUuid(method.uuid)}
                  >
                    <span className={styles.choice__title}>
                      <span className={styles.payment__label}>
                        <span className={styles.payment__icon}>
                          {paymentIcon(method.type)}
                        </span>
                        {method.label}
                      </span>
                    </span>
                    {method.feeType !== "none" && +method.feeValue > 0 && (
                      <span className={styles.choice__desc}>
                        Taxa:{" "}
                        {method.feeType === "percent"
                          ? `${toNumber(method.feeValue)}%`
                          : formatPrice(method.feeValue)}
                      </span>
                    )}
                  </button>

                  {selected && method.maxInstallments > 1 && (
                    <div className={styles.field} style={{ marginTop: 8 }}>
                      <label>Parcelas</label>
                      <select
                        value={installments}
                        onChange={(e) =>
                          setInstallments(Number(e.target.value))
                        }
                      >
                        {Array.from(
                          { length: method.maxInstallments },
                          (_, i) => i + 1
                        ).map((n) => (
                          <option key={n} value={n}>
                            {n}x
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------- ETAPA: revisão ---------- */}
      {currentStep === "review" && (
        <div>
          <h2 className={styles.step__title}>Revise sua inscrição</h2>
          <p className={styles.step__subtitle}>
            Confira os dados antes de confirmar.
          </p>
          <div className={styles.summary}>
            <div className={styles.summary__row}>
              <span>Evento</span>
              <strong>{event.name}</strong>
            </div>
            <div className={styles.summary__row}>
              <span>Responsável</span>
              <span>{responsible.name}</span>
            </div>
            <div className={styles.summary__row}>
              <span>Participantes</span>
              <span>{participants.length}</span>
            </div>
            {event.activeBatch && (
              <div className={styles.summary__row}>
                <span>
                  {event.activeBatch.name} ({participants.length}x)
                </span>
                <span>{formatPrice(basePrice * participants.length)}</span>
              </div>
            )}
            {addonsTotal > 0 && (
              <div className={styles.summary__row}>
                <span>Adicionais</span>
                <span>{formatPrice(addonsTotal)}</span>
              </div>
            )}
            {productsTotal > 0 && (
              <div className={styles.summary__row}>
                <span>Produtos</span>
                <span>{formatPrice(productsTotal)}</span>
              </div>
            )}
            {fee > 0 && (
              <div className={styles.summary__row}>
                <span>Taxa ({selectedPayment?.label})</span>
                <span>{formatPrice(fee)}</span>
              </div>
            )}
            <div className={styles.summary__total}>
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          {selectedPayment && (
            <div className={styles.summary}>
              <div className={styles.summary__row}>
                <span>Pagamento</span>
                <span>
                  {selectedPayment.label}
                  {selectedPayment.maxInstallments > 1
                    ? ` · ${installments}x`
                    : ""}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.nav}>
        {stepIndex > 0 && (
          <ThirdButton onClick={goBack} text="Voltar" />
        )}
        {currentStep === "review" ? (
          <SecondaryButton onClick={handleSubmit} disabled={submitting}>
            {submitting ? (
              <ImSpinner2 className={styles.spinner} />
            ) : (
              <>Confirmar inscrição</>
            )}
          </SecondaryButton>
        ) : (
          !(currentStep === "details" && registrationClosed) && (
            <SecondaryButton onClick={goNext}>
              <>Continuar</>
            </SecondaryButton>
          )
        )}
      </div>

      <CheckRegistrationSheet
        open={checkOpen}
        onClose={() => setCheckOpen(false)}
      />
    </div>
  );
};

export default InscriptionFlow;
