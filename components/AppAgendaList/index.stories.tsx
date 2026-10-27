import type { Meta, StoryObj } from '@storybook/react'
import AppAgendaList from './index'
import { scheduleDates } from '../storyData'

const meta: Meta<typeof AppAgendaList> = {
  title: 'Site/AppAgendaList',
  component: AppAgendaList,
  args: { items: scheduleDates },
}

export default meta

type Story = StoryObj<typeof AppAgendaList>

export const Light: Story = {}

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
