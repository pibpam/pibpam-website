import type { Meta, StoryObj } from '@storybook/react'
import CarouselAutoPlay from './index'
import { EBannerType, IBanner } from '../../interfaces/Banner'

const banners: IBanner[] = [
  {
    uuid: '1',
    title: 'Acampamento de Jovens',
    category: 'Eventos',
    type: EBannerType.NO_ACTION,
    image: '/carrossel-min.png',
    active: true,
    created_at: '2026-07-01T00:00:00',
    subtitle: 'Inscrições abertas',
  },
  {
    uuid: '2',
    title: 'Conferência de Missões',
    category: 'Eventos',
    type: EBannerType.NO_ACTION,
    image: '/carrossel-min.png',
    active: true,
    created_at: '2026-07-01T00:00:00',
    subtitle: 'Participe conosco',
  },
]

const meta: Meta<typeof CarouselAutoPlay> = {
  title: 'Layout/CarouselAutoPlay',
  component: CarouselAutoPlay,
  args: { banners },
}

export default meta

type Story = StoryObj<typeof CarouselAutoPlay>

export const Default: Story = {}
