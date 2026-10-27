import type { Meta, StoryObj } from '@storybook/react'
import VideoDetail from './index'

const meta: Meta<typeof VideoDetail> = {
  title: 'Layout/VideoDetail',
  component: VideoDetail,
  args: {
    title: 'Introdução ao Evangelho de Marcos',
    description: 'Marcos 1.1-8',
    videoId: 'dQw4w9WgXcQ',
    thumb: '/carrossel-min.png',
    author: { name: 'Pr. Charlin Rosa' },
    date: '2026-10-25T22:00:00.000Z',
    shareUrl: 'https://pibpam.org/event/1',
    shareMessage: 'Introdução ao Evangelho de Marcos',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420, padding: 20 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof VideoDetail>

export const Default: Story = {}

export const Live: Story = { args: { live: true } }

export const WithoutAuthor: Story = { args: { author: null } }
