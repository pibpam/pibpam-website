import type { Meta, StoryObj } from '@storybook/react'
import AgendaHighlight from './index'
import { scheduleDates } from '../storyData'

const meta: Meta<typeof AgendaHighlight> = {
  title: 'Site/AgendaHighlight',
  component: AgendaHighlight,
  args: {
    schedule: {
      ...scheduleDates[2],
      schedule: { ...scheduleDates[2].schedule, image: '/igreja.jpg' },
    },
    onClick: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof AgendaHighlight>

export const Default: Story = {}

export const WithoutImage: Story = {
  args: { schedule: scheduleDates[2] },
}
