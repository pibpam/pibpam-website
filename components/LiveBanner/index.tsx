import React from 'react'
import { LiveBadge } from '@/components/ui/LiveBadge'
import AppButton from '../AppButton'

interface ILiveBanner {
  title: string
  /** Rota do app que abre a transmissão. */
  href: string
}

/** Faixa que chama para a transmissão em andamento (aparece só quando há live). */
const LiveBanner: React.FC<ILiveBanner> = ({ title, href }) => (
  <div className="flex flex-col gap-4 rounded-lg bg-pine p-5 text-ink-inverse">
    <div className="flex flex-col items-start gap-2">
      <LiveBadge />
      <p className="text-lg font-bold leading-snug tracking-tight text-balance">{title}</p>
    </div>
    <AppButton variant="accent" href={href}>
      Assistir agora
    </AppButton>
  </div>
)

export default LiveBanner
