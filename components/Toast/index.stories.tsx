import type { Meta, StoryObj } from '@storybook/react'
import Toast from './index'

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  args: {
    message: 'Informe um e-mail válido.',
  },
}

export default meta

type Story = StoryObj<typeof Toast>

export const Default: Story = {
  args: {
    onClose: () => {},
  },
}
