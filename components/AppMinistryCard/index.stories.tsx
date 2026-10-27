import type { Meta, StoryObj } from '@storybook/react'
import AppMinistryCard from './index'

const meta: Meta<typeof AppMinistryCard> = {
  title: 'Site/AppMinistryCard',
  component: AppMinistryCard,
  args: {
    onClick: () => {},
    data: {
      uuid: 'm1',
      name: 'Ministério de Louvor',
      shortDescription: 'Conduz a igreja em adoração',
      description: 'Cantores e músicos que servem nos cultos e eventos.',
      image: '/igreja.jpg',
      active: true,
      created_at: '2026-01-01T00:00:00.000Z',
      teamMember: [
        {
          uuid: 't1',
          role: 'Líder',
          createdAt: '2026-01-01T00:00:00.000Z',
          member: { uuid: 'p1', name: 'Maria da Silva Santos', created_at: '2026-01-01T00:00:00.000Z' },
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof AppMinistryCard>

export const Default: Story = {}

export const WithoutLogo: Story = {
  args: { data: { ...(meta.args!.data as object), image: undefined } as never },
}
