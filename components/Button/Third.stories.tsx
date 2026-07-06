import type { Meta, StoryObj } from '@storybook/react'
import ThirdButton from './Third'

const meta: Meta<typeof ThirdButton> = {
  title: 'Buttons/ThirdButton',
  component: ThirdButton,
  args: {
    text: 'ver mais',
  },
}

export default meta

type Story = StoryObj<typeof ThirdButton>

export const Default: Story = {}

export const Loading: Story = {
  args: { loading: true },
}
