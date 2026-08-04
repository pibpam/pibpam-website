import { BadgeVariant } from "../components/Badge"

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendente',
  paid: 'Pago',
  confirmed: 'Confirmada',
  overdue: 'Atrasada',
  cancelled: 'Cancelada',
  canceled: 'Cancelada',
  refunded: 'Reembolsada',
}

export const statusLabel = (status?: string) => {
  if (!status) return ''
  return STATUS_LABELS[status] || status
}

const STATUS_BADGE_VARIANTS: Record<string, BadgeVariant> = {
  pending: 'warning',
  paid: 'success',
  confirmed: 'success',
  overdue: 'warning',
  cancelled: 'error',
  canceled: 'error',
  refunded: 'error',
}

export const statusBadgeVariant = (status?: string): BadgeVariant =>
  (status && STATUS_BADGE_VARIANTS[status]) || 'neutral'
