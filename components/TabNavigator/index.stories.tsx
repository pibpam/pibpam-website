import type { Meta, StoryObj } from '@storybook/react'
import TabNavigator from './index'
import { LivesContext } from '../../contexts/lives'

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

export const WithLiveTab: Story = {
  decorators: [
    (Story) => (
      <LivesContext.Provider value={{ lives: [{ uuid: '1' } as any] }}>
        <Story />
      </LivesContext.Provider>
    ),
  ],
}
