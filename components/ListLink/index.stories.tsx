import type { Meta, StoryObj } from '@storybook/react'
import ListLink from './index'

const meta: Meta<typeof ListLink> = {
  title: 'Site/ListLink',
  component: ListLink,
  args: { label: 'Gênesis', onClick: () => {} },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 380 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ListLink>

export const Default: Story = {}

export const WithNumber: Story = {
  args: { prefix: 12, label: 'Castelo forte é nosso Deus' },
}
