import type { Meta, StoryObj } from '@storybook/react'
import CheckRegistrationSheet from './index'
import { AppContext } from '../../contexts/app'

const meta: Meta<typeof CheckRegistrationSheet> = {
  title: 'Overlays/CheckRegistrationSheet',
  component: CheckRegistrationSheet,
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

type Story = StoryObj<typeof CheckRegistrationSheet>

export const Default: Story = {}
