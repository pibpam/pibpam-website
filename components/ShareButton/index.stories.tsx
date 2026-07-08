import type { Meta, StoryObj } from '@storybook/react'
import ShareButton from './index'

const meta: Meta<typeof ShareButton> = {
  title: 'Buttons/ShareButton',
  component: ShareButton,
  args: {
    url: 'https://pibpam.org/event/1',
    message: 'Culto de Celebração',
  },
}

export default meta

type Story = StoryObj<typeof ShareButton>

export const Default: Story = {}

export const Large: Story = {
  args: {
    large: true,
  },
}
