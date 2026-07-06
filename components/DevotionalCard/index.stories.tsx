import type { Meta, StoryObj } from '@storybook/react'
import DevotionalCard from './index'
import { IDevotinal } from '../../interfaces/Devotinal'

const devotional: IDevotinal = {
  active: true,
  content: '',
  contentDate: '2026-07-05T00:00:00',
  created_at: '2026-07-01T00:00:00',
  image: '/igreja.jpg',
  title: 'A fidelidade de Deus',
  uuid: '1',
  author: { uuid: '1', name: 'Pr. João Silva', active: true, created_at: '2026-01-01' },
}

const meta: Meta<typeof DevotionalCard> = {
  title: 'Cards/DevotionalCard',
  component: DevotionalCard,
  args: {
    devotional,
    onClick: () => {},
  },
}

export default meta

type Story = StoryObj<typeof DevotionalCard>

export const Default: Story = {}
