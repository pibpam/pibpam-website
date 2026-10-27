import type { Meta, StoryObj } from '@storybook/react'
import AppVideoCard from './index'
import { contents } from '../storyData'

const meta: Meta<typeof AppVideoCard> = {
  title: 'Site/AppVideoCard',
  component: AppVideoCard,
  args: { content: contents[0] },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof AppVideoCard>

export const Default: Story = {}

export const Featured: Story = { args: { featured: true } }

export const Dark: Story = {
  args: { tone: 'dark' },
  decorators: [
    (Story) => (
      <div style={{ background: '#12302F', padding: 16, borderRadius: 14, color: '#F4FBFB' }}>
        <Story />
      </div>
    ),
  ],
}
