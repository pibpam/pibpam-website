import type { Meta, StoryObj } from '@storybook/react'
import AppSeriesCard from './index'
import { series } from '../storyData'

const meta: Meta<typeof AppSeriesCard> = {
  title: 'Site/AppSeriesCard',
  component: AppSeriesCard,
  args: { series: series[0] },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof AppSeriesCard>

export const Default: Story = {}

export const WithoutMessages: Story = { args: { series: series[1] } }
