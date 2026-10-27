import type { Meta, StoryObj } from '@storybook/react'
import Reveal from './index'

const meta: Meta<typeof Reveal> = {
  title: 'Site/Reveal',
  component: Reveal,
}

export default meta

type Story = StoryObj<typeof Reveal>

export const Sequence: Story = {
  render: () => (
    <ul style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Reveal as="li" index={i} key={i} className="rounded-md border border-line bg-paper p-4 font-semibold">
          Item {i + 1}
        </Reveal>
      ))}
    </ul>
  ),
}
