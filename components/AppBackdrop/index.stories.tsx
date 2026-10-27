import type { Meta, StoryObj } from '@storybook/react'
import AppBackdrop from './index'
import { Section, SectionHeader } from '@/components/ui/Section'

const meta: Meta<typeof AppBackdrop> = {
  title: 'Site/AppBackdrop',
  component: AppBackdrop,
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <Section tone="pine" labelledBy="backdrop-title" backdrop={<AppBackdrop {...args} />}>
      <SectionHeader id="backdrop-title" title="Culto ao vivo" description="Domingo, 19h" tone="dark" />
    </Section>
  ),
}

export default meta

type Story = StoryObj<typeof AppBackdrop>

export const GradientOnly: Story = {}

export const WithPhoto: Story = { args: { image: '/igreja.jpg' } }
