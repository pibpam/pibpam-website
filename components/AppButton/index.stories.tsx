import type { Meta, StoryObj } from '@storybook/react'
import AppButton from './index'

const meta: Meta<typeof AppButton> = {
  title: 'Site/AppButton',
  component: AppButton,
  args: { children: 'Assistir culto', href: '/events' },
}

export default meta

type Story = StoryObj<typeof AppButton>

export const Primary: Story = {}

export const Accent: Story = { args: { variant: 'accent' } }

export const Outline: Story = { args: { variant: 'outline' } }

export const Ghost: Story = { args: { variant: 'ghost' } }

export const Large: Story = { args: { size: 'lg' } }

export const OutlineInverse: Story = {
  args: { variant: 'outline-inverse' },
  decorators: [
    (Story) => (
      <div style={{ background: '#12302F', padding: 24, borderRadius: 14 }}>
        <Story />
      </div>
    ),
  ],
}
