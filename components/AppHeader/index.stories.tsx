import type { Meta, StoryObj } from '@storybook/react'
import AppHeader from './index'

const meta: Meta<typeof AppHeader> = {
  title: 'Layout/AppHeader',
  component: AppHeader,
  parameters: { layout: 'fullscreen' },
}

export default meta

type Story = StoryObj<typeof AppHeader>

// Na Home (rota "/") não há botão de voltar.
export const Logo: Story = {}

export const WithTitleAndBack: Story = {
  args: { title: 'Culto de Exposição Bíblica', onBack: () => {} },
}

export const Dark: Story = {
  args: { title: 'Ao vivo', onBack: () => {}, tone: 'dark' },
}

export const WithTrailing: Story = {
  args: {
    title: 'Agenda',
    onBack: () => {},
    trailing: <span style={{ fontSize: 12, fontWeight: 700 }}>3 eventos</span>,
  },
}
