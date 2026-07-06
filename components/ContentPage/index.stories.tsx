import type { Meta, StoryObj } from '@storybook/react'
import ContentPage from './index'
import { IContent } from '../../interfaces/Contens'

const content: IContent = {
  uuid: '1',
  name: 'Culto de Celebração',
  description: 'Um momento de adoração e comunhão com Deus e a igreja.',
  contentDate: '2026-07-05T19:00:00',
  image: '/igreja.jpg',
  content: 'dQw4w9WgXcQ',
  serviceContent: 'YOUTUBE',
  active: true,
  created_at: '2026-07-01T00:00:00',
  isLive: false,
  author: { uuid: '1', name: 'Pr. João Silva', active: true, created_at: '2026-01-01' },
}

const meta: Meta<typeof ContentPage> = {
  title: 'Layout/ContentPage',
  component: ContentPage,
  parameters: { layout: 'fullscreen' },
  args: { content },
}

export default meta

type Story = StoryObj<typeof ContentPage>

export const Default: Story = {}

export const Live: Story = {
  args: {
    content: { ...content, isLive: true },
  },
}
