import type { Meta, StoryObj } from '@storybook/react'
import PibPamLogo from './pibpamlogo.svg'

const meta: Meta<typeof PibPamLogo> = {
  title: 'Assets/Logo',
  component: PibPamLogo,
}

export default meta

type Story = StoryObj<typeof PibPamLogo>

export const Default: Story = {}
