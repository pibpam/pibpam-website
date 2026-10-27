import type { Meta, StoryObj } from '@storybook/react'
import SectionTitle from './index'

const meta: Meta<typeof SectionTitle> = {
  title: 'Site/SectionTitle',
  component: SectionTitle,
  args: { children: 'Próximas agendas' },
}

export default meta

type Story = StoryObj<typeof SectionTitle>

export const Default: Story = {}
