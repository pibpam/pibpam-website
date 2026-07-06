import type { Meta, StoryObj } from '@storybook/react'
import PixPaymentSheet from './index'
import { AppContext } from '../../contexts/app'

const meta: Meta<typeof PixPaymentSheet> = {
  title: 'Overlays/PixPaymentSheet',
  component: PixPaymentSheet,
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

type Story = StoryObj<typeof PixPaymentSheet>

export const CopyPaste: Story = {
  args: {
    pixCopyPaste: '00020126360014BR.GOV.BCB.PIX0114+553732327250520400005303986540510.005802BR5913PIBPAM6009SAOPAULO62070503***6304ABCD',
  },
}

export const ManualKey: Story = {
  args: {
    manualKey: {
      name: 'Tesouraria PIBPAM',
      type: 'email',
      key: 'secretariapibpam@gmail.com',
    },
  },
}

export const Cash: Story = {
  args: {
    cashInfo: {
      name: 'Maria Oliveira',
      phone: '37999999999',
    },
  },
}

export const WithProofUpload: Story = {
  args: {
    pixCopyPaste: '00020126360014BR.GOV.BCB.PIX0114+553732327250520400005303986540510.005802BR5913PIBPAM6009SAOPAULO62070503***6304ABCD',
    registrationUuid: '1',
    installmentUuid: '1',
  },
}
