import type { Meta, StoryObj } from '@storybook/react'
import Devotionals from './index'
import { IDevotinal } from '../../../interfaces/Devotinal'

const devotionals: IDevotinal[] = [
  {
    active: true,
    content: '',
    contentDate: '2026-07-05T00:00:00',
    created_at: '2026-07-01T00:00:00',
    image: '/igreja.jpg',
    title: 'A fidelidade de Deus',
    uuid: '1',
    author: { uuid: '1', name: 'Pr. João Silva', active: true, created_at: '2026-01-01' },
  },
  {
    active: true,
    content: '',
    contentDate: '2026-07-04T00:00:00',
    created_at: '2026-07-01T00:00:00',
    image: '/igreja.jpg',
    title: 'Perseverança na fé',
    uuid: '2',
    author: { uuid: '1', name: 'Pr. João Silva', active: true, created_at: '2026-01-01' },
  },
]

const meta: Meta<typeof Devotionals> = {
  title: 'Home Sections/Devotionals',
  component: Devotionals,
  parameters: { layout: 'fullscreen' },
  args: {
    devotionals,
    goTo: () => {},
  },
}

export default meta

type Story = StoryObj<typeof Devotionals>

export const Default: Story = {}
