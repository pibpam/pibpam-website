import type { Meta, StoryObj } from '@storybook/react'
import Loading from './index'
import { LoadingContext } from '../../contexts/loading'

const meta: Meta<typeof Loading> = {
  title: 'Feedback/Loading',
  component: Loading,
}

export default meta

type Story = StoryObj<typeof Loading>

export const Visible: Story = {
  decorators: [
    (Story) => (
      <LoadingContext.Provider value={{ isLoading: true, setIsLoading: () => {} }}>
        <Story />
      </LoadingContext.Provider>
    ),
  ],
}
