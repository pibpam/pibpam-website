import type { Meta, StoryObj } from '@storybook/react'
import SecondaryButton from './Secondary'

const meta: Meta<typeof SecondaryButton> = {
  title: 'Buttons/SecondaryButton',
  component: SecondaryButton,
  args: {
    text: 'Ver mais',
  },
}

export default meta

type Story = StoryObj<typeof SecondaryButton>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}
