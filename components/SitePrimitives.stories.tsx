import type { Meta, StoryObj } from '@storybook/react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { LiveBadge } from '@/components/ui/LiveBadge'
import { ServiceTimes } from '@/components/agenda/ServiceTimes'

// Componentes do site usados direto, sem wrapper (não têm links nem estado do site).
const meta: Meta = {
  title: 'Site/Primitives',
  parameters: { layout: 'fullscreen' },
}

export default meta

type Story = StoryObj

const schedules = [
  { uuid: '1', day: 'Domingo', text: 'Escola Bíblica Dominical', time: '09:00' },
  { uuid: '2', day: 'Domingo', text: 'Culto de Celebração', time: '19:00' },
  { uuid: '3', day: 'Quarta-feira', text: 'Culto de Exposição Bíblica', time: '19:30' },
]

export const Sections: Story = {
  render: () => (
    <>
      <Section tone="paper" labelledBy="s-paper">
        <SectionHeader id="s-paper" title="Seção paper" description="Fundo branco" />
      </Section>
      <Section tone="mist" labelledBy="s-mist">
        <SectionHeader id="s-mist" title="Seção mist" description="Fundo claro azulado" />
      </Section>
      <Section tone="pine" labelledBy="s-pine">
        <SectionHeader id="s-pine" title="Seção pine" description="Fundo escuro" tone="dark" />
      </Section>
    </>
  ),
}

export const LiveBadges: Story = {
  render: () => (
    <div style={{ padding: 24, display: 'flex', gap: 12 }}>
      <LiveBadge />
      <LiveBadge label="Próximo culto" />
    </div>
  ),
}

export const ServiceTimesLight: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <ServiceTimes items={schedules} tone="light" />
    </div>
  ),
}

export const ServiceTimesDark: Story = {
  render: () => (
    <Section tone="pine">
      <ServiceTimes items={schedules} tone="dark" />
    </Section>
  ),
}
