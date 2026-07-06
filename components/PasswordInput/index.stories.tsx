import type { Meta, StoryObj } from '@storybook/react'
import PasswordInput from './index'

const meta: Meta<typeof PasswordInput> = {
  title: 'Forms/PasswordInput',
  component: PasswordInput,
  args: {
    placeholder: 'Senha',
  },
}

export default meta

type Story = StoryObj<typeof PasswordInput>

export const Default: Story = {}
