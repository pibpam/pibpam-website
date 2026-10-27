import type { Meta, StoryObj } from '@storybook/react'
import AppContentTabs from './index'

const meta: Meta<typeof AppContentTabs> = {
  title: 'Site/AppContentTabs',
  component: AppContentTabs,
  args: { current: '/events' },
}

export default meta

type Story = StoryObj<typeof AppContentTabs>

export const Cultos: Story = {}

export const Series: Story = { args: { current: '/series' } }
