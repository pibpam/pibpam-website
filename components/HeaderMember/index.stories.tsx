import type { Meta, StoryObj } from '@storybook/react'
import HeaderMember from './index'

const meta: Meta<typeof HeaderMember> = {
  title: 'Layout/HeaderMember',
  component: HeaderMember,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Meu Perfil',
  },
}

export default meta

type Story = StoryObj<typeof HeaderMember>

export const Default: Story = {}

export const WithBackButton: Story = {
  args: {
    goBack: () => {},
  },
}
