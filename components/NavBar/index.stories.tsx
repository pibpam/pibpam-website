import type { Meta, StoryObj } from '@storybook/react'
import NavBar from './index'

const meta: Meta<typeof NavBar> = {
  title: 'Layout/NavBar',
  component: NavBar,
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'responsive' } },
}

export default meta

type Story = StoryObj<typeof NavBar>

export const Default: Story = {}
