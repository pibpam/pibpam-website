import type { Meta, StoryObj } from '@storybook/react'
import InscriptionFaqs from './index'

const meta: Meta<typeof InscriptionFaqs> = {
  title: 'Inscription Sections/Faqs',
  component: InscriptionFaqs,
  args: {
    faqs: [
      {
        uuid: '1',
        question: 'Posso levar acompanhante?',
        anwser: '<p>Sim, basta adicionar mais um participante na inscrição.</p>',
        order: 1,
      },
      {
        uuid: '2',
        question: 'Qual a política de cancelamento?',
        anwser: '<p>Cancelamentos podem ser feitos até 7 dias antes do evento, entre em contato com a secretaria.</p>',
        order: 2,
      },
    ],
  },
}

export default meta

type Story = StoryObj<typeof InscriptionFaqs>

export const Default: Story = {}

export const Vazio: Story = {
  args: {
    faqs: [],
  },
}
