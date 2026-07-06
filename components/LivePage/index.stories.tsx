import type { Meta, StoryObj } from '@storybook/react'
import LivePage from './index'
import { IBroadcast } from '../../interfaces/Broadcast'

const content: IBroadcast = {
  active: true,
  author: { uuid: '1', name: 'Pr. João Silva', active: true, created_at: '2026-01-01' },
  created_at: '2026-07-01T00:00:00',
  description: 'Acompanhe ao vivo o culto de celebração.',
  finishAt: '',
  image: '/igreja.jpg',
  privacyStatus: 'public',
  serviceContent: 'YOUTUBE',
  startAt: '2026-07-05T19:00:00',
  title: 'Culto de Celebração - Ao Vivo',
  uuid: '1',
  waitingBroadcast: false,
  ytId: 'dQw4w9WgXcQ',
  ytStatus: 'live',
}

const meta: Meta<typeof LivePage> = {
  title: 'Layout/LivePage',
  component: LivePage,
  parameters: { layout: 'fullscreen' },
  args: { content },
}

export default meta

type Story = StoryObj<typeof LivePage>

export const Live: Story = {}

export const Finished: Story = {
  args: {
    content: { ...content, ytStatus: 'complete' },
  },
}
