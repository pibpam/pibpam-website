import type { Meta, StoryObj } from '@storybook/react'
import ModalDesktopWarn from './index'
import { AppContext } from '../../contexts/app'

const meta: Meta<typeof ModalDesktopWarn> = {
  title: 'Overlays/ModalDesktopWarn',
  component: ModalDesktopWarn,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <AppContext.Provider value={{ isApp: false, isIos: false, isAndroid: false, isMobile: false }}>
        <Story />
      </AppContext.Provider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ModalDesktopWarn>

export const Default: Story = {}
