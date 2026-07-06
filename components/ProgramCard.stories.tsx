import type { Meta, StoryObj } from '@storybook/react'
import ProgramCard from './ProgramCard'
import { IScheduleDate } from '../interfaces/Schedule'

const schedule: IScheduleDate = {
  uuid: '1',
  scheduleDate: '2026-07-12T19:00:00',
  created_at: '2026-07-01T00:00:00',
  schedule: {
    uuid: '1',
    title: 'Culto de Celebração',
    highlight: true,
    created_at: '2026-07-01T00:00:00',
  },
}

const meta: Meta<typeof ProgramCard> = {
  title: 'Cards/ProgramCard',
  component: ProgramCard,
  args: {
    schedule,
    onClick: () => {},
  },
}

export default meta

type Story = StoryObj<typeof ProgramCard>

export const Default: Story = {}
