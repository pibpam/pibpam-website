import type { Meta, StoryObj } from '@storybook/react'
import ScheduleItem from './index'
import { IChurchSchedule } from '../../interfaces/Church'

const data: IChurchSchedule = {
  uuid: '1',
  text: 'Culto de Celebração',
  day: 'Domingo',
  time: '19:00',
  created_at: '2026-07-01T00:00:00',
}

const meta: Meta<typeof ScheduleItem> = {
  title: 'Cards/ScheduleItem',
  component: ScheduleItem,
  args: { data },
}

export default meta

type Story = StoryObj<typeof ScheduleItem>

export const Default: Story = {}
