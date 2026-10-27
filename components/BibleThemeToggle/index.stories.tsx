import type { Meta, StoryObj } from '@storybook/react'
import AppHeader from '../AppHeader'
import BibleThemeToggle from './index'

const meta: Meta<typeof BibleThemeToggle> = {
  title: 'Bible/BibleThemeToggle',
  component: BibleThemeToggle,
  parameters: { layout: 'fullscreen' },
  args: { onToggle: () => {} },
  render: (args) => (
    <AppHeader
      title="Salmos, 23"
      onBack={() => {}}
      tone={args.dark ? 'dark' : 'light'}
      trailing={<BibleThemeToggle {...args} />}
    />
  ),
}

export default meta

type Story = StoryObj<typeof BibleThemeToggle>

export const Light: Story = { args: { dark: false } }

export const Dark: Story = { args: { dark: true } }
