import type { Meta, StoryObj } from '@storybook/react'
import LiveBanner from './index'

const meta: Meta<typeof LiveBanner> = {
  title: 'Site/LiveBanner',
  component: LiveBanner,
  args: { title: 'Culto de Celebração', href: '/event/abc' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 380 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof LiveBanner>

export const Default: Story = {}
