import type { Meta, StoryObj } from '@storybook/react'
import BirthdayRow from './index'

const meta: Meta<typeof BirthdayRow> = {
  title: 'Site/BirthdayRow',
  component: BirthdayRow,
  args: { member: { uuid: '1', name: 'MARIA CLARA MENDONÇA ARRUDA', birthday: 5 } },
  decorators: [
    (Story) => (
      <ul style={{ maxWidth: 380, listStyle: 'none', padding: 0 }}>
        <Story />
      </ul>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof BirthdayRow>

export const Default: Story = {}

export const Today: Story = { args: { today: true } }
