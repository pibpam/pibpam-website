import React from "react";
import { FiCreditCard, FiDollarSign } from "react-icons/fi";
import { FaPix } from "react-icons/fa6";
import {
  TrackItem,
  TrackItemHead,
  TrackItemSub,
  TrackItemTitle,
  TrackProof,
} from "../../../styles/Tracking";
import IconTile from "../../../components/IconTile";
import { DateUtils } from "../../../utils/Date";
import { IRegistrationInstallment } from "../../../interfaces/Event";

interface IInstallmentItem {
  installment: IRegistrationInstallment;
  installmentsCount: number;
  isPix: boolean;
  isCash: boolean;
  clickable: boolean;
  formatPrice: (price?: number | string | null) => string | null;
  statusLabel: (status?: string) => string;
  onSelect: () => void;
}

const InstallmentItem: React.FC<IInstallmentItem> = ({
  installment,
  installmentsCount,
  isPix,
  isCash,
  clickable,
  formatPrice,
  statusLabel,
  onSelect,
}) => {
  // isOverdue é calculado na hora pelo backend (status continua "pending" no
  // banco, não existe transição persistida pra "overdue") — por isso a label
  // exibida não usa o `status` bruto quando a parcela está vencida.
  const displayLabel = installment.isOverdue
    ? "Atrasada"
    : statusLabel(installment.status);
  return (
    <TrackItem
      $clickable={clickable}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? onSelect : undefined}
      onKeyDown={
        clickable
          ? (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
    >
      <TrackItemHead>
        <TrackItemTitle>
          <IconTile variant={clickable ? "soft" : "neutral"} size={32}>
            {isPix ? <FaPix /> : isCash ? <FiDollarSign /> : <FiCreditCard />}
          </IconTile>
          <strong>
            {installmentsCount > 1
              ? `Parcela ${installment.number}/${installmentsCount}`
              : "Pagamento"}
          </strong>
        </TrackItemTitle>
        <span>{formatPrice(installment.amount)}</span>
      </TrackItemHead>
      <TrackItemSub $overdue={installment.isOverdue}>
        {installment.dueDate
          ? `Vencimento: ${DateUtils.formatDateDefault(installment.dueDate)} · `
          : ""}
        {displayLabel}
      </TrackItemSub>
      {installment.proofUrl && (
        <TrackProof
          href={installment.proofUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          Ver comprovante
        </TrackProof>
      )}
    </TrackItem>
  );
};

export default InstallmentItem;
