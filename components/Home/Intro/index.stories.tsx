import type { Meta, StoryObj } from '@storybook/react'
import Intro from './index'
import { EBannerType, IBanner } from '../../../interfaces/Banner'

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
]

const meta: Meta<typeof Intro> = {
  title: 'Home Sections/Intro',
  component: Intro,
  parameters: { layout: 'fullscreen' },
  args: {
    goTo: () => {},
    banners,
  },
}

export default meta

type Story = StoryObj<typeof Intro>

export const Default: Story = {}

export const LoggedIn: Story = {
  args: {
    userName: 'Maria Oliveira',
  },
}

export const WithoutBanners: Story = {
  args: {
    banners: [],
  },
}
