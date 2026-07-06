import type { Meta, StoryObj } from '@storybook/react'
import Schedule from './index'
import { IScheduleDate } from '../../../interfaces/Schedule'

const schedules: IScheduleDate[] = [
  {
    uuid: '1',
    scheduleDate: '2026-07-12T19:00:00',
    created_at: '2026-07-01T00:00:00',
    schedule: {
      uuid: '1',
      title: 'Culto de Celebração',
      highlight: true,
      created_at: '2026-07-01T00:00:00',
    },
  },
  {
    uuid: '2',
    scheduleDate: '2026-07-14T20:00:00',
    created_at: '2026-07-01T00:00:00',
    schedule: {
      uuid: '2',
      title: 'Reunião de Oração',
      highlight: false,
      created_at: '2026-07-01T00:00:00',
    },
  },
]

const meta: Meta<typeof Schedule> = {
  title: 'Home Sections/Schedule',
  component: Schedule,
  parameters: { layout: 'fullscreen' },
  args: {
    schedules,
    goTo: () => {},
  },
}

export default meta

type Story = StoryObj<typeof Schedule>

export const Default: Story = {}
