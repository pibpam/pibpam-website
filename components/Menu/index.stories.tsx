import type { Meta, StoryObj } from '@storybook/react'
import Menu from './index'
import { UserContext } from '../../contexts/user'

const noop = () => {}
const noopAsync = async () => {}

const loggedOutValue = {
  user: undefined,
  token: undefined,
  initUser: noop,
  isLoadingAuth: false,
  authError: undefined,
  login: noopAsync,
  register: noopAsync,
  loginGoogle: async () => '',
  logout: noop,
  authenticateByToken: noopAsync,
}

const loggedInValue = {
  ...loggedOutValue,
  user: { id: '1', name: 'Maria Oliveira', email: 'maria@pibpam.org' } as any,
}

const meta: Meta<typeof Menu> = {
  title: 'Layout/Menu',
  component: Menu,
  parameters: { layout: 'fullscreen' },
  args: {
    toggleMenu: () => {},
  },
}

export default meta

type Story = StoryObj<typeof Menu>

export const LoggedOut: Story = {
  decorators: [
    (Story) => (
      <UserContext.Provider value={loggedOutValue}>
        <Story />
      </UserContext.Provider>
    ),
  ],
}

export const LoggedIn: Story = {
  decorators: [
    (Story) => (
      <UserContext.Provider value={loggedInValue}>
        <Story />
      </UserContext.Provider>
    ),
  ],
}
