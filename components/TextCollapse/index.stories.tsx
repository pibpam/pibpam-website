import type { Meta, StoryObj } from '@storybook/react'
import { TextCollapse } from './index'

const meta: Meta<typeof TextCollapse> = {
  title: 'Typography/TextCollapse',
  component: TextCollapse,
}

export default meta

type Story = StoryObj<typeof TextCollapse>

export const Short: Story = {
  args: {
    text: '<p>Um texto curto que não precisa ser colapsado.</p>',
  },
}

export const Long: Story = {
  args: {
    text: `<p>${'Primeira Igreja Batista em Pará de Minas. '.repeat(60)}</p>`,
  },
}
