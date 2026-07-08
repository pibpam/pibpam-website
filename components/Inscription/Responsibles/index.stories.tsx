import type { Meta, StoryObj } from '@storybook/react'
import InscriptionResponsibles from './index'

const meta: Meta<typeof InscriptionResponsibles> = {
  title: 'Inscription Sections/Responsibles',
  component: InscriptionResponsibles,
  args: {
    eventName: 'Acampamento de Jovens 2026',
    responsibles: [
      { name: 'Maria Oliveira', phone: '37999999999', whatsapp: true },
      { name: 'Secretaria', phone: '3735551234', whatsapp: false },
    ],
  },
}

export default meta

type Story = StoryObj<typeof InscriptionResponsibles>

export const Default: Story = {}

export const SomenteWhatsapp: Story = {
  args: {
    responsibles: [
      { name: 'Maria Oliveira', phone: '37999999999', whatsapp: true },
    ],
  },
}

export const SomenteTelefoneFixo: Story = {
  args: {
    responsibles: [
      { name: 'Secretaria', phone: '3735551234', whatsapp: false },
    ],
  },
}

export const Vazio: Story = {
  args: {
    responsibles: [],
  },
}
