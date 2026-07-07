/** @type {import('next').NextConfig} */
const withWorkbox = require('next-with-workbox')

module.exports = withWorkbox({
  reactStrictMode: false,
  swcMinify: true,

  compiler: {
    styledComponents: true,
  },

  images: {
    unoptimized: true,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },

  workbox: {
    swSrc: 'public/sw.js',
    swDest: 'public/sw.js',
  },
})