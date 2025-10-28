import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/front-pages/landing-page',
        permanent: true,
        locale: false
      },
      {
        source: '/dashboard',
        destination: '/dashboards/crm',
        permanent: true,
        locale: false
      }

      // ,
      // {
      //   source: '/((?!(?:en|front-pages|favicon.ico)\\b)):path',
      //   destination: '/en/:path',
      //   permanent: true,
      //   locale: false
      // }
    ]
  }
}

export default nextConfig
