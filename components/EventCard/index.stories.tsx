import type { Meta, StoryObj } from '@storybook/react'
import EventCard from './index'
import { IContent } from '../../interfaces/Contens'

const data: IContent = {
  uuid: '1',
  name: 'Culto de Celebração',
  description: 'Culto de domingo',
  contentDate: '2026-07-05T19:00:00',
  image: '/igreja.jpg',
  content: '',
  serviceContent: 'YOUTUBE',
  active: true,
  created_at: '2026-07-01T00:00:00',
  isLive: false,
  author: { uuid: '1', name: 'Pr. João Silva', active: true, created_at: '2026-01-01' },
}

const meta: Meta<typeof EventCard> = {
  title: 'Cards/EventCard',
  component: EventCard,
  args: {
    data,
    onClick: () => {},
  },
}

export default meta

type Story = StoryObj<typeof EventCard>

export const Default: Story = {}

export const WithoutDate: Story = {
  args: { hideDate: true },
}
