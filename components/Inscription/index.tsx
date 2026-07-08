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
  FiShoppingBag,
  FiShoppingCart,
  FiSmile,
  FiTrash2,
  FiUser,
  FiUserCheck,
} from "react-icons/fi";
import { FaPix } from "react-icons/fa6";
import {
  Addon,
  AddonAvail,
  AddonCheck,
  AddonDesc,
  AddonGroups,
  AddonImg,
  AddonImgPlaceholder,
  AddonInfo,
  AddonMeta,
  AddonName,
  AddonSoldout,
  AddonToggle,
  AddParticipantBtn,
  Choice,
  ChoiceBody,
  ChoiceDesc,
  Choices,
  ChoicePrice,
  ChoiceRow,
  ChoiceTitle,
  CheckRegistration,
  CheckRegistrationLink,
  DetailsExtra,
  EventDescription,
  EventMeta,
  Field,
  Flow,
  Form,
  Hero,
  Nav,
  Participant,
  ParticipantHead,
  ParticipantRemove,
  PaymentIcon,
  PaymentLabel,
  Progress,
  ProgressStep,
  Required,
  SelfNote,
  Spinner,
  Step,
  StepTitle,
  StepSubtitle,
  Stepper,
  StepperLabel,
  StepViewport,
} from "./styles";
import InscriptionResponsibles from "./Responsibles";
import InscriptionFaqs from "./Faqs";
import Toast from "../Toast";
import { Closed, EventName, SectionLabel, Summary, SummaryRow, SummaryTotal } from "../../styles/Inscription";
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
  IEventAddonGroup,
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
  // Adicionais selecionados por grupo: groupUuid -> addonUuid[].
  selections: Record<string, string[]>;
  // Produtos comprados: productUuid -> variação escolhida ("" se não se aplica).
  products: Record<string, string>;
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
  selections: {},
  products: {},
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
    event.addonGroups?.forEach((group) =>
      group.addons.forEach((a) => (map[a.uuid] = a))
    );
    return map;
  }, [event.addonGroups]);

  const selectedPayment = useMemo(
    () => event.paymentMethods.find((m) => m.uuid === paymentMethodUuid),
    [event.paymentMethods, paymentMethodUuid]
  );

  // ---- totais ----
  const basePrice = toNumber(event.activeBatch?.price);
  const productsTotal = participants.reduce((acc, p) => {
    const uuids = Object.keys(p.products);
    return (
      acc +
      uuids.reduce((a, uuid) => a + toNumber(productsByUuid[uuid]?.price), 0)
    );
  }, 0);
  const addonsTotal = participants.reduce((acc, p) => {
    const selectedUuids = Object.values(p.selections).flat();
    return (
      acc +
      selectedUuids.reduce(
        (a, uuid) => a + toNumber(addonsByUuid[uuid]?.price),
        0
      )
    );
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
          if (p.birthDate.length < 10)
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
          for (const group of event.addonGroups || []) {
            const selected = p.selections[group.uuid] || [];
            if (
              selected.length < group.minSelection ||
              selected.length > group.maxSelection
            ) {
              return `Participante ${i + 1}: selecione entre ${
                group.minSelection
              } e ${group.maxSelection} adicional(is) do grupo "${
                group.title
              }".`;
            }
          }
          for (const [productUuid, variation] of Object.entries(
            p.products
          )) {
            const product = productsByUuid[productUuid];
            if (product?.hasVariation && !variation) {
              return `Participante ${i + 1}: selecione a variação de "${
                product.name
              }".`;
            }
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
          birthDate: DateUtils.parseBRDateToISO(p.birthDate),
          // Menor: responsável informado no participante (≠ financeiro).
          // Demais casos: o próprio responsável financeiro.
          responsibleName: isMinorParticipant
            ? p.guardianName
            : responsible.name,
          responsiblePhone: isMinorParticipant
            ? p.guardianPhone
            : responsible.phone,
          selections: Object.entries(p.selections).flatMap(
            ([groupUuid, addonUuids]) =>
              addonUuids.map((addonUuid) => ({ groupUuid, addonUuid }))
          ),
          products: Object.entries(p.products).map(
            ([productUuid, variation]) => ({ productUuid, variation })
          ),
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
      // O uuid do evento vai na query para a tela de acompanhamento poder
      // buscar os dados do evento (responsáveis, faqs).
      await goTo({
        pathname: `/inscricoes/acompanhamento/${response?.code || ""}`,
        query: { event: event.uuid },
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

  const toggleAddon = (
    id: string,
    group: IEventAddonGroup,
    addonUuid: string
  ) => {
    setParticipants((state) =>
      state.map((p) => {
        if (p.id !== id) return p;
        const current = p.selections[group.uuid] || [];
        let next: string[];
        if (current.includes(addonUuid)) {
          next = current.filter((u) => u !== addonUuid);
        } else if (group.maxSelection <= 1) {
          next = [addonUuid];
        } else if (current.length >= group.maxSelection) {
          next = current;
        } else {
          next = [...current, addonUuid];
        }
        return { ...p, selections: { ...p.selections, [group.uuid]: next } };
      })
    );
  };

  const toggleProduct = (id: string, productUuid: string) => {
    setParticipants((state) =>
      state.map((p) => {
        if (p.id !== id) return p;
        const next = { ...p.products };
        if (productUuid in next) {
          delete next[productUuid];
        } else {
          next[productUuid] = "";
        }
        return { ...p, products: next };
      })
    );
  };

  const updateProductVariation = (
    id: string,
    productUuid: string,
    variation: string
  ) => {
    setParticipants((state) =>
      state.map((p) =>
        p.id === id
          ? { ...p, products: { ...p.products, [productUuid]: variation } }
          : p
      )
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
      <Field key={field.uuid}>
        <label>
          {field.label}
          {field.required && <Required> *</Required>}
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
      </Field>
    );
  };

  return (
    <Flow
      style={{
        paddingTop: topOffset,
        minHeight: `calc(100vh - ${topOffset + 40}px)`,
      }}
    >
      <Stepper style={{ top: topOffset }}>
        <Progress>
          {steps.map((s, i) => (
            <ProgressStep
              key={s}
              $active={i === stepIndex}
              $done={i < stepIndex}
            />
          ))}
        </Progress>
        <StepperLabel>
          Passo {stepIndex + 1} de {steps.length}
        </StepperLabel>
      </Stepper>

      <StepViewport>
        <Step
          key={currentStep}
          $direction={stepIndex === 0 ? undefined : direction > 0 ? "forward" : "back"}
        >

      {/* ---------- ETAPA: detalhes do evento ---------- */}
      {currentStep === "details" && (
        <div>
          {event.image && (
            <Hero style={{ backgroundImage: `url('${event.image}')` }} />
          )}
          <EventName>{event.name}</EventName>
          <EventMeta>
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
          </EventMeta>

          <CheckRegistration>
            <span>Já se inscreveu neste evento?</span>
            <CheckRegistrationLink
              type="button"
              onClick={() => setCheckOpen(true)}
            >
              <FiSearch /> Verificar inscrição
            </CheckRegistrationLink>
          </CheckRegistration>

          {(event.descriptionHtml || event.description) && (
            <EventDescription
              dangerouslySetInnerHTML={{
                __html: event.descriptionHtml || event.description || "",
              }}
            />
          )}
          {registrationClosed && (
            <Closed>
              {event.soldOut
                ? "As vagas para este evento estão esgotadas."
                : "As inscrições para este evento não estão disponíveis no momento."}
            </Closed>
          )}
        </div>
      )}

      {/* ---------- ETAPA: papel (eventos para menores) ---------- */}
      {currentStep === "role" && (
        <div>
          <StepTitle>Quem está se inscrevendo?</StepTitle>
          <StepSubtitle>
            Evento para menores de idade. Para inscrever menores, escolha
            &quot;Sou o responsável&quot;.
          </StepSubtitle>
          <Choices>
            <Choice
              type="button"
              $selected={role === "responsible"}
              onClick={() => setRole("responsible")}
            >
              <ChoiceRow>
                <PaymentIcon $selected={role === "responsible"}>
                  <FiUserCheck />
                </PaymentIcon>
                <ChoiceBody>
                  <ChoiceTitle>Sou o Responsável</ChoiceTitle>
                  <ChoiceDesc>
                    Vou inscrever um ou mais menores sob minha
                    responsabilidade.
                  </ChoiceDesc>
                </ChoiceBody>
              </ChoiceRow>
            </Choice>
            <Choice
              type="button"
              $selected={role === "participant_adult"}
              onClick={() => setRole("participant_adult")}
            >
              <ChoiceRow>
                <PaymentIcon $selected={role === "participant_adult"}>
                  <FiUser />
                </PaymentIcon>
                <ChoiceBody>
                  <ChoiceTitle>Sou Participante Maior de Idade</ChoiceTitle>
                  <ChoiceDesc>
                    Vou participar do evento e tenho mais de 18 anos.
                  </ChoiceDesc>
                </ChoiceBody>
              </ChoiceRow>
            </Choice>
            <Choice
              type="button"
              $selected={role === "participant_minor"}
              onClick={() => {
                setRole("participant_minor");
                // Menor: apenas um participante.
                setParticipants((state) => state.slice(0, 1));
              }}
            >
              <ChoiceRow>
                <PaymentIcon $selected={role === "participant_minor"}>
                  <FiSmile />
                </PaymentIcon>
                <ChoiceBody>
                  <ChoiceTitle>Sou Participante Menor de Idade</ChoiceTitle>
                  <ChoiceDesc>
                    Vou participar do evento e tenho menos de 18 anos.
                  </ChoiceDesc>
                </ChoiceBody>
              </ChoiceRow>
            </Choice>
          </Choices>
        </div>
      )}

      {/* ---------- ETAPA: responsável financeiro ---------- */}
      {currentStep === "responsible" && (
        <div>
          <StepTitle>Responsável financeiro</StepTitle>
          <StepSubtitle>
            Dados de quem ficará responsável pelo pagamento da inscrição.
          </StepSubtitle>
          <Form>
            <Field>
              <label>
                Nome completo<Required> *</Required>
              </label>
              <input
                value={responsible.name}
                onChange={(e) =>
                  setResponsible({ ...responsible, name: e.target.value })
                }
              />
            </Field>
            <Field>
              <label>
                E-mail<Required> *</Required>
              </label>
              <input
                type="email"
                value={responsible.email}
                onChange={(e) =>
                  setResponsible({ ...responsible, email: e.target.value })
                }
              />
            </Field>
            <Field>
              <label>
                Telefone<Required> *</Required>
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
            </Field>
          </Form>
        </div>
      )}

      {/* ---------- ETAPA: participantes ---------- */}
      {currentStep === "participants" && (
        <div>
          <StepTitle>
            {isMinorParticipant ? "Participante" : "Participantes"}
          </StepTitle>
          <StepSubtitle>
            {isMinorParticipant
              ? "Preencha os dados do participante e do responsável."
              : "Preencha os dados de cada participante e escolha o adicional."}
          </StepSubtitle>
          {participants.map((p, index) => (
            <Participant key={p.id}>
              <ParticipantHead>
                <strong>
                  <FiUser />{" "}
                  {isMinorParticipant ? "Participante" : `Participante ${index + 1}`}
                </strong>
                {participants.length > 1 && (
                  <ParticipantRemove
                    type="button"
                    onClick={() => removeParticipant(p.id)}
                  >
                    <FiTrash2 /> remover
                  </ParticipantRemove>
                )}
              </ParticipantHead>

              <Form>
                {isSelfParticipant(index) ? (
                  <SelfNote>
                    Usaremos seu nome e telefone informados no responsável
                    financeiro.
                  </SelfNote>
                ) : (
                  <Field>
                    <label>
                      Nome completo<Required> *</Required>
                    </label>
                    <input
                      value={p.name}
                      onChange={(e) =>
                        updateParticipant(p.id, { name: e.target.value })
                      }
                    />
                  </Field>
                )}
                <Field>
                  <label>
                    Data de nascimento
                    <Required> *</Required>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="DD/MM/AAAA"
                    value={p.birthDate}
                    onChange={(e) =>
                      updateParticipant(p.id, {
                        birthDate: StringUtils.maskDate(e.target.value),
                      })
                    }
                  />
                </Field>
                {!isSelfParticipant(index) && (
                  <Field>
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
                  </Field>
                )}
                {event.customFields
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((field) => renderCustomField(p, field))}

                {isMinorParticipant && (
                  <>
                    <SectionLabel>
                      Responsável pelo menor
                    </SectionLabel>
                    <Field>
                      <label>
                        Nome do responsável
                        <Required> *</Required>
                      </label>
                      <input
                        value={p.guardianName}
                        onChange={(e) =>
                          updateParticipant(p.id, {
                            guardianName: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field>
                      <label>
                        Telefone do responsável
                        <Required> *</Required>
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
                    </Field>
                  </>
                )}
              </Form>

              {!!event.addonGroups?.length && (
                <AddonGroups>
                  {event.addonGroups.map((group) => {
                    const selectedUuids = p.selections[group.uuid] || [];
                    return (
                      <React.Fragment key={group.uuid}>
                        <SectionLabel>
                          {group.title}
                          {group.minSelection > 0 && (
                            <Required> *</Required>
                          )}
                        </SectionLabel>
                        {group.description && (
                          <StepSubtitle>
                            {group.description}
                          </StepSubtitle>
                        )}
                        <Choices>
                          {group.addons.map((addon) => {
                            const selected = selectedUuids.includes(
                              addon.uuid
                            );
                            const disabled = addon.soldOut || !addon.active;
                            return (
                              <Addon
                                key={addon.uuid}
                                type="button"
                                disabled={disabled}
                                $selected={selected}
                                $disabled={disabled}
                                onClick={() =>
                                  toggleAddon(p.id, group, addon.uuid)
                                }
                              >
                                {addon.image && (
                                  <AddonImg
                                    src={addon.image}
                                    alt={addon.name}
                                  />
                                )}
                                <AddonInfo>
                                  <AddonName>
                                    {addon.name}
                                  </AddonName>
                                  {addon.description && (
                                    <AddonDesc>
                                      {addon.description}
                                    </AddonDesc>
                                  )}
                                  <AddonMeta>
                                    <ChoicePrice>
                                      {formatPrice(addon.price)}
                                    </ChoicePrice>
                                    {disabled ? (
                                      <AddonSoldout>
                                        Esgotado
                                      </AddonSoldout>
                                    ) : (
                                      addon.available !== null && (
                                        <AddonAvail>
                                          {addon.available} disponíveis
                                        </AddonAvail>
                                      )
                                    )}
                                  </AddonMeta>
                                </AddonInfo>
                                {selected && (
                                  <AddonCheck />
                                )}
                              </Addon>
                            );
                          })}
                        </Choices>
                      </React.Fragment>
                    );
                  })}
                </AddonGroups>
              )}

              {event.products.length > 0 && (
                <>
                  <SectionLabel>Produtos</SectionLabel>
                  <StepSubtitle>Selecione para adicionar</StepSubtitle>
                  <Choices>
                    {event.products.map((product) => {
                      const selected = product.uuid in p.products;
                      return (
                        <div key={product.uuid}>
                          <Addon
                            type="button"
                            $selected={selected}
                            onClick={() => toggleProduct(p.id, product.uuid)}
                          >
                            {product.imageUrl ? (
                              <AddonImg
                                src={product.imageUrl}
                                alt={product.name}
                              />
                            ) : (
                              <AddonImgPlaceholder>
                                <FiShoppingBag />
                              </AddonImgPlaceholder>
                            )}
                            <AddonInfo>
                              <AddonName>{product.name}</AddonName>
                              {product.description && (
                                <AddonDesc>{product.description}</AddonDesc>
                              )}
                              <AddonMeta>
                                <ChoicePrice>
                                  {formatPrice(product.price)}
                                </ChoicePrice>
                              </AddonMeta>
                            </AddonInfo>
                            <AddonToggle $selected={selected}>
                              {selected ? <FiCheck /> : <FiPlus />}
                            </AddonToggle>
                          </Addon>
                          {selected && product.hasVariation && (
                            <Field style={{ marginTop: 8 }}>
                              <label>Variação</label>
                              <select
                                value={p.products[product.uuid] || ""}
                                onChange={(e) =>
                                  updateProductVariation(
                                    p.id,
                                    product.uuid,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Selecione...</option>
                                {product.variations.map((v) => (
                                  <option key={v} value={v}>
                                    {v}
                                  </option>
                                ))}
                              </select>
                            </Field>
                          )}
                        </div>
                      );
                    })}
                  </Choices>
                </>
              )}
            </Participant>
          ))}

          {canAddParticipants && (
            <AddParticipantBtn
              type="button"
              onClick={addParticipant}
            >
              <FiPlus /> Adicionar participante
            </AddParticipantBtn>
          )}
        </div>
      )}

      {/* ---------- ETAPA: pagamento ---------- */}
      {currentStep === "payment" && (
        <div>
          <StepTitle>Forma de pagamento</StepTitle>
          <StepSubtitle>
            Escolha como deseja pagar a inscrição.
          </StepSubtitle>
          <Choices>
            {event.paymentMethods.map((method) => {
              const selected = paymentMethodUuid === method.uuid;
              return (
                <div key={method.uuid}>
                  <Choice
                    type="button"
                    $selected={selected}
                    onClick={() => setPaymentMethodUuid(method.uuid)}
                  >
                    <ChoiceTitle>
                      <PaymentLabel>
                        <PaymentIcon>
                          {paymentIcon(method.type)}
                        </PaymentIcon>
                        {method.label}
                      </PaymentLabel>
                    </ChoiceTitle>
                    {method.feeType !== "none" && +method.feeValue > 0 && (
                      <ChoiceDesc>
                        Taxa:{" "}
                        {method.feeType === "percent"
                          ? `${toNumber(method.feeValue)}%`
                          : formatPrice(method.feeValue)}
                      </ChoiceDesc>
                    )}
                  </Choice>

                  {selected && method.maxInstallments > 1 && (
                    <Field style={{ marginTop: 8 }}>
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
                    </Field>
                  )}
                </div>
              );
            })}
          </Choices>
        </div>
      )}

      {/* ---------- ETAPA: revisão ---------- */}
      {currentStep === "review" && (
        <div>
          <StepTitle>Revise sua inscrição</StepTitle>
          <StepSubtitle>
            Confira os dados antes de confirmar.
          </StepSubtitle>
          <Summary>
            <SummaryRow>
              <span>Evento</span>
              <strong>{event.name}</strong>
            </SummaryRow>
            <SummaryRow>
              <span>Responsável</span>
              <span>{responsible.name}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Participantes</span>
              <span>{participants.length}</span>
            </SummaryRow>
            {event.activeBatch && (
              <SummaryRow>
                <span>
                  {event.activeBatch.name} ({participants.length}x)
                </span>
                <span>{formatPrice(basePrice * participants.length)}</span>
              </SummaryRow>
            )}
            {addonsTotal > 0 && (
              <SummaryRow>
                <span>Adicionais</span>
                <span>{formatPrice(addonsTotal)}</span>
              </SummaryRow>
            )}
            {productsTotal > 0 && (
              <SummaryRow>
                <span>Produtos</span>
                <span>{formatPrice(productsTotal)}</span>
              </SummaryRow>
            )}
            {fee > 0 && (
              <SummaryRow>
                <span>Taxa ({selectedPayment?.label})</span>
                <span>{formatPrice(fee)}</span>
              </SummaryRow>
            )}
            <SummaryTotal>
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </SummaryTotal>
          </Summary>
          {selectedPayment && (
            <Summary>
              <SummaryRow>
                <span>Pagamento</span>
                <span>
                  {selectedPayment.label}
                  {selectedPayment.maxInstallments > 1
                    ? ` · ${installments}x`
                    : ""}
                </span>
              </SummaryRow>
            </Summary>
          )}
        </div>
      )}
        </Step>
      </StepViewport>

      {error && <Toast message={error} onClose={() => setError(null)} />}

      <Nav>
        {stepIndex > 0 && (
          <ThirdButton onClick={goBack} text="Voltar" />
        )}
        {currentStep === "review" ? (
          <SecondaryButton onClick={handleSubmit} disabled={submitting}>
            {submitting ? (
              <Spinner />
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
      </Nav>

      {currentStep === "details" && (
        <DetailsExtra>
          <InscriptionResponsibles
            responsibles={event.responsibles || []}
            eventName={event.name}
          />
          <InscriptionFaqs faqs={event.faqs || []} />
        </DetailsExtra>
      )}

      <CheckRegistrationSheet
        open={checkOpen}
        onClose={() => setCheckOpen(false)}
        eventUuid={event.uuid}
      />
    </Flow>
  );
};

export default InscriptionFlow;
