import type { Meta, StoryObj } from '@storybook/react'
import DividerMobile, { EDividerColors } from './DividerMobile'

const meta: Meta<typeof DividerMobile> = {
  title: 'Layout/DividerMobile',
  component: DividerMobile,
}

export default meta

type Story = StoryObj<typeof DividerMobile>

export const Default: Story = {}

export const White: Story = {
  args: { color: EDividerColors.white },
  parameters: { backgrounds: { default: 'dark' } },
}

export const Yellow: Story = {
  args: { color: EDividerColors.yellow },
}
