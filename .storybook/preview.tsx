import React from 'react'
import type { Preview } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import Contexts from '../contexts'
import theme from '../styles/theme'
import GlobalStyle from '../styles/GlobalStyle'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: false,
      router: {
        pathname: '/',
        query: {},
      },
    },
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Contexts>
          <Story />
        </Contexts>
      </ThemeProvider>
    ),
  ],
}

export default preview
