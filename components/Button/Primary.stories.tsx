import type { Meta, StoryObj } from '@storybook/react'
import PrimaryButton from './Primary'

const meta: Meta<typeof PrimaryButton> = {
  title: 'Buttons/PrimaryButton',
  component: PrimaryButton,
  args: {
    text: 'Conheça a nossa igreja',
  },
}

export default meta

type Story = StoryObj<typeof PrimaryButton>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
