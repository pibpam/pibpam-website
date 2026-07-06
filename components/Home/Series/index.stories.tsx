import type { Meta, StoryObj } from '@storybook/react'
import Series from './index'
import { ISeries } from '../../../interfaces/Series'

const series: ISeries[] = [
  {
    uuid: '1',
    title: 'Série: Fé em Ação',
    image: '/igreja.jpg',
    active: true,
    created_at: '2026-07-01T00:00:00',
    series_contents: [
      { uuid: '1', created_at: '2026-07-01', content: {} as any },
      { uuid: '2', created_at: '2026-07-01', content: {} as any },
    ],
  },
]

const meta: Meta<typeof Series> = {
  title: 'Home Sections/Series',
  component: Series,
  parameters: { layout: 'fullscreen' },
  args: {
    series,
    goTo: () => {},
  },
}

export default meta

type Story = StoryObj<typeof Series>

export const Default: Story = {}
