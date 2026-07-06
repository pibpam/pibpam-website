import type { Meta, StoryObj } from '@storybook/react'
import Divider, { EDividerColors } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
}

export default meta

type Story = StoryObj<typeof Divider>

export const Default: Story = {}

export const White: Story = {
  args: { color: EDividerColors.white },
  parameters: { backgrounds: { default: 'dark' } },
}

export const Yellow: Story = {
  args: { color: EDividerColors.yellow },
}
