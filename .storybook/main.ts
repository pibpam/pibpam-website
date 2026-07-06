import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.@(ts|tsx)',
    '../styles/**/*.stories.@(ts|tsx)',
    '../components/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    const imageRule = config.module?.rules?.find(
      (rule) =>
        rule &&
        typeof rule === 'object' &&
        'test' in rule &&
        (rule.test as RegExp)?.test?.('.svg'),
    )
    if (imageRule && typeof imageRule === 'object') {
      ;(imageRule as { exclude?: RegExp }).exclude = /\.svg$/
    }

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default config
