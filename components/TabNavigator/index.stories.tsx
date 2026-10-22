import type { Meta, StoryObj } from '@storybook/react'
import TabNavigator from './index'

const meta: Meta<typeof TabNavigator> = {
  title: 'Layout/TabNavigator',
  component: TabNavigator,
  parameters: {
    layout: 'fullscreen',
    nextjs: { router: { pathname: '/events' } },
  },
}

export default meta

type Story = StoryObj<typeof TabNavigator>

export const Default: Story = {}
