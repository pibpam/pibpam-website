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

export const ComTabela: Story = {
  args: {
    faqs: [
      {
        uuid: '3',
        question: 'Quais são os lotes e valores?',
        anwser: `
          <p>Confira os valores por lote:</p>
          <table>
            <thead>
              <tr><th>Lote</th><th>Período</th><th>Valor</th></tr>
            </thead>
            <tbody>
              <tr><td>1º lote</td><td>até 10/08</td><td>R$ 80,00</td></tr>
              <tr><td>2º lote</td><td>até 20/08</td><td>R$ 100,00</td></tr>
              <tr><td>3º lote</td><td>até 30/08</td><td>R$ 120,00</td></tr>
            </tbody>
          </table>
        `,
        order: 1,
      },
    ],
  },
}
