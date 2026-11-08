import type { Meta, StoryObj } from '@storybook/react'
import GiveSheet from './index'
import { AppContext } from '../../contexts/app'

const meta: Meta<typeof GiveSheet> = {
  title: 'Overlays/GiveSheet',
  component: GiveSheet,
  args: {
    open: true,
    onClose: () => {},
  },
  decorators: [
    (Story) => (
      <AppContext.Provider value={{ isApp: false, isIos: false, isAndroid: false, isMobile: false }}>
        <Story />
      </AppContext.Provider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof GiveSheet>

export const Default: Story = {}
