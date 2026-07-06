import type { Meta, StoryObj } from '@storybook/react'
import ScheduleEvent from './index'
import { IScheduleDate } from '../../interfaces/Schedule'

const schedule: IScheduleDate = {
  uuid: '1',
  scheduleDate: '2026-07-12T19:00:00',
  created_at: '2026-07-01T00:00:00',
  schedule: {
    uuid: '1',
    title: 'Acampamento de Jovens',
    shortDescription: 'Um final de semana de comunhão e adoração',
    publicSchedule: 'Jovens',
    image: '/igreja.jpg',
    highlight: true,
    created_at: '2026-07-01T00:00:00',
  },
}

const meta: Meta<typeof ScheduleEvent> = {
  title: 'Cards/ScheduleEvent',
  component: ScheduleEvent,
  args: {
    schedule,
    onClick: () => {},
  },
}

export default meta

type Story = StoryObj<typeof ScheduleEvent>

export const Default: Story = {}
