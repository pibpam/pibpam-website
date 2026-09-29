import React from "react";
import { PiChatCircleText, PiEyeSlash, PiPlus } from "react-icons/pi";
import Badge, { BadgeVariant } from "../../../../components/Badge";
import { ILiturgyRequest, LiturgyRequestStatus } from "../../../../interfaces/LiturgyRequest";
import { ILiturgySongCatalogEntry } from "../../../../interfaces/Liturgy";
import { describeManifestItem } from "../../../../utils/liturgyManifest";
import { DateUtils } from "../../../../utils/Date";
import {
  List,
  RequestCard,
  RequestComment,
  RequestHeader,
  RequestMeta,
  RequestType,
  ReviewNote,
} from "./styles";

const STATUS_LABEL: Record<LiturgyRequestStatus, string> = {
  pending: "Pendente",
  approved: "Aprovada",
  rejected: "Rejeitada",
};

const STATUS_VARIANT: Record<LiturgyRequestStatus, BadgeVariant> = {
  pending: "warning",
  approved: "success",
  rejected: "error",
};

const TYPE_ICON = {
  add: <PiPlus />,
  remove: <PiEyeSlash />,
  comment: <PiChatCircleText />,
};

const describeRequest = (request: ILiturgyRequest, songsCatalog: ILiturgySongCatalogEntry[]): string => {
  if (request.type === "add") {
    return request.payloadItem
      ? `Novo item: ${describeManifestItem(request.payloadItem, songsCatalog).name}`
      : "Novo item sugerido";
  }
  if (request.type === "remove") return "Sugestão de remoção";
  return "Comentário";
};

interface IMyRequestsProps {
  requests: ILiturgyRequest[];
  songsCatalog: ILiturgySongCatalogEntry[];
}

const MyRequests: React.FC<IMyRequestsProps> = ({ requests, songsCatalog }) => (
  <List>
    {requests.map((request) => (
      <RequestCard key={request.uuid}>
        <RequestHeader>
          <RequestType>
            {TYPE_ICON[request.type]}
            {describeRequest(request, songsCatalog)}
          </RequestType>
          <Badge variant={STATUS_VARIANT[request.status]}>{STATUS_LABEL[request.status]}</Badge>
        </RequestHeader>

        <RequestMeta>
          {DateUtils.formatShortDateTimeWithWeekDay(request.liturgyPlan.date)}
          {request.liturgyPlan.liturgyType?.nome ? ` — ${request.liturgyPlan.liturgyType.nome}` : ""}
        </RequestMeta>

        {request.comment && <RequestComment>{request.comment}</RequestComment>}

        {request.status !== "pending" && request.reviewNote && (
          <ReviewNote>{request.reviewNote}</ReviewNote>
        )}
      </RequestCard>
    ))}
  </List>
);

export default MyRequests;
