/** @type {import('next').NextConfig} */
module.exports = {
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

  compiler: {
    styledComponents: true,
  },

  images: {
    unoptimized: true,
  },

  // `import Icon from './x.svg'` vira componente React (SVGR).
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}
