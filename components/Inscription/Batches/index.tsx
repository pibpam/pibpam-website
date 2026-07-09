import React, { useState } from "react";
import { FiCheckCircle, FiChevronUp, FiClock, FiTag } from "react-icons/fi";
import { IEventBatch } from "../../../interfaces/Event";
import { DateUtils } from "../../../utils/Date";
import { SectionLabel } from "../../../styles/Inscription";
import Badge, { BadgeVariant } from "../../Badge";
import IconTile, { IconTileVariant } from "../../IconTile";
import {
  BatchCollapseBtn,
  BatchDates,
  BatchExpanded,
  BatchExpandedItem,
  BatchInfo,
  BatchItem,
  BatchList,
  BatchName,
  BatchNameRow,
  BatchPrice,
  BatchStack,
  BatchStackChevron,
  BatchStackFront,
  BatchStackLayer,
  BatchesBox,
} from "./styles";

// Intervalo (em segundos) entre a animação de entrada de cada lote expandido.
const STAGGER_STEP = 0.06;

type BatchStatus = "active" | "closed" | "upcoming";

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

const formatDateRange = (batch: IEventBatch) => {
  if (batch.startDate && batch.endDate) {
    return `${DateUtils.formatDateDefault(
      batch.startDate
    )} até ${DateUtils.formatDateDefault(batch.endDate)}`;
  }
  if (batch.endDate) return `até ${DateUtils.formatDateDefault(batch.endDate)}`;
  if (batch.startDate)
    return `a partir de ${DateUtils.formatDateDefault(batch.startDate)}`;
  return null;
};

const statusIcon = (status: BatchStatus) => {
  switch (status) {
    case "active":
      return <FiTag />;
    case "closed":
      return <FiCheckCircle />;
    case "upcoming":
      return <FiClock />;
  }
};

const statusLabel = (status: BatchStatus) => {
  switch (status) {
    case "active":
      return "Lote atual";
    case "closed":
      return "Encerrado";
    case "upcoming":
      return "Em breve";
  }
};

const statusIconVariant = (status: BatchStatus): IconTileVariant => {
  switch (status) {
    case "active":
      return "solid";
    case "closed":
      return "muted";
    case "upcoming":
      return "soft";
  }
};

const statusBadgeVariant = (status: BatchStatus): BadgeVariant => {
  switch (status) {
    case "active":
      return "primary";
    case "closed":
      return "muted";
    case "upcoming":
      return "soft";
  }
};

interface IInscriptionBatchesProps {
  batches: IEventBatch[];
  activeBatch: IEventBatch | null;
}

// Selo compacto do lote vigente, exibido no topo da tela (junto com data e
// local do evento). O histórico completo de lotes fica no fim da página.
export const InscriptionCurrentBatch: React.FC<IInscriptionBatchesProps> = ({
  batches,
  activeBatch,
}) => {
  // Lote único: a informação de preço já aparece no restante da tela.
  if (batches.length <= 1 || !activeBatch) return null;

  const dateRange = formatDateRange(activeBatch);

  return (
    <BatchItem $status="active" style={{ marginBottom: 16 }}>
      <IconTile variant={statusIconVariant("active")}>
        {statusIcon("active")}
      </IconTile>
      <BatchInfo>
        <BatchNameRow>
          <BatchName>{activeBatch.name}</BatchName>
          <Badge variant={statusBadgeVariant("active")}>
            {statusLabel("active")}
          </Badge>
        </BatchNameRow>
        {dateRange && (
          <BatchDates>
            <FiClock /> {dateRange}
          </BatchDates>
        )}
      </BatchInfo>
      <BatchPrice $status="active">{formatPrice(activeBatch.price)}</BatchPrice>
    </BatchItem>
  );
};

// Quantas camadas decorativas mostrar atrás do card da frente na pilha,
// independente de quantos lotes futuros existam de fato.
const MAX_STACK_LAYERS = 2;

const InscriptionBatches: React.FC<IInscriptionBatchesProps> = ({
  batches,
  activeBatch,
}) => {
  const [showUpcoming, setShowUpcoming] = useState(false);

  // Lote único: a informação de preço já aparece no restante da tela, então
  // o box de lotes só faz sentido quando há mais de um para comparar.
  if (batches.length <= 1) return null;

  const sorted = [...batches].sort((a, b) => a.order - b.order);

  const getStatus = (batch: IEventBatch): BatchStatus => {
    if (activeBatch) {
      if (batch.uuid === activeBatch.uuid) return "active";
      return batch.order < activeBatch.order ? "closed" : "upcoming";
    }
    // Sem lote vigente (ex.: todos os lotes já encerraram).
    if (batch.endDate && new Date(batch.endDate).getTime() < Date.now())
      return "closed";
    return "upcoming";
  };

  const renderBatch = (batch: IEventBatch) => {
    const status = getStatus(batch);
    const dateRange = formatDateRange(batch);
    return (
      <BatchItem key={batch.uuid} $status={status}>
        <IconTile variant={statusIconVariant(status)}>
          {statusIcon(status)}
        </IconTile>
        <BatchInfo>
          <BatchNameRow>
            <BatchName>{batch.name}</BatchName>
            <Badge variant={statusBadgeVariant(status)}>
              {statusLabel(status)}
            </Badge>
          </BatchNameRow>
          {dateRange && (
            <BatchDates>
              <FiClock /> {dateRange}
            </BatchDates>
          )}
        </BatchInfo>
        <BatchPrice $status={status}>{formatPrice(batch.price)}</BatchPrice>
      </BatchItem>
    );
  };

  const current = sorted.filter((batch) => getStatus(batch) !== "upcoming");
  const upcoming = sorted.filter((batch) => getStatus(batch) === "upcoming");

  return (
    <>
      <SectionLabel>Lotes</SectionLabel>
      <BatchesBox>
        <BatchList>{current.map(renderBatch)}</BatchList>

        {upcoming.length === 1 && (
          <BatchList style={{ marginTop: current.length ? 12 : 0 }}>
            {renderBatch(upcoming[0])}
          </BatchList>
        )}

        {upcoming.length > 1 &&
          (showUpcoming ? (
            <BatchExpanded style={{ marginTop: current.length ? 12 : 0 }}>
              {upcoming.map((batch, i) => (
                <BatchExpandedItem key={batch.uuid} $delay={i * STAGGER_STEP}>
                  {renderBatch(batch)}
                </BatchExpandedItem>
              ))}
              <BatchExpandedItem $delay={upcoming.length * STAGGER_STEP}>
                <BatchCollapseBtn
                  type="button"
                  onClick={() => setShowUpcoming(false)}
                >
                  <FiChevronUp /> Ver menos
                </BatchCollapseBtn>
              </BatchExpandedItem>
            </BatchExpanded>
          ) : (
            <BatchStack
              type="button"
              style={{ marginTop: current.length ? 12 : 0 }}
              onClick={() => setShowUpcoming(true)}
            >
              {Array.from({
                length: Math.min(upcoming.length - 1, MAX_STACK_LAYERS),
              }).map((_, i) => (
                <BatchStackLayer key={i} $depth={i + 1} />
              ))}
              <BatchStackFront $status="upcoming">
                <IconTile variant={statusIconVariant("upcoming")}>
                  <FiClock />
                </IconTile>
                <BatchInfo>
                  <BatchNameRow>
                    <BatchName>{upcoming.length} lotes futuros</BatchName>
                    <Badge variant={statusBadgeVariant("upcoming")}>
                      Em breve
                    </Badge>
                  </BatchNameRow>
                  <BatchDates>
                    a partir de {formatPrice(upcoming[0].price)}
                  </BatchDates>
                </BatchInfo>
                <BatchStackChevron />
              </BatchStackFront>
            </BatchStack>
          ))}
      </BatchesBox>
    </>
  );
};

export default InscriptionBatches;
