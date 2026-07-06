import type { Meta, StoryObj } from '@storybook/react'
import SeriesCard from './SeriesCard'
import { ISeries } from '../interfaces/Series'

const data: ISeries = {
  uuid: '1',
  title: 'Série: Fé em Ação',
  image: '/igreja.jpg',
  active: true,
  created_at: '2026-07-01T00:00:00',
  series_contents: [
    { uuid: '1', created_at: '2026-07-01', content: {} as any },
    { uuid: '2', created_at: '2026-07-01', content: {} as any },
  ],
}

const meta: Meta<typeof SeriesCard> = {
  title: 'Cards/SeriesCard',
  component: SeriesCard,
  args: {
    data,
    onClick: () => {},
  },
}

export default meta

type Story = StoryObj<typeof SeriesCard>

export const Default: Story = {}
