import type { Meta, StoryObj } from '@storybook/react'
import { AppContext } from '../../contexts/app'
import Modal from './index'

const ModalContent = () => (
  <div style={{ padding: 24 }}>
    <h3>Título do modal</h3>
    <p>Conteúdo de exemplo dentro do modal.</p>
  </div>
)

const meta: Meta<typeof Modal> = {
  title: 'Overlays/Modal',
  component: Modal,
  args: {
    isOpen: true,
    onClose: () => {},
    children: <ModalContent />,
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Desktop: Story = {
  decorators: [
    (Story) => (
      <AppContext.Provider value={{ isApp: false, isIos: false, isAndroid: false, isMobile: false }}>
        <Story />
      </AppContext.Provider>
    ),
  ],
}

export const MobileBottomSheet: Story = {
  decorators: [
    (Story) => (
      <AppContext.Provider value={{ isApp: false, isIos: false, isAndroid: false, isMobile: true }}>
        <Story />
      </AppContext.Provider>
    ),
  ],
}
