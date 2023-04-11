/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async notFound() {
    return {
      page: '/404',
    }
  },
}

module.exports = nextConfig
