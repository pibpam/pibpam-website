import type { Meta, StoryObj } from '@storybook/react'
import NavBar from './NavBar'

const meta: Meta<typeof NavBar> = {
  title: 'Layout/NavBar',
  component: NavBar,
  parameters: { layout: 'fullscreen' },
}

export default meta

type Story = StoryObj<typeof NavBar>

export const Default: Story = {}
