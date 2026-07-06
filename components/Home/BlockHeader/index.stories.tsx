import type { Meta, StoryObj } from '@storybook/react'
import { FiCalendar } from 'react-icons/fi'
import BlockHeader from './index'

const meta: Meta<typeof BlockHeader> = {
  title: 'Home Sections/BlockHeader',
  component: BlockHeader,
  args: {
    icon: <FiCalendar />,
    title: 'Agenda',
  },
}

export default meta

type Story = StoryObj<typeof BlockHeader>

export const Default: Story = {}
