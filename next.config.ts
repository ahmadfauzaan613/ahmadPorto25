import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      ignored: ['**/node_modules/**', '**/public/upload/**', '**/C:/Users/ahmad/Application Data/**', '**/C:/Users/ahmad/Cookies/**'],
    }
    return config
  },
  images: {
    domains: ['localhost'],
  },
  staticPageGenerationTimeout: 60,
}

export default nextConfig
