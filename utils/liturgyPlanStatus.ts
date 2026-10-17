import { BadgeVariant } from "../components/Badge"
import { LiturgyPlanStatus } from "../interfaces/Liturgy"

/** Mesmos rótulos do admin (sys-church-fornt, components/LiturgyPlanStatus/statusMeta.ts). */
const STATUS_LABELS: Record<LiturgyPlanStatus, string> = {
  draft: 'Em criação',
  ready: 'Aprovado',
  running: 'Em execução',
  finished: 'Finalizado',
}

const STATUS_BADGE_VARIANTS: Record<LiturgyPlanStatus, BadgeVariant> = {
  draft: 'warning',
  ready: 'soft',
  running: 'success',
  finished: 'muted',
}

export const planStatusOf = (status?: LiturgyPlanStatus | null): LiturgyPlanStatus => status || 'draft'

export const planStatusLabel = (status?: LiturgyPlanStatus | null) => STATUS_LABELS[planStatusOf(status)]

export const planStatusBadgeVariant = (status?: LiturgyPlanStatus | null): BadgeVariant =>
  STATUS_BADGE_VARIANTS[planStatusOf(status)]
