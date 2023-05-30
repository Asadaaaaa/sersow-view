/** @type {import('next').NextConfig} */

const nextConfig = {
  async notFound() {
    return {
      page: '/404',
    }
  },
}

module.exports = nextConfig
