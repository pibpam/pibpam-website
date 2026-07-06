import type { Meta, StoryObj } from '@storybook/react'
import Title from './index'

const meta: Meta<typeof Title> = {
  title: 'Typography/Title',
  component: Title,
}

export default meta

type Story = StoryObj<typeof Title>

export const Default: Story = {
  args: {
    children: 'Título da seção',
  },
}
