/** @type {import('next').NextConfig} */
const withWorkbox = require('next-with-workbox')

module.exports = withWorkbox({
  reactStrictMode: false,
  // Quando o app roda atrás do site institucional (site/), os assets dele
  // precisam vir do próprio domínio (ex.: https://app.pibpam.org) para não
  // colidirem com os /_next/static do site. Vazio em dev e no deploy atual.
  assetPrefix: process.env.ASSET_PREFIX || undefined,

  // Com assetPrefix em outro domínio, o runtime do Next busca manifests via
  // fetch() cross-origin; os assets são públicos, então liberamos CORS.
  async headers() {
    if (!process.env.ASSET_PREFIX) return []
    return [
      {
        source: '/_next/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ]
  },
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