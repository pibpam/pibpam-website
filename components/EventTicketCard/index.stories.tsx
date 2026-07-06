import type { Meta, StoryObj } from '@storybook/react'
import EventTicketCard from './index'
import { IEvent } from '../../interfaces/Event'

const data: IEvent = {
  uuid: '1',
  name: 'Acampamento de Jovens 2026',
  description: null,
  descriptionHtml: null,
  image: '/carrossel-min.png',
  location: 'Sítio Recanto Feliz',
  startDate: '2026-08-15T09:00:00',
  endDate: '2026-08-17T18:00:00',
  purchaseDeadline: null,
  maxParticipants: 100,
  forMinors: false,
  status: 'published',
  created_at: '2026-07-01T00:00:00',
  updated_at: '2026-07-01T00:00:00',
  activeBatch: {
    uuid: '1',
    name: '1º Lote',
    order: 1,
    price: '210.00',
    startDate: null,
    endDate: null,
    maxQuantity: null,
  },
  takenSpots: 40,
  availableSpots: 60,
  soldOut: false,
}

const meta: Meta<typeof EventTicketCard> = {
  title: 'Cards/EventTicketCard',
  component: EventTicketCard,
  args: {
    data,
    onClick: () => {},
    onSubscribe: () => {},
  },
}

export default meta

type Story = StoryObj<typeof EventTicketCard>

export const Default: Story = {}

export const Free: Story = {
  args: {
    data: { ...data, activeBatch: { ...data.activeBatch!, price: 0 } },
  },
}

export const SoldOut: Story = {
  args: {
    data: { ...data, soldOut: true, availableSpots: 0 },
  },
}
